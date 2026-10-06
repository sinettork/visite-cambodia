import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db/mysql";
import { samplePlaces, sampleProvinces } from "@/lib/data/sample-data";
import type { Place, PlaceFilters, PlacePage, Province, ProvinceGuide } from "@/lib/types/place";

const SELECT = `SELECT p.*, pr.slug AS province_slug, pr.name_km AS province_km, pr.name_en AS province_en
  FROM places p JOIN provinces pr ON pr.id = p.province_id`;

type PlaceCoordinates = RowDataPacket & Pick<Place, "lat" | "lng">;

function buildPlaceWhere(filters: PlaceFilters) {
  const where: string[] = [];
  const args: string[] = [];
  if (filters.province) { where.push("pr.slug = ?"); args.push(filters.province); }
  if (filters.category) { where.push("p.category = ?"); args.push(filters.category); }
  if (filters.type) { where.push("p.listing_type = ?"); args.push(filters.type); }
  if (filters.q?.trim()) {
    where.push("(p.name_en LIKE ? OR p.name_km LIKE ? OR pr.name_en LIKE ? OR pr.name_km LIKE ?)");
    args.push(...Array(4).fill(`%${filters.q.trim()}%`));
  }
  return { clause: where.length ? `WHERE ${where.join(" AND ")}` : "", args };
}

function filterFallbackPlaces(filters: PlaceFilters = {}) {
  const term = filters.q?.trim().toLowerCase();

  return [...samplePlaces]
    .filter((place) => {
      const matchesProvince = !filters.province || place.province_slug === filters.province;
      const matchesCategory = !filters.category || place.category === filters.category;
      const matchesType = !filters.type || place.listing_type === filters.type;
      const matchesQuery = !term || [
        place.name_en,
        place.name_km,
        place.province_en,
        place.province_km,
      ].some((value) => value.toLowerCase().includes(term));

      return matchesProvince && matchesCategory && matchesType && matchesQuery;
    })
    .sort((a, b) => b.views - a.views);
}

export async function getProvinces(): Promise<Province[]> {
  if (!db) return sampleProvinces as Province[];

  try {
    const [rows] = await db.query<Province[]>("SELECT * FROM provinces ORDER BY name_en");
    const rowsBySlug = new Map(rows.map((province) => [province.slug, province]));
    const canonicalAndStored = sampleProvinces.map((province) => ({
      ...province,
      ...rowsBySlug.get(province.slug),
    })) as Province[];
    const additionalStoredProvinces = rows.filter((province) => !sampleProvinces.some((sample) => sample.slug === province.slug));
    return [...canonicalAndStored, ...additionalStoredProvinces].sort((a, b) => a.name_en.localeCompare(b.name_en));
  } catch (error) {
    console.warn("MySQL is not available, using sample province data.", error);
    return sampleProvinces as Province[];
  }
}

export async function getProvinceGuide(slug: string): Promise<ProvinceGuide | null> {
  const fallback = async () => {
    const province = (await getProvinces()).find((item) => item.slug === slug);
    if (!province) return null;
    const nameKm = province.name_km;
    const nameEn = province.name_en;
    return {
      ...province,
      overview_km: `${nameKm} — ស្វែងរកកន្លែងកម្សាន្ត កន្លែងស្នាក់នៅ និងម្ហូបក្នុងតំបន់នេះ។ ព័ត៌មានខ្លះកំពុងរៀបចំបន្ថែម។`,
      overview_en: `Explore attractions, places to stay and local food in ${nameEn}. Some local listings are still being added.`,
      attractions_km: "មើលបញ្ជីកន្លែងកម្សាន្តដែលមានខាងក្រោម។ យើងនឹងបន្ថែមព័ត៌មាននៅពេលមានទិន្នន័យដែលអាចផ្ទៀងផ្ទាត់បាន។",
      attractions_en: "Browse the attraction listings below. More details will be added as verified local information becomes available.",
      stay_guide_km: "ព័ត៌មានកន្លែងស្នាក់នៅសម្រាប់ខេត្តនេះមិនទាន់មានពេញលេញទេ។ អ្នកអាចស្វែងរកបញ្ជីស្នាក់នៅទូទាំងប្រទេសបាន។",
      stay_guide_en: "Stay listings for this province are not complete yet. You can browse stays listed across Cambodia.",
      food_guide_km: "ព័ត៌មានភោជនីយដ្ឋាន និងហាងកាហ្វេក្នុងខេត្តនេះកំពុងត្រូវបានបន្ថែម។",
      food_guide_en: "Restaurant and cafe information for this province is still being added.",
      story_km: `${nameKm} — ស្វែងយល់ពីប្រវត្តិសាស្ត្រ វប្បធម៌ និងជីវិតមូលដ្ឋានរបស់តំបន់។`,
      story_en: `Learn about ${nameEn} through its history, culture and local life.`,
      history_km: `ព័ត៌មានប្រវត្តិសាស្ត្រលម្អិតរបស់ ${nameKm} នឹងត្រូវបន្ថែមនៅពេលមានប្រភពដែលអាចផ្ទៀងផ្ទាត់បាន។`,
      history_en: `More verified historical detail for ${nameEn} will be added as source material is reviewed.`,
      culture_km: `ស្គាល់ម្ហូប ជីវភាព និងទំនៀមទម្លាប់មូលដ្ឋានរបស់ ${nameKm} តាមកន្លែង និងសហគមន៍ដែលបានចុះបញ្ជី។`,
      culture_en: `Discover local food, daily life and traditions through the places and communities listed for ${nameEn}.`,
      travel_km: "សូមពិនិត្យស្ថានភាពផ្លូវ អាកាសធាតុ និងសេវាកម្មមូលដ្ឋានមុនចេញដំណើរ។",
      travel_en: "Check current road conditions, weather and local services before travelling.",
      source_urls: null,
    } as ProvinceGuide;
  };
  if (!db) return fallback();

  try {
    const [rows] = await db.query<ProvinceGuide[]>(
      `SELECT p.slug, p.name_km, p.name_en, g.overview_km, g.overview_en,
        g.story_km, g.story_en, g.history_km, g.history_en, g.culture_km, g.culture_en,
        g.travel_km, g.travel_en,
        g.attractions_km, g.attractions_en, g.stay_guide_km, g.stay_guide_en,
        g.food_guide_km, g.food_guide_en, g.source_urls
      FROM provinces p
      JOIN province_guides g ON g.province_id = p.id
      WHERE p.slug = ?`,
      [slug],
    );
    return rows[0] ?? fallback();
  } catch (error) {
    console.warn("Unable to load the province guide from MySQL.", error);
    return fallback();
  }
}

export async function getPlaces(filters: PlaceFilters): Promise<Place[]> {
  if (!db) return filterFallbackPlaces(filters) as Place[];

  try {
    const { clause, args } = buildPlaceWhere(filters);
    const [rows] = await db.query<Place[]>(`${SELECT} ${clause} ORDER BY p.views DESC`, args);
    return rows;
  } catch (error) {
    console.warn("MySQL is not available, using sample place data.", error);
    return filterFallbackPlaces(filters) as Place[];
  }
}

export async function getPlacePage(filters: PlaceFilters, page = 1, pageSize = 12): Promise<PlacePage> {
  const requestedPage = Number.isFinite(page) ? Math.max(1, Math.floor(page) || 1) : 1;
  const safePageSize = Math.min(48, Math.max(1, Math.floor(pageSize) || 12));
  if (!db) {
    const places = filterFallbackPlaces(filters) as Place[];
    const safePage = Math.min(requestedPage, Math.max(1, Math.ceil(places.length / safePageSize)));
    return { items: places.slice((safePage - 1) * safePageSize, safePage * safePageSize), total: places.length, page: safePage, pageSize: safePageSize };
  }

  try {
    const { clause, args } = buildPlaceWhere(filters);
    const [countRows] = await db.query<(RowDataPacket & { total: number })[]>(`SELECT COUNT(*) AS total FROM places p JOIN provinces pr ON pr.id = p.province_id ${clause}`, args);
    const total = Number(countRows[0]?.total ?? 0);
    const safePage = Math.min(requestedPage, Math.max(1, Math.ceil(total / safePageSize)));
    const [items] = await db.query<Place[]>(`${SELECT} ${clause} ORDER BY p.views DESC LIMIT ? OFFSET ?`, [...args, safePageSize, (safePage - 1) * safePageSize]);
    return { items, total, page: safePage, pageSize: safePageSize };
  } catch (error) {
    console.warn("MySQL is not available, using sample place data.", error);
    const places = filterFallbackPlaces(filters) as Place[];
    const safePage = Math.min(requestedPage, Math.max(1, Math.ceil(places.length / safePageSize)));
    return { items: places.slice((safePage - 1) * safePageSize, safePage * safePageSize), total: places.length, page: safePage, pageSize: safePageSize };
  }
}

export async function getNearbyPlaces(slug: string, limit = 6): Promise<Place[]> {
  if (!db) {
    const current = samplePlaces.find((place) => place.slug === slug);
    if (!current?.lat || !current.lng) return [];

    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const distance = (place: (typeof samplePlaces)[number]) => {
      if (!place.lat || !place.lng) return Number.POSITIVE_INFINITY;
      const lat1 = toRadians(Number(current.lat));
      const lat2 = toRadians(Number(place.lat));
      const deltaLat = lat2 - lat1;
      const deltaLng = toRadians(Number(place.lng) - Number(current.lng));
      const haversine = Math.sin(deltaLat / 2) ** 2
        + Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) ** 2;
      return 6371 * 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
    };

    return samplePlaces
      .filter((place) => place.slug !== slug && distance(place) <= 30)
      .sort((a, b) => distance(a) - distance(b))
      .slice(0, limit) as Place[];
  }

  try {
    const [currentRows] = await db.query<PlaceCoordinates[]>(
      "SELECT lat, lng FROM places WHERE slug = ?",
      [slug],
    );
    const current = currentRows[0];
    if (!current?.lat || !current.lng) return [];

    const distanceSql = `(6371 * ACOS(LEAST(1, GREATEST(-1,
      COS(RADIANS(?)) * COS(RADIANS(p.lat)) * COS(RADIANS(p.lng) - RADIANS(?))
      + SIN(RADIANS(?)) * SIN(RADIANS(p.lat))
    ))))`;
    const [rows] = await db.query<Place[]>(
      `SELECT p.*, pr.slug AS province_slug, pr.name_km AS province_km, pr.name_en AS province_en,
        ${distanceSql} AS distance_km
      FROM places p JOIN provinces pr ON pr.id = p.province_id
      WHERE p.slug <> ? AND p.lat IS NOT NULL AND p.lng IS NOT NULL
      HAVING distance_km <= 30
      ORDER BY distance_km ASC
      LIMIT ?`,
      [Number(current.lat), Number(current.lng), Number(current.lat), slug, limit],
    );
    return rows;
  } catch (error) {
    console.warn("Unable to find nearby places in MySQL.", error);
    return [];
  }
}

export async function getPopular(limit = 5): Promise<Place[]> {
  if (!db) return filterFallbackPlaces().slice(0, limit) as Place[];

  try {
    const [rows] = await db.query<Place[]>(`${SELECT} ORDER BY p.views DESC LIMIT ?`, [limit]);
    return rows;
  } catch (error) {
    console.warn("MySQL is not available, using sample popular places.", error);
    return filterFallbackPlaces().slice(0, limit) as Place[];
  }
}

type PlaceWithGuideRow = Place & {
  guide_about_km: string | null;
  guide_about_en: string | null;
  guide_history_km: string | null;
  guide_history_en: string | null;
  guide_highlights_km: string | null;
  guide_highlights_en: string | null;
  guide_visit_plan_km: string | null;
  guide_visit_plan_en: string | null;
  guide_tips_km: string | null;
  guide_tips_en: string | null;
  guide_source_urls: string | null;
};

function hydratePlaceGuide(row: PlaceWithGuideRow): Place {
  const {
    guide_about_km,
    guide_about_en,
    guide_history_km,
    guide_history_en,
    guide_highlights_km,
    guide_highlights_en,
    guide_visit_plan_km,
    guide_visit_plan_en,
    guide_tips_km,
    guide_tips_en,
    guide_source_urls,
  } = row;

  return {
    ...row,
    guide: (
      guide_about_km
      || guide_about_en
      || guide_history_km
      || guide_history_en
      || guide_highlights_km
      || guide_highlights_en
      || guide_visit_plan_km
      || guide_visit_plan_en
      || guide_tips_km
      || guide_tips_en
      || guide_source_urls
    )
      ? {
          about_km: guide_about_km,
          about_en: guide_about_en,
          history_km: guide_history_km,
          history_en: guide_history_en,
          highlights_km: guide_highlights_km,
          highlights_en: guide_highlights_en,
          visit_plan_km: guide_visit_plan_km,
          visit_plan_en: guide_visit_plan_en,
          tips_km: guide_tips_km,
          tips_en: guide_tips_en,
          source_urls: guide_source_urls,
        }
      : null,
  };
}

export async function getPlace(slug: string): Promise<Place | null> {
  if (!db) {
    return filterFallbackPlaces().find((place) => place.slug === slug) as Place | null;
  }

  try {
    const [rows] = await db.query<PlaceWithGuideRow[]>(
      `SELECT p.*, pr.slug AS province_slug, pr.name_km AS province_km, pr.name_en AS province_en,
        g.about_km AS guide_about_km, g.about_en AS guide_about_en,
        g.history_km AS guide_history_km, g.history_en AS guide_history_en,
        g.highlights_km AS guide_highlights_km, g.highlights_en AS guide_highlights_en,
        g.visit_plan_km AS guide_visit_plan_km, g.visit_plan_en AS guide_visit_plan_en,
        g.tips_km AS guide_tips_km, g.tips_en AS guide_tips_en,
        g.source_urls AS guide_source_urls
      FROM places p
      JOIN provinces pr ON pr.id = p.province_id
      LEFT JOIN place_guides g ON g.place_id = p.id
      WHERE p.slug = ?`,
      [slug],
    );
    return rows[0] ? hydratePlaceGuide(rows[0]) : null;
  } catch (error) {
    console.warn("Unable to load the destination guide from MySQL.", error);
    try {
      const [rows] = await db.query<Place[]>(`${SELECT} WHERE p.slug = ?`, [slug]);
      return rows[0] ?? (filterFallbackPlaces().find((place) => place.slug === slug) as Place | null);
    } catch {
      return filterFallbackPlaces().find((place) => place.slug === slug) as Place | null;
    }
  }
}
