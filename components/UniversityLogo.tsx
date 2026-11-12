import { universityInitials } from "@/lib/university-logo";

const MONO_TINTS = ["#8a6a12", "#2f4b7c", "#3d6b4f", "#7a3b3b", "#4b3f72", "#2f6a73"];

function tintFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return MONO_TINTS[h % MONO_TINTS.length];
}

/**
 * Self-hosted, pre-sized logo (public/logos/<slug>.webp, 128px) or a monogram.
 * We never upscale tiny favicons: a crisp monogram beats a blurry 16px icon.
 */
export function UniversityLogo({
  name,
  slug,
  logo,
  size = 48,
  priority = false,
}: {
  name: string;
  slug: string;
  logo: boolean;
  size?: number;
  priority?: boolean;
}) {
  const tint = tintFor(name);
  return (
    <span
      className="uniLogo"
      style={{
        width: size,
        height: size,
        minWidth: size,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        overflow: "hidden",
        borderRadius: Math.round(size * 0.22),
        background: logo ? "#fff" : `${tint}14`,
        border: `1px solid ${logo ? "rgba(26,26,26,0.08)" : `${tint}33`}`,
        color: tint,
        fontFamily: 'var(--font-serif), "Source Serif 4", Georgia, serif',
        fontWeight: 700,
        fontSize: Math.max(11, Math.round(size * 0.34)),
        letterSpacing: "0.01em",
        lineHeight: 1,
      }}
      aria-hidden
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- static pre-optimized 128px webp
        <img
          src={`/logos/${slug}.webp`}
          width={size}
          height={size}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          alt=""
          style={{ width: "86%", height: "86%", objectFit: "contain", display: "block" }}
        />
      ) : (
        <span>{universityInitials(name)}</span>
      )}
    </span>
  );
}
