# IMRD 完成状态 · Reframe Destiny

**更新：** 2026-07-15  
**课程对照：** [Week 7](https://course.lawted.tech/week7) · [Week 7-2](https://course.lawted.tech/week7-2) · [Week 8](https://course.lawted.tech/week8)

---

## IMRD 进度

| 部分 | 状态 | 文件 | 备注 |
|------|------|------|------|
| **I** Introduction + Lit Review | ✅ 完成 | `reframe-destiny-apa7.tex` L40–69 | RQ + Hypothesis 已钉死 |
| **M** Method | ✅ 锁定 | `reframe-destiny-apa7.tex` L71–109 | 研究 URL 已改为 pages.dev/game；待补最终招募渠道 |
| **R** Results | 🟡 **占位 + 初步描述统计** | `reframe-destiny-apa7.tex` L111–131 | **只报数字，不解释**；N=9 配对（收集中） |
| **D** Discussion | ✅ **已重写** | `reframe-destiny-apa7.tex` L133–165 | 解释做了什么 + 解读初步模式 |
| **Abstract** | ✅ **已按老师范例更新** | tex abstract | 结尾 `[results pending data]` |
| **References** | ✅ | `bibliography.bib` | 提交前再 Scholar 核实 |
| **Limitations** | ✅ 在 Discussion | tex | — |
| **AI disclosure** | ✅ | tex Method 末段 | 已写入 |

---

## 还没写完 / 待补

| 项 | 优先级 | 动作 |
|----|--------|------|
| **Results 终稿数字** | P0 | 招满 15–25 后更新 M/SD/ΔM、系统选择表、偏见标签频次 |
| **Results · Journey 表** | P0 | 13 条 journey 的系统/标签/扫描器分数汇总 |
| **Results · Court 编码** | P1 | 开放句主题编码表 |
| **推断统计** | P1 | N≥15 后 paired t-test / 效应量 |
| **Methods 招募渠道** | P1 | 写明微信/小红书/同学具体表述 |
| **3–5 半结构访谈** | P2 | 解释 agency 不变、AI 权威化现象 |
| **PDF 编译上传** | P0 | Overleaf 编译 tex + bib |
| **Slides 发现页真数** | P1 | 与 Results 同步 |

---

## 网站 Bug 修复（国内站）

| Bug | 状态 | 说明 |
|-----|------|------|
| 八字解读显示 `undefined` | ✅ 本地已修 | `reading-engine.js` 用 `traitText()` 取 `trait.zh.*`；需 push 部署到 pages.dev |
| 知情同意 Skip 按钮 | ✅ 本地已修 | 已删 consent-skip；同意后直达首页 |
| embedded 模式闪屏 | ✅ 本地已修 | `embedded-boot` CSS + app.js |

---

## 数据一句话（2026-07-15）

**78 行 → 去重 43 行 → 21 session → 13 journey → 9 完整配对（N=9，收集中）**

| 指标 | pre M | post M | ΔM |
|------|-------|--------|-----|
| bias_awareness | 3.44 | 4.00 | +0.56 |
| reframe_confidence | 3.56 | 4.22 | +0.67 |
| gender_lens | 2.56 | 3.11 | +0.56 |
| personal_agency | 4.44 | 4.44 | 0.00 |
| spot_stereotypes | 4.11 | 4.22 | +0.11 |

---

## 安全核对 ✅

| 项 | 状态 |
|----|------|
| `DEEPSEEK_API_KEY` 仅在 Vercel env / `api/chat.js` | ✅ |
| Supabase 无 PII / 无生辰入库 | ✅ |
| 论文 AI disclosure | ✅ 已写入 Method |
