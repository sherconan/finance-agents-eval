import Link from "next/link";

const competitors = [
  {
    name: "Anthropic Finance Agents",
    badge: "本评测对象",
    highlight: true,
    pros: [
      "10 个端到端 agent 模板，覆盖 IB/卖方/PE/审计/合规全链路",
      "skills + connectors + sub-agents 三层架构，预编排开箱即用",
      "Microsoft 365 / Box / Outlook 原生集成",
      "Cowork / Code / Managed Agents 三种部署形态",
    ],
    cons: [
      "首发版本，深度 connector 仍在扩展（FactSet/LSEG 部分集成中）",
      "中文金融数据源覆盖待加强（akshare/Wind/同花顺）",
    ],
    ideal: "投行 / 卖方 / PE / 审计 全场景",
    pricing: "Claude Pro / Cowork 订阅",
  },
  {
    name: "AlphaSense",
    badge: "金融搜索引擎",
    pros: [
      "1000+ 来源金融文件实时索引（券商研报、transcript、SEC、年报）",
      "Smart Synonyms + Sentiment 行业 NLP 多年深耕",
      "AlphaSense Generative Search（GPT-4 集成）输出引用可追溯",
    ],
    cons: [
      "搜索 / 摘要导向，不做 model building / pitch deck 生成",
      "License 价格高昂（公开报道 $20k+/seat/year）",
      "深度推理 / 跨域 reasoning 较弱",
    ],
    ideal: "Buy-side 研究信息检索",
    pricing: "Enterprise 订阅",
  },
  {
    name: "Hebbia",
    badge: "矩阵 LLM 工作流",
    pros: [
      "Matrix 产品支持千页级文档 batch 提取（强项）",
      "审计 / 尽调场景的 ETL-style 工作流标准化",
      "私有部署 enterprise 友好",
    ],
    cons: [
      "强 ETL 取数，但 narrative / pitch / 模型生成弱",
      "需 user 自己定义 prompt 矩阵，非开箱即用",
      "缺乏标准 finance domain agent template",
    ],
    ideal: "PE 尽调 / DD 数据提取",
    pricing: "Enterprise + custom deploy",
  },
  {
    name: "ChatGPT Enterprise + Plugins",
    badge: "通用 LLM",
    pros: [
      "Code Interpreter + Plugin 生态",
      "多模态、价格生态成熟",
      "广泛企业渗透",
    ],
    cons: [
      "无金融领域 agent 模板，从零搭建需投入数月",
      "Long-context 表现仍弱于 Claude",
      "金融机构合规 / 数据落地审查门槛较高",
    ],
    ideal: "通用助理 + 临时分析",
    pricing: "Enterprise per-seat",
  },
  {
    name: "Bloomberg GPT / FactSet AI",
    badge: "传统金融数据 + LLM",
    pros: [
      "数据源自带（Bloomberg Terminal / FactSet 全网）",
      "实时市场数据集成最佳",
      "金融机构现有 workflow 友好",
    ],
    cons: [
      "AI 能力（推理 / 写作 / 模型生成）相对薄弱",
      "高价格 + 长合同期",
      "封闭生态，不易与外部 LLM workflow 配合",
    ],
    ideal: "已是 Bloomberg / FactSet 客户",
    pricing: "Bloomberg Terminal / FactSet 订阅",
  },
];

export default function VSPage() {
  return (
    <div className="container" style={{ paddingTop: "2.5rem", maxWidth: 1100 }}>
      <div className="tag" style={{ marginBottom: "1rem" }}>横向对比</div>
      <h1 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, letterSpacing: "-.01em", marginBottom: ".75rem" }}>
        vs 金融 AI 同行
      </h1>
      <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6, marginBottom: "2.5rem" }}>
        Anthropic Finance Agents vs AlphaSense / Hebbia / ChatGPT Enterprise / Bloomberg GPT。
        基于公开资料整理，仅作 high-level 对比参考；不构成采购建议。
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1rem" }}>
        {competitors.map((c) => (
          <div key={c.name} className="card" style={{ borderColor: c.highlight ? "var(--accent)" : undefined, background: c.highlight ? "linear-gradient(135deg, rgba(245,158,11,.08), rgba(59,130,246,.04))" : undefined }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".5rem" }}>
              <div style={{ fontWeight: 700, fontSize: "1.05rem", color: c.highlight ? "var(--accent)" : "var(--text)" }}>
                {c.name}
              </div>
              <span className="tag" style={c.highlight ? { background: "var(--accent)", color: "#1a1a1a" } : {}}>{c.badge}</span>
            </div>
            <div className="muted" style={{ fontSize: ".82rem", marginBottom: ".75rem" }}>
              <strong>适合：</strong>{c.ideal} · <strong>定价：</strong>{c.pricing}
            </div>

            <div style={{ marginTop: ".75rem" }}>
              <div style={{ color: "var(--green)", fontSize: ".85rem", fontWeight: 600, marginBottom: ".4rem" }}>✓ 强项</div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.55, fontSize: ".88rem" }}>
                {c.pros.map((p, i) => (<li key={i}>{p}</li>))}
              </ul>
            </div>

            <div style={{ marginTop: ".75rem" }}>
              <div style={{ color: "var(--red)", fontSize: ".85rem", fontWeight: 600, marginBottom: ".4rem" }}>⚠ 局限</div>
              <ul style={{ margin: 0, paddingLeft: "1.1rem", lineHeight: 1.55, fontSize: ".88rem" }}>
                {c.cons.map((p, i) => (<li key={i}>{p}</li>))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Decision matrix */}
      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>🎯 选哪个？决策矩阵</h2>
        <div className="card" style={{ padding: 0, overflow: "auto" }}>
          <table className="ranking">
            <thead>
              <tr>
                <th>需求</th>
                <th>首选</th>
                <th>次选</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>端到端 IB/PE workflow（pitch + DD + 模型）</td>
                <td><strong style={{ color: "var(--accent)" }}>Anthropic</strong></td>
                <td>Hebbia + ChatGPT</td>
              </tr>
              <tr>
                <td>买方研究信息检索（transcript + 研报）</td>
                <td>AlphaSense</td>
                <td>Anthropic + Bloomberg</td>
              </tr>
              <tr>
                <td>大型 DD 文档批量提取</td>
                <td>Hebbia</td>
                <td>Anthropic（需配合 connectors）</td>
              </tr>
              <tr>
                <td>已是 Bloomberg/FactSet 客户，要 AI 加成</td>
                <td>Bloomberg GPT / FactSet AI</td>
                <td>Anthropic via Cowork</td>
              </tr>
              <tr>
                <td>初创 fund / SMB controller 团队</td>
                <td><strong style={{ color: "var(--accent)" }}>Anthropic</strong></td>
                <td>ChatGPT Enterprise</td>
              </tr>
              <tr>
                <td>合规 KYC / AML batch screening</td>
                <td>专业 KYC 厂商（World-Check 等）</td>
                <td><strong style={{ color: "var(--accent)" }}>Anthropic KYC Screener</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ marginTop: "3rem" }}>
        <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>💡 核心差异化</h2>
        <p className="muted" style={{ lineHeight: 1.7 }}>
          Anthropic 的差异化在于 <strong>"开箱即用的金融 agent 模板 + 三层架构"</strong>——
          AlphaSense 强搜索弱生成，Hebbia 强提取弱叙事，ChatGPT 通用但无领域模板，
          Bloomberg/FactSet 数据强 AI 弱。Anthropic 用 skills + connectors + subagents 的预编排
          填补了"已有领域知识 + 端到端工作流"这个空缺。
        </p>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <Link href="/" className="btn btn-outline">← 返回榜单</Link>
      </section>
    </div>
  );
}
