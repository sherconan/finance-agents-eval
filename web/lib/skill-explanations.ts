// Plain-language descriptions for each Anthropic finance skill ID.
// These appear under each agent's "由什么组成" panel on /results.

export const SKILL_DESC: Record<string, string> = {
  // Investment banking
  "investment-banking:pitch-deck": "投行体例 pitch deck 框架（sell-side / buy-side / IPO 自动适配）",
  "investment-banking:strip-profile": "一页公司画像（strip profile）— 财务 + 业务关键数据",
  "investment-banking:datapack-builder": "datapack — 把财务 + 行业数据打包给后续 skill 使用",
  "investment-banking:teaser": "匿名化 sell-side teaser（一页诱饵）",
  "investment-banking:cim": "CIM (机密信息备忘录) 起草",
  "investment-banking:merger-model": "并购模型 (M&A accretion/dilution)",

  // Equity research
  "equity-research:earnings": "财报 first-take note（surprise 表 + segment + guidance）",
  "equity-research:earnings-analysis": "财报详尽分析（深度 segment 拆解 + 模型调整）",
  "equity-research:sector": "行业 sector primer / sector note",
  "equity-research:initiating-coverage": "首次覆盖 initiation report（含 thesis / 模型 / 估值）",
  "equity-research:morning-note": "卖方研究员晨报",
  "equity-research:catalysts": "公司 12 月催化日历",

  // Financial analysis
  "financial-analysis:dcf-model": "完整 DCF 模型 .xlsx 输出（活公式）",
  "financial-analysis:dcf": "DCF 通用估值 skill（assumption + sensitivity）",
  "financial-analysis:3-statement-model": "三表预测模型（IS / BS / CF 联动）",
  "financial-analysis:lbo-model": "LBO 模型（杠杆收购返回率测算）",
  "financial-analysis:audit-xls": "Excel 模型审计 — 公式追溯 + sanity 规则 + 错误识别",
  "financial-analysis:comps-analysis": "可比公司筛选 + 估值倍数表 + football field",
  "financial-analysis:debug-model": "Excel 模型 debug — 找循环引用 / broken link / 异常",
  "financial-analysis:clean-data-xls": "Excel 数据清洗 — 编码 / 格式 / 缺失值",
  "financial-analysis:ib-check-deck": "投行 deck 体例 QA — 数字一致性 + 格式合规",

  // Private equity
  "private-equity:dd-prep": "PE 尽调准备 / 1v1 expert call prep",
  "private-equity:ic-memo": "投委会 IC 备忘录起草",
  "private-equity:returns": "PE 回报测算（IRR / MOIC / DPI）",

  // Wealth management
  "wealth-management:client-review": "私行客户季度复盘 prep",
  "wealth-management:rebalance": "组合再平衡建议",

  // S&P / LSEG
  "sp-global:earnings-preview-beta": "S&P CapIQ 数据驱动的财报前预览",
  "sp-global:tear-sheet": "S&P 标准 tear sheet",
  "lseg:research-equity": "LSEG / Refinitiv 数据驱动 equity research",

  // KYC fallback (placeholder — finance-agents plugin owns this)
  "（依赖 finance-agents plugin 的独立 KYC agent）": "KYC 独立 agent，由官方 finance-agents plugin 提供（非本机 skill 套件）",
};

export function describeSkill(id: string): string {
  return SKILL_DESC[id] ?? "（暂无描述）";
}
