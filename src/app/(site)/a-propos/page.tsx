import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description, faq } from "@/content/a-propos/meta";
import { loadPageFiles } from "@/lib/load-content";
import { breadcrumb, escapeHtml, faqPage, jsonLdHtml, organization, pageUrl, social } from "@/lib/seo";

const URL = pageUrl("/a-propos");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/a-propos" },
  ...social(title, description, "/a-propos"),
};

const faqHtml = faq
  .map(([q, a]) => `<div class="faq-item reveal"><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></div>`)
  .join("\n");

const jsonLd = [
  breadcrumb([
    ["Accueil", "/"],
    ["À propos", "/a-propos"],
  ]),
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: URL,
    name: title,
    description,
    inLanguage: "fr-FR",
    mainEntity: organization,
  },
  faqPage(faq),
];

export default function Page() {
  const { css, html, script } = loadPageFiles("a-propos");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage
        css={css}
        html={html.replace('<div class="faq-list" id="faq-list"></div>', `<div class="faq-list">${faqHtml}</div>`)}
        script={script}
      />
    </>
  );
}
