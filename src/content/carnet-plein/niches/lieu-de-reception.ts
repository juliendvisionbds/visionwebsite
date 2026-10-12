import type { Niche } from "./index";

/**
 * Domaines, châteaux et salles de réception privées. L'angle : le samedi où l'on reçoit un mariage est aussi le jour où les futurs
 * mariés écrivent. Et quand une date est prise, le couple part, alors que le vendredi d'à côté est libre.
 * Les prix des écrans sont des exemples, à caler sur ceux du client lors de la démo.
 */
export const lieuDeReception: Niche = {
  slug: "lieu-de-reception",
  vars: {
    metier: "domaine, château ou salle de réception privée",
    projet: "mariage (et événements privés ou séminaires en semaine)",
    clientType: "un couple fiancé depuis peu, souvent accompagné des parents qui financent",
    momentDemande: "dimanche soir, après avoir fait la liste des lieux avec la famille",
    mecanisme: "« Votre date est-elle libre ? » : disponibilité + prix indicatif selon la date et le nombre d’invités",
    rdv: "visite du domaine",
    objectionCle: "le budget total, la date, la capacité et l’hébergement, le traiteur libre ou imposé",
    report: "« on fixe la date avec la famille », « on visite d’autres lieux », « on attend le devis du traiteur »",
    saison: "après les fiançailles des fêtes, de janvier à mars, et pendant les salons du mariage ; à confirmer avec le client",
    sourceSpecifique:
      "plateformes de lieux (contacts partagés entre plusieurs lieux), salons du mariage, Instagram, recommandation des prestataires",
    panier: 7000,
  },
  card: {
    name: "Lieu de réception",
    short: "Réception",
    icon: "M4 23V12l10-7 10 7v11zM11 23v-6h6v6M14 5V2M14 2h4l-1.2 1.5L18 5h-4",
  },
  seo: {
    title: "Carnet plein pour les domaines et lieux de réception",
    description:
      "Les couples écrivent à dix lieux en même temps, souvent le week-end où vous recevez un mariage. Carnet plein leur répond en moins d’une minute, propose une visite, et relance chaque option jusqu’à la réservation.",
  },
  cta: "Recevoir ma page refaite, gratuitement",
  hero: {
    kicker: "Pour les domaines et lieux de réception",
    title: "Plus de dates réservées. Pas plus de pub.",
    text: "Les couples écrivent à dix lieux en même temps, souvent le week-end où vous recevez un mariage. Carnet plein leur répond en moins d’une minute, propose une visite, et relance chaque option jusqu’à la réservation.",
    points: [
      "Les couples savent tout de suite si leur date est libre, et à quel prix",
      "Une date déjà prise ? Une date proche leur est proposée automatiquement",
      "Chaque option relancée avant qu’elle n’expire",
    ],
    screen: {
      label: "Domaine des Tilleuls",
      question: "Votre date est-elle libre ?",
      ask: "Juin 2027",
      options: ["Vendredi 12 : libre", "Samedi 13 : déjà réservé", "Samedi 19 : libre"],
      picked: 0,
      result: "Pour 120 invités, entre 6 500 et 8 000 €",
      cta: "Réserver une visite du domaine",
    },
  },
  story: {
    title: "Samedi, vous receviez un mariage. Six couples vous ont écrit.",
    text: [
      "Samedi, vous gérez 120 invités, le traiteur et le DJ. Pendant ce temps, six couples remplissent votre formulaire. Lundi, vous répondez enfin. Deux ont déjà visité un autre domaine dimanche. Un troisième voulait le 13 juin, déjà pris : vous ne lui avez pas proposé le vendredi 12, qui était libre.",
      "Vos meilleurs week-ends sont aussi ceux où vous perdez le plus de demandes.",
    ],
    todayTitle: "Ce que vit votre client aujourd’hui",
    today: [
      "Il ne sait pas si sa date est libre. Il doit écrire et attendre.",
      "Il reçoit une brochure PDF de 20 pages, sans prix clair pour sa date et son nombre d’invités.",
      "Sa date est prise, on le lui dit, et la conversation s’arrête là.",
      "Il pose une option, hésite, et personne ne lui rappelle qu’elle expire.",
    ],
  },
  changes: [
    [
      "Les couples vérifient leur date en 30 secondes.",
      "Date, nombre d’invités, hébergement souhaité : ils voient si c’est libre et un prix indicatif.",
    ],
    [
      "Une date prise devient une autre réservation.",
      "Le couple reçoit automatiquement les dates proches encore libres, comme un vendredi, un dimanche ou un mois moins demandé.",
    ],
    [
      "Chaque demande reçoit une réponse en moins d’une minute, même pendant vos événements.",
      "Un SMS et un email à votre nom, avec un lien pour réserver la visite.",
    ],
    [
      "Chaque option est relancée avant son expiration.",
      "Le couple sait combien de temps la date lui est gardée, et vous savez quand la remettre en vente.",
    ],
    [
      "Vos jours creux se remplissent aussi.",
      "Les demandes d’anniversaires, de baptêmes et de séminaires sont traitées de la même façon, en semaine.",
    ],
  ],
  screens: {
    kicker: "Comment ça marche pour un lieu de réception",
    title: "Trois écrans, de la date à la visite",
    visitor: "Ce que voit le couple",
    quiz: {
      title: "Votre date est-elle libre ?",
      questions: [
        ["Quel événement ?", ["Mariage", "Anniversaire ou fête de famille", "Séminaire"]],
        ["Quelle date ?", [], "Calendrier, avec « je suis flexible »"],
        ["Combien d’invités ?", ["Moins de 80", "80-150", "Plus de 150"]],
        ["Hébergement sur place ?", ["Pour les mariés", "Pour une partie des invités", "Non"]],
        ["Votre budget pour le lieu ?", ["Moins de 5 000 €", "5-10 000 €", "Plus de 10 000 €"]],
      ],
      result:
        "Le samedi 13 juin 2027 est déjà réservé. Le vendredi 12 juin et le samedi 19 juin sont libres. Pour 120 invités avec hébergement des mariés, comptez entre 6 500 et 8 000 €. Venez visiter le domaine.",
    },
    message:
      "Bonjour Camille et Léo, félicitations ! Le 13 juin est pris, mais le vendredi 12 et le samedi 19 juin sont encore libres. Le plus simple est de venir voir le domaine : réservez votre visite ici [lien]. À bientôt, Sophie — Domaine des Tilleuls",
    list: [
      ["Camille et Léo", "120 invités, juin 2027, 5-10 k€", "Visite samedi 11h"],
      ["Inès et Hugo", "Option sur le 4 septembre", "Option expire dans 3 jours"],
      ["Famille Roux", "Anniversaire 60 ans, 70 invités", "À rappeler aujourd’hui"],
    ],
  },
  followups: {
    title: "Chaque option suivie jusqu’à la réservation",
    rows: [
      ["Immédiat", "SMS + email", "Félicitations, disponibilité de la date (ou dates proches), lien pour réserver la visite"],
      ["Lendemain de la visite", "Email", "Merci, récapitulatif clair : ce qui est compris, hébergement, traiteur, prix pour leur date"],
      ["J+3", "Email", "Photos d’un mariage récent à la même saison, avec l’avis du couple"],
      ["J+7", "SMS", "« Une question après la visite ? Je vous rappelle quand vous voulez »"],
      ["5 jours avant la fin de l’option", "SMS + email", "« Votre option sur le 4 septembre se termine vendredi. On la confirme ? »"],
      ["J+30", "Email", "« Vous cherchez toujours ? Voici les dates encore libres en 2027 »"],
    ],
    note: "Si la date se libère ou qu’un couple annule, les couples intéressés par cette date sont prévenus en premier.",
  },
  simulator: {
    questions: ["Combien de demandes recevez-vous par mois ?", "Sur 10 visites, combien de couples réservent ?", "Combien vaut une réservation en moyenne ?"],
    defaults: [40, 2, 7000],
    lead: "Réserver 1 événement de plus par mois, c’est",
    tail: "L’installation de Carnet plein coûte",
    share: "moins de",
    unit: "d’une réservation",
  },
  report: {
    title: "Chaque lundi, 5 chiffres par SMS",
    week: "Semaine du 12 oct.",
    figures: [
      ["Demandes", "11"],
      ["Visites réservées", "4"],
      ["Options posées", "2"],
      ["Dates réservées", "1"],
      ["Délai de réponse", "1 min"],
    ],
    note: "Si les visites montent et pas les réservations, on regarde ensemble ce qui fait hésiter les couples.",
  },
  fit: {
    yes: [
      "Vous gérez un domaine, un château ou une salle de réception privée",
      "Vous avez encore des dates libres sur les 18 prochains mois",
      "Vous recevez déjà des demandes : site, plateformes, Instagram, salons, prestataires",
      "Quelqu’un peut rappeler un couple dans la journée",
    ],
    no: [
      "Votre lieu est complet deux ans à l’avance sur toutes vos dates",
      "Vous êtes une salle municipale ou associative à tarif fixe",
      "Personne ne peut répondre. On règle ça d’abord, ou on ne commence pas.",
    ],
  },
  faq: [
    [
      "Je ne veux pas afficher mes prix, chaque mariage est différent.",
      "On affiche une fourchette selon la date et le nombre d’invités, pas un devis. Elle rassure les couples et filtre ceux qui n’ont pas le budget.",
    ],
    [
      "Mon calendrier est sur un agenda ou un tableur.",
      "On part de ce que vous utilisez déjà. La disponibilité affichée se met à jour avec vos réservations.",
    ],
    [
      "Je travaille avec des plateformes de mariage.",
      "Leurs contacts entrent dans la même relance. Ils sont souvent partagés entre plusieurs lieux : répondre en premier compte.",
    ],
    [
      "Mes options, je les gère à la main.",
      "Chaque option a une date de fin, et le couple reçoit un rappel avant. Vous ne bloquez plus une date pour rien.",
    ],
    ["Je dois refaire mon site ?", "Non. La page s’ajoute à votre site, avec un lien depuis votre bouton « demande de disponibilité »."],
  ],
  final: "Vos prochaines dates réservées sont peut-être déjà dans vos demandes.",
};
