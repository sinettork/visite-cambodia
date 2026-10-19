import type { APIRoute } from "astro";
import { getAdminContext } from "../../../../lib/admin";

const textField = (form: FormData, name: string) => String(form.get(name) ?? "").trim();
const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return (url.protocol === "https:" || url.protocol === "http:")
      && !url.username && !url.password;
  } catch {
    return false;
  }
};
const isSafeImageUrl = (value: string) =>
  (value.startsWith("/") && !value.startsWith("//") && !/[\\s\\u0000-\\u001f]/.test(value))
  || isHttpUrl(value);
const urlsFromText = (value: FormDataEntryValue | null) =>
  String(value ?? "").split(/\\r?\\n/).map((part) => part.trim()).filter(Boolean);

export const POST: APIRoute = async ({ request, cookies, params, redirect }) => {
  const context = await getAdminContext(request, cookies);
  if (!context.user || !context.admin) return redirect("/admin/login", 303);

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) return redirect("/admin/provinces", 303);
  const { data: province } = await context.supabase.from("provinces").select("id").eq("id", id).maybeSingle();
  if (!province) return redirect("/admin/provinces", 303);

  const form = await request.formData();
  const payload = {
    name_en: textField(form, "name_en"),
    name_km: textField(form, "name_km"),
    banner_image_url: textField(form, "banner_image_url") || null,
  };
  const sourceUrls = urlsFromText(form.get("source_urls"));
  if (!payload.name_en || !payload.name_km) return redirect("/admin/provinces/" + id + "?error=names-required", 303);
  if (payload.banner_image_url && !isSafeImageUrl(payload.banner_image_url)) return redirect("/admin/provinces/" + id + "?error=invalid-image-url", 303);
  if (sourceUrls.some((url) => !isHttpUrl(url))) return redirect("/admin/provinces/" + id + "?error=invalid-source-url", 303);

  const readGuide = (field: string) => textField(form, field);
  const guidePayload = {
    province_id: id,
    overview_en: readGuide("overview_en"),
    overview_km: readGuide("overview_km"),
    history_en: readGuide("history_en"),
    history_km: readGuide("history_km"),
    culture_en: readGuide("culture_en"),
    culture_km: readGuide("culture_km"),
    travel_en: readGuide("travel_en"),
    travel_km: readGuide("travel_km"),
    attractions_en: readGuide("attractions_en"),
    attractions_km: readGuide("attractions_km"),
    stay_guide_en: readGuide("stay_guide_en"),
    stay_guide_km: readGuide("stay_guide_km"),
    food_guide_en: readGuide("food_guide_en"),
    food_guide_km: readGuide("food_guide_km"),
    source_urls: sourceUrls,
  };
  const { error } = await context.supabase.rpc("admin_save_province", {
    p_id: id,
    p_payload: payload,
    p_guide: guidePayload,
  });
  if (error) return redirect("/admin/provinces/" + id + "?error=save-failed", 303);
  return redirect("/admin/provinces/" + id + "?saved=1", 303);
};
