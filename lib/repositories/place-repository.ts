import { db } from "@/lib/db/mysql";
import { samplePlaces, sampleProvinces } from "@/lib/data/sample-data";
import type { Place, PlaceFilters, Province } from "@/lib/types/place";

const SELECT = `SELECT p.*, pr.slug AS province_slug, pr.name_km AS province_km, pr.name_en AS province_en
  FROM places p JOIN provinces pr ON pr.id = p.province_id`;

function filterFallbackPlaces(filters: PlaceFilters = {}) {
  const term = filters.q?.trim().toLowerCase();

  return [...samplePlaces]
    .filter((place) => {
      const matchesProvince = !filters.province || place.province_slug === filters.province;
      const matchesCategory = !filters.category || place.category === filters.category;
      const matchesQuery = !term || [
        place.name_en,
        place.name_km,
        place.province_en,
        place.province_km,
      ].some((value) => value.toLowerCase().includes(term));

      return matchesProvince && matchesCategory && matchesQuery;
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
