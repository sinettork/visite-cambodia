import type { Metadata } from "next";
import Shell from "@/components/Shell";
import SavedPlacesList from "@/components/SavedPlacesList";
import { getPlaces } from "@/lib/queries";
import { getLang, T } from "@/lib/i18n";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const lang = getLang((await searchParams).lang);
  const t = T[lang];
  return {
    title: `${t.savedPlaces} | Visit Cambodia`,
    description: t.savedIntro,
    alternates: { canonical: `/saved?lang=${lang}` },
  };
}

export default async function SavedPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const lang = getLang((await searchParams).lang);
  const allPlaces = await getPlaces({});

  return (
    <Shell lang={lang} variant="saved">
      <SavedPlacesList allPlaces={allPlaces} lang={lang} />
    </Shell>
  );
}
