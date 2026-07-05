/* ═══ Main Application Logic ═══ */

const STORAGE_KEY = 'reframe-destiny-v1';
const CONSENT_KEY = 'rd-consent-v1';

const defaultState = () => ({
  journeys: 0,
  unlockedBiases: [],
  savedQuotes: [],
  reflections: [],
  lastQuoteIdx: -1
});

function loadState() {
  try {
    return { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY)) };
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

let state = loadState();

const journey = {
  step: 1,
  system: null,
  lens: null,
  scannerScores: [],
  foundBiases: []
};

/* ── Navigation ── */
function navigate(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const el = document.getElementById(`view-${view}`);
  if (el) el.classList.add('active');
  document.querySelectorAll(`[data-nav="${view}"]`).forEach(l => l.classList.add('active'));

  if (view === 'collection') renderCollection();
  if (view === 'archive') renderArchive();
  if (view === 'journey') updateJourneyUI();

  setWandererPrompt();
}

/* ── Daily Quote ── */
function showQuote(idx) {
  let quote;
  if (idx !== undefined) {
    quote = QUOTES[idx];
    state.lastQuoteIdx = idx;
  } else {
    let newIdx;
    do { newIdx = Math.floor(Math.random() * QUOTES.length); }
    while (newIdx === state.lastQuoteIdx && QUOTES.length > 1);
    quote = QUOTES[newIdx];
    state.lastQuoteIdx = newIdx;
  }

  document.getElementById('quote-original').textContent = `「${quote.original}」— ${quote.source}`;
  document.getElementById('quote-en').textContent = quote.en;
  document.getElementById('quote-practice').textContent =
    currentLang === 'zh' ? quote.practice.zh : quote.practice.en;
}

/* ── Wanderer ── */
function setWandererPrompt() {
  const prompt = WANDERER_PROMPTS[Math.floor(Math.random() * WANDERER_PROMPTS.length)];
  const el = document.getElementById('wanderer-text');
  if (el) el.textContent = currentLang === 'zh' ? prompt.zh : prompt.en;
}

/* ── Journey ── */
function updateJourneyUI() {
  document.querySelectorAll('.journey-step').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.step) === journey.step);
  });
  document.getElementById('step-num').textContent = journey.step;
  document.getElementById('journey-prev').disabled = journey.step === 1;

  const nextBtn = document.getElementById('journey-next');
  nextBtn.textContent = journey.step === 7 ? t('journey.finish') : t('journey.next');

  if (journey.step === 4) renderTraditionalReading();
  if (journey.step === 5) renderScanner();
  if (journey.step === 6) renderCourt();
  if (journey.step === 7) renderReframe();
}

function renderTraditionalReading() {
  const el = document.getElementById('traditional-reading');
  if (!journey.system) return;
  const lens = journey.lens || 'traditional';
  const key = lens === 'ai' ? 'traditional' : lens;
  const reading = READINGS[journey.system][key] || READINGS[journey.system].traditional;
  const cards = [
    { tag: currentLang === 'zh' ? '命局总论' : 'Chart Overview', text: reading },
    { tag: currentLang === 'zh' ? '情感与关系' : 'Emotion & Relations', text: reading }
  ];
  el.innerHTML = `
    <p class="reading-source">${t('journey.readingSource')} · ${t('journey.s2.' + (lens === 'ai' ? 'trad' : lens === 'traditional' ? 'trad' : 'modern'))}</p>
    ${cards.map((c, i) => `
      <article style="margin-top:${i ? '1.5rem' : '0'};padding-top:${i ? '1.5rem' : '0'};border-top:${i ? '1px solid rgba(201,169,98,0.12)' : 'none'}">
        <p style="font-size:0.7rem;letter-spacing:0.12em;color:var(--jade);margin-bottom:0.75rem">${c.tag}</p>
        <p>${currentLang === 'zh' ? c.text.zh : c.text.en}</p>
      </article>
    `).join('')}
  `;
}

function discoverBiasesForJourney() {
  if (journey.foundBiases.length) return journey.foundBiases;
  journey.foundBiases = getRandomBiases(FRAGMENTS_PER_JOURNEY, state.unlockedBiases);
  journey.foundBiases.forEach(b => {
    if (!state.unlockedBiases.includes(b.id)) state.unlockedBiases.push(b.id);
  });
  saveState(state);
  return journey.foundBiases;
}

function renderScanner() {
  journey.scannerScores = getScannerScores();
  const canvas = document.getElementById('radar-canvas');
  CanvasFX.drawRadar(canvas, journey.scannerScores, currentLang);

  const results = document.getElementById('scanner-results');
  results.innerHTML = journey.scannerScores.map(s => `
    <div class="scanner-item">
      <span>${currentLang === 'zh' ? s.zh : s.en}</span>
      <div class="scanner-bar">
        <div class="scanner-bar-fill" style="width: ${s.score * 100}%"></div>
      </div>
    </div>
  `).join('');

  const found = discoverBiasesForJourney();
  results.innerHTML += `
    <div class="fragments-found" style="margin-top:1rem">
      <h4>${t('journey.fragmentsFound')}</h4>
      ${found.map(b =>
        `<span class="fragment-tag">${currentLang === 'zh' ? b.zh : b.en}</span>`
      ).join('')}
    </div>
  `;
}

function renderCourt() {
  document.getElementById('court-scholar').textContent =
    currentLang === 'zh' ? COURT_DIALOGUES.scholar.zh : COURT_DIALOGUES.scholar.en;
  document.getElementById('court-ai').textContent =
    currentLang === 'zh' ? COURT_DIALOGUES.ai.zh : COURT_DIALOGUES.ai.en;
}

function animateReframeText(text) {
  const newEl = document.getElementById('reframe-new');
  newEl.innerHTML = text.split(/(\s+|[，。；：、])/).filter(Boolean).map((word, i) =>
    `<span class="word" style="animation-delay:${i * 0.04}s">${word}</span>`
  ).join('');
}

async function fetchDeepSeekReframe(originalText, biasLabels) {
  const langLabel = currentLang === 'zh' ? '简体中文' : 'English';
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        {
          role: 'system',
          content:
            'You are a feminist digital humanities assistant for the Reframe Destiny project. ' +
            'Rewrite divination/fate-reading text to remove gender bias, marriage-centrism, fatalism, and fear narratives. ' +
            'Keep similar length, preserve cultural context, empower agency. Output only the reframed paragraph, no preamble.'
        },
        {
          role: 'user',
          content:
            `Language: ${langLabel}\n` +
            `Original reading:\n${originalText}\n\n` +
            `Bias fragments detected this session: ${biasLabels.join(', ')}\n\n` +
            `Write a de-biased reframed version in ${langLabel}.`
        }
      ]
    })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Chat API failed');
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Empty response from chat API');
  return content;
}

async function renderReframe() {
  if (!journey.system) return;
  const reading = READINGS[journey.system];
  const original =
    currentLang === 'zh' ? reading.traditional.zh : reading.traditional.en;
  document.getElementById('reframe-original').textContent = original;

  const newEl = document.getElementById('reframe-new');
  newEl.textContent = t('journey.s7.loading');

  const found = journey.foundBiases.length ? journey.foundBiases : discoverBiasesForJourney();
  const fragEl = document.getElementById('fragments-found');
  fragEl.innerHTML = `
    <h4>${t('journey.fragmentsFound')}</h4>
    ${found.map(b =>
      `<span class="fragment-tag">${currentLang === 'zh' ? b.zh : b.en}</span>`
    ).join('')}
  `;

  const biasLabels = found.map(b => (currentLang === 'zh' ? b.zh : b.en));
  let reframedText;

  try {
    reframedText = await fetchDeepSeekReframe(original, biasLabels);
  } catch (err) {
    console.warn('[reframe] API unavailable, using preset', err);
    reframedText =
      (currentLang === 'zh' ? reading.reframed.zh : reading.reframed.en) +
      `\n\n${t('journey.s7.fallback')}`;
  }

  animateReframeText(reframedText);
}

function completeJourney() {
  state.journeys++;
  const userText = document.getElementById('court-user').value.trim();
  const found = journey.foundBiases.length ? journey.foundBiases : [];

  if (userText) {
    state.reflections.unshift({ text: userText, date: new Date().toISOString() });
  }

  submitResearch({
    submission_type: 'journey_complete',
    system: journey.system,
    narrative_lens: journey.lens,
    bias_ids: found.map(b => b.id),
    scanner_scores: journey.scannerScores.map(s => ({
      key: s.key,
      zh: s.zh,
      en: s.en,
      score: s.score
    })),
    reflection_text: userText || null,
    lang: currentLang
  });

  saveState(state);
  journey.step = 1;
  journey.system = null;
  journey.lens = null;
  journey.foundBiases = [];
  journey.scannerScores = [];
  document.querySelectorAll('.system-card, .lens-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('court-user').value = '';
  navigate('collection');
}

function journeyNext() {
  if (journey.step === 1 && !journey.system) return;
  if (journey.step === 2 && !journey.lens) return;
  if (journey.step === 7) { completeJourney(); return; }
  journey.step++;
  updateJourneyUI();
}

function journeyPrev() {
  if (journey.step > 1) { journey.step--; updateJourneyUI(); }
}

/* ── Collection ── */
let constellationPositions = [];

function renderCollection() {
  document.getElementById('collection-count').textContent = state.unlockedBiases.length;

  const canvas = document.getElementById('constellation-canvas');
  constellationPositions = CanvasFX.drawConstellation(canvas, BIASES, state.unlockedBiases, currentLang) || [];

  const list = document.getElementById('collection-list');
  list.innerHTML = BIASES.map(b => {
    const unlocked = state.unlockedBiases.includes(b.id);
    return `
      <div class="collection-item ${unlocked ? 'unlocked' : 'locked'}">
        <strong>${currentLang === 'zh' ? b.zh : b.en}</strong>
        <p>${unlocked ? (currentLang === 'zh' ? b.desc.zh : b.desc.en) : '???'}</p>
      </div>
    `;
  }).join('');

  // Animate constellation
  if (!renderCollection.animating) {
    renderCollection.animating = true;
    const animate = () => {
      if (document.getElementById('view-collection').classList.contains('active')) {
        constellationPositions = CanvasFX.drawConstellation(
          canvas, BIASES, state.unlockedBiases, currentLang
        ) || [];
        requestAnimationFrame(animate);
      } else {
        renderCollection.animating = false;
      }
    };
    requestAnimationFrame(animate);
  }
}

/* ── Archive ── */
function renderArchive() {
  document.getElementById('stat-journeys').textContent = state.journeys;
  document.getElementById('stat-biases').textContent = state.unlockedBiases.length;

  const earnedBadges = BADGES.filter(b => b.req(state));
  document.getElementById('stat-badges').textContent = earnedBadges.length;

  const quotesList = document.getElementById('saved-quotes-list');
  quotesList.innerHTML = state.savedQuotes.length
    ? state.savedQuotes.map(q => `<li>「${q.original}」— ${q.source}</li>`).join('')
    : `<li>${t('archive.empty')}</li>`;

  const reflList = document.getElementById('reflections-list');
  reflList.innerHTML = state.reflections.length
    ? state.reflections.map(r => `<li>${r.text}</li>`).join('')
    : `<li>${t('archive.empty')}</li>`;

  const badgeWall = document.getElementById('badge-wall');
  badgeWall.innerHTML = BADGES.map(b => {
    const earned = b.req(state);
    return `<span class="badge ${earned ? '' : 'locked'}">${currentLang === 'zh' ? b.zh : b.en}</span>`;
  }).join('');
}

/* ── Parallax ── */
function initParallax() {
  window.addEventListener('scroll', () => {
    document.querySelectorAll('.parallax').forEach(el => {
      const depth = parseFloat(el.dataset.depth) || 0.1;
      const offset = window.scrollY * depth;
      el.style.transform = `translateY(${offset}px)`;
    });
  });
}

/* ── Language change hook ── */
function onLangChange() {
  showQuote(state.lastQuoteIdx >= 0 ? state.lastQuoteIdx : undefined);
  setWandererPrompt();
  if (document.getElementById('view-journey').classList.contains('active')) updateJourneyUI();
  if (document.getElementById('view-collection').classList.contains('active')) renderCollection();
  if (document.getElementById('view-archive').classList.contains('active')) renderArchive();
}

/* ── Init ── */
function initSite() {
  CanvasFX.runIntro(() => {
    document.getElementById('intro').style.display = 'none';
    document.getElementById('app').classList.remove('hidden');
    CanvasFX.startWandererLoop();
    showQuote();
    setWandererPrompt();
    initParallax();
  });

  document.getElementById('intro-skip')?.addEventListener('click', () => {
    document.getElementById('intro').classList.add('fade-out');
    setTimeout(() => {
      document.getElementById('intro').style.display = 'none';
      document.getElementById('app').classList.remove('hidden');
      CanvasFX.startWandererLoop();
      showQuote();
      setWandererPrompt();
      initParallax();
    }, 400);
  });
}

function setupConsentGate() {
  const gate = document.getElementById('consent-gate');
  const intro = document.getElementById('intro');
  const agreeBtn = document.getElementById('consent-agree');

  if (localStorage.getItem(CONSENT_KEY) === 'yes') {
    gate.classList.add('hidden');
    intro.classList.remove('hidden');
    initSite();
    return;
  }

  intro.classList.add('hidden');
  agreeBtn?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'yes');
    gate.classList.add('hidden');
    intro.classList.remove('hidden');
    initSite();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  CanvasFX.init();
  setupConsentGate();

  // Nav
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => navigate(btn.dataset.nav));
  });

  document.getElementById('nav-toggle').addEventListener('click', () => {
    document.querySelector('.nav').classList.toggle('open');
  });

  const researchPanel = document.getElementById('research-panel');
  const researchToggle = document.getElementById('research-toggle');
  function setResearchOpen(open) {
    if (!researchPanel || !researchToggle) return;
    researchPanel.classList.toggle('hidden', !open);
    researchToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  researchToggle?.addEventListener('click', () => {
    setResearchOpen(researchPanel.classList.contains('hidden'));
  });
  document.getElementById('research-close')?.addEventListener('click', () => setResearchOpen(false));
  researchPanel?.addEventListener('click', (e) => {
    if (e.target === researchPanel) setResearchOpen(false);
  });

  // Lang & Music
  document.getElementById('lang-toggle').addEventListener('click', toggleLang);
  document.getElementById('music-toggle').addEventListener('click', () => {
    const playing = AudioEngine.toggle();
    document.getElementById('music-icon').textContent = playing ? '🔊' : '🔇';
    document.getElementById('music-toggle').setAttribute('aria-pressed', playing);
  });

  // Quote
  document.getElementById('refresh-quote').addEventListener('click', () => showQuote());
  document.getElementById('save-quote').addEventListener('click', () => {
    const q = QUOTES[state.lastQuoteIdx];
    if (q && !state.savedQuotes.find(s => s.original === q.original)) {
      state.savedQuotes.push(q);
      saveState(state);
    }
  });

  // Journey cards
  document.querySelectorAll('.system-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.system-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      journey.system = card.dataset.system;
    });
  });

  document.querySelectorAll('.lens-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.lens-card').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      journey.lens = card.dataset.lens;
    });
  });

  document.getElementById('journey-next').addEventListener('click', journeyNext);
  document.getElementById('journey-prev').addEventListener('click', journeyPrev);

  // Archive
  document.getElementById('save-reflection').addEventListener('click', () => {
    const text = document.getElementById('reflection-input').value.trim();
    if (text) {
      state.reflections.unshift({ text, date: new Date().toISOString() });
      document.getElementById('reflection-input').value = '';
      saveState(state);
      submitResearch({
        submission_type: 'archive_reflection',
        reflection_text: text,
        lang: currentLang
      });
      renderArchive();
    }
  });

  // Constellation tooltip
  const canvas = document.getElementById('constellation-canvas');
  const tooltip = document.getElementById('constellation-tooltip');
  if (canvas && tooltip) {
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const scale = canvas.width / rect.width;

      let found = false;
      BIASES.forEach((b, i) => {
        if (!constellationPositions[i]) return;
        const pos = constellationPositions[i];
        const dx = mx * scale - pos.x;
        const dy = my * scale - pos.y;
        if (Math.sqrt(dx * dx + dy * dy) < 15) {
          const unlocked = state.unlockedBiases.includes(b.id);
          tooltip.classList.remove('hidden');
          tooltip.style.left = `${e.clientX - rect.left + 12}px`;
          tooltip.style.top = `${e.clientY - rect.top - 10}px`;
          tooltip.innerHTML = unlocked
            ? `<strong>${currentLang === 'zh' ? b.zh : b.en}</strong><br>${currentLang === 'zh' ? b.desc.zh : b.desc.en}`
            : `<em>${t('collection.locked')}</em>`;
          found = true;
        }
      });
      if (!found) tooltip.classList.add('hidden');
    });
    canvas.addEventListener('mouseleave', () => tooltip.classList.add('hidden'));
  }
});
