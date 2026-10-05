import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/tableau-de-bord-activite/meta";
import { loadPageFiles } from "@/lib/load-content";
import { ORG_ID, SITE, breadcrumb, jsonLdHtml, pageUrl, social } from "@/lib/seo";

const PATH = "/clients/tableau-de-bord-activite";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  // Cas client masqué du site pour l'instant : hors index et hors sitemap jusqu'à sa publication.
  robots: { index: false, follow: true },
  ...social(title, description, PATH, "article"),
};

const jsonLd = [
  breadcrumb([
    ["Accueil", "/"],
    ["Tableau de bord d'activité", PATH],
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Tableau de bord BTP : d’un export Excel au suivi d’activité",
    description,
    url: pageUrl(PATH),
    mainEntityOfPage: pageUrl(PATH),
    image: `${SITE}/og.jpg`,
    inLanguage: "fr-FR",
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  },
];

export default function Page() {
  const { css, html, script } = loadPageFiles("tableau-de-bord-activite");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage css={css} html={html} script={script} />
    </>
  );
}
