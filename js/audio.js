/* ═══ Ambient Audio (Web Audio API) ═══ */

const AudioEngine = {
  ctx: null,
  playing: false,
  nodes: [],

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  },

  start() {
    this.init();
    if (this.playing) return;
    const ctx = this.ctx;
    if (ctx.state === 'suspended') ctx.resume();

    // Wind noise (filtered brown noise)
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      lastOut = (lastOut + 0.02 * white) / 1.02;
      output[i] = lastOut * 3.5;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 400;
    windFilter.Q.value = 0.5;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.04;
    noise.connect(windFilter).connect(windGain).connect(ctx.destination);
    noise.start();
    this.nodes.push(noise);

    // Low drone
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 55;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.03;
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 120;
    drone.connect(droneFilter).connect(droneGain).connect(ctx.destination);
    drone.start();
    this.nodes.push(drone);

    // Harmonic layer
    const harm = ctx.createOscillator();
    harm.type = 'triangle';
    harm.frequency.value = 82.5;
    const harmGain = ctx.createGain();
    harmGain.gain.value = 0.015;
    harm.connect(harmGain).connect(ctx.destination);
    harm.start();
    this.nodes.push(harm);

    // Slow LFO on wind
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 200;
    lfo.connect(lfoGain).connect(windFilter.frequency);
    lfo.start();
    this.nodes.push(lfo);

    this.playing = true;
  },

  stop() {
    this.nodes.forEach(n => { try { n.stop(); } catch (_) {} });
    this.nodes = [];
    this.playing = false;
    if (this.ctx) { this.ctx.close(); this.ctx = null; }
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
