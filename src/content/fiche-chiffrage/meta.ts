export const title = "Analyser une demande de devis : fiche de chiffrage gratuite | vision";
export const description =
  "Collez la demande d'un client (mail, SMS, formulaire) : l'outil en fait une fiche de chiffrage, travaux demandés, quantités indiquées, contraintes, informations manquantes, et rédige le mail de questions à lui envoyer. Gratuit, sans inscription.";

/** FAQ : rendue dans la page ET dans le JSON-LD FAQPage. */
export const faq: Array<[question: string, answer: string]> = [
  [
    "Qu'est-ce qu'une fiche de chiffrage ?",
    "Le document qui sépare la demande du client du devis lui-même. Il liste ce qui est demandé, lot par lot, avec les quantités connues, les contraintes du chantier, ce qui manque pour chiffrer et les pièces à demander. Rempli avant de commencer le devis, il évite de chiffrer à côté, de visiter pour rien ou d'oublier un poste.",
  ],
  [
    "Pourquoi analyser la demande avant de chiffrer ?",
    "Parce qu'une demande de devis est rarement complète : la surface manque, l'état de l'existant n'est pas décrit, personne ne dit qui fournit le carrelage. Chiffrer quand même, c'est produire un devis faux, ou passer une heure au téléphone pour le corriger. Dix minutes d'analyse et un mail de questions font gagner la visite et la deuxième version du devis.",
  ],
  [
    "Quelles informations manquent le plus souvent dans une demande de devis travaux ?",
    "Les surfaces et hauteurs, l'état de l'existant, l'accès et l'étage, qui fournit les matériaux, le niveau de finition attendu, le délai réel, le budget, et qui décide. Pour une rénovation, s'ajoutent l'année de construction, les réseaux existants et la présence éventuelle d'amiante ou de plomb. L'outil les repère et en fait une liste de questions.",
  ],
  [
    "Faut-il toujours faire une visite avant de chiffrer ?",
    "Pas toujours. Un remplacement à l'identique avec photos et dimensions peut se chiffrer à distance. Une rénovation avec démolition, des réseaux à reprendre ou une structure à toucher demande une visite. L'outil indique, pour chaque demande, si le chiffrage est possible sur pièces ou si une visite technique s'impose.",
  ],
  [
    "L'outil invente-t-il des quantités ?",
    "Non. Chaque quantité est marquée « indiquée » quand le client l'a donnée, « estimée » quand elle se déduit du texte avec la base de l'estimation, ou « à relever » quand elle manque. Rien n'est chiffré en euros : la fiche prépare le devis, elle ne le remplace pas.",
  ],
  [
    "Que deviennent les demandes que je colle ?",
    "Elles sont transmises au service de rédaction le temps de produire la fiche, puis oubliées. vision n'enregistre ni la demande ni la fiche. Évitez simplement d'y laisser des données inutiles, comme un RIB.",
  ],
];
