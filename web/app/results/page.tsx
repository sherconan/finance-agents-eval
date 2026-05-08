import Link from "next/link";
import { data, getDeepDive, getCaseContent } from "@/lib/data";
import { mdToHtml } from "@/lib/markdown";

export const metadata = { title: "评测结果一览 · 10 agents × 3 cases" };

export default function ResultsPage() {
  const rows = data.results.map((agent) => {
    const deep = getDeepDive(agent.slug);
    return {
      agent,
      deep,
      caseContents: deep?.cases.map((_, i) => getCaseContent(agent.slug, i)) ?? [],
    };
  });

  const cellColor = (s: number) =>
    s >= 9 ? "var(--green)" : s >= 8.5 ? "#10b981" : s >= 8 ? "var(--accent)" : s >= 7 ? "#fb923c" : "#ef4444";

  return (
    <div className="container" style={{ paddingTop: "2rem", maxWidth: 1200 }}>
      <div className="tag" style={{ marginBottom: ".75rem" }}>核心 · 评测结果一览</div>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.01em", marginBottom: ".5rem" }}>
        10 个 Agent · 30 个实测 Case · <span className="gradient-text">全部内容直接看</span>
      </h1>
      <p className="muted" style={{ maxWidth: 800, lineHeight: 1.65, marginBottom: "1.5rem" }}>
        所有 30 个 case 的实测内容都铺在下面——直接滚动、直接看，<strong style={{ color: "var(--accent)" }}>没有任何折叠或下载</strong>。
        顶部矩阵是评分速览，点任何分数都能跳到对应 case。
      </p>

      {/* At-a-glance score matrix — sticky-ish navigation */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".75rem" }}>📊 30 个 case 评分矩阵（点击跳转）</h2>
        <div className="card" style={{ padding: 0, overflow: "auto" }}>
          <table className="ranking" style={{ minWidth: 720 }}>
            <thead>
              <tr>
                <th style={{ width: 60 }}>#</th>
                <th>Agent</th>
                <th style={{ textAlign: "center" }}>Case 1</th>
                <th style={{ textAlign: "center" }}>Case 2</th>
                <th style={{ textAlign: "center" }}>Case 3</th>
                <th style={{ textAlign: "right" }}>综合</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ agent, deep }) => (
                <tr key={agent.slug}>
                  <td style={{ fontWeight: 700, color: agent.rank <= 3 ? "var(--accent)" : "var(--text-muted)" }}>
                    {agent.rank === 1 ? "🥇" : agent.rank === 2 ? "🥈" : agent.rank === 3 ? "🥉" : agent.rank}
                  </td>
                  <td>
                    <a href={`#${agent.slug}`} style={{ display: "flex", alignItems: "center", gap: ".5rem", fontWeight: 500 }}>
                      <span>{agent.icon}</span>
                      <span>{agent.name}</span>
                    </a>
                  </td>
                  {deep?.cases.map((c, i) => (
                    <td key={i} style={{ textAlign: "center" }}>
                      <a href={`#${agent.slug}-case${i + 1}`} style={{
                        display: "inline-block",
                        padding: ".25rem .55rem",
                        borderRadius: 6,
                        background: `${cellColor(c.score)}22`,
                        color: cellColor(c.score),
                        fontWeight: 700,
                        minWidth: 48,
                        fontSize: ".9rem",
                      }}>
                        {c.score.toFixed(1)}
                      </a>
                    </td>
                  ))}
                  <td style={{ textAlign: "right", fontWeight: 800, color: "var(--accent)" }}>{agent.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Detailed: each agent + 3 case ALWAYS-VISIBLE full content */}
      {rows.map(({ agent, deep, caseContents }) => (
        <section key={agent.slug} id={agent.slug} style={{ marginBottom: "3.5rem", paddingTop: "1rem", scrollMarginTop: "1rem" }}>
          <header style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1rem", padding: ".75rem 1rem", background: "linear-gradient(90deg, rgba(245,158,11,.08), transparent)", borderLeft: "4px solid var(--accent)", borderRadius: 8 }}>
            <span style={{ fontSize: "2rem" }}>{agent.icon}</span>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: ".15rem" }}>
                #{agent.rank} {agent.name}
                <span className="muted" style={{ fontWeight: 400, fontSize: "1rem", marginLeft: ".75rem" }}>
                  总分 {agent.total.toFixed(2)}
                </span>
              </h2>
              {deep && (
                <p style={{ fontSize: ".95rem", color: "var(--text)", marginTop: ".15rem" }}>
                  <strong style={{ color: "var(--accent)" }}>能干啥：</strong> {deep.what_it_does_1line}
                </p>
              )}
            </div>
            <Link href={`/agents/${agent.slug}`} className="btn btn-outline hide-on-mobile" style={{ fontSize: ".82rem", padding: ".4rem .8rem" }}>
              详情 →
            </Link>
          </header>

          {/* 3 cases — all FULL content always visible */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {deep?.cases.map((c, i) => {
              const html = caseContents[i] ? mdToHtml(caseContents[i]) : "";
              return (
                <article
                  key={i}
                  id={`${agent.slug}-case${i + 1}`}
                  className="card"
                  style={{
                    borderLeft: `4px solid ${cellColor(c.score)}`,
                    scrollMarginTop: "1rem",
                  }}
                >
                  {/* Case header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem", flexWrap: "wrap", gap: ".5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap" }}>
                      <span className="tag" style={{ background: "rgba(16,185,129,.18)", color: "var(--green)", fontSize: ".7rem" }}>✅ Executed</span>
                      <span style={{ fontSize: "1.05rem", fontWeight: 600 }}>{c.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: ".75rem", alignItems: "baseline" }}>
                      <span className="muted" style={{ fontSize: ".82rem" }}>耗时 {c.took}</span>
                      <span style={{ fontSize: "1.4rem", fontWeight: 800, color: cellColor(c.score) }}>{c.score.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* BIG result banner */}
                  <div
                    style={{
                      padding: "1rem 1.25rem",
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${cellColor(c.score)}1a, ${cellColor(c.score)}0a)`,
                      border: `1px solid ${cellColor(c.score)}40`,
                      marginBottom: "1rem",
                    }}
                  >
                    <div style={{ fontSize: ".75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".25rem" }}>
                      🏁 Result
                    </div>
                    <div style={{ fontSize: "1.05rem", fontWeight: 600, lineHeight: 1.5, color: cellColor(c.score) }}>
                      {c.result}
                    </div>
                  </div>

                  {/* Quick summary table */}
                  <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: ".4rem .75rem", fontSize: ".88rem", lineHeight: 1.6, marginBottom: "1rem", padding: ".75rem 1rem", background: "var(--bg-elev)", borderRadius: 8 }}>
                    <span style={{ color: "#60a5fa", fontWeight: 600 }}>📥 输入</span>
                    <span>{c.input}</span>
                    <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>⚙️ 处理</span>
                    <span className="muted">{c.process}</span>
                    <span style={{ color: "var(--green)", fontWeight: 600 }}>📤 输出</span>
                    <span>{c.output}</span>
                  </div>

                  {/* FULL inline content — ALWAYS visible */}
                  {html && (
                    <div>
                      <div style={{ fontSize: ".75rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".5rem" }}>
                        📖 完整 Case Artifact ({(caseContents[i].length / 1000).toFixed(1)}k 字)
                      </div>
                      <article
                        className="prose-art"
                        style={{
                          padding: "1.25rem 1.5rem",
                          background: "var(--bg-elev)",
                          border: "1px solid var(--border)",
                          borderRadius: 10,
                          fontSize: ".92rem",
                        }}
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
        <Link href="/" className="btn btn-outline">← 返回首页</Link>
        <Link href="/methodology" className="btn btn-outline">评测方法论</Link>
        <Link href="/downloads" className="btn btn-outline">下载完整 bundle</Link>
      </div>
    </div>
  );
}
