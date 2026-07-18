# SPEC — "Bua le Katse": the scripted Katse chat

**Status:** spec for ruling — nothing built yet. Written 2026-07-18 (session 25).
**Feature ask (Megan, verbatim intent):** "Think of it like a chat bot, but only in Setswana and
only using the words I have learned in the lessons so far … a text conversation where Katse asks
me questions and I ask her questions … It can throw in a new word here or there that I can pick
up on context." Confirmed ruling: **scripted, no LLM** ("yes, it needs a script") — the *feel* of
a chatbot, deterministic underneath.

## 1. Goals and non-goals

**Goals**
- A chat screen where Katse holds a text conversation in Setswana, turn by turn.
- Every word Katse uses is one Megan has learned — vocab-gated off her real SRS state
  (`state.srs[itemId].reps`), not off a hand-kept list.
- Occasional deliberate "stretch words" she can infer from context (her "new word here or there").
- She can answer Katse AND ask Katse questions (an ask-menu on her turn).
- Katse *speaks*: any scripted line that is verbatim an existing voiced card plays its real
  native clip. Scenario 1 is greetings (u1), which is 100% voiced, so most of the conversation
  is audible.

**Non-goals / hard constraints**
- **No LLM anywhere.** No API, no key, no generated Setswana. R0.
- **No invented Setswana.** Every scripted line follows the content.js bar: verbatim card text,
  or a composition following an already-approved convention (combined-`src`, precedent
  `u1l7-07`; name/place slot swaps only where the source card's own note sanctions the frame —
  `u1l2-01` "Swap in your own name", `u1l2-10` "drop in any place").
- **Audio-text match rule holds** (session-13): a Katse line plays a clip ONLY when the displayed
  text is byte-identical to that card's `tsw`. A line with a name slot filled ("Dumela, Megan")
  shows silent — never plays "Dumela mma" underneath it.
- No schema change, no new Supabase table. Works fully in `?local=1`.

## 2. Data: `dialogues.js` (new file, sibling of content.js)

```js
// Re:Lefela dialogues — every line carries src, same rule as content.js.
const RL_DIALOGUES = [
  {
    id: 'chat1',
    title: 'Dumela, Katse!',
    subtitle: 'Your first chat — greetings, names, coffee.',
    requires: ['u1l1-02','u1l1-04','u1l1-05','u1l1-07','u1l2-01','u1l2-02','u1l2-06',
               'u1l2-10','u1l3-01','u1l3-03','u1l3-05','u1l6-09','u1l7-05'],
    stretch: [ { word: 'eng', gloss: 'what', src: 'peace-corps-L12', fromItem: 'u2l3-06' } ],
    entry: 'greet',
    nodes: {
      greet: {
        katse: [ { tsw: 'Dumela mma!', eng: 'Hello!', audio: 'items/u1l1-02.mp3', src: 'peace-corps-L2' } ],
        user: {
          accept: [
            { kind: 'contains', words: ['dumela'] }          // "Dumela", "Dumela Katse", …
          ],
          chips: ['Dumela','Katse','mma','sentle','jang'],   // + engine distractors
          hint: 'Say hello back!',
          next: 'howru'
        }
      },
      howru: { /* … same shape … */ }
    }
  }
];
```

Shapes:
- **Katse turn** — `katse: [variant, …]`: array of *verified* line-sets; the engine picks one
  variant at random per playthrough (the feels-alive trick). A variant is 1–2 lines, each
  `{tsw, eng, audio?, src, note?}`. `audio` present ⇔ text is verbatim that voiced card.
- **User turn** — `user: {accept, chips, hint, next | branches}`. `accept` entries:
  - `{kind:'item', id:'u1l1-05'}` — her reply matches that card's `tsw` via `answerMatches`
    (exact or Levenshtein-close, existing tolerance).
  - `{kind:'frame', pattern:'Leina lame ke {name}', src:'peace-corps-L3', slot:'name'}` — the
    note-sanctioned frames; `{name}` matches any single word, `{place}` likewise.
  - `{kind:'contains', words:[…]}` — keyword intent (all listed stems present after `norm()`).
  - Each accept can carry its own `next`, so "Ke tsogile sentle, wena o tsogile jang?" (bouncing
    the question back) branches to Katse answering, while a plain "Ke teng" goes straight on.
- **Ask-menu turn** — `ask: [{q:{tsw,eng,src,itemId?}, katseReply:[lines]}, …]` — 2–3 questions
  she can put to Katse, tap-to-ask (they render as her chat bubble, Katse answers from script).
  Asking is optional; a "continue" affordance moves on.
- **Fallback** (engine-level, not per-node): unmatched input → Katse says
  **"Ga ke tlhaloganye."** (`u1l7-05`, voiced — a real course phrase doing real work) and
  re-states the question. Second miss on the same node → the hint line + chips narrow to
  answer-words only (no dead ends, mirrors Boost-mode's mercy philosophy).

## 3. Vocab gating (the core mechanic)

- **"Learned" = `state.srs[id].reps >= 1`** — she has answered that card correctly at least once.
  (Open question 1 offers the alternative.)
- **Scenario lock:** a scenario is playable when every id in `requires` is learned. Locked
  scenarios show greyed with "Katse needs you to finish <lesson title> first" (computed from the
  first unlearned item's lesson).
- **Variant filter:** a Katse variant whose `uses` list (item ids backing its words) isn't fully
  learned is skipped at pick time. `requires` covers the mandatory spine; variants may reach
  further and degrade gracefully.
- **Stretch words are the ONLY exemption:** declared per scenario, max 1–2, each tied to a real
  later-lesson card (`fromItem`). Rendered highlighted (dotted underline + ✨); tap →
  gloss + `note` reveal AFTER a beat (she gets a chance to infer first — same no-spoiler
  instinct as discovery rounds). Met stretch words are recorded (see §6) but do NOT write SRS —
  the reps≥3 typing gate stays honest (open question 2).

## 4. UI

- **Entry:** home-screen button under the Listening-gym button:
  `💬 Bua le Katse — chat with her in Setswana` (`bua` = u1l6-03 vocab; "Bua le" = speak with —
  composed from sourced `go bua` + `le` (and/with, `u4l5` conjunctive; also in `u1l1-03`'s
  "borra **le** bomma"), combined-src convention). Visible when scenario 1 unlocks; hidden
  before that (no taunting a locked feature on day one).
- **Chat screen:** `renderFill` layout — header (◀ quit + scenario title), scrollable message
  log (Katse bubbles left with her avatar, Megan's right), input dock at bottom.
  Katse's header avatar uses the existing pose art + `playAudio`'s `.talking` sway when a line
  has audio; a 🔊 replay button sits on each voiced Katse bubble.
- **Input dock, two modes with a toggle** (⌨️/🧩):
  - **Chips (default):** tap-to-build like the existing tap card — accepted-answer words +
    distractors from `unitWordPool`, backspace chip, send.
  - **Typing:** free text field, `answerMatches` + frame/keyword matching; 'close' matches
    accepted with the standard "check the spelling" nudge shown inline (she still advances —
    conversation flow beats drill strictness; exact-vs-close does not affect XP here).
- **Turn pacing:** Katse lines appear with a short typing-indicator delay (the chatbot *feel* —
  three bouncing dots, ~600ms), then the bubble + clip.
- 375×812 clearance: input dock respects the tutor 💬 fab (bottom-left) — the dock is
  full-width but its left 52px stays tap-transparent-free, same clearance discipline as v24.

## 5. Progression, XP, replay

- **XP:** +2 per accepted user turn, +10 scenario-complete bonus (kind `'chat'` through the
  existing `addXP` → `xp_events` queue — no new sync op shape). Counts toward streak via
  `touchStreak` inside `addXP`, automatically.
- **Completion:** first completion marks the scenario done (✓ on its entry card in a small
  scenario-picker once there is >1 scenario; while there's only one, the home button goes
  straight in). Replayable forever — variants + branch choices make replays differ.
- **No SRS writes at all in v1** — chat is *use*, not *drill*. (Open question 5 revisits.)

## 6. State & plumbing

- `localStorage 'rl_chat'`: `{ done: {chat1: true}, stretchMet: {eng: '2026-07-18'}, mode: 'chips' }`.
  Added to `clearLearnerState()`'s wipe list (account-switch hygiene, v20 rule). Local-only in
  v1 — losing it costs cosmetic ✓s and stretch history, nothing pedagogical.
- `dialogues.js` loaded via `<script>` after content.js; added to the SW precache list;
  **CACHE bump v27 → v28 on ship; `AUDIO_CACHE` untouched** (zero audio bytes change — every
  clip referenced already exists).
- `currentContext()` gains a chat branch (`'Bua le Katse — chat1'`) so an "Ask your tutor"
  question fired mid-chat carries useful context.
- Available to both accounts and in `?local=1` (it's pure client). Not Megan-gated.

## 7. Scenario 1 script — "Dumela, Katse!" (u1 vocab only)

Every line's provenance. **[♪] = verbatim voiced card, clip plays.**

| # | Speaker | Line | Source |
|---|---|---|---|
| 1 | Katse | **Dumela mma!** [♪ u1l1-02] | verbatim card |
| — | Megan | anything containing *dumela* (chips or typed) | u1l1-01/02 |
| 2 | Katse | **O tsogile jang?** [♪ u1l1-04] | verbatim card |
| — | Megan | **Ke tsogile sentle** [u1l1-05] · **Ke teng** [u1l1-07] · **Ke tsogile sentle, wena o tsogile jang?** [u1l1-13 → branch 2b] | verbatim cards |
| 2b | Katse | **Ke tsogile sentle.** [♪ u1l1-05] **Ke a leboga!** [♪ u1l1-19] | verbatim cards (only if she bounced the question) |
| 3 | Katse | **Leina la gago ke mang?** [♪ u1l2-02] | verbatim card |
| — | Megan | **Leina lame ke {name}** | u1l2-01 frame — note-sanctioned name swap |
| 3b | Katse | **Ke itumetse!** [♪ u1l1-09] | verbatim card ("I am glad" — reaction) |
| 4 | Megan (ask-menu, optional) | **O mang?** [u1l2-04] → Katse: **Leina lame ke Katse!** (silent — name-swapped frame, u1l2-01 + app-mascot precedent u5l1-09) · **A o tswa kwa Botswana?** (u1l2-07 frame, place swap) → Katse: **Ee!** [♪ u1l1-11] **Ke tswa kwa Botswana.** [♪ u1l2-05] | frames + verbatim cards |
| 5 | Katse | **O tswa kae?** [♪ u1l2-06] | verbatim card |
| — | Megan | **Ke tswa kwa {place}** | u1l2-10 frame — note-sanctioned place swap |
| 6 | Katse | **Ke batla kofi!** [♪ u1l6-09] … **O batla ✨eng?** [♪ u2l3-06] | verbatim cards; **eng = the stretch word**, dotted-underlined, tap → "eng = what" |
| — | Megan | **Ke batla kofi** [u1l6-09] · **Ga ke batle kofi** (u1l7-01 + kofi, combined-src, u1l7-07 precedent) · **Ga ke batle tee** [u1l7-07] · **Ke tlhoka madi** [u1l6-12 — the joke answer, accepted, Katse reacts with **Go siame!**] | verbatim + approved composition |
| 7 | Katse | **Ke a leboga!** [♪ u1l1-19] **Ke tla go bona kamoso.** [♪ u1l3-03] | verbatim cards |
| — | Megan | **Go siame** [u1l3-01] · **Ke tla go bona** [u1l3-02] · **Tlhola sentle** [u1l3-05] · **Boroko** [u1l3-07] | verbatim cards |
| 8 | Katse | **Tlhola sentle!** [♪ u1l3-05] → complete, +10 XP | verbatim card |

Fallback anywhere: Katse — **Ga ke tlhaloganye.** [♪ u1l7-05] + restate; 2nd miss → hint + narrowed chips.

Composed lines introduced by this scenario (all following the u1l7-07 combined-src convention,
each carrying an explanatory `note` in dialogues.js): "Ee! Ke tswa kwa Botswana." (interjection +
verbatim sentence), "Ga ke batle kofi" (attested negative frame + attested noun, exact shape of
attested "Ga ke batle tee"), "Leina lame ke Katse" / "Dumela, {name}" style slot fills (sanctioned
frames). **Nothing else is new Setswana.** Where any doubt exists at build time, the line gets
checked against `toolkit/autshumato-lookup.py` / the Bible parallel corpus before shipping, and
dropped (not guessed) if unverifiable.

## 8. Verification plan (build session)

- Node `new Function()` re-parse of index.html's inline script + dialogues.js after every edit
  (standing ritual; `top`/`name` global collision rule respected in any new globals).
- Preview `?local=1`, SW unregistered + caches cleared: drive the full scenario via both input
  modes; force the fallback path twice on one node; verify every [♪] line fetches 200 + decodes;
  0 console errors; test localStorage cleared after.
- Gate tests driven in-page: with a doctored `state.srs` missing one `requires` id → scenario
  locked; stretch word renders exempt; a variant whose `uses` id is unlearned never draws
  (500-draw loop, same style as the dictate-card gate test).
- 375×812: dock clear of tutor fab; log scrolls under header; chips wrap.
- Ship ritual: sw v28, `AUDIO_CACHE` untouched, live-verify.

## 9. Open questions for Megan's ruling

1. **"Learned" bar:** reps ≥ 1 (recommended — chat is practice, low bar keeps it usable now)
   or lesson-completed (stricter, delays unlock)?
2. **Stretch words → SRS?** Recommended NO writes (typing-gate honesty); alternative: seed the
   card at reps 0 so it appears in stats as "met in chat".
3. **Who sees it:** both accounts (recommended — nothing Megan-specific in it) or Megan-only
   at first?
4. **Register check:** Katse addresses Megan as **mma** (polite). Happy with that, or should
   Katse use her display name in silent lines ("Dumela, Megan!") and keep mma only where the
   clip plays?
5. **Future scenarios** (not this build): one per unit theme — Mmele (u2), Mo sekolong (u3),
   Go ja dijo (u4), Diphologolo (u5) — each written spec-first like this one. Confirm that's
   the intended roadmap so the engine's scenario-picker is worth its 20 lines now.
