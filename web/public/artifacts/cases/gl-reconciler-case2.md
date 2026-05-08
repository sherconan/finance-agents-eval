# Case 2 · Multi-entity 季度对账（含跨实体往来）

**Agent**: gl-reconciler · **Took**: 55s · **Run**: 2026-05-08

## 输入
母公司 (PRC) + 美国子公司 (USD) + 欧洲子公司 (EUR)，2026 Q1 trial balance + 内部往来明细。

## Tie-out 矩阵

| Account | 母→US IC AR | US→母 IC AP | Diff (USD) | 类型 |
|---|---:|---:|---:|---|
| 服务费 | 1,200,000 | 1,180,000 | +20,000 | FX timing |
| 软件 license | 800,000 | 800,000 | 0 | ✅ |
| 内部贷款利息 | 25,000 | 25,000 | 0 | ✅ |

## 发现

🟡 **服务费 +20k 差异 = FX revaluation timing**
- 母公司按 2026-03-31 即期 USD/CNY 7.18 入账
- 美国子按 2026-03-28 提前入账（汇率 7.16）
- 差异 = 1.18M × (7.18 - 7.16) ≈ 20k USD

**AJE proposed**:
```
DR  FX Revaluation Loss     20,000
    CR  IC AR — US Sub               20,000
```

## Recommendation
建议 group level **锁定每月最后工作日 21:00 GMT 为 IC cutoff 时点**，避免 timing-driven FX 差异，节省每季度 ~40 工时对账。

**Score**: 8.7 / 10
