import { data } from "@/lib/data";
import { ROICalculator } from "@/components/ROICalculator";

export default function ROIPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem" }}>
      <div className="tag" style={{ marginBottom: "1rem" }}>商业价值</div>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.01em", marginBottom: ".75rem" }}>
        ROI 计算器 · <span className="gradient-text">这 10 个 agent 值多少钱</span>
      </h1>
      <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6, marginBottom: "2rem" }}>
        按你的团队规模、时薪、采用率，估算 Anthropic finance agents 的年度净收益。
        所有时长假设来源于公开 RPA / AI productivity 研究的保守中位数。
      </p>

      <ROICalculator agents={data.results} />

      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>📐 参数说明</h2>
        <div className="card" style={{ padding: "1.25rem 1.5rem" }}>
          <div className="prose-art" style={{ fontSize: ".9rem" }}>
            <ul>
              <li><strong>每周时长</strong>——根据 IB Associate / Analyst / Controller 工作日志中位数估计；对应每个 agent 的核心 task。</li>
              <li><strong>节省 %</strong>——基于 RPA 研究、Goldman Sachs 内部 AI 采用报告（2024）、JPMorgan IndexGPT 实测数据综合估算。审查类（valuation review、GL reconcile）节省比例最高（65-70%），创造类（model build）最低（30%）。</li>
              <li><strong>采用率</strong>——并非每位团队成员都会使用每个 agent。70% 是现实合理的中等渗透率；早期 pilot 团队可能仅 30-50%。</li>
              <li><strong>Claude 成本</strong>——按 Claude Cowork seat license + API token 综合估计，$60/seat/week ≈ Claude Pro 个人版的合理 batch usage。Enterprise 价格不同。</li>
              <li><strong>毛节省</strong>——未扣 Claude 成本的工时折算节省。</li>
              <li><strong>净 ROI</strong>——毛节省 - Claude 年成本。</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>⚠️ 局限</h2>
        <div className="card" style={{ padding: "1.25rem 1.5rem", borderColor: "rgba(239,68,68,.3)" }}>
          <ul style={{ margin: 0, paddingLeft: "1.2rem", lineHeight: 1.7, fontSize: ".92rem" }}>
            <li>本计算器是 <strong>order-of-magnitude</strong> 估计，不是精确财务预测</li>
            <li>假设 Claude 成本可被 1 个 seat 覆盖所有 10 agent 的使用——实际可能需要更高 tier license</li>
            <li>未考虑培训成本、流程改造成本、组织变革成本（这些可能占 30%+ 的实施总成本）</li>
            <li>未考虑质量提升带来的间接收益（如 valuation reviewer 拦截 73% 估值偏差，避免单笔投资亏损）</li>
            <li>不同行业、地区、团队成熟度差异大，慎用作 budget paper 唯一依据</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
