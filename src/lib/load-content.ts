import fs from "node:fs";
import path from "node:path";

/** Lit les fichiers éditables d'une page (HTML / CSS / JS). */
export function loadPageFiles(id: string) {
  const dir = path.join(process.cwd(), "src/content", id);
  return {
    css: fs.readFileSync(path.join(dir, "styles.css"), "utf8"),
    html: fs.readFileSync(path.join(dir, "body.html"), "utf8"),
    script: fs.readFileSync(path.join(dir, "script.js"), "utf8"),
  };
}
