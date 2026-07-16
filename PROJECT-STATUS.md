# Re:Lefela — Project Status

**Updated:** 2026-07-16 (session 2 — Unit 2 Mmele + NCHLT Listening gym; session 1 built v1)

## What this is
Two-player (Megan + the second learner) Duolingo-style Setswana PWA for NWU SECL121 + life after it.
Live: https://megzieberr.github.io/re-lefela/ · Supabase project `re-lefela` (opacjlgljeippheotyhz, Uni Hub org)

## State: v2 LIVE (Units 1 + 2 + Listening gym)
- Engine: teach/tap-words/type/choose/match/listen/record-compare/concord-picker + dialogue cards,
  SM-2 SRS (one word bank, review sessions), XP + streaks + weekly scoreboard (resets Monday),
  English UI with Setswana flavour text, offline-first sync queue (toast on failure), installable PWA.
  Home renders ALL units; concord exercises support a `head` word (Mpho ___ ngaka).
  Change-password + show-password toggles (other session, same day). SW cache `relefela-v3`.
- Content: Unit 1 *Go dumedisa!* (7 lessons, ~65 items) + **Unit 2 *Mmele*** (7 lessons, ~70 items:
  body parts, questions, copulatives, adjectives & adverbs, Davies-1992 colours, health/doctor).
  All sourced (`src` on every item); PC audio dialogue cards now also L11, L12, L22.
- **Listening gym**: 34 real NCHLT native clips (audio/nchlt/, 408 KB), filtered so every word is
  already-taught vocab — `toolkit/nchlt-filter.py` re-generates after each new unit (re-run it!).
  Gym = play clip → choose the transcription; +10 XP each, no SRS.
- Toolkit: `toolkit/GRAMMAR.md` (§9 = Unit 2 pack), `toolkit/sentence-bank.tsv` (336 sourced rows),
  `toolkit/SOURCES.md`. Corpus (gitignored): Peace Corps course+grammar PDF+25 MP3s, Setswana NT
  (CC BY-SA) + English WEB parallel, full BSSA Beibele (LOCAL ONLY), Davies 1992 colours, Otlogetswe 2010.
- Schema: profiles / xp_events / srs_items / streaks / unit_progress, RLS (read-both write-own),
  `join_relefela` RPC gates signup by shared code. `schema.sql` in repo is REDACTED (join code);
  real code known to Megan, set in the deployed RPC.
- SECL121 tutor CLAUDE.md updated (app + toolkit are the tutor's authority); keepalive.ps1 includes re-lefela.

## Pending on Megan
1. Supabase dashboard → re-lefela project → Auth → Sign In / Up → **turn OFF "Confirm email"** (signup blocks politely until then).
2. Sign up in the app (username + password + join code), then give the second learner the URL + code.
3. (Standing) keepalive Task-Scheduler registration still awaiting her OK.

## Next sessions (in rough order)
- **Unit 3 Mo sekolong** (future + past tenses, classroom language — the highest-value unit for her
  teaching) — same recipe; after adding it, RE-RUN `python toolkit/nchlt-filter.py` + convert + append
  so the gym grows with the vocab.
- **Conversational track** — Peace Corps L13-L23 as post-module lessons (needs the extraction+verify fan-out).
- **Per-phrase audio clips** — silence-split candidates exist (`corpus/audio-urls.txt` + ffmpeg silencedetect
  at -30dB/0.35s); mapping segments→phrases needs a human ear (Megan). Then listen/record exercises go per-item.
- **Smart Guide day** — when it lands on eFundi: re-align Unit content to lecturer forms (Smart Guide WINS).
  Open Smart-Guide questions parked: bosetlha yellow-vs-grey gloss; borokwa brown (Davies) vs Beibele's
  purple usage; PC class numbering vs lecturer's.
- Optional: hub tile/link for the app (modules table has no links column — would need hub change).

## Gotchas learned
- SW cache-first fights local dev — `?local=1` skips SW registration AND auth (LocalBackend pattern).
- Peace Corps audio can't be blind-sliced to phrases (announcer mixes EN/TSW + repeats) — never auto-map.
- PDF text extraction mangles ê/ô → we normalise to plain e/o (standard SA orthography) everywhere.
