/* toolkit/test-spelling.js — the circumflex safety net (session 43, 2026-09-01).
 *
 * The app now follows Johan Zerwick's SECL121 handout and writes ê/ô on the words he
 * marks. Megan types on an ordinary keyboard with no hats on it. The ONLY reason that
 * is safe is that norm() strips combining accents before matching — so this file exists
 * to prove that, card by card, rather than trusting a note in a status file.
 *
 * It also pins the two rulings that decided the scope, because both are the kind of
 * thing a later session would "tidy" back in:
 *   - mme = "but" is NOT mmê = "mother". Different word, no hat.
 *   - yo in "Ke Modisa yo o Molemo" is the relative "who", not the demonstrative yô.
 *   - Thabo is a person's name and stays plain (her ruling, 2026-09-01).
 *
 * Extended 2026-09-12 (Build A — the Smart Guide hat pass). The guide marks ê/ô too, but it
 * is typo-prone, so her twice-rule decides: a word Zerwick does NOT hat is respelled only if
 * the guide hats it at least twice, on separate pages, same spelling, same meaning. Exactly
 * three words survived that test (the numerals nngwê / pêdi / nnê, printed hatted on both
 * p.23 and p.70), touching six cards. Everything the rule REJECTED is pinned plain below,
 * because each rejection is a judgement a later session would otherwise "fix":
 *   - ne (past marker): the guide hats it only when naming the morpheme in rule prose; all
 *     five of its own example sentences write plain "ne", which is the shape of our 16 cards.
 *   - gagwe: hatted twice, but both in ONE table cell pair on p.27, against plain gagwe on
 *     five other pages. Two cells of one table is one typesetting event, not confirmation.
 *   - lona / bona / bone / gone: the guide's hatted forms are different lexemes from our
 *     cards (class possessives and a locative, not "you (pl)", "to see", "they", "right now").
 *   - se: the guide's three hatted "sê" are AFRIKAANS ("to say"), not Setswana at all.
 *
 * Run: node toolkit/test-spelling.js
 */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let pass = 0, fails = [];
const ok = (c, m) => c ? pass++ : fails.push(m);
const eq = (a, b, m) => ok(JSON.stringify(a) === JSON.stringify(b),
  `${m}\n      got  ${JSON.stringify(a)}\n      want ${JSON.stringify(b)}`);

/* ---------- lift the app's real norm() ---------- */
// brace-balanced, so it survives norm() being reformatted or growing a line
function sliceFn(name){
  const at = SRC.indexOf('function ' + name + '(');
  if (at < 0) return null;
  let depth = 0;
  for (let j = SRC.indexOf('{', at); j < SRC.length; j++){
    if (SRC[j] === '{') depth++;
    else if (SRC[j] === '}' && --depth === 0) return SRC.slice(at, j + 1);
  }
  return null;
}
const normSrc = sliceFn('norm');
if (!normSrc) { console.log('FAILED - could not find norm() in index.html'); process.exit(1); }
eval(normSrc);

globalThis.RL_CONTENT = eval(fs.readFileSync(path.join(ROOT, 'content.js'), 'utf8') + '; RL_CONTENT');
const cards = [];
for (const u of RL_CONTENT.units) for (const l of u.lessons) for (const it of l.items) cards.push(it);
const byId = Object.fromEntries(cards.map(c => [c.id, c]));

/* ---------- 1. every respelled card still accepts the plain typing ---------- */
// id -> what the card said before 2026-09-01. Typing THIS must still grade correct.
const WAS = {
  'u1l5-09': 'sekolo',                     'u1l6-06': 'go reka',
  'u2l1-02': 'tlhogo',                     'u2l1-06': 'tsebe',
  'u2l2-09': 'Ema ka dinao',               'u2l7-04': 'Ke opiwa ke tlhogo',
  'u2l7-05': 'Tlhogo yame e santse e opa', 'u3l5-03': 'Ema ka dinao',
  'u3l5-04': 'Ema o bue',                  'u3l6-01': 'gompieno',
  'u5l1-01': 'phologolo',
};
for (const [id, plain] of Object.entries(WAS)) {
  const c = byId[id];
  ok(c, `${id} still exists`);
  if (!c) continue;
  ok(/[êôÊÔ]/.test(c.tsw), `${id} actually carries the lecturer's spelling (${c.tsw})`);
  eq(norm(c.tsw), norm(plain), `${id}: typing "${plain}" must still match "${c.tsw}"`);
  ok(/zerwick-2024/.test(c.src || ''), `${id} records whose spelling it follows`);
  ok(!!c.audio, `${id} kept its clip — a respell must never orphan audio`);
}

/* ---------- 1b. the six guide-confirmed cards (Build A, 2026-09-12) ---------- */
// id -> [exact spelling now shown, what it said before]. The exact string is pinned because
// the whole point of the twice-rule is that ONE of these spellings is right and the
// neighbouring ones (babedi, dipedi, tharo…) are deliberately NOT hatted.
const GUIDE = {
  'u4l3-02': ['nngwê',                      'nngwe'],
  'u4l3-03': ['pêdi',                       'pedi'],
  'u4l3-05': ['nnê',                        'nne'],
  'u4l4-01': ['Namune e le nngwê',          'Namune e le nngwe'],
  'u4l4-03': ['Dikgomo di le pêdi',         'Dikgomo di le pedi'],
  'u4l4-06': ['Dikgomo tse pêdi di a ja',   'Dikgomo tse pedi di a ja'],
};
for (const [id, [now, plain]] of Object.entries(GUIDE)) {
  const c = byId[id];
  ok(c, `${id} still exists`);
  if (!c) continue;
  eq(c.tsw, now, `${id} shows the guide's spelling exactly`);
  eq(norm(c.tsw), norm(plain), `${id}: typing "${plain}" must still match "${c.tsw}"`);
  ok(/smart-guide-2021 p\.23,70/.test(c.src || ''),
     `${id} cites the two guide pages that confirmed the hat (src: ${c.src})`);
  ok(!!c.audio, `${id} kept its clip — a respell must never orphan audio`);
}
// The concord exercise renders head + answer + tail, so a stale tail would show the card
// in two spellings at once on the same screen.
eq(byId['u4l4-01'].concordSlot.tail, 'le nngwê', 'u4l4-01 concord tail respelled with the card');
eq(byId['u4l4-03'].concordSlot.tail, 'le pêdi',  'u4l4-03 concord tail respelled with the card');
eq(byId['u4l4-02'].concordSlot.tail, 'le babedi',
   'u4l4-02 tail keeps plain babedi — the guide never hats the prefixed form');
eq(byId['u4l4-04'].concordSlot.tail, 'le babedi', 'u4l4-04 tail keeps plain babedi too');

/* ---------- 2. hats appear ONLY where a source put them ---------- */
// Nothing else in content.js may grow a circumflex without a source saying so; that
// would be inventing Setswana, which is the one rule this project never bends.
const hatted = cards.filter(c => c.tsw && /[êôÊÔ]/.test(c.tsw)).map(c => c.id).sort();
eq(hatted, [...Object.keys(WAS), ...Object.keys(GUIDE)].sort(),
   'exactly the 11 Zerwick cards + the 6 guide-confirmed cards carry circumflexes');

/* ---------- 3. the two words that LOOK like candidates and are not ---------- */
eq(byId['u4l5-03'].tsw, 'mme', 'u4l5-03 is mme = "but", not mmê = "mother" — stays plain');
eq(byId['u4l5-03'].eng, 'but', 'u4l5-03 still glosses as "but" (the reason it stays plain)');
eq(byId['u5l4-05'].tsw, 'Ke Modisa yo o Molemo',
   'u5l4-05 keeps plain yo — the relative "who", not the demonstrative yô');
ok(/Thabo\b/.test(byId['u1l2-08'].tsw) && !/Thabô/.test(byId['u1l2-08'].tsw),
   'u1l2-08 keeps Thabo plain — a person\'s name, her ruling 2026-09-01');

/* ---------- 4. the locative stays plain until he answers ---------- */
const builder = fs.readFileSync(path.join(ROOT, 'builder-bank.js'), 'utf8');
ok(/Ke ya sekolong/.test(builder) && !/sekôlông|sekolông/.test(builder),
   'sb-u1-17 keeps "sekolong" plain — question 1 to Zerwick, not ours to guess');
ok(/Ke batla go rêka buka/.test(builder), 'sb-u1-20 follows the handout (rêka)');
ok(/Tlhôgô yame e botlhoko/.test(builder), 'sb-u2-06 follows the handout (Tlhôgô)');

/* ---------- 5. no respell collided two cards into one ---------- */
// Dups across lessons are allowed and pre-existing (Êma ka dinao is u2l2-09 + u3l5-03);
// what must NOT happen is a respell merging two cards that used to be different words.
const seen = {};
cards.filter(c => c.tsw).forEach(c => { (seen[c.tsw] = seen[c.tsw] || []).push(c.id); });
const merged = Object.entries(seen).filter(([t, ids]) => ids.length > 1)
  .map(([t, ids]) => `${t} [${ids.join(', ')}]`).sort();
// These nine pairs all pre-date the respell (a card deliberately re-taught in a later
// unit; allItemsExcept() filters distractors by tsw so they never appear against each
// other). The invariant is that this list does not GROW: a respell must not quietly
// merge two cards that used to be different words.
eq(merged, [
  'Dikgomo di bogale [u2l5-07, u5l3-01]',
  'Dikgomo di dintle [u2l5-08, u5l3-02]',
  'Ga ke batle [u1l7-01, u3l1-06]',
  'Ke na le dikgomo tse dintle [u2l5-09, u5l3-03]',
  'Ke tla go bona kamoso [u1l3-03, u3l8-02]',
  'O na le bana ba le babedi [u2l4-08, u4l4-04]',
  'Pitse e ntsho [u2l6-11, u5l3-05]',
  'Pitse e tshweu [u2l6-10, u5l3-04]',
  'Êma ka dinao [u2l2-09, u3l5-03]',
], 'no respell merged two cards that used to be different words');

/* ---------- 6. the new tabs accept plain typing too ---------- */
// 🔊 Medumo's translate step and 🗣️ Lediri's drills both grade through norm(), so every
// hatted word must still be gradeable from an ordinary keyboard. Same proof as part 1,
// applied to the lecturer's own 164 words instead of the 11 respelled cards.
const mdSrc = fs.readFileSync(path.join(ROOT, 'medumo-bank.js'), 'utf8');
const MEDUMO = eval(mdSrc + '; RL_MEDUMO');
const PAIRS = eval(mdSrc + '; RL_MEDUMO_PAIRS');
const plainType = w => w.normalize('NFD').replace(/[̀-ͯ]/g, '');
const mdWords = MEDUMO.flatMap(s => s.words);
const mdHatted = mdWords.filter(w => /[êôÊÔ]/.test(w.t));
ok(mdHatted.length > 20, `the handout's hatted words really are in the bank (${mdHatted.length})`);
const unTypeable = mdHatted.filter(w => norm(plainType(w.t)) !== norm(w.t));
eq(unTypeable.map(w => w.t), [], 'every hatted Medumo word still grades typed without hats');

/* The minimal-pair round is the ONE place that must NOT go through norm(): stripping the
   accent is exactly the distinction under test. Pinned here so a later session tidying
   "inconsistent grading" cannot quietly destroy the round. */
const pairFn = SRC.slice(SRC.indexOf('function medumoPairStep()'),
                         SRC.indexOf('function finishMedumoPairs()'));
ok(pairFn.length > 100, 'found medumoPairStep in index.html');
ok(!/norm\(/.test(pairFn),
   'the minimal-pair round must NOT use norm() — the accent IS the question there');
ok(/btn\.dataset\.t === p\.opts\[0\]\.t/.test(pairFn),
   'the pair round compares the raw Setswana string');
PAIRS.forEach(p => {
  const flat = p.opts.map(o => norm(o.t));
  ok(new Set(flat).size === 1,
     `${p.id}: its options collapse to one word under norm() — which is why it is a pair`);
});

/* 🗣️ Lediri — a drill that does not accept its own printed answer is unpassable. */
const LEDIRI = eval(fs.readFileSync(path.join(ROOT, 'lediri-bank.js'), 'utf8') + '; RL_LEDIRI');
eq(LEDIRI.map(v => v.id), ['sega', 'raga'],
   'only the two verbs the handout paradigms — her ruling, no generated grids');
LEDIRI.forEach(v => v.drills.forEach(d => {
  ok(d.accept.some(a => norm(a) === norm(d.answer)),
     `${d.id}: typing its own answer "${d.answer}" is accepted`);
  ok(d.accept.some(a => norm(a) === norm(plainType(d.answer))),
     `${d.id}: typing "${plainType(d.answer)}" (no hats) is accepted`);
}));

/* Neither tab may touch the SRS — the Warm-up rule, checked in the source rather than
   trusted. Both keep their own device-local key instead. */
const mdBlock = SRC.slice(SRC.indexOf('const MEDUMO_TRANSLATE'), SRC.indexOf('function warmupStoreGet'));
ok(!/srsGrade|state\.srs|reviewAt/.test(mdBlock),
   'Medumo and Lediri write nothing to the SRS');
ok(/store\.get\('medumo'/.test(mdBlock) && /store\.get\('lediri'/.test(mdBlock),
   'both tabs keep their own local key, as rl_warmup / rl_forms / rl_builder do');
ok(/addXP\(\d+, 'medumo'\)/.test(mdBlock) && /addXP\(\d+, 'lediri'\)/.test(mdBlock),
   'both tabs pay XP under their own kind');

/* ---------- 7. what the twice-rule REJECTED stays plain (Build A, 2026-09-12) ---------- */
// Each of these is a form the guide DOES hat somewhere. They are pinned plain so that a
// later session re-running the grep cannot "finish the job" without re-reading the glosses.

// 7a. The nê-past marker. Guide prose writes "nê"; every guide example sentence writes "ne".
const neCards = ['u3l2-01','u3l2-02','u3l2-03','u3l2-04','u3l2-05','u3l2-06','u3l2-07','u3l2-08',
                 'u3l2-09','u3l2-10','u3l2-11','u3l2-12','u3l7-04','u3l7-05','u3l7-06','u3l7-07'];
neCards.forEach(id => {
  ok(byId[id], `${id} still exists`);
  if (byId[id]) ok(/(^| )ne( |$)/.test(byId[id].tsw) && !/nê/.test(byId[id].tsw),
    `${id} keeps the plain past marker "ne" — the guide's own examples do (${byId[id].tsw})`);
});

// 7b. Same spelling, different word. Not one of these is the lexeme the guide hatted.
eq(byId['u1l2-08'].tsw, 'Leina la gagwe ke Thabo',
   'u1l2-08 keeps plain gagwe — hatted twice in ONE p.27 table, plain on five other pages');
eq(byId['u2l7-07'].tsw, 'Matlho a gagwe a botlhoko', 'u2l7-07 keeps plain gagwe for the same reason');
eq(byId['u1l4-05'].tsw, 'lona',
   'u1l4-05 keeps plain lona = "you (a group)" — the guide\'s lôna is the class-4/7 possessive');
eq(byId['u1l1-16'].tsw, 'Re teng, a lona le teng?', 'u1l1-16 keeps plain lona for the same reason');
eq(byId['u1l4-06'].tsw, 'bone',
   'u1l4-06 keeps plain bone = "they/them" — hatted once (p.11); bônê on p.27 is "their"');
eq(byId['u1l4-03'].tsw, 'ene', 'u1l4-03 keeps plain ene — êne is hatted once (p.11) only');
eq(byId['u3l6-08'].tsw, 'gone jaanong',
   'u3l6-08 keeps plain gone = "right now" — the guide\'s gône is a possessive and a locative');
eq(byId['u5l5-03'].tsw, 'Ke bona nonyane',
   'u5l5-03 keeps plain bona = "to see" — the guide\'s bôna is the possessive "their"');
eq(byId['u1l3-02'].tsw, 'Ke tla go bona', 'u1l3-02 keeps plain bona (the verb) too');
eq(byId['u2l4-05'].tsw, 'Ga se ngaka',
   'u2l4-05 keeps plain se — the guide\'s three "sê" are Afrikaans for "to say"');

// 7c. Never infer a hat from a relative. The guide hats the bare numeral only.
['u4l4-02','u4l4-04'].forEach(id => ok(/babedi/.test(byId[id].tsw) && !/babêdi/.test(byId[id].tsw),
  `${id} keeps plain babedi — the guide never hats the prefixed numeral`));
ok(/di le dipedi/.test(byId['u4l4-03'].note) && !/dipêdi/.test(byId['u4l4-03'].note),
   'u4l4-03 note keeps plain dipedi — same reason');
['u4l3-04','u4l3-06','u4l3-07','u4l3-08','u4l3-09','u4l3-10','u4l3-11'].forEach(id =>
  ok(!/[êôÊÔ]/.test(byId[id].tsw),
     `${id} stays plain — the guide prints tharo/tlhano/thataro/supa/robedi/robongwe/lesome unhatted`));

/* ---------- 8. the quarantines hold ---------- */
// Open questions, not ours to guess. Pinned with the guide evidence that did NOT settle them.
eq(byId['u3l4-07'].tsw, 'beke',
   'u3l4-07 beke = "bag" stays plain — the guide\'s only "beke" (p.39) is plain AND means "week"');
eq(byId['u3l4-07'].eng, 'bag', 'u3l4-07 still glosses as "bag" (the reason the guide cannot rule on it)');
// The locative and the four plurals wait for Zerwick's emailed answer (s43 ruling). The guide
// leaves every one of them plain, so it does not advance the question either way.
['u3l7-01','u3l7-02','u3l7-03','u3l8-01','u3l8-06'].forEach(id =>
  ok(/sekolong/.test(byId[id].tsw) && !/sekôlông|sekolông|sekôlong/.test(byId[id].tsw),
     `${id} keeps the locative sekolong plain — question 1 to Zerwick`));
eq([byId['u1l5-09'].plural, byId['u2l1-02'].plural, byId['u2l1-06'].plural, byId['u5l1-01'].plural],
   ['dikolo', 'ditlhogo', 'ditsebe', 'diphologolo'],
   'the four plurals stay plain even though their singulars are hatted — his answer decides');
// Corpus transcriptions are never respelled: they are what a real speaker actually said.
eq((RL_CONTENT.nchlt || []).filter(c => /[êôÊÔ]/.test(c.tsw)).map(c => c.id), [],
   'no NCHLT corpus line carries a circumflex');

/* ---------- 9. the builder ripple landed (display text follows the cards) ---------- */
ok(/accept: \['Namune e le nngwê'\]/.test(builder), 'sb-u4-04 follows the respelled card (nngwê)');
ok(/accept: \['Dikgomo di le pêdi'\]/.test(builder), 'sb-u4-06 follows the respelled card (pêdi)');
ok(/accept: \['Dipodi di le pêdi'\]/.test(builder), 'sb-u5-07 follows the respelled card (pêdi)');
ok(/di le pêdi, no extra prefix/.test(builder), 'sb-u4-06 hint text respelled with its answer');
// Same proof as part 1, for the builder: a hatted answer must still be typeable without hats.
const BUILDER_PLAIN = ['Namune e le nngwe', 'Dikgomo di le pedi', 'Dipodi di le pedi'];
const BUILDER_NOW   = ['Namune e le nngwê', 'Dikgomo di le pêdi', 'Dipodi di le pêdi'];
BUILDER_NOW.forEach((now, i) => eq(norm(now), norm(BUILDER_PLAIN[i]),
  `builder: typing "${BUILDER_PLAIN[i]}" still matches "${now}"`));

console.log(fails.length
  ? `FAILED — ${fails.length} of ${pass + fails.length} assertions\n  x ` + fails.join('\n  x ')
  : `OK — ${pass} assertions green.`);
process.exit(fails.length ? 1 : 0);
