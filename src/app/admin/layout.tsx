import type { Metadata } from "next";
import "@/components/app/app.css";

// Servi sur admin.visionbds.com (rewrite par hôte dans next.config.ts).
export const metadata: Metadata = {
  title: { default: "Partenaires | Admin vision", template: "%s | Admin vision" },
  description: "Administration du programme partenaires de vision.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <div className="app">{children}</div>;
}
