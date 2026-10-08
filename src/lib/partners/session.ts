import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Jetons signés (HMAC-SHA256), sans état : sessions admin et partenaire, liens de connexion.
 * SESSION_SECRET : au moins 32 caractères (openssl rand -base64 32).
 */
export type TokenKind = "admin" | "partner" | "link";
type Payload = { k: TokenKind; sub?: string; exp: number };

export const DAY = 24 * 60 * 60;
export const TTL = { admin: 7 * DAY, partner: 30 * DAY, link: 30 * 60, welcomeLink: 7 * DAY };

function key(kind: TokenKind) {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  // La clé des sessions admin dépend du mot de passe : le changer déconnecte tout le monde.
  const scope = kind === "admin" ? `admin:${process.env.ADMIN_PASSWORD ?? ""}` : kind;
  return createHmac("sha256", secret).update(scope).digest();
}

const sign = (data: string, k: Buffer) => createHmac("sha256", k).update(data).digest("base64url");

export function authConfigured() {
  return key("partner") !== null;
}

export function createToken(kind: TokenKind, ttlSeconds: number, sub?: string) {
  const k = key(kind);
  if (!k) return null;
  const payload: Payload = { k: kind, exp: Math.floor(Date.now() / 1000) + ttlSeconds, ...(sub && { sub }) };
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${data}.${sign(data, k)}`;
}

export function readToken(token: string | undefined | null, kind: TokenKind): Payload | null {
  const k = key(kind);
  if (!k || !token) return null;
  const [data, mac, extra] = token.split(".");
  if (!data || !mac || extra !== undefined || !safeEqual(mac, sign(data, k))) return null;
  try {
    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf8")) as Payload;
    if (payload.k !== kind || typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

/** Comparaison à temps constant, quelle que soit la longueur des deux chaînes. */
export function safeEqual(a: string, b: string) {
  const h = (s: string) => createHash("sha256").update(s).digest();
  return timingSafeEqual(h(a), h(b));
}
