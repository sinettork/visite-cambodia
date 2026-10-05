import { notFound } from "next/navigation";
import Link from "next/link";
import PlaceCard from "@/components/PlaceCard";
import Shell from "@/components/Shell";
import { getLang, pick, T } from "@/lib/i18n";
import { getPlaces, getProvinceGuide } from "@/lib/queries";
import type { Place } from "@/lib/types/place";

export const dynamic = "force-dynamic";

export default async function RegionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const [{ slug }, search] = await Promise.all([params, searchParams]);
  const lang = getLang(search.lang);
  const t = T[lang];
  const guide = await getProvinceGuide(slug);
  if (!guide) notFound();

  const [attractions, stays, restaurants] = await Promise.all([
    getPlaces({ province: slug, type: "attraction" }),
    getPlaces({ province: slug, type: "accommodation" }),
    getPlaces({ province: slug, type: "restaurant" }),
  ]);

  const sections: Array<{ type: Place["listing_type"]; title: string; intro: string; places: Place[] }> = [
    { type: "attraction", title: t.thingsToDo, intro: pick(guide, "attractions", lang), places: attractions },
    { type: "accommodation", title: t.whereToStay, intro: pick(guide, "stay_guide", lang), places: stays },
    { type: "restaurant", title: t.whereToEat, intro: pick(guide, "food_guide", lang), places: restaurants },
  ];

  return (
    <Shell lang={lang} active={slug}>
      <div className="region-intro">
        <span className="region-eyebrow">{t.provinces}</span>
        <h1>{pick(guide, "name", lang)}</h1>
        <p>{pick(guide, "overview", lang)}</p>
        <p className="region-disclaimer">{t.guideDisclaimer}</p>
      </div>

      {sections.map((section) => (
        <section className="region-section" key={section.type}>
          <div className="section-head">
            <h2>{section.title}</h2>
            <Link href={`/?lang=${lang}&province=${slug}&type=${section.type}`}>
              {t.all} ›
            </Link>
          </div>
          <p className="region-section-intro">{section.intro}</p>
          {section.places.length ? (
            <div className="review-grid">
              {section.places.slice(0, 3).map((place) => (
                <PlaceCard
                  key={place.slug}
                  place={place}
                  lang={lang}
                  categoryLabel={section.type === "attraction"
                    ? t.cats[place.category as keyof typeof t.cats] ?? place.category
                    : t.placeTypes[section.type]}
                />
              ))}
            </div>
          ) : (
            <p className="region-empty">{t.noListings}</p>
          )}
        </section>
      ))}
    </Shell>
  );
}
