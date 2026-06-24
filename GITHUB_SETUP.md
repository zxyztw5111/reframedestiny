# GitHub 登录 & 推送 — 一步一步（你必须亲手做）

> ⚠️ **AI 无法替你在浏览器里登录 GitHub。** 下面每步你在终端跟着做，约 10 分钟。

---

## Step 1：安装 GitHub CLI（一次性）

打开 **终端 Terminal**，粘贴：

```bash
brew install gh
```

如果没有 brew，先去 https://brew.sh 安装 Homebrew。

---

## Step 2：登录 GitHub

```bash
gh auth login
```

按提示选择：

1. **GitHub.com**
2. **HTTPS**
3. **Login with a web browser**（用浏览器登录）
4. 复制终端里的一串 code，粘贴到浏览器，授权

看到 `Logged in as zxyztw5111` 就成功了。

---

## Step 3：确认仓库存在

```bash
gh repo view zxyztw5111/reframedestiny
```

如果显示 404，创建仓库：

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
gh repo create reframedestiny --public --source=. --remote=origin --push
```

如果仓库已存在，只 push：

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
git push -u origin main
```

---

## Step 4：开启 GitHub Pages（网站能点进去）

```bash
gh api repos/zxyztw5111/reframedestiny/pages -X POST \
  -f build_type=legacy \
  -f source[branch]=main \
  -f source[path]=/
```

或浏览器打开：  
https://github.com/zxyztw5111/reframedestiny/settings/pages  
→ Branch 选 **main**，文件夹 **/ (root)** → Save

等 2–3 分钟后访问：  
**https://zxyztw5111.github.io/reframedestiny/**

---

## Step 5：向课程提交

```bash
curl -X POST https://course.lawted.tech/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"张馨云","repo":"https://github.com/zxyztw5111/reframedestiny"}'
```

---

## 你的仓库里应该有什么

```
reframedestiny/
├── index.html          ← 交互网站（老师 Week 2 要求）
├── css/
├── js/
├── spec.md             ← Week 3 MVP 规格
├── research/           ← Week 3 研究档案
├── midterm-draft.md    ← Week 4 英文底稿
├── midterm-final.pptx  ← 期中汇报 PPT（官方模版填写版）
├── midterm-script.md   ← 7分钟英文讲稿
└── COURSE_NOTES_FOR_LEAVE.md
```

全部已在本地准备好，**只差 push**。
