# Re:Lefela — superseded

**Wave 2 SHIPPED in session 35** (African Wordnet, sw v39, 9 177 entries — the bank is
at 9 179 today). This brief is done: do NOT paste it and re-run the job. Kept only for
the git-history trail; `PROJECT-STATUS.md` is the live state.

---

## The original brief (historical)

Written 2026-08-04 at the end of session 34, for whenever Megan is ready. Wave 1 shipped
that day (747 entries, sw v38); she then took the app away to use for a few days.

**Paste this to start the session:**

> /catchup re-lefela — then read `NEXT-SESSION-dictionary-wave2.md` in the repo root and
> follow it. Dictionary wave 2.

**Model: Sonnet** (her call, 2026-08-04). Everything in steps 0–3(a) is pattern-following —
the pipeline, the record shapes and three worked extractors already exist, and there is no
schema change, no migration and nothing touching auth or learner data beyond reading
`tutor_questions`. **The one exception is step 3(b), deeper example mining:** raising
example coverage without loosening the safety rules is subtle-correctness work, and it is
precisely where the session-34 review found real bugs (the homonym guard, the Bible
alignment, the corroboration thresholds). If she wants that, plan it on Opus first and hand
the implementation back to Sonnet.

---

## Step 0 — ASK FIRST. Do not open by building.

Her decision at the end of session 34 was explicit: **wave 2 is parked, and the next
dictionary session is driven by what she actually hit in real use, not by adding more
entries speculatively.** The precedent she was reasoning from is the Sentence Builder —
it was "finished" until she played it, and real play (not planning) produced the 3-miss
reveal and the 🛟 button.

So open with the question, in plain words:

- How did the dictionary feel? What did you look up?
- Did the example sentences actually help, or were they in the way?
- Anything you searched for that wasn't there, or that came back wrong?

Then, and only then, propose work — and **get an explicit go-ahead before writing any
file** (the standing execution gate).

## Step 1 — read what she actually missed

Every "💬 Ask for this word" tap filed a row. Read them before anything else:

```sql
-- re-lefela Supabase project: opacjlgljeippheotyhz  (MCP server: supabase-nwu-relefela)
select q.created_at, p.username, q.question, q.context
from tutor_questions q join profiles p on p.id = q.user_id
where q.context like 'dict-miss:%' and q.addressed_at is null
order by q.created_at;
```

⚠️ Rows whose `context` starts `builder-auto:` are Sentence Builder struggle reports, a
different thing — don't confuse them.

Also re-check activity live rather than trusting any note in a status file (this exact
trap produced a false "blocking" item that survived three sessions — see PROJECT-STATUS.md
session 34, item 2):

```sql
select p.username,
       (select max(s.updated_at) from srs_items s where s.user_id = p.id) as last_save,
       (select count(*) from srs_items s where s.user_id = p.id)          as words
from profiles p order by 1;
```

## Step 2 — the gap-fill loop (this is the main event)

For each missed word, **with Megan in the session**, look it up in the desk dictionary at
`dictionaries/Z. I. Matumo - Setswana-English-Setswana Dictionary ...pdf` (gitignored,
consulted like a paper dictionary — see the hard rules below), and add it by hand.

Where hand-added entries go: a new source file `toolkit/dict-src/desk.json`, same record
shape as the others, tagged `"src": ["desk"], "chk": true`. Add `'desk'` to
`SOURCE_ORDER` in `toolkit/dict-build.py` when that file first exists — it is already an
accepted tag in `verify-dict-bank.py` (`KNOWN_SRC`) and in `DICT_SRC_LABEL` in index.html.

Record shape (see `toolkit/dict-src/app.json` for live examples):

```json
{"tsw": "…", "eng": ["…"], "pos": "v", "cls": null, "note": "", "src": ["desk"], "chk": true}
```

## Step 3 — wave 2 proper, only if she wants it

Both of these are specced but unstarted. Neither is urgent; ask which (if either) she wants.

**(a) DBE maths dictionary — ~400 terms.** `dictionaries/Multilingual Mathematics
Dictionary ... .pdf`, born-digital with a clean text layer, SA government publication
distributed free. Layout is an English headword then one labelled row per language
(`Setswana\t<term>`), several languages per entry, sometimes two Setswana variants.
Write `toolkit/dict-extract-dbe-maths.py` → `toolkit/dict-src/dbe-maths.json`. The
`dbe-maths` source tag is **already reserved in all three places that must agree**
(`dict_common.SOURCE_LABELS`, `verify-dict-bank.KNOWN_SRC`, `DICT_SRC_LABEL` in
index.html) — a trap the code review caught, don't re-open it.
⚠️ Honest scope note to give her: this is Grade R–6 maths vocabulary, not SECL121 words.
Cheap and legal to add, low value for her own studying. Say so rather than selling it.

**(b) Deeper example mining** — currently 52% of entries carry an example. Options: widen
the Autshumato pass, or pull in the NCHLT text corpus. Do NOT raise coverage by loosening
the safety rules — see the hard rules.

## Hard rules — do not break these

1. **`dict-bank.js` is GENERATED. Never hand-edit it.** Rebuild:
   ```bash
   python toolkit/dict-extract-sources.py
   python toolkit/dict-mine-examples.py
   python toolkit/dict-build.py
   python toolkit/verify-dict-bank.py     # ship gate — must print OK
   ```
2. **`dictionaries/` is gitignored and stays that way.** Those are commercial books
   (Matumo, CASAS). They are consulted one entry at a time, with Megan, and NEVER
   bulk-extracted, committed, or quoted at scale. This repo is PUBLIC.
3. **No unsourced Setswana, ever** — the house rule from `toolkit/SOURCES.md`. Nothing in
   the pipeline may compose, conjugate or "correct" a Setswana string; every one is copied
   verbatim from a named source and keeps its tag.
4. **Public repo: no real learner name, username or account id in any tracked file.**
   "the second learner" is the established stand-in.
5. **Service worker:** bump `CACHE` (`relefela-vN`) whenever any app-shell file changes.
   Leave `AUDIO_CACHE` alone unless an existing audio file's *bytes* changed — a dictionary
   change never touches audio.
6. **No SRS writes, no XP from the dictionary.** It is a reference tool. Verify it by
   comparing `state.srs` / xp / queue before and after a session, not by assuming.

## Gotchas the session-34 code review found — don't reintroduce them

- **The two Bibles are NOT reliably line-aligned** (only 97 of 261 chapter files have equal
  line counts). Never pair them by line number without the corroboration gate in
  `dict-mine-examples.py`. Measured: the gate still passes on 12% of deliberately
  misaligned text, which is why the equal-count gate stays too.
- **`toolkit/wordlist.js` is NOT evidence of what is Setswana** — it is built partly from
  the bilingual Peace Corps course, so it contains "table", "knife", "today".
- **The Peace Corps course text has non-alternating regions** (table of contents,
  pronunciation guide). They are skipped structurally in `_pc_lines()`; the guide is
  titled "Lesson 1: A Guide to Pronunciation", so the line that ends the ToC skip also
  starts the next skip. Junk headwords like "Alphabet", "ch", "ph" shipped once this way.
- **The build must stay deterministic** — sort every set iteration and give ties an
  explicit tie-break. Python randomises string hashing per process; an unsorted set once
  made the same inputs produce different provenance between runs, invisibly to the gate.
  Check with two builds under different `PYTHONHASHSEED` values and diff the md5.
- **Homonyms:** if an entry's meanings are all stopwords ("I", "me"), nothing can check an
  example's relevance, so that entry gets **no** mined example. Applied per entry in
  `dict-build.py`, not just per headword — one headword can split into two entries.

## Ship ritual

Use the `/ship` skill. Verification bar for this feature, matching session 34:

- `python toolkit/verify-dict-bank.py` prints OK.
- The node harness passes — regenerate it if the scratchpad copy is gone; it brace-slices
  the real `norm`/`dictSearch`/`dictEntryHTML`/`dictClosest` out of index.html and loads
  the real `dict-bank.js` (57 assertions at the end of session 34).
- A `?local=1` browser pass reading the DOM (screenshots time out in the Browser pane):
  a Setswana word, an English word, a miss with its closest-match chips, one 🔊.
  Unregister the service worker + clear caches + localStorage first, and wipe again after.
- Live-verify after push: live `sw.js` / `index.html` / `dict-bank.js` byte-identical to
  local, `CACHE` at the new version, `AUDIO_CACHE` unchanged.
- Update `PROJECT-STATUS.md` and mark any `dict-miss:` rows you resolved as `addressed_at`.

## Useful state

- Spec + full build/review record: `SPEC-dictionary-panel.md` (§9 what shipped, §10 what
  changed against the spec, §11 verification, §12 the code review's nine findings).
- Wave 1 commit `9d1d9b7`; status wrap-ups `0a79ff4`, `d8f60a9`, `dbd8fe5`.
- Live: https://megzieberr.github.io/re-lefela/
