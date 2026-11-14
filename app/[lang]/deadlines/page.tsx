import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { getProgramWindows, getUsRounds, type Window } from "@/content/timeline";
import { langOf, localizePath, trFor, type Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("Сроки подачи в зарубежные вузы и на стипендии", "Xorijiy OTMlar va stipendiyalarga ariza topshirish muddatlari"),
    description: tr(
      "Когда подавать в вузы США (ED, EA, RD), Великобритании, Канады, Европы и на государственные стипендии Венгрии, Турции, Кореи, Японии и Китая.",
      "AQSh (ED, EA, RD), Buyuk Britaniya, Kanada, Yevropa universitetlari hamda Vengriya, Turkiya, Koreya, Yaponiya va Xitoy davlat stipendiyalariga qachon topshirish kerak.",
    ),
    alternates: { canonical: localizePath(lang, "/deadlines") },
  };
}

function WindowTable({ rows, lang }: { rows: Window[]; lang: Lang }) {
  const tr = trFor(lang);
  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">{tr("Что", "Nima")}</th>
            <th scope="col">{tr("Когда", "Qachon")}</th>
            <th scope="col">{tr("Подробнее", "Batafsil")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.what}>
              <th scope="row">{r.href ? <Link href={r.href}>{r.what}</Link> : r.what}</th>
              <td style={{ whiteSpace: "nowrap", fontWeight: 700 }}>{r.when}</td>
              <td>{r.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function DeadlinesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return (
    <SitePage>
      <header className={styles.lead}>
        <h1>{tr("Сроки подачи", "Ariza topshirish muddatlari")}</h1>
        <p>
          {tr(
            "Типичные окна для поступления в следующем учебном году. Точные даты меняются — у каждого вуза в атласе есть его собственные дедлайны.",
            "Keyingi o'quv yili uchun odatiy ariza oynalari. Aniq sanalar o'zgarib turadi — atlasdagi har bir OTMning o'z dedlaynlari bor.",
          )}
        </p>
      </header>

      <section className={styles.guideSection}>
        <h2>{tr("Вузы США", "AQSh universitetlari")}</h2>
        <WindowTable rows={getUsRounds(lang)} lang={lang} />
      </section>

      <section className={styles.guideSection}>
        <h2>{tr("Другие страны и стипендии", "Boshqa davlatlar va stipendiyalar")}</h2>
        <p className={styles.prose}>{tr("Отсортировано по тому, когда открывается подача.", "Qabul ochilish vaqtiga ko'ra tartiblangan.")}</p>
        <WindowTable rows={getProgramWindows(lang)} lang={lang} />
      </section>

      <aside className={styles.nextBox}>
        <h2>{tr("Не знаете, с чего начать?", "Nimadan boshlashni bilmayapsizmi?")}</h2>
        <p>{tr("Посмотрите план по классам: что делать в 9, 10, 11 классе и в выпускной год.", "Sinflar bo'yicha rejani ko'ring: 9, 10, 11-sinf va bitiruv yilida nima qilish kerak.")}</p>
        <div className={styles.nextLinks}>
          <Link href="/start">{tr("План по классам", "Sinflar bo'yicha reja")}</Link>
          <Link href="/guides/raundy-podachi">{tr("Как выбрать раунд", "Raundni qanday tanlash")}</Link>
        </div>
      </aside>
    </SitePage>
  );
}
