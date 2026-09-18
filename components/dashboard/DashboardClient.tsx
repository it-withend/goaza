"use client";

import { CatalogClient } from "@/components/CatalogClient";
import type { University } from "@/lib/types";
import type { computeMeta } from "@/lib/universities";

export function DashboardClient({
  initial,
  meta,
  accountName,
}: {
  initial: University[];
  meta: ReturnType<typeof computeMeta>;
  accountName: string;
}) {
  return (
    <CatalogClient
      initial={initial}
      meta={meta}
      botUsername=""
      initiallySubscribed
      initialUsername={accountName}
    />
  );
}
