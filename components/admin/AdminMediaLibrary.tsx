"use client";

import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";

type MediaItem = {
  filename: string;
  url: string;
  extension: string;
  size: number;
  updated_at: string;
  usage_count: number;
};

type MediaResponse = { items: MediaItem[]; total: number; page: number; pageSize: number };
type MediaFilter = "all" | "used" | "unused";

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function AdminMediaLibrary() {
  const router = useRouter();
  const [data, setData] = useState<MediaResponse | null>(null);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<MediaFilter>("all");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState("");

  const loadMedia = useCallback(async () => {
    setError("");
    const response = await fetch(`/api/admin/media?page=${page}`, { cache: "no-store" });
    const result = await response.json() as MediaResponse & { error?: string };
    if (response.status === 401) {
      router.replace("/admin/login");
      return;
    }
    if (!response.ok) throw new Error(result.error ?? "Unable to load media.");
    setData(result);
  }, [page, router]);

  useEffect(() => {
    let active = true;
    loadMedia().catch((loadError: unknown) => {
      if (active) setError(loadError instanceof Error ? loadError.message : "Unable to load media.");
    });
    return () => { active = false; };
  }, [loadMedia]);

  async function upload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    setNotice("");
    try {
      const form = new FormData();
      form.set("image", file);
      const response = await fetch("/api/admin/upload", { method: "POST", body: form });
      const result = await response.json() as { imageUrl?: string; error?: string };
      if (!response.ok || !result.imageUrl) throw new Error(result.error ?? "Image upload failed.");
      setPage(1);
      setFilter("all");
      setNotice(`Image uploaded: ${result.imageUrl}`);
      if (page === 1) await loadMedia();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function copyUrl(item: MediaItem) {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(item.filename);
      setNotice(`${item.url} copied to clipboard.`);
    } catch {
      setError("Clipboard access is unavailable. Copy the image path from the card.");
    }
  }

  const items = (data?.items ?? []).filter((item) => (
    filter === "all" || (filter === "used" ? item.usage_count > 0 : item.usage_count === 0)
  ));
  const totalPages = data ? Math.ceil(data.total / data.pageSize) : 0;

  return (
    <div className="admin-page">
      <header className="admin-page-heading">
        <div><h1>Media library</h1></div>
        <label className={`admin-primary-button admin-upload-button${uploading ? " is-disabled" : ""}`}>
          <i className={`fa-solid ${uploading ? "fa-spinner fa-spin" : "fa-arrow-up-from-bracket"}`} aria-hidden="true" />
          {uploading ? "Uploading…" : "Upload image"}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => void upload(event)} disabled={uploading} />
        </label>
      </header>
      {error && <p className="admin-alert" role="alert">{error}</p>}
      {notice && <p className="admin-success" role="status">{notice}</p>}
      {!data && !error && <p className="admin-loading">Loading media library…</p>}
      {data && (
        <section className="admin-panel">
          <div className="admin-media-toolbar">
            <div><p>{data.total} {data.total === 1 ? "file" : "files"}</p></div>
            <div className="admin-filter-tabs" role="group" aria-label="Filter media">
              {(["all", "used", "unused"] as const).map((value) => (
                <button key={value} type="button" className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>
                  <i
                    className={`fa-solid ${value === "all" ? "fa-images" : value === "used" ? "fa-link" : "fa-circle-minus"}`}
                    aria-hidden="true"
                  />
                  {value === "all" ? "All images" : value === "used" ? "In use" : "Unused"}
                </button>
              ))}
            </div>
          </div>
          {items.length ? (
            <div className="admin-media-grid">
              {items.map((item) => (
                <article className="admin-media-card" key={item.filename}>
                  <img src={item.url} alt="" loading="lazy" />
                  <div className="admin-media-card-copy">
                    <strong title={item.filename}>{item.filename}</strong>
                    <span>{formatBytes(item.size)} · {item.extension.toUpperCase()}</span>
                    <span>{item.usage_count ? `Used on ${item.usage_count} record${item.usage_count === 1 ? "" : "s"}` : "Not currently used"}</span>
                    <button type="button" className="admin-secondary-button" onClick={() => void copyUrl(item)}>
                      <i className={`fa-solid ${copied === item.filename ? "fa-check" : "fa-copy"}`} aria-hidden="true" />
                      {copied === item.filename ? "Copied" : "Copy image path"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : <p className="admin-empty-state">{filter === "all" ? "No uploaded images yet. Upload an image to start the library." : `No ${filter} images are on this page.`}</p>}
          {totalPages > 1 && (
            <nav className="admin-pagination" aria-label="Media pages">
              <button type="button" className="admin-secondary-button" onClick={() => setPage((value) => value - 1)} disabled={page <= 1}>
                <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Previous
              </button>
              <span>Page {data.page} of {totalPages}</span>
              <button type="button" className="admin-secondary-button" onClick={() => setPage((value) => value + 1)} disabled={page >= totalPages}>
                Next <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </button>
            </nav>
          )}
        </section>
      )}
    </div>
  );
}
