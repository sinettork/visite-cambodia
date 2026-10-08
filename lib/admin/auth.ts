import "server-only";

import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import type { RowDataPacket } from "mysql2";
import { db } from "@/lib/db/mysql";

const COOKIE_NAME = "visit_cambodia_admin";
const SESSION_LIFETIME_SECONDS = 8 * 60 * 60;
const SCRYPT_KEY_LENGTH = 64;

type AdminConfig = {
  email: string;
  password: string;
  secret: string;
};

export type AdminRole = "super_admin" | "admin" | "editor";
export type AdminPrincipal = { email: string; role: AdminRole; id: number | null };

type AdminAccountRow = RowDataPacket & {
  id: number;
  email: string;
  role: "admin" | "editor";
  is_active: number;
  session_version: number;
  password_hash?: string;
};

function getAdminConfig(): AdminConfig {
  const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET } = process.env;
  if (!ADMIN_EMAIL || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ADMIN_EMAIL) || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be configured with valid values.");
  }
  if (Buffer.byteLength(ADMIN_PASSWORD, "utf8") < 16) {
    throw new Error("The admin password must be at least 16 bytes.");
  }
  if (ADMIN_SESSION_SECRET && Buffer.byteLength(ADMIN_SESSION_SECRET, "utf8") < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be at least 32 bytes when configured.");
  }
  const secret = ADMIN_SESSION_SECRET
    || createHmac("sha256", ADMIN_PASSWORD).update("visit-cambodia-admin-session").digest("hex");
  return { email: ADMIN_EMAIL.trim().toLowerCase(), password: ADMIN_PASSWORD, secret };
}

function secureEqual(left: string, right: string): boolean {
  const leftDigest = createHmac("sha256", "visit-cambodia-admin-compare").update(left).digest();
  const rightDigest = createHmac("sha256", "visit-cambodia-admin-compare").update(right).digest();
  return timingSafeEqual(leftDigest, rightDigest);
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function derivePassword(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, SCRYPT_KEY_LENGTH, { N: 16384, r: 8, p: 1 }, (error, key) => {
      if (error) reject(error);
      else resolve(key);
    });
  });
}

export async function hashAdminPassword(password: string): Promise<string> {
  if (Buffer.byteLength(password, "utf8") < 16 || Buffer.byteLength(password, "utf8") > 1024) {
    throw new Error("Admin passwords must be between 16 and 1024 bytes.");
  }
  const salt = randomBytes(16);
  const hash = await derivePassword(password, salt);
  return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export async function validateAdminCredentials(email: string, password: string): Promise<boolean> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!password || password.length > 1024) return false;
  try {
    const config = getAdminConfig();
    if (secureEqual(normalizedEmail, config.email) && secureEqual(password, config.password)) return true;
  } catch {
    if (!db) throw new Error("The administrator account is not configured.");
  }
  if (!db) return false;
  const [rows] = await db.query<AdminAccountRow[]>(
    "SELECT id, email, admin_role AS role, password_hash, is_active, session_version FROM admin_accounts WHERE email = ? LIMIT 1",
    [normalizedEmail],
  );
  const account = rows[0];
  if (!account || !account.is_active || !account.password_hash) return false;
  const [saltHex, hashHex, extra] = account.password_hash.split(":");
  if (extra !== undefined || !/^[0-9a-f]{32}$/i.test(saltHex ?? "") || !/^[0-9a-f]{128}$/i.test(hashHex ?? "")) {
    console.error(`The password hash for admin account ${account.id} is invalid.`);
    return false;
  }
  const actual = await derivePassword(password, Buffer.from(saltHex, "hex"));
  return timingSafeEqual(actual, Buffer.from(hashHex, "hex"));
}

export function getAdminEmail(): string {
  return getAdminConfig().email;
}

export async function createAdminSession(email = getAdminEmail()): Promise<void> {
  const config = getAdminConfig();
  const normalizedEmail = email.trim().toLowerCase();
  let sessionVersion = 0;
  if (!secureEqual(normalizedEmail, config.email)) {
    if (!db) throw new Error("The MySQL database is not configured for this administrator account.");
    const [rows] = await db.query<AdminAccountRow[]>(
      "SELECT id, email, admin_role AS role, is_active, session_version FROM admin_accounts WHERE email = ? LIMIT 1",
      [normalizedEmail],
    );
    if (!rows[0] || !rows[0].is_active) throw new Error("This administrator account is not active.");
    sessionVersion = Number(rows[0].session_version);
  }
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_LIFETIME_SECONDS;
  const payload = `${expiresAt}.${randomBytes(24).toString("base64url")}.${Buffer.from(normalizedEmail).toString("base64url")}.${sessionVersion}`;
  const token = `${payload}.${sign(payload, config.secret)}`;
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_LIFETIME_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function getAdminPrincipal(): Promise<AdminPrincipal | null> {
  let config: AdminConfig;
  try {
    config = getAdminConfig();
  } catch (error) {
    if (!db) throw error;
    config = {
      email: "",
      password: "",
      secret: process.env.ADMIN_SESSION_SECRET || "",
    };
    if (!config.secret && process.env.ADMIN_PASSWORD) {
      config.secret = createHmac("sha256", process.env.ADMIN_PASSWORD).update("visit-cambodia-admin-session").digest("hex");
    }
    if (!config.secret) throw error;
  }
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const [expiresAt, nonce, encodedEmail, sessionVersion, suppliedSignature, ...extra] = token.split(".");
  if (!expiresAt || !nonce || !encodedEmail || !sessionVersion || !suppliedSignature || extra.length > 0
    || !/^\d+$/.test(expiresAt) || !/^\d+$/.test(sessionVersion)) return null;
  if (Number(expiresAt) <= Math.floor(Date.now() / 1000) || !/^[A-Za-z0-9_-]{32}$/.test(nonce)) return null;

  const payload = `${expiresAt}.${nonce}.${encodedEmail}.${sessionVersion}`;
  const expectedSignature = sign(payload, config.secret);
  if (!secureEqual(suppliedSignature, expectedSignature)) return null;
  const email = Buffer.from(encodedEmail, "base64url").toString("utf8");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;

  if (config.email && secureEqual(email, config.email)) {
    return sessionVersion === "0" ? { id: null, email: config.email, role: "super_admin" } : null;
  }
  if (!db) return null;
  const [rows] = await db.query<AdminAccountRow[]>(
    "SELECT id, email, admin_role AS role, is_active, session_version FROM admin_accounts WHERE email = ? LIMIT 1",
    [email],
  );
  const account = rows[0];
  if (!account || !account.is_active || Number(account.session_version) !== Number(sessionVersion)) return null;
  return { id: Number(account.id), email: account.email, role: account.role };
}

export async function isAdminAuthenticated(): Promise<boolean> {
  return (await getAdminPrincipal()) !== null;
}

export function isSameOriginRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost?.split(",")[0]?.trim() || request.headers.get("host");
  if (!origin || !host) return false;

  try {
    const parsedOrigin = new URL(origin);
    return (parsedOrigin.protocol === "http:" || parsedOrigin.protocol === "https:")
      && parsedOrigin.host.toLowerCase() === host.toLowerCase();
  } catch {
    return false;
  }
}

export function isAdminConfigured(): boolean {
  try {
    getAdminConfig();
    return true;
  } catch {
    return false;
  }
}
