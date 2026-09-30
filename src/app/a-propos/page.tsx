import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description, faq } from "@/content/a-propos/meta";
import { loadPageFiles } from "@/lib/load-content";

const SITE = "https://visionbds.com";
const URL = `${SITE}/a-propos`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/a-propos" },
  openGraph: { title, description, url: URL },
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const faqHtml = faq
  .map(([q, a]) => `<div class="faq-item reveal"><h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p></div>`)
  .join("\n");

const founders = [
  { name: "Julien Devoir", jobTitle: "Cofondateur, produit et systèmes", sameAs: "https://www.linkedin.com/in/juliendevoir/" },
  { name: "Clément Samson", jobTitle: "Cofondateur, stratégie et développement", sameAs: "https://www.linkedin.com/in/cl%C3%A9ment-samson123/" },
  { name: "Clément Bernard", jobTitle: "Cofondateur, marketing et croissance", sameAs: "https://www.linkedin.com/in/clementbernard-/" },
].map((p) => ({ "@type": "Person", ...p }));

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: SITE },
      { "@type": "ListItem", position: 2, name: "À propos", item: URL },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: URL,
    name: title,
    description,
    inLanguage: "fr-FR",
    mainEntity: {
      "@type": "ProfessionalService",
      "@id": `${SITE}/#organization`,
      name: "vision",
      url: SITE,
      logo: `${SITE}/eye.svg`,
      description:
        "Agence d'automatisation IA qui supprime les tâches administratives répétitives des entreprises du bâtiment.",
      email: "juliend@visionbds.com",
      foundingDate: "2025",
      address: {
        "@type": "PostalAddress",
        addressRegion: "Var",
        addressCountry: "FR",
      },
      areaServed: { "@type": "Country", name: "France" },
      knowsAbout: [
        "Automatisation",
        "Intelligence artificielle",
        "BTP",
        "Devis",
        "Situations de travaux",
        "Tableaux de bord financiers",
        "Appels d'offres",
      ],
      founder: founders,
    },
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
  const { css, html, script } = loadPageFiles("a-propos");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <LegacyPage
        css={css}
        html={html.replace('<div class="faq-list" id="faq-list"></div>', `<div class="faq-list">${faqHtml}</div>`)}
        script={script}
      />
    </>
  );
}
