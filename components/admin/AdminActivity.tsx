"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdminActivityEntry } from "@/lib/types/admin";

type ActivityResponse = {
  items: AdminActivityEntry[];
  total: number;
  page: number;
  pageSize: number;
};

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function truncateFields(fields: string[]): string {
  if (!fields.length) return "—";
  if (fields.length <= 3) return fields.join(", ");
  return `${fields.slice(0, 3).join(", ")} +${fields.length - 3} more`;
}

export default function AdminActivity() {
  const router = useRouter();
  const [data, setData] = useState<ActivityResponse | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setError("");
    fetch(`/api/admin/activity?page=${page}`, { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as ActivityResponse & { error?: string };
        if (response.status === 401) { router.replace("/admin/login"); return; }
        if (!response.ok) throw new Error(result.error ?? "Unable to load the activity log.");
        if (active) setData(result);
      })
      .catch((loadError: unknown) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load the activity log.");
      });
    return () => { active = false; };
  }, [page, router]);

  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div>
          <h1>Activity log</h1>
          {data && <p className="admin-page-count">{data.total} {data.total === 1 ? "change" : "changes"} recorded</p>}
        </div>
      </header>

      {error && <p className="admin-alert" role="alert">{error}</p>}
      {!data && !error && <p className="admin-loading" role="status">Loading activity…</p>}

      {data && (
        <>
          {data.items.length ? (
            <div className="admin-table-wrap">
              <table className="admin-data-table">
                <thead>
                  <tr>
                    <th className="col-primary">Record</th>
                    <th>Type</th>
                    <th>Fields changed</th>
                    <th>By</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.items.map((entry) => (
                    <tr key={entry.id}>
                      <td>
                        <Link
                          className="admin-activity-link"
                          href={entry.entity_type === "place"
                            ? `/admin/places/${encodeURIComponent(entry.entity_slug)}/edit`
                            : `/admin/provinces?slug=${encodeURIComponent(entry.entity_slug)}`}
                        >
                          {entry.entity_slug}
                          <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                        </Link>
                      </td>
                      <td>
                        <span className={`admin-status-dot is-${entry.entity_type === "place" ? "published" : "paused"}`} aria-hidden="true" />
                        {entry.entity_type === "place" ? "Place" : "Province"}
                      </td>
                      <td className="admin-td-fields" title={entry.changed_fields.join(", ")}>
                        {truncateFields(entry.changed_fields)}
                      </td>
                      <td>{entry.admin_username}</td>
                      <td><time dateTime={entry.created_at}>{formatDate(entry.created_at)}</time></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="admin-empty-state">No content changes have been recorded.</p>}

          {totalPages > 1 && (
            <nav className="admin-pagination" aria-label="Activity pages">
              <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setPage((v) => v - 1)} disabled={page <= 1}>
                <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Previous
              </button>
              <span className="admin-pagination-info">Page {data.page} of {totalPages}</span>
              <button type="button" className="admin-btn admin-btn-ghost" onClick={() => setPage((v) => v + 1)} disabled={page >= totalPages}>
                Next <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}
