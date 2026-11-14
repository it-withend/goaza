// @vitest-environment node
import { describe, expect, it } from "vitest";
import { aidSummary, essayRu, instTypeRu, langRu, money, satRu } from "@/lib/humanize";

describe("langRu", () => {
  it("names the exam and the level for a bare IELTS band", () => {
    expect(langRu("6.0")).toBe("IELTS от 6.0 (≈ B2) или аналог: TOEFL, Duolingo");
    expect(langRu("6.5g")).toBe("IELTS от 6.5 (≈ B2) или аналог: TOEFL, Duolingo");
    expect(langRu("5.5")).toBe("IELTS от 5.5 (≈ B1–B2) или аналог: TOEFL, Duolingo");
  });

  it("translates the minimum per section", () => {
    expect(langRu("6.5 with a minimum of 6.0 in each component")).toBe(
      "IELTS от 6.5 (≈ B2), не ниже 6.0 по каждой части или аналог: TOEFL, Duolingo",
    );
    expect(langRu("IELTS 6.5  with no band below 6.0")).toBe(
      "IELTS от 6.5 (≈ B2), не ниже 6.0 по каждой части или аналог: TOEFL, Duolingo",
    );
  });

  it("lists TOEFL and IELTS together", () => {
    expect(langRu("IELTS 5.5 TOEFL 80")).toBe("IELTS от 5.5 (≈ B1–B2) или TOEFL iBT от 80 (≈ B2)");
    expect(langRu("TOEFL 100")).toBe("TOEFL iBT от 100 (≈ C1) или IELTS");
    expect(langRu("84/120 IBT")).toBe("TOEFL iBT от 84 (≈ B2) или IELTS");
  });

  it("reads US Common Data Set averages as averages, not minimums", () => {
    expect(langRu("TOEFL 80; IELTS 92 avg.")).toBe("TOEFL iBT от 80 (≈ B2), в среднем у поступивших 92");
  });

  it("hides dates, links and junk instead of showing them", () => {
    expect(langRu("2026-05-06")).toBeNull();
    expect(langRu("https://x.ca/lang")).toBeNull();
    expect(langRu("For Asia")).toBeNull();
    expect(langRu("not req.")).toBe("Сертификат не нужен");
  });
});

describe("satRu", () => {
  it("translates status words", () => {
    expect(satRu("Обязательно")).toBe("Обязательно");
    expect(satRu("Cons.")).toBe("По желанию — учитывают, если прислать");
    expect(satRu("Rq. for scholarship")).toBe("Нужен для стипендии");
    expect(satRu("Not acceptable")).toBe("Не принимают");
    expect(satRu("Req. for int'l")).toBe("Обязателен для иностранцев");
  });

  it("explains scores", () => {
    expect(satRu("1470")).toBe("Ориентир — около 1470 из 1600");
    expect(satRu("1260 min.")).toBe("Минимум 1260 из 1600");
    expect(satRu("Average: 1235")).toBe("В среднем у поступивших 1235 из 1600");
    expect(satRu("1430-1500")).toBe("Обычно 1430–1500 из 1600");
  });

  it("drops values that belong to other fields", () => {
    expect(satRu("Personal Statement")).toBeNull();
    expect(satRu("Not indicated")).toBeNull();
  });
});

describe("essayRu", () => {
  it("translates counts of essays", () => {
    expect(essayRu("1 ps, 2 supp essay")).toBe("Личное эссе + 2 дополнительных эссе");
    expect(essayRu("Personal Statement")).toBe("Личное эссе (Personal Statement)");
    expect(essayRu("Required motivational letter")).toBe("Мотивационное письмо (обязательно)");
    expect(essayRu("Not req. Not used")).toBe("Не нужно");
    expect(essayRu("you could add it on the official site of this uni")).toBe("Уточните на сайте вуза");
    expect(essayRu("2021-02-01")).toBeNull();
    expect(essayRu("Self-Introduction & Study plan")).toBe("Рассказ о себе и учебный план");
  });
});

describe("instTypeRu", () => {
  it("translates institution types", () => {
    expect(instTypeRu("Public / Research")).toBe("Государственный исследовательский университет");
    expect(instTypeRu("private liberal arts college")).toBe("Частный колледж свободных искусств");
    expect(instTypeRu("private, Catholic university")).toBe("Частный университет");
    expect(instTypeRu("Private / LAC")).toBe("Частный колледж свободных искусств");
    expect(instTypeRu("private liberal arts women's college")).toBe("Частный колледж свободных искусств, женский");
  });
});

describe("aidSummary", () => {
  it("keeps the stat card short and moves names to a list", () => {
    expect(aidSummary("Full Ride")).toEqual({ short: "Полный грант (учёба и жильё)", names: [] });
    expect(aidSummary("$42,596")).toEqual({ short: "до $42 596 в год", names: [] });
    expect(aidSummary("no")).toEqual({ short: "Нет", names: [] });
    expect(
      aidSummary("Agent Based Modelling Scholarship,Alex Rodgers Travelling Scholarship, American Australian Association Graduate Education Fund"),
    ).toEqual({
      short: "3 стипендии",
      names: [
        "Agent Based Modelling Scholarship",
        "Alex Rodgers Travelling Scholarship",
        "American Australian Association Graduate Education Fund",
      ],
    });
  });
});

describe("money", () => {
  it("uses Russian thousands separators", () => {
    expect(money("$17,380 / год")).toBe("$17 380 / год");
  });
});

describe("Uzbek output", () => {
  it("speaks Uzbek and hides Russian free text", () => {
    expect(langRu("6.0", "uz")).toBe("IELTS kamida 6.0 (≈ B2) yoki muqobili: TOEFL, Duolingo");
    expect(satRu("Обязательно", "uz")).toBe("Majburiy");
    expect(satRu("1470", "uz")).toBe("Mo'ljal — 1600 dan taxminan 1470");
    expect(essayRu("1 ps, 2 supp essay", "uz")).toBe("Shaxsiy esse + 2 ta qo'shimcha esse");
    expect(essayRu("мотивационное; отдельно эссе для выбр. Факультета", "uz")).toBeNull();
    expect(instTypeRu("Public / Research", "uz")).toBe("Davlat tadqiqot universiteti");
    expect(aidSummary("Full Ride", "uz")).toEqual({ short: "To'liq grant (o'qish va yashash)", names: [] });
    expect(money("$17,380 / год", "uz")).toBe("$17 380 / yil");
  });
});
