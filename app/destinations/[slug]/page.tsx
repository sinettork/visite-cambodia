import { notFound } from "next/navigation";
import Shell from "@/components/Shell";
import { getPlace } from "@/lib/queries";
import { T, getLang, pick } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function PlacePage({ params, searchParams }: {
  params: Promise<{ slug: string }>; searchParams: Promise<{ lang?: string }>;
}) {
  const { slug } = await params;
  const lang = getLang((await searchParams).lang);
  const t = T[lang];
  const p = await getPlace(slug);
  if (!p) notFound();

  return (
    <Shell lang={lang} active={p.province_slug}>
      <div className="section-head"><h2>{pick(p, "name", lang)}</h2></div>
      {p.image_url && <img src={p.image_url} alt={pick(p, "name", lang)} style={{ width: "100%", maxHeight: 360, objectFit: "cover" }} />}
      <p style={{ margin: "16px 0" }}>{pick(p, "summary", lang)}</p>
      <table className="spec-table">
        <tbody>
          <tr><th>{t.province}</th><td>{pick({ n_km: p.province_km, n_en: p.province_en }, "n", lang)}</td></tr>
          <tr><th>{t.category}</th><td>{t.cats[p.category as keyof typeof t.cats]}</td></tr>
          <tr><th>{t.ticket}</th><td>{p.ticket_usd ? `$${p.ticket_usd}` : t.free}</td></tr>
          <tr><th>{t.hours}</th><td>{p.open_hours ?? "-"}</td></tr>
        </tbody>
      </table>
      {p.lat && p.lng && (
        <p style={{ marginTop: 16 }}>
          <a href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lng}#map=15/${p.lat}/${p.lng}`}
             target="_blank" rel="noreferrer" style={{ color: "#e37926", fontWeight: 700 }}>
            {t.map} ›
          </a>
        </p>
      )}
    </Shell>
  );
}
