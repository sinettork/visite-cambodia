import "server-only";

import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db/mysql";
import type { AdminActivityEntry } from "@/lib/types/admin";

function parseChangedFields(value: unknown, id: number): string[] {
  const parsed: unknown = typeof value === "string" ? JSON.parse(value) : value;
  if (!Array.isArray(parsed) || !parsed.every((field) => typeof field === "string")) {
    throw new Error(`Invalid changed-fields data in admin audit record ${id}.`);
  }
  return parsed;
}

export async function getAdminActivity(page = 1, pageSize = 50): Promise<{
  items: AdminActivityEntry[];
  total: number;
  page: number;
  pageSize: number;
}> {
  if (!db) throw new Error("The MySQL database is not configured.");
  const [countRows] = await db.query<(RowDataPacket & { total: number })[]>(
    "SELECT COUNT(*) AS total FROM admin_audit_log",
  );
  const total = Number(countRows[0]?.total ?? 0);
  const safePageSize = Math.min(100, Math.max(1, Math.floor(pageSize) || 50));
  const safePage = Math.min(Math.max(1, Math.floor(page) || 1), Math.max(1, Math.ceil(total / safePageSize)));
  const [rows] = await db.query<(RowDataPacket & Omit<AdminActivityEntry, "changed_fields" | "created_at"> & {
    changed_fields: unknown;
    created_at: Date | string;
  })[]>(
    `SELECT id, admin_username, entity_type, entity_slug, changed_fields, created_at
    FROM admin_audit_log
    ORDER BY id DESC
    LIMIT ? OFFSET ?`,
    [safePageSize, (safePage - 1) * safePageSize],
  );

  return {
    items: rows.map((row) => {
      const createdAt = new Date(row.created_at);
      if (Number.isNaN(createdAt.getTime())) throw new Error(`Invalid timestamp in admin audit record ${row.id}.`);
      return {
        id: Number(row.id),
        admin_username: row.admin_username,
        entity_type: row.entity_type,
        entity_slug: row.entity_slug,
        changed_fields: parseChangedFields(row.changed_fields, Number(row.id)),
        created_at: createdAt.toISOString(),
      };
    }),
    total,
    page: safePage,
    pageSize: safePageSize,
  };
}
