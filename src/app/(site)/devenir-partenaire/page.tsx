import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/devenir-partenaire/meta";
import { loadPageFiles } from "@/lib/load-content";
import { PARTNERS_URL, PROFILES } from "@/lib/partners/config";
import { ORG_ID, breadcrumb, escapeHtml, jsonLdHtml, pageUrl, social } from "@/lib/seo";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/devenir-partenaire" },
  ...social(title, description, "/devenir-partenaire"),
};

const jsonLd = [
  breadcrumb([
    ["Accueil", "/"],
    ["Devenir partenaire", "/devenir-partenaire"],
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: pageUrl("/devenir-partenaire"),
    name: title,
    description,
    inLanguage: "fr-FR",
    about: { "@id": ORG_ID },
  },
];

// Les activités proposées dans le formulaire sont celles que la route API accepte (src/lib/partners/config.ts).
const profileOptions = PROFILES.map((p) => `<option>${escapeHtml(p)}</option>`).join("");

export default function Page() {
  const { css, html, script } = loadPageFiles("devenir-partenaire");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage
        css={css}
        html={html.replace("<!-- PROFILES -->", profileOptions).replace("https://partenaires.visionbds.com", PARTNERS_URL)}
        script={script}
      />
    </>
  );
}
