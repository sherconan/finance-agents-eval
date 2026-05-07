import { data } from "@/lib/data";
import Link from "next/link";

export default function ComparePage() {
  const dims = [
    { key: "completeness", name: "完成度" },
    { key: "professionalism", name: "专业度" },
    { key: "accuracy", name: "准确性" },
    { key: "usability", name: "易用性" },
  ] as const;

  const cellColor = (v: number) => {
    if (v >= 8.5) return "var(--green)";
    if (v >= 7.5) return "var(--accent)";
    if (v >= 6.5) return "#fb923c";
    return "var(--red)";
  };

  return (
    <div className="container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: ".75rem" }}>横向对比矩阵</h1>
        <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6 }}>
          10 个 agent × 4 个维度的全景对比。颜色编码：绿 ≥ 8.5 优秀 · 橙 7.5–8.5 良好 · 浅红 &lt; 7.5 待改进。
        </p>
      </header>

      {/* Heatmap */}
      <div className="card" style={{ overflow: "auto", padding: 0 }}>
        <table className="ranking">
          <thead>
            <tr>
              <th style={{ minWidth: 200 }}>Agent</th>
              {dims.map((d) => (
                <th key={d.key} style={{ textAlign: "center" }}>{d.name}</th>
              ))}
              <th style={{ textAlign: "center" }}>总分</th>
              <th style={{ textAlign: "center" }}>耗时</th>
            </tr>
          </thead>
          <tbody>
            {data.results.map((a) => (
              <tr key={a.slug}>
                <td>
                  <Link href={`/agents/${a.slug}`} style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                    <span>{a.icon}</span>
                    <span>{a.name}</span>
                  </Link>
                </td>
                {dims.map((d) => {
                  const v = (a as unknown as Record<string, number>)[d.key];
                  return (
                    <td key={d.key} style={{ textAlign: "center" }}>
                      <span style={{ display: "inline-block", padding: ".25rem .55rem", borderRadius: 6, background: `${cellColor(v)}22`, color: cellColor(v), fontWeight: 600, minWidth: 48 }}>
                        {v.toFixed(1)}
                      </span>
                    </td>
                  );
                })}
                <td style={{ textAlign: "center", fontWeight: 700, color: "var(--accent)" }}>{a.total.toFixed(2)}</td>
                <td style={{ textAlign: "center" }} className="muted">{a.speed_sec}s</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* By dimension winners */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem" }}>各维度冠军</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
          {dims.map((d) => {
            const winner = [...data.results].sort(
              (x, y) => ((y as unknown as Record<string, number>)[d.key] ?? 0) - ((x as unknown as Record<string, number>)[d.key] ?? 0),
            )[0];
            const v = (winner as unknown as Record<string, number>)[d.key];
            return (
              <Link key={d.key} href={`/agents/${winner.slug}`} className="card" style={{ display: "block" }}>
                <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em" }}>{d.name}</div>
                <div style={{ display: "flex", alignItems: "center", gap: ".4rem", marginTop: ".4rem" }}>
                  <span style={{ fontSize: "1.6rem" }}>{winner.icon}</span>
                  <span style={{ fontWeight: 600 }}>{winner.name}</span>
                </div>
                <div style={{ marginTop: ".6rem", fontSize: "1.7rem", fontWeight: 800, color: "var(--accent)" }}>{v.toFixed(1)}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Category breakdown */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem" }}>类别分布</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          {(["research", "operations"] as const).map((cat) => {
            const subset = data.results.filter((a) => a.category === cat);
            const avg = subset.reduce((s, a) => s + a.total, 0) / subset.length;
            return (
              <div key={cat} className="card">
                <div className={cat === "research" ? "tag tag-research" : "tag tag-ops"}>
                  {cat === "research" ? "研究 / 覆盖" : "财务 / 运营"}
                </div>
                <div style={{ marginTop: ".75rem", fontSize: "2rem", fontWeight: 800, color: "var(--accent)" }}>
                  {avg.toFixed(2)}<span style={{ fontSize: ".85rem", color: "var(--text-muted)" }}> 均分</span>
                </div>
                <ul style={{ margin: ".75rem 0 0 1.2rem", lineHeight: 1.8, fontSize: ".9rem" }}>
                  {subset.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/agents/${a.slug}`}>{a.name}</Link>
                      <span className="muted" style={{ marginLeft: ".5rem" }}>{a.total.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
