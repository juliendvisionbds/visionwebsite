import { KeyoneError, askKeyoneModel } from "@/lib/keyone";

/*
 * Outil « relance de devis » : rédaction personnalisée du mail, du SMS et du script d'appel.
 * Le calendrier et le type de message sont décidés dans le navigateur (src/content/relance-devis/script.js)
 * et transmis ici comme faits : le modèle rédige, il ne décide pas.
 * Appel routé par key.one ; modèle propre à l'outil : KEYONE_MODEL_RELANCE_DEVIS (gpt-5-mini par défaut).
 */

const MODEL = process.env.KEYONE_MODEL_RELANCE_DEVIS || process.env.KEYONE_OPENAI_MODEL || "gpt-5-mini";

const CLIENTS = ["petit", "gros", "pro"] as const;
const SITUATIONS = ["silence", "recu", "question", "prix", "reporte"] as const;
const KINDS = ["reception", "info", "last", "cloture", "reponse", "prix", "reporte"] as const;
const TONES = ["cordial", "direct", "chaleureux"] as const;

type Facts = {
  client: (typeof CLIENTS)[number];
  situation: (typeof SITUATIONS)[number];
  kind: (typeof KINDS)[number];
  tone: (typeof TONES)[number];
  done: number;
  days: number;
  works: string;
  amount: number | null;
  sent: string;
  decision: string;
  valid: string;
  said: string;
  nextDate: string;
  closeDate: string;
  personal: { company: string; contact: string };
};

const CLIENT_LABEL = { petit: "particulier, petit chantier (dépannage, reprise, petite maçonnerie)", gros: "particulier, projet important (extension, rénovation lourde, maison)", pro: "client professionnel, maître d'œuvre ou entreprise générale" };
const SITUATION_LABEL = {
  silence: "aucune réponse depuis l'envoi du devis",
  recu: "le client a accusé réception, sans décision",
  question: "le client a posé une question ou demandé une modification",
  prix: "le client hésite sur le prix ou compare avec un autre devis",
  reporte: "le client a indiqué que le projet est reporté",
};
const TONE_LABEL = {
  cordial: "cordial et professionnel : courtois, phrases simples, ni familier ni cérémonieux",
  direct: "direct : court, factuel, une question précise, pas de formule d'introduction",
  chaleureux: "chaleureux : client que l'on connaît, une touche personnelle, sans excès",
};
const KIND_GUIDE: Record<Facts["kind"], (f: Facts) => string> = {
  reception: () => "première relance : vérifier que le devis est bien arrivé et qu'il est clair ; proposer un appel si un poste mérite une explication ; aucune pression sur la décision.",
  info: (f) => `relance sans réponse : ne pas relancer « pour relancer », apporter une information utile (une disponibilité de démarrage, une contrainte de calendrier, la validité du devis${f.valid ? ` jusqu'au ${f.valid}` : ""}) et poser une question simple sur l'avancement de la décision.`,
  last: () => "dernier message avant clôture : court, proposer un appel de dix minutes à un moment précis, demander simplement où en est la décision, annoncer sans pression que le dossier sera classé faute de réponse.",
  cloture: () => "message de clôture : sans nouvelles, le devis va être classé ; il suffit de répondre pour reprendre ; si le client a choisi une autre solution, demander en un mot la raison, pour s'améliorer ; remercier.",
  reponse: (f) => `le client a posé une question ou demandé une modification : on ne relance pas, on répond. Rédiger une réponse qui reprend sa demande${f.said ? ` (« ${f.said} »)` : " (laisser un champ [réponse] si le détail manque)"}, apporte la réponse ou annonce le devis mis à jour, et propose un appel court.`,
  prix: () => "le client hésite sur le prix : pas de remise immédiate ; chercher à comprendre ce qui est comparé (un poste, un écart avec une autre proposition, un budget à respecter) ; rappeler que selon le cas on peut préciser ce qui est compris, proposer une variante ou un phasage ; proposer un appel de dix minutes.",
  reporte: (f) => `projet reporté : accuser réception sans insister, proposer une date de reprise de contact (${f.nextDate}), rappeler la validité du devis${f.valid ? ` (jusqu'au ${f.valid})` : ""} et qu'il sera mis à jour au-delà.`,
};

const SYSTEM = `Tu es l'assistant commercial d'une entreprise du bâtiment en France. Tu rédiges des relances de devis : un mail, un SMS et un script d'appel téléphonique.

Règles :
- Vouvoiement. Français naturel, phrases courtes, sans jargon ni formule creuse (« je me permets de revenir vers vous » est interdit). Jamais insistant, jamais plaintif.
- Tu utilises uniquement les faits fournis (travaux, dates, montant, ce que le client a dit). Tu n'inventes ni prix, ni remise, ni délai, ni nom. Si une information manque, tu laisses un champ entre crochets, par exemple [date de démarrage possible] ou [Prénom].
- Chaque message apporte quelque chose ou pose une question précise ; il ne demande jamais simplement « avez-vous pris votre décision ? ».
- Le mail fait entre 60 et 130 mots, avec un objet court et concret (pas de « Relance » dans l'objet). Signature : « [Prénom Nom] » puis le nom de l'entreprise.
- Le SMS fait moins de 300 caractères, commence par le nom de l'entreprise, et se termine par une question ou une proposition.
- Le script d'appel est une liste de 3 à 5 phrases courtes à dire dans l'ordre, dont une question ouverte, et il se termine par la demande d'une date (décision ou rappel).
- Les textes ne nomment jamais l'étape (« première relance », « clôture ») : ils le sont, ils ne le disent pas.
- Tu réponds uniquement avec un objet JSON : {"objet": string, "mail": string, "sms": string, "appel": string[]}.`;

const SCHEMA = {
  type: "object",
  properties: { objet: { type: "string" }, mail: { type: "string" }, sms: { type: "string" }, appel: { type: "array", items: { type: "string" } } },
  required: ["objet", "mail", "sms", "appel"],
  additionalProperties: false,
};

const eur = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 });
const frDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).replace(/ 1 /, " 1er ");

function prompt(f: Facts): string {
  const p = f.personal;
  return `Dossier :
- Client : ${CLIENT_LABEL[f.client]}
- Travaux : ${f.works || "[type de travaux]"}${f.amount ? ` ; montant du devis : ${eur(f.amount)} HT` : ""}
- Devis envoyé le ${frDate(f.sent)} ; aujourd'hui J+${f.days}${f.decision ? ` ; date de décision annoncée par le client : ${f.decision}` : ""}${f.valid ? ` ; devis valable jusqu'au ${f.valid}` : ""}
- Relances déjà faites : ${f.done === 0 ? "aucune" : f.done === 1 ? "une" : f.done === 2 ? "deux" : "trois ou plus"}
- Dernier échange : ${SITUATION_LABEL[f.situation]}${f.said ? ` ; ce que le client a dit : « ${f.said} »` : ""}
- Message à rédiger : ${KIND_GUIDE[f.kind](f)}
- Ton demandé : ${TONE_LABEL[f.tone]}
- Prochaine étape prévue si rien ne bouge : ${f.kind === "cloture" ? "aucune, le dossier est classé" : `${f.nextDate}${f.closeDate ? ` ; clôture du dossier vers le ${f.closeDate}` : ""}`}
- Expéditeur : ${p.company || "[Votre entreprise]"} ; destinataire : ${p.contact || "[Prénom]"}`;
}

const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const MAX_HITS = 12;
function limited(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (list.length >= MAX_HITS) return true;
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return false;
}

const oneOf = <T extends readonly string[]>(v: unknown, list: T): v is T[number] => typeof v === "string" && (list as readonly string[]).includes(v);
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "");

function parseFacts(b: Record<string, unknown>): Facts | null {
  if (!oneOf(b.client, CLIENTS) || !oneOf(b.situation, SITUATIONS) || !oneOf(b.kind, KINDS) || !oneOf(b.tone, TONES)) return null;
  if (typeof b.sent !== "string" || !ISO.test(b.sent)) return null;
  const days = typeof b.days === "number" && Number.isFinite(b.days) ? Math.round(Math.max(-365, Math.min(3650, b.days))) : null;
  const done = typeof b.done === "number" && Number.isFinite(b.done) ? Math.round(Math.max(0, Math.min(9, b.done))) : null;
  if (days === null || done === null) return null;
  const amount = typeof b.amount === "number" && Number.isFinite(b.amount) && b.amount > 0 && b.amount < 1e8 ? b.amount : null;
  const personal = (b.personal ?? {}) as Record<string, unknown>;
  return {
    client: b.client, situation: b.situation, kind: b.kind, tone: b.tone, days, done, amount,
    works: text(b.works, 120), sent: b.sent, decision: text(b.decision, 60), valid: text(b.valid, 60), said: text(b.said, 300),
    nextDate: text(b.nextDate, 60), closeDate: text(b.closeDate, 60),
    personal: { company: text(personal.company, 80), contact: text(personal.contact, 80) },
  };
}

type Draft = { objet: string; mail: string; sms: string; appel: string[] };
function parseDraft(raw: string): Draft | null {
  const cleaned = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  const start = cleaned.indexOf("{");
  if (start < 0) return null;
  let obj: unknown;
  try {
    obj = JSON.parse(cleaned.slice(start, cleaned.lastIndexOf("}") + 1));
  } catch {
    return null;
  }
  const d = obj as Record<string, unknown>;
  if (typeof d.objet !== "string" || typeof d.mail !== "string" || typeof d.sms !== "string" || !Array.isArray(d.appel)) return null;
  const appel = d.appel.filter((x): x is string => typeof x === "string" && x.trim().length > 0).slice(0, 6);
  if (!d.mail.trim() || appel.length < 2) return null;
  return { objet: d.objet.trim().slice(0, 160), mail: d.mail.trim().slice(0, 3000), sms: d.sms.trim().slice(0, 320), appel };
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) return Response.json({ error: "Trop de demandes. Réessayez dans quelques minutes." }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }
  const facts = parseFacts(body);
  if (!facts) return Response.json({ error: "Données du dossier incomplètes." }, { status: 400 });

  const ask = (jsonSchema?: Record<string, unknown>) => askKeyoneModel({ model: MODEL, system: SYSTEM, prompt: prompt(facts), maxTokens: 1500, jsonSchema, reasoning: "low" });
  try {
    let reply: Awaited<ReturnType<typeof askKeyoneModel>>;
    try {
      reply = await ask(SCHEMA);
    } catch (e) {
      if (e instanceof KeyoneError && e.code === "api" && /400/.test(e.message)) reply = await ask();
      else throw e;
    }
    const draft = parseDraft(reply.text);
    if (!draft) {
      console.error("relance-devis: réponse non exploitable", reply.text.slice(0, 200));
      return Response.json({ error: "Rédaction indisponible." }, { status: 502 });
    }
    console.log(`relance-devis: ${facts.kind} via ${reply.model}, ${reply.costUsd ?? "?"} $`);
    return Response.json({ ...draft, model: reply.model, costUsd: reply.costUsd });
  } catch (e) {
    const err = e instanceof KeyoneError ? e : new KeyoneError("api", e instanceof Error ? e.message : "Erreur inconnue.");
    console.error(`relance-devis keyone (${err.code}):`, err.message);
    const status = err.code === "blocked" || err.code === "wallet" || err.code === "missing_key" ? 503 : 502;
    return Response.json({ error: "Rédaction indisponible pour le moment." }, { status });
  }
}
