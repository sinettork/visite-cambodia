import type { APIRoute } from "astro";
import { createServerSupabase } from "../../../lib/supabase";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  if (!email || !password) return redirect("/admin/login?error=Email%20and%20password%20are%20required", 303);

  const supabase = createServerSupabase({ request, cookies });
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return redirect("/admin/login?error=" + encodeURIComponent("Invalid email or password"), 303);

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return redirect("/admin/login?error=Unable%20to%20create%20session", 303);

  const { data: admin } = await supabase.from("admin_users").select("user_id,is_active").eq("user_id", user.id).maybeSingle();
  if (!admin?.is_active) {
    await supabase.auth.signOut();
    return redirect("/admin/login?error=This%20account%20is%20not%20authorized%20for%20Visit%20Cambodia%20Admin", 303);
  }

  return redirect("/admin", 303);
};
