#!/usr/bin/env python3
"""Build short Chinese Swiss deck (6 slides). See build_deck_full_en.py for full English."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TEMPLATE = ROOT / ".agents/skills/guizang-ppt-skill/assets/template-swiss.html"
OUT = Path(__file__).resolve().parent / "reframe-destiny-defense.html"

SLIDES = r"""
<!-- 01 · 封面 -->
<section class="slide accent" data-layout="SWISS-COVER-ASCII" data-animate="hero">
  <div class="canvas-card">
    <canvas class="ascii-bg" aria-hidden="true"></canvas>
    <div class="chrome-min">
      <div class="l">Reframe Destiny · Generation AI 2026</div>
      <div class="r">IKB · 26.07 · 01 / 07</div>
    </div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:2.6vh">
      <div data-anim="kicker" class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em">Research Defense · 研究答辩</div>
      <h1 data-anim="title" style="align-self:center;font-family:var(--sans),var(--sans-zh);font-weight:200;font-size:min(9.2vw,16vh);line-height:.94;letter-spacing:-.025em;color:#fff">重塑<span style="font-style:italic;font-weight:300">命运</span><br/>Reframe Destiny</h1>
      <div data-anim="bottom" style="display:grid;grid-template-rows:auto auto;gap:1.6vh;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh">
        <div data-anim="lead" class="lead" style="max-width:58ch;color:rgba(255,255,255,.86);font-weight:400;font-size:max(18px,1.2vw)">识别与重构八字、星盘命理叙事中的性别偏见</div>
        <div style="display:flex;justify-content:space-between;align-items:end">
          <div class="t-meta" style="color:rgba(255,255,255,.6)">张昕田 Xintian Zhang · Lawted Wu</div>
          <div class="t-meta" style="color:rgba(255,255,255,.6)">→ 方向键翻页</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 02 · 研究问题 -->
<section class="slide" data-layout="S08" data-animate="duo-mirror">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="t-meta">02 / 07 · RESEARCH QUESTION</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.8vw,10.2vh);letter-spacing:-.02em;line-height:1.05">我想搞清楚什么？</h2>
    </div>
    <div class="duo-compare" style="margin-top:4vh">
      <div class="col accent" data-anim="left">
        <div class="col-tag"><span class="num">RQ</span> Research Question</div>
        <div class="col-ttl" style="font-size:min(4.2vw,7.4vh)">AI 辅助网站如何影响年轻人识别与重构八字、星盘中的性别偏见叙事？</div>
        <p class="col-desc">How does an AI-assisted interactive website affect young people's ability to identify and reframe gendered narrative bias in BaZi and Western astrological readings?</p>
      </div>
      <span class="vrule" data-anim="line"></span>
      <div class="col" data-anim="right">
        <div class="col-tag"><span class="num">WHY</span> Why It Matters</div>
        <div class="col-ttl">命理是叙事工业，不是中性地图</div>
        <ul class="col-list">
          <li>职场偏见工具扫不到「克夫」「晚婚」等命理话术</li>
          <li>AI 算命产品优化陪伴，不教读者质疑叙事权威</li>
          <li>同一命盘：男读成野心，女读成「太强」「克夫」</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- 03 · 方法 -->
<section class="slide" data-layout="S02" data-animate="progression">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="t-meta">03 / 07 · METHOD</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.8vw,10.2vh);letter-spacing:-.02em;line-height:1.05">我怎么做的？</h2>
    </div>
    <div class="timeline-v" style="margin-top:2vh">
      <div class="tl-node accent">
        <span class="dot"></span>
        <span class="yr">PRE</span>
        <span class="multi">5<small>题</small></span>
        <p class="desc">前测 Likert 量表（1–5）</p>
      </div>
      <div class="tl-node">
        <span class="dot"></span>
        <span class="yr">JOURNEY</span>
        <span class="multi">~15<small>分</small></span>
        <p class="desc">完整六步批判性读写旅程</p>
      </div>
      <div class="tl-node accent">
        <span class="dot"></span>
        <span class="yr">POST</span>
        <span class="multi">5<small>题</small></span>
        <p class="desc">后测同一量表 · 被试内设计</p>
      </div>
    </div>
    <div class="kpi-row-4" style="margin-top:auto;padding-bottom:2vh">
      <div class="kpi-cell">
        <div class="lbl">样本量</div>
        <div class="nb">15–25</div>
        <div class="note">15–35 岁 · 便利样本</div>
      </div>
      <div class="kpi-cell">
        <div class="lbl">招募</div>
        <div class="nb" style="font-size:2vw">同学</div>
        <div class="note">微信 · 小红书</div>
      </div>
      <div class="kpi-cell">
        <div class="lbl">系统</div>
        <div class="nb" style="font-size:2.2vw">双语</div>
        <div class="note">八字 + 西方星盘</div>
      </div>
      <div class="kpi-cell">
        <div class="lbl">伦理</div>
        <div class="nb" style="font-size:2vw">匿名</div>
        <div class="note">知情同意 · 可随时退出</div>
      </div>
    </div>
  </div>
</section>

<!-- 04 · 六步旅程 -->
<section class="slide" data-layout="S04" data-animate="grid-reveal">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="t-meta">04 / 07 · SIX-STEP JOURNEY</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.8vw,10.2vh);letter-spacing:-.02em;line-height:1.05">网站六步体验</h2>
    </div>
    <div class="sub-grid-3-2">
      <article class="sub-card" data-anim="up"><i data-lucide="git-branch" class="lucide"></i><span class="nb-corner">01</span><div class="ttl">选系统</div><div class="desc">八字 或 西方星盘</div></article>
      <article class="sub-card" data-anim="up"><i data-lucide="calendar" class="lucide"></i><span class="nb-corner">02</span><div class="ttl">输入生辰</div><div class="desc">本地排盘 · 不上传身份数据</div></article>
      <article class="sub-card accent" data-anim="up"><i data-lucide="scroll-text" class="lucide"></i><span class="nb-corner">03</span><div class="ttl">传统解读</div><div class="desc">先遇性别化古典叙事</div></article>
      <article class="sub-card" data-anim="up"><i data-lucide="scan-search" class="lucide"></i><span class="nb-corner">04</span><div class="ttl">偏见扫描</div><div class="desc">标注婚姻中心 · 克夫 · 恐惧叙事</div></article>
      <article class="sub-card" data-anim="up"><i data-lucide="pen-line" class="lucide"></i><span class="nb-corner">05</span><div class="ttl">命运法庭</div><div class="desc">写一句回怼 / 重写</div></article>
      <article class="sub-card" data-anim="up"><i data-lucide="columns-3" class="lucide"></i><span class="nb-corner">06</span><div class="ttl">三列对照</div><div class="desc">传统 · 现代 · AI 教学脚本</div></article>
    </div>
  </div>
</section>

<!-- 05 · 发现（待收集） -->
<section class="slide" data-layout="S19" data-animate="four-cards">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.6vh">
      <div style="height:2px;background:var(--accent);width:80px"></div>
      <div class="t-meta">05 / 07 · FINDINGS · DATA PENDING</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.2vw,9.2vh);letter-spacing:-.02em;line-height:1.05">发现 · 结果待收集（2026.07）</h2>
      <p class="t-body-sm" style="max-width:72ch">尚无实测数据。下列为计划报告的前/后测维度与假设方向，收集完成后填入 Likert 均值与配对变化。</p>
    </div>
    <div data-anim="up" style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.6vw;margin-top:3vh;flex:1;align-content:start">
      <div style="border-top:1px solid var(--border-subtle);padding-top:2vh">
        <div class="t-meta" style="margin-bottom:1.2vh">— 01</div>
        <div class="t-h-prod" style="font-size:max(18px,1.6vw);margin-bottom:1vh">偏见觉察</div>
        <p class="t-body-sm">能否注意到命理语言中的性别偏见</p>
        <div class="t-meta" style="margin-top:1.4vh;color:var(--accent)">待填入</div>
      </div>
      <div style="border-top:1px solid var(--border-subtle);padding-top:2vh">
        <div class="t-meta" style="margin-bottom:1.2vh">— 02</div>
        <div class="t-h-prod" style="font-size:max(18px,1.6vw);margin-bottom:1vh">重构信心</div>
        <p class="t-body-sm">是否有信心质疑或重写偏见叙事</p>
        <div class="t-meta" style="margin-top:1.4vh;color:var(--accent)">待填入</div>
      </div>
      <div style="border-top:1px solid var(--border-subtle);padding-top:2vh">
        <div class="t-meta" style="margin-bottom:1.2vh">— 03</div>
        <div class="t-h-prod" style="font-size:max(18px,1.6vw);margin-bottom:1vh">性别视角</div>
        <p class="t-body-sm">换性别后同一解读是否仍成立</p>
        <div class="t-meta" style="margin-top:1.4vh;color:var(--accent)">待填入</div>
      </div>
      <div style="border-top:1px solid var(--border-subtle);padding-top:2vh">
        <div class="t-meta" style="margin-bottom:1.2vh">— 04</div>
        <div class="t-h-prod" style="font-size:max(18px,1.6vw);margin-bottom:1vh">主体性</div>
        <p class="t-body-sm">拒绝让命定论决定「我必须成为谁」</p>
        <div class="t-meta" style="margin-top:1.4vh;color:var(--accent)">待填入</div>
      </div>
    </div>
    <div class="t-meta" style="margin-top:auto;padding-bottom:1vh">假设：使用后偏见觉察与重构信心提升 · N≥15 完整会话后报告推断统计</div>
  </div>
</section>

<!-- 06 · 意义与局限 -->
<section class="slide split" data-layout="S10" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-ink" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between">
        <div class="chrome-min" style="margin-bottom:0">
          <div class="l">06 / 07</div>
          <div class="r">IMPLICATIONS</div>
        </div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh">
          <div class="t-meta on-dark">CONCLUSION</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(6.4vw,11vh);line-height:.96;letter-spacing:-.025em;font-weight:200;color:#fff">命理可以保留，<br/><span style="font-style:italic;font-weight:300">偏见</span>必须被点名。</h2>
          <p class="t-body-sm" style="color:rgba(255,255,255,.78);max-width:34ch">短程「读—标—写—对照」流程，把批判读写嵌进算命场景本身。</p>
        </div>
        <div class="t-meta" style="color:rgba(255,255,255,.55)">局限：小样本 · 自陈量表 · 单次暴露 · 模板化解读</div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between">
        <div class="chrome-min"><div class="l">TAKEAWAYS</div><div class="r">03 POINTS</div></div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:0">
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.4vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(4vw,7vh);line-height:.9">01</div>
            <div><div class="t-h-prod" style="font-size:max(18px,1.6vw);margin-bottom:.8vh">教育意义</div><p class="t-body-sm">在年轻人真实接触命理的入口教「回嘴」，而非另开媒体素养课</p></div>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.4vh 0;border-top:1px solid var(--border-subtle)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(4vw,7vh);line-height:.9">02</div>
            <div><div class="t-h-prod" style="font-size:max(18px,1.6vw);margin-bottom:.8vh">设计意义</div><p class="t-body-sm">八字 + 星盘双语旅程，可复制为跨文化性别叙事偏见研究工具</p></div>
          </div>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:2vw;align-items:start;padding:2.4vh 0;border-top:1px solid var(--border-subtle);border-bottom:2px solid var(--accent)">
            <div style="font-family:var(--sans);font-weight:200;font-size:min(4vw,7vh);line-height:.9;color:var(--accent)">03</div>
            <div><div class="t-h-prod" style="font-size:max(18px,1.6vw);margin-bottom:.8vh;color:var(--accent)">诚实局限</div><p class="t-body-sm">便利样本、自报数据、单次 15 分钟；AI 重写依赖服务器，结果不可外推</p></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 07 · 谢谢 + Demo -->
<section class="slide split" data-layout="SWISS-CLOSING-ASCII" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between;position:relative;overflow:hidden">
        <canvas class="ascii-bg" aria-hidden="true"></canvas>
        <div class="chrome-min" style="margin-bottom:0;position:relative;z-index:1">
          <div class="l">07 / 07</div>
          <div class="r">THANK YOU</div>
        </div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.78)">Q &amp; A</div>
          <h2 style="font-family:var(--sans),var(--sans-zh);font-size:min(8vw,14vh);line-height:.94;letter-spacing:-.025em;font-weight:200;color:#fff">谢谢 ·<br/><span style="font-style:italic;font-weight:300">欢迎提问</span></h2>
          <p class="t-body-sm" style="color:rgba(255,255,255,.82);max-width:32ch">张昕田 Xintian Zhang<br/>reframe-destiny.vercel.app</p>
        </div>
        <div data-anim="signature" style="display:flex;justify-content:space-between;align-items:end;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.62)">Generation AI 2026</div>
          <div class="t-meta" style="color:rgba(255,255,255,.62)">2026.07</div>
        </div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between;min-height:0">
        <div class="chrome-min"><div class="l">LIVE DEMO</div><div class="r">IFRAME</div></div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:1.6vh;flex:1;min-height:0">
          <p class="t-body-sm">点击下方区域可交互体验（iframe 嵌入）。</p>
          <!-- ★ DEMO 网址替换处：修改下方 iframe 的 src 属性 ★ -->
          <div class="demo-iframe-wrap" data-demo-url-slot="true">
            <iframe class="demo-iframe" src="https://reframe-destiny.vercel.app" title="Reframe Destiny 互动 Demo" loading="lazy"></iframe>
          </div>
          <p class="t-meta">替换 demo：搜索 <code style="font-family:var(--mono);font-size:13px">data-demo-url-slot</code> 或 <code style="font-family:var(--mono);font-size:13px">class="demo-iframe"</code> 的 <code style="font-family:var(--mono);font-size:13px">src</code></p>
        </div>
        <div class="t-meta" style="text-align:right">→ 完 · END</div>
      </div>
    </div>
  </div>
</section>
"""

EXTRA_CSS = """
  /* Demo iframe slot (S22-adjacent live preview) */
  .demo-iframe-wrap{
    flex:1;min-height:0;border:1px solid var(--border-subtle);
    background:var(--grey-1);position:relative;overflow:hidden
  }
  .demo-iframe{
    position:absolute;inset:0;width:100%;height:100%;border:0;background:#fff
  }
"""


def main():
    html = TEMPLATE.read_text(encoding="utf-8")
    html = html.replace(
        "<title>[必填] 替换为 PPT 标题 · Deck Title</title>",
        "<title>Reframe Destiny · 研究答辩 Slides</title>",
    )
    html = html.replace("</style>", EXTRA_CSS + "\n</style>", 1)

    start = html.index('<div id="deck">') + len('<div id="deck">')
    end = html.index('<div id="nav">')
    html = html[:start] + "\n" + SLIDES.strip() + "\n\n" + html[end:]

    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT}")


if __name__ == "__main__":
    main()
