"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type SettingsData = {
  administrator: {
    email: string;
    configured: boolean;
    passwordMinimumBytes: number;
    sessionLifetimeHours: number;
  };
  database: { connected: boolean; connectionLimit: number; healthCheckMilliseconds: number };
  runtime: { nodeVersion: string; supportedNodeVersion: boolean };
  media: {
    directoryConfigured: boolean;
    directoryWritable: boolean;
    directoryLabel: string;
    maxUploadMegabytes: number;
  };
  security: {
    httpsRecommendedInProduction: boolean;
    sameOriginWrites: boolean;
    uploadsValidatedByFileSignature: boolean;
  };
};

function Check({ passed, children }: { passed: boolean; children: string }) {
  return (
    <li className={passed ? "admin-check is-ok" : "admin-check is-warning"}>
      <span aria-hidden="true">
        <i className={`fa-solid ${passed ? "fa-check" : "fa-triangle-exclamation"}`} />
      </span>
      <div><strong>{children}</strong><small>{passed ? "Ready" : "Needs attention"}</small></div>
    </li>
  );
}

export default function AdminSettings({ role }: { role: "super_admin" | "admin" | "editor" }) {
  const router = useRouter();
  const [settings, setSettings] = useState<SettingsData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    fetch("/api/admin/settings", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as SettingsData & { error?: string };
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }
        if (!response.ok) throw new Error(result.error ?? "Unable to check settings.");
        if (active) setSettings(result);
      })
      .catch((loadError: unknown) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "Unable to check settings.");
      });
    return () => { active = false; };
  }, [router]);

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div><h1>Settings</h1></div>
      </header>
      {error && <p className="admin-alert" role="alert">{error}</p>}
      {!settings && !error && <p className="admin-loading">Checking system configuration…</p>}
      {settings && (
        <div className="admin-settings-grid">
          <section className="admin-panel">
            <h2>Administrator</h2>
            <dl className="admin-settings-list">
              <div><dt>Admin email</dt><dd>{settings.administrator.email}</dd></div>
              <div><dt>Password policy</dt><dd>At least {settings.administrator.passwordMinimumBytes} bytes</dd></div>
              <div><dt>Session lifetime</dt><dd>{settings.administrator.sessionLifetimeHours} hours</dd></div>
            </dl>
          </section>
          <section className="admin-panel">
            <h2>System health</h2>
            <ul className="admin-check-list">
              <Check passed={settings.administrator.configured}>Admin authentication configuration</Check>
              <Check passed={settings.runtime.supportedNodeVersion}>{`Node.js ${settings.runtime.nodeVersion} (project runtime)`}</Check>
              <Check passed={settings.database.connected}>{`MySQL connected (${settings.database.healthCheckMilliseconds} ms health check, ${settings.database.connectionLimit} max pooled connections)`}</Check>
              <Check passed={settings.media.directoryWritable}>Media storage is readable and writable</Check>
              <Check passed={settings.security.sameOriginWrites}>Same-origin checks protect admin writes</Check>
              <Check passed={settings.security.uploadsValidatedByFileSignature}>Image uploads validated by file signature</Check>
              <Check passed={settings.security.httpsRecommendedInProduction}>Use HTTPS in production</Check>
            </ul>
          </section>
          <section className="admin-panel admin-settings-wide">
            <h2>Media storage</h2>
            <dl className="admin-settings-list">
              <div><dt>Storage location</dt><dd>{settings.media.directoryLabel}</dd></div>
              <div><dt>Maximum image size</dt><dd>{settings.media.maxUploadMegabytes} MB · JPG, PNG, WebP</dd></div>
              <div><dt>Directory</dt><dd>{settings.media.directoryWritable ? "Accessible" : "Not created or not writable"}</dd></div>
            </dl>
          </section>
          <section className="admin-panel admin-settings-wide">
            <h2>Operations and backups</h2>
            <p>Export content as JSON for transfer or review. This does not include uploaded image files or database configuration.</p>
            {role !== "editor" && (
              <a className="admin-primary-button admin-button-link" href="/api/admin/export">
                <i className="fa-solid fa-download" aria-hidden="true" />
                <span>Download content export</span>
              </a>
            )}
            <p>Production backups should include both the MySQL database and the persistent media directory. Schedule encrypted off-site backups, restrict access, and regularly test restoring them on a separate environment.</p>
          </section>
        </div>
      )}
    </div>
  );
}
