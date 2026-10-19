import type { APIRoute } from "astro";
import { getAdminContext, isAdminRole } from "../../../../lib/admin";

const allowedTypes = new Set(["attraction", "accommodation", "restaurant"]);
const allowedCategories = new Set(["history", "nature", "beach", "adventure", "culture", "food"]);
const allowedTicketStatuses = new Set(["free", "unknown", "check", ""]);

const parseNullableNumber = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
};

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
  if (!Number.isInteger(id) || id <= 0) return redirect("/admin/places", 303);
  const { data: current } = await context.supabase
    .from("places").select("id,publication_status").eq("id", id).maybeSingle();
  if (!current) return redirect("/admin/places", 303);

  const form = await request.formData();
  const intent = String(form.get("intent") ?? "save");
  if (!["save", "draft", "publish", "pause"].includes(intent)) {
    return redirect("/admin/places/" + id + "?error=invalid-action", 303);
  }
  if (["publish", "pause"].includes(intent) && !isAdminRole(context.admin.role)) {
    return redirect("/admin/places/" + id + "?error=" + (intent === "publish" ? "publish-forbidden" : "pause-forbidden"), 303);
  }

  const nameEn = String(form.get("name_en") ?? "").trim();
  const nameKm = String(form.get("name_km") ?? "").trim();
  const slug = String(form.get("slug") ?? "").trim();
  const listingType = String(form.get("listing_type") ?? "attraction");
  const category = String(form.get("category") ?? "history");
  const businessType = String(form.get("business_type") ?? "").trim() || null;
  const ticketStatus = String(form.get("ticket_status") ?? "");
  const provinceId = Number(form.get("province_id") ?? 0);
  const ticketUrl = String(form.get("ticket_url") ?? "").trim();
  const imageUrl = String(form.get("image_url") ?? "").trim();
  const ticketUsd = parseNullableNumber(form.get("ticket_usd"));
  const lat = parseNullableNumber(form.get("lat"));
  const lng = parseNullableNumber(form.get("lng"));
  const sourceUrls = urlsFromText(form.get("source_urls"));

  if (!nameEn || !nameKm) return redirect("/admin/places/" + id + "?error=names-required", 303);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return redirect("/admin/places/" + id + "?error=invalid-slug", 303);
  if (!Number.isInteger(provinceId) || provinceId <= 0) return redirect("/admin/places/" + id + "?error=province-required", 303);
  if (!allowedTypes.has(listingType)) return redirect("/admin/places/" + id + "?error=invalid-type", 303);
  if (!allowedCategories.has(category)) return redirect("/admin/places/" + id + "?error=invalid-category", 303);
  if (businessType && !["hotel", "guest_house", "restaurant", "cafe", "other"].includes(businessType)) return redirect("/admin/places/" + id + "?error=invalid-business-type", 303);
  if (!allowedTicketStatuses.has(ticketStatus)) return redirect("/admin/places/" + id + "?error=invalid-ticket-status", 303);
  if ([ticketUsd, lat, lng].some((value) => value !== null && !Number.isFinite(value))) return redirect("/admin/places/" + id + "?error=invalid-number", 303);
  if (ticketUsd !== null && ticketUsd < 0) return redirect("/admin/places/" + id + "?error=invalid-number", 303);
  if (lat !== null && (lat < -90 || lat > 90)) return redirect("/admin/places/" + id + "?error=invalid-number", 303);
  if (lng !== null && (lng < -180 || lng > 180)) return redirect("/admin/places/" + id + "?error=invalid-number", 303);
  if (ticketUrl && !isHttpUrl(ticketUrl)) return redirect("/admin/places/" + id + "?error=invalid-ticket-url", 303);
  if (imageUrl && !isSafeImageUrl(imageUrl)) return redirect("/admin/places/" + id + "?error=invalid-image-url", 303);
  if (sourceUrls.some((url) => !isHttpUrl(url))) return redirect("/admin/places/" + id + "?error=invalid-source-url", 303);

  const payload = {
    name_en: nameEn,
    name_km: nameKm,
    slug,
    province_id: provinceId,
    listing_type: listingType,
    category,
    business_type: businessType,
    summary_en: String(form.get("summary_en") ?? ""),
    summary_km: String(form.get("summary_km") ?? ""),
    image_url: imageUrl || null,
    ticket_usd: ticketUsd,
    ticket_status: ticketStatus || null,
    ticket_url: ticketUrl || null,
    ticket_provider: String(form.get("ticket_provider") ?? "").trim() || null,
    open_hours: String(form.get("open_hours") ?? "").trim() || null,
    access_en: String(form.get("access_en") ?? "").trim() || null,
    access_km: String(form.get("access_km") ?? "").trim() || null,
    lat,
    lng,
    source_urls: sourceUrls,
  };

  const readGuide = (field: string) => String(form.get(field) ?? "").trim();
  const guideValues = {
    about_en: readGuide("guide_about_en"),
    about_km: readGuide("guide_about_km"),
    history_en: readGuide("guide_history_en"),
    history_km: readGuide("guide_history_km"),
    highlights_en: readGuide("guide_highlights_en"),
    highlights_km: readGuide("guide_highlights_km"),
    visit_plan_en: readGuide("guide_visit_plan_en"),
    visit_plan_km: readGuide("guide_visit_plan_km"),
    tips_en: readGuide("guide_tips_en"),
    tips_km: readGuide("guide_tips_km"),
  };
  const { data: existingGuide } = await context.supabase
    .from("place_guides").select("id,source_urls").eq("place_id", id).maybeSingle();
  const saveGuide = Boolean(existingGuide) || Object.values(guideValues).some(Boolean);
  const guidePayload = {
    place_id: id,
    ...Object.fromEntries(Object.entries(guideValues).map(([key, value]) => [key, value || null])),
    ...(Array.isArray(existingGuide?.source_urls) ? { source_urls: existingGuide.source_urls } : {}),
  };

  const { data: savedStatus, error } = await context.supabase.rpc("admin_save_place", {
    p_id: id,
    p_payload: payload,
    p_guide: guidePayload,
    p_save_guide: saveGuide,
    p_intent: intent,
  });
  if (error || !savedStatus) return redirect("/admin/places/" + id + "?error=save-failed", 303);
  return redirect("/admin/places/" + id + "?saved=" + encodeURIComponent(savedStatus), 303);
};
