"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

export const FAVORITES_KEY = "cambodia_tourism_favorites";

export function getStoredFavorites(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleStoredFavorite(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const favorites = getStoredFavorites();
    const index = favorites.indexOf(slug);
    let isNowSaved = false;
    if (index >= 0) {
      favorites.splice(index, 1);
      isNowSaved = false;
    } else {
      favorites.push(slug);
      isNowSaved = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    window.dispatchEvent(new CustomEvent("cambodia_favorites_updated", { detail: { favorites, slug, isNowSaved } }));
    return isNowSaved;
  } catch {
    return false;
  }
}

export default function FavoriteButton({
  slug,
  lang,
  className = "",
  size = "normal",
}: {
  slug: string;
  lang: Lang;
  className?: string;
  size?: "normal" | "large";
}) {
  const [isSaved, setIsSaved] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const list = getStoredFavorites();
    setIsSaved(list.includes(slug));

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ favorites: string[] }>;
      if (customEvent.detail?.favorites) {
        setIsSaved(customEvent.detail.favorites.includes(slug));
      } else {
        setIsSaved(getStoredFavorites().includes(slug));
      }
    };

    window.addEventListener("cambodia_favorites_updated", handleUpdate);
    return () => window.removeEventListener("cambodia_favorites_updated", handleUpdate);
  }, [slug]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleStoredFavorite(slug);
    setIsSaved(result);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        className={`favorite-btn ${size} ${className}`}
        aria-label={lang === "km" ? "រក្សាទុកទីកន្លែងនេះ" : "Save this place"}
      >
        <i className="fa-regular fa-bookmark" aria-hidden="true" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`favorite-btn ${isSaved ? "active" : ""} ${size} ${className}`}
      title={isSaved ? (lang === "km" ? "ដកចេញពីកន្លែងរក្សាទុក" : "Remove from saved places") : (lang === "km" ? "រក្សាទុកទីកន្លែងនេះ" : "Save this place")}
      aria-label={isSaved ? (lang === "km" ? "ដកចេញពីកន្លែងរក្សាទុក" : "Remove from saved places") : (lang === "km" ? "រក្សាទុកទីកន្លែងនេះ" : "Save this place")}
    >
      <i className={`fa-${isSaved ? "solid" : "regular"} fa-bookmark`} aria-hidden="true" />
    </button>
  );
}
