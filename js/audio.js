/*
 * Tiny retro synth using the Web Audio API — no audio files, nothing downloaded.
 * The AudioContext is created only after the player's first interaction, so nothing
 * ever autoplays.
 */
(function (AW) {
  'use strict';
  let ctx = null, master = null, enabled = true;

  function ensure() {
    if (!enabled) return null;
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.18;
      master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function tone(freq, start, dur, type, vol, slideTo) {
    const c = ensure(); if (!c) return;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'square';
    const t0 = c.currentTime + start;
    o.frequency.setValueAtTime(freq, t0);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.5, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }

  function noise(start, dur, vol, filterFreq, type) {
    const c = ensure(); if (!c) return;
    const len = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (type === 'crackle' ? (Math.random() < 0.06 ? 1 : 0.08) : 1);
    const src = c.createBufferSource(); src.buffer = buf;
    const f = c.createBiquadFilter(); f.type = type === 'crackle' ? 'highpass' : 'bandpass'; f.frequency.value = filterFreq || 800;
    const g = c.createGain();
    const t0 = c.currentTime + start;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol || 0.3, t0 + dur * 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(f); f.connect(g); g.connect(master);
    src.start(t0); src.stop(t0 + dur);
  }

  const N = { C4: 261.6, D4: 293.7, E4: 329.6, G4: 392, A4: 440, C5: 523.3, D5: 587.3, E5: 659.3, G5: 784, A5: 880, C6: 1046.5, E3: 164.8, G3: 196, B3: 246.9, A3: 220 };

  const SOUNDS = {
    submit: () => tone(N.A4, 0, 0.05, 'square', 0.25),
    error: () => { tone(150, 0, 0.09, 'square', 0.25); tone(120, 0.08, 0.12, 'square', 0.2); },
    hint: () => { tone(N.E5, 0, 0.08, 'triangle', 0.4); tone(N.A5, 0.07, 0.14, 'triangle', 0.35); },
    FREEZING: () => { noise(0, 0.7, 0.18, 1800); tone(N.E3, 0.02, 0.45, 'triangle', 0.35, 110); },
    COLD: () => { noise(0, 0.4, 0.08, 1400); tone(N.A3, 0.02, 0.18, 'triangle', 0.35); tone(N.G3, 0.17, 0.3, 'triangle', 0.3); },
    COOL: () => { tone(N.C4, 0.02, 0.14, 'triangle', 0.35); tone(N.E4, 0.13, 0.22, 'triangle', 0.3); },
    WARM: () => { tone(N.E4, 0.02, 0.1, 'square', 0.22); tone(N.G4, 0.1, 0.1, 'square', 0.22); tone(N.C5, 0.2, 0.22, 'square', 0.22); },
    HOT: () => { [N.G4, N.C5, N.E5, N.G5].forEach((f, i) => tone(f, 0.02 + i * 0.07, 0.14, 'square', 0.22)); },
    BURNING: () => {
      noise(0, 0.6, 0.2, 2500, 'crackle');
      [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => tone(f, 0.02 + i * 0.06, 0.16, 'square', 0.22));
    },
    FOUND: () => {
      [N.C5, N.E5, N.G5, N.C6].forEach((f, i) => tone(f, i * 0.09, 0.18, 'square', 0.25));
      [N.C5, N.E5, N.G5].forEach(f => tone(f, 0.42, 0.7, 'triangle', 0.22));
      noise(0.4, 0.8, 0.12, 3000, 'crackle');
    },
    LOST: () => { [N.E4, N.D4, N.C4, N.B3].forEach((f, i) => tone(f, i * 0.16, 0.24, 'triangle', 0.3)); },
    complete: () => { [N.C4, N.G4, N.C5, N.E5, N.G5].forEach((f, i) => tone(f, 0.9 + i * 0.05, 0.9, 'triangle', 0.12)); }
  };

  AW.Sound = {
    setEnabled(v) { enabled = !!v; if (!enabled && ctx) ctx.suspend(); },
    isEnabled: () => enabled,
    unlock() { if (enabled) ensure(); },
    play(name) { if (!enabled) return; try { (SOUNDS[name] || (() => {}))(); } catch (e) { /* audio is optional */ } }
  };
})(window.AW = window.AW || {});
