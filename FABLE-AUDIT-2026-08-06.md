# Re:Lefela — Fable full-scale audit, 2026-08-06 (overnight, report-only)

Scope: everything tracked in this repo, read-only, with extra weight on the day-old
Ditlhopha round (sw v45). All four of the repo's own gates were re-run tonight and are
green: **verify-forms-data.py OK** (54 cards, 6 classes, the known irregular pinned),
**test-forms.js 402 assertions green**, **verify-dict-bank.py OK** (9 179 entries, LF-only,
no BOM), **verify-builder-bank.py 57 entries all pass**. Binary CR/BOM check on
index.html, content.js, sw.js, dict-bank.js, builder-bank.js and PROJECT-STATUS.md: all
clean — the CRLF trap from the ship session has not crept back. Working tree clean, nothing
unpushed. GitHub was down tonight, so this audits what is on disk (which the session-40
live-verify showed is byte-identical to what is deployed).

The headline: **very clean.** The Ditlhopha code does exactly what the spec and the status
file claim, no learner name or secret is anywhere in the public repo, and the save path is
the most defensive one in your portfolio. The findings are content-level and cosmetic.

---

## Finding 1 — the dictionary's "checked" label covers meanings nobody checked
**Severity: correctness/content, the one real finding. Files:** `dict-bank.js` (generated),
merge logic in `toolkit/dict-build.py`, rendering in `index.html` line 1889
(`dictEntryHTML` — one `from:` line and one `· checked` flag for the whole entry).

**What's wrong.** When the African Wordnet wave merged into an existing human-checked
entry, the wordnet's extra meanings joined the same meanings list — and the entry still
shows the single "· checked" tag. **81 checked entries also carry merged afwn meanings.**
Sampled examples of what that produces:

- **nna** (the checked I/me entry) lists meanings "I · me · **male**" — "male" is a wordnet
  join riding under the checked flag. (The verb senses live in a correct separate entry.)
- **beke** (week) lists "bag · calendar week · week · hebdomad · **briefcase**".
- **bone** (they/them) lists "they · them · **fourth**".
- **Boroko** (Good night) lists "Good night · sleep · slumber".

Some of these may be genuine homonyms (I can't verify Setswana — that's your friend's
department); the *internal inconsistency* is that the repo's own rule distinguishes checked
from unchecked by source, but the display collapses that distinction whenever sources merged
into one entry. Examples already carry per-item source chips; meanings don't.

**Failure scenario.** You (or the second learner) look up *beke*, see "· checked", and file
"briefcase" as a vetted meaning. The whole point of the checked flag — "this one you can
trust outright" — quietly stops being true for exactly the 81 entries most likely to be
looked up (they're course words).

**Suggested fix (described, not applied).** Cheapest: in `dict-build.py`, set `k:1` only
when *every* merged meaning traces to a checked source, or keep unchecked meanings in a
separate entry instead of merging them into a checked one (the build already proved it can
hold two entries per headword — nna does). Alternatively render per-meaning source chips the
way examples already do. Then rebuild the bank via the four toolkit scripts (never
hand-edit), bump sw.js, ship. A 15-minute session with the list of 81 on screen would also
tell you which merged meanings are genuinely right and worth keeping.

## Finding 2 — a lost network response can double-save XP
**Severity: data integrity, low. File:** `index.html` lines 393–430 (`flushQueue`).

**What's wrong.** The outbox retries any transient failure forever (correct, and the
park-the-poisoned-row logic is genuinely good). But an `xp_events` insert has no idempotency
key: if the server *commits* the row and the response is lost (mobile timeout), the op stays
at the head of the queue and inserts again on the next pass — duplicate XP. SRS, streaks and
unit progress are all upserts, so they're naturally immune; only XP inserts can double.

**Failure scenario.** On flaky data, a 2-XP forms card occasionally banks 4. In a two-person
app where XP is a friendly race, this is cosmetic — noted so it's a known cause if the
weekly numbers ever look inflated (the 28-Jul "154 events on first load" pattern already
showed the queue can flush in bursts).

**Suggested fix, only if it ever matters.** A client-generated op id column with a unique
index; the retry then conflicts and drops out cleanly.

## Finding 3 — for the record: XP is client-trusted by design
**Severity: security, informational. File:** `schema.sql` (xp_insert policy).

Any authenticated learner can insert any amount up to 500 into their own `xp_events` from
devtools — the 0–500 check is the only server-side limit. Totally fine for a two-person app
where both players are on the same side; written down so this schema is never copy-pasted
into a class app (Circle Quest's server-authoritative `cgg_submit_round` is the pattern for
that). The rest of the schema is properly locked: RLS on every table, the join code redacted
in the public copy, tutor tokens stored only as SHA-256 hashes, and the tutor-progress
function genuinely read-only except its documented `delivered_at` stamp.

## Finding 4 — NEXT-SESSION-dictionary-wave2.md still reads as a live to-do
**Severity: stale docs. File:** `NEXT-SESSION-dictionary-wave2.md`.

Wave 2 shipped in session 35 (sw v39, African Wordnet, 9 177 entries), but this brief still
opens with "Paste this to start the session". A future session that finds it before finding
PROJECT-STATUS could try to re-run a done job. `NATIVE-RECORDINGS-NEEDED.md` shows the house
style for exactly this: a one-line "superseded — kept for the git trail" header. Add the
same line here (or delete the file).

## Finding 5 — one sentence is taught twice with mirror-image glosses
**Severity: polish/observation. File:** `content.js` (u2l4-08 and u4l4-04).

"O na le bana ba le babedi" appears as two cards: "he/she has two children" (u2l4) and
"she/he has two children" (u4l4). The only same-Setswana-different-English pair in all 307
cards (measured tonight by evaluating the real content.js in node — the whole-file sweep
found exactly this one). Harmless — but the duplicate string means the same sentence can sit
in two SRS slots and could appear beside itself in a word-bank draw. If u4l4 wanted a
revision card, fine as is; if it was an accidental re-add, one of the two could point
elsewhere. Related non-finding: the six cards stored with even class numbers (batho 2,
mala/mae 6, merogo 4, dikgomo/dinawa 10) are the already-plural cards — Ditlhopha's
`FORMS_BY_CLS` correctly excludes them, matching the spec's "six already-plural cards"
reserved for the v2 reverse questions. Intentional, verified, not a bug.

---

## What was checked and found CLEAN

- **Ditlhopha (the fresh code, walked line by line, index.html 1571–1824):** grades step 2
  off the card's stored plural, never the family table (`formsPlPrefix`, line 1611 — so
  leino → meno marks correctly); the family-first round-robin is real (`formsBuildRound`);
  a revealed card is locked out of XP and not marked done (`formsReveal` — no `done` bump,
  no `addXP`); no `srsGrade` call anywhere in the block; the known-card path skips only
  step 2; the miss ladder (retry → shape hint → reveal) matches the spec; the tap handlers
  lock on first correct answer so a double-tap can't double-award (line 1699–1704); every
  interpolated string goes through `esc()`. The home button computes its unlocked count
  live rather than hard-coding 54.
- **Service worker (sw.js, v45):** CACHE `relefela-v45` with `AUDIO_CACHE` untouched at
  `relefela-audio-v3` — correct for a round that adds no audio. All 23 CORE precache files
  exist on disk (checked one by one tonight). Old caches are cleaned on activate; audio is
  never evicted by app bumps; non-GET and cross-origin (Supabase) requests pass straight
  through, so no API call can ever be served stale from cache. Network-first for app code
  means the one unwatched gate — the phone install of v45 — degrades safely even if it
  misbehaves: online users always get fresh code.
- **XSS.** Every user-input echo traced: the dictionary search echoes the query through
  `esc()` (miss card, line 1972); chat bubbles escape the typed/chip reply (`chatBubble`,
  line 1188 — and the "chat" is the scripted dialogue scenarios, not an AI partner,
  matching the standing ruling); My-words filter, builder attempts, auth fields — all
  escaped or textContent.
- **Privacy in a public repo.** No learner name anywhere (the second learner exists only as
  DB rows; the Setswana-speaking friend is the nameless `spoken-2026`/`desk` source, as
  ruled); the join code is redacted in schema.sql and lives only in the deployed RPC;
  `dictionaries/` (the commercial desk books) is gitignored and not one file in it is
  tracked (re-verified tonight); the only person named is Megan herself plus the African
  Wordnet author in SOURCES.md — both public attributions, both fine.
- **Save path.** `clearLearnerState` covers all 15 learner keys including the new
  `rl_forms`; the outbox parks only 22xxx/23xxx permanent errors after 3 tries and keeps
  42501 loud — the design that already survived the expanded-year incident.
- **Bank consistency.** content.js ↔ dict-bank cross-check: all 298 course headwords
  present, every card translation reflected in its dict entry (the three apparent
  mismatches — nna, supa, Setswana — are correct separate homonym entries, not drift).
  builder-bank's 57 entries all resolve against content.js ids per its own gate.

## In short
Nothing here endangers your data or the second learner. The one thing worth a session: the
dictionary shows "checked" on 81 entries that also carry unchecked wordnet meanings — so a
wrong-looking meaning like beke = "briefcase" wears a trusted label. A build-script tweak
plus a rebuild fixes it. Everything else is a stale next-session brief and one duplicated
sentence card.
