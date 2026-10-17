/* AFTERWORD — UI controller. Wires the game logic, beach, storage, sound and sharing to the DOM. */
(function (AW) {
  'use strict';
  const $ = id => document.getElementById(id);
  const ORDER = AW.SemanticEngine.ORDER;
  const LABEL = { FREEZING: 'Freezing', COLD: 'Cold', COOL: 'Cool', WARM: 'Warm', HOT: 'Hot', BURNING: 'Burning', FOUND: 'Found' };
  const BLURB = {
    FREEZING: 'Deep night. Nowhere near.', COLD: 'A cold dusk. Only a faint link.', COOL: 'Twilight. There is some connection.',
    WARM: 'Sunset. Meaningfully related!', HOT: 'Glowing. Very close!', BURNING: 'The campfire ignites. Exceptionally close!', FOUND: 'You found it!'
  };
  const SCENE_LABEL = { IDLE: 'TWILIGHT', FREEZING: 'FREEZING', COLD: 'COLD', COOL: 'COOL', WARM: 'WARM', HOT: 'HOT', BURNING: 'BURNING', FOUND: 'FOUND' };

  const engine = new AW.SemanticEngine(AW.LEXICON_SRC, AW.LEXICON_ALIASES, AW.LEXICON_IRREGULAR);
  const G = AW.Game, D = AW.Daily, St = AW.Storage;

  let settings = St.getSettings();
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reduced = () => (settings.reducedMotion == null ? prefersReduced : settings.reducedMotion);

  let today = D.dayNumber();
  let mode = 'daily';
  let daily = null, practice = null;
  let beach = null;
  let toastTimer = 0;

  // ───────── state loading ─────────
  function loadDaily() {
    today = D.dayNumber();
    const entry = D.answerForDay(today);
    const saved = St.loadDaily(today);
    daily = saved && saved.answer === entry.word ? saved : G.newState({ mode: 'daily', day: today, entry, guessLimit: G.DAILY_GUESSES });
  }
  function loadPractice() {
    const saved = St.loadPractice();
    practice = saved && engine.knows(saved.answer) ? saved : newPractice(practiceLevel(), false);
  }
  function practiceLevel() { return (practice && practice.level) || $('practiceLevel').value || 'medium'; }
  function newPractice(level, save) {
    const L = G.PRACTICE_LEVELS[level];
    const avoid = [daily ? daily.answer : null, practice ? practice.answer : null].filter(Boolean);
    const entry = D.practiceAnswer(L.maxDifficulty, avoid);
    const st = G.newState({ mode: 'practice', day: today, entry, guessLimit: L.guessLimit, showClue: L.showClue, level });
    if (save !== false) St.savePractice(st);
    return st;
  }
  const current = () => (mode === 'daily' ? daily : practice);
  function persist(st) { if (st.mode === 'daily') St.saveDaily(st); else St.savePractice(st); }

  // ───────── rendering ─────────
  function setSceneTemp(temp, opts) {
    const key = temp || 'IDLE';
    document.body.dataset.temp = key;
    $('tempBadgeText').textContent = SCENE_LABEL[key];
    $('beach').setAttribute('aria-label', 'Pixel-art beach: ' + ({
      IDLE: 'calm twilight', FREEZING: 'freezing deep-blue night with frost', COLD: 'cold blue dusk with mist', COOL: 'violet twilight',
      WARM: 'pink and orange sunset', HOT: 'glowing golden sunset', BURNING: 'fiery red sunset with a campfire', FOUND: 'golden celebration with fireworks'
    })[key]);
    if (beach) beach.setTemperature(temp, opts);
    if (opts && opts.pulse) {
      const b = $('tempBadge'); b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop');
    }
  }

  // The cat sleeps by the campfire once the shown game is won. Only a fresh win (onSubmit)
  // plays the walk; restoring or switching to a won game puts it there directly.
  function syncCat(st) {
    if (!beach) return;
    if (st.status === 'won') beach.catSleep({ instant: true }); else beach.catWake();
  }

  function renderHeader() {
    const stats = St.getStats();
    $('streakCount').textContent = St.effectiveStreak(stats, today);
    $('puzzleMeta').textContent = `#${String(D.puzzleNumber(today)).padStart(3, '0')} · ${D.isoDate(today)}`;
    $('tabDailyNum').textContent = '#' + String(D.puzzleNumber(today)).padStart(3, '0');
    $('dailyDoneMark').hidden = daily.status === 'playing';
  }

  function renderPlay(opts) {
    opts = opts || {};
    const st = current();
    $('tabDaily').setAttribute('aria-selected', String(mode === 'daily'));
    $('tabPractice').setAttribute('aria-selected', String(mode === 'practice'));
    $('practiceBar').hidden = mode !== 'practice';
    if (mode === 'practice') $('practiceLevel').value = st.level || 'medium';

    const clue = $('clue');
    clue.innerHTML = st.showClue ? `Clue: <b></b>` : `<span class="muted">No clue on Hard — hints can still help.</span>`;
    if (st.showClue) clue.querySelector('b').textContent = st.clue;

    // pips
    const pips = $('pips'); pips.innerHTML = '';
    for (let i = 0; i < st.guessLimit; i++) {
      const p = document.createElement('span');
      p.className = 'pip';
      const g = st.guesses[i];
      if (g) { p.classList.add('used'); p.style.background = `var(--t-${g.temperature})`; }
      pips.appendChild(p);
    }
    const left = G.remaining(st);
    $('remaining').textContent = st.status === 'playing' ? `${left} guess${left === 1 ? '' : 'es'} left` : (st.status === 'won' ? 'Solved' : 'No guesses left');

    const playing = st.status === 'playing';
    $('guessForm').hidden = !playing;
    $('guessInput').disabled = !playing;
    $('btnGuess').disabled = !playing;
    $('guessInput').placeholder = playing ? 'type a word…' : (mode === 'daily' ? 'come back tomorrow' : 'start a new word');

    renderThermo(G.sceneTemperature(st));
    renderHints(st);
    renderHistory(st, opts.newIndex);
    renderResult(st, opts.reveal);
    if (!opts.keepFeedback) setFeedback('', '');
  }

  function renderThermo(temp) {
    const el = $('thermo'); el.innerHTML = '';
    const idx = temp ? ORDER.indexOf(temp) : -1;
    ORDER.forEach((t, i) => {
      const wrap = document.createElement('div');
      const seg = document.createElement('div');
      seg.className = 'seg' + (i <= idx ? ' on' : '') + (i === idx ? ' now' : '');
      seg.style.setProperty('--c', `var(--t-${t})`);
      const lbl = document.createElement('span');
      lbl.className = 'lbl' + (i === idx ? ' now' : '');
      lbl.textContent = t;
      wrap.append(seg, lbl);
      el.appendChild(wrap);
    });
  }

  function renderHints(st) {
    const list = $('hintList'); list.innerHTML = '';
    st.hints.forEach(h => { const li = document.createElement('li'); li.textContent = h.text; list.appendChild(li); });
    const left = G.hintsLeft(engine, st);
    const btn = $('btnHint');
    btn.disabled = st.status !== 'playing' || left <= 0;
    btn.firstChild.textContent = left > 0 ? `Hint (${left} left) ` : 'No hints left ';
    btn.hidden = st.status !== 'playing' && !st.hints.length;
  }

  function renderHistory(st, newIndex) {
    const ol = $('history'); ol.innerHTML = '';
    $('historyTitle').hidden = !st.guesses.length;
    st.guesses.forEach((g, i) => {
      const li = document.createElement('li');
      li.style.setProperty('--c', `var(--t-${g.temperature})`);
      if (i === newIndex) li.className = 'new';
      const sw = document.createElement('span'); sw.className = 'sw';
      const w = document.createElement('span'); w.className = 'word'; w.textContent = g.word.toUpperCase();
      if (g.typed && g.typed !== g.word) { const ty = document.createElement('span'); ty.className = 'typed'; ty.textContent = `(${g.typed})`; w.appendChild(ty); }
      const meter = document.createElement('span'); meter.className = 'meter';
      meter.innerHTML = `<span class="bar"><i style="width:${g.closeness}%"></i></span><span class="n">${g.closeness}</span><span class="t">${g.temperature}</span>`;
      meter.title = `Closeness ${g.closeness}/100`;
      li.append(sw, w, meter);
      li.setAttribute('aria-label', `Guess ${i + 1}: ${g.word}, ${LABEL[g.temperature]}, closeness ${g.closeness} of 100`);
      ol.appendChild(li);
    });
  }

  function fmtTime(sec) {
    const m = Math.floor(sec / 60), s = sec % 60;
    return m ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
  }

  function renderResult(st, reveal) {
    const card = $('resultCard');
    if (st.status === 'playing') { card.hidden = true; card.innerHTML = ''; return; }
    const won = st.status === 'won';
    const isDaily = st.mode === 'daily';
    const stats = St.getStats();
    const pstats = St.getPracticeStats();
    const best = isDaily ? stats.bestScore : pstats.bestScore;
    const streak = St.effectiveStreak(stats, today);
    const secs = G.elapsedSeconds(st);
    const sc = st.score || { total: 0, parts: {} };
    card.hidden = false;
    card.className = 'result' + (reveal ? ' reveal' : '');
    card.innerHTML = `
      <h2>${won ? 'WORD FOUND.' : 'OUT OF GUESSES'}</h2>
      <p class="answer"></p>
      <p class="sub">${won ? `Found in ${st.guesses.length} of ${st.guessLimit} guesses.` : 'The beach stayed cold this time. The word was revealed above — your guesses are below.'}</p>
      <div class="result-stats">
        <div><b>${won ? st.guesses.length : 'X'}/${st.guessLimit}</b><span>guesses</span></div>
        <div><b>${fmtTime(secs)}</b><span>time</span></div>
        <div class="score"><b id="scoreCount">0</b><span>${isDaily ? 'score' : 'practice score'}</span></div>
        <div><b>${best.toLocaleString('en-US')}</b><span>${isDaily ? 'personal best' : 'practice best'}</span></div>
        ${isDaily ? `<div><b>${streak}</b><span>day streak</span></div>` : ''}
      </div>
      ${won ? `<p class="breakdown">1000 found + ${sc.parts.efficiency} guesses left + ${sc.parts.speed} speed${st.hints.length ? ` − ${-sc.parts.hints} hints` : ''}</p>` : ''}
      <div class="result-actions">
        <button class="btn primary" id="btnShare" type="button">Share result</button>
        <label class="chk"><input type="checkbox" id="chkReveal"> include answer</label>
        ${isDaily ? `<button class="btn" id="btnGoPractice" type="button">Play practice</button>` : `<button class="btn" id="btnAgain" type="button">New practice word</button>`}
      </div>
      ${isDaily ? `<p class="next">Next word in <strong class="cd">--:--:--</strong></p>` : `<p class="next muted">Practice scores never affect your daily stats.</p>`}`;
    card.querySelector('.answer').textContent = st.answer.toUpperCase();
    $('chkReveal').checked = !!settings.revealInShare;
    $('btnShare').addEventListener('click', () => doShare(st));
    if ($('btnGoPractice')) $('btnGoPractice').addEventListener('click', () => switchMode('practice'));
    if ($('btnAgain')) $('btnAgain').addEventListener('click', startNewPractice);
    countUp($('scoreCount'), sc.total, reveal && !reduced());
    tickCountdown();
  }

  function countUp(el, target, animate) {
    if (!animate || !target) { el.textContent = target.toLocaleString('en-US'); return; }
    const t0 = performance.now(), dur = 1100;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))).toLocaleString('en-US');
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function setFeedback(text, kind) {
    const f = $('feedback');
    f.textContent = text;
    f.className = 'feedback' + (kind ? ' ' + kind : '');
  }

  function toast(text) {
    const t = $('toast');
    t.textContent = text; t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2600);
  }

  function shake() {
    const f = $('guessForm');
    f.classList.remove('shake'); void f.offsetWidth; f.classList.add('shake');
  }

  // ───────── actions ─────────
  function onSubmit(e) {
    e.preventDefault();
    AW.Sound.unlock();
    const st = current();
    const input = $('guessInput');
    const raw = input.value;
    const r = G.submit(engine, st, raw);
    if (!r.ok) {
      const word = (r.word || raw.trim()).toUpperCase();
      const msg = {
        empty: 'Type a word first.',
        format: 'Letters only — one word, no spaces, numbers or symbols.',
        unknown: `I don't know “${word}” yet. Try another word — that one wasn't counted.`,
        duplicate: `You already tried ${word}. No guess used.`,
        finished: mode === 'daily' ? "Today's puzzle is complete. Try Practice mode!" : 'This round is over — start a new practice word.'
      }[r.reason] || 'That guess could not be scored.';
      setFeedback(msg, 'bad');
      AW.Sound.play('error');
      shake();
      return;
    }
    input.value = '';
    AW.Sound.play('submit');
    setTimeout(() => AW.Sound.play(r.guess.temperature), 60);
    setSceneTemp(r.guess.temperature, { pulse: true });
    if (r.won) beach.catSleep();
    if (r.finished) {
      if (st.mode === 'daily') { persist(st); St.recordDaily(st); }
      else {
        const ps = St.getPracticeStats();
        ps.played += 1;
        if (r.won) { ps.wins += 1; ps.bestScore = Math.max(ps.bestScore, st.score.total); }
        St.savePracticeStats(ps);
        st.recorded = true;
      }
      if (!r.won) setTimeout(() => AW.Sound.play('LOST'), 500);
      else if (st.mode === 'daily') AW.Sound.play('complete');
    }
    persist(st);
    renderHeader();
    renderPlay({ newIndex: st.guesses.length - 1, reveal: r.finished, keepFeedback: true });
    const g = r.guess;
    setFeedback(r.won ? `${g.word.toUpperCase()} — that's it!` : `${g.word.toUpperCase()} is ${LABEL[g.temperature].toUpperCase()} · ${BLURB[g.temperature]}`, r.won ? 'good' : '');
    if (r.finished) {
      setTimeout(() => $('resultCard').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'nearest' }), 200);
    } else if (window.matchMedia('(pointer: fine)').matches) input.focus();
  }

  function onHint() {
    AW.Sound.unlock();
    const st = current();
    const r = G.useHint(engine, st);
    if (!r.ok) return;
    persist(st);
    AW.Sound.play('hint');
    renderHints(st);
    setFeedback(`Hint: ${r.hint.text} (−150 points if you solve it)`, '');
  }

  async function doShare(st) {
    const reveal = $('chkReveal') && $('chkReveal').checked;
    const text = AW.Share.buildText(st, { streak: St.effectiveStreak(St.getStats(), today), reveal });
    const res = await AW.Share.share(text);
    toast({ shared: 'Shared!', copied: 'Result copied to clipboard.', cancelled: 'Share cancelled.', failed: "Couldn't copy automatically — copy the text below." }[res]);
    if (res === 'failed') {
      let ta = document.querySelector('#resultCard textarea.share-text');
      if (!ta) {
        ta = document.createElement('textarea');
        ta.className = 'share-text'; ta.readOnly = true; ta.rows = 7;
        ta.setAttribute('aria-label', 'Your result text');
        $('resultCard').appendChild(ta);
      }
      ta.value = text; ta.focus(); ta.select();
    }
  }

  function switchMode(m) {
    if (m === mode) return;
    mode = m;
    const st = current();
    setSceneTemp(G.sceneTemperature(st), { celebrate: false });
    syncCat(st);
    renderPlay();
    if (window.matchMedia('(pointer: fine)').matches && st.status === 'playing') $('guessInput').focus();
  }

  function startNewPractice() {
    practice = newPractice($('practiceLevel').value);
    if (mode !== 'practice') mode = 'practice';
    setSceneTemp(null);
    syncCat(practice);
    renderPlay();
    setFeedback(`New ${G.PRACTICE_LEVELS[practice.level].label.toLowerCase()} practice word. Good luck!`, '');
    $('guessInput').focus();
  }

  // ───────── dialogs ─────────
  function openDialog(id) {
    const d = $(id);
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
  }

  function renderLegend() {
    const ul = $('legend'); ul.innerHTML = '';
    ORDER.forEach(t => {
      const li = document.createElement('li');
      li.style.setProperty('--c', `var(--t-${t})`);
      li.innerHTML = `<span class="sw"></span><b>${t}</b><span>${BLURB[t]}</span>`;
      ul.appendChild(li);
    });
  }

  function renderStats() {
    const s = St.getStats();
    const winPct = s.played ? Math.round((s.wins / s.played) * 100) : 0;
    $('statGrid').innerHTML = [
      [s.played, 'played'], [winPct + '%', 'win rate'], [St.effectiveStreak(s, today), 'current streak'],
      [s.bestStreak, 'best streak'], [s.bestScore.toLocaleString('en-US'), 'personal best'], [s.wins, 'puzzles solved']
    ].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('');
    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 'X'];
    const max = Math.max(1, ...rows.map(r => s.distribution[r] || 0));
    $('dist').innerHTML = rows.map(r => {
      const n = s.distribution[r] || 0;
      return `<div class="row"><span>${r}</span><span class="fill" style="width:${Math.max(8, (n / max) * 100)}%">${n}</span></div>`;
    }).join('');
    const p = St.getPracticeStats();
    $('practiceStats').textContent = `${p.played} played · ${p.wins} solved · best practice score ${p.bestScore.toLocaleString('en-US')} (not counted in daily stats)`;
  }

  function applySettings() {
    AW.Sound.setEnabled(settings.sound);
    $('btnSound').setAttribute('aria-pressed', String(!!settings.sound));
    $('btnSound').setAttribute('aria-label', settings.sound ? 'Sound on — click to mute' : 'Sound off — click to unmute');
    document.body.classList.toggle('reduce-motion', !!reduced());
    if (beach) beach.setReducedMotion(reduced());
    $('setSound').checked = !!settings.sound;
    $('setMotion').checked = !!reduced();
    $('setReveal').checked = !!settings.revealInShare;
  }

  // ───────── countdown / day rollover ─────────
  function tickCountdown() {
    const ms = D.msUntilNext();
    const txt = D.formatCountdown(ms);
    $('countdown').textContent = txt;
    document.querySelectorAll('.result .cd').forEach(el => { el.textContent = txt; });
    if (D.dayNumber() !== today) {
      const wasPlaying = daily && daily.status === 'playing' && daily.guesses.length;
      loadDaily();
      renderHeader();
      if (mode === 'daily') { setSceneTemp(G.sceneTemperature(daily), { celebrate: false }); syncCat(daily); renderPlay(); }
      toast(wasPlaying ? 'A new day began (UTC) — a new daily word is ready.' : 'A new daily word is ready!');
    }
  }

  // ───────── canvas sizing ─────────
  // The beach always fills the stage width with nearest-neighbour scaling (CSS
  // image-rendering: pixelated). When an exact integer scale is within 4% of the
  // available width we snap to it for perfectly even pixels.
  function fitCanvas() {
    const stage = $('stage'), c = $('beach');
    const avail = stage.clientWidth;
    const dpr = window.devicePixelRatio || 1;
    const { W, H } = AW.Beach.SIZE;
    const scale = Math.floor((avail * dpr) / W);
    const snapped = (scale * W) / dpr;
    const cssW = scale >= 1 && snapped >= avail * 0.96 ? snapped : avail;
    c.style.width = cssW + 'px';
    c.style.height = (cssW * H) / W + 'px';
  }

  // ───────── boot ─────────
  function init() {
    loadDaily();
    loadPractice();
    beach = new AW.Beach($('beach'), { reducedMotion: reduced() });
    applySettings();
    renderLegend();
    $('vocabSize').textContent = engine.vocab.length.toLocaleString('en-US');
    const reset = new Date(Date.now() + D.msUntilNext());
    $('resetLocal').textContent = reset.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    beach.setTemperature(G.sceneTemperature(daily), { instant: true, celebrate: false });
    document.body.dataset.temp = G.sceneTemperature(daily) || 'IDLE';
    setSceneTemp(G.sceneTemperature(daily), { instant: true, celebrate: false });
    syncCat(daily);
    beach.start();
    renderHeader();
    renderPlay();
    if (daily.status !== 'playing') setFeedback(daily.status === 'won' ? "You've solved today's word. See you tomorrow!" : "Today's puzzle is over. A new word arrives at 00:00 UTC.", '');

    fitCanvas();
    window.addEventListener('resize', fitCanvas);

    $('guessForm').addEventListener('submit', onSubmit);
    $('btnHint').addEventListener('click', onHint);
    $('tabDaily').addEventListener('click', () => switchMode('daily'));
    $('tabPractice').addEventListener('click', () => switchMode('practice'));
    $('btnNewPractice').addEventListener('click', startNewPractice);
    $('practiceLevel').addEventListener('change', () => {
      if (practice.status === 'playing' && practice.guesses.length) {
        setFeedback('Difficulty applies to your next practice word — press “New word”.', '');
      } else startNewPractice();
    });
    $('btnHelp').addEventListener('click', () => openDialog('dlgHelp'));
    $('btnAbout').addEventListener('click', () => openDialog('dlgAbout'));
    $('btnStats').addEventListener('click', () => { renderStats(); openDialog('dlgStats'); });
    $('btnSettings').addEventListener('click', () => { applySettings(); openDialog('dlgSettings'); });
    $('btnSound').addEventListener('click', () => {
      settings.sound = !settings.sound; St.saveSettings(settings); applySettings();
      if (settings.sound) { AW.Sound.unlock(); AW.Sound.play('submit'); }
      toast(settings.sound ? 'Sound on' : 'Sound off');
    });
    $('setSound').addEventListener('change', e => { settings.sound = e.target.checked; St.saveSettings(settings); applySettings(); });
    $('setMotion').addEventListener('change', e => { settings.reducedMotion = e.target.checked; St.saveSettings(settings); applySettings(); });
    $('setReveal').addEventListener('change', e => { settings.revealInShare = e.target.checked; St.saveSettings(settings); });

    setInterval(tickCountdown, 1000);
    tickCountdown();

    if (!settings.seenHelp) {
      settings.seenHelp = true; St.saveSettings(settings);
      openDialog('dlgHelp');
    } else if (window.matchMedia('(pointer: fine)').matches && daily.status === 'playing') {
      $('guessInput').focus();
    }

    // Exposed for automated checks only (tests read state; they never drive the scene from a clock).
    AW.app = { engine, get daily() { return daily; }, get practice() { return practice; }, get mode() { return mode; }, beach };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})(window.AW = window.AW || {});
