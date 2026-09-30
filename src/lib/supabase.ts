import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Client serveur (clé service_role). null si les variables ne sont pas configurées. */
export function getSupabase() {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("supabase: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquante.");
    return null;
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
