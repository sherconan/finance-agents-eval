import Link from "next/link";
import { data } from "@/lib/data";

export default function ArtifactsPage() {
  const items = [...data.results].sort((a, b) => {
    // sort by artifact filename order (01- ... 10-)
    return a.artifact_path.localeCompare(b.artifact_path);
  });

  return (
    <div className="container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: ".75rem" }}>评测产出 Artifacts</h1>
        <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6 }}>
          10 份评测产出文档——每个 agent 用真实数据跑一遍标准化任务，全部可下载、可复现。
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
        {items.map((a) => (
          <Link key={a.slug} href={`/agents/${a.slug}`} className="card" style={{ display: "block" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".75rem" }}>
              <span style={{ fontSize: "1.6rem" }}>{a.icon}</span>
              <span style={{ fontWeight: 600 }}>{a.name}</span>
              <span style={{ marginLeft: "auto", fontSize: ".9rem", color: "var(--accent)", fontWeight: 700 }}>{a.total.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", gap: ".5rem", marginBottom: ".75rem" }}>
              <span className={a.category === "research" ? "tag tag-research" : "tag tag-ops"}>
                {a.category === "research" ? "研究 / 覆盖" : "财务 / 运营"}
              </span>
              <span className="tag" style={{ background: "rgba(148,163,184,.12)", color: "var(--text-muted)" }}>#{a.rank}</span>
            </div>
            <p className="muted" style={{ fontSize: ".88rem", lineHeight: 1.55, marginBottom: ".75rem" }}>{a.verdict}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: ".82rem" }}>
              <span className="muted">📄 {a.artifact_path.split("/").pop()}</span>
              <span style={{ color: "var(--accent)" }}>查看 →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
