import { vqPlan, vqSummary, type Answers } from "@/lib/quiz-engine";

export const NOTIFY_TO = "juliend@visionbds.com";
export const FROM = process.env.RESEND_FROM || "Vision <onboarding@resend.dev>";

type Plan = ReturnType<typeof vqPlan>;

export function escapeHtml(value: string) {
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

const INK = "#14151A";
const MUTED = "#6C6A66";
const BRAND = "#5A4BFF";
const TINT = "#EDEBFF";
const YELLOW = "#FFC42E";

function layout(content: string) {
  return `<!doctype html><html lang="fr"><body style="margin:0;background:#FAF9F6">
  <div style="max-width:620px;margin:0 auto;padding:32px 20px;font-family:Arial,Helvetica,sans-serif;color:${INK};font-size:15px;line-height:1.55">
    <div style="font-size:26px;font-weight:800;letter-spacing:-1px;margin-bottom:28px">vision</div>
    ${content}
    <p style="margin-top:36px;padding-top:18px;border-top:1px solid #e6e4df;font-size:12.5px;color:${MUTED}">
      vision — agence d'automatisation IA pour les entreprises du bâtiment.
    </p>
  </div></body></html>`;
}

function block(label: string, text: string, highlight = false) {
  return `<div style="margin-top:12px;padding:12px 14px;border-radius:10px;background:${highlight ? TINT : "#F4F3EF"}">
    <div style="font-size:12.5px;font-weight:700;color:${highlight ? BRAND : MUTED};text-transform:uppercase;letter-spacing:.4px">${escapeHtml(label)}</div>
    <div style="margin-top:4px">${escapeHtml(text)}</div>
  </div>`;
}

function priorityHtml(plan: Plan, index: number) {
  const p = plan.priorities[index];
  return `<div style="margin-top:22px;padding:22px;background:#fff;border:2px solid ${INK};border-radius:18px;${
    index === 0 ? `box-shadow:6px 6px 0 0 ${YELLOW};` : ""
  }">
    <div style="font-size:13px;font-weight:700;color:${MUTED}">
      <span style="color:${BRAND}">0${index + 1}</span> · ${escapeHtml(p.painShort)}
    </div>
    <h2 style="margin:6px 0 4px;font-size:20px;line-height:1.25">${escapeHtml(p.titre)}</h2>
    ${block(index === 0 ? "Pourquoi commencer ici" : "Pourquoi", p.pourquoi)}
    ${block("Ce qui pourrait être automatisé", p.auto)}
    ${block(plan.gardeLabel, p.garde)}
    ${block("Votre première action", p.action, true)}
  </div>`;
}

/** Email envoyé au visiteur : son plan complet. */
export function planEmail(answers: Answers) {
  const plan = vqPlan(answers);
  const html = layout(`
    <h1 style="margin:0;font-size:28px;line-height:1.15;letter-spacing:-.5px">Votre plan pour alléger la gestion administrative</h1>
    <p style="margin:14px 0 0;color:${MUTED}">${plan.recap.map(escapeHtml).join(" · ")}</p>
    <p style="margin:14px 0 0">Votre difficulté principale : <b>${escapeHtml(plan.difficulte)}</b>.</p>
    ${plan.priorities.map((_, i) => priorityHtml(plan, i)).join("")}
    <div style="margin-top:28px;padding:22px;border-radius:18px;background:${TINT}">
      <h2 style="margin:0;font-size:19px">Voyons comment ${escapeHtml(plan.appel)} chez vous.</h2>
      <p style="margin:8px 0 0">Un échange gratuit de 30 minutes pour reprendre votre première priorité avec ${escapeHtml(
        plan.avec
      )}, identifier les accès nécessaires et définir le périmètre d'une première mise en place.</p>
      <p style="margin:12px 0 0"><b>Pour le réserver, répondez simplement à cet email</b> avec deux ou trois créneaux qui vous arrangent.</p>
    </div>
  `);
  return { subject: "Votre plan personnalisé — vision", html, plan };
}

function table(rows: Array<[string, string]>) {
  return `<table style="border-collapse:collapse;font-size:14px;width:100%">${rows
    .map(
      ([k, v]) => `<tr>
      <td style="padding:8px 12px;border:1px solid #e2e2e2;font-weight:600;background:#f7f7f5;white-space:nowrap;vertical-align:top">${escapeHtml(k)}</td>
      <td style="padding:8px 12px;border:1px solid #e2e2e2;white-space:pre-wrap">${escapeHtml(v)}</td>
    </tr>`
    )
    .join("")}</table>`;
}

function summaryRows(answers: Answers): Array<[string, string]> {
  return vqSummary(answers)
    .split("\n")
    .map((line) => {
      const [k, ...v] = line.split(" : ");
      return [k, v.join(" : ")] as [string, string];
    });
}

/** Notification interne : nouveau lead du quiz. */
export function leadNotification(email: string, answers: Answers, plan: Plan) {
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:${INK}">
    <h2 style="margin:0 0 16px">Nouveau lead — quiz diagnostic</h2>
    ${table([["Email", email], ...summaryRows(answers)])}
    <h3 style="margin:22px 0 8px">Priorités proposées</h3>
    <ol>${plan.priorities.map((p) => `<li>${escapeHtml(p.titre)}</li>`).join("")}</ol>
  </div>`;
  return { subject: `Nouveau lead quiz — ${email}`, html };
}

export type Booking = {
  slot: string;
  label: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  source: "plan" | "contact";
};

/** Notification interne : demande d'échange depuis la page plan. */
export function bookingNotification(b: Booking, answers: Answers | null) {
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:${INK}">
    <h2 style="margin:0 0 16px">Demande d'échange — ${escapeHtml(b.label)}</h2>
    ${table([
      ["Créneau", b.label],
      ["Nom", b.name],
      ["Entreprise", b.company],
      ["Email", b.email],
      ["Téléphone", b.phone || "—"],
      ["Origine", b.source === "contact" ? "Page contact" : "Plan du quiz"],
      ...(b.message ? ([["Message", b.message]] as Array<[string, string]>) : []),
      ...(answers ? summaryRows(answers) : []),
    ])}
  </div>`;
  return { subject: `Échange réservé — ${b.company} (${b.label})`, html };
}

/** Confirmation envoyée au visiteur après sa demande d'échange. */
export function bookingConfirmation(b: Booking) {
  const html = layout(`
    <h1 style="margin:0;font-size:26px;line-height:1.2">Votre échange est réservé</h1>
    <p style="margin:14px 0 0">Bonjour ${escapeHtml(b.name)},</p>
    <p style="margin:10px 0 0">Nous avons bien noté votre échange de 30 minutes le <b>${escapeHtml(
      b.label
    )}</b> (heure de Paris). Nous vous envoyons l'invitation avec le lien de visio sous 1 jour ouvré.</p>
    <p style="margin:10px 0 0">${
      b.source === "contact" ? "Nous préparons l'échange à partir de ce que vous nous avez indiqué." : "Vos réponses au questionnaire nous ont été transmises pour préparer l'échange."
    } Un empêchement ? Répondez simplement à cet email.</p>
  `);
  return { subject: `Votre échange avec vision — ${b.label}`, html };
}
