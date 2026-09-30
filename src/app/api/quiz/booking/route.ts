import { Resend } from "resend";
import { parseAnswers, vqSummary } from "@/lib/quiz-engine";
import {
  FROM,
  NOTIFY_TO,
  bookingConfirmation,
  bookingNotification,
  type Booking,
} from "@/lib/quiz-emails";
import { getSupabase } from "@/lib/supabase";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const SLOT_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Requête invalide." }, { status: 400 });
  }

  const booking: Booking = {
    slot: str(body.when, 16),
    label: str(body.label, 80),
    name: str(body.name),
    company: str(body.company),
    email: str(body.email, 254),
    phone: str(body.phone, 40),
    message: str(body.message, 2000),
    source: body.source === "contact" ? "contact" : "plan",
  };
  if (!SLOT_RE.test(booking.slot) || !booking.label || !booking.name || !booking.company || !EMAIL_RE.test(booking.email)) {
    return Response.json({ error: "Champs manquants ou invalides." }, { status: 400 });
  }
  const answers = parseAnswers(body.answers);

  let saved = false;
  const supabase = getSupabase();
  if (supabase) {
    const { error } = await supabase.from("quiz_bookings").insert({
      slot: booking.slot,
      slot_label: booking.label,
      name: booking.name,
      company: booking.company,
      email: booking.email,
      phone: booking.phone || null,
      message: booking.message || null,
      source: booking.source,
      summary: answers ? vqSummary(answers) : null,
      answers,
    });
    if (error) console.error("quiz/booking supabase:", error);
    else saved = true;
  }

  let notified = false;
  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const notif = bookingNotification(booking, answers);
    const confirm = bookingConfirmation(booking);
    const [toTeam, toLead] = await Promise.allSettled([
      resend.emails.send({ from: FROM, to: NOTIFY_TO, replyTo: booking.email, subject: notif.subject, html: notif.html }),
      resend.emails.send({ from: FROM, to: booking.email, replyTo: NOTIFY_TO, subject: confirm.subject, html: confirm.html }),
    ]);
    notified = toTeam.status === "fulfilled" && !toTeam.value.error;
    for (const r of [toTeam, toLead]) {
      if (r.status === "rejected") console.error("quiz/booking resend:", r.reason);
      else if (r.value.error) console.error("quiz/booking resend:", r.value.error);
    }
  } else {
    console.error("quiz/booking: RESEND_API_KEY manquante.");
  }

  // L'équipe doit être au courant d'une façon ou d'une autre.
  if (!saved && !notified) {
    return Response.json({ error: "Réservation non enregistrée." }, { status: 502 });
  }
  return Response.json({ ok: true, saved, notified });
}
