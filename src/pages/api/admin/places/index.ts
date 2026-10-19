import type { APIRoute } from "astro";
import { getAdminContext } from "../../../../lib/admin";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
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
  const businessType = String(form.get("business_type") ?? "").trim() || null;
  const imageUrl = String(form.get("image_url") ?? "").trim();

  if (!nameEn || !nameKm || !slug || !Number.isInteger(provinceId) || provinceId <= 0) {
    return redirect("/admin/places/new?error=" + encodeURIComponent("Name, slug and province are required."), 303);
  }
  if (!slugPattern.test(slug)) return redirect("/admin/places/new?error=" + encodeURIComponent("Slug must use lowercase letters, numbers and hyphens."), 303);
  if (!["attraction", "accommodation", "restaurant"].includes(listingType)) return redirect("/admin/places/new?error=" + encodeURIComponent("Invalid listing type."), 303);
  if (!["history", "nature", "beach", "adventure", "culture", "food"].includes(category)) return redirect("/admin/places/new?error=" + encodeURIComponent("Invalid category."), 303);
  if (businessType && !["hotel", "guest_house", "restaurant", "cafe", "other"].includes(businessType)) return redirect("/admin/places/new?error=" + encodeURIComponent("Invalid business type."), 303);
  if (imageUrl && !isSafeImageUrl(imageUrl)) return redirect("/admin/places/new?error=" + encodeURIComponent("Image URL must be a site path or HTTP(S) URL."), 303);

  const payload = {
    name_en: nameEn,
    name_km: nameKm,
    slug,
    province_id: provinceId,
    listing_type: listingType,
    category,
    business_type: businessType,
    publication_status: "draft",
    summary_en: String(form.get("summary_en") ?? ""),
    summary_km: String(form.get("summary_km") ?? ""),
    image_url: imageUrl || null,
    source_urls: [],
  };
  const { data, error } = await context.supabase.from("places").insert(payload).select("id").single();
  if (error || !data) return redirect("/admin/places/new?error=create-failed", 303);
  return redirect("/admin/places/" + data.id + "?created=1", 303);
};
