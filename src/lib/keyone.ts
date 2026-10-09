import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

/*
 * key.one (https://getkeyone.com) : les appels IA du site passent par le proxy key.one avec une
 * clé projet (kone_live_…). key.one applique le budget du projet avant chaque appel et renvoie
 * le coût dans les en-têtes. Serveur uniquement : ne jamais importer ce module côté client.
 */

const DEFAULT_BASE_URL = "https://getkeyone.com/api/proxy/anthropic";
const DEFAULT_OPENAI_BASE_URL = "https://getkeyone.com/api/proxy/openai/v1";

/** Modèle OpenAI par défaut (via le proxy key.one), pour les outils qui préfèrent GPT. */
export const KEYONE_OPENAI_MODEL = process.env.KEYONE_OPENAI_MODEL || "gpt-5-mini";

/** Modèle par défaut : alias key.one (cheapest, balanced, best) ou identifiant Anthropic. */
export const KEYONE_MODEL = process.env.KEYONE_MODEL || "cheapest";

/** Modèles dont la réflexion est active par défaut (claude-*-5, 5-5, fable, mythos). */
const THINKING_MODELS = /(opus|sonnet|haiku)-5(-\d)?$|fable|mythos/i;

let client: Anthropic | null = null;
let openaiClient: OpenAI | null = null;

/** Client OpenAI routé par key.one (même clé projet). null si KEYONE_API_KEY n'est pas configurée. */
export function getKeyoneOpenAI(): OpenAI | null {
  if (openaiClient) return openaiClient;
  const apiKey = process.env.KEYONE_API_KEY;
  if (!apiKey) {
    console.error("keyone: KEYONE_API_KEY manquante.");
    return null;
  }
  openaiClient = new OpenAI({ apiKey, baseURL: process.env.KEYONE_OPENAI_BASE_URL || DEFAULT_OPENAI_BASE_URL, timeout: 90_000 });
  return openaiClient;
}

/** Client Anthropic routé par key.one. null si KEYONE_API_KEY n'est pas configurée. */
export function getKeyone(): Anthropic | null {
  if (client) return client;
  const apiKey = process.env.KEYONE_API_KEY;
  if (!apiKey) {
    console.error("keyone: KEYONE_API_KEY manquante.");
    return null;
  }
  client = new Anthropic({
    apiKey,
    baseURL: process.env.KEYONE_ANTHROPIC_BASE_URL || DEFAULT_BASE_URL,
    timeout: 60_000,
  });
  return client;
}

export type KeyoneCode = "missing_key" | "blocked" | "wallet" | "refusal" | "truncated" | "api";

/** Erreur exploitable par une route : `code` pour la logique, `message` en français pour l'utilisateur. */
export class KeyoneError extends Error {
  constructor(
    public readonly code: KeyoneCode,
    message: string,
    public readonly detail?: unknown,
  ) {
    super(message);
    this.name = "KeyoneError";
  }
}

export type KeyoneReply = {
  text: string;
  /** Modèle réellement utilisé (en-tête X-Model-Resolved quand un alias a été demandé). */
  model: string;
  costUsd: number | null;
  callId: string | null;
  /** Reste du budget mensuel du projet, si un budget est défini. */
  projectBudgetRemaining: number | null;
  usage: { input: number; output: number };
};

const num = (v: string | null) => (v == null || v === "" || Number.isNaN(Number(v)) ? null : Number(v));

/** Un appel texte simple (consigne système + message), avec le coût rapporté par key.one. */
export async function askKeyone(opts: {
  prompt: string;
  system?: string;
  maxTokens?: number;
  model?: string;
  /** Schéma JSON de la réponse attendue (sortie structurée : le texte renvoyé est du JSON valide). */
  jsonSchema?: Record<string, unknown>;
}): Promise<KeyoneReply> {
  const model = opts.model || KEYONE_MODEL;
  // Les modèles Claude 5.x réfléchissent par défaut et cette réflexion consomme max_tokens :
  // on limite l'effort et on élargit la marge. Les modèles plus anciens refusent le paramètre `effort`.
  const thinks = THINKING_MODELS.test(model);
  const maxTokens = (opts.maxTokens ?? 2048) + (thinks ? 2500 : 0);
  const anthropic = getKeyone();
  if (!anthropic) throw new KeyoneError("missing_key", "Génération indisponible : clé key.one non configurée.");
  try {
    const { data, response } = await anthropic.messages
      .create({
        model,
        max_tokens: maxTokens,
        system: opts.system,
        messages: [{ role: "user", content: opts.prompt }],
        ...(opts.jsonSchema || thinks
          ? {
              output_config: {
                ...(opts.jsonSchema ? { format: { type: "json_schema" as const, schema: opts.jsonSchema } } : {}),
                ...(thinks ? { effort: "low" as const } : {}),
              },
            }
          : {}),
      })
      .withResponse();

    if (data.stop_reason === "refusal") {
      throw new KeyoneError("refusal", "Le modèle a refusé cette demande.", data.stop_details);
    }
    const text = data.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");
    if (data.stop_reason === "max_tokens") {
      throw new KeyoneError("truncated", "Réponse coupée avant la fin : augmentez maxTokens.", { text });
    }
    return {
      text,
      model: response.headers.get("x-model-resolved") || data.model,
      costUsd: num(response.headers.get("x-cost-usd")),
      callId: response.headers.get("x-call-id"),
      projectBudgetRemaining: num(response.headers.get("x-project-budget-remaining")),
      usage: { input: data.usage.input_tokens, output: data.usage.output_tokens },
    };
  } catch (error) {
    if (error instanceof KeyoneError) throw error;
    throw toKeyoneError(error);
  }
}

/** Même appel texte simple, mais sur un modèle OpenAI (Chat Completions) via key.one. */
export async function askKeyoneOpenAI(opts: {
  prompt: string;
  system?: string;
  maxTokens?: number;
  model?: string;
  /** Schéma JSON strict de la réponse (Structured Outputs OpenAI : le contenu renvoyé est du JSON valide). */
  jsonSchema?: Record<string, unknown>;
  /** Effort de raisonnement des modèles GPT-5 ; « low » garde la latence basse pour de la mise en forme. */
  reasoning?: "minimal" | "low" | "medium" | "high";
}): Promise<KeyoneReply> {
  const openai = getKeyoneOpenAI();
  if (!openai) throw new KeyoneError("missing_key", "Génération indisponible : clé key.one non configurée.");
  const model = opts.model || KEYONE_OPENAI_MODEL;
  try {
    const { data, response } = await openai.chat.completions
      .create({
        model,
        // Les modèles GPT-5 comptent leur raisonnement dans ce plafond : marge large.
        max_completion_tokens: (opts.maxTokens ?? 2048) + 4000,
        reasoning_effort: opts.reasoning ?? "low",
        messages: [...(opts.system ? [{ role: "system" as const, content: opts.system }] : []), { role: "user" as const, content: opts.prompt }],
        ...(opts.jsonSchema
          ? { response_format: { type: "json_schema" as const, json_schema: { name: "reponse", strict: true, schema: opts.jsonSchema } } }
          : {}),
      })
      .withResponse();
    const choice = data.choices[0];
    if (!choice) throw new KeyoneError("api", "Réponse vide du modèle.");
    if (choice.finish_reason === "content_filter" || choice.message.refusal) {
      throw new KeyoneError("refusal", "Le modèle a refusé cette demande.", choice.message.refusal);
    }
    const text = choice.message.content ?? "";
    if (choice.finish_reason === "length") throw new KeyoneError("truncated", "Réponse coupée avant la fin : augmentez maxTokens.", { text });
    return {
      text,
      model: response.headers.get("x-model-resolved") || data.model,
      costUsd: num(response.headers.get("x-cost-usd")),
      callId: response.headers.get("x-call-id"),
      projectBudgetRemaining: num(response.headers.get("x-project-budget-remaining")),
      usage: { input: data.usage?.prompt_tokens ?? 0, output: data.usage?.completion_tokens ?? 0 },
    };
  } catch (error) {
    if (error instanceof KeyoneError) throw error;
    throw toKeyoneError(error);
  }
}

const OPENAI_MODEL = /^(gpt-|o\d|chatgpt)/i;
/** Un modèle OpenAI se reconnaît à son nom ; tout le reste (claude-*, cheapest, balanced, best) part sur le proxy Anthropic. */
export const isOpenAIModel = (model: string) => OPENAI_MODEL.test(model);

/** Choisit le proxy d'après le nom du modèle : chaque outil peut ainsi fixer son modèle par variable d'environnement. */
export function askKeyoneModel(opts: Parameters<typeof askKeyoneOpenAI>[0] & { model: string }): Promise<KeyoneReply> {
  return isOpenAIModel(opts.model) ? askKeyoneOpenAI(opts) : askKeyone(opts);
}

/** Traduit les refus du proxy key.one (403 BLOCKED, 402 portefeuille vide) et les erreurs API. */
function toKeyoneError(error: unknown): KeyoneError {
  if (error instanceof Anthropic.APIError || error instanceof OpenAI.APIError) {
    const raw = error.error as { status?: string; reason?: string; message?: string; error?: { status?: string; reason?: string; message?: string } } | undefined;
    const body = raw?.error && typeof raw.error === "object" && !raw.status ? raw.error : raw;
    if (error.status === 403 && body?.status === "BLOCKED") {
      const why = body.reason ?? "contrôle de dépense";
      return new KeyoneError("blocked", `Appel bloqué par key.one (${why}). ${body.message ?? ""}`.trim(), body);
    }
    if (error.status === 402) {
      return new KeyoneError("wallet", "Portefeuille key.one insuffisant : à recharger dans le dashboard.", body);
    }
    return new KeyoneError("api", `Erreur API ${error.status ?? ""} : ${error.message}`.trim(), body);
  }
  return new KeyoneError("api", error instanceof Error ? error.message : "Erreur inconnue.", error);
}
