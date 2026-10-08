import { sameOrigin, seeOther, startAdminSession } from "@/lib/partners/auth";
import { safeEqual } from "@/lib/partners/session";

/** Connexion à l'admin (formulaire de /connexion). */
export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return seeOther("/connexion/?erreur=config");

  const password = (await request.formData()).get("password");
  if (typeof password !== "string" || !safeEqual(password, expected)) {
    // Ralentit les essais en série.
    await new Promise((r) => setTimeout(r, 700));
    return seeOther("/connexion/?erreur=mot-de-passe");
  }
  return seeOther((await startAdminSession()) ? "/" : "/connexion/?erreur=config");
}
