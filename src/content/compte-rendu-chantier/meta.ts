export const title = "Compte rendu de chantier : générateur gratuit à partir de vos notes | vision";
export const description =
  "Collez vos notes de réunion ou de visite de chantier : l'outil rédige un compte rendu structuré, avancement, décisions, blocages et actions avec responsables et échéances. Gratuit, sans inscription, modèle inclus.";

/** FAQ : rendue dans la page ET dans le JSON-LD FAQPage. */
export const faq: Array<[question: string, answer: string]> = [
  [
    "Que doit contenir un compte rendu de chantier ?",
    "L'en-tête (chantier, date, numéro, présents et absents), l'avancement par lot ou par zone, les décisions prises, les points bloquants avec leur impact, la liste des actions avec un responsable et une échéance pour chacune, les points divers (sécurité, livraisons, planning) et la date de la prochaine réunion. C'est exactement la structure que produit l'outil.",
  ],
  [
    "Un compte rendu de chantier a-t-il une valeur juridique ?",
    "Oui, dès lors qu'il est diffusé à tous les intervenants. Dans de nombreux contrats, et dans la norme NF P 03-001 quand elle s'applique, un compte rendu qui n'est pas contesté dans le délai convenu est réputé accepté. C'est souvent la seule trace écrite d'une décision prise sur le chantier : d'où l'importance de l'envoyer le jour même et de noter qui s'est engagé à quoi, pour quand.",
  ],
  [
    "Qui rédige le compte rendu de chantier ?",
    "Le maître d'œuvre ou l'OPC quand il y en a un, sinon l'entreprise principale ou le conducteur de travaux qui anime la réunion. Dans une PME du bâtiment, c'est souvent le gérant lui-même, le soir, de mémoire. L'outil sert précisément à transformer des notes prises à chaud en document propre, sans y passer la soirée.",
  ],
  [
    "L'outil peut-il inventer des informations ?",
    "Il a pour consigne de n'utiliser que vos notes et le contexte que vous donnez. Quand un responsable ou une échéance manque, il écrit « à préciser » et vous le signale dans la liste « À compléter avant envoi ». Relisez toujours le résultat : vous pouvez le corriger directement dans la page avant de le copier.",
  ],
  [
    "Que deviennent mes notes ?",
    "Elles sont transmises au service de rédaction le temps de générer le compte rendu, puis la page les oublie. vision n'enregistre ni vos notes ni les comptes rendus produits. Évitez simplement d'y coller des données inutiles au compte rendu, comme des coordonnées bancaires.",
  ],
  [
    "Peut-on l'utiliser pour une réunion de chantier hebdomadaire ?",
    "C'est l'usage principal : une réunion, des notes, un compte rendu numéroté envoyé dans l'heure. Indiquez le numéro du compte rendu et collez, au besoin, les actions restées ouvertes du précédent : elles seront reprises dans la liste des actions.",
  ],
];
