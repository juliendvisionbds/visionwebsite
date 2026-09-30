import { Resend } from "resend";
import { parseAnswers, vqSummary } from "@/lib/quiz-engine";
import { FROM, NOTIFY_TO, leadNotification, planEmail } from "@/lib/quiz-emails";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: { email?: unknown; answers?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return Response.json({ error: "Adresse email invalide." }, { status: 400 });
  }
  const answers = parseAnswers(body.answers);
  if (!answers) {
    return Response.json({ error: "Réponses au quiz incomplètes." }, { status: 400 });
  }

  // 1. Emails (plan au visiteur + notification interne)
  const { subject, html, plan } = planEmail(answers);
  let planEmailSent = false;
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const notif = leadNotification(email, answers, plan);
    const [toLead, toTeam] = await Promise.allSettled([
      resend.emails.send({ from: FROM, to: email, replyTo: NOTIFY_TO, subject, html }),
      resend.emails.send({ from: FROM, to: NOTIFY_TO, replyTo: email, subject: notif.subject, html: notif.html }),
    ]);
    planEmailSent = toLead.status === "fulfilled" && !toLead.value.error;
    for (const r of [toLead, toTeam]) {
      if (r.status === "rejected") console.error("quiz/lead resend:", r.reason);
      else if (r.value.error) console.error("quiz/lead resend:", r.value.error);
    }
  } else {
    console.error("quiz/lead: RESEND_API_KEY manquante.");
  }

  // 2. Enregistrement Supabase
  let saved = false;
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("quiz_leads").insert({
      email,
      metier: answers.metier,
      taille: answers.taille,
      douleurs: answers.douleurs,
      blocage: answers.blocage,
      ou: answers.ou,
      qui: answers.qui,
      outils: answers.outils,
      frequence: answers.frequence,
      summary: vqSummary(answers),
      priorities: plan.priorities.map(({ key, titre }) => ({ key, titre })),
      answers,
      plan_email_sent: planEmailSent,
    });
    if (error) console.error("quiz/lead supabase:", error);
    else saved = true;
  }

  if (!saved && !planEmailSent) {
    return Response.json({ error: "Enregistrement impossible." }, { status: 502 });
  }
  return Response.json({ ok: true, saved, planEmailSent });
}
