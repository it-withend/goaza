import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { HomeHub } from "@/components/home/HomeHub";
import { LangProvider } from "@/components/i18n/LangProvider";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/landing/WorldGlobe", () => ({
  WorldGlobe: ({ byCountry }: { byCountry: { country: string; count: number }[] }) => (
    <div data-testid="world-globe">Globe ({byCountry.length})</div>
  ),
}));

afterEach(cleanup);

const stats = {
  total: 1213,
  countries: 30,
  grants: 470,
  byCountry: [
    { country: "USA", count: 620 },
    { country: "Turkey", count: 133 },
  ],
};

it("leads with the plan call to action", () => {
  render(<HomeHub stats={stats} />);
  const ctas = screen.getAllByRole("link", { name: "Составить мой план" });
  expect(ctas[0]).toHaveAttribute("href", "/plan/start");
  expect(screen.getByTestId("world-globe")).toBeInTheDocument();
});

it("shows a preview of the cabinet with real numbers", () => {
  render(<HomeHub stats={stats} />);
  expect(screen.getByRole("img", { name: /пример личного плана/i })).toBeInTheDocument();
  expect(screen.getAllByText(/470/).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/1 213/).length).toBeGreaterThan(0);
});

it("renders Uzbek copy and globe when lang='uz'", () => {
  render(
    <LangProvider lang="uz">
      <HomeHub stats={stats} lang="uz" />
    </LangProvider>,
  );
  const ctas = screen.getAllByRole("link", { name: "Rejamni tuzish" });
  expect(ctas[0]).toHaveAttribute("href", "/uz/plan/start");
  expect(screen.getByTestId("world-globe")).toBeInTheDocument();
});
