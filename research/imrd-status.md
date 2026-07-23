# IMRD 完成状态 · Reframe Destiny

**更新：** 2026-07-20  
**数据：** 收集已于 **7/19** 关闭 · **N=19** 配对 · **5** 访谈已写入 tex  
**课程对照：** [Week 7](https://course.lawted.tech/week7) · [Week 7-2](https://course.lawted.tech/week7-2) · [Week 8](https://course.lawted.tech/week8)

---

## IMRD 进度

| 部分 | 状态 | 文件 | 备注 |
|------|------|------|------|
| **I** Introduction + Lit Review | ✅ 完成 | `reframe-destiny-apa7.tex` L40–69 | RQ + Hypothesis 已钉死 |
| **R** Results | ✅ 初稿 | `reframe-destiny-apa7.tex` | N=19 · 访谈主题 · 可选加 Court 编码表 |
| **M** Method | ✅ 锁定 | `reframe-destiny-apa7.tex` L71–109 | 招募：同学/微信/小红书 · 7/19 关收 |
| **D** Discussion | ✅ 已同步 N=19 ΔM | tex | — |
| **访谈 5 题** | ✅ | `research/interview-questions.md` | 从完成后测者抽 5 人 |
| **Abstract** | ✅ | tex abstract | 与 N=19 + 访谈一致 |
| **答辩 PPT** | 🟡 | `ppt/reframe-destiny-defense-en-full.html` | Slide 1 全屏 demo · Findings 已更 N=19 |
| **论文工作流** | ✅ | `paper-workflow.md` | 工具链 + 7/21 顺序 |
| **References** | ✅ | `bibliography.bib` | 提交前再 Scholar 核实 |
| **Limitations** | ✅ 在 Discussion | tex | — |
| **AI disclosure** | ✅ | tex Method 末段 | 已写入 |

---

## 还没写完 / 待补

| 项 | 优先级 | 动作 |
|----|--------|------|
| **Overleaf PDF** | P0 | 编译上传飞书 7/21 12:00 |
| **Grammarly 一遍** | P0 | Abstract / Method / Discussion |
| **海报** | P0 | RQ · Method · ΔM · QR |
| **PPT 导出 PDF** | P0 | Chrome 打印 HTML deck |
| **Results · Court 编码表** | P2 | 8 条法庭句主题（可选表格） |
| **推断统计** | P2 | 终稿可选 paired t-test |
| **reframe-destiny-paper-en.md** | P2 | 与 tex 同步 |

---

## 网站 Bug 修复（国内站）

| Bug | 状态 | 说明 |
|-----|------|------|
| 八字解读显示 `undefined` | ✅ 本地已修 | `reading-engine.js` 用 `traitText()` 取 `trait.zh.*`；需 push 部署到 pages.dev |
| 知情同意 Skip 按钮 | ✅ 本地已修 | 已删 consent-skip；同意后直达首页 |
| embedded 模式闪屏 | ✅ 本地已修 | `embedded-boot` CSS + app.js |

---

## 数据一句话（2026-07-18）

**119 行 → 去重 76 行 → 34 session → 23 journey → 19 完整配对**

| 指标 | pre M±SD | post M±SD | ΔM |
|------|----------|-----------|-----|
| bias_awareness | 3.74±1.05 | 4.05±0.97 | +0.31 |
| reframe_confidence | 3.79±0.98 | 4.26±0.81 | +0.47 |
| gender_lens | 3.37±1.26 | 3.68±1.25 | +0.31 |
| personal_agency | 4.74±0.73 | 4.63±1.01 | −0.11 |
| spot_stereotypes | 4.32±0.89 | 4.32±1.00 | 0.00 |

旅程：占星 13 · 八字 10 · 命运法庭有文字 8/23

---

## 安全核对 ✅

| 项 | 状态 |
|----|------|
| `DEEPSEEK_API_KEY` 仅在 Vercel env / `api/chat.js` | ✅ |
| Supabase 无 PII / 无生辰入库 | ✅ |
| 论文 AI disclosure | ✅ 已写入 Method |
