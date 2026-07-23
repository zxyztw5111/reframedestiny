# 答辩 HTML 部署到 Cloudflare Pages（和小游戏同一个站）

你的小游戏已经在 **`reframe-destiny.pages.dev`** 上，来源是仓库里的 **`web/`** 目录。答辩 deck 同步到 **`web/public/defense/`** 后，会和 `/game/` 一样随 Pages 自动发布。

## 1. 本地改完 deck 后同步

```bash
bash research/ppt/sync_deck_to_pages.sh
```

会生成：

- `web/public/defense/index.html`（最终版 swiss-final）
- `web/public/defense/images/*`

## 2. 本地预览（必须 http，不能 file://）

```bash
bash research/ppt/open-deck-local.sh
# 浏览器打开 http://127.0.0.1:8877/reframe-destiny-defense-swiss-final.html
# 第 3 页 = 全屏 iframe live demo
```

## 3. 推到 GitHub → Cloudflare Pages 自动构建

和小游戏相同流程（你之前已经配过的话只需 push）：

1. **Cloudflare Dashboard** → **Workers & Pages** → 选中 **`reframe-destiny`**（或你的项目名）
2. **Settings → Builds** 确认：
   - **Root directory**: `web`
   - **Build command**: `npm ci && npm run build`
   - **Build output directory**: `dist`
3. 本地提交并 push（Pages 连的是 GitHub 仓库）：

```bash
cd web && npm run build   # 可选：本地先验证能 build
cd ..
git add web/public/defense research/ppt/reframe-destiny-defense-swiss-final.html
git commit -m "Publish defense deck to /defense on Pages"
git push
```

4. 等 Dashboard 里 **Deployment** 变绿，打开：

**https://reframe-destiny.pages.dev/defense/**

教室电脑、老师调试都用这个 URL，**不要**用 `127.0.0.1`。

## 4. 和小游戏的关系

| URL | 内容 |
|-----|------|
| `https://reframe-destiny.pages.dev/` | React 首页 + 莲花封面 |
| `https://reframe-destiny.pages.dev/game/` | 研究用互动 demo |
| `https://reframe-destiny.pages.dev/defense/` | 答辩横向 HTML PPT（第 3 页嵌 live 站） |

`web/public/_redirects` 只把「找不到的静态路径」交给 React；`/defense/*` 和 `/game/*` 是真实文件，不会被吃掉。

## 5. 交 PDF 仍用导出脚本

Live 讲用 **/defense/**；交作业 PDF：

```bash
bash research/ppt/export-pdf.sh
```

导出时第 3 页会自动换成截图（iframe 不参与 PDF），动效在浏览器里讲。

## 6. 首次用 Wrangler CLI（可选）

若不用 Git 自动部署，可手动：

```bash
npm i -g wrangler
cd web && npm run build
npx wrangler pages deploy dist --project-name=reframe-destiny
```

（项目名以 Cloudflare 里为准。）
