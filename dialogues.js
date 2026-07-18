// Re:Lefela dialogues — the scripted "Bua le Katse" chat (SPEC-katse-chat.md).
// Same provenance rule as content.js: every Setswana line carries src.
// A line has `audio` ONLY when its tsw is that voiced card's tsw verbatim — identical up to
// terminal punctuation (a chat line may add "!" or "."; the words the voice says never differ).
// (session-13 rule: never play a clip under text that differs from what the voice says.)
// Composed lines follow the approved combined-src convention (precedent u1l7-07) or a
// note-sanctioned slot frame (u1l2-01 "swap in your own name", u1l2-10 "drop in any place");
// each carries a `note` explaining its construction. Nothing else is new Setswana.
//
// Node shapes (engine: index.html "Bua le Katse" section):
//   katse: [variant, ...]   variant = {lines:[{tsw,eng,audio?,src,note?}], uses?:[itemIds]}
//   user:  {accept:[...], hint, next}    accept = {kind:'item'|'lit'|'frame'|'contains', ...}
//          an accept may carry its own `next` (branching); otherwise user.next applies
//   ask:   [{q:{tsw,eng,src,itemId?}, reply:[lines]}, ...] + next  (optional questions TO Katse)
//   next:  Katse-only nodes auto-advance; `end:true` completes the scenario
// {name} in a frame matches any single word and offers the signed-in display name as a chip;
// {place} likewise with the scenario's placeChips.

const RL_DIALOGUES = [
  {
    id: 'chat1',
    title: 'Dumela, Katse!',
    subtitle: 'Your first chat — greetings, names, coffee.',
    // the conversation's mandatory spine: chat unlocks when every one of these is learned
    // (state.srs[id].reps >= 1 — ruling: spec §9 Q1, reps>=1 bar)
    requires: ['u1l1-02','u1l1-04','u1l1-05','u1l1-07','u1l2-01','u1l2-02','u1l2-06',
               'u1l2-10','u1l3-01','u1l3-03','u1l3-05','u1l6-09','u1l7-05'],
    // the deliberate "new word to pick up on context" (spec §3) — tap to reveal, no SRS write
    stretch: [ { word: 'eng', gloss: 'what', src: 'peace-corps-L12', fromItem: 'u2l3-06',
                 note: 'Question words sit where the answer would sit: O batla ENG? = "you want WHAT?"' } ],
    placeChips: ['Potchefstroom', 'Botswana', 'Amerika'],  // u1l2-10's note + u1l2-05/07
    entry: 'greet',
    nodes: {

      greet: {
        katse: [ { lines: [ { tsw: 'Dumela mma!', eng: 'Hello!', audio: 'items/u1l1-02.mp3', src: 'peace-corps-L2' } ] } ],
        user: {
          accept: [ { kind: 'contains', words: ['dumela'] } ],
          hint: 'Greet her back — Dumela!',
          chips: ['Dumela', 'Katse'],
          next: 'howru'
        }
      },

      howru: {
        katse: [ { lines: [ { tsw: 'O tsogile jang?', eng: 'How are you?', audio: 'items/u1l1-04.mp3', src: 'peace-corps-L2' } ] } ],
        user: {
          accept: [
            { kind: 'item', id: 'u1l1-13', next: 'howru-bounce' },   // …wena o tsogile jang? — bounce back
            { kind: 'item', id: 'u1l1-05' },                          // Ke tsogile sentle
            { kind: 'item', id: 'u1l1-07' }                           // Ke teng
          ],
          hint: 'Answer — Ke tsogile sentle. Or bounce it back with wena…',
          next: 'name'
        }
      },

      'howru-bounce': {
        katse: [ { lines: [
          { tsw: 'Ke tsogile sentle.', eng: 'I am well.', audio: 'items/u1l1-05.mp3', src: 'peace-corps-L2' },
          { tsw: 'Ke a leboga!', eng: 'Thank you!', audio: 'items/u1l1-19.mp3', src: 'peace-corps-L2+beibele' }
        ] } ],
        next: 'name'
      },

      name: {
        katse: [ { lines: [ { tsw: 'Leina la gago ke mang?', eng: 'What is your name?', audio: 'items/u1l2-02.mp3', src: 'peace-corps-L3' } ] } ],
        user: {
          accept: [
            { kind: 'frame', pattern: 'Leina lame ke {name}', eng: 'My name is …', src: 'peace-corps-L3',
              note: 'u1l2-01 frame — its own note sanctions the name swap' }
          ],
          hint: 'Leina lame ke … — then your name.',
          next: 'name-react'
        }
      },

      'name-react': {
        katse: [ { lines: [ { tsw: 'Ke itumetse!', eng: 'I am glad!', audio: 'items/u1l1-09.mp3', src: 'peace-corps-L6' } ] } ],
        next: 'ask1'
      },

      ask1: {
        ask: [
          { q: { tsw: 'O mang?', eng: 'Who are you?', src: 'peace-corps-L12', itemId: 'u1l2-04' },
            reply: [ { tsw: 'Leina lame ke Katse!', eng: 'My name is Katse!', src: 'peace-corps-L3+app-mascot',
                       note: 'u1l2-01 name-swap frame; katse the word is u5l1-09 (app-mascot precedent). Silent — text differs from the u1l2-01 clip.' } ] },
          { q: { tsw: 'A o tswa kwa Botswana?', eng: 'Are you from Botswana?', src: 'peace-corps-L3',
                 note: 'u1l2-07 frame (A o tswa kwa Amerika?) with the note-sanctioned place swap' },
            reply: [ { tsw: 'Ee!', eng: 'Yes!', audio: 'items/u1l1-11.mp3', src: 'peace-corps-L6' },
                     { tsw: 'Ke tswa kwa Botswana.', eng: 'I am from Botswana.', audio: 'items/u1l2-05.mp3', src: 'peace-corps-L3' } ] }
        ],
        next: 'wherefrom'
      },

      wherefrom: {
        katse: [ { lines: [ { tsw: 'O tswa kae?', eng: 'Where are you from?', audio: 'items/u1l2-06.mp3', src: 'peace-corps-L3' } ] } ],
        user: {
          accept: [
            { kind: 'frame', pattern: 'Ke tswa kwa {place}', eng: 'I am from …', src: 'peace-corps-L3',
              note: 'u1l2-10 frame — "drop in any place"' }
          ],
          hint: 'Ke tswa kwa … — then a place.',
          next: 'coffee'
        }
      },

      coffee: {
        katse: [ { lines: [
          { tsw: 'Ke batla kofi!', eng: 'I want coffee!', audio: 'items/u1l6-09.mp3', src: 'peace-corps-L13' },
          { tsw: 'O batla eng?', eng: 'What do you want?', audio: 'items/u2l3-06.mp3', src: 'peace-corps-L13' } // stretch word: eng
        ] } ],
        user: {
          accept: [
            { kind: 'item', id: 'u1l6-09' },                          // Ke batla kofi
            { kind: 'lit', tsw: 'Ke batla tee', eng: 'I want tea', src: 'peace-corps-L13+L14',
              note: 'Ke batla (u1l6-09 frame) + tee (sourced in u1l7-07) — combined-src convention' },
            { kind: 'item', id: 'u1l7-07' },                          // Ga ke batle tee
            { kind: 'lit', tsw: 'Ga ke batle kofi', eng: 'I do not want coffee', src: 'peace-corps-L10+L13',
              note: 'exact shape of attested Ga ke batle tee (u1l7-07): attested negative frame u1l7-01 + attested noun' },
            { kind: 'item', id: 'u1l6-12' }                           // Ke tlhoka madi — the honest answer
          ],
          hint: 'Ke batla … (or Ga ke batle …) — coffee is kofi, tea is tee.',
          next: 'coffee-good'
        }
      },

      'coffee-good': {
        katse: [ { lines: [ { tsw: 'Go siame!', eng: 'Alright then!', audio: 'items/u1l3-01.mp3', src: 'peace-corps-L4' } ] } ],
        next: 'bye'
      },

      bye: {
        katse: [ { lines: [
          { tsw: 'Ke a leboga!', eng: 'Thank you!', audio: 'items/u1l1-19.mp3', src: 'peace-corps-L2+beibele' },
          { tsw: 'Ke tla go bona kamoso.', eng: 'See you tomorrow.', audio: 'items/u1l3-03.mp3', src: 'peace-corps-L4' }
        ] } ],
        user: {
          accept: [
            { kind: 'item', id: 'u1l3-01' },                          // Go siame
            { kind: 'item', id: 'u1l3-02' },                          // Ke tla go bona
            { kind: 'item', id: 'u1l3-05' },                          // Tlhola sentle
            { kind: 'item', id: 'u1l3-07' }                           // Boroko
          ],
          hint: 'Say goodbye — Go siame, or Tlhola sentle.',
          next: 'end'
        }
      },

      end: {
        katse: [ { lines: [ { tsw: 'Tlhola sentle!', eng: 'Have a good day!', audio: 'items/u1l3-05.mp3', src: 'peace-corps-L4' } ] } ],
        end: true
      }
    }
  }
];
