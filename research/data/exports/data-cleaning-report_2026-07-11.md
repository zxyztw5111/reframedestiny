# Reframe Destiny · 数据清洗报告

**导出时间：** 2026-07-11  
**数据源：** Supabase `public.research_submissions`（项目 reframe-destiny）  
**原始行数：** 31 行（正式收集窗口：2026-07-11）

**预写规则（收数前已定，见 `data-cleaning-report_2026-07-05.md` C1–C8）：**

1. **C1** 开发者/联调测试行 → 剔除  
2. **C2** 同 `session_id` + 同 `submission_type` 重复提交 → 保留最早一条  
3. **C3** 流程不完整（仅有 pre、无 journey）→ 不进入 pre/post 配对分析，但可报告漏斗  
4. **C4** `archive_reflection` 等非主路径 → 剔除  
5. **C6** Likert 五题全同分 → 标注复核，单条不剔除  
6. **C7** 开放文本为产品反馈而非 Court 反思 → 复核  

*All exclusion criteria were defined before data collection and were not modified after examining the results.*

---

## 汇总

| 阶段 | 数量 |
|------|------|
| 原始提交行 | 31 |
| C2 重复行剔除 | 11 |
| 去重后有效行 | **20** |
| 独立 session | **11** |
| 完成 journey | **6** (55%, n = 6/11) |
| 完整配对 pre + journey + post | **3** |
| **主分析 N（配对前后测）** | **3** |

---

## C2 · 重复提交（剔除 11 行）

| session_id | type | 原始条数 | 保留 | 剔除 |
|------------|------|---------|------|------|
| `b51e8681…` | survey_pre | 2 | 1 | 1 |
| `921559e9…` | survey_pre | 6 | 1 | 5 |
| `c0636beb…` | survey_pre | 3 | 1 | 2 |
| `8ca49508…` | survey_pre | 3 | 1 | 2 |
| `77d78ef5…` | survey_pre | 2 | 1 | 1 |

---

## 漏斗（去重后 11 session）

| 模式 | sessions | n |
|------|----------|---|
| 仅 pre | 5 | 5 |
| pre + journey，无 post | 3 | 3 |
| pre + journey + post | 3 | 3 |

---

## C6 · 同分作答（复核，未剔除）

| session_id | 说明 |
|------------|------|
| `921559e9…` | pre 五题全 5；完成 journey 但未填 post |
| `d7d473f7…` | post 五题全 5；Court 反思为 normalizing 语气 |
| `40061581…` | 仅 pre，五题全 5 |

---

## 主分析样本（N = 3 配对）

| session_id | system | bias_ids | Court 反思主题 |
|------------|--------|----------|----------------|
| `b51e8681…` | astrology | romancecurse, procreate, doomed | 认同 AI 权威 |
| `d7d473f7…` | astrology | chastity, genderrole, fatalism | 偏见正常化 |
| `b1738a72…` | astrology | submissive, marriage, kefu | （空） |

---

## Likert 描述统计（N = 3，配对样本）

| 指标 | Pre M (SD) | Post M (SD) | Δ M (SD) |
|------|------------|-------------|----------|
| bias_awareness | 3.33 (1.15) | 4.33 (1.15) | +1.00 (0.00) |
| reframe_confidence | 2.67 (0.58) | 3.67 (1.15) | +1.00 (1.00) |
| gender_lens | 3.33 (1.15) | 4.00 (1.00) | +0.67 (0.58) |
| spot_stereotypes | 4.00 (1.00) | 4.33 (1.15) | +0.33 (0.58) |
| personal_agency | 4.00 (1.73) | 3.67 (2.31) | −0.33 (0.58) |

---

## Journey 层描述（N = 6）

- **系统：** astrology 4，bazi 2；全部 `traditional` lens  
- **最常选 bias tag：** xianqi (2), genderrole (2), chastity (2)  
- **有 Court 反思文本：** 2/6  
- **Scanner 均值最高维：** heteronormativity (M = 0.74), moral judgment (M = 0.72)

---

## 与计划样本差距

- 计划 N = 15–25 完整配对；当前 **N = 3**  
- 需继续招募；论文 Results 使用真实数字 + 明确小样本局限  
- 推断统计（t-test、p 值）暂不报告

---

## 本地文件

| 文件 | 说明 |
|------|------|
| `data-cleaning-report_2026-07-11.md` | 本报告 |
| `data-cleaning-report_2026-07-05.md` | 上一轮清洗（28 行，已清空后重收） |
