import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ContentValidationError, createAdminPlace, getAdminCatalog, updateAdminContent, validateContentUpdate } from "@/lib/admin/content";
import { getAdminPrincipal, isAdminAuthenticated, isAdminConfigured, isSameOriginRequest } from "@/lib/admin/auth";
import { clearPlaceRepositoryCache } from "@/lib/repositories/place-repository";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function authorizationResponse() {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin sign-in is not configured correctly." }, { status: 503 });
  }
  try {
    return await isAdminAuthenticated()
      ? null
      : NextResponse.json({ error: "Sign in to manage site content." }, { status: 401 });
  } catch (error) {
    console.error("Admin authentication configuration is unavailable.", error);
    return NextResponse.json({ error: "Admin sign-in is not configured correctly." }, { status: 503 });
  }
}

export async function GET() {
  const authError = await authorizationResponse();
  if (authError) return authError;
  try {
    const catalog = await getAdminCatalog();
    return NextResponse.json(catalog, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Unable to load the admin content catalog.", error);
    return NextResponse.json({ error: "The MySQL content catalog is unavailable. Check the database connection and migrations." }, { status: 503 });
  }
}

export async function PUT(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const authError = await authorizationResponse();
  if (authError) return authError;
  const principal = await getAdminPrincipal();
  if (!principal) return NextResponse.json({ error: "Sign in to manage site content." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid content update." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("kind" in body) || !("slug" in body)
    || (body.kind !== "province" && body.kind !== "place")
    || typeof body.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(body.slug)) {
    return NextResponse.json({ error: "Select valid content to update." }, { status: 400 });
  }

  try {
    const fields = validateContentUpdate(body.kind, body);
    const updated = await updateAdminContent(body.kind, body.slug, fields, principal.email, principal.role);
    if (!updated) return NextResponse.json({ error: "The selected item no longer exists." }, { status: 404 });

    clearPlaceRepositoryCache();
    revalidatePath("/[lang]", "page");
    if (body.kind === "province") revalidatePath("/[lang]/regions/[slug]", "page");
    else if (body.kind === "place") {
      revalidatePath("/[lang]/destinations/[slug]", "page");
      revalidatePath("/[lang]/regions/[slug]", "page");
    }
    revalidatePath("/[lang]/explore", "page");
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Unable to save admin content.", error);
    return NextResponse.json({ error: "Unable to save this update. Check the server and database logs." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const authError = await authorizationResponse();
  if (authError) return authError;
  const principal = await getAdminPrincipal();
  if (!principal) return NextResponse.json({ error: "Sign in to manage site content." }, { status: 401 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid place record." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("kind" in body) || body.kind !== "place") {
    return NextResponse.json({ error: "Select a valid place record." }, { status: 400 });
  }

  try {
    const fields = validateContentUpdate("place", body);
    const slug = await createAdminPlace(fields, principal.email);
    clearPlaceRepositoryCache();
    revalidatePath("/[lang]", "page");
    revalidatePath("/[lang]/explore", "page");
    revalidatePath("/[lang]/regions/[slug]", "page");
    return NextResponse.json({ ok: true, slug }, { status: 201 });
  } catch (error) {
    if (error instanceof ContentValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    console.error("Unable to create admin place.", error);
    return NextResponse.json({ error: "Unable to create this place. Check the server and database logs." }, { status: 500 });
  }
}
