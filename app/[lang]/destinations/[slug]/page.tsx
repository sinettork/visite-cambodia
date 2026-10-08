import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import PlaceCard from "@/components/PlaceCard";
import FavoriteButton from "@/components/FavoriteButton";
import PlaceGuide from "@/components/PlaceGuide";
import { getNearbyPlaces, getPlace, getPlaces } from "@/lib/queries";
import { T, getLang, pick } from "@/lib/i18n";

export async function generateStaticParams() {
  return (await getPlaces({})).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, lang: routeLang } = await params;
  const lang = getLang(routeLang);
  const place = await getPlace(slug);
  if (!place) return { title: "Destination not found" };
  const name = pick(place, "name", lang);
  const description = pick(place, "summary", lang) || `Discover ${name} in Cambodia.`;
  return {
    title: name,
    description,
    alternates: { canonical: `/${lang}/destinations/${place.slug}` },
    openGraph: { title: `${name} | Visit Cambodia`, description, type: "article",
      ...(place.image_url ? { images: [{ url: place.image_url, alt: name }] } : {}) },
  };
}

export default async function PlacePage({ params }: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { slug, lang: routeLang } = await params;
  const lang = getLang(routeLang);
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
        <Link href={`/${lang}/explore`}>{t.destinations}</Link><span aria-hidden="true">›</span>
        <Link href={`/${lang}/regions/${p.province_slug}`}>{pick({ n_km: p.province_km, n_en: p.province_en }, "n", lang)}</Link>
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
        {p.listing_type === "attraction" && (
          <tr>
            <th>{t.ticket}</th>
            <td>
              {ticketLabel}
              {p.ticket_url && (
                <>{" · "}<a className="ticket-purchase-link" href={p.ticket_url} target="_blank" rel="noopener noreferrer">
                  {lang === "km"
                    ? `ទិញសំបុត្រ${p.ticket_provider ? `៖ ${p.ticket_provider}` : "ផ្លូវការ"} ↗`
                    : `Buy tickets${p.ticket_provider ? ` from ${p.ticket_provider}` : " from official site"} ↗`}
                </a></>
              )}
            </td>
          </tr>
        )}
        {p.open_hours && <tr><th>{t.hours}</th><td>{p.open_hours}</td></tr>}
        {pick(p, "access", lang) && <tr><th>{t.access}</th><td>{pick(p, "access", lang)}</td></tr>}
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
        <Link className="destination-region-link" href={`/${lang}/regions/${p.province_slug}`}>
          <i className="fa-solid fa-compass" aria-hidden="true" /> {t.moreInRegion}
        </Link>
      </div>
      {p.source_urls && p.source_urls.length > 0 && (
        <section className="place-sources" id="place-sources">
          <h2>{t.sources}</h2>
          <ul>{p.source_urls.map((url) => <li key={url}><a href={url} target="_blank" rel="noreferrer">{url}</a></li>)}</ul>
        </section>
      )}
      {nearby.length > 0 && <section className="region-section"><div className="section-head"><h2>{t.nearby}</h2></div><div className="review-grid">
        {nearby.map((place) => <PlaceCard key={place.slug} place={place} lang={lang} />)}
      </div></section>}
    </Shell>
  );
}
