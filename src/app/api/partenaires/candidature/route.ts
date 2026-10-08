import { PROFILES, TEAM_EMAILS } from "@/lib/partners/config";
import { createPartner, type NewPartner, type Partner } from "@/lib/partners/db";
import { applicationConfirmation, applicationNotification, send } from "@/lib/partners/emails";
import { EMAIL_RE } from "@/lib/partners/format";

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Candidature au programme partenaires, depuis /devenir-partenaire. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }
  // Champ piège rempli : un robot. On répond comme si de rien n'était.
  if (str(body.website)) return Response.json({ ok: true });

  const input: NewPartner = {
    name: str(body.name),
    email: str(body.email, 254).toLowerCase(),
    phone: str(body.phone, 40) || null,
    company: str(body.company) || null,
    profile: str(body.profile),
    network: str(body.network, 2000),
  };
  if (!input.name || !input.network || !EMAIL_RE.test(input.email) || !PROFILES.includes(input.profile ?? "")) {
    return Response.json({ error: "Champs manquants ou invalides." }, { status: 400 });
  }

  let partner: Partner | null = null;
  try {
    const created = await createPartner(input);
    // Adresse déjà candidate : rien à refaire, et on ne dit pas où en est sa demande.
    if (created.duplicate) return Response.json({ ok: true });
    partner = created.partner;
  } catch (err) {
    console.error("partenaires/candidature:", err);
  }

  // L'équipe doit être au courant d'une façon ou d'une autre, même si l'enregistrement a échoué.
  const [notified] = await Promise.all([
    send(TEAM_EMAILS, applicationNotification(partner ?? input), input.email),
    partner ? send(input.email, applicationConfirmation(input)) : false,
  ]);
  if (!partner && !notified) return Response.json({ error: "Demande non enregistrée." }, { status: 502 });
  return Response.json({ ok: true, saved: partner !== null, notified });
}
