import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description, faq } from "@/content/ia-btp/meta";
import { loadPageFiles } from "@/lib/load-content";
import { SITE, ORG_ID, breadcrumb, escapeHtml, faqPage, jsonLdHtml, pageUrl, social } from "@/lib/seo";

const URL = pageUrl("/ia-btp");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ia-btp" },
  ...social(title, description, "/ia-btp", "article"),
};

const faqHtml = faq
  .map(
    ([q, a]) =>
      `<div class="q"><button><span>${escapeHtml(q)}</span><span class="sign"></span></button><div class="ans"><p>${escapeHtml(a)}</p></div></div>`
  )
  .join("\n");

const jsonLd = [
  breadcrumb([
    ["Accueil", "/"],
    ["IA dans le BTP", "/ia-btp"],
  ]),
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "L'IA dans le BTP : cas d'usage concrets, outils et guide",
    description,
    url: URL,
    mainEntityOfPage: URL,
    image: `${SITE}/og.jpg`,
    inLanguage: "fr-FR",
    datePublished: "2026-09-30",
    dateModified: "2026-09-30",
    about: ["Intelligence artificielle", "BTP", "Automatisation"],
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  },
  faqPage(faq),
];

export default function Page() {
  const { css, html, script } = loadPageFiles("ia-btp");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage
        css={css}
        html={html.replace('<div class="faq-wrap" id="faq"></div>', `<div class="faq-wrap">${faqHtml}</div>`)}
        script={script}
      />
    </>
  );
}
