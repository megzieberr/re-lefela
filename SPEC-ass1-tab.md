# SPEC: 📼 Tiro 1, the Assignment 1 drill tab (temporary)

Written 2026-09-11 (session 44). Status: PLAN, nothing built. The assignment (a video of Megan reading
the lecturer's word list and the *Phakwe le Mokoko* story aloud) is due **Sunday 14 September**. Half
the mark is her voice, so the friend's native audio is the whole point of this tab.

Inputs, all in `Assignnment 1 Audio/` (untracked, local):
- `ASS1-AUDIO-MAP.md`: the cards, every word glossed and sourced, clip windows, confidence.
- `ass1-mapping.json`: the same as data (clip windows in seconds, chunk glosses, sources).
- `ass1-earcheck.html` + `clips/`: Megan's ear-check page. **The build does not start until she has
  played through it and the mapping is corrected.** Nobody has listened yet.

## 0. EAR-CHECK ADDENDUM (2026-09-11, session 45) — the gate above is PASSED; these deltas are LAW

Megan ear-checked and corrected everything in `ass1-slicer.html` (which superseded the earcheck
page). `ass1-mapping.json` is regenerated and FINAL — build from it, not from this spec's older
prose, wherever they disagree. The deltas:

- **The mapping now has 49 cards, not 41**: 8 new phrase cards `a1s-p01`…`a1s-p08` isolated from
  the story (her ask), all ear-checked `conf: high`. They join the tab's story round as drill cards.
- **VN4 holds ONE reading — slow, sentence by sentence.** There is no natural-pace reading
  (her ruling: she had the friend skip it). `a1s-slow` = the whole tape as one clip (84 s);
  `a1s-nat` carries `bad: true` and ships NOTHING — drop it from the tab entirely.
- **Cards with `skip: true` (a1i-02/03/04/05/06) get NO new clip — wire the file in their
  `app_audio` field instead.** For a1i-04/05 that is `clips/a1i-04-app.mp3` / `a1i-05-app.mp3`:
  name-free cuts ("Leina lame ke …", "Sefane same ke …") made from u1l2-01/u1l2-03 — copy these
  two into `audio/items/` as new files at build time (new filenames → NO audio-cache bump).
  a1i-05 is thereby solved: nothing of the friend's take ships, the surname risk is gone.
- **`a1w-17` (yô) carries `bad: true` and ships SILENT** — the take is clipped at source
  (mic overload, measured), a declip rescue was rejected by her ear. yoo/yole ship normally.
- **`a1i-07` window was trimmed by her**: the clip says only "Ke dira mmojulu wa" — the friend
  said SECL 121 in Setswana but the LECTURER wants it in English, so Megan says "SECL 121"
  herself after the clip. Put that in the card's note; never re-extend the window.
- **Her corrections live in `tools/answers-2026-09-11.json`, applied by `gen_map.py` as an
  overlay** — regenerating the mapping can never lose them. If she pastes new slicer answers,
  MERGE into that file (only changed-vs-current-baseline cards appear in a paste), never overwrite.

## 1. Rulings baked in (nothing new, all standing)

- **No invented Setswana.** Every string traces to the assignment .docx, his story .docx, his 2024
  handout, the Smart Guide, Peace Corps, an existing app card, Autshumato or the wordnet. Sources are
  on every card in the map; the bank carries them as `src`.
- **His spelling verbatim**: rêka, ôtla, Rapôô, yô, mašwi as he printed them in the assignment. The
  three yô / yoo / yole cards follow the assignment's spelling (his handout writes yôô / yôlê; note it,
  don't tidy it, the Lediri precedent). Graded accent-blind anyway.
- **Never name the friend.** Raw voice notes never enter git: the four `.ogg` move to gitignored
  `corpus/audio/ass1/`. Only cut clips reach `audio/items/`, same status as the outsourced L1
  speaker's clips already live. Intro line 5 (*Sefane sa me ke ...*) ships silent unless her ear
  confirms it is not the friend's surname.
- **No SRS writes.** Own key `rl_ass1`, XP kind `'ass1'`. Sixth SRS-free surface, same reason as
  Medumo: 40 new cards must not flood the queue the Warm-up exists to unblock.
- **Temporary = flag-gated, not deleted** (the gym precedent). `SHOW_ASS1` is `true` until she has
  submitted; afterwards it flips to a `?ass1=1` URL flag. Parked, never removed.
- **One session at a time on this repo.** Single Opus worker, sequential.

## 2. Data: `ass1-bank.js` (hand-authored from the map, like `lediri-bank.js`)

```js
const RL_ASS1 = {
  words: [ // 23, the assignment's order; his glosses verbatim
    {id:'a1w-01', tsw:'rata', eng:'like / love', af:'lief wees', sound:'a',
     src:['zerwick-ass1-2026','zerwick-2024'], audio:'items/a1w-01.mp3', note:''},
    // a1w-08 Mokoena, a1w-10 Rapôô, a1w-18 yoo, a1w-19 yole carry readOnly:true (name or no gloss from him)
  ],
  intro: [ // 8 read-along lines; a1i-05 has NO audio field
    {id:'a1i-01', tsw:'A re bueng!', eng:"Let's talk!", af:'Kom ons praat!', src:['zerwick-ass1-2026'], audio:'items/a1i-01.mp3'},
  ],
  story: [ // 8 sentence cards from the SLOW reading, each with its teaching chunks
    {id:'a1s-01', tsw:'Ga twe bogologolo Phakwe le Mokoko e ne e le ditsala tse dikgolo.',
     eng:'It is said that long ago Hawk and Rooster were great friends.',
     af:'Daar word vertel dat Valk en Hoenderhaan lank gelede goeie vriende was.',
     src:['zerwick-ass1-2026','zerwick-story-af-2026'], audio:'items/a1s-01.mp3',
     chunks:[ {tsw:'Ga twe', eng:'it is said', words:[{w:'ga',g:'...'},{w:'twe',g:'be said'}], src:['autshumato'], note:'...'}, ... ]},
  ],
  whole: {nat:'items/a1s-nat.mp3', slow:'items/a1s-slow.mp3'}   // the two full read-throughs
};
```

`toolkit/verify-ass1-bank.py` (ship gate, evaluates the bank in node like `verify-forms-data.py`):
every `tsw` occurs verbatim (accent-exact) in `corpus/zerwick-ass1-2026.txt` (the assignment +
story .docx text, extracted once, gitignored like his other handouts); every `audio` file exists;
ids unique; every chunk's words are substrings of the chunk; `a1i-05` has no `audio`; every chunk
of every story card, joined, reproduces that card's `tsw` (so no word is silently dropped from the
teach step).

## 3. Screens (Medumo + Lediri are the templates; ~350 lines of index.html)

Home button, with the drills after 🗣️ Lediri: **📼 Tiro 1: the assignment, word for word** ·
*23 words · 8 lines · the story · nothing here touches your review schedule*.

Tab home, four tiles with progress pills:

1. **🔤 Mafoko (23 words).** One round in HIS order the first time (the video reads them in that
   order), shuffled after. Per card, three beats, tap-not-type:
   - *Listen and say*: word, sound family (his "a / ê / ô ... ph"), his gloss + Afrikaans, ▶ and 🐢
     (`playbackRate`, the app's slow-audio rule). Read-only cards (names, yoo, yole) stop here.
   - *Which word?*: hear a clip, pick the word from 4 (distractors from the same note first, the
     other note second, the lesson-first ladder).
   - *Meaning*: see the word, tap his gloss from 4.
   Done = all three beats seen once; `rl_ass1.words[id]` counts clean passes.
2. **👋 Intro lines (8).** Read-along list in the assignment's order: Setswana, English, Afrikaans,
   ▶ per line. "▶ Play the whole intro" strings the seven voiced lines in order: that IS the intro
   she must say in the video. Line 5 shows *your surname* and has no play button. No drill.
3. **📖 Phakwe le Mokoko.** Sentence by sentence (8). The sentence is drawn as tappable chunks;
   tapping a chunk opens its meaning and the **word-by-word** list underneath (this is the "the
   round sommer teaches me what every word means" part: "o ne a tsamaya" is one chunk, and its
   four words are each glossed). ▶ plays the slow-reading clip of the sentence. After sentence 8:
   ▶ whole story at natural pace and 🐢 whole story slow. Second pass = quiz: chunk → tap its
   meaning (4 options from the same story), then meaning → tap the chunk. Tap-not-type.
4. **⏺ Record and compare.** Reuse the app's existing MediaRecorder helper (`index.html` ~3408,
   the speak exercise): pick any voiced card, record, then ▶ hers / ▶ mine. Nothing uploaded or
   stored beyond the blob URL, same as today. **Day-2 add if time is short**; the first three tiles
   are the assignment.

XP: `'ass1'` per beat, streak-feeding like `'medumo'`. Progress in `rl_ass1` (add to the reset list
at index.html ~365). `#exArea` auto-reload guard untouched. All new functions prefixed `ass1`
(the `test-comeback.js` duplicate-name gate; `runRecap` was the lesson).

## 4. Audio pipeline

1. Megan plays `ass1-earcheck.html`, pastes her answers; the mapping is corrected (Fable, this
   session or the next). Anything she ticks wrong ships silent, never wrong.
2. Move the four `.ogg` to `corpus/audio/ass1/`; add `Assignnment 1 Audio/` to `.gitignore` (or
   delete the folder once its contents are moved, her call). Move `ass1-mapping.json` to
   `toolkit/`.
3. New `toolkit/ass1-export.py`: reads `toolkit/ass1-mapping.json`, cuts `audio/items/a1*.mp3`
   with the exporter's own ffmpeg args (mono 64k), skips clips marked `skip:true`, touches
   NOTHING in content.js, forces utf-8 stdout. **md5 `audio/items/` before and after**: new files
   only, so **no `AUDIO_CACHE` bump**; if any existing byte changes the run is wrong.
4. `ass1-bank.js` written from the corrected map; `verify-ass1-bank.py` green.

## 5. Ship

`sw.js`: `CACHE` → `relefela-v50`, `CORE` += `ass1-bank.js`. Gates, all of them: `test-forms.js`
· `test-dictsearch.js` · `test-comeback.js` · `test-spelling.js` · `verify-forms-data.py` ·
`verify-builder-bank.py` · `verify-dict-bank.py` · `verify-medumo-bank.py` · new
`verify-ass1-bank.py` · `node --check sw.js` · binary CR check on every edited file · md5 around
the export · a REAL browser pass at `?local=1` pressing every button (the gates cannot see a
hoisting collision). Then `/ship`, live md5, one phone check.

## 6. Estimate

One Opus worker, sequential: pipeline + bank + gate (~120k tokens) then the UI (~250k), about two
hours wall. Fable briefs, reviews the diff, runs the browser pass. Realistic timeline to Sunday:
ear-check today → mapping fixed → worker builds → ship tonight → she drills Saturday and Sunday.

## 7. Decisions for Megan before the worker starts

1. Ear-check done and pasted back (blocking).
2. The friend's clips go live on Pages, anonymous, like the outsourced speaker's clips already do.
   Yes / no.
3. Slice 5 of the intro note: her surname, or skipped?
4. `ôtla`: show his assignment gloss (feed) with the handout note (punish), or ask him first.
5. Record-and-compare in the first cut, or day 2.
6. After submission: park behind `?ass1=1`, or fold the 23 words into Medumo (most are already his
   handout words, so Medumo already teaches many of them).
