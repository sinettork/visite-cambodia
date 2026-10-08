import { readdir, stat } from "node:fs/promises";
import type { Dirent } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { adminApiAuthorizationError } from "@/lib/admin/api-auth";
import { db } from "@/lib/db/mysql";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MEDIA_FILENAME = /^[0-9a-f-]{36}\.(jpg|png|webp)$/i;
const MEDIA_PAGE_SIZE = 48;

type MediaFile = {
  filename: string;
  url: string;
  extension: string;
  size: number;
  updated_at: string;
  usage_count: number;
};

export async function GET(request: Request) {
  const authError = await adminApiAuthorizationError();
  if (authError) return authError;
  if (!db) return NextResponse.json({ error: "The MySQL database is not configured." }, { status: 503 });
  const params = new URL(request.url).searchParams;
  const rawPage = params.get("page") ?? "1";
  if (!/^\d+$/.test(rawPage) || Number(rawPage) < 1) {
    return NextResponse.json({ error: "Page must be a positive whole number." }, { status: 400 });
  }
  const page = Math.floor(Number(rawPage));
  const directory = path.resolve(process.env.ADMIN_UPLOAD_DIR || path.join(process.cwd(), "uploads"));

  try {
    let entries: Dirent[];
    try {
      entries = await readdir(directory, { withFileTypes: true });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      entries = [];
    }
    const files = await Promise.all(entries
      .filter((entry) => entry.isFile() && MEDIA_FILENAME.test(entry.name))
      .map(async (entry): Promise<MediaFile> => {
        const file = await stat(path.join(directory, entry.name));
        return {
          filename: entry.name,
          url: `/media/${entry.name}`,
          extension: path.extname(entry.name).slice(1).toLowerCase(),
          size: file.size,
          updated_at: file.mtime.toISOString(),
          usage_count: 0,
        };
      }));
    const [references] = await db.query<(RowDataPacket & { image_url: string })[]>(
      `SELECT image_url FROM places WHERE image_url LIKE '/media/%'
      UNION ALL
      SELECT banner_image_url AS image_url FROM provinces WHERE banner_image_url LIKE '/media/%'`,
    );
    const usage = new Map<string, number>();
    for (const { image_url: url } of references) usage.set(url, (usage.get(url) ?? 0) + 1);
    const ordered = files
      .map((file) => ({ ...file, usage_count: usage.get(file.url) ?? 0 }))
      .sort((a, b) => b.updated_at.localeCompare(a.updated_at) || a.filename.localeCompare(b.filename));
    const total = ordered.length;
    const pageCount = Math.max(1, Math.ceil(total / MEDIA_PAGE_SIZE));
    const safePage = Math.min(page, pageCount);
    return NextResponse.json({
      items: ordered.slice((safePage - 1) * MEDIA_PAGE_SIZE, safePage * MEDIA_PAGE_SIZE),
      total,
      page: safePage,
      pageSize: MEDIA_PAGE_SIZE,
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Unable to load the admin media library.", error);
    return NextResponse.json({ error: "The media library could not be loaded. Check the upload directory and database." }, { status: 503 });
  }
}
