/**
 * Pages en Markdown, rendues avec le gabarit façon Medium (src/content/blog/_template) :
 *   - articles du blog   /blog/<slug>  ←  src/content/blog/<slug>.md
 *   - cas d'usage IA BTP /cas/<slug>   ←  src/content/cas/<slug>.md
 *
 * En-tête (front matter) : title, seoTitle (titre court pour Google, facultatif), description, tag, date (AAAA-MM-JJ), navText (sous-titre dans le menu),
 * cover + coverAlt (visuel d'en-tête, aussi utilisé comme image de partage), ogImage (image de partage
 * en JPG/PNG quand le visuel d'en-tête est un SVG, que les réseaux sociaux n'affichent pas),
 * author, authorRole, authorPhoto (facultatifs),
 * et pour l'encart sous le sommaire : sideTitle, sideText, sideLink (facultatifs).
 *
 * Markdown pris en charge (volontairement réduit) :
 *   # Titre d'accroche          grande phrase d'ouverture de l'article (pas dans le sommaire)
 *   ## Section                  intertitre, repris dans le sommaire collant
 *   ### Sous-section
 *   **Libellé :** texte         paragraphes consécutifs de ce type → encadré « fiche »
 *   - élément                   liste à puces
 *   1. élément                  liste numérotée
 *   | A | B |                   tableau (2e ligne : |---|---|), défilable sur mobile
 *   :: Titre                    encadré : ligne de titre, puis une liste ou un paragraphe dans le même bloc
 *   ## Questions fréquentes     les ### de cette section alimentent aussi les données FAQ pour Google
 *   > citation                  citation mise en avant
 *   > ligne / > / > ligne       citation de plusieurs paragraphes → modèle de message (mail type à copier)
 *   [Légende]                   emplacement de visuel à venir (légende affichée dessous)
 *   ![Légende](/blog/image.png) visuel (image dans public/), avec légende
 *   **[Texte →](booking)**      bouton ; "booking" ouvre la prise de rendez-vous
 *   **gras**, *italique*, [lien](url)
 */
import fs from "node:fs";
import path from "node:path";

export type Kind = "blog" | "cas";

/** Ce qui change d'une collection à l'autre : dossier, fil d'Ariane, étiquette par défaut. */
const KINDS: Record<Kind, { crumb: [label: string, href: string]; defaultTag: string; chip: (tag: string) => string }> = {
  blog: { crumb: ["Blog", "/blog"], defaultTag: "Article", chip: (tag) => tag },
  cas: { crumb: ["Cas d’usage", "/ia-btp#cas-usage"], defaultTag: "Cas d’usage", chip: (tag) => `Cas d’usage · ${tag}` },
};

const dir = (kind: Kind) => path.join(process.cwd(), "src/content", kind);

export type PostMeta = {
  kind: Kind;
  slug: string;
  title: string;
  /** Titre court pour Google (onglet et résultats), si le titre affiché dépasse ~50 caractères. */
  seoTitle?: string;
  description: string;
  tag: string;
  date: string;
  author?: string;
  authorRole?: string;
  authorPhoto?: string;
  sideTitle?: string;
  sideText?: string;
  sideLink?: string;
  /** Sous-titre court dans le menu « L'IA dans le BTP » (cas d'usage uniquement). */
  navText?: string;
  /** Visuel d'en-tête (chemin dans public/) et son texte alternatif. */
  cover?: string;
  coverAlt?: string;
  /** Image de partage (réseaux sociaux), si différente du visuel d'en-tête. */
  ogImage?: string;
};

export type Post = PostMeta & {
  html: string;
  toc: Array<{ id: string; text: string }>;
  minutes: number;
  /** Questions / réponses de la section « Questions fréquentes » (texte brut, pour le JSON-LD). */
  faq: Array<[q: string, a: string]>;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const slugify = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[’']/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/** Lien spécial "booking" : ouvre la prise de rendez-vous (repli sur /contact sans JavaScript). */
const href = (url: string) => (url === "booking" ? '/contact" data-booking="' : esc(url));

const inline = (s: string) =>
  esc(s)
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => `<a href="${href(u)}">${t}</a>`)
    .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
    .replace(/(^|[\s(])\*([^*\s][^*]*?)\*(?=[\s).,;:!?]|$)/g, "$1<em>$2</em>");

/** Texte brut d'un bloc Markdown (pour les données structurées). */
const plain = (s: string) => s.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*+/g, "").replace(/\s+/g, " ").trim();

const cells = (line: string) => line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

const list = (tag: "ul" | "ol", lines: string[]) =>
  `<${tag}>${lines.map((l) => `<li>${inline(l.replace(/^(-|\d+\.) /, ""))}</li>`).join("")}</${tag}>`;

export const formatDate = (d: string) =>
  d ? new Date(`${d}T12:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "";

export function listPosts(kind: Kind): string[] {
  if (!fs.existsSync(dir(kind))) return [];
  return fs
    .readdirSync(dir(kind))
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getPost(kind: Kind, slug: string): Post | null {
  if (!listPosts(kind).includes(slug)) return null;
  const raw = fs.readFileSync(path.join(dir(kind), `${slug}.md`), "utf8").replace(/\r\n/g, "\n");

  const fm = raw.match(/^---\n([\s\S]*?)\n---\n/);
  const meta: Record<string, string> = {};
  for (const line of fm?.[1].split("\n") ?? []) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const body = fm ? raw.slice(fm[0].length) : raw;

  const toc: Post["toc"] = [];
  const out: string[] = [];
  let facts: string[] = [];
  const faq: Post["faq"] = [];
  let inFaq = false;
  const flushFacts = () => {
    if (facts.length) out.push(`<dl class="post-facts">${facts.join("")}</dl>`);
    facts = [];
  };

  for (const block of body.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean)) {
    const fact = block.match(/^\*\*([^*]+?)\s*:\*\*\s*([\s\S]+)$/);
    if (fact) {
      facts.push(`<div><dt>${esc(fact[1])}</dt><dd>${inline(fact[2])}</dd></div>`);
      continue;
    }
    flushFacts();

    const lines = block.split("\n");
    let m;
    if ((m = block.match(/^# (.+)$/))) out.push(`<p class="post-lead">${inline(m[1])}</p>`);
    else if ((m = block.match(/^## (.+)$/))) {
      const id = slugify(m[1]);
      toc.push({ id, text: m[1] });
      inFaq = /^questions fréquentes/i.test(m[1]);
      out.push(`<h2 id="${id}">${inline(m[1])}</h2>`);
    } else if ((m = block.match(/^### (.+)$/))) {
      if (inFaq) faq.push([plain(m[1]), ""]);
      out.push(`<h3>${inline(m[1])}</h3>`);
    } else if (lines.every((l) => l.startsWith("- "))) out.push(list("ul", lines));
    else if (lines.every((l) => /^\d+\. /.test(l))) out.push(list("ol", lines));
    else if (lines.length > 2 && lines.every((l) => l.startsWith("|")) && /^[|\s:-]+$/.test(lines[1])) {
      const row = (l: string, tag: "th" | "td") => `<tr>${cells(l).map((c) => `<${tag}>${inline(c)}</${tag}>`).join("")}</tr>`;
      out.push(
        `<div class="post-table"><table><thead>${row(lines[0], "th")}</thead><tbody>${lines.slice(2).map((l) => row(l, "td")).join("")}</tbody></table></div>`
      );
    } else if ((m = lines[0].match(/^:: (.+)$/)) && lines.length > 1) {
      const rest = lines.slice(1);
      const content = rest.every((l) => l.startsWith("- ")) ? list("ul", rest) : `<p>${inline(rest.join(" "))}</p>`;
      out.push(`<aside class="post-callout"><b>${inline(m[1])}</b>${content}</aside>`);
    }
    else if (lines.every((l) => l.startsWith(">"))) {
      const quote = lines.map((l) => l.replace(/^>\s?/, ""));
      if (quote.includes("")) {
        // plusieurs paragraphes : modèle de message, retours à la ligne conservés
        const paras = quote.join("\n").split(/\n{2,}/).map((p) => `<p>${p.split("\n").map(inline).join("<br>")}</p>`);
        out.push(`<div class="post-msg">${paras.join("")}</div>`);
      } else out.push(`<blockquote>${inline(quote.join(" "))}</blockquote>`);
    }
    else if ((m = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/)))
      out.push(
        `<figure class="post-fig"><img src="${esc(m[2])}" alt="${esc(m[1])}" loading="lazy">${m[1] ? `<figcaption>${esc(m[1])}</figcaption>` : ""}</figure>`
      );
    else if ((m = block.match(/^\[([^\]]+)\]$/)))
      out.push(`<figure class="post-fig"><div class="post-ph">Visuel à venir</div><figcaption>${esc(m[1])}</figcaption></figure>`);
    else if ((m = block.match(/^\*\*\[([^\]]+)\]\(([^)\s]+)\)\*\*$/))) {
      const label = esc(m[1]).replace(/\s*→$/, "");
      out.push(`<p class="post-cta"><a class="btn btn-primary" href="${href(m[2])}">${label} <span class="arw">→</span></a></p>`);
    } else {
      if (inFaq && faq.length) faq[faq.length - 1][1] = `${faq[faq.length - 1][1]} ${plain(block)}`.trim();
      out.push(`<p>${inline(block.replace(/\n/g, " "))}</p>`);
    }
  }
  flushFacts();

  const words = body.replace(/[#*\-[\]()>|]/g, " ").split(/\s+/).filter(Boolean).length;

  return {
    kind,
    slug,
    title: meta.title ?? slug,
    seoTitle: meta.seoTitle,
    description: meta.description ?? "",
    tag: meta.tag ?? KINDS[kind].defaultTag,
    date: meta.date ?? "",
    author: meta.author,
    authorRole: meta.authorRole,
    authorPhoto: meta.authorPhoto,
    sideTitle: meta.sideTitle,
    sideText: meta.sideText,
    sideLink: meta.sideLink,
    navText: meta.navText,
    cover: meta.cover,
    coverAlt: meta.coverAlt,
    ogImage: meta.ogImage,
    html: out.join("\n"),
    toc,
    faq: faq.filter(([, a]) => a),
    minutes: Math.max(1, Math.round(words / 220)),
  };
}

/** Image de partage : ogImage, sinon le visuel d'en-tête s'il n'est pas en SVG. */
export const shareImage = (p: Post) => p.ogImage ?? (p.cover && !p.cover.endsWith(".svg") ? p.cover : undefined);

/** Articles triés du plus récent au plus ancien. */
export const allPosts = (kind: Kind) =>
  listPosts(kind)
    .map((s) => getPost(kind, s)!)
    .sort((a, b) => b.date.localeCompare(a.date));

const metaLine = (p: Post) =>
  `<div class="post-meta">${p.date ? `<span>${formatDate(p.date)}</span>` : ""}<span>${p.minutes} min de lecture</span></div>`;

const authorLine = (p: Post) =>
  p.author
    ? `<div class="post-author">${p.authorPhoto ? `<img src="${esc(p.authorPhoto)}" alt="">` : ""}<div><b>${esc(p.author)}</b>${p.authorRole ? `<small>${esc(p.authorRole)}</small>` : ""}</div></div>`
    : "";

/** Fil d'Ariane d'une page (pour le JSON-LD). */
export const crumbsOf = (p: Post): Array<[string, string]> => [
  ["Accueil", "/"],
  KINDS[p.kind].crumb,
  [p.title, `/${p.kind}/${p.slug}`],
];

/** En-tête, sommaire collant et article, insérés dans le gabarit src/content/blog/_template/body.html. */
export function renderPost(p: Post) {
  const [crumbLabel, crumbHref] = KINDS[p.kind].crumb;
  const author = authorLine(p);
  const side = p.sideTitle
    ? `<div class="post-side-cta"><b>${esc(p.sideTitle)}</b>${p.sideText ? `<p>${esc(p.sideText)}</p>` : ""}<a href="/contact" data-booking>${esc(p.sideLink ?? "Réserver un appel →")}</a></div>`
    : "";
  // Le sommaire collant démarre en haut de page, à côté du titre.
  return `<section class="hero post-hero">
  <div class="wrap post-layout">
    <aside class="post-side">
      <p class="post-toc-k">Sur cette page</p>
      <ol class="post-toc" id="post-toc">${p.toc.map((t) => `<li><a href="#${t.id}">${esc(t.text)}</a></li>`).join("")}</ol>
      ${side}
    </aside>
    <div class="post-main">
      <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span aria-hidden="true">›</span><a href="${crumbHref}">${esc(crumbLabel)}</a><span aria-hidden="true">›</span><span aria-current="page">${esc(p.tag)}</span></nav>
      <span class="chip">${esc(KINDS[p.kind].chip(p.tag))}</span>
      <h1>${esc(p.title)}</h1>
      <p class="lede">${esc(p.description)}</p>
      ${author}
      ${metaLine(p)}
      ${p.cover ? `<figure class="post-cover"><img src="${esc(p.cover)}" alt="${esc(p.coverAlt ?? "")}"></figure>` : ""}
      <article class="post-article" id="post-article">
${p.html}
      </article>
    </div>
  </div>
</section>`;
}

/** Page /blog : liste des articles. */
export function renderIndex(posts: Post[]) {
  return `<section class="hero post-hero post-index">
  <div class="wrap">
    <nav class="crumbs" aria-label="Fil d'Ariane"><a href="/">Accueil</a><span aria-hidden="true">›</span><span aria-current="page">Blog</span></nav>
    <span class="chip">Blog</span>
    <h1>Le blog de vision</h1>
    <p class="lede">Ce qu'on voit sur le terrain, ce qu'on construit, et ce qu'on en retient pour les entreprises du bâtiment.</p>
  </div>
</section>

<section style="padding-top:0">
  <div class="wrap">
    <div class="post-list">
${posts
  .map(
    (p) => `      <a class="post-card reveal" href="/${p.kind}/${p.slug}">
        ${p.cover ? `<img class="post-card-cover" src="${esc(p.cover)}" alt="${esc(p.coverAlt ?? "")}" loading="lazy">` : ""}
        <div class="post-card-body">
          <span class="k">${esc(p.tag)}</span>
          <h2>${esc(p.title)}</h2>
          <p>${esc(p.description)}</p>
          ${authorLine(p)}
          ${metaLine(p)}
          <span class="go">Lire l'article <span class="arw">→</span></span>
        </div>
      </a>`
  )
  .join("\n")}
    </div>
  </div>
</section>`;
}
