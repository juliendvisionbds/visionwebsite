'use client';

import { useEffect, useState } from "react";
import type { Screen } from "@/content/carnet-plein/meta";
import Phone from "./Phone";

const EVERY_MS = 3500;

/** Le téléphone du haut de la home : un métier après l'autre, jusqu'à ce que le visiteur en choisisse un. */
export default function PhoneRotator({ items }: { items: Array<{ tab: string; screen: Screen }> }) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), EVERY_MS);
    return () => clearInterval(t);
  }, [auto, items.length]);

  return (
    <>
      <div className="seg" role="group" aria-label="Exemples par métier">
        {items.map((item, i) => (
          <button
            key={item.tab}
            type="button"
            aria-pressed={i === index}
            onClick={() => {
              setAuto(false);
              setIndex(i);
            }}
          >
            {item.tab}
          </button>
        ))}
      </div>
      {/* key : l'écran se remonte à chaque changement, ce qui rejoue son apparition. */}
      <Phone key={index} screen={items[index].screen} />
    </>
  );
}
