import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import type { Place } from "@/lib/types/place";
import FavoriteButton from "./FavoriteButton";

export default function PlaceCard({ place, lang }: {
  place: Pick<Place, "slug" | "image_url" | "name_km" | "name_en" | "province_km" | "province_en" | "business_type">;
  lang: Lang;
}) {
  const name = pick(place, "name", lang);
  const businessType = place.business_type
    ? ({
        hotel: lang === "km" ? "សណ្ឋាគារ" : "Hotel",
        guest_house: lang === "km" ? "ផ្ទះសំណាក់" : "Guest house",
        restaurant: lang === "km" ? "ភោជនីយដ្ឋាន" : "Restaurant",
        cafe: lang === "km" ? "ហាងកាហ្វេ" : "Cafe",
        other: lang === "km" ? "អាជីវកម្ម" : "Business",
      } as const)[place.business_type]
    : null;
  return (
    <div className="review-card-wrapper">
      <Link href={`/${lang}/destinations/${place.slug}`} className="review" aria-label={name}>
        <div className="review-thumb-wrapper">
          {place.image_url ? (
            <img src={place.image_url} alt="" loading="lazy" />
          ) : (
            <div className="review-thumb-empty" aria-hidden="true"><span>Visit Cambodia</span></div>
          )}
        </div>
        <h3>{name}</h3>
        <div className="review-meta">
          {businessType && <span className="review-business-type">{businessType}</span>}
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
