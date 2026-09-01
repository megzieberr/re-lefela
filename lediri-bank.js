// Re:Lefela — 🗣️ Lediri: one verb, every shape. HAND-AUTHORED, not generated.
// ─────────────────────────────────────────────────────────────────────────────────────
// Source: "Commands and Requests 101 — Bevele en Versoeke 101" (A re bueng!), the
// official SECL121 handout by Johan Zerwick, trilingual Setswana / Afrikaans / English.
// Every Setswana string below is copied from his tables. Nothing here is generated.
//
// ⚠️ WHY ONLY TWO VERBS. The handout paradigms exactly two: SEGA (cut) and RAGA (kick).
// Megan's ruling, 2026-09-01: "just ship what he wrote, I don't want to study something
// off a pattern match and then the language decides to misbehave." Generating grids for
// other verbs would be inventing Setswana, which this project never does. If a native
// speaker later checks a third verb IN WRITING (source tag spoken-2026), it can be added
// here — not before.
//
// ⚠️ HIS INCONSISTENCY IS REPRODUCED, NOT TIDIED. The table prints `Se segêng!` with the
// circumflex but `Se segeng ka sekere!` without it. That row is entered exactly as he
// wrote it and flagged with `handoutOdd`, so the app can say so rather than quietly
// "correcting" a lecturer. It is question 5 on QUESTIONS-FOR-ZERWICK.md.
//
// GRADING. Answers go through the app's own norm(), which strips accents — so typing
// `Se segeng` for `Se segêng!` is accepted, same safety net as the respelled cards.
// `accept` lists the spellings that count; the first is what gets shown back.
//
// NO SRS WRITES. Progress lives in device-local rl_lediri, XP rides as kind 'lediri'.
// Same rule as Warm-up, Ditlhopha and the Sentence Builder: getting a production drill
// wrong is not evidence about a card's review schedule.

const RL_LEDIRI = [
{
  id: 'sega', verb: 'SEGA', eng: 'cut', af: 'sny',
  src: ['zerwick-commands-2024'],
  intro: 'A plain command has no subject concord — you do not say "you cut", you just say ' +
         'Sega!. The moment Ako makes it polite, the concord comes back.',
  // the full grid, shown in the teach step exactly as his table runs
  grid: [
    {tsw: 'Sega!',                     eng: 'Cut!',                                         shape: 'bare stem'},
    {tsw: 'Segang!',                   eng: 'Cut! (you all)',                               shape: '+ -ng'},
    {tsw: 'Se segê!',                  eng: "Don't cut!",                                   shape: 'Se … -ê'},
    {tsw: 'Se segêng!',                eng: "Don't cut! (you all)",                         shape: 'Se … -ê + -ng'},
    {tsw: 'Sega borotho!',             eng: 'Cut the bread!',                               shape: '+ object'},
    {tsw: 'Se segê borotho!',          eng: "Don't cut the bread!",                          shape: 'negative + object'},
    {tsw: 'Segang borotho!',           eng: 'Cut the bread! (you all)',                     shape: 'group + object'},
    {tsw: 'Sega ka thipa!',            eng: 'Cut with the knife!',                          shape: 'ka = with'},
    {tsw: 'Sega borotho ka thipa!',    eng: 'Cut the bread with the knife!',                shape: 'object then instrument'},
    {tsw: 'Sega sentle!',              eng: 'Cut neatly!',                                  shape: '+ adverb'},
    {tsw: 'Se segê ka sekere!',        eng: "Don't cut with the scissors!",                 shape: 'negative + instrument'},
    {tsw: 'Se segeng ka sekere!',      eng: "Don't cut with the scissors! (you all)",       shape: 'group negative + instrument', handoutOdd: true},
    {tsw: 'Ako o segê?',               eng: 'Will you please cut?',                         shape: 'Ako + concord + -ê'},
    {tsw: 'Ako o se segê?',            eng: "Please don't cut?",                            shape: 'Ako keeps the Se'},
    {tsw: 'Ako lo segêng?',            eng: 'Will you please cut? (you all)',               shape: 'Ako + lo + -êng'},
    {tsw: 'Ako o segê borotho ka thipa?', eng: 'Will you please cut the bread with the knife?', shape: 'polite, object, instrument'},
    {tsw: 'Ako o se segê borotho ka sekere?', eng: "Please don't cut the bread with the scissors?", shape: 'polite negative, full'},
    {tsw: 'Ako o segê sentle tswee-tswee?', eng: 'Will you please cut nicely?',             shape: '+ tswee-tswee'},
    {tsw: 'Ako lo segêng sentle tswee-tswee?', eng: 'Will you please cut nicely? (you all)', shape: 'all of it, to a group'},
  ],
  // the generative drill — she MAKES the shape, she does not pick it
  drills: [
    {id: 'sega-d1', from: 'Sega!', fromEng: 'Cut!',
     ask: 'Now say it to the whole class.', answer: 'Segang!', accept: ['segang'],
     why: '-ng on the end of a verb means you are talking to a group.'},
    {id: 'sega-d2', from: 'Sega!', fromEng: 'Cut!',
     ask: 'Now make it "Don\'t cut!"', answer: 'Se segê!', accept: ['se sege', 'se segê'],
     why: 'Se in front, and the final -a becomes -ê.'},
    {id: 'sega-d3', from: 'Se segê!', fromEng: "Don't cut!",
     ask: 'Now say that to the whole class.', answer: 'Se segêng!', accept: ['se segeng', 'se segêng'],
     why: 'Both markers stay: Se in front, -ê, then -ng for the group.'},
    {id: 'sega-d4', from: 'Sega!', fromEng: 'Cut!',
     ask: 'Now add the bread.', answer: 'Sega borotho!', accept: ['sega borotho'],
     why: 'The object simply follows the verb.'},
    {id: 'sega-d5', from: 'Sega!', fromEng: 'Cut!',
     ask: 'Now add the knife — "cut with the knife".', answer: 'Sega ka thipa!', accept: ['sega ka thipa'],
     why: 'ka = with. It introduces the tool.'},
    {id: 'sega-d6', from: 'Sega!', fromEng: 'Cut!',
     ask: 'Now both: cut the bread with the knife.', answer: 'Sega borotho ka thipa!',
     accept: ['sega borotho ka thipa'],
     why: 'Object first, then the instrument. Never the other way round.'},
    {id: 'sega-d7', from: 'Sega!', fromEng: 'Cut!',
     ask: 'Now ask nicely — "will you please cut?"', answer: 'Ako o segê?', accept: ['ako o sege', 'ako o segê'],
     why: 'Ako goes right at the front, and the concord o comes back. Politeness puts the ' +
          'person back into the sentence.'},
    {id: 'sega-d8', from: 'Ako o segê?', fromEng: 'Will you please cut?',
     ask: 'Now ask the whole class the same thing.', answer: 'Ako lo segêng?',
     accept: ['ako lo segeng', 'ako lo segêng'],
     why: 'The group concord is lo, and the verb still takes -ng.'},
    {id: 'sega-d9', from: 'Ako o segê?', fromEng: 'Will you please cut?',
     ask: 'Now make it "please don\'t cut?"', answer: 'Ako o se segê?',
     accept: ['ako o se sege', 'ako o se segê'],
     why: 'Nothing is dropped — the Se of the negative stays and Ako is added in front of it.'},
    {id: 'sega-d10', from: 'Sega!', fromEng: 'Cut!',
     ask: 'Now say "cut neatly".', answer: 'Sega sentle!', accept: ['sega sentle'],
     why: 'sentle = nicely, neatly. It goes after the verb.'},
    {id: 'sega-d11', from: 'Sega sentle!', fromEng: 'Cut neatly!',
     ask: 'Now ask it as politely as you can — please, and please again at the end.',
     answer: 'Ako o segê sentle tswee-tswee?', accept: ['ako o sege sentle tswee tswee', 'ako o segê sentle tswee-tswee', 'ako o sege sentle tswee-tswee'],
     why: 'Ako at the front, tswee-tswee at the end. They stack for extra politeness.'},
  ],
},
{
  id: 'raga', verb: 'RAGA', eng: 'kick', af: 'skop',
  src: ['zerwick-commands-2024'],
  intro: 'The same shapes on a second verb — which is how the handout shows it is a ' +
         'pattern and not a list to memorise.',
  grid: [
    {tsw: 'Raga bolo!',            eng: 'Kick the ball!',                  shape: 'matches Sega borotho!'},
    {tsw: 'Ragang bolo!',          eng: 'Kick the ball! (you all)',        shape: 'matches Segang borotho!'},
    {tsw: 'Se ragê bolo!',         eng: "Don't kick the ball!",            shape: 'matches Se segê borotho!'},
    {tsw: 'Se ragêng bolo!',       eng: "Don't kick the ball! (you all)",  shape: 'matches Se segêng!'},
    {tsw: 'Raga bolo mo lebaleng!', eng: 'Kick the ball on the field!',    shape: 'mo …-ng = the place'},
    {tsw: 'Ako o ragê bolo?',      eng: 'Will you please kick the ball?',  shape: 'matches Ako o segê?'},
  ],
  drills: [
    {id: 'raga-d1', from: 'Raga bolo!', fromEng: 'Kick the ball!',
     ask: 'Now say it to the whole class.', answer: 'Ragang bolo!', accept: ['ragang bolo'],
     why: 'Same -ng as Segang. The pattern does not change with the verb.'},
    {id: 'raga-d2', from: 'Raga bolo!', fromEng: 'Kick the ball!',
     ask: 'Now make it "Don\'t kick the ball!"', answer: 'Se ragê bolo!',
     accept: ['se rage bolo', 'se ragê bolo'],
     why: 'Se in front, final -a becomes -ê — exactly as with sega.'},
    {id: 'raga-d3', from: 'Se ragê bolo!', fromEng: "Don't kick the ball!",
     ask: 'Now say that to the whole class.', answer: 'Se ragêng bolo!',
     accept: ['se rageng bolo', 'se ragêng bolo'],
     why: 'Se … -ê … -ng. All three at once.'},
    {id: 'raga-d4', from: 'Raga bolo!', fromEng: 'Kick the ball!',
     ask: 'Now ask nicely — "will you please kick the ball?"', answer: 'Ako o ragê bolo?',
     accept: ['ako o rage bolo', 'ako o ragê bolo'],
     why: 'Ako at the front, the concord o back in place.'},
    {id: 'raga-d5', from: 'Raga bolo!', fromEng: 'Kick the ball!',
     ask: 'Now put it on the field — "kick the ball on the field".',
     answer: 'Raga bolo mo lebaleng!', accept: ['raga bolo mo lebaleng'],
     why: 'mo … -ng wraps the place: lebala (field) becomes mo lebaleng. This is the ' +
          'grammar your unit is named after — mo sekolong, at school.'},
  ],
},
];
