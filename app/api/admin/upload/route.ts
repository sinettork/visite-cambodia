import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAdminAuthenticated, isSameOriginRequest } from "@/lib/admin/auth";

export const runtime = "nodejs";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function detectImage(bytes: Uint8Array): { extension: string; mime: string } | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { extension: "jpg", mime: "image/jpeg" };
  }
  if (bytes.length >= 8 && bytes.subarray(0, 8).join(",") === "137,80,78,71,13,10,26,10") {
    return { extension: "png", mime: "image/png" };
  }
  if (bytes.length >= 12
    && String.fromCharCode(...bytes.subarray(0, 4)) === "RIFF"
    && String.fromCharCode(...bytes.subarray(8, 12)) === "WEBP") {
    return { extension: "webp", mime: "image/webp" };
  }
  return null;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  try {
    if (!await isAdminAuthenticated()) return NextResponse.json({ error: "Sign in to upload images." }, { status: 401 });
  } catch (error) {
    console.error("Unable to verify admin access for image upload.", error);
    return NextResponse.json({ error: "Admin sign-in is not configured correctly." }, { status: 503 });
  }

  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_IMAGE_SIZE + 64 * 1024) {
    return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 413 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
  }
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose an image file to upload." }, { status: 400 });
  }
  if (file.size > MAX_IMAGE_SIZE) return NextResponse.json({ error: "Images must be 5 MB or smaller." }, { status: 413 });

  const bytes = new Uint8Array(await file.arrayBuffer());
  const image = detectImage(bytes);
  if (!image) return NextResponse.json({ error: "Upload a valid JPG, PNG, or WebP image." }, { status: 415 });

  const filename = `${randomUUID()}.${image.extension}`;
  const uploadDirectory = path.resolve(process.env.ADMIN_UPLOAD_DIR || path.join(process.cwd(), "uploads"));
  try {
    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(path.join(uploadDirectory, filename), bytes, { flag: "wx", mode: 0o644 });
    return NextResponse.json({ imageUrl: `/media/${filename}` });
  } catch (error) {
    console.error("Unable to save the uploaded image.", error);
    return NextResponse.json({ error: "The image could not be saved. Check the upload directory permissions." }, { status: 500 });
  }
}
