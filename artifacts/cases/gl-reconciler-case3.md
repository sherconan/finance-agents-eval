# Case 3 · 数据 typo · 量级异常检测

**Agent**: gl-reconciler · **Took**: 12s · **Run**: 2026-05-08

## 输入
GL trial balance 中 AP 余额输入为 `945,800`，但 subledger 实际为 `9,458,000`（少录一个 0）。

## Agent 行为

```
[T+0s]  Tie out AP: GL=945,800 vs Sub=9,458,000
[T+1s]  Compute ratio: 9,458,000 / 945,800 = 10.0×
[T+2s]  Sanity rule fired: "exact 10× variance suggests data-entry typo, NOT accounting diff"
[T+3s]  Cross-check sister periods: prior 6 months AP avg = 9.1M
        → 9,458,000 fits trend; 945,800 is outlier
[T+5s]  Output: typo flagged + recommendation
```

## 输出

> 🔴 **AP 量级异常 — 大概率数据输入错误**
>
> | 检查项 | 值 |
> |---|---:|
> | GL 余额 | 945,800 |
> | Subledger | 9,458,000 |
> | 比例 | exactly 10.00× |
> | 历史 6m AP 中位 | 9.1M |
>
> **诊断**：差异为精确 10 倍 + GL 值显著偏离历史趋势 → 判定为数据录入漏一个 0。
>
> **建议**：
> 1. 不要按差异处理（不是会计调整问题）
> 2. 联系 AP 录入员核对原始 vendor invoice
> 3. 修正后重跑对账

## 评价

✅ 触发量级 sanity 规则（Sherlock pattern: exact 10× / 100× → 大概率 typo）
✅ 跨期 sanity check 验证（prior 6m baseline）
✅ 没把它当真业务差异生成 AJE
✅ 流程指引清晰

**Score**: 8.5 / 10
**Verdict**: 数据健康度 watchdog 角色到位
