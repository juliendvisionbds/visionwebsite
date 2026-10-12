import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ORIGIN, description, title } from "@/content/carnet-plein/meta";
import "./carnet.css";

// Typographies du design system Sodobat (auto-hébergées) : Geist pour tout, Geist Mono pour les codes.
const sans = Geist({ subsets: ["latin"], variable: "--cp-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--cp-mono" });

// Servi sur carnetplein.visionbtp.com (rewrite par hôte dans next.config.ts).
export const metadata: Metadata = {
  metadataBase: new URL(ORIGIN),
  title,
  description,
  applicationName: "Carnet plein",
  alternates: { canonical: "/" },
  icons: { icon: "/carnet-plein/icon.svg", shortcut: "/carnet-plein/icon.svg", apple: "/carnet-plein/icon.svg" },
  openGraph: { title, description, url: "/", siteName: "Carnet plein", locale: "fr_FR", type: "website" },
  twitter: { card: "summary", title, description },
};

export default function CarnetPleinLayout({ children }: LayoutProps<"/carnet-plein">) {
  return <div className={`cp ${sans.variable} ${mono.variable}`}>{children}</div>;
}
