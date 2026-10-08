import type { APIRoute } from "astro";
import { getAdminContext, isAdminRole } from "../../../../lib/admin";

const urlsFromText = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter((value) => /^https?:\/\//i.test(value));

export const POST: APIRoute = async ({ request, cookies, params, redirect }) => {
  const context = await getAdminContext(request, cookies);
  if (!context.user || !context.admin) return redirect("/admin/login", 303);

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) return redirect("/admin/provinces", 303);

  const form = await request.formData();
  const intent = String(form.get("intent") ?? "save");
  if (intent === "publish" && !isAdminRole(context.admin.role)) {
    return redirect("/admin/provinces/" + id + "?error=publish-forbidden", 303);
  }

  const payload = {
    name_en: String(form.get("name_en") ?? "").trim(),
    name_km: String(form.get("name_km") ?? "").trim(),
    banner_image_url: String(form.get("banner_image_url") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };
  if (!payload.name_en || !payload.name_km) return redirect("/admin/provinces/" + id + "?error=names-required", 303);

  const { error } = await context.supabase.from("provinces").update(payload).eq("id", id);
  if (error) return redirect("/admin/provinces/" + id + "?error=save-failed", 303);

  const guidePayload = {
    province_id: id,
    overview_en: String(form.get("overview_en") ?? "").trim() || null,
    overview_km: String(form.get("overview_km") ?? "").trim() || null,
    history_en: String(form.get("history_en") ?? "").trim() || null,
    history_km: String(form.get("history_km") ?? "").trim() || null,
    culture_en: String(form.get("culture_en") ?? "").trim() || null,
    culture_km: String(form.get("culture_km") ?? "").trim() || null,
    travel_en: String(form.get("travel_en") ?? "").trim() || null,
    travel_km: String(form.get("travel_km") ?? "").trim() || null,
    attractions_en: String(form.get("attractions_en") ?? "").trim() || null,
    attractions_km: String(form.get("attractions_km") ?? "").trim() || null,
    stay_guide_en: String(form.get("stay_guide_en") ?? "").trim() || null,
    stay_guide_km: String(form.get("stay_guide_km") ?? "").trim() || null,
    food_guide_en: String(form.get("food_guide_en") ?? "").trim() || null,
    food_guide_km: String(form.get("food_guide_km") ?? "").trim() || null,
    source_urls: urlsFromText(form.get("source_urls")),
    updated_at: new Date().toISOString(),
  };
  const { error: guideError } = await context.supabase.from("province_guides").upsert(guidePayload, { onConflict: "province_id" });
  if (guideError) return redirect("/admin/provinces/" + id + "?error=save-failed", 303);

  await context.supabase.from("admin_audit_log").insert({
    admin_user_id: context.user.id,
    entity_type: "province",
    entity_id: id,
    action: intent === "publish" ? "publish" : "update",
    changed_fields: Object.keys(payload).concat(["guide"]),
  });

  return redirect("/admin/provinces/" + id + "?saved=1", 303);
};
