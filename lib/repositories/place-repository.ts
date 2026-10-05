import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db/mysql";
import { samplePlaces, sampleProvinces } from "@/lib/data/sample-data";
import type { Place, PlaceFilters, Province, ProvinceGuide } from "@/lib/types/place";

const SELECT = `SELECT p.*, pr.slug AS province_slug, pr.name_km AS province_km, pr.name_en AS province_en
  FROM places p JOIN provinces pr ON pr.id = p.province_id`;

type PlaceCoordinates = RowDataPacket & Pick<Place, "lat" | "lng">;

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
    return rows;
  } catch (error) {
    console.warn("MySQL is not available, using sample province data.", error);
    return sampleProvinces as Province[];
  }
}

export async function getProvinceGuide(slug: string): Promise<ProvinceGuide | null> {
  if (!db) return null;

  try {
    const [rows] = await db.query<ProvinceGuide[]>(
      `SELECT p.slug, p.name_km, p.name_en, g.overview_km, g.overview_en,
        g.attractions_km, g.attractions_en, g.stay_guide_km, g.stay_guide_en,
        g.food_guide_km, g.food_guide_en
      FROM provinces p
      JOIN province_guides g ON g.province_id = p.id
      WHERE p.slug = ?`,
      [slug],
    );
    return rows[0] ?? null;
  } catch (error) {
    console.warn("Unable to load the province guide from MySQL.", error);
    return null;
  }
}

export async function getPlaces(filters: PlaceFilters): Promise<Place[]> {
  if (!db) return filterFallbackPlaces(filters) as Place[];

  try {
    const where: string[] = [];
    const args: string[] = [];

    if (filters.province) {
      where.push("pr.slug = ?");
      args.push(filters.province);
    }

    if (filters.category) {
      where.push("p.category = ?");
      args.push(filters.category);
    }

    if (filters.type) {
      where.push("p.listing_type = ?");
      args.push(filters.type);
    }

    if (filters.q) {
      where.push("(p.name_en LIKE ? OR p.name_km LIKE ? OR pr.name_en LIKE ? OR pr.name_km LIKE ?)");
      args.push(...Array(4).fill(`%${filters.q}%`));
    }

    const sql = `${SELECT} ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY p.views DESC`;
    const [rows] = await db.query<Place[]>(sql, args);
    return rows;
  } catch (error) {
    console.warn("MySQL is not available, using sample place data.", error);
    return filterFallbackPlaces(filters) as Place[];
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

export async function getPlace(slug: string): Promise<Place | null> {
  if (!db) {
    return filterFallbackPlaces().find((place) => place.slug === slug) as Place | null;
  }

  try {
    const [rows] = await db.query<Place[]>(`${SELECT} WHERE p.slug = ?`, [slug]);
    return rows[0] ?? null;
  } catch (error) {
    console.warn("MySQL is not available, using sample place lookup.", error);
    return filterFallbackPlaces().find((place) => place.slug === slug) as Place | null;
  }
}
