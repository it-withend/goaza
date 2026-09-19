import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
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
  expect(screen.queryByText(/explorer/i)).not.toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: /выйти/i }));
  expect(onLogout).toHaveBeenCalledOnce();
});
