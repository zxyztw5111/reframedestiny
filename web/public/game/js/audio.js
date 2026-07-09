/* ═══ Ambient Audio (Web Audio API) — cinematic cosmic pad ═══ */

const AudioEngine = {
  ctx: null,
  playing: false,
  nodes: [],
  masterGain: null,

  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
  },

  start() {
    this.init();
    if (this.playing) return;
    const ctx = this.ctx;
    if (ctx.state === 'suspended') ctx.resume();

    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = 0.72;
    this.masterGain.connect(ctx.destination);

    // Wind / sand texture
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
    windFilter.frequency.value = 520;
    windFilter.Q.value = 0.45;
    const windGain = ctx.createGain();
    windGain.gain.value = 0.09;
    noise.connect(windFilter).connect(windGain).connect(this.masterGain);
    noise.start();
    this.nodes.push(noise);

    // Sub drone
    const drone = ctx.createOscillator();
    drone.type = 'sine';
    drone.frequency.value = 41;
    const droneGain = ctx.createGain();
    droneGain.gain.value = 0.11;
    const droneFilter = ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.value = 140;
    drone.connect(droneFilter).connect(droneGain).connect(this.masterGain);
    drone.start();
    this.nodes.push(drone);

    // Fifth harmonic — organ pad
    const organ = ctx.createOscillator();
    organ.type = 'triangle';
    organ.frequency.value = 82.5;
    const organGain = ctx.createGain();
    organGain.gain.value = 0.055;
    const organFilter = ctx.createBiquadFilter();
    organFilter.type = 'lowpass';
    organFilter.frequency.value = 420;
    organ.connect(organFilter).connect(organGain).connect(this.masterGain);
    organ.start();
    this.nodes.push(organ);

    const organ2 = ctx.createOscillator();
    organ2.type = 'sine';
    organ2.frequency.value = 123.5;
    const organ2Gain = ctx.createGain();
    organ2Gain.gain.value = 0.038;
    organ2.connect(organ2Gain).connect(this.masterGain);
    organ2.start();
    this.nodes.push(organ2);

    // Shimmer layer
    const shimmer = ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.value = 220;
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.018;
    const shimmerLfo = ctx.createOscillator();
    shimmerLfo.frequency.value = 0.12;
    const shimmerLfoGain = ctx.createGain();
    shimmerLfoGain.gain.value = 0.012;
    shimmerLfo.connect(shimmerLfoGain).connect(shimmerGain.gain);
    shimmer.connect(shimmerGain).connect(this.masterGain);
    shimmer.start();
    shimmerLfo.start();
    this.nodes.push(shimmer, shimmerLfo);

    // Slow swell
    const swell = ctx.createOscillator();
    swell.frequency.value = 0.06;
    const swellGain = ctx.createGain();
    swellGain.gain.value = 0.08;
    swell.connect(swellGain).connect(windFilter.frequency);
    swell.start();
    this.nodes.push(swell);

    this.playing = true;
  },

  stop() {
    this.nodes.forEach(n => { try { n.stop(); } catch (_) {} });
    this.nodes = [];
    this.masterGain = null;
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
