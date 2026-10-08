import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const imageTypes: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export async function GET(_request: Request, { params }: { params: Promise<{ filename: string }> }) {
  const { filename } = await params;
  const match = /^([0-9a-f-]{36})\.(jpg|png|webp)$/i.exec(filename);
  if (!match) return new NextResponse(null, { status: 404 });

  const uploadDirectory = path.resolve(process.env.ADMIN_UPLOAD_DIR || path.join(process.cwd(), "uploads"));
  try {
    const content = await readFile(path.join(uploadDirectory, filename));
    return new NextResponse(content, {
      headers: {
        "Content-Type": imageTypes[match[2].toLowerCase()],
        "Content-Length": String(content.byteLength),
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return new NextResponse(null, { status: 404 });
    console.error(`Unable to read uploaded image ${filename}.`, error);
    return new NextResponse(null, { status: 500 });
  }
}
