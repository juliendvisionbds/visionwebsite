/** Constantes et helpers SEO partagés (URL canonique, JSON-LD). */

export const SITE = "https://www.visionbds.com";

/** URL absolue d'une route, avec le slash final (next.config : trailingSlash). */
export const pageUrl = (path: string) => `${SITE}${path === "/" ? "/" : `${path.replace(/\/$/, "")}/`}`;

const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 750,
  alt: "vision, agence d'automatisation IA pour les entreprises du BTP",
};

/** Balises Open Graph / Twitter d'une page (les redéfinir côté page écrase celles du layout, image comprise). */
export const social = (
  title: string,
  description: string,
  path: string,
  type: "website" | "article" = "website",
  image: { url: string; alt: string } = OG_IMAGE
) => ({
  openGraph: { title, description, url: path, siteName: "vision", locale: "fr_FR", type, images: [image] },
  twitter: { card: "summary_large_image" as const, title, description, images: [image.url] },
});

export const ORG_ID = `${SITE}/#organization`;

export const organization = {
  "@type": "ProfessionalService",
  "@id": ORG_ID,
  name: "vision",
  url: `${SITE}/`,
  logo: `${SITE}/eye.svg`,
  image: `${SITE}/og.jpg`,
  description:
    "Agence d'automatisation IA qui supprime les tâches administratives répétitives des entreprises du bâtiment : devis, factures, situations de travaux, relances, tableaux de bord.",
  email: "juliend@visionbds.com",
  foundingDate: "2025",
  address: { "@type": "PostalAddress", addressRegion: "Var", addressCountry: "FR" },
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
  founder: [
    { name: "Julien Devoir", jobTitle: "Cofondateur, produit et systèmes", sameAs: "https://www.linkedin.com/in/juliendevoir/" },
    { name: "Clément Samson", jobTitle: "Cofondateur, stratégie et développement", sameAs: "https://www.linkedin.com/in/cl%C3%A9ment-samson123/" },
    { name: "Clément Bernard", jobTitle: "Cofondateur, marketing et croissance", sameAs: "https://www.linkedin.com/in/clementbernard-/" },
  ].map((p) => ({ "@type": "Person", ...p })),
};

export const breadcrumb = (items: Array<[name: string, path: string]>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({
    "@type": "ListItem",
    position: i + 1,
    name,
    item: pageUrl(path),
  })),
});

export const faqPage = (faq: Array<[string, string]>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

export const jsonLdHtml = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

export const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
