import Link from "next/link";

const faqs: { q: string; a: React.ReactNode }[] = [
  {
    q: "Anthropic 这 10 个 finance agent 怎么装？",
    a: (
      <>
        <p>截至 2026-05-08，这 10 个 agent 以 <strong>运行时内置 skill 套件</strong>形式打包在 Claude Code v2.1.132 二进制中。
        升级 Claude Code 到该版本后，无需独立安装步骤即可使用。</p>
        <pre><code>{`# 升级 Claude Code
brew upgrade claude-code  # 或对应包管理器

# 验证版本
claude --version
# 输出: 2.1.132 (Claude Code) 或更新`}</code></pre>
        <p>命名空间：<code>investment-banking:*</code>, <code>equity-research:*</code>, <code>financial-analysis:*</code>,
        <code>private-equity:*</code>, <code>wealth-management:*</code>, <code>lseg:*</code>, <code>sp-global:*</code>。</p>
      </>
    ),
  },
  {
    q: "怎么调用？",
    a: (
      <>
        <p>在 Claude Code 交互式会话里输入 <code>/&lt;namespace&gt;:&lt;skill&gt;</code>，例如：</p>
        <pre><code>{`/financial-analysis:dcf-model
/equity-research:earnings
/investment-banking:pitch-deck
/private-equity:ic-memo
/wealth-management:rebalance`}</code></pre>
        <p>Claude 会引导你提供需要的输入（公司代码、文件、参数），并直接产出 .pptx / .xlsx / .docx / .md。</p>
      </>
    ),
  },
  {
    q: "需要付费的 connector 吗？",
    a: (
      <>
        <p>核心 skill 内置在 Claude Code 中，<strong>不需要额外付费</strong>。但部分 agent 通过 connector 接入第三方数据源（FactSet / Bloomberg / S&amp;P / LSEG），如果使用这些数据源，需要相应授权。</p>
        <p>对独立用户：先用免费数据源（SEC EDGAR、akshare、Yahoo Finance）验证 workflow，再考虑付费接入。</p>
      </>
    ),
  },
  {
    q: "和 Claude Cowork 是什么关系？",
    a: (
      <>
        <p>同一套 agent 模板有 3 种部署形态：</p>
        <ul>
          <li><strong>Claude Code plugin</strong>——开发者本地终端，本评测的载体</li>
          <li><strong>Claude Cowork plugin</strong>——办公协作场景，集成到 Microsoft 365 加载项</li>
          <li><strong>Managed Agents cookbook</strong>——产品化集成场景的 API + 范例代码</li>
        </ul>
        <p>三个共享同样的核心能力，差别在 UI/集成入口。</p>
      </>
    ),
  },
  {
    q: "评测分数会更新吗？",
    a: (
      <>
        <p>是的。这版评测对应 Claude Code v2.1.132（首发版本）。后续 Anthropic 必然会迭代 agent 能力——比如接更多 connector、加新 sub-agent、扩 prompt 模板。</p>
        <p>本评测每个 agent 详情页有 <code>evaluated_at</code> 字段，配合 <Link href="/methodology">方法论页</Link> 的复现指南，
        新版本出来时可以重新跑一遍打分。</p>
      </>
    ),
  },
  {
    q: "我可以贡献评测数据吗？",
    a: (
      <>
        <p>本评测是单一 evaluator（Claude P8 自评）的 7H sprint 产物，已透明披露 single-evaluator bias。</p>
        <p>如果你是真实 banker / auditor / PE 从业者，欢迎独立跑一遍同样的 rubric，对照本站打分。
        差异点正是改进 agent 能力最有价值的信号。</p>
      </>
    ),
  },
  {
    q: "为什么 KYC Screener 在本机 skill 列表里看不到？",
    a: (
      <>
        <p>本机 skill 套件（<code>investment-banking:*</code>, <code>financial-analysis:*</code> 等）覆盖 9/10 个 agent 的核心能力。
        KYC screener 在 Anthropic 官方 finance-agents plugin 中作为独立 agent 模板出货，
        本机 skill 套件没有单独暴露 KYC 命名空间。</p>
        <p>如需 KYC：装独立的 finance-agents plugin（参考 Anthropic 官方公告链接）。</p>
      </>
    ),
  },
  {
    q: "本评测在哪些场景下不可信？",
    a: (
      <>
        <ul>
          <li><strong>真实 invocation 测试</strong>——本评测是 capability-equivalent，不是 slash 命令真实触发的 trace</li>
          <li><strong>大型企业级 workflow</strong>——本评测用合成或公开样本，未模拟跨团队、跨实体的复杂尽调</li>
          <li><strong>实时数据敏感场景</strong>——artifact 中财务数字部分基于训练数据 + 公开常识，未对最新季报做 verbatim tie-out</li>
          <li><strong>SME 复核</strong>——未邀请 banker / auditor / PE 从业者交叉验证</li>
        </ul>
      </>
    ),
  },
];

export default function FAQPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", maxWidth: 880 }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, marginBottom: ".75rem" }}>常见问题</h1>
      <p className="muted" style={{ marginBottom: "2rem" }}>使用 Anthropic finance agents 前先看一遍。</p>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {faqs.map((f, i) => (
          <details key={i} className="card" style={{ padding: "1.25rem 1.5rem" }}>
            <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "1.05rem", listStyle: "none", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span>{f.q}</span>
              <span style={{ color: "var(--accent)" }}>+</span>
            </summary>
            <div className="prose-art" style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid var(--border)", fontSize: ".95rem" }}>
              {f.a}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
