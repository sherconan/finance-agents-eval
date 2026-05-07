"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Agent } from "@/lib/data";

const DIM = [
  { key: "completeness", name: "完成度", color: "#f59e0b", default: 0.30 },
  { key: "professionalism", name: "专业度", color: "#fb923c", default: 0.25 },
  { key: "accuracy", name: "准确性", color: "#10b981", default: 0.25 },
  { key: "usability", name: "易用性", color: "#3b82f6", default: 0.20 },
] as const;

type DimKey = (typeof DIM)[number]["key"];

export function WeightTuner({ agents }: { agents: Agent[] }) {
  const [weights, setWeights] = useState<Record<DimKey, number>>({
    completeness: 30,
    professionalism: 25,
    accuracy: 25,
    usability: 20,
  });

  const total = weights.completeness + weights.professionalism + weights.accuracy + weights.usability;

  const reranked = useMemo(() => {
    const norm = total > 0 ? total : 1;
    const list = agents.map((a) => {
      const sumScore =
        a.completeness * (weights.completeness / norm) +
        a.professionalism * (weights.professionalism / norm) +
        a.accuracy * (weights.accuracy / norm) +
        a.usability * (weights.usability / norm);
      return { agent: a, score: Number(sumScore.toFixed(3)) };
    });
    list.sort((x, y) => y.score - x.score);
    return list.map((x, i) => ({ ...x, rank: i + 1, deltaRank: x.agent.rank - (i + 1) }));
  }, [agents, weights, total]);

  function reset() {
    setWeights({ completeness: 30, professionalism: 25, accuracy: 25, usability: 20 });
  }

  function preset(name: "default" | "accuracy" | "completeness" | "usability" | "professionalism") {
    if (name === "default") return reset();
    const m: Record<string, Record<DimKey, number>> = {
      accuracy:        { completeness: 15, professionalism: 20, accuracy: 50, usability: 15 },
      completeness:    { completeness: 50, professionalism: 20, accuracy: 15, usability: 15 },
      usability:       { completeness: 15, professionalism: 20, accuracy: 15, usability: 50 },
      professionalism: { completeness: 20, professionalism: 50, accuracy: 20, usability: 10 },
    };
    setWeights(m[name]);
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 1fr) 2fr", gap: "1.25rem" }} className="weight-tuner">
      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem" }}>
          <h3 style={{ fontSize: "1.05rem", fontWeight: 600 }}>调权重</h3>
          <span className="muted" style={{ fontSize: ".8rem" }}>合 {total}%</span>
        </div>
        <p className="muted" style={{ fontSize: ".82rem", lineHeight: 1.5, marginBottom: "1rem" }}>
          按你的工作场景调整 4 维权重，右侧排行实时变化。
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {DIM.map((d) => (
            <div key={d.key}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".3rem" }}>
                <span style={{ fontSize: ".9rem" }}>{d.name}</span>
                <span style={{ fontWeight: 600, color: d.color }}>{weights[d.key]}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={weights[d.key]}
                onChange={(e) => setWeights((w) => ({ ...w, [d.key]: Number(e.target.value) }))}
                style={{ width: "100%", accentColor: d.color }}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: "1.25rem", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
          <button onClick={() => preset("default")} className="preset-btn">默认</button>
          <button onClick={() => preset("accuracy")} className="preset-btn">重数据</button>
          <button onClick={() => preset("professionalism")} className="preset-btn">重专业度</button>
          <button onClick={() => preset("completeness")} className="preset-btn">重完成度</button>
          <button onClick={() => preset("usability")} className="preset-btn">重易用性</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "auto" }}>
        <table className="ranking">
          <thead>
            <tr>
              <th style={{ width: 50 }}>#</th>
              <th>Agent</th>
              <th style={{ textAlign: "right" }}>新分</th>
              <th style={{ textAlign: "center" }}>变化</th>
            </tr>
          </thead>
          <tbody>
            {reranked.map((r) => (
              <tr key={r.agent.slug}>
                <td style={{ fontWeight: 700, color: r.rank <= 3 ? "var(--accent)" : "var(--text-muted)" }}>
                  {r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : r.rank}
                </td>
                <td>
                  <Link href={`/agents/${r.agent.slug}`} style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <span>{r.agent.icon}</span>
                    <span style={{ fontWeight: 500 }}>{r.agent.name}</span>
                  </Link>
                </td>
                <td style={{ textAlign: "right", fontWeight: 700, color: "var(--accent)" }}>{r.score.toFixed(2)}</td>
                <td style={{ textAlign: "center", fontSize: ".85rem" }}>
                  {r.deltaRank > 0 ? (
                    <span style={{ color: "var(--green)" }}>↑ {r.deltaRank}</span>
                  ) : r.deltaRank < 0 ? (
                    <span style={{ color: "var(--red)" }}>↓ {-r.deltaRank}</span>
                  ) : (
                    <span className="muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .preset-btn {
          padding: .35rem .7rem;
          background: rgba(245,158,11,.12);
          color: #f59e0b;
          border: 1px solid rgba(245,158,11,.3);
          border-radius: 999px;
          font-size: .8rem;
          cursor: pointer;
          transition: background .15s;
        }
        .preset-btn:hover { background: rgba(245,158,11,.22); }
        @media (max-width: 720px) {
          .weight-tuner {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
