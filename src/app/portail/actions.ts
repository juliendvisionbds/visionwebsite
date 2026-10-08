'use server';

import { refresh } from "next/cache";
import { assertPartner } from "@/lib/partners/auth";
import { PARTNERS_URL, TEAM_EMAILS } from "@/lib/partners/config";
import { createReferral, getPartnerByEmail, updatePartner } from "@/lib/partners/db";
import { loginLinkEmail, referralNotification, send } from "@/lib/partners/emails";
import { EMAIL_RE, field } from "@/lib/partners/format";
import { TODO } from "@/lib/partners/kit";
import { TTL, createToken } from "@/lib/partners/session";

export type LoginState = { sent?: boolean; error?: string } | undefined;
export type ReferralState = { ok?: string; error?: string } | undefined;

/** Envoie un lien de connexion. La réponse est la même que l'adresse soit connue ou non. */
export async function requestLoginLink(_: LoginState, form: FormData): Promise<LoginState> {
  const email = field(form, "email", 254).toLowerCase();
  if (!EMAIL_RE.test(email)) return { error: "Adresse email invalide." };

  const partner = await getPartnerByEmail(email);
  if (partner?.status === "accepted") {
    const token = createToken("link", TTL.link, partner.id);
    if (token) await send(partner.email, loginLinkEmail(partner, `${PARTNERS_URL}/acces/?token=${token}`));
  }
  return { sent: true };
}

/** Le partenaire déclare une entreprise qu'il nous présente : elle lui est attribuée, l'équipe est prévenue. */
export async function declareReferral(_: ReferralState, form: FormData): Promise<ReferralState> {
  const partner = await assertPartner();
  const company = field(form, "company");
  const email = field(form, "contact_email", 254);
  if (!company) return { error: "Indiquez le nom de l'entreprise." };
  if (email && !EMAIL_RE.test(email)) return { error: "L'adresse email du contact n'est pas valide." };

  const referral = await createReferral({
    partner_id: partner.id,
    company,
    contact_name: field(form, "contact_name") || null,
    contact_email: email || null,
    contact_phone: field(form, "contact_phone", 40) || null,
    note: field(form, "note", 2000) || null,
    source: "partner",
  });
  await send(TEAM_EMAILS, referralNotification(partner, referral), partner.email);
  refresh();
  return { ok: `${company} est enregistrée. On vous tient au courant de la suite ici.` };
}

/** Coche ou décoche une étape de la liste de démarrage. */
export async function toggleTodo(form: FormData) {
  const partner = await assertPartner();
  const id = field(form, "id");
  if (!TODO.some((t) => t.id === id)) return;
  const done = partner.todo_done.includes(id) ? partner.todo_done.filter((t) => t !== id) : [...partner.todo_done, id];
  await updatePartner(partner.id, { todo_done: done });
  refresh();
}
