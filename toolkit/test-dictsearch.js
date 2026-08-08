// Slice the REAL norm/dictBuildIndex/dictSearch out of index.html and run them
// against the REAL dict-bank.js. Same approach as toolkit/test-forms.js — a
// reimplementation here would only prove that my copy of the algorithm works.
const fs = require('fs');
const path = require('path');
const ROOT = process.argv[2] || require('path').join(__dirname, '..');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const bank = fs.readFileSync(path.join(ROOT, 'dict-bank.js'), 'utf8');

function slice(name) {
  const at = html.indexOf('function ' + name + '(');
  if (at < 0) throw new Error('not found: ' + name);
  let i = html.indexOf('{', at), depth = 0, inS = null, esc = false;
  for (let j = i; j < html.length; j++) {
    const c = html[j];
    if (esc) { esc = false; continue; }
    if (inS) {
      if (c === '\\') esc = true;
      else if (c === inS) inS = null;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inS = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (!depth) return html.slice(at, j + 1); }
  }
  throw new Error('unbalanced: ' + name);
}

const src = [
  bank,
  'const DICT = RL_DICT;',
  'let dictIndex = null;',
  slice('norm'), slice('dictBuildIndex'), slice('dictSearch'),
  'return {dictSearch, DICT};',
].join('\n');
const { dictSearch, DICT } = new Function(src)();

let fails = 0, checks = 0;
const ok = (cond, label) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label); }
};

console.log('bank: ' + DICT.length + ' entries\n');

const names = q => dictSearch(q).map(e => e.t);

// --- her two reports -------------------------------------------------------
const fat = names('fat');
console.log('fat  -> ' + fat.length + ': ' + fat.join(', '));
ok(!fat.includes('rra'), '"fat" must not offer rra (father) — her report 2026-08-06');
ok(!fat.includes('rre'), '"fat" must not offer rre (father) either');
ok(fat.length <= 15, '"fat" returns a readable list, not ~30+ (got ' + fat.length + ')');
ok(fat.includes('mafura'), '"fat" still finds mafura');
ok(fat.includes('bokima'), '"fat" still finds bokima');
// Every survivor must be a real hit: the headword either starts with the query,
// or one of its English meanings has it as a whole word. A word that merely
// CONTAINS the letters somewhere in the middle (154 of the old 191) is gone.
// fata/fatshe DO survive and should — that is the same headword-prefix tier that
// makes "batl" -> batla work, and it is what a half-typed Setswana word needs.
for (const e of dictSearch('fat')) {
  const startsWith = [e.t].concat(e.f || []).some(f => f.toLowerCase().normalize('NFD')
    .replace(/[̀-ͯ]/g, '').startsWith('fat'));
  const meansIt = (e.e || []).some(m => m.toLowerCase().split(/[\s\/,-]+/).includes('fat'));
  ok(startsWith || meansIt, '"fat" hit ' + e.t + ' is a real match, not substring noise');
}

// --- the loose tiers must still work when nothing solid matches ------------
const batl = names('batl');
console.log('batl -> ' + batl.length + ': ' + batl.join(', '));
ok(batl[0] === 'batla', 'half-typed Setswana still lands on batla first');
ok(batl.length <= 10, '"batl" is a short list now (got ' + batl.length + ')');

// --- nothing useful lost ---------------------------------------------------
const cases = [
  ['water', 'metsi'], ['money', 'madi'], ['head', 'tlhogo'], ['sore', 'botlhoko'],
  ['dog', 'ntša'], ['nna', 'nna'], ['beke', 'beke'], ['leg', 'leoto'],
  ['pretty', 'ntlê'], ['beautiful', 'ntlê'],
];
console.log('');
for (const [q, want] of cases) {
  const r = names(q);
  console.log(String(q).padEnd(11) + '-> ' + String(r.length).padStart(3) + ': ' + r.slice(0, 6).join(', '));
  ok(r.includes(want), '"' + q + '" still finds ' + want);
}

// --- the new word ----------------------------------------------------------
const pretty = dictSearch('pretty');
ok(pretty.length > 0, '"pretty" is no longer a dead lookup — her dict-miss row 2026-08-05');
const ntle = pretty.find(e => e.t === 'ntlê' && e.p === 'adj');
ok(!!ntle, '"pretty" finds the ADJECTIVE ntlê, not the noun');
ok(ntle && ntle.e[0] === 'pretty', 'pretty is the first meaning shown');
ok(ntle && ntle.kc === 2, 'pretty + beautiful are the CHECKED meanings (kc=2), wordnet\'s ride below');
ok(ntle && ntle.k === 1, 'the entry is marked human-checked');
ok(ntle && (ntle.s || []).includes('desk'), 'sourced to the desk dictionary (Matumo p.611)');

// --- an exact hit must still outrank a checked partial one -----------------
ok(names('nna')[0] === 'nna', 'exact headword still wins (the tie-break rule is intact)');

console.log('\n' + (fails ? 'FAILED — ' + fails + ' of ' + checks : 'OK — ' + checks + ' assertions green'));
process.exit(fails ? 1 : 0);
