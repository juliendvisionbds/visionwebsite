'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./BookingWidget.css";

// Même agenda que /contact et la fin du quiz.
const BOOKING_URL = "https://calendly.com/juliend-visionbds/30min";
// Temps passé sur le site (cumulé entre les pages) avant d'ouvrir la carte toute seule.
const AUTO_OPEN_MS = 25_000;
const K_START = "bk-start";
const K_SEEN = "bk-seen";

const DAYS = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."];
const pad = (n: number) => String(n).padStart(2, "0");
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const store = {
  get(k: string) {
    try { return sessionStorage.getItem(k); } catch { return null; }
  },
  set(k: string, v: string) {
    try { sessionStorage.setItem(k, v); } catch { /* navigation privée */ }
  },
};

function nextWorkdays(count: number) {
  const out: Date[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() % 6) out.push(new Date(d));
  }
  return out;
}

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3.5" y="5" width="17" height="15.5" rx="3.5" />
    <path d="M8 3v4M16 3v4M3.5 10.5h17" />
  </svg>
);
const ChevronIcon = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9.5l6 6 6-6" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export default function BookingWidget() {
  const pathname = usePathname();
  const [card, setCard] = useState(false);
  const [modal, setModal] = useState(false);
  const [day, setDay] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Le quiz se termine déjà par la prise de rendez-vous ; /contact affiche déjà l'agenda.
  const hidden = pathname.startsWith("/commencer");
  // Sur /devenir-partenaire, le visiteur n'est pas un prospect : pas d'ouverture automatique non plus.
  const noAuto = hidden || pathname.startsWith("/contact") || pathname.startsWith("/devenir-partenaire");

  const days = useMemo(() => (card || modal ? nextWorkdays(5) : []), [card, modal]);

  // Ouverture automatique de la carte, une seule fois par session.
  useEffect(() => {
    if (noAuto || store.get(K_SEEN)) return;
    let start = Number(store.get(K_START));
    if (!start) {
      start = Date.now();
      store.set(K_START, String(start));
    }
    const t = setTimeout(() => {
      if (store.get(K_SEEN)) return;
      store.set(K_SEEN, "1");
      setCard(true);
    }, Math.max(1500, AUTO_OPEN_MS - (Date.now() - start)));
    return () => clearTimeout(t);
  }, [noAuto]);

  // Tout lien marqué data-booking (ex. : boutons des cas d'usage) ouvre la fenêtre de réservation.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("[data-booking]");
      if (!link || e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      store.set(K_SEEN, "1");
      setCard(false);
      setModal(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!modal) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [modal]);

  if (hidden) return null;

  const toggleCard = () => {
    store.set(K_SEEN, "1");
    setCard((v) => !v);
  };
  const openModal = () => {
    store.set(K_SEEN, "1");
    setCard(false);
    setModal(true);
  };
  function closeModal() {
    setModal(false);
    fabRef.current?.focus();
  }

  const picked = days[day];
  const src = (() => {
    if (!modal) return "";
    const u = new URL(BOOKING_URL);
    u.searchParams.set("embed_domain", window.location.hostname);
    u.searchParams.set("embed_type", "Inline");
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("hide_event_type_details", "1");
    u.searchParams.set("primary_color", "5a4bff");
    if (picked) {
      u.searchParams.set("month", iso(picked).slice(0, 7));
      u.searchParams.set("date", iso(picked));
    }
    return u.toString();
  })();

  return (
    <div className="bk">
      {card && (
        <div className="bk-card" role="dialog" aria-label="Réserver un appel">
          <button type="button" className="bk-x" onClick={toggleCard} aria-label="Fermer">
            <CloseIcon />
          </button>
          <div className="bk-who">
            <span className="bk-av">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/team/julien.jpg" alt="" />
              <i />
            </span>
            <span>
              <b>Julien Devoir</b>
              <small>Cofondateur · vision</small>
            </span>
          </div>
          <p className="bk-title">30 minutes pour trouver où vous perdez des heures</p>
          <p className="bk-text">
            Vous racontez une semaine type. On repère les 3 tâches qui vous coûtent le plus de temps et ce
            qu’on peut automatiser. Gratuit, sans engagement.
          </p>
          <p className="bk-proof">
            <b>18 h+</b> économisées par semaine en moyenne chez nos clients
          </p>
          <div className="bk-days" role="group" aria-label="Choisissez un jour">
            {days.map((d, i) => (
              <button type="button" key={iso(d)} className="bk-day" aria-pressed={i === day} onClick={() => setDay(i)}>
                <small>{DAYS[d.getDay()]}</small>
                <b>{pad(d.getDate())}</b>
              </button>
            ))}
          </div>
          <button type="button" className="bk-cta" onClick={openModal}>
            Je réserve mon appel <span aria-hidden="true">→</span>
          </button>
        </div>
      )}

      <button
        type="button"
        ref={fabRef}
        className="bk-fab"
        onClick={toggleCard}
        aria-expanded={card}
        aria-label={card ? "Fermer" : "Réserver un appel"}
      >
        {card ? <ChevronIcon /> : <CalendarIcon />}
      </button>

      {modal && (
        <div className="bk-overlay" onClick={closeModal}>
          <div className="bk-modal" role="dialog" aria-modal="true" aria-labelledby="bk-h" onClick={(e) => e.stopPropagation()}>
            <button type="button" ref={closeRef} className="bk-x bk-x-modal" onClick={closeModal} aria-label="Fermer">
              <CloseIcon />
            </button>
            <div className="bk-info">
              <span className="bk-chip">Appel découverte · 30 min</span>
              <h2 id="bk-h">On repère ce qui peut être automatisé chez vous</h2>
              <ol className="bk-steps">
                <li>
                  <b>Vous racontez une semaine type.</b> Devis, factures, pointages, relances : ce qui revient tout le temps.
                </li>
                <li>
                  <b>On identifie les 3 tâches</b> qui vous coûtent le plus d’heures et les plus simples à automatiser.
                </li>
                <li>
                  <b>Vous repartez avec un plan clair</b>, même si on ne travaille pas ensemble.
                </li>
              </ol>
              <div className="bk-stats">
                <div>
                  <b>18 h+</b>
                  <span>économisées par semaine en moyenne</span>
                </div>
                <div>
                  <b>3 semaines</b>
                  <span>avant la première automatisation en production</span>
                </div>
              </div>
              <div className="bk-team">
                <div className="bk-faces">
                  {/* eslint-disable @next/next/no-img-element */}
                  <img src="/team/julien.jpg" alt="Julien Devoir" />
                  <img src="/team/clements.jpg" alt="Clément Samson" />
                  <img src="/team/clement.jpg" alt="Clément Bernard" />
                  {/* eslint-enable @next/next/no-img-element */}
                </div>
                <p>
                  Gratuit · sans engagement
                  <br />
                  En visio ou par téléphone
                </p>
              </div>
            </div>
            <div className="bk-frame">
              <p className="bk-loading">Chargement de l’agenda…</p>
              <iframe src={src} title="Réserver un appel" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
