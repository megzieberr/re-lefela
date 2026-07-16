# Re:Lefela — Project Status

**Updated:** 2026-07-16 (session 3 — per-item audio round 2: tagger overhaul + Katse redesign attempt)

## What this is
Two-player (Megan + the second learner) Duolingo-style Setswana PWA for NWU SECL121 + life after it.
Live: https://megzieberr.github.io/re-lefela/ · Supabase `re-lefela` (opacjlgljeippheotyhz, Uni Hub org).

## State: v2 LIVE (Units 1 + 2 + Listening gym). Session 3 work is NOT deployed yet.
The live site is unchanged from session 2. Everything below (Katse redesign, round-2 audio) is
work-in-progress on disk / in the tagger, not on the site.

---

## ⏸️ WHERE WE STOPPED — pick up here
Megan wants to **check whether Lesson 1's audio now works** (in the app, u1l1 greetings, a few words
had Katse asleep = no clip). She redid tagger lessons 2–4, which *should* fix it — but that redo is
only in her tagger download, **not deployed**. To let her verify, the next session must:

1. **Run the export** (her round-2 mapping is already copied to `toolkit/audio-mapping-round2.json`):
   `python toolkit/export-item-audio.py` — regenerates `audio/items/*.mp3` + rewires `content.js`.
   - Before/after check: which `u1l1`/`u1l2`/`u1l3` items are voiced vs sleeping. A ready scratch
     script pattern: regex `\{ id: '(u1l[1-4]-\d+)',( audio:)?` over content.js. **Verify coverage
     goes UP, not down** (her redo could in theory un-wire a clip if she junked a segment round 1 had
     tagged) before deploying — this affects the second learner's app too.
2. **Deploy**: bump `sw.js` cache (currently `relefela-v4` → v5), commit, push (GitHub Pages).
3. **Reset her Lesson-1 progress** so she can replay it with the teach cards showing (they're skipped
   for words already in her SRS). Delete `srs_items` rows for the `u1l1-*` items for her user, in
   Supabase `opacjlgljeippheotyhz`. **Check if that project is on the Supabase MCP** — likely NOT
   (only nwu-hub is), so hand her copy-paste SQL for her Supabase dashboard SQL editor.
   - Done lessons are already clickable/replayable; the ONLY reason a reset is needed is to bring the
     teach cards (word + meaning + Katse) back for already-learned words.

She explicitly does **not** want a reset *feature* built in the app — "just reset lesson 1 for me."
Reset her data directly; don't build UI for it.

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
