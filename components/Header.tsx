"use client";
import Link from "next/link";
import { useState } from "react";
import { T, type Lang } from "@/lib/i18n";

export default function Header({
  lang,
  q = "",
  type = "",
}: {
  lang: Lang;
  q?: string;
  type?: "" | "attraction" | "accommodation" | "restaurant";
}) {
  const [open, setOpen] = useState(false);
  const t = T[lang];
  const other = lang === "km" ? "en" : "km";
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href={`/?lang=${lang}`} className="logo" style={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>
            Visit Cambodia
          </Link>
          <form className="search" action="/">
            <input name="q" defaultValue={q} placeholder={t.search} />
            <input type="hidden" name="lang" value={lang} />
            <select name="type" defaultValue={type} aria-label={t.browseByType}>
              <option value="">{t.all}</option>
              {Object.entries(t.placeTypes).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            <button type="submit" aria-label="Search">⌕</button>
          </form>
        </div>
        <div className="utility">
          <span />
          <Link href={`/?lang=${other}`}>{lang === "km" ? "EN" : "Kh"}</Link>
        </div>
      </header>
      <button className="mobile-menu" onClick={() => setOpen(!open)}>☰ Menu</button>
      <nav className={`nav ${open ? "open" : ""}`}>
        <Link href={`/?lang=${lang}`}>{t.home}</Link>
        {Object.entries(t.cats).map(([k, label]) => (
          <Link key={k} href={`/?category=${k}&lang=${lang}`}>{label}</Link>
        ))}
      </nav>
    </>
  );
}
