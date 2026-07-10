/* ═══ Ambient Audio — organ + space pad (Interstellar-inspired, no noise) ═══ */

const AudioEngine = {
  ctx: null,
  playing: false,
  nodes: [],
  masterGain: null,
  chordTimer: null,

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  },

  /** A minor / F / C / G — slow organ voicings */
  _chords() {
    return [
      [55, 82.5, 110, 164.81],   // Am: A1 E2 A2 E3
      [43.65, 65.41, 87.31, 130.81], // F
      [65.41, 98, 130.81, 196],  // C
      [49, 73.42, 98, 146.83],   // G
    ];
  },

  _makeOrganVoice(ctx, freq, gainNode, detune = 0) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.value = freq;
    osc2.frequency.value = freq * 2;
    osc1.detune.value = detune;
    osc2.detune.value = detune * 0.5;

    const voiceGain = ctx.createGain();
    voiceGain.gain.value = 0;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 680;
    filter.Q.value = 0.4;

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(voiceGain);
    voiceGain.connect(gainNode);

    osc1.start();
    osc2.start();

    return { osc1, osc2, voiceGain, filter };
  },

  _crossfadeVoices(voices, targetLevels, ctx, duration = 4.5) {
    const now = ctx.currentTime;
    voices.forEach((v, i) => {
      v.voiceGain.gain.cancelScheduledValues(now);
      v.voiceGain.gain.setValueAtTime(v.voiceGain.gain.value, now);
      v.voiceGain.gain.linearRampToValueAtTime(targetLevels[i] || 0, now + duration);
    });
  },

  start() {
    this.init();
    if (this.playing) return;
    const ctx = this.ctx;
    if (ctx.state === 'suspended') ctx.resume();

    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0;
    this.masterGain.connect(ctx.destination);

    const now = ctx.currentTime;
    this.masterGain.gain.setValueAtTime(0, now);
    this.masterGain.gain.linearRampToValueAtTime(0.38, now + 3);

    const organBus = ctx.createGain();
    organBus.gain.value = 1;
    const organFilter = ctx.createBiquadFilter();
    organFilter.type = 'lowpass';
    organFilter.frequency.value = 520;
    organBus.connect(organFilter).connect(this.masterGain);

    const chords = this._chords();
    const voices = chords[0].map((freq, i) =>
      this._makeOrganVoice(ctx, freq, organBus, (i - 1.5) * 3)
    );
    this._crossfadeVoices(voices, [0.09, 0.07, 0.055, 0.04], ctx, 0.01);

    const sub = ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.value = 27.5;
    const subGain = ctx.createGain();
    subGain.gain.value = 0.06;
    const subFilter = ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.value = 90;
    sub.connect(subFilter).connect(subGain).connect(this.masterGain);
    sub.start();
    this.nodes.push(sub, ...voices.flatMap(v => [v.osc1, v.osc2]));

    const spacePad = ctx.createOscillator();
    spacePad.type = 'sine';
    spacePad.frequency.value = 220;
    const padGain = ctx.createGain();
    padGain.gain.value = 0.012;
    const padLfo = ctx.createOscillator();
    padLfo.frequency.value = 0.05;
    const padLfoGain = ctx.createGain();
    padLfoGain.gain.value = 0.008;
    padLfo.connect(padLfoGain).connect(padGain.gain);
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'bandpass';
    padFilter.frequency.value = 440;
    padFilter.Q.value = 0.8;
    spacePad.connect(padFilter).connect(padGain).connect(this.masterGain);
    spacePad.start();
    padLfo.start();
    this.nodes.push(spacePad, padLfo);

    let chordIdx = 0;
    const rotateChord = () => {
      if (!this.playing) return;
      chordIdx = (chordIdx + 1) % chords.length;
      const next = chords[chordIdx];
      voices.forEach((v, i) => {
        const t = ctx.currentTime;
        v.osc1.frequency.linearRampToValueAtTime(next[i], t + 5);
        v.osc2.frequency.linearRampToValueAtTime(next[i] * 2, t + 5);
      });
      this._crossfadeVoices(voices, [0.09, 0.07, 0.055, 0.04], ctx, 5);
    };
    this.chordTimer = setInterval(rotateChord, 14000);

    this.playing = true;
    this._voices = voices;
    this._organBus = organBus;
  },

  stop() {
    if (this.chordTimer) { clearInterval(this.chordTimer); this.chordTimer = null; }
    const ctx = this.ctx;
    if (this.masterGain && ctx) {
      const now = ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.linearRampToValueAtTime(0, now + 1.2);
    }
    setTimeout(() => {
      this.nodes.forEach(n => { try { n.stop(); } catch (_) {} });
      this.nodes = [];
      this.masterGain = null;
      this.playing = false;
      if (this.ctx) { this.ctx.close(); this.ctx = null; }
    }, 1300);
  },

  toggle() {
    if (this.playing) {
      this.stop();
      return false;
    }
    this.start();
    return true;
  }
};
