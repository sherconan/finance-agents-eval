# Case 3 · 含审计师保留意见的中盘股 · 风险升级处理

**Agent**: statement-auditor · **Took**: 50s · **Run**: 2026-05-08

## 输入
合成中盘股「Project Beta」2024 年报，审计师 Big-4 出具**保留意见 (qualified opinion)**。

## Agent 行为

```
[T+0s]   Detect audit opinion type → "Qualified Opinion" found in audit report header
[T+1s]   Trigger: risk escalation (severity bump)
[T+2s]   Switch from standard 5-section review → deep-dive on qualification basis
[T+10s]  Pull qualification basis from Note 14 (related party transactions)
[T+30s]  Cross-reference with prior year (clean opinion) → identify what changed
[T+50s]  Output: structured risk report
```

## 输出（Risk Escalation Mode）

> 🛑 **AUDIT QUALIFICATION DETECTED — 重大风险**

### Qualification Basis（Big-4 审计师陈述）

> "我们无法就 2024 年与控股股东及关联方之间总额 RMB 13.5 bn 的资金往来获取充分、适当的审计证据，
> 导致我们无法对该关联交易余额的完整性和准确性发表无保留意见。"

### 关键数据

| | FY23 | FY24 | YoY |
|---|---:|---:|---:|
| 营收 (RMB bn) | 35 | 42 | +20% |
| 关联方应收余额 | 2.1 | **13.5** | +543% |
| 关联方营收占比 | 6% | 22% | 大幅扩大 |
| 审计意见 | 无保留 | **保留** | 退化 |

### Tie-out 结果

| 检查项 | 结论 |
|---|---|
| 主表数学层 | ✅ 一致（数字本身没错）|
| 关联交易披露 | 🔴 Note 14 列示但未充分说明商业实质 |
| 现金流 vs 净利 | 🔴 CFO/Net 仅 0.45x（应付/应收占用过大）|
| BS Item："关联方其他应收" | 🔴 13.5b，无明确还款条款 |

### Ratio Sanity

| Ratio | FY23 | FY24 | 同业 baseline | Flag |
|---|---:|---:|---:|---|
| ROE | 18% | 22% | 15-20% | 🟡 增长但质量存疑 |
| 应收账款 / 营收 | 18% | 32% | 15-25% | 🔴 急速恶化 |
| Cash conv. | 0.85 | 0.45 | 0.9-1.1 | 🔴 严重 |

### Risk Profile

| 维度 | 评级 |
|---|---|
| 财务造假风险 | 🔴 高（关联方占款 + 现金流弱化）|
| 持续经营 | 🟡 中（资产规模仍能 cover）|
| 投资风险 | 🔴 unsuitable for income / value investors |
| 监管风险 | 🟡 证监会可能问询 |

### 建议下一步动作

1. **暂停**任何新建模 / 估值工作
2. 拉取年报 Note 14 + Note 19（分部信息）做交叉验证
3. 调取近 5y 关联交易历史趋势
4. 关注后续季报现金流 trajectory
5. 对买方：观望直至下一份审计意见 unqualified
6. 对卖方：重新评估覆盖与否

## 评价

✅ **正确触发风险升级** — 没把它当 normal review 处理
✅ Quantification 到位（13.5b、+543%、CFO/Net 0.45x）
✅ Cross-period 对比（FY23 clean → FY24 qualified）
✅ Actionable next steps + 决策含义清楚
✅ 不同 stakeholder（买方 vs 卖方 vs 内审）都给到指引
⚠️ 没建议联系审计师函证（agent 边界外，但应建议人工跟进）

**Score**: 9.0 / 10
**Verdict**: 风险等级正确升级，is the highest-leverage case 适配能力体现
