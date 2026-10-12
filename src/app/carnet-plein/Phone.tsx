import { fr, type Screen } from "@/content/carnet-plein/meta";
import { heading } from "./text";

/** Écran de téléphone d'exemple : ce que voit le visiteur du client. Illustratif, jamais interactif. */
export default function Phone({ screen }: { screen: Screen }) {
  return (
    <div className="phone">
      <div className="phone-screen">
        <p className="phone-label">{screen.label}</p>
        <p className="phone-q">{heading(screen.question)}</p>
        <p className="phone-ask">{fr(screen.ask)}</p>
        <ul>
          {screen.options.map((option, i) => (
            <li key={option} className={i === screen.picked ? "on" : undefined}>
              {fr(option)}
            </li>
          ))}
        </ul>
        <p className="phone-result">{fr(screen.result)}</p>
        {screen.note && <p className="phone-note">{screen.note}</p>}
        <span className="phone-cta">{screen.cta}</span>
      </div>
    </div>
  );
}
