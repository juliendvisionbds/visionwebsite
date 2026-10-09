import { TEAM, TEAM_EMAILS } from "@/lib/partners/config";

/**
 * Le kit du partenaire : ce qu'il envoie, à qui, et dans quel ordre.
 * Source unique pour l'espace partenaires et l'email de bienvenue.
 * Les PDF sont générés par `npm run build:kit` (sources : scripts/kit/*.html).
 */

export const PITCH =
  "vision est une agence d'automatisation IA 100 % dédiée au bâtiment. Elle supprime les tâches administratives répétitives (devis, base de prix, appels d'offres, planning, tableaux de bord) en construisant dans les outils que l'entreprise utilise déjà.";

export const MATERIALS = [
  {
    id: "presentation",
    file: "/kit/vision-presentation.pdf",
    title: "Présentation de l'agence",
    text: "Qui est vision, pour qui, et comment on travaille en trois étapes.",
    when: "À joindre à votre email de mise en contact.",
  },
  {
    id: "offre",
    file: "/kit/vision-offre.pdf",
    title: "Présentation de l'offre",
    text: "Ce qu'on met en place aujourd'hui, et le développement sur mesure.",
    when: "À envoyer quand on vous demande « concrètement, ils font quoi ? ».",
  },
];

/** Pour l'équipe : à remettre à un futur partenaire. Listé dans l'admin, pas dans le kit du partenaire. */
export const PROGRAMME = {
  id: "programme",
  file: "/kit/vision-programme-partenaires.pdf",
  title: "Programme partenaires",
  text: "Les bénéfices du programme et son fonctionnement en trois étapes : l'essentiel de la page « Devenir partenaire ».",
};

/** Qui recommander. */
export const TARGETS = [
  ["PME et entreprises générales du bâtiment", "De 10 à 150 salariés : gros œuvre, charpente, couverture, second œuvre, TCE."],
  ["Artisans et TPE", "De 1 à 10 personnes, qui font leurs devis et leurs factures le soir."],
  ["Groupes et holdings BTP", "Plusieurs sociétés ou agences à consolider."],
];

/** Les phrases qui doivent faire penser à vision. */
export const SIGNALS = [
  "« Je fais mes devis le soir. »",
  "« On ne retrouve jamais nos anciens prix. »",
  "« J'attends la fin du mois pour connaître mes chiffres. »",
  "« On passe des jours sur chaque appel d'offres. »",
  "« Le planning, c'est deux heures tous les matins. »",
];

/** Quelle situation, quoi envoyer. */
export const PLAYBOOK = [
  [
    "Un dirigeant vous parle du temps qu'il perd sur l'administratif",
    "Proposez la mise en relation : l'email prérédigé, avec la présentation de l'agence en pièce jointe.",
  ],
  ["On vous demande ce que vision fait concrètement", "Envoyez la présentation de l'offre."],
  [
    "Il préfère se faire une idée seul",
    "Donnez-lui le diagnostic en ligne (2 minutes) : visionbds.com/commencer. Déclarez la recommandation dans votre espace pour qu'elle vous soit attribuée.",
  ],
];

/** La liste de démarrage. `auto` : cochée d'office dès la première recommandation déclarée. */
export const TODO: Array<{ id: string; title: string; text: string; href: string; cta: string; auto?: boolean }> = [
  {
    id: "presentation",
    title: "Lisez la présentation de l'agence",
    text: "Deux minutes pour savoir dire ce que fait vision et comment on travaille.",
    href: "/kit/vision-presentation.pdf",
    cta: "Ouvrir le PDF",
  },
  {
    id: "reperer",
    title: "Repérez trois dirigeants du bâtiment dans votre réseau",
    text: "Ceux qui font leurs devis le soir, cherchent leurs prix dans d'anciens dossiers ou attendent leurs chiffres.",
    href: "/materiel/#qui",
    cta: "Qui recommander",
  },
  {
    id: "email",
    title: "Envoyez votre premier email de mise en contact",
    text: `Le modèle est prêt : ajoutez le prénom, joignez la présentation de l'agence, laissez ${TEAM.map((t) => t.first).join(" et ")} en copie.`,
    href: "/materiel/#email",
    cta: "Voir le modèle",
  },
  {
    id: "declarer",
    title: "Déclarez la recommandation dans votre espace",
    text: "C'est ce qui vous l'attribue. Vous y suivez ensuite son avancement et votre commission.",
    href: "/#recommander",
    cta: "Déclarer",
    auto: true,
  },
  {
    id: "offre",
    title: "Envoyez la présentation de l'offre après le premier échange",
    text: "Pour répondre à « concrètement, ils font quoi ? » : ce qu'on met en place aujourd'hui, et le sur-mesure.",
    href: "/kit/vision-offre.pdf",
    cta: "Ouvrir le PDF",
  },
];

/** L'email de mise en contact, à envoyer au dirigeant avec l'équipe en copie. */
export function introEmail(senderName: string) {
  const [a, b] = TEAM.map((t) => t.first);
  const subject = "Mise en relation avec vision (automatisation pour le bâtiment)";
  const body = `Bonjour [Prénom],

Comme évoqué, je vous mets en relation avec ${a} et ${b}, cofondateurs de vision (en copie).

vision est une agence d'automatisation IA 100 % dédiée au bâtiment. Ils suppriment les tâches administratives répétitives (devis, base de prix, appels d'offres, planning, tableaux de bord) en construisant dans les outils que vous utilisez déjà.

Ils commencent toujours par un diagnostic gratuit de 30 minutes : vous leur racontez une semaine type, ils identifient les trois tâches qui vous coûtent le plus de temps et vous remettent un plan écrit. Sans engagement.

${a}, ${b} : je vous laisse proposer un créneau à [Prénom].

Bien à vous,
${senderName}`;
  const mailto = `mailto:?cc=${TEAM_EMAILS.join(",")}&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { subject, body, cc: TEAM_EMAILS, mailto };
}
