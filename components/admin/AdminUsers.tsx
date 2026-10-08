"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

type AdminAccount = {
  id: number;
  email: string;
  display_name: string;
  role: "admin" | "editor";
  is_active: number;
  created_by: string;
  created_at: string;
  updated_at: string;
};

type SecurityEvent = {
  id: number;
  admin_username: string;
  action: string;
  target_email: string;
  created_at: string;
};

export default function AdminUsers() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [securityActivity, setSecurityActivity] = useState<SecurityEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadAccounts = useCallback(async () => {
    const response = await fetch("/api/admin/users", { cache: "no-store" });
    const result = await response.json() as { accounts?: AdminAccount[]; securityActivity?: SecurityEvent[]; error?: string };
    if (response.status === 401) {
      router.replace("/admin/login");
      return;
    }
    if (!response.ok) throw new Error(result.error ?? "Unable to load administrator accounts.");
    setAccounts(result.accounts ?? []);
    setSecurityActivity(result.securityActivity ?? []);
  }, [router]);

  useEffect(() => {
    let active = true;
    loadAccounts()
      .catch((loadError: unknown) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load administrator accounts.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [loadAccounts]);

  async function updateAccount(id: number, values: Record<string, string | boolean>) {
    setPending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...values }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Unable to update administrator account.");
      await loadAccounts();
      setNotice("Administrator account updated.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update administrator account.");
    } finally {
      setPending(false);
    }
  }

  async function createAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setPending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: form.get("displayName"),
          email: form.get("email"),
          password: form.get("password"),
          role: form.get("role"),
        }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "Unable to create administrator account.");
      formElement.reset();
      await loadAccounts();
      setNotice("Administrator account created.");
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Unable to create administrator account.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div><h1>Administrators</h1><p>Manage named team accounts and their content permissions.</p></div>
      </header>
      {error && <p className="admin-alert" role="alert">{error}</p>}
      {notice && <p className="admin-success" role="status">{notice}</p>}
      <div className="admin-settings-grid">
        <section className="admin-panel admin-settings-wide">
          <h2>Team accounts</h2>
          <p>The environment-configured bootstrap super-admin is not listed here and cannot be disabled in this screen.</p>
          {loading ? <p className="admin-loading">Loading administrator accounts…</p> : accounts.length ? (
            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead><tr><th>Administrator</th><th>Role</th><th>Status</th><th>Created</th><th>Actions</th></tr></thead>
                <tbody>
                  {accounts.map((account) => (
                    <tr key={account.id}>
                      <td><strong>{account.display_name}</strong><small>{account.email}</small></td>
                      <td>
                        <select
                          aria-label={`Role for ${account.email}`}
                          value={account.role}
                          disabled={pending}
                          onChange={(event) => void updateAccount(account.id, { role: event.target.value })}
                        >
                          <option value="editor">Editor</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td><span className={`admin-publication-chip is-${account.is_active ? "published" : "paused"}`}>{account.is_active ? "Active" : "Disabled"}</span></td>
                      <td><time dateTime={account.created_at}>{new Date(account.created_at).toLocaleDateString()}</time><small>By {account.created_by}</small></td>
                      <td className="admin-user-actions">
                        <button
                          className="admin-row-action"
                          type="button"
                          disabled={pending}
                          onClick={() => void updateAccount(account.id, { is_active: !account.is_active })}
                        >
                          {account.is_active ? "Disable" : "Enable"}
                        </button>
                        <form
                          className="admin-password-reset"
                          onSubmit={(event) => {
                            event.preventDefault();
                            const form = new FormData(event.currentTarget);
                            const password = form.get("password");
                            if (typeof password !== "string" || !password) return;
                            void updateAccount(account.id, { password });
                            event.currentTarget.reset();
                          }}
                        >
                          <input name="password" type="password" aria-label={`New password for ${account.email}`} minLength={16} maxLength={1024} placeholder="New password (16+)" required />
                          <button className="admin-row-action" type="submit" disabled={pending}>Reset</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="admin-empty-state">No team accounts yet. The bootstrap super-admin remains available through environment credentials.</p>}
        </section>
        <section className="admin-panel">
          <h2>Add administrator</h2>
          <p>Choose the least-privileged role required for the work.</p>
          <form className="admin-form" onSubmit={(event) => void createAccount(event)}>
            <label>Display name<input name="displayName" autoComplete="name" required maxLength={120} /></label>
            <label>Email<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
            <label>Temporary password<input name="password" type="password" autoComplete="new-password" required minLength={16} maxLength={1024} /></label>
            <label>Role
              <select name="role" defaultValue="editor">
                <option value="editor">Editor — manage content, cannot publish or manage accounts</option>
                <option value="admin">Admin — content publishing and export</option>
              </select>
            </label>
            <button className="admin-primary-button" type="submit" disabled={pending}>
              <i className="fa-solid fa-user-plus" aria-hidden="true" /> {pending ? "Saving…" : "Create account"}
            </button>
          </form>
        </section>
      </div>
      <section className="admin-panel admin-settings-wide">
        <h2>Account security history</h2>
        {securityActivity.length ? (
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead><tr><th>Action</th><th>Target account</th><th>Changed by</th><th>Date</th></tr></thead>
              <tbody>
                {securityActivity.map((event) => (
                  <tr key={event.id}>
                    <td>{event.action.replace(/_/g, " ")}</td>
                    <td>{event.target_email}</td>
                    <td>{event.admin_username}</td>
                    <td><time dateTime={event.created_at}>{new Date(event.created_at).toLocaleString()}</time></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : <p className="admin-empty-state">No administrator account changes have been recorded.</p>}
      </section>
    </div>
  );
}
