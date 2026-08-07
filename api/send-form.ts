// Vercel Function (Web Handler) — vit hors de l'app Next.js car le site est
// exporté statiquement (output: "export"). Vercel déploie automatiquement
// tout fichier de /api comme une fonction serverless indépendante du build statique.
//
// `resend` est importé dynamiquement (pas de `import` statique en haut du
// fichier) : un import statique provoquait un crash de la fonction à chaque
// invocation (observé localement comme ERR_REQUIRE_CYCLE_MODULE), à cause
// de la double publication ESM/CJS du package qui perturbe certains
// bundlers de fonctions serverless.
import type { Resend } from "resend";

let resend: Resend | null = null;
async function getResend(): Promise<Resend> {
  if (!resend) {
    const { Resend: ResendCtor } = await import("resend");
    resend = new ResendCtor(process.env.RESEND_API_KEY);
  }
  return resend;
}

// `Response.json(...)` (méthode statique) n'existe pas sur toutes les
// versions/runtimes de Node — on construit la réponse "à la main" avec le
// constructeur `Response`, disponible partout où `Request`/`Response` le sont.
function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

const NOTIFY_TO = "juliend@visionbds.com";
const FROM = process.env.RESEND_FROM || "Vision <onboarding@resend.dev>";

const FIELDS: Array<[key: string, label: string]> = [
  ["name", "Nom complet"],
  ["email", "Email professionnel"],
  ["company", "Nom de l'entreprise"],
  ["activity", "Activité"],
  ["size", "Taille de l'équipe"],
  ["quotes", "Devis envoyés par mois"],
  ["hours", "Heures perdues par semaine"],
  ["message", "Ce qui prend le plus de temps"],
];

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    switch (char) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case '"':
        return "&quot;";
      default:
        return "&#39;";
    }
  });
}

export async function POST(request: Request) {
  if (!process.env.RESEND_API_KEY) {
    console.error(
      "send-form: RESEND_API_KEY manquante dans cet environnement Vercel."
    );
    return json({ error: "Configuration serveur manquante." }, 500);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requête invalide." }, 400);
  }

  for (const [key] of FIELDS) {
    const value = body[key];
    if (typeof value !== "string" || !value.trim()) {
      return json({ error: `Le champ "${key}" est requis.` }, 400);
    }
  }

  const data = body as Record<string, string>;

  const rowsHtml = FIELDS.map(
    ([key, label]) => `
      <tr>
        <td style="padding:8px 12px;border:1px solid #e2e2e2;font-weight:600;background:#f7f7f5;white-space:nowrap;vertical-align:top">${escapeHtml(
          label
        )}</td>
        <td style="padding:8px 12px;border:1px solid #e2e2e2;white-space:pre-wrap">${escapeHtml(
          data[key]
        )}</td>
      </tr>`
  ).join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#14151a">
      <h2 style="margin:0 0 16px">Nouvelle candidature — diagnostic gratuit</h2>
      <table style="border-collapse:collapse;font-size:14px;width:100%">
        ${rowsHtml}
      </table>
    </div>
  `;

  try {
    const client = await getResend();
    const { error } = await client.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: data.email,
      subject: `Nouvelle candidature — ${data.company}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return json({ error: "Échec de l'envoi de l'email." }, 502);
    }

    return json({ ok: true }, 200);
  } catch (err) {
    console.error("send-form error:", err);
    return json({ error: "Échec de l'envoi de l'email." }, 500);
  }
}
