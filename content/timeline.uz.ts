import type { GradeStep, Window } from "./timeline";

export const US_ROUNDS_UZ: Window[] = [
  { what: "Early Decision I / Early Action / REA", when: "1–15-noyabr", detail: "Javob dekabr o'rtalarida. ED qabul qilinganda borish majburiyatini yuklaydi.", href: "/guides/raundy-podachi" },
  { what: "Regular Decision va Early Decision II", when: "1–15-yanvar", detail: "RD javoblari mart oxirida, ED2 fevralda chiqadi.", href: "/guides/raundy-podachi" },
  { what: "Moliyaviy anketalar (CSS Profile, ISFAA)", when: "Ariza bilan birga", detail: "Ariza bilan bir xil raundda topshiriladi. Kechikish ko'pincha grantdan mahrum qiladi.", href: "/guides/finansovaya-pomoshch" },
  { what: "OTMni tanlash va depozit", when: "1-may", detail: "AQShda milliy qaror qabul qilish kuni." },
];

export const PROGRAM_WINDOWS_UZ: Window[] = [
  { what: "Oxford va Cambridge (UCAS)", when: "15-oktyabrgacha", detail: "Bundan tashqari noyabr–dekabrda kirish testlari va suhbatlar." },
  { what: "Stipendium Hungaricum", when: "noyabr — yanvar o'rtalari", detail: "So'ngra bahorgacha universitetlarda alohida imtihon va suhbatlar.", href: "/grants#stipendium-hungaricum" },
  { what: "Kanada (UofT, UBC, York)", when: "noyabr — fevral", detail: "Pearson nominatsiyasi va stipendiya arizalari erta dedlayngacha, odatda noyabrda.", href: "/guides/kanada" },
  { what: "Erasmus Mundus", when: "oktyabr — yanvar", detail: "Har bir dasturning o'z dedlayni bor.", href: "/grants#erasmus-mundus" },
  { what: "Buyuk Britaniya (UCAS, asosiy)", when: "yanvar o'rtasi–oxiri", detail: "Bitta arizada 5 tagacha universitet." },
  { what: "Türkiye Bursları", when: "yanvar — fevral", detail: "Onlayn ariza, so'ngra bahorda suhbat.", href: "/grants#turkiye-burslari" },
  { what: "Xitoy (CSC)", when: "yanvar — aprel", detail: "Elchixona yoki universitet orqali — universitetlarning o'z muddatlari bor.", href: "/grants#csc-china" },
  { what: "Koreya (GKS, bakalavriat)", when: "sentyabr — oktyabr", detail: "Magistratura va PhD — fevral–mart.", href: "/grants#global-korea-scholarship" },
  { what: "Yaponiya (MEXT elchixona orqali)", when: "aprel — may", detail: "Yozda imtihonlar, o'qish keyingi yil bahorida boshlanadi.", href: "/grants#mext-japan" },
  { what: "Germaniya (qishki semestr)", when: "15-iyulgacha", detail: "uni-assist orqali yoki to'g'ridan-to'g'ri universitetga.", href: "/grants#germany-public" },
  { what: "Italiya (DSU va qabul)", when: "bahor — sentyabr", detail: "Bahorda Universitaly orqali oldindan ro'yxat, yozda hududiy stipendiya.", href: "/grants#italy-dsu" },
];

export const BY_GRADE_UZ: GradeStep[] = [
  {
    grade: "9-sinf",
    focus: "Poydevor",
    items: [
      "Yaxshi baholarni saqlang: AQShda 9-sinfdan boshlab baholarga qaraladi.",
      "Uzoq vaqt davom ettiradigan 1–2 ta mashg'ulot boshlang: loyiha, to'garak, volontyorlik yoki ish.",
      "Ingliz tilini ishonchli B2 darajasigacha ko'taring.",
    ],
  },
  {
    grade: "10-sinf",
    focus: "Chuqurlashish",
    items: [
      "Olimpiadalar, tanlovlar, yozgi maktablar — ayniqsa bepul dasturlar.",
      "Mashg'ulotingizda yetakchilik rolini oling: tashkil qiling, olib boring, boshqalarga o'rgating.",
      "Darajani bilish uchun sinov SAT va IELTS/TOEFL topshirib ko'ring.",
      "Studyaza qo'llanmalarini ko'rib chiqing va keng universitetlar ro'yxatini tuzishni boshlang.",
    ],
  },
  {
    grade: "11-sinf (12 yillik tizimda bitiruvdan oldingi yil)",
    focus: "Topshirishga tayyorgarlik",
    items: [
      "Bahorda — SAT va ingliz tilidan birinchi urinishlar.",
      "Yozda — personal statement qoralamasi va faoliyatlar ro'yxati.",
      "Tavsiyanoma uchun o'qituvchilarni tanlang va kuz boshida so'rang.",
      "Ro'yxatni uch savat bo'yicha 10–15 ta universitetgacha qisqartiring.",
    ],
  },
  {
    grade: "Bitiruv yili",
    focus: "Ariza topshirish",
    items: [
      "Avgust: Common App ochiladi.",
      "Oktyabr: erta raundlar uchun oxirgi SAT, yakuniy esselar.",
      "1-noyabr: erta arizalar va moliyaviy anketalar.",
      "Yanvar: asosiy raund, parallel ravishda — davlat stipendiyalari.",
      "Mart–aprel: javoblar va moliyaviy yordam takliflarini solishtirish.",
    ],
  },
];
