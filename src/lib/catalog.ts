import { getSupabase } from "./supabase";

export type Lang = "en" | "km";

export type Province = {
  id: number;
  slug: string;
  name_km: string;
  name_en: string;
  banner_image_url: string | null;
};

export type Place = {
  id: number;
  slug: string;
  province_id: number;
  listing_type: "attraction" | "accommodation" | "restaurant";
  business_type: string | null;
  publication_status: "draft" | "published" | "paused";
  category: string;
  name_km: string;
  name_en: string;
  summary_km: string | null;
  summary_en: string | null;
  image_url: string | null;
  ticket_usd: number | null;
  ticket_status: "free" | "unknown" | "check" | null;
  ticket_url: string | null;
  ticket_provider: string | null;
  open_hours: string | null;
  access_km: string | null;
  access_en: string | null;
  source_urls: string[];
  lat: number | null;
  lng: number | null;
  views: number;
  province?: Province;
};

export function pick<T extends { name_km: string; name_en: string }>(value: T, field: "name" | "summary", lang: Lang) {
  const key = lang === "km" ? `${field}_km` : `${field}_en`;
  return (value as Record<string, unknown>)[key] as string;
}

export function placeImage(place: Pick<Place, "slug" | "image_url" | "category">) {
  if (place.image_url) return place.image_url;
  const bySlug: Record<string, string> = {
    "angkor-wat": "/images/angkor-wat-header.jpg",
    "bayon-temple": "/images/angkor-wat-header.jpg",
    "ta-prohm": "/images/angkor-wat-header.jpg",
    "royal-palace": "/images/food/fish-amok.jpg",
    "bokor-national-park": "/images/food/kampot-pepper-crab.jpg",
    "kep-crab-market": "/images/food/kep-crab-market.jpg",
    "kampot-pepper-crab": "/images/food/kampot-pepper-crab.jpg",
  };
  return bySlug[place.slug] ?? "/images/angkor-wat-header.jpg";
}

export async function getProvinces(): Promise<Province[]> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("provinces").select("*").order("name_en");
  if (error) throw error;
  return (data ?? []) as Province[];
}

export async function getPlaces(filters: {
  province?: string;
  category?: string;
  type?: Place["listing_type"];
  q?: string;
  page?: number;
  pageSize?: number;
} = {}): Promise<{ items: Place[]; total: number; page: number; pageSize: number }> {
  const supabase = getSupabase();
  const pageSize = Math.min(48, Math.max(1, filters.pageSize ?? 12));
  const page = Math.max(1, filters.page ?? 1);

  let query = supabase
    .from("places")
    .select("*, province:provinces!places_province_id_fkey(*)", { count: "exact" })
    .eq("publication_status", "published")
    .order("views", { ascending: false });

  if (filters.province) query = query.eq("provinces.slug", filters.province);
  if (filters.category) query = query.eq("category", filters.category);
  if (filters.type) query = query.eq("listing_type", filters.type);
  if (filters.q?.trim()) {
    const term = filters.q.trim();
    query = query.or(`name_en.ilike.%${term}%,name_km.ilike.%${term}%,summary_en.ilike.%${term}%,summary_km.ilike.%${term}%`);
  }

  const from = (page - 1) * pageSize;
  const { data, count, error } = await query.range(from, from + pageSize - 1);
  if (error) throw error;

  return {
    items: (data ?? []) as Place[],
    total: count ?? 0,
    page,
    pageSize,
  };
}

export async function getPopular(limit = 6) {
  const result = await getPlaces({ page: 1, pageSize: limit });
  return result.items;
}

export async function getPlace(slug: string): Promise<Place | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("places")
    .select("*, province:provinces!places_province_id_fkey(*)")
    .eq("slug", slug)
    .eq("publication_status", "published")
    .maybeSingle();
  if (error) throw error;
  return (data ?? null) as Place | null;
}

export async function getProvince(slug: string): Promise<Province | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("provinces").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data ?? null) as Province | null;
}

export async function getProvinceGuide(slug: string) {
  const province = await getProvince(slug);
  if (!province) return null;
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("province_guides")
    .select("*")
    .eq("province_id", province.id)
    .maybeSingle();
  if (error) throw error;
  return data ? { ...province, ...data } : {
    ...province,
    overview_km: `${province.name_km} — ស្វែងយល់ពីប្រវត្តិសាស្ត្រ វប្បធម៌ និងកន្លែងគួរទៅលេងក្នុងខេត្តនេះ។`,
    overview_en: `Explore the history, culture and places to visit in ${province.name_en}.`,
    attractions_km: "ស្វែងរកកន្លែងកម្សាន្តដែលបានរាយនៅខាងក្រោម។",
    attractions_en: "Browse the attractions listed below.",
    stay_guide_km: "ជ្រើសរើសកន្លែងស្នាក់នៅតាមផែនការធ្វើដំណើរ។",
    stay_guide_en: "Choose accommodation around your route.",
    food_guide_km: "សាកម្ហូបក្នុងតំបន់ និងបញ្ជាក់ព័ត៌មានមុនចេញដំណើរ។",
    food_guide_en: "Try local food and confirm current details before travelling.",
    story_km: null, story_en: null, history_km: null, history_en: null,
    culture_km: null, culture_en: null, travel_km: null, travel_en: null,
    source_urls: [],
  };
}

export async function getPlaceGuide(placeId: number) {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("place_guides").select("*").eq("place_id", placeId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function getNearbyPlaces(place: Place, limit = 6) {
  const result = await getPlaces({ page: 1, pageSize: 48 });
  if (place.lat == null || place.lng == null) return result.items.slice(0, limit);
  const lat = Number(place.lat);
  const lng = Number(place.lng);
  const toRad = (n: number) => (n * Math.PI) / 180;
  const distance = (item: Place) => {
    if (item.lat == null || item.lng == null || item.slug === place.slug) return Number.POSITIVE_INFINITY;
    const pLat = Number(item.lat);
    const pLng = Number(item.lng);
    const a = Math.sin(toRad(pLat - lat) / 2) ** 2 +
      Math.cos(toRad(lat)) * Math.cos(toRad(pLat)) * Math.sin(toRad(pLng - lng) / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };
  return result.items.sort((a, b) => distance(a) - distance(b)).slice(0, limit);
}
