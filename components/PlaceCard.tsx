import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import type { Place } from "@/lib/types/place";
import FavoriteButton from "./FavoriteButton";

export default function PlaceCard({ place, lang }: {
  place: Pick<Place, "slug" | "image_url" | "name_km" | "name_en" | "province_km" | "province_en">;
  lang: Lang;
}) {
  const name = pick(place, "name", lang);
  return (
    <div className="review-card-wrapper">
      <Link href={`/destinations/${place.slug}?lang=${lang}`} className="review" aria-label={name}>
        <div className="review-thumb-wrapper">
          {place.image_url ? (
            <img src={place.image_url} alt="" loading="lazy" />
          ) : (
            <div className="review-thumb-empty" aria-hidden="true"><span>Visit Cambodia</span></div>
          )}
        </div>
        <h3>{name}</h3>
        <div className="review-meta">
          <span>
            <i className="fa-solid fa-location-dot" style={{ marginRight: 5, fontSize: "0.85em", opacity: 0.8 }} aria-hidden="true" />
            {pick({ n_km: place.province_km, n_en: place.province_en }, "n", lang)}
          </span>
        </div>
      </Link>
      <FavoriteButton slug={place.slug} lang={lang} className="card-favorite-btn" />
    </div>
  );
}
