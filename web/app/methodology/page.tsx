import { data } from "@/lib/data";
import Link from "next/link";

export default function MethodologyPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", maxWidth: 880 }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: ".75rem" }}>评测方法论</h1>
      <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6, marginBottom: "2rem" }}>
        透明、可复现、产品级。每一项打分都有证据。
      </p>

      <div className="prose-art">
        <h2>① 评测对象</h2>
        <p>
          Anthropic 于 <strong>{data.release.release_date}</strong> 发布的 10 个金融行业 Agent Templates，覆盖：
        </p>
        <ul>
          <li><strong>研究 & 客户覆盖</strong>：Pitch builder, Meeting preparer, Earnings reviewer, Model builder, Market researcher</li>
          <li><strong>财务 & 运营</strong>：Valuation reviewer, GL reconciler, Month-end closer, Statement auditor, KYC screener</li>
        </ul>
        <p>
          官方公告：
          <a href={data.release.source_url} target="_blank" rel="noopener">{data.release.source_url}</a>
        </p>

        <h2>② 工程现实</h2>
        <p>
          这 10 个 agent 在 <strong>Claude Code v{data.release.claude_code_version}</strong> 中作为运行时内置 skill 套件出货。本机扫描确认它们打包于二进制
          <code>~/.local/share/claude/versions/{data.release.claude_code_version}</code>，通过系统 prompt 的 skill registry 注入命名空间
          （<code>investment-banking:*</code>, <code>equity-research:*</code>, <code>financial-analysis:*</code>,
          <code>private-equity:*</code>, <code>wealth-management:*</code>, <code>lseg:*</code>, <code>sp-global:*</code>），
          用户通过 <code>/&lt;namespace&gt;:&lt;skill&gt;</code> 在交互式会话中调用。
        </p>

        <h2>③ 边界与诚实声明</h2>
        <blockquote>
          子 agent 无法直接触发 slash 命令——本评测是 capability-equivalent 评测，不是 invocation-trace 评测。
        </blockquote>
        <p>实际执行步骤：</p>
        <ol>
          <li><strong>读取 skill 元数据</strong>——从 system prompt 注入的 skill registry 提取 description、命名空间、文档锚点</li>
          <li><strong>真实数据准备</strong>——SEC EDGAR 公开 10-K（NVDA）、akshare（茅台 600519）、公开 KYC 模板</li>
          <li><strong>重现 agent 任务</strong>——用 Claude 完整工具集（Read/Write/数据处理/网络抓取）跑同等任务</li>
          <li><strong>产出可比 artifact</strong>——Markdown 报告 / Excel 模型 / 结构化 JSON</li>
          <li><strong>5 维打分</strong>——按 rubric 评分，每项配证据</li>
          <li><strong>对比 Anthropic 文档</strong>——与官方 finance-agents 描述的预期能力对照</li>
        </ol>

        <h2>④ 5 维评分体系</h2>
        <table>
          <thead>
            <tr><th>维度</th><th>权重</th><th>说明</th></tr>
          </thead>
          <tbody>
            <tr><td>完成度 Completeness</td><td>30%</td><td>覆盖 sub-task 比例</td></tr>
            <tr><td>专业度 Professionalism</td><td>25%</td><td>是否达到一线投行/审计/PE 内部产物水准</td></tr>
            <tr><td>准确性 Accuracy</td><td>25%</td><td>数字可追溯到原始 filing；无幻觉</td></tr>
            <tr><td>易用性 Usability</td><td>20%</td><td>Prompt 友好度、上手成本</td></tr>
            <tr><td>速度 Speed</td><td>不进总分</td><td>单列展示</td></tr>
          </tbody>
        </table>

        <p>加权公式：</p>
        <pre><code>Total = 0.30 × Completeness
      + 0.25 × Professionalism
      + 0.25 × Accuracy
      + 0.20 × Usability</code></pre>

        <h2>⑤ 评分锚点</h2>
        <table>
          <thead>
            <tr><th>分数</th><th>含义</th></tr>
          </thead>
          <tbody>
            <tr><td>9-10</td><td>一线投行/审计/PE 内部产物水准</td></tr>
            <tr><td>7-8</td><td>可直接交付小型项目</td></tr>
            <tr><td>5-6</td><td>需 1-2 轮人工修订</td></tr>
            <tr><td>3-4</td><td>半成品，方向对</td></tr>
            <tr><td>0-2</td><td>不可用 / 严重幻觉</td></tr>
          </tbody>
        </table>

        <h2>⑥ 偏差与限制</h2>
        <ul>
          <li><strong>single-evaluator bias</strong>：一人打分，无 peer review</li>
          <li><strong>synthetic data limitation</strong>：6 / 10 agent 用了合成数据集，复杂度低于实战</li>
          <li><strong>no human SME validation</strong>：未邀请实际 banker / auditor / PE 复核</li>
          <li><strong>time pressure</strong>：7h sprint，单 agent 平均 25 分钟评测窗口</li>
        </ul>

        <h2>⑦ 评测时间窗</h2>
        <p>2026-05-08 01:30 → 08:30 GMT+8 · 7-hour autonomous sprint by Claude P8</p>

        <h2>⑧ 免责</h2>
        <p>本评测为独立第三方评估，与 Anthropic 无关。所有 artifact 仅作演示，<strong>不构成投资建议</strong>。</p>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <Link href="/" className="btn btn-outline">← 返回榜单</Link>
      </div>
    </div>
  );
}
