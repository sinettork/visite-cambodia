import { NextResponse } from "next/server";
import { adminApiAuthorizationError } from "@/lib/admin/api-auth";
import { getAdminCatalog } from "@/lib/admin/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const authError = await adminApiAuthorizationError(["super_admin", "admin"]);
  if (authError) return authError;
  try {
    const catalog = await getAdminCatalog();
    const date = new Date().toISOString().slice(0, 10);
    return new NextResponse(JSON.stringify({
      format: "visit-cambodia-admin-content",
      version: 1,
      exportedAt: new Date().toISOString(),
      provinces: catalog.provinces,
      places: catalog.places,
    }, null, 2), {
      headers: {
        "Cache-Control": "private, no-store",
        "Content-Disposition": `attachment; filename="visit-cambodia-content-${date}.json"`,
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Unable to export the admin content catalog.", error);
    return NextResponse.json({ error: "Content export could not be created. Check the database connection and migration status." }, { status: 503 });
  }
}
