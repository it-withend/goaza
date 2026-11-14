import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { MyChance } from "@/components/uni/MyChance";
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
  budget: 0,
  countries: [],
  english: { test: "ielts", score: 7 },
  sat: null,
  grades: "good",
  major: "",
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
            { slug: "bilkent-university-turkey", name: "Bilkent", country: "Turkey", city: null, logo: false, basket: "target", money: "grant", chance: 28, deadline: null, reasons: ["Полный грант для иностранцев"] },
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

it("asks to fill the profile when there is none", async () => {
  render(<MyChance slug="bilkent-university-turkey" name="Bilkent" />);
  expect(await screen.findByRole("link", { name: /заполнить профиль/i })).toHaveAttribute("href", "/plan/start");
});

it("shows my chance and adds the university to the plan", async () => {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  render(<MyChance slug="bilkent-university-turkey" name="Bilkent" />);
  expect(await screen.findByText("≈ 28%")).toBeInTheDocument();
  expect(screen.getByText(/реальный/i)).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /в мой план/i }));
  expect(JSON.parse(window.localStorage.getItem(LIST_KEY) || "[]")).toEqual(["bilkent-university-turkey"]);
});

it("explains when the university does not fit", async () => {
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ matches: [{ slug: "x", name: "X", excluded: "Не проходит по бюджету" }] }))),
  );
  render(<MyChance slug="x" name="X" />);
  expect(await screen.findByText("Не проходит по бюджету")).toBeInTheDocument();
});
