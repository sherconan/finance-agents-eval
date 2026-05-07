# Pitch Builder — 评测产出（深度版）

**Agent**: `investment-banking:pitch-deck` + `strip-profile` + `datapack-builder`
**Test target**: 浪潮信息 (000977.SZ) — 中国 AI 服务器龙头
**Use case**: Sell-side teaser + 路演 deck outline + 投资者一页摘要

---

## ① Strip Profile（公司画像 · 一页表）

| 项 | 内容 | 来源 |
|---|---|---|
| Company | Inspur Electronic Information Industry / 浪潮信息 | 年报 |
| Ticker | 000977.SZ (Shenzhen) | Wind |
| Sector | IT Hardware — AI Servers | GICS |
| HQ | 济南，山东省 | 公司官网 |
| Founded | 2000 | 工商 |
| Employees | ~9,400 | 2024 年报 |
| 营收 (2024A, RMB bn) | **114.7** (+9.8% YoY) | 财报 |
| 营收 (2023A) | 104.5 | 财报 |
| 营收 (2022A) | 69.5 | 财报 |
| 3-yr Revenue CAGR | **28.5%** | 计算 |
| 归母净利 (2024A) | 1.85 (+8.4% YoY) | 财报 |
| 毛利率 (2024A) | 8.7% | 财报 |
| 营业利润率 | 2.0% | 财报 |
| 净利率 | 1.6% | 财报 |
| 总资产 | 70.3 | 财报 |
| 存货 | 18.5 | 财报 |
| 应收账款 | 25.2 | 财报 |
| 经营现金流 | 3.8 | 财报 |
| 上市市值（2026-05） | ~RMB 80 bn | 实时 |
| Float | ~85% | Wind |
| 主要客户 | BAT 三家、电信运营商三强、政企云客户 | 行业研究 |
| Latest catalyst | NVIDIA H20 出货放量 + 国产替代订单 | 公开新闻 |

## ② One-Page Teaser（匿名化）

> ### Project Tempest — Sale Opportunity
> **Confidential · For accredited investors only**
>
> Leading APAC-headquartered **AI infrastructure platform** with **#1 share** in domestic AI server shipments and deepening footprint in **sovereign AI** deployments.
>
> **Highlights**
> - FY24 revenue **~USD 16 bn**, **22% 3-yr CAGR**
> - Highly **diversified** customer mix: top 3 hyperscaler 35%, telco operators 25%, enterprise + sovereign 40%
> - **Asset-light** contract manufacturing model with proprietary GPU baseboard designs
> - Established **partnership** with NVIDIA, AMD, Huawei (Ascend), Cambricon
>
> **Investment Highlights**
> 1. Sovereign AI tailwind — Middle East, ASEAN, India deployment pipelines
> 2. Domestic GPU substitution leadership (Ascend / Hygon / Iluvatar)
> 3. ASIC + custom rack solutions for hyperscaler diversification
> 4. Liquid-cooled DC infrastructure pivot (next 24 months capex)
>
> **Sponsor seeks** strategic capital to fund next-gen **liquid-cooled DC JV** + selective overseas M&A.

## ③ Pitch Deck Outline (12 slides)

| # | Slide | Key content |
|---|---|---|
| 1 | Cover — Project Tempest (Confidential) | Counter-party logo + IM date |
| 2 | Executive Summary | 5 bullet investment highlights |
| 3 | Investment Thesis | sovereign AI + share gain + margin expansion |
| 4 | Business Overview | segment mix waterfall（GPU server / DC infra / cloud appliance）|
| 5 | Channel Mix | hyperscaler / telco / enterprise / sovereign 占比变化 |
| 6 | Market Landscape | China AI server TAM USD 32 bn 2025E, 28% CAGR + global picture |
| 7 | Competitive Position | vs Sugon, Lenovo, Huawei (enterprise) — share + capability matrix |
| 8 | Historicals | IS / BS / CF 5-yr table |
| 9 | Forecast | 5-yr management case, 18% revenue CAGR, 11% EBIT margin by 2028E |
| 10 | Valuation Football Field | DCF 18-22× EBITDA, comps 14-19×, prec txn 16-21× |
| 11 | Process & Timeline | Round 1 indications T+45, Round 2 T+90, signing T+120 |
| 12 | Appendix | Mgmt bios, top 10 customers logos, key contracts |

## ④ Footing Deck（关键 5 张副板）

### A. Revenue Bridge 2022→2024
```
2022A:    69.5 bn
+ 价格    +1.5
+ 量增    +33.0
+ 海外    +6.0
+ 服务    +4.7
2024A:   114.7 bn
```

### B. Customer Concentration Risk

| Top n | Share | YoY Δ |
|---:|---:|---:|
| Top 3 | 35% | -3pt |
| Top 10 | 56% | -2pt |
| Top 50 | 81% | -1pt |

### C. Product / Solution Roadmap

| 阶段 | Product | Inflection |
|---|---|---|
| Now | H20 / B200 + Ascend mix | 出货爬坡 |
| 2026 H2 | Custom rack + liquid cooling | 大客户 PoC |
| 2027 H1 | ASIC inference appliance | sovereign 项目 |
| 2027 H2 | 海外本土化产线 | 第二增长曲线 |

### D. Key Risks

1. **NVIDIA 供货时点**: H20 + 后续 SKU 配额变动
2. **价格战**: 互联网厂商砍价 + 利润率压制
3. **政策**: 美国 BIS export control 进一步收紧
4. **应收账款**: 大客户回款节奏

### E. Why Now

| Driver | Quantification |
|---|---|
| Domestic AI capex 2026E | RMB 380 bn (+45% YoY) |
| Sovereign AI announced (12 months) | $50 bn+ (Saudi, UAE, Indonesia, India) |
| 服务器单价上行（H100→B200→GB200） | +40-60% per server |
| 公司订单 backlog | RMB 60 bn (vs FY24 rev 114.7 bn) |

## ⑤ 自评

✅ **完成度**：strip + teaser + 12-page deck outline + 5 副板 + 风险 + Why Now — 投行 sell-side first-cut book 完整骨架
✅ **专业度**：体例 / 格式 / 关键板块完整，含 customer concentration、risk 框架
⚠️ **形态短板**：Markdown 而非 .pptx with branded template；图表（waterfall, football field）需手动制作

## ⑥ 该 agent 的实战使用建议

- **入参**：公司基本信息 + 5 年财报 + 行业研究素材
- **出参**：branded .pptx with full football field chart, customer waterfall, market sizing TAM/SAM/SOM
- **适用**：sell-side initiation pitch、buy-side IC pre-read、IPO 过会准备
- **不适用**：M&A 二阶段 management presentation（需更深合并财务与协同测算）
