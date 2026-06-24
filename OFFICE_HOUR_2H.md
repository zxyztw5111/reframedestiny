# Office Hour 前 2 小时清单

> 张馨云 · Reframe Destiny · Generation AI

---

## ⏱ 时间分配建议

| 时间 | 任务 |
|------|------|
| 0–15 min | P0：检查 PPT 姓名和背景 |
| 15–30 min | P0：本地打开网站，走一遍 Journey |
| 30–60 min | P0：用简化讲稿练 1 遍（7 分钟） |
| 60–90 min | P1：整理「未来项目」文件夹，给导师看 |
| 90–110 min | P1：熟悉 research/ + spec.md，能口头解释 |
| 110–120 min | P2：关 VPN 试 git push（可选） |

---

## P0 — 必须完成

### 1. 检查 PPT

- [ ] 打开桌面 **`Reframe-Destiny-Midterm.pptx`**
- [ ] 第 1 页姓名：**Xinyun Zhang (张馨云)**
- [ ] 背景与官方模版一致（有 Stanford/北大图片）
- [ ] 第 7 页有网站截图（没有就立刻截）

若姓名不对，终端运行：

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
python3 fill-template-pptx.py
```

### 2. 网站能演示

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
python3 -m http.server 8765
```

浏览器：`http://localhost:8765` → 点「开始探索」走 2–3 步

### 3. 练简化讲稿 1 遍

```bash
open /Users/zhangxinyun/Projects/reframe-destiny/midterm-script-simple.md
```

计时 7 分钟，必须说出：

> "I have not run the user study yet."

---

## P1 — Office Hour 给导师看

### 4. 打开「未来项目」文件夹

```
/Users/zhangxinyun/Desktop/未来项目/
```

告诉导师：所有 deliverables 都在这里。

### 5. 能解释 3 个文件

| 文件 | 一句话 |
|------|--------|
| `spec.md` | MVP 是什么、给谁用、7 步流程 |
| `research/summary.md` | 已知什么、空白在哪 |
| `midterm-draft.md` | 完整英文研究故事 |

### 6. WPS 演讲者模式

见 `WPS_SPEAKER_MODE.md` — 汇报前把讲稿贴进备注或用手机看

---

## P2 — 有时间再做

### 7. GitHub push

- 关 VPN
- Token 方式见 `GITHUB_TROUBLESHOOT.md`
- **Push 失败不影响 Office Hour** — 本地 demo 即可

### 8. 课程 API 提交（可选）

```bash
curl -X POST https://course.lawted.tech/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"张馨云","repo":"https://github.com/zxyztw5111/reframedestiny"}'
```

---

## ❌ 今天跳过

- Vercel / Supabase 注册
- 用户调研
- 重写网站
- 编造任何数据

---

## 见导师时可以说的 3 句话

1. **项目：** "Reframe Destiny helps young women find gender bias in BaZi and astrology, and reframe the story with AI."

2. **进度：** "I missed several classes but caught up — prototype, research folder, and midterm PPT are ready."

3. **困难：** "GitHub push fails because of VPN/TLS. I can demo locally on localhost:8765."

---

**现在第一步：双击 `Reframe-Destiny-Midterm.pptx`，确认名字是 Xinyun Zhang (张馨云)。**
