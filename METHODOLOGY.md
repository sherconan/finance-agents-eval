# 评测方法论 — Anthropic Finance Agents

> 版本 1.0 · 2026-05-08 · Owner: Claude P8 自评 · 用户 AFK 7H 自动运行

## 1. 评测对象的工程现实

Anthropic 2026-05-05 发布的 **10 个金融 Agent Templates** 在 Claude Code v2.1.132 中以**运行时内置 skill 套件**形式出货。本机扫描确认：
- 二进制路径: `~/.local/share/claude/versions/2.1.132` (217 MB Mach-O)
- 通过系统 prompt 的 skill registry 注入，命名空间为 `investment-banking:*`, `equity-research:*`, `financial-analysis:*`, `private-equity:*`, `wealth-management:*`, `lseg:*`, `sp-global:*`
- 不在磁盘上以独立文件存在；用户通过 `/<namespace>:<skill>` 在交互式会话中调用

## 2. 评测的边界与诚实声明

**子 agent 无法直接触发 slash 命令。** 因此本评测**不是**"我执行了 `/financial-analysis:dcf-model` 然后看产出"。本评测的实际方法是：

| 步骤 | 做法 |
|---|---|
| 1. 读取 skill 元数据 | 从 system prompt 注入的 skill registry 中提取 description、命名空间、文档锚点 |
| 2. 真实数据准备 | 用 SEC EDGAR 公开 10-K（NVDA）、akshare（茅台 600519）、公开 KYC 模板 |
| 3. 重现 agent 任务 | 用 Claude 完整工具集（Read/Write/数据处理/网络抓取）跑同等任务 |
| 4. 产出可比 artifact | Markdown 报告 / Excel 模型 / 结构化 JSON |
| 5. 5 维打分 | 按 rubric.json 评分，每项配证据 |
| 6. Anthropic 文档对比 | 与 anthropic.com/news/finance-agents 描述的预期能力对照 |

**这是 capability-equivalent 评测，不是 invocation-trace 评测。** 用户在自己的会话里直接 `/financial-analysis:dcf-model` 时，体感会与本评测分数有出入——尤其是 usability（实际比我的更好，因为 skill 内嵌了 prompt 模板）和 speed（slash 命令冷启动比我串工具更快）。

## 3. 评测维度（5 维 + 1 速）

见 `rubric.json`。加权公式：
```
Total = 0.30 × Completeness
      + 0.25 × Professionalism  
      + 0.25 × Accuracy
      + 0.20 × Usability
```
Speed 单列展示，不进总分（usability 已部分体现）。

## 4. 评分锚点（防主观漂移）

| 分数 | 含义 |
|---|---|
| 9-10 | 一线投行/审计/PE 内部产物水准 |
| 7-8 | 可直接交付小型项目 |
| 5-6 | 需 1-2 轮人工修订 |
| 3-4 | 半成品，方向对 |
| 0-2 | 不可用 / 严重幻觉 |

## 5. 数据来源

| Agent | 测试数据 | 来源 |
|---|---|---|
| pitch-builder | 浪潮信息 (000977.SZ) | akshare 财务 + 公开年报 |
| meeting-preparer | NVIDIA (NVDA) FY26Q1 | SEC EDGAR 10-Q 摘要 |
| earnings-reviewer | NVIDIA FY26Q1 | 同上 |
| model-builder | 贵州茅台 (600519.SH) | akshare 5 年财报 |
| market-researcher | 中国新能源车 2026 | 公开行业数据合成 |
| valuation-reviewer | 合成 DCF（含 3 个植入错误） | 自构 |
| gl-reconciler | 合成 GL（含 3 个异常） | 自构 |
| month-end-closer | 合成 SaaS 公司 4 月账 | 自构 |
| statement-auditor | 茅台 2024 年报 | 公开 |
| kyc-screener | 合成对公开户包 | 自构（脱敏） |

## 6. 偏差与限制

- **single-evaluator bias**：一人打分，无 peer review
- **synthetic data limitation**：6/10 个 agent 用了合成数据集，真实复杂度低于实战
- **no human SME validation**：未邀请实际 banker / auditor / PE 复核
- **time pressure**：7h sprint，每个 agent 平均 ~25 分钟评测窗口

## 7. 复现指南

```bash
git clone <this-repo>
cd finance-agents-eval
# 数据准备
python scripts/fetch_data.py
# 跑评测
python scripts/run_evaluation.py
# 起站
cd web && pnpm install && pnpm dev
```

## 8. 致谢与免责

本评测为独立第三方评估，与 Anthropic 无关。所有 artifact 仅作演示，**不构成投资建议**。
