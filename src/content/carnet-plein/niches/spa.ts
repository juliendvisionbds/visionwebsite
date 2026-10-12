import type { Niche } from "./index";

/** Installateurs de spas et saunas. Les prix des écrans sont des exemples, à caler sur ceux du client lors de la démo. */
export const spa: Niche = {
  slug: "spa",
  vars: {
    metier: "installateur de spa",
    projet: "spa",
    clientType: "un couple propriétaire d’une maison avec jardin",
    momentDemande: "dimanche soir, depuis le canapé",
    mecanisme: "quiz « Quel spa pour votre jardin ? » + fourchette de prix",
    rdv: "essai en showroom",
    objectionCle: "le prix, l’installation (dalle, électricité, accès)",
    report: "« on verra au printemps »",
    saison: "septembre-novembre (avant l’hiver), mars-avril",
    sourceSpecifique: "salons et foires (habitat, Foire de Paris)",
    panier: 9000,
  },
  card: {
    name: "Spa et sauna",
    short: "Spa",
    icon: "M4 14h20v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM9 5c0 2 2 2 2 4M14 4c0 2 2 2 2 4M19 5c0 2 2 2 2 4",
  },
  seo: {
    title: "Carnet plein pour les installateurs de spas et saunas",
    description:
      "Quand quelqu’un rêve d’un spa, il demande des prix à trois installateurs. Celui qui répond le premier, et qui relance, signe. Carnet plein fait en sorte que ce soit vous.",
  },
  cta: "Recevoir ma page spa refaite, gratuitement",
  hero: {
    kicker: "Pour les installateurs de spas et saunas",
    title: "Plus de spas installés. Pas plus de pub.",
    text: "Quand quelqu’un rêve d’un spa, il demande des prix à trois installateurs. Celui qui répond le premier, et qui relance, signe. Carnet plein fait en sorte que ce soit vous.",
    points: [
      "Réponse à chaque demande en moins d’une minute, même le dimanche soir",
      "Chaque devis relancé jusqu’à la réponse",
      "Les contacts de vos salons enfin rappelés",
    ],
    screen: {
      label: "Spa Azur",
      question: "Quel spa pour votre jardin ?",
      ask: "Combien de personnes ?",
      options: ["2-3", "4-5", "6 et plus"],
      picked: 1,
      result: "Entre 9 000 et 13 000 € posé",
      cta: "Réserver un essai en showroom",
    },
  },
  story: {
    title: "Ils voulaient un spa. Ils l’ont acheté ailleurs.",
    text: [
      "Dimanche soir, 21h. Claire et Thomas regardent des spas sur leur canapé. Ils remplissent le formulaire de trois installateurs. Lundi, vous êtes sur une pose à 40 km. Mardi, vous rappelez. Ils ont déjà pris rendez-vous dans un autre showroom.",
      "Vous n’avez rien fait de mal. Vous étiez juste en train de travailler.",
    ],
    todayTitle: "Ce que vit votre client aujourd’hui",
    today: [
      "Aucun prix sur le site. Il doit « demander un devis » sans savoir si c’est 5 000 ou 25 000 €.",
      "Le formulaire part, et rien ne revient avant le lendemain.",
      "Il reçoit le devis, hésite, et personne ne le relance.",
      "Il dit « on verra au printemps », et au printemps personne ne le rappelle.",
    ],
  },
  changes: [
    [
      "Vos visiteurs voient un prix en 30 secondes.",
      "Cinq questions sur leur jardin et leurs envies, puis la fourchette de prix du modèle qui leur correspond.",
    ],
    [
      "Chaque demande reçoit une réponse en moins d’une minute.",
      "Un SMS et un email à votre nom, avec un lien pour réserver un essai en showroom.",
    ],
    [
      "Chaque devis est relancé jusqu’à la décision.",
      "Trois relances qui répondent aux vraies questions : la dalle, l’électricité, l’entretien, la consommation.",
    ],
    ["Les « on verra au printemps » ne sont plus perdus.", "Le client reçoit un message à la date qu’il a donnée."],
    [
      "Les contacts de vos salons sont relancés dès le lundi.",
      "Vous scannez ou saisissez la fiche, la suite part toute seule.",
    ],
  ],
  screens: {
    kicker: "Comment ça marche pour un installateur de spa",
    title: "Trois écrans, de la demande à l’essai en showroom",
    quiz: {
      title: "Quel spa pour votre jardin ?",
      questions: [
        ["Combien de personnes ?", ["2-3", "4-5", "6 et plus"]],
        ["Pour quoi faire ?", ["Détente", "Sport et récupération", "En famille avec les enfants"]],
        ["Où l’installer ?", ["Terrasse", "Jardin", "Intérieur", "Je ne sais pas encore"]],
        ["Votre budget ?", ["Moins de 8 000 €", "8-15 000 €", "Plus de 15 000 €"]],
        ["Pour quand ?", ["Avant l’hiver", "Au printemps", "Je me renseigne"]],
      ],
      result: "Pour 4 personnes, en détente sur une terrasse, comptez entre 9 000 et 13 000 € posé. Venez l’essayer en showroom.",
    },
    message:
      "Bonjour Claire, merci pour votre demande ! Pour 4 personnes en terrasse, nos modèles vont de 9 000 à 13 000 € posés. Le mieux est de les essayer : réservez votre créneau ici [lien]. À très vite, Marc — Spa Azur",
    list: [
      ["Claire D.", "4 places, terrasse, 8-15 k€", "Essai samedi 10h"],
      ["Patrick L.", "Devis envoyé il y a 5 jours", "À rappeler aujourd’hui"],
      ["Famille M.", "Contact Foire de Lyon", "Relance J+2 partie"],
    ],
  },
  followups: {
    title: "Vos devis relancés, sans que vous y pensiez",
    rows: [
      ["Immédiat", "SMS + email", "Merci, fourchette de prix, lien pour réserver l’essai"],
      ["J+2", "Email", "« Installer un spa : la dalle, l’électricité, l’accès, ce qu’il faut prévoir »"],
      ["J+5", "SMS", "« Une question sur le devis ? Je vous rappelle quand vous voulez »"],
      ["J+10", "Email", "Photos d’installations récentes et avis clients"],
      ["J+21", "Email", "« On garde votre projet de côté ? Dites-nous quand revenir vers vous »"],
      ["Date choisie", "SMS + email", "« Vous nous aviez dit le printemps, c’est le moment »"],
    ],
    note: "Les messages sont écrits avec vous, à votre nom. Si le client répond ou signe, les relances s’arrêtent.",
  },
  simulator: {
    questions: ["Combien de demandes de spa recevez-vous par mois ?", "Sur 10 devis, combien en signez-vous ?", "Combien vaut un spa installé en moyenne ?"],
    defaults: [25, 3, 9000],
    lead: "Installer 1 spa de plus par mois, c’est",
    tail: "L’installation de Carnet plein coûte",
    share: "soit",
    unit: "d’un spa",
  },
  report: {
    title: "Chaque lundi, 5 chiffres par SMS",
    week: "Semaine du 12 oct.",
    figures: [
      ["Demandes", "7"],
      ["Essais réservés", "4"],
      ["Devis envoyés", "3"],
      ["Spas signés", "1"],
      ["Délai de réponse", "1 min"],
    ],
    note: "Si les demandes montent et pas les signatures, on regarde ensemble ce qui bloque.",
  },
  fit: {
    yes: [
      "Vous installez des spas, saunas ou spas de nage, avec un showroom ou en pose directe",
      "Vous recevez déjà des demandes : site, fiche Google, salons, bouche-à-oreille",
      "Vous êtes de 2 à 20 personnes, et c’est vous qui décidez",
      "Quelqu’un peut rappeler un client dans la journée",
    ],
    no: [
      "Vous vendez uniquement en ligne, sans installation",
      "Votre réseau ou votre marque vous impose déjà ses outils de suivi",
      "Personne ne peut rappeler. On règle ça d’abord, ou on ne commence pas.",
    ],
  },
  faq: [
    [
      "Je ne veux pas afficher mes prix, ça dépend du terrain.",
      "On affiche une fourchette, pas un devis. Elle rassure le client et filtre ceux qui n’ont pas le budget. Le prix final reste le vôtre.",
    ],
    ["Je vends plusieurs marques.", "Le quiz oriente vers un type de spa, pas une marque. Vous choisissez quoi proposer en showroom."],
    [
      "Le spa, c’est saisonnier.",
      "Justement : les relances sont calées sur l’automne et le printemps, quand vos clients se décident.",
    ],
    [
      "Je fais déjà beaucoup de salons.",
      "Vos fiches de salon entrent dans la même relance. C’est souvent là que dorment le plus de ventes.",
    ],
    ["Je dois refaire mon site ?", "Non. La page s’ajoute à votre site existant, avec un lien depuis votre bouton « devis »."],
  ],
  final: "Vos prochains spas sont peut-être déjà dans vos demandes.",
};
