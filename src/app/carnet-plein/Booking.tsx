'use client';

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

// L'agenda des associés pour cette offre, affiché dans la fenêtre.
const BOOKING_URL = "https://calendly.com/juliend-visionbds/audit";

/** Bouton, lien ou carte (selon className) qui ouvre la demande de démo : la prise de rendez-vous avec un associé. */
export default function Booking({ className = "btn", children }: { className?: string; children: ReactNode }) {
  // La fenêtre est montée à la racine de la page (.cp), pas dans le bouton : elle n'hérite pas du bloc qui l'ouvre. null : fermée.
  const [host, setHost] = useState<Element | null>(null);
  const open = host !== null;
  const close = () => setHost(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = openRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setHost(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const src = (() => {
    if (!open) return "";
    const u = new URL(BOOKING_URL);
    u.searchParams.set("embed_domain", window.location.hostname);
    u.searchParams.set("embed_type", "Inline");
    u.searchParams.set("hide_gdpr_banner", "1");
    u.searchParams.set("hide_event_type_details", "1");
    u.searchParams.set("primary_color", "0e5a5f");
    return u.toString();
  })();

  const modal = (
    <div className="bk-overlay" onClick={close}>
      <div className="bk-modal" role="dialog" aria-modal="true" aria-labelledby="bk-h" onClick={(e) => e.stopPropagation()}>
        <button type="button" ref={closeRef} className="bk-x" onClick={close} aria-label="Fermer">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="bk-info">
          <span className="badge brand">Démo gratuite · 15 min</span>
          <h2 id="bk-h">Choisissez un créneau, on vous montre votre page refaite</h2>
          <ol className="bk-steps">
            <li>
              <b>Vous choisissez un créneau de 15 minutes.</b> Dans l’agenda ci-contre.
            </li>
            <li>
              <b>D’ici là, on refait la page où vos clients demandent un devis.</b> À vos couleurs, à partir de votre site actuel.
            </li>
            <li>
              <b>On vous la montre pendant l’appel.</b> Elle vous plaît, on en parle. Sinon, vous ne nous devez rien.
            </li>
          </ol>
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
  );

  return (
    <>
      <button type="button" ref={openRef} className={className} onClick={(e) => setHost(e.currentTarget.closest(".cp") ?? document.body)}>
        {children}
      </button>
      {host && createPortal(modal, host)}
    </>
  );
}
