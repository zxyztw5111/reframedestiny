/* ═══ BaZi pillar chart & astrology wheel (from real calc) ═══ */

const EL_COLORS = {
  wood: '#6ecf8a',
  fire: '#f07167',
  earth: '#d4a853',
  metal: '#e8e4d8',
  water: '#6eb5ff',
};

const SIGN_GLYPH = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
const SIGN_ZH = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];

const ChartFX = {
  drawBazi(containerId, lang = 'zh', chartData = null) {
    const host = document.getElementById(containerId);
    if (!host) return;
    const bazi = chartData?.bazi || ChartCalc.computeBazi();
    if (!bazi) {
      host.innerHTML = `<p class="chart-caption">${lang === 'zh' ? '请先填写出生日期' : 'Enter birth date first'}</p>`;
      return;
    }

    host.innerHTML = `
      <div class="bazi-chart">
        <p class="chart-caption">${lang === 'zh' ? '四柱排盘（真实历法计算）' : 'Four Pillars (computed)'} · ${bazi.summary[lang === 'zh' ? 'zh' : 'en']}</p>
        <div class="bazi-pillars">
          ${bazi.pillars.map(p => `
            <div class="bazi-pillar">
              <span class="bazi-pillar__label">${lang === 'zh' ? p.label : p.enLabel}</span>
              <span class="bazi-cell bazi-cell--stem" style="--el:${EL_COLORS[p.meta.el]}">${p.stem}<small>${lang === 'zh' ? EL_ZH[p.meta.el] : p.meta.el}</small></span>
              <span class="bazi-cell bazi-cell--branch">${p.branch}</span>
            </div>
          `).join('')}
        </div>
        <div class="bazi-legend">
          ${Object.entries(EL_COLORS).map(([k, c]) =>
            `<span><i style="background:${c}"></i>${lang === 'zh' ? EL_ZH[k] : k}</span>`
          ).join('')}
        </div>
      </div>`;
  },

  drawAstro(canvasId, lang = 'zh', chartData = null) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const astro = chartData?.astro || ChartCalc.computeAstro();
    const parent = canvas.parentElement;
    const cssSize = Math.min(parent?.clientWidth || 400, 440);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const size = cssSize;
    canvas.width = Math.floor(size * dpr);
    canvas.height = Math.floor(size * dpr);
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    if (!astro) {
      ctx.fillStyle = 'rgba(232,213,163,0.6)';
      ctx.font = '14px serif';
      ctx.textAlign = 'center';
      ctx.fillText(lang === 'zh' ? '请先填写出生信息' : 'Enter birth data', cx, cy);
      return;
    }

    const outer = size * 0.46;
    const mid = size * 0.36;
    const inner = size * 0.2;
    const ascIdx = astro.ascSign?.index ?? 0;
    const ascOffset = -ascIdx * 30;

    const lonToAngle = (lon) => ((lon + ascOffset + 90) * Math.PI) / 180;

    ctx.fillStyle = 'rgba(5,8,16,0.85)';
    ctx.beginPath();
    ctx.arc(cx, cy, outer, 0, Math.PI * 2);
    ctx.fill();

    for (let h = 1; h <= 12; h++) {
      const cuspLon = ((ascIdx * 30) + (h - 1) * 30) % 360;
      const signIdx = Math.floor(cuspLon / 30) % 12;
      const a1 = lonToAngle(cuspLon);
      const a2 = lonToAngle((cuspLon + 30) % 360);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, outer, a1, a2);
      ctx.closePath();
      ctx.fillStyle = h % 2 ? 'rgba(201,169,98,0.04)' : 'rgba(90,138,122,0.03)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(201,169,98,0.18)';
      ctx.lineWidth = 1;
      ctx.stroke();

      const midA = lonToAngle(cuspLon + 15);
      const hx = cx + Math.cos(midA) * (mid + (outer - mid) * 0.55);
      const hy = cy + Math.sin(midA) * (mid + (outer - mid) * 0.55);
      ctx.fillStyle = 'rgba(232,213,163,0.7)';
      ctx.font = `600 ${Math.max(11, size * 0.034)}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(lang === 'zh' ? `${h}宫` : `H${h}`, hx, hy - size * 0.022);

      const inHouse = astro.planets.filter(p => p.house === h);
      const houseSign = lang === 'zh' ? SIGN_ZH[signIdx] : SIGN_GLYPH[signIdx];
      ctx.fillStyle = 'rgba(201,169,98,0.55)';
      ctx.font = `${Math.max(9, size * 0.026)}px system-ui, sans-serif`;
      ctx.fillText(houseSign, hx, hy + size * 0.018);

      if (inHouse.length) {
        const names = inHouse.map(p => lang === 'zh' ? p.zh : p.en).join('·');
        ctx.fillStyle = 'rgba(245,240,232,0.88)';
        ctx.font = `600 ${Math.max(8, size * 0.022)}px system-ui, sans-serif`;
        ctx.fillText(names, hx, hy + size * 0.04);
      }
    }

    for (let i = 0; i < 12; i++) {
      const signLon = i * 30;
      const a = lonToAngle(signLon + 15);
      const lx = cx + Math.cos(a) * (outer + size * 0.038);
      const ly = cy + Math.sin(a) * (outer + size * 0.038);
      ctx.fillStyle = 'rgba(245, 240, 232, 0.95)';
      ctx.font = `${Math.max(14, size * 0.05)}px serif`;
      ctx.fillText(SIGN_GLYPH[i], lx, ly);
      ctx.font = `${Math.max(9, size * 0.026)}px system-ui, sans-serif`;
      ctx.fillStyle = 'rgba(201,169,98,0.85)';
      ctx.fillText(lang === 'zh' ? SIGN_ZH[i] : SIGN_GLYPH[i], lx, ly + size * 0.03);
    }

    ctx.beginPath();
    ctx.arc(cx, cy, inner, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(201,169,98,0.35)';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    const used = [];
    astro.planets.forEach((p) => {
      if (p.longitude == null) return;
      const a = lonToAngle(p.longitude);
      let r = mid + ((p.house || 1) % 4) * ((outer - mid) / 5);
      const jitter = (used.filter(u => Math.abs(u - a) < 0.15).length) * size * 0.018;
      used.push(a);
      const x = cx + Math.cos(a) * (r + jitter);
      const y = cy + Math.sin(a) * (r + jitter);

      const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 0.035);
      glow.addColorStop(0, 'rgba(232,213,163,0.95)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.035, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f5f0e8';
      ctx.font = `600 ${Math.max(13, size * 0.042)}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(p.sym, x, y);

      ctx.fillStyle = 'rgba(245, 240, 232, 0.92)';
      ctx.font = `600 ${Math.max(9, size * 0.026)}px system-ui, sans-serif`;
      const label = lang === 'zh'
        ? `${p.zh}·${p.house || '?'}宫`
        : `${p.en} H${p.house || '?'}`;
      ctx.fillText(label, x, y + size * 0.038);
    });

    ctx.fillStyle = 'rgba(232,213,163,0.85)';
    ctx.font = `${size * 0.024}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText(lang === 'zh' ? astro.summary.zh : astro.summary.en, cx, size - size * 0.04);
  },
};
