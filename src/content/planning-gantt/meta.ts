export const title = "Planning de chantier en Gantt : outil gratuit, dates et chemin critique | vision";
export const description =
  "Listez les tâches, leurs durées en jours ouvrés et leurs dépendances : l'outil calcule les dates, le chemin critique et dessine le diagramme de Gantt du chantier. Jours fériés exclus, export image, Excel et impression. Gratuit, sans inscription.";

/** FAQ : rendue dans la page ET dans le JSON-LD FAQPage. */
export const faq: Array<[question: string, answer: string]> = [
  [
    "Qu'est-ce qu'un planning de chantier en Gantt ?",
    "Une représentation des tâches du chantier sous forme de barres sur un calendrier : chaque barre commence quand ses prédécesseurs sont terminés et dure le nombre de jours ouvrés prévu. On y lit d'un coup d'œil l'enchaînement des lots, les chevauchements, la date de fin et les tâches qui ne peuvent pas glisser sans décaler tout le reste.",
  ],
  [
    "Qu'est-ce que le chemin critique ?",
    "La suite de tâches dont la durée totale fixe la date de fin du chantier. Une tâche critique n'a aucune marge : un jour de retard sur elle, c'est un jour de retard sur la livraison. Les autres tâches ont une marge, indiquée par l'outil, qui permet de les décaler sans conséquence. C'est sur le chemin critique qu'il faut mettre les meilleures équipes et la surveillance la plus serrée.",
  ],
  [
    "Comment compter les durées ?",
    "En jours ouvrés, du lundi au vendredi, samedi en option. L'outil saute les week-ends et, si vous le souhaitez, les jours fériés français. Une durée se compte pour l'équipe réellement affectée : deux carreleurs sur 45 m² ne prennent pas le même temps qu'un seul. Prévoyez les temps de séchage et de livraison comme des tâches à part entière, sans personne dessus mais avec une durée.",
  ],
  [
    "Quelle différence avec le planning des équipes ?",
    "Le Gantt organise les tâches d'un chantier : quoi, dans quel ordre, combien de temps. Le planning d'affectation répartit les personnes et le matériel entre plusieurs chantiers semaine par semaine. Le premier se fait une fois par chantier, le second se met à jour chaque semaine. Les deux se complètent : les dates du Gantt alimentent les besoins en équipes.",
  ],
  [
    "L'outil peut-il proposer les tâches à ma place ?",
    "Oui, à partir d'une description des travaux en quelques phrases, il propose un découpage en tâches avec des durées indicatives et des dépendances logiques. C'est un point de départ à corriger avec vos durées réelles, pas un planning définitif.",
  ],
  [
    "Mes plannings sont-ils enregistrés ?",
    "Le planning en cours reste dans votre navigateur, sur cet ordinateur, pour le retrouver à la prochaine visite. Rien n'est transmis à vision, sauf la description des travaux si vous utilisez la proposition de tâches, le temps de la générer. Le bouton « Réinitialiser » efface tout.",
  ],
];
