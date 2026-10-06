import { pick, type Lang } from "@/lib/i18n";
import type { Place } from "@/lib/types/place";

export default function PlaceGuide({
  place,
  lang,
  labels,
}: {
  place: Place;
  lang: Lang;
  labels: {
    about: string;
    history: string;
    highlights: string;
    plan: string;
    tips: string;
    sources: string;
  };
}) {
  const guide = place.guide;
  if (!guide) return null;

  const name = pick(place, "name", lang);
  const about = pick(guide, "about", lang);
  const history = pick(guide, "history", lang);
  const highlights = pick(guide, "highlights", lang);
  const plan = pick(guide, "visit_plan", lang);
  const tips = pick(guide, "tips", lang);

  return (
    <section className="place-editorial" aria-labelledby="place-guide-title">
      <div className="section-head">
        <h2 id="place-guide-title">{labels.about} {name}</h2>
      </div>

      {about && (
        <div className="place-editorial-lead">
          <p>{about}</p>
        </div>
      )}

      <div className="place-editorial-grid">
        {history && (
          <article id="place-history" className="place-editorial-item">
            <span className="place-editorial-index">01</span>
            <div>
              <h3>{labels.history}</h3>
              <p>{history}</p>
            </div>
          </article>
        )}

        {highlights && (
          <article id="place-highlights" className="place-editorial-item">
            <span className="place-editorial-index">02</span>
            <div>
              <h3>{labels.highlights}</h3>
              <p>{highlights}</p>
            </div>
          </article>
        )}

        {plan && (
          <article id="place-plan" className="place-editorial-item">
            <span className="place-editorial-index">03</span>
            <div>
              <h3>{labels.plan}</h3>
              <p>{plan}</p>
            </div>
          </article>
        )}

        {tips && (
          <article id="place-tips" className="place-editorial-item">
            <span className="place-editorial-index">04</span>
            <div>
              <h3>{labels.tips}</h3>
              <p>{tips}</p>
            </div>
          </article>
        )}
      </div>

      {guide.source_urls && (
        <div className="place-editorial-sources">
          <h3>{labels.sources}</h3>
          <ul>
            {guide.source_urls
              .split(/\r?\n/)
              .filter((url) => url.startsWith("https://"))
              .map((url) => {
                const host = new URL(url).hostname.replace(/^www\./, "");
                return (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noreferrer">{host}</a>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </section>
  );
}
