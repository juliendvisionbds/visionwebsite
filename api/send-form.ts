// Vercel Function (Web Handler) — vit hors de l'app Next.js car le site est
// exporté statiquement (output: "export"). Vercel déploie automatiquement
// tout fichier de /api comme une fonction serverless indépendante du build statique.
import { Resend } from "resend";

// Instancié à la première utilisation (pas au chargement du module) : le
// constructeur de Resend lève une exception si la clé est absente, ce qui
// ferait planter toute la fonction avant même d'entrer dans le handler.
let resend: Resend | null = null;
function getResend(): Resend {
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
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
    return Response.json(
      { error: "Configuration serveur manquante." },
      { status: 500 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  for (const [key] of FIELDS) {
    const value = body[key];
    if (typeof value !== "string" || !value.trim()) {
      return Response.json(
        { error: `Le champ "${key}" est requis.` },
        { status: 400 }
      );
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
    const { error } = await getResend().emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: data.email,
      subject: `Nouvelle candidature — ${data.company}`,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "Échec de l'envoi de l'email." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("send-form error:", err);
    return Response.json(
      { error: "Échec de l'envoi de l'email." },
      { status: 500 }
    );
  }
}
