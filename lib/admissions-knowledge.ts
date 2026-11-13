import merit103Raw from "@/lib/merit-scholarships-103.json";
import usCssAid81Raw from "@/lib/us-css-aid-81.json";

export interface BudgetTrack {
  id: string;
  badge: string;
  title: string;
  budgetPerYear: string;
  whoFits: string;
  keyMechanism: string;
  steps: string[];
  catalogHref: string;
  catalogLabel: string;
}

export interface GovScholarship {
  country: string;
  name: string;
  levels: string;
  coverage: string[];
  stipend: string;
  unisCount: string;
  url: string;
  importantNote?: string;
}

export interface InternalUniScholarship {
  country: string;
  university: string;
  slug: string;
  programName: string;
  levels: string;
  coverage: string;
  quota?: string;
  majors: string[];
  url: string;
}

export interface AffordableEuUni {
  country: string;
  university: string;
  slug: string;
  tuitionPerYear: string;
  livingPerMonth: string;
  strongMajors: string[];
}

export interface UsCssAidRow {
  school: string;
  location: string;
  aidType: string;
  maxAid: string;
  policy: string;
  howApply: string;
  cssWaiver: string;
  slug: string | null;
}

export interface MeritFullRideRow {
  state: string;
  school: string;
  scholarship: string;
  value: string;
  requirements: string;
  slug: string | null;
}

export interface FullRideUniEntry {
  name: string;
  tag: "need-blind" | "merit" | "need-aware" | "free-tuition";
  note: string;
  slug: string | null;
}

export interface DocChecklistGroup {
  id: string;
  title: string;
  badge: string;
  items: {
    name: string;
    detail: string;
    lowIncomeTip?: string;
  }[];
}

export interface PortalEntry {
  country: string;
  portal: string;
  scope: string;
  note: string;
}

export interface EssayTypePlaybook {
  id: string;
  title: string;
  wordCount: string;
  goal: string;
  structures: { label: string; desc: string }[];
  checklist: string[];
}

export interface OfficerInsight {
  officer: string;
  role: string;
  takeaways: string[];
}

export interface YaleCaseStudy {
  title: string;
  category: string;
  summary: string;
  whyItWorked: string[];
}

export interface TimelinePhase {
  when: string;
  title: string;
  tasks: string[];
}

export const SHORTLIST_FORMULA = {
  ratio: "3 Reach + 3 Target + 2 Safety = 8–12 вузов",
  explanation:
    "Сбалансированный список защищает от ситуации «ни одного оффера» или «поступил, но не хватает денег на учёбу». Для малообеспеченных семей каждый вуз в списке должен либо давать 100% покрытие по нужде/достижениям, либо иметь доступную госстипендию или стоимость уровня €1,000–3,000/год.",
  tiers: [
    {
      tier: "Reach / Dream (3–4 вуза)",
      badge: "Высокий риск, максимум денег",
      criteria: "Шанс поступления < 15–20%. В США — это Need-Blind (Harvard, Yale, MIT, Princeton, Amherst, Bowdoin, Dartmouth, Washington & Lee) или вузы с 100% demonstrated need.",
      tip: "Подача в раунд Early Decision (ED) статистически повышает вероятность зачисления (в данных CDS доля класса из ED часто составляет 30–50%), но обязывает зачислиться при достойном финпакете.",
    },
    {
      tier: "Target (3–4 вуза)",
      badge: "Основная ставка",
      criteria: "Ваш GPA и SAT/IELTS соответствуют медиане вуза (приём 20–55%), и при этом у университета есть подтверждённый бюджет помощи иностранцам или крупные merit-стипендии.",
      tip: "Ищите здесь либеральные колледжи (LAC) и университеты с бесплатной формой ISFAA / CSS Fee Waiver (Berea, Denison, Kenyon, Whitman, Skidmore, Dickinson, Trinity, U of Richmond).",
    },
    {
      tier: "Safety / Financial Backup (2–4 вуза)",
      badge: "Запасной аэродром",
      criteria: "Приём 60%+ ИЛИ государственные стипендии (Stipendium Hungaricum, Türkiye Bursları, GKS, CSC) ИЛИ недорогие вузы Европы/Канады (Португалия, Бельгия, провинциальная Канада + колледжи с переводом).",
      tip: "Financial Safety — это не просто «легко поступить», а «точно хватит денег, даже если пролетят все конкурентные гранты США».",
    },
  ],
};

export const BUDGET_TRACKS: BudgetTrack[] = [
  {
    id: "zero-usd",
    badge: "Трек $0 / Full-Ride",
    title: "США и международные кампусы с полным покрытием",
    budgetPerYear: "$0–$2,000 (при полном гранте; перелёт и депозиты по условиям вуза)",
    whoFits: "Сильный английский, высокие оценки (GPA 3.7+), активные проекты/олимпиады или история преодоления трудностей.",
    keyMechanism:
      "Комбинация Need-Blind/Need-Aware вузов с 100% покрытием нужды + 103 гарантированных или конкурентных Merit Full-Ride стипендий + Berea College (0 за обучение).",
    steps: [
      "Проверьте CSS Fee Waiver / бесплатную форму (ISFAA, PFAA, IFAW, WISFAA) — не платите $25 + $16 за каждый вуз.",
      "Запросите Common App Fee Waiver через школьного советника/директора.",
      "В секции Additional Information честно опишите финансовую ситуацию семьи и домашние обязанности (работа, помощь родителям).",
      "Обязательно включите хотя бы 2–3 вуза с автоматическим или полуавтоматическим merit full-ride.",
    ],
    catalogHref: "/dashboard?grant=1",
    catalogLabel: "Открыть вузы с полным грантом",
  },
  {
    id: "gov-scholarships",
    badge: "Трек Госстипендии",
    title: "100% государственные программы Европы и Азии",
    budgetPerYear: "$0 за обучение + ежемесячная стипендия и общежитие",
    whoFits: "Отличный «страховочный» и основной путь для семей с низким доходом: стипендия часто включает общежитие, страховку и карманные деньги.",
    keyMechanism:
      "Подача одновременно на 2–3 государственные программы: Stipendium Hungaricum (57 вузов), Türkiye Bursları (103 вуза), CSC (279 вузов), MEXT (399 вузов), GKS (64 вуза).",
    steps: [
      "В Турции (Türkiye Bursları), Китае (CSC), Японии (MEXT) и Корее (GKS) возможен 1-й подготовительный год языка — не требуется знать местный язык заранее.",
      "Соберите единый базовый пакет: загранпаспорт, транскрипт оценок с переводом, рекомендации, мотивационное письмо, языковой сертификат.",
      "Следите за квотами и правилами вашей страны (для ряда программ действует номинирование через госорганы/посольство).",
    ],
    catalogHref: "/dashboard?country=Hungary&grant=1",
    catalogLabel: "Смотреть вузы Венгрии с грантом",
  },
  {
    id: "low-cost-work",
    badge: "Трек Бюджет + Работа",
    title: "Доступная Европа (€1,000–4,800/год) и Канада (Co-op / College → Uni)",
    budgetPerYear: "€1,000–€4,800 обучение (Европа) или колледжи Канады CAD 10,000–20,000 с правом работы",
    whoFits: "Семьи, которые могут закрыть первый год сбережениями/подработкой и хотят гарантированное разрешение на работу или перевод в топ-университет.",
    keyMechanism:
      "В Португалии и Бельгии (Lisbon, Porto, KU Leuven, Ghent) стоимость обучения сопоставима с контрактом в вузах СНГ; в Канаде путь 2 года колледжа → перевод на 3-й курс вуза экономит десятки тысяч CAD и даёт право работать до 24 ч/нед и получить PGWP до 3 лет.",
    steps: [
      "Не ограничивайтесь Торонто и Ванкувером: Саскачеван, Манитоба, Нью-Брансуик и Новая Шотландия заметно дешевле по жилью.",
      "Выбирайте канадские программы с оплачиваемым Co-op (Waterloo, SFU, Dalhousie, Regina, MUN).",
      "В Европе проверяйте Padua (обучение + €8,000/г) и региональные стипендии при низкой цене контракта.",
    ],
    catalogHref: "/dashboard?country=Canada",
    catalogLabel: "Изучить вузы и колледжи Канады",
  },
];

export const GOV_SCHOLARSHIPS: GovScholarship[] = [
  {
    country: "Венгрия",
    name: "Stipendium Hungaricum",
    levels: "Бакалавриат, Магистратура, PhD",
    unisCount: "57 университетов Венгрии",
    stipend: "43,700 HUF/мес (~€110) × 12 мес + общ. или 40,000 HUF/мес (~€100)",
    coverage: [
      "100% освобождение от платы за обучение",
      "Место в общежитии бесплатно ИЛИ 40,000 HUF/мес (~€100) компенсации аренды",
      "Медстраховка по закону + доп. страховка до 65,000 HUF/год (~€165)",
    ],
    url: "https://stipendiumhungaricum.hu",
  },
  {
    country: "Турция",
    name: "Türkiye Bursları",
    levels: "Бакалавриат, Магистратура, PhD",
    unisCount: "103 университета Турции",
    stipend: "$100/мес (бак.), $150/мес (маг.), $200/мес (PhD)",
    coverage: [
      "Бесплатное обучение + обязательный 1-й год турецкого языка",
      "Проживание в общежитии + медицинская страховка",
      "Авиабилет туда (поступление) и обратно (после выпуска)",
    ],
    url: "https://turkiyeburslari.gov.tr",
  },
  {
    country: "Южная Корея",
    name: "Global Korea Scholarship (GKS)",
    levels: "Бакалавриат, Магистратура, PhD",
    unisCount: "64 университета Кореи (150 стипендиатов/год по квоте)",
    stipend: "~$740–$1,110/мес + доплата за уровень TOPIK 5–6",
    coverage: [
      "Обучение до ~$3,365/семестр покрывает государство, остаток — принимающий вуз",
      "1 год обязательных курсов корейского языка перед основной программой",
      "Авиабилеты туда-обратно, подъёмные по приезде, медстраховка и грант на печать диплома",
    ],
    url: "https://gksscholarship.com",
  },
  {
    country: "Китай",
    name: "Chinese Government Scholarship (CSC)",
    levels: "Бакалавриат, Магистратура, PhD",
    unisCount: "279 университетов Китая",
    stipend: "$360/мес на бакалавриате (выше на магистратуре/PhD)",
    coverage: [
      "100% бесплатное обучение на программе",
      "Бесплатное проживание в студенческом общежитии",
      "Базовая медицинская страховка",
    ],
    url: "https://www.chinesescholarshipcouncil.com/ru/",
  },
  {
    country: "Япония",
    name: "MEXT (Monbukagakusho)",
    levels: "Бакалавриат, Магистратура, PhD",
    unisCount: "399 университетов Японии",
    stipend: "$735/мес (зависит от ступени обучения)",
    coverage: [
      "100% оплата обучения и вступительных экзаменов",
      "Авиабилеты туда и обратно + помощь с жильём",
      "В магистратуре/PhD первый 6–12 мес обычно в статусе Research Student с подготовкой к экзамену",
    ],
    url: "https://www.mext.go.jp/en/index.htm",
  },
  {
    country: "Евросоюз",
    name: "Erasmus Mundus Joint Masters",
    levels: "Магистратура (обучение в 2–3 странах Европы)",
    unisCount: "Совместные консорциумы европейских вузов",
    stipend: "~€1,000–€1,400/мес",
    coverage: [
      "100% покрытие стоимости обучения на всей программе",
      "Переезд, визовые и транспортные гранты",
      "Возможность получить двойной/совместный диплом нескольких стран ЕС",
    ],
    url: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters",
  },
  {
    country: "Германия",
    name: "DAAD Scholarships",
    levels: "Магистратура, PhD, исследования",
    unisCount: "~400 вузов Германии",
    stipend: "~€934/мес",
    coverage: [
      "Ежемесячная стипендия, страховка и дорожные расходы",
      "Обучение в большинстве государственных вузов Германии бесплатно",
    ],
    importantNote: "Проверьте текущий правовой статус организации и доступность треков для вашей страны гражданства перед подачей.",
    url: "https://www.daad.de/en/",
  },
  {
    country: "Великобритания",
    name: "Chevening Scholarships",
    levels: "Магистратура (1 год)",
    unisCount: "~170 университетов Великобритании",
    stipend: "Покрытие проживания и ежемесячная стипендия по ставке UK",
    coverage: [
      "100% оплата обучения, визовые сборы и авиабилеты",
      "Требование: минимум 2 года опыта работы (можно стажировки/подработки в часах) и выбор 3 программ",
    ],
    importantNote: "Для граждан отдельных стран действуют особые правила доступа/ограничения — уточняйте статус на сайте Chevening.",
    url: "https://www.chevening.org/",
  },
];

export const INTERNAL_UNI_SCHOLARSHIPS: InternalUniScholarship[] = [
  {
    country: "Канада",
    university: "University of Toronto",
    slug: "university-of-toronto-canada",
    programName: "Lester B. Pearson International Scholarship",
    levels: "Бакалавриат",
    coverage: "Полное обучение + книги + общежитие + страховка на 4 года",
    quota: "~37 человек в год (номинация от школы)",
    majors: ["Computer Science", "Engineering", "Business", "Economics"],
    url: "https://future.utoronto.ca/pearson/",
  },
  {
    country: "Канада",
    university: "University of British Columbia",
    slug: "university-of-british-columbia-canada",
    programName: "International Scholars Program (KMIS / OIS / IMES)",
    levels: "Бакалавриат",
    coverage: "От ~CAD 10,000 до полного покрытия нужды и обучения",
    quota: "~50–60 человек в год",
    majors: ["Computer Science", "Economics", "Engineering", "Psychology"],
    url: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/",
  },
  {
    country: "Канада",
    university: "York University",
    slug: "york-university-canada",
    programName: "President’s International Scholarship of Excellence (PISE)",
    levels: "Бакалавриат",
    coverage: "До ~45,000 CAD/год (до 180,000 CAD за 4 года)",
    quota: "10–20 человек в год",
    majors: ["Business", "Computer Science", "Economics", "Media"],
    url: "https://futurestudents.yorku.ca/financing-your-degree/scholarships-bursaries",
  },
  {
    country: "Франция",
    university: "Sciences Po",
    slug: "sciences-po-france",
    programName: "Emile Boutmy Scholarship",
    levels: "Бакалавриат и Магистратура",
    coverage: "До ~€19,000/год на обучение и расходы на жизнь",
    majors: ["Economics", "Political Science", "International Relations"],
    url: "https://www.sciencespo.fr/students/en/fees-funding/financial-aid/emile-boutmy-scholarship/",
  },
  {
    country: "Италия",
    university: "University of Padua",
    slug: "university-of-padua-italy",
    programName: "Padua International Excellence Scholarship",
    levels: "Бакалавриат и Магистратура",
    coverage: "100% освобождение от оплаты обучения + ~€8,000/год стипендия",
    quota: "67 стипендий в год",
    majors: ["Data Science", "Information Engineering", "Psychology"],
    url: "https://www.unipd.it/en/padua-excellence",
  },
  {
    country: "Испания",
    university: "IE University",
    slug: "ie-university-spain",
    programName: "IE Scholarship for Personal Excellence",
    levels: "Бакалавриат",
    coverage: "До 100% покрытия обучения + проживание (вплоть до full ride)",
    quota: "2 полных покрытия с курса",
    majors: ["Economics", "Business", "Data Analytics"],
    url: "https://www.ie.edu/financial-aid/scholarship-list/",
  },
  {
    country: "Южная Корея",
    university: "KAIST",
    slug: "kaist-south-korea",
    programName: "KAIST International Student Scholarship",
    levels: "Бакалавриат, Магистратура, PhD",
    coverage: "100% обучение + ежемесячная стипендия + общежитие + страховка",
    majors: ["AI", "Computer Science", "Robotics"],
    url: "https://admission.kaist.ac.kr/",
  },
  {
    country: "Гонконг",
    university: "HKUST",
    slug: "hong-kong-university-of-science-and-technology-hong-kong",
    programName: "Global Learners Scholarship",
    levels: "Бакалавриат",
    coverage: "Полное освобождение от оплаты обучения с продлением на весь срок",
    majors: ["Computer Science", "Economics", "Business"],
    url: "https://join.hkust.edu.hk/global-learners-scholarship",
  },
  {
    country: "Сингапур",
    university: "National University of Singapore (NUS)",
    slug: "national-university-of-singapore-singapore",
    programName: "NUS International Undergraduate Scholarship",
    levels: "Бакалавриат",
    coverage: "100% обучение (с MOE Tuition Grant) + S$4,500/г + S$3,900/г общежитие + S$1,300 разово на ПК",
    quota: "~20–30 стипендиатов в год",
    majors: ["Computer Science", "Data Science", "Business", "Engineering"],
    url: "https://nus.edu.sg/oam/scholarships",
  },
  {
    country: "Сингапур",
    university: "Nanyang Technological University (NTU)",
    slug: "nanyang-technological-university-singapore",
    programName: "NTU President Award",
    levels: "Бакалавриат",
    coverage: "$10,000 учебное пособие + 4 г. общежития + $10,000 на зарубежные поездки + доп. гранты на обучение",
    majors: ["AI", "Computer Science", "Engineering"],
    url: "https://www.ntu.edu.sg/admissions/undergraduate/scholarships",
  },
];

export const AFFORDABLE_EU_UNIS: AffordableEuUni[] = [
  {
    country: "Португалия",
    university: "University of Lisbon",
    slug: "university-of-lisbon-portugal",
    tuitionPerYear: "€1,000–€2,500 / год",
    livingPerMonth: "~€900 / мес",
    strongMajors: ["Data Science", "Engineering"],
  },
  {
    country: "Португалия",
    university: "University of Porto",
    slug: "university-of-porto-portugal",
    tuitionPerYear: "€1,000–€2,500 / год",
    livingPerMonth: "~€800 / мес",
    strongMajors: ["Computer Science", "Business"],
  },
  {
    country: "Бельгия",
    university: "KU Leuven",
    slug: "ku-leuven-belgium",
    tuitionPerYear: "€2,000–€3,000 / год",
    livingPerMonth: "~€900 / мес",
    strongMajors: ["Economics", "Business"],
  },
  {
    country: "Бельгия",
    university: "Ghent University",
    slug: "ghent-university-belgium",
    tuitionPerYear: "€1,800–€4,800 / год",
    livingPerMonth: "~€900 / мес",
    strongMajors: ["Computer Science", "Engineering", "Social Sciences"],
  },
];

export const US_CSS_AID_TABLE: UsCssAidRow[] = usCssAid81Raw as UsCssAidRow[];
export const MERIT_103_TABLE: MeritFullRideRow[] = merit103Raw as MeritFullRideRow[];

export const FULL_RIDE_TSVIRKKOO: FullRideUniEntry[] = [
  { name: "Amherst College", tag: "need-blind", note: "Need-blind, 100% demonstrated need", slug: "amherst-college-usa" },
  { name: "Bowdoin College", tag: "need-blind", note: "Need-blind для иностранцев, 100% need", slug: "bowdoin-college-usa" },
  { name: "Brown University", tag: "need-blind", note: "Need-blind для иностранцев (начиная с Class of 2029)", slug: "brown-university-usa" },
  { name: "Dartmouth College", tag: "need-blind", note: "Need-blind для всех, 100% need", slug: "dartmouth-college-usa" },
  { name: "Harvard University", tag: "need-blind", note: "Need-blind для всех стран, $0 при доходе <$85k", slug: "harvard-university-usa" },
  { name: "Massachusetts Institute of Technology (MIT)", tag: "need-blind", note: "Need-blind для всех, 100% need", slug: "massachusetts-institute-of-technology-usa" },
  { name: "University of Notre Dame", tag: "need-blind", note: "Need-blind с полным покрытием нужды", slug: "university-of-notre-dame-usa" },
  { name: "Princeton University", tag: "need-blind", note: "Need-blind, своя бесплатная форма PFAA", slug: "princeton-university-usa" },
  { name: "Washington and Lee University", tag: "need-blind", note: "Need-blind для иностранцев + Johnson Scholarship", slug: "washington-and-lee-usa" },
  { name: "Yale University", tag: "need-blind", note: "Need-blind для всех, без займов", slug: "yale-university-usa" },
  { name: "Berea College", tag: "free-tuition", note: "Обучение бесплатно для всех принятых + стипендия на кампусе", slug: "berea-college-usa" },
  { name: "Centre College", tag: "merit", note: "Lincoln Scholars / Brown Fellows — full ride по merit", slug: "centre-college-usa" },
  { name: "Simmons University", tag: "merit", note: "Kotzen Scholarship (full tuition + жильё)", slug: "simmons-university-usa" },
  { name: "UNC Chapel Hill", tag: "merit", note: "Morehead-Cain / Robertson — full ride только по merit", slug: "university-of-north-carolina-at-chapel-hill-usa" },
  { name: "Denison University", tag: "need-aware", note: "Сильный пакет; ориентир минимального EFC ~$5k–10k/год", slug: "denison-university-usa" },
  { name: "Dickinson College", tag: "merit", note: "Комбинация merit + need до полного покрытия", slug: "dickinson-college-usa" },
  { name: "Kenyon College", tag: "need-aware", note: "100% need (ориентир EFC от ~$5k/год)", slug: "kenyon-college-usa" },
  { name: "Babson College", tag: "need-aware", note: "Global Scholars + need-based aid", slug: "babson-college-usa" },
  { name: "Bard College", tag: "need-aware", note: "Full ride возможен через need + merit", slug: "bard-college-usa" },
  { name: "Barnard College", tag: "need-aware", note: "Женский колледж, 100% demonstrated need", slug: "barnard-college-usa" },
  { name: "Bates College", tag: "need-aware", note: "100% need без займов", slug: "bates-college-usa" },
  { name: "Bennington College", tag: "need-aware", note: "Своя бесплатная форма Bennington ISFA", slug: "bennington-college-usa" },
  { name: "Brandeis University", tag: "need-aware", note: "100% demonstrated need для иностранцев", slug: "brandeis-university-usa" },
  { name: "Bryn Mawr College", tag: "need-aware", note: "Женский LAC, 100% need + CSS Waiver форма", slug: "bryn-mawr-college-usa" },
  { name: "Bucknell University", tag: "need-aware", note: "Крупные стипендии + need", slug: "bucknell-university-usa" },
  { name: "Carleton College", tag: "need-aware", note: "100% demonstrated need (CSS/ISFAA)", slug: "carleton-college-usa" },
  { name: "Claremont McKenna College", tag: "need-aware", note: "100% need (полные пакеты редки, высокий конкурс)", slug: "claremont-mckenna-college-usa" },
  { name: "Colby College", tag: "need-aware", note: "Без application fee, 100% need", slug: "colby-college-usa" },
  { name: "Colorado College", tag: "need-aware", note: "Block plan, 100% demonstrated need", slug: "colorado-college-usa" },
  { name: "Columbia University", tag: "need-aware", note: "100% need для принятых иностранцев", slug: "columbia-university-usa" },
  { name: "Cornell University", tag: "need-aware", note: "100% demonstrated need (need-aware)", slug: "cornell-university-usa" },
  { name: "Davidson College", tag: "need-aware", note: "100% need без займов; alt-форма при доходе <$5k", slug: "davidson-college-usa" },
  { name: "Duke University", tag: "need-aware", note: "Karsh International Scholars + need-based", slug: "duke-university-usa" },
  { name: "Duke Kunshan University (DKU)", tag: "need-aware", note: "Совместный кампус Duke в Китае с крупными грантами", slug: null },
  { name: "Emory University", tag: "need-aware", note: "Emory Scholars + 100% need", slug: "emory-university-usa" },
  { name: "Franklin & Marshall College", tag: "need-aware", note: "100% need (альтернативная форма помощи)", slug: "franklin-marshall-college-usa" },
  { name: "Georgetown University in Qatar", tag: "need-aware", note: "Кампус Education City в Катаре, щедрая помощь", slug: "georgetown-university-in-qatar-qatar" },
  { name: "Grinnell College", tag: "need-aware", note: "100% need + merit awards", slug: "grinnell-college-usa" },
  { name: "Hamilton College", tag: "need-aware", note: "100% demonstrated need", slug: "hamilton-college-usa" },
  { name: "Harvey Mudd College", tag: "need-aware", note: "Инженерный LAC, merit + need", slug: "harvey-mudd-college-usa" },
  { name: "Haverford College", tag: "need-aware", note: "100% need (CSS/FISFAA)", slug: "haverford-college-usa" },
  { name: "Hong Kong Baptist University", tag: "merit", note: "Admission Scholarship до полного покрытия в Гонконге", slug: "hong-kong-baptist-university-hong-kong" },
  { name: "HKUST", tag: "merit", note: "Global Learners / Admission Scholarship", slug: "hong-kong-university-of-science-and-technology-hong-kong" },
  { name: "Johns Hopkins University", tag: "need-aware", note: "100% need, своя форма JHU ISFAA", slug: "johns-hopkins-university-usa" },
  { name: "Lafayette College", tag: "need-aware", note: "100% need + Marquis Fellowship", slug: "lafayette-college-usa" },
  { name: "Lehigh University", tag: "need-aware", note: "100% need (CSS + LUCF)", slug: "lehigh-university-usa" },
  { name: "Macalester College", tag: "need-aware", note: "100% need (CSS/ISFAA) + DeWitt Wallace", slug: "macalester-college-usa" },
  { name: "Minerva University", tag: "need-blind", note: "Need-based гранты + work-study", slug: "minerva-schools-at-kgi-usa" },
  { name: "Mount Holyoke College", tag: "need-aware", note: "Женский колледж, 100% need + merit", slug: "mount-holyoke-college-usa" },
  { name: "Northwestern University", tag: "need-aware", note: "100% need без займов (CSS/ISFAA)", slug: "northwestern-university-usa" },
  { name: "Northwestern University in Qatar", tag: "need-aware", note: "Кампус в Катаре с грантами", slug: "northwestern-university-in-qatar-qatar" },
  { name: "NYU Abu Dhabi", tag: "need-aware", note: "Полные гранты вплоть до билетов и питания", slug: "nyu-abu-dhabi-uae" },
  { name: "Pitzer College", tag: "need-aware", note: "100% need (редко полные пакеты, форма PIFAA)", slug: "pitzer-college-usa" },
  { name: "Pomona College", tag: "need-aware", note: "100% need + Pomona Access Pass", slug: "pomona-college-usa" },
  { name: "Rice University", tag: "need-aware", note: "100% demonstrated need", slug: "rice-university-usa" },
  { name: "Rhodes College", tag: "need-aware", note: "Merit + need (форма RFIF)", slug: "rhodes-college-usa" },
  { name: "University of Richmond", tag: "need-aware", note: "Richmond Scholars (до 1 дек.) + 100% need", slug: "university-of-richmond-usa" },
  { name: "Skidmore College", tag: "need-aware", note: "100% need (CSS/SISFAA), средний грант ~$58k", slug: "skidmore-college-usa" },
  { name: "Smith College", tag: "need-aware", note: "Женский LAC, 100% need + CSS Waiver", slug: "smith-college-usa" },
  { name: "Stanford University", tag: "need-aware", note: "100% need (CSS/ISFAA), но need-aware для иностранцев", slug: "stanford-university-usa" },
  { name: "Swarthmore College", tag: "need-blind", note: "100% need без займов; CSS waiver при зачислении", slug: "swarthmore-college-usa" },
  { name: "Trinity College", tag: "need-aware", note: "100% demonstrated need", slug: "trinity-college-ct-usa" },
  { name: "Tufts University", tag: "need-aware", note: "100% need (CSS/ISFAA)", slug: "tufts-university-usa" },
  { name: "Tulane University", tag: "need-aware", note: "Полные merit-стипендии + need", slug: "tulane-university-usa" },
  { name: "Union College", tag: "need-aware", note: "Need + merit до полного покрытия", slug: "union-college-ny-usa" },
  { name: "University of Chicago", tag: "need-aware", note: "Бесплатная форма IFAW вместо CSS Profile", slug: "the-university-of-chicago-usa" },
  { name: "University of Pennsylvania", tag: "need-aware", note: "100% need без займов (CSS Waiver по email)", slug: "the-university-of-pennsylvania-usa" },
  { name: "University of Rochester", tag: "need-aware", note: "Handler + need-based", slug: "university-of-rochester-usa" },
  { name: "Vanderbilt University", tag: "need-aware", note: "Signature merit scholarships + 100% need", slug: "vanderbilt-university-usa" },
  { name: "Vassar College", tag: "need-aware", note: "100% demonstrated need", slug: "vassar-college-usa" },
  { name: "Washington University in St. Louis", tag: "need-aware", note: "Danforth/Ervin/Rodriguez + 100% need", slug: "washington-university-in-st-louis-usa" },
  { name: "Wellesley College", tag: "need-aware", note: "Женский колледж, 100% need (FAIF)", slug: "wellesley-college-usa" },
  { name: "Wesleyan University", tag: "need-aware", note: "Freeman Asian + 100% need (CSS/ISFAA)", slug: "wesleyan-university-usa" },
  { name: "Whitman College", tag: "need-aware", note: "Бесплатная форма WISFAA, merit + need", slug: "whitman-college-usa" },
  { name: "Williams College", tag: "need-aware", note: "100% need включая Book Grant", slug: "williams-college-usa" },
];

export const DOC_CHECKLIST: DocChecklistGroup[] = [
  {
    id: "academic",
    title: "Академические документы и оценки",
    badge: "Обязательно всем",
    items: [
      {
        name: "Аттестат + Транскрипт оценок за последние 3–4 года",
        detail: "С официальным нотариальным переводом на английский (или язык страны). Для госпрограмм и ряда вузов Европы нужен апостиль.",
        lowIncomeTip: "Перевод можно сделать до подачи, а дорогой апостиль заказывать только под те вузы/визы, которые реально требуют его до зачисления.",
      },
      {
        name: "Конвертация GPA в шкалу 4.0",
        detail: "Если школа использует 5- или 12-балльную систему, приложите официальную справку с расшифровкой шкалы. Не переводите оценки в уме по занижающим онлайн-формулам.",
      },
      {
        name: "Профиль школы и рекомендации (2 учителя + советник)",
        detail: "В США рекомендации должны подтверждать личные качества, о которых вы пишете в эссе: приёмная комиссия проверяет совпадение картины.",
      },
    ],
  },
  {
    id: "exams",
    title: "Экзамены (Язык и SAT/ACT)",
    badge: "Стратегия баллов",
    items: [
      {
        name: "IELTS / TOEFL / Duolingo English Test (DET)",
        detail: "Для колледжей Канады обычно IELTS 6.0–6.5, для университетов 6.5–7.0. Для топ-вузов США часто просят TOEFL 100+ / IELTS 7.0–7.5 или DET 120–135.",
        lowIncomeTip: "Duolingo ($65 вместо $220+ за IELTS) принимают десятки вузов США и Канады, а многие колледжи и университеты выдают на него бесплатные ваучеры.",
      },
      {
        name: "SAT / ACT (25th–75th percentiles)",
        detail: "Даже в test-optional вузах высокий SAT (выше медианы вуза или от 1400–1500+) критически важен для 103 конкурентных Merit Full-Ride стипендий.",
        lowIncomeTip: "Если до ближайшего тест-центра ехать далеко/дорого — ориентируйтесь на test-blind или сильные test-optional колледжи, но в заявки за full-ride merit старайтесь сдать SAT.",
      },
    ],
  },
  {
    id: "finance",
    title: "Финансовые документы и экономия на сборах",
    badge: "Для малообеспеченных семей",
    items: [
      {
        name: "Common App Fee Waiver ($0 вместо $50–90 за заявку)",
        detail: "Подтверждается вашим школьным советником в Common App одним кликом в разделе Fee Waiver.",
      },
      {
        name: "Бесплатные формы вместо CSS Profile ($25 + $16/вуз)",
        detail: "Используйте ISFAA, PFAA (Princeton), IFAW (UChicago), WISFAA (Whitman), Bennington ISFA, PIFAA (Pitzer), FAIF (Wellesley), RFIF (Rhodes) или запрашивайте CSS Fee Waiver по email.",
      },
      {
        name: "Справки о доходах семьи / ИП / спонсорские письма",
        detail: "Подготовьте 2-НДФЛ / справки о доходах родителей за год + выписки, переведённые на английский. Если у семьи сложные обстоятельства (болезнь, потеря работы, уход за родственником) — обязательно опишите это в Additional Information.",
      },
    ],
  },
];

export const COUNTRY_PORTALS: PortalEntry[] = [
  {
    country: "США",
    portal: "Common App / Coalition / Сайты вузов",
    scope: "Большинство университетов и LAC",
    note: "До 20 вузов в Common App; финпомощь подаётся параллельно через CSS Profile / ISFAA / портал вуза.",
  },
  {
    country: "Канада (Онтарио)",
    portal: "OUAC (университеты) & ontariocolleges.ca (колледжи)",
    scope: "UofT, Waterloo, McMaster, Western, York, Guelph, Carleton, Algonquin, Humber",
    note: "Единый профиль позволяет выбрать несколько программ; дедлайны чаще декабрь–февраль на осенний набор.",
  },
  {
    country: "Канада (BC / Альберта / прочие)",
    portal: "EducationPlannerBC / ApplyAlberta / прямые сайты вузов",
    scope: "UBC, SFU, UVic, Alberta, Calgary, McGill, Dalhousie, MUN, Saskatchewan, Manitoba",
    note: "В Квебеке (McGill, Concordia) проверьте правила для выпускников 11 классов и систему CEGEP.",
  },
  {
    country: "Великобритания",
    portal: "UCAS",
    scope: "Все британские вузы (до 5 выборов)",
    note: "Оксфорд/Кембридж и медицина — дедлайн в октябре, основные программы — конец января. Единое академическое эссе (Personal Statement).",
  },
  {
    country: "Нидерланды",
    portal: "Studielink + порталы вузов",
    scope: "Государственные исследовательские и прикладные вузы",
    note: "Строгие дедлайны (часто январь для Numerus Fixus, весна для остальных); внимательный контроль уровня диплома.",
  },
];

export const ESSAY_PLAYBOOK: EssayTypePlaybook[] = [
  {
    id: "personal",
    title: "Personal Statement (Common App)",
    wordCount: "500–650 слов",
    goal: "Показать ваши главные ценности, ход мыслей и характер через конкретный срез жизни — так, чтобы у офицера возникло чувство живого разговора с вами.",
    structures: [
      { label: "Key Event (Ключевое событие)", desc: "Один поворотный момент, который изменил ваши убеждения или взгляд на мир — глубина важнее масштаба события." },
      { label: "Metaphorical (Метафора)", desc: "Предмет, язык, привычка или место, связывающие разные стороны вашей личности (как история про «пальто множества цветов» из эссе в Yale)." },
      { label: "Timeline (Траектория роста)", desc: "Несколько коротких сцен во времени, объединённых одной эволюционирующей темой." },
    ],
    checklist: [
      "Пройдите «Thumb Test»: закройте ладонью первые 2–3 абзаца — эссе должно сразу ощущаться уникально вашим с первых строк.",
      "Не пересказывайте список достижений из анкеты — объясняйте ПОЧЕМУ вы делали то, что делали.",
      "Следите за тем, чтобы голос эссе совпадал с характеристиками учителей и общим профилем.",
    ],
  },
  {
    id: "why-us",
    title: "Why This College? (Почему именно этот вуз)",
    wordCount: "150–300 слов",
    goal: "Доказать, что вы детально изучили университет и понимаете, зачем вам именно его среда, курсы и сообщество — и что вы дадите кампусу взамен.",
    structures: [
      { label: "8 точек исследования вуза", desc: "1) Размер студенческого корпуса; 2) Public vs Private культура; 3) Локация и возможности города; 4) Устройство кампуса; 5) Соотношение студентов к профессорам; 6) Уникальные традиции кампуса; 7) Конкретные курсы/лаборатории/профессора; 8) Гибкость программы (Core vs Open Curriculum)." },
      { label: "Личный мостик", desc: "Свяжите каждую деталь вуза со своим прошлым опытом: не просто «мне нравится лаба Х», а «после моего проекта Y я хочу исследовать Z у профессора W»." },
    ],
    checklist: [
      "Анти-шаблон: если заменить название вуза на другой, текст должен потерять смысл — иначе переписывайте.",
      "Перед финальной отправкой проверьте дважды название колледжа в тексте (классическая ошибка копипаста!).",
    ],
  },
  {
    id: "why-major",
    title: "Why Major? (Выбор специальности)",
    wordCount: "150–300 слов",
    goal: "Показать интеллектуальное любопытство и путь от первого вопроса/наблюдения к реальным действиям и планам.",
    structures: [
      { label: "Крючок → Действие → Будущее", desc: "Начните со сцены/наблюдения («почему мой младший брат расстроился из-за недостающей детали пазла?»), покажите конкретные проекты/курсы, которые вы уже попробовали, и свяжите со следующими шагами в вузе." },
    ],
    checklist: [
      "Откажитесь от пустого штампа «I am passionate about...» — вместо этого покажите действия и детали.",
      "Даже если вы ещё не определились (Undecided), покажите пересечение 2–3 дисциплин, которые вас зажигают.",
    ],
  },
  {
    id: "extracurricular",
    title: "Extracurricular Essay (Значимая активность)",
    wordCount: "150–300 слов",
    goal: "Показать глубину, лидерство, преодоление сложностей и влияние на окружающих через одну активность (клуб, работа, волонтёрство, семейная обязанность).",
    structures: [
      { label: "Сцена → Препятствие → Эффект", desc: "Начните с яркого эпизода, честно покажите трудности (нехватка времени, провал, сложная команда), и завершите личным ростом + как продолжите это в университете." },
    ],
    checklist: [
      "Не повторяйте сухие цифры из Activities List — расскажите историю за строчкой резюме.",
      "Работа на семью, забота о младших или подработка ради бюджета семьи — такая же сильная внеклассная нагрузка, как и олимпиады!",
    ],
  },
];

export const ESSAY_26_MISTAKES: string[] = [
  "1. Пытаться казаться кем-то другим (чужой голос чувствуется сразу).",
  "2. Выбирать тему «для красоты», которая вам на самом деле безразлична.",
  "3. Начинать писать без предварительного осмысления и плана.",
  "4. Не отвечать напрямую на поставленный в промпте вопрос.",
  "5. Рассказать историю, но ничего не раскрыть о себе самом.",
  "6. Забывать, кто ваш читатель (взрослые офицеры, не ровесники из чата).",
  "7. Пытаться уместить всю жизнь в 650 слов вместо одного фокуса.",
  "8. Начинать со скучного шаблонного вступления («С самого детства я мечтал…»).",
  "9. Брать «острую» тему только ради эффекта, без реальных действий с вашей стороны.",
  "10. Дешёвые трюки (вложить ботинок в посылку, печатать странными шрифтами).",
  "11. Распыляться на 5 идей сразу вместо одной сильной центральной мысли.",
  "12. Писать абстрактно без конкретных деталей, сцен и диалогов.",
  "13. Переходить грань откровенности (хвалиться проступками или выливать сырую травму).",
  "14. Пересказывать списком своё резюме / форму анкеты.",
  "15. Оторванность эссе от остальной заявки (никакой связи с профилем).",
  "16. Оставаться на поверхности: описывать ЧТО произошло, не доходя до ПОЧЕМУ это важно.",
  "17. Не показывать черновик вообще никому перед отправкой.",
  "18. Собирать фидбэк от 10 человек и потерять собственный авторский голос.",
  "19. Выдавливать искусственную «экзотику» ради попытки выглядеть иначе всех.",
  "20. Отбрасывать простые жизненные темы (даже обычная ситуация работает, если подана честно).",
  "21. Натужный искусственный юмор там, где он звучит фальшиво.",
  "22. Писать эссе в последнюю ночь перед дедлайном.",
  "23. Провалить «Thumb Test» (вступление и завязка слишком общие и подходят любому).",
  "24. Не вычитать текст (орфография, пунктуация, чужой город или название вуза!).",
  "25. Подавать общий шаблон в дополнительное эссе конкретного колледжа.",
  "26. Потратить все силы на эссе, забросив заполнение анкеты, списков активностей и рекомендаций.",
];

export const OFFICER_INSIGHTS: OfficerInsight[] = [
  {
    officer: "Dr. Michele Hernandez",
    role: "Экс-замдиректора приёмной комиссии Dartmouth College",
    takeaways: [
      "Заявку читают минимум два независимых рецензента; при расхождении оценок дело выносится на общий комитет.",
      "Офицеры не смотрят только на верх 1% по оценкам — в среднем пуле абитуриентов именно эссе часто переводят заявку из отказа в зачисление.",
      "Не нужно быть Фолкнером — офицеры читают десятки файлов в день и оценивают смысл, честность и совпадение тона эссе с рекомендациями учителей.",
      "Экстраординарные семейные/финансовые трудности лучше объяснять отдельной чёткой запиской (Additional Information), чтобы комиссия понимала ваш реальный контекст.",
    ],
  },
  {
    officer: "Eva Ostrum",
    role: "Экс-замдиректора приёмной комиссии Yale University",
    takeaways: [
      "Не пытайтесь выглядеть «не таким как все» на уровне фактов — комиссия видела тысячи активностей; уникальной вас делает то, КАК вы об этом думаете и пишете.",
      "Даже будничный или нелепый бытовой сюжет цепляет сильнее громкой трагедии, если между вами и темой уже есть дистанция осмысления.",
      "Главный критерий сильного эссе: после чтения офицер ощущает, будто посидел с вами в одной комнате за живым разговором.",
    ],
  },
];

export const YALE_ESSAY_CASES: YaleCaseStudy[] = [
  {
    title: "Essay 1 — Community Engagement & Service",
    category: "Работа с детьми из малообеспеченных семей (Нью-Йорк / Санта-Барбара)",
    summary:
      "Студент сопоставляет контрастные сцены на площадке в Нью-Йорке и кухне в Санта-Барбаре и размышляет о том, почему ярлык «low-income» скрывает живые нюансы, соединяя это с будущим изучением антропологии.",
    whyItWorked: [
      "Погружение в конкретную сцену с первых предложений (имена детей, куклы Frozen, записка мамы).",
      "Отсутствие позиции «спасителя»: честное наблюдение, сложный вывод и связка с академической целью (advocacy + anthropology).",
    ],
  },
  {
    title: "Essay 2 — Personal Identity & Community",
    category: "Языки, корни и идентичность",
    summary:
      "История пути от мандаринского диалекта через русский язык и культурную среду к образу себя как «путешественника в пальто множества цветов».",
    whyItWorked: [
      "Простая и сквозная метафора объединяет несколько культур и переездов в единую личную историю.",
      "Тёплый, человечный голос автора вместо сухого перечисления языков в анкете.",
    ],
  },
];

export const CANADA_PLAYBOOK = {
  institutions: [
    {
      title: "Университеты (Universities)",
      desc: "Бакалавриат (3–4 года), магистратура, PhD. Фокус на науке, исследованиях и теории; сильные программы co-op.",
    },
    {
      title: "Колледжи (Colleges)",
      desc: "Сертификаты (1–2 г.), дипломы (2–3 г.), прикладной бакалавриат. Практика и стажировки, стоимость $10,000–$20,000 CAD/год против $20,000–$35,000+ в вузах; часто возможен перевод (Transfer) на старшие курсы университета.",
    },
    {
      title: "CEGEP в Квебеке",
      desc: "Особая ступень после школы перед квебекскими вузами: поступающим после 11 класса СНГ нужно сверять длительность программы на сайте вуза (например McGill, Concordia).",
    },
  ],
  workAndMigration: [
    "Во время учёбы по Study Permit студентам разрешено работать до 24 часов в неделю во время семестра и без ограничений на каникулах.",
    "Программы Co-op включают официальные оплачиваемые стажировки прямо по специальности.",
    "После выпуска можно получить Post-Graduation Work Permit (PGWP) на срок до 3 лет — прямой мост к канадскому опыту работы и иммиграции.",
  ],
  livingCosts: [
    "Обучение в университетах: ~$20,000–$30,000 CAD/год (инженерия/медицина до ~$35,000+ CAD; гуманитарные и бизнес ~$20,000).",
    "Колледжи: заметно дешевле — ~$10,000–$20,000 CAD/год.",
    "Жизнь вне кампуса: комната ~$500–$800/мес, питание ~$200–$300/мес, транспорт ~$100–$150/мес. Торонто и Ванкувер дороже, региональные города заметно доступнее.",
  ],
  studyPermitSteps: [
    "1. Получить Letter of Acceptance (LOA) от аккредитованного DLI-учебного заведения.",
    "2. Собрать Proof of Funds: банковские выписки / спонсорские документы на 1 год учёбы + проживание + дорогу по требованиям IRCC.",
    "3. Оплатить сборы и подготовиться к сдаче биометрии в визовом центре после подачи.",
    "4. Действующий загранпаспорт и цифровое фото по стандартам Канады.",
    "5. Проверить требования медстраховки и при запросе пройти медосмотр.",
    "6. Подать заявление онлайн на сайте IRCC как можно раньше (оптимально май–июнь после LOA, чтобы не попасть в августовские очереди).",
    "7. Дождаться решения и вклеить визу / получить письмо одобрения.",
    "8. На границе иметь распечатку LOA, выписок, страховки и документов об оплате — офицер выдаст бумажный Study Permit.",
  ],
  commonMistakes: [
    "Поздний старт в конце 11 класса: не остаётся времени на пересдачу IELTS и осознанный подбор провинций.",
    "Недостаточный ресёрч сайтов вузов: полагаться только на советы знакомых вместо официальных дедлайнов и требований.",
    "Фокус только на Торонто и Ванкувере: высокая конкуренция и дорогая аренда при наличии доступных альтернатив.",
    "Игнорирование колледжей и трансферных программ, позволяющих сэкономить бюджет и раньше выйти на рынок труда.",
  ],
  hiddenGems: [
    { name: "University of Waterloo (Онтарио)", note: "Мировой лидер по CS, инженерии и системе оплачиваемых Co-op стажировок.", slug: "university-of-waterloo-canada" },
    { name: "Simon Fraser University (BC)", note: "Бёрнаби рядом с Ванкувером: сильный бизнес, коммуникации и CS.", slug: "simon-fraser-university-canada" },
    { name: "University of Saskatchewan (Саскачеван)", note: "Входит в группу топ-15 исследовательских вузов U15; ниже стоимость учёбы и жизни.", slug: "university-of-saskatchewan-canada" },
    { name: "University of Guelph (Онтарио)", note: "Биологические науки, агрономия, ветеринария + заметные стипендии иностранцам.", slug: null },
    { name: "University of Manitoba (Манитоба)", note: "Крупный провинциальный вуз с более низкими расходами на жизнь и входными стипендиями.", slug: "university-of-manitoba-canada" },
    { name: "Dalhousie University (Новая Шотландия)", note: "Галифакс: сильные инженерия, медицина, право и науки.", slug: "dalhousie-university-canada" },
    { name: "Carleton University (Онтарио)", note: "Оттава: сильные CS, журналистика, международные отношения; жильё дешевле Торонто.", slug: null },
  ],
};

export const TIMELINE_2_YEARS: TimelinePhase[] = [
  {
    when: "За 1,5–2 года (9–10 класс СНГ)",
    title: "Язык, оценки и внеклассный фундамент",
    tasks: [
      "Укрепляйте академический английский и держите высокий средний балл (GPA).",
      "Выберите 2–4 долгосрочные внеклассные активности или реальные проекты с измеримым результатом.",
      "Изучите страны, бюджетные треки ($0 в США, госстипендии, доступная Европа/Канада) и соберите черновой список из 15–20 вузов.",
    ],
  },
  {
    when: "Лето перед выпускным классом",
    title: "Список вузов (3+3+2), экзамены и первые черновики эссе",
    tasks: [
      "Зафиксируйте 8–12 вузов (Reach / Target / Safety) с учётом CSS Fee Waiver / ISFAA / госстипендий.",
      "Сдайте или запланируйте финальную сдачу IELTS / TOEFL / Duolingo и при необходимости SAT.",
      "Напишите первый черновик Personal Statement и изучите 8 пунктов по каждому целевому вузу для «Why Us?».",
    ],
  },
  {
    when: "Сентябрь – Ноябрь (выпускной класс)",
    title: "Ранние дедлайны (ED/EA), рекомендации и переводы",
    tasks: [
      "Сделайте выписку оценок за 3–4 года и нотариальные переводы (+ апостиль при необходимости).",
      "Запросите 2–3 рекомендательных письма от учителей и Common App Fee Waiver у школьного советника.",
      "Подайте заявки Early Decision / Early Action и ранние номинации на крупные гранты (1–15 ноября / 1 декабря — как Richmond Scholars, USC, W&L Johnson).",
    ],
  },
  {
    when: "Декабрь – Февраль",
    title: "Основные дедлайны (RD), госстипендии и финансовые формы",
    tasks: [
      "Отправьте заявки в Regular Decision (1–15 января США, декабрь–февраль Канада через OUAC / UCAS в UK).",
      "Отправьте CSS Profile / ISFAA / PFAA / IFAW / WISFAA и справки о доходах семьи строго до дедлайнов финпомощи.",
      "Подайтесь на государственные стипендии (Stipendium Hungaricum, Türkiye Bursları, GKS, MEXT, CSC — окна открываются зимой/ранней весной).",
    ],
  },
  {
    when: "Март – Апрель",
    title: "Сравнение офферов, финпакетов и переговоры",
    tasks: [
      "Сведите все полученные офферы по итоговой чистой сумме к оплате в год (Net Cost = Tuition + Living − Grant).",
      "Если вам дали оффер, но финпакет не закрывает нужду — подавайте вежливую апелляцию в financial aid office с подтверждением новых/уточнённых обстоятельств.",
      "Подтвердите выбор одного вуза к 1 мая (в США), проверьте требования по депозиту.",
    ],
  },
  {
    when: "Май – Август",
    title: "Студенческая виза, жильё и отъезд",
    tasks: [
      "Сразу после получения LOA / I-20 подавайтесь на визу (Study Permit в Канаде лучше начинать в мае–июне во избежание летних задержек), сдавайте биометрию и медосмотр при запросе.",
      "Забронируйте общежитие/жильё, оформите страховку и купите авиабилеты заранее.",
      "Соберите папку оригиналов на границу: паспорт с визой, LOA / I-20, выписки/грант-письма, страховку.",
    ],
  },
];
