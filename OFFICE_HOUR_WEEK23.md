# Week 2 + Week 3 作业完成清单 · Office Hour

## 本地演示（GitHub 登不上时用）

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
python3 -m http.server 8765
```

浏览器打开：**http://localhost:8765**

给导师演示：
1. 首页 → 开始探索 → 走 2–3 步 Journey  
2. 右下角 **Research · 研究** 按钮 → 展开研究摘要  

---

## Week 2 ✅

| 要求 | 状态 | 位置 |
|------|------|------|
| GitHub 公开仓库 | ⚠️ 本地已 commit，push 待 VPN/Token | `reframedestiny` |
| index.html 介绍项目 | ✅ | `index.html` — 完整交互网站 |
| 可浏览器打开 | ✅ | `python3 -m http.server 8765` |

---

## Week 3 ✅

| 要求 | 状态 | 位置 |
|------|------|------|
| research/summary.md | ✅ | `research/summary.md` |
| research/sources.md | ✅ | `research/sources.md` |
| research/questions.md | ✅ | `research/questions.md` |
| spec.md (MVP) | ✅ | `spec.md` |
| MVP 已定义 | ✅ | 7-step Journey，见 spec.md |

---

## Week 4 期中材料 ✅

| 要求 | 状态 | 位置 |
|------|------|------|
| midterm PPT | ✅ | `未来项目/Reframe-Destiny-Midterm-FIXED.pptx` |
| 英文讲稿 | ✅ | `midterm-script-simple.md` |
| 演讲者备注 | ✅ | 已嵌入 FIXED PPT |
| midterm-draft.md | ✅ | 项目根目录 |
| 研究按钮在网站 | ✅ | index.html 右下角 Research |

---

## GitHub push（可选）

1. **关 VPN**  
2. https://github.com/settings/tokens → 生成 Token（repo 权限）  
3. ```bash
   cd /Users/zhangxinyun/Projects/reframe-destiny
   git push -u origin main
   ```
   Username: `zxyztw5111` · Password: **粘贴 Token**

详见 `GITHUB_TROUBLESHOOT.md`

---

## 课程 API 提交（可选）

```bash
curl -X POST https://course.lawted.tech/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"张馨云","repo":"https://github.com/zxyztw5111/reframedestiny"}'
```

Push 失败时可口头说明：「所有文件在桌面 未来项目 文件夹。」

---

## 给导师一句话（英文）

> "Week 2 and 3 deliverables are ready locally — website, research folder, and spec. GitHub push blocked by VPN; I can demo on localhost:8765."
