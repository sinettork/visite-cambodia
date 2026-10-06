import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Shell from "@/components/Shell";
import PlaceCard from "@/components/PlaceCard";
import { getProvinceBannerImage } from "@/components/ProvinceHero";
import { getLang, T } from "@/lib/i18n";
import { getPopular, getProvinces } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = getLang((await searchParams).lang);
  const t = T[lang];
  return {
    title: lang === "km" ? "ស្វែងយល់ពីកម្ពុជា" : "Discover Cambodia",
    description: t.homeIntro,
    alternates: { canonical: `/?lang=${lang}` },
  };
}

export default async function Home({ searchParams }: {
  searchParams: Promise<{ lang?: string; q?: string; province?: string; category?: string; type?: string; page?: string }>;
}) {
  const params = await searchParams;
  const lang = getLang(params.lang);
  const searchKeys = ["q", "province", "category", "type", "page"] as const;
  if (searchKeys.some((key) => params[key])) {
    const next = new URLSearchParams({ lang });
    for (const key of searchKeys) if (params[key]) next.set(key, params[key]!);
    redirect(`/explore?${next.toString()}`);
  }
  const t = T[lang];
  const [places, provinces] = await Promise.all([getPopular(6), getProvinces()]);

  return (
    <Shell lang={lang} variant="home">
      <header className="home-hero">
        <img src="/images/angkor-wat-header.jpg" alt="Angkor Wat temple landscape" fetchPriority="high" />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="home-hero-content">
          <h1>{t.homeTitle}</h1>
          <p>{t.homeIntro}</p>
          <div className="home-hero-links">
            <Link href={`/explore?lang=${lang}`} className="home-primary-link">{t.homeExplore} <span aria-hidden="true">›</span></Link>
            <Link href={`/itineraries?lang=${lang}`} className="home-secondary-link">{t.itineraries}</Link>
            <Link href={`/events?lang=${lang}`} className="home-secondary-link">{t.events}</Link>
            <Link href={`/map?lang=${lang}`} className="home-secondary-link">{lang === "km" ? "មើលផែនទី" : "Open map"}</Link>
          </div>
        </div>
      </header>

      {/* Quick Feature Spotlight Grid */}
      <section className="home-spotlight-section">
        <div className="home-spotlight-grid">
          <Link href={`/itineraries?lang=${lang}`} className="home-spotlight-card">
            <span className="spotlight-icon"><i className="fa-solid fa-route" aria-hidden="true" /></span>
            <div>
              <h3>{t.itineraries}</h3>
              <p>{lang === "km" ? "គំរូដំណើរកម្សាន្ត ៣-៤ ថ្ងៃ សម្រាប់សៀមរាប តំបន់ឆ្នេរ និងឦសាន" : "Curated 2-4 day itineraries for Angkor, Coast & Highland treks"}</p>
            </div>
          </Link>
          <Link href={`/events?lang=${lang}`} className="home-spotlight-card">
            <span className="spotlight-icon"><i className="fa-solid fa-calendar-days" aria-hidden="true" /></span>
            <div>
              <h3>{t.events}</h3>
              <p>{lang === "km" ? "ប្រតិទិនពិធីបុណ្យជាតិ ចូលឆ្នាំខ្មែរ ភ្ជុំបិណ្ឌ និងបុណ្យអុំទូក" : "Festivals calendar: Khmer New Year, Pchum Ben & Water Festival"}</p>
            </div>
          </Link>
          <Link href={`/tools?lang=${lang}`} className="home-spotlight-card">
            <span className="spotlight-icon"><i className="fa-solid fa-toolbox" aria-hidden="true" /></span>
            <div>
              <h3>{t.tools}</h3>
              <p>{lang === "km" ? "ឧបករណ៍ប្តូរប្រាក់ USD ↔ KHR ឃ្លាសន្ទនា និងលេខសង្គ្រោះបន្ទាន់" : "USD ↔ KHR converter, phrasebook & emergency directory"}</p>
            </div>
          </Link>
        </div>
      </section>

      {places.length > 0 && (
        <section className="home-featured-section" aria-labelledby="home-featured-title">
          <div className="section-head">
            <div>
              <h2 id="home-featured-title">{t.homeFeatured}</h2>
              <p>{t.homeFeaturedIntro}</p>
            </div>
            <Link href={`/explore?lang=${lang}`}>{t.homeExplore} ›</Link>
          </div>
          <div className="review-grid">
            {places.map((place) => <PlaceCard key={place.slug} place={place} lang={lang} />)}
          </div>
        </section>
      )}

      {provinces.length > 0 && (
        <section className="home-regions-section" aria-labelledby="home-regions-title">
          <div className="section-head">
            <h2 id="home-regions-title">{t.homeRegions}</h2>
            <Link href={`/explore?lang=${lang}#province-list`}>{t.homeAllRegions} ›</Link>
          </div>
          <div className="home-region-links">
            {provinces.map((province) => (
              <Link key={province.slug} href={`/regions/${province.slug}?lang=${lang}`}>
                <img src={getProvinceBannerImage(province.slug) ?? "/images/angkor-wat.svg"} alt="" loading="lazy" />
                <span className="home-region-name">{lang === "km" ? province.name_km : province.name_en}</span><span aria-hidden="true">›</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="home-editorial-links" aria-label={lang === "km" ? "ព័ត៌មានសម្រាប់ស្វែងយល់បន្ថែម" : "More to explore"}>
        <Link className="home-editorial-link home-food-link" href={`/food?lang=${lang}`}>
          <img src="/images/food/fish-amok.jpg" alt="Khmer fish amok" loading="lazy" />
          <span><strong>{t.homeFoodTitle}</strong><small>{t.homeFoodIntro}</small><b>{t.cats.food} ›</b></span>
        </Link>
        <aside className="home-official-note">
          <h2>{t.homeOfficial}</h2>
          <p>{t.homeOfficialIntro}</p>
          <Link href={`/laws?lang=${lang}`}>{lang === "km" ? "អានមគ្គុទ្ទេសក៍ច្បាប់ និងប្រភពឯកសារ" : "Read law guides and source notes"} ›</Link>
        </aside>
      </section>
    </Shell>
  );
}
