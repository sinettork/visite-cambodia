"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { AdminCatalog, AdminPlace } from "@/lib/admin/content";

type EditableFields = Record<string, string>;

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
  ["ticket_usd", "Ticket price (USD)", "input"],
  ["ticket_status", "Ticket price status", "ticket_status"],
  ["ticket_provider", "Ticket seller / provider", "input"],
  ["ticket_url", "Ticket purchase URL", "input"],
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

export default function AdminPlaceEditor({ slug, role = "editor" }: {
  slug: string | null; // null = new place
  role?: "super_admin" | "admin" | "editor";
}) {
  const router = useRouter();
  const isNew = slug === null;
  const [catalog, setCatalog] = useState<AdminCatalog | null>(null);
  const [fields, setFields] = useState<EditableFields>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, setPending] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/admin/content", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json() as AdminCatalog & { error?: string };
        if (response.status === 401) { router.replace("/admin/login"); return; }
        if (!response.ok) throw new Error(result.error ?? "Unable to load the content catalog.");
        if (active) {
          setCatalog(result);
          if (isNew) {
            setFields({ ...emptyPlaceFields, province_slug: result.provinces[0]?.slug ?? "" });
          } else {
            const place = result.places.find((p) => p.slug === slug);
            if (place) setFields(placeValues(place));
            else setError(`Place "${slug}" not found.`);
          }
        }
      })
      .catch((err: unknown) => { if (active) setError(err instanceof Error ? err.message : "Unable to load content."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [router, slug, isNew]);

  const selectedPlace = useMemo(
    () => !isNew ? catalog?.places.find((p) => p.slug === slug) : undefined,
    [catalog, slug, isNew],
  );

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

  function updateField(name: string, value: string) {
    setFields((current) => {
      const next = { ...current, [name]: value };
      if (name === "business_type") {
        if (value === "hotel" || value === "guest_house") { next.listing_type = "accommodation"; next.category = "culture"; }
        else if (value === "restaurant" || value === "cafe") { next.listing_type = "restaurant"; next.category = "food"; }
      } else if (name === "listing_type") {
        const compatible = value === "accommodation" ? ["hotel", "guest_house", "other"]
          : value === "restaurant" ? ["restaurant", "cafe", "other"] : [];
        if (next.business_type && !compatible.includes(next.business_type)) next.business_type = "";
      }
      return next;
    });
    setNotice("");
  }

  function renderField([name, label, type]: readonly [string, string, string]) {
    return (
      <label className={type === "textarea" ? "admin-field admin-field-wide" : "admin-field"} key={name}>
        <span className="admin-field-label">{label}</span>
        {type === "textarea" ? (
          <textarea value={fields[name] ?? ""} onChange={(event) => updateField(name, event.target.value)} rows={4} maxLength={20000} />
        ) : type === "province" ? (
          <select value={fields[name] ?? ""} onChange={(event) => updateField(name, event.target.value)}>
            {catalog?.provinces.map((province) => <option key={province.slug} value={province.slug}>{province.name_en} / {province.name_km}</option>)}
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
          <select value={fields[name] ?? "draft"} onChange={(event) => updateField(name, event.target.value)} disabled={isNew || role === "editor"}>
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
    setError(""); setNotice(""); setPending(true);
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
    if (fields.publication_status === "published" && selectedPlace?.publication_status !== "published"
      && !window.confirm("Publish this place to the public directory? Confirm its details and source links have been verified.")) return;
    setPending(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/content", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(isNew ? { kind: "place", fields } : { kind: "place", slug, fields }),
      });
      const result = await response.json() as { error?: string; slug?: string };
      if (!response.ok) throw new Error(result.error ?? "Unable to save content.");
      const savedSlug = isNew ? result.slug : slug;
      if (!savedSlug) throw new Error("Place saved, but the server did not return its identifier.");
      router.refresh();
      if (isNew) {
        router.replace(`/admin/places/${savedSlug}/edit`);
      } else {
        setNotice("Changes saved. Public pages have been refreshed.");
        // Reload fresh data
        const catalogResponse = await fetch("/api/admin/content", { cache: "no-store" });
        const updatedCatalog = await catalogResponse.json() as AdminCatalog & { error?: string };
        if (catalogResponse.ok) {
          setCatalog(updatedCatalog);
          const savedPlace = updatedCatalog.places.find((p) => p.slug === savedSlug);
          if (savedPlace) setFields(placeValues(savedPlace));
        }
      }
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save content.");
    } finally {
      setPending(false);
    }
  }

  const pageTitle = isNew ? "New place" : (selectedPlace ? `${selectedPlace.name_en}` : slug ?? "Edit place");

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div className="admin-breadcrumb">
          <Link href="/admin/places" className="admin-breadcrumb-link">
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            Places
          </Link>
          <span className="admin-breadcrumb-sep">/</span>
          <span>{pageTitle}</span>
        </div>
        {!isNew && slug && (
          <a href={`/en/places/${slug}`} target="_blank" rel="noreferrer" className="admin-btn admin-btn-ghost">
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            View on site
          </a>
        )}
      </header>

      {loading && <p className="admin-loading" role="status">Loading…</p>}
      {error && !catalog && <p className="admin-alert" role="alert">{error}</p>}

      {catalog && (
        <form className="admin-editor-form" onSubmit={save}>
          <div className="admin-editor-body">
            {placeFieldGroups.map((group) => (
              group.fields.length > 0 && (
                <section className="admin-field-group" key={group.title}>
                  <h2 className="admin-field-group-title">{group.title}</h2>
                  <div className="admin-fields-grid">
                    {group.fields.map(renderField)}
                  </div>
                </section>
              )
            ))}
          </div>

          {/* Sticky save bar */}
          <div className="admin-save-bar">
            <div className="admin-save-bar-inner">
              {error && <p className="admin-alert admin-save-alert" role="alert">{error}</p>}
              {notice && <p className="admin-success admin-save-alert" role="status">{notice}</p>}
              {!isNew && slug && (
                <span className="admin-slug-label">/{slug}</span>
              )}
              <button className="admin-btn admin-btn-primary" type="submit" disabled={pending}>
                <i className={`fa-solid ${pending ? "fa-spinner fa-spin" : "fa-floppy-disk"}`} aria-hidden="true" />
                {pending ? "Saving…" : isNew ? "Save draft" : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
