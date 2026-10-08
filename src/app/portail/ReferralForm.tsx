'use client';

import { useActionState, useEffect, useRef } from "react";
import { declareReferral } from "./actions";

/** Déclaration d'une recommandation par le partenaire. */
export default function ReferralForm() {
  const [state, action, pending] = useActionState(declareReferral, undefined);
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.ok) ref.current?.reset();
  }, [state]);

  return (
    <form className="form" action={action} ref={ref}>
      <div className="grid2">
        <label className="field">
          <span>Entreprise</span>
          <input name="company" required maxLength={200} placeholder="Ex. : Maçonnerie Durand" />
        </label>
        <label className="field">
          <span>Nom du dirigeant</span>
          <input name="contact_name" maxLength={200} />
        </label>
      </div>
      <div className="grid2">
        <label className="field">
          <span>
            Son email <i>(facultatif)</i>
          </span>
          <input name="contact_email" type="email" maxLength={254} />
        </label>
        <label className="field">
          <span>
            Son téléphone <i>(facultatif)</i>
          </span>
          <input name="contact_phone" type="tel" maxLength={40} />
        </label>
      </div>
      <label className="field">
        <span>
          Contexte <i>(facultatif)</i>
        </span>
        <textarea name="note" maxLength={2000} placeholder="Ex. : 25 salariés, il refait ses devis à la main tous les soirs. Je lui ai envoyé l'email de mise en contact mardi." />
      </label>
      {state?.error && (
        <p className="error" role="alert">
          {state.error}
        </p>
      )}
      {state?.ok && (
        <p className="ok" role="status">
          {state.ok}
        </p>
      )}
      <div>
        <button className="btn btn-primary" type="submit" disabled={pending}>
          Déclarer cette recommandation
        </button>
      </div>
    </form>
  );
}
