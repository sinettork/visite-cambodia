import type { APIRoute } from "astro";
import { getAdminContext } from "../../../../lib/admin";

export const POST: APIRoute = async ({ request, cookies, params, redirect }) => {
  const context = await getAdminContext(request, cookies);
  if (!context.user || !context.admin) return redirect("/admin/login", 303);

  const id = Number(params.id);
  const form = await request.formData();
  const payload = {
    name_en: String(form.get("name_en") ?? "").trim(),
    name_km: String(form.get("name_km") ?? "").trim(),
    banner_image_url: String(form.get("banner_image_url") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await context.supabase.from("provinces").update(payload).eq("id", id);
  if (error) return new Response(error.message, { status: 400 });

  await context.supabase.from("admin_audit_log").insert({
    admin_user_id: context.user.id,
    entity_type: "province",
    entity_id: id,
    action: "update",
    changed_fields: Object.keys(payload),
  });

  return redirect("/admin/provinces/" + id, 303);
};
