import fs from "node:fs";
import path from "node:path";
import { allPosts } from "@/lib/posts";

const dir = (...p: string[]) => path.join(process.cwd(), "src/content", ...p);
const read = (...p: string[]) => fs.readFileSync(dir(...p), "utf8");

/** Blocs partagés (src/content/_shared/<nom>.html|css|js), insérés là où la page place le marqueur. */
const PARTIALS: Record<string, string> = {
  "<!-- FINAL_CTA -->": "final-cta",
  "<!-- FOOTER -->": "footer",
};

/** Lit les fichiers éditables d'une page (HTML / CSS / JS). */
export function loadPageFiles(id: string) {
  let css = read(id, "styles.css");
  let html = read(id, "body.html");
  let script = read(id, "script.js");

  for (const [marker, name] of Object.entries(PARTIALS)) {
    if (!html.includes(marker)) continue;
    html = html.replace(marker, read("_shared", `${name}.html`));
    css += "\n" + read("_shared", `${name}.css`);
    if (fs.existsSync(dir("_shared", `${name}.js`))) {
      script += "\n" + read("_shared", `${name}.js`);
    }
  }

  // Menu « L'IA dans le BTP » : déroulant vers les cas d'usage (src/content/cas/*.md), sur toutes les pages.
  const NAV_IA = /<a class="nl hide-m" href="\/ia-btp"( aria-current="page")?>L'IA dans le BTP<\/a>/;
  if (NAV_IA.test(html)) {
    html = html.replace(NAV_IA, (_, current = "") => navIaBtp(current));
    css += "\n" + NAV_CSS;
    // Menu burger sur mobile : bouton dans la barre, panneau sous l'en-tête.
    html = html.replace("</nav>\n  </div>\n</header>", () => `${BURGER}\n    </nav>\n  </div>\n  ${mobileMenu()}\n</header>`);
    css += "\n" + BURGER_CSS;
    script += "\n" + BURGER_JS;
  }

  return { css, html, script };
}

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

function navIaBtp(current: string) {
  const items = allPosts("cas")
    .map((p) => `<a href="/cas/${p.slug}"><b>${esc(p.tag)}</b><small>${esc(p.navText ?? p.description)}</small></a>`)
    .join("");
  // Cas d'usage annoncé, pas encore publié.
  const soon = `<span class="nd-soon"><b>Appels d'offres <em>Bientôt</em></b><small>Les consultations triées, le dossier préparé</small></span>`;
  return `<div class="nd hide-m">
        <a class="nl" href="/ia-btp"${current} aria-haspopup="true">L'IA dans le BTP<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5l3 3 3-3"/></svg></a>
        <div class="nd-menu">
          ${items}${soon}
        </div>
      </div>`;
}

const NAV_CSS = `
/* menu déroulant « L'IA dans le BTP » (injecté par src/lib/load-content.ts) */
.nd{position:relative}
.nd>.nl{display:inline-flex;align-items:center;gap:5px}
.nd>.nl svg{width:12px;height:12px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;transition:transform .2s}
.nd-menu{position:absolute;top:100%;left:50%;width:320px;margin-top:12px;padding:10px;background:var(--paper-2,#fff);border:2px solid var(--ink);border-radius:18px;
  box-shadow:8px 8px 0 0 var(--tint);opacity:0;visibility:hidden;transform:translate(-50%,6px);transition:opacity .18s,transform .18s,visibility .18s;z-index:80}
.nd-menu::before{content:"";position:absolute;left:0;right:0;top:-16px;height:16px}
.nd:hover .nd-menu,.nd:focus-within .nd-menu{opacity:1;visibility:visible;transform:translate(-50%,0)}
.nd:hover>.nl svg,.nd:focus-within>.nl svg{transform:rotate(180deg)}
.nd-menu a,.nd-soon{display:block;padding:10px 12px;border-radius:11px;transition:background .15s}
.nd-soon{cursor:default}
.nd-soon b,.nd-soon small{opacity:.55}
.nd-soon em{font-style:normal;font-family:"Hanken Grotesk",system-ui,sans-serif;font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;
  margin-left:6px;padding:2px 7px;border-radius:6px;background:var(--line-soft);color:var(--muted);vertical-align:2px}
.nd-menu a:hover,.nd-menu a:focus-visible{background:var(--tint)}
.nd-menu b{display:block;font-family:Gabarito,system-ui,sans-serif;font-weight:700;font-size:15px;color:var(--ink);line-height:1.25}
.nd-menu small{display:block;font-size:13px;color:var(--muted);line-height:1.35;margin-top:2px}
`;

const BURGER = `  <button class="nb" id="nav-burger" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-mobile"><span></span><span></span><span></span></button>`;

function mobileMenu() {
  const cas = allPosts("cas")
    .map((p) => `<a class="nm-sub" href="/cas/${p.slug}">${esc(p.tag)}</a>`)
    .join("");
  return `<div class="nm" id="nav-mobile">
    <div class="wrap">
      <a class="nm-l" href="/ia-btp">L'IA dans le BTP</a>
      ${cas}
      <span class="nm-sub nm-soon">Appels d'offres · bientôt</span>
      <a class="nm-l" href="/outils">Outils gratuits</a>
      <a class="nm-l" href="/blog">Blog</a>
      <a class="nm-l" href="/a-propos">À propos</a>
      <a class="nm-l" href="/equipe">L'équipe</a>
      <a class="nm-l" href="/contact">Réserver un appel</a>
      <a class="btn btn-primary nm-cta" href="/commencer">Trouver mes 3 priorités <span class="arw">→</span></a>
    </div>
  </div>`;
}

const BURGER_CSS = `
/* menu burger mobile (injecté par src/lib/load-content.ts) */
.nb{display:none;flex:none;width:44px;height:44px;border-radius:12px;border:2px solid var(--ink);background:var(--paper-2,#fff);padding:0;cursor:pointer;
  flex-direction:column;align-items:center;justify-content:center;gap:4px}
.nb span{display:block;width:18px;height:2px;border-radius:2px;background:var(--ink);transition:transform .25s,opacity .2s}
header.nav-open .nb span:nth-child(1){transform:translateY(6px) rotate(45deg)}
header.nav-open .nb span:nth-child(2){opacity:0}
header.nav-open .nb span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
.nm{display:none}
@media(max-width:880px){
  nav{gap:10px}
  .nb{display:inline-flex}
  header.nav-open .nm{display:block;position:absolute;left:0;right:0;top:100%;max-height:calc(100dvh - 72px);overflow:auto;
    background:var(--paper);border-bottom:1px solid var(--line);box-shadow:0 18px 30px -18px rgba(20,21,26,.25)}
  .nm .wrap{display:flex;flex-direction:column;padding-top:10px;padding-bottom:24px}
  .nm-l{display:block;padding:14px 0;font-family:Gabarito,system-ui,sans-serif;font-weight:700;font-size:20px;letter-spacing:-.02em;color:var(--ink);border-bottom:1px solid var(--line-soft)}
  .nm-sub{display:block;padding:9px 0 9px 16px;font-size:15.5px;font-weight:500;color:var(--muted);border-left:2px solid var(--line-soft)}
  .nm-soon{opacity:.55;margin-bottom:8px}
  .nm-cta{margin-top:20px;justify-content:center}
  /* le bouton rond de réservation ne passe pas par-dessus le menu ouvert */
  body:has(header.nav-open) .bk-fab,body:has(header.nav-open) .bk-card{display:none}
}
@media(max-width:420px){header .bar>nav>.btn{padding:10px 14px!important;font-size:13.5px!important}}
`;

const BURGER_JS = `
/* ——— menu burger mobile ——— */
(()=>{
  const h=document.querySelector('header'), b=document.getElementById('nav-burger');
  if(!h||!b) return;
  const set=o=>{h.classList.toggle('nav-open',o);b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Fermer le menu':'Ouvrir le menu');document.body.style.overflow=o?'hidden':''};
  b.addEventListener('click',()=>set(!h.classList.contains('nav-open')));
  document.querySelectorAll('#nav-mobile a').forEach(a=>a.addEventListener('click',()=>set(false)));
  addEventListener('keydown',e=>{if(e.key==='Escape'&&h.classList.contains('nav-open')){set(false);b.focus()}});
  addEventListener('resize',()=>{if(innerWidth>880&&h.classList.contains('nav-open'))set(false)});
})();
`;
