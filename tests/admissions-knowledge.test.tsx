import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AdmissionsGuideClient } from "@/components/guide/AdmissionsGuideClient";
import {
  AFFORDABLE_EU_UNIS,
  ESSAY_26_MISTAKES,
  FULL_RIDE_TSVIRKKOO,
  GOV_SCHOLARSHIPS,
  INTERNAL_UNI_SCHOLARSHIPS,
  MERIT_103_TABLE,
  US_CSS_AID_TABLE,
} from "@/lib/admissions-knowledge";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), refresh: vi.fn(), push: vi.fn() }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("admissions knowledge hub", () => {
  it("contains complete verified datasets from user guides", () => {
    expect(MERIT_103_TABLE).toHaveLength(103);
    expect(US_CSS_AID_TABLE).toHaveLength(81);
    expect(GOV_SCHOLARSHIPS).toHaveLength(8);
    expect(INTERNAL_UNI_SCHOLARSHIPS).toHaveLength(10);
    expect(AFFORDABLE_EU_UNIS).toHaveLength(4);
    expect(ESSAY_26_MISTAKES).toHaveLength(26);
    expect(FULL_RIDE_TSVIRKKOO.length).toBeGreaterThanOrEqual(73);
    expect(MERIT_103_TABLE.some((x) => x.school === "University of Alabama" && /Academic Elite/i.test(x.scholarship))).toBe(true);
    expect(US_CSS_AID_TABLE.some((x) => x.school === "Princeton University" && x.howApply === "PFAA")).toBe(true);
  });

  it("supports interactive strategy calculator, table filtering, and essay checklist", async () => {
    render(<AdmissionsGuideClient accountName="applicant" />);

    expect(screen.getByText(/Универсальный гид/i)).toBeInTheDocument();

    // Switch strategy to SAT 1400+
    await userEvent.click(screen.getByRole("button", { name: /SAT 1400\+/i }));
    expect(screen.getByRole("heading", { name: /103 Merit Full-Ride/i })).toBeInTheDocument();

    // Filter Merit 103 table by search query
    const meritSearch = screen.getByPlaceholderText(/поиску? по вузу, названию стипендии/i);
    await userEvent.type(meritSearch, "Academic Elite");
    expect(screen.getByText("База 103 конкурентных Full-Ride Merit стипендий США (1 показано)")).toBeInTheDocument();

    // Switch to CSS tab and filter by FREE_FORM
    await userEvent.click(screen.getByRole("button", { name: /CSS Waiver и ISFAA/i }));
    const cssSelect = screen.getByLabelText(/Фильтр способов бесплатной подачи/i);
    await userEvent.selectOptions(cssSelect, "FREE_FORM");
    expect(screen.getByText("Princeton University")).toBeInTheDocument();
  });
});
