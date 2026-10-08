"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdminActivityEntry } from "@/lib/types/admin";

type DashboardData = {
  stats: {
    places: number;
    published: number;
    drafts: number;
    paused: number;
    businesses: number;
    provinces: number;
  };
  businessesByType: { type: string; count: number }[];
  recentActivity: AdminActivityEntry[];
};

const businessLabels: Record<string, string> = {
  hotel: "Hotels",
  guest_house: "Guest houses",
  restaurant: "Restaurants",
  cafe: "Cafes",
  other: "Other businesses",
};

function formatActivityDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

export default function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    fetch("/api/admin/dashboard", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as DashboardData & { error?: string };
        if (response.status === 401) { router.replace("/admin/login"); return; }
        if (!response.ok) throw new Error(result.error ?? "Unable to load the dashboard.");
        if (active) setData(result);
      })
      .catch((loadError: unknown) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load the dashboard.");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [router, attempt]);

  return (
    <div className="admin-page admin-overview">
      <header className="admin-page-heading">
        <h1>Dashboard</h1>
        <Link className="admin-btn admin-btn-primary" href="/admin/places/new">
          <i className="fa-solid fa-plus" aria-hidden="true" />
          <span>Add place</span>
        </Link>
      </header>

      {error && (
        <div className="admin-alert admin-dashboard-error" role="alert">
          <span>{error}</span>
          <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setAttempt((v) => v + 1)} disabled={loading}>
            <i className={`fa-solid ${loading ? "fa-spinner fa-spin" : "fa-rotate-right"}`} aria-hidden="true" />
            {loading ? "Retrying…" : "Retry"}
          </button>
        </div>
      )}

      {!data && loading && <p className="admin-loading" role="status">Loading…</p>}

      {data && (
        <>
          {/* Stat cards */}
          <section className="admin-stat-grid" aria-label="Content summary">
            <Link className="admin-stat-card" href="/admin/places" aria-label={`${data.stats.places} total places`}>
              <span>Total places</span>
              <strong>{data.stats.places}</strong>
              <small>All listings</small>
            </Link>
            <Link className="admin-stat-card" href="/admin/places?status=published" aria-label={`${data.stats.published} published`}>
              <span>Published</span>
              <strong>{data.stats.published}</strong>
              <small>Live on website</small>
            </Link>
            <Link className="admin-stat-card" href="/admin/places?status=draft" aria-label={`${data.stats.drafts} drafts`}>
              <span>Drafts</span>
              <strong>{data.stats.drafts}</strong>
              <small>Pending review</small>
            </Link>
            <Link className="admin-stat-card" href="/admin/provinces" aria-label={`${data.stats.provinces} provinces`}>
              <span>Provinces</span>
              <strong>{data.stats.provinces}</strong>
              <small>Regional guides</small>
            </Link>
          </section>

          {/* Draft workflow alert */}
          {data.stats.drafts > 0 && (
            <section className="admin-overview-workflow has-drafts" aria-live="polite">
              <span className="admin-workflow-icon" aria-hidden="true">
                <i className="fa-solid fa-clipboard-check" />
              </span>
              <div>
                <strong>{data.stats.drafts} draft{data.stats.drafts === 1 ? "" : "s"} ready for review</strong>
                <p>Check names, descriptions, and source links before publishing.</p>
              </div>
              <Link className="admin-btn admin-btn-secondary" href="/admin/places?status=draft">
                Review drafts <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
            </section>
          )}

          {/* Content panels */}
          <div className="admin-overview-grid">
            <section className="admin-panel">
              <div className="admin-section-heading">
                <h2>Business listings</h2>
                <Link href="/admin/places">Manage <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
              </div>
              {data.businessesByType.length ? (
                <ul className="admin-type-list">
                  {data.businessesByType.map(({ type, count }) => (
                    <li key={type}><span>{businessLabels[type] ?? type}</span><strong>{count}</strong></li>
                  ))}
                </ul>
              ) : <p className="admin-empty-state">No business listings yet.</p>}
            </section>

            <section className="admin-panel">
              <div className="admin-section-heading">
                <h2>Recent activity</h2>
                <Link href="/admin/activity">View all <i className="fa-solid fa-arrow-right" aria-hidden="true" /></Link>
              </div>
              {data.recentActivity.length ? (
                <ol className="admin-recent-activity">
                  {data.recentActivity.map((entry) => (
                    <li key={entry.id}>
                      <Link href={entry.entity_type === "place" ? `/admin/places/${encodeURIComponent(entry.entity_slug)}/edit` : `/admin/provinces?slug=${encodeURIComponent(entry.entity_slug)}`}>
                        {entry.entity_slug}
                        <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                      </Link>
                      <span>{entry.entity_type === "place" ? "Place" : "Province"} · {entry.changed_fields.length} field{entry.changed_fields.length !== 1 ? "s" : ""} · {entry.admin_username}</span>
                      <time dateTime={entry.created_at}>{formatActivityDate(entry.created_at)}</time>
                    </li>
                  ))}
                </ol>
              ) : <p className="admin-empty-state">No recent changes.</p>}
            </section>
          </div>
        </>
      )}
    </div>
  );
}
