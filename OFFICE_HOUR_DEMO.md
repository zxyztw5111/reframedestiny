# Office Hour 演示指南（GitHub 无法登录时）

> 给导师 / Office Hour 展示用 — 不依赖 GitHub 在线链接

---

## 最快方式：本地打开网站（1 分钟）

### 终端运行：

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
python3 -m http.server 8765
```

### 浏览器打开：

```
http://localhost:8765
```

**给导师看：** 共享屏幕，演示 Journey 7 步流程。

### 停止服务器：

终端按 `Ctrl + C`

---

## 方式二：展示「未来项目」文件夹

桌面文件夹：

```
/Users/zhangxinyun/Desktop/未来项目/
```

内含：
- 完整网站（index.html + css/ + js/）
- 期中 PPT
- research/ 研究档案
- spec.md
- 英文讲稿（简单版 + 完整版）

**双击 `index.html` 也可打开**，但部分动画可能受限；**推荐用 local server**。

---

## 方式三：GitHub push（VPN 关闭 + Token）

详见 `GITHUB_TROUBLESHOOT.md`

```bash
# 1. 关 VPN
# 2. https://github.com/settings/tokens 生成 Token
# 3.
cd /Users/zhangxinyun/Projects/reframe-destiny
git push -u origin main
# Username: zxyztw5111
# Password: 粘贴 Token
```

成功后告诉导师：

```
https://github.com/zxyztw5111/reframedestiny
```

---

## Week 2 / Week 3 作业对照（给导师看）

| 作业 | 文件 | 状态 |
|------|------|------|
| Week 2: 公开 repo + index.html | `index.html` | ✅ 本地完成，push 待网络 |
| Week 3: research/ | `research/summary.md`, `sources.md`, `questions.md` | ✅ |
| Week 3: spec.md | `spec.md` | ✅ |
| Week 4: midterm PPT | `Reframe-Destiny-Midterm.pptx` | ✅ |
| Week 4: midterm-draft | `midterm-draft.md` | ✅ |

---

## 向导师说明 GitHub 问题（英文一句）

> "My GitHub push failed due to VPN/TLS issues. All files are ready locally in the 未来项目 folder and I can demo the site on localhost:8765."

---

## 可选：同一 WiFi 下让导师手机访问

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
python3 -m http.server 8765 --bind 0.0.0.0
```

终端会显示你的 IP，例如 `http://192.168.1.5:8765`（需防火墙允许）。

若太复杂，**共享屏幕 + localhost 即可**。
