"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdminCatalog } from "@/lib/admin/content";

const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
  { value: "paused", label: "Paused" },
];

export default function AdminPlacesList({ role = "editor", initialStatus = "all" }: {
  role?: "super_admin" | "admin" | "editor";
  initialStatus?: string;
}) {
  const router = useRouter();
  const [catalog, setCatalog] = useState<AdminCatalog | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recordSearch, setRecordSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/content", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as AdminCatalog & { error?: string };
        if (response.status === 401) { router.replace("/admin/login"); return; }
        if (!response.ok) throw new Error(result.error ?? "Unable to load content.");
        if (active) setCatalog(result);
      })
      .catch((err: unknown) => { if (active) setError(err instanceof Error ? err.message : "Unable to load content."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [router]);

  const normalizedSearch = recordSearch.trim().toLocaleLowerCase();

  const filteredPlaces = useMemo(() => (catalog?.places ?? []).filter((place) => {
    const matchesSearch = !normalizedSearch
      || `${place.name_en} ${place.name_km} ${place.province_en} ${place.business_type ?? ""}`.toLocaleLowerCase().includes(normalizedSearch);
    const placeType = place.business_type === "hotel" || place.business_type === "guest_house"
      ? "accommodation"
      : place.business_type === "restaurant" || place.business_type === "cafe"
        ? "restaurant"
        : place.listing_type;
    return matchesSearch
      && (statusFilter === "all" || place.publication_status === statusFilter)
      && (provinceFilter === "all" || place.province_slug === provinceFilter)
      && (typeFilter === "all" || placeType === typeFilter);
  }), [catalog, normalizedSearch, statusFilter, provinceFilter, typeFilter]);

  function togglePlace(slug: string) {
    setSelectedPlaces((current) => {
      if (current.includes(slug)) return current.filter((s) => s !== slug);
      if (current.length >= 100) { setError("Bulk actions are limited to 100 places at a time."); return current; }
      return [...current, slug];
    });
  }

  async function updateSelectedPlaces(status: "draft" | "paused") {
    if (!selectedPlaces.length || role === "editor") return;
    const label = status === "draft" ? "move these places back to draft" : "pause these places";
    if (!window.confirm(`Are you sure you want to ${label}?`)) return;
    setPending(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/content/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: selectedPlaces, status }),
      });
      const result = await response.json() as { error?: string; updated?: number };
      if (!response.ok) throw new Error(result.error ?? "Unable to update places.");
      const catalogResponse = await fetch("/api/admin/content", { cache: "no-store" });
      const updatedCatalog = await catalogResponse.json() as AdminCatalog & { error?: string };
      if (!catalogResponse.ok) throw new Error(updatedCatalog.error ?? "Updated but list could not refresh.");
      setCatalog(updatedCatalog);
      setSelectedPlaces([]);
      setNotice(`${result.updated ?? 0} place${result.updated === 1 ? "" : "s"} ${status === "draft" ? "moved to draft" : "paused"}.`);
      router.refresh();
    } catch (bulkError) {
      setError(bulkError instanceof Error ? bulkError.message : "Unable to update places.");
    } finally {
      setPending(false);
    }
  }

  const totalCount = catalog?.places.length ?? 0;
  const hasFilters = provinceFilter !== "all" || typeFilter !== "all" || recordSearch.trim() !== "";

  return (
    <div className="admin-page">
      {/* Page heading */}
      <header className="admin-page-heading">
        <div>
          <h1>Places</h1>
        </div>
        <Link className="admin-btn admin-btn-primary" href="/admin/places/new">
          <i className="fa-solid fa-plus" aria-hidden="true" />
          <span>Add place</span>
        </Link>
      </header>

      {/* Status segment tabs — exactly like reference */}
      <div className="admin-tab-bar">
        <div className="admin-tab-group" role="tablist" aria-label="Filter by status">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={statusFilter === tab.value}
              className={`admin-tab${statusFilter === tab.value ? " is-active" : ""}`}
              onClick={() => setStatusFilter(tab.value)}
            >
              {tab.label}
              {tab.value !== "all" && catalog && (
                <span className="admin-tab-count">
                  {catalog.places.filter((p) => p.publication_status === tab.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Toolbar: search + Filters button */}
      <div className="admin-filter-bar">
        <div className="admin-search-wrap">
          <i className="fa-solid fa-magnifying-glass admin-search-icon" aria-hidden="true" />
          <input
            type="search"
            className="admin-search-input"
            value={recordSearch}
            onChange={(e) => setRecordSearch(e.target.value)}
            placeholder={`Search ${totalCount} places…`}
            aria-label="Search places"
          />
        </div>
        <button
          type="button"
          className={`admin-filters-btn${showFilters ? " is-active" : ""}${hasFilters ? " has-filter" : ""}`}
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
        >
          <i className="fa-solid fa-sliders" aria-hidden="true" />
          Filters
          {hasFilters && <span className="admin-filter-dot" aria-hidden="true" />}
        </button>
        {!loading && (
          <span className="admin-record-count">
            {filteredPlaces.length}{filteredPlaces.length !== totalCount ? ` of ${totalCount}` : ""} records
          </span>
        )}
      </div>

      {/* Collapsible filter panel */}
      {showFilters && (
        <div className="admin-filter-panel">
          {catalog && catalog.provinces.length > 0 && (
            <label className="admin-filter-item">
              <span>Province</span>
              <select
                className="admin-select"
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                aria-label="Filter by province"
              >
                <option value="all">All provinces</option>
                {catalog.provinces.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.name_en}</option>
                ))}
              </select>
            </label>
          )}
          <label className="admin-filter-item">
            <span>Type</span>
            <select
              className="admin-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              aria-label="Filter by type"
            >
              <option value="all">All types</option>
              <option value="attraction">Attraction</option>
              <option value="accommodation">Accommodation</option>
              <option value="restaurant">Restaurant / food</option>
              <option value="hotel">Hotel</option>
              <option value="guest_house">Guest house</option>
              <option value="cafe">Cafe</option>
            </select>
          </label>
          {hasFilters && (
            <button
              type="button"
              className="admin-clear-filters"
              onClick={() => { setProvinceFilter("all"); setTypeFilter("all"); setRecordSearch(""); }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Bulk action bar */}
      {role !== "editor" && selectedPlaces.length > 0 && (
        <div className="admin-bulk-bar" role="group" aria-label="Bulk place actions">
          <span className="admin-bulk-count">{selectedPlaces.length} selected</span>
          <button type="button" className="admin-btn admin-btn-ghost" disabled={pending} onClick={() => void updateSelectedPlaces("draft")}>
            Move to draft
          </button>
          <button type="button" className="admin-btn admin-btn-ghost" disabled={pending} onClick={() => void updateSelectedPlaces("paused")}>
            Pause listings
          </button>
          <button type="button" className="admin-bulk-clear" onClick={() => setSelectedPlaces([])}>Clear</button>
        </div>
      )}

      {/* Alerts */}
      {error && <p className="admin-alert" role="alert">{error}</p>}
      {notice && <p className="admin-success" role="status">{notice}</p>}

      {/* Table */}
      {loading && <p className="admin-loading" role="status">Loading places…</p>}
      {!loading && catalog && (
        filteredPlaces.length ? (
          <div className="admin-table-wrap">
            <table className="admin-data-table">
              <thead>
                <tr>
                  {role !== "editor" && (
                    <th className="admin-th-check">
                      <input
                        type="checkbox"
                        aria-label="Select all visible places"
                        checked={filteredPlaces.length > 0 && filteredPlaces.every((p) => selectedPlaces.includes(p.slug))}
                        onChange={(e) => {
                          if (!e.target.checked) {
                            setSelectedPlaces((cur) => cur.filter((s) => !filteredPlaces.some((p) => p.slug === s)));
                            return;
                          }
                          const next = [...new Set([...selectedPlaces, ...filteredPlaces.map((p) => p.slug)])];
                          if (next.length > 100) { setError("Bulk actions are limited to 100 at a time."); return; }
                          setError("");
                          setSelectedPlaces(next);
                        }}
                      />
                    </th>
                  )}
                  <th className="col-primary">Place</th>
                  <th className="col-primary">Province</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th className="admin-th-actions"><span className="visually-hidden">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {filteredPlaces.map((place) => (
                  <tr key={place.slug} className={selectedPlaces.includes(place.slug) ? "is-selected" : ""}>
                    {role !== "editor" && (
                      <td className="admin-td-check">
                        <input
                          type="checkbox"
                          checked={selectedPlaces.includes(place.slug)}
                          onChange={() => togglePlace(place.slug)}
                          aria-label={`Select ${place.name_en}`}
                        />
                      </td>
                    )}
                    <td>
                      <span className="admin-place-name">{place.name_en}</span>
                      {place.name_km && <span className="admin-place-name-km">{place.name_km}</span>}
                    </td>
                    <td className="admin-td-province">{place.province_en}</td>
                    <td className="admin-td-type">{place.business_type || place.listing_type}</td>
                    <td>
                      <span className={`admin-status-dot is-${place.publication_status}`} aria-hidden="true" />
                      <span className="admin-status-label">{place.publication_status}</span>
                    </td>
                    <td className="admin-td-actions">
                      <Link
                        href={`/admin/places/${place.slug}/edit`}
                        className="admin-action-btn"
                        aria-label={`Edit ${place.name_en}`}
                        title="Edit"
                      >
                        <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                      </Link>
                      <a
                        href={`/en/places/${place.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="admin-action-btn"
                        aria-label={`View ${place.name_en}`}
                        title="View on site"
                      >
                        <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="admin-empty-state">
            {hasFilters || statusFilter !== "all"
              ? "No places match the current filters."
              : "No places have been added yet."}
          </p>
        )
      )}
    </div>
  );
}
