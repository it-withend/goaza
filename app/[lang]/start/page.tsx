import type { Metadata } from "next";
import Link from "@/components/i18n/Link";
import { SitePage } from "@/components/site/SitePage";
import styles from "@/components/site/site.module.css";
import { getStages } from "@/content/guides";
import { getByGrade } from "@/content/timeline";
import { langOf, localizePath, trFor } from "@/lib/i18n";
import s from "./start.module.css";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  return {
    title: tr("С чего начать поступление за границу", "Chet elga o'qishga kirishni nimadan boshlash kerak"),
    description: tr(
      "Пошаговый план поступления за рубеж для школьников и родителей: что делать в каждом классе и в каком порядке готовить документы, экзамены, эссе и заявки на гранты.",
      "O'quvchilar va ota-onalar uchun chet elga kirish bo'yicha bosqichma-bosqich reja: har bir sinfda nima qilish, hujjatlar, imtihonlar, esse va grant arizalarini qanday tartibda tayyorlash.",
    ),
    alternates: { canonical: localizePath(lang, "/start") },
  };
}

export default async function StartPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = langOf((await params).lang);
  const tr = trFor(lang);
  const stages = getStages(lang);
  const byGrade = getByGrade(lang);

  return (
    <SitePage>
      <header className={styles.lead}>
        <h1>{tr("С чего начать", "Nimadan boshlash kerak")}</h1>
        <p>
          {tr(
            "Поступление за границу — это пять шагов. Их можно пройти самостоятельно и бесплатно, если начать хотя бы за год до подачи.",
            "Chet elga o'qishga kirish — bu besh qadam. Agar ariza berishdan kamida bir yil oldin boshlasangiz, ularni mustaqil va bepul bosib o'tish mumkin.",
          )}
        </p>
      </header>

      <ol className={s.path}>
        {stages.map((st) => (
          <li key={st.n}>
            <span className={s.dot}>{st.n}</span>
            <div>
              <h2>{st.title}</h2>
              <p>{st.text}</p>
              <Link href={`/guides/${st.guide}`} className={styles.textLink}>
                {tr("Читать гайд", "Qo'llanmani o'qish")}
              </Link>
            </div>
          </li>
        ))}
      </ol>

      <section className={styles.guideSection}>
        <h2>{tr("План по классам", "Sinflar bo'yicha reja")}</h2>
        <div className={s.grades}>
          {byGrade.map((g) => (
            <article key={g.grade} className={s.grade}>
              <h3>{g.grade}</h3>
              <p className={s.focus}>{g.focus}</p>
              <ul>
                {g.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.guideSection}>
        <h2>{tr("Если денег на учёбу нет совсем", "Agar o'qishga pul umuman bo'lmasa")}</h2>
        <p className={styles.prose}>
          {tr(
            "Это не приговор. Есть три пути, которые не требуют платить за обучение: полный грант вуза США (need-based), государственная стипендия другой страны и бесплатное обучение в Европе. Лучше идти по всем трём параллельно.",
            "Bu muammo emas. O'qish uchun pul to'lashni talab qilmaydigan uchta yo'l bor: AQSh OTMlarining to'liq granti (need-based), boshqa davlatlarning hukumat stipendiyasi va Yevropada bepul ta'lim. Uchala yo'nalishda ham parallel harakat qilish yaxshiroq.",
          )}
        </p>
        <p className={styles.inlineLinks}>
          <Link href="/guides/finansovaya-pomoshch">{tr("Как получить полный грант", "To'liq grantni qanday olish mumkin")}</Link>
          <Link href="/grants">{tr("Все стипендии", "Barcha stipendiyalar")}</Link>
          <Link href="/guides/besplatnoe-obuchenie">{tr("Где учиться бесплатно", "Qayerda bepul o'qish mumkin")}</Link>
        </p>
      </section>
    </SitePage>
  );
}
