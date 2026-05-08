# Case 2 · 茅台 DCF 模型审查

**Agent**: valuation-reviewer
**Run date**: 2026-05-08
**Input model**: Model Builder Case 1 产出（茅台 DCF · WACC 8.5% / g 2.5% / 5y 显性预测）
**Took**: 45s

---

## 受审模型摘要

```
WACC          = 8.5%（CAPM: Rf 2.0% + ERP 6.5% × β 1.0）
Terminal g    = 2.5%（永续）
5y FCF base   = RMB 76 bn (2024A) → 145 bn (2029E)
Implied price = RMB 1,858 / share
```

## 审查发现（按严重度）

### ✅ 数学层 — 通过
- TV 公式正确：`FCF × (1+g) / (WACC-g)` = 145 × 1.025 / 0.06 = 2,477 bn
- PV 折现因子链一致（5y horizon, end-of-year discounting）
- 三表勾稽：RE 滚动 = 净利 - 分红，差异 < 0.1%

### 🟡 假设层 — 3 个 Yellow Flag

**🟡 Y1 · WACC 取经验值 8.5%，未走 CAPM 完整 β**
- 模型用 β=1.0（市场基准），但茅台实际 β（5y 月度回归 vs 沪深 300）约 **0.65-0.75**——白酒消费品类周期性低
- 修正后 Re ≈ 2.0% + 0.7 × 6.5% = 6.55%，WACC → 6.55%
- Impact：WACC 8.5% → 6.55% 会让 implied price 上行 ~+25%（更激进）

**🟡 Y2 · Working capital 模型简化**
- 茅台合同负债（预收）145 bn 占总负债 88%，与渠道压库节奏强相关
- 模型未季节性化：Q1 经销商打款集中、Q3 渠道清库——CFO 内部周期波动 ±15%
- 修正建议：用季度模型替代年度模型，CapEx 同样按季

**🟡 Y3 · Terminal growth 2.5% 偏激进**
- 中国白酒赛道渗透接近饱和（消费税口径）+ 白酒需求长期 -1% 到 +2% 之间
- 建议保守版 g = 1.5%（隐含 implied price RMB 1,680）
- 5×5 sensitivity 显示 g=1.5% 时仍比市场 1,371 高 22%

## 修正后估值

| | 原模型 | 修正版 |
|---|---:|---:|
| WACC | 8.5% | 6.55%（CAPM 完整 β 0.7）|
| g | 2.5% | 1.5%（保守白酒永续）|
| Implied per-share | **RMB 1,858** | **RMB 2,000** |
| 上行 vs market | +35.5% | +45.9% |

**Note**: 两处修正方向相反——WACC 下调 + g 下调 → 净影响仍为上行（Re-Rated 估值)。

## 总评

- 受审 DCF 数学层 ✅ 自洽，无 Showstopper
- 假设层 ⚠️ 三处需 senior 复核
- 没踩"g > WACC""口径混用""comp cherry-pick"等致命错（不像 Case 1 那种）
- **结论**：模型骨架可用，建议 senior banker review 假设层后再上 IC

**Score**: 8.5 / 10
**Verdict**: 可用骨架，需补 β / WC / g 三处假设修订
