"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PlaceCard from "./PlaceCard";
import { FAVORITES_KEY, getStoredFavorites } from "./FavoriteButton";
import { T, type Lang } from "@/lib/i18n";
import type { Place } from "@/lib/types/place";

export default function SavedPlacesList({
  allPlaces,
  lang,
}: {
  allPlaces: Place[];
  lang: Lang;
}) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const t = T[lang];

  useEffect(() => {
    setMounted(true);
    setFavorites(getStoredFavorites());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ favorites: string[] }>;
      if (customEvent.detail?.favorites) {
        setFavorites(customEvent.detail.favorites);
      } else {
        setFavorites(getStoredFavorites());
      }
    };

    window.addEventListener("cambodia_favorites_updated", handleUpdate);
    return () => window.removeEventListener("cambodia_favorites_updated", handleUpdate);
  }, []);

  const handleClearAll = () => {
    if (confirm(lang === "km" ? "តើអ្នកប្រាកដជាចង់សម្អាតបញ្ជីរក្សាទុកទាំងអស់មែនទេ?" : "Are you sure you want to clear all saved places?")) {
      localStorage.removeItem(FAVORITES_KEY);
      setFavorites([]);
      window.dispatchEvent(new CustomEvent("cambodia_favorites_updated", { detail: { favorites: [] } }));
    }
  };

  const savedPlaces = allPlaces.filter((p) => favorites.includes(p.slug));

  if (!mounted) {
    return <div className="saved-loading"><p>{lang === "km" ? "កំពុងផ្ទុក..." : "Loading saved places..."}</p></div>;
  }

  return (
    <div className="saved-places-container">
      <div className="saved-header-row">
        <div>
          <h1>{t.savedTitle}</h1>
          <p className="saved-intro">{t.savedIntro}</p>
        </div>
        {savedPlaces.length > 0 && (
          <button type="button" onClick={handleClearAll} className="saved-clear-btn">
            <i className="fa-solid fa-trash-can" aria-hidden="true" /> {lang === "km" ? "សម្អាតទាំងអស់" : "Clear All"}
          </button>
        )}
      </div>

      {savedPlaces.length > 0 ? (
        <>
          <div className="saved-count-badge">
            <span><i className="fa-solid fa-heart" aria-hidden="true" /> {savedPlaces.length} {lang === "km" ? "ទីតាំងត្រូវបានរក្សាទុក" : "places saved"}</span>
          </div>
          <div className="review-grid">
            {savedPlaces.map((place) => (
              <PlaceCard key={place.slug} place={place} lang={lang} />
            ))}
          </div>
        </>
      ) : (
        <div className="saved-empty-card">
          <div className="saved-empty-icon">
            <i className="fa-regular fa-heart" aria-hidden="true" />
          </div>
          <h3>{lang === "km" ? "មិនទាន់មានកន្លែងរក្សាទុក" : "No saved places yet"}</h3>
          <p>{t.noSaved}</p>
          <Link href={`/explore?lang=${lang}`} className="saved-explore-link">
            {t.homeExplore} <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: "0.85em", marginLeft: 4 }} />
          </Link>
        </div>
      )}
    </div>
  );
}
