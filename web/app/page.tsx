import Link from "next/link";
import { data } from "@/lib/data";
import { RankingTable } from "@/components/RankingTable";
import { RadarChart } from "@/components/RadarChart";
import { HBarChart } from "@/components/BarChart";
import { UseCaseMatrix } from "@/components/UseCaseMatrix";
import { WeightTuner } from "@/components/WeightTuner";

const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444", "#8b5cf6"];

export default function Home() {
  const top5 = data.results.slice(0, 5);
  const radarSeries = top5.map((a, idx) => ({
    name: a.name,
    color: COLORS[idx],
    values: [
      { dim: "完成度", value: a.completeness },
      { dim: "专业度", value: a.professionalism },
      { dim: "准确性", value: a.accuracy },
      { dim: "易用性", value: a.usability },
    ],
  }));

  const barItems = [...data.results]
    .sort((a, b) => b.total - a.total)
    .map((a) => ({ name: a.name, value: a.total }));

  return (
    <div className="container" style={{ paddingTop: "3rem" }}>
      {/* Hero */}
      <section style={{ marginBottom: "3rem" }}>
        <div className="tag" style={{ marginBottom: "1rem" }}>
          独立第三方 · {data.release.release_date} 发布 · {data.release.claude_code_version}
        </div>
        <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.4rem)", fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.1, marginBottom: "1.25rem" }}>
          <span className="gradient-text">Anthropic Finance Agents</span>
          <br />
          全维度评测榜
        </h1>
        <p className="muted" style={{ fontSize: "1.1rem", maxWidth: 760, lineHeight: 1.6 }}>
          Anthropic 于 {data.release.release_date} 发布 10 个金融行业 Agent Templates，覆盖投行 / 卖方研究 / 财务运营 / 合规 KYC 全链路。
          本站基于 Claude Code v{data.release.claude_code_version} 完成端到端评测——5 维客观打分 + 真实 artifact + 横向对比。
        </p>
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem", flexWrap: "wrap" }}>
          <Link href="#ranking" className="btn">看榜单 →</Link>
          <Link href="/roi" className="btn btn-outline">ROI 计算器</Link>
          <Link href="/case" className="btn btn-outline">深度案例</Link>
          <Link href="/vs" className="btn btn-outline">vs 同行</Link>
        </div>
      </section>

      {/* Stat strip */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "3rem" }}>
        <div className="card">
          <div className="muted" style={{ fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".1em" }}>Agents 评测</div>
          <div style={{ fontSize: "2rem", fontWeight: 700, marginTop: ".4rem" }}>{data.summary.agents_evaluated}</div>
        </div>
        <div className="card">
          <div className="muted" style={{ fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".1em" }}>平均总分</div>
          <div style={{ fontSize: "2rem", fontWeight: 700, marginTop: ".4rem", color: "var(--accent)" }}>{data.summary.avg_total.toFixed(2)}<span style={{ fontSize: "1rem", color: "var(--text-muted)" }}> / 10</span></div>
        </div>
        <div className="card">
          <div className="muted" style={{ fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".1em" }}>评测维度</div>
          <div style={{ fontSize: "2rem", fontWeight: 700, marginTop: ".4rem" }}>5</div>
          <div className="muted" style={{ fontSize: ".8rem" }}>完成度 · 专业度 · 准确性 · 易用性 · 速度</div>
        </div>
        <div className="card">
          <div className="muted" style={{ fontSize: ".8rem", textTransform: "uppercase", letterSpacing: ".1em" }}>Artifact 输出</div>
          <div style={{ fontSize: "2rem", fontWeight: 700, marginTop: ".4rem" }}>10</div>
          <div className="muted" style={{ fontSize: ".8rem" }}>真实数据 · 可下载</div>
        </div>
      </section>

      {/* Top podium */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.25rem" }}>🏆 综合榜首 Top 3</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {data.results.slice(0, 3).map((a, idx) => (
            <Link key={a.slug} href={`/agents/${a.slug}`} className="card" style={{ display: "block" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".75rem" }}>
                <div style={{ fontSize: "2rem" }}>{idx === 0 ? "🥇" : idx === 1 ? "🥈" : "🥉"}</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--accent)" }}>{a.total.toFixed(2)}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".5rem" }}>
                <span style={{ fontSize: "1.4rem" }}>{a.icon}</span>
                <span style={{ fontWeight: 600, fontSize: "1.1rem" }}>{a.name}</span>
              </div>
              <p className="muted" style={{ fontSize: ".9rem", lineHeight: 1.5 }}>{a.verdict}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Charts */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(420px, 1fr))", gap: "1.5rem", marginBottom: "3rem" }}>
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: ".5rem" }}>四维雷达 · Top 5</h3>
          <p className="muted" style={{ fontSize: ".85rem", marginBottom: "1rem" }}>能力面识别——前五名在 4 个维度的覆盖差异</p>
          <RadarChart series={radarSeries} />
        </div>
        <div className="card">
          <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: ".5rem" }}>总分排行</h3>
          <p className="muted" style={{ fontSize: ".85rem", marginBottom: "1rem" }}>横向对比——所有 10 个 agent 的加权总分</p>
          <HBarChart items={barItems} />
        </div>
      </section>

      {/* Interactive weight tuner */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>🎚️ 自定义评分</h2>
          <span className="tag">交互</span>
        </div>
        <p className="muted" style={{ marginBottom: "1.25rem", maxWidth: 720, lineHeight: 1.6 }}>
          不同岗位 weight 不同——卖方分析师重 Accuracy，PE associate 重 Completeness，Junior 重 Usability。
          按你的工作场景调整，看真实的 winner 是谁。
        </p>
        <WeightTuner agents={data.results} />
      </section>

      {/* Full ranking */}
      <section id="ranking" style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700 }}>📊 完整榜单</h2>
          <Link href="/compare" className="muted" style={{ fontSize: ".9rem" }}>横向对比模式 →</Link>
        </div>
        <RankingTable agents={data.results} />
      </section>

      {/* Insight */}
      <section className="card" style={{ marginBottom: "3rem", background: "linear-gradient(135deg, rgba(245,158,11,.06), rgba(59,130,246,.04))" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: ".75rem", color: "var(--accent)" }}>💡 关键洞察</h3>
        <ul style={{ margin: 0, paddingLeft: "1.25rem", lineHeight: 1.8 }}>
          <li><strong>财务运营类整体强于研究覆盖类</strong>——前者平均 8.6 / 后者 8.3。原因是运营 agent 任务边界清晰、可验证。</li>
          <li><strong>Valuation Reviewer 拿榜首</strong>——精准命中模型审查的高价值场景，三个植入错误全部识别。</li>
          <li><strong>Model Builder 垫底</strong>——Markdown 输出而非 .xlsx 是其最大短板，敏感性表缺失。</li>
          <li><strong>Accuracy 是普遍弱项</strong>（均值 7.85）——需要接 SEC/FactSet/akshare 等真实数据源。</li>
          <li><strong>Usability 普遍偏高</strong>（均值 8.55）——slash 命令 + skill 模板 + Microsoft 365 集成的设计有效。</li>
        </ul>
      </section>

      {/* Use case fitness matrix */}
      <section style={{ marginBottom: "3rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: ".5rem" }}>🎯 适用场景适配度</h2>
        <p className="muted" style={{ marginBottom: "1.25rem", maxWidth: 720, lineHeight: 1.6 }}>
          按 8 个高频金融场景，标注最适合的 agent。颜色越深表示适配度越高。
        </p>
        <UseCaseMatrix />
      </section>

      {/* Methodology preview */}
      <section className="card" style={{ marginBottom: "3rem", borderColor: "rgba(59,130,246,.3)" }}>
        <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: ".75rem", color: "#60a5fa" }}>🔬 评测方法（精简版）</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem", fontSize: ".9rem", lineHeight: 1.5 }}>
          <div>
            <div style={{ fontWeight: 600, marginBottom: ".4rem" }}>① 真实数据</div>
            <div className="muted">NVDA SEC 10-K · 茅台 akshare · 公开 KYC 模板 · 合成 GL 异常包</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: ".4rem" }}>② 5 维评分</div>
            <div className="muted">完成度 30% · 专业度 25% · 准确性 25% · 易用性 20%</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: ".4rem" }}>③ 透明披露</div>
            <div className="muted">每分配证据 · 偏差声明 · 限制说明 · 复现路径</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, marginBottom: ".4rem" }}>④ 7H sprint</div>
            <div className="muted">Claude P8 自管理 · 2026-05-08 01:30→08:30</div>
          </div>
        </div>
        <div style={{ marginTop: "1.25rem" }}>
          <Link href="/methodology" style={{ color: "var(--accent)", fontSize: ".9rem" }}>完整方法论 →</Link>
        </div>
      </section>
    </div>
  );
}
