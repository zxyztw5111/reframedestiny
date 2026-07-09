/* ═══ BaZi pillar chart & astrology wheel (from real calc) ═══ */

const EL_COLORS = {
  wood: '#6ecf8a',
  fire: '#f07167',
  earth: '#d4a853',
  metal: '#e8e4d8',
  water: '#6eb5ff',
};

const SIGN_GLYPH = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];

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
        <p class="chart-caption">${lang === 'zh' ? '四柱排盘' : 'Four Pillars'} · ${bazi.summary[lang === 'zh' ? 'zh' : 'en']}</p>
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
    const size = Math.min(parent?.clientWidth || 380, 380);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
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

    const outer = size * 0.44;
    const inner = size * 0.28;

    for (let ring = 3; ring >= 1; ring--) {
      ctx.beginPath();
      ctx.arc(cx, cy, (outer * ring) / 3, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(201,169,98,${0.1 + ring * 0.05})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      ctx.lineTo(cx + Math.cos(a) * outer, cy + Math.sin(a) * outer);
      ctx.strokeStyle = 'rgba(201,169,98,0.12)';
      ctx.stroke();

      const lx = cx + Math.cos(a) * (outer + size * 0.04);
      const ly = cy + Math.sin(a) * (outer + size * 0.04);
      ctx.fillStyle = 'rgba(232, 213, 163, 0.85)';
      ctx.font = `${size * 0.048}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(SIGN_GLYPH[i], lx, ly);
    }

    astro.planets.forEach((p, i) => {
      if (p.longitude == null) return;
      const a = (p.longitude * Math.PI) / 180 - Math.PI / 2;
      const r = inner + (outer - inner) * (0.25 + (i % 3) * 0.22);
      const x = cx + Math.cos(a) * r;
      const y = cy + Math.sin(a) * r;

      const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 0.04);
      glow.addColorStop(0, 'rgba(232,213,163,0.9)');
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.04, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f5f0e8';
      ctx.font = `600 ${size * 0.034}px serif`;
      ctx.fillText(p.sym, x, y + 1);

      ctx.fillStyle = 'rgba(201,169,98,0.75)';
      ctx.font = `${size * 0.022}px sans-serif`;
      ctx.fillText(lang === 'zh' ? p.sign.zh : p.sign.en, x, y + size * 0.055);
    });

    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.055, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(201,169,98,0.3)';
    ctx.fill();

    ctx.fillStyle = 'rgba(232,213,163,0.8)';
    ctx.font = `${size * 0.028}px serif`;
    ctx.textAlign = 'center';
    ctx.fillText(
      lang === 'zh' ? astro.summary.zh : astro.summary.en,
      cx,
      size - size * 0.06
    );
  },
};
