import type { Screen } from "../meta";
import { cuisiniste } from "./cuisiniste";
import { lieuDeReception } from "./lieu-de-reception";
import { solaire } from "./solaire";
import { spa } from "./spa";

/**
 * Une page métier. Toutes suivent les mêmes dix sections (src/app/carnet-plein/[niche]/page.tsx) ; seuls ces textes changent.
 * Ajouter un métier : créer ./<slug>.ts sur le modèle de ./spa.ts, puis l'inscrire dans NICHES. Sa carte apparaît alors sur la home.
 */
export type Niche = {
  /** Adresse de la page : carnetplein.visionbds.com/<slug>/ */
  slug: string;
  /** Les onze variables du template : à remplir avant d'écrire la page. */
  vars: {
    /** Comment le patron se nomme. */
    metier: string;
    /** Ce que le client achète. */
    projet: string;
    /** Qui demande. */
    clientType: string;
    /** Quand la demande arrive. */
    momentDemande: string;
    /** Ce que voit le visiteur. */
    mecanisme: string;
    /** Le rendez-vous proposé. */
    rdv: string;
    /** Ce qui fait hésiter le client. */
    objectionCle: string;
    /** Comment le client remet à plus tard. */
    report: string;
    /** Le moment où relancer les reportés. */
    saison: string;
    /** Demandes propres au métier. */
    sourceSpecifique: string;
    /** Valeur moyenne d'un projet, en euros HT. */
    panier: number;
  };
  /** Carte du sélecteur de la home : nom affiché, nom court (onglet du téléphone d'exemple) et tracé du pictogramme (viewBox 0 0 28 28). */
  card: { name: string; short: string; icon: string };
  seo: { title: string; description: string };
  /** Libellé du bouton de démo sur cette page. */
  cta: string;
  hero: { kicker: string; title: string; text: string; points: string[]; screen: Screen };
  story: { title: string; text: string[]; todayTitle: string; today: string[] };
  changes: Array<[lead: string, text: string]>;
  screens: {
    /** Libellé de la section : « Comment ça marche pour un cuisiniste ». */
    kicker: string;
    title: string;
    /** Intitulé du premier écran, si ce n'est pas « Ce que voit votre visiteur ». */
    visitor?: string;
    /** Une question a des réponses proposées, ou à défaut une précision (« Facultatif »). */
    quiz: { title: string; questions: Array<[question: string, options: string[], note?: string]>; result: string };
    message: string;
    list: Array<[client: string, project: string, next: string]>;
  };
  /** `intro` : phrase placée entre le titre et le tableau, si la séquence ne démarre pas à la demande. */
  followups: { title: string; intro?: string; rows: Array<[when: string, channel: string, message: string]>; note: string };
  /** `share` et `unit` terminent la phrase de sortie : « soit 1/9 d'un spa », « moins de 1/12 d'une cuisine ». */
  simulator: { questions: [string, string, string]; defaults: [number, number, number]; lead: string; tail: string; share: string; unit: string };
  report: { title: string; week: string; figures: Array<[label: string, value: string]>; note: string };
  fit: { yes: string[]; no: string[] };
  faq: Array<[question: string, answer: string]>;
  /** Titre du dernier bloc. */
  final: string;
};

/** Les métiers qui ont une page. La home n'affiche que ceux-là. */
export const NICHES: Niche[] = [spa, solaire, cuisiniste, lieuDeReception];

export const getNiche = (slug: string) => NICHES.find((n) => n.slug === slug);
