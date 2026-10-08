import { supabase } from "./supabase";

export async function checkSupabaseConnection() {
  const { error } = await supabase
    .from("places")
    .select("id")
    .limit(1);

  return {
    ok: !error,
    error: error?.message ?? null,
  };
}
