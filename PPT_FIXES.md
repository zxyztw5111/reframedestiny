# PPT 修复说明 · Reframe Destiny Midterm

## 发现的问题

| 问题 | 说明 |
|------|------|
| **文字溢出** | `midterm-final.pptx` 正文过长，超出模版文本框，部分内容在幻灯片外 |
| **pptxgenjs 版** | `midterm.pptx` 版式较干净，但背景与官方 Stanford/北大模版不一致 |
| **姓名** | 需统一为 Xinyun Zhang (张馨云) |
| **演讲者备注** | 之前需手动粘贴讲稿；现已嵌入 PPT |

## 修复方案

1. **以官方模版为底**（`副本Generation-AI 中期汇报模版.pptx`）— 保留全部背景图与配色  
2. **缩短每页正文** — 每页最多 5–6 条，每条约 12 词  
3. **字体** — Times New Roman，正文 12pt，标题 20–24pt（不低于 12pt）  
4. **行距** — 1.15  
5. **删除说明页** — 第 1 页使用说明已移除  
6. **嵌入演讲者备注** — 9 页均已写入 `midterm-script-simple.md` 对应内容  

## 输出文件

- `/Users/zhangxinyun/Desktop/未来项目/Reframe-Destiny-Midterm-FIXED.pptx`  
- `/Users/zhangxinyun/Desktop/Reframe-Destiny-Midterm-FIXED.pptx`  

## 重新生成命令

```bash
cd /Users/zhangxinyun/Projects/reframe-destiny
python3 build_midterm_fixed.py
```

## 文件夹内 PPT 对照

| 文件 | 用途 |
|------|------|
| `Reframe-Destiny-期中汇报.pptx` | 用户之前保留的版本 |
| `midterm.pptx` | pptxgenjs 自动生成（背景非官方） |
| `midterm-final.pptx` | 旧版模版填充（文字过长） |
| **`Reframe-Destiny-Midterm-FIXED.pptx`** | ✅ **Office Hour / 期中请用这个** |
