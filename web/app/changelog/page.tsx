import Link from "next/link";

const versions = [
  {
    v: "v6",
    sha: "67bc697",
    time: "2026-05-08 03:05 GMT+8",
    elapsed: "+1h 35min",
    title: "ROI 计算器 + 竞品对比矩阵",
    bullets: [
      "/roi 4 旋钮交互式计算器（rate/headcount/adoption/cost），5 个角色预设",
      "默认场景：年净 ROI ~$739k，倍数 48×",
      "/vs 5 个竞品（AlphaSense / Hebbia / ChatGPT / Bloomberg GPT / Anthropic）head-to-head + 6 场景决策矩阵",
      "Hero 区 4 个 secondary CTA，sitemap 18 entries",
    ],
  },
  {
    v: "v5",
    sha: "0aa9f01",
    time: "2026-05-08 02:34 GMT+8",
    elapsed: "+1h 4min",
    title: "交互式权重调节器 + 案例 + FAQ",
    bullets: [
      "首页 WeightTuner：4 个滑块 + 5 个预设 + 实时 ↑↓ delta-rank",
      "/case 深度叙事页：Valuation Reviewer 38s 时间线 + before/after 对照 + ↓73% 影响盒子",
      "/faq 8 个高频问答，含 install / 怎么调 / 局限性",
      "per-agent OG image：10 个 agent 各自 1200×630 socialcard",
      "真实数据校准：NVDA $213.04 / 茅台 ¥1371.05",
      "Earnings Reviewer 升至 #3",
    ],
  },
  {
    v: "v4",
    sha: "(deploy-only)",
    time: "2026-05-08 02:28 GMT+8",
    elapsed: "+58min",
    title: "Per-agent OG 修复",
    bullets: [
      "去掉 generateImageMetadata，让每页只生成自己的 og:image",
      "metadata 干净：每个 agent 详情页只指向自己的 1200×630 OG",
    ],
  },
  {
    v: "v3",
    sha: "(deploy-only)",
    time: "2026-05-08 02:21 GMT+8",
    elapsed: "+51min",
    title: "案例叙事页 + per-agent OG（首版）",
    bullets: [
      "/case 上线",
      "per-agent OG 路由（含 generateImageMetadata - 当时输出有重复，v4 修复）",
    ],
  },
  {
    v: "v2",
    sha: "(deploy-only)",
    time: "2026-05-08 01:57 GMT+8",
    elapsed: "+27min",
    title: "深度增强 + 移动端",
    bullets: [
      "首页加 适用场景适配度矩阵（8 场景 → agent 推荐）",
      "首页加 评测方法（精简版）卡片，导引到 /methodology",
      "/artifacts 总览页",
      "动态 OG image 路由（首页 + 通用）",
      "/sitemap.xml + /robots.txt",
      "Mobile 响应式：header 不再溢出，hide-on-mobile 类",
    ],
  },
  {
    v: "v1",
    sha: "5dbe097",
    time: "2026-05-08 01:50 GMT+8",
    elapsed: "+20min",
    title: "评测站骨架上线",
    bullets: [
      "10 个 agent 评测对象 + 5 维评分体系建立",
      "10 份 artifact markdown 文档（IB / 卖方 / PE / 审计 / 合规 / KYC）",
      "评分 JSON：evaluations/*.json + 聚合 results.json",
      "Next.js 16 App Router + Tailwind + Recharts 起站",
      "5 个核心页面：首页 / agent详情 / compare / artifacts / methodology",
      "Vercel 生产部署，curl 验证全 200",
    ],
  },
  {
    v: "v0",
    sha: "—",
    time: "2026-05-08 01:30 GMT+8",
    elapsed: "T0",
    title: "Sprint Kickoff",
    bullets: [
      "项目骨架 ~/finance-agents-eval 建立",
      "tasks.md 顶层设计：装→评→站→闭环",
      "inventory.json 10 agent 映射 + rubric.json 5 维细则",
      "确认 finance skills 内置于 Claude Code v2.1.132 二进制",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", maxWidth: 880 }}>
      <div className="tag" style={{ marginBottom: "1rem" }}>项目演化</div>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.01em", marginBottom: ".75rem" }}>
        7H Sprint <span className="gradient-text">Changelog</span>
      </h1>
      <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6, marginBottom: "2.5rem" }}>
        2026-05-08 01:30 → 08:30 GMT+8，单人 Claude P8 自管理 sprint 的完整演化轨迹。
        每个版本都对应一次生产部署。
      </p>

      <ol style={{ listStyle: "none", padding: 0, margin: 0, position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 11,
            top: 8,
            bottom: 8,
            width: 2,
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
        {versions.map((vv, idx) => (
          <li key={vv.v} style={{ position: "relative", paddingLeft: "3rem", paddingBottom: "1.5rem" }}>
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 8,
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: idx === 0 ? "var(--accent)" : "var(--bg-card)",
                border: `2px solid ${idx === 0 ? "var(--accent)" : "var(--border)"}`,
                boxShadow: idx === 0 ? "0 0 0 4px rgba(245,158,11,.2)" : "none",
              }}
            />
            <div className="card" style={{ padding: "1.25rem 1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".4rem", flexWrap: "wrap", gap: ".5rem" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: ".75rem" }}>
                  <span style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--accent)" }}>{vv.v}</span>
                  <span style={{ fontWeight: 600, fontSize: "1.05rem" }}>{vv.title}</span>
                </div>
                <div className="muted" style={{ fontSize: ".82rem", fontFamily: "ui-monospace, monospace" }}>
                  {vv.elapsed} · {vv.sha}
                </div>
              </div>
              <div className="muted" style={{ fontSize: ".82rem", marginBottom: ".75rem" }}>{vv.time}</div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.65, fontSize: ".92rem" }}>
                {vv.bullets.map((b, i) => (<li key={i}>{b}</li>))}
              </ul>
            </div>
          </li>
        ))}
      </ol>

      <section style={{ marginTop: "2rem", padding: "1.5rem", background: "linear-gradient(135deg, rgba(245,158,11,.08), rgba(59,130,246,.04))", border: "1px solid var(--border)", borderRadius: 16 }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: ".5rem", color: "var(--accent)" }}>📊 累计统计</h3>
        <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.7, fontSize: ".92rem" }}>
          <li>{versions.length} 次部署</li>
          <li>11+ 个路由 · 全 200 OK</li>
          <li>10 份 artifact · 18 个 sitemap entry</li>
          <li>4 个 Phase（A 数据 / B OG&Case / C Tuner&FAQ / D ROI&VS）</li>
        </ul>
      </section>

      <section style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/downloads" className="btn">下载全部产出 →</Link>
        <Link href="/" className="btn btn-outline">返回榜单</Link>
      </section>
    </div>
  );
}
