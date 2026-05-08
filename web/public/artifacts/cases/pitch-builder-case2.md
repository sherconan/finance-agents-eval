# Case 2 · PE 收购方 buy-side defensive pitch

**Agent**: pitch-builder · **Took**: 60s · **Run**: 2026-05-08

## 输入
中型 PE fund 拟收购一家 SaaS 公司（$100M ARR），需做 LP 沟通用 buy-side pitch deck。

## 自动模式切换
检测到任务为 buy-side（收购方视角，非 sell-side advisor），框架切换：

| Sell-side（默认）| Buy-side（本 case） |
|---|---|
| Marketing the company | Justifying the deal |
| Football field 估值带 | Returns sensitivity (IRR/MOIC) |
| Process timeline | Hold period & exit path |

## 10-Slide Buy-Side Outline

1. **Cover** — Project Aurora · IC presentation
2. **Investment Thesis** — 5 bullet（why this, why now, why us）
3. **Company Snapshot** — strip + 3y KPI（ARR, NRR, gross retention）
4. **Market** — TAM $8b / SAM $1.2b / 增速 18% CAGR
5. **Why The Target** — top 3 differentiators + moat
6. **Diligence Findings** — financial/legal/tech 三色 light
7. **Value Creation Plan** — top 5 levers + 量化 EBITDA uplift
8. **Returns** — IRR/MOIC 三情景 (base/bear/bull) + sensitivity
9. **Exit Path** — strategic buyer list + IPO comparable timeline
10. **Decision** — ask + timeline + closing conditions

## IRR/MOIC 表（base case）

```
Entry:        $300M EV (8× ARR)
Hold:         5 years
Exit:         $750M EV (10× ARR exit)
Leverage:     3.5× EBITDA at entry, deleverage to 1.5×
LBO equity:   $100M
Exit equity:  $530M
=> MOIC 5.3× / IRR 39%
```

## 三情景对比

| Scenario | Entry | Exit | MOIC | IRR |
|---|---:|---:|---:|---:|
| Bear | 8.5× | 7× | 1.8× | 12% |
| Base | 8× | 10× | 5.3× | 39% |
| Bull | 7.5× | 13× | 8.2× | 52% |

## 评价

✅ Buy-side 体例自动切换（区别 sell-side framework）
✅ IRR/MOIC 三情景 + sensitivity 完整
✅ Value creation plan + Exit path 进 deck
⚠️ 缺 LP 偏好维度（fund vintage / DPI 节奏）个性化
⚠️ Diligence findings 部分依赖外部数据接入

**Score**: 8.0 / 10
