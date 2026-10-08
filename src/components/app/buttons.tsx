'use client';

import { useState } from "react";
import { useFormStatus } from "react-dom";

// name/value : transmis avec le formulaire quand ce bouton le déclenche (plusieurs boutons, une seule action).
type ButtonProps = { className?: string; name?: string; value?: string; children: React.ReactNode };

/** Bouton d'envoi : désactivé pendant que l'action serveur s'exécute. */
export function SubmitButton({ className = "btn btn-primary", name, value, children }: ButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} name={name} value={value} disabled={pending}>
      {children}
    </button>
  );
}

/** Bouton d'envoi qui demande confirmation avant de lancer l'action. */
export function ConfirmButton({ className = "btn btn-ghost", name, value, message, children }: ButtonProps & { message: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className={className}
      name={name}
      value={value}
      disabled={pending}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}

/** Liste déroulante qui envoie son formulaire dès qu'on change la valeur. */
export function AutoSelect({ name, value, options, label }: { name: string; value: string; options: Array<[string, string]>; label: string }) {
  return (
    // key : React réinitialise le formulaire après l'action ; on remonte la liste pour afficher la valeur enregistrée.
    <select key={value} className="inline" name={name} defaultValue={value} aria-label={label} onChange={(e) => e.currentTarget.form?.requestSubmit()}>
      {options.map(([v, text]) => (
        <option key={v} value={v}>
          {text}
        </option>
      ))}
    </select>
  );
}

/** Copie un texte dans le presse-papiers. */
export function CopyButton({ text, className = "btn btn-ghost btn-sm", children = "Copier" }: { text: string; className?: string; children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* presse-papiers indisponible : le texte reste sélectionnable à la main */
        }
      }}
    >
      {copied ? "Copié ✓" : children}
    </button>
  );
}
