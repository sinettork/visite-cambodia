import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { getAdminEmail, hashAdminPassword } from "@/lib/admin/auth";
import { adminApiAuthorizationError } from "@/lib/admin/api-auth";
import { getAdminPrincipal, isSameOriginRequest } from "@/lib/admin/auth";
import { db } from "@/lib/db/mysql";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type AdminAccount = RowDataPacket & {
  id: number;
  email: string;
  display_name: string;
  role: "admin" | "editor";
  is_active: number;
  created_by: string;
  created_at: string;
  updated_at: string;
};

type AdminSecurityEvent = RowDataPacket & {
  id: number;
  admin_username: string;
  action: string;
  target_email: string;
  created_at: string;
};

function validEmail(email: string): boolean {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function GET() {
  const authError = await adminApiAuthorizationError(["super_admin"]);
  if (authError) return authError;
  if (!db) return NextResponse.json({ error: "The MySQL database is not configured." }, { status: 503 });
  try {
    const [[accounts], [securityActivity]] = await Promise.all([
      db.query<AdminAccount[]>(
        `SELECT id, email, display_name, admin_role AS role, is_active, created_by, created_at, updated_at
        FROM admin_accounts ORDER BY created_at DESC, id DESC`,
      ),
      db.query<AdminSecurityEvent[]>(
        `SELECT id, admin_username, action, target_email, created_at
        FROM admin_security_log ORDER BY created_at DESC, id DESC LIMIT 30`,
      ),
    ]);
    return NextResponse.json({ accounts, securityActivity }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    console.error("Unable to load admin accounts.", error);
    return NextResponse.json({ error: "Admin accounts could not be loaded. Check that migration 012 has been applied." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const authError = await adminApiAuthorizationError(["super_admin"]);
  if (authError) return authError;
  if (!db) return NextResponse.json({ error: "The MySQL database is not configured." }, { status: 503 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid administrator account." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("email" in body) || !("displayName" in body)
    || !("password" in body) || !("role" in body)
    || typeof body.email !== "string" || !validEmail(body.email)
    || typeof body.displayName !== "string" || !body.displayName.trim() || body.displayName.trim().length > 120
    || typeof body.password !== "string" || Buffer.byteLength(body.password, "utf8") < 16
    || Buffer.byteLength(body.password, "utf8") > 1024
    || (body.role !== "admin" && body.role !== "editor")) {
    return NextResponse.json({ error: "Enter a valid name, email, role, and password of at least 16 bytes." }, { status: 400 });
  }
  const principal = await getAdminPrincipal();
  if (!principal) return NextResponse.json({ error: "Sign in to manage administrator accounts." }, { status: 401 });
  if (body.email.trim().toLowerCase() === getAdminEmail()) {
    return NextResponse.json({ error: "The bootstrap super-admin already uses this email address." }, { status: 409 });
  }

  try {
    const passwordHash = await hashAdminPassword(body.password);
    const email = body.email.trim().toLowerCase();
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const [result] = await connection.execute(
        `INSERT INTO admin_accounts (email, display_name, password_hash, admin_role, created_by)
        VALUES (?, ?, ?, ?, ?)`,
        [email, body.displayName.trim(), passwordHash, body.role, principal.email],
      );
      const insertId = Number((result as { insertId: number }).insertId);
      await connection.execute(
        "INSERT INTO admin_security_log (admin_username, action, target_email) VALUES (?, 'account_created', ?)",
        [principal.email, email],
      );
      await connection.commit();
      return NextResponse.json({
        account: {
          id: insertId,
          email,
          display_name: body.displayName.trim(),
          role: body.role,
          is_active: 1,
          created_by: principal.email,
        },
      }, { status: 201 });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "An administrator account with this email already exists." }, { status: 409 });
    }
    console.error("Unable to create an admin account.", error);
    return NextResponse.json({ error: "The administrator account could not be created." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const authError = await adminApiAuthorizationError(["super_admin"]);
  if (authError) return authError;
  if (!db) return NextResponse.json({ error: "The MySQL database is not configured." }, { status: 503 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid administrator account update." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || !("id" in body) || typeof body.id !== "number"
    || !Number.isSafeInteger(body.id) || body.id < 1) {
    return NextResponse.json({ error: "Select a valid administrator account." }, { status: 400 });
  }
  const update = body as Record<string, unknown>;
  const changes: string[] = [];
  const values: (string | number)[] = [];
  if (update.role !== undefined) {
    if (update.role !== "admin" && update.role !== "editor") {
      return NextResponse.json({ error: "Choose a valid administrator role." }, { status: 400 });
    }
    changes.push("admin_role = ?");
    values.push(update.role);
  }
  if (update.is_active !== undefined) {
    if (typeof update.is_active !== "boolean") {
      return NextResponse.json({ error: "Account status must be active or disabled." }, { status: 400 });
    }
    changes.push("is_active = ?");
    values.push(update.is_active ? 1 : 0);
  }
  let passwordHash: string | undefined;
  if (update.password !== undefined) {
    if (typeof update.password !== "string" || Buffer.byteLength(update.password, "utf8") < 16
      || Buffer.byteLength(update.password, "utf8") > 1024) {
      return NextResponse.json({ error: "A new password must be between 16 and 1024 bytes." }, { status: 400 });
    }
    passwordHash = await hashAdminPassword(update.password);
    changes.push("password_hash = ?");
    values.push(passwordHash);
  }
  if (!changes.length) return NextResponse.json({ error: "Choose at least one account update." }, { status: 400 });
  changes.push("session_version = session_version + 1");

  const principal = await getAdminPrincipal();
  if (!principal) return NextResponse.json({ error: "Sign in to manage administrator accounts." }, { status: 401 });
  const targetId = Number(update.id);
  if (targetId === principal.id && update.is_active === false) {
    return NextResponse.json({ error: "You cannot disable your own account." }, { status: 400 });
  }

  try {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      const [targets] = await connection.query<(RowDataPacket & { email: string })[]>(
        "SELECT email FROM admin_accounts WHERE id = ? FOR UPDATE",
        [targetId],
      );
      if (!targets[0]) {
        await connection.rollback();
        return NextResponse.json({ error: "The selected account no longer exists." }, { status: 404 });
      }
      const targetEmail = targets[0].email;
      values.push(targetId);
      await connection.execute(
        `UPDATE admin_accounts SET ${changes.join(", ")} WHERE id = ?`,
        values,
      );
      const action = passwordHash ? "password_reset" : "account_updated";
      await connection.execute(
        "INSERT INTO admin_security_log (admin_username, action, target_email) VALUES (?, ?, ?)",
        [principal.email, action, targetEmail],
      );
      await connection.commit();
      return NextResponse.json({ ok: true });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Unable to update an admin account.", error);
    return NextResponse.json({ error: "The administrator account could not be updated." }, { status: 503 });
  }
}
