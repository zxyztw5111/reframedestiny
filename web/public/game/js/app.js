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
  chartData: null,
  scannerScores: [],
  foundBiases: []
};

/* ── Navigation ── */
function navigate(view, opts = {}) {
  if (view === 'journey' && !opts.skipPreSurvey && !hasPreSurveyForSession()) {
    showPreSurvey(() => navigate('journey', { skipPreSurvey: true }));
    return;
  }

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const el = document.getElementById(`view-${view}`);
  if (el) el.classList.add('active');
  document.querySelectorAll(`[data-nav="${view}"]`).forEach(l => l.classList.add('active'));

  if (view === 'collection') renderCollection();
  if (view === 'archive') renderArchive();
  if (view === 'journey') updateJourneyUI();

  CanvasFX.setHomeInteractive(true);
  setLotusPrompt();
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

/* ── Lotus guide ── */
let lotusChatHistory = [];

function initLotusVideos() {
  const url = window.RD_CONFIG?.lotusVideo;
  if (!url) return;
  const consentV = document.getElementById('consent-video');
  const guideV = document.getElementById('lotus-guide-video');
  if (consentV && !consentV.src) consentV.src = url;
  if (guideV && !guideV.src) guideV.src = url;
}

function appendLotusChatMessage(role, text, extraClass = '') {
  const box = document.getElementById('lotus-chat-messages');
  if (!box) return null;
  const div = document.createElement('div');
  div.className = `lotus-chat-msg lotus-chat-msg--${role}${extraClass ? ` ${extraClass}` : ''}`;
  div.textContent = text;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
  return div;
}

function setLotusPrompt() {
  const prompt = LOTUS_PROMPTS[Math.floor(Math.random() * LOTUS_PROMPTS.length)];
  const el = document.getElementById('lotus-text');
  if (el) el.textContent = currentLang === 'zh' ? prompt.zh : prompt.en;
}

function openLotusDialog() {
  const box = document.getElementById('lotus-chat-messages');
  if (box && !box.children.length) {
    appendLotusChatMessage('assistant', t('lotus.welcome'));
    lotusChatHistory.push({ role: 'assistant', content: t('lotus.welcome') });
  }
  document.getElementById('lotus-chat-panel')?.classList.remove('hidden');
  document.getElementById('lotus-guide')?.classList.add('lotus-guide--chat-open');
  document.getElementById('lotus-dialog-input')?.focus();
}

function closeLotusDialog() {
  document.getElementById('lotus-chat-panel')?.classList.add('hidden');
  document.getElementById('lotus-guide')?.classList.remove('lotus-guide--chat-open');
  setLotusPrompt();
}

function lotusSystemPrompt() {
  const langLabel = currentLang === 'zh' ? '简体中文' : 'English';
  return (
    'You are 莲心 (Lotus Guide) in the Reframe Destiny research site. ' +
    'Reply in ' + langLabel + ' only, 2–4 short sentences (under 90 words). ' +
    'Answer the user\'s actual question — never repeat the same canned line. ' +
    'Topics you handle: BaZi, Western astrology, gender bias in fate/divination language, marriage centrism, ke-fu / husband-harming labels, fear narratives, personal agency, reframing narratives. ' +
    'Do NOT predict lucky dates, marriage timing, or anyone\'s real fortune. ' +
    'Do NOT claim metaphysical truth; teach critical reading of narratives. ' +
    'If the question is off-topic, briefly redirect to questioning fate-talk and gender scripts. ' +
    'Warm, plain, youth-friendly tone. No error messages about servers.'
  );
}

async function fetchLotusReply(userMessage) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: lotusSystemPrompt() },
        ...lotusChatHistory.slice(-8).map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userMessage }
      ],
      max_tokens: 220,
      temperature: 0.85
    })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Chat API failed');
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error('Empty response');
  return content;
}

async function sendLotusMessage() {
  const input = document.getElementById('lotus-dialog-input');
  const sendBtn = document.getElementById('lotus-dialog-send');
  const text = input?.value.trim();
  if (!text) return;

  appendLotusChatMessage('user', text);
  lotusChatHistory.push({ role: 'user', content: text });
  if (input) input.value = '';

  const thinkingEl = appendLotusChatMessage('assistant', t('lotus.thinking'), 'lotus-chat-msg--thinking');
  if (sendBtn) sendBtn.disabled = true;

  try {
    const reply = await fetchLotusReply(text);
    if (thinkingEl) thinkingEl.remove();
    appendLotusChatMessage('assistant', reply);
    lotusChatHistory.push({ role: 'assistant', content: reply });
    setLotusPrompt();
  } catch (err) {
    console.warn('[lotus chat]', err);
    if (thinkingEl) thinkingEl.remove();
    try {
      const retry = await fetchLotusReply(text);
      appendLotusChatMessage('assistant', retry);
      lotusChatHistory.push({ role: 'assistant', content: retry });
    } catch {
      const hint = currentLang === 'zh'
        ? '莲心想说：'
        : 'The lotus says: ';
      const fallback = LOTUS_PROMPTS[Math.floor(Math.random() * LOTUS_PROMPTS.length)];
      appendLotusChatMessage('assistant', hint + (currentLang === 'zh' ? fallback.zh : fallback.en));
    }
  } finally {
    if (sendBtn) sendBtn.disabled = false;
  }
}

const JOURNEY_STEPS = 6;

const READING_HIGHLIGHTS_ZH = [
  '克夫', '晚婚', '桃花', '不宜', '太强', '妇道', '正缘', '劫数', '命中注定', '婚姻', '顺从', '贞洁', '贤妻', '旺夫'
];
const READING_HIGHLIGHTS_EN = [
  'ke-fu', 'late marriage', 'peach blossom', 'unfit', 'too strong', 'wifely', 'husband', 'curse', 'destiny', 'marriage', 'obedien', 'chastity', 'virtuous', 'harm'
];

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function formatReadingHtml(text, lang) {
  const keywords = lang === 'zh' ? READING_HIGHLIGHTS_ZH : READING_HIGHLIGHTS_EN;
  const warnWords = lang === 'zh' ? ['克夫', '克', '不宜', '注定', '劫'] : ['ke-fu', 'harm', 'unfit', 'doomed', 'curse'];
  const parts = escapeHtml(text).split(/(【[^】]+】)/g);
  return parts.map((part) => {
    if (!part) return '';
    if (/^【[^】]+】$/.test(part)) {
      const emoji = part.includes('婚姻') || part.includes('Love') ? '💍'
        : part.includes('性格') || part.includes('Character') ? '🪞'
        : part.includes('事业') || part.includes('Career') ? '✨'
        : part.includes('重构') || part.includes('Reframed') ? '🌸'
        : part.includes('现代') || part.includes('Modern') ? '🧭'
        : '🔍';
      return `<span class="reading-emoji">${emoji}</span><span class="reading-section">${part}</span>`;
    }
    let html = part;
    keywords.forEach((kw) => {
      const re = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      html = html.replace(re, (m) => {
        const cls = warnWords.some(w => m.toLowerCase().includes(w.toLowerCase())) ? 'reading-warn' : 'reading-highlight';
        return `<span class="${cls}">${m}</span>`;
      });
    });
    return html;
  }).join('');
}

/* ── Journey ── */
function updateJourneyUI() {
  document.querySelectorAll('.journey-step').forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.step) === journey.step);
  });
  document.getElementById('step-num').textContent = journey.step;
  document.getElementById('journey-prev').disabled = journey.step === 1;

  const nextBtn = document.getElementById('journey-next');
  nextBtn.textContent = journey.step === JOURNEY_STEPS ? t('journey.finish') : t('journey.next');

  if (journey.step === 3) renderTraditionalReading();
  if (journey.step === 4) renderScanner();
  if (journey.step === 5) renderCourt();
  if (journey.step === 6) renderCompare();
}

function renderTraditionalReading() {
  const el = document.getElementById('traditional-reading');
  if (!journey.system) return;

  if (!journey.chartData) journey.chartData = ChartCalc.computeAll();

  const baziEl = document.getElementById('bazi-chart');
  const astroCanvas = document.getElementById('astro-chart-canvas');
  if (journey.system === 'bazi') {
    if (baziEl) { baziEl.classList.remove('hidden'); ChartFX.drawBazi('bazi-chart', currentLang, journey.chartData); }
    if (astroCanvas) astroCanvas.classList.add('hidden');
  } else {
    if (baziEl) baziEl.classList.add('hidden');
    if (astroCanvas) {
      astroCanvas.classList.remove('hidden');
      ChartFX.drawAstro('astro-chart-canvas', currentLang, journey.chartData);
    }
  }

  const readingText = ReadingEngine.getReading(
    journey.system,
    'traditional',
    currentLang,
    journey.chartData
  );

  el.innerHTML = `
    <p class="reading-source">${t('journey.readingSource')} · ${t('journey.s2.trad')}</p>
    <article class="reading-body">${readingText.split('\n\n').map(p => `<p>${formatReadingHtml(p, currentLang)}</p>`).join('')}</article>
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
  if (!newEl) return;
  newEl.innerHTML = text.split('\n\n').map(p => `<p>${formatReadingHtml(p, currentLang)}</p>`).join('');
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

async function renderCompare() {
  if (!journey.system) return;
  if (!journey.chartData) journey.chartData = ChartCalc.computeAll();

  const trad = ReadingEngine.getReading(journey.system, 'traditional', currentLang, journey.chartData);
  const modern = ReadingEngine.getReading(journey.system, 'modern', currentLang, journey.chartData);

  document.getElementById('reframe-traditional').innerHTML = formatReadingHtml(trad, currentLang);
  document.getElementById('reframe-modern').innerHTML = formatReadingHtml(modern, currentLang);

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
    reframedText = await fetchDeepSeekReframe(trad, biasLabels);
  } catch (err) {
    console.warn('[reframe] API unavailable, using preset', err);
    reframedText = ReadingEngine.getReading(journey.system, 'ai', currentLang, journey.chartData);
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
    session_id: getResearchSessionId(),
    system: journey.system,
    narrative_lens: 'traditional',
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
  journey.lens = 'traditional';
  journey.chartData = null;
  journey.foundBiases = [];
  journey.scannerScores = [];
  document.querySelectorAll('.system-card').forEach(c => c.classList.remove('selected'));
  document.getElementById('court-user').value = '';
  showPostSurvey(() => navigate('collection'));
}

function journeyNext() {
  if (journey.step === 1 && !journey.system) return;
  if (journey.step === 2) {
    journey.chartData = ChartCalc.computeAll();
    if (!journey.chartData?.birth) return;
    journey.lens = 'traditional';
  }
  if (journey.step === JOURNEY_STEPS) { completeJourney(); return; }
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
  setLotusPrompt();
  onSurveyLangChange();
  if (document.getElementById('view-journey').classList.contains('active')) updateJourneyUI();
  if (document.getElementById('view-collection').classList.contains('active')) renderCollection();
  if (document.getElementById('view-archive').classList.contains('active')) renderArchive();
}

/* ── Init ── */
function enterAppHome() {
  document.getElementById('app')?.classList.remove('hidden');
  showQuote();
  setLotusPrompt();
  initParallax();
  CanvasFX.setHomeInteractive(true);
  navigate('home');
}

function initSite() {
  CanvasFX.runVideoIntro(enterAppHome);
}

function skipIntroToHome() {
  const video = document.getElementById('intro-video');
  if (video) {
    video.pause();
    video.onended = null;
  }
  document.getElementById('intro')?.classList.add('fade-out');
  setTimeout(() => {
    document.getElementById('intro').style.display = 'none';
    enterAppHome();
  }, 350);
}

function setupConsentGate() {
  const gate = document.getElementById('consent-gate');
  const intro = document.getElementById('intro');
  const agreeBtn = document.getElementById('consent-agree');

  const enterAfterConsent = () => {
    gate.classList.add('hidden');
    intro?.classList.remove('hidden');
    initSite();
  };

  if (localStorage.getItem(CONSENT_KEY) === 'yes') {
    enterAfterConsent();
    return;
  }

  intro?.classList.add('hidden');
  agreeBtn?.addEventListener('click', () => {
    localStorage.setItem(CONSENT_KEY, 'yes');
    enterAfterConsent();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyI18n();
  initLotusVideos();
  CanvasFX.init();

  document.getElementById('intro-skip')?.addEventListener('click', skipIntroToHome);

  const embedded = new URLSearchParams(location.search).get('embedded') === '1';
  const showIntro = new URLSearchParams(location.search).get('showIntro') === '1';
  if (embedded && !showIntro) {
    document.getElementById('consent-gate')?.classList.add('hidden');
    document.getElementById('intro')?.classList.add('hidden');
    enterAppHome();
  } else if (embedded && showIntro) {
    document.getElementById('consent-gate')?.classList.add('hidden');
    document.getElementById('intro')?.classList.remove('hidden');
    initSite();
  } else {
    setupConsentGate();
  }

  document.getElementById('lotus-ask-btn')?.addEventListener('click', openLotusDialog);
  document.getElementById('lotus-dialog-close')?.addEventListener('click', closeLotusDialog);
  document.getElementById('lotus-dialog-send')?.addEventListener('click', sendLotusMessage);
  document.getElementById('lotus-dialog-input')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendLotusMessage();
    }
  });

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
      journey.lens = 'traditional';
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
