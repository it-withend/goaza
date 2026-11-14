import type {
  AffordableEuUni,
  BudgetTrack,
  DocChecklistGroup,
  EssayTypePlaybook,
  FullRideUniEntry,
  GovScholarship,
  InternalUniScholarship,
  OfficerInsight,
  PortalEntry,
  TimelinePhase,
  YaleCaseStudy,
} from "./admissions-knowledge";

export const SHORTLIST_FORMULA_UZ = {
  ratio: "3 Reach + 3 Target + 2 Safety = 8–12 OTM",
  explanation:
    "Muvozanatli ro'yxat «birorta ham taklif yo'q» yoki «o'qishga kirdim, lekin pul yetmayapti» vaziyatidan himoya qiladi. Kam ta'minlangan oilalar uchun ro'yxatdagi har bir OTM yoki ehtiyoj/yutuq asosida 100% qoplashi, yoki qulay davlat stipendiyasi yoxud yiliga €1,000–3,000 darajasidagi to'lovga ega bo'lishi kerak.",
  tiers: [
    {
      tier: "Reach / Dream (3–4 OTM)",
      badge: "Yuqori xavf, maksimal mablag'",
      criteria:
        "Kirish ehtimoli < 15–20%. AQSHda — bular Need-Blind (Harvard, Yale, MIT, Princeton, Amherst, Bowdoin, Dartmouth, Washington & Lee) yoki 100% demonstrated need OTMlar.",
      tip: "Early Decision (ED) bosqichida topshirish statistik jihatdan kirish ehtimolini oshiradi (CDS ma'lumotlariga ko'ra, qabulning 30–50% ED ga to'g'ri keladi), biroq munosib moliyaviy paket berilganda o'qishga kirish majburiyatini yuklaydi.",
    },
    {
      tier: "Target (3–4 OTM)",
      badge: "Asosiy tikish",
      criteria:
        "GPA va SAT/IELTS ballaringiz OTM medianasiga mos keladi (qabul 20–55%), shu bilan birga universitetda chet elliklar uchun tasdiqlangan yordam byudjeti yoki yirik merit-stipendiyalar mavjud.",
      tip: "Bu yerda liberal san'at kollejlari (LAC) hamda bepul ISFAA / CSS Fee Waiver formasiga ega universitetlarni izlang (Berea, Denison, Kenyon, Whitman, Skidmore, Dickinson, Trinity, U of Richmond).",
    },
    {
      tier: "Safety / Financial Backup (2–4 OTM)",
      badge: "Zaxira varianti",
      criteria:
        "Qabul 60%+ YOKI davlat stipendiyalari (Stipendium Hungaricum, Türkiye Bursları, GKS, CSC) YOKI Yevropa/Kanadaning arzon OTMlari (Portugaliya, Belgiya, mintaqaviy Kanada + transfer kollejlari).",
      tip: "Financial Safety — bu shunchaki «kirish oson» emas, balki «AQSHdagi barcha raqobatbardosh grantlar o'xshamasa ham, pul albatta yetadi» deganidir.",
    },
  ],
};

export const BUDGET_TRACKS_UZ: BudgetTrack[] = [
  {
    id: "zero-usd",
    badge: "Yo'nalish $0 / Full-Ride",
    title: "To'liq qoplashga ega AQSH va xalqaro kampuslar",
    budgetPerYear: "$0–$2,000 (to'liq grant bilan; parvoz va depozitlar OTM shartlariga ko'ra)",
    whoFits: "Kuchli ingliz tili, yuqori baholar (GPA 3.7+), faol loyihalar/olimpiadalar yoki qiyinchiliklarni yengish tarixi.",
    keyMechanism:
      "Ehtiyojni 100% qoplaydigan Need-Blind/Need-Aware OTMlar + 103 ta kafolatlangan yoki raqobatbardosh Merit Full-Ride stipendiyalari + Berea College (o'qish $0) kombinatsiyasi.",
    steps: [
      "CSS Fee Waiver / bepul shaklni tekshiring (ISFAA, PFAA, IFAW, WISFAA) — har bir OTM uchun $25 + $16 to'lamang.",
      "Maktab maslahatchisi/direktori orqali Common App Fee Waiver so'rang.",
      "Additional Information bo'limida oilaning moliyaviy ahvoli va uy vazifalarini (ishlash, ota-onaga yordam) halol tasvirlang.",
      "Avtomatik yoki yarim avtomatik merit full-ride beradigan kamida 2–3 OTMni ro'yxatga qo'shing.",
    ],
    catalogHref: "/dashboard?grant=1",
    catalogLabel: "To'liq grantli OTMlarni ochish",
  },
  {
    id: "gov-scholarships",
    badge: "Davlat stipendiyalari yo'nalishi",
    title: "Yevropa va Osiyoning 100% davlat dasturlari",
    budgetPerYear: "O'qish $0 + oylik stipendiya va yotoqxona",
    whoFits: "Kam daromadli oilalar uchun ajoyib «sug'urta» va asosiy yo'l: stipendiya ko'pincha yotoqxona, sug'urta va cho'ntak pulini o'z ichiga oladi.",
    keyMechanism:
      "Bir vaqtning o'zida 2–3 davlat dasturiga topshirish: Stipendium Hungaricum (57 OTM), Türkiye Bursları (103 OTM), CSC (279 OTM), MEXT (399 OTM), GKS (64 OTM).",
    steps: [
      "Turkiya (Türkiye Bursları), Xitoy (CSC), Yaponiya (MEXT) va Koreyada (GKS) 1-tayyorlov til yili mavjud — mahalliy tilni oldindan bilish shart emas.",
      "Yagona asosiy paketni yig'ing: xorijga chiqish pasporti, tarjima qilingan baholar transkripti, tavsiyanomalar, motivatsion xat, til sertifikati.",
      "Mamlakatingiz kvotalari va qoidalarini kuzating (ayrim dasturlar uchun davlat organlari/elchixona orqali nomzodlik qo'yiladi).",
    ],
    catalogHref: "/dashboard?country=Hungary&grant=1",
    catalogLabel: "Vengriyaning grantli OTMlarini ko'rish",
  },
  {
    id: "low-cost-work",
    badge: "Byudjet + Ish yo'nalishi",
    title: "Qulay Yevropa (€1,000–4,800/yil) va Kanada (Co-op / Kollej → OTM)",
    budgetPerYear: "€1,000–€4,800 o'qish (Yevropa) yoki ishlash huquqiga ega Kanada kollejlari CAD 10,000–20,000",
    whoFits: "Birinchi yilni jamg'arma/qo'shimcha ish bilan yopa oladigan hamda kafolatlangan ishlash ruxsatnomasi yoki top-universitetga o'tishni xohlaydigan oilalar.",
    keyMechanism:
      "Portugaliya va Belgiyada (Lisbon, Porto, KU Leuven, Ghent) o'qish narxi MDH kontraktlari bilan taqqoslanarli; Kanadada 2 yil kollej → 3-kursga universitetga o'tish o'n minglab CAD tejaydi va haftasiga 24 soatgacha ishlash + 3 yilgacha PGWP huquqini beradi.",
    steps: [
      "Faqat Toronto va Vankuver bilan cheklanmang: Saskachevan, Manitoba, Nyu-Brunsvik va Yangi Shotlandiyada turar joy ancha arzon.",
      "Haq to'lanadigan Co-op dasturlarini tanlang (Waterloo, SFU, Dalhousie, Regina, MUN).",
      "Yevropada Padua (o'qish + €8,000/yil) va arzon kontraktli mintaqaviy stipendiyalarni tekshiring.",
    ],
    catalogHref: "/dashboard?country=Canada",
    catalogLabel: "Kanada OTM va kollejlarini o'rganish",
  },
];

export const GOV_SCHOLARSHIPS_UZ: GovScholarship[] = [
  {
    country: "Vengriya",
    name: "Stipendium Hungaricum",
    levels: "Bakalavriat, Magistratura, PhD",
    unisCount: "Vengriyaning 57 universiteti",
    stipend: "Oyiga 43,700 HUF (~€110) × 12 oy + yotoqxona yoki 40,000 HUF/oy (~€100)",
    coverage: [
      "O'qish to'lovidan 100% ozod qilish",
      "Bepul yotoqxona o'rni YOKI oyiga 40,000 HUF (~€100) ijara kompensatsiyasi",
      "Qonun bo'yicha tibbiy sug'urta + yiliga 65,000 HUF (~€165) gacha qo'shimcha sug'urta",
    ],
    url: "https://stipendiumhungaricum.hu",
  },
  {
    country: "Turkiya",
    name: "Türkiye Bursları",
    levels: "Bakalavriat, Magistratura, PhD",
    unisCount: "Turkiyaning 103 universiteti",
    stipend: "$100/oy (bak.), $150/oy (mag.), $200/oy (PhD)",
    coverage: [
      "Bepul o'qish + majburiy 1 yillik turk tili kursi",
      "Yotoqxonada yashash + tibbiy sug'urta",
      "Borish (kirganda) va qaytish (bitirganda) aviachiptalari",
    ],
    url: "https://turkiyeburslari.gov.tr",
  },
  {
    country: "Janubiy Koreya",
    name: "Global Korea Scholarship (GKS)",
    levels: "Bakalavriat, Magistratura, PhD",
    unisCount: "Koreyaning 64 universiteti (kvota bo'yicha yiliga 150 stipendiant)",
    stipend: "~$740–$1,110/oy + TOPIK 5–6 darajasi uchun ustama",
    coverage: [
      "Semestriga ~$3,365 gacha o'qishni davlat qoplaydi, qolganini — qabul qiluvchi OTM",
      "Asosiy dasturdan oldin 1 yil majburiy koreys tili kurslari",
      "Borish-kelish aviachiptalari, kelganda ko'tarma pul, tibbiy sug'urta va diplom chop etish granti",
    ],
    url: "https://gksscholarship.com",
  },
  {
    country: "Xitoy",
    name: "Chinese Government Scholarship (CSC)",
    levels: "Bakalavriat, Magistratura, PhD",
    unisCount: "Xitoyning 279 universiteti",
    stipend: "Bakalavriatda $360/oy (magistratura/PhD da yuqoriroq)",
    coverage: [
      "Dasturda 100% bepul o'qish",
      "Talabalar yotoqxonasida bepul yashash",
      "Asosiy tibbiy sug'urta",
    ],
    url: "https://www.chinesescholarshipcouncil.com/ru/",
  },
  {
    country: "Yaponiya",
    name: "MEXT (Monbukagakusho)",
    levels: "Bakalavriat, Magistratura, PhD",
    unisCount: "Yaponiyaning 399 universiteti",
    stipend: "$735/oy (o'qish bosqichiga bog'liq)",
    coverage: [
      "O'qish va kirish imtihonlarining 100% to'lovi",
      "Borish va qaytish aviachiptalari + turar joy bilan yordam",
      "Magistratura/PhD da dastlabki 6–12 oy odatda imtihonga tayyorlanish bilan Research Student maqomida",
    ],
    url: "https://www.mext.go.jp/en/index.htm",
  },
  {
    country: "Yevropa Ittifoqi",
    name: "Erasmus Mundus Joint Masters",
    levels: "Magistratura (Yevropaning 2–3 davlatida o'qish)",
    unisCount: "Yevropa OTMlarining qo'shma konsorsiumlari",
    stipend: "~€1,000–€1,400/oy",
    coverage: [
      "Butun dastur davomida o'qish narxining 100% qoplanishi",
      "Ko'chib o'tish, viza va transport grantlari",
      "Bir nechta YI davlatlarining qo'shma/ikki tomonlama diplomini olish imkoniyati",
    ],
    url: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters",
  },
  {
    country: "Germaniya",
    name: "DAAD Scholarships",
    levels: "Magistratura, PhD, tadqiqotlar",
    unisCount: "Germaniyaning ~400 OTMi",
    stipend: "~€934/oy",
    coverage: [
      "Oylik stipendiya, sug'urta va yo'l xarajatlari",
      "Germaniyaning ko'pgina davlat universitetlarida o'qish bepul",
    ],
    importantNote: "Topshirishdan oldin tashkilotning joriy huquqiy maqomini va fuqaroligingiz mamlakati uchun yo'nalishlar ochiqligini tekshiring.",
    url: "https://www.daad.de/en/",
  },
  {
    country: "Buyuk Britaniya",
    name: "Chevening Scholarships",
    levels: "Magistratura (1 yil)",
    unisCount: "Buyuk Britaniyaning ~170 universiteti",
    stipend: "Yashash xarajatlarini qoplash va UK stavkasi bo'yicha oylik stipendiya",
    coverage: [
      "O'qish, viza yig'imlari va aviachiptalarning 100% to'lovi",
      "Talab: kamida 2 yillik ish tajribasi (amaliyot/yarim kunlik ishlarni soatlarda hisoblash mumkin) va 3 ta dastur tanlash",
    ],
    importantNote: "Ayrim davlatlar fuqarolari uchun maxsus kirish qoidalari/cheklovlar amal qiladi — Chevening saytida maqomni aniqlang.",
    url: "https://www.chevening.org/",
  },
];

export const INTERNAL_UNI_SCHOLARSHIPS_UZ: InternalUniScholarship[] = [
  {
    country: "Kanada",
    university: "University of Toronto",
    slug: "university-of-toronto-canada",
    programName: "Lester B. Pearson International Scholarship",
    levels: "Bakalavriat",
    coverage: "4 yilga to'liq o'qish + kitoblar + yotoqxona + sug'urta",
    quota: "Yiliga ~37 kishi (maktab nomzodligi)",
    majors: ["Computer Science", "Engineering", "Business", "Economics"],
    url: "https://future.utoronto.ca/pearson/",
  },
  {
    country: "Kanada",
    university: "University of British Columbia",
    slug: "university-of-british-columbia-canada",
    programName: "International Scholars Program (KMIS / OIS / IMES)",
    levels: "Bakalavriat",
    coverage: "~CAD 10,000 dan ehtiyoj va o'qishni to'liq qoplashgacha",
    quota: "Yiliga ~50–60 kishi",
    majors: ["Computer Science", "Economics", "Engineering", "Psychology"],
    url: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/",
  },
  {
    country: "Kanada",
    university: "York University",
    slug: "york-university-canada",
    programName: "President’s International Scholarship of Excellence (PISE)",
    levels: "Bakalavriat",
    coverage: "Yiliga ~45,000 CAD gacha (4 yilda 180,000 CAD gacha)",
    quota: "Yiliga 10–20 kishi",
    majors: ["Business", "Computer Science", "Economics", "Media"],
    url: "https://futurestudents.yorku.ca/financing-your-degree/scholarships-bursaries",
  },
  {
    country: "Fransiya",
    university: "Sciences Po",
    slug: "sciences-po-france",
    programName: "Emile Boutmy Scholarship",
    levels: "Bakalavriat va Magistratura",
    coverage: "O'qish va yashash xarajatlariga yiliga ~€19,000 gacha",
    majors: ["Economics", "Political Science", "International Relations"],
    url: "https://www.sciencespo.fr/students/en/fees-funding/financial-aid/emile-boutmy-scholarship/",
  },
  {
    country: "Italiya",
    university: "University of Padua",
    slug: "university-of-padua-italy",
    programName: "Padua International Excellence Scholarship",
    levels: "Bakalavriat va Magistratura",
    coverage: "O'qish to'lovidan 100% ozod + yiliga ~€8,000 stipendiya",
    quota: "Yiliga 67 stipendiya",
    majors: ["Data Science", "Information Engineering", "Psychology"],
    url: "https://www.unipd.it/en/padua-excellence",
  },
  {
    country: "Ispaniya",
    university: "IE University",
    slug: "ie-university-spain",
    programName: "IE Scholarship for Personal Excellence",
    levels: "Bakalavriat",
    coverage: "O'qish + turar joyni 100% gacha qoplash (full ride gacha)",
    quota: "Kursdan 2 ta to'liq qoplash",
    majors: ["Economics", "Business", "Data Analytics"],
    url: "https://www.ie.edu/financial-aid/scholarship-list/",
  },
  {
    country: "Janubiy Koreya",
    university: "KAIST",
    slug: "kaist-south-korea",
    programName: "KAIST International Student Scholarship",
    levels: "Bakalavriat, Magistratura, PhD",
    coverage: "100% o'qish + oylik stipendiya + yotoqxona + sug'urta",
    majors: ["AI", "Computer Science", "Robotics"],
    url: "https://admission.kaist.ac.kr/",
  },
  {
    country: "Gonkong",
    university: "HKUST",
    slug: "hong-kong-university-of-science-and-technology-hong-kong",
    programName: "Global Learners Scholarship",
    levels: "Bakalavriat",
    coverage: "Butun o'qish muddatiga uzaytirish bilan o'qish to'lovidan to'liq ozod",
    majors: ["Computer Science", "Economics", "Business"],
    url: "https://join.hkust.edu.hk/global-learners-scholarship",
  },
  {
    country: "Singapur",
    university: "National University of Singapore (NUS)",
    slug: "national-university-of-singapore-singapore",
    programName: "NUS International Undergraduate Scholarship",
    levels: "Bakalavriat",
    coverage: "100% o'qish (MOE Tuition Grant bilan) + S$4,500/yil + S$3,900/yil yotoqxona + noutbukka bir marta S$1,300",
    quota: "Yiliga ~20–30 stipendiant",
    majors: ["Computer Science", "Data Science", "Business", "Engineering"],
    url: "https://nus.edu.sg/oam/scholarships",
  },
  {
    country: "Singapur",
    university: "Nanyang Technological University (NTU)",
    slug: "nanyang-technological-university-singapore",
    programName: "NTU President Award",
    levels: "Bakalavriat",
    coverage: "$10,000 o'quv nafaqasi + 4 yil yotoqxona + xorijiy safarlarga $10,000 + o'qish uchun qo'shimcha grantlar",
    majors: ["AI", "Computer Science", "Engineering"],
    url: "https://www.ntu.edu.sg/admissions/undergraduate/scholarships",
  },
];

export const AFFORDABLE_EU_UNIS_UZ: AffordableEuUni[] = [
  {
    country: "Portugaliya",
    university: "University of Lisbon",
    slug: "university-of-lisbon-portugal",
    tuitionPerYear: "€1,000–€2,500 / yil",
    livingPerMonth: "~€900 / oy",
    strongMajors: ["Data Science", "Engineering"],
  },
  {
    country: "Portugaliya",
    university: "University of Porto",
    slug: "university-of-porto-portugal",
    tuitionPerYear: "€1,000–€2,500 / yil",
    livingPerMonth: "~€800 / oy",
    strongMajors: ["Computer Science", "Business"],
  },
  {
    country: "Belgiya",
    university: "KU Leuven",
    slug: "ku-leuven-belgium",
    tuitionPerYear: "€2,000–€3,000 / yil",
    livingPerMonth: "~€900 / oy",
    strongMajors: ["Economics", "Business"],
  },
  {
    country: "Belgiya",
    university: "Ghent University",
    slug: "ghent-university-belgium",
    tuitionPerYear: "€1,800–€4,800 / yil",
    livingPerMonth: "~€900 / oy",
    strongMajors: ["Computer Science", "Engineering", "Social Sciences"],
  },
];

export const FULL_RIDE_TSVIRKKOO_UZ: FullRideUniEntry[] = [
  { name: "Amherst College", tag: "need-blind", note: "Need-blind, 100% demonstrated need", slug: "amherst-college-usa" },
  { name: "Bowdoin College", tag: "need-blind", note: "Chet elliklar uchun need-blind, 100% ehtiyoj", slug: "bowdoin-college-usa" },
  { name: "Brown University", tag: "need-blind", note: "Chet elliklar uchun need-blind (Class of 2029 dan boshlab)", slug: "brown-university-usa" },
  { name: "Dartmouth College", tag: "need-blind", note: "Barcha uchun need-blind, 100% ehtiyoj", slug: "dartmouth-college-usa" },
  { name: "Harvard University", tag: "need-blind", note: "Barcha davlatlar uchun need-blind, daromad <$85k da $0", slug: "harvard-university-usa" },
  { name: "Massachusetts Institute of Technology (MIT)", tag: "need-blind", note: "Barcha uchun need-blind, 100% ehtiyoj", slug: "massachusetts-institute-of-technology-usa" },
  { name: "University of Notre Dame", tag: "need-blind", note: "Ehtiyojni to'liq qoplash bilan need-blind", slug: "university-of-notre-dame-usa" },
  { name: "Princeton University", tag: "need-blind", note: "Need-blind, o'zining bepul PFAA shakli", slug: "princeton-university-usa" },
  { name: "Washington and Lee University", tag: "need-blind", note: "Chet elliklar uchun need-blind + Johnson Scholarship", slug: "washington-and-lee-usa" },
  { name: "Yale University", tag: "need-blind", note: "Barcha uchun need-blind, qarzlarsiz", slug: "yale-university-usa" },
  { name: "Berea College", tag: "free-tuition", note: "Barcha qabul qilinganlar uchun o'qish bepul + kampusda stipendiya", slug: "berea-college-usa" },
  { name: "Centre College", tag: "merit", note: "Lincoln Scholars / Brown Fellows — merit bo'yicha full ride", slug: "centre-college-usa" },
  { name: "Simmons University", tag: "merit", note: "Kotzen Scholarship (full tuition + turar joy)", slug: "simmons-university-usa" },
  { name: "UNC Chapel Hill", tag: "merit", note: "Morehead-Cain / Robertson — faqat merit bo'yicha full ride", slug: "university-of-north-carolina-at-chapel-hill-usa" },
  { name: "Denison University", tag: "need-aware", note: "Kuchli paket; minimal EFC mo'ljali yiliga ~$5k–10k", slug: "denison-university-usa" },
  { name: "Dickinson College", tag: "merit", note: "To'liq qoplashgacha merit + need kombinatsiyasi", slug: "dickinson-college-usa" },
  { name: "Kenyon College", tag: "need-aware", note: "100% ehtiyoj (EFC mo'ljali yiliga ~$5k dan)", slug: "kenyon-college-usa" },
  { name: "Babson College", tag: "need-aware", note: "Global Scholars + need-based yordam", slug: "babson-college-usa" },
  { name: "Bard College", tag: "need-aware", note: "Need + merit orqali full ride mumkin", slug: "bard-college-usa" },
  { name: "Barnard College", tag: "need-aware", note: "Ayollar kolleji, 100% demonstrated need", slug: "barnard-college-usa" },
  { name: "Bates College", tag: "need-aware", note: "Qarzlarsiz 100% ehtiyoj", slug: "bates-college-usa" },
  { name: "Bennington College", tag: "need-aware", note: "O'zining bepul Bennington ISFA shakli", slug: "bennington-college-usa" },
  { name: "Brandeis University", tag: "need-aware", note: "Chet elliklar uchun 100% demonstrated need", slug: "brandeis-university-usa" },
  { name: "Bryn Mawr College", tag: "need-aware", note: "Ayollar LAC, 100% ehtiyoj + CSS Waiver shakli", slug: "bryn-mawr-college-usa" },
  { name: "Bucknell University", tag: "need-aware", note: "Yirik stipendiyalar + ehtiyoj", slug: "bucknell-university-usa" },
  { name: "Carleton College", tag: "need-aware", note: "100% demonstrated need (CSS/ISFAA)", slug: "carleton-college-usa" },
  { name: "Claremont McKenna College", tag: "need-aware", note: "100% ehtiyoj (to'liq paketlar kamyob, yuqori raqobat)", slug: "claremont-mckenna-college-usa" },
  { name: "Colby College", tag: "need-aware", note: "Application fee yo'q, 100% ehtiyoj", slug: "colby-college-usa" },
  { name: "Colorado College", tag: "need-aware", note: "Block plan, 100% demonstrated need", slug: "colorado-college-usa" },
  { name: "Columbia University", tag: "need-aware", note: "Qabul qilingan chet elliklar uchun 100% ehtiyoj", slug: "columbia-university-usa" },
  { name: "Cornell University", tag: "need-aware", note: "100% demonstrated need (need-aware)", slug: "cornell-university-usa" },
  { name: "Davidson College", tag: "need-aware", note: "Qarzlarsiz 100% ehtiyoj; daromad <$5k da alt-shakl", slug: "davidson-college-usa" },
  { name: "Duke University", tag: "need-aware", note: "Karsh International Scholars + need-based", slug: "duke-university-usa" },
  { name: "Duke Kunshan University (DKU)", tag: "need-aware", note: "Duke ning Xitoydagi yirik grantli qo'shma kampusi", slug: null },
  { name: "Emory University", tag: "need-aware", note: "Emory Scholars + 100% ehtiyoj", slug: "emory-university-usa" },
  { name: "Franklin & Marshall College", tag: "need-aware", note: "100% ehtiyoj (muqobil yordam shakli)", slug: "franklin-marshall-college-usa" },
  { name: "Georgetown University in Qatar", tag: "need-aware", note: "Qatardagi Education City kampusi, saxiy yordam", slug: "georgetown-university-in-qatar-qatar" },
  { name: "Grinnell College", tag: "need-aware", note: "100% ehtiyoj + merit mukofotlar", slug: "grinnell-college-usa" },
  { name: "Hamilton College", tag: "need-aware", note: "100% demonstrated need", slug: "hamilton-college-usa" },
  { name: "Harvey Mudd College", tag: "need-aware", note: "Muhandislik LAC, merit + ehtiyoj", slug: "harvey-mudd-college-usa" },
  { name: "Haverford College", tag: "need-aware", note: "100% ehtiyoj (CSS/FISFAA)", slug: "haverford-college-usa" },
  { name: "Hong Kong Baptist University", tag: "merit", note: "Gonkongda to'liq qoplashgacha Admission Scholarship", slug: "hong-kong-baptist-university-hong-kong" },
  { name: "HKUST", tag: "merit", note: "Global Learners / Admission Scholarship", slug: "hong-kong-university-of-science-and-technology-hong-kong" },
  { name: "Johns Hopkins University", tag: "need-aware", note: "100% ehtiyoj, o'zining JHU ISFAA shakli", slug: "johns-hopkins-university-usa" },
  { name: "Lafayette College", tag: "need-aware", note: "100% ehtiyoj + Marquis Fellowship", slug: "lafayette-college-usa" },
  { name: "Lehigh University", tag: "need-aware", note: "100% ehtiyoj (CSS + LUCF)", slug: "lehigh-university-usa" },
  { name: "Macalester College", tag: "need-aware", note: "100% ehtiyoj (CSS/ISFAA) + DeWitt Wallace", slug: "macalester-college-usa" },
  { name: "Minerva University", tag: "need-blind", note: "Need-based grantlar + work-study", slug: "minerva-schools-at-kgi-usa" },
  { name: "Mount Holyoke College", tag: "need-aware", note: "Ayollar kolleji, 100% ehtiyoj + merit", slug: "mount-holyoke-college-usa" },
  { name: "Northwestern University", tag: "need-aware", note: "Qarzlarsiz 100% ehtiyoj (CSS/ISFAA)", slug: "northwestern-university-usa" },
  { name: "Northwestern University in Qatar", tag: "need-aware", note: "Qatardagi grantli kampus", slug: "northwestern-university-in-qatar-qatar" },
  { name: "NYU Abu Dhabi", tag: "need-aware", note: "Chiptalar va ovqatlanishgacha to'liq grantlar", slug: "nyu-abu-dhabi-uae" },
  { name: "Pitzer College", tag: "need-aware", note: "100% ehtiyoj (to'liq paketlar kam, PIFAA shakli)", slug: "pitzer-college-usa" },
  { name: "Pomona College", tag: "need-aware", note: "100% ehtiyoj + Pomona Access Pass", slug: "pomona-college-usa" },
  { name: "Rice University", tag: "need-aware", note: "100% demonstrated need", slug: "rice-university-usa" },
  { name: "Rhodes College", tag: "need-aware", note: "Merit + ehtiyoj (RFIF shakli)", slug: "rhodes-college-usa" },
  { name: "University of Richmond", tag: "need-aware", note: "Richmond Scholars (1 dek. gacha) + 100% ehtiyoj", slug: "university-of-richmond-usa" },
  { name: "Skidmore College", tag: "need-aware", note: "100% ehtiyoj (CSS/SISFAA), o'rtacha grant ~$58k", slug: "skidmore-college-usa" },
  { name: "Smith College", tag: "need-aware", note: "Ayollar LAC, 100% ehtiyoj + CSS Waiver", slug: "smith-college-usa" },
  { name: "Stanford University", tag: "need-aware", note: "100% ehtiyoj (CSS/ISFAA), lekin chet elliklar uchun need-aware", slug: "stanford-university-usa" },
  { name: "Swarthmore College", tag: "need-blind", note: "Qarzlarsiz 100% ehtiyoj; kirganda CSS waiver", slug: "swarthmore-college-usa" },
  { name: "Trinity College", tag: "need-aware", note: "100% demonstrated need", slug: "trinity-college-ct-usa" },
  { name: "Tufts University", tag: "need-aware", note: "100% ehtiyoj (CSS/ISFAA)", slug: "tufts-university-usa" },
  { name: "Tulane University", tag: "need-aware", note: "To'liq merit-stipendiyalar + ehtiyoj", slug: "tulane-university-usa" },
  { name: "Union College", tag: "need-aware", note: "To'liq qoplashgacha need + merit", slug: "union-college-ny-usa" },
  { name: "University of Chicago", tag: "need-aware", note: "CSS Profile o'rniga bepul IFAW shakli", slug: "the-university-of-chicago-usa" },
  { name: "University of Pennsylvania", tag: "need-aware", note: "Qarzlarsiz 100% ehtiyoj (email orqali CSS Waiver)", slug: "the-university-of-pennsylvania-usa" },
  { name: "University of Rochester", tag: "need-aware", note: "Handler + need-based", slug: "university-of-rochester-usa" },
  { name: "Vanderbilt University", tag: "need-aware", note: "Signature merit scholarships + 100% ehtiyoj", slug: "vanderbilt-university-usa" },
  { name: "Vassar College", tag: "need-aware", note: "100% demonstrated need", slug: "vassar-college-usa" },
  { name: "Washington University in St. Louis", tag: "need-aware", note: "Danforth/Ervin/Rodriguez + 100% ehtiyoj", slug: "washington-university-in-st-louis-usa" },
  { name: "Wellesley College", tag: "need-aware", note: "Ayollar kolleji, 100% ehtiyoj (FAIF)", slug: "wellesley-college-usa" },
  { name: "Wesleyan University", tag: "need-aware", note: "Freeman Asian + 100% ehtiyoj (CSS/ISFAA)", slug: "wesleyan-university-usa" },
  { name: "Whitman College", tag: "need-aware", note: "Bepul WISFAA shakli, merit + ehtiyoj", slug: "whitman-college-usa" },
  { name: "Williams College", tag: "need-aware", note: "Book Grant ni o'z ichiga olgan 100% ehtiyoj", slug: "williams-college-usa" },
];

export const DOC_CHECKLIST_UZ: DocChecklistGroup[] = [
  {
    id: "academic",
    title: "Akademik hujjatlar va baholar",
    badge: "Barcha uchun majburiy",
    items: [
      {
        name: "Attestat + So'nggi 3–4 yillik baholar transkripti",
        detail:
          "Ingliz tiliga (yoki mamlakat tiliga) rasmiy notarial tarjima bilan. Davlat dasturlari va Yevropaning bir qator OTMlari uchun apostil kerak bo'ladi.",
        lowIncomeTip:
          "Tarjimani topshirishdan oldin qilish mumkin, qimmat apostilni esa faqat qabuldan oldin haqiqatan talab qiladigan OTM/vizalar uchun buyurtma qiling.",
      },
      {
        name: "GPA ni 4.0 shkalasiga o'tkazish",
        detail:
          "Agar maktab 5 yoki 12 ballik tizimdan foydalansa, shkalani tushuntiruvchi rasmiy ma'lumotnomani ilova qiling. Baholarni pastga tushiradigan onlayn formulalar bilan xayolan o'tkazmang.",
      },
      {
        name: "Maktab profili va tavsiyanomalar (2 o'qituvchi + maslahatchi)",
        detail:
          "AQSHda tavsiyanomalar esseda yozgan shaxsiy fazilatlaringizni tasdiqlashi kerak: qabul komissiyasi umumiy manzara mosligini tekshiradi.",
      },
    ],
  },
  {
    id: "exams",
    title: "Imtihonlar (Til va SAT/ACT)",
    badge: "Ball strategiyasi",
    items: [
      {
        name: "IELTS / TOEFL / Duolingo English Test (DET)",
        detail:
          "Kanada kollejlari uchun odatda IELTS 6.0–6.5, universitetlar uchun 6.5–7.0. AQSH top-OTMlari ko'pincha TOEFL 100+ / IELTS 7.0–7.5 yoki DET 120–135 so'raydi.",
        lowIncomeTip:
          "Duolingo (IELTS uchun $220+ o'rniga $65) AQSH va Kanadaning o'nlab OTMlari tomonidan qabul qilinadi, ko'plab kollej va universitetlar unga bepul vaucherlar beradi.",
      },
      {
        name: "SAT / ACT (25th–75th percentiles)",
        detail:
          "Hatto test-optional OTMlarda ham yuqori SAT (OTM medianasidan yuqori yoki 1400–1500+ dan) 103 ta raqobatbardosh Merit Full-Ride stipendiyalari uchun juda muhim.",
        lowIncomeTip:
          "Agar eng yaqin test markaziga borish uzoq/qimmat bo'lsa — test-blind yoki kuchli test-optional kollejlarga e'tibor qarating, lekin full-ride merit arizalari uchun SAT topshirishga harakat qiling.",
      },
    ],
  },
  {
    id: "finance",
    title: "Moliyaviy hujjatlar va yig'imlarda tejash",
    badge: "Kam daromadli oilalar uchun",
    items: [
      {
        name: "Common App Fee Waiver (Ariza uchun $50–90 o'rniga $0)",
        detail: "Common App da Fee Waiver bo'limida maktab maslahatchingiz tomonidan bir marta bosish bilan tasdiqlanadi.",
      },
      {
        name: "CSS Profile ($25 + $16/OTM) o'rniga bepul shakllar",
        detail:
          "ISFAA, PFAA (Princeton), IFAW (UChicago), WISFAA (Whitman), Bennington ISFA, PIFAA (Pitzer), FAIF (Wellesley), RFIF (Rhodes) dan foydalaning yoki email orqali CSS Fee Waiver so'rang.",
      },
      {
        name: "Oila daromadlari to'g'risida ma'lumotnoma / YaTT / homiylik xatlari",
        detail:
          "Ota-onaning yillik daromadlari to'g'risidagi ma'lumotnomalar + ingliz tiliga tarjima qilingan ko'chirmalarni tayyorlang. Agar oilada og'ir sharoitlar bo'lsa (kasallik, ishdan ayrilish, qarindoshga qarash) — buni albatta Additional Information da yozing.",
      },
    ],
  },
];

export const COUNTRY_PORTALS_UZ: PortalEntry[] = [
  {
    country: "AQSH",
    portal: "Common App / Coalition / OTM saytlari",
    scope: "Ko'pchilik universitetlar va LAC",
    note: "Common App da 20 tagacha OTM; moliyaviy yordam CSS Profile / ISFAA / OTM portali orqali parallel topshiriladi.",
  },
  {
    country: "Kanada (Ontario)",
    portal: "OUAC (universitetlar) & ontariocolleges.ca (kollejlar)",
    scope: "UofT, Waterloo, McMaster, Western, York, Guelph, Carleton, Algonquin, Humber",
    note: "Yagona profil bir nechta dasturni tanlash imkonini beradi; kuzgi qabul dedlaynlari ko'pincha dekabr–fevralda.",
  },
  {
    country: "Kanada (BC / Alberta / boshqalar)",
    portal: "EducationPlannerBC / ApplyAlberta / OTMlarning to'g'ridan-to'g'ri saytlari",
    scope: "UBC, SFU, UVic, Alberta, Calgary, McGill, Dalhousie, MUN, Saskatchewan, Manitoba",
    note: "Kvebekda (McGill, Concordia) 11-sinf bitiruvchilari uchun qoidalar va CEGEP tizimini tekshiring.",
  },
  {
    country: "Buyuk Britaniya",
    portal: "UCAS",
    scope: "Barcha Britaniya OTMlari (5 tagacha tanlov)",
    note: "Oksford/Kembrij va tibbiyot — dedlayn oktyabrda, asosiy dasturlar — yanvar oxiri. Yagona akademik esse (Personal Statement).",
  },
  {
    country: "Niderlandiya",
    portal: "Studielink + OTM portallari",
    scope: "Davlat tadqiqot va amaliy OTMlari",
    note: "Qat'iy dedlaynlar (Numerus Fixus uchun ko'pincha yanvar, qolganlari uchun bahor); diplom darajasini diqqat bilan tekshirish.",
  },
];

export const ESSAY_PLAYBOOK_UZ: EssayTypePlaybook[] = [
  {
    id: "personal",
    title: "Personal Statement (Common App)",
    wordCount: "500–650 so'z",
    goal: "Hayotingizning aniq bir qismi orqali asosiy qadriyatlaringiz, fikrlash tarzingiz va xarakteringizni ko'rsatish — toki ofitserda siz bilan jonli suhbatlashgandek tuyg'u paydo bo'lsin.",
    structures: [
      {
        label: "Key Event (Muhim voqea)",
        desc: "E'tiqodlaringiz yoki dunyoqarashingizni o'zgartirgan bir burilish nuqtasi — voqea ko'lamidan ko'ra chuqurlik muhimroq.",
      },
      {
        label: "Metaphorical (Metafora)",
        desc: "Shaxsiyatingizning turli tomonlarini bog'lovchi buyum, til, odat yoki joy (Yale ga yozilgan essedagi «ko'p rangli palto» hikoyasi kabi).",
      },
      {
        label: "Timeline (O'sish trayektoriyasi)",
        desc: "Rivojlanib boruvchi bitta mavzu bilan birlashtirilgan vaqt bo'yicha bir nechta qisqa sahnalar.",
      },
    ],
    checklist: [
      "«Thumb Test» dan o'ting: dastlabki 2–3 xatboshini kaftingiz bilan yoping — esse ilk satrlardanoq noyob tarzda sizniki ekani sezilishi kerak.",
      "Anketadagi yutuqlar ro'yxatini qayta aytib bermang — NIMA UCHUN shu ishlarni qilganingizni tushuntiring.",
      "Esse ohangi o'qituvchilarning tavsiyanomalari va umumiy profilga mos kelishini kuzating.",
    ],
  },
  {
    id: "why-us",
    title: "Why This College? (Nega aynan shu OTM)",
    wordCount: "150–300 so'z",
    goal: "Universitetni batafsil o'rganganingizni hamda sizga aynan uning muhiti, kurslari va jamoasi nega kerakligini — va kampusga nima bera olishingizni isbotlash.",
    structures: [
      {
        label: "OTMni o'rganishning 8 nuqtasi",
        desc: "1) Talabalar soni; 2) Public vs Private madaniyati; 3) Joylashuv va shahar imkoniyatlari; 4) Kampus tuzilishi; 5) Talabalar va professorlar nisbati; 6) Kampusning noyob an'analari; 7) Aniq kurslar/laboratoriyalar/professorlar; 8) Dastur moslashuvchanligi (Core vs Open Curriculum).",
      },
      {
        label: "Shaxsiy ko'prik",
        desc: "OTMning har bir detalini o'tgan tajribangiz bilan bog'lang: shunchaki «menga X laboratoriyasi yoqadi» emas, «Y loyihamdan so'ng professor W bilan Z ni tadqiq qilmoqchiman».",
      },
    ],
    checklist: [
      "Anti-shablon: agar OTM nomini boshqasiga almashtirsangiz, matn ma'nosini yo'qotishi kerak — aks holda qayta yozing.",
      "Yakuniy yuborishdan oldin matndagi kollej nomini ikki marta tekshiring (klassik nusxalash xatosi!).",
    ],
  },
  {
    id: "why-major",
    title: "Why Major? (Mutaxassislik tanlash)",
    wordCount: "150–300 so'z",
    goal: "Intellektual qiziquvchanlikni va birinchi savol/kuzatishdan haqiqiy harakatlar hamda rejalargacha bo'lgan yo'lni ko'rsatish.",
    structures: [
      {
        label: "Ilgak → Harakat → Kelajak",
        desc: "Sahna/kuzatishdan boshlang («nega ukam pazlning yetishmayotgan qismi tufayli xafa bo'ldi?»), sinab ko'rgan aniq loyihalar/kurslaringizni ko'rsating va OTMdagi keyingi qadamlar bilan bog'lang.",
      },
    ],
    checklist: [
      "«I am passionate about...» kabi bo'sh shablondan voz keching — buning o'rniga harakatlar va tafsilotlarni ko'rsating.",
      "Agar hali bir qarorga kelmagan bo'lsangiz ham (Undecided), sizni ilhomlantiradigan 2–3 fanning kesishmasini ko'rsating.",
    ],
  },
  {
    id: "extracurricular",
    title: "Extracurricular Essay (Muhim faoliyat)",
    wordCount: "150–300 so'z",
    goal: "Bitta faoliyat (klub, ish, volontyorlik, oilaviy majburiyat) orqali chuqurlik, yetakchilik, qiyinchiliklarni yengish va atrofdagilarga ta'sirni ko'rsatish.",
    structures: [
      {
        label: "Sahna → To'siq → Natija",
        desc: "Yorqin epizoddan boshlang, qiyinchiliklarni (vaqt yetishmasligi, muvaffaqiyatsizlik, murakkab jamoa) halol ko'rsating va shaxsiy o'sish + buni universitetda qanday davom ettirishingiz bilan yakunlang.",
      },
    ],
    checklist: [
      "Activities List dagi quruq raqamlarni takrorlamang — rezyume satri ortidagi hikoyani aytib bering.",
      "Oila uchun ishlash, ukalarga qarash yoki oila byudjeti uchun qo'shimcha ish — olimpiadalar kabi kuchli darsdan tashqari yuklamadir!",
    ],
  },
];

export const ESSAY_26_MISTAKES_UZ: string[] = [
  "1. Boshqa odam bo'lib ko'rinishga urinish (begona ovoz darhol seziladi).",
  "2. Aslida sizga befarq bo'lgan mavzuni «chiroyli» bo'lgani uchun tanlash.",
  "3. Oldindan o'ylab ko'rmasdan va rejasiz yozishni boshlash.",
  "4. Promptda qo'yilgan savolga to'g'ridan-to'g'ri javob bermaslik.",
  "5. Hikoyani aytib berish, lekin o'zingiz haqingizda hech narsa ochib bermaslik.",
  "6. O'quvchingiz kimligini unutish (chatdagi tengdoshlar emas, katta yoshli ofitserlar).",
  "7. Bitta fokus o'rniga butun hayotni 650 so'zga sig'dirishga urinish.",
  "8. Zerikarli shablon kirishdan boshlash («Bolaligimdan beri orzu qilardim…»).",
  "9. O'zingiz tomondan real harakatlarsiz, faqat effekt uchun «o'tkir» mavzu olish.",
  "10. Arzon hiylalar (posilkaga poyabzal solish, g'alati shriftlarda chop etish).",
  "11. Bitta kuchli markaziy fikr o'rniga bir vaqtda 5 ta g'oyaga sochilib ketish.",
  "12. Aniq tafsilotlar, sahnalar va dialoglarsiz abstrakt yozish.",
  "13. Ochiqlik chegarasidan o'tish (xatolari bilan maqtanish yoki xom jarohatni to'kib solish).",
  "14. Rezyume / anketa shaklini ro'yxat qilib qayta aytib berish.",
  "15. Essening qolgan arizadan uzilib qolishi (profil bilan hech qanday aloqa yo'q).",
  "16. Yuzada qolib ketish: NIMA sodir bo'lganini tasvirlab, NEGA bu muhimligiga yetib bormaslik.",
  "17. Yuborishdan oldin qoralamani umuman hech kimga ko'rsatmaslik.",
  "18. 10 kishidan fikr yig'ib, o'z mualliflik ovozingizni yo'qotib qo'yish.",
  "19. Hammadan farqli ko'rinishga urinib sun'iy «ekzotika» siqib chiqarish.",
  "20. Oddiy hayotiy mavzularni rad etish (hatto oddiy vaziyat ham halol berilsa ishlaydi).",
  "21. Soxta eshitiladigan joylarda zo'rma-zo'raki sun'iy yumor ishlatish.",
  "22. Esseni dedlayndan oldingi oxirgi tunda yozish.",
  "23. «Thumb Test» dan yiqilish (kirish va boshlanish juda umumiy va hammaga mos keladi).",
  "24. Matnni tekshirib chiqmaslik (imlo, tinish belgilari, begona shahar yoki OTM nomi!).",
  "25. Aniq kollejning qo'shimcha essesiga umumiy shablonni topshirish.",
  "26. Barcha kuchni essega sarflab, anketa, faoliyatlar ro'yxati va tavsiyanomalarni tashlab qo'yish.",
];

export const OFFICER_INSIGHTS_UZ: OfficerInsight[] = [
  {
    officer: "Dr. Michele Hernandez",
    role: "Dartmouth College qabul komissiyasi direktorining sobiq o'rinbosari",
    takeaways: [
      "Arizani kamida ikki nafar mustaqil ekspert o'qiydi; baholar farq qilsa, ish umumiy qo'mitaga chiqariladi.",
      "Ofitserlar faqat baholar bo'yicha eng yuqori 1% ga qaramaydi — o'rtacha abituriyentlar orasida aynan esse arizani rad etishdan qabulga o'tkazadi.",
      "Folkner bo'lish shart emas — ofitserlar kuniga o'nlab fayllarni o'qiydi hamda ma'no, halollik va esse ohangining o'qituvchilar tavsiyanomalariga mosligini baholaydi.",
      "Favqulodda oilaviy/moliyaviy qiyinchiliklarni komissiya real kontekstingizni tushunishi uchun alohida aniq xat (Additional Information) bilan tushuntirgan ma'qul.",
    ],
  },
  {
    officer: "Eva Ostrum",
    role: "Yale University qabul komissiyasi direktorining sobiq o'rinbosari",
    takeaways: [
      "Faktlar darajasida «boshqalarga o'xshamas» ko'rinishga urinmang — komissiya minglab faoliyatlarni ko'rgan; sizni noyob qiladigan narsa — bu haqda QANDAY fikrlashingiz va yozishingizdir.",
      "Agar siz bilan mavzu o'rtasida allaqachon anglash masofasi bo'lsa, hatto kundalik yoki kulgili maishiy syujet ham balandparvoz fojialardan kuchliroq ta'sir qiladi.",
      "Kuchli essening bosh mezoni: o'qigandan keyin ofitser siz bilan bir xonada jonli suhbatlashib o'tirgandek his qiladi.",
    ],
  },
];

export const YALE_ESSAY_CASES_UZ: YaleCaseStudy[] = [
  {
    title: "Essay 1 — Community Engagement & Service",
    category: "Kam daromadli oilalar bolalari bilan ishlash (Nyu-York / Santa-Barbara)",
    summary:
      "Talaba Nyu-Yorkdagi maydoncha va Santa-Barbaradagi oshxonadagi kontrast sahnalarni solishtiradi va «low-income» yorlig'i nima uchun jonli nyuanslarni yashirishini mulohaza qilib, buni bo'lajak antropologiya o'qishi bilan bog'laydi.",
    whyItWorked: [
      "Ilk jumlalardanoq aniq sahnaga sho'ng'ish (bolalar ismlari, Frozen qo'g'irchoqlari, onaning xati).",
      "«Xaloskor» pozitsiyasining yo'qligi: halol kuzatish, murakkab xulosa va akademik maqsad bilan bog'liqlik (advocacy + anthropology).",
    ],
  },
  {
    title: "Essay 2 — Personal Identity & Community",
    category: "Tillar, ildizlar va o'zlik",
    summary:
      "Mandarin lahjasidan rus tili va madaniy muhiti orqali o'zini «ko'p rangli paltodagi sayohatchi» obrazi sifatida anglash yo'li haqidagi hikoya.",
    whyItWorked: [
      "Oddiy va yaxlit metafora bir nechta madaniyat va ko'chishlarni yagona shaxsiy hikoyaga birlashtiradi.",
      "Anketada tillarni quruq sanash o'rniga muallifning iliq, insoniy ovozi.",
    ],
  },
];

export const CANADA_PLAYBOOK_UZ = {
  institutions: [
    {
      title: "Universitetlar (Universities)",
      desc: "Bakalavriat (3–4 yil), magistratura, PhD. Fan, tadqiqotlar va nazariyaga e'tibor; kuchli co-op dasturlari.",
    },
    {
      title: "Kollejlar (Colleges)",
      desc: "Sertifikatlar (1–2 yil), diplomlar (2–3 yil), amaliy bakalavriat. Amaliyot va stajirovkalar, narxi OTMlardagi $20,000–$35,000+ ga nisbatan yiliga $10,000–$20,000 CAD; ko'pincha universitetning yuqori kurslariga o'tish (Transfer) mumkin.",
    },
    {
      title: "Kvebekdagi CEGEP",
      desc: "Kvebek OTMlaridan oldin maktabdan keyingi maxsus bosqich: MDH 11-sinfidan keyin topshiruvchilar OTM saytida dastur davomiyligini tekshirishi kerak (masalan, McGill, Concordia).",
    },
  ],
  workAndMigration: [
    "Study Permit bo'yicha o'qish davomida talabalarga semestrda haftasiga 24 soatgacha va ta'tilda cheklovsiz ishlashga ruxsat beriladi.",
    "Co-op dasturlari to'g'ridan-to'g'ri mutaxassislik bo'yicha rasmiy haq to'lanadigan stajirovkalarni o'z ichiga oladi.",
    "Bitirgandan so'ng 3 yilgacha muddatga Post-Graduation Work Permit (PGWP) olish mumkin — bu Kanada ish tajribasi va immigratsiyasiga to'g'ridan-to'g'ri ko'prik.",
  ],
  livingCosts: [
    "Universitetlarda o'qish: ~$20,000–$30,000 CAD/yil (muhandislik/tibbiyot ~$35,000+ CAD gacha; gumanitar va biznes ~$20,000).",
    "Kollejlar: sezilarli darajada arzon — ~$10,000–$20,000 CAD/yil.",
    "Kampusdan tashqarida yashash: xona ~$500–$800/oy, ovqatlanish ~$200–$300/oy, transport ~$100–$150/oy. Toronto va Vankuver qimmatroq, mintaqaviy shaharlar ancha qulay.",
  ],
  studyPermitSteps: [
    "1. Akkreditatsiyadan o'tgan DLI o'quv yurtidan Letter of Acceptance (LOA) olish.",
    "2. Proof of Funds yig'ish: IRCC talablari bo'yicha 1 yillik o'qish + yashash + yo'l uchun bank ko'chirmalari / homiylik hujjatlari.",
    "3. Yig'imlarni to'lash va topshirgandan keyin viza markazida biometriya topshirishga tayyorlanish.",
    "4. Amaldagi xorijga chiqish pasporti va Kanada standartlari bo'yicha raqamli surat.",
    "5. Tibbiy sug'urta talablarini tekshirish va so'ralganda tibbiy ko'rikdan o'tish.",
    "6. IRCC saytida imkon qadar ertaroq onlayn ariza berish (avgust navbatlariga tushmaslik uchun LOA dan keyin may–iyun optimal).",
    "7. Qarorni kutish va vizani yopishtirish / ma'qullash xatini olish.",
    "8. Chegarada LOA, ko'chirmalar, sug'urta va to'lov hujjatlari qog'oz nusxalariga ega bo'lish — ofitser qog'oz Study Permit beradi.",
  ],
  commonMistakes: [
    "11-sinf oxirida kech boshlash: IELTS ni qayta topshirishga va provinsiyalarni ongli tanlashga vaqt qolmaydi.",
    "OTM saytlarini yetarlicha o'rganmaslik: rasmiy dedlaynlar va talablar o'rniga faqat tanishlar maslahatiga tayanish.",
    "Faqat Toronto va Vankuverga e'tibor qaratish: qulay muqobillar mavjud bo'lsa-da, yuqori raqobat va qimmat ijara.",
    "Byudjetni tejash va mehnat bozoriga ertaroq chiqish imkonini beruvchi kollejlar hamda transfer dasturlarini e'tiborsiz qoldirish.",
  ],
  hiddenGems: [
    { name: "University of Waterloo (Ontario)", note: "CS, muhandislik va haq to'lanadigan Co-op stajirovkalar tizimi bo'yicha jahon yetakchisi.", slug: "university-of-waterloo-canada" },
    { name: "Simon Fraser University (BC)", note: "Vankuver yonidagi Bernabi: kuchli biznes, kommunikatsiyalar va CS.", slug: "simon-fraser-university-canada" },
    { name: "University of Saskatchewan (Saskachevan)", note: "Top-15 U15 tadqiqot OTMlari guruhiga kiradi; o'qish va yashash narxi pastroq.", slug: "university-of-saskatchewan-canada" },
    { name: "University of Guelph (Ontario)", note: "Biologiya fanlari, agronomiya, veterinariya + chet elliklar uchun sezilarli stipendiyalar.", slug: null },
    { name: "University of Manitoba (Manitoba)", note: "Yashash xarajatlari pastroq va kirish stipendiyalariga ega yirik provinsiya OTMi.", slug: "university-of-manitoba-canada" },
    { name: "Dalhousie University (Yangi Shotlandiya)", note: "Galifaks: kuchli muhandislik, tibbiyot, huquq va fanlar.", slug: "dalhousie-university-canada" },
    { name: "Carleton University (Ontario)", note: "Ottava: kuchli CS, jurnalistika, xalqaro munosabatlar; turar joy Torontodan arzonroq.", slug: null },
  ],
};

export const TIMELINE_2_YEARS_UZ: TimelinePhase[] = [
  {
    when: "1,5–2 yil oldin (MDH 9–10 sinf)",
    title: "Til, baholar va darsdan tashqari poydevor",
    tasks: [
      "Akademik ingliz tilini mustahkamlang va yuqori o'rtacha ballni (GPA) saqlang.",
      "O'lchanadigan natijaga ega 2–4 ta uzoq muddatli darsdan tashqari faoliyat yoki real loyihani tanlang.",
      "Mamlakatlarni, byudjet yo'nalishlarini (AQSHda $0, davlat stipendiyalari, qulay Yevropa/Kanada) o'rganing va 15–20 ta OTMdan iborat qoralama ro'yxat tuzing.",
    ],
  },
  {
    when: "Bitiruv sinfidan oldingi yoz",
    title: "OTMlar ro'yxati (3+3+2), imtihonlar va ilk esse qoralamalari",
    tasks: [
      "CSS Fee Waiver / ISFAA / davlat stipendiyalarini hisobga olib 8–12 ta OTMni (Reach / Target / Safety) belgilang.",
      "IELTS / TOEFL / Duolingo va zarurat bo'lsa SAT ni yakuniy topshiring yoki rejalashtiring.",
      "Personal Statement ning birinchi qoralamasini yozing va «Why Us?» uchun har bir maqsadli OTM bo'yicha 8 ta bandni o'rganing.",
    ],
  },
  {
    when: "Sentyabr – Noyabr (bitiruv sinfi)",
    title: "Erta dedlaynlar (ED/EA), tavsiyanomalar va tarjimalar",
    tasks: [
      "3–4 yillik baholar ko'chirmasini va notarial tarjimalarni (+ zarurat bo'lsa apostil) tayyorlang.",
      "O'qituvchilardan 2–3 ta tavsiyanoma xati va maktab maslahatchisidan Common App Fee Waiver so'rang.",
      "Early Decision / Early Action arizalarini va yirik grantlarga erta nomzodliklarni topshiring (1–15 noyabr / 1 dekabr — Richmond Scholars, USC, W&L Johnson kabi).",
    ],
  },
  {
    when: "Dekabr – Fevral",
    title: "Asosiy dedlaynlar (RD), davlat stipendiyalari va moliyaviy shakllar",
    tasks: [
      "Regular Decision ga arizalar yuboring (1–15 yanvar AQSH, dekabr–fevral Kanada OUAC orqali / UK da UCAS).",
      "CSS Profile / ISFAA / PFAA / IFAW / WISFAA va oila daromadlari ma'lumotnomalarini qat'iy moliyaviy yordam dedlaynlarigacha yuboring.",
      "Davlat stipendiyalariga topshiring (Stipendium Hungaricum, Türkiye Bursları, GKS, MEXT, CSC — oynalar qish/erta bahorda ochiladi).",
    ],
  },
  {
    when: "Mart – Aprel",
    title: "Takliflarni, moliyaviy paketlarni solishtirish va muzokaralar",
    tasks: [
      "Olingan barcha takliflarni yillik yakuniy sof to'lov summasi bo'yicha solishtiring (Net Cost = Tuition + Living − Grant).",
      "Agar sizga taklif berilgan bo'lsa, lekin moliyaviy paket ehtiyojni qoplamasa — yangi/aniqlashtirilgan holatlar tasdig'i bilan financial aid office ga xushmuomala apellyatsiya bering.",
      "1 maygacha bitta OTM tanlovini tasdiqlang (AQSHda), depozit talablarini tekshiring.",
    ],
  },
  {
    when: "May – Avgust",
    title: "Talaba vizasi, turar joy va jo'nab ketish",
    tasks: [
      "LOA / I-20 olgandan so'ng darhol vizaga topshiring (Kanadada Study Permit ni yozgi kechikishlardan qochish uchun may–iyunda boshlash yaxshiroq), biometriya topshiring va so'ralganda tibbiy ko'rikdan o'ting.",
      "Yotoqxona/turar joyni band qiling, sug'urta rasmiylashtiring va aviachiptalarni oldindan sotib oling.",
      "Chegara uchun asl hujjatlar papkasini yig'ing: vizali pasport, LOA / I-20, ko'chirmalar/grant xatlari, sug'urta.",
    ],
  },
];
