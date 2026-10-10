/**
 * Modules « contenus similaires » et maillage interne entre les outils gratuits, les articles du blog
 * et les cas d'usage.
 *
 * Tout repose sur les thèmes (`topics`) : ceux des outils sont dans src/lib/tools.ts, ceux des articles
 * et des cas d'usage dans l'en-tête de leur fichier Markdown. Deux contenus sont proches quand ils
 * partagent des thèmes ; le premier thème de la liste compte davantage.
 *
 * Ajouter un outil, un article ou un cas d'usage avec ses thèmes suffit : il apparaît tout seul
 * dans les modules des pages proches.
 */
import { allPosts, type Post } from "@/lib/posts";
import { TOOLS, type Tool } from "@/lib/tools";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

/** Proximité entre deux listes de thèmes (0 = rien en commun). */
function score(a: string[], b: string[]) {
  if (!a.length || !b.length) return 0;
  const shared = a.filter((t) => b.includes(t)).length;
  return shared * 2 + (a[0] === b[0] ? 2 : 0) + (b.includes(a[0]) ? 1 : 0);
}

/** Classe `items` du plus proche au moins proche de `topics` ; à égalité, l'ordre d'origine est gardé. */
function rank<T extends { topics: string[] }>(topics: string[], items: T[]) {
  return items
    .map((item, i) => ({ item, i, s: score(topics, item.topics) }))
    .sort((x, y) => y.s - x.s || x.i - y.i);
}

/** Les `n` plus proches ; complète avec les suivants si trop peu de contenus partagent un thème. */
const closest = <T extends { topics: string[] }>(topics: string[], items: T[], n: number) =>
  rank(topics, items)
    .slice(0, n)
    .map((r) => r.item);

/** Seulement ceux qui partagent au moins un thème. */
const matching = <T extends { topics: string[] }>(topics: string[], items: T[], n: number) =>
  rank(topics, items)
    .filter((r) => r.s > 0)
    .slice(0, n)
    .map((r) => r.item);

/* ——— cartes ——— */

type Card = { href: string; kind: string; title: string; text: string; go: string; cover?: string };

const toolCard = (t: Tool): Card => ({ href: t.href, kind: "Outil gratuit", title: t.title, text: t.text, go: "Ouvrir l'outil" });
const postCard = (p: Post): Card => ({
  href: `/${p.kind}/${p.slug}`,
  kind: p.kind === "cas" ? "Cas d’usage" : "Article",
  title: p.kind === "cas" ? p.tag : p.title,
  text: p.kind === "cas" ? (p.navText ?? p.description) : p.description,
  go: p.kind === "cas" ? "Voir le cas d'usage" : "Lire l'article",
  cover: p.cover,
});

const card = (c: Card) => `      <a class="rel-card" href="${c.href}">
        ${c.cover ? `<img class="rel-cover" src="${esc(c.cover)}" alt="" loading="lazy">` : ""}
        <span class="rel-k">${esc(c.kind)}</span>
        <h3>${esc(c.title)}</h3>
        <p>${esc(c.text)}</p>
        <span class="rel-go">${esc(c.go)} <span class="arw">→</span></span>
      </a>`;

function group(title: string, cards: Card[], all?: [label: string, href: string]) {
  if (!cards.length) return "";
  // Visuels seulement si toutes les cartes du groupe en ont un : sinon la rangée est déséquilibrée.
  if (!cards.every((c) => c.cover)) cards = cards.map((c) => ({ ...c, cover: undefined }));
  return `    <div class="rel-group">
      <div class="rel-head">
        <h2>${esc(title)}</h2>
        ${all ? `<a class="rel-all" href="${all[1]}">${esc(all[0])} <span class="arw">→</span></a>` : ""}
      </div>
      <div class="rel-grid">
${cards.map(card).join("\n")}
      </div>
    </div>`;
}

const section = (...groups: string[]) => {
  const body = groups.filter(Boolean).join("\n");
  return body ? `<!-- CONTENUS SIMILAIRES (générés par src/lib/related.ts) -->\n<section class="rel">\n  <div class="wrap">\n${body}\n  </div>\n</section>` : "";
};

/** Jusqu'à 3 cartes mêlant deux listes : d'abord ce qui partage un thème, puis de quoi compléter. */
function mix(first: Card[], second: Card[], fallback: Card[]) {
  const out = [...first, ...second];
  for (const c of fallback) {
    if (out.length >= 3) break;
    if (!out.some((o) => o.href === c.href)) out.push(c);
  }
  return out.slice(0, 3);
}

/* ——— modules par type de page ——— */

/** Page d'un outil : outils similaires, puis articles et cas d'usage sur le même sujet. */
export function relatedForTool(id: string) {
  const tool = TOOLS.find((t) => t.id === id);
  if (!tool) return "";
  const others = TOOLS.filter((t) => t !== tool);
  const posts = allPosts("blog");
  const cas = allPosts("cas");
  return section(
    group("Outils similaires", closest(tool.topics, others, 3).map(toolCard), ["Tous les outils gratuits", "/outils"]),
    group(
      "Pour aller plus loin",
      mix(
        matching(tool.topics, posts, 2).map(postCard),
        matching(tool.topics, cas, 1).map(postCard),
        [...closest(tool.topics, cas, 2), ...closest(tool.topics, posts, 2)].map(postCard)
      )
    )
  );
}

/** Article ou cas d'usage : contenus du même type, puis outils (et l'autre type) pour passer à la pratique. */
export function relatedForPost(p: Post) {
  const same = allPosts(p.kind).filter((o) => o.slug !== p.slug);
  const other = allPosts(p.kind === "blog" ? "cas" : "blog");
  const tools = TOOLS;
  return section(
    p.kind === "blog"
      ? group("Articles similaires", closest(p.topics, same, 3).map(postCard), ["Tous les articles", "/blog"])
      : group("Autres cas d'usage", closest(p.topics, same, 3).map(postCard), ["L'IA dans le BTP", "/ia-btp"]),
    group(
      p.kind === "blog" ? "Passer à la pratique" : "Pour aller plus loin",
      mix(
        matching(p.topics, tools, 2).map(toolCard),
        matching(p.topics, other, 1).map(postCard),
        [...closest(p.topics, other, 2).map(postCard), ...closest(p.topics, tools, 2).map(toolCard)]
      )
    )
  );
}

/** Encart « outil gratuit » sous le sommaire d'un article ou d'un cas d'usage (vide si aucun outil ne correspond). */
export function sideToolFor(p: Post) {
  const [tool] = matching(p.topics, TOOLS, 1);
  if (!tool) return "";
  return `<a class="post-side-tool" href="${tool.href}"><span class="k">Outil gratuit</span><b>${esc(tool.title)}</b><span class="go">Ouvrir l'outil <span class="arw">→</span></span></a>`;
}

/** Page /ia-btp, section « Pour approfondir » : un article par grand sujet du guide (prix, devis, pilotage), le plus récent de chacun. */
export function blogPicksForIaBtp() {
  const posts = allPosts("blog");
  const picks: Post[] = [];
  for (const topic of ["devis", "prix", "pilotage", "planning"]) {
    const p = posts.find((x) => x.topics[0] === topic && !picks.includes(x));
    if (p && picks.length < 3) picks.push(p);
  }
  for (const p of posts) if (picks.length < 3 && !picks.includes(p)) picks.push(p);
  return `<div class="rel-grid reveal">\n${picks.map(postCard).map(card).join("\n")}\n      </div>`;
}

/** Page /outils : les articles et les cas d'usage les plus récents. */
export function relatedForOutilsIndex() {
  return section(
    group("Cas d'usage : ces outils, en plus poussé", allPosts("cas").slice(0, 3).map(postCard), ["L'IA dans le BTP", "/ia-btp"]),
    group("À lire sur le blog", allPosts("blog").slice(0, 3).map(postCard), ["Tous les articles", "/blog"])
  );
}

/** Page /blog : les outils gratuits et les cas d'usage. */
export function relatedForBlogIndex() {
  return section(
    group("Outils gratuits", TOOLS.filter((t) => t.id).slice(0, 3).map(toolCard), ["Tous les outils gratuits", "/outils"]),
    group("Cas d'usage IA BTP", allPosts("cas").slice(0, 3).map(postCard), ["L'IA dans le BTP", "/ia-btp"])
  );
}

export const RELATED_CSS = `
/* modules « contenus similaires » (injectés par src/lib/related.ts) */
section.rel{padding-top:0}
.rel-group+.rel-group{margin-top:clamp(40px,5vw,64px)}
.rel-head{display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:clamp(18px,2.4vw,26px)}
.rel-head h2{font-size:clamp(26px,3vw,38px);letter-spacing:-.04em;line-height:1.05}
.rel-all{display:inline-flex;align-items:center;gap:8px;font-size:15px;font-weight:600;color:var(--brand)}
.rel-all:hover .arw,.rel-card:hover .arw{transform:translateX(4px)}
.rel-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(14px,1.8vw,20px)}
@media(max-width:900px){.rel-grid{grid-template-columns:1fr}}
.rel-card{display:flex;flex-direction:column;background:var(--paper-2);border:2px solid var(--ink);border-radius:22px;padding:clamp(20px,2.2vw,26px);
  color:var(--ink);text-decoration:none;transition:transform .28s cubic-bezier(.2,.7,.3,1),box-shadow .28s cubic-bezier(.2,.7,.3,1)}
.rel-card:hover{transform:translateY(-4px);box-shadow:10px 10px 0 0 var(--tint)}
.rel-cover{display:block;width:100%;aspect-ratio:16/9;object-fit:cover;border-radius:12px;border:1px solid var(--line);margin-bottom:16px}
.rel-k{font-size:11.5px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--brand)}
.rel-card h3{font-family:Gabarito,system-ui,sans-serif;font-weight:800;font-size:clamp(19px,1.8vw,22px);letter-spacing:-.03em;line-height:1.15;margin:10px 0 8px}
.rel-card p{color:var(--muted);font-size:14.5px;line-height:1.5;margin:0;flex:1}
.rel-go{display:inline-flex;align-items:center;gap:8px;margin-top:18px;font-size:15px;font-weight:600;color:var(--brand)}
.rel .arw{display:inline-block;transition:transform .2s}
`;
