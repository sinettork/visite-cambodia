import Link from "next/link";
import Shell from "@/components/Shell";
import PlaceCard from "@/components/PlaceCard";
import { getPlacePage, getProvinces } from "@/lib/queries";
import { T, getLang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ lang?: string; q?: string; province?: string; category?: string; type?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const lang = getLang(sp.lang);
  const t = T[lang];
  const type = sp.type === "attraction" || sp.type === "accommodation" || sp.type === "restaurant"
    ? sp.type
    : undefined;
  const result = await getPlacePage({ province: sp.province, category: sp.category, type, q: sp.q }, Number(sp.page) || 1);
  const places = result.items;
  const totalPages = Math.ceil(result.total / result.pageSize);
  const isBrowsing = Boolean(sp.q || sp.province || sp.category || type || sp.page);
  const province = sp.province ? (await getProvinces()).find((item) => item.slug === sp.province) : undefined;
  const browseHref = (changes: { type?: string; page?: number }) => {
    const params = new URLSearchParams();
    params.set("lang", lang);
    if (sp.province) params.set("province", sp.province);
    if (sp.category) params.set("category", sp.category);
    const nextType = changes.type === undefined ? type : changes.type;
    if (nextType) params.set("type", nextType);
    if (sp.q) params.set("q", sp.q);
    if (changes.page) params.set("page", String(changes.page));
    return `/explore?${params.toString()}`;
  };
  const baseTitle = type
    ? t.placeTypes[type]
    : t.cats[sp.category as keyof typeof t.cats] ?? t.destinations;
  const provinceTitle = province ? (lang === "km" ? province.name_km : province.name_en) : sp.province?.replaceAll("-", " ");
  const title = provinceTitle
    ? `${provinceTitle} · ${baseTitle}`
    : sp.q && !sp.category && !type ? t.searchTitle
    : sp.category ? baseTitle
    : type ? baseTitle
    : t.directoryTitle;
  const currentContext = provinceTitle
    ?? (sp.category ? t.cats[sp.category as keyof typeof t.cats] ?? sp.category : undefined)
    ?? (type ? t.placeTypes[type] : undefined)
    ?? (sp.q ? t.searchTitle : t.destinations);

  return (
    <Shell lang={lang} q={sp.q} active={sp.province} type={type ?? ""} variant="results">
      <header className="browse-heading directory-heading">
        <nav className="detail-breadcrumb" aria-label={lang === "km" ? "ទីតាំងបច្ចុប្បន្ន" : "Breadcrumb"}>
          <Link href={`/?lang=${lang}`}>{t.home}</Link><span aria-hidden="true">›</span>
          <span aria-current="page">{currentContext}</span>
        </nav>
        <h1>{title}</h1>
        <p>{isBrowsing ? t.browseIntro : t.directoryIntro}</p>
        {sp.q && <p className="browse-query">{t.selectedSearch}: <strong>{sp.q}</strong></p>}
      </header>

      <div className="browse-toolbar">
        <nav className="place-type-filters" aria-label={t.browseByType}>
          <Link href={browseHref({ type: "" })} className={!type ? "active" : ""} aria-current={!type ? "page" : undefined}>{t.allTypes}</Link>
          {Object.entries(t.placeTypes).map(([value, label]) => (
            <Link key={value} href={browseHref({ type: value })} className={type === value ? "active" : ""} aria-current={type === value ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        {isBrowsing && <Link className="clear-filters" href={`/explore?lang=${lang}`}>{t.clearFilters}</Link>}
      </div>

      <div className="section-head browse-results-head">
        <h2>{t.results}</h2>
        <span>{result.total}</span>
      </div>
      {places.length === 0 ? (
        <p className="region-empty">{type ? t.noListings : t.none}</p>
      ) : (
        <div className="review-grid">
          {places.map((place) => (
            <PlaceCard key={place.slug} place={place} lang={lang} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <nav className="pagination" aria-label={lang === "km" ? "ការបែងចែកទំព័រ" : "Pagination"}>
          {result.page > 1 && <Link href={browseHref({ page: result.page - 1 })}>{t.previous}</Link>}
          <span aria-current="page">{t.pageOf} {result.page} / {totalPages}</span>
          {result.page < totalPages && <Link href={browseHref({ page: result.page + 1 })}>{t.next}</Link>}
        </nav>
      )}
    </Shell>
  );
}
