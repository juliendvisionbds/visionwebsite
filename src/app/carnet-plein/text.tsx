import { fr } from "@/content/carnet-plein/meta";

/** Texte d'un titre : les mots composés (peut-être, rendez-vous, est-elle) ne se coupent pas en fin de ligne. */
export function heading(text: string) {
  return fr(text)
    .split(/(\S+-\S+)/)
    .map((part, i) =>
      i % 2 ? (
        <span key={i} className="nw">
          {part}
        </span>
      ) : (
        part
      )
    );
}
