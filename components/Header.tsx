"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = T[lang];
  const languageHref = (nextLang: Lang) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("lang", nextLang);
    return `${pathname}?${params.toString()}`;
  };
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
          <nav className="language-switch" aria-label="Language">
            <Link href={languageHref("en")} aria-current={lang === "en" ? "page" : undefined}>EN</Link>
            <Link href={languageHref("km")} aria-current={lang === "km" ? "page" : undefined}>KH</Link>
          </nav>
        </div>
      </header>
      <button className="mobile-menu" onClick={() => setOpen(!open)}>☰ Menu</button>
      <nav className={`nav ${open ? "open" : ""}`}>
        <Link href={`/?lang=${lang}`} className={pathname === "/" ? "current" : ""}>{t.home}</Link>
        <Link href={`/discover?lang=${lang}`} className={pathname === "/discover" ? "current" : ""}>{t.discover}</Link>
        {Object.entries(t.cats).map(([k, label]) => (
          <Link
            key={k}
            href={k === "food" ? `/food?lang=${lang}` : `/?category=${k}&lang=${lang}`}
            className={k === "food" && pathname === "/food" ? "current" : ""}
          >
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
