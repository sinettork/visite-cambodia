import type { ProvinceGuide } from "@/lib/types/place";
import { pick, type Lang } from "@/lib/i18n";
import { getProvinceGallery } from "@/lib/province-gallery";
import ProvinceGallery from "./ProvinceGallery";

const provinceBannerImages: Record<string, {
  image: string;
  alt: string;
  credit: string;
  source: string;
  license: string;
  licenseUrl: string;
}> = const provinceBannerImages: Record<string, {
  image: string;
  alt: string;
  credit: string;
  source: string;
  license: string;
  licenseUrl: string;
}> = {
  "banteay-meanchey": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Banteay_Chhmar_Temple_Entrance.JPG/1280px-Banteay_Chhmar_Temple_Entrance.JPG",
    alt: "Banteay Chhmar temple entrance",
    credit: "Andrew Marino",
    source: "https://commons.wikimedia.org/wiki/File:Banteay_Chhmar_Temple_Entrance.JPG",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  battambang: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/88/Ta_Dumbong_statue_2.jpg/1280px-Ta_Dumbong_statue_2.jpg",
    alt: "Ta Dumbong statue in Battambang",
    credit: "Christophe95",
    source: "https://commons.wikimedia.org/wiki/File:Ta_Dumbong_statue_2.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "kampong-cham": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Kizuna_Bridge_across_Mekong_River_-_Kampong_Cham_-_Cambodia_%2848328824301%29.jpg/1280px-Kizuna_Bridge_across_Mekong_River_-_Kampong_Cham_-_Cambodia_%2848328824301%29.jpg",
    alt: "Kizuna Bridge over the Mekong in Kampong Cham",
    credit: "Adam Jones",
    source: "https://commons.wikimedia.org/wiki/File:Kizuna_Bridge_across_Mekong_River_-_Kampong_Cham_-_Cambodia_(48328824301).jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "kampong-chhnang": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Kampong_Chhnang_Tonle_Sap_Phi1free.jpg/1280px-Kampong_Chhnang_Tonle_Sap_Phi1free.jpg",
    alt: "Tonle Sap and Phnom Kong Rei near Kampong Chhnang",
    credit: "Phi1free",
    source: "https://commons.wikimedia.org/wiki/File:Kampong_Chhnang_Tonle_Sap_Phi1free.jpg",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  },
  "kampong-speu": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/05/Kirirom_National_Park.jpg/1280px-Kirirom_National_Park.jpg",
    alt: "Kirirom National Park in Kampong Speu",
    credit: "Arie",
    source: "https://commons.wikimedia.org/wiki/File:Kirirom_National_Park.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  "kampong-thom": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Sambor_Prei_Kuk_N16_%282%29_en_2014.jpg/1280px-Sambor_Prei_Kuk_N16_%282%29_en_2014.jpg",
    alt: "Sambor Prei Kuk temple in Kampong Thom",
    credit: "Pierre André",
    source: "https://commons.wikimedia.org/wiki/File:Sambor_Prei_Kuk_N16_(2)_en_2014.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  kandal: {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Udong_0001.jpg/1280px-Udong_0001.jpg",
    alt: "Oudong heritage site in Kandal",
    credit: "Stefan Fussan",
    source: "https://commons.wikimedia.org/wiki/File:Udong_0001.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  kampot: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/2022.08-516-214ap1_sculpture%2C_monument_Durian_Roundabout%2CKampot%2CKH_sat20aug2022-1556h.jpg/1280px-2022.08-516-214ap1_sculpture%2C_monument_Durian_Roundabout%2CKampot%2CKH_sat20aug2022-1556h.jpg",
    alt: "Durian sculpture at Kampot roundabout",
    credit: "Rik Schuiling / TropCrop-TCS",
    source: "https://commons.wikimedia.org/wiki/File:2022.08-516-214ap1_sculpture,_monument_Durian_Roundabout,Kampot,KH_sat20aug2022-1556h.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "koh-kong": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Kohkongbridge2007.jpg/1280px-Kohkongbridge2007.jpg",
    alt: "Bridge in Koh Kong",
    credit: "Tony Hobbs",
    source: "https://commons.wikimedia.org/wiki/File:Kohkongbridge2007.jpg",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
  },
  kratie: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c0/Kratie.-_les_dauphins_de_l%27Irrawaddy.webm/1280px--Kratie.-_les_dauphins_de_l%27Irrawaddy.webm.jpg",
    alt: "Irrawaddy dolphins in Kratie",
    credit: "Pierre André",
    source: "https://commons.wikimedia.org/wiki/File:Kratie.-_les_dauphins_de_l%27Irrawaddy.webm",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  mondulkiri: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/98/Bou_Sra_Waterfall%2C_Mondulkiri%2C_Cambodia.jpg/1280px-Bou_Sra_Waterfall%2C_Mondulkiri%2C_Cambodia.jpg",
    alt: "Bou Sra Waterfall in Mondulkiri",
    credit: "Dtfman",
    source: "https://commons.wikimedia.org/wiki/File:Bou_Sra_Waterfall,_Mondulkiri,_Cambodia.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  pailin: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Eight_Doors_Direction_Temple_%28Phnom_Yat%29.jpg/1280px-Eight_Doors_Direction_Temple_%28Phnom_Yat%29.jpg",
    alt: "Eight Doors Direction Temple at Phnom Yat in Pailin",
    credit: "Kiensvay",
    source: "https://commons.wikimedia.org/wiki/File:Eight_Doors_Direction_Temple_(Phnom_Yat).jpg",
    license: "CC0",
    licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  },
  "phnom-penh": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/2016_Phnom_Penh%2C_Wat_Phnom_%2807%29.jpg/1280px-2016_Phnom_Penh%2C_Wat_Phnom_%2807%29.jpg",
    alt: "Wat Phnom in Phnom Penh",
    credit: "Marcin Konsek",
    source: "https://commons.wikimedia.org/wiki/File:2016_Phnom_Penh,_Wat_Phnom_(07).jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "preah-sihanouk": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1f/Panorama_-_Sihanoukville_at_dawn.jpg/1280px-Panorama_-_Sihanoukville_at_dawn.jpg",
    alt: "Sihanoukville coastline at dawn",
    credit: "Dmitry Makeev",
    source: "https://commons.wikimedia.org/wiki/File:Panorama_-_Sihanoukville_at_dawn.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "preah-vihear": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/03_Prasat_Preah_Vihear-nX-06532.jpg/1280px-03_Prasat_Preah_Vihear-nX-06532.jpg",
    alt: "Prasat Preah Vihear temple",
    credit: "PsamatheM",
    source: "https://commons.wikimedia.org/wiki/File:03_Prasat_Preah_Vihear-nX-06532.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "prey-veng": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Rice_Field_in_Prey_Veng.JPG/1280px-Rice_Field_in_Prey_Veng.JPG",
    alt: "Rice fields in Prey Veng Province",
    credit: "Mao Piseth",
    source: "https://commons.wikimedia.org/wiki/File:Rice_Field_in_Prey_Veng.JPG",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  pursat: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/69/Sompove_Meas_Island%2C_Pursat_province%2C_Cambodia.jpg/1280px-Sompove_Meas_Island%2C_Pursat_province%2C_Cambodia.jpg",
    alt: "Sompove Meas Island in Pursat Province",
    credit: "Sotheaboth",
    source: "https://commons.wikimedia.org/wiki/File:Sompove_Meas_Island,_Pursat_province,_Cambodia.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  ratanakiri: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Yeak_Laom_Lake_in_Paranoma_-Photo_2016-.jpg/1280px-Yeak_Laom_Lake_in_Paranoma_-Photo_2016-.jpg",
    alt: "Yeak Laom Lake in Ratanakiri",
    credit: "Chamnanmuon",
    source: "https://commons.wikimedia.org/wiki/File:Yeak_Laom_Lake_in_Paranoma_-Photo_2016-.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "svay-rieng": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/Bavet.JPG/1280px-Bavet.JPG",
    alt: "Bavet in Svay Rieng Province",
    credit: "BrightRaven",
    source: "https://commons.wikimedia.org/wiki/File:Bavet.JPG",
    license: "CC BY 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by/3.0/",
  },
  "stung-treng": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/China-Cambodia_friendship_bridge_in_Stung_treng.jpg/1280px-China-Cambodia_friendship_bridge_in_Stung_treng.jpg",
    alt: "China-Cambodia Friendship Bridge in Stung Treng",
    credit: "vive le vélo",
    source: "https://commons.wikimedia.org/wiki/File:China-Cambodia_friendship_bridge_in_Stung_treng.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  takeo: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Phnom_Chisor_stairs.jpg/1280px-Phnom_Chisor_stairs.jpg",
    alt: "Stairway to Phnom Chisor in Takeo",
    credit: "Christina Andrada",
    source: "https://commons.wikimedia.org/wiki/File:Phnom_Chisor_stairs.jpg",
    license: "CC BY 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
  },
  "tboung-khmum": {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Memot_earthwork.jpg/1280px-Memot_earthwork.jpg",
    alt: "Memot earthwork archaeological site in Tboung Khmum",
    credit: "Alison Kyra Carter",
    source: "https://commons.wikimedia.org/wiki/File:Memot_earthwork.jpg",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
  },
  "oddar-meanchey": {
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Graf_pol_pot.JPG/1280px-Graf_pol_pot.JPG",
    alt: "Anlong Veng historical site in Oddar Meanchey",
    credit: "Bokkiem",
    source: "https://commons.wikimedia.org/wiki/File:Graf_pol_pot.JPG",
    license: "Public domain",
    licenseUrl: "https://commons.wikimedia.org/wiki/File:Graf_pol_pot.JPG",
  },
  kep: {
    image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Crab_Statue_in_Sea_with_Threatening_Sky_-_Kep_-_Cambodia_%2848543458912%29.jpg/1280px-Crab_Statue_in_Sea_with_Threatening_Sky_-_Kep_-_Cambodia_%2848543458912%29.jpg",
    alt: "Crab statue beside the sea in Kep",
    credit: "Adam Jones",
    source: "https://commons.wikimedia.org/wiki/File:Crab_Statue_in_Sea_with_Threatening_Sky_-_Kep_-_Cambodia_(48543458912).jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
  "siem-reap": {
    image: "/images/angkor-wat-header.jpg",
    alt: "Angkor temple landscape in Siem Reap",
    credit: "Chris",
    source: "https://commons.wikimedia.org/wiki/File:Angkor_panorama_banner.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
};;

export function getProvinceBannerImage(slug: string): string | undefined {
  return provinceBannerImages[slug]?.image;
}

export default async function ProvinceHero({ guide, lang, disclaimer }: {
  guide: ProvinceGuide;
  lang: Lang;
  disclaimer: string;
}) {
  const image = provinceBannerImages[guide.slug];
  const name = pick(guide, "name", lang);
  const slides = await getProvinceGallery(guide.slug, image ?? null);

  return (
    <header className={"province-hero" + (slides.length ? " has-photo" : "")} aria-labelledby="province-title">
      <ProvinceGallery
        slides={slides}
        title={name}
        overview={pick(guide, "overview", lang)}
        disclaimer={disclaimer}
      />
    </header>
  );
}
