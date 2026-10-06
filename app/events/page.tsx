import type { Metadata } from "next";
import Shell from "@/components/Shell";
import { sampleEvents } from "@/lib/data/events-data";
import { getLang, pick, T } from "@/lib/i18n";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = getLang((await searchParams).lang);
  const t = T[lang];
  return {
    title: `${t.events} | Visit Cambodia`,
    description: t.eventsIntro,
    alternates: { canonical: `/events?lang=${lang}` },
  };
}

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = getLang((await searchParams).lang);
  const t = T[lang];

  return (
    <Shell lang={lang} variant="editorial">
      <div className="events-container">
        <header className="page-header-block">
          <h1>{t.eventsTitle}</h1>
          <p className="page-header-intro">{t.eventsIntro}</p>
        </header>

        <div className="events-list">
          {sampleEvents.map((event) => {
            const title = pick(event, "title", lang);
            const month = pick(event, "month", lang);
            const dates = pick(event, "typical_dates", lang);
            const location = pick(event, "location", lang);
            const summary = pick(event, "summary", lang);
            const tips = pick(event, "visitor_tips", lang);
            const highlights = lang === "km" ? event.highlights_km : event.highlights_en;

            return (
              <article key={event.id} className="event-card" id={event.slug}>
                <div className="event-date-badge">
                  <span className="event-month">{month}</span>
                  <span className="event-dates">{dates}</span>
                </div>

                <div className="event-card-main">
                  <div className="event-meta-line">
                    <span className="event-location"><i className="fa-solid fa-location-dot" aria-hidden="true" /> {location}</span>
                    <span className="event-type-badge">
                      {event.type === "traditional"
                        ? lang === "km" ? "បុណ្យប្រពៃណី" : "Traditional"
                        : event.type === "national"
                        ? lang === "km" ? "បុណ្យជាតិ" : "National"
                        : lang === "km" ? "វប្បធម៌ទេសចរណ៍" : "Cultural Festival"}
                    </span>
                  </div>

                  <h2>{title}</h2>
                  <p className="event-summary">{summary}</p>

                  <div className="event-highlights-box">
                    <strong>{lang === "km" ? "កម្មវិធីសំខាន់ៗ និងទំនៀមទម្លាប់៖" : "Key Rituals & Activities:"}</strong>
                    <ul>
                      {highlights.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="event-tips-box">
                    <strong><i className="fa-solid fa-lightbulb" aria-hidden="true" /> {lang === "km" ? "គន្លឹះសម្រាប់អ្នកទេសចរ៖" : "Traveler Tips:"}</strong> {tips}
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
