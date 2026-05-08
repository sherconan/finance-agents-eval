# Case 3 · 失败 case · 全空 .xlsx

**Agent**: valuation-reviewer
**Run date**: 2026-05-08
**Input**: 用户错传了一个 only-headers 的 Excel 模板（A1:F1 只有列名，其他全空）
**Took**: 5s

---

## Agent 行为追踪

```
[T+0s]  Load workbook → openpyxl: 4 sheets, 1 active
[T+1s]  Extract formula graph → 0 formulas detected
[T+2s]  Run sanity rule book → all NaN, no value cells
[T+3s]  Decision tree: empty workbook detected
[T+5s]  Output: "no formulas found" + suggest user re-upload
```

## 输出

> ⚠️ **Workbook empty / no model found**
>
> 检测到上传的 Excel 文件结构存在但所有数据 cell 均为空。
>
> 可能原因：
> 1. 你上传的是模板文件而非填好假设的版本
> 2. 模型实际在另一个文件里
> 3. 数据 sheet 隐藏或锁定
>
> **请重新上传**含具体假设和公式的版本。如确认这是要审的模型，请说明设计意图（例如"这是 DCF 框架待我填假设"）以切换到 template-review 模式。

## Failsafe 评价

✅ **未幻觉**：没有编造 "Issue #1: g > WACC" 这种典型问题清单
✅ **快速 fail**：5 秒就识别出 empty state，没浪费 compute
✅ **建设性**：给了 3 个可能原因 + actionable next step
⚠️ **次级缺失**：没建议用户运行 model-builder 先生成 baseline 模型（cross-agent 协同盲点）

## 总评

边界场景处理 quality high，符合"宁可拒绝处理也不编造结论"的 valuation reviewer 应有 character。

**Score**: 8.0 / 10
**Verdict**: Failsafe 可靠，但缺 cross-agent 协同建议
