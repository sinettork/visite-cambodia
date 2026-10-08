import { NextResponse } from "next/server";
import {
  createAdminSession,
  isAdminConfigured,
  isSameOriginRequest,
  validateAdminCredentials,
} from "@/lib/admin/auth";

export const runtime = "nodejs";

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 8;
const failedAttempts = new Map<string, { count: number; expiresAt: number }>();

function requestKey(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")
    || "unknown";
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  for (const [entry, value] of failedAttempts) {
    if (value.expiresAt <= now) failedAttempts.delete(entry);
  }
  if (failedAttempts.size > 1000) {
    const oldest = failedAttempts.keys().next().value;
    if (oldest) failedAttempts.delete(oldest);
  }
  return (failedAttempts.get(key)?.count ?? 0) >= MAX_LOGIN_ATTEMPTS;
}

function recordFailure(key: string): void {
  const current = failedAttempts.get(key);
  if (!current || current.expiresAt <= Date.now()) {
    failedAttempts.set(key, { count: 1, expiresAt: Date.now() + LOGIN_WINDOW_MS });
    return;
  }
  current.count += 1;
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  }
  const key = requestKey(request);
  if (isRateLimited(key)) {
    return NextResponse.json({ error: "Too many sign-in attempts. Wait 15 minutes and try again." }, { status: 429 });
  }
  if (!isAdminConfigured()) {
    console.error("Admin login is unavailable because its environment configuration is invalid.");
    return NextResponse.json({ error: "Admin sign-in is not configured correctly." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid sign-in request." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("email" in body) || !("password" in body)
    || typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)
    || typeof body.password !== "string" || body.email.length > 254 || body.password.length > 1024) {
    return NextResponse.json({ error: "Enter a valid email and password." }, { status: 400 });
  }

  try {
    if (!await validateAdminCredentials(body.email, body.password)) {
      recordFailure(key);
      return NextResponse.json({ error: "The email or password is incorrect." }, { status: 401 });
    }
    failedAttempts.delete(key);
    await createAdminSession(body.email);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to create the admin session.", error);
    return NextResponse.json({ error: "Unable to sign in right now." }, { status: 500 });
  }
}
