import { createServerSupabase } from "./supabase";

export type AdminRole = "super_admin" | "admin" | "editor";

export async function getAdminContext(request: Request, cookies: Parameters<typeof createServerSupabase>[0]["cookies"]) {
  const supabase = createServerSupabase({ request, cookies });
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { supabase, user: null, admin: null };

  const { data: admin } = await supabase
    .from("admin_users")
    .select("user_id,display_name,role,is_active")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin?.is_active) {
    await supabase.auth.signOut();
    return { supabase, user: null, admin: null };
  }

  return { supabase, user, admin: admin as { user_id: string; display_name: string; role: AdminRole; is_active: boolean } };
}

export function isAdminRole(role: AdminRole) {
  return role === "super_admin" || role === "admin";
}
