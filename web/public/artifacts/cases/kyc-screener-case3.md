# Case 3 · 上市公司年度续期 review

**Agent**: kyc-screener · **Took**: 20s · **Run**: 2026-05-08

## 输入
某 NYSE 上市公司「ABC Corp.」（ticker: ABC, mkt cap $12b），2023-05 已开户，2026-05 年度 review 到期。

## Agent 行为：增量更新模式（incremental review）

```
[T+0s]  Pull stored profile (vintage 2023-05)
[T+2s]  Identify changes since last review:
        - 公司基本信息变更？ → No (registered office unchanged)
        - UBO 结构变更？ → No (10-K 反映持股 < 5% 阈值，无新 reportable beneficial owner)
        - 业务范围变更？ → Yes: 新增 AI / cloud 业务子公司
        - 上市状态？ → Yes: NYSE listed, 仍合规
[T+8s]  Increment screening:
        - Sanctions delta vs 2023-05 list: clear
        - PEP delta: clear
        - Adverse media past 12m: 1 篇商业纠纷新闻（已和解）
[T+15s] Compute incremental risk score
[T+20s] Output: continuation recommendation
```

## 输出（Continuation Review Report）

### Status Summary

| 维度 | 2023-05 baseline | 2026-05 review | Δ |
|---|---|---|---|
| 综合风险评级 | Low (1.5/10) | Low (1.7/10) | +0.2 marginal |
| 制裁筛查 | Clear | Clear | unchanged |
| PEP | Clear | Clear | unchanged |
| Adverse media | 0 hit | 1 hit (商业纠纷已和解) | +1 minor |
| Product risk | Standard corporate | + AI/cloud 子业务 | low impact |

### 增量发现

🟡 **新增 AI/cloud 子公司**：
- 子公司从事数据中心 + 机器学习平台业务
- 涉及客户跨境数据流，但已具备 SOC 2 / ISO 27001 认证
- 不显著抬升 KYC 风险

🟡 **Adverse media 1 篇**：
- 2025-09 与某经销商商业纠纷诉讼，已 2026-01 和解
- 金额 < $5M（vs $12b 市值，材性 0.04%）
- 不构成实质性风险信号

### 决策

> ✅ **CONTINUE** — 风险评级 Low 维持
>
> - 续期账户使用资格至 2027-05
> - 下次 review 安排在 12 个月后
> - 单笔 transaction 额度 cap 无需调整

### Self-Audit Sample

随机抽 5 笔过去 12 个月 transaction：
1. ✅ 公开股权融资资金回款 — 标准
2. ✅ 子公司股息分配 — 标准
3. ✅ 海外收购 escrow 释放 — 已审批
4. ✅ 员工 stock option 行权资金 — 正常
5. ✅ 季度税务支付 — 政府机构 receive 端

无异常 pattern。

## 评价

✅ **增量 review 模式** — 不重新跑全套尽调（节省 80% 工作量）
✅ Delta detection 精准（业务变更 / 媒体 / sanctions delta）
✅ Materiality 评估到位（$5M / $12b = 0.04% 不重要）
✅ Self-audit transaction sampling — 随机抽样有助发现 anomaly
✅ 决策 + 续期时间 + 下次 review 时点都明确
⚠️ Adverse media 只看了英文，多语言（中/俄/阿）未覆盖

**Score**: 8.5 / 10
**Verdict**: 续期 review 工作流模板可复用
