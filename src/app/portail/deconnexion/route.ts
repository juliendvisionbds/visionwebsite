import { endPartnerSession, sameOrigin, seeOther } from "@/lib/partners/auth";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  await endPartnerSession();
  return seeOther("/connexion/");
}
