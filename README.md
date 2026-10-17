# AFTERWORD

A daily word-guessing game in which every guess warms or cools a pixel-art beach.

Find the hidden word in 8 guesses. Each guess is scored by **meaning** (FREEZING → COLD → COOL → WARM → HOT → BURNING → FOUND), and the beach re-lights itself to match: a frosty moonlit night for far guesses, through dusk and twilight, to a blazing sunset with a campfire when you're close, and a fireworks celebration when you find it.

## Run it locally

No build step, no dependencies, no server needed.

- **Easiest:** double-click `index.html`.
- **Or serve the folder** (any static server works), e.g. `npx serve .` or `python -m http.server`, then open the printed URL. Serving over `http://localhost` also enables the modern clipboard API for the Share button.

## Tests

Open these in a browser. Each one prints `RESULT: PASS/FAIL` at the bottom.

| Page | Covers |
|---|---|
| `tests/tests.html` | Semantic engine (synonyms, related vs unrelated, look-alike spellings, multiple meanings, unknown words, plurals), answer-pool fairness, daily selection and UTC rollover, scoring, game rules, streaks, persistence, share text, and the beach (fixed composition, every state, transitions, no clock use, reduced motion). 2,189 checks. |
| `tests/ui-smoke.html` | Drives the real page: input validation, duplicates, hints, tabs, settings, sound toggle, practice isolation, refresh persistence, win flow, share feedback, double-counting, console errors. 39 checks. |

To run them headless: `chrome --headless=new --allow-file-access-from-files --virtual-time-budget=8000 --dump-dom file:///…/tests/tests.html`

Dev-only helpers (not linked from the game): `dev/scenes.html` renders every beach state side by side; `dev/play.html#cold,warm,found` seeds a daily game and opens it; `dev/mobile.html` shows the game in 375px and 320px phone frames. Note that `dev/play.html` **clears this browser's saved AFTERWORD progress**.

## Deploy for free

The whole folder is a static site. Upload it as-is to any free static host, subject to their current free-tier limits:

- **GitHub Pages:** push the folder to a repo → Settings → Pages → deploy from the branch root.
- **Netlify / Cloudflare Pages:** drag-and-drop the folder, or connect the repo with no build command and `/` as the output directory.

You can leave out `tests/` and `dev/` when deploying.

## How it works

- `js/semantic.js`: the word engine. It's kept separate from the UI.
- `js/data/lexicon.js`: the semantic graph data (about 5,000 known words).
- `js/data/answers.js`: the curated answer pool (503 words, each with a clue and a difficulty).
- `js/daily.js`: daily schedule. **The word changes at 00:00 UTC for everyone.** The daily only uses medium and hard words (351 of them); easy words appear in Practice. Puzzle #1 is 2026-10-01 (UTC). Streaks use the same UTC day numbers.
- `js/game.js`: rules and state, with no DOM code. `js/scoring.js`: the score formula. `js/storage.js`: localStorage and streaks.
- `js/beach/beach.js` + `palettes.js`: the reactive beach (see below).
- `js/ui.js`: DOM wiring. `js/audio.js`: Web Audio synth. `js/share.js`: share and clipboard.

### The semantic engine

I looked at pretrained word vectors (GloVe, word2vec, fastText). Even trimmed, they are multi-megabyte downloads, and their licences and attribution vary. A hand-curated graph lets the feedback stay small, offline, and fully explainable. So AFTERWORD uses an **original, hand-written semantic graph**. No third-party dataset is bundled.

- Each word sits in a category tree (`animal.mammal.canine`) and has weighted links to related words (`dog | … | puppy:9 wolf:7 bark:7 …`). Synonyms are marked `=word`.
- Closeness takes the strongest of three signals: (1) a direct link, (2) the best two-step link through a shared neighbour (`w1 × w2 × 0.85`), and (3) how specific the deepest shared category is. A second agreeing signal adds a small bonus. **Spelling plays no part**, so DOG and FOG share nothing.
- Bands: BURNING ≥ 0.85, HOT ≥ 0.66, WARM ≥ 0.50, COOL ≥ 0.34, COLD ≥ 0.18, otherwise FREEZING. An exact match (or its plural) is FOUND.
- Unknown words get *"I don't know that word yet"*. They are never scored FREEZING, and they never use up a guess.
- Every answer is tested to have at least 6 warm-or-better and 15 cool-or-better neighbours, plus a complete hint set.

To improve it, edit `js/data/lexicon.js` (the format is documented at the top of the file) and re-run `tests/tests.html`.

### The beach

It's one 320×180 scene rendered pixel by pixel to a canvas and scaled with nearest-neighbour. Islands, hut, palms, rocks and the campfire ring are built **once** into static sprite lists. Each temperature is only a palette and a set of effect strengths: sky gradient, sun/moon, light sources, frost, mist, fireflies, motes, embers, wave sparkle and fireworks. These cross-fade over about 1.8 s, so the composition can never change. A test hashes the geometry in every state to confirm it. Time only drives animation (waves, flicker, particles). **It never chooses the state, and the renderer never reads the clock.**

### Scoring

`1000` for finding the word + `150` per unused guess + speed bonus `300 − ⌊seconds/2⌋` (min 0; the timer starts at your first guess) − `150` per hint. The best possible 8-guess score is **2,350**. A loss scores 0. Practice scores are kept separately and never touch daily stats.

## Known limitations

- **Vocabulary is finite (~5,000 words).** Common nouns, animals, food, nature, objects, places and some verbs and adjectives are covered. Rarer words will get "I don't know that word yet". Feedback is only as good as the hand-written links. It's tuned for everyday associations, not deep or technical meanings.
- **Eight guesses is tight for a semantic game.** The free category clue and the hints (which cost points, not guesses) are there to make it fair.
- **Client-side only.** The answers are bundled in the page, so anyone reading the source can find them. Nothing here prevents cheating. Progress lives in this browser's localStorage. It doesn't sync across devices, and clearing site data resets it.
- **Not built with React/TypeScript/Vite.** This machine had no Node.js, so the game is plain HTML/CSS/JS with no build step. That also makes it trivial to host.
- Fonts (Silkscreen, Pixelify Sans) load from Google Fonts under the SIL Open Font License. Offline, the game falls back to system monospace fonts and still works.

## Credits & licences

All code, pixel art (procedurally drawn), sound (synthesised in-browser) and the semantic lexicon are original to this project. Fonts: *Silkscreen* by Jason Kottke and *Pixelify Sans* by Stefie Justprince, both SIL OFL 1.1, served by Google Fonts.
