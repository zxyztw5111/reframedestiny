/* ═══ Background music — user-provided track (assets/bgm.m4a) ═══ */

const AudioEngine = {
  audio: null,
  playing: false,
  BGM_SRC: 'assets/bgm.m4a',
  VOLUME: 0.32,

  _ensureAudio() {
    if (this.audio) return this.audio;
    const el = new Audio(this.BGM_SRC);
    el.loop = true;
    el.preload = 'auto';
    el.volume = 0;
    el.addEventListener('ended', () => {
      if (this.playing) {
        el.currentTime = 0;
        el.play().catch(() => {});
      }
    });
    this.audio = el;
    return el;
  },

  async start() {
    if (this.playing) return;
    const el = this._ensureAudio();
    try {
      el.currentTime = 0;
      await el.play();
      this._fadeTo(this.VOLUME, 1200);
      this.playing = true;
    } catch (err) {
      console.warn('BGM play blocked or failed:', err);
      this.playing = false;
    }
  },

  stop() {
    if (!this.audio || !this.playing) return;
    this.playing = false;
    this._fadeTo(0, 900);
    setTimeout(() => {
      if (!this.playing && this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
      }
    }, 950);
  },

  _fadeTo(target, ms) {
    const el = this.audio;
    if (!el) return;
    const from = el.volume;
    const steps = 24;
    const stepMs = ms / steps;
    let i = 0;
    const tick = () => {
      if (!el) return;
      i += 1;
      el.volume = from + (target - from) * (i / steps);
      if (i < steps) setTimeout(tick, stepMs);
    };
    tick();
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
