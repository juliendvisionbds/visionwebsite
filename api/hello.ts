// Fonction de diagnostic minimale : si celle-ci plante aussi, le problème
// est dans la configuration/l'infra Vercel, pas dans le code de send-form.ts.
export async function GET() {
  return new Response(
    JSON.stringify({ ok: true, message: "hello from Vercel Function" }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
