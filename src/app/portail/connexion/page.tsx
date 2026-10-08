import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Logo from "@/components/app/Logo";
import { currentPartner } from "@/lib/partners/auth";
import { SITE } from "@/lib/seo";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Connexion" };

export default async function Page({ searchParams }: PageProps<"/portail/connexion">) {
  if (await currentPartner()) redirect("/");
  const expired = (await searchParams).lien === "expire";
  return (
    <main className="app-auth">
      <div className="app-auth-in">
        <Logo href="/connexion/" />
        <div className="card yellow">
          <h1>Espace partenaires</h1>
          <p className="lede">Votre kit de recommandation, vos recommandations et vos commissions.</p>
          {expired && (
            <p className="error" role="alert" style={{ marginBottom: 14 }}>
              Ce lien n’est plus valable. Demandez-en un nouveau ci-dessous.
            </p>
          )}
          <LoginForm />
          <p className="note" style={{ marginTop: 18 }}>
            Pas encore partenaire ?{" "}
            <a className="link" href={`${SITE}/devenir-partenaire/`}>
              Rejoindre le programme
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
