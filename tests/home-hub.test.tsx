import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { HomeHub } from "@/components/home/HomeHub";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
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
});

it("shows a preview of the cabinet with real numbers", () => {
  render(<HomeHub stats={stats} />);
  expect(screen.getByRole("img", { name: /пример личного плана/i })).toBeInTheDocument();
  expect(screen.getAllByText(/470/).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/1 213/).length).toBeGreaterThan(0);
});
