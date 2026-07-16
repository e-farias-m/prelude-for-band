// audio.js
// Lightweight synthesized instrument tones using the Web Audio API.
// No audio files — every sound is generated. Lazily creates the
// AudioContext on first user gesture to respect autoplay policies.

const AudioEngine = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) {
      ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // ── ENVELOPE HELPER ─────────────────────────────────────────────────────
  function applyEnvelope(gainNode, t0, attack, decay, sustainLevel, releaseStart, release, peak = 0.9) {
    const g = gainNode.gain;
    g.cancelScheduledValues(t0);
    g.setValueAtTime(0.0001, t0);
    g.exponentialRampToValueAtTime(peak, t0 + attack);
    g.exponentialRampToValueAtTime(Math.max(sustainLevel, 0.0001), t0 + attack + decay);
    g.setValueAtTime(Math.max(sustainLevel, 0.0001), releaseStart);
    g.exponentialRampToValueAtTime(0.0001, releaseStart + release);
  }

  // ── RECORDER VOICE ──────────────────────────────────────────────────────
  // Breathy, pure-ish tone: sine fundamental + light noise for "breath"
  function playRecorder(freq, duration = 1.1) {
    const c = getCtx();
    const t0 = c.currentTime + 0.02;
    const out = c.createGain();
    out.connect(c.destination);

    // Fundamental
    const osc1 = c.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = freq;

    // Light upper partial for body
    const osc2 = c.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = freq * 2;
    const osc2Gain = c.createGain();
    osc2Gain.gain.value = 0.12;

    // Breath noise
    const noiseBuf = c.createBuffer(1, c.sampleRate * duration, c.sampleRate);
    const data = noiseBuf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
    const noise = c.createBufferSource();
    noise.buffer = noiseBuf;
    const noiseFilter = c.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = freq * 1.5;
    noiseFilter.Q.value = 0.6;
    const noiseGain = c.createGain();
    noiseGain.gain.value = 0.035;

    osc1.connect(out);
    osc2.connect(osc2Gain).connect(out);
    noise.connect(noiseFilter).connect(noiseGain).connect(out);

    applyEnvelope(out, t0, 0.045, 0.08, 0.65, t0 + duration - 0.18, 0.18, 0.85);

    osc1.start(t0); osc2.start(t0); noise.start(t0);
    osc1.stop(t0 + duration + 0.1);
    osc2.stop(t0 + duration + 0.1);
    noise.stop(t0 + duration + 0.1);
  }

  // ── BRASS VOICE (trumpet / euphonium / horn / trombone / tuba) ──────────
  // Buzzy core via sawtooth stack + bright filter sweep on attack
  function playBrass(freq, duration = 1.1, brightness = 1.0) {
    const c = getCtx();
    const t0 = c.currentTime + 0.02;
    const out = c.createGain();

    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(freq * 1.5, t0);
    filter.frequency.linearRampToValueAtTime(freq * (5 * brightness), t0 + 0.08);
    filter.frequency.linearRampToValueAtTime(freq * (3.2 * brightness), t0 + duration);

    filter.connect(out);
    out.connect(c.destination);

    const osc1 = c.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = freq;

    const osc2 = c.createOscillator();
    osc2.type = 'square';
    osc2.frequency.value = freq;
    const osc2Gain = c.createGain();
    osc2Gain.gain.value = 0.18;

    // Slight detune for thickness
    const osc3 = c.createOscillator();
    osc3.type = 'sawtooth';
    osc3.frequency.value = freq * 1.004;
    const osc3Gain = c.createGain();
    osc3Gain.gain.value = 0.5;

    // Subtle vibrato after the note settles
    const vibrato = c.createOscillator();
    vibrato.frequency.value = 5.2;
    const vibratoGain = c.createGain();
    vibratoGain.gain.value = 0;
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc1.frequency);
    vibratoGain.connect(osc3.frequency);
    vibratoGain.gain.setValueAtTime(0, t0);
    vibratoGain.gain.linearRampToValueAtTime(freq * 0.006, t0 + 0.55);

    osc1.connect(filter);
    osc2.connect(osc2Gain).connect(filter);
    osc3.connect(osc3Gain).connect(filter);

    applyEnvelope(out, t0, 0.06, 0.06, 0.7, t0 + duration - 0.15, 0.15, 0.8);

    [osc1, osc2, osc3, vibrato].forEach(o => o.start(t0));
    [osc1, osc2, osc3, vibrato].forEach(o => o.stop(t0 + duration + 0.1));
  }

  // ── WOODWIND VOICE (flute / clarinet / sax / oboe / bassoon) ────────────
  function playWoodwind(freq, duration = 1.1) {
    const c = getCtx();
    const t0 = c.currentTime + 0.02;
    const out = c.createGain();
    out.connect(c.destination);

    const osc1 = c.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.value = freq;

    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = freq * 3.5;
    filter.Q.value = 1.2;

    const osc2 = c.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = freq;
    const osc2Gain = c.createGain();
    osc2Gain.gain.value = 0.4;

    osc1.connect(filter).connect(out);
    osc2.connect(osc2Gain).connect(out);

    applyEnvelope(out, t0, 0.05, 0.07, 0.6, t0 + duration - 0.16, 0.16, 0.75);

    osc1.start(t0); osc2.start(t0);
    osc1.stop(t0 + duration + 0.1);
    osc2.stop(t0 + duration + 0.1);
  }

  // ── METRONOME CLICK ──────────────────────────────────────────────────────
  function playClick(accent = false, when = 0) {
    const c = getCtx();
    const t0 = c.currentTime + when + 0.01;
    const osc = c.createOscillator();
    osc.type = 'square';
    osc.frequency.value = accent ? 1400 : 900;
    const g = c.createGain();
    g.gain.setValueAtTime(accent ? 0.18 : 0.11, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.06);
    osc.connect(g).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + 0.08);
  }

  // ── PUBLIC: route by fingering type ─────────────────────────────────────
  const BRASS_TYPES = ['trumpet', 'trombone', 'horn', 'euphonium', 'tuba'];
  const WOODWIND_TYPES = ['flute', 'clarinet', 'saxophone', 'oboe', 'bassoon'];

  function playInstrumentNote(freq, fingeringType, duration = 1.1) {
    getCtx(); // ensure unlocked on this gesture
    if (fingeringType === 'recorder') {
      playRecorder(freq, duration);
    } else if (BRASS_TYPES.includes(fingeringType)) {
      playBrass(freq, duration);
    } else if (WOODWIND_TYPES.includes(fingeringType)) {
      playWoodwind(freq, duration);
    } else {
      playRecorder(freq, duration);
    }
  }

  // ── CHORD ──────────────────────────────────────────────────────────────
  function playChord(freqs, fingeringType, duration = 1.1) {
    if (!freqs || freqs.length === 0) return;
    freqs.forEach(freq => {
      if (freq == null) return;
      playInstrumentNote(freq, fingeringType, duration);
    });
  }

  function unlock() { getCtx(); }

  return { playInstrumentNote, playChord, playClick, unlock };
})();
