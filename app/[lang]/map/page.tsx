import type { Metadata } from "next";
import Shell from "@/components/Shell";
import PlaceMap from "@/components/PlaceMap";
import { getPlaces } from "@/lib/queries";
import { getLang } from "@/lib/i18n";

export const metadata: Metadata = { title: "Map | Visit Cambodia", description: "Find attractions, stays and food around Cambodia on an interactive map." };

export default async function MapPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = getLang((await params).lang);
  const places = await getPlaces({});
  const located = places.filter((place) => place.lat && place.lng);
  return <Shell lang={lang} variant="map">
    <header className="browse-heading directory-heading">
      <h1>{lang === "km" ? "កន្លែងទេសចរណ៍លើផែនទី" : "Places on the map"}</h1>
    </header>
    <PlaceMap places={located} lang={lang} />
  </Shell>;
}
