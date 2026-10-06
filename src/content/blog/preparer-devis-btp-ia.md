---
title: Devis BTP avec l'IA : quelles informations fournir pour obtenir un brouillon exploitable ?
seoTitle: Devis BTP avec l'IA : quoi fournir pour un brouillon fiable
description: Un devis BTP préparé par l'IA vaut ce que valent les informations fournies. Liste des données à donner, exemple demande → brouillon → corrections, points à relire.
tag: Prix & devis
date: 2026-10-06
cover: /blog/preparer-devis-btp-ia/devis-btp-ia.jpg
coverAlt: Une main annote au crayon le plan d'une extension de maison, devant un écran affichant un devis dont quelques lignes sont surlignées.
author: Julien Devoir
authorRole: Cofondateur de vision · Produit & systèmes
authorPhoto: /team/julien.jpg
sideTitle: Des brouillons à partir de vos prix ?
sideText: 30 minutes pour regarder vos devis récents, où sont vos prix, et ce qu'il faudrait pour des brouillons fiables.
sideLink: Parlons de vos devis →
---

Demandez à un assistant IA généraliste de « faire un devis pour une extension de 25 m² en parpaings », et vous obtiendrez en quelques secondes un document propre, bien structuré, avec des lignes, des quantités et des prix.

Le problème, ce sont les prix. Ils ne viennent ni de vos factures, ni de vos rendements, ni de vos coefficients. Ils sont plausibles, et c'est justement ce qui les rend dangereux : rien ne signale qu'ils sont faux pour votre entreprise.

Un devis préparé avec l'IA peut faire gagner beaucoup de temps. Mais sa qualité dépend presque entièrement **de ce qu'on lui fournit**. Ce guide détaille les informations à donner, montre un exemple complet, de la demande client au brouillon puis aux corrections, et liste ce qu'il faut toujours vérifier avant envoi.

:: En bref
- L'IA ne connaît pas vos prix. Sans **votre base de prix et vos anciens devis**, elle invente des montants plausibles.
- Un bon brouillon commence par une **demande qualifiée** : plans, accès, périmètre, délais.
- Le brouillon le plus utile est celui qui **signale ce qui manque**, pas celui qui paraît complet.
- Chaque ligne doit indiquer **d'où vient son prix**.
- La relecture reste humaine : quantités, postes absents, prix datés, engagements.

## Pourquoi un prompt ne suffit pas

Les modèles de prompts « devis BTP » circulent beaucoup. Ils aident à obtenir une structure et des libellés corrects. Mais ils laissent l'IA combler seule trois manques :

- **Les prix.** Sans données, l'IA produit une moyenne vraisemblable. Elle ne sait pas que votre centrale à béton est à 8 km, ni que vos équipes montent un mur plus vite que la moyenne.
- **Le périmètre.** Elle suppose ce qui est inclus ou non. Une hypothèse fausse sur l'évacuation des terres ou la liaison avec l'existant peut coûter plus cher que le temps gagné.
- **Les informations absentes.** Un assistant généraliste a tendance à compléter plutôt qu'à demander. Un brouillon qui ne signale aucun manque n'est pas un bon signe.

La différence entre un devis « généré » et un brouillon exploitable tient donc moins à l'outil qu'aux données sur lesquelles il travaille.

## Étape 1 — Qualifier la demande

Avant toute préparation, rassemblez ce que le client a fourni et repérez ce qui manque. C'est la même chose que vous feriez à la main, mais l'écrire permet à l'IA de travailler sur une base claire.

| Information | Pourquoi elle compte | Si elle manque |
|---|---|---|
| Plans, coupes, photos | Quantités et ouvrages | Brouillon en hypothèses, à confirmer |
| Adresse et accès | Installation de chantier, engins, évacuation | Ligne « à confirmer après visite » |
| Périmètre demandé | Ce qui est inclus et ce qui relève d'autres corps d'état | Liste d'exclusions explicite |
| Nature du sol (étude, sondages) | Fondations | Hypothèse « terrain ordinaire » signalée |
| Délais souhaités | Planning, faisabilité | Question au client |
| Matériaux ou finitions imposés | Prix et références | Variante ou option |

## Étape 2 — Fournir votre base de prix et vos références

C'est l'étape qui transforme une réponse générique en brouillon utile. L'IA doit pouvoir s'appuyer sur :

- **votre base de prix**, avec des prix datés et sourcés, en distinguant prix d'achat, déboursé et prix de vente. Si elle n'existe pas encore, commencez par là : [créer sa bibliothèque de prix BTP à partir de ses anciens devis et factures](/blog/creer-bibliotheque-prix-btp/) ;
- **vos devis similaires déjà acceptés** : extensions, dallages, murs de soutènement… Ils donnent vos libellés, votre découpage habituel et vos ordres de grandeur ;
- **vos règles écrites** : coefficients et convention de calcul (voir [comment structurer sa base de chiffrage](/blog/structurer-base-prix-btp/)), postes toujours inclus, exclusions habituelles, mentions et conditions générales.

Ces règles sont souvent dans la tête du chargé d'affaires. Les écrire une fois sert à l'IA, mais aussi au prochain collaborateur qui chiffrera.

## Étape 3 — Exiger que les informations manquantes soient signalées

Un brouillon utile distingue clairement trois statuts pour chaque ligne :

- ✅ **Prix trouvé** dans la base ou un devis similaire récent ;
- ⚠️ **À vérifier** : prix ancien, quantité calculée sur une hypothèse, périmètre incertain ;
- ❓ **Information manquante** : impossible à chiffrer sans réponse du client ou visite.

C'est ce qui distingue un outil de préparation d'un générateur de documents. Un brouillon où tout est vert alors que la demande était incomplète doit éveiller la méfiance.

![Ce que l'IA doit recevoir pour préparer un brouillon exploitable, et les trois statuts qu'il doit afficher. Exemple fictif.](/blog/preparer-devis-btp-ia/informations-a-fournir.svg)

## Exemple : de la demande au brouillon, puis aux corrections

### La demande

:: Message du client
« Bonjour, nous souhaitons faire construire une extension de 25 m² en plain-pied, accolée à notre maison, à Draguignan. Vous trouverez les plans de l'architecte en pièce jointe. Nous avons déjà un charpentier pour la toiture. Pourriez-vous nous faire un devis pour le gros œuvre ? »

*Demande fictive.*

### Le brouillon préparé

| # | Ligne | Qté | Unité | PU HT | Source du prix | Statut |
|---|---|---|---|---|---|---|
| 1 | Installation de chantier | 1 | forfait | 850 € | Devis similaire D-2025-188 | ⚠️ Accès non connu |
| 2 | Fouille en rigole, terrain ordinaire | 6 | m³ | 46 € | Base de prix, 03/2026 | ✅ |
| 3 | Évacuation des terres | ? | t | 19,50 € (achat) | Base de prix, 02/2026 | ❓ Quantité et prix de vente à définir |
| 4 | Semelle filante BA 50×25 | 15 | ml | 98 € | Base de prix, 03/2026 | ✅ |
| 5 | Maçonnerie agglos 20 cm | 40,5 | m² | 68 € | Base de prix, 01/2026 | ⚠️ Ouvertures non déduites |
| 6 | Chaînage BA 20×20 | 15 | ml | 41 € | Base de prix, 12/2025 | ✅ |
| 7 | Linteaux | ? | ml | — | — | ❓ Dimensions des baies à relever sur plan |
| 8 | Dalle BA ép. 15 cm | 25 | m² | 84 € | Base de prix, 03/2026 | ⚠️ Hérisson et isolant sous dalle ? |

*Exemple illustratif : quantités et prix fictifs.*

Ce que le brouillon signale de lui-même : l'accès au chantier, la quantité de terres à évacuer, les linteaux, la composition sous la dalle, et une quantité de maçonnerie calculée sans déduire les ouvertures.

### Les corrections après relecture

Le chargé d'affaires reprend le brouillon en un quart d'heure, plans en main :

- **Maçonnerie** : déduction d'une baie de 2,40 × 2,15 m et d'une fenêtre de 1,20 × 1,25 m, soit 6,66 m². Quantité ramenée à **33,8 m²**.
- **Linteaux** : 2 linteaux ajoutés d'après les plans.
- **Dalle** : ajout d'un hérisson et d'un film polyane, prix repris d'un devis d'extension de 2025, signalés « à revoir ».
- **Évacuation** : estimation des volumes et prix de vente calculé avec le coefficient de l'entreprise.
- **Poste absent, non signalé par le brouillon** : la **liaison avec la maison existante** (harpage ou goujonnage, reprise d'étanchéité). Ajoutée à la main.
- **Exclusions** : charpente, couverture, menuiseries et enduits listés explicitement hors lot.

Le brouillon a fait le travail de recherche et de mise en forme. Les décisions, et un poste oublié, sont venus de la personne qui connaît le métier. C'est exactement la répartition attendue.

![Ce que le brouillon avait signalé, et ce que la relecture a corrigé ou ajouté. Exemple fictif.](/blog/preparer-devis-btp-ia/brouillon-et-corrections.svg)

## Étape 4 — Préparer les lignes

Une fois la demande qualifiée et les manques signalés, l'IA peut préparer les lignes du devis. Ce qu'on attend d'elle :

- reprendre **vos libellés** et votre découpage habituel, pas un vocabulaire générique ;
- calculer les quantités à partir des pièces fournies, **en montrant le calcul** ;
- appliquer les prix de votre base, **avec leur date et leur source** ;
- proposer les postes habituellement présents dans vos devis similaires, même s'ils ne sont pas mentionnés dans la demande ;
- rester **modifiable** : chaque ligne doit pouvoir être corrigée, supprimée ou ajoutée avant export.

## Étape 5 — Relire avant édition et envoi

La relecture n'est pas une formalité. Voici la liste à passer sur chaque brouillon :

1. **Quantités** : déductions d'ouvertures, unités cohérentes, calculs vérifiables.
2. **Postes absents** : liaison avec l'existant, évacuation, protections, nettoyage, réseaux.
3. **Prix datés** : tout prix de plus de six mois sur des fournitures volatiles (béton, acier) est à revoir.
4. **Périmètre et exclusions** : ce qui n'est pas compris doit être écrit.
5. **Hypothèses** : nature du sol, accès, délais. Elles doivent figurer sur le devis.
6. **Marge** : le coefficient appliqué correspond-il au type de chantier et de client ?
7. **Mentions** : validité de l'offre, conditions de paiement, TVA applicable, assurances.

:: Ce que vous gardez en main
L'IA prépare : elle retrouve vos prix, reprend vos lignes, calcule les quantités et signale ce qui manque. Vous décidez : le prix final, le périmètre, les hypothèses écrites et l'envoi. Un devis engage l'entreprise ; il ne part jamais sans relecture.

## Les erreurs les plus fréquentes

- **Utiliser les prix proposés par un assistant généraliste** sans les confronter aux vôtres.
- **Fournir une demande incomplète** et s'étonner que le brouillon le soit aussi.
- **Ne pas exiger la source des prix.** Sans elle, impossible de savoir si un montant est récent ou inventé.
- **Relire seulement les totaux.** Les erreurs se cachent dans les quantités et les postes absents.
- **Transmettre des données clients à un outil en ligne** sans vérifier où elles sont stockées et comment elles sont utilisées.

## Où commencer ?

Si vos devis prennent du temps, mesurez d'abord où ce temps passe : recherche de prix, reprise de lignes, ressaisie ou attente d'informations. Notre méthode pour [repérer les étapes qui vous font perdre du temps sur vos devis](/blog/gagner-temps-devis-batiment/) tient en une semaine.

Chez une entreprise de construction et terrassement d'environ 50 salariés, nous avons construit un espace de préparation qui s'appuie sur la base de prix et les devis passés de l'entreprise : il propose un premier brouillon modifiable, que l'équipe relit et corrige avant export. Le détail est raconté dans le cas d'usage : [Automatisation de devis BTP : de la demande client au devis prêt à valider](/cas/automatisation-devis-btp/).

## Questions fréquentes

### Peut-on faire un devis BTP directement avec ChatGPT ?

Pour la structure et les libellés, oui. Pour les prix, non : un assistant généraliste ne connaît ni vos achats, ni vos rendements, ni vos coefficients. Un brouillon exploitable s'appuie sur votre base de prix et vos anciens devis.

### Quelles informations donner à l'IA ?

La demande et ses pièces (plans, photos, adresse, périmètre, délais), votre base de prix, des devis similaires acceptés, et vos règles écrites : coefficients, inclusions, exclusions, mentions.

### Peut-on envoyer un devis préparé par l'IA sans relecture ?

Non. Le devis engage l'entreprise. L'IA prépare et signale ; une personne du métier vérifie et valide.

### Combien de temps l'IA fait-elle gagner ?

Cela dépend surtout de la qualité de votre base de prix et du type de devis. Le gain porte sur la préparation ; la vérification et la décision restent nécessaires.

### Mes données sont-elles en sécurité ?

Cela dépend de l'outil. Vérifiez où sont stockées les données, si elles servent à entraîner des modèles et qui y a accès avant d'y transmettre vos prix ou vos données clients.

## Vos devis, préparés à partir de vos prix.

En 30 minutes, on regarde vos devis récents, où sont vos prix, et ce qu'il faudrait pour obtenir des brouillons fiables que votre équipe n'a plus qu'à relire.

**[Parlons de la préparation de vos devis →](booking)**
