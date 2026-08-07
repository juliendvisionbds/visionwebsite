import fs from "node:fs";
import path from "node:path";

const SRC = "/Users/juliend/Desktop/vision/website";
const OUT = path.resolve("src");

const pages = [
  {
    file: "vision-homepage-G-btp-fr-cases.html",
    route: "page.tsx",
    id: "home",
  },
  {
    file: "vision-qualify-btp-fr.html",
    route: "commencer/page.tsx",
    id: "commencer",
  },
  {
    file: "vision-usecase-devis-fr.html",
    route: "cas/devis/page.tsx",
    id: "devis",
  },
  {
    file: "vision-usecase-dashboard-fr.html",
    route: "cas/tableau-de-bord/page.tsx",
    id: "tableau-de-bord",
  },
];

/** Routes + ancres FR alignées sur les libellés cliqués */
function rewriteLinks(html) {
  let out = html
    .replaceAll("vision-usecase-devis-fr.html", "/cas/devis")
    .replaceAll("vision-usecase-dashboard-fr.html", "/cas/tableau-de-bord")
    .replaceAll("vision-qualify-btp-fr.html", "/commencer")
    .replaceAll("vision-homepage-G-btp-fr-cases.html", "/")
    .replaceAll("https://www.visionbds.com/fr/qualify", "/commencer")
    .replaceAll('href="https://www.visionbds.com/fr"', 'href="/"')
    .replaceAll('href="https://www.visionbds.com/fr#', 'href="/#');

  const anchors = [
    ["what", "ce-quon-automatise"],
    ["cases", "cas-clients"],
    ["profiles", "pour-qui"],
    ["qualify", "commencer"],
    ["form", "formulaire"],
  ];

  for (const [en, fr] of anchors) {
    out = out
      .replaceAll(`id="${en}"`, `id="${fr}"`)
      .replaceAll(`href="#${en}"`, `href="#${fr}"`)
      .replaceAll(`href="/#${en}"`, `href="/#${fr}"`);
  }

  // Cartes "Pour qui" : non cliquables (hover conservé)
  out = out
    .replace(
      /<a class="pcard a reveal" href="[^"]*">/g,
      '<div class="pcard a reveal">'
    )
    .replace(
      /<a class="pcard b reveal" href="[^"]*">/g,
      '<div class="pcard b reveal">'
    )
    .replace(
      /<span class="pgo">Voir ce qu'on fait pour les PME du BTP <span class="arw">→<\/span><\/span>\n?/g,
      ""
    )
    .replace(
      /<span class="pgo">Voir ce qu'on fait pour les artisans <span class="arw">→<\/span><\/span>\n?/g,
      ""
    );

  const profilesStart = out.indexOf('class="profiles">');
  if (profilesStart >= 0) {
    const profilesEnd = out.indexOf("</section>", profilesStart);
    let block = out.slice(profilesStart, profilesEnd);
    let n = 0;
    block = block.replace(/<\/a>/g, () => (++n <= 2 ? "</div>" : "</a>"));
    out = out.slice(0, profilesStart) + block + out.slice(profilesEnd);
  }

  return out;
}

function extract(html) {
  const title = (html.match(/<title>([\s\S]*?)<\/title>/i) || [, ""])[1].trim();
  const description = (
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || [, ""]
  )[1].trim();
  const css = (html.match(/<style>([\s\S]*?)<\/style>/i) || [, ""])[1];
  const bodyMatch = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let body = bodyMatch ? bodyMatch[1] : "";
  const scripts = [...body.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1]
  );
  body = body.replace(/<script>[\s\S]*?<\/script>/gi, "").trim();
  body = rewriteLinks(body);
  return { title, description, css, body, script: scripts.join("\n\n") };
}

function esc(str) {
  return JSON.stringify(str);
}

const componentDir = path.join(OUT, "components");
fs.mkdirSync(componentDir, { recursive: true });

fs.writeFileSync(
  path.join(componentDir, "LegacyPage.tsx"),
  `'use client';

import { useEffect, useRef } from "react";

type Props = {
  css: string;
  html: string;
  script: string;
};

export default function LegacyPage({ css, html, script }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !script.trim()) return;

    const controller = new AbortController();
    const { signal } = controller;

    // Patch addEventListener so page scripts can be cleaned up on unmount.
    const originalAdd = EventTarget.prototype.addEventListener;
    EventTarget.prototype.addEventListener = function (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ) {
      if (options === undefined) {
        return originalAdd.call(this, type, listener, { signal });
      }
      if (typeof options === "boolean") {
        return originalAdd.call(this, type, listener, { capture: options, signal });
      }
      return originalAdd.call(this, type, listener, { ...options, signal });
    };

    try {
      // eslint-disable-next-line no-new-func
      const run = new Function(script);
      run();
    } finally {
      EventTarget.prototype.addEventListener = originalAdd;
    }

    return () => controller.abort();
  }, [script]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div ref={rootRef} dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
`
);

for (const page of pages) {
  const raw = fs.readFileSync(path.join(SRC, page.file), "utf8");
  const { title, description, css, body, script } = extract(raw);

  const dataDir = path.join(OUT, "content", page.id);
  fs.mkdirSync(dataDir, { recursive: true });
  fs.writeFileSync(
    path.join(dataDir, "meta.ts"),
    `export const title = ${esc(title)};\nexport const description = ${esc(description)};\n`
  );
  fs.writeFileSync(path.join(dataDir, "styles.css"), css.trimStart());
  fs.writeFileSync(path.join(dataDir, "body.html"), `${body.trim()}\n`);
  fs.writeFileSync(path.join(dataDir, "script.js"), `${script.trim()}\n`);

  const routePath = path.join(OUT, "app", page.route);
  fs.mkdirSync(path.dirname(routePath), { recursive: true });
  fs.writeFileSync(
    routePath,
    `import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/${page.id}/meta";
import { loadPageFiles } from "@/lib/load-content";

export const metadata: Metadata = {
  title,
  description,
};

export default function Page() {
  const { css, html, script } = loadPageFiles("${page.id}");
  return <LegacyPage css={css} html={html} script={script} />;
}
`
  );

  console.log(`✓ ${page.file} → src/content/${page.id}/`);
}

console.log("Done.");
