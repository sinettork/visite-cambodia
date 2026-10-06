import { pick, type Lang } from "@/lib/i18n";
import type { ProvinceGuide } from "@/lib/types/place";

export default function ProvinceStory({
  guide,
  lang,
  labels,
}: {
  guide: ProvinceGuide;
  lang: Lang;
  labels: {
    about: string;
    history: string;
    culture: string;
    travel: string;
  };
}) {
  const name = pick(guide, "name", lang);
  const story = pick(guide, "story", lang);
  const history = pick(guide, "history", lang);
  const culture = pick(guide, "culture", lang);
  const travel = pick(guide, "travel", lang);

  if (!story && !history && !culture && !travel) return null;

  return (
    <section className="province-editorial" aria-labelledby="province-about-title">
      <div className="section-head">
        <h2 id="province-about-title">{labels.about} {name}</h2>
      </div>

      <div className="province-editorial-story">
        {story && <p>{story}</p>}
      </div>

      <div className="province-editorial-grid">
        {history && (
          <article id="province-history" className="province-editorial-item">
            <span className="province-editorial-index">01</span>
            <div>
              <h3>{labels.history}</h3>
              <p>{history}</p>
            </div>
          </article>
        )}

        {culture && (
          <article id="province-culture" className="province-editorial-item">
            <span className="province-editorial-index">02</span>
            <div>
              <h3>{labels.culture}</h3>
              <p>{culture}</p>
            </div>
          </article>
        )}

        {travel && (
          <article id="province-plan" className="province-editorial-item">
            <span className="province-editorial-index">03</span>
            <div>
              <h3>{labels.travel}</h3>
              <p>{travel}</p>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
