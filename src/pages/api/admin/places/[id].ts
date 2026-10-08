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
    summary_en: String(form.get("summary_en") ?? ""),
    summary_km: String(form.get("summary_km") ?? ""),
    image_url: String(form.get("image_url") ?? "") || null,
    publication_status: String(form.get("publication_status") ?? "draft"),
    listing_type: String(form.get("listing_type") ?? "attraction"),
    ticket_usd: form.get("ticket_usd") ? Number(form.get("ticket_usd")) : null,
    open_hours: String(form.get("open_hours") ?? "") || null,
    updated_at: new Date().toISOString(),
  };

  const { error } = await context.supabase.from("places").update(payload).eq("id", id);
  if (error) return new Response(error.message, { status: 400 });
  await context.supabase.from("admin_audit_log").insert({
    admin_user_id: context.user.id,
    entity_type: "place",
    entity_id: id,
    action: "update",
    changed_fields: Object.keys(payload),
  });
  return redirect("/admin/places/" + id + "?saved=1", 303);
};
