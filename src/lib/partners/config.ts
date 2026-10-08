/** Programme partenaires : adresses des deux sous-domaines et constantes partagées. */

const DEV = process.env.NODE_ENV !== "production";
// En local, admin.localhost et partenaires.localhost pointent sur le serveur de dev.
const devOrigin = (sub: string) => `http://${sub}.localhost:${process.env.PORT || 3000}`;
const origin = (override: string | undefined, sub: string) =>
  (override || (DEV ? devOrigin(sub) : `https://${sub}.visionbds.com`)).replace(/\/$/, "");

export const ADMIN_URL = origin(process.env.ADMIN_URL, "admin");
export const PARTNERS_URL = origin(process.env.PARTNERS_URL, "partenaires");

/** Reçoivent les notifications, et sont à mettre en copie des mises en relation. */
export const TEAM = [
  { name: "Julien Devoir", first: "Julien", email: "juliend@visionbds.com" },
  { name: "Clément Bernard", first: "Clément", email: "clementb@visionbds.com" },
];
export const TEAM_EMAILS = TEAM.map((t) => t.email);

/** Commission par défaut, en % du montant HT des contrats signés. */
export const COMMISSION_RATE = 15;

export const PROFILES = [
  "Expert-comptable",
  "Architecte ou maître d'œuvre",
  "Fournisseur ou négoce de matériaux",
  "Banque, assurance ou courtage",
  "Consultant ou formateur",
  "Dirigeant d'une entreprise du bâtiment",
  "Autre",
];
