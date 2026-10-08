import type { Metadata } from "next";
import "@/components/app/app.css";

// Servi sur partenaires.visionbds.com (rewrite par hôte dans next.config.ts).
export const metadata: Metadata = {
  title: { default: "Espace partenaires | vision", template: "%s | Espace partenaires vision" },
  description: "L'espace des partenaires de vision : kit de recommandation, suivi des recommandations et des commissions.",
  robots: { index: false, follow: false },
};

export default function PortalLayout({ children }: LayoutProps<"/portail">) {
  return <div className="app">{children}</div>;
}
