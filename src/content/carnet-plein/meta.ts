/**
 * Carnet plein : contenus communs et contenus de la home, servis sur carnetplein.visionbtp.com.
 * Les pages métier ont leurs textes dans ./niches.
 *
 * Règles d'écriture, valables pour toute la page hors FAQ :
 * - « projet » plutôt que « chantier » ; « demande », « devis », « rendez-vous », « signer » partout.
 * - Mots bannis : CRM, pipeline, qualifier, conversion, parcours, sous-domaine, automatisation, piloter, IA.
 * - Chaque phrase doit pouvoir être répétée par le patron à son associé sans la reformuler.
 */

export const ORIGIN = "https://carnetplein.visionbtp.com";

export const title = "Carnet plein : signez plus de projets avec les demandes que vous recevez déjà";
export const description =
  "Carnet plein répond à chaque demande en moins d’une minute, relance chaque devis à votre place et vous dit chaque lundi ce qui marche. Pour les entreprises qui vendent des projets à plus de 1 000 €.";

/** Tarifs HT, en euros : affichés dans la grille et repris par le simulateur. */
export const PRICES = { install: 970, monthly: 490 };

/** Montant en euros, espace fine entre les milliers. Écrit à la main : même rendu côté serveur et navigateur. */
export const euro = (n: number) => `${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f")}\u00a0€`;

/** Espaces insécables de la typographie française : après « ; avant » : ; ? ! € × ; dans les nombres (1 000) et entre un nombre et le mot qu'il compte (5 chiffres, 9 h). */
export const fr = (s: string) =>
  s
    .replace(/« /g, "«\u00a0")
    .replace(/ ([»:;?!€×])/g, "\u00a0$1")
    .replace(/(\d) (?=\d{3}\b|[a-zà-ÿœ])/gi, "$1\u00a0");

/** Un écran de téléphone d'exemple : la question posée au visiteur, sa réponse, le prix indicatif et le rendez-vous proposé. `note` : une mention sous le résultat (pièce jointe, certification). */
export type Screen = { label: string; question: string; ask: string; options: string[]; picked: number; result: string; cta: string; note?: string };

/** Libellé du bouton de démo, sur la home. */
export const DEMO_CTA = "Recevoir ma page refaite, gratuitement";

export const HERO_POINTS = [
  "Réponse à chaque demande en moins d’une minute, même le dimanche",
  "Chaque devis relancé jusqu’à la réponse",
  "Installé en 2 semaines, sans refaire votre site",
];

/** Ce qui change chez le client : le résultat en gras, puis comment. */
export const CHANGES: Array<[lead: string, text: string]> = [
  [
    "Vos visiteurs voient un prix indicatif en 30 secondes.",
    "Quelques questions sur leur projet, une fourchette de prix, un créneau à réserver.",
  ],
  ["Chaque demande reçoit une réponse en moins d’une minute.", "SMS et email à votre nom, même quand vous êtes occupé."],
  [
    "Chaque devis est relancé sans que vous y pensiez.",
    "Trois relances, puis un rappel à la date choisie par ceux qui veulent attendre.",
  ],
  ["Chaque matin, vous savez qui rappeler.", "Une liste courte, avec le projet, le budget et la prochaine étape."],
  ["Chaque lundi, 5 chiffres par SMS.", "Demandes, rendez-vous, devis, signatures, délai de réponse."],
];

/** Le même principe décliné par métier : les lignes du tableau de la home. */
export const TRADES: Array<{ trade: string; sees: string; meeting: string }> = [
  { trade: "Spa", sees: "« Quel spa pour mon jardin ? » + fourchette de prix", meeting: "Essai en showroom" },
  { trade: "Panneaux solaires", sees: "« Combien j’économise ? »", meeting: "Visite technique" },
  { trade: "Cuisine", sees: "Budget indicatif selon la taille et le style", meeting: "Rendez-vous en showroom" },
  { trade: "Lieu de réception", sees: "Disponibilité de la date + prix indicatif", meeting: "Visite du domaine" },
];

/** Simulateur de la home : trois questions préremplies, une phrase en sortie. */
export const SIMULATOR = {
  questions: ["Combien de demandes recevez-vous par mois ?", "Sur 10 devis, combien en signez-vous ?", "Combien vaut un projet en moyenne ?"] as [string, string, string],
  defaults: [30, 3, 10000] as [number, number, number],
  lead: "Signer 1 projet de plus par mois, c’est",
  tail: "L’installation coûte",
};

export const FOR_YOU = [
  "Un projet ou une prestation vaut 1 000 € ou plus, ou revient chaque année.",
  "Des gens vous cherchent déjà : pub, fiche Google, bouche-à-oreille, véhicules.",
  "C’est vous qui décidez, avec une équipe de 2 à 20 personnes.",
  "Quelqu’un peut rappeler une demande dans l’heure.",
];

export const NOT_FOR_YOU = [
  "Restaurants et commerces : les marges sont trop fines pour que le calcul tienne.",
  "Paniers de moins de 200 €.",
  "Franchises : la décision se prend au siège.",
  "Personne pour décrocher. On règle ça d’abord, ou on ne commence pas.",
];

export const NO_PROMISE: Array<[title: string, text: string]> = [
  ["Pas de chiffre d’affaires garanti", "On s’engage sur ce qu’on construit et sur ce qu’on mesure. Le téléphone, c’est vous qui y répondez."],
  ["Pas de trafic en plus", "On ne vend ni publicité ni référencement. On fait rendre davantage ce que vous payez déjà."],
  ["Pas plus de demandes que vous ne pouvez en traiter", "Une bonne page devant une entreprise qui ne rappelle pas, ça dessert tout le monde. On commence par la relance."],
];

/** Grille tarifaire, identique sur la home et sur les pages métier. */
export const PRICING = {
  demo: "On refait votre prise de contact dans vos couleurs, vous la regardez, on en parle 15 minutes si elle vous plaît.",
  install: [
    "Votre page de demande, avec vos prix, vos photos et vos mots",
    "Une réponse à chaque demande en moins d’une minute",
    "Vos devis relancés, avec des messages écrits avec vous",
    "Votre liste du matin : qui rappeler, et pourquoi",
    "En place en 2 semaines, sans refaire votre site",
  ],
  monthly: ["Chaque lundi, vos 5 chiffres par SMS", "Vos messages ajustés selon ce qui marche", "Vous arrêtez quand vous voulez"],
};

/** FAQ de la home : rendue dans la page ET dans le JSON-LD FAQPage. Seul endroit où les mots techniques sont permis. */
export const faq: Array<[question: string, answer: string]> = [
  ["Je dois refaire mon site ?", "Non. La page s’ajoute à votre site existant, avec un lien depuis votre bouton « devis »."],
  [
    "Je ne fais pas de pub en ligne. Ça vaut quand même le coup ?",
    "Oui, si vous recevez déjà des demandes : site, fiche Google, salons, bouche-à-oreille. Si presque personne ne vous écrit, on vous le dit à la démo et on ne vous vend rien.",
  ],
  [
    "Vous utilisez l’intelligence artificielle ?",
    "Oui, pour construire vite et pour écrire les messages avec vous. Mais ce que vous achetez, ce sont des projets signés, pas une technologie.",
  ],
  [
    "Qu’est-ce que vous attendez de moi ?",
    "Vos prix, vos photos, et une heure pour écrire les messages avec vous. Et que quelqu’un rappelle les clients dans la journée : c’est la seule partie qu’on ne peut pas faire à votre place.",
  ],
  [
    "Et si ça ne donne rien ?",
    "Vous le voyez dans les chiffres du lundi, et vous arrêtez le suivi quand vous voulez. On ne garantit pas un chiffre d’affaires : on s’engage sur ce qu’on installe et sur ce qu’on mesure.",
  ],
  [
    "C’est quoi, techniquement ?",
    "Une page de demande ajoutée à votre site, un CRM qui range chaque demande avec sa prochaine étape, et des automatisations qui envoient les réponses et les relances par SMS et par email. On installe et on règle le tout pour vous.",
  ],
  [
    "Qui est derrière Carnet plein ?",
    "vision, une agence fondée par trois associés : Julien Devoir, Clément Samson et Clément Bernard. Ce sont eux qui préparent votre démo et qui installent.",
  ],
];
