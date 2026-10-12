import { CHANGES, DEMO_CTA, FOR_YOU, HERO_POINTS, NOT_FOR_YOU, NO_PROMISE, PRICES, SIMULATOR, TRADES, euro, faq, fr } from "@/content/carnet-plein/meta";
import { NICHES } from "@/content/carnet-plein/niches";
import { faqPage, jsonLdHtml } from "@/lib/seo";
import Booking from "./Booking";
import PhoneRotator from "./PhoneRotator";
import Simulator from "./Simulator";
import { Changes, Eyebrow, Faq, FinalCta, Fit, Footer, Header, Pricing } from "./sections";

/** La home : elle fait comprendre l'offre en dix secondes, puis envoie chaque visiteur vers la page de son métier. */
export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqPage(faq)) }} />

      <Header
        home="#haut"
        links={[
          ["#metiers", "Votre métier"],
          ["#resultats", "Ce qui change"],
          ["#tarifs", "Tarifs"],
          ["#questions", "Questions"],
        ]}
      />

      <main>
        <section className="hero">
          <div className="in">
            <div className="hero-grid">
              <div>
                <h1>
                  Vous recevez déjà des demandes. <em>Vous en signez trop peu.</em>
                </h1>
                <p className="lede">
                  {fr(
                    "Carnet plein répond à chaque demande en moins d’une minute, relance chaque devis à votre place, et vous dit chaque lundi ce qui marche. Pour les entreprises qui vendent des projets à plus de 1 000 €."
                  )}
                </p>
                <div className="cta">
                  <a className="btn" href="#metiers">
                    Voir ce que ça donne pour mon métier <span aria-hidden="true">↓</span>
                  </a>
                  <Booking className="btn outline">{DEMO_CTA}</Booking>
                </div>
              </div>
              <div className="art">
                <PhoneRotator items={NICHES.map((n) => ({ tab: n.card.short, screen: n.hero.screen }))} />
                <p className="art-note">Exemples fictifs</p>
              </div>
            </div>
            <ul className="trust">
              {HERO_POINTS.map((point) => (
                <li key={point}>{fr(point)}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" id="metiers">
          <div className="in">
            <h2>Choisissez votre métier</h2>
            <div className="metiers">
              {NICHES.map((n) => (
                <a key={n.slug} className="metier" href={`/${n.slug}/`}>
                  <svg viewBox="0 0 28 28" aria-hidden="true">
                    <path d={n.card.icon} />
                  </svg>
                  <b>{n.card.name}</b>
                  <span>
                    Projet moyen : {euro(n.vars.panier)} HT
                  </span>
                  <i>
                    Voir la page <span aria-hidden="true">→</span>
                  </i>
                </a>
              ))}
              <Booking className="metier">
                <svg viewBox="0 0 28 28" aria-hidden="true">
                  <path d="M14 6v16M6 14h16" />
                </svg>
                <b>Autre métier</b>
                <span>On prépare la démo pour le vôtre</span>
                <i>
                  Recevoir ma page refaite <span aria-hidden="true">→</span>
                </i>
              </Booking>
            </div>
          </div>
        </section>

        <section className="section dark">
          <div className="in problem">
            <div>
              <Eyebrow label="Le client perdu" />
              <h2>Le client qui a signé ailleurs avait d’abord appelé chez vous</h2>
              <p className="lede">
                Samedi, 15h. Une famille remplit votre formulaire pour son projet. Vous êtes en rendez-vous, puis chez vous. Lundi, vous
                rappelez. Ils ont déjà vu quelqu’un d’autre, celui qui avait répondu le samedi.
              </p>
              <p className="lede">
                Ce n’est pas un problème de pub. Ces gens vous avaient trouvé. Ils sont partis parce que personne n’a répondu à temps, ou que
                le devis n’a jamais été relancé.
              </p>
            </div>
            <div className="fact">
              <b>×7</b>
              <p>
                {fr("Répondre dans l’heure multiplie par 7 les chances d’avoir un vrai échange. Délai moyen constaté : 42 heures.")}
                <small>Harvard Business Review</small>
              </p>
            </div>
          </div>
        </section>

        <Changes items={CHANGES} />

        <section className="section band">
          <div className="in">
            <Eyebrow label="Comment ça marche" />
            <h2>Le même principe, adapté à chaque métier</h2>
            <div className="table">
              <table>
                <thead>
                  <tr>
                    <th>Métier</th>
                    <th>Ce que voit le visiteur</th>
                    <th>Le rendez-vous proposé</th>
                  </tr>
                </thead>
                <tbody>
                  {TRADES.map((t) => (
                    <tr key={t.trade}>
                      <td>{t.trade}</td>
                      <td data-label="Ce que voit le visiteur">{fr(t.sees)}</td>
                      <td data-label="Le rendez-vous proposé">{t.meeting}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="table-note">Chaque page est construite pour votre métier, avec vos prix, vos photos et vos mots.</p>
          </div>
        </section>

        <section className="section" id="simulateur">
          <div className="in">
            <Eyebrow label="Le simulateur" />
            <h2>Faites le calcul avec vos chiffres</h2>
            <Simulator {...SIMULATOR} install={PRICES.install} />
          </div>
        </section>

        <Fit title="On ne prend pas tout le monde, et on ne promet pas tout." yes={FOR_YOU} no={NOT_FOR_YOU}>
          <div className="limits">
            {NO_PROMISE.map(([heading, text]) => (
              <div key={heading}>
                <h3>{fr(heading)}</h3>
                <p>{fr(text)}</p>
              </div>
            ))}
          </div>
        </Fit>

        <Pricing />
        <Faq items={faq} />
        <FinalCta title="Vos prochains clients vous ont peut-être déjà écrit." cta={DEMO_CTA} />
      </main>

      <Footer home="#haut" />
    </>
  );
}
