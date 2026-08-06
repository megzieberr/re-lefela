# SPEC — the Plurals & Noun-classes round (one merged round)

**Written 2026-08-05 (session 36). Nothing built yet — this is the plan.**

Her ask, verbatim in intent: *"there is no practice for the plurals, it won't have audio, but we
need a lot more practice with the plurals"* and *"we need a round to drill the noun classes, bc I
see class 7 or class 5, but I never drilled that, so it means nothing to me."*

## 0. Her ruling on shape — changed in-session, and it was the right change

Her first instinct was **two separate rounds, combined later**. After seeing the numbers in §1 she
changed it: **"let's rather merge the noun classes and plurals."** Recorded here because the
change matters — **merging removes the blocker that would have stalled the noun-class round.**

Why: the thing that made a standalone class round unfair was that classes 2, 4 and 6 have only
one or two words each, so "which word is in class 4?" could not be asked honestly. **A merged
round never needs to ask that.** It is driven by a word she already knows and asks which *family*
it is in — and the families come from a fixed table of six prefix pairs, not from the card pool.
The thin-data problem simply does not arise.

It is also the truer lesson. In Setswana the class **is** the plural — *se-* becoming *di-* is one
fact, not two. Teaching them apart would have taught the same fact twice under two names.

---

## 1. What is already in the data (measured, not estimated)

Counted from `content.js` on 2026-08-05, 307 non-rule cards:

| | count |
|---|---|
| cards carrying `plural:` | **54** |
| cards carrying `cls:` | **66** |
| cards carrying **both** | **54** |
| word-cards with no plural at all | 63 |

**Every card that has a plural also has its class number.** That is why this round is possible
today with no content pass: those 54 cards are, exactly, the merged round's pool.

Today the app only ever **prints** this data — `plural` shows as a small "Plural: **ditilo**" note
on the teach and recap screens, and `cls` is read only to build the fill-in-the-concord exercise.
**Nothing anywhere asks her to produce a plural or name a class.** She is right that "class 7"
means nothing to her; it was never drilled.

### 1a. ⚠️ The number that shapes the whole design

The 54 cards by class:

| class | 9 | 5 | 1 | 3 | 7 | 11 |
|---|---|---|---|---|---|---|
| cards | **30** | 7 | 6 | 5 | 4 | 2 |

**Class 9 is 55% of the pool, and class 9 is the easy one** (∅ → di-: *buka → dibuka*,
*ntlo → dintlo*). Picking cards at random would make the round more than half "just put di- in
front", which teaches almost nothing.

**So the round picks a PATTERN first, then a card from inside it.** Each family gets roughly equal
airtime regardless of how many words it holds. This single decision is what makes the round worth
building rather than padding.

### 1b. Six cards are already plurals

`batho`, `mala`, `dikgomo`, `mae`, `merogo`, `dinawa` carry a class but no `plural` — because they
**are** the plural. They become the reverse question ("*batho* — what is one of them?"), which is
harder and worth having. No new Setswana needed; the singular already exists on another card.

---

## 2. The round

### 2.1 The six families

The whole round rests on one fixed table, not on the card pool:

```
   mo- / ba-   ·  class 1/2     motho    → batho
   mo- / me-   ·  class 3/4     molomo   → melomo
   le- / ma-   ·  class 5/6     leitlho  → matlho
   se- / di-   ·  class 7/8     setilo   → ditilo
   ∅  / di-    ·  class 9/10    ntlo     → dintlo
   lo- / di-   ·  class 11/10   loleme   → diteme
```

> **Corrected 2026-08-06 during the build:** this row read `loleme → maleme`, which is wrong
> twice over — the row's own label says `di-`, and content.js has `diteme`. The app grades off
> the card, never off this table, so nothing was ever built on the typo.

**The prefix pair leads, the class number rides along as a label — always, on every screen.**
Teaching "class 7" first is backwards: the number is a name for a pattern she has never been
shown. Show the pattern, name it every time, and after a few rounds "class 7" stops being a code
and starts meaning "the se-/di- ones". That is precisely the complaint she raised.

### 2.2 The card, in two taps

One card, one word, two steps — and step 1's answer *builds* step 2, which is the whole point of
merging:

```
   Step 1        setilo  (chair)
                 Which family?
                 [ mo-/ba- ]  [ le-/ma- ]  [ se-/di- ]  [ ∅/di- ]

   Step 2        ✔ se- / di-  ·  class 7/8
                 So one chair is setilo, and many are…
                 [ di- ]  [ ma- ]  [ me- ]  [ ba- ]      →  ditilo
```

For most nouns, knowing the family **is** knowing the plural. Step 2 is deliberately easy right
after a correct step 1 — that is the moment the connection lands.

> ⚠️ **This paragraph used to end "once a card is well known it skips straight to step 2 with no
> family shown".** That is the opposite of what §5.3 settles, and §5.3 is the later ruling — she
> restated it again on 2026-08-06 ("step 2 is skipped once a card is known"). **A known card is
> step 1 only:** naming the family is the hard half, and step 2 right after a correct step 1 is
> deliberately the easy half, so the easy half is what goes. Built that way.

**Tap, not type.** Setswana plurals are a prefix swap, not an ending, so what is worth drilling is
which family the word is in. Typing would mostly test her spelling of a word she already knows.
Typed production can be added as a later tier — the Sentence Builder showed that typed-only from
day one is a wall.

### 2.3 Wrong answers are never random

Step 1's four families and step 2's four prefixes are always real competing options for that
word's shape, so every wrong tap is a plausible mistake. `di-` appears constantly (it is correct
for over half the nouns) — honest, and it stops "di- is never the answer twice running" from
becoming a strategy.

### 2.4 Scoring — **no SRS writes**

Follows the 🧩 Sentence Builder precedent, for the same reason: getting *setilo → ditilo* wrong
does **not** mean she has forgotten what a chair is, so it must not push the *setilo* vocabulary
card's review date around. Own key **`rl_forms`** `{done, streak, missed}`, added to
`clearLearnerState()` and the account-switch reset exactly as `rl_builder` was.

XP +2 a card, kind `'forms'`.

### 2.5 Unlocking

Same gate as the Sentence Builder: a card joins the pool once its vocabulary card is at
`reps >= 1`, so words she has never met never appear. The home-screen button shows once at least
one card qualifies and says how many are unlocked.

### 2.6 Scaffolding — straight from what real play taught us

- miss 1 → retry
- miss 2 → the pattern hint (*"setilo starts with **se-**…"*)
- miss 3 → reveal, **not marked done, no XP**, comes back fresh next run

No auto-filing to `tutor_questions` in v1. The builder does that because her *typed* attempts are
diagnostic gold; a wrong prefix tap is one bit of information. `rl_forms.missed` already holds the
pattern and I can read it on request.

### 2.7 Audio: none

Her call, and right. Plural forms have no recordings and this round must not sit behind a
recording wave. The vocabulary card's existing 🔊 clip plays the singular — free, already there.
**`AUDIO_CACHE` must not be bumped** when this ships.

### 2.8 Size, honestly

**54 cards is a small round** — roughly 15 minutes before it repeats. Two ways to grow it, both
content work, neither blocking v1:

- **12 more** from cards that already carry a class but no plural (§1b) — mostly reversals, cheap.
- **63 word-cards have no plural at all.** Each needs its plural checked against the toolkit
  corpus or a desk dictionary. Cheap per word, not free, and **no invented Setswana** — the
  standing rule holds here as everywhere.

**Recommendation:** ship v1 on the 54, play it, let real use say whether it needs to be bigger.
That is the call that worked for the dictionary and for the Sentence Builder.

---

## 3. Later tiers (not v1)

1. **Reverse** — plural → singular, on the six §1b cards plus any others.
2. **Typed production** — once a card is well known, type *ditilo* instead of tapping *di-*.
3. **The concord that follows** — *ditilo* → *di* **tsotlhe**. This is where the round finally
   joins up with the existing `concord` exercise. Deliberately last: it is a third fact, and the
   concord card already teaches it well on its own.

**Do not rebuild the concord picker.** It drills *what a class does*; this round drills *which
class a word is in*. Keeping them separate is what lets tier 3 join them meaningfully.

---

## 4. Ship gates

- `toolkit/verify-forms-bank.py`-style checker: every card id resolves, no card's plural
  contradicts its class, the six-family table matches what the cards actually contain, LF-only /
  no BOM by **binary** read.
- Node harness slicing the **real** functions out of `index.html` — the house pattern; see
  `test-distractors.js` from this session for the current shape.
- `?local=1` walkthrough with SW + caches + localStorage cleared first and wiped after.
- **`state.srs` byte-identical before and after a full round** — the no-SRS-writes claim gets
  measured, never asserted.
- `sw.js` CACHE bumped, **`AUDIO_CACHE` untouched**.

## 5. Open questions — ANSWERED 2026-08-06

All three are settled. Nothing is blocking the build.

1. **Button name: `Ditlhopha`, with "Plurals & classes" as a sub-heading underneath.** Her words:
   *"Call it Ditlhopha but put plurals & classes and a sub-heading."* Same two-line shape the
   🧩 Sentence Builder and 📖 Dictionary buttons already use — Setswana on the top line, plain
   English on the `.tiny` line below it.
2. **Yes — the class number shows from day one**, always paired with the prefix pair, on every
   screen. That was the recommendation and it is the point of the round: the number is the thing
   throwing her.
3. **Yes — step 2 is skipped once a card is well known** (3 correct answers), so the easy half
   does not become filler.

---

## 6. BUILT 2026-08-06 (session 40) — what actually shipped, and the four calls the data forced

Built on her go-ahead, as sw **v45**. `AUDIO_CACHE` untouched — no audio byte changed.
Everything in §2 holds. Four things the spec did not settle had to be decided against the
real data; none of them touch the four she named as not-to-be-changed (pattern-first picking,
tap-not-type, no audio, no SRS writes).

1. **A round is a fixed 12 cards, not "play the pool".** §2.8 read as if the round runs all 54.
   It cannot: pattern-first only bites if a round is *shorter* than the pool. Play all 54 and
   30 of them are class 9 again, whatever the order. At 12 the round-robin gives **exactly two
   cards per family** — measured over 40 rounds in the harness. Random picking, measured over
   2 000 rounds, gives **6.7 of 12 class 9**. Twelve is two full passes of the six families.
2. **Step 2 is graded off the card's real plural, never off the family table.** One card in 54
   disagrees with its own family: **leino → meno** takes `me-`, not the le-/ma- family's `ma-`.
   Grading off the table would have marked the true Setswana form wrong. The payoff screen says
   so out loud rather than hiding it: *"This one breaks its own pattern."*
3. **Five cards change more than the prefix** — `mmele → mebele`, `leitlho → matlho`,
   `leino → meno`, `loleme → diteme`, `letsogo → mabogo`. Tapping `ma-` and being shown
   *mabogo* reads as a marking error unless the screen explains it, so the payoff adds one line:
   *"the front is not the only thing that moves."* Both this and the irregular are **pinned in
   the checker** — a sixth stem shift or a second irregular fails the gate rather than shipping
   quietly, because it more likely means a plural was typed wrong than that Setswana changed.
4. **The miss-2 hint on step 2 shows the stem with the front blanked** — *"It ends …tilo — which
   prefix goes in front?"*. Asserted in the harness never to leak the prefix it is asking for.
   For step 1 the hint is the singular's own prefix, or, for class 9, that it has none.

**Reverse questions (§1b) and everything in §3 are NOT built** — §3 lists them as later tiers.
The six already-plural cards (`batho`, `mala`, `dikgomo`, `mae`, `merogo`, `dinawa`) carry a
class but no plural, so they are simply not in the pool.

### Ship gates (§4) — results
- `toolkit/verify-forms-data.py` — **green.** Evaluates the real content.js *in node* rather
  than regexing it (a `[^{}]*` parser silently dropped 57 items in this repo once), then checks
  every plural resolves to a family and a prefix, that none contradicts its class outside the
  pinned exception, that index.html's `FORMS_FAMILIES` / `FORMS_PREFIXES` / `FORMS_BY_CLS` still
  describe the data, that the block never calls `srsGrade` or plays audio, and LF/BOM by
  **binary** read. Forces utf-8 stdout — cp1252 killed its own first run.
- `toolkit/test-forms.js` — **402 assertions green.** Slices the real functions out of
  index.html with a quote-aware scanner and runs them against the real content.js; also
  `new Function()`s the whole inline script, which is what would catch a `top`/`name` global
  collision. **Mutation-tested, not just passed:** breaking the family round-robin and
  re-pointing step 2 at the family table made **97 assertions fail**, so the two things she
  asked not to be quietly changed are genuinely guarded.
- **`?local=1` walkthrough** — SW, caches and localStorage cleared first, wiped after. A full
  12-card round with a deliberate 3-miss reveal on card 3: 11/12, **22 XP** (the revealed card
  earned none and was not marked done), 0 console errors. Both hint tiers, the reveal, the
  irregular note, the stem-shift note and the known-card path (step 2 skipped) all confirmed
  on screen. Home button reads *"🗂️ Ditlhopha / Plurals & classes · 54 words unlocked"* and
  sits after the Sentence Builder, with the drills.
- **`state.srs` byte-identical before and after the full round** — 27 324 bytes both sides,
  `rl_srs` in localStorage identical too. The only keys that moved were `rl_forms`, `rl_queue`,
  `rl_streak`, `rl_xpTotal` — exactly the XP path, same as the Sentence Builder.
- ⚠️ **The one gate that could NOT be run here:** the Browser pane stubs service workers —
  `register()` reports "activated" with no install phase and `caches.keys()` stays empty, so the
  v45 precache could not be watched. Instead: `sw.js` passes `node --check`, its **entire diff
  is the one line `v44 → v45`**, `AUDIO_CACHE` is still `relefela-audio-v3`, `CORE` is unchanged,
  and all **23 CORE files fetch 200**. Worth one look on her phone after the deploy.
