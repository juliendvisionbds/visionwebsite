import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Logo from "@/components/app/Logo";
import { isAdmin } from "@/lib/partners/auth";

export const metadata: Metadata = { title: "Connexion" };

const ERRORS: Record<string, string> = {
  "mot-de-passe": "Mot de passe incorrect.",
  config: "L'accès n'est pas configuré : ADMIN_PASSWORD et SESSION_SECRET (32 caractères minimum) doivent être définis sur le serveur.",
};

export default async function Page({ searchParams }: PageProps<"/admin/connexion">) {
  if (await isAdmin()) redirect("/");
  const error = ERRORS[String((await searchParams).erreur)];
  return (
    <main className="app-auth">
      <div className="card">
        <Logo href="/connexion/" />
        <h1>Admin partenaires</h1>
        <p className="lede">Réservé à l’équipe vision.</p>
        {/* Formulaire POST classique vers src/app/admin/session/route.ts */}
        <form className="form" method="post" action="/session/">
          <label className="field">
            <span>Mot de passe</span>
            <input type="password" name="password" required autoFocus autoComplete="current-password" />
          </label>
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            Entrer
          </button>
        </form>
      </div>
    </main>
  );
}
