/*
 * The reactive pixel-art beach.
 *
 * One fixed 320Ã—180 scene, rendered per-pixel into an ImageData buffer and scaled up
 * with nearest-neighbour filtering. Geometry (islands, hut, palms, rocks, campfire ring)
 * is built ONCE into static sprite lists; every frame only re-colours and re-lights it
 * from the current palette, so all temperature states share the exact same composition.
 *
 * Layers, back to front:
 *   sky gradient + sun glow â†’ stars â†’ moon â†’ sun â†’ clouds â†’ sea (+waves, reflections)
 *   â†’ sand (+wet band, swash foam) â†’ static sprites (islands, hut, trunks, rocksâ€¦)
 *   â†’ palm fronds (sway) â†’ campfire flames â†’ additive lights (fire, window, aura)
 *   â†’ particles (frost, fireflies, motes, embers, sparkles, fireworks) â†’ mist.
 *
 * The scene changes ONLY through setTemperature(). Elapsed time drives animation
 * (waves, flicker, particles) but never which state is shown.
 */
(function (AW) {
  'use strict';

  const W = 320, H = 180, HOR = 100;
  const SUN_X = 160, MOON_X = 58, MOON_Y = 26;
  const FIRE_X = 140, FIRE_Y = 160;
  const WINDOW_X = 243, WINDOW_Y = 128;
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map(v => v / 16);

  // Material ids for static sprites.
  const M = { ISLAND: 1, ISLAND2: 2, TRUNK: 3, WALL: 4, ROOF: 5, ROCK: 6, WINDOW: 7, DOOR: 8, BOARD: 9, STAR: 10, SHELL: 11, LOG: 12 };

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ deterministic helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function hash2(x, y, s) {
    let h = (x * 374761393 + y * 668265263 + (s | 0) * 2147483647) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
  }
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), a | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function smoothNoise(x, y) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    const a = hash2(xi, yi, 7), b = hash2(xi + 1, yi, 7), c = hash2(xi, yi + 1, 7), d = hash2(xi + 1, yi + 1, 7);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);

  function shoreY(x) { return Math.round(129 + 3 * Math.sin(x * 0.045 + 0.6) + 2 * Math.sin(x * 0.11 + 2.1)); }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ static geometry â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  function buildGeometry() {
    const mat = new Uint8Array(W * H);
    const shade = new Uint8Array(W * H);
    const set = (x, y, m, s) => {
      x = Math.round(x); y = Math.round(y);
      if (x < 0 || y < 0 || x >= W || y >= H) return;
      mat[y * W + x] = m; shade[y * W + x] = s;
    };
    const rect = (x0, y0, x1, y1, m, s) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, m, s); };

    // Distant islands on the horizon.
    const island = (cx, hw, hgt, seed, m) => {
      const r = rng(seed);
      const bumps = [r() * 6, r() * 6, r() * 6];
      for (let x = cx - hw; x <= cx + hw; x++) {
        const dx = (x - cx) / hw;
        if (Math.abs(dx) > 1) continue;
        let h = hgt * Math.pow(1 - dx * dx, 0.7) + Math.sin(x * 0.3 + bumps[0]) * 0.8 + Math.sin(x * 0.13 + bumps[1]) * 1.2;
        h = Math.max(1, Math.round(h));
        for (let k = 0; k < h; k++) set(x, HOR - 1 - k, m, k === h - 1 ? 2 : k < 2 ? 0 : 1);
      }
    };
    island(64, 42, 10, 11, M.ISLAND);
    island(262, 30, 6, 23, M.ISLAND);
    island(236, 10, 4, 5, M.ISLAND2);
    // little palms on the far island
    [[76, 9], [84, 7]].forEach(([px, ph]) => {
      for (let k = 0; k < ph; k++) set(px + (k > ph * 0.6 ? 1 : 0), HOR - 9 - k, M.ISLAND2, 1);
      const top = HOR - 9 - ph;
      [[-3, 1], [-2, 0], [-1, 0], [1, 0], [2, 0], [3, 1], [-2, 1], [2, 1], [0, -1]].forEach(([dx, dy]) => set(px + 1 + dx, top + dy, M.ISLAND2, 1));
    });

    // Hut on short stilts.
    rect(218, 141, 219, 151, M.TRUNK, 0); rect(252, 141, 253, 151, M.TRUNK, 0);
    rect(235, 141, 236, 150, M.TRUNK, 0);
    rect(210, 139, 258, 141, M.WALL, 1); rect(210, 141, 258, 141, M.WALL, 0);
    for (let x = 210; x <= 258; x += 5) set(x, 140, M.WALL, 0);
    rect(203, 144, 209, 145, M.WALL, 1); rect(203, 145, 209, 145, M.WALL, 0); // steps
    rect(198, 148, 204, 149, M.WALL, 1); rect(198, 149, 204, 149, M.WALL, 0);
    for (let y = 121; y <= 138; y++) {
      for (let x = 218; x <= 253; x++) {
        let s = 1;
        if ((x - 218) % 4 === 3) s = 0;
        if (x <= 219) s = 2;
        if (x >= 252) s = 0;
        if (y <= 122) s = 0; // eave shadow
        set(x, y, M.WALL, s);
      }
    }
    rect(224, 126, 231, 138, M.DOOR, 1); rect(224, 126, 231, 126, M.WALL, 0); set(229, 132, M.WALL, 2);
    rect(238, 124, 249, 132, M.WALL, 0);
    rect(239, 125, 248, 131, M.WINDOW, 1);
    rect(243, 125, 244, 131, M.WALL, 0); rect(239, 128, 248, 128, M.WALL, 0);
    rect(237, 133, 250, 133, M.WALL, 2); // sill
    // Thatched roof.
    for (let y = 106; y <= 123; y++) {
      const hw = 9 + (y - 106) * 1.55;
      for (let x = Math.round(236 - hw); x <= Math.round(236 + hw); x++) {
        if (y >= 122 && hash2(x, y, 3) < 0.4) continue; // ragged fringe
        let s = ((y - 106) % 4 === 3) ? 0 : 1;
        if (x < 236 - hw * 0.35 && (y - 106) % 4 !== 3) s = 2;
        if (y === 106) s = 2;
        if (hash2(x, y, 9) < 0.12) s = Math.max(0, s - 1);
        set(x, y, M.ROOF, s);
      }
    }
    // Surfboard leaning on the hut.
    for (let y = 116; y <= 147; y++) {
      const t = (y - 116) / 31;
      const half = 3.2 * Math.sin(Math.PI * clamp(t * 1.05, 0, 1)) + 0.4;
      const cx = 266 - t * 4;
      for (let x = Math.round(cx - half); x <= Math.round(cx + half); x++) {
        const s = x <= Math.round(cx - half) ? 2 : (Math.abs(x - cx) < 0.7 ? 0 : 1);
        set(x, y, M.BOARD, s);
      }
    }

    // Rocks.
    const rock = (cx, cy, rx, ry) => {
      for (let y = cy - ry; y <= cy + ry; y++) for (let x = cx - rx; x <= cx + rx; x++) {
        const d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2;
        if (d > 1 || (y > cy && d > 0.75 && hash2(x, y, 1) < 0.5)) continue;
        const s = (y < cy - ry * 0.3 && x < cx + rx * 0.3) ? 2 : (y > cy + ry * 0.3 || x > cx + rx * 0.5 ? 0 : 1);
        set(x, y, M.ROCK, s);
      }
    };
    rock(98, 170, 9, 6); rock(110, 173, 6, 4); rock(88, 174, 5, 3); rock(292, 131, 6, 4); rock(301, 133, 4, 3);

    // Campfire ring and logs (always present; flames appear only when hot).
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2;
      const sx = FIRE_X + Math.cos(a) * 10, sy = FIRE_Y + 2 + Math.sin(a) * 3.4;
      rect(Math.round(sx) - 1, Math.round(sy) - 1, Math.round(sx) + 1, Math.round(sy), M.ROCK, 1);
      set(Math.round(sx) - 1, Math.round(sy) - 1, M.ROCK, 2);
      set(Math.round(sx) + 1, Math.round(sy), M.ROCK, 0);
    }
    for (let k = 0; k <= 14; k++) {
      set(FIRE_X - 7 + k, FIRE_Y + 3 - Math.round(k * 0.35), M.LOG, k % 5 === 0 ? 0 : 1);
      set(FIRE_X - 7 + k, FIRE_Y + 4 - Math.round(k * 0.35), M.LOG, 0);
      set(FIRE_X - 7 + k, FIRE_Y - 2 + Math.round(k * 0.35), M.LOG, k % 5 === 2 ? 0 : 2);
      set(FIRE_X - 7 + k, FIRE_Y - 1 + Math.round(k * 0.35), M.LOG, 1);
    }

    // Starfish and shells.
    [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1], [-2, -1], [2, -1], [-1, 2], [1, 2]].forEach(([dx, dy]) => set(182 + dx, 170 + dy, M.STAR, dx === 0 && dy === 0 ? 2 : 1));
    [[62, 152], [118, 141], [196, 158], [270, 166], [40, 160]].forEach(([x, y], i) => { set(x, y, M.SHELL, 2); set(x + 1, y, M.SHELL, 1); if (i % 2) set(x, y - 1, M.SHELL, 2); });

    // Palm trunks (fronds are separate, animated sprites).
    const palms = [
      { base: [30, 182], ctrl: [26, 116], top: [70, 64], w0: 7, w1: 4, litRight: true, phase: 0, scale: 1 },
      { base: [300, 182], ctrl: [308, 124], top: [282, 76], w0: 6, w1: 4, litRight: false, phase: 1.7, scale: 0.92 },
      { base: [196, 148], ctrl: [202, 122], top: [184, 98], w0: 3, w1: 2, litRight: true, phase: 3.1, scale: 0.55 }
    ];
    const bez = (p, s) => {
      const u = 1 - s;
      return [u * u * p.base[0] + 2 * u * s * p.ctrl[0] + s * s * p.top[0], u * u * p.base[1] + 2 * u * s * p.ctrl[1] + s * s * p.top[1]];
    };
    palms.forEach(p => {
      const steps = 220;
      for (let i = 0; i <= steps; i++) {
        const s = i / steps;
        const [cx, cy] = bez(p, s);
        const w = p.w0 + (p.w1 - p.w0) * s;
        const ring = Math.floor(s * 46 * p.scale) % 3 === 0;
        for (let k = Math.round(-w / 2); k <= Math.round(w / 2); k++) {
          let sh = 1;
          const edge = k >= Math.round(w / 2) ? 'r' : k <= Math.round(-w / 2) ? 'l' : '';
          if (edge === (p.litRight ? 'r' : 'l')) sh = 2;
          if (edge === (p.litRight ? 'l' : 'r')) sh = 0;
          if (ring && sh === 1) sh = 0;
          set(cx + k, cy, M.TRUNK, sh);
        }
      }
      // coconuts
      [[-2, 3], [2, 4], [0, 5]].forEach(([dx, dy]) => {
        const r = Math.max(1, Math.round(2 * p.scale));
        for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) if (x * x + y * y <= r * r + 0.5)
          set(p.top[0] + dx * p.scale + x, p.top[1] + dy * p.scale + y, M.LOG, (x < 0 && y < 0) ? 2 : 0);
      });
    });

    // Fronds as animated sprite pixels: [x, y, tip(0..1), shade, palmIndex]
    const fronds = [];
    const frondSpecs = [
      [[-2.75, 46], [-2.25, 40], [-1.75, 30], [-1.2, 34], [-0.55, 44], [-0.05, 42], [0.45, 30], [2.95, 34], [2.5, 26]],
      [[-2.85, 44], [-2.35, 40], [-1.8, 30], [-1.25, 32], [-0.6, 40], [-0.1, 38], [0.4, 28], [2.75, 30]],
      [[-2.8, 40], [-2.2, 36], [-1.5, 30], [-0.8, 34], [-0.15, 40], [0.5, 30], [2.7, 30]]
    ];
    palms.forEach((p, pi) => {
      frondSpecs[pi].forEach(([ang, len], fi) => {
        const L = len * p.scale;
        const dx = Math.cos(ang), dy = Math.sin(ang);
        const droop = 0.75;
        const seen = new Set();
        const put = (x, y, tip, sh) => {
          x = Math.round(x); y = Math.round(y);
          const key = x * 1000 + y;
          if (seen.has(key)) return;
          seen.add(key);
          fronds.push([x, y, tip, sh, pi]);
        };
        const n = Math.ceil(L * 1.6);
        for (let i = 0; i <= n; i++) {
          const s = i / n;
          const x = p.top[0] + dx * s * L;
          const y = p.top[1] + dy * s * L + droop * s * s * L;
          put(x, y, s, 2);
          put(x, y + 1, s, 1);
          // leaflets hang down and outward from the spine
          if (i % 2 === 0 && s > 0.08) {
            const ll = Math.max(1, Math.round((1 - s * 0.75) * L * 0.16));
            const side = dx >= 0 ? 1 : -1;
            for (let k = 1; k <= ll; k++) {
              put(x + side * k * 0.35, y + 1 + k, s, k === ll ? 0 : 1);
              put(x - side * k * 0.55, y + 1 + k * 0.8, s, k === ll ? 0 : 1);
            }
          }
        }
        void fi;
      });
    });

    // Compile static sprite list (only pixels that hold a material).
    const idx = [], mats = [], shades = [];
    for (let i = 0; i < W * H; i++) if (mat[i]) { idx.push(i); mats.push(mat[i]); shades.push(shade[i]); }

    // Sand texture shading (static).
    const sandShade = new Uint8Array(W * H);
    for (let x = 0; x < W; x++) {
      const sy = shoreY(x);
      for (let y = sy; y < H; y++) {
        const t = (y - sy) / (H - sy);
        const dune = Math.sin(x * 0.035 + y * 0.09) * 0.18 + Math.sin(x * 0.012 - 0.8) * 0.12;
        const v = 0.62 - t * 0.35 + dune + (hash2(x, y, 4) - 0.5) * 0.22;
        sandShade[y * W + x] = v > 0.64 + BAYER[(y & 3) * 4 + (x & 3)] * 0.12 ? 2 : v < 0.3 + BAYER[(y & 3) * 4 + (x & 3)] * 0.12 ? 0 : 1;
      }
    }

    return {
      idx: Uint32Array.from(idx), mats: Uint8Array.from(mats), shades: Uint8Array.from(shades),
      fronds, sandShade, palms
    };
  }

  // Clouds: [cx, cy, [[dx,dy,r]...]]
  function buildClouds() {
    const defs = [
      [36, 44, [[0, 0, 7], [8, -3, 6], [16, 0, 5], [-8, 2, 4], [24, 2, 3]]],
      [118, 24, [[0, 0, 5], [7, -2, 5], [13, 1, 4], [-6, 1, 3]]],
      [214, 46, [[0, 0, 6], [9, -3, 7], [18, 0, 5], [-8, 1, 4], [26, 2, 3]]],
      [290, 22, [[0, 0, 4], [6, -2, 5], [12, 0, 4]]]
    ];
    const clouds = defs.map(([cx, cy, blobs], ci) => {
      const px = [];
      const seen = new Set();
      blobs.forEach(([dx, dy, r]) => {
        for (let y = -r; y <= r; y++) for (let x = -Math.round(r * 1.6); x <= Math.round(r * 1.6); x++) {
          if ((x / 1.6) ** 2 + y * y > r * r) continue;
          const gx = cx + dx + x, gy = cy + dy + Math.round(y * 0.7);
          const key = gx * 1000 + gy;
          if (seen.has(key)) continue;
          seen.add(key);
          px.push([gx, gy]);
        }
      });
      // shade by vertical position inside the cloud
      let minY = Infinity, maxY = -Infinity;
      px.forEach(([, y]) => { minY = Math.min(minY, y); maxY = Math.max(maxY, y); });
      return { phase: ci * 1.9, px: px.map(([x, y]) => [x, y, y <= minY + (maxY - minY) * 0.35 ? 2 : y >= maxY - 1 ? 0 : 1]) };
    });
    // Long thin strata near the horizon (sunset streaks).
    const strata = [];
    [].forEach(([x0, y, len], i) => {
      for (let k = 0; k < len; k++) {
        const thick = (k > 3 && k < len - 4) ? 2 : 1;
        for (let t = 0; t < thick; t++) strata.push([x0 + k, y + t, t === 0 ? 2 : 1, i]);
      }
    });
    return { clouds, strata };
  }

  function buildStars() {
    const r = rng(99);
    const s = [];
    for (let i = 0; i < 90; i++) s.push({ x: Math.floor(r() * W), y: Math.floor(r() * 84), b: 0.4 + r() * 0.6, ph: r() * 6.28, sp: 0.6 + r() * 2, big: r() < 0.07 });
    return s;
  }

  function buildParticles() {
    const r = rng(1234);
    const make = (n, f) => Array.from({ length: n }, (_, i) => f(i));
    return {
      frost: make(110, () => ({ x: r() * W, y: r() * H, vx: 3 + r() * 6, vy: 5 + r() * 7, th: r(), big: r() < 0.15, ph: r() * 6 })),
      fireflies: make(26, () => ({ x: 20 + r() * 280, y: 108 + r() * 58, rx: 4 + r() * 12, ry: 2 + r() * 6, sp: 0.3 + r() * 0.6, ph: r() * 6.28, th: r() })),
      motes: make(60, () => ({ x: r() * W, y: r() * H, vy: 2 + r() * 5, sw: 2 + r() * 5, ph: r() * 6.28, th: r() })),
      embers: make(48, () => ({ seed: r(), rate: 0.35 + r() * 0.5, sw: 3 + r() * 8, th: r(), ph: r() * 6.28 })),
      sparkles: make(70, () => ({ x: Math.floor(r() * W), y: HOR + 2 + Math.floor(r() * 26), ph: r() * 6.28, sp: 1.5 + r() * 3, th: r() }))
    };
  }

  // â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ renderer â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  class Beach {
    constructor(canvas, opts) {
      opts = opts || {};
      this.canvas = canvas;
      canvas.width = W; canvas.height = H;
      this.ctx = canvas.getContext('2d');
      this.img = this.ctx.createImageData(W, H);
      this.buf = this.img.data;
      this.geo = buildGeometry();
      this.sky = buildClouds();
      this.stars = buildStars();
      this.parts = buildParticles();
      this.reducedMotion = !!opts.reducedMotion;
      this.t = 0;          // animation clock (seconds of rendering), NOT wall-clock state
      this.state = 'IDLE';
      this.from = Object.assign({}, AW.BeachPalettes.COMPILED.IDLE);
      this.to = this.from;
      this.params = this.lerpParams(this.from, this.to, 1);
      this.blend = 1;
      this.duration = 1.8;
      this.pulse = 0;
      this.pulseColor = [255, 255, 255];
      this.bursts = [];
      this.cat = AW.BeachCat ? new AW.BeachCat() : null;
      this.running = false;
      this._last = 0;
      this._frame = this._frame.bind(this);
    }

    static get SIZE() { return { W, H }; }

    /** Change the temperature shown. temp: 'FREEZING'â€¦'FOUND' or null for the neutral twilight. */
    setTemperature(temp, opts) {
      opts = opts || {};
      const key = temp && AW.BeachPalettes.COMPILED[temp] ? temp : 'IDLE';
      this.from = this.params;
      this.to = AW.BeachPalettes.COMPILED[key];
      this.state = key;
      if (this.cat) this.cat.setMood(key, !!opts.pulse);
      this.blend = opts.instant ? 1 : 0;
      this.duration = this.reducedMotion ? 0.5 : 1.8;
      if (opts.instant) this.params = this.lerpParams(this.from, this.to, 1);
      if (opts.pulse && !this.reducedMotion) {
        this.pulse = 1;
        this.pulseColor = { FREEZING: [120, 170, 255], COLD: [140, 160, 230], COOL: [220, 170, 230], WARM: [255, 170, 120], HOT: [255, 190, 80], BURNING: [255, 120, 40], FOUND: [255, 230, 140] }[key] || [255, 255, 255];
      }
      if (key === 'FOUND' && opts.celebrate !== false) this.celebrate();
      if (!this.running) this.renderFrame(0);
    }

    celebrate() {
      if (this.reducedMotion) return;
      const r = rng(Math.floor(this.t * 1000) + 5);
      const colors = [[255, 236, 140], [255, 150, 200], [255, 255, 255], [255, 190, 90], [190, 240, 255]];
      for (let k = 0; k < 7; k++) {
        this.bursts.push({ t0: this.t + 0.15 + k * 0.32, x: 40 + r() * 240, y: 16 + r() * 46, c: colors[k % colors.length], n: 22 + Math.floor(r() * 10), sp: 16 + r() * 10 });
      }
    }

    /** The cat walks to the campfire and falls asleep. Call once when a game is won; instant for a restored win. */
    catSleep(opts) {
      if (!this.cat) return;
      this.cat.sleep({ instant: !!(opts && opts.instant) || this.reducedMotion });
      if (!this.running) this.renderFrame(0);
    }

    /** The cat wakes and goes back to its spot by the hut (new game, or a mode that isn't won). */
    catWake(opts) {
      if (!this.cat) return;
      this.cat.wake({ instant: !!(opts && opts.instant) || this.reducedMotion });
      if (!this.running) this.renderFrame(0);
    }

    setReducedMotion(v) { this.reducedMotion = !!v; if (v) { this.bursts = []; if (this.cat) this.cat.skip(); } }

    lerpParams(a, b, k) {
      const out = {};
      for (const key in b) {
        const va = a[key] === undefined ? b[key] : a[key], vb = b[key];
        if (typeof vb === 'number') out[key] = va + (vb - va) * k;
        else if (Array.isArray(vb[0])) out[key] = vb.map((c, i) => c.map((ch, j) => va[i][j] + (ch - va[i][j]) * k));
        else out[key] = vb.map((ch, j) => va[j] + (ch - va[j]) * k);
      }
      return out;
    }

    start() {
      if (this.running) return;
      this.running = true;
      this._last = performance.now();
      requestAnimationFrame(this._frame);
    }
    stop() { this.running = false; }

    _frame(now) {
      if (!this.running) return;
      const dt = Math.min(0.1, (now - this._last) / 1000);
      this._last = now;
      this.renderFrame(dt);
      requestAnimationFrame(this._frame);
    }

    /** Advance animation by dt seconds and draw one frame. */
    renderFrame(dt) {
      if (!this.reducedMotion) {
        this.t += dt;
        if (this.cat) this.cat.update(dt);
      }
      if (this.blend < 1) {
        this.blend = Math.min(1, this.blend + dt / this.duration);
        const e = this.blend < 0.5 ? 2 * this.blend * this.blend : 1 - Math.pow(-2 * this.blend + 2, 2) / 2;
        this.params = this.lerpParams(this.from, this.to, e);
      } else {
        this.params = this.to;
      }
      this.pulse = Math.max(0, this.pulse - dt * 1.4);
      this.draw();
      this.ctx.putImageData(this.img, 0, 0);
    }

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ drawing â”€â”€â”€â”€â”€â”€â”€â”€â”€
    draw() {
      const P = this.params, b = this.buf, t = this.t;
      const sunY = P.sunY, sunR = P.sunR;
      const skyT = P.skyTop, skyM = P.skyMid, skyH = P.skyHor, glow = P.sunGlow;
      const pulse = this.pulse, pc = this.pulseColor;

      // 1. Sky with dithered bands, sun glow and moon glow.
      for (let y = 0; y < HOR; y++) {
        const ty = y / (HOR - 1);
        for (let x = 0; x < W; x++) {
          const d = BAYER[(y & 3) * 4 + (x & 3)];
          const q = Math.floor(ty * 14 + d) / 14;
          let r, g, bl;
          if (q < 0.55) { const k = q / 0.55; r = skyT[0] + (skyM[0] - skyT[0]) * k; g = skyT[1] + (skyM[1] - skyT[1]) * k; bl = skyT[2] + (skyM[2] - skyT[2]) * k; }
          else { const k = (q - 0.55) / 0.45; r = skyM[0] + (skyH[0] - skyM[0]) * k; g = skyM[1] + (skyH[1] - skyM[1]) * k; bl = skyM[2] + (skyH[2] - skyM[2]) * k; }
          if (P.glowStr > 0.01) {
            const dx = x - SUN_X, dy = (y - Math.min(sunY, HOR + 6)) * 2.1;
            const f = 1 - Math.sqrt(dx * dx + dy * dy) / 120;
            if (f > 0) {
              const band = Math.floor(f * f * 7 + d) / 7 * P.glowStr * 0.85;
              r += (glow[0] - r) * band; g += (glow[1] - g) * band; bl += (glow[2] - bl) * band;
            }
          }
          if (P.moonGlow > 0.01) {
            const dx = x - MOON_X, dy = y - MOON_Y;
            const f = 1 - Math.sqrt(dx * dx + dy * dy) / 34;
            if (f > 0) {
              const band = Math.floor(f * f * 5 + d) / 5 * P.moonGlow * 0.5;
              r += (150 - r) * band; g += (180 - g) * band; bl += (255 - bl) * band;
            }
          }
          if (pulse > 0 && y > HOR - 30) {
            const k = pulse * 0.35 * ((y - (HOR - 30)) / 30);
            r += (pc[0] - r) * k; g += (pc[1] - g) * k; bl += (pc[2] - bl) * k;
          }
          const i = (y * W + x) * 4;
          b[i] = r; b[i + 1] = g; b[i + 2] = bl; b[i + 3] = 255;
        }
      }

      // 2. Stars.
      if (P.starsA > 0.02) {
        for (const s of this.stars) {
          const tw = 0.55 + 0.45 * Math.sin(t * s.sp + s.ph);
          const a = P.starsA * s.b * tw;
          this.blendPx(s.x, s.y, 235, 240, 255, a);
          if (s.big) {
            this.blendPx(s.x - 1, s.y, 200, 215, 255, a * 0.5); this.blendPx(s.x + 1, s.y, 200, 215, 255, a * 0.5);
            this.blendPx(s.x, s.y - 1, 200, 215, 255, a * 0.5); this.blendPx(s.x, s.y + 1, 200, 215, 255, a * 0.5);
          }
        }
      }

      // 3. Crescent moon.
      if (P.moonA > 0.02) {
        for (let y = MOON_Y - 9; y <= MOON_Y + 9; y++) for (let x = MOON_X - 9; x <= MOON_X + 9; x++) {
          const d1 = (x - MOON_X) ** 2 + (y - MOON_Y) ** 2, d2 = (x - MOON_X - 4) ** 2 + (y - MOON_Y + 3) ** 2;
          if (d1 <= 64 && d2 > 49) {
            const edge = d1 > 42 ? 0.85 : 1;
            this.blendPx(x, y, 236 * edge, 242 * edge, 255 * edge, P.moonA);
          }
        }
      }

      // 4. Sun disc with retro horizontal cut lines.
      if (sunY - sunR < HOR) {
        const sc = P.sunCore, se = P.sunEdge;
        for (let y = Math.max(0, Math.floor(sunY - sunR)); y < Math.min(HOR, sunY + sunR + 1); y++) {
          const below = y - (sunY - sunR * 0.1);
          if (below > 0 && (Math.floor(y + t * 2) % Math.max(2, Math.round(6 - below * 0.3))) === 0) continue;
          for (let x = Math.floor(SUN_X - sunR); x <= SUN_X + sunR; x++) {
            const d = Math.sqrt((x - SUN_X) ** 2 + (y - sunY) ** 2) / sunR;
            if (d > 1) continue;
            const k = d < 0.55 ? 0 : d < 0.8 ? 0.5 : 1;
            this.setPx(x, y, sc[0] + (se[0] - sc[0]) * k, sc[1] + (se[1] - sc[1]) * k, sc[2] + (se[2] - sc[2]) * k);
          }
        }
      }

      // 5. Clouds and horizon strata.
      const cl = [P.cloudDark, P.cloudMid, P.cloudLit];
      for (const c of this.sky.clouds) {
        const off = Math.round(Math.sin(t * 0.06 + c.phase) * 4);
        for (const [x, y, s] of c.px) this.setPxC(x + off, y, cl[s]);
      }
      for (const [x, y, s, i] of this.sky.strata) {
        const off = Math.round(Math.sin(t * 0.05 + i * 2) * 3);
        this.blendPxC(x + off, y, cl[s], 0.8);
      }

      // 6. Sea.
      const sf = P.seaFar, sn = P.seaNear, hi = P.seaHi;
      const speed = P.waveSpeed;
      for (let x = 0; x < W; x++) {
        const sy = shoreY(x);
        for (let y = HOR; y < sy; y++) {
          const depth = (y - HOR) / (sy - HOR);
          const dd = BAYER[(y & 3) * 4 + (x & 3)];
          const q = Math.floor(Math.pow(depth, 0.8) * 9 + dd) / 9;
          let r = sf[0] + (sn[0] - sf[0]) * q, g = sf[1] + (sn[1] - sf[1]) * q, bl = sf[2] + (sn[2] - sf[2]) * q;
          if (y === HOR) { r = (r + skyH[0]) / 2; g = (g + skyH[1]) / 2; bl = (bl + skyH[2]) / 2; }
          // wave highlight dashes, alternating drift per row
          const row = y - HOR;
          const seed = hash2(row, 0, 2);
          if (seed > 0.25) {
            const period = 9 + depth * 30, dash = 1.5 + depth * 7;
            const dir = row % 2 ? 1 : -1;
            const pos = ((x + seed * 97 + dir * t * speed * (3 + depth * 8)) % period + period) % period;
            if (pos < dash) {
              const k = P.waveHi * (0.35 + 0.5 * depth);
              r += (hi[0] - r) * k; g += (hi[1] - g) * k; bl += (hi[2] - bl) * k;
            }
          }
          // sun glitter path
          if (P.sunRefl > 0.02) {
            const w = 3 + depth * 26;
            const dx = Math.abs(x - SUN_X);
            if (dx < w) {
              const gl = hash2(x >> 1, y, Math.floor(t * 3 * speed + y * 0.37));
              if (gl < 0.62 * (1 - dx / w)) {
                const k = P.sunRefl * (0.55 + 0.45 * (1 - dx / w));
                const sc = P.sunCore;
                r += (sc[0] - r) * k; g += (sc[1] - g) * k; bl += (sc[2] - bl) * k;
              }
            }
          }
          // moon path
          if (P.moonRefl > 0.02) {
            const w = 2 + depth * 12;
            const dx = Math.abs(x - MOON_X - 2);
            if (dx < w) {
              const gl = hash2(x >> 1, y, Math.floor(t * 2 + y * 0.29) + 50);
              if (gl < 0.5 * (1 - dx / w)) {
                const k = P.moonRefl * 0.7;
                r += (220 - r) * k; g += (232 - g) * k; bl += (255 - bl) * k;
              }
            }
          }
          const i = (y * W + x) * 4;
          b[i] = r; b[i + 1] = g; b[i + 2] = bl; b[i + 3] = 255;
        }
      }

      // 7. Sand, wet band and swash foam.
      const sand = P.sand, wet = P.wetSand, foam = P.foam, ss = this.geo.sandShade;
      const swashBase = this.reducedMotion ? 1.5 : (Math.sin(t * 0.8) * 0.5 + 0.5) * 3.5;
      for (let x = 0; x < W; x++) {
        const sy = shoreY(x);
        const swash = swashBase + Math.sin(x * 0.07 + t * 0.6) * 0.8;
        for (let y = sy; y < H; y++) {
          const c = sand[ss[y * W + x]];
          let r = c[0], g = c[1], bl = c[2];
          const dy = y - sy;
          if (dy < 6) { const k = (1 - dy / 6) * 0.75; r += (wet[0] - r) * k; g += (wet[1] - g) * k; bl += (wet[2] - bl) * k; }
          if (dy < swash) {
            const edge = swash - dy < 1.2;
            const k = edge ? 0.95 : 0.45;
            r += (foam[0] - r) * k; g += (foam[1] - g) * k; bl += (foam[2] - bl) * k;
          }
          const i = (y * W + x) * 4;
          b[i] = r; b[i + 1] = g; b[i + 2] = bl; b[i + 3] = 255;
        }
        // foam crest just offshore
        const fy = sy - 1 - Math.round((Math.sin(t * 0.8 + 1.2) * 0.5 + 0.5) * 2);
        if (hash2(x >> 1, fy, Math.floor(t * 2)) < 0.7) this.blendPxC(x, fy, foam, 0.7);
      }

      // 8. Static sprites.
      const g = this.geo, pals = this.materialPalettes(P);
      const idx = g.idx, mats = g.mats, shades = g.shades;
      for (let n = 0; n < idx.length; n++) {
        const c = pals[mats[n]][shades[n]];
        const i = idx[n] * 4;
        b[i] = c[0]; b[i + 1] = c[1]; b[i + 2] = c[2];
      }

      // 9. Palm fronds with gentle sway.
      const leaf = pals.LEAF;
      for (const f of g.fronds) {
        const sway = Math.round(Math.sin(t * 1.1 + f[4] * 1.7 + f[2] * 2.2) * f[2] * 1.6);
        this.setPxC(f[0] + (f[2] > 0.5 ? sway : 0), f[1] + (f[2] > 0.3 ? Math.round(sway * 0.5) : 0), leaf[f[3]]);
      }

      // 10. Campfire flames.
      const fire = P.fire;
      if (fire > 0.05) this.drawFire(fire, t);

      // 10b. The cat (before the lights, so the campfire glow falls on it too).
      if (this.cat) this.cat.draw(this, P);

      // 11. Lights.
      if (fire > 0.05) {
        const fl = 1 + (this.reducedMotion ? 0 : Math.sin(t * 13) * 0.05 + Math.sin(t * 7.3) * 0.05);
        this.addLight(FIRE_X, FIRE_Y - 4, (30 + 56 * Math.min(fire, 1.3)) * fl, [255, 140, 60], Math.min(1, fire) * 0.55, 0.6);
      }
      if (P.windowGlow > 0.05) this.addLight(WINDOW_X, WINDOW_Y, 10 + 22 * P.windowGlow, P.window, P.windowGlow * 0.35, 1);
      if (P.auraStr > 0.02) this.addLight(236, 128, 46, P.aura, P.auraStr * 0.55, 1);
      if (pulse > 0) this.addLight(SUN_X, HOR, 90, pc, pulse * 0.18, 1);

      // 12. Particles.
      this.drawParticles(P, t);

      // 13. Mist over the shoreline and sand.
      if (P.mist > 0.02) {
        const mc = P.mistColor;
        for (let y = HOR - 6; y < H; y++) {
          const band = Math.exp(-(((y - 136) / 26) ** 2));
          for (let x = 0; x < W; x++) {
            const n = smoothNoise(x * 0.035 + t * 0.12, y * 0.12) * 0.7 + smoothNoise(x * 0.08 - t * 0.08, y * 0.3) * 0.3;
            let a = P.mist * band * (n - 0.25) * 1.1;
            if (a <= 0) continue;
            a = Math.floor(a * 4 + BAYER[(y & 3) * 4 + (x & 3)]) / 4 * 0.55;
            if (a > 0) this.blendPx(x, y, mc[0], mc[1], mc[2], a);
          }
        }
      }
    }

    materialPalettes(P) {
      const frostTint = (c, k) => [c[0] + (205 - c[0]) * k, c[1] + (225 - c[1]) * k, c[2] + (255 - c[2]) * k];
      const fz = P.frost * 0.45;
      const tri = (arr, k) => [arr[0], arr[1], fz > 0.01 ? frostTint(arr[2], fz * (k == null ? 1 : k)) : arr[2]];
      const islandFar = P.islandFar, islandNear = P.islandNear, skyH = P.skyHor;
      const isl = [islandNear, islandFar, [islandFar[0] + (skyH[0] - islandFar[0]) * 0.35, islandFar[1] + (skyH[1] - islandFar[1]) * 0.35, islandFar[2] + (skyH[2] - islandFar[2]) * 0.35]];
      const glowK = P.windowGlow;
      const flick = this.reducedMotion ? 1 : 0.92 + 0.08 * Math.sin(this.t * 9.1);
      const win = P.window;
      const winDark = P.wall[0];
      const winColor = [winDark[0] + (win[0] - winDark[0]) * glowK * flick, winDark[1] + (win[1] - winDark[1]) * glowK * flick, winDark[2] + (win[2] - winDark[2]) * glowK * flick];
      const doorC = [P.wall[0][0] * 0.7, P.wall[0][1] * 0.7, P.wall[0][2] * 0.75];
      const board = [P.sand[1], P.foam, P.roof[2]];
      const embersGlow = Math.min(1, P.fire * 4) * 0.8;
      const log = P.trunk.map((c, i) => i === 2 && embersGlow > 0 ? [c[0] + (255 - c[0]) * embersGlow * 0.5, c[1] + (120 - c[1]) * embersGlow * 0.5, c[2] + (40 - c[2]) * embersGlow * 0.5] : c);
      const out = [];
      out[M.ISLAND] = isl;
      out[M.ISLAND2] = [islandNear, islandNear, islandFar];
      out[M.TRUNK] = tri(P.trunk, 0.3);
      out[M.WALL] = tri(P.wall);
      out[M.ROOF] = tri(P.roof);
      out[M.ROCK] = tri(P.rock);
      out[M.WINDOW] = [winColor, winColor, winColor];
      out[M.DOOR] = [doorC, doorC, doorC];
      out[M.BOARD] = [board[2], board[0], board[1]];
      out[M.STAR] = [P.roof[1], P.roof[2], P.window];
      out[M.SHELL] = [P.sand[1], P.foam, P.foam];
      out[M.LOG] = log;
      out.LEAF = tri(P.leaf, 0.35);
      return out;
    }

    drawFire(fire, t) {
      const rm = this.reducedMotion;
      const f = Math.min(fire, 1.3);
      const hgt = 5 + 13 * f;
      const baseW = 3 + 3.4 * f;
      for (let r = 0; r < hgt; r++) {
        const k = r / hgt;
        const flick = rm ? 0 : (smoothNoise(r * 0.4 - t * 9, t * 3) - 0.5) * 2.4;
        const w = Math.pow(1 - k, 0.75) * baseW + flick * (1 - k) * 0.6;
        const sway = rm ? 0 : Math.sin(t * 6 + r * 0.35) * k * 2.2;
        const y = FIRE_Y - r;
        for (let x = Math.floor(FIRE_X - w); x <= Math.ceil(FIRE_X + w); x++) {
          const dx = Math.abs(x - FIRE_X - sway) / Math.max(0.6, w);
          if (dx > 1) continue;
          if (k > 0.6 && hash2(x, r, Math.floor(t * 12)) < (k - 0.6) * 1.6) continue;
          let c;
          if (dx < 0.38 && k < 0.65) c = [255, 244, 170];
          else if (dx < 0.72 && k < 0.85) c = [255, 160, 46];
          else c = [226, 64, 28];
          this.setPx(x, y, c[0], c[1], c[2]);
        }
      }
    }

    drawParticles(P, t) {
      const pr = this.parts, rm = this.reducedMotion;
      // Frost drifting across the beach.
      if (P.frost > 0.02) {
        for (const p of pr.frost) {
          if (p.th > P.frost) continue;
          const x = ((p.x + t * p.vx) % W + W) % W, y = ((p.y + t * p.vy) % H + H) % H;
          const a = 0.55 + 0.45 * Math.sin(t * 2 + p.ph);
          this.blendPx(Math.floor(x), Math.floor(y), 225, 238, 255, a * Math.min(1, P.frost * 1.4));
          if (p.big) {
            this.blendPx(Math.floor(x) - 1, Math.floor(y), 200, 220, 255, a * 0.5);
            this.blendPx(Math.floor(x) + 1, Math.floor(y), 200, 220, 255, a * 0.5);
            this.blendPx(Math.floor(x), Math.floor(y) - 1, 200, 220, 255, a * 0.5);
            this.blendPx(Math.floor(x), Math.floor(y) + 1, 200, 220, 255, a * 0.5);
          }
        }
      }
      // Fireflies wandering around the palms and hut.
      if (P.fireflies > 0.02) {
        for (const p of pr.fireflies) {
          if (p.th > P.fireflies) continue;
          const x = p.x + Math.sin(t * p.sp + p.ph) * p.rx, y = p.y + Math.cos(t * p.sp * 1.3 + p.ph) * p.ry;
          const blink = Math.max(0, Math.sin(t * (1.4 + p.sp) + p.ph * 3));
          if (blink < 0.15 && !rm) continue;
          const a = (rm ? 0.8 : blink) * Math.min(1, P.fireflies * 1.5);
          this.blendPx(Math.round(x), Math.round(y), 240, 255, 150, a);
          this.blendPx(Math.round(x) + 1, Math.round(y), 200, 255, 120, a * 0.35);
          this.blendPx(Math.round(x) - 1, Math.round(y), 200, 255, 120, a * 0.35);
        }
      }
      // Warm motes drifting up.
      if (P.motes > 0.02) {
        for (const p of pr.motes) {
          if (p.th > P.motes) continue;
          const y = H - (((H - p.y) + t * p.vy) % H);
          const x = p.x + Math.sin(t * 0.7 + p.ph) * p.sw;
          this.blendPx(Math.round(x), Math.round(y), 255, 200, 110, 0.55 * Math.min(1, P.motes * 1.3));
        }
      }
      // Embers rising from the campfire.
      if (P.embers > 0.02 && P.fire > 0.05) {
        for (const p of pr.embers) {
          if (p.th > P.embers) continue;
          const age = rm ? p.seed : ((t * p.rate + p.seed) % 1);
          const y = FIRE_Y - 4 - age * (70 + p.sw * 3) * Math.min(1.2, P.fire);
          const x = FIRE_X + Math.sin(age * 7 + p.ph) * (2 + age * p.sw) + age * 8;
          const a = (1 - age) * Math.min(1, P.embers);
          const c = age < 0.3 ? [255, 236, 150] : age < 0.65 ? [255, 160, 60] : [230, 80, 40];
          this.blendPx(Math.round(x), Math.round(y), c[0], c[1], c[2], a);
        }
      }
      // Sparkles on the waves.
      if (P.sparkle > 0.02) {
        for (const p of pr.sparkles) {
          if (p.th > P.sparkle) continue;
          if (p.y >= shoreY(p.x)) continue;
          const s = rm ? 0.6 : Math.pow(Math.max(0, Math.sin(t * p.sp + p.ph)), 10);
          if (s < 0.05) continue;
          this.blendPx(p.x, p.y, 255, 255, 240, s);
          if (s > 0.5) {
            this.blendPx(p.x - 1, p.y, 255, 250, 220, s * 0.6); this.blendPx(p.x + 1, p.y, 255, 250, 220, s * 0.6);
            this.blendPx(p.x, p.y - 1, 255, 250, 220, s * 0.6); this.blendPx(p.x, p.y + 1, 255, 250, 220, s * 0.6);
          }
        }
      }
      // Victory fireworks.
      if (this.bursts.length) {
        this.bursts = this.bursts.filter(bu => t - bu.t0 < 2.2);
        for (const bu of this.bursts) {
          const age = t - bu.t0;
          if (age < 0) {
            // rising trail
            const k = 1 + age / 0.6;
            if (k > 0) this.blendPx(Math.round(bu.x), Math.round(HOR - (HOR - bu.y) * k), 255, 230, 180, 0.9);
            continue;
          }
          const fade = Math.max(0, 1 - age / 2.2);
          for (let i = 0; i < bu.n; i++) {
            const a = (i / bu.n) * Math.PI * 2;
            const dist = bu.sp * (1 - Math.exp(-age * 2.4));
            const x = bu.x + Math.cos(a) * dist, y = bu.y + Math.sin(a) * dist * 0.85 + age * age * 6;
            const tw = (i + Math.floor(age * 10)) % 3 ? 1 : 0.5;
            this.blendPx(Math.round(x), Math.round(y), bu.c[0], bu.c[1], bu.c[2], fade * tw);
            if (age < 0.8) this.blendPx(Math.round(bu.x + Math.cos(a) * dist * 0.7), Math.round(bu.y + Math.sin(a) * dist * 0.6), 255, 255, 255, fade * 0.4);
          }
        }
      }
    }

    // â”€â”€â”€â”€â”€â”€â”€â”€â”€ pixel helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€
    setPx(x, y, r, g, bl) {
      x |= 0; y |= 0;
      if (x < 0 || y < 0 || x >= W || y >= H) return;
      const i = (y * W + x) * 4, b = this.buf;
      b[i] = r; b[i + 1] = g; b[i + 2] = bl;
    }
    setPxC(x, y, c) { this.setPx(x, y, c[0], c[1], c[2]); }
    blendPx(x, y, r, g, bl, a) {
      x |= 0; y |= 0;
      if (a <= 0 || x < 0 || y < 0 || x >= W || y >= H) return;
      if (a > 1) a = 1;
      const i = (y * W + x) * 4, b = this.buf;
      b[i] += (r - b[i]) * a; b[i + 1] += (g - b[i + 1]) * a; b[i + 2] += (bl - b[i + 2]) * a;
    }
    blendPxC(x, y, c, a) { this.blendPx(x, y, c[0], c[1], c[2], a); }

    /** Additive, banded (pixel-art) radial light. */
    addLight(cx, cy, radius, color, strength, ySquash) {
      const b = this.buf;
      const y0 = Math.max(0, Math.floor(cy - radius * ySquash)), y1 = Math.min(H - 1, Math.ceil(cy + radius * ySquash));
      const x0 = Math.max(0, Math.floor(cx - radius)), x1 = Math.min(W - 1, Math.ceil(cx + radius));
      for (let y = y0; y <= y1; y++) {
        const dy = (y - cy) / ySquash;
        for (let x = x0; x <= x1; x++) {
          const dx = x - cx;
          const f = 1 - Math.sqrt(dx * dx + dy * dy) / radius;
          if (f <= 0) continue;
          const q = Math.floor(f * f * 5 + BAYER[(y & 3) * 4 + (x & 3)]) / 5 * strength;
          if (q <= 0) continue;
          const i = (y * W + x) * 4;
          b[i] += color[0] * q; b[i + 1] += color[1] * q; b[i + 2] += color[2] * q;
        }
      }
    }

    /** Hash of the static composition â€” identical for every temperature state. */
    geometryHash() {
      let h = 2166136261;
      const g = this.geo;
      const mix = v => { h ^= v; h = Math.imul(h, 16777619); };
      for (let i = 0; i < g.idx.length; i++) { mix(g.idx[i]); mix(g.mats[i]); mix(g.shades[i]); }
      for (const f of g.fronds) { mix(f[0]); mix(f[1]); }
      return h >>> 0;
    }

    pixel(x, y) { const i = (y * W + x) * 4; return [this.buf[i], this.buf[i + 1], this.buf[i + 2]]; }
  }

  Beach.LANDMARKS = { W, H, HOR, SUN_X, FIRE_X, FIRE_Y, WINDOW_X, WINDOW_Y, MOON_X, MOON_Y };
  AW.Beach = Beach;
})(window.AW = window.AW || {});
