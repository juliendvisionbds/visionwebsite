import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Pas d'export statique : /api/send-form a besoin d'un vrai serveur
  // Next.js (Route Handler) pour lire le corps des requêtes POST.
  trailingSlash: true,
  // Les cas clients ont quitté /cas (désormais réservé aux cas d'usage) pour /clients.
  async redirects() {
    return ["devis", "tableau-de-bord"].map((slug) => ({
      source: `/cas/${slug}`,
      destination: `/clients/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
