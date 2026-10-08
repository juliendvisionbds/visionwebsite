import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/outils/meta";
import { loadPageFiles } from "@/lib/load-content";
import { ORG_ID, breadcrumb, jsonLdHtml, pageUrl, social } from "@/lib/seo";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/outils" },
  ...social(title, description, "/outils"),
};

const jsonLd = [
  breadcrumb([
    ["Accueil", "/"],
    ["Outils gratuits", "/outils"],
  ]),
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: pageUrl("/outils"),
    name: title,
    description,
    inLanguage: "fr-FR",
    publisher: { "@id": ORG_ID },
  },
];

export default function Page() {
  const { css, html, script } = loadPageFiles("outils");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage css={css} html={html} script={script} />
    </>
  );
}
