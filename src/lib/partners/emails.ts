import { Resend } from "resend";
import { ADMIN_URL, PARTNERS_URL, TEAM, TEAM_EMAILS } from "@/lib/partners/config";
import type { NewPartner, Partner, Referral } from "@/lib/partners/db";
import { MATERIALS, TODO, introEmail } from "@/lib/partners/kit";
import { FROM, escapeHtml, layout, table } from "@/lib/quiz-emails";
import { SITE } from "@/lib/seo";

const INK = "#14151A";
const MUTED = "#6C6A66";
const BRAND = "#5A4BFF";
const TINT = "#EDEBFF";
const YELLOW = "#FFC42E";

type Email = { subject: string; html: string };

/** Envoi via Resend. Renvoie false (et journalise) si l'email n'est pas parti. */
export async function send(to: string | string[], email: Email, replyTo: string | string[] = TEAM_EMAILS) {
  if (!process.env.RESEND_API_KEY) {
    console.error("partners/send: RESEND_API_KEY manquante.");
    return false;
  }
  try {
    const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({ from: FROM, to, replyTo, ...email });
    if (error) console.error("partners/send resend:", error);
    return !error;
  } catch (err) {
    console.error("partners/send resend:", err);
    return false;
  }
}

export const firstName = (name: string) => name.trim().split(/\s+/)[0] || name;
const rate = (p: Pick<Partner, "commission_rate">) => `${String(p.commission_rate).replace(".", ",")} %`;

const h1 = (text: string) => `<h1 style="margin:0;font-size:26px;line-height:1.2;letter-spacing:-.5px">${escapeHtml(text)}</h1>`;
const h2 = (text: string) => `<h2 style="margin:30px 0 0;font-size:19px;line-height:1.25">${escapeHtml(text)}</h2>`;
const p = (html: string) => `<p style="margin:12px 0 0">${html}</p>`;
const button = (href: string, label: string) =>
  `<p style="margin:22px 0 0"><a href="${escapeHtml(href)}" style="display:inline-block;background:${INK};color:#fff;font-weight:700;text-decoration:none;padding:14px 22px;border-radius:100px;border-bottom:4px solid ${BRAND}">${escapeHtml(label)} →</a></p>`;
const link = (href: string, label: string) => `<a href="${escapeHtml(href)}" style="color:${BRAND};font-weight:700">${escapeHtml(label)}</a>`;

/* ——— candidature ——— */

/** Notification interne : nouvelle candidature. Sans `id`, l'enregistrement en base a échoué. */
export function applicationNotification(partner: NewPartner & { id?: string }): Email {
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:${INK}">
    <h2 style="margin:0 0 16px">Nouvelle candidature partenaire</h2>
    ${table([
      ["Nom", partner.name],
      ["Email", partner.email],
      ["Téléphone", partner.phone || "—"],
      ["Société", partner.company || "—"],
      ["Activité", partner.profile || "—"],
      ["Réseau", partner.network || "—"],
    ])}
    <p style="margin:20px 0 0">${
      partner.id
        ? link(`${ADMIN_URL}/partenaires/${partner.id}/`, "Accepter ou refuser dans l'admin")
        : "<b>Attention : la candidature n'a pas pu être enregistrée en base.</b> Elle n'apparaît pas dans l'admin."
    }</p>
  </div>`;
  return { subject: `Candidature partenaire — ${partner.name}${partner.company ? ` (${partner.company})` : ""}`, html };
}

/** Accusé de réception envoyé au candidat. */
export function applicationConfirmation(partner: Pick<Partner, "name">): Email {
  const html = layout(`
    ${h1("Votre demande est bien reçue")}
    ${p(`Bonjour ${escapeHtml(firstName(partner.name))},`)}
    ${p("Merci de vouloir recommander vision. Un associé regarde votre demande et vous répond par email.")}
    ${p("Si elle est acceptée, vous recevrez le kit de recommandation (présentations, email de mise en contact prérédigé) et l'accès à votre espace partenaire.")}
    ${p("Une question d'ici là ? Répondez simplement à cet email.")}
  `);
  return { subject: "Votre demande de partenariat avec vision", html };
}

/* ——— acceptation ——— */

/** Email de bienvenue : le programme, le kit, et le lien d'accès à l'espace partenaires. */
export function welcomeEmail(partner: Partner, accessUrl: string): Email {
  const intro = introEmail(partner.name);
  const [a, b] = TEAM.map((t) => t.first);
  const steps = [
    ["Vous nous présentez un dirigeant du bâtiment", `Un email suffit, avec ${a} et ${b} en copie. Le modèle est plus bas.`],
    ["On mène le diagnostic gratuit", "30 minutes pour repérer les tâches à automatiser, puis un plan écrit avec le prix."],
    ["Un contrat est signé : vous touchez votre commission", `${rate(partner)} du montant de chaque contrat signé avec l'entreprise que vous avez présentée.`],
  ];
  const html = layout(`
    ${h1("Bienvenue parmi les partenaires de vision")}
    ${p(`Bonjour ${escapeHtml(firstName(partner.name))},`)}
    ${p(`Votre demande est acceptée. Dès lors que vous nous obtenez un premier appel avec une entreprise, vous touchez <b>${rate(partner)} des contrats</b> que nous signons avec elle.`)}
    ${p("Tout ce qu'il vous faut pour parler de nous est dans cet email, et dans votre espace partenaire.")}
    ${button(accessUrl, "Accéder à mon espace partenaire")}
    <p style="margin:8px 0 0;font-size:12.5px;color:${MUTED}">Lien personnel, valable 7 jours. Passé ce délai, demandez-en un nouveau sur ${escapeHtml(PARTNERS_URL.replace(/^https?:\/\//, ""))}.</p>

    ${h2("Comment ça marche")}
    ${steps
      .map(
        ([title, text], i) => `<div style="margin-top:12px;padding:14px 16px;background:#fff;border:2px solid ${INK};border-radius:14px">
      <div style="font-weight:700"><span style="color:${BRAND}">${i + 1}.</span> ${escapeHtml(title)}</div>
      <div style="margin-top:4px;color:${MUTED}">${escapeHtml(text)}</div>
    </div>`
      )
      .join("")}

    ${h2("Votre matériel")}
    ${MATERIALS.map(
      (m) => `<div style="margin-top:12px;padding:14px 16px;border-radius:14px;background:${TINT}">
      <div>${link(`${SITE}${m.file}`, `${m.title} (PDF)`)}</div>
      <div style="margin-top:4px">${escapeHtml(m.text)} ${escapeHtml(m.when)}</div>
    </div>`
    ).join("")}

    ${h2("L'email de mise en contact, prêt à envoyer")}
    ${p(`À envoyer au dirigeant que vous nous présentez, avec en copie : <b>${intro.cc.map(escapeHtml).join("</b> et <b>")}</b>.`)}
    <div style="margin-top:12px;padding:16px;background:#fff;border:2px solid ${INK};border-radius:14px;box-shadow:6px 6px 0 0 ${YELLOW}">
      <div style="font-size:12.5px;font-weight:700;color:${MUTED};text-transform:uppercase;letter-spacing:.4px">Objet</div>
      <div style="margin-top:2px;font-weight:700">${escapeHtml(intro.subject)}</div>
      <div style="margin-top:12px;white-space:pre-wrap">${escapeHtml(intro.body)}</div>
    </div>

    ${h2("Par où commencer")}
    <ol style="margin:12px 0 0;padding-left:20px">${TODO.map((t) => `<li style="margin-top:6px"><b>${escapeHtml(t.title)}.</b> ${escapeHtml(t.text)}</li>`).join("")}</ol>

    ${p(`Une question ? Répondez à cet email : ${a} ou ${b} vous répond.`)}
  `);
  return { subject: "Bienvenue parmi les partenaires de vision : votre kit et votre accès", html };
}

/* ——— espace partenaires ——— */

/** Lien de connexion à l'espace partenaires. */
export function loginLinkEmail(partner: Partner, accessUrl: string): Email {
  const html = layout(`
    ${h1("Votre lien de connexion")}
    ${p(`Bonjour ${escapeHtml(firstName(partner.name))},`)}
    ${p("Voici le lien pour ouvrir votre espace partenaire. Il est valable 30 minutes.")}
    ${button(accessUrl, "Ouvrir mon espace partenaire")}
    <p style="margin:16px 0 0;font-size:12.5px;color:${MUTED}">Vous n'avez rien demandé ? Ignorez cet email, votre espace reste protégé.</p>
  `);
  return { subject: "Votre lien de connexion à l'espace partenaires vision", html };
}

/** Notification interne : un partenaire déclare une recommandation. */
export function referralNotification(partner: Partner, referral: Referral): Email {
  const html = `<div style="font-family:Arial,Helvetica,sans-serif;color:${INK}">
    <h2 style="margin:0 0 16px">Nouvelle recommandation de ${escapeHtml(partner.name)}</h2>
    ${table([
      ["Entreprise", referral.company],
      ["Contact", referral.contact_name || "—"],
      ["Email", referral.contact_email || "—"],
      ["Téléphone", referral.contact_phone || "—"],
      ["Contexte", referral.note || "—"],
      ["Partenaire", `${partner.name} (${partner.email})`],
    ])}
    <p style="margin:20px 0 0">${link(`${ADMIN_URL}/partenaires/${partner.id}/`, "Voir la fiche du partenaire")}</p>
  </div>`;
  return { subject: `Recommandation — ${referral.company} (via ${partner.name})`, html };
}
