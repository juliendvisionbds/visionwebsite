import { redirect } from "next/navigation";
import { startPartnerSession } from "@/lib/partners/auth";
import { getPartner, updatePartner } from "@/lib/partners/db";
import { readToken } from "@/lib/partners/session";

/** Arrivée depuis un lien de connexion reçu par email : ouvre la session puis renvoie vers le tableau de bord. */
export async function GET(request: Request) {
  const link = readToken(new URL(request.url).searchParams.get("token"), "link");
  const partner = link?.sub ? await getPartner(link.sub) : null;
  if (partner?.status !== "accepted" || !(await startPartnerSession(partner.id))) {
    redirect("/connexion/?lien=expire");
  }
  await updatePartner(partner.id, { last_login_at: new Date().toISOString() });
  redirect("/");
}
