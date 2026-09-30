import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SITE, ORG_ID, organization, jsonLdHtml, social } from "@/lib/seo";
import "./globals.css";

const title = "vision — Agence d'automatisation IA pour le BTP";
const description =
  "Automatisation IA pour les entreprises du bâtiment : devis, factures, situations, relances. Diagnostic gratuit, sans engagement.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title,
  description,
  applicationName: "vision",
  authors: [{ name: "vision", url: SITE }],
  creator: "vision",
  publisher: "vision",
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  icons: {
    icon: "/eye.svg",
    shortcut: "/eye.svg",
    apple: "/eye.svg",
  },
  ...social(title, description, "/"),
};

// Entité de l'entreprise + site, référencées par @id depuis les pages.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: `${SITE}/`,
      name: "vision",
      inLanguage: "fr-FR",
      publisher: { "@id": ORG_ID },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Gabarito:wght@500;600;700;800;900&family=Hanken+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      </head>
      <body>{children}</body>
      <GoogleAnalytics gaId="G-N9YJ1N4HPF" />
    </html>
  );
}
