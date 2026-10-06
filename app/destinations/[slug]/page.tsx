import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import PlaceCard from "@/components/PlaceCard";
import FavoriteButton from "@/components/FavoriteButton";
import PlaceGuide from "@/components/PlaceGuide";
import { getNearbyPlaces, getPlace } from "@/lib/queries";
import { T, getLang, pick } from "@/lib/i18n";

export async function generateMetadata({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const lang = getLang((await searchParams).lang);
  const place = await getPlace(slug);
  if (!place) return { title: "Destination not found" };
  const name = pick(place, "name", lang);
  const description = pick(place, "summary", lang) || `Discover ${name} in Cambodia.`;
  return {
    title: name,
    description,
    alternates: { canonical: `/destinations/${place.slug}?lang=${lang}` },
    openGraph: { title: `${name} | Visit Cambodia`, description, type: "article",
      ...(place.image_url ? { images: [{ url: place.image_url, alt: name }] } : {}) },
  };
}

export default async function PlacePage({ params, searchParams }: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const lang = getLang((await searchParams).lang);
  const t = T[lang];
  const p = await getPlace(slug);
  if (!p) notFound();
  const nearby = await getNearbyPlaces(slug);
  const name = pick(p, "name", lang);
  const summary = pick(p, "summary", lang);
  const detailedDescription = pick(p.guide ?? {}, "about", lang) || summary;
  const ticketStatus = p.ticket_status ?? (p.ticket_usd ? "check" : "unknown");
  const ticketLabel = ticketStatus === "free"
    ? t.ticketFree
    : ticketStatus === "check"
      ? `${p.ticket_usd ? `$${p.ticket_usd} — ` : ""}${t.ticketCheck}`
      : t.ticketUnknown;
  const heroImage = p.image_url ?? ({
    "angkor-wat": "/images/angkor-wat-header.jpg",
    "angkor-thom": "/images/angkor-wat-header.jpg",
    "kep-crab-market": "/images/food/kampot-pepper-crab.jpg",
  }[p.slug] ?? null);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": p.listing_type === "restaurant" ? "Restaurant" : p.listing_type === "accommodation" ? "LodgingBusiness" : "TouristAttraction",
    name, description: detailedDescription,
    ...(p.image_url ? { image: [p.image_url] } : {}),
    ...(p.lat && p.lng ? { geo: { "@type": "GeoCoordinates", latitude: Number(p.lat), longitude: Number(p.lng) } } : {}),
    ...(p.open_hours ? { openingHours: p.open_hours } : {}),
  };
  return (
    <Shell lang={lang} active={p.province_slug} variant="place">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="detail-breadcrumb" aria-label={lang === "km" ? "ទីតាំងបច្ចុប្បន្ន" : "Breadcrumb"}>
        <Link href={`/explore?lang=${lang}`}>{t.destinations}</Link><span aria-hidden="true">›</span>
        <Link href={`/regions/${p.province_slug}?lang=${lang}`}>{pick({ n_km: p.province_km, n_en: p.province_en }, "n", lang)}</Link>
        <span aria-hidden="true">›</span><span aria-current="page">{name}</span>
      </nav>
      <header
        className={`destination-hero destination-hero-${p.category}`}
        aria-labelledby="destination-title"
      >
        {heroImage && <img src={heroImage} alt="" fetchPriority="high" />}
        <div className="destination-hero-shade" aria-hidden="true" />
        <div className="destination-hero-content">
          <h1 id="destination-title">{name}</h1>
        </div>
        <FavoriteButton slug={p.slug} lang={lang} size="large" className="destination-hero-favorite" />
      </header>
      {summary && <p className="destination-summary">{summary}</p>}
      <table className="spec-table"><tbody>
        <tr><th>{t.province}</th><td>{pick({ n_km: p.province_km, n_en: p.province_en }, "n", lang)}</td></tr>
        {p.listing_type === "attraction" && <tr><th>{t.ticket}</th><td>{ticketLabel}</td></tr>}
        {p.open_hours && <tr><th>{t.hours}</th><td>{p.open_hours}</td></tr>}
      </tbody></table>
      {p.guide && (
        <nav className="place-jump-nav" aria-label={lang === "km" ? "មាតិកាទីតាំង" : "Place sections"}>
          <a href="#place-guide-title">{t.aboutPlace}</a>
          {p.guide.history_km || p.guide.history_en ? <a href="#place-history">{t.destinationHistory}</a> : null}
          {p.guide.highlights_km || p.guide.highlights_en ? <a href="#place-highlights">{t.destinationHighlights}</a> : null}
          {p.guide.visit_plan_km || p.guide.visit_plan_en ? <a href="#place-plan">{t.planYourVisit}</a> : null}
          {p.guide.tips_km || p.guide.tips_en ? <a href="#place-tips">{t.travelerTips}</a> : null}
          {p.guide.source_urls ? <a href="#place-sources">{t.sources}</a> : null}
        </nav>
      )}

      {p.guide && (
        <PlaceGuide
          place={p}
          lang={lang}
          labels={{
            about: t.aboutPlace,
            history: t.destinationHistory,
            highlights: t.destinationHighlights,
            plan: t.planYourVisit,
            tips: t.travelerTips,
            sources: t.sources,
          }}
        />
      )}

      <div className="destination-actions">
        {p.lat && p.lng && (
          <a
            className="destination-map-link"
            href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=15/${p.lat}/${p.lng}`}
            target="_blank"
            rel="noreferrer"
          >
            <i className="fa-solid fa-location-dot" aria-hidden="true" /> {t.map}
          </a>
        )}
        <Link className="destination-region-link" href={`/regions/${p.province_slug}?lang=${lang}`}>
          <i className="fa-solid fa-compass" aria-hidden="true" /> {t.moreInRegion}
        </Link>
      </div>
      <p className="destination-disclaimer"><i className="fa-solid fa-circle-info" aria-hidden="true" /> <span>{t.guideDisclaimer}</span></p>
      {nearby.length > 0 && <section className="region-section"><div className="section-head"><h2>{t.nearby}</h2></div><div className="review-grid">
        {nearby.map((place) => <PlaceCard key={place.slug} place={place} lang={lang} />)}
      </div></section>}
    </Shell>
  );
}
