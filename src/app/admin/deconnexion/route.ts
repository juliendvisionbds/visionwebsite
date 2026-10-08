import { endAdminSession, sameOrigin, seeOther } from "@/lib/partners/auth";

export async function POST(request: Request) {
  if (!sameOrigin(request)) return new Response(null, { status: 403 });
  await endAdminSession();
  return seeOther("/connexion/");
}
