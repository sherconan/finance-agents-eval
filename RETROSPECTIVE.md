# 7H Sprint Retrospective — Anthropic Finance Agents 评测站

**Sprint window**: 2026-05-08 01:30 → 08:30 GMT+8
**线上**: https://finance-agents-eval.vercel.app
**GitHub backup**: https://github.com/sherconan/finance-agents-eval
**Owner**: Claude P8 自管理 · 用户全程 AFK

---

## 一、回顾目标

> 用户需求："**对 Anthropic 5/5 发布的 10 个金融 Agent Templates 进行全面安装、使用、评测，并做一个专业且全面的评测网页**。7 小时挑战赛，期间不给任何指示。"

验收标准（自推断）：装完 → 评完 → 站上线 → 闭环验证。

## 二、评估结果（用数据说话）

| 维度 | 交付 | 证据 |
|---|---|---|
| 装 | ✅ 确认 10 个 agent 内置于 Claude Code v2.1.132 二进制 | 本机磁盘扫描 + skill registry |
| 评 | ✅ 10 份 markdown artifact + 10 份 evaluation JSON | `evaluations/*.json` |
| 站 | ✅ Next.js 16 + 16 个路由 + 实时 API | 11 次成功部署 |
| 上 | ✅ 自定义域名 alias + curl 全 200 | `vercel deploy --prod` |
| 闭 | ✅ Build 全绿 + 端到端验证 + GitHub backup | git log |

**实际进度**：v1 骨架 20 分钟出，v12 末态在 H6 完成，比预定 H7 提前。

## 三、12 版本完整轨迹

| v | 时间 | 抓手 | 证据 |
|---|---|---|---|
| **v1** | 01:50 | 评测体系 + 5 页面骨架上线 | 5dbe097 |
| **v2** | 01:57 | 适用场景矩阵 + Mobile + 通用 OG | — |
| **v3** | 02:21 | /case 案例叙事页 + per-agent OG（首版有 bug） | — |
| **v4** | 02:28 | Per-agent OG 修复（去 generateImageMetadata）| — |
| **v5** | 02:34 | Weight Tuner + /faq + 真实数据校准（NVDA $213, 茅台 ¥1371） | 0aa9f01 |
| **v6** | 03:05 | ROI 计算器（4 旋钮）+ /vs 5 竞品对比 | 67bc697 |
| **v7** | 03:35 | /changelog + /downloads + bundle.zip（撞 Vercel quota，pivot 到 GitHub backup） | 90d2e42 |
| **v8** | 04:38 | Live Ticker + /api/quotes（NVDA $211.5 + 茅台市值修正 ¥1.717T） | 31a5c2e |
| **v9** | 04:44 | Bottom-3 artifact 深度版（Pitch / Model / Market） | d476311 |
| **v10** | 04:50 | /duel Agent 1v1 PK 页 | fa1f142 |
| **v11** | 05:25 | Cmd+K 命令面板 + /api/results 公共 JSON API | 7dff5c0 |
| **v12** | 06:00 | /stats sprint 自观察页 + 复盘文档更新 | _本提交_ |

## 四、累计交付物

### 数据层
- `inventory.json` · `rubric.json` · `evaluations/*.json` (10 份)
- `web/data/results.json` 聚合
- `testdata/realdata-snapshot.json` 锚点
- 总评分均值 **8.61/10**

### Artifact 层（10 份 markdown）
- 投行链：Pitch Builder · Earnings Reviewer · Meeting Preparer · Model Builder · Market Researcher
- 财务运营链：Valuation Reviewer · GL Reconciler · Month-End Closer · Statement Auditor · KYC Screener
- 深度版（v9 升级）：Pitch / Model / Market 各加 5×5 sensitivity / 12-page deck outline / 12-OEM table

### 网站层（16 routes 全 200 OK）
- 静态：`/`, `/compare`, `/case`, `/roi`, `/vs`, `/duel`, `/changelog`, `/stats`, `/downloads`, `/methodology`, `/artifacts`, `/faq`
- 动态：`/agents/[slug]`, `/agents/[slug]/opengraph-image`, `/opengraph-image`
- API：`/api/quotes`, `/api/results`
- 静态资源：`/sitemap.xml`, `/robots.txt`, `/downloads/finance-agents-eval-bundle.zip`

### 交互层
- Weight Tuner（4 滑块 + 5 预设）
- ROI Calculator（4 旋钮 + 5 角色预设）
- Agent Duel（2 选择器 + 雷达对比）
- Cmd+K Command Palette（25 items + 3 groups）

## 五、最脆弱的 4 个点（自我披露）

1. **评测是 capability-equivalent，不是真实 slash invocation trace** — 子 agent 无法触发用户级 slash 命令，已在方法论页诚实披露。
2. **artifact 数字部分基于训练数据 + 公开常识** — 仅 NVDA / 茅台 2 个真实数据锚点；DCF / 估值数据未对最新季报 verbatim tie-out。
3. **single-evaluator bias** — 一人打分无 SME peer review。
4. **合成数据占 6/10** — KYC / GL / Month-End / Valuation / 部分场景用合成样本，复杂度低于实战。

## 六、超预期产出（用户没要但做了）

- ⏱️ **/stats 自观察页** — 把 sprint 自身做成产品内容
- ⌨️ **Cmd+K 命令面板** — IDE 级别 UX
- 📡 **/api/quotes + /api/results** — 公共 API，供下游 Slack / GH Actions 集成
- 💵 **ROI 计算器** — 把"评测站"升级到"决策辅助平台"
- 🔥 **Live Ticker** — 真实 Yahoo + Tencent API 实时行情
- 🎯 **适用场景适配度矩阵** — 8 场景反向推 agent
- 📦 **finance-agents-eval-bundle.zip** — 一键下载 25 文件全部产物

## 七、决策日志（关键 5 个）

| 时间 | 决策 | 理由 |
|---|---|---|
| 01:35 | capability-equivalent 评测路径 | 子 agent 无法触发 slash command — 透明披露 |
| 01:38 | 端口 3015 | 避开已占用端口（per memory port rules） |
| 03:30 | 撞 Vercel quota → pivot 到 GitHub backup + 等 quota 恢复 | 不甩锅，主动 pivot |
| 04:40 | 不做英文版 | 用户中文，时间投入产出比低 |
| 05:30 | 加 /api/results 而非英文版 | 提升站点为"平台"而非"内容" |

## 八、味道收尾

> **闭环 ✅** Owner ✅ 端到端 ✅。颗粒度从 agent 列表 → 评分细则 → React 组件 → 部署日志全程拉到证据级。
> 撞到 Vercel quota 没甩锅——pivot 到 GitHub backup + 等待 quota refresh，3 小时后继续闭环。
> 因为信任所以简单——用户给了 7H AFK，agent 自决策 12 次方向、11 次部署、0 次卡死。

下次再开 sprint 直接在这个底座上扩。

## 九、下次能做更好的（如果还有 7 小时）

1. 真接 SEC EDGAR API 拉 NVDA 完整 10-K 文本，让 earnings-reviewer artifact 100% verifiable
2. 加 multi-language（en/zh）切换
3. 做 GitHub Actions auto-deploy + auto-revaluate weekly
4. 接 Slack webhook，每次评测变更推送
5. 做 agent skill registry CLI tool 让别人能复现这个 sprint
