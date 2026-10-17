/*
 * AFTERWORD semantic engine.
 *
 * A transparent, local "semantic graph" model. No network, no AI inference.
 *
 * Every word has:
 *   - one or more taxonomy placements (e.g. animal.mammal.canine), and
 *   - weighted associations to other words (synonyms, related concepts).
 *
 * Similarity between two words combines three independent signals:
 *   1. direct    â€” the weight of an explicit association (synonym = 0.92).
 *   2. bridged   â€” the best two-step path aâ†’mâ†’b, scored w1 Â· w2 Â· 0.85.
 *   3. taxonomy  â€” how specific the deepest shared category is
 *                  (e.g. both "animal.mammal.canine" â‰« both just "animal").
 * The strongest signal wins; a second agreeing signal adds a small bonus.
 * Spelling plays no part: DOG and FOG share no edges or categories.
 *
 * Words the lexicon has never seen are reported as unknown (null) rather than
 * being given a misleading FREEZING score.
 */
(function (AW) {
  'use strict';

  const SYNONYM_WEIGHT = 0.92;
  const DEFAULT_WEIGHT = 0.6;
  const BRIDGE_DECAY = 0.85;
  const SECOND_SIGNAL_BONUS = 0.25;
  const MAX_NON_EXACT = 0.97;

  // How alike two words are when the deepest category they share is at depth N.
  const DEPTH_COHESION = [0, 0.22, 0.40, 0.54, 0.62];
  // Broad categories whose members are less alike than their depth suggests.
  const COHESION_OVERRIDES = {
    'object': 0.14, 'place': 0.16, 'quality': 0.12, 'action': 0.14, 'person': 0.2,
    'feeling': 0.22, 'activity': 0.16, 'nature': 0.18, 'time': 0.2, 'body': 0.24,
    'color': 0.42, 'drink': 0.38, 'sky': 0.26, 'weather': 0.26, 'material': 0.22,
    'animal.mammal.wild': 0.44, 'object.misc': 0.18, 'object.tool': 0.40,
    'object.kitchen': 0.42, 'food.meal': 0.44, 'person.job': 0.38,
    'place.building.public': 0.38, 'quality.other': 0.16, 'quality.size': 0.4,
    'action.daily': 0.2, 'action.move': 0.32, 'action.make': 0.22,
    'activity.leisure': 0.3, 'nature.land.ground': 0.40, 'feeling.mind': 0.3,
    'object.paper': 0.40, 'nature.plant.other': 0.38, 'nature.plant.part': 0.40,
    'body.part': 0.42, 'body.inner': 0.36
  };

  // Temperature bands, warmest first. `min` is the lowest closeness that earns the band.
  const BANDS = [
    { id: 'BURNING', min: 0.85 },
    { id: 'HOT', min: 0.66 },
    { id: 'WARM', min: 0.50 },
    { id: 'COOL', min: 0.34 },
    { id: 'COLD', min: 0.18 },
    { id: 'FREEZING', min: -1 }
  ];

  function cohesionOf(path) {
    if (Object.prototype.hasOwnProperty.call(COHESION_OVERRIDES, path)) return COHESION_OVERRIDES[path];
    const depth = path.split('.').length;
    return DEPTH_COHESION[Math.min(depth, DEPTH_COHESION.length - 1)];
  }

  /** Parse the lexicon DSL into { cats: Map<word,Set>, edges: Map<word,Map<word,weight>> } */
  function parseLexicon(src) {
    const cats = new Map();
    const edges = new Map();
    const problems = [];
    const link = (a, b, w) => {
      if (a === b) return;
      if (!edges.has(a)) edges.set(a, new Map());
      if (!edges.has(b)) edges.set(b, new Map());
      const ab = edges.get(a), ba = edges.get(b);
      if (!ab.has(b) || ab.get(b) < w) ab.set(b, w);
      if (!ba.has(a) || ba.get(a) < w) ba.set(a, w);
    };
    src.split('\n').forEach((raw, i) => {
      const line = raw.trim();
      if (!line || line.startsWith('#')) return;
      const parts = line.split('|').map(s => s.trim());
      if (parts.length !== 3) { problems.push(`line ${i + 1}: expected 3 fields`); return; }
      const word = parts[0];
      if (!/^[a-z]+$/.test(word)) { problems.push(`line ${i + 1}: bad word "${word}"`); return; }
      if (!cats.has(word)) cats.set(word, new Set());
      parts[1].split(/\s+/).filter(Boolean).forEach(c => cats.get(word).add(c));
      if (!edges.has(word)) edges.set(word, new Map());
      parts[2].split(/\s+/).filter(Boolean).forEach(tok => {
        let m;
        if ((m = /^=([a-z]+)$/.exec(tok))) link(word, m[1], SYNONYM_WEIGHT);
        else if ((m = /^([a-z]+):([1-9])$/.exec(tok))) link(word, m[1], Number(m[2]) / 10);
        else if ((m = /^([a-z]+)$/.exec(tok))) link(word, m[1], DEFAULT_WEIGHT);
        else problems.push(`line ${i + 1}: bad relation "${tok}"`);
      });
    });
    return { cats, edges, problems };
  }

  class SemanticEngine {
    constructor(src, aliases, irregular) {
      const { cats, edges, problems } = parseLexicon(src);
      this.problems = problems;
      this.edges = edges;
      this.aliases = aliases || {};
      this.irregular = irregular || {};
      this.cats = new Map();
      this.inferred = new Set();
      // Explicitly categorised words.
      cats.forEach((set, w) => { if (set.size) this.cats.set(w, [...set]); });
      // Words only mentioned as relations: adopt the categories of their strongest
      // categorised neighbour, but only when there is enough evidence (â‰¥2 links, one â‰¥0.6).
      edges.forEach((nbrs, w) => {
        if (this.cats.has(w) || nbrs.size < 2) return;
        let best = null, bestW = 0;
        nbrs.forEach((wt, n) => { if (wt >= 0.6 && wt > bestW && cats.has(n) && cats.get(n).size) { best = n; bestW = wt; } });
        if (best) { this.cats.set(w, [...cats.get(best)]); this.inferred.add(w); }
      });
      this.vocab = [...this.cats.keys()].sort();
      this.vocabSet = new Set(this.vocab);
      this._cache = new Map();
    }

    /** Is this exact canonical word known? */
    knows(word) { return this.vocabSet.has(word); }

    /**
     * Normalise raw player input to a canonical lexicon word.
     * Returns { ok, word, reason } â€” reason is 'empty' | 'format' | 'unknown'.
     */
    resolve(input) {
      const raw = String(input == null ? '' : input).trim().toLowerCase();
      if (!raw) return { ok: false, reason: 'empty' };
      const cleaned = raw.replace(/[‘’']/g, '');
      if (!/^[a-z]+$/.test(cleaned)) return { ok: false, reason: 'format', word: cleaned };
      for (const cand of this._candidates(cleaned)) {
        if (this.vocabSet.has(cand)) return { ok: true, word: cand, typed: cleaned };
      }
      return { ok: false, reason: 'unknown', word: cleaned };
    }

    _candidates(w) {
      // Spelling variants map onto their canonical word first (gray → grey).
      const out = this.aliases[w] ? [this.aliases[w], w] : [w];
      const push = x => { if (x && x.length > 1 && !out.includes(x)) out.push(x); };
      if (this.irregular[w]) push(this.irregular[w]);
      if (w.endsWith('ies')) push(w.slice(0, -3) + 'y');
      if (w.endsWith('ves')) { push(w.slice(0, -3) + 'f'); push(w.slice(0, -3) + 'fe'); }
      if (w.endsWith('es')) push(w.slice(0, -2));
      if (w.endsWith('s') && !w.endsWith('ss')) push(w.slice(0, -1));
      // resolve aliases of the singular forms too
      out.slice(1).forEach(c => { if (this.aliases[c]) push(this.aliases[c]); });
      return out;
    }

    _taxonomy(a, b) {
      const ca = this.cats.get(a) || [], cb = this.cats.get(b) || [];
      let best = 0, bestPath = null;
      for (const x of ca) {
        const xs = x.split('.');
        for (const y of cb) {
          const ys = y.split('.');
          let d = 0;
          while (d < xs.length && d < ys.length && xs[d] === ys[d]) d++;
          if (!d) continue;
          const path = xs.slice(0, d).join('.');
          const c = cohesionOf(path);
          if (c > best) { best = c; bestPath = path; }
        }
      }
      return { value: best, path: bestPath };
    }

    _direct(a, b) {
      const n = this.edges.get(a);
      return n && n.has(b) ? n.get(b) : 0;
    }

    _bridge(a, b) {
      const na = this.edges.get(a), nb = this.edges.get(b);
      if (!na || !nb) return { value: 0, via: null };
      const [small, other] = na.size <= nb.size ? [na, nb] : [nb, na];
      let best = 0, via = null;
      small.forEach((w1, m) => {
        const w2 = other.get(m);
        if (w2) { const v = w1 * w2 * BRIDGE_DECAY; if (v > best) { best = v; via = m; } }
      });
      return { value: best, via };
    }

    /**
     * Closeness of `guess` to `answer` in [0, 1]. Both must be canonical known words.
     * Returns { score, direct, bridge, via, taxonomy, sharedCategory }.
     */
    explain(answer, guess) {
      if (answer === guess) return { score: 1, direct: 1, bridge: 0, taxonomy: 1, via: null, sharedCategory: null };
      const direct = this._direct(answer, guess);
      const br = this._bridge(answer, guess);
      const tax = this._taxonomy(answer, guess);
      const signals = [direct, br.value, tax.value].sort((x, y) => y - x);
      let score = signals[0] + (1 - signals[0]) * SECOND_SIGNAL_BONUS * signals[1];
      score = Math.min(MAX_NON_EXACT, score);
      return { score, direct, bridge: br.value, via: br.via, taxonomy: tax.value, sharedCategory: tax.path };
    }

    similarity(answer, guess) {
      const key = answer + '|' + guess;
      if (this._cache.has(key)) return this._cache.get(key);
      const s = this.explain(answer, guess).score;
      if (this._cache.size > 20000) this._cache.clear();
      this._cache.set(key, s);
      return s;
    }

    /** Map a closeness score to a temperature id. */
    static temperature(score) {
      if (score >= 1) return 'FOUND';
      for (const b of BANDS) if (score >= b.min) return b.id;
      return 'FREEZING';
    }

    /**
     * Score a raw guess against an answer.
     * Returns { ok:false, reason } or { ok:true, word, score, closeness (0-100), temperature }.
     */
    score(answer, input) {
      const r = this.resolve(input);
      if (!r.ok) return r;
      const score = this.similarity(answer, r.word);
      return {
        ok: true,
        word: r.word,
        typed: r.typed,
        score,
        closeness: score >= 1 ? 100 : Math.min(99, Math.round(score * 100)),
        temperature: SemanticEngine.temperature(score)
      };
    }

    /** All known words ranked by closeness to the answer (excluding the answer). */
    neighbours(answer, limit) {
      const out = [];
      for (const w of this.vocab) if (w !== answer) out.push({ word: w, score: this.similarity(answer, w) });
      out.sort((x, y) => y.score - x.score || (x.word < y.word ? -1 : 1));
      return limit ? out.slice(0, limit) : out;
    }

    /** Count of known words in each temperature band for this answer. */
    distribution(answer) {
      const d = { BURNING: 0, HOT: 0, WARM: 0, COOL: 0, COLD: 0, FREEZING: 0 };
      for (const w of this.vocab) if (w !== answer) d[SemanticEngine.temperature(this.similarity(answer, w))]++;
      return d;
    }

    /** Top-level domain of a word, for the free category clue. */
    domain(word) {
      const cs = this.cats.get(word) || [];
      return cs.length ? cs[0].split('.')[0] : null;
    }

    categories(word) { return (this.cats.get(word) || []).slice(); }
  }

  SemanticEngine.BANDS = BANDS;
  SemanticEngine.ORDER = ['FREEZING', 'COLD', 'COOL', 'WARM', 'HOT', 'BURNING', 'FOUND'];

  AW.SemanticEngine = SemanticEngine;
  AW.parseLexicon = parseLexicon;
})(window.AW = window.AW || {});
