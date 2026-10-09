// Génère les one-pagers PDF du kit partenaires (public/kit/*.pdf) à partir de scripts/kit/*.html.
//   npm run build:kit                 (tous)
//   npm run build:kit -- partenaire   (un seul)
// Impression par Chrome sans interface : CHROME_PATH pour indiquer un autre navigateur Chromium.
// Les polices viennent de Google Fonts : une connexion est nécessaire.
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = path.resolve(import.meta.dirname, "..");
const src = path.join(root, "scripts/kit");
const out = path.join(root, "public/kit");

const ALL = [
  ["presentation.html", "vision-presentation.pdf"],
  ["offre.html", "vision-offre.pdf"],
  // Pour l'équipe : à remettre à un futur partenaire (listé dans l'admin).
  ["partenaire.html", "vision-programme-partenaires.pdf"],
];
// `npm run build:kit -- partenaire` ne régénère que les documents nommés.
const only = process.argv.slice(2);
const DOCS = only.length ? ALL.filter(([html]) => only.includes(html.replace(".html", ""))) : ALL;
if (!DOCS.length) throw new Error(`Aucun document ne correspond à « ${only.join(", ")} ».`);

const chrome = [process.env.CHROME_PATH, "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome", "/usr/bin/chromium"].find(
  (p) => p && fs.existsSync(p)
);
if (!chrome) throw new Error("Chrome introuvable : renseignez CHROME_PATH.");

// La mascotte : même générateur SVG que le site (bloc « BLIPS » des scripts de page).
const site = fs.readFileSync(path.join(root, "src/content/home/script.js"), "utf8");
const from = site.indexOf("const COLORS=");
const to = site.indexOf("document.querySelectorAll('.blip')");
if (from < 0 || to < from) throw new Error("Générateur de mascotte introuvable dans src/content/home/script.js.");
const blip = site.slice(from, to);
const css = fs.readFileSync(path.join(src, "kit.css"), "utf8");

/** Imprime une page en PDF. Chrome ne rend pas toujours la main après l'écriture : on l'arrête dès que le fichier est complet. */
function print(page, pdf) {
  fs.rmSync(pdf, { force: true });
  const args = ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=10000", `--user-data-dir=${path.join(tmp, "profile")}`, `--print-to-pdf=${pdf}`, pathToFileURL(page).href];
  const child = spawn(chrome, args, { stdio: "ignore" });
  return new Promise((resolve, reject) => {
    const started = Date.now();
    let size = -1;
    const timer = setInterval(() => {
      const now = fs.existsSync(pdf) ? fs.statSync(pdf).size : 0;
      // Fichier présent et taille stable depuis un tour : l'écriture est terminée.
      if (now > 0 && now === size) finish();
      else if (Date.now() - started > 60_000) finish(new Error(`Impression trop longue : ${path.basename(pdf)}`));
      size = now;
    }, 500);
    const finish = (err) => {
      clearInterval(timer);
      child.kill("SIGKILL");
      if (err) reject(err);
      else resolve();
    };
    child.on("error", finish);
  });
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "vision-kit-"));
fs.mkdirSync(out, { recursive: true });
for (const [html, pdf] of DOCS) {
  const page = path.join(tmp, html);
  // Fonctions de remplacement : le CSS et le JS contiennent des « $ » que replace() interpréterait.
  fs.writeFileSync(
    page,
    fs
      .readFileSync(path.join(src, html), "utf8")
      .replace("/*KIT_CSS*/", () => css)
      .replace("/*BLIP_JS*/", () => blip)
  );
  await print(page, path.join(out, pdf));
  // Un one-pager tient sur une page : si le contenu déborde, on le signale plutôt que de publier deux pages.
  const pages = (fs.readFileSync(path.join(out, pdf), "latin1").match(/\/Type\s*\/Page\b/g) ?? []).length;
  if (pages !== 1) throw new Error(`${pdf} : ${pages} pages au lieu d'une. Raccourcissez scripts/kit/${html}.`);
  console.log(`✓ public/kit/${pdf}`);
}
fs.rmSync(tmp, { recursive: true, force: true });
