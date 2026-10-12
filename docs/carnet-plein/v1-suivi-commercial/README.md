# Carnet plein — version 1 « suivi commercial » (archive)

Archivée le 12 octobre 2026, juste avant la refonte « home + pages métier ».

Cette version était une page unique, servie sur `carnetplein.visionbds.com`. Elle vendait un système de suivi commercial (quiz, CRM, relances) à toute entreprise locale vendant sur devis. Elle n'a jamais été mise en ligne ni commitée : ce dossier en est la seule trace.

## Ce que contient ce dossier

- `README.md` : ce document. La structure de la page, tous ses textes, et les choix de design.
- `source/` : les fichiers tels qu'ils étaient, avec l'extension `.txt` pour rester hors de la compilation et du lint.

| Fichier archivé | Emplacement d'origine | Rôle |
| --- | --- | --- |
| `page.tsx.txt` | `src/app/carnet-plein/page.tsx` | La page et ses sections |
| `meta.ts.txt` | `src/content/carnet-plein/meta.ts` | Titre, prix, étapes, FAQ, scènes des onglets |
| `Journey.tsx.txt` | `src/app/carnet-plein/Journey.tsx` | Le parcours en quatre onglets |
| `Calculator.tsx.txt` | `src/app/carnet-plein/Calculator.tsx` | Le calculateur à cinq champs |
| `Booking.tsx.txt` | `src/app/carnet-plein/Booking.tsx` | Le bouton et la fenêtre de rendez-vous |
| `carnet.css.txt` | `src/app/carnet-plein/carnet.css` | Tous les styles |
| `layout.tsx.txt` | `src/app/carnet-plein/layout.tsx` | Polices et métadonnées |

## Pour la remettre en service

1. Copier chaque fichier de `source/` à son emplacement d'origine, sans le `.txt`.
2. Vérifier que `next.config.ts` contient toujours le sous-domaine `carnetplein` (préfixe `/carnet-plein`).
3. Lancer le serveur de dev et ouvrir `http://carnetplein.localhost:<port>/`.

Rien d'autre n'était nécessaire : pas de base de données, pas de route d'API. La prise de rendez-vous passait par un agenda Calendly intégré (`calendly.com/juliend-visionbds/audit`).

## Structure de la page

| # | Section | Ancre | Ce qu'elle contenait |
| --- | --- | --- | --- |
| 1 | En-tête | `#haut` | Logo, quatre liens d'ancre, bouton « Parlons de vos ventes » |
| 2 | Hero | — | Titre, texte, deux boutons, illustration « quiz → opportunités → relance », bandeau de trois réassurances |
| 3 | Le vrai manque à gagner | — | Constat, statistique Harvard Business Review, quatre situations vécues par le prospect |
| 4 | Du premier clic au prochain devis signé (fond pétrole) | — | Parcours en quatre onglets, chacun avec son explication et un exemple |
| 5 | Ce que nous installons | `#offre` | Texte, encadré sur l'acquisition de trafic, cinq livrables |
| 6 | Le potentiel de vos demandes actuelles | `#calcul` | Calculateur : quatre champs, un curseur, un panneau de résultat |
| 7 | La mise en place | `#deroule` | Trois étapes côte à côte |
| 8 | Pour qui | — | Deux listes (pour vous / pas pour vous), quinze métiers, trois limites assumées |
| 9 | Les tarifs | `#tarifs` | Audit 0 €, installation 970 € HT, suivi 490 € HT par mois |
| 10 | Questions | `#questions` | Six questions |
| 11 | Dernier appel à l'action | `#audit` | Titre, texte, bouton « Parlons de vos ventes », mention « 15 min, audit gratuit » |
| 12 | Pied de page | — | Logo, mention « offre de vision », lien « Parlez à un associé » |

Les quatre boutons et liens de contact ouvraient la même fenêtre de rendez-vous.

## Textes de la page

Extraits du rendu réel de la page, dans l'ordre d'affichage. Les blocs sont séparés par un trait. `[bouton]` et `[lien]` signalent les éléments cliquables.

---

Carnet plein

par vision

Ce que nous installons

Le calcul

Tarifs

Questions

[bouton] Parlons de vos ventes

---

*Libellé :* Votre suivi commercial, sans fuite

### Plus de rendez-vous sans payer plus de pub

Nous installons le système de vente complet qui qualifie vos prospects, organise votre suivi et relance vos devis. Pour signer plus de projets avec les demandes que vous recevez déjà.

[bouton] Parlons de vos ventes→

[lien] Comment ça se passe

De la demande à la signature

●

Tout est relié

01 / Le quiz sur votre site

Parlons de votre projet.

Remplacer mes fenêtres

Équiper du neuf

Vos opportunités

•••

Qualifiées · 1

Projet fenêtres

6 fenêtres · Bordeaux

À rappeler

Devis envoyés · 1

Projet cuisine

Devis transmis hier

Relance prévue

Signées · 1

Projet piscine

Accord client reçu

✓ Gagné

↗

Le bon message. Au bon moment.

Une relance prévue pour chaque devis à suivre.

Illustration du système · données fictives

- Un parcours à votre image
- Des relances selon vos règles
- Votre équipe garde la main

---

*Libellé :* Le vrai manque à gagner

#### Entre les chantiers, les appels et les urgences, le suivi passe après le reste

Votre pub, votre fiche Google, vos camions, le bouche-à-oreille : tout ça envoie déjà du monde quelque part. Ce « quelque part », c’est souvent un numéro en haut, une galerie de photos et un formulaire auquel personne ne répond. Dépenser plus en pub, c’est remplir plus vite un seau percé.

7×

Une entreprise qui rappelle dans l’heure a environ sept fois plus de chances d’avoir un vrai échange avec le demandeur que celle qui attend davantage. Délai moyen constaté : 42 heures.

Harvard Business Review, 2011, étude menée sur 2 241 entreprises américaines.

##### Ce que vit votre prospect quand il vous contacte

- Le numéro est introuvable, ou il sonne dans le vide.
- Aucun prix, aucune première étape. Il doit « demander un devis » et attendre.
- Le formulaire part, et rien ne revient. Ni SMS, ni mail, ni appel.
- Las d’attendre, il finit par aller chez le concurrent.

Aucune de ces situations ne se règle avec plus de pub.

---

*Libellé :* Du premier clic au prochain devis signé

#### Un suivi commercial qui transforme vos prospects en clients

La pub et le référencement, on vous les a déjà proposés cinquante fois. Ils envoient du monde ; c’est la page et l’offre qui décident de ce que vaut cet argent. On s’occupe de cette partie-là : celle qui fait rendre tout le reste.

Un quiz à l’entrée. Un CRM au centre. Et à chaque étape, une prochaine action claire.

[bouton] 01Qualifier la demande

[bouton] 02Organiser le suivi

[bouton] 03Relancer au bon moment

[bouton] 04Piloter les ventes

##### Les bonnes questions, avant le premier appel.

Type de projet, localisation, budget, délai : votre visiteur répond à un court quiz adapté à votre métier. Vous recevez une demande exploitable, avec le contexte pour bien démarrer.

Demande qualifiée

###### 6 fenêtres à remplacer

Maison à Bordeaux · projet sous 3 moisPropriétaire · budget renseignéProchaine étape : un échange avec votre équipe

Parcours illustratif · configuration adaptée à votre entreprise

---

*Libellé :* Ce que nous installons

#### Votre nouvelle routine commerciale. Prête à travailler.

Nous construisons le parcours, connectons les outils et configurons les automatisations. Votre équipe se concentre sur les échanges qui font avancer les projets.

Et pour attirer plus de demandes ?

L’acquisition de trafic peut s’ajouter ensuite : campagnes publicitaires et pages dédiées. Une prestation optionnelle, avec un budget distinct.

✓

##### Un quiz à votre image

Un parcours sur un sous-domaine dédié, relié à votre site, vos campagnes ou vos réseaux sociaux.

✓

##### Un CRM organisé pour votre métier

Chaque prospect a sa fiche, un responsable, une étape et une prochaine action. Votre CRM actuel est étudié avant de choisir les outils.

✓

##### Des réponses et des relances automatisées

Confirmation de demande, invitation à prendre rendez-vous, suivi des devis et reprise des projets reportés.

✓

##### Une vue claire sur vos conversions

Demandes, rendez-vous, devis, ventes et motifs de perte : vous voyez où agir pour améliorer le parcours.

✓

##### Une mise en route accompagnée

Paramétrage, tests et prise en main avec votre équipe, puis suivi et ajustements selon le périmètre convenu.

---

*Libellé :* Le potentiel de vos demandes actuelles

#### Et si vous signiez quelques projets de plus ?

Faites varier vos chiffres pour visualiser ce qu’une meilleure conversion pourrait représenter.

- Demandes reçues par mois

appels, formulaires, messages

- Rendez-vous pris sur ces demandes

visites, métrés, devis sur place

- Rendez-vous qui deviennent un chantier

sur cent

%

- Valeur moyenne d’un chantier

hors taxes

€

- Rendez-vous en plus par mois

une hypothèse, à vous de la régler

+

2

Votre calcul

Estimation

- Demandes qui repartent sans rendez-vous
  → 34 sur 40
- Ce que vaut un rendez-vous de plus
  → 3 960 €
- 2 rendez-vous de plus par mois, sur un an
  → 95 040 €

L’installation (970 € HT) représente 1 rendez-vous supplémentaire. Chiffre d’affaires, pas marge : à vous d’appliquer la vôtre.

---

*Libellé :* La mise en place

#### On part de votre façon de vendre.

- Comprendre

##### On repère les demandes qui se perdent.

Vos sources de contacts, vos outils, vos délais de réponse et votre suivi des devis. Nous identifions les étapes à améliorer.

- Construire

##### Vous validez. Nous installons.

Le quiz, le pipeline et les messages sont définis avec vous. Le périmètre, le calendrier et le prix sont validés avant le démarrage.

- Faire progresser

##### Votre équipe prend la main.

Nous testons le parcours ensemble, puis suivons les conversions pour ajuster les questions, les relances et les prochaines actions.

---

*Libellé :* Pour qui

#### On ne prend pas tout le monde, et on ne promet pas tout.

##### C’est pour vous si

- Un chantier ou une prestation vaut 1 000 € ou plus, ou revient chaque année.
- Des gens vous cherchent déjà : pub, fiche Google, bouche-à-oreille, véhicules.
- C’est vous qui décidez, avec une équipe de 2 à 20 personnes.
- Quelqu’un peut rappeler une demande dans l’heure.

##### Ce n’est pas pour vous si

- Restaurants et commerces : les marges sont trop fines pour que le calcul tienne.
- Paniers de moins de 200 €.
- Franchises : la décision se prend au siège.
- Personne pour décrocher. On règle ça d’abord, ou on ne commence pas.
- Couverture
- Charpente
- Traitement de l’humidité
- Assainissement
- Piscines
- Spas et saunas
- Pergolas et vérandas
- Menuiseries
- Portails et clôtures
- Cuisines
- Pompes à chaleur
- Ravalement
- Paysagisme
- Sols en résine
- Éclairage extérieur

##### Pas de chiffre d’affaires garanti

On s’engage sur ce qu’on construit et sur ce qu’on mesure. Le téléphone, c’est vous qui y répondez.

##### Pas de trafic en plus

On ne vend ni publicité ni référencement. On fait rendre davantage ce que vous payez déjà.

##### Pas plus de demandes que vous ne pouvez en traiter

Une bonne page devant une entreprise qui ne rappelle pas, ça dessert tout le monde. On commence par la relance.

---

*Libellé :* Les tarifs

#### Vous connaissez le prix avant de démarrer.

Vous payez l’installation une seule fois, puis un suivi mensuel que vous arrêtez quand vous voulez.

##### L’audit

pour commencer

0 €

15 min, sans engagement

- Vous faites le point sur le traitement de vos demandes
- Vous voyez à quelles étapes elles se perdent
- Vous repartez avec un plan clair

##### L’installation

une seule fois

970 €

HT

- Votre quiz, à votre image
- Votre CRM, organisé pour votre métier
- Vos réponses et vos relances, automatisées selon vos règles
- Votre équipe accompagnée pour la prise en main

##### Le suivi

chaque mois

490 €

HT, sans engagement de durée

- Vous suivez vos conversions, des demandes aux ventes
- Vos questions et vos relances s’ajustent selon les résultats
- Vous arrêtez quand vous voulez

Plus tard, à la performance. Une fois vos chiffres établis, vous pouvez passer à un prix par rendez-vous pris.

---

*Libellé :* Questions

#### Ce qu’on nous demande avant de commencer.

**Q.** Je dois refaire mon site ?

Non. On construit les pages d’arrivée, l’offre et la relance. Votre site reste en place : ce sont vos pubs et vos liens qui pointent vers les nouvelles pages.

**Q.** Je ne fais pas de pub en ligne. Ça vaut quand même le coup ?

Oui, si des gens vous cherchent déjà : fiche Google, bouche-à-oreille, véhicules, panneaux de chantier. Si presque personne n’arrive chez vous, on vous le dit à l’audit et on ne vous vend rien.

**Q.** Vous utilisez l’intelligence artificielle ?

Oui, pour construire et tester vite : c’est ce qui permet de livrer en quelques jours ce qui demandait plusieurs semaines et quatre métiers. Mais ce que vous achetez, ce sont des rendez-vous, pas une technologie.

**Q.** Qu’est-ce que vous attendez de moi ?

Vos accès (site, fiche Google, compte publicitaire s’il existe), des photos de vos chantiers, trente minutes au départ. Et que quelqu’un rappelle les demandes vite : c’est la seule partie qu’on ne peut pas faire à votre place.

**Q.** Et si ça ne donne rien ?

Vous le voyez dans le rapport du lundi, sur vos propres chiffres, et vous arrêtez le suivi quand vous voulez. On ne garantit pas un chiffre d’affaires : on s’engage sur ce qu’on construit et sur ce qu’on mesure.

**Q.** Qui est derrière Carnet plein ?

vision, une agence fondée par trois associés : Julien Devoir, Clément Samson et Clément Bernard. Ce sont eux qui mènent l’audit et qui construisent.

---

#### Vos prochaines ventes sont peut-être déjà dans vos demandes.

Regardons ensemble comment vous les traitez aujourd’hui, et ce que nous pourrions faire avancer.

[bouton] Parlons de vos ventes→

15 min, audit gratuit

---

Carnet plein

par vision

Carnet plein est une offre de vision. Une question avant de demander l’audit ?

[bouton] Parlez à un associé

.

### Textes cachés dans les onglets du parcours

La page n'affichait qu'un onglet à la fois. Les quatre scènes complètes :

| Onglet | Titre | Explication | Étiquette | Exemple |
| --- | --- | --- | --- | --- |
| 01 Qualifier la demande | Les bonnes questions, avant le premier appel. | Type de projet, localisation, budget, délai : votre visiteur répond à un court quiz adapté à votre métier. Vous recevez une demande exploitable, avec le contexte pour bien démarrer. | Demande qualifiée | 6 fenêtres à remplacer — Maison à Bordeaux · projet sous 3 mois / Propriétaire · budget renseigné / Prochaine étape : un échange avec votre équipe |
| 02 Organiser le suivi | Chaque demande trouve sa place. | Les réponses alimentent une fiche prospect. Le dossier est attribué, priorisé selon vos critères et associé à une prochaine action. Votre équipe sait qui rappeler, et pourquoi. | Nouveau dossier dans le CRM | Un projet prêt à être suivi — Responsable : équipe commerciale / Étape : demande qualifiée / Prochaine action : proposer un rendez-vous |
| 03 Relancer au bon moment | Le suivi continue après l’envoi du devis. | Un devis sans retour ? Une relance est prévue selon le calendrier validé avec vous. Un projet reporté ? Une date de reprise est enregistrée. Les messages s’adaptent à l’étape du dossier. | Exemple de relance | « Avez-vous pu regarder votre devis ? » — Bonjour, je reste disponible pour répondre à vos questions sur votre projet de fenêtres. Souhaitez-vous que nous en parlions ? |
| 04 Piloter les ventes | Vous voyez où vos ventes avancent. | Suivez le passage des demandes aux rendez-vous, des devis aux signatures. Repérez les dossiers bloqués et les motifs de perte pour améliorer votre suivi avec des données concrètes. | Vue commerciale | Une prochaine action pour chaque projet — Demandes → rendez-vous → devis → signatures / Dossiers sans prochaine action à surveiller / Projets reportés à recontacter à la bonne date |

### Texte de la fenêtre de rendez-vous

- Étiquette : Audit gratuit · 15 min
- Titre : On repère où vos demandes se perdent
- Étape 1 : **Vous racontez le parcours d’une demande.** Qui répond, sous quel délai, avec quels outils, jusqu’au devis.
- Étape 2 : **On repère les étapes où elle se perd.** Réponse tardive, devis sans relance, projet reporté jamais repris.
- Étape 3 : **Vous repartez avec un plan clair**, même si on ne travaille pas ensemble.
- Bas de colonne : photos des trois associés, « Gratuit · sans engagement / En visio ou par téléphone »

## Design

Le design n'a pas changé avec la refonte : la nouvelle version reprend les mêmes jetons.

- **Jetons** : design system Sodobat. Pétrole `#0E5A5F` comme seule couleur de marque, neutres chauds (fond `#F6F6F4`, encre `#16181A`), cartes blanches à filet 1 px `#E6E6E2` et rayon 12, pas d'ombres, vert et rouge réservés au favorable et au défavorable.
- **Typographie** : Geist pour tout, Geist Mono pour les codes et numéros.
- **Mise en page** : reprise de la page « Vision Conversion » (hero en deux colonnes, bandeau de réassurance, section sombre, grilles de cartes, panneau final).
- **Largeur** : contenu plafonné à 1 520 px.
- **Portée des styles** : tout est sous la classe `.cp`, pour ne rien toucher sur le site vision.

## Ce qui avait précédé

Deux états antérieurs n'ont pas été conservés en fichiers :

- Une première maquette « carnet à souches » (papier jaune et rose, écriture manuscrite, tampons), rejetée pour son design.
- Une première offre « page, offre, relance » inspirée d'un guide sur les agences pour entreprises locales : six mécanismes, rapport du lundi en cinq chiffres, tarifs à 2 900 € et 1 200 €. Les six mécanismes et le rapport du lundi ont été retirés de la page au fil des retours.
