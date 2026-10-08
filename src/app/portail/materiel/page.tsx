import type { Metadata } from "next";
import { CopyButton } from "@/components/app/buttons";
import { requirePartner } from "@/lib/partners/auth";
import { MATERIALS, PITCH, PLAYBOOK, SIGNALS, TARGETS, introEmail } from "@/lib/partners/kit";
import Shell from "../Shell";

export const metadata: Metadata = { title: "Kit de recommandation" };

export default async function Page() {
  const partner = await requirePartner();
  const email = introEmail(partner.name);

  return (
    <Shell active="kit">
      <div className="app-head">
        <div>
          <h1>Kit de recommandation</h1>
          <p>Tout ce qu’il vous faut pour parler de vision : deux présentations à partager, et l’email de mise en contact prêt à envoyer.</p>
        </div>
      </div>

      <section className="card flat">
        <div className="card-head">
          <h2>vision en une phrase</h2>
          <CopyButton text={PITCH} />
        </div>
        <p style={{ fontSize: 17, maxWidth: "78ch" }}>{PITCH}</p>
      </section>

      <section className="docs" aria-label="Présentations à télécharger">
        {MATERIALS.map((m, i) => (
          <article key={m.id} className={`card doc${i ? " yellow" : ""}`}>
            <span className="tag">PDF · 1 page</span>
            <h2>{m.title}</h2>
            <p>{m.text}</p>
            <p className="when">{m.when}</p>
            <div className="row">
              <a className="btn btn-primary" href={m.file} download>
                Télécharger
              </a>
              <a className="btn btn-ghost" href={m.file} target="_blank" rel="noopener">
                Ouvrir
              </a>
            </div>
          </article>
        ))}
      </section>

      <section className="card" id="email">
        <div className="card-head">
          <div>
            <h2>L’email de mise en contact</h2>
            <p>À envoyer au dirigeant que vous nous présentez, avec nos deux adresses en copie. Remplacez [Prénom], joignez la présentation de l’agence.</p>
          </div>
          <div className="row">
            <a className="btn btn-primary" href={email.mailto}>
              Ouvrir dans ma messagerie
            </a>
            <CopyButton className="btn btn-ghost" text={email.body}>
              Copier le texte
            </CopyButton>
          </div>
        </div>
        <div className="mail">
          <div className="mail-row">
            <span>À</span>
            <span className="muted">Le dirigeant que vous nous présentez</span>
          </div>
          <div className="mail-row">
            <span>Cc</span>
            <b>{email.cc.join(", ")}</b>
            <CopyButton text={email.cc.join(", ")} />
          </div>
          <div className="mail-row">
            <span>Objet</span>
            <b>{email.subject}</b>
            <CopyButton text={email.subject} />
          </div>
          <div className="mail-body">{email.body}</div>
        </div>
      </section>

      <div className="cols">
        <section className="card flat" id="qui">
          <div className="card-head">
            <h2>Qui recommander</h2>
          </div>
          <ul className="plays">
            {TARGETS.map(([who, detail]) => (
              <li key={who}>
                <b>{who}</b>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <h3 style={{ margin: "22px 0 12px" }}>Les phrases qui doivent vous faire penser à nous</h3>
          <div className="chips">
            {SIGNALS.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </section>

        <section className="card flat">
          <div className="card-head">
            <h2>Quoi envoyer, et quand</h2>
          </div>
          <ul className="plays">
            {PLAYBOOK.map(([situation, action]) => (
              <li key={situation}>
                <b>{situation}</b>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Shell>
  );
}
