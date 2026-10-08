import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { adminApiAuthorizationError } from "@/lib/admin/api-auth";
import { getAdminPrincipal, isSameOriginRequest } from "@/lib/admin/auth";
import { db } from "@/lib/db/mysql";
import { clearPlaceRepositoryCache } from "@/lib/repositories/place-repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const authError = await adminApiAuthorizationError(["super_admin", "admin"]);
  if (authError) return authError;
  if (!db) return NextResponse.json({ error: "The MySQL database is not configured." }, { status: 503 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid bulk update." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("slugs" in body) || !Array.isArray(body.slugs)
    || !body.slugs.length || body.slugs.length > 100
    || body.slugs.some((slug) => typeof slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    || !("status" in body) || (body.status !== "draft" && body.status !== "paused")) {
    return NextResponse.json({ error: "Choose up to 100 places and a valid draft or paused status." }, { status: 400 });
  }
  const slugs = [...new Set(body.slugs as string[])];
  if (slugs.length !== body.slugs.length) {
    return NextResponse.json({ error: "Remove duplicate places from the selection." }, { status: 400 });
  }
  const principal = await getAdminPrincipal();
  if (!principal) return NextResponse.json({ error: "Sign in to manage site content." }, { status: 401 });

  try {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const placeholders = slugs.map(() => "?").join(", ");
      const [rows] = await connection.query<(RowDataPacket & { slug: string })[]>(
        `SELECT slug FROM places WHERE slug IN (${placeholders}) FOR UPDATE`,
        slugs,
      );
      if (rows.length !== slugs.length) {
        await connection.rollback();
        return NextResponse.json({ error: "One or more selected places no longer exist. Reload the list and try again." }, { status: 409 });
      }
      await connection.execute(
        `UPDATE places SET publication_status = ? WHERE slug IN (${placeholders})`,
        [body.status, ...slugs],
      );
      for (const slug of slugs) {
        await connection.execute(
          "INSERT INTO admin_audit_log (admin_username, entity_type, entity_slug, changed_fields) VALUES (?, 'place', ?, ?)",
          [principal.email, slug, JSON.stringify(["publication_status"])],
        );
      }
      await connection.commit();

      clearPlaceRepositoryCache();
      revalidatePath("/[lang]", "page");
      revalidatePath("/[lang]/destinations/[slug]", "page");
      revalidatePath("/[lang]/regions/[slug]", "page");
      revalidatePath("/[lang]/explore", "page");
      return NextResponse.json({ ok: true, updated: slugs.length });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Unable to apply bulk content update.", error);
    return NextResponse.json({ error: "The bulk update could not be completed." }, { status: 503 });
  }
}
