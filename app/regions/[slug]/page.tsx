import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PlaceCard from "@/components/PlaceCard";
import ProvinceHero from "@/components/ProvinceHero";
import Shell from "@/components/Shell";
import { getLang, pick, T } from "@/lib/i18n";
import { getPlaces, getProvinceGuide } from "@/lib/queries";
import type { Place } from "@/lib/types/place";

export async function generateMetadata({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLang((await searchParams).lang);
  const guide = await getProvinceGuide(slug);
  if (!guide) return { title: "Province not found" };
  const name = pick(guide, "name", lang);
  const description = pick(guide, "overview", lang);
  return {
    title: `${name} Travel Guide`,
    description,
    alternates: { canonical: `/regions/${guide.slug}?lang=${lang}` },
    openGraph: { title: `${name} Travel Guide | Visit Cambodia`, description },
  };
}

export default async function RegionPage({ params, searchParams }: {
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
  const name = pick(guide, "name", lang);
  return (
    <Shell lang={lang} active={slug} variant="region">
      <nav className="detail-breadcrumb" aria-label={lang === "km" ? "ទីតាំងបច្ចុប្បន្ន" : "Breadcrumb"}>
        <Link href={`/explore?lang=${lang}`}>{t.destinations}</Link><span aria-hidden="true">›</span>
        <span aria-current="page">{name}</span>
      </nav>
      <ProvinceHero guide={guide} lang={lang} disclaimer={t.guideDisclaimer} />
      <nav className="region-jump-nav" aria-label={lang === "km" ? "មើលតាមប្រភេទ" : "Jump to section"}>
        {sections.map((section) => {
          const icon = section.type === "attraction" ? "fa-compass" : section.type === "accommodation" ? "fa-bed" : "fa-utensils";
          return (
            <a key={section.type} href={`#region-${section.type}`}>
              <i className={`fa-solid ${icon}`} aria-hidden="true" />
              <span>{section.title}</span>
            </a>
          );
        })}
      </nav>
      {sections.map((section) => (
        <section className="region-section" id={`region-${section.type}`} key={section.type}>
          <div className="section-head"><h2>{section.title}</h2><Link href={`/explore?lang=${lang}&province=${slug}&type=${section.type}`}>{t.all} ›</Link></div>
          <p className="region-section-intro">{section.intro}</p>
          {section.places.length ? <div className="review-grid">{section.places.slice(0, 3).map((place) => <PlaceCard key={place.slug} place={place} lang={lang} />)}</div> : (
            <div className="region-empty-state">
              <p className="region-empty">{t.noListings}</p>
              <Link href={`/explore?lang=${lang}&type=${section.type}`}>{lang === "km" ? `មើល ${t.placeTypes[section.type]} ទាំងអស់` : `Browse all ${t.placeTypes[section.type]}`} ›</Link>
            </div>
          )}
        </section>
      ))}
      {guide.source_urls && (
        <section className="guide-sources" aria-label={t.sources}>
          <h2>{t.sources}</h2>
          <ul>
            {guide.source_urls.split(/\r?\n/).filter((url) => url.startsWith("https://")).map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">{new URL(url).hostname.replace(/^www\./, "")}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Shell>
  );
}
