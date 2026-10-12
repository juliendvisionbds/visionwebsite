'use client';

import { useState } from "react";
import { euro, fr } from "@/content/carnet-plein/meta";

const UNITS = ["", "sur 10", "€ HT"];
const MAX = [5000, 10, 1000000];

type Props = {
  questions: [string, string, string];
  defaults: [number, number, number];
  /** Début de la phrase de sortie, avant le montant. */
  lead: string;
  /** Début de la seconde phrase, avant le prix de l'installation. */
  tail: string;
  install: number;
  /** Si renseignés, la phrase précise ce que représente l'installation : « soit 1/9 d'un spa », « moins de 1/12 d'une cuisine ». */
  share?: string;
  unit?: string;
};

/** Trois questions préremplies, une phrase en sortie : ce que vaut un projet de plus par mois, sur un an. */
export default function Simulator({ questions, defaults, lead, tail, install, share, unit }: Props) {
  const [values, setValues] = useState(defaults);

  const set = (i: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Math.min(MAX[i], Math.max(0, Number(e.target.value) || 0));
    setValues((v) => v.map((x, k) => (k === i ? n : x)) as [number, number, number]);
  };

  const ticket = values[2];
  // Arrondi vers le bas : « moins de 1/12 » reste vrai tant que le prix du projet ne descend pas.
  const parts = share && unit ? Math.floor(ticket / install) : 0;

  return (
    <div className="sim">
      <div className="sim-in">
        {questions.map((q, i) => (
          <label key={q}>
            <span>{fr(q)}</span>
            <span className="fill">
              <input type="number" inputMode="numeric" min={0} max={MAX[i]} value={values[i] || ""} onChange={set(i)} />
              <i>{UNITS[i]}</i>
            </span>
          </label>
        ))}
      </div>
      <p className="sim-out" aria-live="polite">
        {lead} <b>{euro(ticket * 12)} de chiffre d’affaires par an</b>. {tail} {euro(install)}
        {parts >= 2 && `, ${share} 1/${parts} ${unit}`}.
      </p>
    </div>
  );
}
