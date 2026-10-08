import Link from "next/link";

/** Le mot-symbole « vision », avec son œil casqué (identique au site). */
export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link className="app-mark" href={href} aria-label="vision, accueil">
      visi
      <svg viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#14151A" strokeWidth="4" />
        <circle cx="20" cy="20" r="14" fill="#fff" />
        <circle cx="20" cy="21" r="7" fill="#14151A" />
        <circle cx="22.4" cy="18.4" r="2.2" fill="#fff" />
        <path d="M6.5 8.5 a13.5 13.5 0 0 1 27 0 z" fill="#FFC42E" stroke="#14151A" strokeWidth="3" strokeLinejoin="round" />
        <path d="M2 8.5 h36" stroke="#14151A" strokeWidth="3.6" strokeLinecap="round" />
      </svg>
      n
    </Link>
  );
}
