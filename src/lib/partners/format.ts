/** Mise en forme française des montants, taux et dates. */

export const euro = (n: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 }).format(n);

export const percent = (n: number) => `${String(n).replace(".", ",")} %`;

const DAY = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short", year: "numeric", timeZone: "Europe/Paris" });
export const day = (iso: string) => DAY.format(new Date(iso));

/** Aujourd'hui à Paris, au format AAAA-MM-JJ (valeur d'un champ date). */
export const today = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris" }).format(new Date());

/** Lecture d'un champ de formulaire texte, nettoyé et borné. */
export const field = (form: FormData, name: string, max = 200) => {
  const v = form.get(name);
  return typeof v === "string" ? v.trim().slice(0, max) : "";
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
