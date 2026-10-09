import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description, faq } from "@/content/relance-impayes/meta";
import { loadPageFiles } from "@/lib/load-content";
import { ORG_ID, SITE, breadcrumb, escapeHtml, faqPage, jsonLdHtml, pageUrl, social } from "@/lib/seo";

const PATH = "/outils/relance-impayes";
const URL = pageUrl(PATH);

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: PATH },
  ...social(title, description, PATH),
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
    ["Outils gratuits", "/outils"],
    ["Relance de facture impayée", PATH],
  ]),
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Générateur de relance de facture impayée BTP",
    url: URL,
    description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    browserRequirements: "Requires JavaScript",
    inLanguage: "fr-FR",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
    image: `${SITE}/og.jpg`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  },
  faqPage(faq),
];

export default function Page() {
  const { css, html, script } = loadPageFiles("relance-impayes");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage
        css={css}
        html={html.replace('<div class="faq-wrap" id="faq-list"></div>', `<div class="faq-wrap">${faqHtml}</div>`)}
        script={script}
      />
    </>
  );
}
