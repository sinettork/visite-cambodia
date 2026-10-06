"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { T, type Lang } from "@/lib/i18n";
import type { Province } from "@/lib/types/place";
import { getStoredFavorites } from "./FavoriteButton";

export default function Header({
  lang,
  q = "",
  type = "",
  active,
  provinces,
}: {
  lang: Lang;
  q?: string;
  type?: "" | "attraction" | "accommodation" | "restaurant";
  active?: string;
  provinces: Province[];
}) {
  const [open, setOpen] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(0);
  const provincesMenu = useRef<HTMLDetailsElement>(null);
  const guidesMenu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = T[lang];

  useEffect(() => {
    setSavedCount(getStoredFavorites().length);

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<{ favorites: string[] }>;
      if (customEvent.detail?.favorites) {
        setSavedCount(customEvent.detail.favorites.length);
      } else {
        setSavedCount(getStoredFavorites().length);
      }
    };

    window.addEventListener("cambodia_favorites_updated", handleUpdate);
    return () => window.removeEventListener("cambodia_favorites_updated", handleUpdate);
  }, []);

  const closeAllMenus = () => {
    setOpen(false);
    if (provincesMenu.current) provincesMenu.current.open = false;
    if (guidesMenu.current) guidesMenu.current.open = false;
  };

  const isProvincesRoute = pathname.startsWith("/regions/");
  const isGuidesRoute = pathname === "/discover" || pathname === "/food" || pathname === "/laws" || pathname.startsWith("/laws/") || pathname === "/tools";

  const languageHref = (nextLang: Lang) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLang);
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <a className="skip-link" href="#main-content">{lang === "km" ? "រំលងទៅមាតិកា" : "Skip to content"}</a>
      <header className="header">
        <div className="header-inner">
          <Link href={`/?lang=${lang}`} className="logo" style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>
            Visit Cambodia
          </Link>
          <form className="search" action="/explore" role="search">
            <input name="q" defaultValue={q} placeholder={t.search} aria-label={t.search} />
            <input type="hidden" name="lang" value={lang} />
            <select name="type" defaultValue={type} aria-label={t.browseByType}>
              <option value="">{t.all}</option>
              {Object.entries(t.placeTypes).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <button type="submit" aria-label={t.searchAction}>
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
            </button>
          </form>
          <nav className="language-switch" aria-label="Language">
            <Link href={languageHref("en")} aria-current={lang === "en" ? "page" : undefined}>EN</Link>
            <Link href={languageHref("km")} aria-current={lang === "km" ? "page" : undefined}>KH</Link>
          </nav>
        </div>
      </header>

      <button
        type="button"
        className="mobile-menu"
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => {
          setOpen(!open);
          if (open) closeAllMenus();
        }}
      >
        <i className="fa-solid fa-bars" aria-hidden="true" /> {t.menu}
      </button>

      <nav id="site-navigation" className={`nav ${open ? "open" : ""}`} aria-label={lang === "km" ? "ការរុករកចម្បង" : "Main navigation"}>
        {/* 1. Home */}
        <Link
          href={`/?lang=${lang}`}
          onClick={closeAllMenus}
          className={pathname === "/" ? "current" : ""}
          aria-current={pathname === "/" ? "page" : undefined}
        >
          {t.home}
        </Link>

        {/* 2. Destinations */}
        <Link
          href={`/explore?lang=${lang}`}
          onClick={closeAllMenus}
          className={pathname === "/explore" ? "current" : ""}
          aria-current={pathname === "/explore" ? "page" : undefined}
        >
          {t.destinations}
        </Link>

        {/* 3. Provinces Dropdown */}
        <details ref={provincesMenu} className={`nav-dropdown${isProvincesRoute ? " current" : ""}`}>
          <summary aria-label={t.provinces} aria-current={isProvincesRoute ? "page" : undefined}>
            {t.provinces} <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ fontSize: "0.75em", marginLeft: 4 }} />
          </summary>
          <div className="nav-dropdown-menu nav-dropdown-provinces-menu">
            <div className="nav-dropdown-provinces-grid">
              {provinces.map((province) => (
                <Link
                  key={province.slug}
                  href={`/regions/${province.slug}?lang=${lang}`}
                  onClick={closeAllMenus}
                  className={active === province.slug ? "active-prov-link" : ""}
                  aria-current={active === province.slug ? "page" : undefined}
                >
                  {lang === "km" ? province.name_km : province.name_en}
                </Link>
              ))}
            </div>
          </div>
        </details>

        {/* 4. Map */}
        <Link
          href={`/map?lang=${lang}`}
          onClick={closeAllMenus}
          className={pathname === "/map" ? "current" : ""}
          aria-current={pathname === "/map" ? "page" : undefined}
        >
          {lang === "km" ? "ផែនទី" : "Map"}
        </Link>

        {/* 5. Itineraries */}
        <Link
          href={`/itineraries?lang=${lang}`}
          onClick={closeAllMenus}
          className={pathname === "/itineraries" ? "current" : ""}
          aria-current={pathname === "/itineraries" ? "page" : undefined}
        >
          {t.itineraries}
        </Link>

        {/* 6. Events & Festivals */}
        <Link
          href={`/events?lang=${lang}`}
          onClick={closeAllMenus}
          className={pathname === "/events" ? "current" : ""}
          aria-current={pathname === "/events" ? "page" : undefined}
        >
          {t.events}
        </Link>

        {/* 7. Saved Places */}
        <Link
          href={`/saved?lang=${lang}`}
          onClick={closeAllMenus}
          className={`nav-saved-link ${pathname === "/saved" ? "current" : ""}`}
          aria-current={pathname === "/saved" ? "page" : undefined}
        >
          <span>{t.savedPlaces}</span>
          {savedCount > 0 && <span className="nav-saved-badge">{savedCount}</span>}
        </Link>

        {/* 8. Guides & Tools Dropdown */}
        <details ref={guidesMenu} className={`nav-dropdown${isGuidesRoute ? " current" : ""}`}>
          <summary aria-label={t.guideAndTools} aria-current={isGuidesRoute ? "page" : undefined}>
            {t.guideAndTools} <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ fontSize: "0.75em", marginLeft: 4 }} />
          </summary>
          <div className="nav-dropdown-menu nav-dropdown-guides-menu">
            <Link href={`/discover?lang=${lang}`} onClick={closeAllMenus} aria-current={pathname === "/discover" ? "page" : undefined}>
              {t.discover}
            </Link>
            <Link href={`/food?lang=${lang}`} onClick={closeAllMenus} aria-current={pathname === "/food" ? "page" : undefined}>
              {t.cats.food}
            </Link>
            <Link href={`/laws?lang=${lang}`} onClick={closeAllMenus} aria-current={pathname.startsWith("/laws") ? "page" : undefined}>
              {lang === "km" ? "ច្បាប់សម្រាប់អ្នកទេសចរណ៍" : "Travel laws"}
            </Link>
            <Link href={`/tools?lang=${lang}#currency`} onClick={closeAllMenus}>
              {lang === "km" ? "ឧបករណ៍ប្តូរប្រាក់ (USD ↔ KHR)" : "Currency Converter"}
            </Link>
            <Link href={`/tools?lang=${lang}#phrasebook`} onClick={closeAllMenus}>
              {lang === "km" ? "ឃ្លាសន្ទនាខ្មែរសំខាន់ៗ" : "Khmer Phrasebook"}
            </Link>
            <Link href={`/tools?lang=${lang}#emergency`} onClick={closeAllMenus}>
              {lang === "km" ? "លេខទូរស័ព្ទសង្គ្រោះបន្ទាន់" : "Emergency Directory"}
            </Link>
          </div>
        </details>
      </nav>
    </>
  );
}
