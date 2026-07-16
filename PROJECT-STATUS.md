# Re:Lefela — Project Status

**Updated:** 2026-07-16 (session 6 — Katse mascot redesign SHIPPED using Megan's own PNG art; sw v8) · (session 6 audio thread — NCHLT per-word audio tried & ABANDONED; lecturer record-list created; L2/L3 redo confirmed landed) · (session 7 — in-lesson Back button BUILT & SHIPPED, permanent for everyone, sw v9) · (session 8 — typed-sentence verdict bug FIXED + Katse now a permanent bigger corner mascot, sw v10, **pending /ship**)

## Session 8 (2026-07-16) — typed-verdict fix + always-on Katse (sw v10, LOCAL, pending /ship)
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
- **sw.js v9→v10.** Local-only; run `/ship` to deploy. Post-deploy: close/reopen the PWA twice to
  drop the old cache.

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
