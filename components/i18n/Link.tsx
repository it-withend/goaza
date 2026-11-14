"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { localizePath } from "@/lib/i18n";
import { useLang } from "./LangProvider";

type Props = ComponentProps<typeof NextLink>;

/** next/link that keeps the visitor in their language: "/unis" becomes "/uz/unis" on the Uzbek site. */
export default function Link({ href, ...rest }: Props) {
  const lang = useLang();
  const to =
    typeof href === "string"
      ? localizePath(lang, href)
      : href.pathname
        ? { ...href, pathname: localizePath(lang, href.pathname) }
        : href;
  return <NextLink href={to} {...rest} />;
}
