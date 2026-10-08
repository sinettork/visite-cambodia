import type { APIRoute } from "astro";
import { getAdminContext } from "../../../../lib/admin";

const textField = (form: FormData, name: string) => String(form.get(name) ?? "").trim();

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
  const payload = {
    name_en: textField(form, "name_en"),
    name_km: textField(form, "name_km"),
    banner_image_url: textField(form, "banner_image_url") || null,
    updated_at: new Date().toISOString(),
  };
  if (!payload.name_en || !payload.name_km) return redirect("/admin/provinces/" + id + "?error=names-required", 303);

  const { error } = await context.supabase.from("provinces").update(payload).eq("id", id);
  if (error) return redirect("/admin/provinces/" + id + "?error=save-failed", 303);

  const guidePayload = {
    province_id: id,
    overview_en: textField(form, "overview_en"),
    overview_km: textField(form, "overview_km"),
    history_en: textField(form, "history_en"),
    history_km: textField(form, "history_km"),
    culture_en: textField(form, "culture_en"),
    culture_km: textField(form, "culture_km"),
    travel_en: textField(form, "travel_en"),
    travel_km: textField(form, "travel_km"),
    attractions_en: textField(form, "attractions_en"),
    attractions_km: textField(form, "attractions_km"),
    stay_guide_en: textField(form, "stay_guide_en"),
    stay_guide_km: textField(form, "stay_guide_km"),
    food_guide_en: textField(form, "food_guide_en"),
    food_guide_km: textField(form, "food_guide_km"),
    source_urls: urlsFromText(form.get("source_urls")),
    updated_at: new Date().toISOString(),
  };
  const { error: guideError } = await context.supabase.from("province_guides").upsert(guidePayload, { onConflict: "province_id" });
  if (guideError) return redirect("/admin/provinces/" + id + "?error=save-failed", 303);

  await context.supabase.from("admin_audit_log").insert({
    admin_user_id: context.user.id,
    entity_type: "province",
    entity_id: id,
    action: "update",
    changed_fields: Object.keys(payload).concat(["guide"]),
  });

  return redirect("/admin/provinces/" + id + "?saved=1", 303);
};
