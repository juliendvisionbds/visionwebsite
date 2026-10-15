export const title = "Consignes de chantier simplifiées et traduites pour vos équipes | vision";
export const description =
  "Collez une consigne de sécurité ou de travail : l'outil la réécrit en français simplifié, la traduit dans les langues de vos équipes (portugais, roumain, arabe, anglais…) et prépare l'affiche A4 et la version WhatsApp. Gratuit, sans inscription.";

/** FAQ : rendue dans la page ET dans le JSON-LD FAQPage. */
export const faq: Array<[question: string, answer: string]> = [
  [
    "Pourquoi simplifier une consigne avant de la traduire ?",
    "Parce qu'une phrase de quarante mots avec trois subordonnées reste incompréhensible une fois traduite. Le problème de compréhension sur un chantier est d'abord un problème de français : phrases longues, jargon, références d'articles. L'outil réécrit d'abord en français simplifié, phrases courtes, un verbe d'action par étape, puis traduit cette version. Le chef de chantier peut ainsi vérifier le sens sur la version française.",
  ],
  [
    "Dans quelles langues l'outil traduit-il ?",
    "Portugais, roumain, arabe, anglais, espagnol, polonais, turc, ukrainien, albanais, italien, bulgare, russe, bengali et ourdou, jusqu'à cinq langues à la fois. Les langues s'écrivant de droite à gauche, comme l'arabe et l'ourdou, sont affichées et imprimées dans le bon sens.",
  ],
  [
    "Peut-on se fier à une traduction automatique pour une consigne de sécurité ?",
    "Pour le sens général, oui : les chiffres, les interdictions et l'ordre des étapes sont conservés, et la version française simplifiée permet de contrôler le contenu. Pour une consigne dont dépend la sécurité des personnes, faites relire la traduction par un locuteur natif de l'équipe avant de l'afficher, et faites reformuler la consigne oralement lors du briefing. L'outil le rappelle dans ses remarques.",
  ],
  [
    "L'employeur a-t-il l'obligation de traduire les consignes ?",
    "Le Code du travail impose à l'employeur une formation pratique et appropriée à la sécurité et l'obligation de s'assurer que les consignes sont comprises, ce qui suppose une langue comprise par chaque salarié, y compris intérimaire ou détaché. Les documents de prévention restent rédigés en français ; une version simplifiée et traduite des consignes essentielles, affichée et expliquée, est le moyen le plus simple de répondre à cette obligation.",
  ],
  [
    "Que contient l'affiche produite ?",
    "Un titre court, les étapes numérotées en grands caractères, la raison en une phrase, et qui contacter en cas de problème. Une page par langue, avec la version française simplifiée en dessous pour que l'encadrement puisse la vérifier. Une version courte de moins de 300 caractères est aussi prête pour un envoi par SMS ou WhatsApp.",
  ],
  [
    "Que deviennent les consignes que je colle ?",
    "Elles sont transmises au service de rédaction le temps de produire les versions, puis oubliées. vision n'enregistre ni la consigne ni les traductions.",
  ],
];
