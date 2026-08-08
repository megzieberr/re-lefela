// Re:Lefela — Sentence Builder bank (SPEC-sentence-builder.md)
// ─────────────────────────────────────────────────────────────────────────────
// PROVENANCE RULES (same bar as content.js — NO unsourced Setswana):
// Every `accept` string is either (a) verbatim in toolkit/sentence-bank.tsv /
// content.js / dialogues.js / the Peace Corps corpus, or (b) a composition whose
// every piece AND pattern is attested, following the documented combined-src
// precedent (u1l7-07 "Ga ke batle tee"). The `src` + `note` fields record the
// trace for each entry. Curated + source-checked 2026-07-26 (session 30) against
// toolkit/GRAMMAR.md, toolkit/sentence-bank.tsv and corpus/peace-corps-full-course.txt.
// toolkit/gen-builder-candidates.py DRAFTS candidates only — nothing lands here
// without a human/supervisor source check. toolkit/verify-builder-bank.py
// cross-checks ids/shape on every ship.
//
// Entry shape: { id, eng (prompt shown), accept: [full pre-checked sentences —
// word order must match one of them; norm() handles case/punctuation],
// usesIds: [content.js items this draws on — ALL must be learned (reps>=1) to
// unlock], src, note (used as the after-two-misses hint, so word it as a nudge,
// never the answer) }
// ─────────────────────────────────────────────────────────────────────────────
const RL_BUILDER = [

  // ── Unit 1 ────────────────────────────────────────────────────────────────
  {
    id: 'sb-u1-01', eng: 'We have a book',
    accept: ['Re na le buka'],
    usesIds: ['u1l4-08', 'u1l4-10'],
    src: 'peace-corps-L11',
    note: 'Same frame as "Ke na le buka" — just swap in the we-concord.'
  },
  {
    id: 'sb-u1-02', eng: 'I am drinking',
    accept: ['Ke a nwa'],
    usesIds: ['u1l6-02', 'u1l6-08'],
    src: 'grammar-toolkit§4+peace-corps-L5',
    note: 'Model: Ke a ja. Nothing follows the verb, so the little "a" stays.'
  },
  {
    id: 'sb-u1-03', eng: 'They are eating',
    accept: ['Ba a ja'],
    usesIds: ['u1l4-09', 'u1l6-08'],
    src: 'peace-corps-L11+L6',
    note: 'Model: Ba a bala — same they-concord, different verb.'
  },
  {
    id: 'sb-u1-04', eng: 'I want tea',
    accept: ['Ke batla tee'],
    usesIds: ['u1l6-05', 'u1l6-09', 'u1l7-07'],
    src: 'peace-corps-L13+L14',
    note: 'Model: Ke batla kofi. An object follows, so no "a".'
  },
  {
    id: 'sb-u1-05', eng: 'I want a book',
    accept: ['Ke batla buka'],
    usesIds: ['u1l6-05', 'u1l6-09', 'u1l5-05'],
    src: 'peace-corps-L13',
    note: 'Same frame as Ke batla kofi / Ke batla kerese (PC L13).'
  },
  {
    id: 'sb-u1-06', eng: "I don't want coffee",
    accept: ['Ga ke batle kofi'],
    usesIds: ['u1l7-01', 'u1l6-09'],
    src: 'peace-corps-L10+L13',
    note: 'Precedent: Ga ke batle tee. Negative: ga + ke, and batla → batle.'
  },
  {
    id: 'sb-u1-07', eng: "I don't have a book",
    accept: ['Ga ke na buka', 'Ga ke na le buka'],
    usesIds: ['u1l7-06', 'u1l4-10'],
    src: 'grammar-toolkit§5',
    note: 'ga ke na = I don\'t have. GRAMMAR.md §5 attests both the bare-noun and the "na le" negative frames.'
  },
  {
    id: 'sb-u1-08', eng: "I don't have money",
    accept: ['Ga ke na madi', 'Ga ke na le madi'],
    usesIds: ['u1l7-06', 'u1l6-12'],
    src: 'grammar-toolkit§5',
    note: '"ga ke na le madi" is the GRAMMAR.md §5 example verbatim; the bare-noun form is equally attested.'
  },
  {
    id: 'sb-u1-09', eng: 'Yes, I have a problem',
    accept: ['Ee, ke na le mathata'],
    usesIds: ['u1l1-11', 'u1l4-10', 'u1l7-06'],
    src: 'peace-corps-L6',
    note: 'Start with yes, then the have-frame. You met mathata in its negative twin.'
  },
  {
    id: 'sb-u1-10', eng: 'He/she does not study',
    accept: ['Ga a ithute'],
    usesIds: ['u1l7-02', 'u1l6-07'],
    src: 'peace-corps-L6',
    note: 'Model: Ga a je — he/she\'s concord turns to "a" in the negative, and the verb\'s -a → -e.'
  },
  {
    id: 'sb-u1-11', eng: "I don't speak English",
    accept: ['Ga ke bue Sekgoa'],
    usesIds: ['u1l7-08', 'u1l7-01'],
    src: 'peace-corps-L10+L5',
    note: 'Model: Ga ba bue Sekgoa — swap the they-concord for the I-concord.'
  },
  {
    id: 'sb-u1-12', eng: "No, I don't like coffee",
    accept: ['Nnyaa, ga ke rate kofi'],
    usesIds: ['u1l1-12', 'u1l7-03'],
    src: 'peace-corps-L13',
    note: 'Start with no, then the negative like-sentence you know.'
  },
  {
    id: 'sb-u1-13', eng: 'Do you like coffee?',
    accept: ['O rata kofi?', 'A o rata kofi?'],
    usesIds: ['u1l7-03', 'u1l2-07'],
    src: 'peace-corps-L13',
    note: 'A statement becomes a yes/no question by tone — or by putting A in front.'
  },
  {
    id: 'sb-u1-14', eng: 'I am from America',
    accept: ['Ke tswa kwa Amerika'],
    usesIds: ['u1l2-10', 'u1l2-07'],
    src: 'peace-corps-L3',
    note: 'The Ke tswa kwa… frame — drop in the place. kwa points AT a place; kae asks where.'
  },
  {
    id: 'sb-u1-15', eng: 'And where are YOU from?',
    accept: ['Wena o tswa kae?'],
    usesIds: ['u1l4-02', 'u1l2-06'],
    src: 'dialogues-chat0 (combined-src)',
    note: 'Bounce the question back with the emphatic you-word first.'
  },
  {
    id: 'sb-u1-16', eng: 'We are learning Setswana',
    accept: ['Re ithuta Setswana'],
    usesIds: ['u1l2-09', 'u1l4-04'],
    src: 'peace-corps-L6+L8',
    note: 'Model: Ke ithuta Setswana — swap in the we-concord.'
  },
  {
    id: 'sb-u1-17', eng: 'I go to school',
    accept: ['Ke ya sekolong'],
    usesIds: ['u1l6-04', 'u1l5-09', 'u1l6-11'],
    src: 'peace-corps-L17',
    note: 'Model: Ke ya lapeng — the place takes -eng: sekolo → sekolong.'
  },
  {
    id: 'sb-u1-18', eng: 'Where do you want to go?',
    accept: ['O batla go ya kae?'],
    usesIds: ['u1l6-05', 'u1l6-04', 'u1l6-10'],
    src: 'peace-corps-L13',
    note: 'batla + go + verb = want TO do; kae sits where the answer would.'
  },
  {
    id: 'sb-u1-19', eng: 'I want to go home',
    accept: ['Ke batla go ya kwa lapeng', 'Ke batla go ya lapeng'],
    usesIds: ['u1l6-05', 'u1l6-04', 'u1l6-11'],
    src: 'peace-corps-L13',
    note: 'PC L13 verbatim with kwa; Ke ya lapeng shows the frame without it.'
  },
  {
    id: 'sb-u1-20', eng: 'I want to buy a book',
    accept: ['Ke batla go reka buka'],
    usesIds: ['u1l6-05', 'u1l6-06', 'u1l5-05'],
    src: 'peace-corps-L13+course(go reka dijo)',
    note: 'batla + go + verb, then the thing you\'re buying — same shape as go reka dijo (PC course).'
  },

  // ── Unit 2 ────────────────────────────────────────────────────────────────
  {
    id: 'sb-u2-01', eng: 'I am a doctor',
    accept: ['Ke ngaka'],
    usesIds: ['u2l4-04', 'u2l4-01'],
    src: 'pc-comp-grammar-ch2',
    note: 'Model: Ke morutabana — your own I-marker does the "am" work.'
  },
  {
    id: 'sb-u2-02', eng: 'You are a teacher',
    accept: ['O morutabana'],
    usesIds: ['u2l4-04', 'u2l4-02'],
    src: 'pc-comp-grammar-ch2 (GRAMMAR.md §5 verbatim)',
    note: 'Same trick as Ke morutabana, with the you-marker.'
  },
  {
    id: 'sb-u2-03', eng: 'He/she is not a teacher',
    accept: ['Ga se morutabana'],
    usesIds: ['u2l4-05', 'u2l4-02'],
    src: 'pc-comp-grammar-ch2 (GRAMMAR.md §5 verbatim)',
    note: 'Model: Ga se ngaka — the identity-negative is ga se.'
  },
  {
    id: 'sb-u2-04', eng: 'Mpho is a doctor',
    accept: ['Mpho ke ngaka'],
    usesIds: ['u2l4-03'],
    src: 'pc-comp-grammar-ch7',
    note: 'Talking ABOUT someone: the little ke does the "is".'
  },
  {
    id: 'sb-u2-05', eng: 'Do you have a book?',
    accept: ['A o na le buka?'],
    usesIds: ['u2l3-08', 'u1l4-11'],
    src: 'peace-corps-L6+L11',
    note: 'Model: A o na le dipotso? — A in front turns the have-statement into a question.'
  },
  {
    id: 'sb-u2-06', eng: 'My head is sore',
    accept: ['Tlhogo yame e botlhoko'],
    usesIds: ['u2l1-02', 'u2l7-05', 'u2l7-08'],
    src: 'peace-corps-L22 pain pattern (Tlhogo yame attested L13)',
    note: 'Body part + my + its concord + botlhoko. Tlhogo is class 9 — its concord is e.'
  },
  {
    id: 'sb-u2-07', eng: 'My legs are sore',
    accept: ['Maoto ame a botlhoko'],
    usesIds: ['u2l2-07', 'u2l7-06'],
    src: 'peace-corps-L22 pain pattern',
    note: 'Legs, not leg — leoto is one leg, maoto is both of them. maoto is class 6 like mala, so the concord is a: model it on Mala ame a botlhoko.'
  },
  {
    id: 'sb-u2-08', eng: 'A white horse',
    accept: ['Pitse e tshweu'],
    usesIds: ['u2l6-10'],
    src: 'beibele (Rev 6:2 verbatim)',
    note: 'Class 9 concord e, and -sweu hardens to tshweu.'
  },
  {
    id: 'sb-u2-09', eng: 'The cows are fierce',
    accept: ['Dikgomo di bogale'],
    usesIds: ['u2l5-07'],
    src: 'pc-comp-grammar-ch2',
    note: 'Class 10 cows take di — strong adjectives follow straight after.'
  },

  // ── Unit 3 ────────────────────────────────────────────────────────────────
  // The u3l1–l3 paradigm cards are all concordSlot drills (she only ever PICKS
  // the concord) — typing the whole conjugated form is exactly the production
  // gap this feature exists for.
  {
    id: 'sb-u3-01', eng: 'You do not want',
    accept: ['Ga o batle'],
    usesIds: ['u3l1-07'],
    src: 'peace-corps-L10',
    note: 'ga + the you-concord, and batla\'s last -a turns to -e.'
  },
  {
    id: 'sb-u3-02', eng: 'They do not want',
    accept: ['Ga ba batle'],
    usesIds: ['u3l1-11'],
    src: 'peace-corps-L10',
    note: 'Same negative frame, they-concord.'
  },
  {
    id: 'sb-u3-03', eng: 'We wanted',
    accept: ['Re ne re batla'],
    usesIds: ['u3l2-04'],
    src: 'peace-corps-L10',
    note: 'The past says the concord twice, with ne in between.'
  },
  {
    id: 'sb-u3-04', eng: 'She/he wanted',
    accept: ['O ne a batla'],
    usesIds: ['u3l2-03'],
    src: 'peace-corps-L10',
    note: 'The trick cell: the SECOND concord shifts o → a for she/he.'
  },
  {
    id: 'sb-u3-05', eng: 'I did not want',
    accept: ['Ke ne ke sa batle'],
    usesIds: ['u3l2-07'],
    src: 'peace-corps-L10',
    note: 'The ne-past plus sa before the verb, and -a → -e again.'
  },
  {
    id: 'sb-u3-06', eng: 'I will not want',
    accept: ['Ga ke kake ka batla'],
    usesIds: ['u3l3-06'],
    src: 'peace-corps-L10',
    note: 'The strangest cell in the table: ga + ke + kake + the changed second concord.'
  },
  {
    id: 'sb-u3-07', eng: 'I will go to school',
    accept: ['Ke tla ya kwa sekolong'],
    usesIds: ['u3l8-01'],
    src: 'peace-corps-L10+L17',
    note: 'concord + tla + verb — the future is the kind one.'
  },
  {
    id: 'sb-u3-08', eng: 'We will read a book',
    accept: ['Re tla bala buka'],
    usesIds: ['u3l8-05'],
    src: 'peace-corps-L10+L11',
    note: 'Future frame + an object straight after the verb.'
  },
  {
    id: 'sb-u3-09', eng: 'They will learn Setswana',
    accept: ['Ba tla ithuta Setswana'],
    usesIds: ['u3l8-07'],
    src: 'peace-corps-L10+L6',
    note: 'Same future frame, they-concord.'
  },
  {
    id: 'sb-u3-10', eng: 'Tomorrow I will go to school',
    accept: ['Kamoso ke tla ya kwa sekolong', 'Kamoso ke tla ya sekolong',
             'Ke tla ya kwa sekolong kamoso', 'Ke tla ya sekolong kamoso'],
    usesIds: ['u3l6-03', 'u3l8-01'],
    src: 'grammar-toolkit (u3l6-00 rule verbatim)+peace-corps-L10+L17',
    note: 'Time words sit at the start or the very end — kamoso is your future cue.'
  },
  {
    id: 'sb-u3-11', eng: 'Mpho went to school',
    accept: ['Mpho o ile kwa sekolong'],
    usesIds: ['u3l7-02'],
    src: 'pc-comp-grammar-ch2',
    note: 'The "finished" past: go ya → ile.'
  },
  {
    id: 'sb-u3-12', eng: 'I was learning Setswana',
    accept: ['Ke ne ke ithuta Setswana'],
    usesIds: ['u3l7-04'],
    src: 'peace-corps-L10+L6',
    note: 'The ne-past you drilled with batla, now with a school verb.'
  },
  {
    id: 'sb-u3-13', eng: 'She/he was teaching',
    accept: ['O ne a ruta'],
    usesIds: ['u3l7-05'],
    src: 'peace-corps-L10+L5',
    note: 'Watch the second concord — o → a for she/he.'
  },

  // ── Unit 4 ────────────────────────────────────────────────────────────────
  {
    id: 'sb-u4-01', eng: 'I want bread',
    accept: ['Ke batla borotho'],
    usesIds: ['u1l6-05', 'u1l6-09', 'u4l1-03'],
    src: 'peace-corps-L13+L14',
    note: 'The Ke batla + thing frame, with a Unit 4 food word.'
  },
  {
    id: 'sb-u4-02', eng: 'I am cooking food',
    accept: ['Ke apaya dijo'],
    usesIds: ['u4l2-01', 'u4l2-06', 'u4l1-01'],
    src: 'pc-comp-grammar-interrog (Re apaya merogo model)',
    note: 'Model: Re apaya merogo — swap the concord and the food.'
  },
  {
    id: 'sb-u4-03', eng: 'I drink water',
    accept: ['Ke nwa metsi'],
    usesIds: ['u1l6-02', 'u4l1-04'],
    src: 'peace-corps-L5+L14 (nwa metsi verbatim in Beibele, JHN 4)',
    note: 'An object follows the verb, so no little "a" in between.'
  },
  {
    id: 'sb-u4-04', eng: 'One orange',
    accept: ['Namune e le nngwe'],
    usesIds: ['u4l4-01'],
    src: 'peace-corps-L20',
    note: 'Counting: the noun\'s concord + le + the number. Namune is class 9.'
  },
  {
    id: 'sb-u4-05', eng: 'Two people',
    accept: ['Batho ba le babedi'],
    usesIds: ['u4l4-02'],
    src: 'pc-comp-grammar-ch2',
    note: 'People-class counting — the number takes the class prefix too.'
  },
  {
    id: 'sb-u4-06', eng: 'Two cows',
    accept: ['Dikgomo di le pedi'],
    usesIds: ['u4l4-03'],
    src: 'pc-comp-grammar-ch2',
    note: 'Class 10 uses the bare strong number — di le pedi, no extra prefix.'
  },
  {
    id: 'sb-u4-07', eng: 'food and drink',
    accept: ['dijo le dino'],
    usesIds: ['u4l5-01', 'u4l1-01', 'u4l2-03'],
    src: 'grammar-toolkit (u4l2-03 note verbatim)',
    note: 'le joins words and lists — never two whole sentences.'
  },
  {
    id: 'sb-u4-08', eng: 'coffee or tea',
    accept: ['kofi kgotsa tee'],
    usesIds: ['u4l5-04', 'u1l6-09', 'u1l7-07'],
    src: 'peace-corps-L9+L14',
    note: 'kgotsa offers the choice between two things.'
  },

  // ── Unit 5 ────────────────────────────────────────────────────────────────
  // u5l5-00's own rule promises: "once a sentence is familiar the app will ask
  // you to WRITE it out" — these are that promise, plus the swaps the u5l5
  // cards' notes explicitly invite.
  {
    id: 'sb-u5-01', eng: 'I have a cat',
    accept: ['Ke na le katse'],
    usesIds: ['u5l5-01', 'u5l1-09'],
    src: 'peace-corps-L11+app-mascot (Ke na le podi model)',
    note: 'The Ke na le frame — swap in the animal you know best.'
  },
  {
    id: 'sb-u5-02', eng: 'I see a lion',
    accept: ['Ke bona tau'],
    usesIds: ['u5l5-03', 'u5l2-01'],
    src: 'peace-corps-L4+beibele (Ke bona nonyane model)',
    note: 'Model: Ke bona nonyane — same frame, wilder animal.'
  },
  {
    id: 'sb-u5-03', eng: 'A white sheep',
    accept: ['Nku e tshweu'],
    usesIds: ['u5l5-04', 'u2l6-10'],
    src: 'beibele (pitse e tshweu + nku e ntsho patterns)',
    note: 'Same class-9 colour pattern as the horses — concord e + the hardened stem.'
  },
  {
    id: 'sb-u5-04', eng: 'The lions are fierce',
    accept: ['Ditau di bogale'],
    usesIds: ['u5l5-05', 'u5l2-01'],
    src: 'pc-comp-grammar-ch2+beibele (Dintša di bogale model)',
    note: 'The exact shape of Dikgomo di bogale — swap the subject, keep di.'
  },
  {
    id: 'sb-u5-05', eng: 'I have a dog and a cat',
    accept: ['Ke na le ntša le katse'],
    usesIds: ['u5l3-07', 'u5l5-02', 'u5l1-09'],
    src: 'beibele+peace-corps-L11 (Ke na le dinku le dipodi frame)',
    note: 'Model: Ke na le dinku le dipodi — le links the two animals.'
  },
  {
    id: 'sb-u5-06', eng: 'I like cats',
    accept: ['Ke rata dikatse'],
    usesIds: ['u5l5-06', 'u5l1-09'],
    src: 'peace-corps-L6+app-mascot (Ke rata diphologolo model)',
    note: 'Model: Ke rata diphologolo — plural animals after Ke rata.'
  },
  {
    id: 'sb-u5-07', eng: 'Two goats',
    accept: ['Dipodi di le pedi'],
    usesIds: ['u4l4-03', 'u5l1-04'],
    src: 'pc-comp-grammar-ch2+beibele (Dikgomo di le pedi pattern)',
    note: 'Class 10 counting again — Unit 4\'s pattern meeting Unit 5\'s animals.'
  }
];
