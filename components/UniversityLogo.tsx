"use client";

import { useState } from "react";
import { logoLinkUrl, universityInitials } from "@/lib/university-logo";

export function UniversityLogo({
  name,
  domain,
  size = 48,
}: {
  name: string;
  domain: string | null;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const src = logoLinkUrl(domain, process.env.NEXT_PUBLIC_LOGOLINK_KEY);
  const initials = universityInitials(name);

  return (
    <span
      className="uniLogo"
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: 10,
        background: "rgba(26, 26, 26, 0.06)",
        color: "var(--ink, #1a1a1a)",
        fontWeight: 700,
        fontSize: Math.max(11, Math.round(size * 0.32)),
        letterSpacing: "0.02em",
        lineHeight: 1,
      }}
      aria-hidden
    >
      {!src || failed ? (
        <span>{initials}</span>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- Logo Link CDN URL; next/image not required
        <img
          src={src}
          width={size}
          height={size}
          loading="lazy"
          alt=""
          onError={() => setFailed(true)}
          style={{ width: size, height: size, objectFit: "contain", display: "block" }}
        />
      )}
    </span>
  );
}
