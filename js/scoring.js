/*
 * Transparent scoring.
 *
 *   Solve bonus      1000                       (only when the word is found)
 * + Efficiency        150 × unused guesses      (solve on guess 1 of 8 → +1050)
 * + Speed             300 − ⌊seconds ÷ 2⌋       (never below 0; zero after 10 minutes)
 * − Hints             150 × hints used          (at most 3 hints, so a solve is never below 550)
 *   A lost puzzle scores 0.
 *
 * Maximum (8-guess game): 1000 + 1050 + 300 = 2350.
 */
(function (AW) {
  'use strict';
  const RULES = { solve: 1000, perUnusedGuess: 150, speedMax: 300, speedSecondsPerPoint: 2, hintCost: 150, floor: 0 };

  function compute({ won, guessesUsed, guessLimit, seconds, hints }) {
    if (!won) return { total: 0, parts: { solve: 0, efficiency: 0, speed: 0, hints: 0 } };
    const efficiency = RULES.perUnusedGuess * Math.max(0, guessLimit - guessesUsed);
    const speed = Math.max(0, RULES.speedMax - Math.floor(Math.max(0, seconds) / RULES.speedSecondsPerPoint));
    const hintPenalty = RULES.hintCost * (hints || 0);
    const total = Math.max(RULES.floor, RULES.solve + efficiency + speed - hintPenalty);
    return { total, parts: { solve: RULES.solve, efficiency, speed, hints: -hintPenalty } };
  }

  function maxScore(guessLimit) { return RULES.solve + RULES.perUnusedGuess * (guessLimit - 1) + RULES.speedMax; }

  AW.Scoring = { RULES, compute, maxScore };
})(window.AW = window.AW || {});
