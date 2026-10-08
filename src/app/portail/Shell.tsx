import Link from "next/link";
import Logo from "@/components/app/Logo";
import { TEAM_EMAILS } from "@/lib/partners/config";

const NAV = [
  { id: "dashboard", href: "/", label: "Tableau de bord" },
  { id: "kit", href: "/materiel/", label: "Kit de recommandation" },
] as const;

/** Barre de navigation de l'espace partenaires. Chaque page l'utilise, après son propre requirePartner(). */
export default function Shell({ active, children }: { active: (typeof NAV)[number]["id"]; children: React.ReactNode }) {
  return (
    <>
      <header className="app-bar">
        <div className="app-bar-in">
          <Logo />
          <span className="app-space">Partenaires</span>
          <nav className="app-nav" aria-label="Navigation">
            {NAV.map((item) => (
              <Link key={item.id} href={item.href} aria-current={item.id === active ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
            <form method="post" action="/deconnexion/">
              <button type="submit">Déconnexion</button>
            </form>
          </nav>
        </div>
      </header>
      <main className="app-main">{children}</main>
      <footer className="app-foot">
        Une question ? Écrivez à <a className="link" href={`mailto:${TEAM_EMAILS.join(",")}`}>{TEAM_EMAILS.join(" ou ")}</a>.
      </footer>
    </>
  );
}
