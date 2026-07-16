# Re:Lefela — Project Status

**Updated:** 2026-07-16 (session 1 — built from zero, appropriately)

## What this is
Two-player (Megan + the second learner) Duolingo-style Setswana PWA for NWU SECL121 + life after it.
Live: https://megzieberr.github.io/re-lefela/ · Supabase project `re-lefela` (opacjlgljeippheotyhz, Uni Hub org)

## State: v1 LIVE
- Engine: teach/tap-words/type/choose/match/listen/record-compare/concord-picker + dialogue cards,
  SM-2 SRS (one word bank, review sessions), XP + streaks + weekly scoreboard (resets Monday),
  English UI with Setswana flavour text, offline-first sync queue (toast on failure), installable PWA.
- Content: Unit 1 *Go dumedisa!* = 7 lessons, ~65 items, all sourced (`src` on every item).
  Native Peace Corps audio as lesson-level dialogue cards (L1,2,3,4,8,10).
- Toolkit: `toolkit/GRAMMAR.md`, `toolkit/sentence-bank.tsv` (~230 sourced rows), `toolkit/SOURCES.md`.
  Corpus (gitignored): Peace Corps PDF+25 MP3s, Setswana NT (CC BY-SA) + English WEB parallel.
- Schema: profiles / xp_events / srs_items / streaks / unit_progress, RLS (read-both write-own),
  `join_relefela` RPC gates signup by shared code. `schema.sql` in repo is REDACTED (join code);
  real code known to Megan, set in the deployed RPC.
- SECL121 tutor CLAUDE.md updated (app + toolkit are the tutor's authority); keepalive.ps1 includes re-lefela.

## Pending on Megan
1. Supabase dashboard → re-lefela project → Auth → Sign In / Up → **turn OFF "Confirm email"** (signup blocks politely until then).
2. Sign up in the app (username + password + join code), then give the second learner the URL + code.
3. NCHLT speech corpus download (in progress) → `Desktop\NWU Semester 2\SECL121\Corpus\`.
4. (Standing) keepalive Task-Scheduler registration still awaiting her OK.

## Next sessions (in rough order)
- **Unit 2 Mmele** (body, questions, copulatives, adjectives) — same recipe as Unit 1; sentence bank already
  holds L12 question material.
- **Conversational track** — Peace Corps L13-L23 as post-module lessons (needs the extraction+verify fan-out).
- **Per-phrase audio clips** — silence-split candidates exist (`corpus/audio-urls.txt` + ffmpeg silencedetect
  at -30dB/0.35s); mapping segments→phrases needs a human ear (Megan). Then listen/record exercises go per-item.
- **NCHLT listening exercises (big unlock, downloaded 2026-07-16)** — 58k pre-segmented native clips WITH exact
  transcriptions at `Desktop\NWU Semester 2\SECL121\Corpus\nchlt_tsn\` (trn.xml `<orth>` per clip). Unlike the
  Peace Corps audio these need NO ear-mapping: filter `<orth>` for clips whose words she already knows, convert
  those WAVs → small MP3s, and real-native listen-and-choose exercises drop straight in. Do this in the Unit 2 session.
- **Smart Guide day** — when it lands on eFundi: re-align Unit content to lecturer forms (Smart Guide WINS).
- Optional: hub tile/link for the app (modules table has no links column — would need hub change).

## Gotchas learned
- SW cache-first fights local dev — `?local=1` skips SW registration AND auth (LocalBackend pattern).
- Peace Corps audio can't be blind-sliced to phrases (announcer mixes EN/TSW + repeats) — never auto-map.
- PDF text extraction mangles ê/ô → we normalise to plain e/o (standard SA orthography) everywhere.
