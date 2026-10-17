/*
 * The beach cat: a small ginger tabby that lives beside the hut.
 *
 * It is a visual companion only. Its mood follows the beach's temperature state
 * (passed in by Beach.setTemperature), its idle actions are picked from a seeded RNG
 * on its own animation clock, and its one scripted sequence (walking to the campfire,
 * curling up and falling asleep) starts only when the UI calls sleep() after a win.
 *
 * Sprites are tiny character grids with no outline. Each frame the parts are stamped
 * into a scratch grid, rim light, shade and a dark outline are added automatically,
 * and the pixels are coloured from the current scene palette, so the cat is re-lit
 * with everything else (and lit again by the campfire's additive light).
 *
 * Coordinates: x is relative to the centre of the cat's head, y to its feet (row 0).
 */
(function (AW) {
  'use strict';

  const HOME = { x: 180, y: 161 };      // by the hut, clear of the starfish and shells
  const FIRE_SPOT = { x: 159, y: 163 }; // right of the campfire ring (ring ends at x=151)
  const WALK_SPEED = 12;                // scene pixels per second
  const GW = 40, GH = 26, OX = 20, OY = 19; // scratch grid and where the cat's origin sits in it

  // ───────── sprites ('.' = transparent) ─────────
  // b fur · s tabby stripe · w cream · p pink · e eye   (l, d and o are added automatically)
  const spr = (x0, y0, rows) => ({ x0, y0, rows });
  const HEAD = spr(-3, -3, [   // last row sits on the pose's head line
    '.b...b.',
    'bpb.bpb',
    'bebsbeb',
    'bbwpwbb'
  ]);
  const SIT = spr(-4, -3, [
    '..bwwwb..',
    '.bbbwbbb.',
    'bbsbwbsbb',
    'bbwwbwwbb'
  ]);
  const LOAF = spr(-3, -3, [   // lying down, paws out front, body going back to the right
    '.......bb....',
    '.......bbsb..',
    '.bwwwbbbbsbb.',
    'wwbwwbbbbbbbb'
  ]);
  const LOAF_TUCK = spr(-3, -3, [ // same, paws tucked away
    '.......bb....',
    '.......bbsb..',
    '.bwwwbbbbsbb.',
    'bbbwbbbbbbbbb'
  ]);
  const CURL = spr(-3, -3, [   // asleep: round back, tail wrapped along the front
    '.......bbbb...',
    '.......bbsbbb.',
    '.......bbbbsbb',
    'bsbsbsbsbbbbb.'
  ]);
  const CURL_BREATH = spr(5, -4, ['bbb']); // inhale lifts the back by one pixel
  const WALK = spr(-2, -5, [   // side view, facing left
    '.b.b.....',
    'bbbb.....',
    'bebbbbbbb',
    'pwbsbbsbb',
    '.wwbbbbbb'
  ]);
  const LEGS = [
    spr(-2, 0, ['.b.b..b.b']),
    spr(-2, 0, ['..b....b.']),
    spr(-2, 0, ['b..b.b..b']),
    spr(-2, 0, ['..b....b.'])
  ];
  // Tails are polylines, drawn with alternating stripes.
  const SIT_TAIL = {
    rest: [[5, 0], [6, 0], [7, -1], [7, -2], [6, -3]],
    up: [[5, 0], [6, -1], [7, -2], [7, -3], [7, -4]],
    flick: [[5, 0], [6, -1], [7, -2], [8, -3], [9, -3]],
    wrap: [[5, -1], [5, 0], [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [-1, 0], [-2, 0]]
  };
  const LOAF_TAIL = {
    rest: [[10, 0], [11, -1], [11, -2], [10, -3]],
    up: [[10, -1], [11, -2], [11, -3], [12, -4]],
    flick: [[10, 0], [11, 0], [12, -1], [13, -1]],
    tight: [[10, 0], [11, 0], [11, -1]]
  };
  const WALK_TAIL = [
    [[7, -3], [8, -4], [8, -5], [8, -6], [7, -7]],
    [[7, -3], [8, -4], [9, -5], [9, -6], [8, -7]]
  ];
  const Z_BIG = ['####', '..#.', '.#..', '####'];
  const Z_SMALL = ['###', '.#.', '###'];

  // Daylight colours; palette() re-lights them from the scene each frame.
  const BASE = {
    b: [228, 124, 52], l: [250, 170, 92], d: [196, 98, 42], s: [178, 78, 30],
    w: [250, 230, 200], p: [238, 142, 152], m: [110, 36, 40], o: [56, 26, 22]
  };
  const EYE_DAY = [30, 20, 14], EYE_GLOW = [196, 240, 120];
  const SAND_REF = [216, 156, 128]; // sand base colour of the WARM palette = "full daylight"

  // Temperature state → mood.
  const MOOD = { IDLE: 'idle', COOL: 'idle', FREEZING: 'cold', COLD: 'chilly', WARM: 'content', FOUND: 'content', HOT: 'curious', BURNING: 'curious' };
  // Idle actions per mood: [type, weight], and the pause between actions.
  const ACTIONS = {
    idle: [['look', 3], ['ear', 2], ['flick', 2], ['yawn', 1], ['shift', 1]],
    chilly: [['shiver', 3], ['look', 1], ['ear', 1]],
    cold: [['shiver', 3], ['ear', 1], ['look', 1]],
    content: [['flick', 2], ['yawn', 2], ['ear', 1], ['look', 1]],
    curious: [['look', 3], ['perk', 2], ['ear', 2], ['flick', 1]]
  };
  const PAUSE = { idle: [3, 7], chilly: [2.5, 5], cold: [2.5, 5.5], content: [4, 8], curious: [2.5, 5] };
  const DUR = { look: [1.2, 2.6], perk: [1.4, 2], ear: [0.3, 0.3], flick: [0.9, 0.9], yawn: [1.5, 1.5], shiver: [0.7, 0.7], shift: [0, 0] };

  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const mix = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
  function rng(seed) {
    let a = seed >>> 0;
    return () => {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = Math.imul(a ^ (a >>> 15), a | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  class BeachCat {
    constructor(opts) {
      opts = opts || {};
      this.rand = rng(opts.seed || 77);
      this.grid = new Array(GW * GH).fill(0);
      this.t = 0;              // the cat's own animation clock
      this.x = HOME.x; this.y = HOME.y;
      this.facing = -1;        // -1 left, 1 right (only matters while walking)
      this.walkDist = 0;
      this.mood = 'idle';
      this.goal = 'awake';     // 'awake' | 'sleep'
      this.phase = 'awake';    // awake | notice | walk | sit | loaf | curl | asleep | rise
      this.phaseT = 0;
      this.action = null;      // one idle action at a time: { type, t, dur, dir }
      this.nextAction = 2 + this.rand() * 2;
      this.loafing = false;    // idle mood only: lying down instead of sitting
      this.blinkAt = -1;
      this.nextBlink = 1.5 + this.rand() * 3;
      this.twitchUntil = 0;
      this.nextTwitch = 0;
      this.hidden = false;
    }

    static get SPOTS() { return { HOME, FIRE_SPOT }; }

    get asleep() { return this.phase === 'asleep'; }

    setPhase(p) { this.phase = p; this.phaseT = 0; }
    between(lo, hi) { return lo + (hi - lo) * this.rand(); }

    /** Follow the beach's temperature state. `reacted` = a guess just landed. */
    setMood(state, reacted) {
      const m = MOOD[state] || 'idle';
      if (m !== this.mood) {
        this.mood = m;
        this.loafing = false;
        this.action = null;
        if (this.phase === 'awake') {
          // Getting close: the ears go up and it looks over at the campfire.
          if (m === 'curious') this.startAction('perk', -1);
          this.nextAction = this.t + (this.action ? this.action.dur : 0) + this.between(0.6, 1.4);
        }
      } else if (reacted && this.phase === 'awake' && !this.action) {
        this.startAction('ear');
      }
    }

    /** Walk to the campfire and fall asleep. Ignored if already on the way or asleep. */
    sleep(opts) {
      opts = opts || {};
      this.action = null;
      if (opts.instant) {
        this.goal = 'sleep';
        this.x = FIRE_SPOT.x; this.y = FIRE_SPOT.y; this.facing = -1;
        if (this.phase !== 'asleep') { this.setPhase('asleep'); this.nextTwitch = this.t + this.between(6, 12); }
        return;
      }
      if (this.goal === 'sleep') return;
      this.goal = 'sleep';
      if (this.phase === 'awake') this.setPhase('notice');
      else if (this.phase === 'rise') this.setPhase('loaf'); // still beside the fire
      // while walking home it simply turns round (walk() reads the goal)
    }

    /** Wake up and go back to the usual spot. */
    wake(opts) {
      opts = opts || {};
      if (opts.instant) {
        this.goal = 'awake';
        this.x = HOME.x; this.y = HOME.y; this.facing = -1;
        if (this.phase !== 'awake') { this.setPhase('awake'); this.action = null; this.nextAction = this.t + this.between(1, 2.5); }
        return;
      }
      if (this.goal === 'awake') return;
      this.goal = 'awake';
      if (this.phase === 'notice') this.setPhase('awake');
      else if (this.phase !== 'walk') this.setPhase('rise');
    }

    /** Finish any sequence in progress at once (used when reduced motion is turned on). */
    skip() {
      if (this.goal === 'sleep') this.sleep({ instant: true });
      else this.wake({ instant: true });
    }

    update(dt) {
      this.t += dt;
      this.phaseT += dt;
      const t = this.t;
      switch (this.phase) {
        case 'awake': this.idle(); break;
        case 'notice': if (this.phaseT >= 0.7) this.setPhase('walk'); break;
        case 'walk': this.walk(dt); break;
        case 'sit': if (this.phaseT >= 0.6) this.setPhase('loaf'); break;
        case 'loaf': if (this.phaseT >= 0.9) this.setPhase('curl'); break;
        case 'curl': if (this.phaseT >= 1.1) { this.setPhase('asleep'); this.nextTwitch = t + this.between(6, 12); } break;
        case 'asleep':
          if (t >= this.nextTwitch) { this.twitchUntil = t + 0.35; this.nextTwitch = t + this.between(8, 15); }
          break;
        case 'rise': if (this.phaseT >= 0.6) this.setPhase('walk'); break;
      }
      if (t >= this.nextBlink) {
        this.blinkAt = t;
        this.nextBlink = t + (this.rand() < 0.25 ? 0.3 : this.between(2.5, 6.5)); // sometimes a double blink
      }
    }

    idle() {
      const t = this.t;
      if (this.action && t - this.action.t >= this.action.dur) this.action = null;
      if (this.action || t < this.nextAction) return;
      const list = ACTIONS[this.mood];
      let r = this.rand() * list.reduce((s, a) => s + a[1], 0), type = list[0][0];
      for (const [k, w] of list) { if ((r -= w) < 0) { type = k; break; } }
      this.startAction(type);
      const p = PAUSE[this.mood];
      this.nextAction = t + (this.action ? this.action.dur : 0) + this.between(p[0], p[1]);
    }

    startAction(type, dir) {
      if (type === 'shift') { this.loafing = !this.loafing; this.action = null; return; }
      const d = DUR[type];
      // Curious looks favour the campfire (to the left).
      if (dir == null) dir = this.mood === 'curious' ? (this.rand() < 0.7 ? -1 : 1) : (this.rand() < 0.5 ? -1 : 1);
      this.action = { type, t: this.t, dur: this.between(d[0], d[1]), dir };
    }

    walk(dt) {
      const tgt = this.goal === 'sleep' ? FIRE_SPOT : HOME;
      const dx = tgt.x - this.x, dy = tgt.y - this.y, dist = Math.hypot(dx, dy);
      const step = WALK_SPEED * dt;
      if (Math.abs(dx) > 0.5) this.facing = dx < 0 ? -1 : 1;
      if (dist <= step) {
        this.x = tgt.x; this.y = tgt.y; this.facing = -1;
        if (this.goal === 'sleep') this.setPhase('sit');
        else { this.setPhase('awake'); this.action = null; this.nextAction = this.t + this.between(1, 2.5); }
      } else {
        this.x += (dx / dist) * step; this.y += (dy / dist) * step;
        this.walkDist += step;
      }
    }

    // ───────── composing a frame ─────────
    put(x, y, ch, under) {
      const gx = x + OX, gy = y + OY;
      if (gx < 0 || gy < 0 || gx >= GW || gy >= GH) return;
      const i = gy * GW + gx;
      if (under && this.grid[i]) return;
      this.grid[i] = ch;
    }
    stamp(s, dx, dy, flip) {
      for (let r = 0; r < s.rows.length; r++) {
        const row = s.rows[r];
        for (let c = 0; c < row.length; c++) {
          if (row[c] === '.') continue;
          const x = s.x0 + c + dx;
          this.put(flip ? -x : x, s.y0 + r + dy, row[c]);
        }
      }
    }
    tail(pts, over, flip) {
      pts.forEach(([x, y], i) => this.put(flip ? -x : x, y, i % 2 ? 's' : 'b', !over));
    }

    /** Build the current frame into this.grid and return its draw offset. */
    compose() {
      const g = this.grid;
      g.fill(0);
      const t = this.t, ph = this.phase, a = this.action, at = a ? t - a.t : 0;
      let pose, tail = null, tailOver = false, eyes = 'open', ears = 'normal', headDX = 0, shake = 0, mouth = false, flip = false;

      if (ph === 'walk') {
        pose = 'walk';
        flip = this.facing > 0;
      } else if (ph === 'curl' || ph === 'asleep') {
        pose = 'curl';
        eyes = ph === 'curl' && this.phaseT < 0.55 ? 'half' : 'closed';
      } else if (ph === 'loaf') {
        pose = 'loaf'; eyes = 'half'; tail = LOAF_TAIL.rest;
      } else if (ph === 'notice') {
        pose = 'sit'; ears = 'perk'; headDX = FIRE_SPOT.x < this.x ? -1 : 1; tail = SIT_TAIL.up;
      } else if (ph === 'sit') {
        pose = 'sit'; headDX = -1; tail = SIT_TAIL.rest;     // gazing at the fire
      } else if (ph === 'rise') {
        pose = 'sit'; headDX = 1; tail = SIT_TAIL.up;         // looking back towards home
      } else {
        const m = this.mood;
        if (m === 'cold') { pose = 'tuck'; eyes = 'half'; tail = LOAF_TAIL.tight; }
        else if (m === 'content' || (m === 'idle' && this.loafing)) { pose = 'loaf'; eyes = m === 'content' ? 'half' : 'open'; tail = LOAF_TAIL.rest; }
        else {
          pose = 'sit';
          if (m === 'chilly') { tail = SIT_TAIL.wrap; tailOver = true; }
          else if (m === 'curious') { tail = SIT_TAIL.up; ears = 'perk'; }
          else tail = SIT_TAIL.rest;
        }
        if (a) {
          if (a.type === 'look') headDX = a.dir;
          else if (a.type === 'perk') { ears = 'perk'; headDX = a.dir; }
          else if (a.type === 'ear') ears = 'twitch';
          else if (a.type === 'shiver') shake = Math.floor(at * 16) % 2;
          else if (a.type === 'yawn') {
            if (at > 0.2 && at < a.dur - 0.25) { eyes = 'closed'; mouth = true; } else eyes = 'half';
          } else if (a.type === 'flick' && !tailOver) {
            const set = pose === 'sit' ? SIT_TAIL : LOAF_TAIL;
            tail = [set.rest, set.up, set.flick, set.up, set.rest][Math.min(4, Math.floor((at / a.dur) * 5))];
          }
        }
      }
      if (eyes !== 'closed' && pose !== 'curl' && t - this.blinkAt < 0.14) eyes = 'closed';

      let headY = 0;
      if (pose === 'walk') {
        this.stamp(WALK, 0, 0, flip);
        this.stamp(LEGS[Math.floor(this.walkDist / 2) % 4], 0, 0, flip);
        this.tail(WALK_TAIL[Math.floor(this.walkDist / 4) % 2], false, flip);
      } else {
        if (pose === 'sit') { this.stamp(SIT, 0, 0); headY = -4; }
        else if (pose === 'loaf' || pose === 'tuck') { this.stamp(pose === 'loaf' ? LOAF : LOAF_TUCK, 0, 0); headY = -2; }
        else {
          this.stamp(CURL, 0, 0); headY = -1;
          if (ph === 'asleep' && t % 3.6 < 1.5) this.stamp(CURL_BREATH, 0, 0);
          if (t < this.twitchUntil) { this.put(-3, 0, 0); this.put(-4, -1, 'b'); } // tail tip twitch
        }
        if (tail) this.tail(tail, tailOver, false);
        this.stamp(HEAD, headDX, headY);
        if (ears === 'perk') { this.put(headDX - 2, headY - 4, 'b'); this.put(headDX + 2, headY - 4, 'b'); }
        if (ears === 'twitch') { this.put(headDX + 2, headY - 3, 0); this.put(headDX + 3, headY - 3, 'b'); }
        if (mouth) this.put(headDX, headY + 1, 'm');
      }

      // Eyes, then automatic rim light / shade on plain fur, then a 4-neighbour outline.
      const eyeCh = eyes === 'open' ? 'e' : eyes === 'half' ? 'h' : 's';
      const filled = i => i >= 0 && i < g.length && g[i] !== 0 && g[i] !== 'o';
      for (let i = 0; i < g.length; i++) {
        if (g[i] === 'e') g[i] = eyeCh;
        else if (g[i] === 'b') {
          if (!filled(i - GW)) g[i] = 'l';
          else if (!filled(i + GW)) g[i] = 'd';
        }
      }
      for (let i = 0; i < g.length; i++) {
        if (g[i]) continue;
        const x = i % GW;
        if (filled(i - GW) || filled(i + GW) || (x > 0 && filled(i - 1)) || (x < GW - 1 && filled(i + 1))) g[i] = 'o';
      }
      return { ox: Math.round(this.x) - OX + shake, oy: Math.round(this.y) - OY, headY };
    }

    /** Cat colours re-lit for the current scene palette P. */
    palette(P) {
      const s = P.sand[1];
      const k = [0, 1, 2].map(i => clamp(0.45 + 0.55 * s[i] / SAND_REF[i], 0.4, 1.15));
      const lit = c => [Math.min(255, c[0] * k[0]), Math.min(255, c[1] * k[1]), Math.min(255, c[2] * k[2])];
      const out = {};
      for (const ch in BASE) out[ch] = lit(BASE[ch]);
      if (P.frost > 0.01) out.l = mix(out.l, [205, 225, 255], P.frost * 0.15);
      // Eyes catch the light at night (emissive, so not darkened by the scene).
      out.e = mix(lit(EYE_DAY), EYE_GLOW, clamp(P.starsA * 0.75, 0, 1));
      out.h = mix(out.e, out.s, 0.55);
      return out;
    }

    /** Draw into the beach's pixel buffer. */
    draw(beach, P) {
      if (this.hidden) return;
      const { ox, oy, headY } = this.compose();
      const pal = this.palette(P), g = this.grid;
      for (let i = 0; i < g.length; i++) {
        const ch = g[i];
        if (!ch) continue;
        const c = pal[ch];
        beach.setPx(ox + (i % GW), oy + ((i / GW) | 0), c[0], c[1], c[2]);
      }
      // Drifting z's while asleep, so sleep reads even at small sizes.
      if (this.phase === 'asleep') {
        for (let n = 0; n < 2; n++) {
          const age = ((this.t + n * 1.7) % 3.4) / 3.4;
          const a = Math.min(1, age / 0.15, (1 - age) / 0.35) * 0.75;
          const glyph = n ? Z_SMALL : Z_BIG;
          const zx = Math.round(this.x + 3 + age * 6), zy = Math.round(this.y + headY - 7 - age * 10);
          glyph.forEach((row, r) => { for (let c = 0; c < row.length; c++) if (row[c] === '#') beach.blendPx(zx + c, zy + r, 236, 240, 255, a); });
        }
      }
    }

    /** Scene-space bounding box of the current frame (for tests and tooling). */
    bounds() {
      const { ox, oy } = this.compose();
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      this.grid.forEach((ch, i) => {
        if (!ch) return;
        const x = ox + (i % GW), y = oy + ((i / GW) | 0);
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      });
      return { x0, y0, x1, y1 };
    }
  }

  AW.BeachCat = BeachCat;
})(window.AW = window.AW || {});
