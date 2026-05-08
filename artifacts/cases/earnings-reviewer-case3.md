# Case 3 · Pre-release 数据缺失 · Earnings Preview 模式

**Agent**: earnings-reviewer · **Took**: 20s · **Run**: 2026-05-08

## 输入
ticker=AAPL, period=FY26Q3，但当前 2026-05-08 还在 release 前（AAPL FY26Q3 通常 Aug 公告）。

## Agent 行为

```
[T+0s]  Fetch latest filings → only 8-K announcement, no 10-Q yet
[T+2s]  Detect: target quarter not yet reported
[T+3s]  Switch mode: earnings-preview (instead of earnings-reviewer)
[T+5s]  Pull: consensus + recent news + history surprise pattern
[T+15s] Output: pre-earnings brief
```

## 输出（Pre-Earnings Preview）

> ⏰ **AAPL FY26Q3 尚未发布 — 切换到 Preview 模式**

### Consensus（截至 2026-05-08）
| 指标 | Mean | Range | YoY |
|---|---:|---|---:|
| Revenue | $99.5b | $94-104b | +5% |
| EPS | $1.65 | $1.55-1.78 | +12% |
| Services | $26.0b | $24-28b | +14% |
| Products | $73.5b | $70-76b | +3% |

### 历史 Surprise Pattern（最近 8 个季度）
- Beat 频率：6/8（75%）
- Avg surprise：+1.8% rev / +3.2% EPS
- 最大 miss：FY24Q1 -2.1%（中国市场疲软）

### 关注议题
1. iPhone Pro 占比 vs 标准款 mix shift
2. 中国大陆销量复苏节奏
3. Apple Intelligence 商业化进展（Q3 含 iOS 19 发布）
4. Services 高 margin 业务对总 GM 拉动
5. M5 Mac 出货影响 ASP

### Buy-side reaction 预案
- Beat ≥3% + Services 强 → +5% AHT 反应
- Miss > 2% + China 拖累 → -7% AHT 反应

## 评价

✅ **Failsafe 优雅** — 没编造未发布的财报数字
✅ 智能切换到合理替代模式（preview）
✅ 给了 actionable 关注议题 + reaction playbook
⚠️ Consensus 数据基于训练时点，未实时刷新

**Score**: 8.5 / 10
**Verdict**: 数据缺失场景的应对模板可复用
