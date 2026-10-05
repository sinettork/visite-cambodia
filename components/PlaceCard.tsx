import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { pick } from "@/lib/i18n";
import type { Place } from "@/lib/types/place";

export default function PlaceCard({
  place,
  lang,
  categoryLabel,
}: {
  place: Pick<Place, "slug" | "image_url" | "name_km" | "name_en" | "province_km" | "province_en" | "category">;
  lang: Lang;
  categoryLabel: string;
}) {
  return (
    <Link href={`/destinations/${place.slug}?lang=${lang}`} className="review">
      <div className="review-thumb-wrapper">
        {place.image_url && <img src={place.image_url} alt={pick(place, "name", lang)} loading="lazy" />}
      </div>
      <h3>{pick(place, "name", lang)}</h3>
      <div className="review-meta">
        <span>{pick({ n_km: place.province_km, n_en: place.province_en }, "n", lang)}</span>
        <span>{categoryLabel}</span>
      </div>
    </Link>
  );
}
