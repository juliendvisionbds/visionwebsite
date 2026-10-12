import type { Niche } from "./index";

/**
 * Cuisinistes indépendants. L'angle : des heures passées sur des plans 3D pour des clients qui comparent, partent ou ne répondent plus.
 * On filtre avant la 3D, et on relance après. Les prix des écrans sont des exemples, à caler sur ceux du client lors de la démo.
 */
export const cuisiniste: Niche = {
  slug: "cuisiniste",
  vars: {
    metier: "cuisiniste indépendant",
    projet: "cuisine sur mesure",
    clientType: "un couple qui achète ou rénove une maison",
    momentDemande: "samedi après une visite chez une grande enseigne",
    mecanisme: "quiz « Votre cuisine, à quel budget ? » + fourchette + envoi de photos ou plan",
    rdv: "rendez-vous de conception en showroom (ou prise de cotes à domicile)",
    objectionCle: "le prix, la peur de la pression commerciale, « est-ce faisable dans ma pièce ? »",
    report: "« on attend la signature chez le notaire », « après les travaux »",
    saison: "rentrée (septembre-novembre) et début d’année ; à confirmer avec le client",
    sourceSpecifique: "foires et salons, prescription d’artisans et d’architectes",
    panier: 12000,
  },
  card: {
    name: "Cuisine sur mesure",
    short: "Cuisine",
    icon: "M4 11h20v12H4zM4 16h20M14 16v7M9 11V7h10v4M9 19.5h1M18 19.5h1",
  },
  seo: {
    title: "Carnet plein pour les cuisinistes indépendants",
    description:
      "Vos clients comparent trois cuisinistes. Carnet plein filtre les budgets avant votre première heure de conception, répond à chaque demande en moins d’une minute, et relance chaque projet remis jusqu’à la signature.",
  },
  cta: "Recevoir ma page cuisine refaite, gratuitement",
  hero: {
    kicker: "Pour les cuisinistes indépendants",
    title: "Arrêtez de dessiner des cuisines pour vos concurrents.",
    text: "Vos clients comparent trois cuisinistes. Carnet plein filtre les budgets avant votre première heure de conception, répond à chaque demande en moins d’une minute, et relance chaque projet remis jusqu’à la signature.",
    points: [
      "Vous connaissez le budget et la pièce avant le premier rendez-vous",
      "Chaque projet remis est relancé jusqu’à la décision",
      "Les clients qui attendent le notaire sont rappelés au bon moment",
    ],
    screen: {
      label: "Atelier Cuisine Martin",
      question: "Votre cuisine, à quel budget ?",
      ask: "Quelle taille de pièce ?",
      options: ["Moins de 8 m²", "8-15 m²", "Plus de 15 m²"],
      picked: 1,
      result: "Entre 10 000 et 16 000 € posée",
      note: "Photo de la pièce envoyée",
      cta: "Réserver un rendez-vous de conception",
    },
  },
  story: {
    title: "Trois heures sur la 3D. Puis plus de nouvelles.",
    text: [
      "Samedi, un couple sort d’une grande enseigne, un peu sonné par la « remise exceptionnelle valable aujourd’hui ». Il passe chez vous. Vous prenez les cotes, vous passez trois heures sur le projet, vous le remettez le mercredi. Puis plus rien. Trois semaines plus tard, vous apprenez qu’il a signé ailleurs, presque sur votre plan.",
      "Vous n’avez pas perdu sur la qualité. Vous avez perdu sur le suivi.",
    ],
    todayTitle: "Ce que vit votre client aujourd’hui",
    today: [
      "Aucun prix sur le site. Il ne sait pas si vous êtes à 8 000 ou à 30 000 €, alors il n’ose pas venir.",
      "Il remplit le formulaire, et personne ne répond avant lundi.",
      "Il reçoit trois projets, hésite, et seul le plus insistant le rappelle.",
      "Il dit « on attend la signature chez le notaire », et personne ne revient vers lui à la remise des clés.",
    ],
  },
  changes: [
    [
      "Vous savez à qui vous parlez avant de dessiner.",
      "Taille de la pièce, forme, style, électroménager, budget et délai, avec ses photos ou son plan.",
    ],
    [
      "Vos visiteurs voient un budget indicatif.",
      "Une fourchette qui rassure les bons clients et décourage ceux qui cherchent une cuisine à 3 000 €.",
    ],
    [
      "Chaque demande reçoit une réponse en moins d’une minute.",
      "Un SMS et un email à votre nom, avec un lien pour réserver un rendez-vous de conception.",
    ],
    [
      "Chaque projet remis est relancé sans pression.",
      "Des messages utiles, pas des fausses promos : ce qu’on peut ajuster, des réalisations proches, les délais de pose.",
    ],
    [
      "Les projets en attente reviennent au bon moment.",
      "Remise des clés, fin des travaux : le client reçoit un message à la date qu’il a donnée.",
    ],
  ],
  screens: {
    kicker: "Comment ça marche pour un cuisiniste",
    title: "Trois écrans, de la demande au rendez-vous de conception",
    quiz: {
      title: "Votre cuisine, à quel budget ?",
      questions: [
        ["Quelle forme ?", ["Linéaire", "En L", "En U", "Avec îlot", "Je ne sais pas"]],
        ["Quelle taille de pièce ?", ["Moins de 8 m²", "8-15 m²", "Plus de 15 m²"]],
        ["Avec l’électroménager ?", ["Oui, tout", "En partie", "Non, je l’ai déjà"]],
        ["Votre projet ?", ["Achat d’une maison", "Rénovation", "Construction neuve"]],
        ["Pour quand ?", ["Moins de 3 mois", "3-6 mois", "Je me renseigne"]],
        ["Une photo ou un plan de la pièce ?", [], "Facultatif"],
      ],
      result:
        "Pour une cuisine en L de 10 m² avec électroménager, nos projets se situent entre 10 000 et 16 000 € posés. Venez la concevoir avec nous, avec vos mesures.",
    },
    message:
      "Bonjour Julie, merci pour votre demande et vos photos ! Pour une cuisine en L de cette taille, nos projets vont de 10 000 à 16 000 € posés. Je vous propose un rendez-vous de conception au showroom : réservez ici [lien]. Pensez à venir avec vos mesures. Stéphane — Atelier Cuisine Martin",
    list: [
      ["Julie R.", "En L, 10 m², 10-16 k€, achat maison", "Conception samedi 14h"],
      ["M. et Mme B.", "Projet remis il y a 6 jours", "À rappeler aujourd’hui"],
      ["Karim S.", "Attend le notaire, clés en janvier", "Relance programmée le 6 janvier"],
    ],
  },
  followups: {
    title: "Vos projets remis, suivis jusqu’à la signature",
    intro: "La séquence démarre le jour où vous remettez le projet.",
    rows: [
      ["Jour de la remise", "Email", "Merci, récapitulatif du projet, ce qui est inclus (pose, électroménager, délais)"],
      ["J+2", "Email", "« Ce qu’on peut encore ajuster sur votre projet : façades, plan de travail, rangements »"],
      ["J+5", "SMS", "« Une question sur le projet ? Je vous rappelle quand vous voulez »"],
      ["J+10", "Email", "Trois réalisations proches de la sienne, avec avis clients"],
      ["J+21", "Email", "« On garde votre projet de côté ? Dites-nous quand revenir vers vous »"],
      ["Date choisie", "SMS + email", "« Vous nous aviez parlé de la remise des clés, c’est le bon moment pour lancer la commande »"],
    ],
    note: "Pas de fausse remise, pas d’offre qui expire ce soir. Vos clients viennent chez un indépendant pour ça.",
  },
  simulator: {
    questions: ["Combien de demandes de cuisine recevez-vous par mois ?", "Sur 10 projets remis, combien en signez-vous ?", "Combien vaut une cuisine en moyenne ?"],
    defaults: [20, 3, 12000],
    lead: "Signer 1 cuisine de plus par mois, c’est",
    tail: "L’installation de Carnet plein coûte",
    share: "moins de",
    unit: "d’une cuisine",
  },
  report: {
    title: "Chaque lundi, 5 chiffres par SMS",
    week: "Semaine du 12 oct.",
    figures: [
      ["Demandes", "6"],
      ["Rendez-vous de conception", "3"],
      ["Projets remis", "2"],
      ["Cuisines signées", "1"],
      ["Délai de réponse", "1 min"],
    ],
    note: "Si les rendez-vous montent et pas les signatures, on regarde ensemble où le projet coince.",
  },
  fit: {
    yes: [
      "Vous êtes cuisiniste indépendant, avec un showroom ou un atelier",
      "Vos cuisines dépassent 8 000 € posées",
      "Vous recevez déjà des demandes : site, fiche Google, salons, artisans qui vous recommandent",
      "Quelqu’un peut rappeler un client dans la journée",
    ],
    no: [
      "Vous êtes en franchise : les décisions et les outils viennent du réseau",
      "Vous vendez surtout des cuisines en kit sans pose",
      "Personne ne peut rappeler. On règle ça d’abord, ou on ne commence pas.",
    ],
  },
  faq: [
    [
      "Je ne veux pas afficher mes prix, chaque cuisine est unique.",
      "On affiche une fourchette par type de projet, pas un devis. Elle attire les bons budgets, et votre prix final reste le vôtre.",
    ],
    [
      "Mes clients veulent la 3D avant de s’engager.",
      "Vous la ferez toujours. Simplement pour des clients dont vous connaissez déjà le budget, la pièce et le délai.",
    ],
    [
      "J’ai déjà mon logiciel de conception.",
      "On n’y touche pas. Carnet plein gère ce qui se passe avant le rendez-vous et après la remise du projet.",
    ],
    [
      "Mes clients comparent avec les grandes enseignes.",
      "C’est votre avantage. Les relances jouent la clarté et l’absence de pression, là où les enseignes jouent la remise du jour.",
    ],
    ["Je dois refaire mon site ?", "Non. La page s’ajoute à votre site, avec un lien depuis votre bouton « devis »."],
  ],
  final: "Vos prochaines cuisines sont peut-être déjà dans vos projets remis.",
};
