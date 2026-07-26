# SPEC — Sentence Builder (build-your-own-sentence drill)

**Status:** spec for ruling — nothing built yet. Written 2026-07-26 (catchup session), revised
same day: **tile input dropped — she wants to type the sentence herself.** Tapping tiles was too
easy to pose any real challenge; typing is what actually tests whether she can produce the
sentence, not just recognise the right pieces in a small pool.
**Feature ask (Megan, verbatim intent, from a live 2026-07-26 tutor session):** building her OWN
Setswana sentences from known words is much harder than the app currently tests, and barely
practiced at all — every existing drill either recognises an app-authored sentence or reproduces
one from memory, never recombines pieces into something the app didn't hand her verbatim.
Confirmed ruling: **NOT graded by a live grammar checker** (would false-negative on
correct-but-unexpected phrasing) — instead a bank of **pre-planned sentences**, each independently
checked against source before it ships. She **types** her answer in Setswana; grading is simple
text matching against the pre-checked answer(s), not a grammar check.

## 1. Goals and non-goals

**Goals**
- A drill where she **types** a Setswana sentence from an English prompt — recombining
  words/concords from across everything she's learned, not repeating one fixed phrase, and not
  just picking from a small tile pool (no recognition shortcut).
- Every prompt's correct answer(s) are pre-written and pre-checked against source
  (`toolkit/GRAMMAR.md`, `toolkit/sentence-bank.tsv`, the Peace Corps corpus) before they ever
  reach the bank — same "no unsourced Setswana" bar as content.js.
- Grading is text matching against those pre-checked answers — **no live grammar checking.**

**Non-goals / hard constraints**
- No LLM, no grammar parser, no generated Setswana. Same R0 posture as Bua le Katse.
- Nothing ships to the bank unreviewed — a script may *draft* candidate sentences, but a human
  check against source happens before anything is playable (see §2).
- No schema change, no new Supabase table. Works fully in `?local=1`.

## 2. The bank: how it's built and checked

New file **`builder-bank.js`** (sibling of `content.js`/`dialogues.js` — deliberately a different
name from `toolkit/sentence-bank.tsv`, which is a separate reference file for content sourcing,
not a drill bank).

**Pipeline:**
1. A toolkit script (`toolkit/gen-builder-candidates.py`, new) combines existing content.js pieces
   — concords × verbs × nouns/classes already in the app — into candidate sentences. This is a
   draft generator only; its output is never shipped directly.
2. Every candidate is checked by a human against `GRAMMAR.md` / `sentence-bank.tsv` / the corpus
   before being hand-copied into `builder-bank.js` — exactly the same discipline as writing a new
   content.js item. A generated combination that's grammatically well-formed but not idiomatic
   Setswana gets dropped, not guessed into shipping (same rule that excluded PuoData's synthetic
   Setswana).
3. A verifier script (`toolkit/verify-builder-bank.py`, new, same shape as `missing-audio.py`)
   cross-checks every shipped entry: every `usesIds` item actually exists in content.js, every
   tile's Setswana traces to a real item's `tsw`, no duplicate prompt ids.

**Entry shape:**
```js
const RL_BUILDER = [
  {
    id: 'sb-u1-01',
    eng: "I don't have a book",
    // one or more pre-checked correct sentences — each a full string, not a tile list
    accept: [ 'Ga ke na buka' ],
    usesIds: ['u1l4-10','u1l6-00'],           // content items this sentence draws from
    src: 'grammar-toolkit+peace-corps-L11',
    note: 'na le = have; negative drops le before a bare noun object — GRAMMAR.md §5'
  }
];
```
Where more than one grammatically distinct sentence is genuinely correct (your own drill surfaced
this: *ga ke na buka* vs *ga ke na le madi* for "I don't have —"), `accept` lists every one of
them as its own full string, each independently source-checked — never inferred at grading time.

## 3. Where it lives

**Standalone mode**, entered like Bua le Katse (`🧩 Sentence Builder` home button, next to
`💬 Bua le Katse`), not folded into individual lessons. A sentence worth building almost always
crosses lesson boundaries on purpose (concord from u1l4 + verb from u1l6 + noun from u1l5) — that
recombination across lessons is the whole point, so it doesn't belong to any one lesson's
exercise set.

**Unlock gating** — same mechanism as chat scenarios: each `RL_BUILDER` entry (or a scenario
grouping several) carries `usesIds`, and it only becomes drawable once every id in that list is
learned (`state.srs[id].reps >= 1`). Prompts unlock progressively as she progresses, same spine
model as Bua le Katse's `requires`.

## 4. SRS interaction

**No SRS writes.** A correct sentence touches several ids at once (concord + verb + noun); the
existing `srsGrade()` assumes one grading event per queue draw and its intervals are tuned around
that cadence. Common concords (`ke`/`o`/`re`) recur in nearly every sentence — grading each one on
every correct build would rack up reps/interval growth far faster than the algorithm expects,
distorting scheduling for words that are just frequently-used pieces, not necessarily well-known.

Sentence Builder gets its **own local tracking key**, `rl_builder` (`{done: {...}, streak}`),
same precedent as the chat's stretch-word tracking (`rl_chat.stretchMet` — "recorded, but NO SRS
write"). It's additional practice on top of the item drills, not a substitute or a hidden rep
inflator. Added to `clearLearnerState()`'s wipe list.

## 5. Grading

Typed input is compared against every string in that prompt's `accept` array, using the app's
existing `norm()` (case/punctuation-insensitive) — a match against any listed sentence = correct.
A small spelling-tolerance pass (the existing Levenshtein `answerMatches`-style "close" match,
already used on typed cards elsewhere) is worth keeping so a single mistyped letter doesn't fail
the whole sentence — but the *comparison target* is still always one of the pre-checked full
sentences, never a live grammar rule. Word order still matters: a correct reordering only passes
if that exact reordering is separately listed in `accept` — nothing is inferred at grading time.
If she types something not in `accept` but you later confirm it's also valid Setswana, that's a
one-line addition to the bank entry, not a grading-time exception.

XP: +2 per correct sentence (kind `'builder'`), reusing `addXP`'s existing queue — no new sync op
shape needed, same as chat's `'chat'` XP kind.

## 6. UI — typed input

Dropped the tile-tap idea — tapping from a small pool made the right answer too easy to spot by
elimination rather than actually produce. Instead:

- English prompt shown at the top of the screen.
- A single text field (reusing the same typed-input pattern as `dictate`/`typeTsw` cards and the
  chat's typing mode — `autocomplete="off"`, `autocapitalize="off"`, Enter-to-submit).
- Check button grades against `accept` per §5. Correct → brief Katse celebration + next prompt.
  Wrong → the typed attempt stays visible with a gentle "not quite" + (after a miss or two) a
  hint drawn from the entry's `note`/`src`, then lets her retry — no penalty beyond that, same
  no-dead-ends mercy as the rest of the app.
- No tile pool, no distractors — nothing left in the UI to author per-prompt beyond the prompt
  itself and its accepted answer(s).

## 7. State & plumbing

- `localStorage 'rl_builder'`: `{done: {'sb-u1-01': true, ...}, streak}`. Local-only, cosmetic —
  losing it costs a completion checklist, nothing pedagogical (same tier as `rl_chat`).
- `builder-bank.js` loaded after `content.js`, added to the SW precache list; sw cache bump on
  ship (content-only change, `AUDIO_CACHE` untouched — no audio referenced).
- Available to both accounts and in `?local=1`. Not Megan-gated.

## 8. Verification plan (build session)

- `toolkit/verify-builder-bank.py`: every `usesIds` resolves to a real content.js item, no
  duplicate prompt ids, no entry with an empty `accept`.
- Node `new Function()` re-parse of `index.html`'s inline script + `builder-bank.js` after every
  edit (standing ritual).
- Preview `?local=1`, SW unregistered + caches cleared: type several prompts, confirm both a
  single-answer and a multi-answer prompt grade correctly, confirm a correct-but-differently-
  ordered sentence is rejected unless separately listed, confirm the spelling-tolerance pass
  still requires the right word order, confirm unlock gating with a doctored `state.srs`.
- 375×812 clearance check on the prompt + input field + keyboard.
- Ship ritual: sw bump, `AUDIO_CACHE` untouched, live-verify.

## 9. Open questions for Megan's ruling

1. **Bank size for v1:** a handful of prompts per already-taught unit (u1–u2), or wait until a
   later unit is done so there's more to recombine? Recommended: start with u1–u2 only, since
   that's what's actually learned and drillable today.
2. **Grouping:** one continuous pool of unlocked prompts (like Daily Quest draws), or named
   "sets" she picks from (like the chat's scenario picker)? Recommended: continuous pool, simpler
   and avoids a second picker screen to maintain.
3. **Spelling tolerance:** should a small typo (one wrong letter) still count as correct with a
   "check your spelling" nudge — like typed cards elsewhere in the app — or should Sentence
   Builder demand an exact match, since producing the sentence correctly is the whole point of
   the exercise? Recommended: keep the same small tolerance as other typed cards, so a fumbled
   keystroke doesn't fail an otherwise-correct sentence.
4. **Confirm the generation pipeline in §2** — script drafts, human checks, verifier script
   double-checks before ship — matches what you want, or would you rather write bank entries by
   hand from the start with no generator involved?
