import Link from "next/link";
import { notFound } from "next/navigation";
import { data, getArtifact } from "@/lib/data";
import { mdToHtml } from "@/lib/markdown";
import { RadarChart } from "@/components/RadarChart";

export function generateStaticParams() {
  return data.results.map((a) => ({ slug: a.slug }));
}

export default async function AgentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const agent = data.results.find((a) => a.slug === slug);
  if (!agent) notFound();

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
    <div className="container" style={{ paddingTop: "2.5rem" }}>
      <Link href="/" className="muted" style={{ fontSize: ".9rem" }}>
        ← 返回榜单
      </Link>

      {/* Header */}
      <header style={{ marginTop: "1.5rem", marginBottom: "2.5rem", display: "flex", flexWrap: "wrap", gap: "2rem", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".75rem" }}>
            <span style={{ fontSize: "3rem" }}>{agent.icon}</span>
            <div>
              <div style={{ display: "flex", gap: ".5rem", marginBottom: ".4rem" }}>
                <span className={agent.category === "research" ? "tag tag-research" : "tag tag-ops"}>
                  {agent.category === "research" ? "研究 / 覆盖" : "财务 / 运营"}
                </span>
                <span className="tag" style={{ background: "rgba(148,163,184,.12)", color: "var(--text-muted)" }}>排名 #{agent.rank} / 10</span>
              </div>
              <h1 style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-.01em" }}>{agent.name}</h1>
            </div>
          </div>
          <p className="muted" style={{ fontSize: "1rem", maxWidth: 640, lineHeight: 1.6 }}>{agent.verdict}</p>
        </div>
        <div className="card" style={{ minWidth: 220, textAlign: "center" }}>
          <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em" }}>综合总分</div>
          <div style={{ fontSize: "3rem", fontWeight: 800, color: "var(--accent)", lineHeight: 1.1 }}>{agent.total.toFixed(2)}</div>
          <div className="muted" style={{ fontSize: ".85rem" }}>耗时 {agent.speed_sec}s</div>
        </div>
      </header>

      {/* Score breakdown */}
      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: "1rem" }}>分维度得分</h3>
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
                <div className="score-bar">
                  <div className="score-bar-fill" style={{ width: `${d.value * 10}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: ".5rem" }}>vs 全榜均值</h3>
          <RadarChart series={series} height={300} />
        </div>
      </section>

      {/* Pros / cons / best-for */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2.5rem" }}>
        <div className="card" style={{ borderColor: "rgba(16,185,129,.4)" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--green)", marginBottom: ".75rem" }}>✓ 优势</h3>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.7, fontSize: ".95rem" }}>
            {agent.strengths.map((s, i) => (<li key={i}>{s}</li>))}
          </ul>
        </div>
        <div className="card" style={{ borderColor: "rgba(239,68,68,.4)" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--red)", marginBottom: ".75rem" }}>⚠ 短板</h3>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.7, fontSize: ".95rem" }}>
            {agent.weaknesses.map((w, i) => (<li key={i}>{w}</li>))}
          </ul>
        </div>
        <div className="card" style={{ borderColor: "rgba(245,158,11,.4)" }}>
          <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--accent)", marginBottom: ".75rem" }}>🎯 适用场景</h3>
          <p style={{ margin: 0, lineHeight: 1.7, fontSize: ".95rem" }}>{agent.best_for}</p>
        </div>
      </section>

      {/* Artifact */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>📄 评测产出 Artifact</h2>
          <Link href={`/artifacts/${agent.artifact_path.split("/").pop()}`} className="muted" style={{ fontSize: ".85rem" }}>
            原始 Markdown ↗
          </Link>
        </div>
        <article className="card prose-art" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </div>
  );
}
