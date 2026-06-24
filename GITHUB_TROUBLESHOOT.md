# GitHub 推送故障排除指南

> 适用情况：忘记密码、VPN 导致 TLS 错误、无法 `git push`

错误示例：
```
fatal: unable to access 'https://github.com/...': 
LibreSSL/3.3.6: error:1404B42E:SSL routines:ST_CONNECT:tlsv1 alert protocol version
```

---

## 方案 A：重置 GitHub 密码（推荐先做）

1. **关闭 VPN**（或换到美国/新加坡/日本节点）
2. 浏览器打开：https://github.com/login
3. 点击 **Forgot password?**
4. 输入用户名 `zxyztw5111` 和注册邮箱
5. 查邮箱，设置新密码
6. 重新登录 GitHub 网页，确认能打开 https://github.com/zxyztw5111/reframedestiny

---

## 方案 B：用 Token 代替密码（不用记密码）

GitHub 已不支持用账户密码 push，必须用 **Personal Access Token (PAT)**。

### 步骤：

1. 关闭 VPN，登录 GitHub
2. 打开：https://github.com/settings/tokens
3. 点击 **Generate new token (classic)**
4. Note 填 `reframe-destiny`，勾选 **repo** 权限
5. 生成后**复制 token**（只显示一次！）

### 用 Token 推送：

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
git push -u origin main
```

提示输入时：
- **Username:** `zxyztw5111`
- **Password:** 粘贴刚才的 **Token**（不是 GitHub 密码）

### 或写入 remote URL（一次性）：

```bash
git remote set-url origin https://zxyztw5111:你的TOKEN@github.com/zxyztw5111/reframedestiny.git
git push -u origin main
```

⚠️ Token 不要分享给任何人，不要提交到代码里。

---

## 方案 C：修复 TLS / VPN 错误

按顺序试，每试一条再 `git push`：

### 1. 关掉 VPN 再 push
很多 TLS 错误是 VPN 节点与 GitHub 不兼容。

### 2. 强制 HTTP/1.1
```bash
git config --global http.version HTTP/1.1
git push -u origin main
```

### 3. 改用 SSH（长期最稳）

```bash
# 生成 SSH 密钥（一路回车）
ssh-keygen -t ed25519 -C "你的邮箱@example.com"

# 复制公钥
cat ~/.ssh/id_ed25519.pub
```

把输出粘贴到：https://github.com/settings/keys → **New SSH key**

然后：
```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
git remote set-url origin git@github.com:zxyztw5111/reframedestiny.git
git push -u origin main
```

---

## 方案 D：期中汇报 push 失败也没关系

**明天口头答辩不强制要求 GitHub 能 push。**

你本地已有：
- 桌面 `Reframe-Destiny-Midterm.pptx`
- 完整网站 `/Users/zhangxinyun/Projects/reframe-destiny/index.html`
- 英文讲稿 `midterm-script.md`

答辩时可以：
1. 用 Keynote/PPT 打开桌面 PPT 汇报
2. 本地打开网站演示：`python3 -m http.server 8765` → 浏览器访问 `http://localhost:8765`
3. 期中后再修复 GitHub

---

## 快速检查清单

```bash
# 1. 网络能否访问 GitHub？
curl -I https://github.com

# 2. 本地 commit 是否完整？
cd /Users/zhangxinyun/Projects/reframe-destiny && git log --oneline -3

# 3. remote 地址
git remote -v
```

如果 `curl` 都失败 → 先修网络/VPN，再 push。
