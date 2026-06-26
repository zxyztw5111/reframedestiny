# Week 6 — GitHub Issues（待创建）

> `gh` 本地 token 已失效，请登录 GitHub 后逐条创建 Issue，或运行：`gh auth refresh -h github.com`

---

## Issue 1：首页五秒内说清「这是做什么的」

**标题：** Clarify site purpose on homepage within 5 seconds

**具体要改什么：**
- **现在：** 首页标题偏抽象（「谁有权定义你的命运？」），陌生人不知道要先做什么。
- **希望：** 首页增加一句大白话说明（识别八字/星盘性别偏见 + 练习 AI 重构）和明确第一步（点「开始探索」）。
- **位置：** `#view-home` 英雄区下方。

**怎么算改好了：**
- 没看过项目的人打开首页，5 秒内能说出「这是一个帮年轻人发现命理偏见并重构叙事的网站」。
- 能指出第一步按钮在哪里。

**状态：** 已在本次 commit 中加入 hero pitch 区块 — 创建后可关闭。

---

## Issue 2：用户研究数据从 localStorage 迁到 Supabase

**标题：** Move user feedback from localStorage to Supabase

**具体要改什么：**
- **现在：** 探索记录、反思、偏见勾选只存在用户浏览器 `localStorage`，研究者无法汇总。
- **希望：** 配置 Supabase 表，提交 journey 完成数据（体系选择、偏见标签、Court 反思句、1–5 评分）到云端；前端不再依赖 localStorage 做研究数据。
- **位置：** `js/app.js` 保存逻辑 + 新建 Supabase 表。

**怎么算改好了：**
- 任意设备填写一次完整 journey 后，研究者在 Supabase 后台能看到一条带时间戳的记录。
- 仓库里没有 API key；key 只在 Vercel 环境变量或 Supabase Edge Function。

---

## Issue 3：接入 DeepSeek 实现真实 AI 重构（密钥安全）

**标题：** Add DeepSeek reframe via secure serverless proxy

**具体要改什么：**
- **现在：** Step 7「AI 重构」使用 `js/data.js` 里的固定模拟文本。
- **希望：** 用户完成偏见扫描后，调用 `/api/chat`（Vercel Serverless Function）请求 DeepSeek 生成去偏见重构版；API key 只存在 Vercel Environment Variables，前端零 key。
- **位置：** 新建 `api/chat.js`；修改 `js/app.js` 中 `renderReframe()`。

**怎么算改好了：**
- 本地或线上能跑通：前端 → `/api/chat` → DeepSeek → 返回重构文本。
- `git grep` 和 GitHub 历史里搜不到 DeepSeek key 字符串。
