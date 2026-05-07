# Month-End Closer — 评测产出

**Agent**: `financial-analysis:audit-xls` + `clean-data-xls`
**Test**: 合成 SaaS 单实体 2026 年 4 月月末关账

---

## Close Calendar (Day +1 → Day +7)

| Day | Owner | 任务 | 状态 |
|---|---|---|---|
| +1 | Treasury | 银行对账（5 个账户） | ✅ |
| +1 | AR | 收款 cut-off + 开票 cut-off | ✅ |
| +1 | AP | 应付截止 + 待入账 invoice 列表 | ✅ |
| +2 | GL | Accruals: utilities, professional fees, bonus | 🟡 进行中 |
| +2 | GL | Prepaid amortization | ✅ |
| +3 | Revenue | ASC 606 monthly recognition run | ✅ |
| +3 | Payroll | 月度 payroll true-up + payroll tax accrual | ✅ |
| +4 | GL | Intercompany 对账（无） | n/a |
| +4 | GL | FX revaluation | ✅ |
| +5 | Controller | Trial balance review + flux analysis | 🟡 |
| +6 | Controller | 财务三表 draft | pending |
| +7 | CFO | 月度 reporting package + commentary | pending |

## 提议的调整分录（合成案例）

### JE-001 Utility Accrual
```
DR  G&A Expense (6800)             4,200
    CR  Accrued Liabilities (2050)        4,200
说明: 4 月电费/网费估计；账单 5 月 15 日才到
```

### JE-002 Prepaid Insurance Amortization
```
DR  Insurance Expense (6810)       2,500
    CR  Prepaid Expenses (1450)            2,500
说明: 年度保险 30,000 / 12 = 2,500/月
```

### JE-003 Deferred Revenue Recognition
```
DR  Deferred Revenue (2400)      185,000
    CR  Subscription Revenue (4000)       185,000
说明: 月度 ASC 606 SaaS 收入释放
```

### JE-004 Payroll True-up
```
DR  Salary Expense (6100)         12,500
    CR  Accrued Payroll (2030)            12,500
说明: 月底差几日工资 + 25% bonus accrual
```

### JE-005 FX Revaluation
```
DR  FX Loss (7200)                   850
    CR  Cash — EUR Account (1020)            850
说明: EUR 账户余额 4 月底重估，EUR/USD 1.085 → 1.082
```

## Flux Analysis（4 月 vs 3 月）

| Account | Mar | Apr | Δ% | Comment |
|---|---:|---:|---:|---|
| Subscription Rev | 1,520k | 1,580k | +3.9% | NRR + new logos 健康 |
| Gross Margin | 76% | 77% | +1pt | Cloud 成本 commit 折扣生效 |
| S&M Expense | 320k | 348k | +8.7% | Q2 SDR ramp + 1 marketing event |
| R&D Expense | 410k | 408k | -0.5% | 持平 |
| G&A Expense | 105k | 122k | +16% | 法律费用 spike — 待确认 |
| **Operating Income** | 152k | 175k | +15% | 健康 leverage |

## 待 CFO 确认事项
1. G&A 16% 增长是否正常（possible 收购尽调费用）
2. 4 月 ARR snapshot 与 ASC 606 收入差异是否需说明

## 自评
- close calendar / 5 笔 JE / flux analysis / 待审事项 — 一个 controller 月末工作包基本齐
- 数字合成，但科目组合、JE 模板、flux 阈值标记符合一线 SaaS 财务实操
- 实际 agent 应可接 NetSuite/QBO API 自动跑 close run + 生成 PDF 月报
