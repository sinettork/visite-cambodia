import type { APIRoute } from "astro";
import { getAdminContext } from "../../../../lib/admin";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const context = await getAdminContext(request, cookies);
  if (!context.user || !context.admin) return redirect("/admin/login", 303);

  const form = await request.formData();
  const nameEn = String(form.get("name_en") ?? "").trim();
  const nameKm = String(form.get("name_km") ?? "").trim();
  const slug = String(form.get("slug") ?? "").trim();
  const provinceId = Number(form.get("province_id") ?? 0);
  const listingType = String(form.get("listing_type") ?? "attraction");
  const category = String(form.get("category") ?? "history");

  if (!nameEn || !nameKm || !slug || !provinceId) {
    return redirect("/admin/places/new?error=" + encodeURIComponent("Name, slug and province are required."), 303);
  }
  if (!slugPattern.test(slug)) {
    return redirect("/admin/places/new?error=" + encodeURIComponent("Slug must use lowercase letters, numbers and hyphens."), 303);
  }
  if (!["attraction", "accommodation", "restaurant"].includes(listingType)) {
    return redirect("/admin/places/new?error=" + encodeURIComponent("Invalid listing type."), 303);
  }

  const payload = {
    name_en: nameEn,
    name_km: nameKm,
    slug,
    province_id: provinceId,
    listing_type: listingType,
    category,
    business_type: String(form.get("business_type") ?? "").trim() || null,
    publication_status: "draft",
    summary_en: String(form.get("summary_en") ?? ""),
    summary_km: String(form.get("summary_km") ?? ""),
    image_url: String(form.get("image_url") ?? "").trim() || null,
    source_urls: [],
  };

  const { data, error } = await context.supabase.from("places").insert(payload).select("id").single();
  if (error || !data) {
    return redirect("/admin/places/new?error=create-failed", 303);
  }

  await context.supabase.from("admin_audit_log").insert({
    admin_user_id: context.user.id,
    entity_type: "place",
    entity_id: data.id,
    action: "create",
    changed_fields: Object.keys(payload),
  });

  return redirect("/admin/places/" + data.id + "?created=1", 303);
};
