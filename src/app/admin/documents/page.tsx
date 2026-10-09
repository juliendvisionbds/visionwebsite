import type { Metadata } from "next";
import { requireAdmin } from "@/lib/partners/auth";
import { MATERIALS, PROGRAMME } from "@/lib/partners/kit";
import Shell from "../Shell";

export const metadata: Metadata = { title: "Documents" };

// Les one-pagers à remettre à un futur partenaire : d'abord le programme, puis ce qu'il aura à partager.
const DOCUMENTS = [
  { ...PROGRAMME, use: "Pour lui donner envie de rejoindre le programme." },
  { ...MATERIALS[0], use: "Pour lui présenter l’agence qu’il recommandera." },
  { ...MATERIALS[1], use: "Pour lui montrer ce qu’on vend à ses contacts." },
];

export default async function Page() {
  await requireAdmin();
  return (
    <Shell active="documents">
      <div className="app-head">
        <div>
          <h1>Documents</h1>
          <p>Les one-pagers à remettre à un futur partenaire quand vous lui parlez en direct.</p>
        </div>
      </div>

      <div className="docs three">
        {DOCUMENTS.map((d, i) => (
          <article key={d.id} className={`card doc${i === 0 ? " yellow" : " flat"}`}>
            <span className="tag">PDF · 1 page</span>
            <h2>{d.title}</h2>
            <p>{d.text}</p>
            <p className="when">{d.use}</p>
            <div className="row">
              <a className="btn btn-primary" href={d.file} download>
                Télécharger
              </a>
              <a className="btn btn-ghost" href={d.file} target="_blank" rel="noopener">
                Ouvrir
              </a>
            </div>
          </article>
        ))}
      </div>
    </Shell>
  );
}
