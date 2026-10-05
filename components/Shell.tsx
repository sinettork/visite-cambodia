import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { getPopular, getProvinces } from "@/lib/queries";
import { T, pick, type Lang } from "@/lib/i18n";

export default async function Shell({
  lang, q, active, type, children,
}: { lang: Lang; q?: string; active?: string; type?: "" | "attraction" | "accommodation" | "restaurant"; children: React.ReactNode }) {
  const [provinces, popular] = await Promise.all([getProvinces(), getPopular()]);
  const t = T[lang];
  return (
    <div className="site">
      <Header lang={lang} q={q} type={type} />
      <div className="columns">
        <aside className="left-side">
          <h2>{t.provinces}</h2>
          <div className="brands">
            {provinces.map((p) => (
              <Link key={p.slug} href={`/regions/${p.slug}?lang=${lang}`}
                className={active === p.slug ? "active-brand" : ""}>
                {pick(p, "name", lang)}
              </Link>
            ))}
          </div>
          <Link className="all-brands" href={`/?lang=${lang}`}>{t.all} <b>›</b></Link>
        </aside>
        <main>{children}</main>
        <aside className="right-side">
          <h2>{t.popular}</h2>
          <div className="phones">
            {popular.map((p) => (
              <Link key={p.slug} href={`/destinations/${p.slug}?lang=${lang}`}>
                {p.image_url && <img src={p.image_url} alt="" />}
                <span>{pick(p, "name", lang)}</span>
              </Link>
            ))}
          </div>
        </aside>
      </div>
      <Footer lang={lang} />
    </div>
  );
}
