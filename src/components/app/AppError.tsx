'use client';

import { useEffect } from "react";

/** Écran d'erreur commun à l'admin et à l'espace partenaires (fichiers error.tsx). */
export default function AppError({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="app-auth">
      <div className="card">
        <h1>Un problème est survenu</h1>
        <p className="lede">La page n’a pas pu être chargée. Réessayez dans un instant.</p>
        <button className="btn btn-primary" type="button" onClick={() => retry()}>
          Réessayer
        </button>
      </div>
    </main>
  );
}
