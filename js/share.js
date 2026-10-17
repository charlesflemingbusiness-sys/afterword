/* Shareable result text + native share / clipboard with honest feedback. */
(function (AW) {
  'use strict';
  const SHARE_URL = 'https://afterwordapp.vercel.app';
  const SQUARE = { FREEZING: '⬛', COLD: '🟦', COOL: '🟪', WARM: '🟨', HOT: '🟧', BURNING: '🟥', FOUND: '☀️' };

  function buildText(state, opts) {
    opts = opts || {};
    const lines = [];
    const won = state.status === 'won';
    if (state.mode === 'daily') lines.push(`AFTERWORD #${String(AW.Daily.puzzleNumber(state.day)).padStart(3, '0')} 🏝️`);
    else lines.push(`AFTERWORD · Practice (${(AW.Game.PRACTICE_LEVELS[state.level] || {}).label || 'Custom'}) 🏝️`);
    lines.push(won ? 'WORD FOUND!' : 'The beach stayed cold…');
    lines.push(`Guesses: ${won ? state.guesses.length : 'X'}/${state.guessLimit}` + (state.hints.length ? ` · Hints: ${state.hints.length}` : ''));
    if (won) lines.push(`Score: ${state.score.total.toLocaleString('en-US')}` + (state.mode === 'daily' && opts.streak ? ` · Streak: ${opts.streak} day${opts.streak === 1 ? '' : 's'}` : ''));
    lines.push('');
    lines.push(state.guesses.map(g => SQUARE[g.temperature]).join(''));
    lines.push(state.guesses.map(g => g.temperature).join(' → '));
    if (opts.reveal) lines.push(`The word was ${state.answer.toUpperCase()}.`);
    lines.push('');
    lines.push(SHARE_URL);
    return lines.join('\n');
  }

  function legacyCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
    ta.remove();
    return ok;
  }

  /** Resolves to 'shared' | 'copied' | 'cancelled' | 'failed'. */
  async function share(text) {
    const touch = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (navigator.share && touch) {
      try { await navigator.share({ text }); return 'shared'; }
      catch (e) { if (e && e.name === 'AbortError') return 'cancelled'; }
    }
    if (navigator.clipboard && window.isSecureContext) {
      // Some browsers leave the permission promise pending without focus; don't hang on it.
      const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), 1200));
      try { await Promise.race([navigator.clipboard.writeText(text), timeout]); return 'copied'; } catch (e) { /* fall through */ }
    }
    return legacyCopy(text) ? 'copied' : 'failed';
  }

  AW.Share = { buildText, share, SQUARE };
})(window.AW = window.AW || {});
