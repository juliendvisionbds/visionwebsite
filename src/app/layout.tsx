import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://visionbds.com"),
  title: "vision — Agence d'automatisation IA pour le BTP",
  description:
    "Automatisation IA pour les entreprises du bâtiment : devis, factures, situations, relances. Diagnostic gratuit, sans engagement.",
  icons: {
    icon: "/eye.svg",
    shortcut: "/eye.svg",
    apple: "/eye.svg",
  },
  openGraph: {
    title: "vision — Agence d'automatisation IA pour le BTP",
    description:
      "Automatisation IA pour les entreprises du bâtiment : devis, factures, situations, relances. Diagnostic gratuit, sans engagement.",
    url: "https://visionbds.com",
    siteName: "vision",
    locale: "fr_FR",
    type: "website",
    images: ["/thumbnail.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "vision — Agence d'automatisation IA pour le BTP",
    description:
      "Automatisation IA pour les entreprises du bâtiment : devis, factures, situations, relances. Diagnostic gratuit, sans engagement.",
    images: ["/thumbnail.png"],
  },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
