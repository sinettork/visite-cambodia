import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PlaceCard from "@/components/PlaceCard";
import ProvinceHero from "@/components/ProvinceHero";
import ProvinceStory from "@/components/ProvinceStory";
import Shell from "@/components/Shell";
import { getLang, pick, T } from "@/lib/i18n";
import { getPlaces, getProvinces, getProvinceGuide } from "@/lib/queries";
import type { Place } from "@/lib/types/place";

export async function generateStaticParams() {
  return (await getProvinces()).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, lang: routeLang } = await params;
  const lang = getLang(routeLang);
  const guide = await getProvinceGuide(slug);
  if (!guide) return { title: "Province not found" };
  const name = pick(guide, "name", lang);
  const description = pick(guide, "overview", lang);
  return {
    title: `${name} Travel Guide`,
    description,
    alternates: { canonical: `/${lang}/regions/${guide.slug}` },
    openGraph: { title: `${name} Travel Guide | Visit Cambodia`, description },
  };
}

export default async function RegionPage({ params }: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug, lang: routeLang } = await params;
  const lang = getLang(routeLang);
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
  const googleMapsSearchUrl = (type: Place["listing_type"]) => {
    const category = type === "accommodation" ? "hotels"
      : type === "restaurant" ? "restaurants"
        : "tourist attractions";
    const query = `${category} in ${guide.name_en}, Cambodia`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  };
  const sourceLabel = (url: string) => {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "tourism.gov.kh") return lang === "km" ? "ក្រសួងទេសចរណ៍" : "Ministry of Tourism";
    if (host === "tourismcambodia.com") return "Tourism Cambodia";
    if (host === "whc.unesco.org") return "UNESCO World Heritage Centre";
    if (host === "wwf.org.kh") return "WWF Cambodia";
    if (host === "en.wikipedia.org") return "Wikipedia";
    return host;
  };
  return (
    <Shell lang={lang} active={slug} variant="region">
      <nav className="detail-breadcrumb" aria-label={lang === "km" ? "ទីតាំងបច្ចុប្បន្ន" : "Breadcrumb"}>
        <Link href={`/${lang}/explore`}>{t.destinations}</Link><span aria-hidden="true">›</span>
        <span aria-current="page">{name}</span>
      </nav>
      <ProvinceHero guide={guide} lang={lang} />
      <nav className="region-jump-nav" aria-label={lang === "km" ? "មើលផ្នែក" : "Jump to section"}>
        <a href="#province-about"><i className="fa-solid fa-book-open" aria-hidden="true" /><span>{t.aboutProvince}</span></a>
        <a href="#province-history"><i className="fa-solid fa-landmark" aria-hidden="true" /><span>{t.historyAndHeritage}</span></a>
        <a href="#province-culture"><i className="fa-solid fa-people-group" aria-hidden="true" /><span>{t.cultureLocalLife}</span></a>
        <a href="#province-plan"><i className="fa-solid fa-route" aria-hidden="true" /><span>{t.planYourVisit}</span></a>
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
      <ProvinceStory
        guide={guide}
        lang={lang}
        labels={{
          about: t.aboutProvince,
          history: t.historyAndHeritage,
          culture: t.cultureLocalLife,
          travel: t.planYourVisit,
        }}
      />
      {sections.map((section) => (
        <section className="region-section" id={`region-${section.type}`} key={section.type}>
          <div className="section-head">
            <h2>{section.title}</h2>
            {section.places.length > 0 && <Link href={`/${lang}/explore?province=${slug}&type=${section.type}`}>{t.all} ›</Link>}
          </div>
          {section.places.length > 0 ? (
            <>
              <p className="region-section-intro">{section.intro}</p>
              <div className="review-grid">{section.places.slice(0, 3).map((place) => <PlaceCard key={place.slug} place={place} lang={lang} />)}</div>
            </>
          ) : (
            <p className="region-section-intro">
              {lang === "km" ? "មិនទាន់មានបញ្ជីកន្លែងដែលបានផ្ទៀងផ្ទាត់នៅលើគេហទំព័រនេះទេ។" : "No verified listings are available on this site yet."}
            </p>
          )}
          <a className="region-google-maps-link" href={googleMapsSearchUrl(section.type)} target="_blank" rel="noopener noreferrer">
            <i className="fa-solid fa-map-location-dot" aria-hidden="true" />
            {section.places.length > 0
              ? lang === "km" ? `ស្វែងរក${section.title}បន្ថែមលើ Google Maps` : `Find more ${section.title.toLowerCase()} on Google Maps`
              : lang === "km" ? `ស្វែងរក${section.title}លើ Google Maps` : `Search ${section.title.toLowerCase()} on Google Maps`}
            <span aria-hidden="true">↗</span>
          </a>
        </section>
      ))}
      {guide.source_urls && (
        <section className="guide-sources" aria-label={t.sources}>
          <h2>{t.sources}</h2>
          <ul>
            {guide.source_urls.split(/\r?\n/).filter((url) => url.startsWith("https://")).map((url) => (
              <li key={url}>
                <a href={url} target="_blank" rel="noreferrer">{sourceLabel(url)}</a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </Shell>
  );
}
