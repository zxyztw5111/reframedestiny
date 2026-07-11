/* ═══ Canvas: Stars, Sand, Intro, Wanderer, Constellation, Radar ═══ */

/** v1 lotus draft — normalized 0–1, origin top-left (point 1 = index 0 … point 20 = index 19). */
const LOTUS_CONSTELLATION_POINTS = [
  [0.50, 0.06], [0.28, 0.14], [0.72, 0.14], [0.92, 0.38],
  [0.72, 0.72], [0.50, 0.94], [0.28, 0.72], [0.08, 0.38],
  [0.38, 0.24], [0.62, 0.24], [0.72, 0.34], [0.72, 0.58],
  [0.62, 0.76], [0.38, 0.76], [0.28, 0.58], [0.28, 0.42],
  [0.28, 0.34], [0.46, 0.44], [0.54, 0.44], [0.50, 0.52],
];

const LOTUS_CONSTELLATION_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 16], [16, 8],
  [17, 19], [19, 18], [18, 17],
  [19, 8], [19, 9], [19, 12], [19, 13], [19, 15], [19, 16],
  [0, 8], [9, 19], [12, 5], [13, 5],
  [7, 15], [15, 19], [10, 3], [11, 3],
];

const LOTUS_MAP_IMAGE_SRC = 'assets/lotus-constellation-draft.png';

const CanvasFX = {
  bgCanvas: null,
  sandCanvas: null,
  stars: [],
  sandParticles: [],
  animId: null,
  scrollY: 0,
  mouse: { x: -9999, y: -9999 },
  homeActive: false,
  lotusMapImage: null,
  lotusMapReady: false,

  initLotusMapImage() {
    if (this.lotusMapImage) return;
    const img = new Image();
    img.onload = () => { this.lotusMapReady = true; };
    img.onerror = () => { console.warn('[lotus map] failed to load', LOTUS_MAP_IMAGE_SRC); };
    img.src = LOTUS_MAP_IMAGE_SRC;
    this.lotusMapImage = img;
  },

  init() {
    this.bgCanvas = document.getElementById('bg-canvas');
    this.sandCanvas = document.getElementById('sand-canvas');
    if (!this.bgCanvas) return;

    this.initLotusMapImage();
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', () => { this.scrollY = window.scrollY; });
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.initStars();
    this.initSand();
    this.loop();
  },

  setHomeInteractive(active) {
    this.homeActive = active;
  },

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    [this.bgCanvas, this.sandCanvas].forEach(c => {
      if (!c) return;
      c.width = Math.floor(window.innerWidth * dpr);
      c.height = Math.floor(window.innerHeight * dpr);
      c.style.width = `${window.innerWidth}px`;
      c.style.height = `${window.innerHeight}px`;
      const ctx = c.getContext('2d');
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    });
  },

  initStars() {
    this.stars = [];
    const count = Math.min(380, Math.floor(window.innerWidth * 0.18));
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.6 + 0.25,
        speed: Math.random() * 0.00015 + 0.00004,
        opacity: Math.random() * 0.65 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        warm: Math.random() > 0.62,
        depth: Math.random(),
        vx: 0,
        vy: 0,
      });
    }
  },

  initSand() {
    this.sandParticles = [];
    const count = Math.min(220, Math.floor(window.innerWidth * 0.13));
    for (let i = 0; i < count; i++) {
      this.sandParticles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: -Math.random() * 0.0004 - 0.0001,
        size: Math.random() * 2.4 + 0.6,
        opacity: Math.random() * 0.58 + 0.16
      });
    }
  },

  loop() {
    this.drawStars();
    this.drawSand();
    this.animId = requestAnimationFrame(() => this.loop());
  },

  drawStarPoint(ctx, px, py, r, alpha, warm) {
    const glow = ctx.createRadialGradient(px, py, 0, px, py, r * 5);
    glow.addColorStop(0, warm ? `rgba(255, 230, 180, ${alpha})` : `rgba(200, 220, 255, ${alpha})`);
    glow.addColorStop(0.4, warm ? `rgba(255, 190, 100, ${alpha * 0.25})` : `rgba(140, 180, 255, ${alpha * 0.2})`);
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(px, py, r * 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
    ctx.lineWidth = Math.max(0.35, r * 0.4);
    const arm = r * (1.8 + r);
    ctx.beginPath();
    ctx.moveTo(px - arm, py);
    ctx.lineTo(px + arm, py);
    ctx.moveTo(px, py - arm);
    ctx.lineTo(px, py + arm);
    ctx.stroke();
  },

  drawStars() {
    const c = this.bgCanvas;
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    const t = Date.now() * 0.001;

    ctx.fillStyle = '#030508';
    ctx.fillRect(0, 0, w, h);

    const grad = ctx.createRadialGradient(w * 0.5, h * 0.28, 0, w * 0.5, h * 0.5, w * 0.85);
    grad.addColorStop(0, '#141028');
    grad.addColorStop(0.45, '#0a0e1c');
    grad.addColorStop(1, '#030508');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    this.stars.forEach(s => {
      s.x += s.speed * (0.5 + s.depth);
      if (s.x > 1) s.x = 0;

      const parallax = 1 + s.size * 0.12;
      let px = s.x * w;
      let py = (s.y * h + this.scrollY * 0.015 * parallax) % h;

      if (this.homeActive) {
        const pullRadius = 260;
        const dx = px - this.mouse.x;
        const dy = py - this.mouse.y;
        const dist = Math.hypot(dx, dy);
        const pull = dist < pullRadius ? (1 - dist / pullRadius) * (3.2 + s.depth * 2.5) : 0;
        s.vx += (dx / (dist || 1)) * pull * 0.1;
        s.vy += (dy / (dist || 1)) * pull * 0.1;
        s.vx *= 0.9;
        s.vy *= 0.9;
        px += s.vx;
        py += s.vy;
      }

      const tw = s.opacity * (0.55 + 0.45 * Math.sin(t * (1.5 + s.depth) + s.twinkle));
      this.drawStarPoint(ctx, px, py, s.size * (0.8 + s.depth * 0.5), tw, s.warm);
    });

    ctx.restore();
  },

  drawSand() {
    const c = this.sandCanvas;
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    this.sandParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < 0) { p.y = 1; p.x = Math.random(); }
      if (p.x < 0) p.x = 1;
      if (p.x > 1) p.x = 0;

      const px = p.x * w;
      const py = (p.y * h + this.scrollY * 0.05) % h;
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 169, 98, ${p.opacity})`;
      ctx.fill();
    });
  },

  /* ── Intro: lotus video, then home (no particle gather) ── */
  runVideoIntro(callback) {
    const intro = document.getElementById('intro');
    const video = document.getElementById('intro-video');
    if (!intro || !video) { callback(); return; }

    const finish = () => {
      intro.classList.add('fade-out');
      setTimeout(() => {
        intro.classList.add('hidden');
        intro.style.display = 'none';
        callback();
      }, 600);
    };

    video.currentTime = 0;
    video.play().catch(() => finish());
    video.onended = finish;
    setTimeout(finish, 12000);
  },

  /* ── Wanderer silhouette ── */
  drawWanderer(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const t = Date.now() * 0.001;

    ctx.clearRect(0, 0, w, h);

    const pulse = 0.65 + 0.35 * Math.sin(t * 1.4);
    const cx = w / 2;
    const headY = h * 0.18 + Math.sin(t) * 2;
    const torsoY = h * 0.48;
    const footY = h * 0.88;

    // Soft aura: a genderless figure made from light, not a literal person.
    const aura = ctx.createRadialGradient(cx, torsoY, 4, cx, torsoY, h * 0.55);
    aura.addColorStop(0, `rgba(232, 213, 163, ${0.22 + pulse * 0.08})`);
    aura.addColorStop(0.45, 'rgba(201, 169, 98, 0.08)');
    aura.addColorStop(1, 'rgba(201, 169, 98, 0)');
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.ellipse(cx, torsoY, w * 0.36, h * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(232, 213, 163, 0.65)';
    ctx.shadowBlur = 14;

    // Head
    ctx.beginPath();
    ctx.arc(cx, headY, 8 + pulse * 1.4, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(232, 213, 163, ${0.62 + pulse * 0.22})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Body line
    ctx.beginPath();
    ctx.moveTo(cx, headY + 11);
    ctx.bezierCurveTo(cx - 8, h * 0.38, cx + 10, h * 0.58, cx, footY);
    ctx.strokeStyle = `rgba(201, 169, 98, ${0.58 + pulse * 0.2})`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Arms as orbiting light ribbons
    ctx.beginPath();
    ctx.moveTo(cx - 20, h * 0.44 + Math.sin(t) * 2);
    ctx.quadraticCurveTo(cx, h * 0.38, cx + 20, h * 0.44 + Math.cos(t) * 2);
    ctx.strokeStyle = `rgba(90, 138, 122, ${0.42 + pulse * 0.18})`;
    ctx.lineWidth = 1.4;
    ctx.stroke();
    ctx.restore();

    // Floating sand motes around the figure
    for (let i = 0; i < 18; i++) {
      const radius = 16 + (i % 5) * 5;
      const sx = cx + Math.sin(t * 1.2 + i * 0.7) * radius;
      const sy = torsoY + Math.cos(t * 0.9 + i * 0.9) * (22 + (i % 4) * 4);
      ctx.beginPath();
      ctx.arc(sx, sy, 0.8 + (i % 3) * 0.35, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 213, 163, ${0.25 + 0.35 * Math.sin(t + i)})`;
      ctx.fill();
    }
  },

  startWandererLoop() {
    const canvas = document.getElementById('wanderer-canvas');
    if (!canvas) return;
    const loop = () => {
      this.drawWanderer(canvas);
      requestAnimationFrame(loop);
    };
    loop();
  },

  /* ── Radar chart ── */
  drawRadar(canvas, scores, lang) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.38;
    const n = scores.length;

    ctx.clearRect(0, 0, w, h);

    // Grid rings
    for (let ring = 1; ring <= 4; ring++) {
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
        const rr = r * (ring / 4);
        const x = cx + Math.cos(angle) * rr;
        const y = cy + Math.sin(angle) * rr;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(201, 169, 98, 0.1)';
      ctx.stroke();
    }

    // Axes & labels
    scores.forEach((s, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.strokeStyle = 'rgba(201, 169, 98, 0.15)';
      ctx.stroke();

      const lx = cx + Math.cos(angle) * (r + 24);
      const ly = cy + Math.sin(angle) * (r + 24);
      ctx.fillStyle = 'rgba(245, 240, 232, 0.6)';
      ctx.font = '11px Noto Serif SC, serif';
      ctx.textAlign = 'center';
      ctx.fillText(lang === 'zh' ? s.zh : s.en, lx, ly);
    });

    // Data polygon
    ctx.beginPath();
    scores.forEach((s, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const rr = r * s.score;
      const x = cx + Math.cos(angle) * rr;
      const y = cy + Math.sin(angle) * rr;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(201, 169, 98, 0.15)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(201, 169, 98, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Points
    scores.forEach((s, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const rr = r * s.score;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#c9a962';
      ctx.fill();
    });
  },

  lotusPositions(n, cx, cy, r, petalCount = 8) {
    const positions = [];
    for (let i = 0; i < n; i++) {
      const petal = i % petalCount;
      const slot = Math.floor(i / petalCount);
      const slotsOnPetal = Math.ceil(n / petalCount);
      const t = (slot + 0.35) / (slotsOnPetal + 0.5);
      const baseAngle = (petal / petalCount) * Math.PI * 2 - Math.PI / 2;
      const spread = 0.22;
      const angle = baseAngle + (slot - (slotsOnPetal - 1) / 2) * spread;
      const dist = r * (0.22 + t * 0.78);
      positions.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist * 0.52,
        petal,
      });
    }
    return positions;
  },

  drawLotusPetal(ctx, cx, cy, r, petalIndex, petalCount, alpha) {
    const base = (petalIndex / petalCount) * Math.PI * 2 - Math.PI / 2;
    const tipX = cx + Math.cos(base) * r * 0.95;
    const tipY = cy + Math.sin(base) * r * 0.5;
    const leftX = cx + Math.cos(base - 0.35) * r * 0.35;
    const leftY = cy + Math.sin(base - 0.35) * r * 0.2;
    const rightX = cx + Math.cos(base + 0.35) * r * 0.35;
    const rightY = cy + Math.sin(base + 0.35) * r * 0.2;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.quadraticCurveTo(leftX, leftY, tipX, tipY);
    ctx.quadraticCurveTo(rightX, rightY, cx, cy);
    ctx.closePath();
    ctx.fillStyle = `rgba(201, 169, 98, ${alpha * 0.06})`;
    ctx.fill();
    ctx.strokeStyle = `rgba(201, 169, 98, ${alpha * 0.2})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  },

  /* ── Constellation map — v1 draft image + 20 fixed star slots ── */
  drawConstellation(canvas, biases, unlocked, lang) {
    if (!canvas) return;
    const parent = canvas.parentElement;
    const size = Math.min(parent.clientWidth, 720);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const pad = size * 0.04;
    const t = Date.now() * 0.001;
    const cx = size / 2;
    const cy = size / 2;

    ctx.clearRect(0, 0, size, size);

    const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.48);
    neb.addColorStop(0, 'rgba(201, 169, 98, 0.1)');
    neb.addColorStop(0.55, 'rgba(90, 138, 122, 0.06)');
    neb.addColorStop(1, 'transparent');
    ctx.fillStyle = neb;
    ctx.fillRect(0, 0, size, size);

    const drawW = size - pad * 2;
    const drawH = size - pad * 2;
    if (this.lotusMapReady && this.lotusMapImage) {
      ctx.save();
      ctx.globalAlpha = 0.92;
      ctx.drawImage(this.lotusMapImage, pad, pad, drawW, drawH);
      ctx.restore();
    }

    const pointCount = LOTUS_CONSTELLATION_POINTS.length;
    const mappedBiases = Array.from({ length: pointCount }, (_, i) => biases[i] || null);

    const positions = LOTUS_CONSTELLATION_POINTS.map(([nx, ny]) => ({
      x: pad + nx * drawW,
      y: pad + ny * drawH,
    }));

    LOTUS_CONSTELLATION_EDGES.forEach(([a, b], i) => {
      const biasA = mappedBiases[a];
      const biasB = mappedBiases[b];
      const both = biasA && biasB
        && unlocked.includes(biasA.id) && unlocked.includes(biasB.id);
      ctx.beginPath();
      ctx.moveTo(positions[a].x, positions[a].y);
      ctx.lineTo(positions[b].x, positions[b].y);
      ctx.strokeStyle = both
        ? `rgba(232, 213, 163, ${0.38 + 0.14 * Math.sin(t + i)})`
        : 'rgba(255,255,255,0.04)';
      ctx.lineWidth = both ? 1.4 : 0.5;
      ctx.stroke();
    });

    mappedBiases.forEach((b, i) => {
      if (!b) return;
      const isUnlocked = unlocked.includes(b.id);
      const pos = positions[i];
      if (isUnlocked) {
        const gr = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 20);
        gr.addColorStop(0, 'rgba(232, 213, 163, 0.65)');
        gr.addColorStop(1, 'transparent');
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 16 + 5 * Math.sin(t * 2 + i), 0, Math.PI * 2);
        ctx.fill();
      }
      this.drawStarPoint(
        ctx,
        pos.x,
        pos.y,
        isUnlocked ? 2.4 : 1.0,
        isUnlocked ? 1 : 0.28,
        i % 3 !== 0
      );
    });

    return positions;
  }
};
