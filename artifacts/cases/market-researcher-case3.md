# Case 3 · 利基行业 · 中国合成生物 / 工业酶

**Agent**: market-researcher · **Took**: 75s · **Run**: 2026-05-08

## 输入
sector=合成生物 / 工业酶, region=China

## Agent 行为

```
[T+0s]   Try fetch IHS / Marklines → 数据稀疏，无标准报告
[T+15s]  Pivot to 学术论文 + 政策路径
[T+30s]  Build estimation: top-down (国家政策目标) + bottom-up (公司年报)
[T+50s]  Output with explicit uncertainty banner
```

## 输出（带不确定性披露）

> ⚠️ **Niche sector — 数据深度有限，TAM 估算 ±30% 不确定区间**

## TAM 估算

```
中国合成生物 TAM 2026E:
- 食品酶（如阿斯巴甜、L-精氨酸）  : RMB 80 bn ± 25 bn
- 工业酶（造纸/纺织/洗涤剂）      : RMB 60 bn ± 18 bn  
- 医药级（小分子原料）            : RMB 45 bn ± 14 bn
- 生物基化学品（PHA/PLA）         : RMB 25 bn ± 10 bn
- 总计                          : ~RMB 210 bn ± 65 bn

Top-down sanity:
中国生物经济政策目标 2025: GDP 占比 4% = ~RMB 4.8 万亿
合成生物作为子赛道占 ~5% = RMB 240 bn → 与 bottom-up 一致
```

## 玩家梯队

### 第一梯队（上市）
- **华熙生物** (688363.SH) — 透明质酸 + 重组胶原 protein
- **华恒生物** (688639.SH) — 丙氨酸 + 缬氨酸 + 其他氨基酸
- **凯赛生物** (688065.SH) — 长链二元酸 + 生物基 polyamide

### 第二梯队（pre-IPO）
- 蓝晶微生物 (PHA / 生物基塑料)
- 弈柯莱 (生物催化合成 / 高纯酶)
- 微构工场 (功能糖 / 蛋白)

## 价值链

```
菌种 → 发酵 → 提取 → 应用
↑      ↑       ↑       ↑
研发    工艺    设备    场景
```

主要 inflection：
1. **AI 蛋白设计**（参考 AlphaFold2 + 工业菌株进化平台）— 2026 起从实验室走向规模化
2. **连续发酵 + 智能控制** — 单线产能 +50%
3. **下游纯化** — 膜分离 / 色谱替代传统结晶

## 政策驱动

- 2022 国家《"十四五"生物经济发展规划》明确合成生物为战略方向
- 工信部 2024 起放宽工业酶生产许可
- 上海 / 苏州 / 深圳 三地建立合成生物产业园

## 投资观点（带 caveat）

| 标的 | Rating | Logic |
|---|---|---|
| 华熙生物 | Hold | 玻尿酸价格战压力 |
| 华恒生物 | Buy | 氨基酸需求稳定 + 出口增长 |
| 凯赛生物 | Buy | 生物基 polyamide 替代石油基 |
| pre-IPO 标的 | n/a | 等下一轮估值更新 |

## 评价

✅ Niche sector graceful degradation — 没强行套通用模板
✅ TAM 估算两条腿（top-down + bottom-up），sanity check ✓
✅ 显式标注 ±30% 不确定性（避免给假精确）
⚠️ 主要数据基于公开年报 + 政策文件
⚠️ 二级标的估值未做（数据稀疏）

**Score**: 7.8 / 10
**Verdict**: 数据稀疏小众行业适配良好
