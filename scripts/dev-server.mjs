// Serveur de dev "tout-en-un" : sert les fonctions du dossier /api, et
// redirige tout le reste vers un `next dev` déjà lancé (ou en lance un si
// besoin). Évite le CLI Vercel (pas de login/link nécessaire). Reproduit
// localement ce que fait Vercel en prod avec `output: "export"` + les
// fonctions serverless dans /api.
//
// Usage : PORT=3001 npx tsx --env-file=.env.local scripts/dev-server.mjs
// Next.js ne permet qu'un seul `next dev` par projet (verrou dans .next/) :
// si un `next dev` tourne déjà (terminal, IDE...), on le réutilise tel quel
// au lieu d'en lancer un second, pour éviter tout conflit.
import { createServer } from "node:http";
import http from "node:http";
import net from "node:net";
import { spawn } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const apiDir = path.join(root, "api");

const PORT = Number(process.env.PORT) || 3001;
const NEXT_PORT = Number(process.env.NEXT_DEV_PORT) || 3000;

const routes = new Map();
for (const file of readdirSync(apiDir)) {
  if (!/\.(ts|js|mjs)$/.test(file)) continue;
  const name = file.replace(/\.(ts|js|mjs)$/, "");
  const mod = await import(path.join(apiDir, file));
  routes.set(name, mod);
  console.log(`  · /api/${name} prêt (${Object.keys(mod).join(", ")})`);
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const socket = net.connect({ host: "127.0.0.1", port, timeout: 800 });
    socket.once("connect", () => {
      socket.destroy();
      resolve(true);
    });
    socket.once("error", () => resolve(false));
    socket.once("timeout", () => {
      socket.destroy();
      resolve(false);
    });
  });
}

let next = null;
if (await isPortOpen(NEXT_PORT)) {
  console.log(`\n↪ next dev déjà lancé sur le port ${NEXT_PORT}, on le réutilise.`);
} else {
  console.log(`\n▶ next dev sur le port ${NEXT_PORT}...`);
  next = spawn("npx", ["next", "dev", "--port", String(NEXT_PORT)], {
    cwd: root,
    stdio: "inherit",
    shell: process.platform === "win32",
  });
}
const cleanup = () => {
  next?.kill();
  process.exit();
};
process.on("SIGINT", cleanup);
process.on("SIGTERM", cleanup);
process.on("exit", () => next?.kill());

async function handleApi(req, res, name) {
  const mod = routes.get(name);
  if (!mod) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: `Fonction /api/${name} introuvable.` }));
    return;
  }

  const handler = mod[req.method] || mod.default?.fetch;
  if (!handler) {
    res.writeHead(405, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        error: `Méthode ${req.method} non supportée sur /api/${name}.`,
      })
    );
    return;
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const hasBody = chunks.length > 0 && req.method !== "GET" && req.method !== "HEAD";

  const request = new Request(`http://${req.headers.host}${req.url}`, {
    method: req.method,
    headers: req.headers,
    body: hasBody ? Buffer.concat(chunks) : undefined,
  });

  try {
    const response = await handler(request);
    res.writeHead(response.status, Object.fromEntries(response.headers.entries()));
    res.end(Buffer.from(await response.arrayBuffer()));
  } catch (err) {
    console.error(`[api/${name}]`, err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Erreur interne de la fonction locale." }));
  }
}

function proxyToNext(req, res) {
  const proxyReq = http.request(
    {
      host: "127.0.0.1",
      port: NEXT_PORT,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res);
    }
  );
  req.pipe(proxyReq);
  proxyReq.on("error", () => {
    res.writeHead(502);
    res.end("next dev pas encore prêt, réessayez dans une seconde.");
  });
}

const server = createServer(async (req, res) => {
  const { pathname } = new URL(req.url, "http://localhost");
  const match = pathname.match(/^\/api\/([^/]+)\/?$/);
  if (match) {
    await handleApi(req, res, match[1]);
  } else {
    proxyToNext(req, res);
  }
});

async function waitForNext() {
  for (let i = 0; i < 40; i++) {
    if (await isPortOpen(NEXT_PORT)) return;
    await new Promise((r) => setTimeout(r, 250));
  }
}
await waitForNext();

server.listen(PORT, () => {
  console.log(`\n✅ http://localhost:${PORT}  (Next.js + /api ensemble)\n`);
});
