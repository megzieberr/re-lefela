# SPEC — Dictionary panel (single-word lookup, both directions)

**Status: BUILT + CODE-REVIEWED 2026-08-04** (same day), on her go-ahead and her six rulings
in §8. Shipped as `dict-bank.js` (747 entries) + the 📖 panel in index.html, sw **v38** —
after a five-reviewer pre-ship pass she called for, which found and fixed nine real problems
(§12).
What changed against this spec while building — all of it recorded in §10 below:
the Peace Corps glossary had to be re-parsed from the raw course text, and the
**Autshumato parallel corpus was added as the main example source** after the
Bible pair turned out not to be reliably aligned.

**Written:** 2026-08-04 (planning session).
**Feature ask (Megan, verbatim intent):** "I want to translate this word" — single words only,
never whole sentences. English→Setswana and Setswana→English, and for each word a definition
and an example sentence. Motivating moment: she wanted to say "I don't want to get up", knew
*ema* = stand, and wanted to see *ema* used in a real sentence before trusting it.
**Her ruling on sources (2026-08-04):** the full commercial desk dictionary is **never published
in the repo or the app** — it is consulted locally, entry by entry, only to fill gaps. The
shipped database is built from openly licensed sources.

## 1. Goals and non-goals

**Goals**
- A 📖 dictionary panel in the app: type a word in either language, see matching entries
  instantly — meaning(s), part of speech, noun class where known, and where available a real
  example sentence in Setswana with an English translation.
- Every entry traceable to a named source. No invented Setswana anywhere — same R0 posture as
  Bua le Katse and the Sentence Builder: definitions and examples are *extracted* from sources,
  never composed by an agent.
- A miss (word not in the database) turns into a to-do for Megan instead of a dead end, feeding
  the gap-fill loop (§6).

**Non-goals / hard constraints**
- No sentence translation, no LLM, no morphological analyser guessing at conjugated forms.
- No SRS writes and no XP — this is a reference tool, not a drill. Looking a word up must never
  touch `state.srs` or `xp_events`.
- The desk-reference PDFs in `dictionaries/` are never committed, tracked, quoted at scale, or
  bulk-imported. (Pending: one `.gitignore` line making that structural — see §8 Q1.)

## 2. Sources and licences

| Source | What it gives | Licence / basis | Approx size |
|---|---|---|---|
| App's own `toolkit/course-glossary.js`, `wordlist.js`, `sentence-bank.tsv`, `content.js` | Checked TSW↔EN pairs + checked sentences; 307 voiced cards | Ours, already human-checked | ~300–400 entries, start `chk:true` |
| Wiktionary extract, `dictionaries/wiktionary-tswana-raw.jsonl` (fetched 2026-08-04) | 350 lemmas, all with definitions, 16 with examples | CC BY-SA — needs one attribution line in the panel (§8 Q4) | 350 |
| Peace Corps Setswana course + comprehensive grammar (`corpus/`) | Vocab lists with EN glosses, some example phrases | US government work, public domain | est. 300–600 (verify during extraction) |
| DBE Multilingual Maths Dictionary Gr R–6 (`dictionaries/`) | Clean EN→TSW maths terms | SA government publication, distributed free | ~400 terms |
| Bible pair `corpus/bible-tsn` (Biblica 1993, NT) ↔ `corpus/bible-eng` (World English Bible, public domain), aligned per book/chapter/verse | Example sentences WITH English translations | WEB is public domain; Biblica standard quoting permission needs a check (§8 Q6) | example pool |
| `corpus/beibele-bssa-full.txt`, NCHLT text corpus, Autshumato | More example sentences (Setswana side only) | mixed — per-source check | example pool |
| Desk dictionaries in `dictionaries/` (Matumo 1993 etc.) | Gap-fill lookups, one entry at a time, typed in by hand during a session | consulted like a paper dictionary; never bulk-extracted | — |

Merged and de-duplicated, v1 lands at roughly **1,200–1,600 unique entries** — thousands, not
Matumo's twenty thousand, but every one legal, sourced, and growing via the gap-fill loop.
(Supporting evidence for this order: Prinsloo's Lexikos 14 review found ~half of Matumo's
lemmas never occur in a real Setswana corpus — a corpus-grounded list this size covers the
words a learner actually meets.)

## 3. Database format

One new content file, `dict-bank.js` (same pattern as `builder-bank.js`), array of entries:

```js
{ tsw: "ema",                 // headword, Setswana
  eng: ["stand", "stand up"], // meanings, plain English (doubles as the definition)
  pos: "v",                   // v / n / adj / adv / pron / conj / interj / phrase
  cls: null,                  // noun class prefix pair for nouns, e.g. "mo-/ba-"
  note: "",                   // optional plain-English usage note (English only — no
                              // agent-composed Setswana, ever)
  ex: [{ t: "…go ema fa pele ga baba ba bone.",
         e: "…to stand before their enemies.",
         src: "bible-nt" }],  // 0..n examples; t always verbatim from source
  src: ["wikt"],              // provenance tags: app / wikt / pc / dbe-maths / desk
  chk: false }                // true once a human has checked the entry
```

- Both directions come from this one table: the panel searches `tsw` and `eng` (via `norm()`),
  and an EN→TSW reverse index is built once at load. No second file to drift.
- Entries imported verbatim from a named source ship as `chk:false` with their source visible
  in the UI (§4) — the source is the authority, not us. Entries from the app's own checked
  glossary ship `chk:true`. Anything Megan adds via gap-fill is `src:["desk"], chk:true`
  (she checked it against the desk dictionary herself, in session).

## 4. Panel UX

- **📖 Dictionary** button on the home screen — no unlock gate (a reference must always be
  reachable), available signed-in, signed-out, and in `?local=1`.
- One search box, search-as-you-type over normalised text (reuse the app's `norm()` so
  diacritic-free typing matches, same as everywhere else). Direction is automatic — whatever
  she types is matched against both languages; exact matches sort first, then prefix, then
  contains.
- Entry card: headword · POS/noun class chip · meanings · examples (Setswana line, English
  line, small source label) · small provenance chip (e.g. "Wiktionary", "Peace Corps",
  "course") · 🔊 play button when the headword matches a voiced `content.js` card (match by
  normalised `tsw` — ~300 words instantly get native audio for free).
- Conjugated-form honesty: exact/contains matching will miss inflected forms (searching
  *paletswe* won't find *palelwa*). v1 shows "no exact match — try the stem" with the closest
  prefix matches, rather than pretending to do morphology.

## 5. Offline and caching

- `dict-bank.js` added to the service worker **CORE** precache (single lazy `<script defer>`;
  estimated well under 1.5 MB at v1 size, in line with the app's existing footprint) — so the
  dictionary works offline like everything else. `sw.js` CACHE bumps one version when it ships;
  **AUDIO_CACHE untouched** (no audio bytes change).
- If v1 comes out heavier than ~2 MB, fall back to fetch-on-first-open + runtime cache
  (§8 Q2 lets her pick).

## 6. The gap-fill loop (Matumo's actual job)

1. She looks up a word; no entry matches.
2. The panel shows "Not in the dictionary yet" with a one-tap **💬 request this word** button →
   inserts a `tutor_questions` row, `context: 'dict-miss:<query>'` (reuses the existing table
   and gates exactly like the tutor fab; fire-and-forget, deduped per word per day like
   `builder-auto`).
3. Next session, the tutor reads `dict-miss:` rows first thing (same ritual as `builder-auto:`),
   Megan looks the word up in the desk dictionary, dictates/types the entry, it lands in
   `dict-bank.js` as `src:["desk"], chk:true`, ships with the next content push.

This is the ruled-on shape: the commercial dictionary improves the app one human-checked entry
at a time, and nothing from it is ever bulk-copied or published.

## 7. Extraction pipeline (all in `toolkit/`, all rerunnable)

- `dict-parse-wiktionary.py` — wikitext → entries (definition lines, POS headers, the 16 usage
  examples, noun-class templates where present).
- `dict-extract-peacecorps.py` — vocab lists from the two Peace Corps text files.
- `dict-extract-dbe-maths.py` — English headword + Setswana rows from the DBE PDF (born-digital,
  clean text layer).
- `dict-mine-examples.py` — for each entry, search the corpora for short sentences containing
  the exact headword form; prefer the verse-aligned NT pair (Setswana sentence + English verse
  translation for free); cap at 2–3 examples per entry, shortest first; every example records
  its source. No English translation is attached unless the source supplies one.
- `dict-merge.py` — merge by normalised headword, union meanings, keep provenance per source.
- `verify-dict-bank.py` — ship-gate (same role as `verify-builder-bank.py`): schema valid, no
  duplicate headword+pos, every example genuinely contains its headword form, every entry has
  ≥1 source tag, LF-only/no-BOM by binary read; exits 1 on any failure.

House-rule fit: scripts only *extract verbatim* from sources — the drafts-only rule for
composed Setswana doesn't arise because nothing is composed. The one human-judgement seam is
example *selection* (which sentence is clearest); the verify script enforces the mechanical
part, and source labels in the UI keep the rest honest.

## 8. Open questions — RULED 2026-08-04

1. **`.gitignore` line for `dictionaries/`** — one line, then the folder can never be
   committed to the public repo. Yes? (The Wiktionary JSONL could later be exempted — it's
   openly licensed — but safe-by-default first.)
2. **Offline weight:** precache the whole bank in CORE (recommended, works offline everywhere)
   vs fetch-on-first-open if size balloons.
3. **Misses:** manual "💬 request this word" button only (recommended — a lookup is often idle
   curiosity), or auto-file every miss like `builder-auto`?
4. **Attribution footer:** one small line in the panel, e.g. "Includes material from
   Wiktionary (CC BY-SA) and US Peace Corps Setswana materials." Required for Wiktionary. OK?
5. **v1 scope:** ship app-glossary + Wiktionary + Peace Corps first and add DBE maths terms +
   deeper example mining as wave 2 (recommended), or everything in one wave?
6. **Bible examples licence:** the aligned NT pair is Biblica 1993 — standard Bible quoting
   permissions almost certainly cover single-verse examples with a source label, but I want to
   read their actual terms before shipping any; if it's murky, examples come from the
   public-domain WEB-aligned subset and the openly licensed corpora only.

**Her rulings, verbatim order:** (1) yes, add the `.gitignore` line — done, `dictionaries/`
is ignored and `git check-ignore` confirms the PDFs cannot be committed; (2) **preload** —
`dict-bank.js` is in the service-worker CORE precache and was verified working with the
server stopped; (3) **manual button only** — nothing auto-files, a miss shows
"💬 Ask for this word"; (4) yes to the attribution footer — it names Wiktionary, the NT,
Autshumato and the Peace Corps course; (5) **first wave** — app + Wiktionary + Peace Corps
shipped, the DBE maths dictionary is held for wave 2; (6) checked, and the answer was better
than expected: the Tswana NT is **CC BY-SA 4.0**, not restrictive copyright, so it is cleared
for use with attribution (the wording the licence asks for is in the panel footer).

## 9. What shipped

| | |
|---|---|
| Entries | **747** (298 human-checked from the app's own cards; was 761 before the §12 review purge) |
| Examples | **1 052** across 394 entries (**52%** have at least one) |
| Size | 194 kB, precached — offline-verified with the server stopped |
| Audio | 298 entries play the app's existing native clip |
| Noun class | 198 entries |

Example sources: 845 Autshumato · 151 the app's own course sentences · 17 Peace Corps ·
2 Wiktionary · **2 Tswana NT**.

Coverage is honest rather than flattering: **49% of entries have no example yet**, and the
panel says so per entry ("No example sentence yet for this word") instead of leaving a blank.
Those gaps are the natural feed for the §6 loop. Some of that 49% is deliberate — see the
homonym guard in §10E.

Files added: `dict-bank.js` (generated), `toolkit/dict_common.py`, `toolkit/dict_lang.py`,
`toolkit/dict-fetch-wiktionary.py`, `toolkit/dict-extract-sources.py`,
`toolkit/dict-mine-examples.py`, `toolkit/dict-build.py`, `toolkit/verify-dict-bank.py`,
`toolkit/dict-src/*.json` (the audit trail). Changed: `index.html`, `sw.js` (v37 → **v38**,
AUDIO_CACHE untouched — no audio byte changed), `.gitignore`.

## 10. What the build changed against this spec, and why

**A. The Peace Corps glossary could not be used as it stood.** §2 assumed
`toolkit/course-glossary.js` was a usable list of pairs. It is deliberately best-effort — it
keeps rows it cannot pair so nothing is silently dropped — and feeding it straight in produced
visibly wrong entries: `'not want' → ['They will']` (English on both sides, split mid-sentence)
and `'sa batle' → ['O ne o']` (Setswana on both sides). Replaced with a parser that reads the
raw course text and **resyncs** when the Setswana/English alternation breaks on a section
header, which is what shifted every later pair by one in the first place. A language filter
(`toolkit/dict_lang.py`) then drops any pair it can prove is the wrong shape — 185 rows.

⚠️ **Gotcha worth keeping:** the first version of that filter used `toolkit/wordlist.js` as its
Setswana lexicon and rejected 765 of 774 rows. `wordlist.js` is built from the Setswana NT
**plus the bilingual Peace Corps course**, so it contains "table", "knife", "today" — it is a
fine spelling-suggestion list, which is what it was built for, but it is not evidence of what
is Setswana. The lexicons now come from the two Bibles with the shared words removed from both.

**B. The Bible pair is not reliably aligned, and Autshumato replaced it.** §2 assumed the
verse-aligned NT would supply examples with translations. Checked rather than assumed: only
**97 of 261** chapter files even have equal line counts, because the Setswana Living NT merges
and splits verses. Pairing by line number would have printed confident English under unrelated
Setswana — the failure a learner cannot possibly spot.

Measured the corroboration rule (Setswana line contains the headword *and* the English line
contains that headword's meaning) against deliberately mis-shifted text: it passes on 30% of
correctly aligned lines but still on **12% of misaligned ones**, and stricter variants plateau
around 75% precision. So corroboration alone cannot police alignment — the equal-line-count
gate stays, and the NT is now a last resort capped at one verse per entry (**3 examples in the
whole bank**).

What took its place: **the Autshumato English–Setswana Parallel Corpora**, already on disk and
already used by `toolkit/autshumato-lookup.py`. All three sets are genuinely aligned (31 376 /
54 431 / 73 193 lines, identical on both sides), professionally translated, modern register,
CC BY 2.5 ZA. Example coverage went from 16% to **53%**, and 855 of the examples now come from
it. Two filters were needed: Setswana common nouns double as surnames (*moloi* = "witch",
*Moloi* = a person — the miner first illustrated it with three sentences about a farmer), so an
example is rejected when the headword survives untranslated into the English side or appears
capitalised mid-sentence; and corpus editing marks ("Translate)") are dropped.

**C. Examples that were not examples.** "go ja" was being offered as an example of *ja* — the
bare infinitive teaches nothing beyond the headword. Now rejected outright.

**E. The homonym guard — the one that cost real coverage, deliberately.** Examples are found
by matching the headword as a word, which cannot tell two identical words apart. *nna* is both
the pronoun "I/me" and the verb "to stay/live", and the panel was illustrating the **pronoun**
with the course's own checked sentence *"O nna kae?"* — "Where do you live?". The sentence is
correct; it is simply a different word, and a learner has no way to notice.

The rule now: if an entry's meanings give **nothing to check relevance against** — every
meaning is a stopword, as with "I / me" — that entry shows **no mined example at all**, from
any pool including the human-checked course sentences. Nothing beats misleading. Two follow-on
fixes fell out of it: the guard has to be re-applied **per entry** in `dict-build.py`, because
one headword can split into two entries and the miner works per headword (which is what let the
pronoun inherit the verb's examples); and the guard needs a **lower word-length threshold (3)**
than NT corroboration (4), because conflating them silently binned every example for *ja*
("eat"), *nwa* ("drink") and friends. Cost: about 2 points of coverage. Worth it.

**D. A wrong "past tense".** The course writes alternatives with a slash too, so
"robala sentle / borôkô" (two ways to say good night) was read as a tense pair, and the
invented form *boroko* then pulled in a sentence about sleeplessness. The past-tense split is
now restricted to single-word verbs, and any alternate form a source really did record ships in
the entry's `f` field — so search finds *tsene* → *tsêna*, and the ship gate knows the form is
sourced rather than guessed. **The ship gate caught this one, not a human read-through** — and
again later, when a refactor left the alternate forms attached to one part-of-speech group
while the example that used them sat in another (*Reetsa* / *reeditse*). Alternate forms are
now collected across the whole headword, since a form belongs to the word.

## 11. Verification

- **`toolkit/verify-dict-bank.py`** — ship gate, green on the shipped bank. Proven to bite:
  seeded six defects (example not containing its headword, duplicate headword+part of speech,
  example with no translation, unknown source tag, bare infinitive, CRLF) and it caught all six.
- **50-assertion Node harness** (`…\scratchpad\test-dictionary.js`) over the **real**
  `norm`/`dictSearch`/`dictEntryHTML` brace-sliced out of index.html and the real
  `dict-bank.js`. Also proven to bite: six seeded breaks (exact match not ranking first, escaping
  removed, `dict-bank.js` dropped from CORE, sw version not bumped, script tag removed, an
  example losing its translation) all caught, and the restored copy passes 50/50.
- **Browser walkthrough** (Browser pane, service worker + caches + localStorage wiped first and
  again after — screenshots time out in this pane, so everything was read via the DOM):
  `ema` returns "to stand" with three sourced examples; `stand` returns *ema* first and `water`
  returns *metsi* first; **`nna` returns both entries — the pronoun with its usage note and an
  honest "No example sentence yet", the verb with matching examples**; a voiced entry's 🔊
  resolves to a real clip (`items/u4l5-05.mp3`, 200,
  33 069 bytes); a miss shows the stem hint; the ask button is **absent** signed-out and in
  `?local=1` and **present** signed in (rendered only — never clicked, so no row was written to
  production); 375×812 with the longest headword in the bank has no horizontal overflow;
  0 console errors.
- **`state.srs`, XP, streak and the sync queue are byte-identical** before and after a full
  dictionary session — the "no SRS writes" rule measured, not asserted.
- **Offline proven, not assumed:** with the preview server **stopped** (a cache-busting fetch
  throws, confirming the network is really down), the app still loads all 761 words from
  `relefela-v38` and search works. The precached copy is 189 748 bytes — byte-identical to disk.

## 12. Pre-ship code review (2026-08-04, her call — five parallel reviewers)

Megan stopped the first ship for a `/code-review`. Five independent reviewers (house rules ·
shallow bugs · git-history regressions · pipeline logic · comment-vs-code). Two came back
clean; the other three found nine confirmed problems, all fixed before shipping:

1. **Junk headwords had shipped** — the Peace Corps ToC and pronunciation table leaked
   through the parser: "Lesson", "Page", "Alphabet", digraph rows (ch/ph/tlh…, "ph" even
   attracted a mined soil-pH example). Root cause: the pronunciation guide is literally
   titled "Lesson 1: A Guide to Pronunciation", so the line that ended the ToC skip also
   *started* the region that needed skipping. Both regions now skipped structurally; the
   entry count dropped 761 → 747, all junk.
2. **A Setswana phrase shipped as an English meaning** (*batla* = "Re ne re") — a misparsed
   conjugation table, made possible by a lexicon blind spot: "re" appears in the English
   Bible too, so the exclusive-subtraction lexicons knew nothing about it. The app's own
   checked vocabulary now vouches for such words as Setswana, single-word headwords reject
   full-clause glosses ("batla" / "I will not" is a table column, not a pair), and the
   ship gate gained a meanings-must-read-English check (signal = Setswana-ness MINUS
   English-ness, because *go* and *gape* are real words in both languages).
3. **The build was non-deterministic** — Python's per-process hash randomisation decided
   which part-of-speech entry won a tie when merging untagged records, so *rona*'s
   meanings and provenance differed between runs of identical inputs, invisibly to the
   gate. All set iteration is now sorted with explicit tie-breaks; proven by byte-identical
   builds under different `PYTHONHASHSEED`s.
4. **The ask button could file duplicates** — every keystroke re-rendered a fresh enabled
   button while a send was in flight, and the §6 "one row per word per day" dedupe had
   never actually been implemented. Now: `rl_dictasked` mark written BEFORE the network
   call (the Sentence Builder pattern), re-renders show "Asked ✓", `clearLearnerState()`
   wipes the key. Verified in-browser with a stubbed sender: one send total across the
   retype race.
5. **§4's "closest prefix matches" promise was unimplemented** — a miss showed only a
   static tip. `dictClosest()` now walks the query back until something matches and offers
   up to three tappable suggestions (*ithutetsa* → *ga a ithute*).
6. **The "reachable signed-out" comment was untrue** — the app has no signed-out browsing
   mode at all (the auth screen is all a signed-out visitor sees). Comment and spec now say
   what is true: ungated everywhere the app itself is reachable.
7. **`dbe-maths` tag trap defused** — the wave-2 source tag now exists in all three places
   that must agree (dict_common SOURCE_LABELS, verify KNOWN_SRC, index DICT_SRC_LABEL).
8. **Ship-gate hole: multi-word containment** — the example-contains-headword check used a
   raw substring for phrase headwords, which would accept "ke tla" hiding inside
   "…ba*ke tla*ela…". Now token-anchored (space-padded match). Latent (0 occurrences), but
   the gate's whole job is that check.
9. One reviewer disclosure: the pipeline agent re-ran the build to prove finding 3,
   overwriting the generated dict-bank.js mid-review — harmless (rebuilt from unchanged
   inputs), noted for the record.

After the fixes: full pipeline re-run deterministic, ship gate green (with its two new
checks), node harness extended to **57 assertions** including regression pins for every
class above (junk headwords, Setswana-as-meaning, dedupe-before-await, closest matches,
label-map completeness), browser walkthrough of the new miss path green, test state wiped.

## 13. Wave 2 — the African Wordnet (2026-08-04, built, NOT shipped)

Megan asked for "more words" and thought we had skipped some this morning. We had not:
the free sources were essentially fully harvested in wave 1. The only large untapped pool
was Matumo's ~20 000-entry desk dictionary, which stays out by her own standing ruling
(commercial book, public repo). So wave 2 went looking for a **new open source** instead,
and found one.

### The source, and the join that makes it usable

**African Wordnet (AfWN), Setswana, 2017 release** — 12 182 Setswana lemmas, CC BY 4.0.
AfWN was built on the "expand" model: Setswana words attached to Princeton Wordnet
meanings. So each synset names a meaning by **ILI number** but contains **no English at
all**. The **Open English Wordnet 2025** (CC BY 4.0) carries the same ILI numbers *with*
English words and definitions. Joining on ILI is the whole trick, and it works on **98%**
of AfWN entries.

⚠️ **Use the 2017 release, not the 2022 one.** The 2022 export (handle 684) replaced the
ILI/Princeton ids with internal UUIDs and dropped every definition — it cannot be joined
to English at all. Recheck if a newer release appears.

⚠️ **Licence discrepancy, open.** The 2017 Readme *and* the `license=` attribute inside
`wntsn-lmf.xml` both say CC BY 4.0; the SADiLaR catalogue page for the same item says
CC BY-NC-SA 4.0. Two creator statements against one catalogue field. Share-alike would
also clash with the CC BY-SA Wiktionary material already in the bank, so this is worth
settling before shipping — griesel.marissa@gmail.com. Recorded in `toolkit/SOURCES.md`.

### Result

747 → **9 177 entries** (8 790 from AfWN), `dict-bank.js` 194 kB → **1 575 kB**.
298 human-checked entries unchanged; everything new ships `chk:false`.

### The four quality gates, and why each exists

1. **Example containment.** AfWN attaches examples to the *synset*, so a sentence
   illustrates whichever synonym its author picked. Measured: **4 215 of 7 917**
   (word, example) pairs never contain the headword at all. Gate = whole-token match,
   **identical to the rule in `verify-dict-bank.py`** — a first attempt matched any token
   sharing a stem and the ship gate caught it, because that accepts different words
   (`kata`/`katakata`, `katisô`/`katisa`).
2. **Sense-ranked meanings.** Wordnet lists a word's senses commonest-first and WN-LMF
   preserves that order; a synset's rank is the best position it holds among its member
   words. Without this, `lesea` shipped glossed *baby/babe/infant* but **defined as "a
   project of personal concern to someone"** — the figurative sense — because its two
   synsets tied on every other signal and an arbitrary id decided it.
3. **Examples locked to the winning sense.** Containment cannot catch a *sense* mismatch:
   `lesea`'s figurative example really does contain "lesea". Examples now come only from
   the top-ranked synset — the one whose definition the entry carries. Cost: examples fell
   3 630 → 2 607 (25% → 20% coverage). Correct, and the same principle as the homonym
   guard: with nothing to check the sense against, show no example.
4. **Gloss usability**, mirroring the ship gate so failures are dropped here rather than
   blocking the build: one-letter meanings (wordnet is full of "C" for carbon) and the
   handful of real English phrases the Setswana-vs-English heuristic rejects ("let go",
   "tee shirt").

### App changes

- **Search ranks human-checked entries above unchecked ones on a tie** — new, and needed:
  8 790 unchecked words could otherwise bury a course word of the same rank and length.
  A tie-break only; an exact hit still beats a checked partial one.
- **Examples with no translation render without an English line.** AfWN publishes Setswana
  usage sentences with no translation; the panel previously would have printed "undefined".
- The ship gate's "every example has a translation" rule now exempts **named** sources
  (`UNTRANSLATED_EX_SRC`) and asserts the *inverse* for them — a translation appearing on
  an AfWN example means something went wrong. The rule was not weakened for everyone.
- Attribution footer credits AfWN and OEWN (CC BY 4.0 requires it).

### Verification (build only — NOT committed, NOT deployed)

Ship gate green: `9177 entries, 2607 examples, 298 human-checked, 1575 kB, LF-only, no BOM`.
Both `dict-extract-afwn.py` and `dict-build.py` byte-identical under different
`PYTHONHASHSEED` values (the 2026-08-04 determinism lesson). Browser pass at `?local=1`
reading the DOM: 9 177 words; `lesea`/`baby` resolve with the correct definition; `water`
puts her checked `metsi` first with its audio; an AfWN example renders with no English line
and no "undefined"; the miss path still explains itself; **localStorage byte-identical
before and after a full session** (no SRS writes, no XP); 0 console errors; service worker,
caches and localStorage wiped after.

### Known limits — say these plainly rather than letting her find them

- **It is a wordnet, not a beginner's dictionary.** Strong on nouns (6 876) and verbs
  (2 750), weak on adjectives (262), and missing common function words entirely. Of her
  three real misses: **baby is now solved** (`lesea`), **alone is still absent**, and
  **tissue matches only the archaic verb "to tissue"** (weaving) — not the paper hankie.
  The gap-fill loop remains the answer for everyday words.
- **Some entries still read oddly.** `ngwana` ties two equally-ranked senses and takes
  "any immature animal"; `rota` glosses as "stale, make" (wordnet's euphemism for
  urinating). Unchecked wordnet content, labelled as such in the panel.
- **Size**: 1.6 MB precached on her phone, up from 194 kB, per her wave-1 "preload" ruling.
  If that is too heavy, the cheapest lever is dropping AfWN entries whose glosses are
  bulk-imported one-word synsets.
