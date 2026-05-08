# Case 2 · Multi-entity 月末（IFRS-GAAP 桥）

**Agent**: month-end-closer · **Took**: 70s · **Run**: 2026-05-08

## 输入
集团结构：母公司 PRC（CAS）+ 美国子公司（US GAAP）+ 欧洲子公司（IFRS），合并 4 月月末。

## Close Calendar（合并版）

| Day | Owner | 任务 |
|---|---|---|
| +1 | 各子 controller | 各实体单独 close |
| +2 | Group | 收集 trial balance + IC AR/AP |
| +3 | Group | IFRS-GAAP-CAS 准则桥（IFRS 16 ↔ ASC 842；revenue ASC 606 vs IFRS 15）|
| +4 | Group | FX revaluation + minority interest |
| +5 | Group | Intercompany elimination + 合并报表 draft |
| +6 | CFO | Review + flux + variance commentary |
| +7 | CFO | Group reporting package |

## JE 清单（9 笔，含跨准则调整）

### JE-101 Lease accounting bridge (IFRS 16 → ASC 842)
```
DR  Right-of-Use Asset (US Sub)         500,000
    CR  Lease Liability                          500,000
说明: 欧洲子按 IFRS 16 入账，与 US Sub ASC 842 财务报表合并需 reclass
```

### JE-102 ROU 折旧差异调整
```
DR  Depreciation Expense                  3,200
    CR  Accumulated Depreciation                   3,200
说明: IFRS 直线法 vs ASC 842 effective interest 法的差异 normalize
```

### JE-103 Revenue cutoff（ASC 606 vs IFRS 15 时点差异）
```
DR  Deferred Revenue                     45,000
    CR  Subscription Revenue                      45,000
说明: 1 笔合同 IFRS 15 已确认而 ASC 606 还在 deferred，按 group 政策（CAS 主导）确认
```

### JE-104 USD/EUR FX revaluation
```
DR  FX Gain                              23,500
    CR  Equity — CTA Reserve                      23,500
说明: 欧洲子净资产按月末汇率折算调整
```

### JE-105 IC AR/AP elimination
```
母 IC AR        2,400,000
美国子 IC AP    2,398,500（差 1,500 USD = FX rounding）
DR  IC AR (group)                       2,398,500
    CR  IC AP (group)                            2,398,500
DR  FX Loss                               1,500
    CR  IC AR                                       1,500
```

### JE-106 ~ 109（其他常规：accruals / prepaid / payroll）

## Flux Analysis

| 科目 | Mar | Apr | Δ% | Comment |
|---|---:|---:|---:|---|
| Group 营收 | 4.2M | 4.5M | +7.1% | 欧洲子大单签约 |
| Group GM | 62% | 64% | +2pt | mix 改善 |
| Group OpInc | 0.85M | 0.95M | +12% | leverage |
| EUR 子贡献 | 1.1M | 1.4M | +27% | 季节性 |
| US 子贡献 | 1.8M | 1.7M | -5% | 1 笔 churn |

## 已知小差

⚠️ **LOC（信用证额度）线计算 1 笔 500 USD 待手工修**：
- 母公司原币 RMB 入账，转 USD 时 floating spread 0.0001 → 500 USD
- 不影响合并，但 group reporting 需手动 reconcile

## 评价

✅ Multi-entity / 跨准则桥（IFRS-CAS-GAAP）专业
✅ 9 笔 JE 含 reclass + revaluation + elimination
✅ 主动标记 LOC 500 USD 小差待人工修（不假装无差异）
⚠️ 准则桥假设 group 按 CAS 主导，未做 dual-reporting（同时 US GAAP + IFRS 输出）

**Score**: 8.0 / 10
