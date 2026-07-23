#!/usr/bin/env python3
"""Build full English Swiss-style defense deck (12 slides) from template shell."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SHELL = ROOT / "reframe-destiny-defense.html"
OUT = ROOT / "reframe-destiny-defense-en-full.html"
TOTAL = 12

SLIDES = r"""
<!-- 01 · Cover -->
<section class="slide accent" data-layout="SWISS-COVER-ASCII" data-animate="hero">
  <div class="canvas-card" style="position:relative;overflow:hidden">
    <img src="images/starfield-1.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.22;pointer-events:none"/>
    <canvas class="ascii-bg" aria-hidden="true"></canvas>
    <div class="chrome-min" style="position:relative;z-index:2">
      <div class="l">Reframe Destiny · Generation AI 2026</div>
      <div class="r">IKB · 26.07 · 01 / __TOTAL__</div>
    </div>
    <div style="flex:1;padding:0;display:grid;grid-template-rows:auto 1fr auto;gap:2.6vh;position:relative;z-index:2">
      <div data-anim="kicker" class="t-meta" style="color:rgba(255,255,255,.78);letter-spacing:.22em">Research Defense</div>
      <h1 data-anim="title" style="align-self:center;font-family:var(--sans);font-weight:200;font-size:min(8.4vw,14.5vh);line-height:.94;letter-spacing:-.025em;color:#fff">Reframe<br/><span style="font-style:italic;font-weight:300">Destiny</span></h1>
      <div data-anim="bottom" style="display:grid;grid-template-rows:auto auto;gap:1.6vh;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh">
        <div data-anim="lead" class="lead" style="max-width:62ch;color:rgba(255,255,255,.86);font-weight:400;font-size:max(18px,1.2vw)">Identifying and reframing gendered bias in BaZi and astrological narratives</div>
        <div style="display:flex;justify-content:space-between;align-items:end">
          <div class="t-meta" style="color:rgba(255,255,255,.6)">Xintian Zhang · Lawted Wu</div>
          <div class="t-meta" style="color:rgba(255,255,255,.6)">→ arrow keys</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 02 · Agenda -->
<section class="slide light" data-layout="S16" data-animate="grid-reveal">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="t-meta">02 / __TOTAL__ · AGENDA</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.4vw,9.5vh);letter-spacing:-.02em;line-height:1.05">What we will cover</h2>
    </div>
    <div class="sub-grid-3-2" style="margin-top:2.4vh;flex:1">
      <article class="sub-card" data-anim="up"><span class="nb-corner">03</span><div class="ttl">Project &amp; design</div><div class="desc">Deep-space aesthetic · critical literacy loop</div></article>
      <article class="sub-card accent" data-anim="up"><span class="nb-corner">04</span><div class="ttl">Live demo</div><div class="desc">Consent → journey → survey</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">05</span><div class="ttl">Research question</div><div class="desc">RQ + hypothesis</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">06</span><div class="ttl">Literature</div><div class="desc">Gender · discourse · AI ethics</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">07</span><div class="ttl">Target users</div><div class="desc">Planned N = 15–25 · persona</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">08–11</span><div class="ttl">Method → findings</div><div class="desc">Pre/post · pilot N = 3</div></article>
    </div>
  </div>
</section>

<!-- 03 · Intro + aesthetic -->
<section class="slide light" data-layout="S22" data-animate="image-hero">
  <div class="canvas-card">
    <figure class="frame-img r-21x9 swiss-lined pos-face" data-anim="hero-img">
      <img src="images/04-hero-cover.png" alt="Reframe Destiny cover — lotus and deep space"/>
    </figure>
    <div class="image-hero-body" data-anim="line">
      <div class="t-meta">03 / __TOTAL__ · PROJECT INTRO</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(4.6vw,8vh);margin-top:1vh">Enter the scene — then question the script</h2>
      <p class="t-body-sm" style="max-width:72ch;margin-top:1.2vh">Fortune-telling is a <strong style="color:var(--accent)">narrative industry</strong>, not a neutral map. The site uses the same deep-space, lotus, and jade palette as the live product so users feel inside a reading before they learn to talk back.</p>
    </div>
    <div class="image-hero-stats" data-anim="stats">
      <div><div class="t-meta">LOOP</div><div class="t-h-prod" style="font-size:max(16px,1.1vw)">Read → tag bias → write back → compare reframe</div></div>
      <div><div class="t-meta">MODES</div><div class="t-h-prod" style="font-size:max(16px,1.1vw)">BaZi + Western astrology · bilingual</div></div>
      <div><div class="t-meta">TIME</div><div class="t-h-prod" style="font-size:max(16px,1.1vw)">~15 min critical literacy journey</div></div>
    </div>
  </div>
</section>

<!-- 04 · Live demo (early) -->
<section class="slide light" data-layout="S22" data-animate="split-statement">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1vh">
      <div class="t-meta">04 / __TOTAL__ · LIVE DEMO</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5vw,8.8vh)">Question the story — not yourself</h2>
      <p class="t-body-sm" style="max-width:70ch">Interact inside the frame: informed consent → pre-survey → six-step journey → post-survey. Anonymous rows log to Supabase.</p>
    </div>
    <div class="demo-iframe-wrap nav-safe-bottom-tight" data-demo-url-slot="true" data-anim="rules" style="margin-top:1.6vh;min-height:52vh">
      <!-- ★ DEMO URL: change iframe src below ★ -->
      <iframe class="demo-iframe" src="https://reframe-destiny.pages.dev/game/index.html" title="Reframe Destiny live demo" loading="lazy"></iframe>
    </div>
    <p class="t-meta" style="margin-top:1vh">src → <span style="color:var(--accent)">reframe-destiny.pages.dev/game/</span> · alt: reframe-destiny.vercel.app</p>
  </div>
</section>

<!-- 05 · Research question -->
<section class="slide" data-layout="S08" data-animate="duo-mirror">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="t-meta">05 / __TOTAL__ · RESEARCH QUESTION</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.4vw,9.5vh);letter-spacing:-.02em;line-height:1.05">What am I asking?</h2>
    </div>
    <div class="duo-compare" style="margin-top:4vh">
      <div class="col accent" data-anim="left">
        <div class="col-tag"><span class="num">RQ</span> Research question</div>
        <div class="col-ttl" style="font-size:min(3.8vw,6.8vh)">How does an AI-assisted interactive website affect young people's ability to identify and reframe gendered narrative bias in BaZi and Western astrological readings?</div>
      </div>
      <span class="vrule" data-anim="line"></span>
      <div class="col" data-anim="right">
        <div class="col-tag"><span class="num">H1</span> Hypothesis</div>
        <div class="col-ttl">After one session, bias awareness and reframing confidence will rise.</div>
        <ul class="col-list">
          <li>Same chart: men read as ambition, women as “too strong” or <em>ke-fu</em></li>
          <li>Workplace bias tools miss divination tropes</li>
          <li>AI fortune apps optimize insight, not critique</li>
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- 06 · Literature -->
<section class="slide light" data-layout="S04" data-animate="grid-reveal">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="t-meta">06 / __TOTAL__ · LITERATURE REVIEW</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.2vw,9.2vh)">Three anchors</h2>
      <p class="t-body-sm">Gender as performance · discourse as power · LLMs as narrative authority</p>
    </div>
    <div class="sub-grid-3-2" style="margin-top:2vh">
      <article class="sub-card accent" data-anim="up"><span class="nb-corner">01</span><div class="ttl">Butler (1990)</div><div class="desc"><em>Gender Trouble</em> — gender reproduced through repeated cultural scripts in second-person readings.</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">02</span><div class="ttl">Foucault (1972)</div><div class="desc"><em>Archaeology of Knowledge</em> — discourse limits who may speak and which social roles feel plausible.</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">03</span><div class="ttl">Bender et al. (2021)</div><div class="desc">Stochastic parrots — LLM outputs can act as authorities; here AI is a critique scaffold, not an oracle.</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">04</span><div class="ttl">Haraway (1988)</div><div class="desc">Situated knowledges — who speaks (master, app, AI) shapes what counts as a plausible reading.</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">05</span><div class="ttl">Gap</div><div class="desc">No public prototype combines BaZi + astrology with bias tagging and constrained reframing in one short session.</div></article>
      <article class="sub-card" data-anim="up"><span class="nb-corner">06</span><div class="ttl">This study</div><div class="desc">Critical without being dismissive — meta-linguistic awareness, not belief in fate per se.</div></article>
    </div>
  </div>
</section>

<!-- 07 · Target users -->
<section class="slide" data-layout="S19" data-animate="four-cards">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="t-meta">07 / __TOTAL__ · TARGET USERS</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.2vw,9.2vh)">Who we recruit</h2>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:2.4vw;margin-top:2.4vh;flex:1;align-content:start">
      <div class="card-fill" style="padding:2.4vh 2vw" data-anim="up">
        <div class="t-meta" style="margin-bottom:1.2vh">PERSONA · “curious fate-reader”</div>
        <p class="t-h-prod" style="font-size:max(18px,1.5vw);margin-bottom:1vh">Ages 15–35 · has tried BaZi, horoscope, or AI fortune chat</p>
        <p class="t-body-sm">Active on WeChat / Xiaohongshu · encounters gendered tropes (late marriage, <em>ke-fu</em>, “too strong”) as entertainment or advice.</p>
        <div style="margin-top:2vh;display:flex;flex-wrap:wrap;gap:.6vw">
          <span class="t-meta" style="border:1px solid var(--accent);color:var(--accent);padding:.35em .7em">Planned N = 15–25</span>
          <span class="t-meta" style="border:1px solid var(--grey-2);padding:.35em .7em">Paired pilot N = 3</span>
        </div>
      </div>
      <figure class="frame-img r-4x3" data-anim="up">
        <img src="images/03-bazi-scene.png" alt="BaZi input screen — local chart, no identity upload"/>
      </figure>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.4vw;margin-top:2vh" data-anim="up">
      <div style="border-top:2px solid var(--accent);padding-top:1.4vh"><div class="t-meta">RECRUIT</div><p class="t-body-sm">Classmates · WeChat · Xiaohongshu</p></div>
      <div style="border-top:2px solid var(--ink);padding-top:1.4vh"><div class="t-meta">ETHICS</div><p class="t-body-sm">Voluntary · anonymous · exit anytime</p></div>
      <div style="border-top:2px solid var(--grey-2);padding-top:1.4vh"><div class="t-meta">DATA</div><p class="t-body-sm">No names · birth data stays in browser</p></div>
      <div style="border-top:2px solid var(--grey-2);padding-top:1.4vh"><div class="t-meta">SESSION</div><p class="t-body-sm">~15 min · single sitting</p></div>
    </div>
  </div>
</section>

<!-- 08 · Method -->
<section class="slide" data-layout="S02" data-animate="progression">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
      <div class="t-meta">08 / __TOTAL__ · METHOD</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(5.4vw,9.5vh)">Within-subjects pre/post design</h2>
    </div>
    <div class="timeline-v" style="margin-top:2vh">
      <div class="tl-node accent"><span class="dot"></span><span class="yr">PRE</span><span class="multi">5<small> items</small></span><p class="desc">Likert scale (1–5): awareness, confidence, gender lens, agency, stereotypes</p></div>
      <div class="tl-node"><span class="dot"></span><span class="yr">JOURNEY</span><span class="multi">~15<small> min</small></span><p class="desc">Exposure to Reframe Destiny interactive prototype</p></div>
      <div class="tl-node accent"><span class="dot"></span><span class="yr">POST</span><span class="multi">5<small> items</small></span><p class="desc">Same five items · paired change · Supabase logs</p></div>
    </div>
    <div class="kpi-row-4" style="margin-top:auto;padding-bottom:2vh">
      <div class="kpi-cell"><div class="lbl">IV</div><div class="nb" style="font-size:1.8vw">Journey</div><div class="note">Absent at pre · present mid-session</div></div>
      <div class="kpi-cell"><div class="lbl">DV</div><div class="nb" style="font-size:1.8vw">Likert</div><div class="note">+ Court of Destiny text</div></div>
      <div class="kpi-cell"><div class="lbl">Analysis</div><div class="nb" style="font-size:1.8vw">Desc.</div><div class="note">No inference at N = 3</div></div>
      <div class="kpi-cell"><div class="lbl">Collected</div><div class="nb">Jul 11</div><div class="note">31 raw rows · 11 sessions</div></div>
    </div>
  </div>
</section>

<!-- 09 · Six-step journey + image -->
<section class="slide light" data-layout="S04" data-animate="grid-reveal">
  <div class="canvas-card">
    <div style="display:grid;grid-template-columns:1.05fr 1fr;gap:2.4vw;flex:1;min-height:0">
      <div>
        <div data-anim="line" style="display:flex;flex-direction:column;gap:1.4vh">
          <div class="t-meta">09 / __TOTAL__ · SIX-STEP JOURNEY</div>
          <h2 class="t-h-prod" style="font-weight:200;font-size:min(4.8vw,8.5vh)">Immersive critical path</h2>
        </div>
        <div class="sub-grid-3-2" style="margin-top:2vh;grid-template-columns:1fr 1fr">
          <article class="sub-card" data-anim="up"><span class="nb-corner">01</span><div class="ttl">Choose system</div><div class="desc">BaZi or Western chart</div></article>
          <article class="sub-card" data-anim="up"><span class="nb-corner">02</span><div class="ttl">Enter birth info</div><div class="desc">Local chart only</div></article>
          <article class="sub-card accent" data-anim="up"><span class="nb-corner">03</span><div class="ttl">Traditional read</div><div class="desc">Gendered classical framing first</div></article>
          <article class="sub-card" data-anim="up"><span class="nb-corner">04</span><div class="ttl">Bias scanner</div><div class="desc">Tag marriage / ke-fu / fear</div></article>
          <article class="sub-card" data-anim="up"><span class="nb-corner">05</span><div class="ttl">Court of Destiny</div><div class="desc">One sentence talking back</div></article>
          <article class="sub-card" data-anim="up"><span class="nb-corner">06</span><div class="ttl">Three columns</div><div class="desc">Traditional · modern · AI reframe</div></article>
        </div>
      </div>
      <figure class="frame-img r-3x4" data-anim="up" style="align-self:start">
        <img src="images/lotus-constellation.png" alt="Lotus constellation — bias stars light up as you tag"/>
      </figure>
    </div>
  </div>
</section>

<!-- 10 · Findings: pie + line + bars -->
<section class="slide" data-layout="S07" data-animate="bar-grow">
  <div class="canvas-card">
    <div data-anim="line" style="display:flex;flex-direction:column;gap:1.2vh">
      <div class="t-meta">10 / __TOTAL__ · FINDINGS · PILOT</div>
      <h2 class="t-h-prod" style="font-weight:200;font-size:min(4.8vw,8.5vh)">Preliminary results (2026-07-11)</h2>
      <p class="t-body-sm">31 submissions → 11 sessions → 6 journeys → <strong>3 complete pre/post pairs</strong>. Descriptive stats only.</p>
    </div>
    <div class="findings-grid" style="margin-top:1.6vh">
      <div class="chart-panel" data-anim="up">
        <div class="t-meta" style="margin-bottom:1vh">Recruitment funnel (11 sessions)</div>
        <div style="display:flex;gap:1.4vw;align-items:center">
          <svg class="swiss-chart-svg" viewBox="0 0 200 200" width="42%" aria-label="Pie chart: 3 paired, 3 journey only, 5 pre only">
            <circle cx="100" cy="100" r="78" fill="none" stroke="var(--grey-1)" stroke-width="1"/>
            <path d="M100,100 L100,22 A78,78 0 0,1 175.5,112 Z" fill="var(--accent)"/>
            <path d="M100,100 L175.5,112 A78,78 0 0,1 67.6,175.2 Z" fill="var(--ink)"/>
            <path d="M100,100 L67.6,175.2 A78,78 0 0,1 100,22 Z" fill="var(--grey-3)"/>
            <text x="100" y="96" text-anchor="middle" fill="var(--ink)" font-size="20" font-family="Inter">11</text>
            <text x="100" y="116" text-anchor="middle" fill="var(--grey-3)" font-size="10" font-family="JetBrains Mono">sessions</text>
          </svg>
          <div class="pie-legend">
            <div><span class="dot accent"></span> Full paired <strong>n=3</strong></div>
            <div><span class="dot ink"></span> Journey, no post <strong>n=3</strong></div>
            <div><span class="dot grey"></span> Pre only <strong>n=5</strong></div>
          </div>
        </div>
      </div>
      <div class="chart-panel" data-anim="up">
        <div class="t-meta" style="margin-bottom:1vh">Pre → post Likert means (N = 3 paired)</div>
        <svg class="swiss-chart-svg" viewBox="0 0 320 180" aria-label="Line chart of pre and post means">
          <line x1="28" y1="150" x2="300" y2="150" stroke="var(--grey-2)"/>
          <line x1="28" y1="30" x2="28" y2="150" stroke="var(--grey-2)"/>
          <text x="12" y="38" fill="var(--grey-3)" font-size="9">5</text>
          <text x="12" y="152" fill="var(--grey-3)" font-size="9">1</text>
          <line x1="62" y1="80" x2="78" y2="50" stroke="var(--accent)" stroke-width="2.5"/>
          <line x1="152" y1="100" x2="168" y2="70" stroke="var(--accent)" stroke-width="2.5"/>
          <line x1="242" y1="60" x2="258" y2="70" stroke="#9c5b46" stroke-width="2.5"/>
          <circle cx="62" cy="80" r="4" fill="none" stroke="var(--grey-3)" stroke-width="2"/>
          <circle cx="78" cy="50" r="4" fill="var(--accent)"/>
          <circle cx="152" cy="100" r="4" fill="none" stroke="var(--grey-3)" stroke-width="2"/>
          <circle cx="168" cy="70" r="4" fill="var(--accent)"/>
          <circle cx="242" cy="60" r="4" fill="none" stroke="var(--grey-3)" stroke-width="2"/>
          <circle cx="258" cy="70" r="4" fill="#9c5b46"/>
          <text x="70" y="168" text-anchor="middle" fill="var(--grey-3)" font-size="10">Awareness</text>
          <text x="160" y="168" text-anchor="middle" fill="var(--grey-3)" font-size="10">Confidence</text>
          <text x="250" y="168" text-anchor="middle" fill="var(--grey-3)" font-size="10">Agency</text>
          <text x="230" y="22" fill="var(--accent)" font-size="10">● post</text>
          <text x="230" y="36" fill="var(--grey-3)" font-size="10">○ pre</text>
        </svg>
        <p class="t-meta" style="margin-top:.6vh">ΔM: awareness +1.0 · confidence +1.0 · agency −0.33</p>
      </div>
      <div class="chart-panel full" data-anim="bars">
        <div class="t-meta" style="margin-bottom:1vh">Scanner means (journey n = 6) · top tags: virtuous wife, gender role, chastity (n=2 each)</div>
        <div class="h-bar-chart" style="margin-top:0">
          <div class="row-lbl">Heteronormativity</div><div class="row-track"><div class="row-fill accent" style="width:74%"></div></div><div class="row-val">0.74</div>
          <div class="row-lbl">Moral judgment</div><div class="row-track"><div class="row-fill ink" style="width:72%"></div></div><div class="row-val">0.72</div>
          <div class="row-lbl">Gender bias</div><div class="row-track"><div class="row-fill grey" style="width:44%"></div></div><div class="row-val">0.44</div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 11 · Conclusion -->
<section class="slide split" data-layout="S10" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-ink" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between">
        <div class="chrome-min" style="margin-bottom:0"><div class="l">11 / __TOTAL__</div><div class="r">IMPLICATIONS</div></div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh">
          <div class="t-meta on-dark">CONCLUSION</div>
          <h2 style="font-family:var(--sans);font-size:min(5.8vw,10vh);line-height:.96;font-weight:200;color:#fff">Divination can stay.<br/><span style="font-style:italic;font-weight:300">Bias</span> must be named.</h2>
          <p class="t-body-sm" style="color:rgba(255,255,255,.78);max-width:34ch">A ~15 min read–tag–write–compare loop embeds critical literacy inside fortune media.</p>
        </div>
        <div class="t-meta" style="color:rgba(255,255,255,.55)">Partial H1 support · seeing bias ≠ talking back</div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between">
        <div class="chrome-min"><div class="l">LIMITS</div><div class="r">HONEST</div></div>
        <div data-anim="rules" style="display:flex;flex-direction:column;gap:0">
          <div style="padding:2vh 0;border-top:1px solid var(--border-subtle)"><div class="t-h-prod" style="font-size:max(17px,1.2vw);color:var(--accent)">Sample</div><p class="t-body-sm">N = 3 paired vs planned 15–25 · 50% post attrition among journey completers</p></div>
          <div style="padding:2vh 0;border-top:1px solid var(--border-subtle)"><div class="t-h-prod" style="font-size:max(17px,1.2vw)">Measures</div><p class="t-body-sm">Self-report Likert · single session · template-dependent readings</p></div>
          <div style="padding:2vh 0;border-top:1px solid var(--border-subtle);border-bottom:2px solid var(--accent)"><div class="t-h-prod" style="font-size:max(17px,1.2vw);color:var(--accent)">Next</div><p class="t-body-sm">Recruit 5+ full sessions/week · reduce post drop-off · 3–5 short interviews</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- 12 · Thank you -->
<section class="slide split" data-layout="SWISS-CLOSING-ASCII" data-animate="split-statement">
  <div class="canvas-card">
    <div class="split-half">
      <div class="half b-accent" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between;position:relative;overflow:hidden">
        <img src="images/starfield-1.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.18;pointer-events:none"/>
        <canvas class="ascii-bg" aria-hidden="true"></canvas>
        <div class="chrome-min" style="margin-bottom:0;position:relative;z-index:1"><div class="l">12 / __TOTAL__</div><div class="r">THANK YOU</div></div>
        <div data-anim="manifesto" style="display:flex;flex-direction:column;gap:2vh;position:relative;z-index:1">
          <div class="t-meta" style="color:rgba(255,255,255,.78)">Q &amp; A</div>
          <h2 style="font-family:var(--sans);font-size:min(7.5vw,13vh);line-height:.94;font-weight:200;color:#fff">Thank you ·<br/><span style="font-style:italic;font-weight:300">questions welcome</span></h2>
          <p class="t-body-sm" style="color:rgba(255,255,255,.82)">Xintian Zhang<br/>reframe-destiny.pages.dev</p>
        </div>
        <div data-anim="signature" style="position:relative;z-index:1;border-top:1px solid rgba(255,255,255,.22);padding-top:2vh;display:flex;justify-content:space-between">
          <div class="t-meta" style="color:rgba(255,255,255,.62)">Generation AI 2026</div>
          <div class="t-meta" style="color:rgba(255,255,255,.62)">Lawted Wu</div>
        </div>
      </div>
      <div class="half" style="padding:5.6vh 3.6vw 4.4vh;justify-content:space-between;min-height:0">
        <div class="chrome-min"><div class="l">TRY IT</div><div class="r">LINK</div></div>
        <figure class="frame-img r-16x9" data-anim="up" style="flex:1;min-height:0">
          <img src="images/03-lotus-constellation.png" alt="Lotus and stars"/>
        </figure>
        <p class="t-body-sm" style="margin-top:1.2vh">Live site: <span style="color:var(--accent)">reframe-destiny.pages.dev</span> · GitHub: reframedestiny</p>
      </div>
    </div>
  </div>
</section>
"""

EXTRA_CSS = """
  .findings-grid{display:grid;grid-template-columns:1fr 1fr;gap:2vh 2vw;flex:1;min-height:0}
  .findings-grid .full{grid-column:1/-1}
  .chart-panel{background:var(--grey-1);border:1px solid var(--border-subtle);padding:1.8vh 1.6vw;display:flex;flex-direction:column;min-height:0}
  .swiss-chart-svg{max-height:22vh;width:100%}
  .pie-legend{display:flex;flex-direction:column;gap:.6vh;font-size:max(14px,.88vw)}
  .pie-legend .dot{display:inline-block;width:10px;height:10px;margin-right:.5em;vertical-align:middle}
  .pie-legend .dot.accent{background:var(--accent)}
  .pie-legend .dot.ink{background:var(--ink)}
  .pie-legend .dot.grey{background:var(--grey-3)}
"""


def main():
    html = SHELL.read_text(encoding="utf-8")
    slides = SLIDES.replace("__TOTAL__", str(TOTAL))

    html = html.replace('lang="zh-CN"', 'lang="en"')
    html = html.replace(
        "<title>Reframe Destiny · 研究答辩 Slides</title>",
        "<title>Reframe Destiny · Research Defense (EN Full)</title>",
    )
    html = html.replace(
        '<div id="hint">← → 翻页 · B 静态 · ESC 索引</div>',
        '<div id="hint">← → navigate · B static · ESC index · 12 slides</div>',
    )

    if ".findings-grid" not in html:
        html = html.replace("</style>", EXTRA_CSS + "\n</style>", 1)

    start = html.index('<div id="deck">') + len('<div id="deck">')
    end = html.index('<div id="nav">')
    html = html[:start] + "\n" + slides.strip() + "\n\n" + html[end:]

    OUT.write_text(html, encoding="utf-8")
    print(f"Wrote {OUT} ({TOTAL} slides)")


if __name__ == "__main__":
    main()
