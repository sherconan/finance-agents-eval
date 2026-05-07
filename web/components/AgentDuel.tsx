"use client";

import { useState } from "react";
import Link from "next/link";
import { RadarChart } from "@/components/RadarChart";
import type { Agent } from "@/lib/data";

export function AgentDuel({ agents }: { agents: Agent[] }) {
  const [leftSlug, setLeftSlug] = useState(agents[0].slug);
  const [rightSlug, setRightSlug] = useState(agents[1].slug);

  const left = agents.find((a) => a.slug === leftSlug)!;
  const right = agents.find((a) => a.slug === rightSlug)!;

  const dims = [
    { key: "completeness" as const, name: "完成度" },
    { key: "professionalism" as const, name: "专业度" },
    { key: "accuracy" as const, name: "准确性" },
    { key: "usability" as const, name: "易用性" },
  ];

  const radarSeries = [
    {
      name: left.name,
      color: "#f59e0b",
      values: dims.map((d) => ({ dim: d.name, value: left[d.key] })),
    },
    {
      name: right.name,
      color: "#3b82f6",
      values: dims.map((d) => ({ dim: d.name, value: right[d.key] })),
    },
  ];

  return (
    <div>
      {/* Selectors */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }} className="duel-selectors">
        <Selector
          color="#f59e0b"
          label="左方"
          value={leftSlug}
          setValue={setLeftSlug}
          agents={agents}
          excludeSlug={rightSlug}
        />
        <Selector
          color="#3b82f6"
          label="右方"
          value={rightSlug}
          setValue={setRightSlug}
          agents={agents}
          excludeSlug={leftSlug}
        />
      </div>

      {/* Header cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }} className="duel-cards">
        <SideCard agent={left} accent="#f59e0b" />
        <SideCard agent={right} accent="#3b82f6" />
      </div>

      {/* Radar chart */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: ".5rem" }}>4 维雷达对比</h3>
        <RadarChart series={radarSeries} height={340} />
      </div>

      {/* Score diff table */}
      <div className="card" style={{ padding: 0, overflow: "auto", marginBottom: "1.5rem" }}>
        <table className="ranking">
          <thead>
            <tr>
              <th>维度</th>
              <th style={{ textAlign: "right", color: "#f59e0b" }}>{left.name}</th>
              <th style={{ textAlign: "right", color: "#3b82f6" }}>{right.name}</th>
              <th style={{ textAlign: "center" }}>差距</th>
              <th>胜出</th>
            </tr>
          </thead>
          <tbody>
            {dims.map((d) => {
              const lv = left[d.key];
              const rv = right[d.key];
              const diff = lv - rv;
              const winner = diff > 0 ? "left" : diff < 0 ? "right" : "tie";
              return (
                <tr key={d.key}>
                  <td>{d.name}</td>
                  <td style={{ textAlign: "right", fontWeight: winner === "left" ? 700 : 500, color: winner === "left" ? "#f59e0b" : undefined }}>{lv.toFixed(1)}</td>
                  <td style={{ textAlign: "right", fontWeight: winner === "right" ? 700 : 500, color: winner === "right" ? "#3b82f6" : undefined }}>{rv.toFixed(1)}</td>
                  <td style={{ textAlign: "center", fontWeight: 600, color: Math.abs(diff) >= 1 ? (diff > 0 ? "#f59e0b" : "#3b82f6") : "var(--text-muted)" }}>
                    {diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)}
                  </td>
                  <td>{winner === "tie" ? "🤝 平" : winner === "left" ? "← 左方" : "右方 →"}</td>
                </tr>
              );
            })}
            <tr style={{ background: "rgba(245,158,11,.04)" }}>
              <td style={{ fontWeight: 700 }}>总分</td>
              <td style={{ textAlign: "right", fontWeight: 800, color: "#f59e0b" }}>{left.total.toFixed(2)}</td>
              <td style={{ textAlign: "right", fontWeight: 800, color: "#3b82f6" }}>{right.total.toFixed(2)}</td>
              <td style={{ textAlign: "center", fontWeight: 700 }}>{left.total > right.total ? `+${(left.total - right.total).toFixed(2)}` : `${(left.total - right.total).toFixed(2)}`}</td>
              <td>{left.total === right.total ? "🤝" : left.total > right.total ? "🥇 左方" : "右方 🥇"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pros/cons */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }} className="duel-pros-cons">
        <ProsCons agent={left} accent="#f59e0b" />
        <ProsCons agent={right} accent="#3b82f6" />
      </div>

      {/* Best for */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: ".75rem" }}>🎯 哪种场景该选谁</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="duel-best-for">
          <div>
            <div style={{ color: "#f59e0b", fontWeight: 600, marginBottom: ".4rem" }}>← {left.name} 适合</div>
            <p className="muted" style={{ fontSize: ".9rem", lineHeight: 1.55 }}>{left.best_for}</p>
          </div>
          <div>
            <div style={{ color: "#3b82f6", fontWeight: 600, marginBottom: ".4rem" }}>{right.name} 适合 →</div>
            <p className="muted" style={{ fontSize: ".9rem", lineHeight: 1.55 }}>{right.best_for}</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 720px) {
          .duel-selectors, .duel-cards, .duel-pros-cons, .duel-best-for {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

function Selector({ color, label, value, setValue, agents, excludeSlug }: { color: string; label: string; value: string; setValue: (v: string) => void; agents: Agent[]; excludeSlug: string }) {
  return (
    <div className="card" style={{ borderColor: color, padding: "1rem" }}>
      <div style={{ color, fontWeight: 600, fontSize: ".85rem", marginBottom: ".5rem" }}>{label}</div>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={{
          width: "100%",
          padding: ".55rem .8rem",
          background: "var(--bg-elev)",
          color: "var(--text)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          fontSize: "1rem",
          appearance: "menulist",
        }}
      >
        {agents.map((a) => (
          <option key={a.slug} value={a.slug} disabled={a.slug === excludeSlug}>
            {a.icon} {a.name} (#{a.rank})
          </option>
        ))}
      </select>
    </div>
  );
}

function SideCard({ agent, accent }: { agent: Agent; accent: string }) {
  return (
    <div className="card" style={{ borderColor: accent }}>
      <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".5rem" }}>
        <span style={{ fontSize: "2rem" }}>{agent.icon}</span>
        <div>
          <div style={{ fontWeight: 700 }}>{agent.name}</div>
          <div className="muted" style={{ fontSize: ".82rem" }}>排名 #{agent.rank}</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: "1.6rem", fontWeight: 800, color: accent }}>
          {agent.total.toFixed(2)}
        </div>
      </div>
      <p className="muted" style={{ fontSize: ".85rem", lineHeight: 1.5, marginTop: ".5rem" }}>{agent.verdict}</p>
      <Link href={`/agents/${agent.slug}`} style={{ display: "inline-block", marginTop: ".75rem", fontSize: ".82rem", color: accent }}>详情 →</Link>
    </div>
  );
}

function ProsCons({ agent, accent }: { agent: Agent; accent: string }) {
  return (
    <div className="card">
      <div style={{ color: accent, fontWeight: 600, marginBottom: ".5rem", fontSize: ".95rem" }}>
        {agent.icon} {agent.name}
      </div>
      <div style={{ marginBottom: ".75rem" }}>
        <div style={{ color: "var(--green)", fontSize: ".82rem", marginBottom: ".4rem", fontWeight: 600 }}>✓ 优势</div>
        <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: ".88rem", lineHeight: 1.55 }}>
          {agent.strengths.map((s, i) => (<li key={i}>{s}</li>))}
        </ul>
      </div>
      <div>
        <div style={{ color: "var(--red)", fontSize: ".82rem", marginBottom: ".4rem", fontWeight: 600 }}>⚠ 短板</div>
        <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: ".88rem", lineHeight: 1.55 }}>
          {agent.weaknesses.map((w, i) => (<li key={i}>{w}</li>))}
        </ul>
      </div>
    </div>
  );
}
