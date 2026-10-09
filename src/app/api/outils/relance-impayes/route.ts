import { KeyoneError, askKeyone } from "@/lib/keyone";

/*
 * Outil « relance de facture impayée » : rédaction personnalisée des messages.
 * Les montants, dates et niveaux sont calculés dans le navigateur (src/content/relance-impayes/script.js)
 * et transmis ici comme faits : le modèle rédige, il ne calcule rien. Appel routé par key.one.
 */

const CLIENTS = ["pro", "particulier", "public"] as const;
const TYPES = ["facture", "situation", "solde", "retenue"] as const;
const RELATIONS = ["ponctuel", "recurrent"] as const;
const DONES = ["0", "1", "2", "md"] as const;
const SITUATIONS = ["silence", "visa", "contestee", "promesse", "difficulte"] as const;
const LEVELS = ["avant", "cordial", "ferme", "md", "recours", "visa", "litige", "echeancier"] as const;

type Facts = {
  client: (typeof CLIENTS)[number];
  type: (typeof TYPES)[number];
  relation: (typeof RELATIONS)[number];
  done: (typeof DONES)[number];
  situation: (typeof SITUATIONS)[number];
  level: (typeof LEVELS)[number];
  amount: number;
  date: string;
  due: string;
  daysLate: number;
  rate: number;
  penalties: number;
  indemnity: number;
  total: number;
  deadline: string;
  recours: string;
  personal: { company: string; contact: string; ref: string; works: string };
};

const CLIENT_LABEL = { pro: "entreprise privée (promoteur, entreprise générale, professionnel)", particulier: "particulier", public: "maître d'ouvrage public (collectivité, bailleur social, État)" };
const TYPE_LABEL = { facture: "facture", situation: "situation de travaux", solde: "facture de solde après réception", retenue: "retenue de garantie" };
const DONE_LABEL = { "0": "aucune", "1": "une relance", "2": "deux relances ou plus", md: "une mise en demeure déjà envoyée" };
const SITUATION_LABEL = {
  silence: "aucune réponse du client",
  visa: "situation de travaux bloquée au visa du maître d'œuvre",
  contestee: "facture contestée par le client (montant, travaux supplémentaires ou réserves)",
  promesse: "promesse de paiement non tenue",
  difficulte: "client en difficulté de trésorerie",
};
const LEVEL_NAME = { avant: "Rappel courtois avant échéance", cordial: "Rappel cordial", ferme: "Relance ferme", md: "Mise en demeure", recours: "Dernier message avant recours", visa: "Demande de visa au maître d'œuvre", litige: "Clarification d'une facture contestée", echeancier: "Proposition d'échéancier" };
const LEVEL_GUIDE: Record<Facts["level"], (f: Facts) => string> = {
  avant: () => "rappel courtois avant l'échéance, sans aucune pression ; mentionner que la copie de la facture et le RIB sont joints.",
  cordial: () => "rappel cordial : rappeler les faits, proposer l'hypothèse d'un oubli ou d'un règlement qui a croisé le message, offrir un appel si quelque chose bloque. Ne pas mentionner de pénalités.",
  ferme: (f) =>
    "relance ferme mais courtoise : chiffrer le retard et les montants, fixer la date limite, annoncer la suite (procédure de recouvrement) sans menace excessive." +
    (f.client !== "particulier" ? " Proposer de renoncer aux pénalités et à l'indemnité si le règlement arrive avant la date limite." : f.penalties === 0 ? " Aucune pénalité n'est réclamable : ne pas en inventer." : ""),
  md: (f) =>
    `mise en demeure : le champ « mail » est le texte intégral du courrier recommandé (expéditeur et destinataire en tête, mention « Lettre recommandée avec accusé de réception », objet, date, formule « nous vous mettons en demeure », détail des sommes ligne par ligne, délai de huit jours à compter de la réception, conséquence à défaut : ${f.recours}, formule de politesse sobre).` +
    (f.client === "particulier" && f.penalties === 0 ? " Préciser qu'à défaut la somme portera intérêts au taux légal à compter de la réception du courrier (article 1231-6 du Code civil)." : ""),
  recours: (f) => `dernier message avant transmission du dossier : court et factuel, indiquer que le dossier est transmis (${f.recours}) et qu'un règlement immédiat du total arrête la procédure.`,
  visa: (f) => `message adressé au maître d'œuvre, pas au client : demander la date de visa et de transmission au maître d'ouvrage, ou ce qui bloque (quantités, attachements, pièces) ; maître d'ouvrage en copie.${f.client === "public" ? " Rappeler que le délai de paiement de 30 jours court depuis le dépôt de la situation." : ""}`,
  litige: () => "la facture est contestée : demander par écrit les points contestés et les montants concernés, proposer le règlement immédiat de la partie non contestée et un rendez-vous (sur le chantier si nécessaire). Ne réclamer aucune pénalité.",
  echeancier: () => "proposer un échéancier en trois versements égaux (dates : dans 7, 37 et 67 jours), pénalités suspendues tant qu'il est respecté, totalité du solde exigible dès une échéance manquée ; demander un accord écrit par retour de mail.",
};

const SYSTEM = `Tu es l'assistant administratif d'une entreprise du bâtiment en France. Tu rédiges des relances de factures impayées : un mail (ou un courrier), un SMS et un script d'appel téléphonique.

Règles :
- Vouvoiement. Français naturel, direct, sans jargon ni formule creuse. Aucune agressivité, même au niveau ferme : les faits, la date, la suite.
- Tu utilises UNIQUEMENT les faits fournis (montants, dates, taux, délais, références juridiques, étape suivante). Tu n'inventes aucun chiffre, aucun article de loi, aucun délai.
- Si une information manque (prénom, téléphone, adresse), tu laisses un champ entre crochets, par exemple [Prénom] ou [téléphone]. Tu n'inventes pas de nom.
- Le mail fait entre 90 et 170 mots (un courrier de mise en demeure peut aller jusqu'à 260 mots), avec un objet précis. Signature : « [Prénom Nom] » puis le nom de l'entreprise.
- Le SMS fait moins de 300 caractères et commence par le nom de l'entreprise, jamais par le nom du destinataire.
- Les textes ne nomment jamais le niveau de relance (« relance ferme », « rappel cordial »…) : ils le sont, ils ne le disent pas. Pas de « instamment », « nous serons contraints », « conformément à la législation en vigueur » : des phrases simples.
- Le script d'appel est une liste de 4 à 6 phrases courtes à dire dans l'ordre, dont une question ouverte qui fait réagir et une conclusion datée.
- Tu réponds uniquement avec un objet JSON : {"objet": string, "mail": string, "sms": string, "appel": string[]}.`;

const SCHEMA = {
  type: "object",
  properties: {
    objet: { type: "string" },
    mail: { type: "string" },
    sms: { type: "string" },
    appel: { type: "array", items: { type: "string" } },
  },
  required: ["objet", "mail", "sms", "appel"],
  additionalProperties: false,
};

const eur = (n: number) => n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
const pct = (n: number) => n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " %";
const frDate = (iso: string) => new Date(`${iso}T12:00:00Z`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).replace(/^1 /, "1er ");

function prompt(f: Facts): string {
  const p = f.personal;
  const late = f.daysLate > 0;
  const legal = f.client === "public" ? "intérêts moratoires, article R2192-31 du Code de la commande publique" : f.client === "pro" ? "article L441-10 du Code de commerce" : "pénalités prévues au devis signé";
  const amounts = late
    ? `facture ${eur(f.amount)} ; pénalités de retard ${eur(f.penalties)}${f.penalties > 0 ? ` (${pct(f.rate)} l'an du ${frDate(f.due)} à aujourd'hui, ${legal})` : f.client === "particulier" ? " (aucune clause au devis : rien n'est réclamable avant la mise en demeure)" : ""} ; indemnité forfaitaire de recouvrement ${eur(f.indemnity)}${f.client === "particulier" ? " (ne s'applique pas à un particulier)" : " (40 € par facture, de plein droit)"} ; total réclamable ${eur(f.total)}`
    : `facture ${eur(f.amount)} ; aucune pénalité : la facture n'est pas encore échue`;
  return `Dossier :
- Client : ${CLIENT_LABEL[f.client]}${f.relation === "recurrent" ? " ; donneur d'ordre récurrent, relation à préserver" : " ; relation ponctuelle"}
- Document : ${TYPE_LABEL[f.type]}${p.ref ? ` n° ${p.ref}` : ""} du ${frDate(f.date)}, ${eur(f.amount)} TTC${p.works ? ` ; travaux : ${p.works}` : ""}
- Échéance : ${frDate(f.due)}${late ? ` ; retard : ${f.daysLate} jour${f.daysLate > 1 ? "s" : ""}` : ` ; pas encore échue (dans ${-f.daysLate} jours)`}
- Relances déjà faites : ${DONE_LABEL[f.done]}
- Situation : ${SITUATION_LABEL[f.situation]}
- Niveau à rédiger : ${LEVEL_NAME[f.level]}. Consigne : ${LEVEL_GUIDE[f.level](f)}
- Montants (ne cite que ceux-ci) : ${amounts}
- Date limite à fixer dans le message : ${frDate(f.deadline)}
- Étape suivante si rien ne bouge : ${f.recours}
- Expéditeur : ${p.company || "[Votre entreprise]"} ; destinataire : ${p.contact || "[Prénom Nom]"}`;
}

/* Limite par adresse : 12 rédactions par 10 minutes (mémoire du processus, suffisant comme garde-fou avec le budget key.one). */
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
const num = (v: unknown, min: number, max: number) => (typeof v === "number" && Number.isFinite(v) && v >= min && v <= max ? v : null);
const ISO = /^\d{4}-\d{2}-\d{2}$/;
const text = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\u0000-\u001f]/g, " ").trim().slice(0, max) : "");

function parseFacts(b: Record<string, unknown>): Facts | null {
  if (!oneOf(b.client, CLIENTS) || !oneOf(b.type, TYPES) || !oneOf(b.relation, RELATIONS) || !oneOf(b.done, DONES) || !oneOf(b.situation, SITUATIONS) || !oneOf(b.level, LEVELS)) return null;
  const amount = num(b.amount, 0.01, 1e8), daysLate = num(b.daysLate, -3660, 36600), rate = num(b.rate, 0, 60);
  const penalties = num(b.penalties, 0, 1e8), indemnity = num(b.indemnity, 0, 40), total = num(b.total, 0, 2e8);
  if (amount === null || daysLate === null || rate === null || penalties === null || indemnity === null || total === null) return null;
  if (![b.date, b.due, b.deadline].every((d) => typeof d === "string" && ISO.test(d))) return null;
  const personal = (b.personal ?? {}) as Record<string, unknown>;
  return {
    client: b.client, type: b.type, relation: b.relation, done: b.done, situation: b.situation, level: b.level,
    amount, daysLate: Math.round(daysLate), rate, penalties, indemnity, total,
    date: b.date as string, due: b.due as string, deadline: b.deadline as string,
    recours: text(b.recours, 120) || "une procédure de recouvrement",
    personal: { company: text(personal.company, 80), contact: text(personal.contact, 80), ref: text(personal.ref, 40), works: text(personal.works, 80) },
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
  const appel = d.appel.filter((x): x is string => typeof x === "string" && x.trim().length > 0).slice(0, 7);
  if (!d.mail.trim() || appel.length < 3) return null;
  return { objet: d.objet.trim().slice(0, 160), mail: d.mail.trim().slice(0, 4000), sms: d.sms.trim().slice(0, 320), appel };
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

  const ask = (jsonSchema?: Record<string, unknown>) => askKeyone({ system: SYSTEM, prompt: prompt(facts), maxTokens: 1800, jsonSchema });
  try {
    let reply: Awaited<ReturnType<typeof askKeyone>>;
    try {
      reply = await ask(SCHEMA);
    } catch (e) {
      // Modèle ou proxy sans sortie structurée : on retente avec le JSON demandé par la consigne seule.
      if (e instanceof KeyoneError && e.code === "api" && /400/.test(e.message)) reply = await ask();
      else throw e;
    }
    const draft = parseDraft(reply.text);
    if (!draft) {
      console.error("relance-impayes: réponse non exploitable", reply.text.slice(0, 200));
      return Response.json({ error: "Rédaction indisponible." }, { status: 502 });
    }
    console.log(`relance-impayes: ${facts.level} via ${reply.model}, ${reply.costUsd ?? "?"} $`);
    return Response.json({ ...draft, model: reply.model, costUsd: reply.costUsd });
  } catch (e) {
    const err = e instanceof KeyoneError ? e : new KeyoneError("api", e instanceof Error ? e.message : "Erreur inconnue.");
    console.error(`relance-impayes keyone (${err.code}):`, err.message);
    const status = err.code === "blocked" || err.code === "wallet" || err.code === "missing_key" ? 503 : 502;
    return Response.json({ error: "Rédaction indisponible pour le moment." }, { status });
  }
}
