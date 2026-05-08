import Link from "next/link";
import { data, getDeepDive, getCaseContent } from "@/lib/data";
import { mdToHtml } from "@/lib/markdown";

export const metadata = { title: "评测结果一览 · 10 agents × 3 cases" };

export default function ResultsPage() {
  // Pre-render all 30 case contents at build time
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
        10 个 Agent · 30 个实测 Case · <span className="gradient-text">现在就在这一页</span>
      </h1>
      <p className="muted" style={{ maxWidth: 800, lineHeight: 1.65, marginBottom: "1.5rem" }}>
        每行一个 agent，每个 agent 跑了 3 个 case。点击任意 case 直接在页面展开看完整内容——不用下载、不用跳转。
        所有 30 个 case 都已实际产出 markdown artifact。
      </p>

      {/* At-a-glance score matrix */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: ".75rem" }}>📊 30 个 case 评分矩阵（一眼看完）</h2>
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

      <div className="muted" style={{ fontSize: ".82rem", marginBottom: "2rem", padding: ".75rem 1rem", borderLeft: "3px solid var(--green)", background: "rgba(16,185,129,.06)" }}>
        ✅ <strong style={{ color: "var(--green)" }}>30/30 全部 Executed</strong> · 每 case 都有独立 markdown 落盘 ·
        往下滚直接看每个 case 的完整内容
      </div>

      {/* Detailed: each agent + 3 expandable cases */}
      {rows.map(({ agent, deep, caseContents }) => (
        <section key={agent.slug} id={agent.slug} style={{ marginBottom: "3rem", paddingTop: "1rem" }}>
          <header style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem", paddingBottom: ".75rem", borderBottom: "2px solid var(--border)" }}>
            <span style={{ fontSize: "1.8rem" }}>{agent.icon}</span>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: "1.35rem", fontWeight: 700 }}>
                {agent.name}
                <span className="muted" style={{ fontWeight: 400, fontSize: "1rem", marginLeft: ".75rem" }}>
                  #{agent.rank} · 总分 {agent.total.toFixed(2)}
                </span>
              </h2>
              {deep && (
                <p className="muted" style={{ fontSize: ".92rem", marginTop: ".2rem" }}>
                  {deep.what_it_does_1line}
                </p>
              )}
            </div>
            <Link href={`/agents/${agent.slug}`} className="btn btn-outline" style={{ fontSize: ".82rem", padding: ".4rem .8rem" }}>
              详情页 →
            </Link>
          </header>

          {/* 3 cases — each with FULL content inline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {deep?.cases.map((c, i) => {
              const html = caseContents[i] ? mdToHtml(caseContents[i]) : "";
              return (
                <article
                  key={i}
                  id={`${agent.slug}-case${i + 1}`}
                  className="card"
                  style={{ borderLeft: `3px solid ${cellColor(c.score)}` }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".5rem", flexWrap: "wrap", gap: ".5rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap" }}>
                      <span className="tag" style={{ background: "rgba(16,185,129,.18)", color: "var(--green)", fontSize: ".7rem" }}>✅ Executed</span>
                      <span style={{ fontSize: "1rem", fontWeight: 600 }}>{c.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: ".75rem", alignItems: "baseline" }}>
                      <span className="muted" style={{ fontSize: ".8rem" }}>耗时 {c.took}</span>
                      <span style={{ fontSize: "1.2rem", fontWeight: 800, color: cellColor(c.score) }}>{c.score.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Quick summary table */}
                  <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: ".4rem .75rem", fontSize: ".88rem", lineHeight: 1.6, marginBottom: ".75rem", padding: ".75rem 1rem", background: "var(--bg-elev)", borderRadius: 8 }}>
                    <span style={{ color: "#60a5fa", fontWeight: 600 }}>输入</span>
                    <span>{c.input}</span>
                    <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>处理</span>
                    <span className="muted">{c.process}</span>
                    <span style={{ color: "var(--green)", fontWeight: 600 }}>输出</span>
                    <span>{c.output}</span>
                    <span style={{ color: "var(--accent)", fontWeight: 600 }}>结果</span>
                    <span><strong>{c.result}</strong></span>
                  </div>

                  {/* FULL inline content */}
                  {html && (
                    <details>
                      <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", padding: ".5rem .75rem", background: "rgba(245,158,11,.08)", borderRadius: 8, fontSize: ".88rem" }}>
                        <span style={{ color: "var(--accent)", fontWeight: 600 }}>📖 展开完整 case 内容</span>
                        <span className="muted" style={{ fontSize: ".78rem" }}>
                          {(caseContents[i].length / 1000).toFixed(1)}k 字 · 展开看完整推理 / 表格 / 评价
                        </span>
                      </summary>
                      <article
                        className="prose-art"
                        style={{ marginTop: ".75rem", padding: "1.25rem 1.5rem", background: "var(--bg-elev)", border: "1px solid var(--border)", borderRadius: 8, fontSize: ".92rem" }}
                        dangerouslySetInnerHTML={{ __html: html }}
                      />
                    </details>
                  )}
                </article>
              );
            })}
          </div>
        </section>
      ))}

      {/* Bottom nav */}
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3rem", paddingTop: "1rem", borderTop: "1px solid var(--border)" }}>
        <Link href="/" className="btn btn-outline">← 返回首页</Link>
        <Link href="/methodology" className="btn btn-outline">评测方法论</Link>
        <Link href="/downloads" className="btn btn-outline">下载完整 bundle</Link>
      </div>
    </div>
  );
}
