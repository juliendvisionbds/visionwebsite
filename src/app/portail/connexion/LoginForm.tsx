'use client';

import { useActionState } from "react";
import { requestLoginLink } from "../actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState(requestLoginLink, undefined);

  if (state?.sent) {
    return (
      <p className="ok" role="status">
        Si cette adresse est celle d’un partenaire, le lien de connexion vient de partir. Il est valable 30 minutes : pensez à regarder vos courriers indésirables.
      </p>
    );
  }
  return (
    <form className="form" action={action}>
      <label className="field">
        <span>Votre adresse email</span>
        <input type="email" name="email" required autoFocus autoComplete="email" placeholder="vous@exemple.fr" />
      </label>
      {state?.error && (
        <p className="error" role="alert">
          {state.error}
        </p>
      )}
      <button className="btn btn-primary" type="submit" disabled={pending}>
        Recevoir mon lien de connexion
      </button>
      <p className="note">Pas de mot de passe : on vous envoie un lien par email.</p>
    </form>
  );
}
