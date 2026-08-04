# Re:Lefela — Project Status — updated 2026-08-04

**Updated:** 2026-08-04 (session 35 — **dictionary wave 2: the African Wordnet, SHIPPED as
sw v39**, commit `01befa1`. 747 → **9 177 entries** from a newly-found open source, live-
verified byte-identical. The licence question was settled the same day by the author herself,
by email. Full record in `SPEC-dictionary-panel.md` §13.)

## Session 35 (2026-08-04) — dictionary wave 2: African Wordnet (sw v39, SHIPPED, commit 01befa1)

She loved the panel ("an absolute save", the examples "helped SO much"), filed her first
three `dict-miss:` words, then asked for wave 2 — believing we had skipped words in the
morning. **We had not**: the free sources were fully harvested in wave 1. The only large
untapped pool was Matumo's ~20 000 entries, which stays out by her own ruling (commercial
book, public repo — and owning the hard copy does not change that, nor would a private repo,
because the app hands `dict-bank.js` to every browser that loads it). So this session went
looking for a **new open source** and found one.

- **African Wordnet (Setswana, 2017) + Open English Wordnet 2025, both CC BY 4.0.** AfWN
  holds 12 182 Setswana lemmas but **no English at all** — it names each meaning by ILI
  number. OEWN carries the same ILI numbers *with* English words and definitions. Joining
  on ILI works on **98%** of entries. ⚠️ The 2022 AfWN release is useless for this: it
  replaced the ids with UUIDs and dropped every definition.
- **747 → 9 177 entries** (8 790 new, all `chk:false`). `dict-bank.js` 194 kB → **1 575 kB**.
- **Four quality gates, each earned by a bug caught in build** — full detail in SPEC §13.
  The two that matter most: examples are gated on whole-token containment (4 215 of 7 917
  synset examples never contain their headword), and meanings are ranked by wordnet's own
  commonest-first sense order, without which `lesea` shipped glossed *baby/babe/infant* but
  **defined as "a project of personal concern to someone"**.
- **App changes:** search now ranks human-checked entries above unchecked ones on a tie (8 790
  new words could otherwise bury a course word); untranslated examples render without an
  English line; the ship gate exempts named translation-free sources rather than relaxing the
  rule; attribution footer credits both wordnets. `sw.js` bumped **v38 → v39**, AUDIO_CACHE
  untouched (no audio byte changed).
- **Verified, build only:** ship gate green; extractor and build byte-identical under
  different `PYTHONHASHSEED`; `?local=1` DOM pass (9 177 words, `baby`→`lesea` correct,
  `water` puts checked `metsi` first with audio, no "undefined", miss path intact);
  **localStorage byte-identical before and after a full dictionary session** — no SRS writes,
  no XP; 0 console errors; test state wiped.
- ✅ **Licence settled the same day, by the author.** The 2017 Readme and the `license=`
  attribute inside its own XML both said CC BY 4.0; the SADiLaR catalogue page said
  CC BY-NC-SA 4.0. Megan emailed **Marissa Griesel** (African Wordnet author) and was told
  plainly it is "no problem". Recorded in `toolkit/SOURCES.md` — ⚠️ don't let the stale
  catalogue field re-open it; the email is the record and Megan holds it.
- ✅ **Her ruling on the source books, restated and holding:** owning the Matumo hard copy
  does not license republishing it, and a private repo would not help, because the app hands
  `dict-bank.js` to every browser that loads it. `dictionaries/` (77 MB of desk books) stays
  gitignored — verified at ship time that **not one file in it is tracked**. What ships is the
  openly-licensed wordnet data, credited in the panel footer.
- **SHIPPED and live-verified:** `sw.js`, `index.html` and `dict-bank.js` all byte-identical
  live vs local; live serving `relefela-v39` / `relefela-audio-v3`; 8 791 afwn-tagged entries
  on the live bank. Size 194 kB → 1 575 kB raw, but **435 kB gzipped**, which is what actually
  crosses the wire on each deploy.
- The `dict-miss:baby` row is marked `addressed_at` — genuinely solved. `alone` and `tissue`
  are deliberately **left open**: this wave did not answer them.

### Honest limits — read these before deciding to ship
- **It is a wordnet, not a beginner's dictionary.** 6 876 nouns, 2 750 verbs, only 262
  adjectives, and no common function words. Of her three real misses: **baby is solved**
  (`lesea`), **alone is still missing**, and **tissue matches only the archaic verb "to
  tissue"** (weaving), not the paper hankie. The gap-fill loop is still the answer for
  everyday words — this wave does not replace it.
- Some entries read oddly (`rota` = "stale, make"; `ngwana` defined as "any immature animal").
  Unchecked wordnet content, labelled by source in the panel.

## Next up (end of session 35, 2026-08-04)
1. 📱 **[whenever] 2 min:** open the live app, close-and-reopen the PWA twice so sw v39 takes,
   then look up a few words — it is 9 177 now. Worth trying one you'd never have found before.
2. 💻 **[whenever] 15 min, WITH her:** the gap-fill loop for `alone` and `tissue` — still
   genuinely missing, still open in `tutor_questions`. Look them up in Matumo together, add as
   `src:["desk"], chk:true`, rebuild, ship. ⚠️ This wave did **not** replace that loop: the
   wordnet is strong on nouns and verbs, weak on adjectives (262) and has no function words.
3. 💻 **[whenever]** Macmillan may reply about Matumo (she emailed
   `bw.info@macmillaneducation.co.bw` and `rightsandpermissions@macmillan.com` on 2026-08-04).
   If they license it, that is a far bigger and more beginner-suited source than the wordnet.
   If they decline or never answer, nothing changes — the hand-typed loop continues.
4. 💻 **[whenever] worth watching, not fixing yet:** does the bigger dictionary actually feel
   better in use, or does wordnet noise (`rota` = "stale, make") get in the way? Real use
   decides, as it did for the Sentence Builder. The cheapest lever if it is too noisy is
   dropping AfWN entries whose glosses come from one-word synsets.
5. Carry-overs unchanged from session 34: pack-PDF name check, tutor session from the second
   learner's own laptop, `u2l1-07` "nko" re-record (low), ear-check the 131 native clips,
   more chat scenarios spec-first, u5l4 Smart Guide.

**Previous —** 2026-08-04 (session 34 — **the 📖 Dictionary panel, SHIPPED as sw v38** after a
five-reviewer pre-ship code review she called for. 747-word Setswana↔English lookup with real
example sentences, built ONLY from open sources — the commercial desk dictionaries she
downloaded are gitignored in `dictionaries/` and feed a gap-fill loop instead
(`dict-miss:` rows in tutor_questions). Full record in `SPEC-dictionary-panel.md` §9–§12.)

## Session 34 (2026-08-04) — 📖 Dictionary panel (sw v38, SHIPPED, commit 9d1d9b7)

Her ask: "translate this word" panel — single words, both directions, massive database,
definition + example each time. Planned in the morning session (spec + her 6 rulings in
SPEC §8), built on her go-ahead, code-reviewed on her interrupt before the push.

- **dict-bank.js** (generated, 194 kB, in the SW CORE precache — her "preload" ruling):
  747 entries from the app's own checked cards (298, `k:1`) + Peace Corps course (public
  domain) + Wiktionary's 350 Tswana lemmas (CC BY-SA). 1 052 examples on 394 entries (52%),
  mined mostly from the **Autshumato parallel corpora** (CC BY 2.5 ZA, already in corpus/) —
  the Bible pair turned out NOT to be reliably aligned (97/261 chapters equal line counts)
  and contributes only 2 corroboration-gated verses. Attribution footer in the panel.
- **Panel**: 📖 button on home (ungated), one search box, both directions via the shared
  `norm()`; entry cards show meanings/POS/noun class/examples with per-item source labels;
  298 entries reuse existing native audio; misses show closest-prefix suggestions + a manual
  "💬 Ask for this word" (files `dict-miss:<q>` to tutor_questions, one row per word per day
  via `rl_dictasked`, wiped in clearLearnerState). **No SRS writes, no XP** — measured
  byte-identical state before/after a full session.
- **Pipeline in toolkit/** (all rerunnable, deterministic): dict-fetch-wiktionary,
  dict-extract-sources, dict-mine-examples, dict-build, verify-dict-bank (ship gate),
  dict_common/dict_lang helpers; dict-src/*.json is the tracked audit trail.
- **The pre-ship code review (her call) found 9 real problems, all fixed before push** —
  headline items: Peace Corps ToC/pronunciation-table junk had shipped as headwords
  ("Alphabet", "ch", "ph"…); *batla* carried Setswana "Re ne re" as an English meaning
  (lexicon blind spot); the build was PYTHONHASHSEED-dependent (rona's provenance differed
  run to run, invisible to the gate); the ask button could double-file; two ship-gate holes.
  Fixes + regression pins in SPEC §12; node harness now 57 assertions, all green.
- ⚠️ **Standing rules for this feature:** dict-bank.js is GENERATED — never hand-edit,
  rebuild via the four toolkit scripts; `dictionaries/` (desk PDFs) must never be
  un-gitignored; desk-sourced gap-fill entries arrive as `src:["desk"], chk:true` typed in
  by Megan during a session, never bulk-imported.
- **For the next tutor session:** rows with context starting `dict-miss:` are dictionary
  gap requests — look the word up in Matumo together, add the entry, rebuild, ship.

## Next up (agreed 2026-08-04, end of session 34)
1. 📱 **[whenever] 2 min:** open the live app, tap 📖 Dictionary, look up a word or two
   (try *ema*) — close-and-reopen the PWA twice first so sw v38 takes.
2. ~~📱 the second learner opens Re:Lefela and plays one round~~ **DONE — and it was already
   done before session 34 even started. Queried live 2026-08-04 (she asked me to re-check
   rather than trust the note): she has played 28, 29, 30, 31 Jul and 1, 2 Aug. Last save
   2026-08-02 19:44, 112 words, streak 4 (best 9), 20 words due. The 28 Jul session shows
   154 XP events / 1 661 XP — the two days of queued saves flushing on first load, exactly
   as session 31 predicted. Sync is healthy: 0 rows over the 30-day cap, 0 far-future due
   dates, 0 unanswered tutor questions.**
   ⚠️ **Why this sat here wrongly for three sessions:** the "last save is still 26 Jul" line
   was true when the session-33 audit ran on 28 Jul — *before* she opened the app later that
   same day. It was then carried forward as "[blocking]" by copying, never by re-querying,
   and repeated to Megan again in session 34. **A pending item that one SQL query can settle
   must be re-queried at every catchup, not inherited.**
3. 💻 **HER DECISION, end of session 34: wave 2 is PARKED — she is testing the dictionary
   for a few days first, and the next dictionary session should be driven by what she
   actually hits, not by adding more entries speculatively.** So the next session's job is:
   read the `tutor_questions` rows whose context starts `dict-miss:`, look those words up in
   Matumo *with her*, add them as `src:["desk"], chk:true`, rebuild, ship. Precedent for
   this call: the Sentence Builder was "finished" until she played it, and real play — not
   planning — produced the 3-miss reveal and the 🛟 button.
   Wave 2 as specced stays available but unstarted: DBE maths terms (extractor not written;
   the `dbe-maths` source tag is already reserved in all three places that must agree),
   deeper example mining to lift the 52% example coverage.
   ⚠️ Don't open the next dictionary session by building — ask her how it felt first.
4. Carry-overs unchanged from session 33: pack-PDF name check, tutor session from the
   second learner's own laptop, `u2l1-07` "nko" re-record (low), ear-check the 131 native
   clips, more chat scenarios spec-first, u5l4 Smart Guide.


**Previous — 2026-08-02 (housekeeping, Megan's calls):** recording toolkit CLOSED — the recording
sheet (`toolkit/recording-sheet.docx`) is deleted from the repo ("we are done with it";
git history still has it if ever needed). The 696 MB `corpus/tn_za.tar.gz` duplicate was
deleted from disk (its extracted folder stays until the December laptop clean).

**Updated:** 2026-07-28 (session 33 — **full fresh audit: CLEAN, one bug found and fixed same
session.** Live == repo byte-for-byte at sw v37 (the s32 "NOT pushed" note was stale — see the
correction in s32 below), scrub holding (0 name hits at HEAD, 0 forks, 0 PRs), server SRS data all
under the 30-day cap. The bug: `tutor-progress` summed `xp_events` client-side, which silently
clips at PostgREST's 1000-row cap (both accounts already past 600 events) — `xp_total` is now
summed in the database (`public.xp_total(uid)`, service-role-only) and the function is redeployed
as **v4**, live-verified equal to the direct sum; the `delivered_at` stamp is now also uid-pinned;
`main`'s upstream tracking re-linked after the filter-repo rewrite dropped it) · previous: 2026-07-28 (session 32 — **the second learner's own Claude tutor, WIRED**: a read-only
`tutor-progress` edge function lets a learner's tutor read her own progress holding no credential
at all, the 💬 Ask-your-tutor button + 3-miss auto-file now work for **both** accounts (**sw v37
SHIPPED and live-verified**), and a six-module tutor pack is assembled on her Desktop, which she is
sending across today. Also this session, on her go-ahead: the second learner's name AND username
scrubbed from every tracked file **and from the entire git history** — ⚠️ **all pre-2026-07-28 SHAs
for this repo are now stale**, see the HISTORY REWRITE note below) · previous: 2026-07-28 (session 31 — **the SRS interval-overflow bug, FIXED and SHIPPED as sw
v36**: the second learner's phone had saved nothing since 26 Jul because a card's next-review date had compounded
into the year 22970, which Postgres rejects, and the outbox retried it forever; the interval is now
capped at **30 days** on Megan's ruling, a repair pass heals values already stored/queued/pulled,
and a save the server will never accept is moved aside instead of blocking everything behind it)
· previous: 2026-07-26 (session 30 — **the 🧩 Sentence Builder, SHIPPED as sw v33**: typed
production drill over a pre-checked 57-sentence `builder-bank.js` spanning u1–u5, graded only
against pre-checked `accept` strings, **NO SRS writes** (own `rl_builder` key); session 28's
`4c76f84` content fixes rode the same push — everything live-verified, the standing push blocker
is CLOSED) · previous: 2026-07-26 (session 29 — **spec-only**: `SPEC-sentence-builder.md` written;
she ruled the same day: build it) · previous: 2026-07-26 (session 28 — two confirmed content-bug fixes: the `u2l1-00` noun-class rule
typo and the bad `u1l7-08` native re-record reverted, sw **v32**/audio **v3**; committed locally,
**push still pending her go-ahead**) · previous: 2026-07-25 (session 27 — the **native-speaker recording wave**, SHIPPED as sw **v31**:
68 first-time-silent cards voiced + 63 re-recorded, content.js is **307/307, 0 silent, for the
first time**; also a new tagger.html feature — trimming a merged clip now carves the leftover
audio into its own taggable segment instead of discarding it) · previous: 2026-07-19 (session 26 — **the Daily Quest**, SHIPPED as sw **v30**: Review is gone,
absorbed into a fixed 10-round daily drill that puts everything due in first and tops up from every
word she has met; plus a real grading bug fixed — 46 cards whose English lists alternatives
("he / she") were rejecting correct answers typed in the other order) · previous: 2026-07-18 (session 25 — **Bua le Katse**, SHIPPED as sw **v28** then **v29**: a
scripted no-LLM chat with Katse — scenario 1 "Dumela, Katse!" in a new `dialogues.js`, vocab-gated
off real SRS reps, chips/typing input, stretch words, every line sourced and mostly voiced; then
same-day: beginner scenario 0 **"Le kae?"** (u1l1–l3 vocab only, drills kae→kwa) + a scenario
picker showing locked scenarios with their unlock hint, after Megan couldn't find the feature) · previous: 2026-07-18 (session 24 — the ★ Food wiring wave, SHIPPED as sw **v27**: 8 of the 10
`u4l1` food cards voiced from Megan's own Food recording, a whole-file CRLF bug in
`export-item-audio.py` caught and fixed, `missing-audio.md` regenerated at 68 silent, and — now
that she has found a native speaker — a printable **132-word recording sheet** generated straight
from content.js) · previous: 2026-07-18 (session 23 — a research-driven feature + an audio wave, SHIPPED as sw
**v25** then **v26**: the new **dictation card** ("type what you hear", gated on audio + reps≥3),
and **20 cards voiced from Megan's own recordings** — all 11 u4l3 numbers + 9 of 10 u5l1 animals.
Also: three free Setswana corpora pulled onto disk + `autshumato-lookup.py`, ★ Numbers/★ Food added
to the tagger, ★ Animals fixed to show its real cards, a 🎧 ear-check panel, a public-repo gitignore
leak closed, and `missing-audio.md` now script-generated) · previous: 2026-07-17 (session 22 —
"Ask your tutor" feature SHIPPED as sw **v24**: Megan-only 💬
floating button parks a mid-app question straight into a new `tutor_questions` table for her SECL121
tutor to see first thing next session; seeded with her real "where do I use wena" question from
today) · previous: release wave — sessions 18-21 SHIPPED as sw **v23**: Units 3-5 complete + mid-Katse
id rename + daily XP rivalry nudge + weekly champion popup; 212/307 real cards voiced) · (session 21 —
new Unit 5 "Diphologolo" built: u5l1-u5l5, 36 real items + 5 rule cards, 5 reuse cards, NCHLT gym
re-filtered to 40) · previous: session 20 — new Unit 4 "Go ja dijo" built: u4l1-u4l5, 41 real items +
5 rule cards, 1 reuse card, NCHLT gym re-filtered to 40; sw stays v22, not yet shipped; session 19 —
Unit 3 part 2 "Mo sekolong" built: u3l4-u3l8, 41 cards + 5 rule cards, 13 clips spliced, NCHLT gym
re-filtered to 40; sw stays v22, not yet shipped; session 17 — 5-agent audit + fix batch v20, colours
drop + 65-clip wiring wave v21, L11 finale + export scope fix v22 — ALL SHIPPED; session 16 Itumeleng
card fix + 🐢 slow-audio button (sw v19), session 15 Unit 3 conjugation lessons (sw v18), session 14
enhance bot + Katse bubble (sw v17), session 13 colour stem cards (sw v16), session 12 reset button
(sw v15), session 11 SW cache overhaul (sw v14)

## ⚠️ HISTORY REWRITE 2026-07-28 — every SHA before today is STALE
The second learner's first name and username were scrubbed from the **entire git history**
(`git filter-repo --replace-text --replace-message`, on her explicit go-ahead), then force-pushed.
**All 86 commits were rewritten, so every commit SHA quoted anywhere earlier in this file — and in
any older session note, memory or chat — no longer exists.** The content is unchanged; only the
hashes moved. New HEAD at the time of the rewrite: `1ec63a8`.
- Replacements applied to blobs **and** commit messages: `(?i)\blize\b` → "the second learner", plus
  the two paths that carried the name (the private plan file, and the tutor-pack folder).
  Word-boundary regex deliberately, so `normalize`/`capitalize` and friends were untouched — verified.
- **Verified from a FRESH CLONE off GitHub, not just locally:** 0 hits for the name in any blob of
  any revision, 0 in any commit message, 86 commits and 415 files (348 audio) all intact.
- Reversible: full pre-rewrite bundle at
  `C:\Users\megzi\Desktop\re-lefela-BACKUP-before-history-rewrite-2026-07-28.bundle` (18.1 MB).
- ⚠️ Residual risk, small and known: GitHub can still serve an orphaned pre-rewrite commit by its old
  SHA until it garbage-collects. There are **no forks and no PRs** on this repo, so nothing else is
  holding those objects. If she wants that closed for certain, GitHub Support can force a GC.
- ⚠️ **Standing rule for this repo, restated:** it is PUBLIC and GitHub Pages serves every file in it,
  `PROJECT-STATUS.md` included. Never write a real learner's name, username or account id into any
  tracked file. "The second learner" is the established stand-in.

## Session 33 (2026-07-28, same day, Fable audit) — full fresh audit: clean; xp_total bug fixed (function v4)

Her ask: full fresh audit of this repo + the NWU hub after the morning's sessions 31–32.
Verdict: **clean** — no security holes, no data damage, no drift. Findings and the one fix:

- **Live == repo, byte-for-byte** (sw.js / index.html / content.js md5-identical, `relefela-v37`,
  `relefela-audio-v3`). The s32 "commit not pushed" worry was a stale note, corrected in place below.
- **Scrub verified from here too:** 0 name hits in any tracked blob at HEAD, 0 forks, 0 PRs ever,
  Pages building. `tutor_tokens` lockdown confirmed live (RLS on / zero policies / ACL only
  postgres + service_role); function logs show Bearer-only calls — no token has ever been in a URL.
- **Server data:** 0 rows over the 30-day cap, 0 far-future due dates. The second learner's last
  save is still 26 Jul — the "she opens the app once" item genuinely still stands.
- **THE BUG (found in review, fixed + shipped this session):** `tutor-progress` fetched every
  `xp_events` row and summed client-side. PostgREST silently caps un-limited selects at 1000 rows,
  so `summary.xp_total` would have silently undercounted within weeks (accounts at 603/575 events
  already). Fix: **`public.xp_total(uid)`** (SQL sum, `stable`, EXECUTE revoked from
  public/anon/authenticated, granted only to service_role — applied via MCP as migration
  `xp_total_sum_function`; this repo keeps no migrations dir, the SQL lives in the MCP history and
  here). Function now calls `admin.rpc("xp_total", {uid})`; redeployed via MCP as **version 4**
  (verify_jwt still false, by design). Also hardened while in there: the `delivered_at` stamp now
  carries `.eq("user_id", uid)` so the "every query pinned" rule is literal, not by-construction.
- **Live-verified the fix** the s32 way: throwaway token → Megan's account returned
  `xp_total: 5600` == the direct SQL sum (words 108, username right, warnings empty); wrong token
  401; throwaway token deleted, table confirmed back to the 1 real token. No open questions were
  stamped (there were 0 open — no real rows touched).
- **Housekeeping:** `main` upstream tracking re-linked (`git branch --set-upstream-to=origin/main`)
  — filter-repo had dropped it, which is why the portfolio sweep misread this repo as
  "no remote". `recording-sheet.docx` left uncommitted per the standing s25 ruling.
- **Known + accepted (watch, don't fix):** the weekly-champion query in index.html has the same
  1000-row shape but is week-bounded — only misbehaves if the two accounts ever log 1000+ XP events
  in a single week (currently ~half that pace). The parked-pile cap (50) silently drops the oldest
  beyond 50 — irrelevant in practice. `?token=` query-param support still exists on the function;
  fine while unused, since edge logs print full URLs the pack must keep using the Bearer header.

## Session 32 (2026-07-28, same day) — the second learner's own Claude tutor: the read-only progress window (sw v37, SHIPPED)

Her ask: the second learner wants her own SECL121 tutor (and tutors for all six shared modules) on her own Claude
account, with her Re:Lefela progress visible to it. Planned by Fable earlier the same day
(`nwu-hub/PLAN-tutor-pack.md`, private — it names a real learner), built here.

### The shape, and why not the obvious routes
the second learner's Claude holds **no credential of any kind**. The rejected options and why: Megan's Supabase
access token is a master key even in read-only mode and exposes every project; the app's
publishable key plus the second learner's login can write whatever the app can write, so it cannot be made
weaker than "her"; a dedicated read-only database user means real database credentials sitting in
a text file on another person's laptop. Instead **one URL + one random 43-char token**.

- **`public.tutor_tokens`** — `token_sha256` (PK), `user_id`, `label`, `created_at`, `revoked_at`.
  ⚠️ **Only the SHA-256 of a token is stored**, never the token, so a database leak cannot reveal a
  live one. Two independent locks, deliberately both: RLS enabled with **zero policies**, *and*
  `revoke all … from anon, authenticated` — because Supabase's default privileges hand new tables
  to those roles, so RLS alone was doing the work and the revoke makes it explicit. service_role
  (the function) bypasses RLS, which is how it still reads. Verified: the app's own publishable key
  gets `42501 permission denied` on the table.
- **`tutor-progress` edge function** (`supabase/functions/tutor-progress/index.ts`, committed —
  no secrets in it). Hashes the presented token, looks it up, and pins **every** query to that one
  `user_id`. **Deployed `verify_jwt = false` ON PURPOSE**: the caller presents a tutor token, not a
  Supabase JWT, so the gateway has to let it through to the function's own check. A wrong token
  costs one indexed PK lookup and 401s.
- **The only write** is `delivered_at` on the questions it just handed over (her ruling this
  session), so a tutor is not re-told the same thing every session. `addressed_at` is untouched —
  that stays her own bookkeeping. Nothing else is ever written: not srs_items, xp_events, streaks
  or unit_progress.
- **Compact by default** (3.1 kB), `?full=1` for the 55 kB deep dive. First cut returned all 85
  cards plus 300 raw XP events every call — an absurd context cost for a tutor that reads this at
  the start of every session. Default now carries summary / due_now / weakest / units /
  activity_by_day (daily XP rollup) / questions / warnings, and **says so when it truncates**
  (`due_now_truncated`) rather than silently clipping.

### The app change (sw v37)
`TUTOR_USERNAME = 'megzieberr'` is **gone** — both the 💬 fab and `maybeFileBuilderMiss` now gate on
"signed in" alone. **Her ruling:** only the two accounts exist and sign-up is not open, so an
allowlist is more code for no gain. `tutor_questions` needed **no migration** — its policies were
already `user_id = auth.uid()` for insert and select, so the second learner could always have filed rows; only the
client gate was stopping her. ⚠️ Note for future columns: this project uses **table-level** grants
(`relacl` shows `authenticated=arwdDxtm`), unlike WhenWorks, so a new column does NOT need its own
grant here — the standing WhenWorks gotcha does not apply to re-lefela.
`sw.js relefela-v36 → v37`; **AUDIO_CACHE untouched** (`relefela-audio-v3`) — no audio byte changed.

### Verification
- **42-assertion node harness** (`…\scratchpad\test-tutor-gates.js`) running the **real** gate
  functions brace-sliced out of index.html: both accounts file; LOCAL_MODE (with a **null** sb
  client, as the real app has it) and signed-out file nothing and do not throw; one row per
  sentence per day, and again the next day; fab mounts once across renders and is torn down on
  logout; LF-only/no-BOM by binary read. One early failure was the *test rig*, not the app —
  it recorded a removal on the wrong rig object; fixed to flip the user on one rig, which is what
  logout actually does.
- **Real browser DOM check** (preview, non-local): fab mounts for the second learner's username and
  for `megzieberr`, absent signed-out, exactly one element after three mounts, removed on logout.
  0 console errors. SW + caches + localStorage wiped after (the non-local load registers a SW —
  it created `relefela-v37`, confirming the bump).
- **Live endpoint**: valid token 200 with **only** the second learner's rows (85 words, 9 due — matching session
  31's repair); Megan's uuid and username appear **nowhere**; token not echoed; `?full=1` 55 kB;
  no token 401; wrong token 401; **revoked token 401 while the second learner's still worked**; POST 405;
  delivered_at dedupe confirmed (`first_time_seen` true then false on a temp row). A throwaway
  token pointed at **Megan's** account returned Megan's 108 words and no trace of the second learner — proving
  isolation follows the token rather than being accidentally pinned. Every test row and the
  throwaway token deleted afterwards; database confirmed back to 1 token, 11 questions, 0 stamped.
- **Commit `3b0cf74`, local only — NOT pushed** (no push go-ahead this session).
  `toolkit/recording-sheet.docx` still deliberately uncommitted per the session-25 ruling.
  **[Correction, s33 audit: this note went stale the same hour it was written — the history
  rewrite renamed the commit to `e07ab3e` and the force-push that published the rewrite carried
  it out with everything else. Verified live: sw.js/index.html/content.js byte-identical to the
  repo, serving `relefela-v37`.]**

### The tutor pack (on her Desktop, not in any repo)
A tutor-pack **folder on Megan's Desktop, never a git repo** (exact path in the private plan), so
there is nothing to accidentally publish. Router `CLAUDE.md` (say a module code → it reads that spec), plain-language
`README.md`, `NOTES.md` (the tutors' only memory — no hub, by design), and six adapted
`modules/<CODE>/TUTOR.md`. ~995 MB of shared material copied in; **SECL121/Corpus (6.2 GB, 58k
files) deliberately excluded** — app tooling, not study material. The re-lefela `toolkit/` reference
files (GRAMMAR.md, sentence-bank.tsv, SOURCES.md, course-glossary.js) rode along as
`SECL121/materials/reference/` so they work offline and cannot drift mid-session.
⚠️ **Correction to an in-session claim:** `toolkit/` **IS** tracked (30 files) and so is fetchable by
URL after all — the check that said otherwise used a broken regex. `corpus/` genuinely is untracked.
⚠️ **Megan's personal history was stripped from every spec** (her marks, her tutoring business, her
bursary, her error patterns) — SECL's leaky-items list was rekept as "common trip-ups in this
material, NOT the second learner's history". Her own `Project_Instructions.md` files were kept for the module maps
but each TUTOR.md tells the tutor to ignore their personal sections.

## Next up (agreed 2026-07-28, end of session 32)
1. 📱 **[blocking] 2 min:** the second learner opens Re:Lefela and plays one round. Two days of saves
   flush on first load, and she sees the 💬 button for the first time. (Carried from session 31 — the
   progress window shows her last save is still 26 Jul, so this genuinely has not happened yet.)
2. 💻 **[whenever] 5 min:** skim the pack's PDFs and Word files for Megan's name/student number —
   147 of them could not be text-searched, and submitted assignments carry her details. EDDC125 and
   ENGV121 `Resources/` are the likely spots.
3. 💻 **[whenever]** first tutor session on the SECOND LEARNER'S OWN laptop: confirm the progress
   window actually runs there. ⚠️ It was only ever tested from Megan's machine — different
   PowerShell version, different network. If it fails, her tutor is told to say so plainly and teach
   from the material instead, so it degrades safely rather than hunting for a workaround.
4. Carry-overs unchanged from session 31: the parked pile still has no screen (lives in `rl_parked`,
   readable on request); the Daily Quest still re-grades not-yet-due cards (her deliberate "leave it
   for now" — the 30-day ceiling removes the harm); Sentence Builder reveal-threshold feedback;
   future bank waves; `u2l1-07` "nko" re-record (low); ear-check the 131 native clips; more chat
   scenarios spec-first; u5l4 Smart Guide.

## Session 31 (2026-07-28) — SRS interval overflow: the second learner's sync unwedged (sw v36, SHIPPED)
Debugging session, opened with the second learner's screenshot: a toast reading `Save failed — will retry. (time
zone displacement out of range: "+022970-09-07T12:01:47.431Z")`, over and over.

### The bug, end to end
1. **`srsGrade` multiplied `interval` by `ease` with no upper bound.** Every correct answer stretches
   the wait; a heavily-drilled card compounds. the second learner reached **2 549 900 days** on `u1l1-04` (due year
   9008) at 15 reps — that value synced fine, since a 4-digit year is legal.
2. **One more correct answer crossed ~8 000 years**, and that is where
   `new Date(ms).toISOString()` switches to the ISO **expanded-year** form,
   `"+022970-09-07T12:01:47.431Z"`. Postgres parses that leading `+022970` as a **time-zone offset**
   and rejects the row (SQLSTATE 22009).
3. **`flushQueue` left the failed op at the HEAD of the outbox and retried forever** — correct for a
   network blip, fatal for a permanently-invalid row. Everything queued behind it waited. **Nothing
   from her account synced from 2026-07-26 15:17 until this fix**, and the toast re-fired every 30 s.
4. ⚠️ **Three further correct answers would have passed 8.64e15 ms**, where `toISOString()` throws
   `RangeError` — that would have broken **grading itself**, not just syncing. The cap prevents a
   strictly worse future failure, not only the observed one.

### Why Megan's account was 81× behind the second learner's (her question, answered with data)
Only one number matters: how many times in a row a single card has been right. the second learner's best card was
at **15**, Megan's at **11**. Four fewer answers, each roughly tripling, = **3⁴ = 81× smaller** —
and the values matched that exactly (2 549 900 vs 31 480 days). Megan actually plays *more* (108
words vs 85, 231 XP events since the 26th vs 34) but **spreads it wider**: her average card has 4.9
reps and only 4 cards passed 10, against the second learner's 6.4 average and 15 cards past 10, from re-drilling
the early lessons. Megan was ~5 correct answers from the identical crash.
⚠️ **Lesson replays are NOT the cause** — replay mode deliberately never calls `srsGrade`. The
**Daily Quest** does the counting, including on filler cards (see "left open" below).

### The fix (three parts)
- **`MAX_INTERVAL_DAYS = 30`**, clamped inside `srsGrade`. **Megan's ruling this session**, having
  first seen a 365-day cap: a year is still too long for beginners a few months into one semester —
  "we get a word right today and next week we've completely forgotten it." Ladder is now
  **1 → 3 → 7.8 → 20.7 → 30** (five correct answers to the ceiling; ease climbs 2.5 → 2.7, so it is
  *not* a flat ×3 — an earlier draft comment said 1→3→9→27 and was wrong, corrected in the file).
- **New `repairIntervals()`** — a cap alone cannot heal what is already on disk. Clamps oversized
  values in `state.srs`, in the pending outbox, and anything `pullRemote()` merges back from the
  server. Runs at the top of `boot()` (ahead of the 30 s flush timer) **and again straight after
  every `pullRemote()`** — that second call site is what stops the server re-supplying the bad value
  every session. It repairs the stuck op **in place**, so the second learner's queued `reps:16` survived rather
  than being discarded to unblock the queue. Re-stamps `touched` and re-enqueues, so the server
  converges too. Idempotent.
- **"Move it aside" in `flushQueue`** (her ruling, chosen from three options offered). A save the
  server will **never** accept is moved to a new `state.parked` pile after 3 tries, so the queue
  behind it drains. ⚠️ **The distinction that makes this safe:** only Postgres **data exceptions
  (22xxx)** and **integrity violations (23xxx)** park. Offline, 5xx, **the project auto-pausing**
  (it does — there is a keep-alive pinger for exactly that) and **42501 missing-column GRANT** are
  treated as transient and retry forever, unchanged. Parking those would destroy real progress
  during a routine outage, and 42501 specifically *should* stay loud until the grant is added.
  A missing `err.code` is treated as transient — never discard a learner's work on a guess.
  `parked` added to `persist()`, `clearLearnerState()` (`rl_parked`) and the account-switch reset.
- **sw.js `relefela-v35 → v36`. `AUDIO_CACHE` untouched** (`relefela-audio-v3`) — no audio byte
  changed, so bumping it would have been wrong.

### Server data repaired
**42 rows** across both accounts (34 hers / 8 Megan's) had `interval_days > 30`; all clamped, along
with their `due_at`. `reps`/`ease`/`lapses` untouched — only the schedule moved. **`updated_at`
deliberately preserved** so each device's own state and pending queue stay authoritative and cannot
be clobbered by the next pull. Reversible snapshot of every pre-clamp row saved **outside the repo**
(learner rows) at `…\scratchpad\srs-backup-2026-07-28.json` — note the scratchpad is session-scoped,
so copy it somewhere durable if it is ever wanted. the second learner now has **9 words genuinely due**, which
will front her next Daily Quest.
⚠️ Correction to an in-session claim: those far-future cards were **not** fully retired from
practice — the Daily Quest's weakest-first top-up draws on every word ever met regardless of due
date, so they lost *due priority*, not exposure. Verified, not assumed.

### Verification
- **63-assertion Node harness** (`…\scratchpad\test-intervals.js`) running the **real** `srsGrade` /
  `repairIntervals` / `permanentSaveError` source text sliced out of `index.html`, seeded with
  the second learner's **actual server values**. It is ceiling-agnostic — every expectation is derived from
  `MAX_INTERVAL_DAYS` as read from the file, so changing the ceiling cannot silently invalidate the
  tests. Section F **reproduces `+022970…` from the old formula** (diagnosis demonstrated, not
  assumed) and confirms the `RangeError` cliff. Section G pins the park/retry decision for 15 error
  shapes.
- **Browser test of the park path with `sb.from` stubbed out entirely** (so nothing could reach the
  live database, and no auth needed): **6 consecutive transient failures parked nothing** and held
  the whole queue; a `22009` was retried twice then parked on the 3rd try, after which the `xp` and
  `streak` ops behind it went through; the parked entry kept `reps:16`, its code and a timestamp;
  survives reload; `rl_parked` is in the wipe list.
- **Full `?local=1` walkthrough** (SW unregistered + caches + localStorage cleared first, wiped
  after): seeded with the 365-day values the server held at that point, all pulled back to 30;
  healthy and lapsed cards untouched; the from-scratch ladder measured as **1, 3, 7.8, 20.7, 30, 30,
  30, 30**, matching the documented comment; a real UI round graded normally (6 → 15 days) while a
  card at the ceiling regraded correct held at 30 with reps still advancing; **0 console errors**.
- LF-only / no BOM confirmed by **binary** read on both files (Git Bash `grep` strips CR and lies).
- **Commit `ba92199`, pushed to `main`. Live-verified:** live `sw.js` and `index.html` are
  **byte-identical to local** (3 617 / 134 602 B), `CACHE = relefela-v36`, `AUDIO_CACHE` still
  `relefela-audio-v3`, all new symbols present, and the old uncapped line is gone.
  `toolkit/recording-sheet.docx` left uncommitted per the standing session-25 ruling.

### Left open (her call, deliberately not built)
**The Daily Quest re-grades cards that were not due.** It always serves 10 cards and tops up with
already-known words; getting a filler card right still stretches its wait. That is the *engine* of
the rep inflation — the same few words appearing as filler day after day. Offered and **she chose to
leave it for now**, since the 30-day ceiling removes the harm; the alternative is to only advance the
schedule when a card was genuinely due. Worth revisiting on a day she can play afterwards and say
whether it feels right.

## Next up (agreed 2026-07-28, end of session 31)
1. 📱 **[blocking] 2 min:** open Re:Lefela on **the second learner's** phone, play one Daily Quest round, check the
   "Save failed" popup is gone and her ⭐ XP jumps (two days of saves flush on first load).
2. 📱 **[whenever] 1 min:** same on your own phone — a few words that were parked in the future are
   due again now.
3. 💻 **[whenever]** The parked pile has **no screen** — it lives in `rl_parked` on the phone and I
   read it on request. Say the word if you want a line on the stats screen instead.
4. Carry-overs unchanged from session 30: Sentence Builder reveal-threshold feedback, future bank
   waves, `u2l1-07` "nko" re-record (low), ear-check the 131 native clips, Daily Quest first-use
   feedback, more chat scenarios spec-first, u5l4 Smart Guide.

## Session 30 (2026-07-26, same day) — 🧩 Sentence Builder built + SHIPPED (sw v33)
Her go-ahead on the session-29 spec, with two amendments delivered in-session: the 4 open §9
questions were delegated to the supervisor to rule, and mid-session she extended the scope from
"u1–u2 first" to **all five units, committed together**.

**Rulings on §9 (delegated, then her scope extension):** (1) bank u1–u2 for v1 → extended same
session to u1–u5 on her ask; (2) **one continuous pool**, no picker screen; (3) **spelling
tolerance kept** — same small Levenshtein "close" as other typed cards, word order still exact;
(4) **pipeline kept**, with v1 hand-curated directly from sources by the supervisor (Setswana
never touched by an agent) and `gen-builder-candidates.py` kept as a DRAFTS-ONLY tool for future
waves.

- **`builder-bank.js` — 57 prompts** (u1 20 · u2 9 · u3 13 · u4 8 · u5 7), every `accept` string
  traced to sentence-bank.tsv / GRAMMAR.md / the corpora or a documented combined-src precedent
  (the u1l7-07 rule); provenance + a nudge-style `note` (doubles as the in-drill hint) per entry.
  Multi-accept where genuinely valid (her own drill's *ga ke na buka / ga ke na le buka* pair;
  the four attested orderings of "Tomorrow I will go to school"). u3 = full typed production of
  the tense paradigm she's only ever slot-picked (incl. the o→a second-concord trap); u5 cashes
  in u5l5-00's own "the app will ask you to WRITE it out" promise. `Ke nwa metsi` corpus-verified
  (verbatim in Beibele, JHN 4) before inclusion.
- **Engine in index.html** (~110 lines after the chat section): `🧩 Sentence Builder` home button
  once ≥1 prompt unlocks (unlock = every `usesIds` id at `reps >= 1`, the chat's `chatLearned`
  gate; both accounts + `?local=1`, not Megan-gated). Typed input (dictate-card pattern), graded
  per-string via the existing `answerMatches` over `accept` — nothing inferred at grading time.
  Fresh prompts first, done ones after as extra practice; wrong keeps the attempt and retries,
  2nd miss adds the entry's `note` as a 🐾 hint (answer never revealed), Skip link so no dead
  ends. +2 XP kind `'builder'`; `rl_builder` `{done, streak}` added to `clearLearnerState()`.
  ⚠️ Deliberate detail: the drill screen uses container id `sbArea`, NOT `exArea` — a stale
  lesson `session` + an `#exArea` match would make `currentContext()` (Ask-your-tutor) report a
  lesson she isn't in.
- **`toolkit/verify-builder-bank.py`** (ship-time checker: ids resolve, no dups, non-empty
  accepts, LF/BOM by binary read — 57 entries all pass, exits 1 on a seeded-broken copy) and
  **`toolkit/gen-builder-candidates.py`** (drafts-only generator, 296 candidates from 5 attested
  frames, loud never-ship-directly banner, `newline='\n'` per the session-24 CRLF lesson).
- **sw.js `relefela-v32 → v33`**, `builder-bank.js` added to CORE. `AUDIO_CACHE` untouched
  (`relefela-audio-v3`) — no audio referenced, correct.
- **Verified:** node harness (17 assertions — unlock gating incl. reps=0, exact/close/
  reorder-rejected/empty-rejected, multi-accept, all 64 accept strings self-match, fresh-first
  ordering) + full `?local=1` walkthrough (SW unregistered + caches/localStorage cleared, wiped
  after): fresh learner sees no button; doctored full learner sees "57 sentences unlocked";
  correct/typo-toast/two-miss-hint/skip/finish/quit all behave; diacritic-free `ntsa` typing
  accepted (norm() strips the caron); **`state.srs` byte-identical after a full play session**;
  375×812 no overflow; 0 console errors.
- **Supervisor/agent note (Fable session):** the Sonnet engine agent did the recon then **refused
  to write code — twice — on execution-gate grounds** (a subagent can't see her chat, so a relayed
  go-ahead is unverifiable to it; exactly the [[never-auto-execute-fanouts]] posture). Not
  overruled: the supervisor implemented the engine directly from the agent's grounded plan. The
  scripts agent (new files only) delivered both toolkit scripts.
- **Commits:** `8ad3b24` (feature, sw v33) + this wrap-up. **Pushed together with the 3 waiting
  commits** (`4c76f84` fixes, `139c38b`, `b1fa04a` spec) on her "push it all". **Live-verified:**
  sw serving `relefela-v33`/`relefela-audio-v3` with builder-bank.js precached; builder-bank.js
  200 at byte-identical 16 949; engine present in live index.html; **`u1l7-08.mp3` now 37 293
  bytes (the session-28 revert, finally live)**; content.js serving the `∅/di-` fix. The
  session-28 "get the push go-ahead" blocker is closed. `toolkit/recording-sheet.docx` remains
  deliberately uncommitted per the session-25 ruling.

### Session 30b (same day) — scaffolding after real play (sw v34, SHIPPED)
She played more and hit the wall the no-reveal design built: one sentence, ~10 tries, no way
out. Her ask, verbatim intent: reveal the answer after 3 misses, plus a help button that
reviews the words. "This is extremely difficult, so I need some more scaffolding." Both built
and shipped same hour:
- **3rd miss reveals the sentence** (`accept[0]`, plus "also accepted" for multi-accept
  entries) with a Continue button. Deliberately NOT marked done and no XP — a revealed prompt
  comes back fresh next run, so the reveal is a ladder rung, not a completion.
- **🛟 "Review the words" button** on every prompt (next to Skip): toggles a panel listing the
  entry's `usesIds` cards — tsw, eng, 🔊 clip where voiced — existing content.js data only, no
  new Setswana. No penalty for using it.
- sw `relefela-v33 → v34`; AUDIO_CACHE untouched. Verified in `?local=1`: help panel lists the
  right words with the right number of 🔊 buttons and toggles off; 3 misses → reveal with input
  disabled, not-done, 0 XP; Continue advances; revealed prompt fresh next run; normal correct
  path unaffected; harness still 17/17; 0 console errors; test state wiped.

### Session 30c (same day) — reveals auto-file to her tutor (sw v35, SHIPPED)
Her ask while playing: track what she keeps getting wrong so the SECL121 tutor sees it ("I keep
forgetting what go is"). Built on the reveal path: **a 3-miss reveal auto-inserts a
`tutor_questions` row** — prompt, her three typed attempts verbatim (the diagnostic gold), and
the accepted answer(s) — `context: 'builder-auto:<entry-id>'`. No schema change: reuses the
session-22 table the tutor session already reads first thing. Gated exactly like the tutor fab
(megzieberr only, never LOCAL_MODE, signed-in only); best-effort fire-and-forget (a failed
insert drops silently — telemetry, not learner data); deduped one row per sentence per day via
`rl_builder.filed`. sw v34 → **v35**. Verified: mocked-insert node tests (all three gates file
nothing; her account files once, deduped, correct table/user_id/context; blanks kept as
"(blank)"), local-mode reveal path unaffected with `sb` null, 0 console errors. ⚠️ For the next
tutor session: rows with `context` starting `builder-auto:` are auto-filed struggle reports, not
questions she typed — read the attempts for the pattern (e.g. which word is missing every time).

## Next up (agreed 2026-07-26, end of session 30)
1. ~~📱 play the Sentence Builder~~ **DONE same day** — she played it on live: "it works nice."
   Then real play surfaced the difficulty wall → session 30b's scaffolding (above). Watch for:
   is 3 misses the right reveal threshold, and is the 🛟 word list enough, or does she want the
   model sentences (the `note` frames) in there too?
2. Future bank waves: run `toolkit/gen-builder-candidates.py` for drafts → human source-check →
   append to builder-bank.js → `verify-builder-bank.py` → ship (content-only, one sw bump).
3. Carry-overs unchanged from sessions 27–29: `u2l1-07` "nko" re-record (low), ear-check the 131
   native clips, Daily Quest first-use feedback, more chat scenarios spec-first, u5l4 Smart Guide.

## Session 29 (2026-07-26, same day) — Sentence Builder spec (nothing built)
Mid-tutor-session today Megan hit a real gap: building her OWN Setswana sentences from known
vocab is far harder than the app currently drills, and barely practiced — every existing exercise
either recognises an app-authored sentence or reproduces one from memory, never makes her produce
a new combination herself.

- **Her explicit ruling (unprompted, first pass):** NOT free-typed input graded by a live grammar
  parser (false-negative risk on correct-but-unexpected phrasing) — a bank of pre-planned
  sentences, each independently checked against source before it ships, graded by simple matching.
- **`SPEC-sentence-builder.md` written** (root, sibling of `SPEC-katse-chat.md`): a new
  `builder-bank.js` content file (script drafts candidate sentences from existing concord/verb/
  noun combos, human checks each against `GRAMMAR.md`/`sentence-bank.tsv`/the corpus before it
  ships, a verifier script cross-checks ids), a standalone entry point next to `💬 Bua le Katse`
  gated the same way (`usesIds` learned via real SRS reps), **no SRS writes** (own local
  `rl_builder` key — grading several ids at once would distort `srsGrade()`'s interval math for
  common concords), and `accept` lists of pre-checked correct sentences per prompt (more than one
  listed where more than one is genuinely valid — her own drill surfaced *ga ke na buka* vs
  *ga ke na le madi* for "I don't have —").
- **Revised same session:** first draft proposed word-tile tapping (reusing Bua le Katse's chip
  UI). Megan's call: **tiles pose no real challenge — she wants to type the sentence herself.**
  Spec rewritten — `accept` now stores full sentence strings (not tile sequences), input is a
  typed text field (reusing the `dictate`/`typeTsw` card pattern), grading is `norm()` + the
  existing small Levenshtein spelling tolerance against the pre-checked strings — word order still
  has to match one of the listed `accept` strings exactly; nothing is inferred live. Tile pool and
  distractor-authoring are gone from the design entirely.
- **4 open questions left for her ruling** (spec §9): v1 bank size (u1–u2 only, recommended),
  grouping (one continuous pool vs named sets — continuous recommended), spelling tolerance
  (keep the same small typo allowance as other typed cards — recommended), and whether the
  script-drafts/human-checks/verify-script pipeline in §2 is the process she wants.
- No files besides the spec and this status file touched; no commit made this session (spec isn't
  code — nothing to ship yet).

## Next up (agreed 2026-07-26, end of session 29)
1. 💻 Megan reads `SPEC-sentence-builder.md` and rules on its 4 open questions (§9) — first thing
   next Re:Lefela session, before any building starts.
2. Carry-overs unchanged from session 28 (below): the `4c76f84` push go-ahead is still the
   standing blocker, unrelated to this session's spec work.

## Session 28 (2026-07-26) — two confirmed content bugs fixed (sw v32/audio v3, NOT YET PUSHED)
Both bugs came in via the app's own 💬 Ask-your-tutor button — Megan flagged them mid-drill, they
landed in `tutor_questions`, and this session found them independently confirmed (she'd described
both precisely) before touching anything.

- **`content.js` `u2l1-00` (body-parts noun-class rule card):** the fourth example read `9/di-
  (tsebe → ditsebe)`, a stray class-number label — class 9 nouns take no visible singular prefix
  (`tsebe` stays `tsebe`), unlike the other three examples which show a real prefix pair. Changed
  to `∅/di-` so all four follow the same prefix/prefix pattern. One-line fix.
- **`audio/items/u1l7-08.mp3` ("Ga ba bue Sekgoa" = "They don't speak English") reverted.** The
  session-27 native-speaker wave (`aef9982`) overwrote this file with a bad take — Megan confirmed
  by ear it doesn't say "ba" (sounds like "ki"/"kee" instead), checked against known-good "ke" clips
  from the same speaker (`u1l7-06/07`). Reverted to the session-17 version (`7d3f447`, 37293 bytes,
  the last known-good take) via `git checkout 7d3f447 -- audio/items/u1l7-08.mp3`. Confirmed via
  `git diff --cached --stat` that only this one file changed (11949 → 37293 bytes back).
- **`sw.js`: `relefela-v31 → v32`** (content.js changed) **and `AUDIO_CACHE relefela-audio-v2 → v3`**
  (existing clip bytes changed under the same filename) — both bumps needed since this session
  touched both an app-shell file and existing audio bytes.
- **Verified in preview** (`?local=1`, SW unregistered + caches cleared): `content.js` serves the
  `∅/di-` text; `u1l7-08.mp3` fetches 200 at 37293 bytes (matches the reverted file on disk); 0
  console errors.
- **Both matching `tutor_questions` rows marked `addressed_at`** (ids `02594c05…` "random 9 here?"
  and `ab6c6910…` on `u1l7-08` — she'd filed both herself, independently confirming the diagnosis).
- **Commit:** `4c76f84`, local only — **not pushed**, no go-ahead given yet this session (see Pending
  below). `toolkit/recording-sheet.docx` remains its own unrelated uncommitted local edit, untouched,
  per the standing session-25 ruling.
- Session then moved into SECL121 tutor mode per her ask — briefly opened a drill round grounded in
  her real SRS weak spots (`go nwa`, the `kae`/`kwa` cluster in `u1l2-06/07/08`, `Ga ke tlhaloganye`)
  before she said she'd already started drilling in another session.

## Next up (agreed 2026-07-26, end of session 28)
1. 💻 **[blocking] Get her explicit go-ahead to push `4c76f84`** — it's committed locally but not
   pushed; live app is still serving the buggy `9/di-` text and the bad `u1l7-08` recording until
   this goes out. Once pushed, live-verify per the usual ritual (sw serving v32/audio-v3, u1l7-08
   fetching the reverted byte size).
2. Carry-overs unchanged from session 27: `u2l1-07` "nko" still the one un-re-recorded card
   (low priority); the 131 new/re-recorded clips from the native-speaker wave still await an
   ear-check pass; Daily Quest first real-use feedback; "Le kae?" (chat0) first real play; more
   chat scenarios spec-first; the Smart Guide for u5l4's real maele.

## Session 27 (2026-07-25) — native-speaker recording wave: 68 voiced, 63 re-recorded (sw v31, SHIPPED)
The outsourced Setswana L1 speaker's recording landed as `missing audio/Missing Words.wav`
(~9 min, 50MB) — a single combined take reading `toolkit/recording-list.json`'s 132-item sheet
in order, no corrected word list this time (Megan asked; none came back — her call: tag what's
there, flag/skip anything that sounds different rather than guess).

- **Built the `★ Missing Words (native)` lesson pipeline**, same shape as ★ Food/★ Numbers/★
  Animals: wav copied into `corpus/audio/`, a new `toolkit/slice-lessons.py` entry (166 segments
  over 549s, 25 splittable), and `tagger.html` wired with `SYNTH_MISSING_IDS` — the 132 candidate
  ids in **recording-list.json's exact order**, verified byte-for-byte by script before use.
- **New tagger.html capability: leftover-carve-out (local-only, gitignored — not committed).**
  Megan hit a case with no ✂ Split boundary at all: the speaker read "Nnyaa, ga ke na mathata"
  straight into "Ga ke batle tee" with no gap, so ffmpeg's fine pass found nothing to split on.
  Narrowing the Trim sliders to bound just the first phrase was silently discarding the second —
  Join only pulls the *next* segment forward, there's no backward join. Fixed by changing `tag()`
  so a narrowed trim on an `action:'item'` tag carves whatever's outside `[trim.s, trim.e]` into a
  new `state.leftover` entry, spliced back into the live queue immediately after the segment it
  came from (`buildQueue()` now does this splice pass every rebuild, so it survives reloads). Given
  a synthetic `sub` suffix (`lo1`/`lo2`) so export's `(lesson,seg,sub)` dedup key can't collide with
  the parent tag. Verified end-to-end in a Node simulation before handing back (parent tag, leftover
  spliced at the right queue position, both survive to export with distinct keys) — confirmed
  working live: "Ga ke batle tee" recovered cleanly as `u1l7-07`.
- **Tagged 131 of 132 in one pass, 0 mismatches** — every word "sounded like it was written," her
  words. `u2l1-07` "nko" was the only gap: the speaker skipped it (no tag, no explicit skip marker),
  and since it already carries an existing clip, Megan's call was to leave it exactly as-is rather
  than chase a re-read this round — it's the one remaining `missing-audio.md` §2 entry.
- **Downloaded mapping audited before adopting** (the standing gotcha — tagger downloads have been
  partial snapshots before): this one was clean — 131 item tags + 7 junks, 0 duplicate itemIds, 0
  stray extras, and critically **no trace of the recurring lesson-"90"/NCHLT landmine** that bit
  sessions 23/24. Saved verbatim as `toolkit/audio-mapping-session27.json` (sorts last, wins).
- **Export: 68 new clips + 63 byte-changed clips**, confirmed by md5 of every file in `audio/items/`
  before/after (not guesswork). `content.js`: **307/307 real items now have `audio:` — 0 silent,
  the first time this has ever been true** for the whole app. 0 duplicate ids, 0 orphan files, 0
  missing refs, LF-only/no BOM confirmed. `toolkit/missing-audio.md` regenerated: 0 silent, 1
  re-record (nko), 8 reuse — exact match.
- **This was the flagged AUDIO_CACHE-bump case** (per the standing warning since session 24): 63 of
  the clips overwrite existing filenames, so `sw.js` bumped **both** `relefela-v30→v31` (content.js
  changed) **and** `AUDIO_CACHE relefela-audio-v1→v2` (existing bytes changed under the same names).
- **Verified in preview** (`?local=1`, SW unregistered + caches cleared first): sampled 7 clips
  spanning old/new/re-recorded (incl. "Nnyaa, ga ke na mathata," "Ga ke batle tee," and the
  untouched `u2l1-07`) — all fetch 200 with real byte sizes; sw.js confirmed serving the bumped
  version strings; 0 console errors.
- **Housekeeping folded in:** the `missing audio/enhance-bot/` deletion (ruled 2026-07-19, had sat
  uncommitted since) is now committed. `toolkit/recording-sheet.docx` stays local-only, untouched,
  per the session-25 ruling.
- **Commit:** `aef9982`. Pushed to `main`; live verified (`sw.js` serving `relefela-v31` /
  `relefela-audio-v2`, sampled clips 200).

### Is Re:Lefela "complete"?
Not as a whole app — it's a living tool tied to the ongoing SECL121 semester, and the roadmap
below (chat scenarios, Smart Guide, Daily Quest real-use feedback) is still open. But the **audio
coverage** — the thread running through a dozen sessions — genuinely is: every real card in the
app now has a voiced clip, for the first time. That milestone is done.

## Next up (agreed 2026-07-25, end of session 27)
1. **`u2l1-07` "nko"** is the one card left on the re-record list — low priority, fold into
   whenever a next native-speaker batch happens (no rush; her existing clip works fine).
2. **Ear-check the 131 new/re-recorded clips** via the tagger's 🎧 panel — none have been
   listened back yet post-export.
3. Carry-overs unchanged: **Daily Quest** first real-use feedback (does 10 rounds feel right,
   does weakest-first feel punishing), **"Le kae?" (chat0)** first real play, **more chat
   scenarios** spec-first (pronoun-drilling next, once she finishes u1l4), and the **Smart Guide**
   for u5l4's real maele.

## Session 26 (2026-07-19) — answer-matching bug fixed + the Daily Quest (sw v30, SHIPPED)
She opened the app on her phone, typed **`she/he`** for `ene` ("he / she") and got marked wrong.
Screenshot in chat. Two independent faults, both real, both fixed; then her second ask, merging
Review into a daily quest.

### 1. The grading bug — 46 cards affected, not one
- **`norm()` DELETED punctuation instead of spacing it.** `"she/he"` normalised to the single
  nonsense word `"shehe"`, so it could not possibly match `"he she"`. Now `/` and hyphens map to a
  space; apostrophes still vanish, so `"what's"` and `"whats"` stay the same word.
- **`answerMatches()` compared whole strings**, so even spaced correctly it demanded the author's
  ordering. It now treats a slashed English gloss as an **alternative set**: split the RAW string
  (by grading time `norm()` has already eaten the slashes), then accept any one alternative or any
  combination in any order via new `altOrderings()` — every ordering of every non-empty subset,
  15 strings for 3 alternatives, 64 for 4. Generosity is deliberate: the card tests whether she
  knows what the word MEANS, not whether she reproduced the gloss list in the author's order.
- **Blast radius was 46 of 307 cards** — `nna` "I / me", `rona` "we / us", `letsogo` "arm / hand",
  `mpa` "stomach / belly", `tala` "green / blue", every "He/she …" sentence. Anyone typing the
  second alternative first, or only one of them, was marked wrong and **had the card lapsed by the
  SRS**. Those cards will surface early in her first Daily Quests, since it fronts the most-lapsed
  words — expect a stretch that feels like it is deliberately serving the words the bug punished.
- **Setswana grading provably unaffected:** no `tsw` string in the app contains `/` or `-`
  (checked: 0 of 307), all 307 still self-match `exact`, and **0** distinct-`tsw` pairs newly
  collide. The chat matcher's tokenised `norm()` use at the `zzslotzz` frames is unaffected too.

### 2. Review → Daily Quest (her ask: "merge the review and daily quest")
The due-items-only Review button is **gone**, replaced by a Daily Quest that **swallows** it.
- **Fixed 10 rounds** (`DAILY_ROUNDS`). `dailyPool()` takes everything the SRS says is due,
  **most-overdue first**, then tops up to 10 from `learnedItems()` — everything she has ever met —
  **weakest first** (most lapses, then fewest reps). Shuffled BEFORE that sort so equally-weak
  words rotate day to day rather than the same ten returning forever.
- **Why the merge is the right shape:** doing the quest IS doing the reviews, so neither can be
  missed by choosing the other. The old button only *existed* when something was due, which meant
  quiet days offered no daily habit at all — the exact gap a daily quest is for.
- All rounds are `type:'auto'`, so `pickAutoType` picks off the existing ladder (tap/choose/listen/
  dictate/typing/speaking, reps≥3 gates intact) and cards **grade and reschedule exactly as Review
  did**. No recapPool is passed, so `buildExercises` returns exactly one card per item — the "10
  rounds" on the button is the 10 the progress counter shows.
- **Once a day for the bonus, never a lockout:** first completion pays **+25** and shows "Daily
  Quest done — *Letsatsi le letsatsi*"; further runs still earn per-card XP and still reschedule
  cards, at **+10**, with an "extra practice" line. XP kinds `daily-done` / `daily-extra`.
  `firstDaily` is read BEFORE the `rl_daily` store write — that ordering is what makes it true once.
- Button carries the due count as a sub-label so the absorbed review is visibly still happening,
  and goes ghost with ✓ once done. Shown once ≥4 words are learned. **Both accounts** (not
  Megan-gated) and works in `?local=1`. Flavour strings reused from content.js (`Gape!`,
  `Letsatsi le letsatsi`) — **no new Setswana invented**.
- New **`rl_daily`** key (device-local, `{date, done}`) added to `clearLearnerState()`.

### Verification
- **Node harness over the real content.js + the real functions lifted out of index.html**
  (`scratchpad/test-answers.js`): all **46** alternative-gloss cards accept every single
  alternative, the full gloss, and both reversed orderings — **0 rejections**; 9 regression
  controls unchanged (`dumelaa`→close, `goodbye` vs `hello`→null, `whats`→exact, `cat` vs
  "he / she"→null); 307/307 `tsw` self-match; 0 cross-card exacts. index.html main script
  re-parsed with `new Function()`.
- **In preview (`?local=1`, SW unregistered + caches + localStorage cleared first)**, against a
  seeded 25-word learner with 4 overdue and 1 heavily-lapsed: **300 `dailyPool()` draws** returned
  **exactly 10 every time**, **never a duplicate**, **never once missed a due item**, always
  included the lapsed word, and rotated across all 25. Full playthrough: 10 varied card types,
  header `1/10`, no part pill, **+125 XP** (10×10 + 25) and the daily finish line; **second run
  +110** with the extra-practice line and `rl_daily.done` → 2; day-rollover (`date` = yesterday)
  correctly re-arms the bonus; a brand-new learner sees **no button** and `startDaily()` is a safe
  no-op; 375×812 two-line button fits with no horizontal overflow; **0 console errors**; test
  localStorage wiped afterwards.
- **`sw.js` v29 → v30. `AUDIO_CACHE` untouched** (`relefela-audio-v1`) — correct, no audio byte
  changed. LF-only and BOM-free confirmed by binary read on both files (the standing hazard).
- **Live-verified after push:** live `sw.js` serves `relefela-v30` with `AUDIO_CACHE` still
  `relefela-audio-v1`; live `index.html` is **byte-identical to local** (117 902 B) with
  `startDaily`/`altOrderings`/`DAILY_ROUNDS`/`dailyPool`/`b-daily`/`rl_daily` all present and
  **0** occurrences of `startReview`/`b-review`.
- **Commit:** `ac7aa92`. Pushed to `main`; live verified. (`toolkit/recording-sheet.docx` remains
  deliberately uncommitted per the session-25 ruling.)

## Next up (agreed 2026-07-19, end of session 26)
1. **She plays the Daily Quest** — first real-use feedback on whether 10 rounds is the right
   length, and whether the weakest-first top-up feels punishing or useful. Also the first honest
   read on the 46 un-lapsed cards working their way back through the SRS.
2. **"Le kae?" (chat0) still awaits its first real play** — carried unchanged from session 25.
   "Dumela, Katse!" unlocks when she finishes u1l7; the picker says so itself.
3. **More chat scenarios, spec-first, one per unit theme** — a pronoun-drilling one once she
   finishes u1l4 "Nna le wena" is the natural next (her explicit struggle, and the same pronoun
   family as today's `ene` bug).
4. Carry-overs unchanged: the **native-speaker recording wave** (⚠️ the one that DOES need
   `AUDIO_CACHE` bumped — pending items -11/-10), and the **Smart Guide** for u5l4 maele.

## Session 25 (2026-07-18, same day) — "Bua le Katse" scripted chat (sw v28, SHIPPED)
Megan's ask: "like an AI chat bot… but only in Setswana and only using the words I have learned…
it can throw in a new word here or there that I can pick up on context." Her explicit ruling:
**scripted, no LLM** — chatbot *feel*, deterministic underneath, R0. Spec-first
(`SPEC-katse-chat.md`, committed) with her "looks good" approval, then built same-session.
- **New `dialogues.js`** — `RL_DIALOGUES`, same provenance bar as content.js (every line carries
  `src`). Scenario 1 **"Dumela, Katse!"**: greetings → how-are-you (with the u1l1-13 bounce-back
  branch) → names (ask-menu lets HER question Katse: O mang? / A o tswa kwa Botswana?) →
  where-from → coffee beat → goodbyes. Only compositions: combined-src per the u1l7-07 precedent
  ("Ee! Ke tswa kwa Botswana.", "Ga ke batle kofi") and note-sanctioned slot frames (u1l2-01
  name swap, u1l2-10 place swap). **Audio only on verbatim voiced cards** — 15 clips, ALL
  pre-existing, so `AUDIO_CACHE` stays `relefela-audio-v1`. ⚠️ One agreed nuance: chat lines may
  add terminal `!`/`.` the card lacks ("Ke a leboga!" vs card "Ke a leboga") — the spoken words
  never differ, dialogues.js header documents it.
- **Engine in index.html** (~250 lines, `chat*` functions after the gym section):
  - **Vocab gating is the core:** scenario unlocks only when every id in its `requires` (13 ids)
    has `state.srs[id].reps >= 1`; Katse variants with an unlearned `uses` id never draw; the
    home button (`💬 Bua le Katse`, under the gym button) is hidden entirely until unlocked.
  - **Stretch word** (the "new word from context"): scenario declares it (`eng`, from u2l3-06);
    renders dotted-underlined in Katse's bubble, tap → gloss reveal, recorded in `rl_chat` —
    **NO SRS write** (keeps the reps≥3 typing gate honest).
  - Input dock: chips (tap-card style, pool = accepted-answer words + name/place chips + 3
    distractors) ⇄ free typing (`answerMatches` + frame token matching, close-match advances
    with a spelling toast). Fallback: **"Ga ke tlhaloganye."** (u1l7-05, voiced) + the question
    restated; 2nd miss adds the 🐾 hint and narrows chips to answer words only — no dead ends.
  - XP through the normal queue: +2/turn (`'chat'`), +10 complete (`'chat-done'`). `rl_chat`
    (done ✓, stretchMet, input-mode pref) is device-local cosmetic state, added to
    `clearLearnerState()`. Available to both accounts AND `?local=1` — not Megan-gated.
    Chat sets `currentScreen` so Ask-your-tutor context works mid-chat.
  - Dock left-pads 60px to clear the tutor 💬 fab (12+44+4).
- **sw.js v27 → v28**, `dialogues.js` added to CORE precache.
- **Verified** (`?local=1`, SW unregistered + caches cleared, test state wiped after): full
  conversation both input modes incl. the bounce branch, both ask-menu questions + re-click
  guard, fallback ×2 with pool narrowing 12→9, gate lock/unlock with doctored srs, all 15 clips
  200 + word-level text/audio match, chips-built turn advances, 375×812 no overflow + dock/fab
  clearance + autoscroll, busy-flag double-submit guard confirmed (a too-early submit is
  swallowed, not double-graded), 0 console errors. **Live-verified after push:** sw serving
  `relefela-v28`, dialogues.js 200 at matching byte size, engine + button present in live
  index.html, AUDIO_CACHE untouched.
- **Ruling recorded: `toolkit/recording-sheet.docx` stays LOCAL** — her Word re-save
  (44 994 → 39 148 bytes) is deliberately uncommitted and must NOT be committed; expect the
  portfolio sweep to keep flagging it as modified. (Consequence of the session-24 warning: her
  edited copy ends the no-drift guarantee, so the committed version stays the canonical one.)
- **Commits:** `b923ef6` (feature + spec, sw v28) · plus this wrap-up. Pushed; live verified.

### Session 25b (same day) — scenario 0 "Le kae?" + picker (sw v29, SHIPPED)
Megan opened the live app and couldn't see the chat. Root cause (from her real Supabase data):
she is on **u1 lesson 4** — chat1 requires u1l6-09 / u1l7-05 which she hasn't reached — and the
spec's "hidden until unlocked" rule made the locked feature invisible. Her ask: a more basic
scenario for the early lessons, specifically kwa/kae and pronouns ("I haven't gotten smart in
Setswana yet"). **Implementation delegated to a supervised Sonnet agent** (her instruction) with
the full scenario data verbatim in the brief — zero Setswana decisions left to the agent; diff
reviewed line-by-line + independently re-verified after.
- **`chat0` "Le kae?"** (first in RL_DIALOGUES): u1l1–u1l3 vocab ONLY (all 39 cards learned on
  her account, reps 3–6), so it unlocked for her at ship time. Deliberately drills her actual
  weak spots — the lapsed cards `A o tswa kwa Amerika?` (2 lapses), `O mang?`, `O tswa kae?` —
  and the **kae-asks / kwa-answers** pattern (she asks Katse `O tswa kae?` herself via the
  ask-menu; `Wena o tswa kae?` → `Ke tswa kwa {place}`). The `Ee` answer to "A o tswa kwa
  Amerika?" is accepted with a cheerful `Go siame!` (wrap-ee branch). Two composed lines only
  (`Wena o mang?`, `Wena o tswa kae?`), both halves attested in her learned cards, combined-src.
- **Stretch = the engine's own fallback phrase:** `Ga ke tlhaloganye` (u1l7-05) is chat0's
  declared stretch word — phrase-level, the existing regex marks it inside the fallback bubble,
  tap → gloss + "you'll drill it in lesson 7". No engine change needed; the fallback line goes
  through `chatBubble` like any Katse line. Neat precedent for using out-of-vocab engine lines.
- **Scenario picker (`screenChatPick`)**, replacing straight-into-chat: unlocked scenarios
  tappable (✓ when done), **locked ones VISIBLE** with `🔒` + "Katse needs you to finish
  '<lesson>' first" via new `chatUnlockHint()` (first unlearned `requires` id → its lesson
  title). Home-button ✓ now means "all unlocked scenarios done". **The spec §4 fully-hidden rule
  is revised** — she shipped a feature and couldn't find it; hidden-when-NOTHING-is-unlocked
  remains.
- **Verified against a replica of her exact SRS state** (u1l1–l3 learned, nothing else): picker
  shows chat0 unlocked + chat1 locked with the correct "Ke a ja!" hint; full chat0 walk incl.
  all three amerika branches, the lekae/howru bounce branches, fallback stretch reveal, XP exact
  (+2×8, +10); chat1 open-regression pass; parse/LF/BOM checks pass; 0 console errors.
  **Live-verified: sw serving `relefela-v29`**, dialogues.js byte-match, AUDIO_CACHE untouched.
- **Commit:** `7823a8b` (chat0 + picker, sw v29).

## Next up (agreed 2026-07-18, end of session 25)
1. **She plays "Le kae?" on the real site** (unlocked for her NOW) — first real-use feedback on
   pacing, difficulty, chip pool size, English-peek discoverability. "Dumela, Katse!" unlocks
   when she finishes u1l7 "Ga ke itse!" (the picker tells her so itself).
2. **More scenarios, spec-first, one per unit theme** (spec §9 Q5 roadmap): Mmele (u2),
   Mo sekolong (u3), Go ja dijo (u4), Diphologolo (u5). Each maximises voiced-card overlap;
   variant pools per Katse turn are where replay value comes from. A pronoun-drilling scenario
   once she finishes u1l4 "Nna le wena" is the natural next one (her explicit struggle).
3. Sessions 23/24 carry-overs unchanged: native-speaker recording wave (⚠️ AUDIO_CACHE bump
   needed on that one), Smart Guide for u5l4 maele.

## Session 24 (2026-07-18, same day) — ★ Food wired (sw v27, SHIPPED) + native-speaker recording sheet
The session-23 "Next up" item 1, executed: Megan tagged ★ Food in the tagger and handed over the
download. Then, mid-session, she found someone willing to record the rest — so the second half of
the session produced the hand-over document for that.
- **8 of the 10 `u4l1` food cards voiced (sw v27, SHIPPED)** — `dijo`, `borotho`, `metsi`, `mashi`,
  `mae`, `namune`, `dinawa`, `letswai`. `u4l1` now builds **9 `listen` cards** where it previously
  had none (listen cards only exist for voiced items), verified via `buildExercises` in preview.
  - Her download `relefela-audio-mapping-round2 (16).json` was **NOT adopted wholesale** — partial
    snapshot again (**99 item-tags vs 157** across the committed files, 73 missing), the documented
    regression pattern, now four downloads running. Only the 8 ★ Food tags were lifted, into a new
    own-file **`toolkit/audio-mapping-session24.json`** (sorts last, wins; committed files untouched).
  - ⚠️ **The NCHLT landmine reappeared and was excluded a SECOND time.** The same 7 tags on lesson
    `"90"` / `nchlt-words.mp3` (`u1l5-01/02`, `u2l1-01/05/06/10`, `u2l2-01`) that session 23 caught
    are still in her tagger's localStorage and will keep coming back in **every** future download.
    Those 7 cards carry her own enhanced recordings (externally managed); adopting the tags would
    make them mapping-managed and re-cut them from an NCHLT source, **overwriting her voice**.
    Documented again in the new mapping file's `note`. Treat this as permanent: check lesson `"90"`
    on every download.
  - **`u4l1-02` (nama) and `u4l1-08` (merogo) carry no tag anywhere** in the Food recording — all 35
    segments are accounted for as 8 items + 27 junk — so they stay silent and went onto the
    recording sheet. Worth one look in the tagger before the speaker records them: if they ARE in
    the recording, that's a cheap re-tag rather than a re-record.
  - **Export clean:** 223 → 231 files, **0 existing bytes changed, 0 deleted, exactly 8 new** (md5
    of every clip before/after), so `AUDIO_CACHE relefela-audio-v1` correctly NOT bumped. 239 refs /
    231 unique files, 0 orphans, 0 missing, 0 duplicate ids across 412 ids.
  - **Verified in preview** (`?local=1`, SW unregistered + caches cleared): all 8 fetch 200, mono,
    decode; durations match the tag ranges to the millisecond (`u4l1-01` 3.331→4.332 = 1.001s), all
    1.00–1.54s, well under the 5.2s Katse ceiling. 0 console errors, no test state persisted.
    **Live-verified after push:** `sw.js` serving `relefela-v27`, `AUDIO_CACHE` still
    `relefela-audio-v1`, all 8 clips 200 at byte sizes matching local, content.js serving all 8 refs.
- ⚠️ **BUG FOUND AND FIXED — `export-item-audio.py` was rewriting ALL of content.js to CRLF.**
  `Path.write_text()` defaults to `newline=None`, which on Windows translates every `\n` to `\r\n`
  — so a run that changed 8 lines silently flipped **606 of 606 lines** to CRLF, against the file's
  LF-only convention. **`core.autocrlf=true` hid it completely**: `git diff` showed a clean 8-line
  diff. This is the same class as the session-20 PowerShell `Set-Content` BOM/CRLF incident, which
  is why it was checked for at all. Fixed with `newline='\n'` plus a comment explaining why it is
  not cosmetic; file normalised and the export re-run to confirm the fix holds and is idempotent.
  ⚠️ **Method note:** Git Bash `grep`/`tr` **strip CR bytes** and will report the file as clean when
  it is not. Only a **binary** read (`open(...,'rb').read().count(b'\r')`) tells the truth.
- **`toolkit/missing-audio.md` regenerated:** **68 silent** (was 76), **64** flagged for
  re-recording, **8** reuse cards free. Cross-checked against the app's own `RL_CONTENT` via Node:
  **307 real items / 68 silent / 8 reuse — exact match**, so the generator has not drifted.
- **NEW `toolkit/recording-sheet.py` → `recording-sheet.pdf` + `recording-list.json`.** A
  hand-to-the-speaker PDF built from content.js, so the sheet cannot drift from the app. Scope is
  the same data `missing-audio.py` reports, merged into ONE continuous reading order: **68 silent +
  64 re-record = 132**. The 8 reuse cards are excluded on purpose (they play another card's clip and
  are fixed for free when the source is re-recorded). 9 pages: a plain-English brief, recording
  instructions, the numbered list grouped by lesson (Setswana / English / empty **Notes** column),
  and a Megan-only appendix mapping recording number → card id, marked `new` vs `redo`.
  - **The instructions are derived from `slice-lessons.py`'s REAL thresholds** (`NOISE_DB -30dB`,
    `MIN_SILENCE 0.35s`, `MIN_SEG 0.4s`), not generic advice. Her own recordings measured **−29 to
    −31 dB between words — right at the detection threshold**, which is precisely why Food.mp3
    produced merged segments needing ✂ Split. So the sheet leads with **a quiet room mattering more
    than a good mic** and asks for a **~2 second pause**. It also asks for **Setswana only** (reading
    the English aloud is what turned Food's 10 words into 35 segments, mostly junk), **no silent
    corrections** (use the Notes column — otherwise clip and card disagree, violating the session-13
    never-wire-a-mismatched-clip rule), and **no skipping** (the numbering is what maps segments back
    to cards; say the number aloud instead).
  - **`recording-list.json`** is the same 132 items in recording order with card ids — the exact
    shape the tagger's `SYNTH_*_IDS` list needs, so the bubbles can be seeded in order rather than
    matched by hand when the audio lands.
  - **Two rendering defects found by actually inspecting the rendered PDF, not trusting the build:**
    `p{}` columns top-align on each column's own first baseline, and since the Setswana column is
    11pt while `#`/English are `\small`, the three cells of one row visibly sat on different lines
    (→ `m{}`); and every Unit-1 lesson displayed the unit title "Go dumedisa!", so four consecutive
    headings read the same and looked like a bug (unit title dropped from the heading). Verified all
    132 items, all 132 appendix ids, and both `š` glyphs render. `recording-sheet.tex` is
    gitignored (regenerable build artifact); the PDF is committed because it gets handed over.
- **Word copy added on request.** `recording-sheet.py` now emits **`recording-sheet.docx`** as well,
  from the same `rows()` in the same run, so the two documents cannot drift from each other or from
  content.js. Real Word styles (`Title`, `Heading 1`, `List Bullet`, `Table Grid`) so she gets the
  Navigation pane and can restyle in one go. ⚠️ **Once she edits it, the no-drift guarantee ends:**
  adding, removing or reordering words breaks the numbering that `recording-list.json` and the
  appendix depend on, and tagging would mis-map. The appendix note in the doc says so; if she edits,
  regenerate the mapping from her edited list rather than trusting the committed JSON.
  (`docx` npm was unavailable in this environment; built with **python-docx**. No LibreOffice or
  `pdftoppm` either, so the .docx was verified structurally — 159 + 133 table rows, all 132 items
  and ids present, numbering 1–132, Notes column empty, `š` intact — not by rendering it.)
- **Commits:** `f5e4711` (8 food cards + CRLF fix + regenerated list, sw v27) · `c06e82e`
  (recording sheet + list + gitignore) · `46a58f7` (editable .docx copy). All pushed; live verified.

## Next up (agreed 2026-07-18, end of session 24)
1. **Hand `toolkit/recording-sheet.pdf` to the native speaker** and wait for the audio. Pending
   items -11 and -10 below carry the wiring procedure for when it arrives.
2. ⚠️ **That wave is the exception to the audio-cache rule.** 64 of the 132 overwrite existing
   `audio/items/<id>.mp3` filenames, so the export **WILL** change existing bytes and **WILL** need
   `AUDIO_CACHE` (`relefela-audio-vN`) bumped in `sw.js` — every recent wave has been new-files-only,
   where bumping it would have been wrong. Miss this and phones keep the old clips forever.
3. **Still outstanding regardless of audio:** the **Smart Guide** (for `u5l4`'s real maele and any
   Botswana-variant re-alignment) — see `toolkit/SOURCES.md`. `toolkit/autshumato-lookup.py` is
   available for verifying everyday phrasing when writing new cards.

## Session 23 (2026-07-18) — research → dictation card (sw v25) + own-voice audio wave (sw v26)
Megan had claude.ai produce two research reports (evidence-based solo language learning; free
authoritative Setswana resources) and asked what was worth adopting. Verdict: the app already
implemented most of the learning-science recommendations independently — SM2 spacing, the
recognition→production gradient (`typeTsw`/`record` gated at reps≥3), concord chunks, audio on
every card, and the Bible-register caution she'd already ruled on for `u5l4`. Genuinely new: a
dictation exercise, and a conversational-register corpus to complement the Bible.
- **NEW `dictate` card type (sw v25, SHIPPED).** Hear the native clip, type the Setswana, no target
  text in the DOM before grading. Joins the tier-2 auto-draw pool via `pickAutoType` alongside
  `typeTsw` — so it requires **audio AND reps≥3**, i.e. per **her explicit ruling** it can only
  appear after the word has already been drilled through tap/choose spelling exposure. Reuses the
  type-card machinery verbatim (one-shot `checked` flag, `answerMatches` + Levenshtein close
  tolerance, Enter with `preventDefault`, `grade()` for XP/SRS/reveal) and the `listen` card's
  no-spoiler markup; Katse plays the clip via the non-spoiling `katseSay('🎵 …')` branch. 22 lines
  in `index.html`; `grade`/`srsGrade`/`hookPlay`/`answerMatches`/`runRecap` untouched. Verified by
  500-draw gate tests (never drawn at reps=2 or on a silent item), correct/wrong/close paths, the
  double-fire guard, and 375×812 clearance against Katse and the 💬 fab.
- **Corpora on disk** (all in gitignored `corpus/`, ~77 MB): **Autshumato** EN–TSW parallel corpus
  (CC BY 2.5 ZA — 3 registers × aligned `.tn`/`.en` files, 159 000 line-aligned pairs), **NCHLT
  Setswana text corpus** (lexicon + 12 406-word frequency list + NER lists), and the **PanSALB
  orthography booklet** (51-page PDF; the "site blocks automated fetching" warning proved wrong,
  no manual download needed — but it carries no explicit reuse licence, so it's marked
  internal-reference-only). **Marothodi/PuoData deliberately NOT taken** — it mixes GPT-generated
  synthetic Setswana, which collides with the no-invented-Setswana rule.
  New **`toolkit/autshumato-lookup.py`**: grep a word, get aligned sentence pairs — the
  conversational-register sibling of the Bible parallel-chapter gloss trick. Test-driven on
  **wena** (her parked tutor question) and it returned exactly the everyday usage the Bible corpus
  can't show. Frequency sanity check: her vocab ranks high (thata #64, metsi #91, batla #129,
  sekolo #197, dijo #205 of 12 406).
- **20 cards voiced from her own recordings (sw v26, SHIPPED).** She recorded `Numbers.mp3` and
  tagged both it and the existing `Animals.mp3`. Wired all 11 `u4l3` numbers (lefela…lesome) and
  9 of 10 `u5l1` animals. **`u5l1-01 phologolo` has no clip — its segment was junked while
  tagging**, so it stays silent (only remaining animal gap).
  - Her download `relefela-audio-mapping-round2 (15).json` was **NOT adopted wholesale** — it is a
    partial snapshot again (91 item-tags vs 137 across the committed files, 73 missing), the
    documented regression pattern. Only the two native lessons were lifted, into a new own-file
    **`toolkit/audio-mapping-session23.json`** (sorts last, wins; committed files untouched).
  - ⚠️ **Landmine caught:** the download also carried 7 tags on lesson `"90"` / `nchlt-words.mp3`
    (`u1l5-01/02`, `u2l1-01/05/06/10`, `u2l2-01`) — leftovers of the reverted NCHLT experiment in
    her tagger localStorage. All 7 cards already carry her own enhanced native recordings, wired
    directly and therefore *externally managed*. Adopting those tags would have made them
    mapping-managed and re-cut them from an NCHLT source, **overwriting her voice**. Excluded and
    documented in the mapping file's `note` so a future session can't re-adopt them.
  - **Export clean:** 203 → 223 files, **0 existing bytes changed, 0 deleted, exactly 20 new**
    (md5 of every clip before/after) — so `AUDIO_CACHE relefela-audio-v1` correctly NOT bumped.
    content.js: 231 refs / 223 unique files, 0 orphans, 0 missing, 0 duplicate ids.
  - **`export-item-audio.py` fix:** forced utf-8 stdout. The `★` in the native lesson keys reaches
    the progress log through each job's `origin` label and killed the run under cp1252 **mid-export
    — after cutting clips, before writing content.js**. Same guard `slice-lessons.py` already had.
- **Tagger (local-only, gitignored) gained three things:**
  1. **★ Numbers (native)** — `Numbers.mp3` slices to 11 segments, 1:1 with the 11 number cards.
  2. **★ Animals fixed.** It was returning `[]` for candidates behind a comment reading "content.js
     has NO animal items yet" — **stale since Unit 5 was built in session 21**. It was falling back
     to showing corpus word *suggestions* (kudu, leopard, bear) she was never recording. Now shows
     the real 10 `u5l1` cards as bubbles; the suggestion pool survives **collapsed** as a fallback
     for a segment with no card. (This was her complaint, and she was right.)
  3. **★ Food (native)** — her food recording, laid out Peace-Corps-style (Setswana word, then its
     English translation), so 32 segments for 10 cards: tag the Setswana, junk the English, 7
     merged segments are splittable. Gaps measure 0.36–0.84 s, only just over `MIN_SILENCE`.
     **Thresholds deliberately NOT retuned** — that would renumber every Peace Corps lesson's
     segments and invalidate every committed tag. Verified after re-slicing: **all 1 187 existing
     tags still align, 0 misaligned.**
  4. **🎧 Ear-check panel** — plays exported `audio/items/*.mp3` clips with ✓/✗ verdicts in their
     own localStorage key, writes no tags, and prints the ✗ ids to report back. Used immediately:
     **she confirmed all 14 session-19 splices 100% correct** (closes the long-standing
     ear-confirm item, including the `Reetsa` / `didimala` question — resolved in Reetsa's favour).
     Now repointed at the 20 new own-voice clips.
- ⚠️ **A wrong call I made, corrected in-session — worth remembering as method.** I measured a
  single "gap" in each file and reported Numbers as clean (−91 dB) and Animals as music-laden
  (−29 dB), repeating the older sessions' claim. Both halves were wrong: the −91 dB reading was the
  file's silent lead-in, not a real inter-word gap. Measuring **every** gap, plus a **control** on
  the Peace Corps lessons we already ship, gave: Peace Corps **−18 to −21 dB**, Animals **−30 dB**,
  Numbers **−29 dB** — i.e. her recordings are ~10 dB *quieter* between words than the professional
  audio already in the app. **Megan then confirmed by ear: "Animals have no music, it's 100%."**
  The long-standing "Animals.mp3 carries background music" blocker was therefore false and is
  retired. Lesson: measure every gap and always measure a known-good control before declaring a
  defect.
- **`.gitignore` leak closed.** `missing audio/Raw/` and `Enhanced/` were ignored but **loose mp3s
  dropped straight into `missing audio/` were not** — her own voice recordings (Animals since
  2026-07-17, then Numbers and Food) were untracked but committable into a PUBLIC repo. Added
  `missing audio/*.mp3` and `tagger.html.bak-*`; all verified ignored.
- **`toolkit/missing-audio.md` is now script-generated** by new **`toolkit/missing-audio.py`**
  (was hand-maintained, so it drifted). Two lists: **76 silent** cards, and **64 flagged for
  re-recording** by a native speaker — yesterday's enhance-bot batch, which she judged poor quality
  on 2026-07-18 (staying wired meanwhile; this is an upgrade, not a gap), plus **8 reuse cards**
  that inherit those clips for free. The 64 are identified **structurally** — voiced but named by
  no tag in any mapping file = wired by hand = that batch — not from a hand-kept list. The doc
  flags that re-recording overwrites existing filenames and so **will** need `AUDIO_CACHE` bumped,
  unlike a new-files-only export. Two generator bugs were found by validating against the app's own
  `RL_CONTENT` and fixed: naive brace-matching dropped all 57 items carrying a nested `concordSlot`
  (the whole u3 paradigm among them), and rule cards counted as silent because they carry
  `tsw: ''` (empty, not absent — the app filters on truthiness, so the generator now does too).
  Output verified equal to the app: **307 items, 76 silent, 8 reuse**.
- **Commits:** `023a0bd` (dictation + autshumato-lookup, sw v25) · `f73093e` (Numbers slicing +
  gitignore fix) · `dbbeaed` (20 voiced cards, sw v26) · `aa971db` (Food slicing +
  missing-audio generator). All pushed; live verified serving `relefela-v26` with the new clips
  fetching 200.

## Next up (agreed 2026-07-18, end of session 23)
1. **Tag ★ Food in the tagger** (pending item -9) → hand over the download → lift only the new tags
   into `audio-mapping-session24.json` → export → ship. That voices the 10 `u4l1` food cards.
   Fold in **`u5l1-01 phologolo`** if she re-records that one word first (pending item -8).
2. **The 64-card re-record wave, whenever a native speaker is available** —
   `toolkit/missing-audio.md` §2 is the work list. ⚠️ That wave overwrites existing
   `audio/items/<id>.mp3` filenames, so unlike every recent export it **WILL** need `AUDIO_CACHE`
   (`relefela-audio-vN`) bumped in `sw.js`, or phones keep the old clips forever.
3. **Autshumato is now available for content work** — use `toolkit/autshumato-lookup.py` to verify
   everyday phrasing when writing new cards, alongside the Bible parallel-chapter trick. Still
   outstanding regardless: the **Smart Guide** (for `u5l4`'s real maele and any Botswana-variant
   re-alignment).
4. Optional/low stakes: ear-check the 20 new own-voice clips (pending -7); the "Ask your tutor"
   live test (pending -6).

## Session 22 (2026-07-17, same day) — "Ask your tutor" feature (sw v24, SHIPPED)
Megan's own ask, same session: she got stuck on "where do I use wena" mid-lesson today and had to
park it in WhatsApp for her next SECL121 tutor session. Built a hovering help button — like a
website's AI-help bot — that parks a question straight into Supabase instead, so her next tutor
session sees it immediately.
- **Migration (additive, applied via MCP, project `opacjlgljeippheotyhz`):** new `tutor_questions`
  table — `id uuid pk default gen_random_uuid()`, `user_id uuid not null references auth.users(id)
  default auth.uid()`, `question text not null`, `context text`, `created_at timestamptz not null
  default now()`, `addressed_at timestamptz`. RLS enabled; `insert`/`select` policies both `user_id =
  auth.uid()`; deliberately **no update/delete policy** — the tutor marks a question addressed via the
  Supabase MCP service role, which bypasses RLS, so a learner-facing write policy isn't needed.
  Existing 5 tables + their RLS/policies untouched — nothing dropped or altered.
- **Seeded her real question:** `'Where do I use wena?'`, context `'seeded 2026-07-17 from chat — came
  up during today's lessons, she parked it in WhatsApp'`, row id `153243a3-4fc3-4f2a-8326-b12a62836c82`.
- **Her user id disambiguated with zero ambiguity:** `select id, username, display_name from profiles`
  returned exactly 2 rows — `megzieberr` / "Megan", and the second learner's account. Gated the
  client on `username === 'megzieberr'`.
- **Client (`index.html`):** small 💬 button, 44px, `position:fixed` bottom-LEFT (Katse owns
  bottom-right), appended to `document.body` — NOT inside `#app`, so it survives every `render()`/
  `renderFill()` screen swap and stays visible mid-lesson, which is the whole point (that's when
  confusion strikes). Mounted once from `afterAuth()` via `mountTutorFab()`, gated on `!LOCAL_MODE &&
  state.user && state.user.username === 'megzieberr'` — invisible on the second learner's account and in `?local=1`.
  Tap → `.tutor-overlay`/`.tutor-card` (same overlay pattern as `.champ-overlay`, own z-index 210 so it
  sits above the champion popup's 200 rather than colliding with it; the fab itself is z-index 90,
  below the toast's 99). "Ask your tutor" title, textarea, Send + Cancel, tap-outside-to-close.
  **Context auto-capture** (`currentContext()`): mid-lesson/review/gym, reads live off the global
  `session` object — `unit.id/l<lessonIdx+1> — <current card's tsw>` (or `Listening gym — <clip tsw>`,
  or `review`); elsewhere, a lightweight `currentScreen` global set at the top of `screenHome` /
  `screenLeaderboard` / `screenStats` ('Home'/'Scoreboard'/'Stats'). On send: inserts `{user_id,
  question, context}` into `tutor_questions`. Success → toast "Sent — it'll be waiting for your
  tutor." Offline/failure → saved to `localStorage 'rl_tutorq'` (own key, not routed through the
  existing srs/xp/streak/unit sync queue — that queue's op-shape and retry contract is for those 4
  ops only), toast "queued", flushed via `flushTutorQuestions()` called fire-and-forget from
  `afterAuth` (LOCAL_MODE never reaches `afterAuth`, so never touches any of this). `'rl_tutorq'`
  added to `clearLearnerState()`'s wipe list so it can't leak across an account switch on a shared
  device.
- **Verified in preview** (`?local=1`): 💬 button absent (LOCAL_MODE gate), 0 console errors on a
  fresh load. Then drove `openTutorOverlay()`/`sendTutorQuestion()`/`queueTutorQuestion()`/
  `flushTutorQuestions()` directly in-page with a mocked `sb` (insert always erroring, to force the
  queue path) and a mocked `state.user` — send → localStorage `rl_tutorq` gained the queued row,
  toast fired, overlay closed; queue path confirmed independent of `enqueue()`'s xp/srs/streak/unit
  queue (`rl_queue` untouched by either test). Test localStorage cleared afterward. Main inline
  `<script>` block re-parsed with Node's `new Function()` after every edit — syntax-clean throughout.
  375×812 layout check: fab sits clear of the ◀ back button (top bar) and doesn't overlap any
  `.exa-actions`/`Check`/`Continue` button on the tap/choose/teach card layouts (all bottom-anchored
  content leaves the fab's bottom-left 44px corner clear).
- **`schema.sql`** documents the new table + policies in the file's established style (a comment
  block + the exact DDL), noting it was deployed via MCP, matching how every other table in the file
  is presented. **Not re-run on live** — the file is reference-only, per its own header.
- **Tutor hook wired end-to-end:** `Desktop\NWU Semester 2\SECL121\CLAUDE.md` gained an "Ask-your-tutor
  queue" section — session start now queries `tutor_questions where addressed_at is null order by
  created_at` via the Study Hub's Supabase MCP and raises anything found FIRST, before the normal
  session menu; after genuinely addressing one, `update ... set addressed_at = now()`; addressed
  questions feed the existing "leaky items" list. (Side note while reading that file: it already has a
  2026-07-17-dated leaky-item entry on "wena" — looks like a real tutor session covered this earlier
  today, independent of this build. The seeded row stays unaddressed on purpose; the SECL121 tutor's
  next session start will surface it and can mark it addressed, referencing that existing note.)
- **sw.js: `relefela-v23` → `relefela-v24`** (`AUDIO_CACHE` `relefela-audio-v1` untouched — no audio
  byte changed).

## Session 21 (2026-07-17, same day) — new Unit 5 "Diphologolo" built (sw stays v22, NOT shipped)
Built from a read-only spec (`SPEC-u5-diphologolo.md`) + supervisor rulings resolving its open
questions. New standalone unit, appended after `u4` — `lessonIdx` is per-unit, so `u5l1` unlocks
immediately even though Units 3-4 are unfinished, same precedent as `u3l1`/`u4l1`. Units 1-4
untouched.
- **Unit header:** `id: 'u5', title: 'Diphologolo', subtitle: 'Animals — SECL121 Unit 5'`. Per the
  module guide, Unit 5's outcomes are idioms, reading, comprehension, writing and translation —
  animal vocabulary is the theme skin over that skills bundle; the title itself IS the theme,
  unlike Units 3-4's named grammar points.
- **5 new lessons, exactly 36 real items + 5 rule cards, built verbatim from the spec's §3 code
  blocks** (no deviation from the spec's own item counts, unlike session 20's u4l5 discrepancy):
  `u5l1` Diphologolo tsa kwa gae (home/farm animals, 10 — auto-splits 5/5), `u5l2` Diphologolo tsa
  naga (wild animals + bird/fish, 7, single part), `u5l3` Go bala ka diphologolo (reading +
  comprehension, 8, single part — 5 reuse cards + 3 new), `u5l4` Maele a diphologolo (idioms, 5,
  single part), `u5l5` Go ranola (translation + writing, 6, single part).
- **Supervisor rulings applied, resolving the spec's §7 open questions:**
  1. **Idioms outcome shipped as Biblical figurative language, explicitly labelled as such — not
     traditional maele.** The corpus has zero traditional Setswana idioms with glosses (confirmed
     by the spec's own search); `u5l4`'s 5 cards are verbatim Bible sentences (Matthew 10:16 ×3,
     Revelation 5:5, John 10:11), each with the source's own parallel gloss. The rule card
     (`u5l4-00`) was rewritten from the spec's draft to say explicitly "What follows here is
     Biblical figurative animal language, not the module's own traditional maele" and that "the
     module's real maele list … will come from the Smart Guide once it lands" — every one of the 5
     item notes also now says "Biblical figurative language" outright, per the ruling.
  2. **Spelling: SA-standard forms shipped** (`podi`/`dipodi`, `ntša`/`dintša`), with the Bible's
     own attested variant recorded in each card's note for traceability — the spec's placeholder
     "⚠️ spelling — see spec §7" flags on `u5l1-04` and `u5l1-10` were replaced with real text:
     "The Bible itself spells it dipudi; podi/dipodi is the standard SA-Setswana form used here"
     and the equivalent for `dintsa`→`ntša`/`dintša`.
  3. **`katse` (cat) ships** as specced (`src: 'app-mascot'`, an Otlogetswe headword, not yet
     Bible-attested); its note now explicitly calls it "the app's own cat and mascot" per the
     ruling (spec's placeholder "⚠️ sourcing note in spec §4/§7" replaced with real text).
  4. **Combined-`src` constructed sentences shipped exactly as specced** (the `u1l7-07` precedent):
     `u5l3-07/08` and `u5l5-01/02/03/05/06`, each with a `note` spelling out its verified
     components. No demotion to the appendix.
  5. **`sw.js` NOT touched at all this session** — the spec's own "bump to v24" note (§5.8) is
     overridden per this session's supervisor ruling: one release-wave bump happens later, not
     per-unit. Confirmed by file mtime (unchanged from session 17) and an empty `git diff sw.js`.
  6. **Wild animals held back, as ruled:** `tlou` (elephant), `nkwe` (leopard), `kwena`
     (crocodile), `tholo` (kudu) stay in the spec's appendix — not built, same conservative
     parallel-verified-gloss bar as every sibling unit (they're OT/veld animals, outside the tsn
     NT parallel corpus).
- **The 5 reuse-cards** (`u5l3-01..05`) point `audio:` at **existing** files —
  `items/u2l5-07/08/09.mp3` and `items/u2l6-10/11.mp3` — verified on disk before wiring (all 5
  present); their `tsw` strings are byte-identical to the live `u2l5`/`u2l6` cards they reuse, so
  the reuse is engine-safe (session-15 `allItemsExcept()` same-`tsw` exclusion). **No new files
  cut, no existing file's bytes touched.** Every other one of the 36 real items ships silent (no
  `audio:` field) — Animals.mp3 (Megan's own recording) carries background music (the same defect
  that got the Colours source rejected in session 13/14) and no spliceable animal audio exists in
  any committed mapping file. Same honest posture as `u3l6`-`u3l8` and all of `u4`.
- **NCHLT Listening gym re-filtered** (`toolkit/nchlt-filter.py`, standing per-unit ritual, third
  run this session-chain). New Unit-5 vocab (diphologolo, dikoko, jaaka, moithuti-family words
  already known, etc.) reshuffled the picks — pool stays at the **40-clip cap**, with **8 clips in
  and 8 out** (added: `nchlt_tsn_047m_0501`, `087f_0496`, `107f_0421`, `120m_0170`, `125f_0328`,
  `130f_0429`, `135f_0252`, `173m_0351`; removed: `081f_0067`, `089f_0088`, `128f_0274`,
  `142f_0328`, `149f_0135`, `161m_0420`, `171m_0492`, `199m_0118` — confirmed unreferenced
  elsewhere in content.js before deletion). One new pick, `dikoko jalo jalo pele pele`, is a direct
  hit on this unit's own vocab (`dikoko`, u5l1-05's plural). The 8 new picks ffmpeg-converted
  (`-ar 16000 -ac 1 -b:a 32k`, matching the standing recipe) into `audio/nchlt/`; the 8 displaced
  clips' mp3s deleted from disk (confirmed unreferenced first). `RL_CONTENT.nchlt` block in
  content.js regenerated from the new `toolkit/nchlt-clips.json`. Verified: **40 refs = 40 files
  on disk, 0 orphans, 0 missing, 0 duplicate ids.**
- **Verified in preview** (`?local=1`, unregistered SW + cleared caches/localStorage first — the
  known preview gotcha): path screen shows a 5th unit "Diphologolo — Animals — SECL121 Unit 5"
  after Unit 4; `u5l1` node class is `lesson-node next` (unlocked immediately, not gated on Units
  3/4 completion — confirms the per-unit `lessonIdx` design), `u5l2`-`u5l5` are `lesson-node
  locked`; opening `u5l1` shows `P1/2` (auto-splits 5/5, matching the spec's prediction) with a
  sane rule→teach→drills→auto session shape. `buildExercises()` called directly in-page for all 5
  lessons: 0 errors, sane card-type mixes for each (`u5l1` 47 cards, `u5l2` 32, `u5l3` 37 — incl.
  4 `listen` cards from the 5 reused-audio phrases, `u5l4` 24, `u5l5` 28); a fresh word (0 SRS
  reps) only ever produces `teach`/`choose`/`tap`/`auto` card types, never `typeTsw`/`record` —
  type-card `reps ≥ 3` gating unaffected. All 3 `concordSlot` cards (`u5l3-01/04`, `u5l5-04`)
  reconstruct their `tsw` exactly (`head + answer + tail` string match). The 5 reuse-card mp3s
  (`items/u2l5-07/08/09.mp3`, `items/u2l6-10/11.mp3`) all fetch 200 + successfully
  `decodeAudioData` (3.5–4.95s each). All 40 `RL_CONTENT.nchlt` gym clips fetch 200 (HEAD).
  **335 total content ids, 0 duplicates** app-wide; **0 items with no `src`**. 0 console errors
  throughout. Test localStorage cleared afterwards.
- **sw.js NOT touched** (confirmed via `git diff sw.js` — empty — and file mtime unchanged since
  session 17, still v22) and **`audio/items/` untouched by this build** — the only new/changed
  files this session are in `audio/nchlt/` (8 new, 8 deleted) and `toolkit/nchlt-clips.json`. No
  export run, no new audio-mapping file — Unit 5 has zero item-audio splices this wave, exactly as
  specced.
- **Encoding check (the session-20 BOM/CRLF hazard, checked proactively):** content.js edited via
  the Edit tool (never PowerShell `Set-Content`) and the nchlt-block regeneration via a Python
  script writing with explicit `newline='\n'`. Confirmed BOM-free, 0 CRLF bytes, before and after
  every write this session.
- **Recording list addition (~31 items, all silent, Megan's own voice, later enhance-and-wire
  pass — same pipeline as the u3-part-2 and u4 lists above):**
  - `u5l1` (10): phologolo, kgomo, nku, podi, koko, kolobe, pitse, tonki, katse, ntša
  - `u5l2` (7): tau, phiri, noga, nonyane, tlhapi, kammele, lephoi
  - `u5l3` (3, excludes the 5 reused): Bonang dinonyane!, Ke na le dinku le dipodi, Dikgomo di dintsi
  - `u5l4` (5): Nnang botlhale jaaka dinoga, bori jaaka maphoi, Ke lo roma jaaka dinku mo gare ga
    diphiri, Tau ya lotso lwa Juda, Ke Modisa yo o Molemo
  - `u5l5` (6): Ke na le podi, Ke na le ntša, Ke bona nonyane, Nku e ntsho, Dintša di bogale, Ke rata
    diphologolo
  - **⚠️ Hard dependency, blocking all 31:** none of these can be voiced until Megan's own
    `Animals.mp3` (in `missing audio\`) is run through the enhance bot to strip its background
    music — the same de-musicking step Colours needed before session 13/14's stem cards could be
    voiced. Until then this whole list stays silent by design (session-13 Decision).

## Session 20 (2026-07-17, same day) — new Unit 4 "Go ja dijo" built (sw stays v22, NOT shipped)
Built from a read-only spec (`SPEC-u4-go-ja-dijo.md`) + supervisor rulings resolving its open
questions. New standalone unit, appended after `u3` — `lessonIdx` is per-unit, so `u4l1` unlocks
immediately even though Unit 3 (esp. its Part 2) is unfinished, matching the `u3l1`-in-session-15
precedent. Units 1-3 untouched.
- **Unit header:** `id: 'u4', title: 'Go ja dijo', subtitle: 'Eating — SECL121 Unit 4'`. Per the
  module guide, Unit 4's three learning outcomes are word formation, counting, and conjunctives —
  food vocabulary is the theme skin over that grammar spine, same shape as Unit 3's "Mo sekolong".
- **5 new lessons, 41 real items + 5 rule cards:** `u4l1` Dijo (food vocabulary, 10 — auto-splits
  5/5), `u4l2` Go dira mafoko (word formation: verb → noun, e.g. go apaya → moapei, 6, single
  part), `u4l3` Go bala (numbers zero to ten, 11 — auto-splits 6/5), `u4l4` Ba le babedi (counting
  with the concord, 6, single part), `u4l5` Le, mme, kgotsa (conjunctives, 8, single part — see
  spec-deviation note below). Two new `src` tags introduced per supervisor approval:
  `pc-comp-grammar-conj` (the comprehensive grammar's conjunctions chapter) and
  `pc-comp-grammar-interrog` (its interrogatives page).
- **`moithuti` collision avoided, as ruled:** `u4l2`'s rule card mentions `go ithuta → learner` as
  the reflexive word-formation example but does NOT add a `moithuti` card — it already lives at
  `u3l4-01` (built in session 19). No duplicate.
- **Botswana-flavoured vocab NOT shipped this wave:** the spec deliberately held back
  phaletshe/motogo/ditamati-type L14 words (kept in its "wanted but not shipped" appendix) to keep
  `u4l1` short — so the supervisor's "keep with a Botswana-usage note" ruling had nothing to apply
  to yet. Flagged here for whenever that fuller pantry gets built: several of those words are
  Botswana-variant candidates the Smart Guide re-alignment should find (the tlelase precedent).
- **The one reuse-card:** `u4l4-04` "O na le bana ba le babedi" points `audio:` straight at the
  **existing** `items/u2l4-08.mp3` (no new file cut) — same phrase, a fresh `concordSlot` drill
  added on top (the u2 card has none). Every other one of the 41 real items ships silent (no
  `audio:` field) — Unit 4's source lessons (Peace Corps L14 "Food Items", L9 "Connecting words")
  were never tagged/sliced, and the counting/conjunction sentences are text-only comprehensive-
  grammar sources with no native clip anywhere. This is the same honest posture as `u3l6`-`u3l8`.
- ⚠️ **Spec discrepancy caught, not guessed around:** the spec's own summary table (§2) claims
  `u4l5` has 9 real items and a 42-item unit total, but its authoritative §3 code block only ever
  lists **8** real items for `u4l5` (`u4l5-01` through `u4l5-08` — le, a sentence, mme, kgotsa,
  another sentence, ka gore, two more sentences). No 9th item's Setswana is specified anywhere in
  the spec (the candidates for a fuller conjunction set, `jaaka`/`gore`, are explicitly parked in
  its appendix as NOT shipped). Per the no-invented-Setswana rule, built exactly the 8 cards in the
  code block rather than inventing a 9th — so Unit 4 totals **41 real items**, not 42, and `u4l5`
  (8 items, ≤ the 8-item split threshold) is a single part, not the spec's predicted 5/4 split.
  Everything else in the spec's code block was reproduced verbatim.
- **NCHLT Listening gym re-filtered** (`toolkit/nchlt-filter.py`, standing per-unit ritual). New
  Unit-4 vocab (numbers lefela-lesome, le/mme/kgotsa, nama/dijo/merogo, dikgomo, moithuti-family
  words already known, etc.) reshuffled the picks: pool stays at the **40-clip cap**, with 20 clips
  in and 20 out (the algorithm re-ranks the whole set every run, it isn't additive). The 20 new
  picks ffmpeg-converted (`-ar 16000 -ac 1 -b:a 32k`, matching the standing recipe) into
  `audio/nchlt/`; the 20 displaced clips' mp3s deleted from disk (confirmed unreferenced first —
  no item card anywhere points `audio:` at an `nchlt/` file directly, only the gym block does).
  `RL_CONTENT.nchlt` block in content.js regenerated from the new `toolkit/nchlt-clips.json`.
  Verified: 40 refs = 40 files on disk, 0 orphans, 0 missing.
- **Verified in preview** (`?local=1`, unregistered SW + cleared caches first): a 4th unit "Go ja
  dijo" appears after Unit 3 on the path screen; `u4l1` is `next`/available immediately (not
  gated on Unit 3's completion — confirms the per-unit `lessonIdx` design); each of the 5 lessons
  builds a sane rule→teach→drills→auto session shape; `u4l1` auto-splits 5/5 and `u4l3` splits
  6/5 (both > the 8-item `PART_MAX` threshold), `u4l2`/`u4l4`/`u4l5` are single parts (all ≤ 8);
  all 4 `concordSlot` cards in `u4l4` (`u4l4-01/02/03/04`) reconstruct their `tsw` exactly
  (`head + answer + tail` string match); the reuse card `u4l4-04` plays `items/u2l4-08.mp3`
  (pre-existing file, 200/decodes); 0 duplicate ids across 294 total ids app-wide; 0 items with no
  `src`; content.js parses cleanly as a plain JS module. 0 console errors. Test localStorage cleared
  afterwards.
- **sw.js NOT touched** (still v22, `AUDIO_CACHE` `relefela-audio-v1` untouched) and **`audio/items/`
  untouched** by this build — `git status` on that folder shows only the pre-existing session-19
  uncommitted clips, nothing new or modified from this session. No export run, no new mapping file
  — Unit 4 has zero new splices this wave.
- ⚠️ **Housekeeping note:** while regenerating the NCHLT block, an earlier in-place edit briefly
  introduced a UTF-8 BOM and CRLF line endings across the whole of `content.js` (a PowerShell
  `Set-Content` artifact). Caught and reverted before finishing — the file is confirmed back to
  BOM-free, LF-only, matching its prior convention; `git diff --stat` on `content.js` shows only
  the expected ~181 insertions / 26 deletions (the u4 unit + the 40-line nchlt block swap), no
  whole-file noise.

## Session 19 (2026-07-17, same day) — Unit 3 part 2 "Mo sekolong" built (sw stays v22, NOT shipped)
Megan's structural ruling: the existing Unit 3 "Go batla" (u3l1-u3l3, the Peace Corps L10 conjugation
paradigms) becomes **Part 1** of a reframed Unit 3, and the SECL121 study unit "Mo sekolong" (at
school — future/past tenses + adverbs, module outcomes) becomes **Part 2**, appended as u3l4-u3l8
inside the same unit so `lessonIdx` (per-unit) unlocks the new lessons only after u3l1-u3l3 are
done. Built from a read-only spec (`SPEC-u3-part2-mo-sekolong.md`) + supervisor rulings resolving
its open questions. u3l1-u3l3 items/audio/concordSlots untouched.
- **Unit header:** `title: 'Go batla' → 'Mo sekolong'`, `subtitle: 'At school — SECL121 Unit 3.
  Part 1: the Go batla verb-clock · Part 2: classroom life.'` — both halves visible on the path
  screen. `u3l1` blurb prepended with `'Part 1 · the verb-clock. '`; `u3l4` blurb opens with
  `'Part 2 · Mo sekolong. '` — the only two per-lesson half-markers (session-15 ruling
  superseded, see Decisions).
- **5 new lessons, 41 real items + 5 rule cards:** `u3l4` Mo tlelaseng (classroom nouns, 7),
  `u3l5` Reetsa! (commands, 10), `u3l6` Maabane le kamoso (adverbs of time, 9), `u3l7` Ke ile kwa
  sekolong (past tense, 8), `u3l8` Ke tla ya kwa sekolong (future tense, 7). Tense-sentence cards
  use the live combined-`src` convention (`peace-corps-L10+Lx`, precedent `u1l7-07`) — approved
  per supervisor ruling, not a new judgement call.
- **14 clips spliced** via a new own-file `toolkit/audio-mapping-session19.json` (session-16/17/18
  own-file pattern; converts 14 `note`→`item` tags already sitting in the committed round2.json,
  never hand-edited): L7 seg4/30/32/34 (tafole/beke/pene/fensetere), L18 seg5 (tlelase), L12
  seg32/34/36/40/42/46/48/50/52 (Bula lebati/Tswala lebati/Ema o bue/Tsena mo teng/Tla kwano/
  Reetsa/Boela kwa morago/Tla kwa pele/Nna fatshe). Plus 2 reuse cards pointing straight at
  existing files, no new cuts: `u3l5-03` Ema ka dinao → `u2l2-09.mp3`, `u3l8-02` Ke tla go bona
  kamoso → `u1l3-03.mp3`. **Export ritual, run twice, both clean:** first pass 189→202 files, 0
  changed, 0 deleted, exactly 13 new; second pass (Nna fatshe follow-up, below) 202→203, 0
  changed, 0 deleted, exactly 1 new (md5'd before/after both times). `pensele` (u3l4-06), all of
  `u3l6` (9 adverbs) and `u3l7` (8 past sentences), and 6 of `u3l8`'s 7 future sentences ship
  silent — no Peace Corps clip exists for them (recording list ≈ 25 items, below).
- ⚠️ **Spec deviation, corrected using ground-truth data (not a guess):** the spec's L12 decode
  was book-order inference and got the tail wrong. The committed round2.json's `note` tags on
  Lesson 12 already carry an explicit `text` label Megan typed while tagging — not positional
  inference. Those labels show seg44 = **"didimala"** alone (a separate command, not in this
  build) and seg46 = **"reetsa"** alone — i.e. Reetsa is a clean, standalone clip, NOT a
  "didimala/reetsa" compound as the spec's table implied. The spec had assigned seg44→Reetsa
  (flagged for an ear-check) and seg46→Boela kwa morago; real labels put Boela kwa morago at
  seg48 and Tla kwa pele at seg50, with "nna fatshe" turning out to be an unlisted 14th note at
  seg52 (initially outside the spec's approved 13-clip list). **Net effect:** `Reetsa` (u3l5-01)
  is WIRED (seg46, 1.136s) instead of silent — the ear-check concern is resolved in the
  affirmative, it is not a compound clip. `Nna fatshe` (u3l5-02) briefly shipped silent, then the
  supervisor verified seg52's committed note carries Megan's own typed labels (text "nna fatshe",
  eng "Sit down" — exactly as unambiguous as the rest) and ruled the "13-clip budget" was
  positional-decode bookkeeping, not a cap — so it was WIRED too in a second export pass (seg52,
  1.303s = the tag range to the ms). Total wired this session: **14**. Full reasoning + duration
  cross-check in `toolkit/audio-mapping-session19.json`'s `note` field. This follows the hard
  "never wire audio to a card whose displayed tsw doesn't match what the voice says" rule
  (session-13 Decision) — wiring the spec's original (wrong) alignment would have put "Tla kwa
  pele" audio under a "Boela kwa morago" card or similar.
- **14 measured durations vs the spec's expected bands** (all ffprobe'd post-export): `u3l4-02`
  tlelase 1.779s, `u3l4-03` tafole 1.396s, `u3l4-04` fensetere 1.765s, `u3l4-05` pene 1.093s,
  `u3l4-07` beke 1.178s, `u3l5-09` Bula lebati 2.219s, `u3l5-10` Tswala lebati 2.141s, `u3l5-04`
  Ema o bue 1.387s, `u3l5-08` Tsena mo teng 1.614s, `u3l5-05` Tla kwano 1.322s, `u3l5-01` Reetsa
  1.136s (corrected segment), `u3l5-07` Boela kwa morago 1.811s (corrected segment — a 3-word
  phrase, fits far better than the 1.14s the mis-aligned table implied), `u3l5-06` Tla kwa pele
  1.510s (corrected segment), `u3l5-02` Nna fatshe 1.303s (seg52, follow-up pass). All in-app
  verified: 200 + decode + play via `playAudio`, 0 console errors.
- **NCHLT Listening gym re-filtered** (`toolkit/nchlt-filter.py`, standing per-unit ritual — this
  was its first re-run since the gym's original build, session/commit `4ee7fdf`). New Unit-3-part-2
  vocab (moithuti, baithuti, tlelase, sekolo, ruta, ithuta, morago, dintsi…) unlocked more
  fully-known-vocab NCHLT clips: pool grew from 34→40 (MAX_CLIPS cap), with the content-richness
  ranking reshuffling 14 clips in and 8 out (the algorithm re-picks the whole set every run, it
  isn't additive). New clips ffmpeg-converted (`-ar 16000 -ac 1 -b:a 32k`, matching the original
  WAV→32k-mono-MP3 recipe from the gym's build commit) into `audio/nchlt/`; the 8 displaced
  clips' orphaned mp3s deleted (confirmed unreferenced first); `RL_CONTENT.nchlt` block in
  content.js regenerated from the new `toolkit/nchlt-clips.json`. Verified: 40 refs = 40 files,
  0 dupes, `startGym()` builds an 8-card round with 0 console errors, all 40 clips 200 OK.
- **Verified in preview** (`?local=1`, unregistered SW + cleared caches first — the known preview
  gotcha, stale cache was actually hit once before the reload): path screen shows "Mo sekolong —
  At school — SECL121 Unit 3. Part 1: the Go batla verb-clock · Part 2: classroom life." with all
  8 lessons; `u3` node states are `next`(u3l1)/`locked`×7(u3l2-u3l8, `disabled:true`) — Part 2 is
  correctly gated behind Part 1; each of u3l4-u3l8 builds a sane rule→teach→drills→auto session
  shape (u3l5's 10 items auto-split, matching the spec's predicted 5/5); all 10 concordSlot cards
  in u3l7/u3l8 reconstruct their `tsw` exactly (`head + answer + tail` string match); 0 duplicate
  ids across 270 total ids; 0 items with no `src`; 0 console errors on a fresh load with test
  localStorage cleared afterwards.
- **sw.js NOT touched** (still v22, AUDIO_CACHE `relefela-audio-v1` untouched) — this release has
  not shipped; a future ship-wave bumps the version once, alongside whatever else is pending.

## Session 17 (2026-07-17, same day) — full audit + fix batch (sw v20, SHIPPED)
Megan asked for a full fresh-eyes audit before building further (multitasking day). 5 read-only
audit agents (2×Opus engine/sync, 3×Sonnet content/toolkit/pending), then 3 fix agents — all
supervised, key findings independently re-verified in source by the orchestrator.
**Audit verdict: app in good shape.** Live site matched repo byte-for-byte (v19); content.js
exceptionally clean (123 audio = 123 files = 123 mapping winners, 0 orphans, Unit 3 paradigm
39/39 concord cards reconstruct exactly); RLS isolation sound; all session-11 SW invariants held.
**Fixes shipped this session:**
1. **Double-grade race (BUG, the real one):** `choose`/`concord`/`listen` handlers left all
   answer buttons live during the 350ms reveal — a normal double-tap graded twice (double
   srsGrade/XP, stacked Continue, duplicate retry splices). Fix: one-shot `answered` flag +
   pointer-events off + `atClick` capture so a pending grade bails if ◀ Back moved to a recap.
   Type cards' session-8 Enter/debounce contract verified intact.
2. **`touched` was never written** — pullRemote's "remote wins only when newer" always let
   remote overwrite local. Now stamped in `srsGrade` (Date.now()) and carried from remote
   `updated_at` on accepted rows. Self-healed via outbox before, but the invariant now holds.
3. **Account-switch hygiene (defensive — they never share a device):** logout now flushes
   best-effort (3s cap, while still authed), then `clearLearnerState()` wipes the 6 learner-
   scoped rl_ keys; `afterAuth` reads `rl_lastUser` (previously write-only) and wipes disk +
   in-memory state on user-id mismatch BEFORE flush can stamp stale ops with the new user's id.
   LOCAL_MODE unaffected (never reaches afterAuth).
4. **Export unwire-guard (toolkit):** `export-item-audio.py` now refuses (exit 1, lists items)
   to un-wire any currently-live clip unless `--allow-unwire` is passed — the L2-drop hazard
   finally guarded in code per the "guard hazards in code" ruling. Tested against a doctored
   L2-stripped mapping: fires on exactly u1l1-13/15/19, mutates nothing.
**Audit findings NOT fixed (accepted/known, for the record):** CDN supabase-js means an
evicted-cache offline cold start can't boot (self-host to fix, someday); SW auto-reload can fire
on the between-parts checkpoint screen (UX blip, rare); md5 audio-cache check is still a manual
ritual; progress bar ticks backward on retry-splice (cosmetic, by design); review-session `tap`
distractors always draw from Unit 1 (low impact); tagger L2-drop root cause still not reproduced
in code (reopenLesson() wipe is the suspect). Katse id rename stays queued (Pending 3).
**Pending-list corrections** from the audit are folded into the items below (enhance bot nearly
done not 3/39; lecturer premise dead — all 51 items self-recorded; phones ritual obsolete;
⚠️ never wire `Leina lame ke Megan.mp3`).

### Wiring wave (later same session, sw stays v21 — ships as ONE release with the audit fixes + colour drop)
The enhance-bot run finished (66 files in `missing audio\Enhanced\`). **Wired 64 of them** to their
cards by exact case-insensitive `tsw` match — every card that was silent AND had a matching Enhanced
file: **u2l6-01..12** (the 12 colours), **u2l1/u2l2** body vocab (mmele, tlhogo, sefatlhego … lonao),
**u2l4** copulatives (Mpho ke ngaka, Ke morutabana, Ga se ngaka, Mpho o mo ntlong, Le ene ke moithaopi
wa Peace Corps, O na le bana ba le babedi + the words ngaka/morutabana), **u2l5** adjectives (mogolo,
monnye, moleele, khutshwane, monate, Mpho o montle, Dikgomo di bogale/dintle, Ke na le dikgomo tse
dintle, O opela sentle, Ke rata nama thata), **u1l1-07/08** (Ke teng / Re a leboga), **u1l5** (motho,
batho, leina, lelapa), **u1l6-09** (Ke batla kofi), **u1l7-06/07/08** (Nnyaa ga ke na mathata / Ga ke
batle tee / Ga ba bue Sekgoa), **u2l7-08** (botlhoko), and the **3 silent Unit-3 cards** (u3l1-08 Ga a
batle / u3l2-04 Re ne re batla / u3l3-08 Ga a kake a batla). Each Enhanced file re-encoded WHOLE (no
trim) to `audio/items/<id>.mp3` with the export's exact params (`-ac 1 -b:a 64k`).
- **2 files deliberately NOT wired:** `Leina lame ke Megan.mp3` (the documented landmine — wrong name
  for the renamed u1l2-01) and `Re tsogile sentle.mp3` (u1l1-17 already has its Peace Corps clip).
  0 unmatched, 0 ambiguous, 0 no-card files — the folder mapped cleanly.
- ⚠️ **ONE clip over the 5.2s slow-mode ceiling:** `u2l4-07` "Le ene ke moithaopi wa Peace Corps" =
  **5.57s** (8.57s at 0.65×, past Katse's 8s `.talking` hard stop). Wired anyway; the sway just ends a
  beat before the audio does — cosmetic, per the session-16 rule to flag anything >5.2s. Everything
  else is 2.37–4.95s.
- **JOB A — u1l2-05 "Ke tswa kwa Botswana" tagged + wired** via new `toolkit/audio-mapping-session17.json`
  (hand-authored supersede, own file, sorts last — the session-16 pattern). ⚠️ The tagger download (13)
  put u1l2-05 on **L3 seg 8 with no `sub`**, but committed round2 ALREADY tags L3 seg 8 → **u1l2-10**
  (the live frame card "Ke tswa kwa…"). Per-segment supersede keys on `(lesson,seg,sub)`, so a no-sub
  tag would have superseded and **un-wired live u1l2-10**. Resolved with **`sub:0`** on the session17 tag
  — the session-10 shared-segment coexistence trick (u1l1-17 keyed sub:0 to coexist with u1l1-15 on L2
  seg25). Result: L3 seg 8 now feeds BOTH u1l2-10 (short cut 19.175–20.046) and u1l2-05 (full cut
  19.175–21.321), each correct for its card. Export ran clean: guard passed, **0 existing bytes changed,
  0 deleted, exactly 1 new file** (`u1l2-05.mp3`, verified by md5 of all 123 files before/after).
- **Counts after the wave: 188 item clips = 188 content.js audio refs = 188 files** (123 → +1 Job A
  +64 Job B), 0 orphans / 0 dupes / 0 missing. Verified in preview (`?local=1`, DOM/JS — pane can't
  screenshot): all spot-checked clips 200 + valid decodable metadata + play through the app's own
  `playAudio`; a live u1l1 teach card renders both 🔊 and 🐢; 0 console errors; no test state persisted.
- ⚠️ **Side effect for the NEXT `export-item-audio.py` run:** the 64 native clips are wired DIRECTLY
  (not through any mapping file), so the export's un-wire guard will now flag ALL 64 (wired-but-not-in
  `have`) and refuse without `--allow-unwire`. Options when that day comes: add the natives to a mapping
  (like the ★ Colours splices), or run with `--allow-unwire` knowing the direct wirings are intended.
  Harmless for shipping THIS release (nothing re-runs the export to deploy).

### L11 "to have" finale + export scope fix (later same session, sw v22)
Megan re-tagged Peace Corps Lesson 11 segs 25/27 in her tagger (the "junk-tagged to have row"
flagged at the end of session 15). Her download `relefela-audio-mapping-round2 (14).json`
confirmed the usual partial-regression pattern elsewhere, so only the wanted tag was lifted
by hand into a new **`toolkit/audio-mapping-session18.json`** (session-16/17 own-file pattern),
converting note→item and superseding round2's stale `junk` tag on that segment.
- **Net new = ONE card: `u1l4-14` "Lo na le buka"** (you-pl have, seg 25), `src:
  'peace-corps-L11'` with `concordSlot`, added after u1l4-13 matching its exact field structure.
- **Seg 27 "O na le buka" turned out to be a re-tag of an already-voiced card, not a gap** —
  the build initially added it as a second card `u1l4-15`, which duplicated the byte-identical
  tsw of the live `u1l4-11` (voiced since session 10, round2 L11 seg23) inside the same lesson,
  violating the session-15 one-card-per-distinct-tsw Decision. The flag was raised mid-build and
  the orchestrator resolved it (the spec had missed u1l4-11): **u1l4-15 deleted** (card, mp3,
  and its mapping tag), and **u1l4-11 reglossed for both persons** per the `O a bala`/u1l4-12
  pattern — eng "You have a book / He-she has a book", hint "you / he-she", the one-o note moved
  onto it. u1l4-11's audio/options untouched; the seg-27 tag was deliberately NOT retargeted at
  u1l4-11 (re-cutting the same filename would change bytes and force an audio-cache bump). The
  row's audio was thus already 2/2 complete before this session; only the you-pl form was new.
- **Seg 29 (the row's next segment) deliberately NOT tagged** — Megan's ear ruling: the announcer
  is reading the English lesson header ("to have"), not Setswana speech. Not a lost tag.
- **Export scope fix (`toolkit/export-item-audio.py`):** the session-17 side-effect warning above
  was about to come true — the guard and un-wire step treated "wired in content.js, no mapping
  winner" as stale, which would have flagged (and `--allow-unwire` would have deleted) all 64
  native clips on the very next run. Fixed: a new `managed_ids` set collects every itemId named
  by ANY tag (any action) in ANY loaded mapping file, plus every id in `nchlt-item-audio.json`;
  only ids in that set are eligible to trip the guard or be un-wired/deleted. An id wired straight
  into content.js with no tag anywhere (the 64 natives) is now EXTERNALLY MANAGED — never
  flagged, never touched. Mapping-managed items (the u1l1-13/15/19-style hazard) keep exactly the
  old behaviour. Tested in scratchpad on copies with ffmpeg stubbed: real mappings + current
  content.js → guard silent, all 64 natives untouched and unlisted; a doctored copy re-tagging
  u1l1-13/15/19's exact segments to junk (simulating a regressed re-download, round2.json's
  originals left in place so they're still mapping-managed) → guard still fired, listed exactly
  those 3, mutated nothing. Real run: 188 pre-existing files byte-identical (md5'd before/after),
  exactly `u1l4-14.mp3` (2.036s) added, guard silent, **189 = 189 = 189** (content.js refs =
  files on disk = live items), 0 orphans, the 64 natives untouched.
- sw v21→**v22** (`AUDIO_CACHE` untouched — audio is fetched-and-cached on demand by URL, not
  precached by filename, so a new file under a new filename needs no sw.js audio-side change).

## Session 16 (2026-07-17, same day) — Itumeleng + slow playback (sw v19, SHIPPED 4ded19c)
Verified live: sw `relefela-v19`, `AUDIO_CACHE` still `relefela-audio-v1` (correctly untouched),
`u1l2-01.mp3` 200 at 18869 bytes, "ke Megan" 0 hits, `SLOW_RATE = 0.65` serving. Pages built in ~20s.

**1. `u1l2-01` is now "Leina lame ke Itumeleng"** (was "…ke Megan") — 123rd clip lit up.
- Fixed the CARD, not the clip. The announcer always said *Itumeleng*; the card was the lie. It also
  fixes a real bug: **the app is shared with the second learner**, so "My name is Megan" was wrong in her mouth. The
  deck already teaches these frames with Setswana names (`u1l2-03` Moeng, `u1l2-08` Thabo) — u1l2-01
  was the odd one out. Card note now says to swap your own name into the frame.
- `EXCLUDE` in `export-item-audio.py` is now **empty** (was `{'u1l2-01'}`); history kept in the comment.
- ⚠️ **`EXCLUDE` was never why the clip was missing.** Round 2 re-tagged L3 seg 3 as a `note`
  ("Leina lame ke", trimmed 5.544→6.794), and per-SEGMENT supersede beats the round-1 item tag, so
  the card was un-wired regardless. Removing EXCLUDE alone exports nothing — the giveaway is
  `audio: added to 0 items`.
- **Restored via a NEW mapping file, `toolkit/audio-mapping-session16.json`**, not by hand-editing
  round2 — the tagger rewrites round2 on download and would silently eat the edit. It sorts after
  round2, so its tags win. **This is the pattern for any future hand-authored supersede.**
- Verified in-browser: clip is **2.295s = exactly 7.839 − 5.544**, the tagged range to the ms.
- 🎧 **Megan should confirm by ear once**: the card spells it `lame` — check the announcer isn't
  saying `la me`.

**2. 🐢 Slow-audio button (the second learner's ask) — every clip, no new files.**
- `playAudio(file, rate)` sets `playbackRate` + `preservesPitch` (`webkitPreservesPitch` for Safari
  <17, else it chipmunks). `SLOW_RATE = 0.65` — below ~0.5 browsers mangle or mute.
- **No byte of `audio/` changes, so this can never need an AUDIO_CACHE bump** — and it lights up all
  123 item clips + the NCHLT gym at once, including clips not yet enhanced.
- Markup centralised in **`playBtnsHTML(big)`** so the 8 card layouts can't drift; `hookPlay()` wires
  both buttons. The NCHLT gym wires its own pair (it doesn't use hookPlay).
- 🐢 is 44px vs 🔊's 56px (secondary, still a legal tap target), `--card2` background, 10px gap.
- **Sway safety net checked, not assumed:** `playAudio` stops Katse's `.talking` after a hard 8s.
  Longest clip in the whole app is 4.44s → 6.83s at 0.65x, so nothing outruns it. Re-check this if a
  clip longer than **5.2s** is ever added.
- Dialogue tracks (`data-track`, full lesson recordings) deliberately have **no** 🐢 — slow mode is a
  per-phrase idea.
- Verified in-browser (Supabase-gated, so tested by driving the real functions, not by logging in):
  `hookPlay` → click 🔊 = rate 1, click 🐢 = rate 0.65 pitch-preserved, same src. No console errors.

**Syllable display was deliberately NOT built** — see Decisions.

## Session 15 (2026-07-17, same day) — Unit 3 "Go batla": the conjugation lessons (sw v18)
The long-pending optional content (Pending item 2) — built. **New Unit 3 "Go batla"**, the Peace
Corps Lesson-10 negation table as 3 lessons, + the 2 leftover L11 `bala` forms into u1l4.
- **u3l1 "Ke a batla"** present + neg present (11 real → parts 6/5) · **u3l2 "Ke ne ke batla"** past
  + neg past (12 → 6/6) · **u3l3 "Ke tla batla"** future + neg future (11 → 6/5). Every card
  `src: 'peace-corps-L10'`, each with a `concordSlot` (the paradigm IS a concord drill).
- **New unit, NOT u1l8+ — the deciding reason:** `lessonIdx` is per-unit, so u3l1 is unlocked
  immediately and u1 progress is untouched; a `u1l8` would have sat locked behind u1l4–u1l7.
- **33 clips lit up** (89 → 122 items): 31 from L10, 2 from L11. All were `note` tags carrying only
  timings — no `tsw` — so each was decoded to a paradigm cell and spliced note→item (splice script
  in session scratchpad, `splice_conjugation.py`, with per-tag assertions).
- **The decode is evidence-backed, not guessed:** book row order (Present, Neg present, Past, Neg
  past, **Neg future, Future** — negatives interleave), Megan's own eng hints (`Le a batla` = person
  5; `I will not want` = neg-future person 1), the longest English gloss in each row always being the
  she/he cell, and clip durations tracking phrase length (verified post-export in the browser:
  3-word futures 1.62–1.77s, 5-word negatives 2.56–3.05s — every clip in its predicted band).
- ⚠️ **Memory note [[relefela-conjugation-audio]] was WRONG on one cell** (now corrected): it listed
  `Ga ba kake ba batla` as untagged. Megan confirmed by ear that L10 seg56 = "Ga re kake ra batla"
  (person 4), which puts the untagged cell at person 3 — **`Ga a kake a batla`**. `Ga ba kake ba
  batla` IS tagged (seg59) and has a clip. The other 3 untagged cells the memory names are right.
- **3 cards ship silent** (no clip exists — the Join button ate those fragments): `Ga a batle`,
  `Re ne re batla`, `Ga a kake a batla`. Cards are complete otherwise; the table has no holes.
- **"O a batla" is ONE card, not two.** The book prints persons 2 and 3 identically (you / she-he) in
  the present and future rows; two cards with the same `tsw` would be an unanswerable drill. Same for
  `O a bala`. Precedent: `u1l4-03 ene` = "he / she".
- **`Ga ke batle` is deliberately duplicated** (u1l7-01 in Unit 1, u3l1-06 as the table's first
  cell). One clip feeds both via a **`sub:0` dup tag on L10 seg16** — the u1l1-15/u1l1-17 trick.
  Required a 1-line engine fix: **`allItemsExcept()` now excludes same-`tsw` items, not just
  same-id** — a distractor identical to the answer was always a latent bug. Verified over 900 draws.
- **Export guard: `SKIP_LESSONS = {'★ Colours (native)'}`** added to `export-item-audio.py` — its 7
  tags still point at live cards u2l6-13..19 and `corpus/audio/Colours.mp3` still has music under
  every word, so an unguarded run wires music-laden clips onto live cards. Remove this ONLY together
  with the corpus recording + its mapping tags, as part of Pending item -1.
- **`relefela-audio-v1` NOT bumped, correctly:** the export re-encodes all 89 existing clips every
  run, so they were md5'd before and after — **0 changed, 0 deleted, 33 new**. ffmpeg is
  deterministic here. New files only → no re-download of her ~120 clips. (Keep this check in the
  ritual; it's what tells you whether the audio cache needs a bump.)
- **L11 yielded 2 clips, not the ~12 the prompt expected** — its 5 real cards (u1l4-07..11) have had
  audio since session 10. Of its 5 notes: 2 usable (`O a bala`, `Lo a bala` → u1l4-12/13), 1 a
  duplicate string, 1 the announcer reading the English header "to be", 1 unidentifiable.
  ⚠️ **The whole "to have" row is junk-tagged** (L11 segs 25/27/29, ~2s each = plausibly real
  Setswana: Lo/O/Ba/Re na le buka). Probably junked because no cards existed then. A re-tag in the
  tagger would light up ~4 more clips — her call, not something to guess at.
- Verified in preview (?local=1, DOM/JS — pane can't screenshot): 3 units, u3l1 `next`/u3l2-3
  locked, session shape rule→teach×4→listen/choose→tap×4→match→…→auto×6 (28 cards, P1/2), all 33
  clips 200 + decode + play through the app's own `playAudio`, every concord card reconstructs its
  phrase, no unsourced items, no duplicate ids, 0 console errors. Test localStorage cleared.

## Session 14 (2026-07-17, same day) — enhance bot + Katse bubble fix (sw v17, SHIPPED & live-verified)
Megan found recordings for the missing audio but they carry background music, so she wanted her
Mindbourne Adobe Podcast bot cloned for this project. Also fixed Katse's speech bubble clipping.

- **Enhance bot** at `missing audio\enhance-bot\` (`RUN ENHANCE BOT.bat` → `enhance_bot.py`,
  `config.json`, `README.txt`). Fork of `MINDBOURNE VIDEO PROJECT\Adobe Enhance Bot (SHARE)`,
  Speech 50 / Music 0 / Background 0, `Raw` → `Enhanced` under the ORIGINAL name (Adobe's
  `-esv2-50p-bg-m-music-m` suffix dropped). Resume = same-named file in `Enhanced`.
  Four deliberate differences from the video bot, each load-bearing:
  (1) verifies an AUDIO stream — the video bot's video-stream check fails on every mp3 and would
      delete good downloads, burning the daily quota;
  (2) queue cards matched by EXACT name — "morutabana.mp3" is a substring of "Ke morutabana.mp3",
      so the video bot's substring click downloads the wrong voice under the right filename;
  (3) queue names read whole, so names with spaces aren't dropped by the old `\S+\.mp4` regex;
  (4) borrows the Mindbourne bot's `chrome-profile` (same MDP EDUCATION login) → **never run both
      bots at once**, Chrome locks the profile; it exits with a plain message if you do.
  The 22 previously-enhanced files were renamed to their originals (byte-identical "(1)" dup
  deleted) — that's what lets resume recognise them. mp3s gitignored like corpus/.
- **Katse bubble fix (sw v17):** long phrases were sliced through the top line. Root cause was
  WIDTH, not position: `.kbubble` had `left:50%` and no width, so its shrink-to-fit width was
  capped at the space from that offset to the parent's right edge = HALF Katse's wrapper (100px
  measured), and `max-width:72vw` (270px) never applied; the 102px-tall result then overflowed
  `.exa-mid`'s `overflow:hidden`. Fix = `width:max-content` (an explicit width isn't subject to the
  cap, so `left:50%` is fine once set) + `.exa-mid` `align-items:flex-end` (Katse now sits 4px above
  Continue, her request) + `overflow:visible`. Kept `translateX(-50%)` centring: `margin:0 auto`
  puts the bubble 33px off-centre once wider than Katse, dragging the tail off her head.
  Measured at 375×812, worst-case phrase: 270×54, 44px clear of the clip edge, 0px off-centre;
  drill card right-aligned on-screen; hero unaffected; 375×600 clean.

### Adobe queue: what we learned the hard way (bot ran 3/39 then stalled)
- **Adobe silently DROPS uploads when its queue is full.** `borokwa.mp3`/`bosetlha.mp3` never got
  cards; the bot then polled ghosts for 23 min (its ceiling is 25 min × chunk ≈ 2 h). The queue held
  exactly 15 cards, mostly stale ones from Megan's manual sessions (Adobe keeps them ~10 days).
  Suspected cap = 15, NOT proven.
- **Megan's ruling: leave it, she handles it manually** — her existing habit (no `OK ... saved` line
  for ~5 min → close it, re-run, it resumes) genuinely recovers dropped files, because pending is
  recomputed from disk each run and files that still have cards aren't re-uploaded. **Clear the
  Adobe queue BEFORE a run**, not during — the drop happens at upload time.
- ⚠️ **KNOWN BUG, left unfixed by her decision (exists in the MINDBOURNE bot too — same code):**
  `_remove_from_queue` clicks `[data-testid='delete-track-button']` **`.first`**, but there is one
  delete button PER CARD (15 measured), so it bins whichever card is at the top, not the one it just
  finished. Silent because it's wrapped in `try/except: pass`. Low harm (nothing is downloaded until
  ffprobe verifies it) but it's what lets the queue clutter build. One-line fix if ever wanted:
  target the trash button inside the card being removed.

## Session 13 (2026-07-17, same day) — native recordings + colour stem cards (sw v16, SHIPPED fa578e8)
Megan is hunting missing-audio words with a Setswana app + recording them ("missing audio\" folder,
untracked: Colours.mp3, Animals.mp3 + 8 single phrases incl. both u1l1 orphans + Ke batla kofi).
All supervised Sonnet-agent builds.
- **Tagger wiring (local-only):** slice-lessons.py grew ★ Colours (native) / ★ Animals (native)
  lessons (7 + 10 clean segments; sources copied to corpus/audio/); tagger.html shows them in the
  redo dropdown, excluded from the main queue, with FILTERED word-choice lists (colours = the 12
  u2l6 missing items as click-to-tag buttons; animals = 26 corpus-grounded suggestions saved as
  found-word notes because the app has NO animal content yet — export ignores notes safely).
- **Spelling verdict (her Q: our words vs the source app's):** NEITHER wrong. App teaches bo- noun
  forms (bontsho, davies-1992); source app speaks bare adjective stems (ntsho) — same words, two
  grammatical forms, both corpus-attested. serolwana = genuine second word for yellow (Otlogetswe);
  mmala wa loapi / wa namune = valid descriptive colour phrases. Her "nstho" was a typo (fixed).
- **7 new cards u2l6-13..19** (stems + serolwana + the 2 mmala phrases, new `native-recording` src
  convention for recording-sourced phrases). Lesson now 19 items → parts 7/6/6. Cards deliberately
  have NO audio: field yet — recordings still carry background music.
- **Mapping:** ONLY the 7 ★ Colours tags spliced into committed round-2 mapping (note→item, typo
  fixed). Download "(12)" confirmed the regression pattern AGAIN (missing L2 seg25/38/39 + L3 seg9,
  plus 17 stray out-of-scope tags incl. an abandoned "lesson 90" batch) — diff-first ritual works.
- Conjugation-lesson prompt (L10 batla / L11 bala) was refreshed for post-session-11 reality and
  handed to Megan — see Pending item 2 for the two amendments it needs after THIS ship.

## Session 12 (2026-07-17, same session as 11) — Reset Lesson 1 button (sw v15, SHIPPED 9648452)
Megan asked for a reset button for Lesson 1 in the stats tab (supersedes the session-5 "no reset
feature" ruling — that was about SQL being faster than a flaky build, not a permanent objection).
Built by a Sonnet agent under supervision.
- Small ghost `Reset Lesson 1` button at the bottom of `screenStats()`, confirm dialog, XP/streak/
  lessonIdx untouched (later lessons stay unlocked; unlock state and "known" state are independent).
- **Mechanism = hard DELETE, never zero-out upsert:** `buildExercises()` treats a word as known by
  the mere PRESENCE of its `state.srs` row, so a reps:0 row would keep teach cards away forever.
  RLS `srs_all` is `for all`, so the user may delete her own `srs_items` rows.
- **Sync-safe order (the session-5 gotcha):** server delete FIRST (awaited, aborts on error), only
  then clear local `rl_srs` u1l1-*, strip pending u1l1 `srs` ops from `rl_queue`, drop the u1:0
  `rl_replay` cursor. LOCAL_MODE resets locally only; offline shows a toast and does nothing.
- **Known limitation (accepted, matches session-5 precedent):** a second device holding stale local
  u1l1 rows isn't cleaned by this — pullRemote never deletes — so run the reset on each device.
- Agent-verified in preview with seeded progress: only u1l1-* removed, u2 row/XP 250/streak/
  lessonIdx 3 all intact, fresh startLesson = part 1/3 with 7 grading teach cards (not replay).

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
**Live at sw `relefela-v23` (audio cache `relefela-audio-v1`, correctly NOT bumped — today's
exports were md5-verified 0-changed/0-deleted twice): the FULL 5-unit app.** The sessions 18-21
release wave SHIPPED 2026-07-17 in one three-commit push: Unit 3 reframed as "Mo sekolong"
(Part 1 Go batla + new Part 2 u3l4-u3l8), new Unit 4 "Go ja dijo" (u4l1-u4l5), new Unit 5
"Diphologolo" (u5l1-u5l5), 14 clips spliced (session-19 mapping), NCHLT gym re-filtered to 40,
plus the index.html wave: mid-Katse id rename (#katse-mid — the old Pending-3 audit cleanup,
DONE), the daily XP rivalry nudge, and the weekly champion popup.
- **Voiced count, recounted exactly from content.js at ship time: 212 of 307 real cards voiced**
  (335 total ids incl. 28 rule cards; 95 real cards silent by design). 203 unique files in
  `audio/items/` (243 unique audio refs — reuse cards share files; u5l5-06 points at an nchlt
  gym clip), 40 gym files. 0 missing refs, 0 orphans, 0 duplicate ids.
- **Still pending on Megan (the release's known tails):**
  1. 🎧 The u1l2-01 `lame` ear-check (session 16) — still outstanding.
  2. 🎙️ The recording lists: ~25 items (u3 part 2) + all of u4's silent cards + ~31 items (u5,
     blocked on de-musicking `Animals.mp3` through the enhance bot first). All silent by design
     until her own enhanced recordings land.
  3. 👀 The rivalry nudge + weekly champion popup have not yet been seen with two real
     players' data — watch for the first real Megan-vs-the second learner sighting (needs both to have
     week XP; champion popup fires the week after a completed week).
Everything below SHIPPED earlier on 2026-07-17 (commits `302ce8d` fixes/v20, `7d3f447`
colours+wiring/v21, `8288af1` L11 finale/v22, all live-verified):
1. ~~Pending -1(a): the colour-cards decision~~ **LANDED — "Drop 13-19 please."** All seven cards
   u2l6-13..19 deleted (u2l6 = rule card + 12 items), Colours.mp3 + its 7 mapping tags gone.
2. ~~Pending 4: the enhance-bot run + tag-and-wire wave.~~ **DONE & SHIPPED.** 64 of her recordings
   wired (colours u2l6-01..12 + body vocab + copulatives + adjectives + the silent Unit-1/3 cards),
   2 skipped (Leina-lame-ke-Megan landmine + Re-tsogile-sentle already voiced), u1l2-05 tagged+wired.
   ⚠️ Leina-lame-ke-Megan was NOT wired and never should be.
3. ~~The L11 "to have" re-tag~~ **DONE & SHIPPED (v22):** new card u1l4-14 "Lo na le buka"; u1l4-11
   reglossed for both persons; seg 29 ear-ruled English narration. Export unwire scope now
   mapping-managed-only (the 64 native clips are permanently exempt).
4. ⚠️ The `SKIP_LESSONS` ★ Colours guard in `export-item-audio.py` is **PERMANENT** — the tagger's
   localStorage still holds the ★ Colours tags, so a future raw download would resurrect them; the
   guard makes that harmless. Don't "tidy" it away, ever.

~~The only open item: the mid-Katse id rename (Pending 3, an audit-time cleanup).~~ **DONE in the
v23 ship** (#katse-mid, part of the index.html wave). Parked, unplanned:
we/they "to have" cards (no audio source) and self-hosting supabase-js for true offline cold-start.

### ⚠️ Tagger gotcha (critical for any future export)
Her tagger's localStorage keeps **dropping the Lesson-2 redo** — every export she downloads has 0
lesson-2 tags. Deploying one raw DELETES 3 live clips (u1l1-13/15/19). **Always splice the L2 redo
back from the committed `toolkit/audio-mapping-round2.json` (git HEAD) before running the export.**
Per-lesson raw exports from this session are backed up in the session scratchpad.

### Cards intentionally left silent (no Peace Corps audio exists — need native recordings)
u1l7-07 "Ga ke batle tee" (tea), u1l7-08 "Ga ba bue Sekgoa" (English), u1l6-09 "Ke batla kofi"
(coffee — audio only says *o rata kofi?*), and L22 body-part vocab (tlhogo/mala/leoto/botlhoko,
only spoken inside sentences). Don't chase these with the tagger.
⚠️ **UPDATE (2026-07-17 audit):** recordings for ALL of these now exist on disk in "missing audio\"
(Megan's own voice) and are awaiting enhance+tag+wire — see Pending item 1. "Don't chase these with
the tagger" no longer applies once the enhance-bot run finishes; the rest of this note is historical
(why they shipped silent) and stays as-is.

### 🎙️ Session-6 audio thread (2026-07-16) — remaining gaps → lecturer recordings
- **NCHLT per-word audio TRIED & ABANDONED — do NOT retry.** Grabbed NCHLT sentence-clips that
  *contain* each missing vocab word and wired them into the tagger as a synthetic "★ NCHLT words"
  lesson (concat `nchlt-words.mp3` + `segments-words.js` + `build-word-lesson.py`). Words lifted from
  running speech are coarticulated/unusable — Megan rejected them. All of it reverted & deleted;
  tagger.html is back to stock. NCHLT stays ONLY for the Listening gym (whole sentences).
- **Path forward = native recordings from the lecturer.** `NATIVE-RECORDINGS-NEEDED.md` (repo root,
  51 items) = the Bible/grammar-book vocab (Unit 2 body/colour/adjective) + the 2 Unit-1 orphans.
  ⚠️ **UPDATE (2026-07-17 audit):** this converged to Megan self-recording everything instead —
  filename reconciliation confirmed 51/51 items already covered by her own recordings on disk (see
  Pending item 1). Nobody ended up waiting on the lecturer.
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
- Nothing. (2026-07-25 amnesty, Megan's call: the native-speaker wave landed and was wired
  in session 27 — the app is 307/307 voiced. Her ear-checks and the Ask-your-tutor live
  test are done, per Megan 2026-07-25. Everything below is ARCHIVE, not tasks.)

## Next session (code task, not a Megan task)
- Rename the mid-Katse id: `mountKatseMid()` reuses `id="katse-corner"` (class tells the
  two contexts apart, the id lies — it once made a verification pass measure the wrong
  cat). Give the mid cat its own id, route the shared helpers through `katseWrapEl()`,
  re-verify all three contexts. Full write-up: archive below, item 3 (session 14).

## Archived pending history (pre-amnesty 2026-07-25, kept for the record — NOT tasks)
-11. 2026-07-18 (session 24): **Hand `toolkit/recording-sheet.pdf` to the native speaker.** 132
   words, one long recording, ~10–15 minutes. The sheet already explains the quiet room, the ~2s
   pause, Setswana-only, no-skipping and the Notes column, so it needs no covering explanation.
   **Read her Notes column when it comes back** — anything she flags as wrong wording or a wrong
   English gloss is a content fix, and per the session-13 rule the card must be corrected rather
   than the clip wired to a mismatched card.
-10. 2026-07-18 (session 24): **When that audio arrives — the wiring procedure.** Drop the mp3 into
   `missing audio/` (gitignored) **and** `corpus/audio/`; run `slice-lessons.py` (do NOT retune its
   thresholds — that renumbers every lesson and invalidates all 1 187 committed tags); add a ★
   lesson to `tagger.html` seeded from **`toolkit/recording-list.json`**, which is already in
   recording order with card ids; tag; lift only the new tags into `audio-mapping-session25.json`;
   export with md5 before/after.
   ⚠️ **This is the wave that DOES need `AUDIO_CACHE` bumped** (`relefela-audio-v1` → `v2`): 64 of
   the 132 overwrite existing `audio/items/<id>.mp3` filenames, so existing bytes change. Every
   recent wave was new-files-only, where bumping would have been wrong — do not pattern-match off
   those. The md5 check decides it, as always.
-9. ~~2026-07-18 (session 23): **★ Food is loaded in the tagger, waiting to be tagged.**~~ **DONE
   2026-07-18 (session 24) — tagged, lifted into `audio-mapping-session24.json`, exported and
   shipped as sw v27. 8 of the 10 cards voiced.** `u4l1-02` (nama) and `u4l1-08` (merogo) were
   never tagged — all 35 Food segments are 8 items + 27 junk — so they stay silent and are on the
   recording sheet (items 90–91). **CONFIRMED by Megan 2026-07-18: nama and merogo are simply not
   in the Food recording** — so this is not a mis-tag and there is nothing to recover in the tagger;
   they are genuine gaps and the native speaker records them like any other missing word. Question
   closed. Original instructions kept below for the record.
   2026-07-18 (session 23): **★ Food is loaded in the tagger, waiting to be tagged.** Refresh
   `tagger.html`, pick **★ Food (native)** in the "Redo a whole lesson" picker → the 10 `u4l1`
   food cards (dijo, nama, borotho, metsi, mashi, mae, namune, merogo, dinawa, letswai) appear as
   bubbles. The recording is Setswana-word-then-English-translation, so **tag the Setswana and junk
   the English**; 32 segments for 10 cards, 7 of them splittable (✂ Split) where a pair merged.
   When done: download the mapping JSON and hand it over — the same lift-only-the-new-tags
   procedure applies, do NOT adopt the download wholesale.
-8. 2026-07-18 (session 23): **`u5l1-01 phologolo` still has no clip** — its segment was junked
   during tagging, so it's the one remaining silent animal. **Superseded 2026-07-18 (session 24):
   no longer needs a separate re-record — it is item 111 on `recording-sheet.pdf`** and will be
   covered by the native-speaker wave along with everything else.
-7. 2026-07-18 (session 23): **Optional — ear-check the 20 new own-voice clips.** The 🎧 Ear-check
   (footer of the tagger) now holds the 11 numbers + 9 animals cut today. They're live already and
   the music worry is settled, so this is a quality spot-check, not a blocker. Mark any ✗ and the
   panel prints the ids to report back.
-6. 2026-07-17 (session 22): **Try the "Ask your tutor" button once on live.** (Still open — not
   reported done as of 2026-07-18.) Log in as
   `megzieberr` on the live site, tap the 💬 bottom-left, send a throwaway test question, confirm
   it lands in Supabase (`select * from tutor_questions order by created_at desc limit 1`), then
   either leave it for the next SECL121 tutor session to find or delete the test row by hand — your
   call. Also worth one glance: confirm the button is genuinely invisible on the second learner's account.
-5. 2026-07-17 (session 21): **New Unit 5 "Diphologolo" — ready but NOT shipped.** u5l1-u5l5 built
   (36 real items + 5 rule cards, 5 reuse cards pointing at existing `u2l5-07/08/09.mp3` +
   `u2l6-10/11.mp3`), NCHLT gym re-filtered to 40 clips (8 in / 8 out). Ships whenever the next
   release wave bumps sw.js (stacks with pending items -3/-4 below — same future ship wave, sw
   stays v22 until then).
   **SHIPPED since — went live in the session 18-21 release wave as sw v23.**
   ~~31-item recording list, blocked on de-musicking `Animals.mp3` first.~~ **BLOCKER RETIRED
   2026-07-18 (session 23): Animals.mp3 has no music** — measured against a Peace Corps control and
   confirmed by Megan's ear ("Animals have no music, it's 100%"). It was tagged and **9 of its 10
   cards are now voiced and live**; only `u5l1-01 phologolo` remains (its segment was junked).
   No enhance-bot pass was needed or done. Canonical remaining list is `toolkit/missing-audio.md`,
   now regenerated by `toolkit/missing-audio.py` — not this paragraph.
   ⚠️ **Idioms outcome interim-met, not fully met:** `u5l4`'s 5 cards are Biblical figurative
   animal language (verbatim, sourced), explicitly labelled as NOT the module's traditional maele
   — the module's real animal-idiom list needs the Smart Guide (still not obtained, per
   `toolkit/SOURCES.md`). Revisit `u5l4` the moment that list lands.
-4. 2026-07-17 (session 20): **New Unit 4 "Go ja dijo" — ready but NOT shipped.** u4l1-u4l5 built
   (41 real items + 5 rule cards, 1 reuse card pointing at existing `u2l4-08.mp3`), NCHLT gym
   re-filtered to 40 clips (20 in / 20 out).
   **SHIPPED since — went live in the session 18-21 release wave as sw v23.**
   Of its recording list: **all 11 `u4l3` numbers are now voiced and live** (2026-07-18), and
   **`u4l1`'s 10 food words are recorded and loaded in the tagger awaiting tagging** (pending item
   -9 above). The rest (`u4l2` word formation, `u4l4` counting, `u4l5` conjunctives) are still
   silent. Canonical list is `toolkit/missing-audio.md`, now regenerated by
   `toolkit/missing-audio.py` — not this paragraph.
-3. 2026-07-17 (session 19): **Unit 3 part 2 "Mo sekolong" — ready but NOT shipped.** u3l4-u3l8
   built (41 items + 5 rule cards), 14 clips spliced + wired, NCHLT gym re-filtered to 40 clips.
   **SHIPPED since — went live in the session 18-21 release wave as sw v23.** Both ear items below
   are now CLOSED:
   (a) ~~**One-time ear-confirm of the 14 spliced clips**: `u3l4-02/03/04/05/07`,
       `u3l5-01/02/04/05/06/07/08/09/10`.~~ **DONE 2026-07-18 (session 23) — Megan listened to all
       14 via the new 🎧 Ear-check panel and confirmed: "All 14 of the other audio you gave me are
       100% correct." No re-splice needed; the session-19 decode is vindicated in full.**
   (b) ~~**`Reetsa` (u3l5-01) wiring — worth a listen.**~~ **DONE 2026-07-18 — covered by (a);
       the didimala/reetsa split is confirmed correct.** For the record, the build found
       the committed mapping's own `note` text labels seg44="didimala" and seg46="reetsa" as two
       SEPARATE clips, which resolves the spec's original "might be a didimala/reetsa compound"
       worry in Reetsa's favour — seg46 (1.136s) is wired as a clean standalone "Reetsa" clip,
       and `Nna fatshe` got its own clip from seg52 (1.303s, supervisor-verified label) in a
       follow-up pass. If her ear disagrees with the "didimala"/"reetsa" split or which segment
       is which, the fix is a 1-line edit to `toolkit/audio-mapping-session19.json` + a re-export.
   **25-item recording list** (exact count) for later, all silent, no PC clip exists. Canonical list
   is `toolkit/missing-audio.md` (regenerated 2026-07-17 directly from `content.js`, u3 section), not
   this paragraph.
-2. 2026-07-17 (session 16): **Two small ones from the Itumeleng/slow session.**
   (a) ~~🎧 Listen to `u1l2-01` once on live and confirm the announcer says "Leina **lame** ke
       Itumeleng" and not "Leina **la me** ke…". The card spells it `lame`; the tag can't tell us.~~
       **DONE 2026-07-17 (session 18): Megan confirmed by ear — announcer says "lame". Card spelling
       is correct, nothing to change.**
   (b) ~~**`u1l2-05` "Ke tswa kwa Botswana" — re-tag it in the tagger, Peace Corps Lesson 3**
       (`BW_Setswana_Lesson_3.mp3`). NO tag for it exists in any committed mapping.~~
       **DONE 2026-07-17 (session 17 wiring wave): tagged + wired** from tagger download (13) via
       `toolkit/audio-mapping-session17.json`. The download's tag collided with u1l2-10 on L3 seg 8;
       resolved with `sub:0` coexistence so both cards keep their clip (see the session-17 wiring-wave
       entry). Export clean, `u1l2-05.mp3` the only new file. **Ships with the next deploy (not yet pushed).**
   (c) ~~**Decide `u2l6-19 mmala wa namune`** (raised session 14, still open): it's the deck's ONLY
       word for orange, so the one-word-per-colour ruling doesn't reach it. Keep + record, or drop?
       This is part of the -1(a) decision below and still blocks the colours workstream.~~
       **DECIDED & LANDED 2026-07-17 (session 17): dropped with the rest ("Drop 13-19 please") —
       no orange word in the deck for now. See the session-17 Decisions entry.**
-1. 2026-07-17 (session 14): **Colours workstream REPLANNED — the session-13 plan below is dead.**
   Megan re-recorded the colours herself as individual bo- form words instead of de-musicking the
   ★ Colours source, and ruled ONE WORD PER COLOUR (see Decisions). New shape:
   (a) ~~DECIDE (needs Megan): drop u2l6-13..16 (bare stems) + 17 (serolwana, 2nd yellow) + 18 (mmala
       wa loapi, 2nd blue)? And separately: keep u2l6-19 mmala wa namune, the only orange in the
       deck, even though it has no audio? These cards are LIVE right now (shipped session 13).~~
       **DECIDED & LANDED 2026-07-17 (session 17): all seven dropped, 19 included ("Drop 13-19
       please"). Cards, corpus recording and mapping tags all removed — see the session-17
       Decisions entry. What REMAINS of this workstream is (b)+(c) below.**
   (b) Her per-word raws in "missing audio\Raw" cover u2l6-01..12 exactly, 1:1 by filename.
       Enhance bot output lands in "missing audio\Enhanced" under the original names.
   (c) Then tag/wire those 12 → audio: fields, export, ship. New files only → do NOT bump
       relefela-audio-v1.
   ~~⚠️ `corpus\audio\Colours.mp3` STILL EXISTS on disk (382 KB, 10:08 2026-07-17) and the COMMITTED
   mapping still carries 7 ★ Colours tags pointing at it. So any export-item-audio.py run today
   still cuts music-laden stem clips onto u2l6-13..19. Until (a) is settled: EXCLUDE the ★ Colours
   lesson from every export. Deleting the corpus copy + its 7 mapping tags is part of (a), not a
   thing to do quietly on the side.~~ **DONE session 17: corpus copy + the 7 mapping tags deleted.
   The `SKIP_LESSONS` guard STAYS anyway — permanent protection against the tagger's localStorage
   resurrecting the ★ Colours tags in a future download.**
   Animals.mp3 + the single phrases are a SEPARATE workstream, unaffected by this ruling.
2. ~~2026-07-17 (session 13): the conjugation-lesson prompt needs two amendments~~ **DONE — that
   session ran as session 15 and shipped.** Its ★ Colours hazard is now guarded in code
   (`SKIP_LESSONS` in export-item-audio.py), not just in prose, so the next export is safe too.
0. ~~2026-07-17 (session 11): ONE LAST ritual on both phones — force a real cold start (swipe the
   PWA away, force-stop, or open it twice with real closes in between) to get off the old v13
   worker.~~ **CLEARED (2026-07-17 audit) — obsolete.** Five successful deploys (v15..v19) have
   already landed through the v14 network-first auto-update flow since; nothing left to do here.
1. ~~2026-07-17 (audit): the **tag-and-wire wave** — voice every "cards intentionally left silent"
   entry from Megan's own recordings on disk (lecturer premise dead, all 51 items self-recorded).~~
   **DONE 2026-07-17 (session 17 wiring wave), pending ship.** 64 enhanced native clips wired: the 12
   colours, u2l1/u2l2 body vocab, u2l4 copulatives, u2l5 adjectives, Ke teng / Re a leboga, Ke batla
   kofi, Ga ke batle tee, Ga ba bue Sekgoa, Nnyaa ga ke na mathata, leina, lelapa, botlhoko, and the 3
   silent Unit-3 cards. Every previously-silent card that HAD a matching Enhanced file is now voiced
   (0 unmatched). **Not yet deployed** — ships with the audit fixes + colour drop as one sw v21 release.
   Full list + the one >5.2s flag + the export-guard side effect are in the session-17 wiring-wave entry.
2. ~~Optional content: conjugation lessons L10 (batla) / L11 (bala/na le)~~ **DONE — SHIPPED
   session 15** as Unit 3 "Go batla" + u1l4-12/13. Yield was 33 clips, not the ~42 estimated (the
   estimate counted L11 tags that were already live since session 10, and L10 notes that are
   duplicate strings). ~~ONE follow-up left, her call: **re-tag L11 segs 25/27/29** (currently
   junk, ~2s each, probably the "to have" row — Lo/O/Ba/Re na le buka) to light up ~4 more clips
   and complete that table; the 4 cards would need adding too. Not urgent, not guessable.~~
   **DONE (session 17, later same day):** Megan re-tagged segs 25/27 herself (seg 29 ruled
   English narration, not a lost tag). Net new = ONE card, `u1l4-14` "Lo na le buka" (189 clips
   live); seg 27's "O na le buka" was a re-tag of the already-voiced `u1l4-11` (live since
   session 10), which was reglossed for both persons instead of duplicated — see the session-17
   "L11 finale" entry. The row is complete at its 2 distinct audio forms plus `Ke na le buka`
   (person 1) — **`Re na le buka`/`Ba na le buka` (we/they) have no audio source at all** (never
   tagged, no announcer clip found for them in this lesson) — parked, not planned; a future card
   for either would ship silent or need one of Megan's own recordings. Not something to chase
   with the tagger.
4. ~~2026-07-17 (session 14): the enhance-bot run + tag-and-wire wave.~~ **DONE 2026-07-17 (session
   17), pending ship.** The bot finished at **66 files** in `Enhanced\`; **64 wired, 2 correctly
   skipped** (see the session-17 wiring-wave entry for the full list, the one >5.2s flag `u2l4-07`,
   and the direct-wire export-guard side effect). Clear the Adobe queue / don't run alongside the
   Mindbourne bot still apply if she ever re-runs it.
   ⚠️ **The `Leina lame ke Megan.mp3` landmine STILL STANDS** — it was NOT wired (wrong name for the
   renamed `u1l2-01` "Leina lame ke Itumeleng") and must never be wired to anything.
3. 2026-07-17 (session 14): **NEXT AUDIT — rename the mid-Katse id.** `mountKatseMid()` mounts the
   big centred Katse with `id="katse-corner"` but `class="katse-mid"`, so the two Katse contexts are
   told apart by CLASS while the id lies (`mountKatseCorner()` uses the same id). The id reuse is
   deliberate — `playAudio`'s `.talking` sway, `katseBubble`, `katseSetPose` and `katseWrapEl()` all
   key off `#katse-corner` — so renaming means touching that plumbing, which is why session 14 left
   it. Cost of leaving it: it silently misleads. In session 14 a verification pass measured
   `#katse-corner` on a teach card, got the MID cat back, and looked like a clean pass while
   proving nothing about the corner cat. Fix = give the mid one its own id and route the shared
   helpers through `katseWrapEl()` (which already handles both), then re-verify all three contexts.

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
   ⚠️ **UPDATE (2026-07-17 audit):** `.claude/.claude/launch.json` has been tracked/committed since
   session 9 (commit `830c847`) — no longer an open decision.
5. 2026-07-16 (session 6 audio): Copy `relefela-audio-mapping-round2 (11).json` →
   `toolkit/audio-mapping-round2.json`, run `export-item-audio.py`, deploy — brings the L2/L3 redo +
   `Re tsogile sentle` live. Optionally tag `kofi`/`tlhogo`/`mala`/`leoto`/`botlhoko` in the tagger first.
6. 2026-07-16 (session 6 audio): Get native recordings from the lecturer for the 51 items in
   `NATIVE-RECORDINGS-NEEDED.md`, then tag them (new voice) & export.

## Decisions (append-only)
- 2026-07-19 (session 26, Megan's ruling): **Review is merged INTO the Daily Quest — there is no
  standalone review any more.** "Let's merge the review and daily quest, that the review things
  fall into the daily quest." Implemented as: due items go into the 10-round quest first
  (most-overdue first), then it tops up from everything she has met. The design consequence worth
  keeping: **a daily drill must never be able to leave a scheduled review behind**, so any future
  change to `dailyPool()` keeps due-first ordering and a round count ≥ the realistic due count.
  If due ever routinely exceeds 10, raise `DAILY_ROUNDS` rather than dropping due items.
- 2026-07-19 (session 26): **Alternative English glosses are graded as a SET, not a string.**
  A card's `eng` with slashes ("he / she", "big / great / elder") accepts any one alternative or
  any combination in any order. The card is testing comprehension, not recall of the author's
  ordering. Corollary for content work: **writing `eng: 'a / b'` is now a real grading decision**,
  not just display text — it widens what counts as correct, which is usually what you want for a
  synonym pair and NOT what you want if the two halves are genuinely different words.
- 2026-07-19 (session 26): **A silent grading bug lapses cards, so fixing one has SRS
  after-effects.** 46 cards spent an unknown period marking correct answers wrong, and every one of
  those wrongs ran `srsGrade(id, false)` — reps to 0, ease down 0.25, lapses up. The fix does not
  un-do that history; the Daily Quest's weakest-first top-up is what quietly repairs it. Standing
  note: when a grading path changes, say plainly which cards carry damaged scheduling rather than
  reporting the fix alone.
- 2026-07-18 (session 23, Megan's rulings on the research reports): **Dictation yes, AI conversation
  partner NO, interleaving unchanged.** (a) The dictation card must come **after** she has already
  practised a word's spelling via the tapping/choosing cards — implemented as the existing
  audio + reps≥3 production gate, so it can never be a learner's first contact with a word.
  (b) **No AI conversation partner, ever, on current evidence.** She tested a Setswana-speaking bot
  herself: the rhythm was convincing but, compared against the Peace Corps audio, it mispronounced
  a lot — "which will be useless to me". This is her own ear independently confirming the research
  report's low-resource-language warning, and it aligns with the standing no-invented-Setswana rule
  (an AI partner *generates* unvetted Setswana by definition). (c) Interleaving of confusable
  concord patterns: leave as is.
- 2026-07-18 (session 23): **Never declare an audio defect from one measurement without a
  known-good control.** The "Animals.mp3 carries background music" blocker — carried in this file
  and in memory since session 21, and repeated by me this session off a single sampled gap — was
  **false**. Measuring every inter-word gap AND controlling against the Peace Corps lessons already
  shipping showed Peace Corps at −18…−21 dB versus her recordings at −29…−31 dB, i.e. hers are
  ~10 dB quieter between words. Megan confirmed by ear ("Animals have no music, it's 100%").
  The de-musicking precondition on the u5 recording list is **retired**. Standing method: measure
  every gap, and always measure something known-good for comparison before calling something broken.
- 2026-07-18 (session 23): **A tagger download is only ever a source of NEW tags, never a
  replacement mapping** — now three times running. Download (15) carried 91 item-tags against 137
  across the committed files. Procedure that is now standard: diff the download against the union
  of all committed mappings, lift ONLY the genuinely-new tags into a fresh own-file
  `audio-mapping-sessionNN.json`, and inspect every "new" tag for provenance before adopting it.
  This session that inspection caught 7 tags pointing at the reverted NCHLT experiment's
  `nchlt-words.mp3` which would have overwritten her own voice on 7 live cards.
- 2026-07-18 (session 24): **The stale lesson-`"90"` NCHLT tags are permanent residents of her
  tagger's localStorage — check for them on EVERY download, forever.** They appeared in (15) and
  again in (16), identical 7 tags on `u1l5-01/02`, `u2l1-01/05/06/10`, `u2l2-01`. Adopting them
  would re-cut those cards from an NCHLT source and overwrite her own enhanced recordings. There is
  no way to clear them from here (the tagger is local-only and gitignored), so the check is the
  control. This generalises the session-23 provenance rule from "inspect new tags" to "there is a
  specific known-bad set, and it will be in the next download too".
- 2026-07-18 (session 24): **Any script that rewrites `content.js` must pass `newline='\n'`, and
  CR bytes must be checked with a BINARY read.** `Path.write_text()` defaults to `newline=None`,
  which on Windows silently converts the whole file to CRLF — 606 of 606 lines, from a run that
  changed 8. `core.autocrlf=true` masks it entirely in `git diff`, and Git Bash `grep`/`tr` strip
  CR bytes and will report the file clean when it is not. Only `open(...,'rb').read().count(b'\r')`
  tells the truth. Second occurrence of this class after the session-20 PowerShell `Set-Content`
  BOM/CRLF incident, so it is now guarded in code with a comment saying why.
- 2026-07-18 (session 24): **Documents handed to other people are generated from content.js too,
  and their instructions must come from the real thresholds.** `recording-sheet.pdf` is built by
  `toolkit/recording-sheet.py` from the same data `missing-audio.py` reports, so it cannot drift
  from the app; and its recording guidance (quiet room, ~2s pause, Setswana only) is derived from
  `slice-lessons.py`'s actual `-30dB` / `0.35s` / `0.4s` values plus the measured fact that her own
  recordings sit at −29…−31 dB between words. Generic "speak clearly" advice would not have
  prevented the merged segments Food.mp3 produced. Corollary: **inspect the rendered PDF, not just
  the build exit code** — two layout defects (mis-aligned `p{}` baselines, a repeated unit title
  reading like a bug) were invisible in a successful compile.
- 2026-07-18 (session 23): **Generated lists beat hand-maintained ones, and must be validated
  against `RL_CONTENT`.** `missing-audio.md` is now emitted by `toolkit/missing-audio.py`.
  Validating its output against what the app actually loads caught two silent parser bugs that a
  plausible-looking hand-check would have missed (nested `concordSlot` objects breaking brace
  matching; rule cards carrying `tsw: ''` rather than no tsw). Any future content-derived report
  should be checked the same way — against the app's own parsed data, not against itself.
- 2026-07-17 (session 21, supervisor ruling): **Unit 5's idioms outcome is interim-met with
  Biblical figurative language, not traditional maele — pending the Smart Guide's own idiom list.**
  The corpus has zero traditional Setswana idioms (maele/diane) with glosses anywhere (confirmed
  by the build spec's search). `u5l4`'s 5 cards ship as verbatim Bible sentences (Matthew 10:16
  ×3, Revelation 5:5, John 10:11), each carrying the source's own parallel English gloss, and are
  explicitly labelled in both the rule card and every item note as "Biblical figurative animal
  language", NOT the module's traditional maele. This is a deliberate, honest interim scoping of
  the module's idioms outcome — not a claim that the outcome is fully met. When the Smart Guide's
  animal-idiom list becomes available, `u5l4` should be revisited/expanded with the real maele.
- 2026-07-17 (session 19): **Unit 3 restructured into two parts — supersedes the session-15
  "grammar gets its own unit" ruling below.** Megan's instruction (relayed via the build spec,
  §0): the existing Unit 3 "Go batla" (u3l1-u3l3, Peace Corps L10 conjugation paradigms) does
  NOT get demoted or removed — it becomes **Part 1**, the on-ramp, and the SECL121 study-unit
  content "Mo sekolong" (at school: future/past tense + adverbs, the module's actual learning
  outcomes per the module guide) becomes **Part 2**, appended as u3l4-u3l8 in the SAME unit. Unit
  header retitled `'Go batla' → 'Mo sekolong'`; the session-15 framing ("grammar content gets its
  own unit, outside the SECL121 unit numbering") no longer holds — Unit 3 is now presented as the
  real SECL121 Study Unit 3, with the batla paradigms folded in as its grammar on-ramp. Mechanical
  reason it stays one unit (not two): `lessonIdx` is per-unit, so appending inside u3 means Part 2
  unlocks only after Part 1 finishes — the desired ordering — where a separate new unit would have
  opened Part 2 immediately alongside Part 1.
- 2026-07-17 (session 19): **A note tag's own `text` label beats a book-order positional decode.**
  When a spec's inferred segment-to-card alignment conflicts with an explicit `text` field already
  sitting in a committed `note` tag (Megan's own typed label from tagging), trust the label — it
  is ground truth, not a guess, and using it is not "inventing a new decode". Session 19 caught a
  spec's L12 book-order table drifting by one segment once "didimala" turned out to be its own
  separately-tagged note; the corrected wiring kept the same approved 13-clip total, just assigned
  to the right cards. See the session-19 entry above for the full case.
- 2026-07-17 (session 17, later same day): **Export unwire scope is MAPPING-MANAGED ITEMS ONLY.**
  Items wired into content.js's `audio:` field with no mapping tag anywhere (the 64 native
  recordings from the session-17 wiring wave) are externally managed — `export-item-audio.py`
  never strips or flags them, on this run or any future one. The session-17 wiring-wave warning
  that "the NEXT export run will refuse / `--allow-unwire` would delete the 64 natives" is now
  obsolete; the guard and un-wire step both scope to a `managed_ids` set (any itemId named by any
  tag, any action, in any loaded mapping file, plus `nchlt-item-audio.json`) before touching or
  even flagging an item. Mapping-managed hazards (the u1l1-13/15/19 L2-drop case) are unaffected.
- 2026-07-17 (session 17): **Colours decision LANDED — drop u2l6-13..19 entirely, including 19.**
  Her words: "Drop 13-19 please." The deck has no orange word for now — u2l6-19 mmala wa namune
  goes too, decided on its own merits per the session-14 framing. Removal shipped same session:
  the 7 cards deleted from content.js, `corpus/audio/Colours.mp3` deleted, the 7 ★ Colours tags
  stripped from `toolkit/audio-mapping-round2.json` (files-map entry too — cosmetic, export reads
  per-tag `file`), the ★ Colours entry removed from `slice-lessons.py` (missing file would
  sys.exit it), sw bumped v21 (audio cache untouched — no app-served audio byte changed).
  **The `SKIP_LESSONS` guard in `export-item-audio.py` is now PERMANENT re-introduction
  protection, not a temporary shield** — her tagger's localStorage still holds the ★ Colours
  tags, so any future raw download would resurrect them; the guard makes that harmless forever.
  Never re-add these cards from a tagger download. Orphaned SRS rows for the deleted ids are
  inert (all lookups are content-driven; only the stats "met" counter would count them, cosmetic).
- 2026-07-17 (session 15): **Grammar content gets its own unit, outside the SECL121 unit numbering.**
  Unit 3 "Go batla" is Peace Corps grammar, not an SECL121 study unit, and its subtitle says so.
  Mechanical reason it must be a unit and not `u1l8+`: `lessonIdx` is per-unit, so a new unit opens
  immediately while appended lessons sit locked behind the rest of Unit 1.
- 2026-07-17 (session 15): **One card per distinct Setswana string.** Where the book prints a form
  twice for two persons (`O a batla` = you AND she/he; `O a bala`; `O tla batla`), it's ONE card
  glossed for both — two cards with identical `tsw` make an unanswerable drill. Where a phrase
  genuinely belongs to two lessons (`Ga ke batle`), duplicate cards ARE allowed, because
  `allItemsExcept()` now filters distractors by `tsw` as well as id. One clip can serve both cards
  via a `sub:N` dup tag on the shared segment.
- 2026-07-17 (session 15): **Follow the book/app spelling over the ear-transcription** — `tla` not
  the book-table's `tlaa` (matches live u1l3-02), `batle` not the book's `battle` typo, and
  `Ga re kake ra batla` even though the unstressed `ra` is easy to mishear as `a`.
- 2026-07-17 (session 16): **Hand-authored mapping supersedes get their OWN file.**
  `audio-mapping-session16.json` exists so the tagger's next round2 download can't revert it. Any
  future by-hand tag correction should do the same rather than editing a tagger-owned file.
- 2026-07-17 (session 16): **The card bends to the recording, not the reverse.** `u1l2-01` said
  "ke Megan"; the native clip said "ke Itumeleng", so the card changed. Named cards in this deck
  teach the FRAME, not the name (u1l2-03 Moeng, u1l2-08 Thabo) — and a personal name is actively
  wrong in a two-learner app. Prefer a real Setswana name over burning a native clip.
- 2026-07-17 (session 16): **Slow audio is playbackRate, never a second file set.** Keeps the audio
  cache immutable and covers every clip for free, including un-enhanced ones. Don't "improve" this
  into pre-rendered slow MP3s — that would double the cache and re-download her ~123 clips.
- 2026-07-17 (session 16): **Syllable display deferred, deliberately.** Duolingo's slow button shows
  no syllables; this would be new linguistic output, and generated splits are generated CLAIMS —
  against the no-invented-Setswana rule if unverified. Setswana needs digraph/trigraph handling
  (`tlh`, `tsh`, `kg`, `ny`, `ng` = one sound) and syllabic nasals (`mmele` = *m·me·le*, `ngaka` =
  *nga·ka*). When built: derive from a documented davies-1992 rule set, **store splits as a field in
  `content.js`** (greppable + reviewable, not computed at runtime), and eyeball all ~130 voiced items
  once. Note it can only ever be STATIC text beside the audio — syncing highlight to slowed playback
  needs forced alignment, a different project.
- 2026-07-17 (session 15): **Guard export hazards in code, not in prose.** The ★ Colours exclusion
  lives in `export-item-audio.py` as `SKIP_LESSONS`, because a warning in a status file only
  protects the session that reads it. Same spirit as the audio-cache byte-diff check.
- 2026-07-17 (session 14): **ONE WORD PER COLOUR — supersedes the session-13 stems ruling below.**
  Megan's call, in her words: "It is going to be very confusing if I have to learn 2 different words
  for the same colour." She is the learner, so pedagogy wins over completeness here even though the
  session-13 linguistics were correct. The colour set = the bo- forms she has just recorded herself
  (u2l6-01..12 — her 12 new raws match those cards 1:1), and the ★ Colours (native) source recording
  is OUT: she deleted her working copy and its bare-stem voice is the second word she doesn't want.
  ⚠️ NOT YET DONE, needs her sign-off on scope (see Pending item -1): u2l6-13..16 (the bare stems
  ntsho/sweu/khibidu/tala) are duplicates and go; u2l6-17 serolwana is literally noted on the card as
  "a second, separate word for yellow" and 18 mmala wa loapi is a second way to say blue, so both
  fall under the same ruling; but u2l6-19 mmala wa namune is the deck's ONLY word for orange, so it
  is not a duplicate — decide it on its own merits. The stem CONCEPT survives regardless: rule card
  u2l6-00 teaches it and u2l6-10..12 (Pitse e tshweu / e ntsho / Tlhale e khibidu) drill it in
  context, all three of which she has recorded.
- 2026-07-17 (session 13): ~~Colour stems get their OWN cards alongside the bo- forms~~ **SUPERSEDED
  2026-07-17 by the session-14 ruling above** — kept for the reasoning, which still stands: both are
  correct Setswana (bo- = noun form, bare stem = concord form; verified vs davies-1992/beibele/
  Otlogetswe). The linguistics were never wrong; teaching both to one learner was.
  New src convention: `native-recording` for
  phrases grounded only in Megan's recordings (component words must still corpus-verify).
  Never wire audio to a card whose displayed tsw doesn't match what the voice says.
- 2026-07-17 (session 13): Cards may ship silent (no audio: field) and get audio wired later by
  the export — preferred over exporting from recordings that still have background music.
- 2026-07-17 (session 12): The session-5 "she does NOT want a reset feature" ruling is RETIRED —
  she wants in-app resets when supervised builds are reliable. Reset semantics stay: hard-delete
  the SRS rows (server first, then local+outbox), XP/streak/lessonIdx untouched, per-device.
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
- **Never call an audio file defective off one sampled gap, and always measure a known-good
  control.** (2026-07-18) A single reading at the head of `Numbers.mp3` hit its silent lead-in
  (−91 dB) and a single reading in `Animals.mp3` hit a real gap (−29 dB), producing the exactly
  backwards conclusion that one was clean and the other music-laden. Measuring EVERY inter-word gap
  plus a control on the Peace Corps lessons already shipping settled it: PC −18…−21 dB, her
  recordings −29…−31 dB, i.e. hers are quieter. Recipe:
  `ffmpeg -i f.mp3 -ss <gapStart> -t <len> -af volumedetect -f null -` over each gap from
  `segments.json`. Note `-v error` SUPPRESSES volumedetect's output — leave it off.
- **Content.js parsers must brace-match and must be validated against `RL_CONTENT`.** (2026-07-18)
  A `\{[^{}]*id:...[^{}]*\}` regex silently drops every item containing a nested `concordSlot`
  object — 57 items, the whole u3 paradigm included — and looks perfectly healthy while doing it.
  Rule cards also carry `tsw: ''` (empty string, not a missing field), so `if not match` counts
  them as real silent cards; the app filters with `.filter(i => i.tsw)`, so mirror that. Both bugs
  were invisible until the output was diffed against what the app itself loads.
- **`export-item-audio.py` / `slice-lessons.py` need utf-8 stdout on Windows.** The `★` in the
  native lesson keys reaches the log through each job's `origin` label; under cp1252 the export
  dies **after cutting clips but before writing content.js**, leaving files on disk unwired. Both
  scripts now force it — don't remove.
- **Changing the slicer's silence thresholds renumbers every lesson's segments and invalidates
  every committed tag.** (2026-07-18) Tempting when a new recording has tight gaps (Food's are
  0.36–0.84 s, barely over `MIN_SILENCE`). Don't: use the tagger's ✂ Split/⤵ Join instead. After
  any re-slice, verify with a containment check that existing tags still sit inside their segments
  — 1 187 tags checked, 0 misaligned, is what a safe re-slice looks like.
- **`#katse-corner` is TWO different cats.** Both `mountKatseCorner()` (small, bottom-right of drill
  cards, class `katse-corner`) and `mountKatseMid()` (big, centred above Continue, class `katse-mid`)
  mount with `id="katse-corner"`. Only the CLASS tells them apart — so `document.getElementById(
  'katse-corner')` gives you whichever is on screen, and a check written against the id can measure
  the wrong cat and still report a pass. Always select `.katse-corner` / `.katse-mid` by class when
  verifying. (Cleanup queued — see Pending item 3.)
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
