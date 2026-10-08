"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { T, type Lang } from "@/lib/i18n";
import { getStoredFavorites } from "./FavoriteButton";

export default function Header({
  lang,
  q = "",
  type = "",
  active,
}: {
  lang: Lang;
  q?: string;
  type?: "" | "attraction" | "accommodation" | "restaurant";
  active?: string;
}) {
  const [open, setOpen] = useState(false);
  const [savedCount, setSavedCount] = useState<number>(0);
  const guidesMenu = useRef<HTMLDetailsElement>(null);
  const planMenu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
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
    if (guidesMenu.current) guidesMenu.current.open = false;
    if (planMenu.current) planMenu.current.open = false;
  };

  const routePath = pathname.replace(/^\/(?:km|en)(?=\/|$)/, "") || "/";
  const isProvincesRoute = routePath.startsWith("/regions/");
  const isGuidesRoute = routePath === "/discover" || routePath === "/food" || routePath === "/laws" || routePath.startsWith("/laws/") || routePath === "/tools";
  const isPlanRoute = routePath === "/itineraries" || routePath === "/events";
  const languageHref = (nextLang: Lang) => `/${nextLang}${routePath === "/" ? "" : routePath}`;

  return (
    <>
      <a className="skip-link" href="#main-content">{lang === "km" ? "រំលងទៅមាតិកា" : "Skip to content"}</a>
      <header className="header">
        <div className="header-inner">
          <Link href={`/${lang}`} className="logo" style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>
            Visit Cambodia
          </Link>
          <form className="search" action={`/${lang}/explore`} role="search">
            <input name="q" defaultValue={q} placeholder={t.search} aria-label={t.search} />
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
          href={`/${lang}`}
          onClick={closeAllMenus}
          className={routePath === "/" ? "current" : ""}
          aria-current={routePath === "/" ? "page" : undefined}
        >
          {t.home}
        </Link>

        {/* 2. Destinations */}
        <Link
          href={`/${lang}/explore`}
          onClick={closeAllMenus}
          className={routePath === "/explore" ? "current" : ""}
          aria-current={routePath === "/explore" ? "page" : undefined}
        >
          {t.destinations}
        </Link>

        {/* 3. Provinces */}
        <Link
          href={`/${lang}#province-list`}
          onClick={closeAllMenus}
          className={isProvincesRoute ? "current" : ""}
          aria-current={isProvincesRoute ? "page" : undefined}
        >
          {t.provinces}
        </Link>

        {/* 4. Map */}
        <Link
          href={`/${lang}/map`}
          onClick={closeAllMenus}
          className={routePath === "/map" ? "current" : ""}
          aria-current={routePath === "/map" ? "page" : undefined}
        >
          {lang === "km" ? "ផែនទី" : "Map"}
        </Link>

        {/* 5. Trip planning */}
        <details ref={planMenu} className={`nav-dropdown${isPlanRoute ? " current" : ""}`}>
          <summary aria-label={lang === "km" ? "រៀបចំដំណើរ" : "Plan your trip"} aria-current={isPlanRoute ? "page" : undefined}>
            {lang === "km" ? "រៀបចំដំណើរ" : "Plan"} <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ fontSize: "0.75em", marginLeft: 4 }} />
          </summary>
          <div className="nav-dropdown-menu nav-dropdown-plan-menu">
            <Link href={`/${lang}/itineraries`} onClick={closeAllMenus} aria-current={routePath === "/itineraries" ? "page" : undefined}>
              {t.itineraries}
            </Link>
            <Link href={`/${lang}/events`} onClick={closeAllMenus} aria-current={routePath === "/events" ? "page" : undefined}>
              {t.events}
            </Link>
            <Link href={`/${lang}/map`} onClick={closeAllMenus} aria-current={routePath === "/map" ? "page" : undefined}>
              {lang === "km" ? "ផែនទី" : "Map"}
            </Link>
          </div>
        </details>

        {/* 6. Saved Places */}
        <Link
          href={`/${lang}/saved`}
          onClick={closeAllMenus}
          className={`nav-saved-link ${routePath === "/saved" ? "current" : ""}`}
          aria-current={routePath === "/saved" ? "page" : undefined}
        >
          <span>{t.savedPlaces}</span>
          {savedCount > 0 && <span className="nav-saved-badge">{savedCount}</span>}
        </Link>

        {/* 7. Guides & Tools Dropdown */}
        <details ref={guidesMenu} className={`nav-dropdown${isGuidesRoute ? " current" : ""}`}>
          <summary aria-label={t.guideAndTools} aria-current={isGuidesRoute ? "page" : undefined}>
            {t.guideAndTools} <i className="fa-solid fa-chevron-down" aria-hidden="true" style={{ fontSize: "0.75em", marginLeft: 4 }} />
          </summary>
          <div className="nav-dropdown-menu nav-dropdown-guides-menu">
            <Link href={`/${lang}/discover`} onClick={closeAllMenus} aria-current={routePath === "/discover" ? "page" : undefined}>
              {t.discover}
            </Link>
            <Link href={`/${lang}/food`} onClick={closeAllMenus} aria-current={routePath === "/food" ? "page" : undefined}>
              {t.cats.food}
            </Link>
            <Link href={`/${lang}/laws`} onClick={closeAllMenus} aria-current={routePath.startsWith("/laws") ? "page" : undefined}>
              {lang === "km" ? "ច្បាប់សម្រាប់អ្នកទេសចរណ៍" : "Travel laws"}
            </Link>
            <Link href={`/${lang}/tools#currency`} onClick={closeAllMenus}>
              {lang === "km" ? "ឧបករណ៍ប្តូរប្រាក់ (USD ↔ KHR)" : "Currency Converter"}
            </Link>
            <Link href={`/${lang}/tools#phrasebook`} onClick={closeAllMenus}>
              {lang === "km" ? "ឃ្លាសន្ទនាខ្មែរសំខាន់ៗ" : "Khmer Phrasebook"}
            </Link>
            <Link href={`/${lang}/tools#emergency`} onClick={closeAllMenus}>
              {lang === "km" ? "លេខទូរស័ព្ទសង្គ្រោះបន្ទាន់" : "Emergency Directory"}
            </Link>
          </div>
        </details>
      </nav>
    </>
  );
}
