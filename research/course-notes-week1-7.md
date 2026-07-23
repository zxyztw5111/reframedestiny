# Generation AI · Week 1–7 课程重点 & 作业对照

> **课程：** Lawted Wu · AI for Social Sciences · [course.lawted.tech](https://course.lawted.tech)  
> **项目：** Reframe Destiny（重塑命运）· 张昕田  
> **Cluster：** B（工具已就绪，缺真人 pre/post 数据）  
> **整理日期：** 2026-07-07

---

## 课程总览（8 周要交什么）

| 产出 | 要求 |
|------|------|
| **Game / 工具** | 真实 URL，陌生人能玩（不是 PPT、不是本地 demo） |
| **Paper** | 3000–5000 字 APA，8 月 Stanford × 北大答辩 |
| **Study** | 用户测试报告：真实被试、pre/post、描述统计 |
| **Skill** | Cursor / Codex / GitHub / Vercel / Supabase |

**四条方法论：** ① 先复刻再偏离 ② 每周 ship ③ 每个选择能 defend ④ 评判标准是玩家有没有感觉，不是老师喜不喜欢 slides

---

## 一、Week 1 · 开课导论（课程首页）

> 官网无单独 week1 页，内容为 Generation AI 2026 总介绍。

### 重点知识

| 要点 | 内容 |
|------|------|
| 课程定位 | 8 周内做 AI 驱动的**互动叙事**作品，研究一个影响中国青少年的**社会议题** |
| 参考作品 | **PUA Game**（黑幽默生存游戏）— 同一精神：真实 URL + 真实玩家 |
| 议题方向 | 学业压力 · 家庭关系 · 网络环境（或自带个人相关议题） |
| AI-native | 零基础可用；用 Claude Code / Codex 在终端 **vibe-code** |
| 技术栈（理想形态） | Next.js + Tailwind + Supabase + Vercel（Social Science track 可简化为 HTML） |
| 终局 | 可玩作品 + APA 论文 + 用户研究数据 |

### Week 1 作业

| # | 作业 | 说明 |
|---|------|------|
| 1 | 理解课程四产出 | Game / Paper / Study / Skill |
| 2 | 选定社会议题方向 | Reframe Destiny：命理叙事中的性别化与宿命化偏见 |
| 3 | 注册课程相关账号 | GitHub、后续 Vercel/Supabase |
| 4 | 课前反馈表（飞书） | 每节课 2 分钟 |

---

## 二、Week 2 · Setup Day（5/31）

### 重点知识

| 要点 | 内容 |
|------|------|
| AI-native | 语音输入（微信 Fn / Ctrl+Win）+ 自然语言驱动 AI |
| 研究框架 | **RQ → 作品是工具 → 用户反馈是数据 → 论文** |
| Jenny 标杆 | 可运行工具 + ~25 人调研 + 4000–5000 字 APA |
| GitHub | 所有版本的家；`gh` CLI 或 AI 带着建 public repo |
| 交付物 | 单文件 **index.html** 想法页 + repo 链接 |
| 小组 | 3 人一组 pitch，每人 1 个尖锐问题 |
| 警惕 AI | 文献、数据、统计 AI 会编造，必须自己核实 |

### Week 2 作业

| # | 作业 |
|---|------|
| 1 | 安装 Cursor / Claude Code / Codex（选一能用的） |
| 2 | 头脑风暴确定议题 + 研究问题雏形 |
| 3 | GitHub 公开仓库 + push **index.html** |
| 4 | index.html 含：议题、给谁、游戏还是网站、怎么收反馈、怎么支撑论文 |
| 5 | 群里发 repo 链接 |
| 6 | 课前反馈表 |
| 7 | （可选）预约周三 Office Hour |

---

## 三、Week 3 · Build an MVP（6/7）

### 重点知识

| 要点 | 内容 |
|------|------|
| 证据等级 | 同行评审 > 官方数据/报告 > 优质新闻 > 个案 |
| 并行调研 | Codex `/agent`、Cursor `/multitask` |
| research/ | `summary.md` · `sources.md`（文献矩阵）· `data/` · `questions.md` |
| MVP | 最小可行**产品**；只保留「那一件核心事」 |
| spec.md 五块 | 做什么 · 给谁 · 3–5 步流程 · 不在 MVP · 怎么收反馈 |
| 本周不搭建 | 只定义 MVP，不写完整产品 |

### Week 3 作业

| # | 作业 |
|---|------|
| 1 | research/ 四件套归档 + push |
| 2 | spec.md MVP 规格 |
| 3 | 注册 **Vercel · Supabase · Cloudflare** |
| 4 | curl 提交 repo 到课程 API |
| 5 | 课前反馈表 |

---

## 四、Week 4 · Build & Ship + Midterm Draft（6/13–6/14）

### Week 4-1 · 上线（6/13）

| 要点 | 内容 |
|------|------|
| 单文件 | 根目录 **index.html**，纯 HTML/CSS/JS |
| Vercel | login → link → deploy；**git push = 自动更新** |
| 404 | 根目录没有 `index.html` |
| 验收 | 手机打开 URL；链接发群 |
| 中期预告 | 6/20：7 分钟英文 + 3 分钟 Q&A；8 页 PPT |

### Week 4-2 · 中期稿（6/14）

| 要点 | 内容 |
|------|------|
| RQ & Hypothesis | `How does [artifact] affect…` + `I hypothesize…` |
| midterm-draft.md | 8 节英文 + Acknowledgements |
| Slide 7 | **Expected Results — user study not yet run**；严禁编造数字 |
| midterm.pptx | pptxgenjs；Times New Roman ≥12pt；全英文 |
| 首页 | 加「研究 / The research」折叠区 |

### Week 4 作业

| # | 作业 |
|---|------|
| 1 | Vercel 上线 + 手机验证 |
| 2 | -deployment 墙发链接 |
| 3 | midterm-draft.md |
| 4 | 首页研究折叠区 |
| 5 | midterm.pptx |
| 6 | **飞书提交 PPT（6/20 前）** |
| 7 | 英文 7 分钟排练 ≥1 次 |
| 8 | 课前反馈表 |

---

## 五、Week 5 · 答辩 + Wire It Up（6/20–6/21）

### Week 5-1 · 中期答辩（6/20）

| 要点 | 内容 |
|------|------|
| 格式 | 7 分钟英文 talk + 3 分钟 Q&A |
| 通过 | demo 能开 + 研究能讲清 ≈ pass |
| Slide 7 口播 | "These are **expected** results — I haven't run the study yet." |
| 作业（可选） | Cloudflare 买域名 |

### Week 5-2 · 接线（6/21）

| 要点 | 内容 |
|------|------|
| 域名 | Cloudflare DNS → Vercel（可选） |
| Supabase | 告别 localStorage；数据汇总到云端 |
| Supabase MCP | AI 建表；单项目 + 手动确认 |
| DeepSeek | 本地先调通 |
| **安全** | key **绝不**进前端/GitHub；`api/chat.js` + Vercel 环境变量 |
| 架构 | 用户 → 前端 → 你的后端 → DeepSeek |

### Week 5 作业

| # | 作业 |
|---|------|
| 1 | 中期答辩完成 |
| 2 | （可选）买域名 + 接 Vercel |
| 3 | Supabase 表 + 前端提交 |
| 4 | DeepSeek 本地最小功能 |
| 5 | 确认 key 未 push |
| 6 | 课前反馈表 |

---

## 六、Week 6 · 工程迭代 + 收研究数据（6/27–6/28）

### Week 6-1 · Iterate Like an Engineer

| 要点 | 内容 |
|------|------|
| 陌生人测试 | 5 秒看懂 · 知道点哪 · 手机不坏 |
| 先图后码 | AI 生界面图 → 满意再写代码 |
| 互评 | 3–4 人一组，每人 1 条具体建议 |
| Issue | 一条反馈 = 一个 GitHub Issue |
| PR | 分支 → PR → review diff → merge |
| 习惯 | AI 停下来**先读完**再点 Authorize |

### Week 6-2 · Run Your Study

| 要点 | 内容 |
|------|------|
| Pre/Post | 同一套 ~5 题，玩前 + 玩后 |
| 成功线 | spec.md 写数字标准（**看数据前**定） |
| 知情同意 | 匿名 · 自愿 · 可退出 · 仅课堂研究 |
| Supabase | 时间戳 + pre/post 标记 |
| 三人组 | 互玩产生真实行 + 互评 |
| AI 读数据 | Supabase MCP 描述统计 |
| 访谈 | 3–5 开放式问题 |
| **Build freeze** | 只修不加功能 |
| 招募 | N ≈ 15–20 **完整配对** |

### Week 6 作业

| # | 作业 |
|---|------|
| 1 | 陌生人可读性改版 |
| 2 | **建 3 个 GitHub Issues（当堂）** |
| 3 | （加分）Issue → PR → merge |
| 4 | 前测/后测 + 成功线 |
| 5 | 知情同意屏 |
| 6 | pre/post → Supabase |
| 7 | 三人组互玩 + AI 读 Supabase |
| 8 | 访谈 3–5 题 |
| 9 | **持续招募 15–20 配对（7/7 起）** |
| 10 | 课前反馈表 |

---

## 七、Week 7 · 写论文 + 结果讨论（7/5–7/6）

### Week 7-1 · Write Your Paper Now（7/5）

| 要点 | 内容 |
|------|------|
| 诚实起点 | 真实被试 ≈ 0；今天不写真 Results |
| Cluster B | **去招人**是第一要务 |
| IMRaD | Intro · Method · Results · Discussion |
| Abstract 五步 | Hook → Gap → Artifact → Method → **Expected（禁止数字）** |
| Methods 五块 | Artifact · Design · Consent · Recruit · 材料边界 |
| 学术 voice | 第三人称 · 过去时 · suggest 不 prove |
| Exit Ticket | ①占位 abstract ②Methods ③具体数据动作 |

### Week 7-2 · Clean, Report, Interpret（7/6）

| 要点 | 内容 |
|------|------|
| 流水线 | 清洗 → Results（只报告）→ Discussion（解释） |
| 金句 | **Results reports. Discussion explains.** |
| 清洗 | 规则**看结果前**写；报告 N 变化；不 p-hacking |
| 描述统计 | M±SD · % 带 n · Pre/Post 各报 M/SD |

### Week 7 作业

| # | 作业 |
|---|------|
| 1 | 占位 Abstract |
| 2 | Methods 锁定 |
| 3 | Exit Ticket 三条 |
| 4 | 课前反馈表 |
| 5 | 数据清洗规则（有数据后） |
| 6 | Results + Discussion 真稿（有数据后） |

---

## 八、你还没完成的作业（逐项清单 · Reframe Destiny）

> 按优先级排序。✅ = 已完成的不重复列出。

### 🔴 必须做（影响论文和期末）

| 序号 | 作业 | 具体要做什么 | 状态 |
|------|------|--------------|------|
| **1** | **招募 15–25 人完整配对** | 发链接（同学/微信/小红书）；每人必须 **pre + 玩完旅程 + post**；目标有效 N ≥ 15 | ❌ 当前 ≈ 0–1 |
| **2** | **Build freeze** | 停止加新功能（React 美学封面等）；只修 consent / 问卷 / Supabase 提交 bug | ❌ |
| **3** | **Week 7-2 Results** | 有真实数据后：描述统计 pre/post 均值变化；**不编造** | ❌ 等数据 |
| **4** | **Week 7-2 Discussion** | 解释结果意义、局限、so-what | ❌ 等数据 |
| **5** | **3000–5000 字 APA 全文** | Intro + Lit Review + Method + Results + Discussion + References | ❌ 8 月前 |
| **6** | **8/2 期末答辩** | 英文 presentation + 论文 | ❌ 8 月 |

### 🟡 待确认 / 部分完成

| 序号 | 作业 | 具体要做什么 | 状态 |
|------|------|--------------|------|
| 7 | 飞书提交 Week7 Exit Ticket | 三条：abstract / Methods / 数据动作 | 🟡 稿在 `week7-exit-ticket.md`，是否已交待确认 |
| 8 | 每节课课前反馈表 | 飞书 2 分钟 | 🟡 需补交缺的几节 |
| 9 | W3 课程 API 提交 repo | curl POST 到 course.lawted.tech/api/submit | ⬜ 待确认 |
| 10 | spec.md 成功线 | 写清：post 比 pre ≥ 0.8 算成功（或你定的数字） | 🟡 |
| 11 | GitHub 3 个 Issues | 按 week6 文档在 GitHub 真正创建并跟踪 | 🟡 仅本地 md |
| 12 | Issue → PR → merge | 至少走通一次工程流程 | ⬜ |
| 13 | 三人组 pre/post 数据 | 课上互玩产生的行 | 🟡 几乎无 |
| 14 | 10 人 × 10–15 分钟访谈 | 用简化版 5 题开放式访谈 | ⬜ 可选但加分 |
| 15 | 数据清洗规则预写 | 注意力题/速度/不完整等，**看数据前**定 | 🟡 有初版 report |

### ⬜ 可选（做了更好，不做不挂）

| 序号 | 作业 | 说明 |
|------|------|------|
| 16 | Cloudflare 自定义域名 | 国内访问更稳；仍可用 vercel.app |
| 17 | Week6 PR 加分项 | 多个 issue 走 PR 流程 |

### ✅ 已完成（不用再花时间）

- GitHub 公开仓库 + index.html + Vercel 上线  
- research/ + spec.md + midterm-draft.md + 中期答辩  
- Supabase 表 + 前端提交 + `/api/chat.js` + key 安全  
- 知情同意 + 前测/后测 5 题 + Supabase pre/post 字段  
- Week7 占位 Abstract + Methods（`week7-paper-draft.md`）  
- AI 读 Supabase 描述统计（对话中做过）  

---

## 九、链接速查

| 名称 | URL |
|------|-----|
| 课程首页 | https://course.lawted.tech |
| Week 2 | https://course.lawted.tech/week2 |
| Week 3 | https://course.lawted.tech/week3 |
| Week 4 | https://course.lawted.tech/week4 |
| Week 4-2 | https://course.lawted.tech/week4-2 |
| Week 5 | https://course.lawted.tech/week5 |
| Week 5-2 | https://course.lawted.tech/week5-2 |
| Week 6 | https://course.lawted.tech/week6 |
| Week 6-2 | https://course.lawted.tech/week6-2 |
| Week 7 | https://course.lawted.tech/week7 |
| Week 7-2 | https://course.lawted.tech/week7-2 |
| 课前反馈 | https://rwz06e4m52t.feishu.cn/share/base/form/shrcne6eAxikDct45JcEaRXXK2b |
| 中期 PPT 提交 | https://rwz06e4m52t.feishu.cn/share/base/form/shrcntRnWynBNiOQwMqybSRhfXd |
| 你的网站 | https://reframe-destiny.vercel.app |

---

*仓库内相关文件：`research/week7-paper-draft.md` · `research/week7-exit-ticket.md` · `research/data/exports/data-cleaning-report_2026-07-05.md`*
