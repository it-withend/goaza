import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({ usePathname: () => "/dashboard" }));
import { DashboardShell } from "@/components/dashboard/DashboardShell";

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

it("shows the verified Telegram account and calls logout", async () => {
  const onLogout = vi.fn();
  render(
    <DashboardShell accountName="student" onLogout={onLogout}>
      <div>Results</div>
    </DashboardShell>,
  );
  expect(screen.getByText("@student")).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /каталог вузов/i })).toHaveAttribute("href", "/dashboard");
  expect(screen.getByRole("link", { name: /гай.*абитуриента/i })).toHaveAttribute(
    "href",
    "/dashboard/guide",
  );
  expect(screen.getByRole("link", { name: "Мой план" })).toHaveAttribute("href", "/plan");
  expect(screen.queryByText(/explorer/i)).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /выйти/i }));
  expect(onLogout).toHaveBeenCalledOnce();
});
