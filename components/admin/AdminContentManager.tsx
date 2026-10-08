"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { AdminCatalog, AdminPlace, AdminProvince } from "@/lib/admin/content";

type EntityKind = "province" | "place";
type EditableFields = Record<string, string>;

const provinceFields = [
  ["name_km", "Province name (Khmer)", "input"],
  ["name_en", "Province name (English)", "input"],
  ["banner_image_url", "Province banner image URL", "image"],
  ["overview_km", "Overview (Khmer)", "textarea"],
  ["overview_en", "Overview (English)", "textarea"],
  ["story_km", "Story (Khmer)", "textarea"],
  ["story_en", "Story (English)", "textarea"],
  ["history_km", "History (Khmer)", "textarea"],
  ["history_en", "History (English)", "textarea"],
  ["culture_km", "Culture (Khmer)", "textarea"],
  ["culture_en", "Culture (English)", "textarea"],
  ["travel_km", "Travel advice (Khmer)", "textarea"],
  ["travel_en", "Travel advice (English)", "textarea"],
  ["attractions_km", "Attractions introduction (Khmer)", "textarea"],
  ["attractions_en", "Attractions introduction (English)", "textarea"],
  ["stay_guide_km", "Accommodation introduction (Khmer)", "textarea"],
  ["stay_guide_en", "Accommodation introduction (English)", "textarea"],
  ["food_guide_km", "Food introduction (Khmer)", "textarea"],
  ["food_guide_en", "Food introduction (English)", "textarea"],
  ["source_urls", "Verified source URLs (one per line)", "textarea"],
] as const;

const placeFields = [
  ["province_slug", "Province", "province"],
  ["listing_type", "Place group", "listing_type"],
  ["business_type", "Business type", "business_type"],
  ["publication_status", "Publishing status", "publication_status"],
  ["category", "Category", "category"],
  ["name_km", "Place name (Khmer)", "input"],
  ["name_en", "Place name (English)", "input"],
  ["summary_km", "Short description (Khmer)", "textarea"],
  ["summary_en", "Short description (English)", "textarea"],
  ["image_url", "Place image URL", "image"],
  ["ticket_usd", "Ticket price in USD", "input"],
  ["ticket_status", "Ticket price status", "ticket_status"],
  ["ticket_provider", "Ticket seller / official provider", "input"],
  ["ticket_url", "Official ticket purchase URL (HTTPS)", "input"],
  ["open_hours", "Opening hours", "input"],
  ["lat", "Latitude", "input"],
  ["lng", "Longitude", "input"],
  ["access_km", "How to get there (Khmer)", "textarea"],
  ["access_en", "How to get there (English)", "textarea"],
  ["source_urls", "Verified source URLs (one per line)", "textarea"],
] as const;

const emptyPlaceFields: EditableFields = {
  province_slug: "",
  listing_type: "accommodation",
  business_type: "hotel",
  publication_status: "draft",
  category: "culture",
  name_km: "",
  name_en: "",
  summary_km: "",
  summary_en: "",
  image_url: "",
  ticket_usd: "",
  ticket_status: "",
  ticket_provider: "",
  ticket_url: "",
  open_hours: "",
  lat: "",
  lng: "",
  access_km: "",
  access_en: "",
  source_urls: "",
};

function provinceValues(province: AdminProvince): EditableFields {
  const values: EditableFields = {};
  for (const [key] of provinceFields) {
    const value = province[key as keyof AdminProvince];
    values[key] = typeof value === "string" ? value : "";
  }
  return values;
}

function placeValues(place: AdminPlace): EditableFields {
  const values: EditableFields = {};
  for (const [key] of placeFields) {
    const value = place[key as keyof AdminPlace];
    values[key] = key === "source_urls" && Array.isArray(value)
      ? value.join("\n")
      : typeof value === "string" ? value : "";
  }
  return values;
}

function provinceLabel(province: AdminProvince): string {
  return `${province.name_en} / ${province.name_km}`;
}

function placeLabel(place: AdminPlace): string {
  return `${place.name_en} / ${place.name_km} — ${place.province_en}`;
}

export default function AdminContentManager({ scope, startNew = false, role = "editor", initialStatus = "all", initialSlug = "" }: {
  scope: "places" | "provinces";
  startNew?: boolean;
  role?: "super_admin" | "admin" | "editor";
  initialStatus?: string;
  initialSlug?: string;
}) {
  const router = useRouter();
  const [catalog, setCatalog] = useState<AdminCatalog | null>(null);
  const [selection, setSelection] = useState("");
  const [fields, setFields] = useState<EditableFields>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recordSearch, setRecordSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [provinceFilter, setProvinceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
  const [openMenuSlug, setOpenMenuSlug] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/content", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as AdminCatalog & { error?: string };
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }
        if (!response.ok) throw new Error(result.error ?? "Unable to load the content catalog.");
        if (active) {
          setCatalog(result);
          if (scope === "places") {
            const firstPlace = (initialStatus === "all"
              ? result.places
              : result.places.filter((place) => place.publication_status === initialStatus))
              .find((place) => !initialSlug || place.slug === initialSlug);
            if (startNew) {
              setSelection("place:new");
              setFields({ ...emptyPlaceFields, province_slug: result.provinces[0]?.slug ?? "" });
            } else if (firstPlace) {
              setSelection(`place:${firstPlace.slug}`);
              setFields(placeValues(firstPlace));
            } else if (result.places.length === 0) {
              setSelection("place:new");
              setFields({ ...emptyPlaceFields, province_slug: result.provinces[0]?.slug ?? "" });
            } else {
              setSelection("");
              setFields({});
            }
          } else {
            const firstProvince = result.provinces.find((province) => !initialSlug || province.slug === initialSlug);
            if (firstProvince) {
              setSelection(`province:${firstProvince.slug}`);
              setFields(provinceValues(firstProvince));
            }
          }
        }
      })
      .catch((loadError: unknown) => {
        if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load content.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [router, scope, startNew, initialStatus, initialSlug]);

  const [kind, slug] = selection.split(":", 2) as [EntityKind | undefined, string | undefined];
  const selectedProvince = useMemo(
    () => kind === "province" ? catalog?.provinces.find((item) => item.slug === slug) : undefined,
    [catalog, kind, slug],
  );
  const selectedPlace = useMemo(
    () => kind === "place" ? catalog?.places.find((item) => item.slug === slug) : undefined,
    [catalog, kind, slug],
  );
  const isNewPlace = kind === "place" && slug === "new";
  const currentFields = scope === "places" ? placeFields : provinceFields;
  const isAttraction = fields.listing_type === "attraction";
  const placeFieldGroups: { title: string; fields: typeof placeFields[number][] }[] = [
    {
      title: "Basic information",
      fields: placeFields.filter(([name]) => [
        "province_slug", "listing_type", "business_type", "publication_status", "category",
        "name_km", "name_en", "summary_km", "summary_en", "image_url",
      ].includes(name)),
    },
    {
      title: isAttraction ? "Visit details" : fields.listing_type === "accommodation" ? "Accommodation details" : "Restaurant details",
      fields: placeFields.filter(([name]) => (
        name === "open_hours"
        || (isAttraction && ["ticket_usd", "ticket_status", "ticket_provider", "ticket_url"].includes(name))
      )),
    },
    {
      title: "Location",
      fields: placeFields.filter(([name]) => ["lat", "lng", "access_km", "access_en"].includes(name)),
    },
    {
      title: "Sources",
      fields: placeFields.filter(([name]) => name === "source_urls"),
    },
  ];
  const normalizedSearch = recordSearch.trim().toLocaleLowerCase();
  const filteredPlaces = useMemo(() => (catalog?.places ?? []).filter((place) => {
    const matchesSearch = !normalizedSearch
      || `${place.name_en} ${place.name_km} ${place.province_en} ${place.business_type ?? ""}`.toLocaleLowerCase().includes(normalizedSearch);
    const placeType = place.business_type || place.listing_type;
    return matchesSearch
      && (statusFilter === "all" || place.publication_status === statusFilter)
      && (provinceFilter === "all" || place.province_slug === provinceFilter)
      && (typeFilter === "all" || placeType === typeFilter);
  }), [catalog, normalizedSearch, statusFilter, provinceFilter, typeFilter]);
  const filteredProvinces = useMemo(() => (catalog?.provinces ?? []).filter((province) => (
    !normalizedSearch || `${province.name_en} ${province.name_km}`.toLocaleLowerCase().includes(normalizedSearch)
  )), [catalog, normalizedSearch]);

  function selectEntity(value: string) {
    setSelection(value);
    setError("");
    setNotice("");
    const [nextKind, nextSlug] = value.split(":", 2);
    if (nextKind === "province") {
      const province = catalog?.provinces.find((item) => item.slug === nextSlug);
      if (province) setFields(provinceValues(province));
    } else if (nextKind === "place" && nextSlug === "new") {
      setFields({ ...emptyPlaceFields, province_slug: catalog?.provinces[0]?.slug ?? "" });
    } else {
      const place = catalog?.places.find((item) => item.slug === nextSlug);
      if (place) setFields(placeValues(place));
    }
  }

  function togglePlace(slug: string) {
    setSelectedPlaces((current) => {
      if (current.includes(slug)) return current.filter((selected) => selected !== slug);
      if (current.length >= 100) {
        setError("Bulk actions are limited to 100 places at a time.");
        return current;
      }
      return [...current, slug];
    });
  }

  async function updateSelectedPlaces(status: "draft" | "paused") {
    if (!selectedPlaces.length || role === "editor") return;
    const label = status === "draft" ? "move these places back to draft" : "pause these places";
    if (!window.confirm(`Are you sure you want to ${label}? They will no longer be visible on public pages.`)) return;
    setPending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/content/bulk", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slugs: selectedPlaces, status }),
      });
      const result = await response.json() as { error?: string; updated?: number };
      if (!response.ok) throw new Error(result.error ?? "Unable to update the selected places.");
      const catalogResponse = await fetch("/api/admin/content", { cache: "no-store" });
      const updatedCatalog = await catalogResponse.json() as AdminCatalog & { error?: string };
      if (!catalogResponse.ok) throw new Error(updatedCatalog.error ?? "Places updated but the list could not be refreshed.");
      setCatalog(updatedCatalog);
      setSelectedPlaces([]);
      setNotice(`${result.updated ?? 0} place${result.updated === 1 ? "" : "s"} ${status === "draft" ? "moved to draft" : "paused"}.`);
      router.refresh();
    } catch (bulkError) {
      setError(bulkError instanceof Error ? bulkError.message : "Unable to update the selected places.");
    } finally {
      setPending(false);
    }
  }

  function updateField(name: string, value: string) {
    setFields((current) => {
      const next = { ...current, [name]: value };
      if (name === "business_type") {
        if (value === "hotel" || value === "guest_house") {
          next.listing_type = "accommodation";
          next.category = "culture";
        } else if (value === "restaurant" || value === "cafe") {
          next.listing_type = "restaurant";
          next.category = "food";
        }
      } else if (name === "listing_type") {
        const compatible = value === "accommodation"
          ? ["hotel", "guest_house", "other"]
          : value === "restaurant"
            ? ["restaurant", "cafe", "other"]
            : [];
        if (next.business_type && !compatible.includes(next.business_type)) next.business_type = "";
      }
      return next;
    });
    setNotice("");
  }

  function renderField([name, label, type]: readonly [string, string, string]) {
    return (
      <label className={type === "textarea" ? "admin-field admin-field-wide" : "admin-field"} key={name}>
        {label}
        {type === "textarea" ? (
          <textarea value={fields[name] ?? ""} onChange={(event) => updateField(name, event.target.value)} rows={4} maxLength={20000} />
        ) : type === "province" ? (
          <select value={fields[name] ?? ""} onChange={(event) => updateField(name, event.target.value)}>
            {catalog?.provinces.map((province) => <option key={province.slug} value={province.slug}>{provinceLabel(province)}</option>)}
          </select>
        ) : type === "listing_type" ? (
          <select value={fields[name] ?? ""} onChange={(event) => updateField(name, event.target.value)}>
            <option value="attraction">Attraction</option>
            <option value="accommodation">Accommodation</option>
            <option value="restaurant">Restaurant / food</option>
          </select>
        ) : type === "business_type" ? (
          <select value={fields[name] ?? ""} onChange={(event) => updateField(name, event.target.value)}>
            <option value="">Not a business / attraction</option>
            <option value="hotel">Hotel</option>
            <option value="guest_house">Guest house</option>
            <option value="restaurant">Restaurant</option>
            <option value="cafe">Cafe</option>
            <option value="other">Other business</option>
          </select>
        ) : type === "publication_status" ? (
          <select value={fields[name] ?? "draft"} onChange={(event) => updateField(name, event.target.value)} disabled={isNewPlace || role === "editor"}>
            <option value="draft">Draft — hidden</option>
            <option value="published">Published — visible</option>
            <option value="paused">Paused — hidden</option>
          </select>
        ) : type === "category" ? (
          <select value={fields[name] ?? ""} onChange={(event) => updateField(name, event.target.value)}>
            <option value="history">History</option>
            <option value="nature">Nature</option>
            <option value="beach">Beach</option>
            <option value="adventure">Adventure</option>
            <option value="culture">Culture</option>
            <option value="food">Food</option>
          </select>
        ) : type === "ticket_status" ? (
          <select value={fields[name] ?? ""} onChange={(event) => updateField(name, event.target.value)}>
            <option value="">Not specified</option>
            <option value="check">Price needs verification</option>
            <option value="unknown">Price unknown</option>
            <option value="free">Free</option>
          </select>
        ) : (
          <input
            type="text"
            inputMode={name === "lat" || name === "lng" ? "decimal" : undefined}
            value={fields[name] ?? ""}
            onChange={(event) => updateField(name, event.target.value)}
            maxLength={name.includes("image_url") || name === "ticket_url" ? 500 : name === "lat" || name === "lng" ? 16 : 2000}
          />
        )}
        {type === "image" && (
          <>
            <span className="admin-upload-row">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) => void uploadImage(name, event.target.files?.[0])}
                disabled={pending}
                aria-label={`Upload ${label.toLowerCase()}`}
              />
            </span>
            {fields[name] && <img className="admin-image-preview" src={fields[name]} alt={`${label} preview`} />}
          </>
        )}
      </label>
    );
  }

  async function uploadImage(field: string, file: File | undefined) {
    if (!file) return;
    setError("");
    setNotice("");
    setPending(true);
    try {
      const form = new FormData();
      form.set("image", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const result = await response.json() as { imageUrl?: string; error?: string };
      if (!response.ok || !result.imageUrl) throw new Error(result.error ?? "Image upload failed.");
      updateField(field, result.imageUrl);
      setNotice("Image uploaded. Save the record to publish it.");
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setPending(false);
    }
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!kind || !slug) return;
    if (kind === "place" && fields.publication_status === "published"
      && selectedPlace?.publication_status !== "published"
      && !window.confirm("Publish this place to the public directory? Confirm its details and source links have been verified.")) {
      return;
    }
    setPending(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch("/api/admin/content", {
        method: isNewPlace ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNewPlace ? { kind, fields } : { kind, slug, fields }),
      });
      const result = await response.json() as { error?: string; slug?: string };
      if (!response.ok) throw new Error(result.error ?? "Unable to save content.");
      if (kind === "place") {
        const savedSlug = isNewPlace ? result.slug : slug;
        if (!savedSlug) throw new Error("Place saved, but the server did not return its identifier. Reload the admin page.");
        const catalogResponse = await fetch("/api/admin/content", { cache: "no-store" });
        const updatedCatalog = await catalogResponse.json() as AdminCatalog & { error?: string };
        if (!catalogResponse.ok) throw new Error(updatedCatalog.error ?? "Place saved, but the admin catalog could not be refreshed.");
        setCatalog(updatedCatalog);
        const savedPlace = updatedCatalog.places.find((place) => place.slug === savedSlug);
        if (!savedPlace) throw new Error("Place saved, but it was not returned by the admin catalog.");
        setSelection(`place:${savedPlace.slug}`);
        setFields(placeValues(savedPlace));
      } else {
        const catalogResponse = await fetch("/api/admin/content", { cache: "no-store" });
        const updatedCatalog = await catalogResponse.json() as AdminCatalog & { error?: string };
        if (!catalogResponse.ok) throw new Error(updatedCatalog.error ?? "Province saved, but the admin catalog could not be refreshed.");
        setCatalog(updatedCatalog);
        const savedProvince = updatedCatalog.provinces.find((province) => province.slug === slug);
        if (!savedProvince) throw new Error("Province saved, but it was not returned by the admin catalog.");
        setFields(provinceValues(savedProvince));
      }
      setNotice(isNewPlace
        ? "Place saved as a draft. It is hidden from public pages until you publish it."
        : "Changes saved. Public pages have been refreshed.");
      router.refresh();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save content.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div>
          <h1>{scope === "places" ? "Places" : "Provinces"}</h1>
        </div>
        {scope === "places" && (
          <button className="admin-primary-button admin-button-link" type="button" onClick={() => selectEntity("place:new")}>
            <i className="fa-solid fa-plus" aria-hidden="true" />
            <span>Add a place</span>
          </button>
        )}
      </header>
      <section className="admin-panel admin-records-panel">
        <div className="admin-record-toolbar">
          <div>
            <p>{scope === "places" ? `${catalog?.places.length ?? 0} records` : `${catalog?.provinces.length ?? 0} provinces`}</p>
          </div>
          <div className="admin-record-filters">
            <input
              type="search"
              value={recordSearch}
              onChange={(event) => setRecordSearch(event.target.value)}
              placeholder={scope === "places" ? "Search name, province or type…" : "Search province…"}
              aria-label={scope === "places" ? "Search places" : "Search provinces"}
            />
            {scope === "places" && (
              <>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} aria-label="Filter by publication status">
                  <option value="all">All statuses</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                  <option value="paused">Paused</option>
                </select>
                <select value={provinceFilter} onChange={(event) => setProvinceFilter(event.target.value)} aria-label="Filter by province">
                  <option value="all">All provinces</option>
                  {catalog?.provinces.map((province) => <option key={province.slug} value={province.slug}>{province.name_en}</option>)}
                </select>
                <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)} aria-label="Filter by place type">
                  <option value="all">All types</option>
                  <option value="attraction">Attractions</option>
                  <option value="accommodation">Accommodation</option>
                  <option value="restaurant">Restaurants / food</option>
                  <option value="hotel">Hotels</option>
                  <option value="guest_house">Guest houses</option>
                  <option value="cafe">Cafes</option>
                  <option value="other">Other businesses</option>
                </select>
              </>
            )}
          </div>
        </div>
        {scope === "places" && role !== "editor" && selectedPlaces.length > 0 && (
          <div className="admin-bulk-toolbar" role="group" aria-label="Bulk place actions">
            <span>{selectedPlaces.length} selected</span>
            <button type="button" className="admin-secondary-button" disabled={pending} onClick={() => void updateSelectedPlaces("draft")}>
              Move to draft
            </button>
            <button type="button" className="admin-secondary-button" disabled={pending} onClick={() => void updateSelectedPlaces("paused")}>
              Pause listings
            </button>
            <button type="button" className="admin-row-action" onClick={() => setSelectedPlaces([])}>Clear selection</button>
          </div>
        )}
        {loading && <p>Loading content catalog…</p>}
        {!loading && error && !catalog && <p className="admin-alert" role="alert">{error}</p>}
        {catalog && (scope === "places" ? (
          filteredPlaces.length ? (
            <div className="admin-table-wrap">
              <table className="admin-data-table admin-record-table">
                <thead><tr>
                  {role !== "editor" && <th><input type="checkbox" aria-label="Select all visible places" checked={filteredPlaces.length > 0 && filteredPlaces.every((place) => selectedPlaces.includes(place.slug))} onChange={(event) => {
                    if (!event.target.checked) {
                      setSelectedPlaces((current) => current.filter((slug) => !filteredPlaces.some((place) => place.slug === slug)));
                      return;
                    }
                    const next = [...new Set([...selectedPlaces, ...filteredPlaces.map((place) => place.slug)])];
                    if (next.length > 100) {
                      setError("Bulk actions are limited to 100 places at a time. Narrow the filters before selecting all.");
                      return;
                    }
                    setError("");
                    setSelectedPlaces(next);
                  }} /></th>}
                  <th>Place</th><th>Province</th><th>Type</th><th>Status</th><th><span className="visually-hidden">Actions</span></th>
                </tr></thead>
                <tbody>
                  {filteredPlaces.map((place) => (
                    <tr key={place.slug} className={selection === `place:${place.slug}` ? "is-selected" : ""}>
                      {role !== "editor" && <td><input type="checkbox" checked={selectedPlaces.includes(place.slug)} onChange={() => togglePlace(place.slug)} aria-label={`Select ${place.name_en}`} /></td>}
                      <td><strong>{place.name_en}</strong><small>{place.name_km}</small></td>
                      <td>{place.province_en}</td>
                      <td>{place.business_type || place.listing_type}</td>
                      <td><span className={`admin-publication-chip is-${place.publication_status}`}>{place.publication_status}</span></td>
                      <td className="admin-action-cell">
                        <button
                          type="button"
                          className={`admin-row-action${openMenuSlug === place.slug ? " is-active" : ""}`}
                          aria-label="Actions"
                          onClick={() => setOpenMenuSlug(openMenuSlug === place.slug ? null : place.slug)}
                        >
                          <i className="fa-solid fa-bars" aria-hidden="true" />
                        </button>
                        {openMenuSlug === place.slug && (
                          <div className="admin-row-dropdown">
                            <button
                              type="button"
                              onClick={() => {
                                selectEntity(`place:${place.slug}`);
                                setOpenMenuSlug(null);
                              }}
                            >
                              <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                              <span>Edit Place</span>
                            </button>
                            <a
                              href={`/en/places/${place.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setOpenMenuSlug(null)}
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                              <span>View Profile</span>
                            </a>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="admin-empty-state">No places match the current search and filters.</p>
        ) : (
          filteredProvinces.length ? (
            <div className="admin-table-wrap">
              <table className="admin-data-table admin-record-table">
                <thead><tr><th>Province (English)</th><th>Province (Khmer)</th><th><span className="visually-hidden">Actions</span></th></tr></thead>
                <tbody>
                  {filteredProvinces.map((province) => (
                    <tr key={province.slug} className={selection === `province:${province.slug}` ? "is-selected" : ""}>
                      <td><strong>{province.name_en}</strong></td>
                      <td>{province.name_km}</td>
                      <td className="admin-action-cell">
                        <button
                          type="button"
                          className={`admin-row-action${openMenuSlug === province.slug ? " is-active" : ""}`}
                          aria-label="Actions"
                          onClick={() => setOpenMenuSlug(openMenuSlug === province.slug ? null : province.slug)}
                        >
                          <i className="fa-solid fa-bars" aria-hidden="true" />
                        </button>
                        {openMenuSlug === province.slug && (
                          <div className="admin-row-dropdown">
                            <button
                              type="button"
                              onClick={() => {
                                selectEntity(`province:${province.slug}`);
                                setOpenMenuSlug(null);
                              }}
                            >
                              <i className="fa-solid fa-pen-to-square" aria-hidden="true" />
                              <span>Edit Guide</span>
                            </button>
                            <a
                              href={`/en/provinces/${province.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => setOpenMenuSlug(null)}
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                              <span>View Profile</span>
                            </a>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="admin-empty-state">No provinces match your search.</p>
        ))}
      </section>
      {(selectedProvince || selectedPlace || isNewPlace) && (
        <section className="admin-panel admin-editor-panel">
        {catalog && (scope === "places" ? selectedPlace || isNewPlace : selectedProvince) && (
          <form className="admin-form admin-content-form" onSubmit={save}>
            <div className="admin-form-heading">
              <div>
                <h2>{scope === "provinces" && selectedProvince ? provinceLabel(selectedProvince) : selectedPlace ? placeLabel(selectedPlace) : "New place"}</h2>
              </div>
              {slug !== "new" && <span className="admin-slug">{slug}</span>}
            </div>
            <div className="admin-fields-grid">
              {scope === "places"
                ? placeFieldGroups.map((group) => (
                  <section className="admin-field-group admin-field-wide" key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="admin-fields-grid">{group.fields.map(renderField)}</div>
                  </section>
                ))
                : currentFields.map(renderField)}
            </div>
            {error && <p className="admin-alert" role="alert">{error}</p>}
            {notice && <p className="admin-success" role="status">{notice}</p>}
            <button className="admin-primary-button" type="submit" disabled={pending}>
              <i className={`fa-solid ${pending ? "fa-spinner fa-spin" : "fa-floppy-disk"}`} aria-hidden="true" />
              {" "}
              {pending ? "Saving…" : isNewPlace ? "Save draft" : "Save changes"}
            </button>
          </form>
        )}
        </section>
      )}
    </div>
  );
}
