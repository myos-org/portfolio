import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

function Mark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" strokeWidth="3.2" strokeLinecap="square">
      <path d="M4 27 11 5l7 22M6.8 19.5h8.4M23 8.5V27" stroke="#EEECE8" />
      <path d="M17 5h12" stroke="#3978F6" />
    </svg>
  );
}

/** Shared social card: dark navy, monogram, eyebrow, title and subtitle. */
export function renderOg({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B1220",
          color: "#EEECE8",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Mark size={56} />
          <div style={{ fontSize: 28, fontWeight: 600 }}>Aniket Tyagi</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 2, color: "#7AA5FF", textTransform: "uppercase" }}>{eyebrow}</div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08, marginTop: 20, maxWidth: 1000 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#A3ADBD", marginTop: 24, maxWidth: 960, lineHeight: 1.4 }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", height: 4, width: 120, background: "#3978F6" }} />
      </div>
    ),
    ogSize,
  );
}
