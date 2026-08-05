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
   lo- / di-   ·  class 11/10   loleme   → maleme
```

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
after a correct step 1 — that is the moment the connection lands. Once a card has been answered
correctly a few times it skips straight to step 2 with no family shown, which is the real test.

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

## 5. Open questions for her

1. **Name for the home button.** Working title "🔢 Plurals & classes"; she may want a Setswana name
   as with 🧩 — *Ditlhopha* ("groups/classes") is the obvious candidate.
2. Should the **class number** show from day one alongside the prefix pair, or be held back until
   she recognises the pairs? *(Recommendation: from day one, always paired — the number is the
   thing she needs to stop being thrown by.)*
3. After step 1 is right, should step 2 be **skippable** once a card is well known, or always
   asked? *(Recommendation: skip it after 3 correct answers — otherwise the easy half becomes
   filler.)*
