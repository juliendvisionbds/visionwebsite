import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/equipe/meta";
import { loadPageFiles } from "@/lib/load-content";
import { breadcrumb, jsonLdHtml, organization, pageUrl, social } from "@/lib/seo";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/equipe" },
  ...social(title, description, "/equipe"),
};

const jsonLd = [
  breadcrumb([
    ["Accueil", "/"],
    ["L'équipe", "/equipe"],
  ]),
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: pageUrl("/equipe"),
    name: title,
    description,
    inLanguage: "fr-FR",
    mainEntity: organization,
  },
];

export default function Page() {
  const { css, html, script } = loadPageFiles("equipe");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage css={css} html={html} script={script} />
    </>
  );
}
