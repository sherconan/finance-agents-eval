import { ImageResponse } from "next/og";
import { data } from "@/lib/data";

export const alt = "Anthropic Finance Agent Evaluation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const a = data.results.find((x) => x.slug === params.slug);
  if (!a) {
    return new ImageResponse(<div>Not found</div>, size);
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0e1a 0%, #1a2332 50%, #0a0e1a 100%)",
          color: "#e5e7eb",
          padding: "72px",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div
            style={{
              padding: "6px 16px",
              borderRadius: 999,
              background: a.category === "research" ? "rgba(245,158,11,.18)" : "rgba(59,130,246,.18)",
              color: a.category === "research" ? "#f59e0b" : "#60a5fa",
              fontSize: 20,
              border: "1px solid rgba(255,255,255,.1)",
            }}
          >
            {a.category === "research" ? "研究 / 覆盖" : "财务 / 运营"}
          </div>
          <div style={{ color: "#94a3b8", fontSize: 18 }}>排名 #{a.rank} / 10</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 24, marginBottom: 28 }}>
          <div style={{ fontSize: 110 }}>{a.icon}</div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-.02em",
              background: "linear-gradient(135deg, #f59e0b 0%, #fb923c 50%, #ef4444 100%)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {a.name}
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#94a3b8", lineHeight: 1.4, marginBottom: 36, maxWidth: 1000 }}>
          {a.verdict}
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: "auto" }}>
          {[
            { l: "完成度", v: a.completeness },
            { l: "专业度", v: a.professionalism },
            { l: "准确性", v: a.accuracy },
            { l: "易用性", v: a.usability },
            { l: "总分", v: a.total, hl: true },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "18px 26px",
                background: s.hl ? "rgba(245,158,11,.16)" : "rgba(255,255,255,.05)",
                border: `1px solid ${s.hl ? "rgba(245,158,11,.4)" : "rgba(255,255,255,.1)"}`,
                borderRadius: 14,
              }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, color: s.hl ? "#f59e0b" : "#e5e7eb" }}>
                {s.v.toFixed(s.hl ? 2 : 1)}
              </div>
              <div style={{ fontSize: 16, color: "#94a3b8" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
