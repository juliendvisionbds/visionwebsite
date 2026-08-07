import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Pas d'export statique : /api/send-form a besoin d'un vrai serveur
  // Next.js (Route Handler) pour lire le corps des requêtes POST.
  trailingSlash: true,
};

export default nextConfig;
