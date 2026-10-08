import { blipSVG } from "@/lib/blip";

type Pose = "carry" | "wave" | "look" | "sleep" | "roller" | "default";
type Color = "brand" | "yellow" | "orange" | "amber";

// Les couleurs du générateur sont des variables CSS du site : on les fixe ici.
const VARS = {
  "--ink": "#14151A",
  "--brand": "#5A4BFF",
  "--yellow": "#FFC42E",
  "--orange": "#FF7A1A",
  "--amber": "#FFA000",
} as React.CSSProperties;

/** Un engin de la flotte, purement décoratif. */
export default function Blip({ pose = "default", color = "yellow" }: { pose?: Pose; color?: Color }) {
  return <span className="blip" style={VARS} aria-hidden="true" dangerouslySetInnerHTML={{ __html: blipSVG(pose, color) }} />;
}
