# Case 3 · 数据稀疏次新股 · short-history 模式

**Agent**: model-builder · **Took**: 40s · **Run**: 2026-05-08

## 输入
某 2025-Q1 上市的次新股，仅 2 个完整季度（不到 1 年）历史财报。

## Agent 行为

```
[T+0s]  Fetch filings → 招股书 + 1 个 10-K + 2 个 10-Q
[T+5s]  Detect: history < 5y normal threshold
[T+8s]  Switch mode: short-history forecasting
[T+15s] Build skeleton: 用招股书 forward-looking + 同业 baseline
        填补缺失年份
[T+30s] Apply uncertainty quantification: ±50% on terminal year
[T+40s] Output with explicit caveat banner
```

## 输出

> ⚠️ **Short-history mode active** — 数据深度仅 1.25 年，预测不确定性显著扩大

### History（实际可用数据 only）

| | 2024A (招股书) | 2025Q1 | 2025Q2 |
|---|---:|---:|---:|
| 营收 | 8.5 bn | 2.4 bn | 2.7 bn |
| 净利 | 0.6 bn | 0.18 bn | 0.22 bn |
| YoY 营收 | n/a | +35%* | +28%* |

*YoY 基于招股书可比口径估算

### Synthetic Baseline（同业 average 填补）

| | 用同业 baseline | 用法 |
|---|---|---|
| 5y 历史 GM 均值 | 28% | 用于 2020-2023 反推 |
| 5y 历史 OpEx ratio | 18% | 同上 |
| Capex / Rev | 5% | 长期假设 |
| Terminal margin | 22% | 行业成熟态 |

### 预测（带不确定性区间）

| Year | Base case | Bear (-30%) | Bull (+30%) |
|---|---:|---:|---:|
| 2025E Rev | 11.5 bn | 8.1 | 15.0 |
| 2026E Rev | 14.5 bn | 10.2 | 18.9 |
| 2027E Rev | 17.5 bn | 12.3 | 22.8 |
| Terminal y FCF | 2.0 bn | 1.4 | 2.6 |

### Implied Valuation（with uncertainty banner）

```
Implied per-share = RMB 28 ± 50%
区间: RMB 14 to RMB 42

⚠️ 注意：此为 short-history 估算，不构成投资建议。
建议追加观察 4 个季度后重新建模。
```

## 评价

✅ **Failsafe 模式切换**：没强行套 5y 历史模板
✅ **不确定性显式量化**：±50% 区间清晰
✅ **跨同业借力**：用 benchmark 填补缺失
✅ 给出"4 季度后重建模"明确 review 点
⚠️ Bear/Bull 区间相对粗（基于线性 ±30%，未做情景化）

**Score**: 8.0 / 10
**Verdict**: short-history 数据稀疏场景的应对模板可复用
