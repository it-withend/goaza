/** Typical application windows. Exact dates change yearly — always confirm on the official page. */
export type Window = { what: string; when: string; detail: string; href?: string };

export const US_ROUNDS: Window[] = [
  { what: "Early Decision I / Early Action / REA", when: "1–15 ноября", detail: "Ответ в середине декабря. ED обязывает поехать, если приняли.", href: "/guides/raundy-podachi" },
  { what: "Regular Decision и Early Decision II", when: "1–15 января", detail: "Ответы RD — в конце марта, ED2 — в феврале.", href: "/guides/raundy-podachi" },
  { what: "Финансовые анкеты (CSS Profile, ISFAA)", when: "Вместе с заявкой", detail: "В тот же раунд, что и заявка. Опоздание часто лишает помощи.", href: "/guides/finansovaya-pomoshch" },
  { what: "Выбор вуза и депозит", when: "1 мая", detail: "Национальный день решения в США." },
];

export const PROGRAM_WINDOWS: Window[] = [
  { what: "Oxford и Cambridge (UCAS)", when: "до 15 октября", detail: "Плюс вступительные тесты и интервью в ноябре–декабре." },
  { what: "Stipendium Hungaricum", when: "ноябрь — середина января", detail: "Затем отдельные экзамены и интервью в вузах до весны.", href: "/grants#stipendium-hungaricum" },
  { what: "Канада (UofT, UBC, York)", when: "ноябрь — февраль", detail: "Номинация на Pearson и заявки на стипендии — к раннему дедлайну, обычно ноябрь.", href: "/guides/kanada" },
  { what: "Erasmus Mundus", when: "октябрь — январь", detail: "У каждой программы свой дедлайн.", href: "/grants#erasmus-mundus" },
  { what: "Великобритания (UCAS, основной)", when: "середина–конец января", detail: "До 5 вузов в одной заявке." },
  { what: "Türkiye Bursları", when: "январь — февраль", detail: "Онлайн-заявка, затем интервью весной.", href: "/grants#turkiye-burslari" },
  { what: "Китай (CSC)", when: "январь — апрель", detail: "Через посольство или через вуз — у вузов свои сроки.", href: "/grants#csc-china" },
  { what: "Корея (GKS, бакалавриат)", when: "сентябрь — октябрь", detail: "Магистратура и PhD — февраль–март.", href: "/grants#global-korea-scholarship" },
  { what: "Япония (MEXT через посольство)", when: "апрель — май", detail: "Экзамены летом, старт обучения весной следующего года.", href: "/grants#mext-japan" },
  { what: "Германия (зимний семестр)", when: "до 15 июля", detail: "Через uni-assist или напрямую в вуз.", href: "/grants#germany-public" },
  { what: "Италия (DSU и поступление)", when: "весна — сентябрь", detail: "Предзачисление через Universitaly весной, стипендия региона летом.", href: "/grants#italy-dsu" },
];

export type GradeStep = { grade: string; focus: string; items: string[] };

import type { Lang } from "@/lib/i18n";
import { BY_GRADE_UZ, PROGRAM_WINDOWS_UZ, US_ROUNDS_UZ } from "./timeline.uz";

export function getUsRounds(lang: Lang): Window[] {
  return lang === "uz" ? US_ROUNDS_UZ : US_ROUNDS;
}

export function getProgramWindows(lang: Lang): Window[] {
  return lang === "uz" ? PROGRAM_WINDOWS_UZ : PROGRAM_WINDOWS;
}

export function getByGrade(lang: Lang): GradeStep[] {
  return lang === "uz" ? BY_GRADE_UZ : BY_GRADE;
}

export const BY_GRADE: GradeStep[] = [
  {
    grade: "9 класс",
    focus: "Фундамент",
    items: [
      "Держите хорошие оценки: в США смотрят с 9 класса.",
      "Начните одно-два дела, которыми будете заниматься долго: проект, кружок, волонтёрство, подработка.",
      "Подтягивайте английский до уверенного B2.",
    ],
  },
  {
    grade: "10 класс",
    focus: "Глубина",
    items: [
      "Олимпиады, конкурсы, летние школы — особенно бесплатные.",
      "Возьмите на себя роль в своей активности: организуйте, ведите, учите других.",
      "Пробный SAT и IELTS/TOEFL, чтобы понять уровень.",
      "Посмотрите гайды Studyaza и начните широкий список вузов.",
    ],
  },
  {
    grade: "11 класс (предвыпускной для 12-летней системы)",
    focus: "Подготовка к подаче",
    items: [
      "Весной — первые попытки SAT и английского.",
      "Летом — черновик personal statement и список активностей.",
      "Выберите учителей для рекомендаций и попросите в начале осени.",
      "Сузьте список до 10–15 вузов в трёх корзинах.",
    ],
  },
  {
    grade: "Выпускной год",
    focus: "Подача",
    items: [
      "Август: открывается Common App.",
      "Октябрь: последний SAT для ранних раундов, финальные эссе.",
      "1 ноября: ранние заявки и финансовые анкеты.",
      "Январь: основной раунд, параллельно — государственные стипендии.",
      "Март–апрель: ответы и сравнение предложений помощи.",
    ],
  },
];
