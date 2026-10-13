import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#101828" }}>
        <svg width={120} height={120} viewBox="0 0 32 32" fill="none" strokeWidth="3" strokeLinecap="square">
          <path d="M4 27 11 5l7 22M6.8 19.5h8.4M23 8.5V27" stroke="#F7F8FA" />
          <path d="M17 5h12" stroke="#3978F6" />
        </svg>
      </div>
    ),
    size,
  );
}
