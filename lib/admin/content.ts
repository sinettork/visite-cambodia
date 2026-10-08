import "server-only";

import type { RowDataPacket } from "mysql2";
import type { AdminRole } from "@/lib/admin/auth";
import { db } from "@/lib/db/mysql";
import type { Place, ProvinceGuide } from "@/lib/types/place";

export type AdminProvince = Pick<ProvinceGuide,
  | "slug" | "name_km" | "name_en" | "banner_image_url"
  | "overview_km" | "overview_en" | "story_km" | "story_en"
  | "history_km" | "history_en" | "culture_km" | "culture_en"
  | "travel_km" | "travel_en" | "attractions_km" | "attractions_en"
  | "stay_guide_km" | "stay_guide_en" | "food_guide_km" | "food_guide_en"
  | "source_urls"
>;

export type AdminPlace = Pick<Place,
  | "slug" | "province_slug" | "province_en" | "province_km" | "category" | "listing_type" | "business_type" | "publication_status"
  | "name_km" | "name_en" | "summary_km" | "summary_en" | "image_url"
  | "ticket_usd" | "ticket_status" | "ticket_url" | "ticket_provider" | "open_hours"
  | "access_km" | "access_en" | "source_urls" | "lat" | "lng"
>;

export type AdminCatalog = {
  provinces: AdminProvince[];
  places: AdminPlace[];
};

export class ContentValidationError extends Error {}

type ProvinceRow = RowDataPacket & AdminProvince;
type PlaceRow = RowDataPacket & AdminPlace & { source_urls: string | null };

export async function getAdminCatalog(): Promise<AdminCatalog> {
  if (!db) throw new Error("The MySQL database is not configured.");
  const [provinces] = await db.query<ProvinceRow[]>(
    `SELECT p.slug, p.name_km, p.name_en, p.banner_image_url,
      g.overview_km, g.overview_en, g.story_km, g.story_en,
      g.history_km, g.history_en, g.culture_km, g.culture_en,
      g.travel_km, g.travel_en, g.attractions_km, g.attractions_en,
      g.stay_guide_km, g.stay_guide_en, g.food_guide_km, g.food_guide_en,
      g.source_urls
    FROM provinces p
    LEFT JOIN province_guides g ON g.province_id = p.id
    ORDER BY p.name_en`,
  );
  const [places] = await db.query<PlaceRow[]>(
    `SELECT p.slug, pr.slug AS province_slug, pr.name_en AS province_en, pr.name_km AS province_km,
      p.category, p.listing_type, p.business_type, p.publication_status, p.name_km, p.name_en, p.summary_km, p.summary_en,
      p.image_url, p.ticket_usd, p.ticket_status, p.ticket_url, p.ticket_provider,
      p.open_hours, p.access_km, p.access_en, p.source_urls, p.lat, p.lng
    FROM places p
    JOIN provinces pr ON pr.id = p.province_id
    ORDER BY pr.name_en, p.name_en`,
  );

  return {
    provinces: provinces.map((province) => ({
      ...province,
      overview_km: province.overview_km ?? "",
      overview_en: province.overview_en ?? "",
      story_km: province.story_km ?? "",
      story_en: province.story_en ?? "",
      history_km: province.history_km ?? "",
      history_en: province.history_en ?? "",
      culture_km: province.culture_km ?? "",
      culture_en: province.culture_en ?? "",
      travel_km: province.travel_km ?? "",
      travel_en: province.travel_en ?? "",
      attractions_km: province.attractions_km ?? "",
      attractions_en: province.attractions_en ?? "",
      stay_guide_km: province.stay_guide_km ?? "",
      stay_guide_en: province.stay_guide_en ?? "",
      food_guide_km: province.food_guide_km ?? "",
      food_guide_en: province.food_guide_en ?? "",
      source_urls: province.source_urls ?? "",
    })),
    places: places.map((place) => {
      let sourceUrls: string[] = [];
      if (place.source_urls) {
        try {
          const parsed: unknown = JSON.parse(place.source_urls);
          if (Array.isArray(parsed) && parsed.every((url) => typeof url === "string")) sourceUrls = parsed;
        } catch (error) {
          console.error(`Invalid source URL data for destination ${place.slug}.`, error);
        }
      }
      return { ...place, source_urls: sourceUrls };
    }),
  };
}

const provinceTextFields = [
  "overview_km", "overview_en", "story_km", "story_en", "history_km", "history_en",
  "culture_km", "culture_en", "travel_km", "travel_en", "attractions_km", "attractions_en",
  "stay_guide_km", "stay_guide_en", "food_guide_km", "food_guide_en",
] as const;

const placeTextFields = [
  "name_km", "name_en", "summary_km", "summary_en", "open_hours", "access_km", "access_en",
  "ticket_provider",
] as const;

const provinceFieldNames = new Set<string>(["name_km", "name_en", "banner_image_url", "source_urls", ...provinceTextFields]);
const placeFieldNames = new Set<string>([
  ...placeTextFields, "image_url", "ticket_usd", "ticket_status", "ticket_url", "source_urls",
  "business_type", "publication_status", "province_slug", "category", "listing_type", "lat", "lng",
]);

function parseFields(body: unknown, allowed: Set<string>): Record<string, string> {
  if (!body || typeof body !== "object" || !("fields" in body) || !body.fields || typeof body.fields !== "object") {
    throw new ContentValidationError("The content update is invalid.");
  }
  const fields = body.fields as Record<string, unknown>;
  const entries = Object.entries(fields);
  if (!entries.length || entries.some(([key]) => !allowed.has(key))) {
    throw new ContentValidationError("The content update contains unsupported fields.");
  }
  const fieldLimits: Record<string, number> = {
    name_km: 160,
    name_en: 160,
    banner_image_url: 500,
    image_url: 500,
    ticket_url: 500,
    ticket_provider: 160,
    open_hours: 80,
    business_type: 32,
    publication_status: 20,
    province_slug: 80,
    category: 32,
    listing_type: 32,
    lat: 16,
    lng: 16,
  };
  const result: Record<string, string> = {};
  for (const [key, value] of entries) {
    if (typeof value !== "string" || value.length > (fieldLimits[key] ?? (key === "source_urls" ? 12000 : 20000))) {
      throw new ContentValidationError(`The value for ${key} is invalid or too long.`);
    }
    result[key] = value.trim();
  }
  return result;
}

function validateImageUrl(value: string, field: string): void {
  if (!value) return;
  if (/^\/(?:images\/[A-Za-z0-9._/-]+|media\/[0-9a-f-]+\.(?:jpg|png|webp))$/i.test(value) && !value.includes("..")) return;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password) return;
  } catch {
    // Report the invalid value below.
  }
  throw new ContentValidationError(`${field} must be a local image path or an HTTPS URL.`);
}

function validateHttpsUrl(value: string, field: string): void {
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password) return;
  } catch {
    // Report the invalid value below.
  }
  throw new ContentValidationError(`${field} must be an HTTPS URL.`);
}

function validateSourceUrls(value: string): string[] {
  const urls = value.split(/\r?\n/).map((url) => url.trim()).filter(Boolean);
  if (urls.length > 30) throw new ContentValidationError("You can add up to 30 source links.");
  for (const url of urls) validateHttpsUrl(url, "Source link");
  return urls;
}

export function validateContentUpdate(kind: "province" | "place", body: unknown): Record<string, string> {
  const allowed = kind === "province" ? provinceFieldNames : placeFieldNames;
  const fields = parseFields(body, allowed);
  if (kind === "province") {
    if (fields.name_km !== undefined && !fields.name_km) throw new ContentValidationError("The Khmer province name cannot be empty.");
    if (fields.name_en !== undefined && !fields.name_en) throw new ContentValidationError("The English province name cannot be empty.");
    if (fields.banner_image_url !== undefined) validateImageUrl(fields.banner_image_url, "Province banner image");
    if (fields.source_urls !== undefined) validateSourceUrls(fields.source_urls);
  } else if (kind === "place") {
    if (fields.image_url !== undefined) validateImageUrl(fields.image_url, "Destination image");
    if (fields.ticket_url !== undefined) validateHttpsUrl(fields.ticket_url, "Ticket purchase link");
    if (fields.ticket_usd !== undefined && fields.ticket_usd !== "" && !/^\d{1,4}(?:\.\d{1,2})?$/.test(fields.ticket_usd)) {
      throw new ContentValidationError("Enter a valid price, up to 9,999.99.");
    }
    if (fields.ticket_status !== undefined && !["free", "unknown", "check", ""].includes(fields.ticket_status)) {
      throw new ContentValidationError("The ticket status is invalid.");
    }
    if (fields.source_urls !== undefined) validateSourceUrls(fields.source_urls);
    if (fields.business_type !== undefined && !["hotel", "guest_house", "restaurant", "cafe", "other", ""].includes(fields.business_type)) {
      throw new ContentValidationError("Choose a valid business type.");
    }
    if (fields.publication_status !== undefined && !["draft", "published", "paused"].includes(fields.publication_status)) {
      throw new ContentValidationError("Choose a valid publishing status.");
    }
    if (fields.listing_type !== undefined && !["attraction", "accommodation", "restaurant"].includes(fields.listing_type)) {
      throw new ContentValidationError("Choose a valid place listing type.");
    }
    if (fields.province_slug !== undefined && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(fields.province_slug)) {
      throw new ContentValidationError("Select a valid province.");
    }
    if (fields.category !== undefined && !["history", "nature", "beach", "adventure", "culture", "food"].includes(fields.category)) {
      throw new ContentValidationError("Choose a valid place category.");
    }
    if (fields.lat !== undefined && fields.lat !== "" && (!/^-?\d{1,2}(?:\.\d{1,6})?$/.test(fields.lat) || Math.abs(Number(fields.lat)) > 90)) {
      throw new ContentValidationError("Enter a valid latitude.");
    }
    if (fields.lng !== undefined && fields.lng !== "" && (!/^-?\d{1,3}(?:\.\d{1,6})?$/.test(fields.lng) || Math.abs(Number(fields.lng)) > 180)) {
      throw new ContentValidationError("Enter a valid longitude.");
    }
    const type = fields.business_type;
    const listingType = fields.listing_type;
    if ((type === "hotel" || type === "guest_house") && listingType && listingType !== "accommodation") {
      throw new ContentValidationError("Hotels and guest houses must use the accommodation place group.");
    }
    if ((type === "restaurant" || type === "cafe") && listingType && listingType !== "restaurant") {
      throw new ContentValidationError("Restaurants and cafes must use the restaurant / food place group.");
    }
    if (type === "other" && listingType && listingType === "attraction") {
      throw new ContentValidationError("Choose accommodation or restaurant / food for a business listing.");
    }
  }
  return fields;
}

export async function createAdminPlace(fields: Record<string, string>, username: string): Promise<string> {
  if (!db) throw new Error("The MySQL database is not configured.");
  if (!fields.name_km || !fields.name_en || !fields.province_slug) {
    throw new ContentValidationError("Enter the place's Khmer and English names and select a province.");
  }
  if (fields.publication_status && fields.publication_status !== "draft") {
    throw new ContentValidationError("New places must be saved as drafts before they can be published.");
  }
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const [provinceRows] = await connection.query<RowDataPacket[]>("SELECT id FROM provinces WHERE slug = ? FOR UPDATE", [fields.province_slug]);
    if (!provinceRows[0]) throw new ContentValidationError("Select a valid province.");
    const baseSlug = fields.name_en
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 110) || "place";
    let slug = baseSlug;
    let suffix = 2;
    while (true) {
      const [existing] = await connection.query<RowDataPacket[]>("SELECT id FROM places WHERE slug = ? FOR UPDATE", [slug]);
      if (!existing.length) break;
      slug = `${baseSlug}-${suffix++}`;
    }
    const listingType = fields.listing_type || "attraction";
    await connection.execute(
      `INSERT INTO places (
        slug, province_id, listing_type, business_type, publication_status, category,
        name_km, name_en, summary_km, summary_en, image_url, ticket_usd, ticket_status,
        ticket_url, ticket_provider, open_hours, access_km, access_en, source_urls, lat, lng, views
      ) VALUES (?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [
        slug,
        Number(provinceRows[0].id),
        listingType,
        fields.business_type || null,
        fields.category || "culture",
        fields.name_km,
        fields.name_en,
        fields.summary_km || null,
        fields.summary_en || null,
        fields.image_url || null,
        fields.ticket_usd || null,
        fields.ticket_status || null,
        fields.ticket_url || null,
        fields.ticket_provider || null,
        fields.open_hours || null,
        fields.access_km || null,
        fields.access_en || null,
        JSON.stringify(validateSourceUrls(fields.source_urls || "")),
        fields.lat || null,
        fields.lng || null,
      ],
    );
    await connection.execute(
      "INSERT INTO admin_audit_log (admin_username, entity_type, entity_slug, changed_fields) VALUES (?, 'place', ?, ?)",
      [username, slug, JSON.stringify([...Object.keys(fields), "publication_status"])],
    );
    await connection.commit();
    return slug;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}

export async function updateAdminContent(
  kind: "province" | "place",
  slug: string,
  fields: Record<string, string>,
  username: string,
  role: AdminRole = "super_admin",
): Promise<boolean> {
  if (!db) throw new Error("The MySQL database is not configured.");
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    if (kind === "province") {
      const [rows] = await connection.query<RowDataPacket[]>("SELECT id FROM provinces WHERE slug = ? FOR UPDATE", [slug]);
      if (!rows[0]) {
        await connection.rollback();
        return false;
      }
      const provinceColumns: string[] = [];
      const provinceValues: Array<string | null> = [];
      for (const field of ["name_km", "name_en"] as const) {
        if (fields[field] !== undefined) {
          provinceColumns.push(field);
          provinceValues.push(fields[field]);
        }
      }
      if (fields.banner_image_url !== undefined) {
        provinceColumns.push("banner_image_url");
        provinceValues.push(fields.banner_image_url || null);
      }
      if (provinceColumns.length) {
        await connection.execute(
          `UPDATE provinces SET ${provinceColumns.map((column) => `${column} = ?`).join(", ")} WHERE slug = ?`,
          [...provinceValues, slug],
        );
      }

      const guideFields: Record<string, string | null> = {};
      for (const field of provinceTextFields) {
        if (fields[field] !== undefined) {
          const nullable = ["story_km", "story_en", "history_km", "history_en", "culture_km", "culture_en", "travel_km", "travel_en"].includes(field);
          guideFields[field] = fields[field] || (nullable ? null : "");
        }
      }
      if (fields.source_urls !== undefined) guideFields.source_urls = validateSourceUrls(fields.source_urls).join("\n") || null;
      if (Object.keys(guideFields).length) {
        const provinceId = Number(rows[0].id);
        const [guideRows] = await connection.query<RowDataPacket[]>(
          `SELECT ${[...provinceTextFields, "source_urls"].join(", ")} FROM province_guides WHERE province_id = ? FOR UPDATE`,
          [provinceId],
        );
        const existingGuide = (guideRows[0] ?? {}) as Record<string, string | null>;
        const columns = [...provinceTextFields, "source_urls"];
        const values = columns.map((column) => (
          Object.prototype.hasOwnProperty.call(guideFields, column)
            ? guideFields[column]
            : existingGuide[column] ?? (["overview_km", "overview_en", "attractions_km", "attractions_en", "stay_guide_km", "stay_guide_en", "food_guide_km", "food_guide_en"].includes(column) ? "" : null)
        ));
        const assignments = Object.keys(guideFields).map((column) => `${column} = VALUES(${column})`).join(", ");
        await connection.execute(
          `INSERT INTO province_guides (province_id, ${columns.join(", ")})
          VALUES (?, ${columns.map(() => "?").join(", ")})
          ON DUPLICATE KEY UPDATE ${assignments || "province_id = VALUES(province_id)"}`,
          [provinceId, ...values],
        );
      }
    } else if (kind === "place") {
      const [rows] = await connection.query<RowDataPacket[]>(
        `SELECT id, publication_status, name_km, name_en, summary_km, summary_en, source_urls,
          business_type, listing_type
        FROM places WHERE slug = ? FOR UPDATE`,
        [slug],
      );
      if (!rows[0]) {
        await connection.rollback();
        return false;
      }
      if (role === "editor" && fields.publication_status !== undefined
        && fields.publication_status !== rows[0].publication_status) {
        throw new ContentValidationError("Editors cannot change a place's publishing status.");
      }
      const currentPlace = { ...rows[0], ...fields };
      if (fields.publication_status === "published") {
        if (!currentPlace.name_km || !currentPlace.name_en
          || (!currentPlace.summary_km && !currentPlace.summary_en)) {
          throw new ContentValidationError("Add both place names and at least one description before publishing.");
        }
        let sources: string[] = [];
        if (fields.source_urls !== undefined) {
          sources = validateSourceUrls(fields.source_urls);
        } else if (typeof currentPlace.source_urls === "string") {
          try {
            const parsed: unknown = JSON.parse(currentPlace.source_urls);
            sources = Array.isArray(parsed) && parsed.every((url) => typeof url === "string")
              ? parsed
              : currentPlace.source_urls.split(/\r?\n/).filter(Boolean);
          } catch {
            sources = currentPlace.source_urls.split(/\r?\n/).filter(Boolean);
          }
        }
        if (sources.length === 0) {
          throw new ContentValidationError("Add at least one verified source URL before publishing this place.");
        }
      }
      const businessType = currentPlace.business_type;
      const listingType = currentPlace.listing_type;
      if ((businessType === "hotel" || businessType === "guest_house") && listingType !== "accommodation") {
        throw new ContentValidationError("Hotels and guest houses must use the accommodation place group.");
      }
      if ((businessType === "restaurant" || businessType === "cafe") && listingType !== "restaurant") {
        throw new ContentValidationError("Restaurants and cafes must use the restaurant / food place group.");
      }
      const columns: string[] = [];
      const values: Array<string | number | null> = [];
      for (const field of placeTextFields) {
        if (fields[field] !== undefined) {
          columns.push(field);
          values.push(fields[field] || null);
        }
      }
      for (const field of ["image_url", "ticket_url"] as const) {
        if (fields[field] !== undefined) {
          columns.push(field);
          values.push(fields[field] || null);
        }
      }
      if (fields.ticket_usd !== undefined) {
        columns.push("ticket_usd");
        values.push(fields.ticket_usd || null);
      }
      if (fields.ticket_status !== undefined) {
        columns.push("ticket_status");
        values.push(fields.ticket_status || null);
      }
      if (fields.source_urls !== undefined) {
        columns.push("source_urls");
        values.push(JSON.stringify(validateSourceUrls(fields.source_urls)));
      }
      for (const field of ["business_type", "publication_status", "category", "listing_type"] as const) {
        if (fields[field] !== undefined) {
          columns.push(field);
          values.push(fields[field] || null);
        }
      }
      for (const field of ["lat", "lng"] as const) {
        if (fields[field] !== undefined) {
          columns.push(field);
          values.push(fields[field] || null);
        }
      }
      if (fields.province_slug !== undefined) {
        const [provinceRows] = await connection.query<RowDataPacket[]>(
          "SELECT id FROM provinces WHERE slug = ?",
          [fields.province_slug],
        );
        if (!provinceRows[0]) throw new ContentValidationError("Select a valid province.");
        columns.push("province_id");
        values.push(Number(provinceRows[0].id));
      }
      if (columns.length) {
        await connection.execute(
          `UPDATE places SET ${columns.map((column) => `${column} = ?`).join(", ")} WHERE slug = ?`,
          [...values, slug],
        );
      }
    }

    await connection.execute(
      "INSERT INTO admin_audit_log (admin_username, entity_type, entity_slug, changed_fields) VALUES (?, ?, ?, ?)",
      [username, kind, slug, JSON.stringify(Object.keys(fields))],
    );
    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
}
