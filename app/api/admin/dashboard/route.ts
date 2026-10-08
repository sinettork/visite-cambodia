import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { getAdminActivity } from "@/lib/admin/activity";
import { adminApiAuthorizationError } from "@/lib/admin/api-auth";
import { db } from "@/lib/db/mysql";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type PlaceCounts = RowDataPacket & {
  total: number;
  published: number;
  drafts: number;
  paused: number;
  businesses: number;
};

export async function GET() {
  const authError = await adminApiAuthorizationError();
  if (authError) return authError;
  if (!db) return NextResponse.json({ error: "The MySQL database is not configured." }, { status: 503 });

  try {
    const [[placeRows], [provinceRows], [businessRows], activity] = await Promise.all([
      db.query<PlaceCounts[]>(
        `SELECT COUNT(*) AS total,
          SUM(publication_status = 'published') AS published,
          SUM(publication_status = 'draft') AS drafts,
          SUM(publication_status = 'paused') AS paused,
          SUM(business_type IS NOT NULL) AS businesses
        FROM places`,
      ),
      db.query<(RowDataPacket & { total: number })[]>("SELECT COUNT(*) AS total FROM provinces"),
      db.query<(RowDataPacket & { business_type: string; total: number })[]>(
        `SELECT business_type, COUNT(*) AS total FROM places
        WHERE business_type IS NOT NULL GROUP BY business_type ORDER BY total DESC, business_type`,
      ),
      getAdminActivity(1, 6),
    ]);
    const places = placeRows[0];
    return NextResponse.json({
      stats: {
        places: Number(places?.total ?? 0),
        published: Number(places?.published ?? 0),
        drafts: Number(places?.drafts ?? 0),
        paused: Number(places?.paused ?? 0),
        businesses: Number(places?.businesses ?? 0),
        provinces: Number(provinceRows[0]?.total ?? 0),
      },
      businessesByType: businessRows.map((row) => ({ type: row.business_type, count: Number(row.total) })),
      recentActivity: activity.items,
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Unable to load the admin dashboard summary.", error);
    return NextResponse.json({ error: "The dashboard summary could not be loaded. Check the database and migration status." }, { status: 503 });
  }
}
