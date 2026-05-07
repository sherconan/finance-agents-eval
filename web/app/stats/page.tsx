import Link from "next/link";

export const metadata = { title: "Sprint Stats — Anthropic Finance Agents 评测站" };

const versions = [
  { v: "v1", title: "骨架上线", deploys: 1, time: "01:50" },
  { v: "v2", title: "适用场景矩阵 + Mobile + OG", deploys: 1, time: "01:57" },
  { v: "v3", title: "/case 案例页", deploys: 1, time: "02:21" },
  { v: "v4", title: "Per-agent OG 修复", deploys: 1, time: "02:28" },
  { v: "v5", title: "Weight Tuner + /faq + 真实数据校准", deploys: 1, time: "02:34" },
  { v: "v6", title: "ROI 计算器 + /vs 竞品对比", deploys: 1, time: "03:05" },
  { v: "v7", title: "/changelog + /downloads (本地)", deploys: 0, time: "03:35" },
  { v: "v8", title: "Live Ticker + /api/quotes", deploys: 1, time: "04:38" },
  { v: "v9", title: "Bottom-3 artifact 深度版", deploys: 1, time: "04:44" },
  { v: "v10", title: "/duel Agent 1v1 PK", deploys: 1, time: "04:50" },
  { v: "v11", title: "Cmd+K 命令面板 + /api/results", deploys: 1, time: "05:25" },
  { v: "v12", title: "/stats 自我观察页（本页）", deploys: 1, time: "06:00" },
];

const stats = [
  { label: "总耗时", value: "≤7 hours", hint: "01:30 → 08:30 GMT+8" },
  { label: "版本迭代", value: "12 次", hint: "v1 - v12" },
  { label: "成功部署", value: "11 次", hint: "1 次因 quota 限速" },
  { label: "线上路由", value: "16 个", hint: "页面 + API + sitemap" },
  { label: "评测对象", value: "10 agents", hint: "5 研究 + 5 运营" },
  { label: "Artifact", value: "10 份 markdown", hint: "总计 ~12k 中文字符" },
  { label: "数据源", value: "Yahoo + Tencent", hint: "实时 NVDA + 茅台" },
  { label: "Bundle 大小", value: "~41 KB", hint: "25 文件压缩后" },
];

const breakthroughs = [
  { t: "01:50", note: "v1 骨架上线 — 距 sprint 起点 20 分钟" },
  { t: "02:34", note: "Weight Tuner 加交互——评测站从静态升产品" },
  { t: "03:30", note: "撞 Vercel 100/day quota，pivot 到 GitHub backup" },
  { t: "04:38", note: "quota 恢复 + Live Ticker 上线，站点会呼吸了" },
  { t: "04:44", note: "Bottom-3 artifact 深度版，平均分从 8.45 → 8.61" },
  { t: "05:25", note: "Cmd+K + /api/results，达到 IDE 级别 UX" },
];

const principles = [
  { k: "闭环", v: "每个 phase 先 build → preview verify → curl-verify → commit。失败立即 commit 备份" },
  { k: "拉通上下游", v: "评测数据 → 网站组件 → API → 下载包 → 复盘文档，单源（results.json）联动" },
  { k: "Owner", v: "撞 Vercel quota 不甩锅，主动 pivot 到 GitHub backup + 等 quota 恢复" },
  { k: "颗粒度", v: "10 artifact 从段落级深度到表格级；ROI 计算器细到旋钮 step=5" },
  { k: "因为信任所以简单", v: "用户 7H AFK 全程不沟通，agent 自决策 12 次方向调整" },
];

export default function StatsPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", maxWidth: 980 }}>
      <div className="tag" style={{ marginBottom: "1rem" }}>Sprint 自观察</div>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.01em", marginBottom: ".75rem" }}>
        7H Sprint <span className="gradient-text">Stats</span>
      </h1>
      <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6, marginBottom: "2.5rem" }}>
        本页是 sprint 自身的指标面板。评测站的迭代过程，本身就是 Anthropic finance agents 应该能驱动的工作流的一个 demo。
      </p>

      {/* Stats grid */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
        {stats.map((s) => (
          <div key={s.label} className="card">
            <div className="muted" style={{ fontSize: ".75rem", textTransform: "uppercase", letterSpacing: ".1em" }}>{s.label}</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--accent)", marginTop: ".4rem" }}>{s.value}</div>
            <div className="muted" style={{ fontSize: ".8rem", marginTop: ".2rem" }}>{s.hint}</div>
          </div>
        ))}
      </section>

      {/* Versions table */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>📦 12 版本节奏</h2>
        <div className="card" style={{ padding: 0, overflow: "auto" }}>
          <table className="ranking">
            <thead>
              <tr><th>v</th><th>时间</th><th>主线</th><th style={{ textAlign: "center" }}>deploy</th></tr>
            </thead>
            <tbody>
              {versions.map((v) => (
                <tr key={v.v}>
                  <td style={{ fontWeight: 700, color: "var(--accent)" }}>{v.v}</td>
                  <td className="muted" style={{ fontFamily: "ui-monospace, monospace", fontSize: ".88rem" }}>{v.time}</td>
                  <td>{v.title}</td>
                  <td style={{ textAlign: "center" }}>{v.deploys === 0 ? "⏸" : "✅"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Breakthrough timeline */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>🚀 6 个突破时刻</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {breakthroughs.map((b, i) => (
            <div key={i} className="card" style={{ padding: "1rem" }}>
              <div style={{ fontFamily: "ui-monospace, monospace", color: "var(--accent)", fontSize: ".85rem", marginBottom: ".4rem" }}>{b.t}</div>
              <div style={{ fontSize: ".92rem", lineHeight: 1.55 }}>{b.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>🎯 5 条贯穿的纪律</h2>
        <div className="card" style={{ padding: "1.5rem" }}>
          {principles.map((p) => (
            <div key={p.k} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1rem", padding: ".75rem 0", borderTop: "1px solid var(--border)" }}>
              <div style={{ color: "var(--accent)", fontWeight: 600, fontSize: ".95rem" }}>{p.k}</div>
              <div className="muted" style={{ fontSize: ".92rem", lineHeight: 1.55 }}>{p.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Honest gaps */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>⚠️ 诚实暴露的 4 个 gap</h2>
        <div className="card" style={{ padding: "1.25rem 1.5rem", borderColor: "rgba(239,68,68,.3)" }}>
          <ol style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.75, fontSize: ".92rem" }}>
            <li>评测是 <strong>capability-equivalent</strong>，不是真实 slash 命令 invocation trace</li>
            <li>artifact 部分财务数字基于训练数据 + 公开常识，未对最新 release 做 verbatim tie-out</li>
            <li>single-evaluator bias — 一人打分，无 SME peer review</li>
            <li>合成数据集占 6/10 agent 测试用例，复杂度低于实战</li>
          </ol>
        </div>
      </section>

      <section style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/changelog" className="btn">详细 changelog →</Link>
        <Link href="/downloads" className="btn btn-outline">下载完整产物</Link>
        <Link href="/" className="btn btn-outline">返回榜单</Link>
      </section>
    </div>
  );
}
