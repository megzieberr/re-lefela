# Re:Lefela — Project Status

**Updated:** 2026-07-17 (session 11 — stale-cache root-cause fix: network-first SW + in-app update flow, sw v14, SHIPPED 1ba76a1) · previous: session 10 agent batch (icon/layout/audio/replays, sw v13)

## Session 11 (2026-07-17, evening) — cache audit + SW overhaul (sw v14, SHIPPED & live-verified, commit 1ba76a1)
Megan reported the chronic "app only updates after uninstall/reinstall" problem. Supervised
3-agent fix (2×Sonnet build + Opus adversarial review + 1 Sonnet remediation), audit first.
- **Root cause:** sw.js was cache-first for the ENTIRE origin including index.html — the exact
  opposite of MHQ (network-first, whose sw.js comment records the same lesson) and Circle Quest
  (no caching). Compounded by (a) Android resuming PWAs instead of cold-starting → the browser's
  on-navigation SW update check never fired, and (b) plain `cache.addAll` reading GitHub Pages'
  max-age=600 HTTP cache → a NEW install could precache a 10-min-stale index.html (why the
  double-reopen ritual failed "randomly").
- **sw.js v14:** network-first for navigations/app code (cache = offline fallback only, non-ok
  responses also fall back to cache); images cache-first + quiet background refresh; audio in its
  own persistent `relefela-audio-v1` cache that app version bumps NEVER evict (deploys no longer
  re-download all ~89 clips) — bump the audio suffix ONLY if a clip's content changes under the
  same filename; precache via `{cache:'reload'}`; index.html offline fallback = navigations only;
  206 responses never cached.
- **index.html update flow** (in `boot()`, LOCAL_MODE still skips): `registration.update()` at
  boot + on visibilitychange (60 s throttle — catches Android resume); `controllerchange` → ONE
  guarded `location.reload()`, deferred while `#exArea` exists (never yanks a live exercise;
  retried on 5 s tick / next visibilitychange), first-install claim ignored via `swHadController`.
- **Opus review verdict:** safe, no blockers; verified no contract regressions (Enter-verdict
  debounce, mountKatseCorner, rl_queue/rl_srs sync — all writes persist synchronously, so a
  home-screen auto-reload can't lose data). Its 2 SHOULD-FIXes (audio-cache versioning, non-ok
  fallback) applied by a follow-up agent. Known accepted nits: rare auth-form wipe on mid-signup
  reload; pre-existing double-XP window on reload-during-flush (leaderboard-only, cosmetic).
- Live-verified after push: sw.js serves v14 + relefela-audio-v1, index.html has the update flow.

## Session 10 (2026-07-17, later same day) — 3-agent batch (2×Sonnet + 1×Opus), sw v13
Megan's 6 feedback items after using v12, built by parallel agents under orchestrator review:
- **App icon → "Variant B"** (her pick from 3 rendered candidates): black bg, deep-pink glowing
  ring restyled as a cat head with Katse-style ears (pink inners), "R:" white + "0" pink. Both
  icons/icon-*.png overwritten (favicon + apple-touch-icon reuse the same files). Generator script
  in session scratchpad (`wire_final_b.py`).
- **Layout pass:** corner Katse on drills 120→155px (115px short-viewport); teach/recap cards are
  now full-height flex (`.exwrap-fill`): Continue/Skip pinned 24px from viewport bottom, Katse
  200px centered mid-space via `mountKatseMid()` (same DOM id as the corner mount so all
  katse helpers keep working); mini part-map Katse repositioned onto the circle (awake pose,
  22px) — no more overlap with the lesson blurb. `rule` cards deliberately left old-style.
- **u1l1-17 "Re tsogile sentle" audio exported & wired** (88→89 clips, nothing deleted).
  ⚠️ CRITICAL: her tagger download `round2 (11).json` is a partial regression — running the export
  on it raw would DELETE 15 live clips (incl. u1l1-13/15). Canonical mapping = the repo's
  `toolkit/audio-mapping-round2.json` (committed HEAD + only the u1l1-17 tag keyed `sub:0` so it
  coexists with u1l1-15 on shared L2 seg25). Never use a raw tagger download without diffing its
  export winners against the committed mapping first. (Also in auto-memory.)
- **Part-split replays (her "option 1"):** the 12-card practice-mix branch is REMOVED. Replaying a
  fully-learned lesson now runs the identical baby-steps part machinery (recap block, teach×4
  batches, drills, part pill/map, checkpoint hop) with a device-local `rl_replay` cursor
  (localStorage only, NO schema/sync change) that advances per completed part and wraps forever —
  she wants to replay L1's 4-word batches "at least 5 times". Replay teach cards do NOT srsGrade
  (won't inflate the reps≥3 typing gate); lessonIdx/unlocks never change on replay; a fully-learned
  but *unfinished* lesson still counts as learning (deadlock guard). Done multi-part home nodes
  show the mini map at the replay cursor. Replays still earn XP (flag if that ever bothers her).
- **Keepalive Task-Scheduler registration:** turned out to be ALREADY registered & healthy (Mon+Thu
  09:00, last run 2026-07-16 OK) — pending item closed, nothing was done.
- sw v12→**v13**. Verified by orchestrator in preview: fully-learned L1 opens as P1/3 · 1/39 with
  recap first, lessonIdx untouched, teach/recap bottom-pinned layout, drill corner cat 155px
  (the "overlap" is Katse's own tappable audio button), mini-map no text overlap, 0 console errors.

## Session 9 (2026-07-17) — Katse the star + light reskin + baby-steps engine (sw v11, SHIPPED 830c847)
Megan asked: (1) make Katse a real feature ("scary Duolingo bird" energy, she should *say* the words),
maybe reskin the whole app black/white/soft-pink like her; (2) Round 1 is hectic — more scaffolding,
baby steps, repetition. Both approved with light theme + auto-split parts.
- **4 new pose PNGs** (same trim-to-bbox + 340px recipe): `katse-happy` (4.png belly-up, celebrations),
  `katse-curious` (6.png lean-around, teach cards — tall 340×533, corner width capped 84px),
  `katse-oops` (9.png paws-peek, wrong answers + auth screen), `katse-sleep` (8.png curled, home
  when today's streak is safe). Script in session scratchpad (`make_poses.py`).
- **Katse "says" everything:** `playAudio()` now adds a `.talking` sway to the on-screen Katse for the
  clip's duration; `katseSay(text, audio)` bubbles the Setswana while it plays. Teach/choose/record
  cards bubble the phrase; listen cards bubble "🎵 …" so the answer isn't spoiled. Reactions in
  `grade()`: bounce on correct, **happy pose + "✨ N in a row!"** every 3-combo, **oops pose + tilt**
  on a miss. Home = hero Katse (150px) who greets you with a vetted u1l1 phrase bubble on load
  (text-only — browsers block un-gestured audio; tap her to hear one).
- **Reskin:** light paper theme (#fdf7f9 bg, near-black ink, soft pink #f6a8c7 / deep #d76a9b),
  comic-style 2px black outlines on cards/buttons/audio-btn, pink progress + pills, black streak pill.
  Kept **green/red for answer feedback** (semantics matter), now as light tints. manifest + meta
  theme-colour updated. `--gold`→`--pink`, `--teal` gone. App icons still the OLD look — follow-up.
- **Baby-steps engine** (`buildExercises()` rewrite): words arrive in **batches of 4** (teach×4 →
  recognition drill each (listen/choose) → build drill each (tap) → per-batch match), 2 warm-up drills
  of earlier words per batch, closing quiz = one `auto` card per word whose difficulty resolves at
  render time from live SRS reps: **typing/concord/record gated behind reps ≥ 3**. Misses **re-queue**
  3–5 cards later as a recognition drill (one retry max, `retry:true`). Lessons with >8 real items
  **auto-split into balanced parts** (L1: 20 → 7/7/6) — path node shows "Part k of n", header shows a
  Pk/n pill, mid-lesson finish screen offers "Keep going — Part k+1 ▶" / "That's enough for now";
  `lessonIdx` only advances on the final part (schema/sync untouched — parts derive from SRS state).
  Replaying a fully-learned lesson = light 12-card practice mix, not the full build. Review sessions
  = all-auto (ladder applies). Session-8 verdict debounce + `mountKatseCorner` contract preserved
  (corner mount now takes an optional pose; teach cards get `curious`).
- **sw.js v10→v11**, 4 new PNGs added to CORE precache.
- **Verified in preview** (?local=1, DOM/JS — pane can't screenshot): theme vars live, hero + bubble,
  L1 splits 7/7/6, session shape teach×4→listen×4→tap×4→match→…→auto×7 (31 cards), retry insert,
  oops/happy poses + combo bubble, typing gate (fresh word only ever `tap`; after 3 reps typeTsw/record
  appear), Part-1-done checkpoint (lessonIdx stays 0), home badge "Part 2 of 3", sleep hero, recap/Back
  works, all 6 pose images 200, 0 console errors. Test localStorage cleared afterwards.

## Session 8 (2026-07-16) — typed-verdict fix + always-on Katse (sw v10, SHIPPED — commit d32db44, live-verified)
Megan reported: (a) type-a-sentence cards never show a verdict — "it just goes on"; (b) Katse
vanishes after a few rounds and is too small.
- **Root cause (a):** the *check* logic was fine (Check button worked). The Enter used to answer
  bled through to the freshly-focused Continue button `grade()` renders → the verdict flashed and
  was instantly skipped. Unique to the type cards (only they have an input + Enter + auto-focused
  Continue). **Fix:** `e.preventDefault()` + one-shot `checked` guard on the Enter handler, `inp.blur()`
  so the mobile keyboard closes and the verdict shows, and a **400 ms debounce on the Continue button**
  in `grade()` so the same keystroke can't advance. Verified: Enter shows verdict, an immediate
  Continue click is blocked (stays on card), a click after 400 ms advances. Wrong answers still verdict.
- **Root cause (b):** `katseHTML` was only rendered on home + *teach* cards; every drill had no cat.
  **Fix:** new `mountKatseCorner(it)` appends a persistent **bottom-right corner** Katse to `#app` at
  the end of `runExercise()` and `runRecap()` — awake & tappable (plays the clip) when the card has
  audio, resting otherwise. Removed the inline teach-card katse (teach now shows a 🔊 button + the
  corner cat like every card). Sizes bumped: lessons `76→120px` (`92px` under `max-height:640`), home
  `64→96px`. `#app` given `position:relative`. Corner sits at screen bottom (y≈720+), action buttons
  live up at y≈180–400 → verified NO overlap on 812px, 720px and 600px-tall viewports; corner absent
  on home/stats; 0 console errors. (Pane can't screenshot — all verified via DOM/JS.)
- **sw.js v9→v10. SHIPPED** 2026-07-16 (commit d32db44, pushed to Pages; live-verified: sw serves
  `relefela-v10`, index.html contains `mountKatseCorner` + Continue debounce + `width:120px`).
  Megan tried it, "fine for now". Post-deploy on her: close/reopen the PWA twice to drop the old cache.
- **⚠️ HEADS-UP for next session:** Megan is about to make "a few other changes that will impact
  these" — expect edits around the exercise runner (`runExercise`/`grade`/`mountKatseCorner`) and/or
  the type cards. Re-read this section before touching that code so the verdict-debounce and the
  corner-mascot mount aren't accidentally reverted.

## Session 9b (2026-07-17, same day) — part map + recap-every-time (sw v12, SHIPPED)
Megan's live feedback on 9a: couldn't SEE part progress inside Lesson 1, and sessions jumped straight
into drills — she wants revision "over and over".
- **Part map** (`partMapHTML(total, cur, mini)`): dotted-path circles, done = pink ✓, current carries a
  mini sitting Katse. Mini variant on multi-part lesson nodes (replaces the "Part k of n" pill); big
  variant on the mid-lesson checkpoint where the finished circle flips to ✓ and **Katse hops** to the
  next circle (inline translateX transition + khop keyframe — pane can't show the tween, verified end
  position; real browsers animate).
- **Recap block:** every lesson sitting (parts AND practice replays; NOT the review button) opens with
  up to 8 shuffled 'recap' cards of this lesson's already-known words — teach-style card, Katse says
  the word, "🔁 Quick recap" header, **no srsGrade** (viewing must not feed the reps≥3 typing gate),
  plus a "Skip recap ▸" ghost button that jumps past the remaining recap cards (maxAt follows, so
  Back into skipped cards = read-only view, harmless). Fresh part 1 = no recap (nothing known yet).
  `buildExercises(items, isReview, tracks, recapPool)` — recapPool passed by startLesson only.
- sw v11→**v12**. Verified in preview: fresh/continue/replay flows, skip jump, home mini-map slot,
  checkpoint hop end-state, review unchanged, 0 console errors.
- ⚠️ Preview gotcha rediscovered: preview_start opens the bare URL (no ?local=1) which registers the
  REAL service worker in the pane → later edits get served stale. Unregister SW + clear caches in the
  pane console before verifying (same trick as the tagger).

## What this is
Two-player (Megan + the second learner) Duolingo-style Setswana PWA for NWU SECL121 + life after it.
Live: https://megzieberr.github.io/re-lefela/ · Supabase `re-lefela` (opacjlgljeippheotyhz, Uni Hub org).

## State: LIVE — Katse image redesign shipped (sw `relefela-v8`); round-2 per-item audio COMPLETE, 88 clips wired.
All tagger lessons done (5a-c, 6, 7, 10, 11, 12, 13, 18, 20, 22, 23) and deployed to GitHub Pages.

---

## ⏸️ WHERE WE STOPPED — pick up here
Round-2 audio is done & live. Open follow-ups:

1. **Reset Megan's Lesson-1 progress — DONE 2026-07-16 (session 5).** Deleted her 20 `srs_items`
   rows (`u1l1-*`, which was her *entire* progress) on Supabase `opacjlgljeippheotyhz` via the MCP.
   Left the second learner (0 rows) + XP/streak untouched. ⚠️ CORRECTION: re-lefela IS on the Supabase MCP
   (project `opacjlgljeippheotyhz`, org `zlbbzmzdpfwcyyeloedj` — same org as nwu-hub), so no
   copy-paste SQL was needed. ⚠️ Server delete alone is NOT enough — see the pullRemote merge gotcha
   below: her device's `rl_srs` localStorage still held the 20 items and would have re-pushed them,
   so she cleared it on-device with a console snippet (`localStorage.removeItem('rl_srs')` + strip
   `srs` ops from `rl_queue`, then reload). She does NOT want a reset *feature* in the app.
2. **Optional new content — conjugation lessons.** L10 (`batla` = want, full 6×6 paradigm) and L11
   (`bala`/`na le` = to-be/to-have) audio is fully tagged but mostly has no cards yet. Building a
   "want" / "to be & have" lesson would light up ~30 + ~12 more clips. Decoded word tables are in
   memory [[relefela-conjugation-audio]]. Her call — it's a content decision.
3. **Katse redesign — DONE & wired 2026-07-16, pending /ship** (see below).

### ⚠️ Tagger gotcha (critical for any future export)
Her tagger's localStorage keeps **dropping the Lesson-2 redo** — every export she downloads has 0
lesson-2 tags. Deploying one raw DELETES 3 live clips (u1l1-13/15/19). **Always splice the L2 redo
back from the committed `toolkit/audio-mapping-round2.json` (git HEAD) before running the export.**
Per-lesson raw exports from this session are backed up in the session scratchpad.

### Cards intentionally left silent (no Peace Corps audio exists — need native recordings)
u1l7-07 "Ga ke batle tee" (tea), u1l7-08 "Ga ba bue Sekgoa" (English), u1l6-09 "Ke batla kofi"
(coffee — audio only says *o rata kofi?*), and L22 body-part vocab (tlhogo/mala/leoto/botlhoko,
only spoken inside sentences). Don't chase these with the tagger.

### 🎙️ Session-6 audio thread (2026-07-16) — remaining gaps → lecturer recordings
- **NCHLT per-word audio TRIED & ABANDONED — do NOT retry.** Grabbed NCHLT sentence-clips that
  *contain* each missing vocab word and wired them into the tagger as a synthetic "★ NCHLT words"
  lesson (concat `nchlt-words.mp3` + `segments-words.js` + `build-word-lesson.py`). Words lifted from
  running speech are coarticulated/unusable — Megan rejected them. All of it reverted & deleted;
  tagger.html is back to stock. NCHLT stays ONLY for the Listening gym (whole sentences).
- **Path forward = native recordings from the lecturer.** `NATIVE-RECORDINGS-NEEDED.md` (repo root,
  51 items) = the Bible/grammar-book vocab (Unit 2 body/colour/adjective) + the 2 Unit-1 orphans.
- **`Ke teng` (u1l1-07) & `Re a leboga` (u1l1-08) are genuine orphans** — only the plural `Re teng`
  and the I-form `Ke a leboga` are ever spoken. Both on the lecturer list.
- **`Re tsogile sentle` (u1l1-17) IS now tagged** — split from u1l1-15 (L2 seg25), trimmed to [43.6–45.6s].
- **Still tagger-able (NOT on the lecturer list):** `kofi` (split off "Ga ke rate kofi", u1l7-03),
  and `tlhogo`/`mala`/`leoto`/`botlhoko` (L22), `leina` (L3), `lelapa` (L15).
- **The export "files-map" is COSMETIC, not the L2-drop bug.** `export-item-audio.py` reads each tag's
  own `file`, never the top-level `files` map (which omits DONE_LESSONS 1/2/3/4/8 by design). Export
  `relefela-audio-mapping-round2 (11).json` DID contain L2 (42 tags) + L3 (36). So L2/L3 export fine —
  just copy the latest download into `toolkit/audio-mapping-round2.json` before running.

## Session 3 — what got built (mostly in the local-only tagger)

**`tagger.html` is gitignored / local-only — none of this is in git.** Edit the file directly.
- **Join / Un-join clips** (⤵) — merges fragments the slicer chopped mid-sentence ("Ba" | "a bala").
  This was the fix for lessons 10 & 11 being un-taggable. Inverse of the existing Split button.
- **Redo-a-lesson picker** (bottom dropdown) — re-open ANY lesson (1–23) for a fresh redo; wipes that
  lesson's round-2 tags and re-queues it. Lesson 1 is now sliced (was pronunciation-only, skipped).
- **Course glossary panel** (📖) — the Peace Corps course book's word list for the current lesson,
  correctly spelled (the announcer is *reading that book*); click a word to fill it in.
- **Setswana speller** — type the English or the rough sound; suggestions come from the whole course
  + a 10k-word corpus list (Bible+course+sentence-bank). Google Translate's Tswana is unreliable — this replaces it.
- **Free-text "found words"** — type what you hear + English when it's not an existing card; footer
  counter. These become new cards LATER (not auto-added).
- **Spelling auto-fix migration** — 9 known typos corrected in her localStorage on load (idempotent).
- **Removed the "Start lesson over" button** from the tagger (she kept hitting it by accident). Redo
  a lesson via the dropdown instead.
- **Service-worker self-kill on load** — the app's SW is cache-first for the whole origin and was
  serving a stale tagger even through Ctrl+Shift+R. Tagger now unregisters it on every load.

**Committed + pushed toolkit** (`.js` outputs gitignored): `slice-lessons.py` (+L1, +round-2 lessons),
`export-item-audio.py` (merge all `audio-mapping-*.json`, per-segment supersede, un-wire lost clips),
`course-glossary.py`, `wordlist.py`, `spellcheck-found-words.py`.

**Her tagging progress (round 2):** done 5, 6, 7, partial 10, and redid 2/3/4. **Still to tag:** 11,
12, 13, 18, 20, 22, 23 + a clean redo of 10 (was a "gemors"). Spell-check: 217/226 correct; the 9
fixed. Latest download: `C:\Users\megzi\Downloads\relefela-audio-mapping-round2 (1).json` (already
copied into `toolkit/`).

## Katse redesign — DONE & WIRED (2026-07-16), pending /ship
She rejected the hand-drawn SVG attempts and supplied her own PNG art (7 poses in `Katse/`, transparent
RGBA 1080×1350). Approved mapping, now live in `index.html`:
- **home** mascot = `img/katse-home.png` (7.png, sitting cat) — top-right home corner, tappable
- **awake** = `img/katse-awake.png` (5.png, peeking over the wall) — teach cards WITH audio
- **rest** = `img/katse-rest.png` (3.png, draped/winking) — teach cards with NO audio; **no Zzz**
`katseSVG()` replaced by `katseImg(variant)` + variant-picking `katseHTML()`. Images trimmed to content
bbox + shrunk to 340px (script logic in session scratchpad; source in `Katse/`). CSS: `.kv-{variant}`
carry `aspect-ratio` so height is reserved before load (no layout jump). `sw.js` bumped v7→**v8** and the
3 images added to CORE precache. Verified live via local http server + `?local=1` (DOM/JS — pane can't
screenshot): home 64×81, awake 76×47 tappable+bounce, all 3 images 200, no console errors.
Old inline-SVG `katse-preview.html` replaced with an image preview (still gitignored). App-logo icons
(step 2) can now proceed on the approved look — not started.

## In-lesson Back button — BUILT & SHIPPED (2026-07-16, session 7), sw v9
Step back to a previous card mid-lesson to re-check a word. **Permanent for everyone** (chosen over
`?dev=1`): the design makes the "the second learner skips drills" worry impossible — Back can only reach cards you've
*already* answered, and you must still answer the live drill to advance, so it grants zero drill-skip
and zero XP-farming.
- **Mechanism:** `session.maxAt` high-water mark. One guard at the top of `runExercise()`:
  `if(at>maxAt) maxAt=at` (only genuine forward-answering pushes it); `if(at<maxAt) return runRecap()`.
  Because only answering the live card raises `maxAt`, and recap-Continue never exceeds it, revisiting
  is always read-only — no need to touch the ~8 scattered `at++`/scoring sites.
- **`runRecap()`** = read-only render, NO srsGrade/addXP/right/wrong. Per type: rule→rule text,
  dialogue→track labels + play (no mic), match→the 4 pairs, teach/drills→tsw/eng/plural/note/🔊/source.
  "↩ Looking back — this won't change your score" + Continue ▶. Forward out of recaps resumes the live card.
- **◀ button** in the topbar (`exHeader`), shown only when `at>0 && !gym`; wired in `hookQuit()`.
  Applies to lessons AND review; the listening **gym** (`runGym`) is untouched.
- **Verified** via preview JS/DOM (pane can't screenshot): all 4 recap branches render, score/xp
  unchanged across back→forward cycles (even caught a real wrong-grade staying 1 not 2), button
  hides at card 0, resume lands on the correct live card, 0 console errors.

## Pending on Megan
0. 2026-07-17 (session 11): ONE LAST ritual on both phones — the old v13 worker still updates the
   slow way, so force a real cold start: swipe the PWA away, then in Android Settings force-stop
   it (or just wait and open it twice with real closes in between). Once v14 is in, this whole
   problem is gone: every future deploy lands on the next open, no ritual. Also expect a one-time
   re-download of played audio clips (they migrate to the new persistent cache lazily).
   (The home-screen icon itself may still need reinstall/re-pin on Android — platform limitation.)
1. Get native recordings from the lecturer for the 51 items in `NATIVE-RECORDINGS-NEEDED.md`,
   then tag (new voice) & export. Optionally tag kofi/tlhogo/mala/leoto/botlhoko in the tagger.
2. Optional content: conjugation lessons L10 (batla) / L11 (bala/na le) — ~42 tagged clips waiting.

### Cleared 2026-07-17 (session 10)
- ~~Keepalive Task-Scheduler registration~~ — was already registered & running (Mon+Thu 09:00).
- ~~Copy round2 (11).json → toolkit + export~~ — SUPERSEDED: (11) is a destructive partial
  regression, never deploy it raw (see Session 10 above); the u1l1-17 clip was spliced in safely.
- ~~v10/v11 PWA double-reload items~~ — replaced by item 0 above.
1. ~~Finish round-2 tagging~~ DONE (session 4 — all lessons tagged, sw v7, 88 clips).
2. (Standing) keepalive Task-Scheduler registration still awaiting her OK.
3. 2026-07-16: Megan asked for session-starter prompts for the three open build tasks — (a) keepalive
   registration, (b) conjugation lessons L10/L11, ~~(c) in-lesson Back button~~ **DONE session 7** —
   each to run as its own session. Missing-audio list written to `toolkit/missing-audio.md` (64 items).
4. ~~/ship the Katse redesign~~ **SHIPPED 2026-07-16** (commit `bf7375a`, pushed to Pages; verified live
   — sw `relefela-v8`, all 3 `img/katse-*.png` return 200, index.html references the new art).
   **Post-deploy (Megan):** close & reopen the PWA **twice** (service-worker double-load) to drop the
   old cached cat. Left uncommitted on purpose: `Katse/` source art + proof PNGs, and dev file
   `.claude/.claude/launch.json` (python http.server for Preview) — keep or gitignore, her call.
5. 2026-07-16 (session 6 audio): Copy `relefela-audio-mapping-round2 (11).json` →
   `toolkit/audio-mapping-round2.json`, run `export-item-audio.py`, deploy — brings the L2/L3 redo +
   `Re tsogile sentle` live. Optionally tag `kofi`/`tlhogo`/`mala`/`leoto`/`botlhoko` in the tagger first.
6. 2026-07-16 (session 6 audio): Get native recordings from the lecturer for the 51 items in
   `NATIVE-RECORDINGS-NEEDED.md`, then tag them (new voice) & export.

## Decisions (append-only)
- 2026-07-17 (session 11): SW strategy = network-first for app code, persistent versioned audio
  cache (`relefela-audio-vN` — bump N ONLY when a clip changes under its same filename; app CACHE
  bumps never evict audio). In-app auto-reload on SW update, but NEVER while `#exArea` is on
  screen. Any future sw.js edit must preserve these; don't revert to cache-first "offline-first".
- 2026-07-17 (session 10): App icon = "Variant B" (black bg, deep-pink glowing ring-as-cat-head,
  white "R:" + pink "0"). Replays of learned lessons = FULL baby-steps part experience, wrapping
  forever (her option 1); the 12-card practice mix is gone. Design north star while she & the second learner
  learn: smallest possible steps, endless repetition — she wants L1's 4-word batches ≥5 times.
  Replay teach cards never srsGrade. rl_replay cursor is deliberately device-local (no sync).
- 2026-07-17 (session 10): Tagger downloads are NOT append-only — always diff export winners vs
  the committed mapping before use; round2 (11).json specifically is banned from raw deployment.
- 2026-07-17 (session 9): Katse is the app's face — light black/white/soft-pink theme (her art needs a
  light base; black would swallow her), answer feedback stays green/red tints, big lessons auto-split
  into parts of ≤8 new words derived from SRS state (NO schema change), typing gated behind reps≥3,
  misses re-queue once. Duolingo-bird presence = speech bubble + talking sway, not lip-sync.
- 2026-07-16: Do NOT coarsen the slicer for sentence lessons — silence gaps are a continuum (no clean
  threshold). The Join button handles fragmentation instead; slicing left at 0.35s default.
- 2026-07-16: We did NOT re-slice lessons 2/3/4, so their round-2 redo seg-indices still match round 1
  → per-segment supersede in the export works correctly with no extra "drop-on-redo" change needed.
- 2026-07-16: Reset progress = clear that round's SRS (bring teach cards back); don't touch XP/streak.
- 2026-07-16: Katse redesign on hold; original SVG stays in the app until Megan approves a new look.
- 2026-07-16 (session 5): Katse approved — use HER OWN PNG art (not hand-drawn SVG), as-is (no
  recolour/redraw). 3 states: home=sitting(7), awake=peek(5), rest=draped(3), no Zzz. Wired into
  index.html as `<img>`, sw v8. She dislikes AI-drawn cats — always offer to use supplied art first.
- 2026-07-16 (session 5): Reset done server-side + on-device; re-lefela confirmed ON the Supabase MCP
  (org zlbbzmzdpfwcyyeloedj). pullRemote() merge-never-deletes means a server-only reset silently
  re-syncs from the client — always clear rl_srs on the device too.
- 2026-07-16 (session 6 audio): NCHLT-per-word audio ABANDONED — words cut from NCHLT running speech
  are coarticulated/unusable. Native recordings (lecturer) is the path; do NOT re-grab NCHLT for
  isolated vocab. NCHLT stays only for the Listening gym (whole sentences).

## Gotchas learned
- SW cache-first serves stale files through hard refresh; tagger now self-unregisters. To bust a
  stale served page manually: load it with a novel `?query`, or unregister SW + clear caches in console.
- A tagging redo does nothing to the live app until `export-item-audio.py` runs AND you deploy.
- Peace Corps audio can't be blind-sliced to phrases; PDF ê/ô normalised to plain e/o everywhere.
- `?local=1` = offline LocalBackend (skips SW + auth), so it can't test real Supabase progress.
- pullRemote() MERGES remote SRS/progress into local and never DELETES local items missing from the
  server (remote only wins when its updated_at is newer). So a server-side progress wipe does nothing
  on a device that already has the rows cached in `rl_srs` — and the client re-pushes them via the
  outbox (`rl_queue`). To truly reset progress: clear the server rows AND clear `rl_srs` (+ strip
  `srs` ops from `rl_queue`) on each device, then reload.
