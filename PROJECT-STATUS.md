# Re:Lefela — Project Status

**Updated:** 2026-07-16 (session 4 — round-2 audio tagging FINISHED + deployed; sw v7, 88 clips)

## What this is
Two-player (Megan + the second learner) Duolingo-style Setswana PWA for NWU SECL121 + life after it.
Live: https://megzieberr.github.io/re-lefela/ · Supabase `re-lefela` (opacjlgljeippheotyhz, Uni Hub org).

## State: LIVE — round-2 per-item audio COMPLETE (sw `relefela-v7`, 88 item clips wired).
All tagger lessons done (5a-c, 6, 7, 10, 11, 12, 13, 18, 20, 22, 23) and deployed to GitHub Pages.

---

## ⏸️ WHERE WE STOPPED — pick up here
Round-2 audio is done & live. Open follow-ups:

1. **Reset Megan's Lesson-1 progress** (still not done) so she can replay it with the teach cards
   showing (skipped for words already in her SRS). Delete `srs_items` rows for `u1l1-*` for her user
   in Supabase `opacjlgljeippheotyhz`. That project is likely NOT on the Supabase MCP (only nwu-hub
   is) → hand her copy-paste SQL for her dashboard. She does NOT want a reset *feature* in the app.
2. **Optional new content — conjugation lessons.** L10 (`batla` = want, full 6×6 paradigm) and L11
   (`bala`/`na le` = to-be/to-have) audio is fully tagged but mostly has no cards yet. Building a
   "want" / "to be & have" lesson would light up ~30 + ~12 more clips. Decoded word tables are in
   memory [[relefela-conjugation-audio]]. Her call — it's a content decision.
3. **Katse redesign** still pinned (see below).

### ⚠️ Tagger gotcha (critical for any future export)
Her tagger's localStorage keeps **dropping the Lesson-2 redo** — every export she downloads has 0
lesson-2 tags. Deploying one raw DELETES 3 live clips (u1l1-13/15/19). **Always splice the L2 redo
back from the committed `toolkit/audio-mapping-round2.json` (git HEAD) before running the export.**
Per-lesson raw exports from this session are backed up in the session scratchpad.

### Cards intentionally left silent (no Peace Corps audio exists — need native recordings)
u1l7-07 "Ga ke batle tee" (tea), u1l7-08 "Ga ba bue Sekgoa" (English), u1l6-09 "Ke batla kofi"
(coffee — audio only says *o rata kofi?*), and L22 body-part vocab (tlhogo/mala/leoto/botlhoko,
only spoken inside sentences). Don't chase these with the tagger.

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

## Katse redesign (step 1 of session 3 brief) — PINNED, do not wire in
Tried a chibi v2 then a pointy-eared v3 (per her reference cat pics). **She's still not fond of it.**
Preview at `katse-preview.html` (gitignored). The app still uses the ORIGINAL inline Katse SVG in
`index.html` (`katseSVG()`). App-logo icons (step 2) depend on her approving a look — not started.

## Also discussed, not built
- **App "Back" button** — step back to the previous card inside a lesson (to re-check earlier words).
  Open: permanent-for-everyone vs dev-only (`?dev=1`). This is arguably the real fix for her
  "check the words" need; the Lesson-1 reset above is the quick workaround she asked for instead.

## Pending on Megan
1. Finish round-2 tagging (lessons 11/12/13/18/20/22/23 + redo 10), then re-download the mapping.
2. (Standing) keepalive Task-Scheduler registration still awaiting her OK.

## Decisions (append-only)
- 2026-07-16: Do NOT coarsen the slicer for sentence lessons — silence gaps are a continuum (no clean
  threshold). The Join button handles fragmentation instead; slicing left at 0.35s default.
- 2026-07-16: We did NOT re-slice lessons 2/3/4, so their round-2 redo seg-indices still match round 1
  → per-segment supersede in the export works correctly with no extra "drop-on-redo" change needed.
- 2026-07-16: Reset progress = clear that round's SRS (bring teach cards back); don't touch XP/streak.
- 2026-07-16: Katse redesign on hold; original SVG stays in the app until Megan approves a new look.

## Gotchas learned
- SW cache-first serves stale files through hard refresh; tagger now self-unregisters. To bust a
  stale served page manually: load it with a novel `?query`, or unregister SW + clear caches in console.
- A tagging redo does nothing to the live app until `export-item-audio.py` runs AND you deploy.
- Peace Corps audio can't be blind-sliced to phrases; PDF ê/ô normalised to plain e/o everywhere.
- `?local=1` = offline LocalBackend (skips SW + auth), so it can't test real Supabase progress.
