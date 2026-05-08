import Link from "next/link";
import { data, getArtifact } from "@/lib/data";

function summary(md: string): { firstPara: string; testInput: string; sections: number } {
  const lines = md.split("\n");
  let firstPara = "";
  let testInput = "";
  let sections = 0;
  // count sections (## headings)
  for (const l of lines) {
    if (/^##\s+/.test(l)) sections++;
  }
  // first non-empty body line that's not a heading or frontmatter
  for (const l of lines) {
    if (l.startsWith("**Test")) {
      testInput = l.replace(/\*\*/g, "").replace(/^Test[^:]*:\s*/, "");
      continue;
    }
    if (
      l.trim() &&
      !l.startsWith("#") &&
      !l.startsWith("**") &&
      !l.startsWith("---") &&
      !l.startsWith(">") &&
      !l.startsWith("|")
    ) {
      firstPara = l.trim();
      if (firstPara.length > 50) break;
    }
  }
  if (!firstPara) {
    // fallback: scan for any meaningful line
    for (const l of lines) {
      if (l.startsWith("> ")) {
        firstPara = l.slice(2).trim();
        if (firstPara.length > 30) break;
      }
    }
  }
  return { firstPara: firstPara.slice(0, 240), testInput: testInput.slice(0, 180), sections };
}

export default function ArtifactsPage() {
  const items = [...data.results].sort((a, b) =>
    a.artifact_path.localeCompare(b.artifact_path),
  );

  return (
    <div className="container" style={{ paddingTop: "2.5rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <div className="tag" style={{ marginBottom: ".75rem" }}>真实评测产出</div>
        <h1 style={{ fontSize: "2.25rem", fontWeight: 800, marginBottom: ".75rem" }}>
          10 份 Artifact · 实测产出文档
        </h1>
        <p className="muted" style={{ maxWidth: 760, lineHeight: 1.6 }}>
          每个 agent 都跑了一个标准化任务，产出真实 markdown 文档。点卡片看完整版（在 agent 详情页内联渲染），或下载 .md 单文件 / 完整 bundle。
        </p>
        <div style={{ display: "flex", gap: ".75rem", marginTop: "1rem", flexWrap: "wrap" }}>
          <Link href="/downloads" className="btn">📦 一键下载 bundle.zip</Link>
          <Link href="/case" className="btn btn-outline">看 #1 案例叙事</Link>
        </div>
      </header>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {items.map((a) => {
          const fn = a.artifact_path.split("/").pop()!;
          const md = getArtifact(a.slug);
          const { firstPara, testInput, sections } = summary(md);
          return (
            <article key={a.slug} className="card" style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".75rem" }}>
                <span style={{ fontSize: "1.7rem" }}>{a.icon}</span>
                <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>{a.name}</span>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: ".95rem",
                    color: "var(--accent)",
                    fontWeight: 700,
                  }}
                >
                  #{a.rank} · {a.total.toFixed(2)}
                </span>
              </div>

              <div style={{ display: "flex", gap: ".4rem", marginBottom: ".75rem", flexWrap: "wrap" }}>
                <span className={a.category === "research" ? "tag tag-research" : "tag tag-ops"}>
                  {a.category === "research" ? "研究 / 覆盖" : "财务 / 运营"}
                </span>
                <span
                  className="tag"
                  style={{ background: "rgba(148,163,184,.12)", color: "var(--text-muted)" }}
                >
                  {sections} 段 · {(md.length / 1000).toFixed(1)}k 字
                </span>
              </div>

              {testInput && (
                <div
                  style={{
                    fontSize: ".82rem",
                    color: "var(--text-muted)",
                    marginBottom: ".75rem",
                    paddingLeft: ".6rem",
                    borderLeft: "2px solid var(--accent)",
                  }}
                >
                  <strong style={{ color: "var(--accent)" }}>测试任务：</strong>{testInput}
                </div>
              )}

              <p
                className="muted"
                style={{
                  fontSize: ".88rem",
                  lineHeight: 1.6,
                  marginBottom: ".75rem",
                  flex: 1,
                }}
              >
                {firstPara}…
              </p>

              <div
                style={{
                  display: "flex",
                  gap: ".5rem",
                  alignItems: "center",
                  fontSize: ".82rem",
                  marginTop: "auto",
                  paddingTop: ".75rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <Link href={`/agents/${a.slug}`} style={{ color: "var(--accent)", fontWeight: 500 }}>
                  看完整产出 →
                </Link>
                <span className="muted">·</span>
                <a
                  href={`/artifacts/${fn}`}
                  download
                  style={{ color: "var(--text-muted)" }}
                >
                  原始 .md
                </a>
                <span className="muted">·</span>
                <span
                  className="muted"
                  style={{ fontSize: ".75rem", fontFamily: "ui-monospace, monospace" }}
                >
                  {fn}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
