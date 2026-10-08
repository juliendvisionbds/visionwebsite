import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPartner, type Partner } from "@/lib/partners/db";
import { TTL, createToken, readToken } from "@/lib/partners/session";

/**
 * Sessions des deux espaces. À vérifier dans chaque page (require…) ET chaque Server Action (assert…) :
 * une action est joignable par un POST direct, la page ne la protège pas.
 *
 * Pas de redirect() dans une Server Action ici : Next va chercher la page de destination en interne,
 * sans l'hôte du sous-domaine, et afficherait celle du site public. Les actions lèvent une erreur,
 * la connexion et la déconnexion passent par des Route Handlers (formulaires POST classiques).
 */
const ADMIN_COOKIE = "vision_admin";
const PARTNER_COOKIE = "vision_partner";

const cookieOptions = (maxAge: number) => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge,
});

/* ——— admin ——— */

export async function isAdmin() {
  return readToken((await cookies()).get(ADMIN_COOKIE)?.value, "admin") !== null;
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/connexion/");
}

export async function assertAdmin() {
  if (!(await isAdmin())) throw new Error("Session admin expirée.");
}

export async function startAdminSession() {
  const token = createToken("admin", TTL.admin);
  if (!token) return false;
  (await cookies()).set(ADMIN_COOKIE, token, cookieOptions(TTL.admin));
  return true;
}

export async function endAdminSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}

/* ——— partenaire ——— */

/** Le partenaire connecté, relu en base à chaque requête : un partenaire refusé perd l'accès aussitôt. */
export async function currentPartner(): Promise<Partner | null> {
  const session = readToken((await cookies()).get(PARTNER_COOKIE)?.value, "partner");
  if (!session?.sub) return null;
  const partner = await getPartner(session.sub);
  return partner?.status === "accepted" ? partner : null;
}

export async function requirePartner(): Promise<Partner> {
  const partner = await currentPartner();
  if (!partner) redirect("/connexion/");
  return partner;
}

export async function assertPartner(): Promise<Partner> {
  const partner = await currentPartner();
  if (!partner) throw new Error("Session partenaire expirée.");
  return partner;
}

export async function startPartnerSession(partnerId: string) {
  const token = createToken("partner", TTL.partner, partnerId);
  if (!token) return false;
  (await cookies()).set(PARTNER_COOKIE, token, cookieOptions(TTL.partner));
  return true;
}

export async function endPartnerSession() {
  (await cookies()).delete(PARTNER_COOKIE);
}

/* ——— formulaires POST vers un Route Handler ——— */

/** Le formulaire vient-il bien de ce même hôte ? (Les Route Handlers n'ont pas le contrôle d'origine des Server Actions.) */
export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

/** Redirection après un POST : 303, chemin relatif résolu par le navigateur sur le sous-domaine courant. */
export const seeOther = (path: string) => new Response(null, { status: 303, headers: { Location: path } });
