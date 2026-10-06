import type { Metadata } from "next";
import Link from "next/link";
import Shell from "@/components/Shell";
import { sampleItineraries } from "@/lib/data/itineraries-data";
import { getLang, pick, T } from "@/lib/i18n";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = getLang((await searchParams).lang);
  const t = T[lang];
  return {
    title: `${t.itineraries} | Visit Cambodia`,
    description: t.itinerariesIntro,
    alternates: { canonical: `/itineraries?lang=${lang}` },
  };
}

export default async function ItinerariesPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = getLang((await searchParams).lang);
  const t = T[lang];

  return (
    <Shell lang={lang} variant="itineraries">
      <div className="itineraries-container">
        <header className="page-header-block">
          <h1>{t.itinerariesTitle}</h1>
          <p className="page-header-intro">{t.itinerariesIntro}</p>
        </header>

        <div className="itinerary-cards-grid">
          {sampleItineraries.map((itinerary) => {
            const title = pick(itinerary, "title", lang);
            const subtitle = pick(itinerary, "subtitle", lang);
            const duration = pick(itinerary, "duration", lang);
            const region = pick(itinerary, "region", lang);
            const bestTime = pick(itinerary, "best_time", lang);
            const overview = pick(itinerary, "overview", lang);
            const transport = pick(itinerary, "transport", lang);

            return (
              <article key={itinerary.id} className="itinerary-card" id={itinerary.slug}>
                {itinerary.image_url && (
                  <div className="itinerary-card-hero">
                    <img src={itinerary.image_url} alt={title} loading="lazy" />
                    <div className="itinerary-hero-badge">
                      <span>{duration}</span>
                    </div>
                  </div>
                )}

                <div className="itinerary-card-body">
                  <div className="itinerary-summary-table-wrap">
                    <table className="itinerary-summary-table">
                      <thead>
                        <tr>
                          <th>{lang === "km" ? "តំបន់" : "Destination"}</th>
                          <th>{lang === "km" ? "រដូវសមស្រប" : "Best time"}</th>
                          <th>{lang === "km" ? "ចំណាយប្រហែល" : "Estimated cost"}</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{region}</td>
                          <td>{bestTime}</td>
                          <td>{itinerary.estimated_cost_usd}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2>{title}</h2>
                  <p className="itinerary-subtitle">{subtitle}</p>
                  <p className="itinerary-overview">{overview}</p>

                  <div className="itinerary-transport-box">
                    <strong><i className="fa-solid fa-van-shuttle" aria-hidden="true" /> {lang === "km" ? "មធ្យោបាយធ្វើដំណើរ៖" : "Recommended transport:"}</strong> {transport}
                  </div>

                  <div className="itinerary-timeline">
                    <h3>{lang === "km" ? "កាលវិភាគលម្អិតតាមថ្ងៃ" : "Day-by-Day Itinerary"}</h3>
                    <div className="itinerary-days-list">
                      {itinerary.days.map((day) => {
                        const dayTitle = pick(day, "title", lang);
                        const dayDesc = pick(day, "description", lang);
                        const highlights = lang === "km" ? day.highlights_km : day.highlights_en;

                        return (
                          <div key={day.day} className="itinerary-day-item">
                            <div className="itinerary-day-num">{day.day}</div>
                            <div className="itinerary-day-content">
                              <h4>{dayTitle}</h4>
                              <p>{dayDesc}</p>
                              <div className="itinerary-highlights">
                                <strong>{lang === "km" ? "ចំណុចសំខាន់ៗ៖" : "Highlights:"}</strong>
                                <ul>
                                  {highlights.map((h, idx) => (
                                    <li key={idx}>{h}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="itinerary-card-footer">
                    <Link href={`/explore?lang=${lang}`} className="btn-explore-places">
                      {lang === "km" ? `ស្វែងរកទីកន្លែងក្នុង ${region}` : `Explore places in ${region}`} <i className="fa-solid fa-arrow-right" aria-hidden="true" style={{ fontSize: "0.85em", marginLeft: 4 }} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </Shell>
  );
}
