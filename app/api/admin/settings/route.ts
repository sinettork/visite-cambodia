import { constants } from "node:fs";
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { adminApiAuthorizationError } from "@/lib/admin/api-auth";
import { getAdminEmail, isAdminConfigured } from "@/lib/admin/auth";
import { db } from "@/lib/db/mysql";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authError = await adminApiAuthorizationError();
  if (authError) return authError;
  if (!db) return NextResponse.json({ error: "The MySQL database is not configured." }, { status: 503 });

  try {
    const databaseCheckStarted = Date.now();
    await db.query("SELECT 1");
    const databaseCheckMilliseconds = Date.now() - databaseCheckStarted;
    const uploadDirectory = path.resolve(process.env.ADMIN_UPLOAD_DIR || path.join(process.cwd(), "uploads"));
    let uploadDirectoryWritable = false;
    try {
      await mkdir(uploadDirectory, { recursive: true });
      await access(uploadDirectory, constants.R_OK | constants.W_OK);
      uploadDirectoryWritable = true;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();
    const requestUsesHttps = forwardedProtocol
      ? forwardedProtocol === "https"
      : new URL(request.url).protocol === "https:";
    return NextResponse.json({
      administrator: {
        email: getAdminEmail(),
        configured: isAdminConfigured(),
        passwordMinimumBytes: 16,
        sessionLifetimeHours: 8,
      },
      database: {
        connected: true,
        connectionLimit: 10,
        healthCheckMilliseconds: databaseCheckMilliseconds,
      },
      runtime: {
        nodeVersion: process.versions.node,
        supportedNodeVersion: Number(process.versions.node.split(".")[0]) === 24,
      },
      media: {
        directoryConfigured: Boolean(process.env.ADMIN_UPLOAD_DIR),
        directoryWritable: uploadDirectoryWritable,
        directoryLabel: process.env.ADMIN_UPLOAD_DIR ? "Custom directory" : "Default ./uploads directory",
        maxUploadMegabytes: 5,
      },
      security: {
        httpsRecommendedInProduction: process.env.NODE_ENV !== "production" || requestUsesHttps,
        sameOriginWrites: true,
        uploadsValidatedByFileSignature: true,
      },
    }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Unable to load admin system settings.", error);
    return NextResponse.json({ error: "System settings could not be checked. Review the database and media-directory configuration." }, { status: 503 });
  }
}
