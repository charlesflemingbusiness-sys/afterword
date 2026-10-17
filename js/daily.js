/*
 * Daily challenge scheduling.
 *
 * TIMEZONE RULE: the daily word changes at 00:00 UTC for everyone, worldwide.
 * A "day number" is the count of whole UTC days since the launch date (2026-10-01 UTC),
 * so puzzle #1 is 2026-10-01. Streaks are computed on the same UTC day numbers, so a
 * player who travels or changes their device timezone keeps a consistent streak.
 *
 * The clock is used ONLY for scheduling. It never affects the beach scene.
 */
(function (AW) {
  'use strict';
  const DAY_MS = 86400000;
  const EPOCH_UTC = Date.UTC(2026, 9, 1); // 2026-10-01
  const SHUFFLE_SEED = 0xAF7E2D;

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function seededShuffle(list, seed) {
    const out = list.slice();
    const rnd = mulberry32(seed);
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rnd() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  /** UTC day number for a Date (or ms timestamp). Can be negative before launch. */
  function dayNumber(now) {
    const t = typeof now === 'number' ? now : (now || new Date()).getTime();
    return Math.floor((t - EPOCH_UTC) / DAY_MS);
  }

  function puzzleNumber(day) { return day + 1; }

  function dateForDay(day) { return new Date(EPOCH_UTC + day * DAY_MS); }

  /** "2026-10-16" for a day number (UTC calendar date). */
  function isoDate(day) { return dateForDay(day).toISOString().slice(0, 10); }

  /** Milliseconds until the next 00:00 UTC. */
  function msUntilNext(now) {
    const t = typeof now === 'number' ? now : (now || new Date()).getTime();
    const next = EPOCH_UTC + (dayNumber(t) + 1) * DAY_MS;
    return next - t;
  }

  function formatCountdown(ms) {
    const s = Math.max(0, Math.floor(ms / 1000));
    const h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    const p = n => String(n).padStart(2, '0');
    return `${p(h)}:${p(m)}:${p(sec)}`;
  }

  // Easy words (difficulty 1) are too guessable for the daily; they stay in Practice.
  const DAILY_MIN_DIFFICULTY = 2;

  let order = null;
  function answerOrder() {
    if (!order) order = seededShuffle(AW.ANSWERS.filter(a => a[2] >= DAILY_MIN_DIFFICULTY).map(a => a[0]), SHUFFLE_SEED);
    return order;
  }

  /** The official answer entry {word, clue, difficulty} for a given day number. */
  function answerForDay(day) {
    const list = answerOrder();
    const idx = ((day % list.length) + list.length) % list.length;
    return entryFor(list[idx]);
  }

  function entryFor(word) {
    const e = AW.ANSWERS.find(a => a[0] === word);
    return e ? { word: e[0], clue: e[1], difficulty: e[2] } : null;
  }

  /** Random practice answer, avoiding today's word and the previous practice word. */
  function practiceAnswer(maxDifficulty, avoid) {
    const pool = AW.ANSWERS.filter(a => a[2] <= maxDifficulty && !(avoid || []).includes(a[0]));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return entryFor(pick[0]);
  }

  AW.Daily = {
    DAY_MS, EPOCH_UTC, DAILY_MIN_DIFFICULTY, dayNumber, puzzleNumber, dateForDay, isoDate, msUntilNext,
    formatCountdown, answerForDay, answerOrder, practiceAnswer, entryFor, seededShuffle, mulberry32
  };
})(window.AW = window.AW || {});
