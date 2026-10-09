// Vérifie la configuration key.one : budget du projet, puis un appel minimal.
// Lancer : npm run check:keyone [modèle]   (lit .env.local via --env-file)
// N'affiche jamais la clé.
import Anthropic from "@anthropic-ai/sdk";

const key = process.env.KEYONE_API_KEY;
const base = process.env.KEYONE_ANTHROPIC_BASE_URL || "https://getkeyone.com/api/proxy/anthropic";
const model = process.argv[2] || process.env.KEYONE_MODEL || "cheapest";

if (!key) {
  console.error("KEYONE_API_KEY manquante dans .env.local (clé projet kone_live_…, dashboard key.one).");
  process.exit(1);
}
if (!key.startsWith("kone_live_")) {
  console.warn("Attention : la clé ne commence pas par kone_live_ (une clé projet est attendue).");
}

// 1. Budget et contrôles du projet
const st = await fetch("https://getkeyone.com/api/proxy/status", {
  headers: { Authorization: `Bearer ${key}` },
});
if (!st.ok) {
  console.error(`Statut key.one : HTTP ${st.status}`, await st.text());
  process.exit(1);
}
console.log("Statut key.one :", JSON.stringify(await st.json(), null, 2));

// 2. Un appel minimal
const client = new Anthropic({ apiKey: key, baseURL: base, timeout: 60_000 });
try {
  const { data, response } = await client.messages
    .create({
      model,
      max_tokens: 32,
      messages: [{ role: "user", content: "Réponds uniquement : ok" }],
    })
    .withResponse();
  const text = data.content.filter((b) => b.type === "text").map((b) => b.text).join("");
  const h = (name) => response.headers.get(name);
  console.log("\nRéponse :", JSON.stringify(text));
  console.log("Modèle demandé :", model, "→ résolu :", h("x-model-resolved") || data.model);
  console.log("Coût (X-Cost-USD) :", h("x-cost-usd"));
  console.log("Appel (X-Call-ID) :", h("x-call-id"));
  console.log("Budget projet restant :", h("x-project-budget-remaining") ?? "(pas de budget défini)");
  console.log("Tokens :", data.usage.input_tokens, "entrée /", data.usage.output_tokens, "sortie");
} catch (e) {
  if (e instanceof Anthropic.APIError) {
    console.error(`Appel refusé : HTTP ${e.status}`, JSON.stringify(e.error, null, 2));
    process.exit(1);
  }
  throw e;
}
