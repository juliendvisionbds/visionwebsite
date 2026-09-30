import fs from "node:fs";
import path from "node:path";

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

  return { css, html, script };
}
