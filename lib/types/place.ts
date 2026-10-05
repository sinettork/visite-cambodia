import type { RowDataPacket } from "mysql2";

export type Province = RowDataPacket & {
  slug: string;
  name_km: string;
  name_en: string;
};

export type Place = RowDataPacket & {
  slug: string;
  category: string;
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

export type PlaceFilters = {
  province?: string;
  category?: string;
  q?: string;
};
