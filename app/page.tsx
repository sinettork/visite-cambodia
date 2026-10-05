import Shell from "@/components/Shell";
import PlaceCard from "@/components/PlaceCard";
import { getPlaces } from "@/lib/queries";
import { T, getLang } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ lang?: string; q?: string; province?: string; category?: string }>;
}) {
  const sp = await searchParams;
  const lang = getLang(sp.lang);
  const t = T[lang];
  const places = await getPlaces({ province: sp.province, category: sp.category, q: sp.q });
  const title = t.cats[sp.category as keyof typeof t.cats] ?? t.destinations;

  return (
    <Shell lang={lang} q={sp.q} active={sp.province}>
      <div className="section-head">
        <h2>{title}</h2>
        <span style={{ fontSize: 12, color: "#999" }}>{places.length}</span>
      </div>

      {places.length === 0 ? (
        <p>{t.none}</p>
      ) : (
        <div className="review-grid">
          {places.map((place) => (
            <PlaceCard
              key={place.slug}
              place={place}
              lang={lang}
              categoryLabel={t.cats[place.category as keyof typeof t.cats] ?? place.category}
            />
          ))}
        </div>
      )}
    </Shell>
  );
}
