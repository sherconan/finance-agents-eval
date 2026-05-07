import Link from "next/link";
import { data } from "@/lib/data";

export default function DownloadsPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", maxWidth: 980 }}>
      <div className="tag" style={{ marginBottom: "1rem" }}>可下载交付物</div>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.01em", marginBottom: ".75rem" }}>
        Downloads
      </h1>
      <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6, marginBottom: "2.5rem" }}>
        所有评测产出物开放下载。Bundle 含 10 份 artifact + 评分 JSON + 方法论 + 复盘 + 真实数据快照。
      </p>

      {/* Hero bundle */}
      <div
        className="card"
        style={{
          marginBottom: "2.5rem",
          padding: "2rem",
          background:
            "linear-gradient(135deg, rgba(245,158,11,.1) 0%, rgba(59,130,246,.05) 50%, rgba(16,185,129,.05) 100%)",
          borderColor: "var(--accent)",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 320px" }}>
          <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em" }}>一键下载</div>
          <div style={{ fontSize: "1.6rem", fontWeight: 800, marginTop: ".4rem", marginBottom: ".5rem" }}>
            完整 Bundle (.zip)
          </div>
          <p className="muted" style={{ lineHeight: 1.6, marginBottom: "1rem", fontSize: ".95rem" }}>
            10 份 markdown artifact + 10 份 evaluation JSON + inventory.json + rubric.json
            + METHODOLOGY.md + RETROSPECTIVE.md + realdata-snapshot.json
          </p>
          <div className="muted" style={{ fontSize: ".82rem", fontFamily: "ui-monospace, monospace" }}>
            ~36 KB compressed · 25 files
          </div>
        </div>
        <a
          href="/downloads/finance-agents-eval-bundle.zip"
          className="btn"
          style={{ fontSize: "1rem", padding: ".8rem 1.5rem" }}
          download
        >
          ⬇ 下载 zip
        </a>
      </div>

      {/* Categorized downloads */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>📄 单文件下载</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "1rem" }}>
          {/* Artifacts */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,.02)" }}>
              <div style={{ fontWeight: 600 }}>📝 Artifact 文档（10 份）</div>
              <div className="muted" style={{ fontSize: ".82rem" }}>每个 agent 的真实评测产出</div>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {[...data.results]
                .sort((a, b) => a.artifact_path.localeCompare(b.artifact_path))
                .map((a) => {
                  const fn = a.artifact_path.split("/").pop()!;
                  return (
                    <li key={a.slug}>
                      <a
                        href={`/artifacts/${fn}`}
                        download
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: ".7rem 1.25rem",
                          borderTop: "1px solid var(--border)",
                          fontSize: ".9rem",
                        }}
                      >
                        <span style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
                          <span>{a.icon}</span>
                          <span style={{ fontWeight: 500 }}>{a.name}</span>
                        </span>
                        <span className="muted" style={{ fontSize: ".75rem", fontFamily: "ui-monospace, monospace" }}>{fn}</span>
                      </a>
                    </li>
                  );
                })}
            </ul>
          </div>

          {/* Data */}
          <div className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,.02)" }}>
              <div style={{ fontWeight: 600 }}>📊 数据 JSON</div>
              <div className="muted" style={{ fontSize: ".82rem" }}>结构化评测数据，可机器读</div>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              <DLItem href="/downloads/results.json" name="results.json" hint="聚合评分 + ranking" />
              <DLItem href="/downloads/finance-agents-eval-bundle.zip" name="bundle.zip" hint="完整打包" />
            </ul>
            <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid var(--border)", fontSize: ".82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
              <strong style={{ color: "var(--text)" }}>JSON schema 概览：</strong> 顶层 <code>results[]</code>，每个 agent 含
              <code>completeness/professionalism/accuracy/usability</code> (0–10) +
              <code>total</code> (加权) + <code>strengths/weaknesses/verdict/best_for</code> 文本字段。
            </div>
          </div>
        </div>
      </section>

      {/* Use guide */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>🛠️ 怎么用这些数据</h2>
        <div className="card" style={{ padding: "1.5rem" }}>
          <div className="prose-art" style={{ fontSize: ".92rem" }}>
            <h3>① 给团队 share</h3>
            <p>下载 zip 后，把 RETROSPECTIVE.md 和 evaluations/*.json 贴给老板/同事。包含完整的评测过程和决策日志。</p>

            <h3>② 自己 reproduce</h3>
            <p>用 results.json 做 baseline，按你的实际场景跑一遍同样 task，对照差异点反馈给我们。</p>

            <h3>③ 接入你的 dashboard</h3>
            <p>JSON 是结构化的——可以直接喂入 Power BI / Tableau / Notion / Airtable，做你自己团队的 internal AI tooling matrix。</p>

            <pre><code>{`# Python 示例：算各 agent 平均分
import json
data = json.load(open("results.json"))
agents = data["results"]
avg = sum(a["total"] for a in agents) / len(agents)
print(f"平均总分: {avg:.2f}")`}</code></pre>

            <h3>④ 打分自定义</h3>
            <p>修改 <code>rubric.json</code> 的权重，把 results.json 重算一遍，得到符合你团队偏好的 ranking。
            首页的 <Link href="/">Weight Tuner</Link> 实现的就是这个逻辑——可以照搬。</p>
          </div>
        </div>
      </section>

      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/" className="btn btn-outline">返回榜单</Link>
        <Link href="/changelog" className="btn btn-outline">看 sprint 演化</Link>
      </section>
    </div>
  );
}

function DLItem({ href, name, hint }: { href: string; name: string; hint: string }) {
  return (
    <li>
      <a
        href={href}
        download
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: ".7rem 1.25rem",
          borderTop: "1px solid var(--border)",
          fontSize: ".9rem",
        }}
      >
        <span style={{ fontFamily: "ui-monospace, monospace" }}>{name}</span>
        <span className="muted" style={{ fontSize: ".82rem" }}>{hint}</span>
      </a>
    </li>
  );
}
