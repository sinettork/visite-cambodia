import "server-only";

import { NextResponse } from "next/server";
import { getAdminPrincipal, isAdminConfigured, type AdminRole } from "@/lib/admin/auth";

export async function adminApiAuthorizationError(allowedRoles?: AdminRole[]): Promise<NextResponse | null> {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin sign-in is not configured correctly." }, { status: 503 });
  }
  try {
    const principal = await getAdminPrincipal();
    if (!principal) return NextResponse.json({ error: "Sign in to manage site content." }, { status: 401 });
    if (allowedRoles && !allowedRoles.includes(principal.role)) {
      return NextResponse.json({ error: "Your administrator role does not allow this action." }, { status: 403 });
    }
    return null;
  } catch (error) {
    console.error("Admin authentication configuration is unavailable.", error);
    return NextResponse.json({ error: "Admin sign-in is not configured correctly." }, { status: 503 });
  }
}
