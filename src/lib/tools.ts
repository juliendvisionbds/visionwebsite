/**
 * Outils gratuits du site : source unique pour le menu « Outils gratuits » (load-content.ts)
 * et pour les modules « contenus similaires » (related.ts).
 *
 * topics : thèmes de l'outil, du plus important au moins important. Les mêmes mots-clés servent
 * dans l'en-tête des articles et des cas d'usage (ligne `topics:`) pour relier les contenus entre eux.
 * Thèmes utilisés : devis, prix, relance, facturation, planning, chantier, pilotage, appels-offres.
 */
export type Tool = {
  /** Dossier de la page dans src/content (absent pour le diagnostic, qui est le quiz). */
  id?: string;
  href: string;
  title: string;
  text: string;
  topics: string[];
};

export const TOOLS: Tool[] = [
  { id: "analyse-appel-offres", href: "/outils/analyse-appel-offres", title: "Analyse express d'un appel d'offres", text: "Le règlement de consultation en une fiche : dates, lots, critères, pièces.", topics: ["appels-offres"] },
  { id: "fiche-chiffrage", href: "/outils/fiche-chiffrage", title: "Demande client → fiche de chiffrage", text: "Travaux, quantités, contraintes, ce qui manque, et le mail de questions.", topics: ["devis", "prix"] },
  { id: "relance-devis", href: "/outils/relance-devis", title: "Relance de devis sans réponse", text: "Le bon message au bon moment, mail, SMS et script d'appel.", topics: ["relance", "devis"] },
  { id: "relance-impayes", href: "/outils/relance-impayes", title: "Relance de facture impayée", text: "Le bon message, les pénalités calculées, la prochaine étape datée.", topics: ["relance", "facturation"] },
  { id: "compte-rendu-chantier", href: "/outils/compte-rendu-chantier", title: "Compte rendu de chantier", text: "Vos notes brutes en compte rendu prêt à envoyer.", topics: ["chantier", "planning"] },
  { id: "debourse-sec", href: "/outils/debourse-sec", title: "Calculateur de déboursé sec", text: "Matériaux, main-d'œuvre, matériel, sous-traitance : le coût direct du chantier.", topics: ["prix", "devis"] },
  { href: "/commencer", title: "Diagnostic IA de votre entreprise", text: "7 questions, 2 minutes : vos 3 priorités à automatiser.", topics: [] },
];

/** Identifiants de pages (src/content/<id>) qui sont des pages d'outil. */
export const TOOL_IDS = new Set(TOOLS.flatMap((t) => (t.id ? [t.id] : [])));
