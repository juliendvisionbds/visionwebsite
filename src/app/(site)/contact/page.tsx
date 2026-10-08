import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/contact/meta";
import { loadPageFiles } from "@/lib/load-content";
import { ORG_ID, breadcrumb, jsonLdHtml, pageUrl, social } from "@/lib/seo";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  ...social(title, description, "/contact"),
};

const jsonLd = [
  breadcrumb([
    ["Accueil", "/"],
    ["Contact", "/contact"],
  ]),
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    url: pageUrl("/contact"),
    name: title,
    description,
    inLanguage: "fr-FR",
    about: { "@id": ORG_ID },
  },
];

export default function Page() {
  const { css, html, script } = loadPageFiles("contact");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage css={css} html={html} script={script} />
    </>
  );
}
