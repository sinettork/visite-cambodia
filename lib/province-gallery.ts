import "server-only";

export type ProvinceGallerySlide = {
  image: string;
  alt: string;
  label: string;
  credit: string;
  source: string;
  license: string;
};

export const provinceHighlights: Record<string, string[]> = {
  "banteay-meanchey": ["Banteay Chhmar", "Ang Trapeang Thmor", "Phnom Svay"],
  battambang: ["Phnom Sampeau", "Bamboo Train", "Wat Ek Phnom"],
  "kampong-cham": ["Kizuna Bridge", "Wat Nokor Bachey", "Koh Pen"],
  "kampong-chhnang": ["Phnom Kong Rei", "Floating village", "Wat Kampong Tralach Leu"],
  "kampong-speu": ["Kirirom National Park", "Aural Mountain", "Chbar Mon"],
  "kampong-thom": ["Sambor Prei Kuk", "Phnom Santuk", "Stung Saen"],
  kampot: ["Bokor National Park", "Kampot Pepper", "Kampot River"],
  kandal: ["Oudong", "Koh Dach", "Ta Khmau"],
  "koh-kong": ["Tatai Waterfall", "Tatai River", "Cardamom Mountains"],
  kratie: ["Irrawaddy dolphins", "Koh Trong", "Phnom Sombok"],
  mondulkiri: ["Bou Sra Waterfall", "Sen Monorom", "Sea Forest"],
  pailin: ["Phnom Yat", "Pailin Waterfall", "Pailin Independence Monument"],
  "phnom-penh": ["Royal Palace Phnom Penh", "Wat Phnom", "National Museum Cambodia"],
  "preah-sihanouk": ["Koh Rong", "Koh Rong Sanloem", "Otres Beach"],
  "preah-vihear": ["Preah Vihear Temple", "Koh Ker", "Phnom Tbeng"],
  "prey-veng": ["Ba Phnom", "Neak Loeung", "Prey Veng"],
  pursat: ["Sampov Meas Island", "Pursat River", "Cardamom Mountains"],
  ratanakiri: ["Yeak Laom Lake", "Kachanh Waterfall", "Ka Tieng Waterfall"],
  "siem-reap": ["Angkor Wat", "Angkor Thom", "Ta Prohm"],
  "stung-treng": ["Mekong River Stung Treng", "Sopheakmit Waterfall", "Ramsar Wetlands"],
  "svay-rieng": ["Bavet", "Svay Rieng", "Bavet Border"],
  takeo: ["Phnom Chisor", "Angkor Borei", "Tonle Bati"],
  "tboung-khmum": ["Memot Earthworks", "Kroeng Sray", "Kroch Chhmar"],
  "oddar-meanchey": ["Anlong Veng", "Ta Muen Thom", "Dangrek Mountains"],
  kep: ["Kep National Park", "Kep Crab Market", "Koh Tonsay"],
};

function cleanText(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function fileSource(title: string): string {
  return "https://commons.wikimedia.org/wiki/" + encodeURIComponent(title.replace(/\s+/g, "_"));
}

async function searchCommonsImage(query: string): Promise<ProvinceGallerySlide | null> {
  const params = new URLSearchParams({
    action: "query",
    generator: "search",
    gsrsearch: query + " Cambodia",
    gsrnamespace: "6",
    gsrlimit: "8",
    prop: "imageinfo",
    iiprop: "url|extmetadata",
    iiurlwidth: "1600",
    format: "json",
    origin: "*",
  });

  try {
    const response = await fetch("https://commons.wikimedia.org/w/api.php?" + params.toString(), {
      next: { revalidate: 60 * 60 * 24 * 30 },
      signal: AbortSignal.timeout(7000),
    });
    if (!response.ok) return null;
    const payload = await response.json();
    const pages = Object.values(payload?.query?.pages ?? {}) as Array<any>;

    for (const page of pages) {
      const info = page?.imageinfo?.[0];
      if (!info?.thumburl && !info?.url) continue;
      if (info?.mime && (!String(info.mime).startsWith("image/") || info.mime === "image/svg+xml")) continue;
      if (!Number.isFinite(info.width) || !Number.isFinite(info.height) || info.width / info.height < 1.4) continue;

      const title = String(page?.title ?? "").replace(/^File:/, "");
      const meta = info?.extmetadata ?? {};
      const credit = cleanText(meta.Artist?.value || meta.Credit?.value || "Wikimedia Commons");
      const license = cleanText(meta.LicenseShortName?.value || "See source");
      return {
        image: info.thumburl || info.url,
        alt: cleanText(meta.ImageDescription?.value) || title,
        label: query,
        credit,
        source: fileSource(page?.title ?? ""),
        license,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export async function getProvinceGallery(
  slug: string,
  hero?: Omit<ProvinceGallerySlide, "label"> | null,
  useHeroOnly = false,
): Promise<ProvinceGallerySlide[]> {
  const highlights = provinceHighlights[slug] ?? [];
  const fetched = useHeroOnly ? [] : await Promise.all(highlights.map(searchCommonsImage));
  const gallery = hero
    ? [{ ...hero, label: hero.alt.split(" in ")[0] || hero.alt }, ...fetched.filter(Boolean)]
    : (fetched.filter(Boolean) as ProvinceGallerySlide[]);

  const unique = new Map<string, ProvinceGallerySlide>();
  for (const slide of gallery) {
    if (!slide?.image || unique.has(slide.image)) continue;
    unique.set(slide.image, slide);
  }
  return Array.from(unique.values());
}