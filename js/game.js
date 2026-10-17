/*
 * Game rules as a plain state object + pure-ish functions. No DOM in here.
 *
 * state = {
 *   mode: 'daily' | 'practice', day, answer, clue, difficulty, guessLimit, showClue,
 *   guesses: [{ word, closeness, score, temperature }], hints: [{ type, text }],
 *   startedAt, finishedAt, status: 'playing' | 'won' | 'lost', score, recorded
 * }
 */
(function (AW) {
  'use strict';

  const PRACTICE_LEVELS = {
    easy: { label: 'Easy', guessLimit: 12, maxDifficulty: 1, showClue: true },
    medium: { label: 'Medium', guessLimit: 8, maxDifficulty: 2, showClue: true },
    hard: { label: 'Hard', guessLimit: 6, maxDifficulty: 3, showClue: false }
  };
  const DAILY_GUESSES = 8;
  const MAX_HINTS = 3;

  function newState({ mode, day, entry, guessLimit, showClue, level }) {
    return {
      mode, day, level: level || null,
      answer: entry.word, clue: entry.clue, difficulty: entry.difficulty,
      guessLimit, showClue: showClue !== false,
      guesses: [], hints: [], startedAt: null, finishedAt: null,
      status: 'playing', score: null, recorded: false
    };
  }

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }

  /** Deterministic hint list for an answer: a warm neighbour, a hot neighbour, then its shape. */
  function hintPlan(engine, answer) {
    const ranked = engine.neighbours(answer).filter(n => !engine.inferred.has(n.word) && !answer.includes(n.word) && !n.word.includes(answer));
    const pick = (lo, hi) => {
      const pool = ranked.filter(n => n.score >= lo && n.score < hi);
      return pool.length ? pool[hash(answer + lo) % Math.min(pool.length, 6)].word : null;
    };
    const warm = pick(0.50, 0.66) || pick(0.34, 0.50);
    // The "close" hint: a HOT word, else the closest non-synonym that isn't the first hint.
    const hot = pick(0.66, 0.85) || (ranked.find(n => n.score < 0.85 && n.word !== warm) || {}).word || null;
    const plan = [];
    if (warm) plan.push({ type: 'related', word: warm, text: `“${warm.toUpperCase()}” is related.` });
    if (hot && hot !== warm) plan.push({ type: 'close', word: hot, text: `“${hot.toUpperCase()}” is close.` });
    plan.push({ type: 'shape', text: `Starts with “${answer[0].toUpperCase()}” and has ${answer.length} letters.` });
    return plan.slice(0, MAX_HINTS);
  }

  function remaining(state) { return state.guessLimit - state.guesses.length; }

  function elapsedSeconds(state, now) {
    if (!state.startedAt) return 0;
    const end = state.finishedAt || now || Date.now();
    return Math.max(0, Math.round((end - state.startedAt) / 1000));
  }

  /**
   * Submit a guess. Mutates state on success.
   * Returns { ok:false, reason, word? } or { ok:true, guess, finished, won }.
   */
  function submit(engine, state, input, now) {
    now = now || Date.now();
    if (state.status !== 'playing') return { ok: false, reason: 'finished' };
    const r = engine.score(state.answer, input);
    if (!r.ok) return r;
    if (state.guesses.some(g => g.word === r.word)) return { ok: false, reason: 'duplicate', word: r.word };
    if (!state.startedAt) state.startedAt = now;
    const guess = { word: r.word, typed: r.typed, closeness: r.closeness, score: r.score, temperature: r.temperature };
    state.guesses.push(guess);
    let finished = false, won = false;
    if (r.temperature === 'FOUND') { state.status = 'won'; finished = won = true; }
    else if (state.guesses.length >= state.guessLimit) { state.status = 'lost'; finished = true; }
    if (finished) {
      state.finishedAt = now;
      state.score = AW.Scoring.compute({
        won, guessesUsed: state.guesses.length, guessLimit: state.guessLimit,
        seconds: elapsedSeconds(state, now), hints: state.hints.length
      });
    }
    return { ok: true, guess, finished, won };
  }

  function useHint(engine, state) {
    if (state.status !== 'playing') return { ok: false, reason: 'finished' };
    const plan = hintPlan(engine, state.answer);
    if (state.hints.length >= plan.length) return { ok: false, reason: 'none-left' };
    const h = plan[state.hints.length];
    state.hints.push({ type: h.type, text: h.text });
    return { ok: true, hint: h };
  }

  function hintsLeft(engine, state) { return hintPlan(engine, state.answer).length - state.hints.length; }

  /** Temperature that the beach should show: the latest valid guess, or null (neutral twilight). */
  function sceneTemperature(state) {
    if (!state || !state.guesses.length) return null;
    return state.guesses[state.guesses.length - 1].temperature;
  }

  /** Warmest temperature reached so far. */
  function bestTemperature(state) {
    let best = -1;
    state.guesses.forEach(g => { best = Math.max(best, AW.SemanticEngine.ORDER.indexOf(g.temperature)); });
    return best < 0 ? null : AW.SemanticEngine.ORDER[best];
  }

  AW.Game = {
    PRACTICE_LEVELS, DAILY_GUESSES, MAX_HINTS, newState, submit, useHint, hintPlan, hintsLeft,
    remaining, elapsedSeconds, sceneTemperature, bestTemperature
  };
})(window.AW = window.AW || {});
