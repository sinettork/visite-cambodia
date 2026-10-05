import type { ProvinceGuide } from "@/lib/types/place";
import { pick, type Lang } from "@/lib/i18n";

const verifiedProvinceImages: Record<string, {
  image: string;
  alt: string;
  credit: string;
  source: string;
  license: string;
  licenseUrl: string;
}> = {
  "siem-reap": {
    image: "/images/angkor-wat-header.jpg",
    alt: "Angkor temple landscape in Siem Reap Province",
    credit: "Chris",
    source: "https://commons.wikimedia.org/wiki/File:Angkor_panorama_banner.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  kep: {
    image: "/images/food/kep-crab-market.jpg",
    alt: "Pepper and spices at Kep Crab Market",
    credit: "PsamatheM",
    source: "https://commons.wikimedia.org/wiki/File:06-Kep_Crab_Market_Cambodia-nX-3.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
};

export default function ProvinceHero({ guide, lang, disclaimer }: {
  guide: ProvinceGuide;
  lang: Lang;
  disclaimer: string;
}) {
  const image = verifiedProvinceImages[guide.slug];
  const name = pick(guide, "name", lang);

  return (
    <header className={`province-hero${image ? " has-photo" : ""}`} aria-labelledby="province-title">
      {image && <img className="province-hero-image" src={image.image} alt={image.alt} fetchPriority="high" />}
      <div className="province-hero-shade" aria-hidden="true" />
      <div className="province-hero-copy">
        <span className="region-eyebrow">{lang === "km" ? "ខេត្ត/ក្រុង" : "Province guide"}</span>
        <h1 id="province-title">{name}</h1>
        <p>{pick(guide, "overview", lang)}</p>
        <p className="province-hero-disclaimer">{disclaimer}</p>
      </div>
      <div className={`province-identity${image ? " has-photo" : ""}`} role="img" aria-label={name}>
        {image ? <img src={image.image} alt="" /> : <span>{guide.name_km.slice(0, 1)}</span>}
      </div>
      {image && (
        <div className="province-photo-credit">
          <a href={image.source} target="_blank" rel="noreferrer">Photo: {image.credit}</a>
          <span aria-hidden="true"> · </span>
          <a href={image.licenseUrl} target="_blank" rel="noreferrer">{image.license}</a>
        </div>
      )}
    </header>
  );
}
