# Reframe Destiny · 数据备份与清洗报告

**导出时间：** 2026-07-05  
**数据源：** Supabase `public.research_submissions`（项目 reframe-destiny）  
**总行数：** 28 行

---

## 本地文件

| 文件 | 说明 |
|------|------|
| `research_submissions_raw_backup_2026-07-05.csv` | 原始备份（与数据库字段一致） |
| `research_submissions_analyzed_2026-07-05.csv` | 原始 + **备注 / 清洗标记 / 清洗分类 / 清洗分类说明** |

路径：`research/data/exports/`

---

## 八类清洗参考框架（Lawted 课堂 · 数据清洗）

| 代码 | 分类 | 典型处理 |
|------|------|----------|
| **C1** | 测试/开发者数据 | **剔除** — 不能当真实被试 |
| **C2** | 重复提交 | **剔除重复行** — 同 session 同类型保留最早一条 |
| **C3** | 流程不完整 | **复核或剔除** — 只有前测、没有后测/旅程 |
| **C4** | 非主研究路径 | **剔除** — archive_reflection、旅人侧栏等 |
| **C5** | 缺少前后测配对 | **复核** — 有 journey 但无 pre，无法算变化 |
| **C6** | 极端/同分作答 | **复核** — Likert 五题全 1 或全 5，需说明是否 straight-lining |
| **C7** | 无效开放文本 | **复核** — 产品反馈、旅人对话，非 Court 研究回答 |
| **C8** | 早期未接问卷批次 | **复核** — 无 session_id，无法与 pre/post 链接 |

---

## 汇总

| 清洗标记 | 行数 | 含义 |
|----------|------|------|
| **保留** | 2 | 可直接纳入描述统计 |
| **复核** | 14 | 可用但需在论文 Methods/Limits 里说明 |
| **剔除** | 12 | 不进入 pre/post 主分析 |

---

## 目前唯一能写 pre/post 的 session（清洗后）

| session_id | 前测 | 旅程 | 后测 | 建议 |
|------------|------|------|------|------|
| `cf864e58-…` | ✓ | ✓ | ✓ | **复核**：前后测均为全 5 分，可能是开发者试跑；若确认非被试则剔除 |
| `f223e82e-…` | ✓（去重后 1 条） | ✓（开发者评语） | ✓ | 旅程行剔除；前后测可单独报告但样本 N=1 |
| `57c88354-…` | ✓（去重后 1 条） | ✗ | ✗ | **C3 不完整** — 仅前测，全 1 分，未进入分析 |

**结论：** 真实可用配对样本目前 **≈ 0–1**，与 Week 7 课堂「全班 N≈0」一致。论文 Results 仍应写 placeholder；继续招募 15–25 人。

---

## 逐类发现（为什么要洗）

### C1 · 测试/开发者数据（剔除 6 行）
- 6 条 `journey_complete` 的 `reflection_text` 为 `React version scaffold: anonymous research submission wiring check.`
- **原因：** 这是你（或 Cursor）在 React 版点「测试提交」产生的，不是参与者数据。纳入会虚增 N。

### C2 · 重复提交（剔除 3 行）
- session `f223e82e…` 有 **3 条完全相同**的 `survey_pre`（同一秒双击）。
- session `57c88354…` 有 **2 条**相同 `survey_pre`。
- **原因：** 重复行会重复计数，paired t-test / 均值会偏。

### C4 · 非主研究路径（剔除 3 行）
- 3 条 `archive_reflection`（个人档案 / 旅人对话）。
- **原因：** 不在「同意 → 前测 → 旅程 → 后测」设计内，不能当前后测样本。

### C8 · 早期批次（复核 10 行 journey）
- 2026-06-28 凌晨 10 条 `journey_complete` **无 session_id**。
- **原因：** 当时前测/后测尚未绑定 session，无法与 Likert 配对；可作探索性 journey 日志，**不进 pre/post 主表**。

### C7 · 无效开放文本（复核 1 行）
- `很迷 cursor你改完怎么还变差了呢` — 产品反馈，非偏见反思。
- **原因：** 主题编码会污染「命理性别话语批判」类目。

### C6 · 同分作答（复核若干）
- 多条 survey 全 1 或全 5。
- **原因：** 可能是真实基线/天花板，也可能是没看题；论文里要报告并说明处理方式（保留但标注 / 敏感性分析）。

---

## 下一步（你要做的）

1. 打开 `research_submissions_analyzed_2026-07-05.csv` 检查「备注」列，有异议的行改标记后另存 `…_manual.csv`。
2. 继续招人跑 **完整流程**（同意 → 前测 → 旅程 → 后测），目标 15–25 完整 session。
3. 新数据进来后，在 Supabase Dashboard 再导出，或让我重新跑备份脚本。

---

## 重新导出命令（以后用）

在 Cursor 里让 agent 执行 Supabase MCP：

```sql
SELECT * FROM public.research_submissions ORDER BY created_at;
```

或本地（需 service role / dashboard CSV export）。
