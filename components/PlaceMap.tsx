"use client";

import { useEffect, useMemo, useState } from "react";
import type { Place } from "@/lib/types/place";

const typeLabel = {
  km: {
    attraction: "កម្សាន្ត និងទស្សនា",
    accommodation: "ស្នាក់នៅ",
    restaurant: "អាហារ និងភោជនីយដ្ឋាន",
    map: "ផែនទីកន្លែងទេសចរណ៍",
    intro: "ស្វែងរកទីតាំងនៅកម្ពុជាលើផែនទីអន្តរកម្ម។ ចុចលើចំណុចដើម្បីមើលព័ត៌មានលម្អិត។",
    all: "គ្រប់ប្រភេទ",
    allProvinces: "គ្រប់ខេត្ត/ក្រុង",
    provinceFilter: "ជ្រើសរើសខេត្ត",
    empty: "មិនមានទីតាំងត្រូវគ្នានឹងការជ្រើសរើសនេះទេ។",
    list: "ទីតាំងលើផែនទី",
    open: "មើលព័ត៌មានលម្អិត ›",
  },
  en: {
    attraction: "Things to do",
    accommodation: "Stays",
    restaurant: "Food & restaurants",
    map: "Places on the map",
    intro: "Explore destinations across Cambodia on the interactive map. Click any pin to see details.",
    all: "All types",
    allProvinces: "All Provinces",
    provinceFilter: "Filter by province",
    empty: "No places match the selected filters.",
    list: "places displayed",
    open: "View details ›",
  },
} as const;

export default function PlaceMap({ places, lang }: { places: Place[]; lang: "km" | "en" }) {
  const t = typeLabel[lang];
  const [type, setType] = useState<string>("");
  const [province, setProvince] = useState<string>("");

  const provinces = useMemo(() => {
    const map = new Map<string, string>();
    places.forEach((p) => {
      const name = lang === "km" ? p.province_km : p.province_en;
      if (p.province_slug && name) {
        map.set(p.province_slug, name);
      }
    });
    return Array.from(map.entries()).sort((a, b) => a[1].localeCompare(b[1]));
  }, [places, lang]);

  const filtered = useMemo(() => {
    return places.filter((p) => {
      const matchesType = !type || p.listing_type === type;
      const matchesProvince = !province || p.province_slug === province;
      return matchesType && matchesProvince;
    });
  }, [places, type, province]);

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    void import("leaflet").then((L) => {
      if (cancelled) return;
      const located = filtered.filter((p) => Number.isFinite(Number(p.lat)) && Number.isFinite(Number(p.lng)));
      
      const container = document.getElementById("cambodia-place-map");
      if (!container) return;

      map = L.map("cambodia-place-map", { scrollWheelZoom: false }).setView([12.6, 104.9], 7);
      
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const bounds: [number, number][] = [];

      located.forEach((place) => {
        const lat = Number(place.lat);
        const lng = Number(place.lng);
        bounds.push([lat, lng]);

        const color = place.listing_type === "accommodation" ? "#246b5a" : place.listing_type === "restaurant" ? "#a94b24" : "#ea7925";
        const marker = L.circleMarker([lat, lng], {
          radius: 9,
          color: "#ffffff",
          weight: 2.5,
          fillColor: color,
          fillOpacity: 0.95,
        }).addTo(map!);

        const title = lang === "km" ? place.name_km : place.name_en;
        const provName = lang === "km" ? place.province_km : place.province_en;
        const typeText = place.listing_type === "accommodation" ? (lang === "km" ? "ស្នាក់នៅ" : "Stay") : place.listing_type === "restaurant" ? (lang === "km" ? "អាហារ" : "Food") : (lang === "km" ? "កម្សាន្ត" : "Attraction");
        const typeIcon = place.listing_type === "accommodation" ? "fa-hotel" : place.listing_type === "restaurant" ? "fa-utensils" : "fa-landmark";

        const popup = document.createElement("div");
        popup.className = "leaflet-popup-content-custom";

        const badge = document.createElement("span");
        badge.className = "popup-badge";
        badge.innerHTML = `<i class="fa-solid ${typeIcon}"></i> ${typeText}`;

        const heading = document.createElement("h4");
        heading.textContent = title;

        const location = document.createElement("p");
        location.className = "popup-location";
        location.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${provName}`;

        const link = document.createElement("a");
        link.href = `/destinations/${encodeURIComponent(place.slug)}?lang=${lang}`;
        link.textContent = t.open;
        link.className = "popup-detail-btn";

        popup.append(badge, heading, location, link);
        marker.bindPopup(popup);
      });

      if (bounds.length > 1) {
        map.fitBounds(bounds, { padding: [30, 30] });
      } else if (bounds.length === 1) {
        map.setView(bounds[0], 12);
      }

      window.setTimeout(() => map?.invalidateSize(), 100);
    });

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [filtered, lang, t.open]);

  return (
    <section className="place-map-section">
      <div className="map-toolbar-container">
        <p className="map-intro-text">{t.intro}</p>

        <div className="map-filters-row">
          <div className="map-type-pills" role="tablist">
            <button
              type="button"
              className={`map-pill-btn ${!type ? "active" : ""}`}
              onClick={() => setType("")}
            >
              {t.all}
            </button>
            <button
              type="button"
              className={`map-pill-btn ${type === "attraction" ? "active" : ""}`}
              onClick={() => setType("attraction")}
            >
              <i className="fa-solid fa-landmark" aria-hidden="true" /> {t.attraction}
            </button>
            <button
              type="button"
              className={`map-pill-btn ${type === "accommodation" ? "active" : ""}`}
              onClick={() => setType("accommodation")}
            >
              <i className="fa-solid fa-hotel" aria-hidden="true" /> {t.accommodation}
            </button>
            <button
              type="button"
              className={`map-pill-btn ${type === "restaurant" ? "active" : ""}`}
              onClick={() => setType("restaurant")}
            >
              <i className="fa-solid fa-utensils" aria-hidden="true" /> {t.restaurant}
            </button>
          </div>

          <div className="map-province-select-wrapper">
            <label htmlFor="map-province-filter" className="sr-only">{t.provinceFilter}</label>
            <select
              id="map-province-filter"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              className="map-province-select"
            >
              <option value="">{t.allProvinces}</option>
              {provinces.map(([slug, name]) => (
                <option key={slug} value={slug}>{name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filtered.length ? (
        <div id="cambodia-place-map" className="leaflet-map" role="application" aria-label={t.map} />
      ) : (
        <div className="map-empty-state">
          <p className="region-empty">{t.empty}</p>
          <button type="button" onClick={() => { setType(""); setProvince(""); }} className="btn-reset-map-filters">
            {lang === "km" ? "សម្អាតការជ្រើសរើស" : "Clear filters"}
          </button>
        </div>
      )}

      <div className="map-caption">
        <span><i className="fa-solid fa-location-dot" aria-hidden="true" /> <strong>{filtered.length}</strong> {t.list}</span>
        <span>{lang === "km" ? "ផែនទី © OpenStreetMap" : "Map data © OpenStreetMap"}</span>
      </div>
    </section>
  );
}
