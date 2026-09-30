/* ============================================================
   MOTEUR DU QUIZ — questions, contenus, logique de recommandation.
   Partagé entre les pages du quiz (exposé sur window.VQ par QuizPage)
   et les routes API (calcul du plan envoyé par email).
   ============================================================ */

export type Answers = {
  metier?: string;
  taille?: string;
  douleurs: string[];
  blocage?: string | null;
  ou?: string;
  qui?: string;
  outils?: string[];
  frequence?: number | null;
  email?: string;
};

type Opt = {
  id: string;
  label: string;
  hint?: string;
  ent?: string;
  chip?: string;
  short?: string;
  low?: string;
  phrase?: string;
  sur?: string;
  avec?: string;
};
export type Piste = {
  id: string;
  overlaps?: string[];
  label?: string;
  hint?: string;
  titre: string;
  court?: string;
  constat?: string;
  pourquoi: string;
  auto: string;
  garde: string;
  action: string;
  appel?: string;
};
type Blocage = { q: string; def: string; unit?: string; opts: Piste[] };
type Freq = { unit: string; q: string; opts: string[]; ph: (x: string) => string };

export const METIERS: Opt[]=[
 {id:'electricite',label:'Électricité',ent:"Entreprise d'électricité"},
 {id:'plomberie',label:'Plomberie, chauffage',ent:'Entreprise de plomberie-chauffage'},
 {id:'maconnerie',label:'Maçonnerie, gros œuvre',ent:'Entreprise de gros œuvre'},
 {id:'renovation',label:'Rénovation générale',ent:'Entreprise de rénovation'},
 {id:'menuiserie',label:'Menuiserie',ent:'Entreprise de menuiserie'},
 {id:'peinture',label:'Peinture, finitions',ent:'Entreprise de peinture et finitions'},
 {id:'couverture',label:'Couverture, charpente',ent:'Entreprise de couverture-charpente'},
 {id:'generale',label:'Entreprise générale',ent:'Entreprise générale du bâtiment'},
 {id:'autre',label:'Autre métier du bâtiment',ent:'Entreprise du bâtiment'}
];
export const TAILLES: Opt[]=[
 {id:'solo',label:'Je travaille seul',chip:'Dirigeant seul'},
 {id:'2-5',label:'2 à 5 personnes',chip:'2–5 personnes'},
 {id:'6-15',label:'6 à 15 personnes',chip:'6–15 personnes'},
 {id:'16-50',label:'16 à 50 personnes',chip:'16–50 personnes'},
 {id:'50+',label:'Plus de 50 personnes',chip:'Plus de 50 personnes'}
];
export const DOULEURS: Opt[]=[
 {id:'devis',label:'Les devis',short:'Devis',low:'les devis'},
 {id:'factures',label:'Les factures et les relances',short:'Factures et relances',low:'les factures et les relances'},
 {id:'chantier',label:'Le suivi de chantier',hint:'Comptes rendus, situations, heures',short:'Suivi de chantier',low:'le suivi de chantier'},
 {id:'consolidation',label:'La consolidation des chiffres',hint:'Marges, trésorerie, tableaux de bord',short:'Chiffres et tableaux de bord',low:'la consolidation des chiffres'},
 {id:'ao',label:"Les appels d'offres",short:"Appels d'offres",low:"les appels d'offres"}
];
export const OU: Opt[]=[
 {id:'logiciel',label:'Dans un logiciel, au même endroit',phrase:'regroupées dans votre logiciel'},
 {id:'excel',label:'Dans plusieurs fichiers Excel',phrase:'réparties entre plusieurs fichiers Excel'},
 {id:'messages',label:'Dans les emails et WhatsApp',phrase:'dispersées dans les emails et WhatsApp'},
 {id:'papier',label:'Sur papier, dans des classeurs',phrase:'en grande partie sur papier'},
 {id:'tete',label:'Surtout dans la tête de quelques personnes',phrase:'surtout dans la tête de quelques personnes'}
];
export const QUI: Opt[]=[
 {id:'dirigeant',label:'Moi, le dirigeant',short:'le dirigeant'},
 {id:'assistante',label:'Une assistante ou un secrétariat',short:'le secrétariat'},
 {id:'conducteurs',label:'Les conducteurs de travaux',short:'les conducteurs de travaux'},
 {id:'comptable',label:'Un comptable, interne ou externe',short:'le comptable'},
 {id:'personne',label:"Personne en particulier, chacun s'y met",short:'chacun'}
];
export const OUTILS: Opt[]=[
 {id:'excel',label:'Excel ou Google Sheets',sur:'sur Excel',avec:'vos fichiers Excel'},
 {id:'btp',label:'Un logiciel BTP',hint:'Batappli, Obat, EBP Bâtiment…',sur:'sur logiciel BTP',avec:'votre logiciel BTP'},
 {id:'compta',label:'Un logiciel comptable',sur:'dans le logiciel comptable',avec:'votre logiciel comptable'},
 {id:'emails',label:'Les emails',sur:'par email',avec:'vos emails'},
 {id:'whatsapp',label:'WhatsApp ou SMS',sur:'via WhatsApp',avec:'WhatsApp'},
 {id:'papier',label:'Papier, carnets, classeurs',sur:'sur papier',avec:'vos documents papier'}
];

/* Question 4 (où ça bloque) et question 7 (fréquence) dépendent de la première douleur choisie.
   Chaque option de la question 4 porte la carte de recommandation correspondante. */
export const BLOCAGES: Record<string, Blocage>={
 devis:{q:"Quand vous préparez un devis, qu'est-ce qui vous ralentit le plus ?",def:'prix',opts:[
  {id:'prix',label:'Retrouver les bons prix',
   titre:'Regrouper vos prix pour éviter de les rechercher à chaque devis',
   court:'la recherche des prix pour vos devis',
   constat:'retrouver les bons prix vous ralentit à chaque nouveau chiffrage',
   pourquoi:'Vos réponses indiquent que la recherche des prix vous ralentit avant même de rédiger le devis. Une base commune pourrait réduire ces recherches répétées.',
   auto:'Extraire les références et les prix de vos factures fournisseurs et de vos anciens devis pour alimenter une base consultable.',
   garde:'La validation des références, les prix retenus et la marge appliquée.',
   action:'Choisissez une famille de fournitures que vous chiffrez souvent et identifiez où se trouvent ses prix les plus récents.',
   appel:'simplifier la préparation de vos devis'},
  {id:'infos',label:'Récupérer les informations du chantier',
   titre:'Recueillir les informations du chantier en une seule fois',
   court:'la collecte des informations avant chiffrage',
   constat:'récupérer les informations du chantier vous ralentit avant de chiffrer',
   pourquoi:"Quand les métrés, les photos et les contraintes arrivent par morceaux, chaque devis attend la pièce manquante. Une fiche de visite commune permet de chiffrer sans revenir vers le client.",
   auto:'Transformer les notes vocales, photos et mesures prises sur place en une fiche de chiffrage structurée, prête à être reprise dans le devis.',
   garde:'Ce qui est relevé sur place, les choix techniques et les hypothèses de chiffrage.',
   action:'Sur vos cinq derniers devis, listez les informations qui vous manquaient au moment de chiffrer.',
   appel:"structurer la prise d'informations avant vos devis"},
  {id:'reecrire',label:'Réécrire des prestations déjà chiffrées',
   titre:'Réutiliser les prestations que vous avez déjà chiffrées',
   court:'la réécriture de prestations déjà chiffrées',
   constat:'vous réécrivez des prestations que vous avez déjà chiffrées',
   pourquoi:"Vous réécrivez des lignes qui existent déjà dans vos anciens devis. Une bibliothèque d'ouvrages permet d'assembler un devis plutôt que de le rédiger.",
   auto:'Reprendre vos anciens devis pour en extraire les ouvrages récurrents (descriptif, unité, prix) et les proposer au moment de chiffrer.',
   garde:"Le choix des ouvrages, leur adaptation au chantier et le prix final.",
   action:'Repérez les dix prestations que vous chiffrez le plus souvent et retrouvez le devis où chacune est le mieux décrite.',
   appel:'accélérer la rédaction de vos devis'},
  {id:'marge',label:'Vérifier les coûts et la marge',
   titre:'Voir le coût de revient et la marge sur chaque devis',
   court:'la vérification des coûts et de la marge',
   constat:'vérifier les coûts et la marge vous prend du temps sur chaque devis',
   pourquoi:"Une marge vérifiée à la main l'est moins bien quand le rythme s'accélère. Un calcul fait au moment du chiffrage montre tout de suite les devis à reprendre.",
   auto:"Calculer pour chaque ligne le coût matériaux et main-d'œuvre à partir de vos prix d'achat et de vos temps de pose, puis afficher la marge du devis.",
   garde:"Vos coefficients, les taux horaires retenus et la décision d'envoyer le devis.",
   action:"Reprenez un devis récent et notez, ligne par ligne, d'où viennent le prix d'achat et le temps de pose utilisés.",
   appel:'fiabiliser la marge de vos devis'},
  {id:'valider',label:'Faire valider le devis',
   titre:"Faire circuler le devis jusqu'à sa validation sans le perdre de vue",
   court:'la validation et l’envoi de vos devis',
   constat:"faire valider le devis retarde son envoi",
   pourquoi:"Un devis prêt qui attend une validation, c'est un client qui attend aussi. Un circuit clair, avec qui valide et quand, réduit ce temps mort.",
   auto:"Prévenir la bonne personne quand un devis est prêt, garder la trace des validations et relancer le client après l'envoi.",
   garde:'La décision de valider, les ajustements commerciaux et la relation avec le client.',
   action:"Pour vos trois derniers devis, notez la date où ils étaient prêts et celle où ils sont partis chez le client.",
   appel:"raccourcir le délai d'envoi de vos devis"}
 ]},
 factures:{unit:' factures par mois',q:"Sur les factures et les relances, qu'est-ce qui vous prend le plus de temps ?",def:'relances',opts:[
  {id:'preparer',label:'Préparer les factures',
   titre:'Préparer vos factures à partir de ce qui est déjà validé',
   court:'la préparation de vos factures',
   constat:'préparer les factures vous oblige à ressaisir ce qui existe déjà',
   pourquoi:'Les montants à facturer existent déjà dans vos devis signés et vos avancements. Les ressaisir prend du temps et crée des écarts.',
   auto:"Préparer chaque facture à partir du devis signé et de l'avancement déclaré, prête à être vérifiée.",
   garde:"Le contrôle des montants, les avenants et l'envoi au client.",
   action:'Comptez combien de factures du mois dernier ont été construites en recopiant un devis ou un tableau.',
   appel:'simplifier la préparation de vos factures'},
  {id:'relances',label:"Relancer les clients qui n'ont pas payé",
   titre:'Relancer les impayés sans avoir à y penser',
   court:'les relances de paiement',
   constat:"relancer les clients qui n'ont pas payé vous prend du temps",
   pourquoi:"Les relances partent quand quelqu'un y pense, donc souvent trop tard. Un calendrier de relances qui part tout seul protège votre trésorerie sans y passer vos soirées.",
   auto:"Envoyer les relances à échéance, avec un ton qui monte progressivement, et vous alerter quand un client ne répond plus.",
   garde:'Le ton adopté avec chaque client, les exceptions et les appels quand ça coince.',
   action:'Listez vos factures échues depuis plus de 30 jours et la date de la dernière relance envoyée pour chacune.',
   appel:'automatiser vos relances de paiement'},
  {id:'encaissements',label:'Savoir qui a payé quoi',
   titre:"Savoir d'un coup d'œil ce qui est payé et ce qui reste dû",
   court:'le suivi de vos encaissements',
   constat:'savoir qui a payé quoi vous oblige à recouper plusieurs sources',
   pourquoi:"Recouper à la main relevés bancaires et factures, c'est long, et c'est là que les oublis arrivent. Un rapprochement automatique vous donne une vue à jour.",
   auto:'Rapprocher les paiements reçus de vos factures et tenir à jour la liste de ce qui reste à encaisser.',
   garde:'Le traitement des paiements partiels, des retenues de garantie et des litiges.',
   action:'La prochaine fois que vous vérifiez si un client a payé, notez le temps que ça vous a pris.',
   appel:'clarifier le suivi de vos encaissements'},
  {id:'fournisseurs',label:'Traiter les factures fournisseurs',
   titre:'Ranger vos factures fournisseurs par chantier, automatiquement',
   court:'le traitement des factures fournisseurs',
   constat:'traiter les factures fournisseurs vous prend du temps',
   pourquoi:"Chaque facture fournisseur doit être lue, rattachée à un chantier puis transmise. C'est répétitif, et c'est aussi là que se trouvent vos vrais coûts.",
   auto:'Lire les factures reçues par email, en extraire le fournisseur, les montants et le chantier, et les ranger au bon endroit.',
   garde:'Le rattachement des cas ambigus et la validation avant paiement.',
   action:'Regardez où arrivent vos factures fournisseurs aujourd’hui et combien de personnes les manipulent avant paiement.',
   appel:'automatiser le traitement de vos factures fournisseurs'}
 ]},
 chantier:{q:"Dans le suivi de chantier, qu'est-ce qui vous prend le plus de temps ?",def:'cr',opts:[
  {id:'cr',label:'Rédiger les comptes rendus',
   titre:'Produire vos comptes rendus à partir de ce qui est dit et photographié sur place',
   court:'la rédaction de vos comptes rendus',
   constat:'rédiger les comptes rendus de chantier vous prend du temps',
   pourquoi:'Le compte rendu se rédige souvent le soir, de mémoire. Partir des notes vocales et des photos prises sur place fait gagner ce temps et limite les oublis.',
   auto:'Transformer notes vocales et photos en compte rendu structuré (avancement, réserves, actions), prêt à relire et à envoyer.',
   garde:'La relecture, ce qui est dit au client et les décisions de chantier.',
   action:'Lors de votre prochaine visite, enregistrez une note vocale de deux minutes au lieu de prendre des notes.',
   appel:'alléger vos comptes rendus de chantier'},
  {id:'situations',label:'Préparer les situations de travaux',
   titre:"Préparer vos situations de travaux à partir de l'avancement",
   court:'la préparation de vos situations',
   constat:'préparer les situations de travaux vous oblige à tout recroiser',
   pourquoi:"Chaque mois, il faut recroiser le marché, l'avancement et ce qui a déjà été facturé. C'est mécanique, donc automatisable.",
   auto:"Calculer chaque situation à partir du marché, de l'avancement par poste et des situations précédentes.",
   garde:"Les pourcentages d'avancement déclarés et la validation avant envoi.",
   action:'Reprenez votre dernière situation et listez les fichiers que vous avez dû ouvrir pour la préparer.',
   appel:'accélérer vos situations de travaux'},
  {id:'heures',label:'Remonter les heures des équipes',
   titre:'Recueillir les heures des équipes sans les ressaisir',
   court:'la remontée des heures',
   constat:'remonter les heures des équipes vous oblige à tout ressaisir',
   pourquoi:'Des heures remontées sur papier ou par message doivent être recopiées avant de servir. Une saisie simple sur le terrain les rend exploitables tout de suite.',
   auto:'Collecter les heures par chantier depuis le téléphone des équipes et les consolider pour la paie et le suivi des coûts.',
   garde:'La validation des heures et les cas particuliers.',
   action:'Pendant une semaine, comptez combien de relances il faut pour récupérer toutes les heures.',
   appel:'simplifier la remontée des heures'},
  {id:'circulation',label:"Faire circuler l'information",hint:'Photos, messages, décisions',
   titre:'Rassembler photos et échanges au même endroit, chantier par chantier',
   court:"la circulation de l'information chantier",
   constat:"l'information circule mal entre le terrain et le bureau",
   pourquoi:"Quand les photos et les décisions sont dispersées dans les conversations, on perd du temps à les retrouver, et on en perd certaines. Un classement par chantier règle ça.",
   auto:'Classer automatiquement photos, messages et documents reçus dans le bon dossier chantier, avec un résumé consultable.',
   garde:'Ce qui est partagé avec le client et les décisions prises.',
   action:'Sur un chantier en cours, cherchez la dernière photo de réserve et notez où elle se trouvait.',
   appel:"centraliser l'information de vos chantiers"}
 ]},
 consolidation:{q:"Pour sortir vos chiffres, qu'est-ce qui coince le plus ?",def:'disperses',opts:[
  {id:'disperses',label:'Les données sont dans plusieurs fichiers',
   titre:'Consolider vos chiffres sans copier-coller',
   court:'la consolidation de vos chiffres',
   constat:'vos chiffres sont dispersés dans plusieurs fichiers',
   pourquoi:'Rassembler à la main les chiffres de plusieurs fichiers prend du temps et introduit des erreurs. Les relier une fois vous donne des chiffres à jour sans effort.',
   auto:'Récupérer automatiquement les données de vos fichiers et logiciels pour alimenter un tableau de bord unique.',
   garde:'Le choix des indicateurs, leur lecture et les décisions.',
   action:'Listez les fichiers que vous avez ouverts pour sortir votre dernier point chiffré.',
   appel:'automatiser la consolidation de vos chiffres'},
  {id:'marge',label:'Connaître la marge réelle par chantier',
   titre:'Suivre la marge réelle de chaque chantier pendant qu’il avance',
   court:'le suivi de la marge par chantier',
   constat:"vous ne connaissez la marge réelle d'un chantier qu'une fois terminé",
   pourquoi:"Découvrir la marge après coup ne permet plus de corriger. Comparer budget et dépenses au fil du chantier vous alerte pendant qu'il est encore temps.",
   auto:'Rapprocher le budget du devis des dépenses réelles (factures fournisseurs, heures), chantier par chantier.',
   garde:"L'analyse des écarts et les décisions de chantier.",
   action:'Choisissez un chantier terminé et comparez son budget initial à ce qu’il a réellement coûté.',
   appel:'suivre la marge de vos chantiers en continu'},
  {id:'tresorerie',label:'Anticiper la trésorerie',
   titre:'Anticiper votre trésorerie à partir de ce qui est déjà engagé',
   court:"l'anticipation de votre trésorerie",
   constat:'anticiper la trésorerie vous oblige à tout reconstruire',
   pourquoi:'Votre trésorerie à venir est déjà écrite dans vos devis signés, vos situations et vos factures fournisseurs. Encore faut-il la rassembler.',
   auto:'Construire un prévisionnel qui se met à jour avec les factures émises, les échéances et les dépenses prévues.',
   garde:'Les hypothèses, les arbitrages et les décisions de financement.',
   action:'Notez la date de votre dernier prévisionnel et le temps qu’il vous a pris.',
   appel:'anticiper votre trésorerie'},
  {id:'multi',label:'Réunir plusieurs sociétés ou agences',
   titre:'Réunir plusieurs sociétés dans un seul tableau de bord',
   court:'la consolidation de vos différentes sociétés',
   constat:'consolider plusieurs sociétés vous oblige à tout recompiler',
   pourquoi:'Chaque société a ses fichiers et ses habitudes. Les consolider à la main prend des jours à chaque clôture.',
   auto:'Collecter les données de chaque société et produire un tableau de bord consolidé, avec le détail par entité.',
   garde:"Le choix des indicateurs et l'analyse du groupe.",
   action:'Pour chaque société, notez où se trouve son chiffre d’affaires du mois dernier.',
   appel:'consolider vos différentes sociétés'}
 ]},
 ao:{q:"Sur les appels d'offres, qu'est-ce qui vous prend le plus de temps ?",def:'dce',opts:[
  {id:'veille',label:'Trouver ceux qui nous correspondent',
   titre:"Recevoir seulement les appels d'offres qui vous correspondent",
   court:"la recherche d'appels d'offres",
   constat:"trouver les appels d'offres qui vous correspondent vous prend du temps",
   pourquoi:"Trier les annonces une par une prend du temps, et les bonnes consultations passent parfois inaperçues. Une veille filtrée sur vos critères fait ce tri pour vous.",
   auto:"Surveiller les plateformes de marchés et ne vous transmettre que les consultations qui correspondent à vos lots, zones et montants.",
   garde:'La décision de répondre ou non.',
   action:"Notez vos critères de sélection : lots, zone géographique, montant minimum, délais acceptables.",
   appel:"cibler les appels d'offres auxquels répondre"},
  {id:'dce',label:'Analyser les dossiers de consultation',
   titre:'Obtenir une synthèse de chaque dossier de consultation',
   court:"l'analyse des dossiers de consultation",
   constat:"analyser les dossiers de consultation vous prend du temps",
   pourquoi:"Lire le règlement, le CCTP et les annexes pour décider si l'on répond prend des heures. Une synthèse des points clés vous permet de trancher vite.",
   auto:'Lire les pièces du dossier et en sortir une synthèse : critères, délais, pièces demandées, points de vigilance.',
   garde:'La décision de répondre et la stratégie de réponse.',
   action:'Sur votre dernière consultation, notez le temps passé avant de décider si vous répondiez.',
   appel:"accélérer l'analyse de vos dossiers de consultation"},
  {id:'memoire',label:'Rédiger le mémoire technique',
   titre:'Préparer votre mémoire technique à partir de vos références',
   court:'la rédaction de vos mémoires techniques',
   constat:'rédiger le mémoire technique vous prend du temps à chaque réponse',
   pourquoi:"Chaque mémoire technique réécrit en grande partie les précédents. Partir d'une base de contenus déjà validés vous laisse du temps pour ce qui est propre au chantier.",
   auto:'Constituer une base à partir de vos anciens mémoires et pré-remplir chaque nouveau mémoire selon la consultation.',
   garde:'Ce qui est propre au chantier, la relecture et le ton de la réponse.',
   action:'Rassemblez vos trois derniers mémoires techniques et surlignez les passages repris d’un mémoire à l’autre.',
   appel:'accélérer la rédaction de vos mémoires techniques'},
  {id:'admin',label:'Rassembler les pièces administratives',
   titre:'Garder votre dossier administratif prêt à envoyer',
   court:'la collecte des pièces administratives',
   constat:'rassembler les pièces administratives vous prend du temps à chaque réponse',
   pourquoi:'Attestations, assurances, Kbis : les mêmes pièces sont demandées à chaque fois, et il y en a toujours une qui a expiré.',
   auto:'Tenir vos pièces à jour, vous alerter avant leur expiration et assembler le dossier demandé par chaque consultation.',
   garde:'Les pièces signées et la vérification finale.',
   action:'Listez les pièces demandées dans votre dernière réponse et leur date de validité.',
   appel:'automatiser votre dossier administratif'}
 ]}
};
export const FREQ: Record<string, Freq>={
 devis:{unit:' devis par mois',q:'Combien de devis préparez-vous par mois ?',opts:['Moins de 5','5 à 15','15 à 40','Plus de 40'],ph:x=>`vous préparez ${x} devis par mois`},
 factures:{unit:' factures par mois',q:'Combien de factures émettez-vous par mois ?',opts:['Moins de 5','5 à 15','15 à 40','Plus de 40'],ph:x=>`vous émettez ${x} factures par mois`},
 chantier:{unit:' chantiers en parallèle',q:'Combien de chantiers suivez-vous en même temps ?',opts:['1 ou 2','3 à 5','6 à 15','Plus de 15'],ph:x=>`vous suivez ${x} chantiers en même temps`},
 consolidation:{unit:'',q:'À quelle fréquence devez-vous sortir ces chiffres ?',opts:['Chaque semaine','Chaque mois','Chaque trimestre','Quand on nous les demande'],ph:x=>x==='Quand on nous les demande'?'vous sortez ces chiffres à la demande':`vous sortez ces chiffres ${x.toLowerCase()}`},
 ao:{unit:" appels d'offres par mois",q:"Combien d'appels d'offres étudiez-vous par mois ?",opts:['Moins de 2','2 à 5','6 à 15','Plus de 15'],ph:x=>`vous étudiez ${x} appels d'offres par mois`}
};
/* Troisième piste : elle vient de l'organisation (question 5).
   "overlaps" évite de recommander deux fois la même chose. */
export const ORGA: Record<string, Piste>={
 excel:{id:'orga-excel',overlaps:['consolidation.disperses'],
  titre:'Relier vos fichiers Excel pour ne plus ressaisir',
  pourquoi:"Vos informations sont réparties entre plusieurs fichiers Excel. Chaque ressaisie d'un fichier à l'autre est du temps perdu et une occasion d'erreur.",
  auto:"Faire circuler les données entre vos fichiers pour qu'une information saisie une fois soit à jour partout.",
  garde:'Vos fichiers restent les vôtres : vous décidez de ce qui est relié.',
  action:'Repérez une information que vous saisissez aujourd’hui dans deux fichiers différents.'},
 messages:{id:'orga-messages',overlaps:['chantier.circulation'],
  titre:'Sortir les informations importantes des emails et de WhatsApp',
  pourquoi:'Vos informations vivent dans les emails et les conversations WhatsApp. Elles existent, mais il faut les chercher à chaque fois.',
  auto:'Repérer dans les messages reçus les demandes, documents et décisions, et les classer par chantier ou par client.',
  garde:'Vos échanges ne changent pas : vous validez ce qui est classé.',
  action:'Cette semaine, notez chaque fois que vous faites défiler une conversation pour retrouver une information.'},
 papier:{id:'orga-papier',overlaps:[],
  titre:'Passer du papier à une saisie simple sur le terrain',
  pourquoi:"Une grande partie de vos informations est sur papier. Tant qu'elles ne sont pas numériques, aucune automatisation ne peut s'appuyer dessus.",
  auto:'Photographier ou dicter ce qui était écrit sur papier, et le transformer automatiquement en données exploitables.',
  garde:"Votre façon de travailler sur le terrain : l'outil s'adapte, pas l'inverse.",
  action:'Choisissez un document papier que vous remplissez chaque semaine et prenez-le en photo à chaque fois.'},
 tete:{id:'orga-tete',overlaps:[],
  titre:'Mettre par écrit les règles que vous appliquez de tête',
  pourquoi:"Vos informations sont surtout dans la tête de quelques personnes. Avant d'automatiser, il faut rendre ces règles lisibles, sinon tout continue de reposer sur elles.",
  auto:'Une fois vos règles écrites (prix, coefficients, circuits de validation), un outil peut les appliquer à votre place.',
  garde:'Les règles elles-mêmes : elles sont votre savoir-faire.',
  action:'Notez les trois questions qu’on vous pose le plus souvent parce que vous êtes seul à connaître la réponse.'}
};
export const TOOLLINK: Piste={id:'outils-lien',overlaps:[],
  titre:'Relier votre logiciel BTP et vos fichiers Excel',
  pourquoi:"Vous utilisez à la fois un logiciel BTP et des fichiers Excel. Ce qui passe de l'un à l'autre est aujourd'hui recopié à la main.",
  auto:'Synchroniser les données utiles entre votre logiciel et vos fichiers, dans le sens où vous en avez besoin.',
  garde:'Le choix de ce qui est synchronisé et le contrôle des données.',
  action:'Notez ce que vous exportez ou recopiez de votre logiciel vers Excel au cours d’une semaine.'};


const byId = <T extends { id: string }>(arr: T[], id: string | null | undefined) =>
  arr.find((x) => x.id === id);

export function vqBlocage(s: Answers): Piste {
  const b = BLOCAGES[s.douleurs[0]];
  return byId(b.opts, s.blocage) || byId(b.opts, b.def)!;
}

/* ——— construit le plan à partir des réponses ——— */
export function vqPlan(s: Answers) {
  const main = s.douleurs[0], bl = vqBlocage(s), f = FREQ[main];
  const fx = s.frequence != null ? f.opts[s.frequence] : undefined;
  const solo = s.taille === 'solo';
  const gardeLabel = solo ? 'Ce que vous gardez en main' : 'Ce que votre équipe garde en main';
  let why = bl.pourquoi;
  if (fx) {
    why += s.frequence === 0
      ? ` Le volume reste modeste (${f.ph(fx.toLowerCase())}), mais c'est l'étape qui revient à chaque fois.`
      : ` Et comme ${f.ph(fx.toLowerCase())}, ce temps se répète à chaque fois.`;
  }
  if (s.qui === 'dirigeant' && !solo) why += " Aujourd'hui, c'est vous qui vous en chargez : autant de temps pris sur les chantiers et le commercial.";
  const P: (Piste & { key: string; painShort: string })[] = [
    { ...bl, key: main + '.' + bl.id, pourquoi: why, painShort: byId(DOULEURS, main)!.short! },
  ];

  const second = s.douleurs[1];
  if (second) {
    const b2 = BLOCAGES[second], c = byId(b2.opts, b2.def)!;
    P.push({ ...c, key: second + '.' + c.id, painShort: byId(DOULEURS, second)!.short!,
      pourquoi: `Vous avez aussi cité ${byId(DOULEURS, second)!.low} parmi ce qui vous prend trop de temps. ${c.pourquoi}` });
  }
  const org = s.ou ? ORGA[s.ou] : undefined;
  const taken = P.map((p) => p.key);
  if (org && !(org.overlaps || []).some((k) => taken.includes(k))) P.push({ ...org, key: org.id, painShort: 'Organisation' });
  const outils = s.outils || [];
  if (P.length < 3 && outils.includes('btp') && outils.includes('excel')) P.push({ ...TOOLLINK, key: TOOLLINK.id, painShort: 'Outils' });

  const m = byId(METIERS, s.metier) || METIERS[8], t = byId(TAILLES, s.taille) || TAILLES[2];
  const tool = byId(OUTILS, outils[0]);
  const recap = [m.ent!, t.chip!, byId(DOULEURS, main)!.short! + (tool ? ' ' + tool.sur : '')];
  const outilsAvec = outils.map((id) => byId(OUTILS, id)).filter((o): o is Opt => !!o).map((o) => o.avec!);
  const avec = outilsAvec.length ? outilsAvec.slice(0, 2).join(' et ') : 'vos outils actuels';
  return { priorities: P.slice(0, 3), recap, difficulte: bl.court!, appel: bl.appel!, gardeLabel, avec,
    constat: `Vous nous indiquez que ${bl.constat}, et que vos informations sont aujourd'hui ${(byId(OU, s.ou) || OU[1]).phrase}.` };
}

/* résumé lisible, transmis à l'outil de prise de rendez-vous */
export function vqSummary(s: Answers) {
  const f = FREQ[s.douleurs[0]];
  return [
    'Métier : ' + byId(METIERS, s.metier)?.label,
    'Taille : ' + byId(TAILLES, s.taille)?.label,
    'Prend trop de temps : ' + s.douleurs.map((d) => byId(DOULEURS, d)!.label).join(', '),
    'Point bloquant : ' + vqBlocage(s).label,
    'Informations : ' + byId(OU, s.ou)?.label,
    'Qui s’en occupe : ' + byId(QUI, s.qui)?.label,
    'Outils : ' + (s.outils || []).map((o) => byId(OUTILS, o)?.label).join(', '),
    'Volume : ' + (s.frequence != null && f.opts[s.frequence] != null ? f.opts[s.frequence] + f.unit : '—'),
  ].join('\n');
}

/* Valide des réponses reçues du navigateur : ne garde que des identifiants connus. */
export function parseAnswers(raw: unknown): Answers | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const pick = (list: { id: string }[], v: unknown) =>
    typeof v === 'string' && list.some((o) => o.id === v) ? v : undefined;
  const douleurs = Array.isArray(r.douleurs)
    ? [...new Set(r.douleurs.filter((d): d is string => typeof d === 'string' && d in BLOCAGES))].slice(0, 2)
    : [];
  if (!douleurs.length) return null;
  const main = douleurs[0];
  const outils = Array.isArray(r.outils)
    ? [...new Set(r.outils.filter((o): o is string => pick(OUTILS, o) !== undefined))]
    : [];
  const freq = typeof r.frequence === 'number' && Number.isInteger(r.frequence) &&
    r.frequence >= 0 && r.frequence < FREQ[main].opts.length ? r.frequence : null;
  const a: Answers = {
    metier: pick(METIERS, r.metier),
    taille: pick(TAILLES, r.taille),
    douleurs,
    blocage: pick(BLOCAGES[main].opts, r.blocage) ?? null,
    ou: pick(OU, r.ou),
    qui: pick(QUI, r.qui),
    outils,
    frequence: freq,
  };
  if (!a.metier || !a.taille || !a.blocage) return null;
  return a;
}
