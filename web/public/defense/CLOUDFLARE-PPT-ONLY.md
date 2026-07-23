# 答辩 PPT 单独上线（打开就是 PPT，不是游戏）

小游戏在：`https://reframe-destiny.pages.dev/game/`  
**答辩 PPT 要单独一个 Pages 项目**，根路径就是整份 HTML（和本地 `8877` 一样，只是有了域名）。

---

## 方法 1 · Cloudflare 网页（推荐，不用懂代码）

1. 打开 https://dash.cloudflare.com → **Workers & Pages** → **Create**
2. **Pages** → **Connect to Git**
3. 选仓库 **`zxyztw5111/reframedestiny`**
4. **Project name**：`reframe-destiny-defense`（会变成 `reframe-destiny-defense.pages.dev`）
5. **Build settings**（重要）：
   - **Production branch**：`main`
   - **Root directory（根目录）**：`web/public/defense`
   - **Framework preset**：**None**
   - **Build command**：留空（或填 `exit 0`）
   - **Build output directory**：`.` 或留空
6. **Save and Deploy**

成功后打开：**https://reframedestinyppt.pages.dev/**（或你在 Dashboard 里填的 Project name + `.pages.dev`）  
→ 应是瑞士风 15 页 PPT（← → 翻页），**不是**游戏首页。

第 3 页 demo 会嵌 `reframe-destiny.pages.dev` 的莲花（需联网）。

---

## 方法 2 · 终端一条命令（需先 `npx wrangler login`）

```bash
bash research/ppt/deploy-defense-standalone.sh
```

---

## 改 PPT 后更新

```bash
bash research/ppt/sync_deck_to_pages.sh
git add web/public/defense research/ppt/reframe-destiny-defense-swiss-final.html
git commit -m "Update defense PPT"
git push origin main
```

若用方法 1 连了 Git，push 后会自动重新部署。

---

## 不要用的链接（容易误会）

| 链接 | 实际内容 |
|------|----------|
| `reframe-destiny.pages.dev/` | 莲花 **主站**（不是 PPT） |
| `reframe-destiny.pages.dev/game/` | **小游戏** |
| `reframe-destiny.pages.dev/defense/` | 主站未正确部署时也会像主站 ❌ |

**答辩只发：`https://reframe-destiny-defense.pages.dev/`**
