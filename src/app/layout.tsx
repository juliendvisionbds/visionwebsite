import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vision — automatisation IA pour le BTP",
  description:
    "Automatisation IA pour les entreprises du bâtiment. Première automatisation en 3 semaines. Diagnostic gratuit.",
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
