import Link from "next/link";
import Shell from "@/components/Shell";
import PlaceCard from "@/components/PlaceCard";
import { getPlaces } from "@/lib/queries";
import { T, getLang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ lang?: string; q?: string; province?: string; category?: string; type?: string }>;
}) {
  const sp = await searchParams;
  const lang = getLang(sp.lang);
  const t = T[lang];
  const type = sp.type === "attraction" || sp.type === "accommodation" || sp.type === "restaurant"
    ? sp.type
    : undefined;
  const places = await getPlaces({ province: sp.province, category: sp.category, type, q: sp.q });
  const title = type
    ? t.placeTypes[type]
    : t.cats[sp.category as keyof typeof t.cats] ?? t.destinations;

  return (
    <Shell lang={lang} q={sp.q} active={sp.province} type={type ?? ""}>
      <div className="section-head">
        <h2>{title}</h2>
        <span style={{ fontSize: 12, color: "#999" }}>{places.length}</span>
      </div>

      <nav className="place-type-filters" aria-label={t.browseByType}>
        {Object.entries(t.placeTypes).map(([value, label]) => (
          <Link
            key={value}
            href={`/?lang=${lang}&type=${value}${sp.province ? `&province=${sp.province}` : ""}`}
            className={type === value ? "active" : ""}
          >
            {label}
          </Link>
        ))}
      </nav>

      {places.length === 0 ? (
        <p>{type ? t.noListings : t.none}</p>
      ) : (
        <div className="review-grid">
          {places.map((place) => (
            <PlaceCard
              key={place.slug}
              place={place}
              lang={lang}
              categoryLabel={place.listing_type === "attraction"
                ? t.cats[place.category as keyof typeof t.cats] ?? place.category
                : t.placeTypes[place.listing_type]}
            />
          ))}
        </div>
      )}
    </Shell>
  );
}
