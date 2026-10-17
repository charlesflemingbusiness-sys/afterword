/*
 * Local persistence (localStorage). Everything degrades gracefully if storage is
 * unavailable (private mode etc.) — the game still plays, it just won't remember.
 *
 * Keys:
 *   afterword.v1.settings        { sound, reducedMotion, revealInShare }
 *   afterword.v1.stats           official daily statistics + streaks
 *   afterword.v1.daily.<day>     the official attempt for one UTC day
 *   afterword.v1.practice        the in-progress practice game
 *   afterword.v1.practiceStats   practice-only totals (never mixed with daily stats)
 */
(function (AW) {
  'use strict';
  const P = 'afterword.v1.';
  const mem = {}; // fallback when localStorage throws

  function read(key, fallback) {
    try {
      const raw = window.localStorage.getItem(P + key);
      return raw == null ? fallback : JSON.parse(raw);
    } catch (e) {
      return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : fallback;
    }
  }
  function write(key, value) {
    mem[key] = value;
    try { window.localStorage.setItem(P + key, JSON.stringify(value)); return true; } catch (e) { return false; }
  }
  function remove(key) {
    delete mem[key];
    try { window.localStorage.removeItem(P + key); } catch (e) { /* ignore */ }
  }

  const DEFAULT_STATS = {
    played: 0, wins: 0, losses: 0, currentStreak: 0, bestStreak: 0,
    lastWinDay: null, lastPlayedDay: null, bestScore: 0, bestGuesses: null, totalScore: 0,
    distribution: {} // guesses used -> count
  };

  function getStats() { return Object.assign({}, DEFAULT_STATS, read('stats', {})); }

  /** Streak as it should be displayed today: a streak survives only if yesterday or today was won. */
  function effectiveStreak(stats, today) {
    if (stats.lastWinDay == null) return 0;
    return stats.lastWinDay >= today - 1 ? stats.currentStreak : 0;
  }

  /**
   * Pure streak/stat update for a finished official puzzle. Returns a new stats object.
   * Streak rule: consecutive UTC days with a WIN. A loss or a missed day resets it.
   */
  function applyResult(stats, { day, won, score, guessesUsed }) {
    const s = Object.assign({}, DEFAULT_STATS, stats, { distribution: Object.assign({}, stats.distribution) });
    s.played += 1;
    s.lastPlayedDay = day;
    if (won) {
      s.wins += 1;
      s.currentStreak = s.lastWinDay === day - 1 ? s.currentStreak + 1 : 1;
      s.lastWinDay = day;
      s.bestStreak = Math.max(s.bestStreak, s.currentStreak);
      s.totalScore += score;
      if (score > s.bestScore) s.bestScore = score;
      if (s.bestGuesses == null || guessesUsed < s.bestGuesses) s.bestGuesses = guessesUsed;
      s.distribution[guessesUsed] = (s.distribution[guessesUsed] || 0) + 1;
    } else {
      s.losses += 1;
      s.currentStreak = 0;
      s.distribution.X = (s.distribution.X || 0) + 1;
    }
    return s;
  }

  /** Record a finished official game exactly once (marks game.recorded and saves it). */
  function recordDaily(game) {
    const saved = read('daily.' + game.day, null);
    if (game.recorded || (saved && saved.recorded)) return getStats(); // never double count
    const next = applyResult(getStats(), {
      day: game.day, won: game.status === 'won', score: game.score ? game.score.total : 0, guessesUsed: game.guesses.length
    });
    write('stats', next);
    game.recorded = true;
    write('daily.' + game.day, game);
    return next;
  }

  const DEFAULT_SETTINGS = { sound: true, reducedMotion: null, revealInShare: false, seenHelp: false };
  function getSettings() { return Object.assign({}, DEFAULT_SETTINGS, read('settings', {})); }
  function saveSettings(s) { write('settings', s); }

  const DEFAULT_PRACTICE_STATS = { played: 0, wins: 0, bestScore: 0 };
  function getPracticeStats() { return Object.assign({}, DEFAULT_PRACTICE_STATS, read('practiceStats', {})); }

  AW.Storage = {
    read, write, remove, getStats, effectiveStreak, applyResult, recordDaily,
    getSettings, saveSettings, getPracticeStats,
    loadDaily: day => read('daily.' + day, null),
    saveDaily: game => write('daily.' + game.day, game),
    loadPractice: () => read('practice', null),
    savePractice: game => write('practice', game),
    savePracticeStats: s => write('practiceStats', s)
  };
})(window.AW = window.AW || {});
