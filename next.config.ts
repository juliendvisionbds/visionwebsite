import type { NextConfig } from "next";

// Sous-domaines servis par cette même application : admin.visionbds.com → src/app/admin,
// partenaires.visionbds.com → src/app/portail. En local : admin.localhost et partenaires.localhost.
const SUBDOMAINS = [
  { host: "admin", prefix: "/admin" },
  { host: "partenaires", prefix: "/portail" },
];
const subOrigin = (host: string) =>
  process.env.NODE_ENV === "production" ? `https://${host}.visionbds.com` : `http://${host}.localhost:${process.env.PORT || 3000}`;
// Tout sauf /_next, /api et les fichiers statiques (dernier segment avec une extension).
const APP_PATH = "/:path((?!_next/|api/)(?:[^/]+/)*[^/.]*)";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Pas d'export statique : /api/send-form a besoin d'un vrai serveur
  // Next.js (Route Handler) pour lire le corps des requêtes POST.
  trailingSlash: true,
  // En dev, les sous-domaines locaux chargent aussi les ressources /_next.
  allowedDevOrigins: SUBDOMAINS.map(({ host }) => `${host}.localhost`),
  async redirects() {
    return [
      // Les cas clients ont quitté /cas (désormais réservé aux cas d'usage) pour /clients.
      ...["devis", "tableau-de-bord"].map((slug) => ({
        source: `/cas/${slug}`,
        destination: `/clients/${slug}`,
        permanent: true,
      })),
      // L'admin et l'espace partenaires ne se consultent que sur leur sous-domaine.
      ...SUBDOMAINS.map(({ host, prefix }) => ({
        source: `${prefix}/:path*`,
        missing: [{ type: "host" as const, value: `${host}\\..+` }],
        destination: `${subOrigin(host)}/:path*`,
        permanent: false,
      })),
    ];
  },
  async rewrites() {
    return {
      beforeFiles: SUBDOMAINS.map(({ host, prefix }) => ({
        source: APP_PATH,
        has: [{ type: "host" as const, value: `${host}\\..+` }],
        destination: `${prefix}/:path`,
      })),
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return SUBDOMAINS.map(({ host }) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: `${host}\\..+` }],
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};

export default nextConfig;
