# 期中汇报前最后步骤（明天 9:00）

> GitHub 暂时 push 失败**不影响**口头答辩。按下面顺序做。

---

## 优先级 1 — 现在立刻做（5 分钟）

### 打开并检查 PPT

双击桌面文件：

```
Reframe-Destiny-Midterm.pptx
```

检查：
- [ ] 背景和设计与官方模版一致（有 Stanford/北大风格图片）
- [ ] 共 **9 页**（说明页已删除）
- [ ] 第 1 页：项目标题 + 你的名字 Xinyun Zhang
- [ ] 第 2 页：Research Question + Hypothesis
- [ ] 第 7 页：标题含 **Expected Results — user study not yet run**
- [ ] 全英文，Times New Roman

**如果背景不对**，在终端运行重新生成：
```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
python3 fill-template-pptx.py
```

---

## 优先级 2 — 练英文讲稿（30–45 分钟）

打开讲稿：
```
/Users/zhangxinyun/Projects/reframe-destiny/midterm-script.md
```

- 对着 PPT **大声读一遍**，计时 7 分钟
- 必须能脱稿说出 Research Question 和 Hypothesis
- 必须能说一句：**"I have not run the user study yet — these are expected results."**

---

## 优先级 3 — 插入网站截图（15 分钟）

1. 终端运行：
   ```bash
   cd /Users/zhangxinyun/Projects/reframe-destiny
   python3 -m http.server 8765
   ```
2. Chrome 打开 `http://localhost:8765`
3. 走一遍 Journey，到 **Bias Scanner** 页面
4. 截图（Mac：`Cmd + Shift + 4`）
5. 拖进 PPT **第 7 页** `[Insert prototype screenshot here]` 位置
6. 保存 PPT

---

## 优先级 4 — GitHub（可选，VPN 稳定时再做）

详见 `GITHUB_TROUBLESHOOT.md`

最短路径：
1. 关 VPN
2. https://github.com/settings/tokens 生成 Token
3. `git push` 时 Password 粘贴 Token

**期中汇报不依赖 push 成功。**

---

## 优先级 5 — 答辩当天带什么

| 物品 | 路径 |
|------|------|
| PPT | 桌面 `Reframe-Destiny-Midterm.pptx` |
| 网站演示 | 本地 `http://localhost:8765` 或 U 盘里的项目文件夹 |
| 讲稿 backup | `midterm-script.md` 打印或手机打开 |

---

## 7 分钟汇报结构（背下来）

1. **Opening** — "Hi, my project is Reframe Destiny..."
2. **Problem** — same chart, different gender, different story
3. **RQ + Hypothesis** — 读 PPT 第 2 页
4. **Method** — 7-step website, 15–25 users planned
5. **Demo** — 打开网站 30 秒
6. **Results** — "Expected results — study not yet run"
7. **Close** — "Thank you, I welcome your questions."

---

## 不要 tonight 做的事

- ❌ 重写整个网站
- ❌ 注册 Vercel/Supabase（期末前做）
- ❌ 纠结 GitHub 密码（用 Token 或期中后再说）
- ❌ 编造用户调研数据

---

**你现在第一步：双击桌面 `Reframe-Destiny-Midterm.pptx`，看背景是否正确。**
