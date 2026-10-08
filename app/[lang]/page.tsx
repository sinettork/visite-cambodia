import Link from "next/link";
import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PlaceCard from "@/components/PlaceCard";
import { getProvinceBannerImage } from "@/components/ProvinceHero";
import DeferredImage from "@/components/DeferredImage";
import { getLang, T } from "@/lib/i18n";
import { getPopular, getProvinces } from "@/lib/queries";

export async function generateMetadata({ params }: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = getLang((await params).lang);
  const t = T[lang];
  return {
    title: lang === "km" ? "ស្វែងយល់ពីកម្ពុជា" : "Discover Cambodia",
    description: t.homeIntro,
    alternates: { canonical: `/${lang}` },
  };
}

export default async function Home({ params }: {
  params: Promise<{ lang: string }>;
}) {
  const lang = getLang((await params).lang);
  const t = T[lang];
  const [places, provinces] = await Promise.all([
    getPopular(6),
    getProvinces(),
  ]);

  return (
    <Shell lang={lang} variant="home">
      <header className="home-hero">
        <img src="/images/angkor-wat-header.jpg" alt="Angkor Wat temple landscape" fetchPriority="high" />
        <div className="home-hero-shade" aria-hidden="true" />
        <div className="home-hero-content">
          <h1>{t.homeTitle}</h1>
          <p>{t.homeIntro}</p>
          <div className="home-hero-links">
            <Link href={`/${lang}/explore`} className="home-primary-link">{t.homeExplore} <span aria-hidden="true">›</span></Link>
            <Link href={`/${lang}/itineraries`} className="home-secondary-link">{t.itineraries}</Link>
            <Link href={`/${lang}/events`} className="home-secondary-link">{t.events}</Link>
            <Link href={`/${lang}/map`} className="home-secondary-link">{lang === "km" ? "មើលផែនទី" : "Open map"}</Link>
          </div>
        </div>
      </header>

      {/* Quick Feature Spotlight Grid */}
      <section className="home-spotlight-section">
        <div className="home-spotlight-grid">
          <Link href={`/${lang}/itineraries`} className="home-spotlight-card">
            <span className="spotlight-icon"><i className="fa-solid fa-route" aria-hidden="true" /></span>
            <div>
              <h3>{t.itineraries}</h3>
              <p>{lang === "km" ? "ដំណើរកម្សាន្តតាមថ្ងៃ សម្រាប់គោលដៅសំខាន់ៗ។" : "Day-by-day plans for key destinations."}</p>
            </div>
          </Link>
          <Link href={`/${lang}/events`} className="home-spotlight-card">
            <span className="spotlight-icon"><i className="fa-solid fa-calendar-days" aria-hidden="true" /></span>
            <div>
              <h3>{t.events}</h3>
              <p>{lang === "km" ? "មើលព្រឹត្តិការណ៍ និងពិធីបុណ្យសំខាន់ៗ។" : "Key festivals and seasonal events."}</p>
            </div>
          </Link>
          <Link href={`/${lang}/tools`} className="home-spotlight-card">
            <span className="spotlight-icon"><i className="fa-solid fa-toolbox" aria-hidden="true" /></span>
            <div>
              <h3>{t.tools}</h3>
              <p>{lang === "km" ? "ប្តូរប្រាក់ ឃ្លាសន្ទនា និងលេខបន្ទាន់។" : "Currency, Khmer phrases and emergency contacts."}</p>
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
            <Link href={`/${lang}/explore`}>{t.homeExplore} ›</Link>
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
            <Link href={`/${lang}/explore#province-list`}>{t.homeAllRegions} ›</Link>
          </div>
          <div className="home-region-links">
            {provinces.map((province) => {
              const image = province.banner_image_url || getProvinceBannerImage(province.slug);
              return (
                <Link key={province.slug} href={`/${lang}/regions/${province.slug}`}>
                  {image && <DeferredImage src={image} alt="" />}
                  <span className="home-region-name">{lang === "km" ? province.name_km : province.name_en}</span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="home-editorial-links" aria-label={lang === "km" ? "ព័ត៌មានសម្រាប់ស្វែងយល់បន្ថែម" : "More to explore"}>
        <Link className="home-editorial-link home-food-link" href={`/${lang}/food`}>
          <img src="/images/food/fish-amok.jpg" alt="Khmer fish amok" loading="lazy" />
          <span><strong>{t.homeFoodTitle}</strong><small>{t.homeFoodIntro}</small><b>{t.cats.food} ›</b></span>
        </Link>
        <aside className="home-official-note">
          <h2>{t.homeOfficial}</h2>
          <p>{t.homeOfficialIntro}</p>
          <Link href={`/${lang}/laws`}>{lang === "km" ? "អានមគ្គុទ្ទេសក៍ច្បាប់ និងប្រភពឯកសារ" : "Read law guides and source notes"} ›</Link>
        </aside>
      </section>

    </Shell>
  );
}
