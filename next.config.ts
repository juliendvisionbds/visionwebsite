import type { NextConfig } from "next";

// Sous-domaines servis par cette même application : admin.visionbtp.com → src/app/admin,
// partenaires.visionbtp.com → src/app/portail, carnetplein.visionbtp.com → src/app/carnet-plein.
// En local : admin.localhost, partenaires.localhost et carnetplein.localhost.
// `noindex` : l'en-tête X-Robots-Tag garde le sous-domaine hors des moteurs de recherche.
const SUBDOMAINS = [
  { host: "admin", prefix: "/admin", noindex: true },
  { host: "partenaires", prefix: "/portail", noindex: true },
  // Offre Carnet plein : à passer à `noindex: false` le jour du lancement.
  { host: "carnetplein", prefix: "/carnet-plein", noindex: true },
];
const subOrigin = (host: string) =>
  process.env.NODE_ENV === "production" ? `https://${host}.visionbtp.com` : `http://${host}.localhost:${process.env.PORT || 3000}`;
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
      // L'admin, l'espace partenaires et Carnet plein ne se consultent que sur leur sous-domaine.
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
    return SUBDOMAINS.filter((s) => s.noindex).map(({ host }) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: `${host}\\..+` }],
      headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
    }));
  },
};

export default nextConfig;
