import type { Niche } from "./index";

/**
 * Installateurs de panneaux solaires (RGE / QualiPV). L'angle : la confiance. Les clients se méfient, les aides ont changé,
 * le démarchage est interdit : celui qui répond vite, clairement et sans pression gagne le projet.
 * La page ne promet aucune économie : seul un ordre de puissance et de budget est affiché, le chiffre vient de la visite.
 * Les repères réglementaires cités (prime, TVA, démarchage) datent de 2026 : à tenir à jour.
 */
export const solaire: Niche = {
  slug: "solaire",
  vars: {
    metier: "installateur de panneaux solaires (RGE / QualiPV)",
    projet: "installation solaire",
    clientType: "un propriétaire de maison individuelle, facture d’électricité élevée",
    momentDemande: "le soir, juste après avoir ouvert sa facture d’électricité",
    mecanisme: "simulation « Combien vous pourriez économiser ? » + puissance conseillée + budget indicatif",
    rdv: "visite technique gratuite (étude de la toiture)",
    objectionCle: "la peur de l’arnaque, « est-ce encore rentable sans la prime ? », le prix",
    report: "« on attend de voir les aides », « on refait la toiture d’abord », « après l’hiver »",
    saison: "fin d’hiver et printemps, et chaque annonce de hausse du prix de l’électricité ; à confirmer avec le client",
    sourceSpecifique: "contacts achetés à des plateformes (souvent envoyés à plusieurs installateurs), parrainage, foires",
    panier: 11000,
  },
  card: {
    name: "Panneaux solaires",
    short: "Solaire",
    icon: "M5 23l3-10h12l3 10zM9.5 18h9M14 13v10M14 3v3M6.5 6l2 2M21.5 6l-2 2",
  },
  seo: {
    title: "Carnet plein pour les installateurs solaires RGE",
    description:
      "Le démarchage est interdit, la prime a disparu, et vos clients comparent trois installateurs. Carnet plein répond à chaque demande en moins d’une minute, explique sans jargon, et relance chaque devis jusqu’à la décision.",
  },
  cta: "Recevoir ma page solaire refaite, gratuitement",
  hero: {
    kicker: "Pour les installateurs solaires RGE",
    title: "Vos clients ont peur de se faire avoir. Soyez celui qui répond clairement.",
    text: "Le démarchage est interdit, la prime a disparu, et vos clients comparent trois installateurs. Carnet plein répond à chaque demande en moins d’une minute, explique sans jargon, et relance chaque devis jusqu’à la décision.",
    points: [
      "Réponse en moins d’une minute, avant les deux autres installateurs",
      "Vous savez avant la visite si le client est propriétaire et si son toit convient",
      "Chaque devis relancé, sans pression et sans compte à rebours",
    ],
    screen: {
      label: "Soleil du Sud",
      question: "Combien pourriez-vous économiser ?",
      ask: "Votre facture d’électricité par mois ?",
      options: ["Moins de 100 €", "100-200 €", "Plus de 200 €"],
      picked: 1,
      result: "Environ 6 kWc, autour de 10 000 à 15 000 € posée",
      note: "Votre numéro RGE, bien visible",
      cta: "Réserver la visite technique gratuite",
    },
  },
  story: {
    title: "Il a signé avec celui qui a répondu en premier.",
    text: [
      "Mardi soir, M. et Mme Lefèvre ouvrent leur facture d’électricité. Ils remplissent le formulaire de trois installateurs. Mercredi 9h, l’un d’eux les rappelle, explique que la prime n’existe plus mais que l’autoconsommation reste intéressante, et propose une visite samedi. Vous rappelez jeudi. Ils ont déjà leur rendez-vous.",
      "Dans un secteur où les clients ont peur des arnaques, le premier qui répond clairement gagne leur confiance.",
    ],
    todayTitle: "Ce que vit votre client aujourd’hui",
    today: [
      "Il a entendu parler d’arnaques et se méfie de tout le monde, vous compris.",
      "Il ne sait plus quelles aides existent, ni si c’est encore rentable.",
      "Aucun ordre de prix sur le site. Il doit « demander une étude » et attendre.",
      "Il reçoit le devis, hésite, et personne ne répond à ses questions sans qu’il ait à rappeler.",
    ],
  },
  changes: [
    [
      "Vos visiteurs voient un ordre de prix en 1 minute.",
      "Facture, type de toit, orientation, usages : une puissance conseillée et un budget indicatif, confirmés ensuite en visite.",
    ],
    [
      "Vous écartez les projets impossibles avant de vous déplacer.",
      "Locataires, appartements, toits inadaptés : vous le savez avant la visite.",
    ],
    [
      "Chaque demande reçoit une réponse en moins d’une minute.",
      "Un SMS et un email à votre nom, avec votre certification et un lien pour réserver la visite technique.",
    ],
    [
      "Chaque devis est suivi par des messages utiles.",
      "Ce qui a changé en 2026, comment lire un devis, comment vérifier un installateur. Votre sérieux devient votre argument.",
    ],
    ["Les « on verra après l’hiver » ne sont plus perdus.", "Le client reçoit un message à la date qu’il a donnée."],
  ],
  screens: {
    kicker: "Comment ça marche pour un installateur solaire",
    title: "Trois écrans, de la facture à la visite technique",
    quiz: {
      title: "Combien pourriez-vous économiser ?",
      questions: [
        ["Vous êtes ?", ["Propriétaire d’une maison", "Propriétaire d’un appartement", "Locataire"]],
        ["Votre facture d’électricité par mois ?", ["Moins de 100 €", "100-200 €", "Plus de 200 €"]],
        ["Votre toit ?", ["Tuiles", "Ardoises", "Toit plat", "Je ne sais pas"]],
        ["Son orientation ?", ["Sud", "Est ou Ouest", "Nord", "Je ne sais pas"]],
        ["Vous avez ?", ["Chauffage électrique", "Voiture électrique", "Piscine", "Rien de tout ça"]],
        ["Pour quand ?", ["Moins de 3 mois", "3-6 mois", "Je me renseigne"]],
      ],
      result:
        "Pour votre consommation, une installation d’environ 6 kWc est un bon point de départ, autour de 10 000 à 15 000 € posée. Votre économie réelle dépend de votre toit : on la calcule ensemble lors d’une visite technique gratuite.",
    },
    message:
      "Bonjour M. Lefèvre, merci pour votre demande. Pour votre maison, on part sur environ 6 kWc. Pour chiffrer votre économie réelle, il faut voir votre toit : réservez la visite technique gratuite ici [lien]. Aucun engagement, aucun paiement avant le devis signé. Nicolas — Soleil du Sud, installateur RGE",
    list: [
      ["M. Lefèvre", "Maison, 180 €/mois, toit sud, VE", "Visite samedi 10h"],
      ["Mme Garnier", "Devis 6 kWc envoyé il y a 5 jours", "À rappeler aujourd’hui"],
      ["M. Diallo", "Refait sa toiture d’abord, fin mars", "Relance programmée le 1er avril"],
    ],
  },
  followups: {
    title: "Vos devis suivis, sans pression",
    rows: [
      ["Immédiat", "SMS + email", "Merci, puissance conseillée, lien pour réserver la visite technique"],
      ["Jour de l’envoi du devis", "Email", "Récapitulatif clair : puissance, production estimée, TVA appliquée et pourquoi"],
      ["J+2", "Email", "« Prime supprimée, TVA à 5,5 % : ce qui a changé en 2026, et ce que ça change pour vous »"],
      ["J+5", "SMS", "« Une question sur le devis ? Je vous rappelle quand vous voulez »"],
      ["J+10", "Email", "« Comment vérifier un installateur : RGE, assurance décennale, avis » + vos installations récentes"],
      ["J+21", "Email", "« On garde votre projet de côté ? Dites-nous quand revenir vers vous »"],
      ["Date choisie", "SMS + email", "« Vous nous aviez dit après l’hiver, c’est le bon moment pour la visite »"],
    ],
    note: "Pas de « offre valable aujourd’hui », pas de promesse de rentabilité. Dans ce secteur, c’est ce qui vous distingue.",
  },
  simulator: {
    questions: ["Combien de demandes recevez-vous par mois ?", "Sur 10 devis, combien en signez-vous ?", "Combien vaut une installation en moyenne ?"],
    defaults: [30, 2, 11000],
    lead: "Signer 1 installation de plus par mois, c’est",
    tail: "L’installation de Carnet plein coûte",
    share: "moins de",
    unit: "d’une installation",
  },
  report: {
    title: "Chaque lundi, 5 chiffres par SMS",
    week: "Semaine du 12 oct.",
    figures: [
      ["Demandes", "9"],
      ["Visites réservées", "4"],
      ["Devis envoyés", "3"],
      ["Installations signées", "1"],
      ["Délai de réponse", "1 min"],
    ],
    note: "Si les demandes montent et pas les visites, on regarde ensemble où ça coince.",
  },
  fit: {
    yes: [
      "Vous êtes installateur indépendant, certifié RGE ou QualiPV, sur du résidentiel",
      "Vous recevez déjà des demandes : site, fiche Google, plateformes, parrainage",
      "Vous êtes de 2 à 20 personnes, et c’est vous qui décidez",
      "Quelqu’un peut rappeler un client dans la journée",
    ],
    no: [
      "Votre modèle repose sur le démarchage à domicile ou téléphonique",
      "Vous êtes en franchise ou dans un réseau qui impose ses outils",
      "Personne ne peut rappeler. On règle ça d’abord, ou on ne commence pas.",
    ],
  },
  faq: [
    [
      "Mes clients demandent si c’est encore rentable sans la prime.",
      "Les messages l’expliquent simplement : l’économie vient de ce qu’on ne paie plus à son fournisseur. Le chiffre précis vient de votre visite, jamais d’une promesse en ligne.",
    ],
    [
      "La simulation, c’est fiable ?",
      "Elle donne une puissance et un budget indicatifs. Elle ne promet aucune économie : c’est votre visite qui la chiffre.",
    ],
    [
      "J’achète déjà des contacts à des plateformes.",
      "Ils sont souvent envoyés à plusieurs installateurs. Répondre en moins d’une minute fait souvent la différence, et les relances rentabilisent ce que vous payez déjà.",
    ],
    [
      "Je ne veux pas ressembler aux vendeurs agressifs.",
      "Tout part à votre nom, avec votre certification. Pas de compte à rebours, pas de fausse urgence.",
    ],
    ["Je dois refaire mon site ?", "Non. La page s’ajoute à votre site, avec un lien depuis votre bouton « étude gratuite »."],
  ],
  final: "Vos prochaines installations sont peut-être déjà dans vos demandes.",
};
