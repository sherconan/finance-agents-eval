# Valuation Reviewer — 评测产出

**Agent**: `financial-analysis:comps-analysis` + `dcf` + `audit-xls`
**Test**: 审查一个合成 DCF 模型（含 3 个植入错误）

---

## 受审模型摘要

> "ProjectFlux"（合成中端 SaaS 标的）DCF
> WACC = 9.0% · Terminal growth = 11.0% · 5-yr FCF CAGR = 35% → 计算 implied share price USD 142

## 审查发现（3 个 Red Flag）

### 🔴 Issue #1 — Terminal growth > WACC（致命）
- 模型设定 `g = 11%`，`WACC = 9%`
- 终值公式 `FCF_t × (1+g) / (WACC-g)` 在 g > WACC 时分母为负，TV 数学上崩溃
- **修正建议**：g 上限应为长期 GDP + 通胀（中国 ~3%, 美国 ~2.5%）。建议 g = 2.5%

### 🟡 Issue #2 — FCF 与营业 CF 口径不一致
- 模型 FCF 取 EBIT × (1-T) + D&A − ΔNWC − CapEx
- 但 D&A 前两年用了"经营 CF 中的 D&A"（含无形摊销与租赁折旧），后三年只用了 PP&E 折旧
- 导致历史 FCF 高估约 6-8%；预测期 FCF 低估
- **修正建议**：统一用 IFRS 16 后口径，或全期使用现金 D&A

### 🟡 Issue #3 — Comps 选择 cherry-picked
- 受审 comps：CRWD、PANW、NET、ZS（清一色 high-growth security 平台）
- 标的实际是中等增长（25%）SMB-focused vertical SaaS
- comps 估值 mid 12.5x EV/Rev 应用于标的，导致 implied valuation 失真
- **修正建议**：替换 ServiceTitan、Procore、Vimeo 等 vertical/SMB SaaS comp set；
  median 重算后 EV/Rev 约 6.5x

## 审查后调整

| 项 | 原模型 | 修正后 |
|---|---:|---:|
| Terminal growth | 11.0% | 2.5% |
| Implied TV | 数学崩溃 | USD 980 mm |
| FCF (year-3 base) | 51 mm | 47 mm |
| Comps 中位 EV/Rev | 12.5x | 6.5x |
| Implied share price (DCF) | USD 142 | **USD 38** |
| Implied share price (comps) | USD 165 | **USD 52** |

> ⚠️ 修正后估值下降 **~73%**，足以否决原投决建议。

## 自评
- 三个 issue 都点中（包括最致命的 g > WACC 数学错误）
- 修正方案可执行，给出了替换 comp 名单
- 真实 agent 会自动跑 audit-xls 触发 100+ 项 sanity check（formula、circular ref、broken link、hard-coded override）
