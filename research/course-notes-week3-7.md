# Generation AI · Lab Week 3–7 知识清单 & 作业对照

> 课程：Lawted Wu · AI for Social Sciences · [course.lawted.tech](https://course.lawted.tech)  
> 项目：**Reframe Destiny（张昕田）** · Cluster B（工具已做好，缺真人数据）  
> 整理日期：2026-07-07

---

## 一、简易知识清单（按周）

### Week 2 · Setup Day（打地基，Lab 前置）

| 知识点 | 一句话 |
|--------|--------|
| AI-native | 用自然语言驱动 AI 思考、检索、整理、写代码；留版本轨迹 |
| GitHub | 所有草稿和代码的「家」；公开 repo + push |
| 研究框架 | RQ（研究问题）→ 作品是工具 → 用户反馈是数据 → 最后写成论文 |
| 交付物 | 单文件 `index.html` 想法页 + repo 链接 |
| 警惕 AI | 引用、数据、文献都要自己核实，AI 会编造 |

---

### Week 3 · Build an MVP（定题 + 调研 + 写 spec）

| 知识点 | 一句话 |
|--------|--------|
| 证据等级 | 同行评审 > 官方数据/报告 > 优质新闻 > 个案故事 |
| 并行调研 | `/agent` 或 `/multitask` 多子代理分头查，再汇总 |
| research/ 结构 | `summary.md` · `sources.md`（文献矩阵）· `data/` · `questions.md` |
| MVP | 最小可行**产品**（网站/游戏），不是论文；只保留「那一件核心事」 |
| spec.md 五块 | 做什么 · 给谁 · 3–5 步流程 · 不在 MVP 里 · 怎么收反馈 |
| 产品 vs 论文 | 这周只**定义** MVP，不搭建完整产品 |

---

### Week 4 · Build & Ship（上线）

| 知识点 | 一句话 |
|--------|--------|
| 单文件作品 | 根目录 `index.html`（纯 HTML/CSS/JS，可双击打开） |
| Vercel 部署 | `login` → `link` → `deploy`；之后 **git push = 自动更新** |
| 404 元凶 | 根目录没有叫 `index.html` 的文件 |
| 验收 | 手机打开真实 URL；把链接发群里 |
| 中期预告 | 6/20 答辩：7 分钟英文 + 3 分钟 Q&A；8 页 PPT 结构 |

**Week 4-2 · Midterm Draft Day**

| 知识点 | 一句话 |
|--------|--------|
| RQ & Hypothesis | 两句钉死：`How does [artifact] affect…` + `I hypothesize…` |
| midterm-draft.md | 8 节英文稿（Title → References + Acknowledgements） |
| Slide 7 规则 | **Expected Results**，禁止编造用户数字 |
| 文献诚信 | 只写 research/ 里真实存在的来源 |
| midterm.pptx | 用 pptxgenjs 脚本生成；Times New Roman ≥12pt |

---

### Week 5 · Midterm Defense + Wire It Up

**5-1 · 中期答辩日**

| 知识点 | 一句话 |
|--------|--------|
| 通过标准 | 能打开的 demo + 能讲清研究 ≈ pass |
| Slide 7 说法 | "These are **expected** results — I haven't run the study yet." |
| 作业（可选） | Cloudflare 买域名，次日接到 Vercel |

**5-2 · Wire It Up（后端 + AI + 安全）**

| 知识点 | 一句话 |
|--------|--------|
| 域名 | Cloudflare DNS → Vercel Domains |
| Supabase | 替代 localStorage；所有人数据汇总到一张表 |
| Supabase MCP | AI 通过 MCP 建表、改前端；限定单项目 + 手动确认 |
| DeepSeek | 先本地调通；**key 绝不能进前端 / GitHub** |
| 安全上线 | Vercel Serverless Function（`api/chat.js`）+ 环境变量 |
| 架构 | 用户 → 前端 → 你的后端 → DeepSeek；写代码的 AI ≠ 产品里的 AI |

---

### Week 6 · Iterate + Run Your Study

**6-1 · Iterate Like an Engineer**

| 知识点 | 一句话 |
|--------|--------|
| 陌生人测试 | 5 秒内看懂干嘛的 · 知道点哪 · 手机别坏 |
| 先画图再写码 | AI 生界面图 → 满意后再实现，少返工 |
| 互评 | 每组 3–4 人，每人至少 1 条**具体**可改建议 |
| Issue 工作流 | 一条反馈 = 一个 GitHub Issue（标题 + 改什么 + 验收标准） |
| PR 流程 | 新分支 → PR → review diff → merge → Vercel 自动部署 |
| 黄金习惯 | AI 停下来的话**先读完**，再操作（Authorize 等） |

**6-2 · Run Your Study（变研究者）**

| 知识点 | 一句话 |
|--------|--------|
| Pre/Post | 同一套 ~5 题，玩**前**问一次、玩**后**再问一次，才能测「变化」 |
| 成功线 | 在 spec.md 写数字标准（如 post 比 pre ≥ 0.8），**看数据前**定好 |
| 引导题 | 不要 leading questions（「你不觉得这不公平吗？」） |
| 知情同意 | 第一屏：匿名 · 自愿 · 可退出 · 仅课堂研究 |
| Supabase 字段 | 时间戳 + `pre`/`post` 标记 |
| 三人组 | 当场互玩 → 产生真实 pre/post 行 + 互评 1 条 |
| AI 读数据 | Supabase MCP 做描述统计，样本小就如实说 |
| 访谈 | 3–5 个开放式问题，补「为什么」 |
| Build freeze | **只修不加功能**；fancy 页面没数据 = 输 |
| 招募目标 | N ≈ 15–20 **完整配对**（pre + post 都填） |

---

### Week 7 · Write Your Paper Now

**7-1 · 占位摘要 + 锁 Methods**

| 知识点 | 一句话 |
|--------|--------|
| 诚实起点 | 全班真实被试 ≈ 0；**今天不写真 Results** |
| Cluster B | 工具就绪 → 首要任务：**去招人** |
| IMRaD | Intro · Method · Results · Discussion |
| Abstract 五步 | Hook → Gap → Artifact → Method → **Expected（禁止结果数字）** |
| Methods 五块 | Artifact · Design(IV/DV/pre-post) · Consent · Recruit+统计 · 材料边界（mock AI 要写清） |
| 学术写作 | 第三人称 · 过去时 · hedging（suggest 不 prove）· 小样本不过度推广 |
| APA | 文内引用 + References；AI 文献必须 Scholar 核实 |
| Exit Ticket | ①占位 abstract ②Methods locked ③一个具体数据动作（动词+数字） |

**7-2 · Clean → Results → Discussion（数据到了以后）**

| 知识点 | 一句话 |
|--------|--------|
| 三步流水线 | ①清洗 ②Results 只报告 ③Discussion 解释意义 |
| 金句 | **Results reports. Discussion explains.** |
| 合法删除 | 规则**看结果前**写好；多 flag 才删；报告「起始 N → 剔除原因 → 最终 N」 |
| 红线 | p-hacking、删不顺眼的行、编数字 |
| 描述统计三板斧 | M±SD · 百分比要带 n · Pre/Post 各报 M/SD |
| 小样本 | 诚实描述即可，不必堆 p 值 |

---

## 二、各周作业清单（课程要求）

| 周次 | 作业 | 截止/说明 |
|------|------|-----------|
| W3 | `research/` 四件套归档 + push | 当周 |
| W3 | `spec.md` MVP 规格 | 当周 |
| W3 | 注册 Vercel · Supabase · Cloudflare | W4 前 |
| W3 | curl 提交 repo 到课程 API | 当周 |
| W3 | 课前反馈表（飞书） | 每节课 |
| W4 | 上线 Vercel + 手机验证 + 群发链接 | 当周 |
| W4 | 了解 6/20 中期 8 页结构 | 当周 |
| W4-2 | `midterm-draft.md` 八节英文 | 当周 |
| W4-2 | 首页加「研究/The research」折叠区 | 当周 |
| W4-2 | `midterm.pptx` + 飞书提交 PPT | **6/20 前** |
| W4-2 | 英文 7 分钟排练 ≥1 次 | 6/20 前 |
| W5 | 中期答辩现场 7+3 分钟 | 6/20 |
| W5 | （可选）Cloudflare 买域名 | 6/21 前 |
| W5-2 | 域名接入 Vercel（可选） | 课后 |
| W5-2 | Supabase 存数据（告别 localStorage） | 课后 |
| W5-2 | DeepSeek 本地最小功能 | 课后 |
| W5-2 | 确认 key 未 push | 课后 |
| W6 | **建 3 个 GitHub Issues** | **当堂** |
| W6 | （加分）1–2 个 Issue 走 PR→review→merge | 可选 |
| W6-2 | 前测/后测同题 + 成功线写进 spec | 当堂 |
| W6-2 | 知情同意第一屏 | 当堂 |
| W6-2 | pre/post 写入 Supabase（带时间戳+标记） | 当堂 |
| W6-2 | 三人组互玩产生数据 + AI 读 Supabase | 当堂 |
| W6-2 | 设计 3–5 访谈题 | 当堂 |
| W6-2 | **持续招募 15–20 完整配对** | 7/7–7/10 起 |
| W7 | 占位 Abstract（第 5 句无数字） | 当堂交 |
| W7 | Methods 锁定 | 当堂交 |
| W7 | Exit Ticket 第 3 条：具体数据动作 | 当堂 |
| W7 | 课前反馈表 | 每节课 |
| W7-2 | 数据清洗（预写规则） | 有数据后 |
| W7-2 | Results 真稿 + Discussion | 有数据后 |
| 期末 | 3000–5000 字 APA 论文 + 8/2 答辩 | 8 月 |

---

## 三、Reframe Destiny · 作业完成对照

图例：✅ 已完成 · 🟡 部分完成 · ❌ 未完成 · ⬜ 可选/待确认

### Week 3

| 作业 | 状态 | 备注 |
|------|------|------|
| research/ 文件夹 | ✅ | `summary.md` `sources.md` `questions.md` `data/` 等 |
| spec.md | ✅ | 含 RQ/Hypothesis；部分 MVP 范围已超出（见下） |
| 注册三平台 | 🟡 | Vercel + Supabase 已用；域名可选未确认 |
| 课程 API 提交 repo | ⬜ | 需确认是否已 curl 提交 |

### Week 4

| 作业 | 状态 | 备注 |
|------|------|------|
| index.html 上线 Vercel | ✅ | `reframe-destiny.vercel.app`；React 封面在 `web/` |
| 手机/他人可打开 | ✅ | 已部署 |
| midterm-draft.md | ✅ | 仓库根目录有 |
| 首页研究折叠区 | 🟡 |  vanilla 站有研究理念；React 封面版尚未完整旅程 |
| midterm.pptx + 飞书提交 | ⬜ | 需确认是否已交最终版 |
| 6/20 答辩 | ✅ | 已过 |

### Week 5

| 作业 | 状态 | 备注 |
|------|------|------|
| 自定义域名 | ⬜ | 可选，仍可用 vercel.app |
| Supabase 表 + 前端提交 | ✅ | `research_submissions` + migration |
| DeepSeek `/api/chat.js` | ✅ | key 在 Vercel env |
| key 未泄露 | ✅ | 前端无 key |

### Week 6

| 作业 | 状态 | 备注 |
|------|------|------|
| 陌生人能 5 秒看懂 | 🟡 | React 封面很强；完整研究流程在 vanilla 站 |
| 3 个 GitHub Issues | 🟡 | `research/week6-github-issues.md` 已起草；Issue 是否在 GitHub 创建待确认 |
| PR 流程 | ⬜ | 未系统走完 issue→PR→merge |
| 前测/后测同题 5 题 | ✅ | `js/survey.js` + migration `002` |
| 知情同意 | ✅ | vanilla + React 均有 |
| pre/post → Supabase | ✅ | `survey_pre` / `survey_post` |
| spec 成功线 | 🟡 | Week7 课堂写 ≥0.8；spec.md 可再显式一条 |
| 三人组现场数据 | 🟡 | 导出显示几乎无真实配对 |
| AI 读 Supabase 统计 | ✅ | 对话中已用 MCP 做过 |
| 访谈 3–5 题 | ✅ | 对话中已简化版 |
| Build freeze（只修不加） | ❌ | React 封面大量新功能（美学向） |
| 招募 15–20 完整配对 | ❌ | **当前最大缺口**；有效 N ≈ 0–1 |

### Week 7

| 作业 | 状态 | 备注 |
|------|------|------|
| 占位 Abstract | ✅ | `research/week7-paper-draft.md` |
| Methods 锁定 | ✅ | 同上 |
| Results 占位一行 | ✅ | `[pending data]` |
| Exit Ticket 三条 | 🟡 | `research/week7-exit-ticket.md` 已写；是否已交待确认 |
| 课前反馈表 | ⬜ | 每节课 2 分钟飞书 |
| 具体数据动作（招人） | ❌ | 7/7–7/10 应用链接发同学/小红书 |

### Week 7-2（下一课）

| 作业 | 状态 | 备注 |
|------|------|------|
| 预写清洗规则 | 🟡 | `data-cleaning-report` 有初版 |
| 真 Results | ❌ | 等数据 |
| Discussion | ❌ | 等数据 |

---

## 四、你现在最该优先做的 5 件事

1. **发链接招人** — 目标 15–25 人完成 **pre + 玩完 + post**（完整配对才算数）。  
2. **Build freeze** — 暂停加新功能；只修 consent / 问卷 / 提交 bug。  
3. **确认飞书** — 中期 PPT、Week7 Exit Ticket、课前反馈是否都已提交。  
4. **GitHub Issues** — 把 week6 三条真正建到 repo（或标记已完成的关闭）。  
5. **有数据后** — 按 Week7-2：清洗 → Results（只报数字）→ Discussion（解释意义）。

---

## 五、课程链接速查

| 页面 | URL |
|------|-----|
| 课程首页 | https://course.lawted.tech |
| Week 3 | https://course.lawted.tech/week3 |
| Week 4 上线 | https://course.lawted.tech/week4 |
| Week 4 中期稿 | https://course.lawted.tech/week4-2 |
| Week 5 答辩 | https://course.lawted.tech/week5 |
| Week 5 接线 | https://course.lawted.tech/week5-2 |
| Week 6 工程迭代 | https://course.lawted.tech/week6 |
| Week 6 收数据 | https://course.lawted.tech/week6-2 |
| Week 7 写论文 | https://course.lawted.tech/week7 |
| Week 7 结果讨论 | https://course.lawted.tech/week7-2 |
| 课前反馈表 | https://rwz06e4m52t.feishu.cn/share/base/form/shrcne6eAxikDct45JcEaRXXK2b |
| 中期 PPT 提交 | https://rwz06e4m52t.feishu.cn/share/base/form/shrcntRnWynBNiOQwMqybSRhfXd |

---

*本地文件：`research/week7-paper-draft.md` · `research/week7-exit-ticket.md` · `research/data/exports/data-cleaning-report_2026-07-05.md`*
