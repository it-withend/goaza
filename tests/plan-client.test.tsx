import { cleanup, render, screen, within } from "@testing-library/react";
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

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

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

it("drops universities the API no longer knows from my list", async () => {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.localStorage.setItem(
    LIST_KEY,
    JSON.stringify(["yale-university-usa", "bilkent-university-turkey", "deleted-uni"]),
  );
  render(<PlanClient />);
  await screen.findAllByText("Yale University");
  await vi.waitFor(() =>
    expect(JSON.parse(window.localStorage.getItem(LIST_KEY) || "[]")).toEqual([
      "yale-university-usa",
      "bilkent-university-turkey",
    ]),
  );
});

it("tells a guest when only part of a long list is shown", async () => {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  const slugs = Array.from({ length: 14 }, (_, i) => `u-${i}`);
  window.localStorage.setItem(LIST_KEY, JSON.stringify(slugs));
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: { body: string }) => {
      const sent: string[] = JSON.parse(init.body).slugs;
      return new Response(
        JSON.stringify({
          limit: 12,
          matches: sent.slice(0, 12).map((slug) => ({ slug, name: slug, country: "USA", city: null, logo: false, basket: "target", money: "grant", chance: 20, deadline: null, reasons: [] })),
        }),
      );
    }),
  );
  render(<PlanClient />);
  expect(await screen.findByText(/показаны 12 из 14/i)).toBeInTheDocument();
  expect(JSON.parse(window.localStorage.getItem(LIST_KEY) || "[]")).toHaveLength(14);
});

it("does not claim the cycle is over when no university has a dated deadline", async () => {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.localStorage.setItem(LIST_KEY, JSON.stringify(["bilkent-university-turkey"]));
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(
        JSON.stringify({
          matches: [{ slug: "bilkent-university-turkey", name: "Bilkent University", country: "Turkey", city: null, logo: false, basket: "target", money: "grant", chance: 30, deadline: "Rolling", reasons: [] }],
        }),
      ),
    ),
  );
  render(<PlanClient />);
  const h = await screen.findByRole("heading", { name: /сроки подачи уточняйте/i });
  expect(h).not.toHaveTextContent(/прошли/);
});

it("sends guests to the public catalog for more universities", async () => {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  render(<PlanClient />);
  expect(await screen.findByRole("link", { name: "Найти ещё вузы" })).toHaveAttribute("href", "/unis");
});
