# Case 2 · 美国 GPU / AI 算力链 sector primer

**Agent**: market-researcher · **Took**: 60s · **Run**: 2026-05-08

## 输入
sector=US AI compute, focus=训练 vs 推理切换 + ASIC 自研

## TAM / 增速

| | 2023 | 2024 | 2025E | 2026E | 2027E | 2028E |
|---|---:|---:|---:|---:|---:|---:|
| 全球 AI 加速器 TAM ($b) | 90 | 180 | 300 | 450 | 580 | 700 |
| 训练 share | 75% | 70% | 60% | 50% | 42% | 35% |
| 推理 share | 25% | 30% | 40% | 50% | 58% | 65% |
| Hyperscaler 自研 ASIC 渗透 | 5% | 10% | 18% | 28% | 38% | 48% |

## 玩家梯队

### 第一梯队（独立 GPU 巨头）
- **NVDA** — Blackwell ramp，~85% 训练 share，~75% 总 share；网络业务（Spectrum-X / NVLink）+30% YoY
- **AMD** — MI350/400 系列，价位低 30-40%，inference cost 优势

### 第二梯队（Hyperscaler 自研 ASIC）
- **GOOG TPU v6/v7** — Gemini 训练 + 对外 GCP 售卖，2026 share 估 ~12%
- **AMZN Trainium 3 / Inferentia 3** — Anthropic 大单 + AWS Bedrock，share ~6%
- **META MTIA** — 内部 ranking + recommend，无对外销售
- **MSFT Maia** — 自家 Azure OpenAI 数据中心，share ~3%

### 第三梯队（其他）
- **AVGO + Marvell** — ASIC 设计代工
- **INTC** — Gaudi 3，share < 2%

## 网络 / 互连
- 800G InfiniBand / Spectrum-X 主流
- NVLink fabric 跨柜（GB200 NVL72）
- Ethernet for AI (SONiC) 兴起

## CapEx 总盘子（2026E）

| | 2024 实际 | 2025E | 2026E |
|---|---:|---:|---:|
| Top 4 hyperscaler capex | $230b | $310b | $380b |
| AI 占比 | 55% | 65% | 70% |
| AI capex 绝对 | $127b | $202b | $266b |

## 投资观点

| 标的 | Rating | Logic | 目标 PE/EV-Sales |
|---|---|---|---:|
| **NVDA** | Buy | Blackwell ramp + sovereign + 网络 | 30× FY27 |
| **AMD** | Buy | inference 价格优势 + MI400 | 35× FY27 |
| **AVGO** | Buy | hyperscaler ASIC 受益 | 25× FY27 |
| GOOG/MSFT/AMZN | Hold | 自研稀释 NVDA share，但本身估值已反映 | n/a |
| INTC | Sell | AI 战略仍未成形 | n/a |

## 风险

- 训练-推理切换比预期快，NVDA training premium 收窄
- ASIC 自研超预期，hyperscaler 减少向外采购
- 中国 export control 进一步收紧（H20 后续 SKU）
- AI capex 周期顶 — 任何 hyperscaler 减速都会传染

## 评价

✅ TAM / 玩家 / 价值链 / 投资观点 / 风险 / 三段式覆盖
✅ ASIC 自研对 NVDA share 影响测算（关键 buy/sell 边界）
⚠️ Capex 数字基于训练时点 + 公开报道
⚠️ 半导体 OEM 价值链（TSMC / SK Hynix HBM 配套）未深入

**Score**: 8.3 / 10
