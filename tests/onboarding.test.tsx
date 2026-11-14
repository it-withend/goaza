import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Onboarding } from "@/components/plan/Onboarding";
import { LIST_KEY, PROFILE_KEY } from "@/lib/profile";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

beforeEach(() => {
  window.localStorage.clear();
  push.mockReset();
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(
        JSON.stringify({
          full: false,
          counts: { dream: 1, target: 1, safety: 0 },
          dream: [{ slug: "yale-university-usa" }],
          target: [{ slug: "bilkent-university-turkey" }],
          safety: [],
        }),
      ),
    ),
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it("walks through six steps, saves the profile and the suggested list", async () => {
  const user = userEvent.setup();
  render(<Onboarding countries={[{ value: "Turkey", label: "Турция", count: 133 }]} />);

  expect(screen.getByText("Шаг 1 из 6")).toBeInTheDocument();
  await user.type(screen.getByLabelText(/как вас зовут/i), "Айгерим");
  await user.click(screen.getByRole("radio", { name: "11 класс" }));
  await user.click(screen.getByRole("button", { name: "Дальше" }));

  await user.click(screen.getByRole("radio", { name: /до \$5 000/i }));
  await user.click(screen.getByRole("button", { name: "Дальше" }));

  await user.type(screen.getByLabelText("Балл"), "7");
  await user.click(screen.getByRole("button", { name: "Дальше" }));

  await user.click(screen.getByRole("button", { name: "Дальше" })); // SAT skipped

  await user.click(screen.getByRole("button", { name: /Турция/ }));
  await user.click(screen.getByRole("button", { name: "Дальше" }));

  expect(screen.getByText("Шаг 6 из 6")).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "Собрать мой план" }));

  const saved = JSON.parse(window.localStorage.getItem(PROFILE_KEY) || "null");
  expect(saved).toMatchObject({ name: "Айгерим", grade: "11", budget: 5000, countries: ["Turkey"], sat: null });
  expect(saved.english).toEqual({ test: "ielts", score: 7 });
  expect(JSON.parse(window.localStorage.getItem(LIST_KEY) || "[]")).toEqual([
    "yale-university-usa",
    "bilkent-university-turkey",
  ]);
  expect(push).toHaveBeenCalledWith("/plan");
});

it("cannot continue from step 1 without a grade", async () => {
  render(<Onboarding countries={[]} />);
  expect(screen.getByRole("button", { name: "Дальше" })).toBeDisabled();
});

it("offers to open the saved plan instead of redoing the survey", async () => {
  window.localStorage.setItem(
    PROFILE_KEY,
    JSON.stringify({ grade: "11", budget: 0, countries: [], english: { test: "ielts", score: 7 }, sat: null, grades: "good", major: "", updatedAt: "2026-11-14T00:00:00Z" }),
  );
  render(<Onboarding countries={[]} />);
  expect(await screen.findByRole("link", { name: /открыть мой план/i })).toHaveAttribute("href", "/plan");
});

it("stays on the onboarding page and shows an error when /api/podbor fails", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () => new Response(JSON.stringify({ error: "server error" }), { status: 500 })),
  );
  const user = userEvent.setup();
  render(<Onboarding countries={[]} />);

  await user.click(screen.getByRole("radio", { name: "11 класс" }));
  await user.click(screen.getByRole("button", { name: "Дальше" }));
  await user.click(screen.getByRole("radio", { name: /до \$5 000/i }));
  await user.click(screen.getByRole("button", { name: "Дальше" }));
  await user.click(screen.getByRole("button", { name: "Дальше" }));
  await user.click(screen.getByRole("button", { name: "Дальше" }));
  await user.click(screen.getByRole("button", { name: "Дальше" }));
  await user.click(screen.getByRole("button", { name: "Собрать мой план" }));

  expect(push).not.toHaveBeenCalled();
  expect(await screen.findByRole("alert")).toHaveTextContent(/подобрать вузы сейчас не удалось/i);
  expect(screen.getByRole("link", { name: /открыть план/i })).toHaveAttribute("href", "/plan");
});
