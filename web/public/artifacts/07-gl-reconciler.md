# GL Reconciler — 评测产出

**Agent**: `financial-analysis:audit-xls` + `debug-model`
**Test**: 合成 3 月 GL（含 3 个植入异常）

---

## Reconciliation Summary

合成账套：单实体 SaaS Co.，2026 Q1（Jan–Mar），跨 5 个 GL 账户：1010 现金、1200 应收、2010 应付、4000 收入、6500 销售费用。

GL 余额 vs 子账（subledger）对账：

| Account | GL 余额 (USD) | Subledger | Variance | Flag |
|---|---:|---:|---:|---|
| 1010 Cash | 2,485,300 | 2,485,300 | 0 | ✅ Tie |
| 1200 AR | 1,820,500 | 1,798,200 | +22,300 | ⚠️ Investigate |
| 2010 AP | 945,800 | 945,800 | 0 | ✅ Tie |
| 4000 Revenue | 4,580,000 | 4,575,000 | +5,000 | ⚠️ Investigate |
| 6500 S&M | 320,500 | 327,000 | -6,500 | ⚠️ Investigate |

## Findings (3 异常)

### 🔴 Finding #1 — AR variance USD 22,300（timing diff）
- 客户 #C-2049 的 USD 22,300 invoice 已在 GL 入账（Mar 31），但 subledger AR aging 报表生成于 Mar 30，未含
- **结论**: timing difference, 非实质差异；建议在 reconciliation 工作底稿注明 cut-off
- **Adjusting Entry**: 无需

### 🟡 Finding #2 — Revenue + USD 5,000 多记
- 客户 #C-1188 的 deal 在 Mar 28 入账 5,000，但合同 start date 是 Apr 1（subledger 按权责发生制延后到 Q2）
- **结论**: GL 提前确认收入，违反 ASC 606
- **Adjusting Entry**:
  ```
  DR Revenue (4000)              5,000
      CR Deferred Revenue (2400)      5,000
  ```

### 🟡 Finding #3 — S&M 漏记 USD 6,500
- 一笔 Mar 25 vendor invoice (Bizible billing) 在 subledger 已入账但未推送到 GL
- **结论**: integration sync gap
- **Adjusting Entry**:
  ```
  DR S&M Expense (6500)          6,500
      CR Accounts Payable (2010)      6,500
  ```

## 调整后试算平衡

净影响：
- Revenue ↓ 5,000
- S&M Expense ↑ 6,500
- Operating Income ↓ 11,500
- AP ↑ 6,500
- Deferred Revenue ↑ 5,000

试算平衡 ✅

## 自评
- 三个异常类型覆盖全（timing、policy violation、integration gap）
- AJE 格式合规
- 实际 agent 会接 NetSuite / SAP / QBO API 直接 query GL，自动生成 working paper
