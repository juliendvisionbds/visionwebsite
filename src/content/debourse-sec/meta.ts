export const title = "Calcul du déboursé sec : calculateur gratuit pour le bâtiment | vision";
export const description =
  "Calculez le déboursé sec d'un chantier : matériaux avec pertes, main-d'œuvre au taux horaire chargé, matériel, sous-traitance et autres coûts directs. Coût par unité d'ouvrage, aperçu du prix de vente. Gratuit, sans inscription.";

/** FAQ : rendue dans la page ET dans le JSON-LD FAQPage. */
export const faq: Array<[question: string, answer: string]> = [
  [
    "Qu'est-ce que le déboursé sec ?",
    "La somme des coûts directement affectables à un chantier : les matériaux, la main-d'œuvre productive au coût chargé, le matériel utilisé sur place et la sous-traitance. Il ne contient ni les frais de chantier indirects (installation, encadrement, levage), ni les frais généraux de l'entreprise, ni la marge. C'est le point de départ de tout prix de vente.",
  ],
  [
    "Comment calculer le déboursé sec ?",
    "Famille par famille. Matériaux : quantité × prix d'achat net, plus les pertes et chutes. Main-d'œuvre : heures productives × taux horaire chargé. Matériel : jours d'utilisation × coût journalier de location ou d'amortissement. Sous-traitance : le montant du devis du sous-traitant. On additionne, et on divise par la quantité d'ouvrage pour obtenir un déboursé unitaire réutilisable.",
  ],
  [
    "Comment calculer le taux horaire chargé d'un ouvrier ?",
    "Le coût annuel complet pour l'entreprise (salaire brut, charges patronales, congés payés, paniers, trajets, équipements) divisé par le nombre d'heures réellement productives dans l'année, souvent entre 1 500 et 1 600 heures une fois retirés les congés, les intempéries, la formation et les temps morts. En pratique, le taux chargé se situe souvent entre 1,6 et 2 fois le salaire brut horaire. Utilisez votre propre valeur plutôt qu'une moyenne.",
  ],
  [
    "Quelle différence entre déboursé sec, prix de revient et prix de vente ?",
    "Le déboursé sec couvre les coûts directs. En ajoutant les frais de chantier, on obtient le déboursé total. En ajoutant les frais généraux de l'entreprise, le prix de revient. En ajoutant la marge, le prix de vente hors taxes. Le coefficient qui va du déboursé sec au prix de vente dépend du métier et de la structure : il se situe souvent entre 1,3 et 1,7.",
  ],
  [
    "Faut-il compter les pertes et chutes de matériaux ?",
    "Oui, toujours. Carrelage, parquet, plaques de plâtre, bois : entre 5 et 15 % selon le matériau et la complexité des découpes. Un déboursé qui oublie les pertes est faux de ce pourcentage, et c'est de la marge qui disparaît.",
  ],
  [
    "L'outil enregistre-t-il mes chiffres ?",
    "Ils restent dans votre navigateur, sur cet ordinateur, pour que vous retrouviez vos lignes à la prochaine visite. Rien n'est transmis à vision. Le bouton « Réinitialiser » efface tout.",
  ],
];
