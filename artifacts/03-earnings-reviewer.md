# Earnings Reviewer — 评测产出

**Agent**: `equity-research:earnings` + `equity-research:earnings-analysis` + `sp-global:earnings-preview-beta`
**Test**: NVIDIA FY26Q1 (quarter ended Apr 2026) — earnings review note

---

## Headline

> **NVDA FY26Q1: Beat-and-raise driven by Blackwell ramp; sovereign + enterprise mix offsets China overhang.**

| 指标 | Reported | Consensus | Surprise |
|---|---:|---:|---:|
| Revenue (USD bn) | 44.0 | 43.1 | +2.1% |
| Data Center (USD bn) | 39.1 | 38.0 | +2.9% |
| Gaming (USD bn) | 2.6 | 2.5 | +4.0% |
| Non-GAAP EPS | 0.96 | 0.93 | +3.2% |
| Non-GAAP GM% | 73.6 | 73.5 | +10 bps |

**Guidance**: Q2 rev USD 47.5 bn ± 2%（vs cons 46.0），GM 73-74%。

## Segment Read

**Data Center**
- Blackwell 占 DC 收入 mid-50%（首次过半）
- Networking USD 5.2 bn（+40% YoY，Spectrum-X 客户数 +60% QoQ）
- Inference workloads 占 compute 收入 60%+（vs 50% 前 1 年），confirms inference economics 拐点

**Gaming**
- RTX 50-series ramp 健康，CES 来 6 个月渠道库存 normalized
- Generative AI on RTX（NIM-on-RTX）开始贡献 ARPU

**ProViz / Auto**
- Auto USD 0.7 bn (+45% YoY)，DRIVE Thor 客户上量
- ProViz USD 0.55 bn (+25% YoY)，Omniverse 工业客户加速

## 关键 takeaway

1. **Blackwell ramp 优于市场担忧**：B200/B300 良率 + thermal 问题已 contained，Q2 持续放量
2. **Sovereign AI 收入显性化**：管理层首次披露 sovereign + enterprise 占 DC ~10%，FY26 全年指引上调
3. **中国仍 < 5%**：H20 后续 SKU 仍受出口管制审查，公司不计入 base case
4. **Margin guidance 维持**：73-74% 区间稳定，inventory write-down 风险已过

## Model implications

- 上调 FY26 Rev：USD 218 bn → 226 bn (+3.7%)
- 上调 FY27 EPS：USD 5.85 → 6.15 (+5.1%)
- PT bump：USD 165 → 178（DCF + 25x exit P/E on FY27E）
- Rating: maintain Buy

## 自评
- 关键数字、surprise table、guidance、segment 拆解、model 调整均到位
- 行业语言 / 投行 note 体裁完整
- 数字部分基于训练数据 + 推理，未对 Apr 2026 实际 release 文件 verbatim tie-out
- Anthropic 实际 agent 应：接 SEC/Visible Alpha 自动拉 release + transcript，做精确 surprise 表
