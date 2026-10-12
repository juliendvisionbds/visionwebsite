import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRICES, fr } from "@/content/carnet-plein/meta";
import { NICHES, getNiche } from "@/content/carnet-plein/niches";
import { faqPage, jsonLdHtml } from "@/lib/seo";
import Booking from "../Booking";
import Phone from "../Phone";
import Simulator from "../Simulator";
import { Changes, Eyebrow, Faq, FinalCta, Fit, Footer, Header, Pricing } from "../sections";
import { heading } from "../text";

// Une page = un métier inscrit dans NICHES (src/content/carnet-plein/niches) ; toute autre adresse renvoie une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return NICHES.map((n) => ({ niche: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/carnet-plein/[niche]">): Promise<Metadata> {
  const n = getNiche((await params).niche);
  if (!n) return {};
  const { title, description } = n.seo;
  return {
    title,
    description,
    alternates: { canonical: `/${n.slug}/` },
    openGraph: { title, description, url: `/${n.slug}/`, siteName: "Carnet plein", locale: "fr_FR", type: "website" },
    twitter: { card: "summary", title, description },
  };
}

/** La page d'un métier : les dix mêmes sections pour tous, remplies avec les textes du métier. */
export default async function Page({ params }: PageProps<"/carnet-plein/[niche]">) {
  const n = getNiche((await params).niche);
  if (!n) notFound();

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqPage(n.faq)) }} />

      <Header
        home="/"
        links={[
          ["#ecrans", "Comment ça marche"],
          ["#relances", "Les relances"],
          ["#tarifs", "Tarifs"],
          ["#questions", "Questions"],
        ]}
      />

      <main>
        <section className="hero">
          <div className="in">
            <div className="hero-grid">
              <div>
                <p className="eyebrow dot">{n.hero.kicker}</p>
                <h1>{heading(n.hero.title)}</h1>
                <p className="lede">{fr(n.hero.text)}</p>
                <div className="cta">
                  <Booking>
                    {n.cta} <span aria-hidden="true">→</span>
                  </Booking>
                </div>
              </div>
              <div className="art">
                <Phone screen={n.hero.screen} />
                <p className="art-note">Exemple fictif</p>
              </div>
            </div>
            <ul className="trust">
              {n.hero.points.map((point) => (
                <li key={point}>{fr(point)}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section dark">
          <div className="in problem">
            <div>
              <Eyebrow label="Le client perdu" />
              <h2>{heading(n.story.title)}</h2>
              {n.story.text.map((paragraph) => (
                <p key={paragraph} className="lede">
                  {fr(paragraph)}
                </p>
              ))}
            </div>
            <div className="losses">
              <h3>{n.story.todayTitle}</h3>
              <ol>
                {n.story.today.map((line) => (
                  <li key={line}>{fr(line)}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <Changes items={n.changes} />

        <section className="section band" id="ecrans">
          <div className="in">
            <Eyebrow label={n.screens.kicker} />
            <h2>{heading(n.screens.title)}</h2>
            <div className="screens">
              <article className="screen">
                <header>
                  <b>{n.screens.visitor ?? "Ce que voit votre visiteur"}</b>
                  <span className="badge">Exemple fictif</span>
                </header>
                <div className="quiz">
                  <p className="quiz-title">{fr(n.screens.quiz.title)}</p>
                  <ol>
                    {n.screens.quiz.questions.map(([question, options, note]) => (
                      <li key={question}>
                        <b>{fr(question)}</b>
                        {options.length > 0 && (
                          <div>
                            {options.map((option) => (
                              <span key={option}>{fr(option)}</span>
                            ))}
                          </div>
                        )}
                        {note && <small>{fr(note)}</small>}
                      </li>
                    ))}
                  </ol>
                  <p className="quiz-result">{fr(n.screens.quiz.result)}</p>
                </div>
              </article>
              <article className="screen">
                <header>
                  <b>Le message qui part tout seul</b>
                  <span className="badge">Exemple fictif</span>
                </header>
                <div className="thread">
                  <p className="sms">{fr(n.screens.message)}</p>
                </div>
              </article>
              <article className="screen">
                <header>
                  <b>Votre liste du matin</b>
                  <span className="badge">Exemple fictif</span>
                </header>
                <ul className="morning">
                  {n.screens.list.map(([client, project, next]) => (
                    <li key={client}>
                      <b>{client}</b>
                      <span>{fr(project)}</span>
                      <i className="badge brand">{fr(next)}</i>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section" id="relances">
          <div className="in">
            <Eyebrow label="Les relances, jour par jour" />
            <h2>{heading(n.followups.title)}</h2>
            {n.followups.intro && <p className="lede">{n.followups.intro}</p>}
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Quand</th>
                    <th>Canal</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {n.followups.rows.map(([when, channel, message]) => (
                    <tr key={when}>
                      <td>{when}</td>
                      <td data-label="Canal">{channel}</td>
                      <td data-label="Message">{fr(message)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="table-note">{fr(n.followups.note)}</p>
          </div>
        </section>

        <section className="section flush" id="simulateur">
          <div className="in">
            <Eyebrow label="Le simulateur" />
            <h2>Faites le calcul avec vos chiffres</h2>
            <Simulator {...n.simulator} install={PRICES.install} />
          </div>
        </section>

        <section className="section band">
          <div className="in report">
            <div>
              <Eyebrow label="Le rapport du lundi" />
              <h2>{heading(n.report.title)}</h2>
              <p className="lede">{fr(n.report.note)}</p>
            </div>
            <article className="screen">
              <header>
                <b>SMS du lundi</b>
                <span className="badge">Exemple fictif</span>
              </header>
              <div className="thread">
                <div className="sms">
                  <p>{n.report.week}</p>
                  <dl>
                    {n.report.figures.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{fr(value)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </article>
          </div>
        </section>

        <Fit title="On ne prend pas tout le monde." yes={n.fit.yes} no={n.fit.no} />
        <Pricing />
        <Faq items={n.faq} />
        <FinalCta title={n.final} cta={n.cta} />
      </main>

      <Footer home="/" />
    </>
  );
}
