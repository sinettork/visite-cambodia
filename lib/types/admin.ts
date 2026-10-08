export type AdminActivityEntry = {
  id: number;
  admin_username: string;
  entity_type: "province" | "place";
  entity_slug: string;
  changed_fields: string[];
  created_at: string;
};
