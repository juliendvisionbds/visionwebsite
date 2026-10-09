import Link from "next/link";
import Logo from "@/components/app/Logo";

const NAV = [
  { id: "partners", href: "/", label: "Partenaires" },
  { id: "contracts", href: "/contrats/", label: "Contrats" },
  { id: "documents", href: "/documents/", label: "Documents" },
] as const;

/** Barre de navigation de l'admin. Chaque page l'utilise, après son propre requireAdmin(). */
export default function Shell({ active, children }: { active: (typeof NAV)[number]["id"]; children: React.ReactNode }) {
  return (
    <>
      <header className="app-bar">
        <div className="app-bar-in">
          <Logo />
          <span className="app-space">Admin</span>
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
    </>
  );
}
