import { NextResponse } from "next/server";
import { getAdminActivity } from "@/lib/admin/activity";
import { adminApiAuthorizationError } from "@/lib/admin/api-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await adminApiAuthorizationError();
  if (authError) return authError;
  const params = new URL(request.url).searchParams;
  const rawPage = params.get("page") ?? "1";
  if (!/^\d+$/.test(rawPage) || (params.has("page") && Number(rawPage) < 1)) {
    return NextResponse.json({ error: "Page must be a positive whole number." }, { status: 400 });
  }
  try {
    const activity = await getAdminActivity(Number(rawPage), 50);
    return NextResponse.json(activity, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Unable to load the admin activity log.", error);
    return NextResponse.json({ error: "The activity log could not be loaded. Check the database connection and audit schema." }, { status: 503 });
  }
}
