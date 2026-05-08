# Case 3 · 关账后异常 · post-close adjustment

**Agent**: month-end-closer · **Took**: 30s · **Run**: 2026-05-08

## 输入
4 月已 closed。5 月 1 日 controller 发现 4 月有一笔 RMB 90,000 应付（vendor invoice 漏录），来自 4 月 28 日的服务采购。

## Decision Tree

```
[T+0s]  发现遗漏 → 评估材性
        - 单笔金额 90,000 RMB
        - 4 月营收 ~4.5M USD ≈ 32M RMB
        - 比例 = 0.28% < materiality threshold (5%)
[T+5s]  路径 A: Reverse 4 月 close 重做（heavy）
        路径 B: 5 月入账 + 4 月 disclosure
        路径 C: prior period adjustment（PPA）
[T+10s] Pick: 路径 B（材性低，5 月入账 + 注脚 disclosure）
[T+20s] Generate AJE + disclosure language
```

## 输出

### 决策依据（ASC 250 / IAS 8 角度）

> **不构成 material misstatement** — 单笔 0.28% < 一般 5% materiality threshold
>
> 不需 restatement，按 ASC 250-10-50（current-period adjustment with disclosure）处理。

### Adjustment Entry（5 月 1 日入账）

```
DR  Service Expense (5 月)        90,000
    CR  Accounts Payable                   90,000
说明: 补录 4 月 28 日服务采购 invoice（4 月期已关账，按 ASC 250-10-50 当期调整）
```

### Footnote Disclosure（5 月 reporting 包含）

> **Note 8 — Out-of-Period Adjustment**
> During May, the Company recorded an out-of-period adjustment of RMB 90,000
> related to a service expense incurred in April. The amount is not material
> to either April or May results. We have evaluated under ASC 250 and concluded
> a current-period adjustment is appropriate.

### 4 月已发布 reporting 是否需要重发？

| 评估项 | 结论 |
|---|---|
| 是否 material to 4 月? | No (0.28%) |
| 是否影响 trend / KPI? | No |
| 是否影响 covenant? | No (debt covenant headroom 健康) |
| 是否有 fraud 嫌疑? | No (单笔正常 vendor) |
| **结论** | 不重发，5 月披露即可 |

### 流程改进建议

1. AP cutoff 再延 24h（从 +1 day 到 +2 day），减少漏录
2. Vendor invoice 自动 OCR + AP 录入 — pilot 项目
3. 季度末加做 invoice 检查（4 月 28 这种 last-3-day cutoff 高风险点）

## 评价

✅ **不直接重开账** — 符合 ASC 250 实操（重开是 nuclear option）
✅ Materiality 评估有量化依据（0.28%）
✅ AJE + footnote 双管齐下
✅ 流程改进建议给具体 vendor invoice OCR 方案
⚠️ 没自动评估对债务 covenant 的潜在影响（虽提到了 headroom，但人工核实更稳）

**Score**: 8.5 / 10
