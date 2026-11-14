import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { GrantsCatalogClient } from "@/components/grants/GrantsCatalogClient";
import { UniPlanButton } from "@/components/uni/UniPlanButton";
import { CountryFlag } from "@/components/ui/Icon";
import { getGrants, kindLabel, levelLabel, type GrantKind, type Level } from "@/content/grants";
import { LIST_KEY } from "@/lib/profile";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

it("filters grants catalog by search query and resets cleanly", () => {
  const grants = getGrants("ru");
  const kinds = (["government", "country-free", "program", "university"] as GrantKind[]).map((kind) => ({
    kind,
    label: kindLabel(kind, "ru"),
    intro: `Intro ${kind}`,
  }));
  const levelNames: Record<Level, string> = {
    bachelor: levelLabel("bachelor", "ru"),
    master: levelLabel("master", "ru"),
    phd: levelLabel("phd", "ru"),
  };

  render(<GrantsCatalogClient grants={grants} kinds={kinds} levelNames={levelNames} lang="ru" />);

  expect(screen.getByText(/Stipendium Hungaricum/i)).toBeInTheDocument();
  const search = screen.getByRole("searchbox");
  fireEvent.change(search, { target: { value: "Hungaricum" } });
  expect(screen.getByText(/Stipendium Hungaricum/i)).toBeInTheDocument();
  expect(screen.queryByText(/DAAD/i)).not.toBeInTheDocument();

  fireEvent.change(search, { target: { value: "nonexistent-grant-xyz" } });
  expect(screen.getByRole("button", { name: /сбросить/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: /сбросить/i }));
  expect(screen.getByText(/Stipendium Hungaricum/i)).toBeInTheDocument();
});

it("toggles university in applicant plan list from profile hero button", () => {
  render(<UniPlanButton slug="harvard-university-usa" name="Harvard University" />);

  const addBtn = screen.getByRole("button", { name: /добавить harvard university в мой план/i });
  expect(addBtn).toHaveAttribute("aria-pressed", "false");

  fireEvent.click(addBtn);
  expect(JSON.parse(window.localStorage.getItem(LIST_KEY) || "[]")).toEqual(["harvard-university-usa"]);

  const removeBtn = screen.getByRole("button", { name: /убрать harvard university из моего плана/i });
  expect(removeBtn).toHaveAttribute("aria-pressed", "true");

  fireEvent.click(removeBtn);
  expect(JSON.parse(window.localStorage.getItem(LIST_KEY) || "[]")).toEqual([]);
});

it("resolves country flags without substring false positives or clipPath id collisions", () => {
  const { container } = render(
    <div>
      <CountryFlag country="Turkish Republic of Northern Cyprus" />
      <CountryFlag country="USA" />
      <CountryFlag country="Uzbekistan" />
    </div>,
  );
  expect(container.querySelectorAll("clipPath")).toHaveLength(0);
  // First svg is fallback globe (no US #1d4487 canton), second is US flag.
  const svgs = container.querySelectorAll("svg");
  expect(svgs).toHaveLength(3);
  expect(svgs[0].innerHTML).not.toContain("#1d4487");
  expect(svgs[1].innerHTML).toContain("#1d4487");
});
