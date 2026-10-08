import type { RowDataPacket } from "mysql2";

export type Province = RowDataPacket & {
  slug: string;
  name_km: string;
  name_en: string;
  banner_image_url?: string | null;
};

export type PlaceGuide = {
  about_km: string | null;
  about_en: string | null;
  history_km: string | null;
  history_en: string | null;
  highlights_km: string | null;
  highlights_en: string | null;
  visit_plan_km: string | null;
  visit_plan_en: string | null;
  tips_km: string | null;
  tips_en: string | null;
  source_urls: string | null;
};

export type Place = RowDataPacket & {
  slug: string;
  category: string;
  listing_type: "attraction" | "accommodation" | "restaurant";
  business_type?: "hotel" | "guest_house" | "restaurant" | "cafe" | "other" | null;
  publication_status?: "draft" | "published" | "paused";
  ticket_status?: "free" | "unknown" | "check" | null;
  ticket_url?: string | null;
  ticket_provider?: string | null;
  image_url: string | null;
  access_km?: string | null;
  access_en?: string | null;
  source_urls?: string[] | null;
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
  guide?: PlaceGuide | null;
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
  travel_km: string | null;
  travel_en: string | null;
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
