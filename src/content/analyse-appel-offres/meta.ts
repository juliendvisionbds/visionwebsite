export const title = "Analyse d'appel d'offres par IA : le règlement de consultation en une fiche | vision";
export const description =
  "Collez ou déposez le règlement de consultation d'un marché : objet, lots, dates, visite, critères d'attribution, documents à fournir et points de vigilance, chaque élément avec le passage source. Gratuit, sans inscription.";

/** FAQ : rendue dans la page ET dans le JSON-LD FAQPage. */
export const faq: Array<[question: string, answer: string]> = [
  [
    "Qu'est-ce que le règlement de consultation d'un appel d'offres ?",
    "Le document du dossier de consultation qui fixe les règles du jeu : l'objet et l'allotissement du marché, les dates limites, les modalités de visite et de dépôt, les critères d'attribution et leur pondération, les documents à remettre pour la candidature et pour l'offre. C'est le premier document à lire, avant le CCAP et le CCTP, parce qu'il décide si l'on peut répondre et comment l'on sera jugé.",
  ],
  [
    "Que vérifier en premier dans un RC ?",
    "Quatre choses : la date et l'heure limites de remise des offres, la visite du site et son caractère obligatoire, les lots qui correspondent à vos métiers, et la pondération entre le prix et la valeur technique. Ces quatre éléments décident en dix minutes si le dossier vaut le temps d'une réponse.",
  ],
  [
    "Quels documents demande généralement un appel d'offres public ?",
    "Pour la candidature : le DC1 et le DC2 ou le DUME, les attestations fiscales et sociales, l'attestation d'assurance décennale et responsabilité civile, le Kbis, les qualifications et références. Pour l'offre : l'acte d'engagement, le bordereau de prix ou la décomposition du prix global et forfaitaire, le mémoire technique, parfois un planning et des fiches techniques. Le RC liste exactement ce qui est attendu, et l'outil le reprend en checklist.",
  ],
  [
    "L'outil peut-il se tromper ?",
    "Il travaille uniquement à partir du texte fourni et cite, pour chaque élément, le passage du règlement qui le justifie : vous pouvez vérifier en un coup d'œil. Ce qu'il ne trouve pas dans le texte est signalé dans « À vérifier dans le reste du dossier » plutôt qu'inventé. Relisez toujours la fiche avant de décider, et faites foi au document original.",
  ],
  [
    "Puis-je déposer le PDF du règlement ?",
    "Oui. Le texte est extrait du PDF dans votre navigateur, sans envoyer le fichier. Pour un PDF scanné sans texte sélectionnable, il faudra d'abord une reconnaissance de caractères, ou copier le texte depuis votre lecteur PDF.",
  ],
  [
    "Que deviennent les documents que j'analyse ?",
    "Le texte est transmis au service d'analyse le temps de produire la fiche, puis oublié. vision n'enregistre ni le règlement ni la fiche. Les documents de consultation sont publics par nature, mais évitez d'y joindre vos propres pièces.",
  ],
];
