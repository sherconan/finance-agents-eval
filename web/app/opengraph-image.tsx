import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Anthropic Finance Agents 评测站";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #0a0e1a 100%)",
          color: "#e5e7eb",
          padding: "80px",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            padding: "8px 18px",
            borderRadius: 999,
            background: "rgba(245,158,11,.18)",
            color: "#f59e0b",
            fontSize: 22,
            marginBottom: 32,
            border: "1px solid rgba(245,158,11,.4)",
          }}
        >
          独立第三方评测 · 2026-05-08
        </div>
        <div
          style={{
            fontSize: 86,
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-.02em",
            marginBottom: 28,
            background:
              "linear-gradient(135deg, #f59e0b 0%, #fb923c 50%, #ef4444 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Anthropic Finance Agents
        </div>
        <div style={{ fontSize: 60, fontWeight: 700, marginBottom: 36 }}>
          全维度评测榜
        </div>
        <div style={{ display: "flex", gap: 28, marginTop: "auto" }}>
          <Stat label="Agents" value="10" />
          <Stat label="维度" value="5" />
          <Stat label="均分" value="8.43" />
          <Stat label="Artifact" value="10" />
        </div>
      </div>
    ),
    size,
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "20px 32px",
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.1)",
        borderRadius: 16,
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 800, color: "#f59e0b" }}>{value}</div>
      <div style={{ fontSize: 20, color: "#94a3b8" }}>{label}</div>
    </div>
  );
}
