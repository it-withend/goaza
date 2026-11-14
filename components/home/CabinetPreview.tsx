import { UniversityLogo } from "@/components/UniversityLogo";
import { hasLogo } from "@/lib/logos";
import { trFor, type Lang } from "@/lib/i18n";
import h from "./home.module.css";

function getSample(lang: Lang): {
  basket: "dream" | "target" | "safety";
  title: string;
  items: { slug: string; name: string; meta: string; chance: number }[];
}[] {
  const tr = trFor(lang);
  return [
    {
      basket: "dream",
      title: tr("Мечта", "Orzu"),
      items: [
        { slug: "harvard-university-usa", name: "Harvard University", meta: tr("США · полный грант", "AQSh · to'liq grant"), chance: 4 },
        { slug: "yale-university-usa", name: "Yale University", meta: tr("США · полный грант", "AQSh · to'liq grant"), chance: 5 },
      ],
    },
    {
      basket: "target",
      title: tr("Реальные", "Haqiqiy"),
      items: [
        { slug: "bilkent-university-turkey", name: "Bilkent University", meta: tr("Турция · full ride", "Turkiya · full ride"), chance: 28 },
        { slug: "koc-university-turkey", name: "Koç University", meta: tr("Турция · стипендия", "Turkiya · stipendiya"), chance: 30 },
      ],
    },
    {
      basket: "safety",
      title: tr("Запасные", "Zaxira"),
      items: [{ slug: "hacettepe-university-turkey", name: "Hacettepe University", meta: tr("Турция · госгрант", "Turkiya · davlat granti"), chance: 47 }],
    },
  ];
}

/** Static, illustrative preview of the cabinet for the landing page (sample profile, real universities). */
export function CabinetPreview({ lang = "ru" }: { lang?: Lang }) {
  const tr = trFor(lang);
  const sample = getSample(lang);
  return (
    <div
      className={h.preview}
      role="img"
      aria-label={tr(
        "Пример личного плана: список вузов по корзинам, шанс и сроки",
        "Shaxsiy reja namunasi: savatlar bo'yicha universitetlar ro'yxati, imkoniyat va muddatlar",
      )}
    >
      <div className={h.pvHero} aria-hidden>
        <b>{tr("Айгерим, до первого дедлайна 49 дней", "Ayg'erim, birinchi dedlayngacha 49 kun")}</b>
        <span>{tr("Следующий шаг: попросить 2 рекомендации — через 6 дней", "Keyingi qadam: 2 ta tavsiyanoma so'rash — 6 kundan keyin")}</span>
        <i>
          <em style={{ width: "44%" }} />
        </i>
      </div>
      <div className={h.pvTiles} aria-hidden>
        <div className={h.pvSafety}>
          <small>{tr("Шанс с грантом", "Grant bilan imkoniyat")}</small>
          <b>≈ 82%</b>
        </div>
        <div className={h.pvTarget}>
          <small>{tr("В плане", "Rejada")}</small>
          <b>{tr("9 вузов", "9 ta OTM")}</b>
        </div>
        <div className={h.pvInfo}>
          <small>{tr("Документы", "Hujjatlar")}</small>
          <b>{tr("4 из 9", "9 tadan 4 ta")}</b>
        </div>
      </div>
      <div className={h.pvBaskets} aria-hidden>
        {sample.map((b) => (
          <div key={b.basket} className={`${h.pvBasket} ${h[`pv_${b.basket}`]}`}>
            <span className={h.pvBasketTitle}>{b.title}</span>
            {b.items.map((it) => (
              <div key={it.slug} className={h.pvUni}>
                <UniversityLogo name={it.name} slug={it.slug} logo={hasLogo(it.slug)} size={30} />
                <span>
                  <b>{it.name}</b>
                  <small>
                    {it.meta} · ≈ {it.chance}%
                  </small>
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
