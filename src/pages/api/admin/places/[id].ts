import type { APIRoute } from "astro";
import { getAdminContext, isAdminRole } from "../../../../lib/admin";

const allowedTypes = new Set(["attraction", "accommodation", "restaurant"]);
const allowedTicketStatuses = new Set(["free", "unknown", "check", ""]);

const asNullableNumber = (value: FormDataEntryValue | null) => {
  const text = String(value ?? "").trim();
  if (!text) return null;
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
};

const urlsFromText = (value: FormDataEntryValue | null) =>
  String(value ?? "")
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter((value) => /^https?:\/\//i.test(value));

export const POST: APIRoute = async ({ request, cookies, params, redirect }) => {
  const context = await getAdminContext(request, cookies);
  if (!context.user || !context.admin) return redirect("/admin/login", 303);

  const id = Number(params.id);
  if (!Number.isInteger(id) || id <= 0) return redirect("/admin/places", 303);

  const { data: current } = await context.supabase.from("places").select("publication_status").eq("id", id).maybeSingle();
  if (!current) return redirect("/admin/places", 303);

  const form = await request.formData();
  const intent = String(form.get("intent") ?? "save");
  if (intent === "publish" && !isAdminRole(context.admin.role)) {
    return redirect("/admin/places/" + id + "?error=publish-forbidden", 303);
  }
  if (intent === "pause" && !isAdminRole(context.admin.role)) {
    return redirect("/admin/places/" + id + "?error=pause-forbidden", 303);
  }

  const slug = String(form.get("slug") ?? "").trim();
  const listingType = String(form.get("listing_type") ?? "attraction");
  const ticketStatus = String(form.get("ticket_status") ?? "");
  const provinceId = Number(form.get("province_id") ?? 0);
  if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return redirect("/admin/places/" + id + "?error=invalid-slug", 303);
  if (!provinceId) return redirect("/admin/places/" + id + "?error=province-required", 303);
  if (!allowedTypes.has(listingType)) return redirect("/admin/places/" + id + "?error=invalid-type", 303);
  if (!allowedTicketStatuses.has(ticketStatus)) return redirect("/admin/places/" + id + "?error=invalid-ticket-status", 303);

  let nextStatus = current.publication_status;
  if (intent === "draft") nextStatus = "draft";
  if (intent === "publish") nextStatus = "published";
  if (intent === "pause") nextStatus = "paused";
  if (intent === "save" && current.publication_status === "published" && context.admin.role === "editor") nextStatus = "draft";

  const payload = {
    name_en: String(form.get("name_en") ?? "").trim(),
    name_km: String(form.get("name_km") ?? "").trim(),
    slug,
    province_id: provinceId,
    listing_type: listingType,
    category: String(form.get("category") ?? "history"),
    business_type: String(form.get("business_type") ?? "").trim() || null,
    publication_status: nextStatus,
    summary_en: String(form.get("summary_en") ?? ""),
    summary_km: String(form.get("summary_km") ?? ""),
    image_url: String(form.get("image_url") ?? "").trim() || null,
    ticket_usd: asNullableNumber(form.get("ticket_usd")),
    ticket_status: ticketStatus || null,
    ticket_url: String(form.get("ticket_url") ?? "").trim() || null,
    ticket_provider: String(form.get("ticket_provider") ?? "").trim() || null,
    open_hours: String(form.get("open_hours") ?? "").trim() || null,
    access_en: String(form.get("access_en") ?? "").trim() || null,
    access_km: String(form.get("access_km") ?? "").trim() || null,
    lat: asNullableNumber(form.get("lat")),
    lng: asNullableNumber(form.get("lng")),
    source_urls: urlsFromText(form.get("source_urls")),
    updated_at: new Date().toISOString(),
  };

  if (!payload.name_en || !payload.name_km) return redirect("/admin/places/" + id + "?error=names-required", 303);

  const { error } = await context.supabase.from("places").update(payload).eq("id", id);
  if (error) return redirect("/admin/places/" + id + "?error=save-failed", 303);

  const guidePayload = {
    place_id: id,
    about_en: String(form.get("guide_about_en") ?? "").trim() || null,
    about_km: String(form.get("guide_about_km") ?? "").trim() || null,
    history_en: String(form.get("guide_history_en") ?? "").trim() || null,
    history_km: String(form.get("guide_history_km") ?? "").trim() || null,
    highlights_en: String(form.get("guide_highlights_en") ?? "").trim() || null,
    highlights_km: String(form.get("guide_highlights_km") ?? "").trim() || null,
    visit_plan_en: String(form.get("guide_visit_plan_en") ?? "").trim() || null,
    visit_plan_km: String(form.get("guide_visit_plan_km") ?? "").trim() || null,
    tips_en: String(form.get("guide_tips_en") ?? "").trim() || null,
    tips_km: String(form.get("guide_tips_km") ?? "").trim() || null,
    updated_at: new Date().toISOString(),
  };
  const hasGuide = Object.values(guidePayload).some((value) => value !== null && value !== id);
  if (hasGuide) {
    const { error: guideError } = await context.supabase.from("place_guides").upsert(guidePayload, { onConflict: "place_id" });
    if (guideError) return redirect("/admin/places/" + id + "?error=save-failed", 303);
  }

  const action = intent === "publish" ? "publish" : intent === "pause" ? "pause" : intent === "draft" ? "save_draft" : "update";
  await context.supabase.from("admin_audit_log").insert({
    admin_user_id: context.user.id,
    entity_type: "place",
    entity_id: id,
    action,
    changed_fields: Object.keys(payload).concat(["guide"]),
  });

  return redirect("/admin/places/" + id + "?saved=" + encodeURIComponent(nextStatus), 303);
};
