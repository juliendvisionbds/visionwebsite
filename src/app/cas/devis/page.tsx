import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/devis/meta";
import { loadPageFiles } from "@/lib/load-content";

export const metadata: Metadata = {
  title,
  description,
  // Cas masqué du site pour l'instant : hors index et hors sitemap jusqu'à sa réactivation.
  robots: { index: false, follow: true },
};

export default function Page() {
  const { css, html, script } = loadPageFiles("devis");
  return <LegacyPage css={css} html={html} script={script} />;
}
