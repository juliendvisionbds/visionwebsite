'use client';

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import "./ExitPopup.css";

// Délai minimal sur la page avant de pouvoir s'afficher : évite de sauter au visage d'un visiteur qui vient d'arriver.
const ARM_MS = 6_000;
const K_SEEN = "xp-seen";

const OPTIONS = ["Les devis", "Les factures et les relances", "Le suivi de chantier", "Les appels d’offres"];
// Options cochées à chaque étape de l'animation (même séquence que le CTA final).
const SEQ = [[0], [0, 1], [0, 1], [], [2], [2, 3], [2, 3], []];

const seen = () => {
  try { return sessionStorage.getItem(K_SEEN) === "1"; } catch { return false; }
};
const markSeen = () => {
  try { sessionStorage.setItem(K_SEEN, "1"); } catch { /* navigation privée */ }
};

export default function ExitPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Inutile sur le quiz : le visiteur y est déjà. Hors sujet sur la page partenaires.
  const disabled = pathname.startsWith("/commencer") || pathname.startsWith("/devenir-partenaire");

  // Intention de sortie : la souris quitte la fenêtre par le haut (onglets, barre d'adresse). Une fois par session.
  useEffect(() => {
    if (disabled || seen()) return;
    const armedAt = Date.now() + ARM_MS;
    const onOut = (e: MouseEvent) => {
      if (e.relatedTarget || e.clientY > 0) return;
      if (Date.now() < armedAt || seen()) return;
      // La fenêtre de réservation est déjà ouverte : on ne s'empile pas dessus.
      if (document.querySelector(".bk-overlay")) return;
      markSeen();
      setOpen(true);
    };
    document.addEventListener("mouseout", onOut);
    return () => document.removeEventListener("mouseout", onOut);
  }, [disabled]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ctaRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!open || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setStep((i) => (i + 1) % SEQ.length), 900);
    return () => clearInterval(t);
  }, [open]);

  if (disabled || !open) return null;

  return (
    <div className="xp-overlay" onClick={() => setOpen(false)}>
      <div className="xp" role="dialog" aria-modal="true" aria-labelledby="xp-h" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="xp-x" onClick={() => setOpen(false)} aria-label="Fermer">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <div className="xp-copy">
          <span className="xp-chip">Avant de partir</span>
          <h2 id="xp-h">
            Quelles tâches administratives pourriez-vous arrêter de faire <span className="xp-hl">à la main</span>&nbsp;?
          </h2>
          <p>
            Répondez à quelques questions et découvrez les 3 améliorations à mettre en place en priorité dans votre
            entreprise. Un plan adapté à votre organisation et à vos outils.
          </p>
          {/* Lien classique : les pages legacy se rechargent entièrement à chaque navigation. */}
          <a ref={ctaRef} className="xp-btn" href="/commencer">
            Découvrir mes 3 priorités <span aria-hidden="true">→</span>
          </a>
          <ul className="xp-meta">
            <li>Environ 2 minutes</li>
            <li>Gratuit</li>
            <li>Aucun engagement</li>
          </ul>
        </div>
        {/* Même aperçu animé que le CTA final : les réponses du mini-quiz se cochent toutes seules. */}
        <a className="xp-demo" href="/commencer" tabIndex={-1} aria-hidden="true">
          <div className="xp-card xp-result">
            <span className="xp-k">Vos 3 priorités</span>
            <div className="xp-p"><b>01</b><i /></div>
            <div className="xp-p"><b>02</b><i style={{ width: "62%" }} /></div>
            <div className="xp-p"><b>03</b><i style={{ width: "48%" }} /></div>
          </div>
          <div className="xp-card xp-q">
            <span className="xp-k">Question 3 sur 7</span>
            <h3>Qu’est-ce qui vous prend trop de temps&nbsp;?</h3>
            <ul className="xp-opts">
              {OPTIONS.map((label, k) => (
                <li key={label} className={SEQ[step].includes(k) ? "on" : undefined}>
                  <span className="n">{k + 1}</span>
                  {label}
                  <span className="tk" />
                </li>
              ))}
            </ul>
          </div>
        </a>
      </div>
    </div>
  );
}
