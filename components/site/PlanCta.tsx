"use client";

import Link from "@/components/i18n/Link";
import { useApplicant } from "@/lib/use-applicant";

/** "Build my plan" for newcomers, "Open my plan" once a profile is saved — never re-runs the survey. */
export function PlanCta({
  className,
  start = "Составить мой план",
  open = "Открыть мой план",
}: {
  className?: string;
  start?: string;
  open?: string;
}) {
  const { ready, profile } = useApplicant();
  const has = ready && Boolean(profile);
  return (
    <Link href={has ? "/plan" : "/plan/start"} className={className}>
      {has ? open : start}
    </Link>
  );
}
