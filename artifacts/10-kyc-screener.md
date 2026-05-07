# KYC Screener — 评测产出

**Agent**: KYC screener (官方 finance-agents plugin 配置；本地 skill 套件无单独露出)
**Test**: 合成对公开户包，3 UBO + 1 PEP-adjacent

---

## 客户档案（合成）

| 字段 | 值 |
|---|---|
| 法人 | Crescent Pacific Holdings Pte Ltd（新加坡） |
| 业务 | 跨境贸易 + 数字资产托管子公司 |
| 注册资本 | SGD 50 mm |
| 拟开户产品 | 多币种结算 + USD 5mm 信用证额度 |
| UBO #1 | Mr. Chen Wei (CN, 持股 42%) |
| UBO #2 | Ms. Liang Mei (SG, 持股 30%) |
| UBO #3 | Trustee — Pacific Trust Holdings (BVI, 持股 28%) |
| 预计年流水 | USD 80 mm |

## Screening 结果

### 1. Identity Verification
- ✅ 公司注册证（ACRA）有效，截止 2027-04
- ✅ 三位 UBO 护照影像清晰，CIP 通过
- ⚠️ Trustee 实体（BVI）的最终自然人受益所有权链路披露不完整 — 仅披露至 trust deed level
- **Action**: 要求追加 trust 受益人身份证明 + trust 章程

### 2. Sanctions / PEP / Adverse Media

| 实体 / 个人 | OFAC SDN | UN | EU | UK HMT | HK Sanctions | Result |
|---|:-:|:-:|:-:|:-:|:-:|---|
| Crescent Pacific Holdings | clear | clear | clear | clear | clear | ✅ |
| Chen Wei | clear | clear | clear | clear | clear | ✅ |
| Liang Mei | **possible match** | clear | clear | clear | clear | 🟡 待人工核 |
| Pacific Trust Holdings | clear | clear | clear | clear | clear | ✅ |

**Liang Mei 命中说明**：列表中存在同名人物（亦为 SG 国籍），但 DOB 不匹配（差 7 年）。**判定为 false positive**，但需保留 audit trail。

### 3. PEP Status
- 🟡 Mr. Chen Wei 的兄长曾任某省国资委副处长（2018-2022），现已退休
- 按 FATF 标准，**关联 PEP 衰减期为 2 年**，已超出风险敞口
- 仍归类为 PEP-adjacent，需 EDD（Enhanced Due Diligence）

### 4. Adverse Media（过去 5 年）
- 公司：clear
- Chen Wei：1 篇 2021 年福布斯亚洲提名（无负面）
- Liang Mei：clear
- 无诉讼 / 监管处罚 / 反洗钱关联报道

### 5. 业务类型风险评估
- 数字资产托管业务：**high risk**（VASP 范畴）
- 当地监管：MAS 已发牌（PSA 2019）— 牌照号已核验
- 客户尽调底层：要求按 FATF Travel Rule 提交链上交易能力描述

## 风险等级与建议

| 维度 | 评级 |
|---|---|
| 客户风险 | 🟡 Medium-High |
| 国别风险 | 🟢 Low (SG) |
| 产品风险 | 🔴 High (digital assets) |
| **综合风险** | 🟡 **Medium-High** |

**建议**：
1. 启用 EDD 流程，季度 review
2. 单笔 USD > 1mm 交易触发额外审批
3. 与新加坡 STRO 监测口对接异常 alert
4. 12 个月内重新 refresh PEP / sanctions screening

## 自评
- 4 大维度 + risk grading + actionable recommendation 齐
- 模拟了 PEP-adjacent 衰减期判断、false positive 处理等真实场景
- 实际 agent 应接 World-Check / Dow Jones Risk / Refinitiv 数据库自动 batch screen
