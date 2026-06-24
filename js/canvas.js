/* ═══ Canvas: Stars, Sand, Intro, Wanderer, Constellation, Radar ═══ */

const CanvasFX = {
  bgCanvas: null,
  sandCanvas: null,
  stars: [],
  sandParticles: [],
  animId: null,
  scrollY: 0,

  init() {
    this.bgCanvas = document.getElementById('bg-canvas');
    this.sandCanvas = document.getElementById('sand-canvas');
    if (!this.bgCanvas) return;

    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('scroll', () => { this.scrollY = window.scrollY; });

    this.initStars();
    this.initSand();
    this.loop();
  },

  resize() {
    [this.bgCanvas, this.sandCanvas].forEach(c => {
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    });
  },

  initStars() {
    this.stars = [];
    const count = Math.min(300, Math.floor(window.innerWidth * 0.15));
    for (let i = 0; i < count; i++) {
      this.stars.push({
        x: Math.random(),
        y: Math.random(),
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.0002 + 0.00005,
        opacity: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2
      });
    }
  },

  initSand() {
    this.sandParticles = [];
    const count = Math.min(120, Math.floor(window.innerWidth * 0.08));
    for (let i = 0; i < count; i++) {
      this.sandParticles.push({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0003,
        vy: -Math.random() * 0.0004 - 0.0001,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
  },

  loop() {
    this.drawStars();
    this.drawSand();
    this.animId = requestAnimationFrame(() => this.loop());
  },

  drawStars() {
    const c = this.bgCanvas;
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
    const t = Date.now() * 0.001;

    ctx.fillStyle = '#050810';
    ctx.fillRect(0, 0, w, h);

    // Deep gradient
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.3, 0, w * 0.5, h * 0.5, w * 0.8);
    grad.addColorStop(0, '#12101f');
    grad.addColorStop(0.5, '#0a0e1a');
    grad.addColorStop(1, '#050810');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    this.stars.forEach(s => {
      s.x += s.speed;
      if (s.x > 1) s.x = 0;
      const parallax = 1 + s.size * 0.1;
      const px = s.x * w;
      const py = (s.y * h + this.scrollY * 0.02 * parallax) % h;
      const tw = s.opacity * (0.6 + 0.4 * Math.sin(t * 2 + s.twinkle));
      ctx.beginPath();
      ctx.arc(px, py, s.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(245, 240, 232, ${tw})`;
      ctx.fill();
    });
  },

  drawSand() {
    const c = this.sandCanvas;
    if (!c) return;
    const ctx = c.getContext('2d');
    const w = c.width, h = c.height;
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

  /* ── Intro animation ── */
  runIntro(callback) {
    const canvas = document.getElementById('intro-canvas');
    const intro = document.getElementById('intro');
    if (!canvas || !intro) { callback(); return; }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const targetPoints = [];
    const w = canvas.width, h = canvas.height;
    const cx = w / 2, cy = h / 2 - 40;

    // Generate target positions for "REFRAME" text shape (simplified dot matrix)
    const text = 'REFRAME DESTINY';
    ctx.font = `300 ${Math.min(48, w * 0.06)}px Cormorant Garamond, serif`;
    ctx.textAlign = 'center';
    const metrics = ctx.measureText(text);
    const textW = metrics.width;

    // Sample points from text
    ctx.fillStyle = '#fff';
    ctx.fillText(text, cx, cy);
    const imageData = ctx.getImageData(cx - textW / 2 - 10, cy - 40, textW + 20, 60);
    ctx.clearRect(0, 0, w, h);

    for (let y = 0; y < imageData.height; y += 3) {
      for (let x = 0; x < imageData.width; x += 3) {
        const i = (y * imageData.width + x) * 4;
        if (imageData.data[i + 3] > 128) {
          targetPoints.push({
            x: cx - textW / 2 - 10 + x,
            y: cy - 40 + y
          });
        }
      }
    }

    // Create particles from edges
    const numParticles = Math.min(targetPoints.length, 800);
    for (let i = 0; i < numParticles; i++) {
      const target = targetPoints[i % targetPoints.length];
      const angle = Math.random() * Math.PI * 2;
      const dist = 200 + Math.random() * Math.max(w, h) * 0.5;
      particles.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        tx: target.x,
        ty: target.y,
        size: Math.random() * 2 + 0.5,
        delay: Math.random() * 0.5,
        phase: 'gather'
      });
    }

    let startTime = null;
    const gatherDuration = 2500;
    const holdDuration = 1200;
    const scatterDuration = 1500;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      ctx.clearRect(0, 0, w, h);

      particles.forEach(p => {
        let progress;
        if (elapsed < gatherDuration) {
          progress = Math.min(1, elapsed / gatherDuration);
          progress = 1 - Math.pow(1 - progress, 3);
          p.x = p.x + (p.tx - p.x) * 0.06 * progress;
          p.y = p.y + (p.ty - p.y) * 0.06 * progress;
        } else if (elapsed < gatherDuration + holdDuration) {
          p.x += (p.tx - p.x) * 0.15;
          p.y += (p.ty - p.y) * 0.15;
        } else {
          const scatterProgress = (elapsed - gatherDuration - holdDuration) / scatterDuration;
          if (scatterProgress < 1) {
            p.x += (Math.random() - 0.5) * 3;
            p.y += (Math.random() - 0.5) * 3 - 1;
            p.size *= 0.998;
          }
        }

        const alpha = elapsed > gatherDuration + holdDuration
          ? Math.max(0, 1 - (elapsed - gatherDuration - holdDuration) / scatterDuration)
          : Math.min(1, elapsed / 800);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 98, ${alpha * 0.8})`;
        ctx.fill();
      });

      if (elapsed < gatherDuration + holdDuration + scatterDuration) {
        requestAnimationFrame(animate);
      } else {
        intro.classList.add('fade-out');
        setTimeout(callback, 800);
      }
    };

    requestAnimationFrame(animate);
  },

  /* ── Wanderer silhouette ── */
  drawWanderer(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const t = Date.now() * 0.001;

    ctx.clearRect(0, 0, w, h);

    // Morphing humanoid from sand particles
    const points = [];
    const segments = 40;
    for (let i = 0; i < segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const morph = Math.sin(t * 0.5 + i * 0.3) * 8;
      const rx = 25 + morph;
      const ry = 45 + Math.sin(t + i) * 5;
      points.push({
        x: w / 2 + Math.cos(angle) * rx * (0.5 + 0.5 * Math.sin(t * 0.3)),
        y: h * 0.3 + Math.sin(angle) * ry + Math.sin(t * 2 + i) * 3
      });
    }

    ctx.beginPath();
    points.forEach((p, i) => {
      if (i === 0) ctx.moveTo(p.x, p.y);
      else ctx.lineTo(p.x, p.y);
    });
    ctx.closePath();
    ctx.fillStyle = 'rgba(201, 169, 98, 0.15)';
    ctx.fill();
    ctx.strokeStyle = `rgba(201, 169, 98, ${0.4 + 0.2 * Math.sin(t)})`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.arc(w / 2, h * 0.15 + Math.sin(t) * 3, 10 + Math.sin(t * 0.7) * 2, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(201, 169, 98, 0.25)';
    ctx.fill();

    // Floating sand motes
    for (let i = 0; i < 8; i++) {
      const sx = w / 2 + Math.sin(t * 1.5 + i) * 30;
      const sy = h * 0.5 + Math.cos(t + i * 0.8) * 20;
      ctx.beginPath();
      ctx.arc(sx, sy, 1, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 213, 163, ${0.3 + 0.3 * Math.sin(t + i)})`;
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

  /* ── Constellation map ── */
  drawConstellation(canvas, biases, unlocked, lang) {
    if (!canvas) return;
    const parent = canvas.parentElement;
    const size = Math.min(parent.clientWidth, 700);
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const cx = size / 2, cy = size / 2;
    const r = size * 0.38;
    const n = biases.length;
    const t = Date.now() * 0.001;

    ctx.clearRect(0, 0, size, size);

    // Background nebula
    const neb = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.2);
    neb.addColorStop(0, 'rgba(90, 138, 122, 0.05)');
    neb.addColorStop(1, 'transparent');
    ctx.fillStyle = neb;
    ctx.fillRect(0, 0, size, size);

    const positions = biases.map((_, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2 + Math.sin(i * 1.7) * 0.15;
      const dist = r * (0.6 + 0.4 * Math.abs(Math.sin(i * 2.3)));
      return { x: cx + Math.cos(angle) * dist, y: cy + Math.sin(angle) * dist };
    });

    // Connection lines (constellation)
    for (let i = 0; i < n; i++) {
      const j = (i + 3) % n;
      const bothUnlocked = unlocked.includes(biases[i].id) && unlocked.includes(biases[j].id);
      ctx.beginPath();
      ctx.moveTo(positions[i].x, positions[i].y);
      ctx.lineTo(positions[j].x, positions[j].y);
      ctx.strokeStyle = bothUnlocked
        ? `rgba(201, 169, 98, ${0.15 + 0.1 * Math.sin(t + i)})`
        : 'rgba(255,255,255,0.03)';
      ctx.stroke();
    }

    // Stars
    biases.forEach((b, i) => {
      const isUnlocked = unlocked.includes(b.id);
      const pos = positions[i];
      const glow = isUnlocked ? 8 + 4 * Math.sin(t * 2 + i) : 0;

      if (isUnlocked) {
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 6 + glow * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 169, 98, ${0.1 + 0.05 * Math.sin(t + i)})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(pos.x, pos.y, isUnlocked ? 4 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isUnlocked ? '#e8d5a3' : 'rgba(100,100,120,0.4)';
      ctx.fill();

      if (isUnlocked) {
        // Sparkle rays
        for (let j = 0; j < 4; j++) {
          const a = (j / 4) * Math.PI * 2 + t;
          ctx.beginPath();
          ctx.moveTo(pos.x, pos.y);
          ctx.lineTo(pos.x + Math.cos(a) * 10, pos.y + Math.sin(a) * 10);
          ctx.strokeStyle = `rgba(232, 213, 163, ${0.3 * Math.sin(t * 3 + j)})`;
          ctx.stroke();
        }
      }
    });

    return positions;
  }
};
