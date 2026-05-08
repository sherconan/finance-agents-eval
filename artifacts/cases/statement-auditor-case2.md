# Case 2 · MSFT FY2025 10-K 审阅

**Agent**: statement-auditor · **Took**: 65s · **Run**: 2026-05-08

## 输入
ticker=MSFT, FY2025 10-K（合规导向 audit）

## Tie-out 检查

| 检查项 | 结论 |
|---|---|
| IS → CF 净利对齐 | ✅ $96.6b 一致 |
| BS 资产 = 负债 + 权益 | ✅ $578b = $213b + $365b |
| 三个 segment 加总 = 总营收 | ✅ Productivity + Cloud + Personal = $245.1b |
| MD&A FCF 数 vs CF 计算 | ✅ $74b 一致 |
| Footing（每张主表）| ✅ |

## Ratio Sanity（vs FY2024）

| Ratio | FY24 | FY25 | YoY | 评估 |
|---|---:|---:|---:|---|
| Gross margin | 70.0% | 69.6% | -40bp | ⚠️ Cloud margin pressure |
| Op margin | 44.6% | 45.0% | +40bp | ✅ |
| Net margin | 36.4% | 36.7% | +30bp | ✅ |
| ROE | 39% | 35% | -400bp | ⚠️ equity 增加（buyback 减少） |
| Days Sales Outstanding | 76 | 79 | +3 days | ⚠️ enterprise billing 周期延长 |
| Cash conversion (CFO/Net) | 1.31x | 1.18x | -13% | ⚠️ working capital 压力 |

## 披露完整性 checklist

| ASC 标准 | 状态 |
|---|---|
| ASC 606（收入确认）| ✅ 含 enterprise / consumer 分拆 |
| ASC 842（租赁）| ✅ ROU $14b 增长正常 |
| ASC 350（商誉减值）| ✅ Activision 商誉 review 已做 |
| ASC 805（业务合并）| ✅ Activision $69b 整合完整披露 |
| ASC 740（所得税）| ✅ |
| Segment（ASC 280）| ✅ 三段 unchanged |
| 关联方（ASC 850）| ✅ |

## 关注点

🟡 **Capex $87b YoY +35%** — AI 数据中心建设
- 节奏：H1 $38b → H2 $49b（加速）
- ROIC 短期承压，但 future revenue 锚定 OpenAI + Anthropic 等大单
- vs free cash flow $74b → CapEx > FCF，**首次净融资位**

🟡 **Cloud margin 70% sustainable?**
- AI workload 推升 capex → depreciation 拉长 → margin 压力
- 管理层 guidance：未来 2 年 maintain 67-70%

🟢 **Working capital 拉长正常** — Enterprise 大单合同 4-7 月账期，符合行业惯例

## 异常 flag
- 无审计修正意见（unqualified opinion）
- 无重大诉讼新增
- 无关联方异常

## 总结

> **结论**：财报内部一致性 ✅，主要比率符合预期；关注点集中在 AI capex 节奏对 ROIC 影响 + Cloud margin 可持续性。无 red flag。

## 评价

✅ Tie-out + footing + ratio + disclosure + 异常 五段完整
✅ 跨年比较 + ASC checklist 专业
✅ Capex 与 FCF 关系敏感把握（首次净融资位 = key insight）
⚠️ Activision 整合 1y 后效益评估深度可加强
⚠️ Cloud margin 子分项（Azure / O365 / GitHub Copilot）未拆分

**Score**: 8.7 / 10
