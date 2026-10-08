'use server';

import { refresh } from "next/cache";
import { assertAdmin } from "@/lib/partners/auth";
import { PARTNERS_URL } from "@/lib/partners/config";
import {
  createContract,
  createReferral,
  deleteContract,
  deleteReferral,
  getPartner,
  isUuid,
  updateContract,
  updatePartner,
  updateReferral,
  type Partner,
  type PartnerStatus,
  type ReferralStatus,
} from "@/lib/partners/db";
import { send, welcomeEmail } from "@/lib/partners/emails";
import { EMAIL_RE, field, today } from "@/lib/partners/format";
import { TTL, createToken } from "@/lib/partners/session";

/* ——— partenaires ——— */

const STATUSES: PartnerStatus[] = ["pending", "accepted", "rejected"];

/** Envoie le kit et le lien d'accès, puis note la date d'envoi. */
async function sendWelcome(partner: Partner) {
  const token = createToken("link", TTL.welcomeLink, partner.id);
  if (!token) return;
  const sent = await send(partner.email, welcomeEmail(partner, `${PARTNERS_URL}/acces/?token=${token}`));
  if (sent) await updatePartner(partner.id, { welcome_sent_at: new Date().toISOString() });
}

/** Accepte, refuse ou remet en attente. L'acceptation envoie l'email de bienvenue (une seule fois). */
export async function setPartnerStatus(form: FormData) {
  await assertAdmin();
  const partner = await getPartner(field(form, "id"));
  const status = field(form, "status") as PartnerStatus;
  if (!partner || !STATUSES.includes(status) || partner.status === status) return;

  await updatePartner(partner.id, { status, decided_at: status === "pending" ? null : new Date().toISOString() });
  if (status === "accepted" && !partner.welcome_sent_at) await sendWelcome(partner);
  refresh();
}

export async function resendWelcome(form: FormData) {
  await assertAdmin();
  const partner = await getPartner(field(form, "id"));
  if (partner?.status !== "accepted") return;
  await sendWelcome(partner);
  refresh();
}

export async function savePartner(form: FormData) {
  await assertAdmin();
  const partner = await getPartner(field(form, "id"));
  if (!partner) return;
  const rate = Number(field(form, "commission_rate").replace(",", "."));
  await updatePartner(partner.id, {
    notes: field(form, "notes", 4000) || null,
    ...(Number.isFinite(rate) && rate >= 0 && rate <= 100 && { commission_rate: rate }),
  });
  refresh();
}

/* ——— recommandations ——— */

const REFERRAL_STATUSES: ReferralStatus[] = ["new", "call", "signed", "lost"];

export async function addReferral(form: FormData) {
  await assertAdmin();
  const partner = await getPartner(field(form, "partner_id"));
  const company = field(form, "company");
  if (!partner || !company) return;
  const email = field(form, "contact_email", 254);
  await createReferral({
    partner_id: partner.id,
    company,
    contact_name: field(form, "contact_name") || null,
    contact_email: EMAIL_RE.test(email) ? email : null,
    contact_phone: field(form, "contact_phone", 40) || null,
    note: field(form, "note", 2000) || null,
    source: "admin",
  });
  refresh();
}

export async function setReferralStatus(form: FormData) {
  await assertAdmin();
  const id = field(form, "id");
  const status = field(form, "status") as ReferralStatus;
  if (!isUuid(id) || !REFERRAL_STATUSES.includes(status)) return;
  await updateReferral(id, { status });
  refresh();
}

export async function removeReferral(form: FormData) {
  await assertAdmin();
  const id = field(form, "id");
  if (!isUuid(id)) return;
  await deleteReferral(id);
  refresh();
}

/* ——— contrats ——— */

/** Rattache un contrat signé à un partenaire. La recommandation liée passe en « Contrat signé ». */
export async function addContract(form: FormData) {
  await assertAdmin();
  const partner = await getPartner(field(form, "partner_id"));
  const client = field(form, "client");
  const amount = Number(field(form, "amount_ht").replace(/\s/g, "").replace(",", "."));
  const rate = Number(field(form, "commission_rate").replace(",", "."));
  const signedAt = field(form, "signed_at");
  const referralId = field(form, "referral_id");
  if (!partner || !client || !Number.isFinite(amount) || amount < 0) return;

  await createContract({
    partner_id: partner.id,
    referral_id: isUuid(referralId) ? referralId : null,
    client,
    title: field(form, "title") || null,
    amount_ht: Math.round(amount * 100) / 100,
    signed_at: /^\d{4}-\d{2}-\d{2}$/.test(signedAt) ? signedAt : today(),
    commission_rate: Number.isFinite(rate) && rate >= 0 && rate <= 100 ? rate : partner.commission_rate,
  });
  if (isUuid(referralId)) await updateReferral(referralId, { status: "signed" });
  refresh();
}

/** Marque la commission comme versée (aujourd'hui), ou annule le versement. */
export async function setContractPaid(form: FormData) {
  await assertAdmin();
  const id = field(form, "id");
  if (!isUuid(id)) return;
  await updateContract(id, { commission_paid_at: field(form, "paid") === "1" ? today() : null });
  refresh();
}

export async function removeContract(form: FormData) {
  await assertAdmin();
  const id = field(form, "id");
  if (!isUuid(id)) return;
  await deleteContract(id);
  refresh();
}
