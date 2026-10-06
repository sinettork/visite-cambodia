import Link from "next/link";
import Header from "./Header";
import Footer from "./Footer";
import { getPopular, getProvinces } from "@/lib/queries";
import { T, pick, type Lang } from "@/lib/i18n";
import BackToTop from "./BackToTop";

export default async function Shell({
  lang, q, active, type, variant = "results", children,
}: { lang: Lang; q?: string; active?: string; type?: "" | "attraction" | "accommodation" | "restaurant"; variant?: "home" | "results" | "editorial" | "food" | "discover" | "region" | "place"; children: React.ReactNode }) {
  const [provinces, popular] = await Promise.all([getProvinces(), getPopular()]);
  const t = T[lang];
  return (
    <div className={`site site-${variant}`}>
      <Header lang={lang} q={q} type={type} active={active} provinces={provinces} />
      <div className="columns">
        <aside className="left-side">
          <h2 id="province-list">{t.provinces}</h2>
          <div className="brands">
            {provinces.map((p) => (
              <Link key={p.slug} href={`/regions/${p.slug}?lang=${lang}`}
                className={active === p.slug ? "active-brand" : ""}>
                {pick(p, "name", lang)}
              </Link>
            ))}
          </div>
          <Link className="all-brands" href={`/explore?lang=${lang}`}>{t.destinations} <b>›</b></Link>
        </aside>
        <main id="main-content">{children}</main>
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
      <BackToTop />
    </div>
  );
}
