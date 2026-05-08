# Case 2 · 制裁命中真阳性 · 拒绝开户 + SAR 触发

**Agent**: kyc-screener · **Took**: 45s · **Run**: 2026-05-08

## 输入
新加坡某公司对公开户申请，UBO 之一名为 "Ibrahim Al-Khansaa"，列出业务为大宗商品贸易。

## Agent 行为

```
[T+0s]  ID verify → 护照 OK / 公司注册 OK
[T+5s]  Sanctions screen via World-Check
        - OFAC SDN list match: 'Ibrahim Al-Khansaa' (DOB 1972-03-15, Syrian national)
        - Confidence: candidate match
[T+10s] Cross-check 3 fields:
        - Name: identical ✓
        - DOB: 1972-03-15 = SDN listed = match ✓
        - Nationality: SY = SDN listed = match ✓
[T+15s] **真阳性**: 三因素全对
[T+25s] Trigger refusal + SAR pathway
[T+45s] Output: structured refusal + audit trail
```

## 输出（Refusal Mode）

> 🛑 **客户拒绝开户 — 制裁命中真阳性**

### Hit Summary

| 数据点 | 客户提供 | OFAC SDN | Match |
|---|---|---|:-:|
| Full name | Ibrahim Al-Khansaa | Ibrahim Al-Khansaa | ✅ |
| Date of birth | 1972-03-15 | 1972-03-15 | ✅ |
| Nationality | SY | SY | ✅ |
| Listing program | n/a | SDN (Syria-related) | — |
| Listing date | n/a | 2018-04-12 | — |
| Listed reason | n/a | Material support to designated terrorist org | — |

### 立即动作（合规口径）

1. ❌ **拒绝开户** — 不接受任何 KYC 文件，不进入下一步流程
2. 📝 **SAR (Suspicious Activity Report) 提交** — 24h 内向 STRO（新加坡反洗钱办公室）报送
3. 🔒 **冻结**任何已 deposit 资金 + 通知 correspondent bank
4. 🗂 **保留 audit trail 5 年**：含 World-Check 结果截图 + 三因素验证记录 + 决策时间戳
5. 📧 **告知申请人**：仅给 generic refusal letter（不披露具体 reason，避免 tipping-off）

### Internal Escalation Path

```
KYC Officer → AML Manager → MLRO (Money Laundering Reporting Officer)
                              ↓
                        STRO 报送 + 内部记录
                              ↓
                        Correspondent banks 通报
```

### 客户告知模板

> "We regret to inform you that we are unable to proceed with your account application
>  at this time. This decision is final and we are not able to provide additional details
>  due to applicable confidentiality regulations."

（避免 tipping-off — 不能透露是因为 sanctions 命中）

## 评价

✅ 三因素 cross-check（name + DOB + nationality）正确，未轻易判定 false positive
✅ SAR 流程触发 + correspondent banks 通报
✅ Tipping-off 风险规避（拒绝信不披露原因）
✅ Audit trail 保留 5 年（监管要求）
✅ 内部 escalation path 正确（不能 KYC officer 直接报送）
⚠️ 没自动跑 secondary screening（关联公司 / 已知亲属）— 应主动扫一遍是否有连带风险

**Score**: 9.5 / 10
**Verdict**: 高风险场景的应对几乎无可挑剔
