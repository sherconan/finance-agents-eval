import Link from "next/link";
import { data, getArtifact } from "@/lib/data";
import { mdToHtml } from "@/lib/markdown";

export function ArtifactShowcase() {
  // Showcase: pick the rank-1 agent's artifact as the "featured real eval output"
  const featured = data.results[0];
  const md = getArtifact(featured.slug);

  // Trim to first ~3 sections to keep home page readable
  const lines = md.split("\n");
  const cutIdx = (() => {
    let h = 0;
    for (let i = 0; i < lines.length; i++) {
      if (/^##\s+/.test(lines[i])) h++;
      if (h >= 4) return i; // first 3 ## sections
    }
    return Math.min(lines.length, 80);
  })();
  const excerpt = lines.slice(0, cutIdx).join("\n");
  const html = mdToHtml(excerpt);

  return (
    <section style={{ marginBottom: "3rem" }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          marginBottom: ".5rem",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>
          📄 实测产出预览（榜首 agent · {featured.name}）
        </h2>
        <span className="tag" style={{ background: "rgba(245,158,11,.15)" }}>
          看真实 artifact
        </span>
      </div>
      <p className="muted" style={{ marginBottom: "1.25rem", maxWidth: 780, lineHeight: 1.6 }}>
        每个 agent 都跑了真实任务，产出真实 markdown 报告——这里是榜首
        <strong style={{ color: "var(--accent)" }}> {featured.name} </strong>
        的产出节选（前 3 个 section）。完整版进详情页看，或在 <Link href="/artifacts">/artifacts</Link> 一键下载所有 10 份。
      </p>

      <article
        className="card prose-art"
        style={{
          padding: "1.75rem 2rem",
          maxHeight: 560,
          overflow: "hidden",
          position: "relative",
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <div
        style={{
          marginTop: "-3rem",
          height: "3rem",
          background: "linear-gradient(to bottom, transparent, var(--bg))",
          position: "relative",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", gap: ".75rem", marginTop: ".5rem", flexWrap: "wrap" }}>
        <Link href={`/agents/${featured.slug}`} className="btn">
          看 {featured.name} 完整产出 →
        </Link>
        <Link href="/artifacts" className="btn btn-outline">
          浏览全部 10 份 artifact
        </Link>
        <Link href="/downloads" className="btn btn-outline">
          一键下载 bundle.zip
        </Link>
      </div>
    </section>
  );
}
