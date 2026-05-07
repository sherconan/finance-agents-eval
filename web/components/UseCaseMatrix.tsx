// 8 high-frequency finance scenarios x recommended agents
// Score 0-3: 0 = irrelevant, 1 = supportive, 2 = good fit, 3 = best fit

import Link from "next/link";

type Cell = { agent: string; slug: string; fit: 0 | 1 | 2 | 3 };

const scenarios: { name: string; cells: Cell[] }[] = [
  {
    name: "投行 sell-side pitch",
    cells: [
      { agent: "Pitch Builder", slug: "pitch-builder", fit: 3 },
      { agent: "Market Researcher", slug: "market-researcher", fit: 2 },
      { agent: "Model Builder", slug: "model-builder", fit: 2 },
    ],
  },
  {
    name: "买方分析师季报跟踪",
    cells: [
      { agent: "Earnings Reviewer", slug: "earnings-reviewer", fit: 3 },
      { agent: "Meeting Preparer", slug: "meeting-preparer", fit: 2 },
      { agent: "Model Builder", slug: "model-builder", fit: 1 },
    ],
  },
  {
    name: "PE/VC 项目尽调",
    cells: [
      { agent: "Meeting Preparer", slug: "meeting-preparer", fit: 3 },
      { agent: "Valuation Reviewer", slug: "valuation-reviewer", fit: 2 },
      { agent: "Statement Auditor", slug: "statement-auditor", fit: 2 },
    ],
  },
  {
    name: "投委会模型自审",
    cells: [
      { agent: "Valuation Reviewer", slug: "valuation-reviewer", fit: 3 },
      { agent: "Model Builder", slug: "model-builder", fit: 1 },
    ],
  },
  {
    name: "上市公司年报审阅",
    cells: [
      { agent: "Statement Auditor", slug: "statement-auditor", fit: 3 },
      { agent: "Earnings Reviewer", slug: "earnings-reviewer", fit: 2 },
    ],
  },
  {
    name: "SaaS Controller 月结",
    cells: [
      { agent: "Month-End Closer", slug: "month-end-closer", fit: 3 },
      { agent: "GL Reconciler", slug: "gl-reconciler", fit: 3 },
      { agent: "Statement Auditor", slug: "statement-auditor", fit: 2 },
    ],
  },
  {
    name: "对公开户合规",
    cells: [
      { agent: "KYC Screener", slug: "kyc-screener", fit: 3 },
    ],
  },
  {
    name: "行业 sector primer",
    cells: [
      { agent: "Market Researcher", slug: "market-researcher", fit: 3 },
      { agent: "Earnings Reviewer", slug: "earnings-reviewer", fit: 1 },
    ],
  },
];

const fitStyles: Record<number, { bg: string; text: string; label: string }> = {
  3: { bg: "rgba(16,185,129,.18)", text: "#10b981", label: "best fit" },
  2: { bg: "rgba(245,158,11,.18)", text: "#f59e0b", label: "good fit" },
  1: { bg: "rgba(148,163,184,.12)", text: "#94a3b8", label: "support" },
  0: { bg: "transparent", text: "transparent", label: "" },
};

export function UseCaseMatrix() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "1rem" }}>
      {scenarios.map((s) => (
        <div key={s.name} className="card" style={{ padding: "1.1rem" }}>
          <div style={{ fontWeight: 600, marginBottom: ".75rem" }}>{s.name}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".4rem" }}>
            {s.cells.map((c) => {
              const fs = fitStyles[c.fit];
              return (
                <Link
                  key={c.slug}
                  href={`/agents/${c.slug}`}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: ".55rem .8rem",
                    borderRadius: 8,
                    background: fs.bg,
                    color: fs.text,
                    fontSize: ".9rem",
                    border: c.fit === 3 ? "1px solid rgba(16,185,129,.35)" : "1px solid transparent",
                  }}
                >
                  <span style={{ fontWeight: c.fit === 3 ? 600 : 500 }}>{c.agent}</span>
                  <span style={{ fontSize: ".75rem", opacity: .85 }}>{fs.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
