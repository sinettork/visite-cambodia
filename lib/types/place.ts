import type { RowDataPacket } from "mysql2";

export type Province = RowDataPacket & {
  slug: string;
  name_km: string;
  name_en: string;
};

export type Place = RowDataPacket & {
  slug: string;
  category: string;
  listing_type: "attraction" | "accommodation" | "restaurant";
  image_url: string | null;
  name_km: string;
  name_en: string;
  summary_km: string | null;
  summary_en: string | null;
  ticket_usd: string | null;
  open_hours: string | null;
  lat: string | null;
  lng: string | null;
  province_slug: string;
  province_km: string;
  province_en: string;
  views: number;
};

export type ProvinceGuide = Province & {
  overview_km: string;
  overview_en: string;
  story_km: string | null;
  story_en: string | null;
  history_km: string | null;
  history_en: string | null;
  culture_km: string | null;
  culture_en: string | null;
  attractions_km: string;
  attractions_en: string;
  stay_guide_km: string;
  stay_guide_en: string;
  food_guide_km: string;
  food_guide_en: string;
  source_urls: string | null;
};

export type PlaceFilters = {
  province?: string;
  category?: string;
  type?: Place["listing_type"];
  q?: string;
};

export type PlacePage = {
  items: Place[];
  total: number;
  page: number;
  pageSize: number;
};
