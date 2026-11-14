import { UniversityLogo } from "@/components/UniversityLogo";
import { hasLogo } from "@/lib/logos";
import h from "./home.module.css";

const SAMPLE: { basket: "dream" | "target" | "safety"; title: string; items: { slug: string; name: string; meta: string; chance: number }[] }[] = [
  {
    basket: "dream",
    title: "Мечта",
    items: [
      { slug: "harvard-university-usa", name: "Harvard University", meta: "США · полный грант", chance: 4 },
      { slug: "yale-university-usa", name: "Yale University", meta: "США · полный грант", chance: 5 },
    ],
  },
  {
    basket: "target",
    title: "Реальные",
    items: [
      { slug: "bilkent-university-turkey", name: "Bilkent University", meta: "Турция · full ride", chance: 28 },
      { slug: "koc-university-turkey", name: "Koç University", meta: "Турция · стипендия", chance: 30 },
    ],
  },
  {
    basket: "safety",
    title: "Запасные",
    items: [{ slug: "hacettepe-university-turkey", name: "Hacettepe University", meta: "Турция · госгрант", chance: 47 }],
  },
];

/** Static, illustrative preview of the cabinet for the landing page (sample profile, real universities). */
export function CabinetPreview() {
  return (
    <div className={h.preview} role="img" aria-label="Пример личного плана: список вузов по корзинам, шанс и сроки">
      <div className={h.pvHero} aria-hidden>
        <b>Айгерим, до первого дедлайна 49 дней</b>
        <span>Следующий шаг: попросить 2 рекомендации — через 6 дней</span>
        <i>
          <em style={{ width: "44%" }} />
        </i>
      </div>
      <div className={h.pvTiles} aria-hidden>
        <div className={h.pvSafety}>
          <small>Шанс с грантом</small>
          <b>≈ 82%</b>
        </div>
        <div className={h.pvTarget}>
          <small>В плане</small>
          <b>9 вузов</b>
        </div>
        <div className={h.pvInfo}>
          <small>Документы</small>
          <b>4 из 9</b>
        </div>
      </div>
      <div className={h.pvBaskets} aria-hidden>
        {SAMPLE.map((b) => (
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
