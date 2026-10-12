import type { ReactNode } from "react";
import { PRICES, PRICING, euro, fr } from "@/content/carnet-plein/meta";
import { SITE } from "@/lib/seo";
import Booking from "./Booking";
import { heading } from "./text";

/** Les blocs communs à la home et aux pages métier. */

/** Libellé de section, au-dessus du titre. */
export function Eyebrow({ label }: { label: string }) {
  return <p className="eyebrow">{label}</p>;
}

function Logo({ href }: { href: string }) {
  return (
    <a className="logo" href={href} aria-label="Carnet plein">
      <span className="mark" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M3.5 8.5l3 3 6-7" />
        </svg>
      </span>
      <b>Carnet plein</b>
      <small>par vision</small>
    </a>
  );
}

/** En-tête : le logo (vers `home`), les ancres de la page et le bouton de démo. */
export function Header({ home, links }: { home: string; links: Array<[href: string, label: string]> }) {
  return (
    <header className="top" id="haut">
      <div className="in">
        <Logo href={home} />
        <nav aria-label="Sections de la page">
          {links.map(([href, label]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <Booking className="btn small">Démo gratuite</Booking>
      </div>
    </header>
  );
}

/** « Ce qui se passe, concrètement » : le résultat en gras, puis comment. */
export function Changes({ items }: { items: Array<[lead: string, text: string]> }) {
  return (
    <section className="section" id="resultats">
      <div className="in offer">
        <div>
          <Eyebrow label="Ce qui change chez vous" />
          <h2>Ce qui se passe, concrètement</h2>
        </div>
        <div className="deliverables">
          {items.map(([lead, text]) => (
            <article key={lead}>
              <span className="tick" aria-hidden="true">
                ✓
              </span>
              <div>
                <h3>{fr(lead)}</h3>
                <p>{fr(text)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Pour qui, pas pour qui. `children` : ce qui suit les deux listes (les limites assumées, sur la home). */
export function Fit({ title, yes, no, children }: { title: string; yes: string[]; no: string[]; children?: ReactNode }) {
  return (
    <section className="section">
      <div className="in">
        <Eyebrow label="Pour qui" />
        <h2>{title}</h2>
        <div className="cols">
          <div className="yes">
            <h3>C’est pour vous si</h3>
            <ul>
              {yes.map((t) => (
                <li key={t}>{fr(t)}</li>
              ))}
            </ul>
          </div>
          <div className="nope">
            <h3>Ce n’est pas pour vous si</h3>
            <ul>
              {no.map((t) => (
                <li key={t}>{fr(t)}</li>
              ))}
            </ul>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

/** La grille tarifaire, identique partout : démo, installation, suivi. */
export function Pricing() {
  return (
    <section className="section band" id="tarifs">
      <div className="in">
        <Eyebrow label="Les tarifs" />
        <h2>Vous connaissez le prix avant de démarrer.</h2>
        <p className="lede">Vous payez l’installation une seule fois, puis un suivi mensuel que vous arrêtez quand vous voulez.</p>
        <div className="prices">
          <article>
            <h3>La démo</h3>
            <p className="price">
              <small>pour commencer</small> {euro(0)}
            </p>
            <p className="per">Sans engagement</p>
            <p className="about">{fr(PRICING.demo)}</p>
          </article>
          <article className="main">
            <h3>L’installation</h3>
            <p className="price">
              <small>une seule fois</small> {euro(PRICES.install)}
            </p>
            <p className="per">HT</p>
            <ul>
              {PRICING.install.map((t) => (
                <li key={t}>{fr(t)}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Le suivi</h3>
            <p className="price">
              <small>chaque mois</small> {euro(PRICES.monthly)}
            </p>
            <p className="per">HT, sans engagement de durée</p>
            <ul>
              {PRICING.monthly.map((t) => (
                <li key={t}>{fr(t)}</li>
              ))}
            </ul>
          </article>
        </div>
        <p className="callout">
          Plus tard, à la performance. Une fois vos chiffres établis, vous pouvez passer à un prix par rendez-vous pris.
        </p>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: Array<[question: string, answer: string]> }) {
  return (
    <section className="section" id="questions">
      <div className="in faq">
        <Eyebrow label="Questions" />
        <h2>Ce qu’on nous demande avant de commencer.</h2>
        {items.map(([q, a]) => (
          <details key={q}>
            <summary>{fr(q)}</summary>
            <p>{fr(a)}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/** Le dernier bloc : une phrase et le bouton de démo. */
export function FinalCta({ title, cta }: { title: string; cta: string }) {
  return (
    <section className="in">
      <div className="final">
        <h2>{heading(title)}</h2>
        <div className="final-cta">
          <Booking className="btn invert">
            {cta} <span aria-hidden="true">→</span>
          </Booking>
          <small>Démo gratuite · sans engagement</small>
        </div>
      </div>
    </section>
  );
}

export function Footer({ home }: { home: string }) {
  return (
    <footer className="foot">
      <div className="in">
        <Logo href={home} />
        <p>
          Carnet plein est une offre de <a href={`${SITE}/`}>vision</a>. {fr("Une question avant de demander votre démo ?")}{" "}
          <Booking className="link">Parlez à un associé</Booking>.
        </p>
      </div>
    </footer>
  );
}
