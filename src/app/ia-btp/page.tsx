import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description, faq } from "@/content/ia-btp/meta";
import { loadPageFiles } from "@/lib/load-content";

const URL = "https://visionbds.com/ia-btp";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ia-btp" },
  openGraph: { title, description, url: URL, type: "article" },
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const faqHtml = faq
  .map(
    ([q, a]) =>
      `<div class="q"><button><span>${escapeHtml(q)}</span><span class="sign"></span></button><div class="ans"><p>${escapeHtml(a)}</p></div></div>`
  )
  .join("\n");

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: "https://visionbds.com" },
      { "@type": "ListItem", position: 2, name: "IA dans le BTP", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "L'IA dans le BTP : cas d'usage concrets, outils et guide",
    description,
    url: URL,
    inLanguage: "fr-FR",
    author: { "@type": "Organization", name: "vision", url: "https://visionbds.com" },
    publisher: { "@type": "Organization", name: "vision", url: "https://visionbds.com" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
];

export default function Page() {
  const { css, html, script } = loadPageFiles("ia-btp");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <LegacyPage
        css={css}
        html={html.replace('<div class="faq-wrap" id="faq"></div>', `<div class="faq-wrap">${faqHtml}</div>`)}
        script={script}
      />
    </>
  );
}
