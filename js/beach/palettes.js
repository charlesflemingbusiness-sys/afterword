/*
 * Look of the beach for each temperature. Only colours, light and effect strengths
 * live here — never geometry — so every state is the same scene, re-lit.
 *
 * Triplets are [shadow, base, lit] shades of one material.
 */
(function (AW) {
  'use strict';

  const STATES = {
    // Neutral twilight shown before the first guess.
    IDLE: {
      skyTop: '#1b2350', skyMid: '#4a4f8f', skyHor: '#d99aa6',
      sunCore: '#ffe0b8', sunEdge: '#ff9e86', sunGlow: '#f08a8a', glowStr: 0.32, sunY: 104, sunR: 13,
      moonA: 0.55, starsA: 0.45, moonGlow: 0.25,
      cloudLit: '#d79fb2', cloudMid: '#8f709f', cloudDark: '#55497a',
      islandFar: '#463c6e', islandNear: '#372f5e',
      seaFar: '#8a7cae', seaNear: '#2a3168', seaHi: '#e8c0d0', waveHi: 0.45, sunRefl: 0.35, moonRefl: 0.2,
      sand: ['#6d5f7a', '#9a8196', '#c3a2a8'], wetSand: '#5a4f72', foam: '#efe0ec',
      leaf: ['#141a34', '#24304e', '#4f5a7a'], trunk: ['#271f36', '#41334e', '#6c5675'],
      wall: ['#3a2f4a', '#554263', '#7e6487'], roof: ['#30283f', '#4a3c58', '#71597c'],
      rock: ['#2e2f4c', '#45466a', '#666a90'],
      window: '#ffb870', windowGlow: 0.45, aura: '#6b8cff', auraStr: 0,
      fire: 0, frost: 0, mist: 0.15, mistColor: '#b8a8d8', fireflies: 0.25, motes: 0, embers: 0, sparkle: 0.1, waveSpeed: 1
    },
    FREEZING: {
      skyTop: '#03061a', skyMid: '#0a1438', skyHor: '#1a2d62',
      sunCore: '#ffe0b8', sunEdge: '#ff9e86', sunGlow: '#203a80', glowStr: 0, sunY: 124, sunR: 13,
      moonA: 1, starsA: 1, moonGlow: 0.6,
      cloudLit: '#2c3c6c', cloudMid: '#1b2650', cloudDark: '#101836',
      islandFar: '#0c1636', islandNear: '#08102a',
      seaFar: '#16295a', seaNear: '#07122e', seaHi: '#5f86c8', waveHi: 0.35, sunRefl: 0, moonRefl: 0.85,
      sand: ['#1e2b52', '#2f4070', '#4b5e94'], wetSand: '#16224a', foam: '#b8d2ff',
      leaf: ['#03081a', '#081230', '#1c3060'], trunk: ['#050a1c', '#0c1631', '#223660'],
      wall: ['#0d1430', '#172245', '#2b3c6c'], roof: ['#0b1229', '#141e40', '#283a68'],
      rock: ['#111a3a', '#1c2850', '#33467c'],
      window: '#5c8cff', windowGlow: 0.3, aura: '#4f8cff', auraStr: 0.45,
      fire: 0, frost: 1, mist: 0.25, mistColor: '#7d9ce0', fireflies: 0, motes: 0, embers: 0, sparkle: 0, waveSpeed: 0.55
    },
    COLD: {
      skyTop: '#0f1640', skyMid: '#29306b', skyHor: '#5d5f9c',
      sunCore: '#ffe0b8', sunEdge: '#ff9e86', sunGlow: '#6a6aa8', glowStr: 0.1, sunY: 118, sunR: 13,
      moonA: 0.6, starsA: 0.45, moonGlow: 0.3,
      cloudLit: '#6670a4', cloudMid: '#474f85', cloudDark: '#2e3664',
      islandFar: '#232a58', islandNear: '#1a2049',
      seaFar: '#3f4c88', seaNear: '#16204e', seaHi: '#8d9ad0', waveHi: 0.3, sunRefl: 0, moonRefl: 0.35,
      sand: ['#3f4672', '#5b628e', '#7c83ad'], wetSand: '#323a66', foam: '#c6cff0',
      leaf: ['#0b1232', '#182250', '#34407a'], trunk: ['#151a3a', '#262c56', '#444b7e'],
      wall: ['#21254c', '#333863', '#4e5488'], roof: ['#1c2046', '#2c315c', '#474e84'],
      rock: ['#262c56', '#383f6e', '#565d90'],
      window: '#6f7ec0', windowGlow: 0.15, aura: '#7a90ff', auraStr: 0.15,
      fire: 0, frost: 0.3, mist: 0.75, mistColor: '#a0acdc', fireflies: 0, motes: 0, embers: 0, sparkle: 0, waveSpeed: 0.7
    },
    COOL: {
      skyTop: '#1f2155', skyMid: '#584a8c', skyHor: '#c98aa6',
      sunCore: '#ffe0b8', sunEdge: '#ff9e86', sunGlow: '#e48aa0', glowStr: 0.35, sunY: 106, sunR: 13,
      moonA: 0.25, starsA: 0.18, moonGlow: 0.1,
      cloudLit: '#c08cb4', cloudMid: '#8a6c9e', cloudDark: '#584a80',
      islandFar: '#3e3466', islandNear: '#31295a',
      seaFar: '#8c76ae', seaNear: '#2e3270', seaHi: '#e2bcd8', waveHi: 0.55, sunRefl: 0.3, moonRefl: 0.1,
      sand: ['#6e5e7e', '#977f97', '#bea0aa'], wetSand: '#55497a', foam: '#efdcec',
      leaf: ['#17203e', '#2a3658', '#566280'], trunk: ['#2a2440', '#45385a', '#6f5a7c'],
      wall: ['#3e3456', '#58486c', '#82688c'], roof: ['#352c4c', '#4f4266', '#77608a'],
      rock: ['#353556', '#4d4d72', '#70709a'],
      window: '#d89a70', windowGlow: 0.3, aura: '#7a90ff', auraStr: 0,
      fire: 0, frost: 0, mist: 0.3, mistColor: '#c4acd6', fireflies: 0.1, motes: 0, embers: 0, sparkle: 0.15, waveSpeed: 0.9
    },
    WARM: {
      skyTop: '#33286a', skyMid: '#b2508c', skyHor: '#ffa064',
      sunCore: '#fff2b8', sunEdge: '#ffaa5c', sunGlow: '#ff9a72', glowStr: 0.6, sunY: 91, sunR: 13,
      moonA: 0, starsA: 0, moonGlow: 0,
      cloudLit: '#ffb88c', cloudMid: '#d0709a', cloudDark: '#7a4a8a',
      islandFar: '#5c2e60', islandNear: '#4a2452',
      seaFar: '#e48a8c', seaNear: '#40306e', seaHi: '#ffd2a4', waveHi: 0.65, sunRefl: 0.75, moonRefl: 0,
      sand: ['#a8706c', '#d89c80', '#f6c690'], wetSand: '#7a5072', foam: '#ffeadb',
      leaf: ['#25233a', '#3a4840', '#c88a54'], trunk: ['#4a2c32', '#764840', '#d88e56'],
      wall: ['#673c3e', '#8c5648', '#cc845c'], roof: ['#5a3a36', '#7e5442', '#c4925a'],
      rock: ['#5a4052', '#7a5662', '#b48272'],
      window: '#ffb340', windowGlow: 0.85, aura: '#ffa040', auraStr: 0.15,
      fire: 0, frost: 0, mist: 0, mistColor: '#ffc8b0', fireflies: 0.65, motes: 0.15, embers: 0, sparkle: 0.2, waveSpeed: 1
    },
    HOT: {
      skyTop: '#561e4e', skyMid: '#d8522e', skyHor: '#ffc24a',
      sunCore: '#fff6c4', sunEdge: '#ffa030', sunGlow: '#ffb040', glowStr: 0.85, sunY: 93, sunR: 15,
      moonA: 0, starsA: 0, moonGlow: 0,
      cloudLit: '#ffc472', cloudMid: '#e07040', cloudDark: '#8a3040',
      islandFar: '#6c2a30', islandNear: '#541e28',
      seaFar: '#ff9c4a', seaNear: '#5c2848', seaHi: '#ffe294', waveHi: 0.8, sunRefl: 1, moonRefl: 0,
      sand: ['#bc7048', '#eaa062', '#ffcc84'], wetSand: '#8a4a4a', foam: '#fff2cc',
      leaf: ['#36222a', '#5a3c2c', '#f2a452'], trunk: ['#5a2a22', '#8c4c2c', '#f2a452'],
      wall: ['#783a2a', '#aa5a36', '#f2a262'], roof: ['#6a3a26', '#966034', '#eab462'],
      rock: ['#6a3a38', '#8e5446', '#da9262'],
      window: '#ffc850', windowGlow: 1, aura: '#ffa040', auraStr: 0.3,
      fire: 0.12, frost: 0, mist: 0, mistColor: '#ffc8a0', fireflies: 0.7, motes: 0.6, embers: 0.1, sparkle: 0.3, waveSpeed: 1.1
    },
    BURNING: {
      skyTop: '#3a0822', skyMid: '#c2281a', skyHor: '#ff7c1c',
      sunCore: '#ffe880', sunEdge: '#ff5c12', sunGlow: '#ff5a20', glowStr: 1, sunY: 95, sunR: 17,
      moonA: 0, starsA: 0, moonGlow: 0,
      cloudLit: '#ff9250', cloudMid: '#c2402a', cloudDark: '#5e1822',
      islandFar: '#4a1416', islandNear: '#380e12',
      seaFar: '#ff6c2c', seaNear: '#541626', seaHi: '#ffc262', waveHi: 0.9, sunRefl: 1, moonRefl: 0,
      sand: ['#a24a32', '#e07c42', '#ffb262'], wetSand: '#6e2a2c', foam: '#ffdaa2',
      leaf: ['#2e1014', '#4c2018', '#ff8c3c'], trunk: ['#4a1a14', '#7c3418', '#ff9c42'],
      wall: ['#6a2618', '#9c4422', '#ff9c4c'], roof: ['#5a2414', '#8c4820', '#ffb252'],
      rock: ['#5a2626', '#823a2e', '#ea7c4a'],
      window: '#ffd264', windowGlow: 1, aura: '#ff7a30', auraStr: 0.35,
      fire: 1, frost: 0, mist: 0, mistColor: '#ff9a70', fireflies: 0.3, motes: 0.9, embers: 1, sparkle: 0.35, waveSpeed: 1.25
    },
    FOUND: {
      skyTop: '#42286e', skyMid: '#ff6aa2', skyHor: '#ffe486',
      sunCore: '#fffce4', sunEdge: '#ffc444', sunGlow: '#ffd472', glowStr: 1, sunY: 87, sunR: 16,
      moonA: 0, starsA: 0.12, moonGlow: 0,
      cloudLit: '#fff2b4', cloudMid: '#ffa2ba', cloudDark: '#a06aa2',
      islandFar: '#7c3c6c', islandNear: '#602e5c',
      seaFar: '#ffc282', seaNear: '#5e3488', seaHi: '#fffad4', waveHi: 1, sunRefl: 1, moonRefl: 0,
      sand: ['#c48272', '#f6ba8a', '#ffe2a4'], wetSand: '#9a6082', foam: '#ffffff',
      leaf: ['#2a3438', '#3e6a48', '#ffd282'], trunk: ['#5a3430', '#8c5a3c', '#ffc462'],
      wall: ['#7a4440', '#a8664c', '#ffbc72'], roof: ['#6a4234', '#966a44', '#ffd07a'],
      rock: ['#7a4c5a', '#9c6a70', '#ffb08a'],
      window: '#ffe486', windowGlow: 1, aura: '#ffd070', auraStr: 0.35,
      fire: 1.3, frost: 0, mist: 0, mistColor: '#ffd0e0', fireflies: 0.8, motes: 1, embers: 1, sparkle: 1, waveSpeed: 1.2
    }
  };

  function hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }

  /** Convert a palette's hex strings into numeric arrays, flattened: key -> number | [r,g,b] | [[r,g,b]x3]. */
  function compile(p) {
    const out = {};
    Object.keys(p).forEach(k => {
      const v = p[k];
      if (typeof v === 'string') out[k] = hex(v);
      else if (Array.isArray(v)) out[k] = v.map(hex);
      else out[k] = v;
    });
    return out;
  }

  const COMPILED = {};
  Object.keys(STATES).forEach(k => { COMPILED[k] = compile(STATES[k]); });

  AW.BeachPalettes = { STATES, COMPILED, hex };
})(window.AW = window.AW || {});
