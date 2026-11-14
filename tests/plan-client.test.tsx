import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { PlanClient } from "@/components/plan/PlanClient";
import { LIST_KEY, PROFILE_KEY } from "@/lib/profile";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const profile = {
  grade: "11",
  name: "Айгерим",
  budget: 0,
  countries: [],
  english: { test: "ielts", score: 7 },
  sat: 1420,
  grades: "good",
  major: "Economics",
  updatedAt: "2026-11-14T00:00:00Z",
};

beforeEach(() => {
  window.localStorage.clear();
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(
        JSON.stringify({
          matches: [
            { slug: "yale-university-usa", name: "Yale University", country: "USA", city: null, logo: false, basket: "dream", money: "grant", chance: 50, deadline: "2099-01-02", reasons: [] },
            { slug: "bilkent-university-turkey", name: "Bilkent University", country: "Turkey", city: "Ankara", logo: false, basket: "target", money: "grant", chance: 50, deadline: null, reasons: [] },
          ],
        }),
      ),
    ),
  );
});

afterEach(() => vi.unstubAllGlobals());

it("invites to build a plan when there is no profile", async () => {
  render(<PlanClient />);
  const link = await screen.findByRole("link", { name: /составить мой план/i });
  expect(link).toHaveAttribute("href", "/plan/start");
});

it("shows my list by basket and the combined chance", async () => {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.localStorage.setItem(LIST_KEY, JSON.stringify(["yale-university-usa", "bilkent-university-turkey"]));
  render(<PlanClient />);
  const dream = await screen.findByRole("region", { name: /мечта/i });
  expect(within(dream).getByText("Yale University")).toBeInTheDocument();
  const target = screen.getByRole("region", { name: /реальные/i });
  expect(within(target).getByText("Bilkent University")).toBeInTheDocument();
  expect(screen.getByText("≈ 75%")).toBeInTheDocument();
  expect(screen.getByRole("heading", { name: /Айгерим, до первого дедлайна/ })).toBeInTheDocument();
});
