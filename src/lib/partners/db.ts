import { getSupabase } from "@/lib/supabase";

/** Accès aux tables du programme partenaires (supabase/migrations/20261008000000_partners.sql). */

export type PartnerStatus = "pending" | "accepted" | "rejected";
export type ReferralStatus = "new" | "call" | "signed" | "lost";

export type Partner = {
  id: string;
  created_at: string;
  status: PartnerStatus;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  profile: string | null;
  network: string | null;
  commission_rate: number;
  decided_at: string | null;
  welcome_sent_at: string | null;
  last_login_at: string | null;
  todo_done: string[];
  notes: string | null;
};

export type Referral = {
  id: string;
  created_at: string;
  partner_id: string;
  company: string;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  note: string | null;
  status: ReferralStatus;
  source: "partner" | "admin";
};

export type Contract = {
  id: string;
  created_at: string;
  partner_id: string;
  referral_id: string | null;
  client: string;
  title: string | null;
  amount_ht: number;
  signed_at: string;
  commission_rate: number;
  commission_amount: number;
  commission_paid_at: string | null;
};

export const PARTNER_STATUS: Record<PartnerStatus, string> = {
  pending: "En attente",
  accepted: "Accepté",
  rejected: "Refusé",
};

export const REFERRAL_STATUS: Record<ReferralStatus, string> = {
  new: "Recommandée",
  call: "Premier appel obtenu",
  signed: "Contrat signé",
  lost: "Sans suite",
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const isUuid = (v: unknown): v is string => typeof v === "string" && UUID_RE.test(v);

function db() {
  const supabase = getSupabase();
  if (!supabase) throw new Error("partners: Supabase n'est pas configuré.");
  return supabase;
}

function fail(scope: string, error: { message: string }): never {
  console.error(`partners/${scope}:`, error);
  throw new Error(`partners/${scope}: ${error.message}`);
}

// PostgREST renvoie les numeric sous forme de nombres ou de chaînes selon la précision.
const num = (v: unknown) => Number(v) || 0;
const partner = (r: Partner): Partner => ({ ...r, commission_rate: num(r.commission_rate), todo_done: r.todo_done ?? [] });
const contract = (r: Contract): Contract => ({
  ...r,
  amount_ht: num(r.amount_ht),
  commission_rate: num(r.commission_rate),
  commission_amount: num(r.commission_amount),
});

/* ——— partenaires ——— */

export type NewPartner = Pick<Partner, "name" | "email" | "phone" | "company" | "profile" | "network">;

/** Enregistre une candidature. `duplicate` : cette adresse a déjà candidaté. */
export async function createPartner(input: NewPartner): Promise<{ partner: Partner | null; duplicate: boolean }> {
  const { data, error } = await db().from("partners").insert(input).select().single();
  if (error?.code === "23505") return { partner: null, duplicate: true };
  if (error) fail("createPartner", error);
  return { partner: partner(data), duplicate: false };
}

export async function listPartners(): Promise<Partner[]> {
  const { data, error } = await db().from("partners").select("*").order("created_at", { ascending: false });
  if (error) fail("listPartners", error);
  return (data as Partner[]).map(partner);
}

export async function getPartner(id: string): Promise<Partner | null> {
  if (!isUuid(id)) return null;
  const { data, error } = await db().from("partners").select("*").eq("id", id).maybeSingle();
  if (error) fail("getPartner", error);
  return data ? partner(data) : null;
}

export async function getPartnerByEmail(email: string): Promise<Partner | null> {
  const { data, error } = await db().from("partners").select("*").eq("email", email.toLowerCase()).maybeSingle();
  if (error) fail("getPartnerByEmail", error);
  return data ? partner(data) : null;
}

export async function updatePartner(id: string, patch: Partial<Omit<Partner, "id" | "created_at">>) {
  const { error } = await db().from("partners").update(patch).eq("id", id);
  if (error) fail("updatePartner", error);
}

/* ——— recommandations ——— */

export type NewReferral = Pick<Referral, "partner_id" | "company" | "contact_name" | "contact_email" | "contact_phone" | "note" | "source">;

export async function listReferrals(partnerId?: string): Promise<Referral[]> {
  let query = db().from("partner_referrals").select("*").order("created_at", { ascending: false });
  if (partnerId) query = query.eq("partner_id", partnerId);
  const { data, error } = await query;
  if (error) fail("listReferrals", error);
  return data as Referral[];
}

export async function createReferral(input: NewReferral): Promise<Referral> {
  const { data, error } = await db().from("partner_referrals").insert(input).select().single();
  if (error) fail("createReferral", error);
  return data as Referral;
}

export async function updateReferral(id: string, patch: Partial<Pick<Referral, "status" | "note">>) {
  const { error } = await db().from("partner_referrals").update(patch).eq("id", id);
  if (error) fail("updateReferral", error);
}

export async function deleteReferral(id: string) {
  const { error } = await db().from("partner_referrals").delete().eq("id", id);
  if (error) fail("deleteReferral", error);
}

/* ——— contrats ——— */

export type NewContract = Pick<Contract, "partner_id" | "referral_id" | "client" | "title" | "amount_ht" | "signed_at" | "commission_rate">;

export async function listContracts(partnerId?: string): Promise<Contract[]> {
  let query = db().from("partner_contracts").select("*").order("signed_at", { ascending: false });
  if (partnerId) query = query.eq("partner_id", partnerId);
  const { data, error } = await query;
  if (error) fail("listContracts", error);
  return (data as Contract[]).map(contract);
}

export async function createContract(input: NewContract) {
  const { error } = await db().from("partner_contracts").insert(input);
  if (error) fail("createContract", error);
}

export async function updateContract(id: string, patch: Partial<Pick<Contract, "commission_paid_at">>) {
  const { error } = await db().from("partner_contracts").update(patch).eq("id", id);
  if (error) fail("updateContract", error);
}

export async function deleteContract(id: string) {
  const { error } = await db().from("partner_contracts").delete().eq("id", id);
  if (error) fail("deleteContract", error);
}

/* ——— synthèse ——— */

export type Summary = {
  referrals: number;
  calls: number;
  contracts: number;
  revenue: number;
  earned: number;
  paid: number;
  due: number;
};

/** Chiffres d'un partenaire (ou de l'ensemble) à partir de ses recommandations et contrats. */
export function summarize(referrals: Referral[], contracts: Contract[]): Summary {
  const sum = (list: Contract[], pick: (c: Contract) => number) => Math.round(list.reduce((t, c) => t + pick(c), 0) * 100) / 100;
  const earned = sum(contracts, (c) => c.commission_amount);
  const paid = sum(contracts.filter((c) => c.commission_paid_at), (c) => c.commission_amount);
  return {
    referrals: referrals.length,
    calls: referrals.filter((r) => r.status === "call" || r.status === "signed").length,
    contracts: contracts.length,
    revenue: sum(contracts, (c) => c.amount_ht),
    earned,
    paid,
    due: Math.round((earned - paid) * 100) / 100,
  };
}

export function groupBy<T extends { partner_id: string }>(rows: T[]) {
  const map = new Map<string, T[]>();
  for (const row of rows) map.set(row.partner_id, [...(map.get(row.partner_id) ?? []), row]);
  return map;
}
