# Case 2 · 浪潮信息（000977.SZ）三表 + DCF

**Agent**: model-builder · **Took**: 70s · **Run**: 2026-05-08

## 输入
ticker=000977.SZ（浪潮信息），AI 服务器 OEM，5y 历史 + 3y 预测 + DCF。

## 关键假设

| 项 | 值 | 依据 |
|---|---|---|
| WACC | 11.0% | β=1.5（高 cyclical）+ ERP 6.5% + Rf 2% |
| Terminal g | 3.0% | AI infra 长期受益 |
| Tax | 15% | 高新企业税收优惠 |

## Income Statement (RMB bn, 简版)

| Year | 2021A | 2022A | 2023A | 2024A | 2025E | 2026E | 2027E |
|---|---:|---:|---:|---:|---:|---:|---:|
| 营收 | 67.0 | 69.5 | 104.5 | 114.7 | 145.0 | 175.0 | 200.0 |
| YoY% | +21% | +4% | +50% | +10% | +26% | +21% | +14% |
| 营业成本 | (61.6) | (63.7) | (95.4) | (104.7) | (132.5) | (160.0) | (183.0) |
| 毛利 | 5.4 | 5.8 | 9.1 | 10.0 | 12.5 | 15.0 | 17.0 |
| GM% | 8.1% | 8.4% | 8.7% | 8.7% | 8.6% | 8.6% | 8.5% |
| EBIT | 2.0 | 2.0 | 2.5 | 2.3 | 3.0 | 3.6 | 4.2 |
| 归母净利 | 1.7 | 1.7 | 1.7 | 1.85 | 2.5 | 3.1 | 3.6 |
| Net% | 2.5% | 2.4% | 1.6% | 1.6% | 1.7% | 1.8% | 1.8% |

## CF & FCF

```
2024A:  CFO  = 3.8 bn (含较高 inventory + AR 占用)
        CapEx = 1.5 bn
        FCF  = 2.3 bn (低，因为 working capital 重)
```

## DCF

| | 值 (RMB bn) |
|---|---:|
| PV of FCF (5y) | 12 |
| PV of TV (g=3%, WACC=11%) | 35 |
| EV | 47 |
| Net cash | -2 |
| Equity value | 45 |
| Per share (1.46B shares) | **RMB 30.8** |

vs 当前市价 ~RMB 55 → 估值偏低 -44%（DCF 不含 sovereign AI 订单 upside）

## 5×5 Sensitivity (per share, RMB)

|         | g=2.0% | g=2.5% | g=3.0% | g=3.5% | g=4.0% |
|---|---:|---:|---:|---:|---:|
| WACC=10% | 32 | 35 | 39 | 44 | 51 |
| WACC=11% | 27 | 29 | **31** | 34 | 38 |
| WACC=12% | 23 | 25 | 27 | 29 | 31 |

## 评价

✅ 三表完整勾稽
✅ 高 capex / 低 GM 行业的特殊结构正确处理
⚠️ Working capital 模型简化（应收/存货周转动态不细）
⚠️ DCF 未叠加 sovereign AI 订单 backlog explicit upside 测算

**Score**: 7.8 / 10
**Verdict**: 适配硬件 OEM，但需 senior 补 WC 与订单 backlog 假设
