# SPEC: 📝 Tiro 3, the quiz-words drill tab

Written 2026-10-19 (Fable, tutor/build session). Status: PLAN, approved by Megan in chat the same
evening ("Can I maybe ask for a Tiro 3 tab in R:0 … add all the relevant rounds … and the missing
words, even if they don't have audio … the repetitive matching and typing really works well. So build
session"). One Opus worker builds it; the worker COMMITS locally and does NOT push (the push needs
her own yes, as always).

## 0. Why this tab exists

Zerwick's eFundi announcement of 19 Oct 2026: Assignment 3 (the real 2026 quiz, auto-marked MCQ,
3-day cut-off) "will soon be loaded"; meanwhile he posted LAST YEAR'S Ass 4 as a practice quiz, memo
after Friday 23 Oct. The practice quiz is 50 one-mark items, nearly all vocabulary: animals (Unit 5),
food (Unit 4), school (Unit 3), body (Unit 2), greetings/people (Unit 1), plus ~10 grammar-label
questions. Units 4 and 5 are the ones she has not met. Her words: the repetitive matching and typing
rounds are what works for her, so this tab is those two exercise shapes over exactly this vocabulary,
plus the quiz's own pick-one-of-four shape, grouped by topic.

Source doc: `Desktop\NWU Semester 2\SECL121\Assignments\Assignment 3\Final Quiz SECF-SECL PRACTICE 2024
BLANK.docx`. Extract its text ONCE to `corpus/zerwick-quiz-2024.txt` (gitignored like his other
handouts; the worker's docx→txt script lives in toolkit/). Source id on cards: `zerwick-quiz-2024`.

## 1. Standing rulings that bind this build (nothing new)

- **No invented Setswana.** Every card string is copied from his quiz, the Smart Guide text
  (`Desktop\NWU Semester 2\SECL121\Resources\smart-guide-full-text.md`, page markers
  `===== PAGE n =====`), an existing app card, or the corpus. Every card carries `src` (array).
  The table in §3 was checked word by word by Fable on 2026-10-19 against the guide (page refs given)
  and `corpus/` (ripgrep over *.txt). The worker copies it; it does not add words.
- **His spellings stand where he is the only source** (`Se tlisê bolo!`, `Nthuse tswee-tswee!`,
  `letlapa la tshoko`). Elsewhere: guide spelling (ntšwa, lephutse, podi) with his quiz spelling as
  `alt` so her typed answer is never rejected for his variant.
- **Grade accent-blind** via the app's `norm()` (index.html ~584). `alt` spellings are accepted too.
- **No SRS writes.** Own key `rl_tiro3` (add to the reset list at index.html ~371), XP kind
  `'tiro3'`, streak-feeding like `'medumo'`/`'ass1'`. Reveals pay no XP.
- **All new names start with `tiro3`** (the runRecap hoisting lesson). Grep before adding a name.
- **Audio is never invented or copied.** Resolver `tiro3Aud(card)`: find the first `RL_CONTENT` item
  whose `norm(tsw) === norm(card.tsw)` and has `audio`; return that path, else null. A card without
  audio shows a small 🔇 "no recording yet" and simply has no listen beat. Never touch
  `audio/items/`; no AUDIO_CACHE bump.
- **Tiro 1 is PARKED, not deleted:** `ASS1_LIVE = false` (index.html ~2545). `?ass1=1` still brings
  it back. Nothing else in the Tiro 1 code changes.
- **PUBLIC repo:** no learner names, no friend names, nothing from `corpus/` beyond the vocabulary.
- **Ship gates, all must run:** `toolkit/test-forms.js` · `test-dictsearch.js` · `test-comeback.js`
  · `test-spelling.js` · `verify-forms-data.py` · `verify-builder-bank.py` · `verify-dict-bank.py`
  · `verify-medumo-bank.py` · `verify-ass1-bank.py` (if present) · NEW `verify-tiro3-bank.py`.
  Then a REAL browser pass at `?local=1` (the gates cannot see a hoisting collision).
  App `CACHE` bumps to `relefela-v59` (index/content/sw changed). Binary-check every edited file for
  CRLF/BOM. One session at a time on this repo.
- **Lize:** the app is already shared with her; the tab reaches her on the same push. Nothing to copy
  to `For Lize\`.

## 2. Screens (Medumo / Lediri / Tiro 1 are the templates; expect ~300 lines of index.html)

Home button, in the drills list where Tiro 1 sat:
**📝 Tiro 3: the quiz words** · *N words in 7 rounds · match, type, pick · nothing here touches your
review schedule*.

Tab home: seven round tiles, each with a progress pill (`mastered/total`, mastered = 3 clean typed
passes, or 3 clean picks for the grammar round). Order = the quiz's weight: animals, food, school,
body, people, verbs, grammar.

Inside a round, a fixed 12-item session (the `ASS1_QUIZ_ROUND` ruling), items shuffled, cards that
are not yet mastered first. Three exercise shapes, rotating so each session is roughly a third of each:

1. **🧩 Match (tsw ↔ eng, 4 pairs).** Same interaction as the lesson engine's `match` exercise
   (index.html ~4070): tap a Setswana word, tap its English, pairs lock in. XP like the lesson
   match (15 clean / 8 with mistakes), kind `'tiro3'`.
2. **⌨️ Type (eng → tsw).** Show the English, she types the Setswana. Accept if `norm(typed)` equals
   `norm(card.tsw)` or any `norm(alt)`. On a miss: show the right word, she retypes it once (no XP for
   the retype). A card's `note` shows under the answer when present (for example "his quiz's wording;
   the guide says tlerebetsa").
3. **🔘 Pick (the quiz's own shape).** Alternating direction: see tsw, pick the eng from 4; see eng,
   pick the tsw from 4. Distractors come from the same round first, then any round. For `kind:'quiz'`
   cards (grammar round) the question text and his options are shown verbatim and the `why` line
   appears after she answers, right or wrong.

Every card also offers ▶ when `tiro3Aud(card)` resolves (and 🐢 via the app's slow-audio rule).
Progress in `rl_tiro3`: `{ c: { [cardId]: { t: cleanTypedPasses, p: cleanPicks, m: matches } } }`.
After a session: a small recap (right / total, the misses listed with their English) and
"▶ Another round" / "← Rounds".

### Grammar round (🧠 Thutapuo) is Pick-only
The 17 `kind:'quiz'` cards reproduce his practice-quiz label questions (he posted them for exactly
this). Each has `answer`, `why` (one plain line, guide page where known) and, where Fable could not
settle it from the guide, `pending: true`, which shows as "⏳ his memo will settle this (after
Fri 23 Oct)" instead of a confident tick. Two cards are pending: class-9/no-prefix and
"Tlou e a lla".

## 3. The bank: `tiro3-bank.js` (hand-authored from this table; load it after `ass1-bank.js`)

```js
const RL_TIRO3 = {
  rounds: [
    { id:'ani', title:'Diphologolo', sub:'animals', emoji:'🐄', cards:[ ... ] },
    { id:'dij', title:'Dijo', sub:'food, fruit, veg', emoji:'🍎', cards:[ ... ] },
    { id:'sek', title:'Mo sekolong', sub:'school things and classroom commands', emoji:'🏫', cards:[ ... ] },
    { id:'mme', title:'Mmele', sub:'body and health', emoji:'🫀', cards:[ ... ] },
    { id:'bat', title:'Batho le madumediso', sub:'people, family, greetings', emoji:'👋', cards:[ ... ] },
    { id:'mad', title:'Madiri', sub:'verbs', emoji:'🏃', cards:[ ... ] },
    { id:'thu', title:'Thutapuo', sub:'grammar labels, pick only', emoji:'🧠', cards:[ ... ] },
  ]
};
// word card:  { id:'t3-ani-01', kind:'word', tsw:'kgomo', eng:'cow', alt:[], src:['smart-guide-2026:p84','zerwick-quiz-2024'], note:'' }
// phrase card: kind:'phrase', same fields
// quiz card:  { id:'t3-thu-01', kind:'quiz', q:'Concord -tlaa- represents which tense?', options:['Past tense','Present tense','Future tense','Present tense negative'], answer:2, why:'…', src:['zerwick-quiz-2024','smart-guide-2026:p48'], pending:false }
```

Source ids: `zerwick-quiz-2024` (his practice quiz), `smart-guide-2026:pNN` (guide page),
`app:<cardId>` (an existing Re:Lefela card with that string), `corpus` (attested in `corpus/*.txt`,
count given in the table), `pc` (Peace Corps). Verified 2026-10-19 by Fable; `g` = guide page(s),
`c` = corpus hits (word-boundary, case-blind), `app` = already a lesson card (so audio resolves).

### 🐄 ani · Diphologolo (animals)
| tsw | eng | alt | src | note |
|---|---|---|---|---|
| kgomo | cow | | g84,91 · quiz · app | |
| nku | sheep | | g13,84 · quiz · app | |
| kolobe | pig | | g84,91 · quiz · app | |
| koko | chicken | | g87,91 · quiz · app | |
| tlou | elephant | | g87,90 · quiz | |
| pitse | horse | | g14,87 · quiz · app | |
| podi | goat | pudi | g13 (podi), g91 (pudi) · app | the guide prints both |
| tau | lion | | g87 · quiz · app | |
| ntšwa | dog | ntswa | g13,87 · quiz (option "Ntswa") | guide spelling has š |
| katse | cat | | g13,87 · quiz · app | |
| nonyane | bird | | quiz · c65 · app | not in the guide; corpus-attested |
| kgabo | monkey | | g85–86 (Khudu le Kgabo story) · quiz | |
| legakabe | crow | | quiz · c5 | corpus hits are mostly a place name; his quiz is the source |
| serurubele | butterfly | | g89 · quiz | |
| notshe | bee | | g90 · quiz | |
| phologolo | animal | | g85 (diphologolo) · app u5l1 | plural diphologolo |
| pholo | ox | | quiz · c973 · app | |
| Tlou e tlerebetsa. | The elephant trumpets. | | g87 | phrase; the guide's wording |
| Ntšwa e a bogola. | The dog barks. | Ntswa e a bogola | g87 (prints "Ntšwa a bogola") · quiz (bogola) | phrase; guide prints the concord as "a" on p87, keep the e-form the app teaches and note it |
| Koko e lela. | The chicken clucks. | | g87 | phrase |

### 🍎 dij · Dijo (food, fruit, veg)
| tsw | eng | alt | src | note |
|---|---|---|---|---|
| dijo | food | | app u4l1 | |
| nama | meat | | g84 · quiz | |
| bogobe | porridge | | g84 · quiz | |
| borotho | bread | | g84 · app | |
| mašwi | milk | maswi, mashi | g13 · app | |
| metsi | water | | g13 · app | |
| tlhapi | fish | | g83 | |
| perekisi | peach | | g75 · quiz | |
| apole | apple | | g74 · quiz | |
| tapole | potato | lekwele | g77 · quiz | guide gives both |
| dinawa | beans | | g84 · quiz · app | |
| merogo | vegetables | | g76 · quiz · app | |
| maungo | fruit (plural) | | g83 · quiz | singular leungo (g74) |
| lephutse | pumpkin | lephutshe | g76 · quiz (spells "Lephutshe") | |
| magapu | watermelons | | quiz · c2 | thin in corpus; his quiz is the source |
| segwapa | biltong | | g84 · quiz | |

### 🏫 sek · Mo sekolong (school things and classroom commands)
| tsw | eng | alt | src | note |
|---|---|---|---|---|
| buka | book | | g19 · app | |
| dibuka | books | | quiz · app | |
| letlapa la tshoko | chalkboard | | quiz ONLY (0 corpus) | his quiz is the only source; letlapa = stone/slate (c) |
| lekwalo | letter | | g22 · quiz | |
| setulo | chair | setulô | g22,67 · quiz | |
| setlhare | tree | | g13,37 · quiz | |
| koloi | car | | quiz · c497 · app dict | |
| lesaka | kraal | | quiz · c45 | plural masaka (his quiz) |
| morutabana | teacher | | g22–25 · quiz | "morutangana" in his quiz is the WRONG option |
| barutwana | learners | | quiz · c360 | |
| modiri | worker | | g71 · quiz · app | from go dira |
| mothusi | helper | | quiz · c215 | |
| moagi | builder | | g70 · quiz | from go aga |
| Tlisa dibuka! | Bring the books! | | quiz · tlisa g52 | phrase |
| Se tlisê bolo! | Don't bring the ball! | Se tlise bolo | quiz | phrase; his hat on ê |
| Reetsang barutwana! | Listen, learners! | | quiz · reetsa g53 | phrase, group -ng |
| Arabang dipotso! | Answer the questions! (you all) | | quiz · araba g18 | phrase |
| Araba potso! | Answer the question! | | quiz | phrase |
| Raga bolo! | Kick the ball! | | quiz · app (Lediri) | phrase |
| Bula buka! | Open the book! | | quiz · app | phrase |

### 🫀 mme · Mmele (body and health)
| tsw | eng | alt | src | note |
|---|---|---|---|---|
| nko | nose | | g37 · quiz · app | the breathing organ, his Q11 |
| tsebe | ear | tsêbê | g37 · quiz · app | |
| molomo | mouth | | g38 · quiz · app | |
| tlhogo | head | | g33 · quiz · app | |
| seatla | hand | | g38 · quiz · app | |
| matlho | eyes | | app | singular leitlho |
| mala | stomach | | g13,40 · app | |
| hutse | hat | | quiz · c20 | NOT a body part (his Q25); some corpus hits are the verb hutsa |
| Ke a lwala. | I am sick. | | g40 · quiz · app | phrase |
| Ke ja ka molomo. | I eat with my mouth. | | g38 (verbatim) · quiz | phrase |
| Ke leba ka matlho a me. | I look with my eyes. | | quiz · leba g51 | phrase |

### 👋 bat · Batho le madumediso (people, family, greetings)
| tsw | eng | alt | src | note |
|---|---|---|---|---|
| Dumela | Hello (one person) | | g23 · quiz · app | |
| Dumelang | Hello (more than one) | | g23,83 · quiz | his Q17: "Dumela Basetsana" is the wrong one |
| Sala sentle | Goodbye (one person staying) | | app · c | |
| Salang sentle | Goodbye (more than one) | | quiz · c21 | |
| tshwarelo | sorry / forgive me | | quiz · c24 | his Q21: apologizing |
| tswee-tswee | please | tsweetswee | g86 · quiz · app | |
| Leina la gago ke mang? | What is your name? | | g20 (verbatim) · quiz · app | phrase |
| Nthuse tswee-tswee! | Please help me! | Nthuse tsweetswee | quiz · nthuse c78 | phrase; n- = me, thusa → thuse |
| nkgono | grandmother | | quiz · c3 | |
| mmangwane | aunt (mother's younger sister) | | quiz · c10 | |
| rakgadi | aunt (father's sister) | | g22 · quiz | |
| mme | mother | | app | |
| abuti | brother | | quiz · c105 | |
| monna / banna | man / men | | g · app | two cards |
| mosadi / basadi | woman / women | | g · app | two cards |
| basetsana | girls | | quiz · app | |
| motho / batho | person / people | | quiz · app | two cards; his Q31: the prefix is mo- |

### 🏃 mad · Madiri (verbs)
| tsw | eng | alt | src | note |
|---|---|---|---|---|
| go tsamaya | to walk / to go | | g13 · quiz · app | |
| go bina | to dance | | g53 · quiz · app | |
| go tshameka | to play | | g15 · quiz · app | |
| go ja | to eat | | quiz · app | |
| go nwa | to drink | | g13 · app | |
| go reka | to buy | | g21 · quiz · app | |
| go rekisa | to sell | | g56 · quiz | |
| go robala | to sleep | | g54 · quiz · app | |
| go leba | to look | | g51 · quiz · app | |
| go utlwa | to hear | | g32 · quiz · app | |
| go reetsa | to listen | | g53 · quiz · app | |
| go tlisa | to bring | | g52 · quiz | |
| go kwala | to write | | g · app | |
| go bula | to open | | app | |
| go araba | to answer | | g18 · quiz | |
| go thusa | to help | | g52 · quiz | |
| go bogola | to bark | | g87 · quiz | |
| go lla | to cry / to make a sound | | quiz · c (many) | |
| go ithuta | to learn | | guide title · quiz · app | his Q50: ruta ≠ ithuta |
| go ruta | to teach | | g66,73 · quiz · app | |
| go aga | to build | | g70 | moagi comes from it |
| go dira | to work / to do | | g71 · app | modiri comes from it |

### 🧠 thu · Thutapuo (grammar labels, Pick-only, his questions verbatim)
| # | q (his wording, tidied only for typos) | options | answer | why | pending |
|---|---|---|---|---|---|
| 1 | Concord -tlaa- represents which tense? | Past / Present / Future / Present negative | Future | tlaa marks the future (g48–50) | |
| 2 | Class 1 in Setswana grammar is… | Mo- Ba- / Se- Di- / Mo- Me- / Lo- Di- | Mo- Ba- | the people class, Klas 1 in the guide (g13) | |
| 3 | What words are in the Le- Ma- noun class? | Banna/Basadi / Batho/Motho / Setlhare/Ditlhare / Lesaka/Masaka | Lesaka/Masaka | le-/ma- pair | |
| 4 | Which sentence is NOT in the plural? | Monna o nwa metsi / Dinku di tsamaya kwa polaseng / Basadi ba ja borotho / Basetsana ba bala buka | Monna o nwa metsi | one man, concord o | |
| 5 | This sentence is incorrect. | Dumela Basetsana / Monna o a ja / Banna ba a ja / Wena o kae? | Dumela Basetsana | greeting a group takes -ng: Dumelang (g23) | |
| 6 | What part of the word motho determines its noun class and plural? | tho / otho / mo / ho | mo | the prefix; motho → batho | |
| 7 | -ile is a concord used in the past tense. | True / False | True | his label; the perfectum -ile (g51–56) | |
| 8 | The word MOAGI is an example of a deverbative. | True / False | True | go aga → moagi (g70) | |
| 9 | Nouns in noun class number 9 are the nouns without a prefix. | True / False | ⏳ | the guide's own numbering puts the no-prefix nouns in Klas 5 and the locative at 9; standard Bantu numbering calls the no-prefix class 9. His memo decides which numbering he marks by | yes |
| 10 | In Setswana the noun setulo does not have a prefix. | True / False | False | se- is its prefix (se-/di-) | |
| 11 | Vegetables are called maungo. | True / False | False | maungo = fruit (g83); vegetables = merogo (g76) | |
| 12 | School bus in Setswana is "sekolo sa bese". | True / False | False | the owner comes second: bus OF school, not school of bus | |
| 13 | A teacher in Setswana is "morutangana". | True / False | False | morutabana (g22–25) | |
| 14 | Pitse e a bogola. Is the fact true or not? | True / False | False | bogola = bark; dogs bark (g87) | |
| 15 | Translation for an elephant trumpet in Setswana is "Tlou e a lla". | True / False | ⏳ | his quiz's wording; the guide prints Tlou e tlerebetsa (g87). lla = cry/sound, so he may well mark it True | yes |
| 16 | "Ke tla tlisa dibuka" means "I will write the book". | True / False | False | tlisa = bring, dibuka = books | |
| 17 | "I want to learn Setswana" = "Ke batla go ruta Setswana". | True / False | False | ruta = teach; learn = ithuta | |

## 4. `toolkit/verify-tiro3-bank.py` (new ship gate)
Evaluates the bank in node like `verify-forms-data.py` and checks: ids unique and prefixed `t3-`;
every card has non-empty `src`; every `tsw` (and every `alt`) occurs, accent-blind and word-boundary,
in at least one of `corpus/zerwick-quiz-2024.txt`, the Smart Guide full text, `content.js`, or
`corpus/**/*.txt` (ripgrep; skip the audio/zip/pdf folders); every quiz card has 2+ options and a
valid `answer` index or `pending:true`; no card string contains a learner's or friend's name;
file is LF, UTF-8, no BOM. Prints the count of cards whose audio resolves via the same rule as
`tiro3Aud` (expect roughly 45 of ~115).

## 5. Done looks like
- `tiro3-bank.js` with every card in §3 (no additions), `verify-tiro3-bank.py` green, all other gates
  green, `index.html` with the tab (home button, 7 tiles, match/type/pick sessions, recap, 🔇 state,
  V-less: no voice pill here), `ASS1_LIVE = false`, `rl_tiro3` in the reset list, sw `relefela-v59`.
- A real browser pass at `?local=1`: open each round once, do one match, one type (one right, one
  wrong), one pick; the grammar round shows the ⏳ line on cards 9 and 15.
- `PROJECT-STATUS.md` "Where we are" updated (sw v59, Tiro 3 built, Tiro 1 parked), `PROJECT-HISTORY.md`
  gets the session write-up. Local commit, message starting "Tiro 3: the quiz-words drill tab (sw v59)".
  **No push.**
