import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const runtime = "edge";
export const alt = `${SITE_NAME} — каталог университетов и грантов`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "linear-gradient(145deg, #fafaf8 0%, #f0efe9 48%, #e8e4d8 100%)",
          color: "#1a1a1a",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#d4a017",
              display: "flex",
            }}
          />
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              maxWidth: 900,
            }}
          >
            Найди вуз и грант за границей
          </div>
          <div style={{ fontSize: 28, color: "#5c5c5c", maxWidth: 820, lineHeight: 1.35 }}>
            Стоимость · полные гранты · шансы поступления · дедлайны — 1000+ университетов
          </div>
        </div>
        <div style={{ fontSize: 22, color: "#8a6a12", fontWeight: 700 }}>goaza.xyz</div>
      </div>
    ),
    { ...size },
  );
}
