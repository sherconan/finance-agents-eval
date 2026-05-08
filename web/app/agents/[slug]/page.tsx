import Link from "next/link";
import { notFound } from "next/navigation";
import { data, getArtifact, getDeepDive } from "@/lib/data";
import { mdToHtml } from "@/lib/markdown";
import { RadarChart } from "@/components/RadarChart";

export function generateStaticParams() {
  return data.results.map((a) => ({ slug: a.slug }));
}

export default async function AgentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = data.results.find((a) => a.slug === slug);
  if (!agent) notFound();

  const deep = getDeepDive(slug);
  const artifactMd = getArtifact(slug);
  const html = mdToHtml(artifactMd);

  const dims = [
    { dim: "完成度", value: agent.completeness, label: "Completeness", weight: 0.30 },
    { dim: "专业度", value: agent.professionalism, label: "Professionalism", weight: 0.25 },
    { dim: "准确性", value: agent.accuracy, label: "Accuracy", weight: 0.25 },
    { dim: "易用性", value: agent.usability, label: "Usability", weight: 0.20 },
  ];

  const benchmark = {
    name: "全榜均值",
    color: "#475569",
    values: dims.map((d) => ({
      dim: d.dim,
      value:
        data.results.reduce(
          (sum, a) => sum + ((a as unknown as Record<string, number>)[d.label.toLowerCase()] ?? 0),
          0,
        ) / data.results.length,
    })),
  };

  const series = [
    {
      name: agent.name,
      color: "#f59e0b",
      values: dims.map((d) => ({ dim: d.dim, value: d.value })),
    },
    benchmark,
  ];

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <Link href="/" className="muted" style={{ fontSize: ".9rem" }}>← 返回榜单</Link>

      {/* Header */}
      <header style={{ marginTop: "1.25rem", marginBottom: "2rem", display: "flex", flexWrap: "wrap", gap: "1.5rem", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 auto", minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".5rem" }}>
            <span style={{ fontSize: "2.6rem" }}>{agent.icon}</span>
            <div>
              <div style={{ display: "flex", gap: ".4rem", marginBottom: ".3rem", flexWrap: "wrap" }}>
                <span className={agent.category === "research" ? "tag tag-research" : "tag tag-ops"}>
                  {agent.category === "research" ? "研究 / 覆盖" : "财务 / 运营"}
                </span>
                <span className="tag" style={{ background: "rgba(148,163,184,.12)", color: "var(--text-muted)" }}>排名 #{agent.rank} / 10</span>
                <span className="tag" style={{ background: "rgba(245,158,11,.15)" }}>总分 {agent.total.toFixed(2)}</span>
              </div>
              <h1 style={{ fontSize: "2.1rem", fontWeight: 800, letterSpacing: "-.01em" }}>{agent.name}</h1>
            </div>
          </div>
          {deep && (
            <p style={{ fontSize: "1.15rem", lineHeight: 1.55, color: "var(--text)", maxWidth: 760, marginTop: ".5rem" }}>
              <strong style={{ color: "var(--accent)" }}>它是干什么的：</strong> {deep.what_it_does_1line}
            </p>
          )}
        </div>
      </header>

      {/* What it does — non-tech explanation */}
      {deep && (
        <section style={{ marginBottom: "2.5rem" }}>
          <div className="card" style={{ padding: "1.5rem 1.75rem", borderColor: "rgba(245,158,11,.3)" }}>
            <h2 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent)", marginBottom: ".75rem", textTransform: "uppercase", letterSpacing: ".08em" }}>
              👉 用人话讲（非技术语言）
            </h2>
            <p style={{ fontSize: "1.02rem", lineHeight: 1.75, color: "var(--text)" }}>
              {deep.non_tech_explanation}
            </p>
          </div>
        </section>
      )}

      {/* Technical breakdown */}
      {deep && (
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>🔧 技术拆解</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
            <div className="card">
              <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".5rem" }}>composes skills</div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.7, fontSize: ".88rem", fontFamily: "ui-monospace, monospace" }}>
                {deep.technical_breakdown.composes_skills.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".5rem" }}>subagents</div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.7, fontSize: ".88rem" }}>
                {deep.technical_breakdown.subagents_used.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".5rem" }}>connectors（可选）</div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.7, fontSize: ".88rem" }}>
                {deep.technical_breakdown.connectors_optional.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
            <div className="card">
              <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".5rem" }}>compute pattern</div>
              <code style={{ fontSize: ".85rem", lineHeight: 1.6, color: "var(--text)", display: "block", whiteSpace: "pre-wrap" }}>
                {deep.technical_breakdown.compute_pattern}
              </code>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
            <div className="card" style={{ borderColor: "rgba(59,130,246,.3)" }}>
              <div style={{ fontSize: ".82rem", fontWeight: 600, color: "#60a5fa", marginBottom: ".5rem" }}>📥 输入</div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.7, fontSize: ".9rem" }}>
                {deep.inputs_required.map((s, i) => (<li key={i}>{s}</li>))}
              </ul>
            </div>
            <div className="card" style={{ borderColor: "rgba(16,185,129,.3)" }}>
              <div style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--green)", marginBottom: ".5rem" }}>📤 输出</div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.7, fontSize: ".9rem" }}>
                {deep.outputs_produced.map((s, i) => (<li key={i}>{s}</li>))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* 3 Cases — the meat of the evaluation */}
      {deep && (
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: ".5rem" }}>🧪 3 个实测案例</h2>
          <p className="muted" style={{ marginBottom: "1.25rem", fontSize: ".95rem" }}>
            每个 case 都标注：输入 → 处理 → 输出 → 结果评价 + 评分 + 耗时。这是评测最硬的证据。
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {deep.cases.map((c, i) => (
              <article
                key={i}
                className="card"
                style={{
                  borderLeft: `3px solid ${c.score >= 9 ? "var(--green)" : c.score >= 8 ? "var(--accent)" : "#fb923c"}`,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".75rem", flexWrap: "wrap", gap: ".5rem" }}>
                  <div style={{ fontSize: "1.05rem", fontWeight: 600 }}>{c.name}</div>
                  <div style={{ display: "flex", gap: ".75rem", alignItems: "baseline" }}>
                    <span style={{ fontSize: ".82rem", color: "var(--text-muted)" }}>耗时 {c.took}</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 800, color: c.score >= 9 ? "var(--green)" : "var(--accent)" }}>
                      {c.score.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: ".5rem .75rem", fontSize: ".92rem", lineHeight: 1.65 }}>
                  <span style={{ color: "#60a5fa", fontWeight: 600 }}>输入</span>
                  <span style={{ color: "var(--text)" }}>{c.input}</span>

                  <span style={{ color: "var(--text-muted)", fontWeight: 600 }}>处理</span>
                  <span className="muted">{c.process}</span>

                  <span style={{ color: "var(--green)", fontWeight: 600 }}>输出</span>
                  <span style={{ color: "var(--text)" }}>{c.output}</span>

                  <span style={{ color: "var(--accent)", fontWeight: 600 }}>结果</span>
                  <span style={{ color: "var(--text)" }}><strong>{c.result}</strong></span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Score breakdown — secondary, not primary anymore */}
      <section style={{ marginBottom: "2.5rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>📊 综合评分</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
          <div className="card">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "1rem" }}>分维度得分</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: ".9rem" }}>
              {dims.map((d) => (
                <div key={d.dim}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".3rem" }}>
                    <span style={{ fontSize: ".9rem" }}>
                      {d.dim}
                      <span className="muted" style={{ marginLeft: ".4rem", fontSize: ".75rem" }}>权重 {Math.round(d.weight * 100)}%</span>
                    </span>
                    <span style={{ fontWeight: 600 }}>{d.value.toFixed(1)} / 10</span>
                  </div>
                  <div className="score-bar"><div className="score-bar-fill" style={{ width: `${d.value * 10}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: ".5rem" }}>vs 全榜均值</h3>
            <RadarChart series={series} height={280} />
          </div>
        </div>
      </section>

      {/* Pros / cons / best-for */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
        <div className="card" style={{ borderColor: "rgba(16,185,129,.4)" }}>
          <h3 style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--green)", marginBottom: ".75rem" }}>✓ 优势</h3>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.7, fontSize: ".92rem" }}>
            {agent.strengths.map((s, i) => (<li key={i}>{s}</li>))}
          </ul>
        </div>
        <div className="card" style={{ borderColor: "rgba(239,68,68,.4)" }}>
          <h3 style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--red)", marginBottom: ".75rem" }}>⚠ 短板</h3>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.7, fontSize: ".92rem" }}>
            {agent.weaknesses.map((w, i) => (<li key={i}>{w}</li>))}
          </ul>
        </div>
        <div className="card" style={{ borderColor: "rgba(245,158,11,.4)" }}>
          <h3 style={{ fontSize: ".95rem", fontWeight: 600, color: "var(--accent)", marginBottom: ".75rem" }}>🎯 适用场景</h3>
          <p style={{ margin: 0, lineHeight: 1.7, fontSize: ".92rem" }}>{agent.best_for}</p>
        </div>
      </section>

      {/* Full artifact — collapsible */}
      <section style={{ marginBottom: "3rem" }}>
        <details className="card" style={{ padding: "1.25rem 1.5rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.05rem", display: "flex", alignItems: "center", justifyContent: "space-between", listStyle: "none" }}>
            <span>📄 完整 artifact 全文（点击展开）</span>
            <span style={{ color: "var(--accent)" }}>↓</span>
          </summary>
          <article className="prose-art" style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: "1px solid var(--border)" }} dangerouslySetInnerHTML={{ __html: html }} />
        </details>
      </section>
    </div>
  );
}
