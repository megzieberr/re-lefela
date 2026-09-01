/* Node harness for the 🗂️ Ditlhopha round (SPEC-plurals-and-classes.md §4).
 *
 * The house pattern: slice the REAL functions out of index.html and run them
 * against the REAL content.js. A harness with its own copy of the logic tests the
 * copy, and a fixture looser than the real thing is a decoy — both traps this
 * repo has paid for.
 *
 * Run:  node toolkit/test-forms.js
 * Exit 0 = green.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

let pass = 0;
const fails = [];
function ok(cond, msg){ if (cond) pass++; else fails.push(msg); }
function eq(got, want, msg){ ok(JSON.stringify(got) === JSON.stringify(want), `${msg} — got ${JSON.stringify(got)}, wanted ${JSON.stringify(want)}`); }

/* ---------- slicing ----------
 * A quote-aware scanner, not a regex: a `[^{}]*` pattern over this file silently
 * dropped 57 items once already. Template literals are refused outright rather
 * than mis-sliced — if a function below ever grows one, this fails loudly.
 */
function sliceBalanced(from, open, close){
  let depth = 0, i = from, q = null;
  for (; i < SRC.length; i++){
    const ch = SRC[i], prev = SRC[i-1];
    if (q){
      if (ch === q && prev !== '\\') q = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === '`'){ q = ch; continue; }
    if (ch === '/' && SRC[i+1] === '/'){ i = SRC.indexOf('\n', i); if (i < 0) break; continue; }
    if (ch === '/' && SRC[i+1] === '*'){ i = SRC.indexOf('*/', i) + 1; continue; }
    if (ch === open) depth++;
    else if (ch === close){ depth--; if (depth === 0) return i + 1; }
  }
  throw new Error('unbalanced from index ' + from);
}
function sliceFn(name){
  const at = SRC.indexOf('\nfunction ' + name + '(');
  if (at < 0) throw new Error('function ' + name + ' not found in index.html');
  const brace = SRC.indexOf('{', SRC.indexOf('(', at));
  const code = SRC.slice(at + 1, sliceBalanced(brace, '{', '}'));
  if (code.includes('`')) throw new Error(name + ' now contains a template literal — this harness slices logic only, check the slice');
  return code;
}
function sliceConst(name){
  // whitespace-tolerant: the real file aligns some of these with extra spaces
  const m = new RegExp('\\nconst ' + name + '\\s*=').exec(SRC);
  if (!m) throw new Error('const ' + name + ' not found in index.html');
  const at = m.index, eqAt = at + m[0].length - 1;
  const eol = SRC.indexOf('\n', eqAt);
  const rest = SRC.slice(eqAt + 1, eol);
  if (!/[[{]/.test(rest)) return SRC.slice(at + 1, eol);   // one-liner scalar
  const openAt = eqAt + 1 + rest.search(/[[{]/);
  const open = SRC[openAt];
  return SRC.slice(at + 1, sliceBalanced(openAt, open, open === '[' ? ']' : '}')) + ';';
}

/* ---------- the app's real code, in a sandbox ---------- */
// on globalThis, and evaluated by INDIRECT eval below, so the app's own `const`
// declarations land in the global scope where these assertions can see them
globalThis.RL_CONTENT = eval(fs.readFileSync(path.join(ROOT, 'content.js'), 'utf8') + '; RL_CONTENT');
globalThis.state = {srs: {}};               // filled per test
const app = [
  sliceConst('FORMS_ROUNDS'), sliceConst('FORMS_KNOWN'),
  sliceConst('FORMS_FAMILIES'), sliceConst('FORMS_BY_CLS'), sliceConst('FORMS_PREFIXES'),
  sliceFn('formsFamily'), sliceFn('formsPlPrefix'), sliceFn('formsIrregular'),
  sliceFn('formsPlStem'), sliceFn('formsSgStem'), sliceFn('formsDeaccent'), sliceFn('formsStemShift'),
  sliceFn('formsCards'), sliceFn('formsUnlocked'),
  sliceFn('formsBuildRound'), sliceFn('formsFamilyDistractors'),
  // dependencies the round leans on, also taken from the real file
  sliceFn('shuffle'), sliceFn('allItems'), sliceFn('chatLearned')
].join('\n');
// `const` inside an eval stays trapped in the eval's own scope, so the sliced
// tables are re-bound onto globalThis — the VALUES are still the real file's.
(0, eval)(app.replace(/^const (FORMS_\w+)(\s*)=/gm, 'globalThis.$1$2='));

/* ---------- 1. the whole inline script still parses ----------
 * Cheap, and it catches the class of bug that killed a whole script before now:
 * a global named `top`/`name`/`length` is a silent SyntaxError.
 */
{
  const open = SRC.indexOf('<script>', SRC.indexOf('dict-bank.js'));
  const body = SRC.slice(open + 8, SRC.indexOf('</script>', open));
  let parsed = true, why = '';
  try { new Function(body); } catch (e){ parsed = false; why = e.message; }
  ok(parsed, 'the whole inline <script> parses — ' + why);
  ok(body.length > 50000, 'sliced the main inline script, not a small one');
}

/* ---------- 2. the pool ---------- */
const pool = formsCards();
eq(pool.length, 54, 'formsCards finds every card that carries a plural');
ok(pool.every(it => it.plural && it.cls), 'every pooled card has both a plural and a class');
ok(pool.every(it => formsFamily(it)), 'every pooled card resolves to one of the six families');
ok(pool.every(it => formsPlPrefix(it)), 'every pooled plural starts with a real plural prefix');
ok(pool.every(it => it.kind !== 'rule'), 'no rule cards in the pool');

const byCls = {};
pool.forEach(it => { byCls[it.cls] = (byCls[it.cls] || 0) + 1; });
eq(byCls, {1:6, 3:5, 5:7, 7:4, 9:30, 11:2}, 'the class split is what the spec measured');
ok(byCls[9] / pool.length > 0.5, 'class 9 really is over half the pool — the reason the round picks a pattern first');

/* ---------- 3. prefixes, irregulars and stem shifts ---------- */
const find = t => pool.find(it => it.tsw === t);
eq(formsPlPrefix(find('setilo')), 'di-', 'setilo takes di-');
eq(formsPlPrefix(find('motho')), 'ba-', 'motho takes ba-');
eq(formsPlPrefix(find('molomo')), 'me-', 'molomo takes me-');
eq(formsPlPrefix(find('leina')), 'ma-', 'leina takes ma-');
// the one card that disagrees with its own family — graded off the DATA, never the table
eq(formsPlPrefix(find('leino')), 'me-', 'leino -> meno takes me-, not its family ma-');
const irregular = pool.filter(formsIrregular).map(it => it.tsw);
eq(irregular, ['leino'], 'exactly one card breaks its family pattern');
const shifted = pool.filter(formsStemShift).map(it => it.tsw).sort();
eq(shifted, ['leino','leitlho','letsogo','loleme','mmele'], 'exactly five cards change more than the prefix');
// the four Zerwick-spelled cards are ordinary prefix swaps and must NOT read as stem shifts:
// the hat is a vowel mark, not a moving stem (sekôlô → dikolo, tlhôgô → ditlhogo, …)
['sekôlô','tlhôgô','tsêbê','phôlôgôlô'].forEach(t =>
  ok(!formsStemShift(find(t)), `${t} → its plural is a prefix swap, not a stem shift`));
ok(formsStemShift(find('leino')), 'a real stem shift is still caught with accents stripped');
ok(pool.every(it => it.plural !== it.tsw), 'no card has a plural identical to its singular');
ok(pool.every(it => FORMS_PREFIXES.includes(formsPlPrefix(it))), "step 2's answer is always one of the four buttons shown");
// the miss-2 hint shows the stem — it must never accidentally be the whole answer
ok(pool.every(it => !formsPlStem(it).startsWith(formsPlPrefix(it).slice(0,2))), 'the step-2 hint never leaks the prefix it is asking for');

/* ---------- 4. unlocking ---------- */
state.srs = {};
eq(formsUnlocked().length, 0, 'nothing is unlocked before any word has been met');
state.srs = {[find('setilo').id]: {reps: 0}};
eq(formsUnlocked().length, 0, 'a card seen but never answered (reps 0) stays locked');
state.srs = {[find('setilo').id]: {reps: 1}};
eq(formsUnlocked().map(i => i.tsw), ['setilo'], 'reps>=1 unlocks exactly that card — the Sentence Builder gate');

/* ---------- 5. step 1's wrong answers ---------- */
for (const it of pool){
  const fam = formsFamily(it);
  const d = formsFamilyDistractors(fam, 3);
  ok(d.length === 3, `${it.tsw}: three wrong families offered`);
  ok(!d.some(f => f.id === fam.id), `${it.tsw}: the correct family is never also a wrong answer`);
  ok(new Set(d.map(f => f.id)).size === 3, `${it.tsw}: no duplicate options`);
}
// a mo- word must compete against the OTHER mo- family — the real mistake, not a random one
for (const t of ['motho', 'molomo']){
  const fam = formsFamily(find(t));
  const sib = formsFamilyDistractors(fam, 3)[0];
  ok(sib.sg === 'mo-', `${t}: the first wrong option is the other mo- family (got ${sib.sg}/${sib.pl})`);
}

/* ---------- 6. the pattern-first round — the point of the whole design ---------- */
state.srs = {};
pool.forEach(it => { state.srs[it.id] = {reps: 3}; });      // everything unlocked
const st0 = {done: {}, streak: 0, missed: {}};
for (let run = 0; run < 40; run++){
  const round = formsBuildRound(formsUnlocked(), st0, FORMS_ROUNDS);
  eq(round.length, 12, 'a full round is FORMS_ROUNDS cards');
  ok(new Set(round.map(i => i.id)).size === round.length, 'no card appears twice in one round');
  const fams = {};
  round.forEach(it => { const f = formsFamily(it).id; fams[f] = (fams[f] || 0) + 1; });
  eq(Object.keys(fams).sort(), ['f1','f11','f3','f5','f7','f9'], 'every family appears in the round');
  ok(Object.values(fams).every(n => n === 2), 'each family gets exactly two slots — not 6 of 12 being class 9');
  const cls9 = round.filter(it => it.cls === 9).length;
  ok(cls9 === 2, `class 9 is 2 of 12, not ${Math.round(pool.length ? byCls[9] / pool.length * 12 : 0)} — random picking would give ~7`);
}

/* ---------- 7. inside a family, the unpractised come first ---------- */
{
  const cls1 = pool.filter(it => it.cls === 1);
  const st = {done: {}, streak: 0, missed: {}};
  cls1.forEach((it, i) => { st.done[it.id] = i === 0 ? 0 : 9; });   // one fresh, five well-drilled
  let fresh = 0;
  for (let run = 0; run < 30; run++){
    const round = formsBuildRound(cls1, st, 12);
    if (round[0].id === cls1[0].id) fresh++;
  }
  eq(fresh, 30, 'the card she has never got right is always drawn first inside its family');
}

/* ---------- 8. small and lopsided pools do not break it ---------- */
{
  const onlyNine = pool.filter(it => it.cls === 9);
  const r = formsBuildRound(onlyNine, st0, FORMS_ROUNDS);
  eq(r.length, 12, 'a pool of one family still fills a full round');
  ok(new Set(r.map(i => i.id)).size === 12, 'and still without repeats');

  const three = pool.slice(0, 3);
  const r3 = formsBuildRound(three, st0, FORMS_ROUNDS);
  eq(r3.length, 3, 'a pool smaller than a round gives a short round, not a crash or a repeat');

  eq(formsBuildRound([], st0, FORMS_ROUNDS).length, 0, 'an empty pool gives an empty round');
  eq(formsBuildRound([find('setilo')], st0, FORMS_ROUNDS).map(i => i.tsw), ['setilo'], 'a single-card pool works');
}

/* ---------- 9. the no-SRS-writes claim, checked in the source ---------- */
{
  const block = SRC.slice(SRC.indexOf('Ditlhopha — plurals & noun classes'),
                          SRC.indexOf('📖 Dictionary (SPEC-dictionary'));
  ok(block.length > 3000, 'found the Ditlhopha block');
  ok(!/srsGrade|state\.srs\s*\[/.test(block), 'the round never calls srsGrade or writes state.srs (spec §2.4)');
  ok(!/playAudio|playBtnsHTML/.test(block), 'the round never plays audio (spec §2.7)');
  ok(/addXP\(2, 'forms'\)/.test(block), "XP is +2 with kind 'forms'");
  ok(/store\.get\('forms'/.test(block) && /store\.set\('forms'/.test(block), 'progress lives in its own rl_forms key');
  ok(/'rl_forms'/.test(SRC), 'rl_forms is cleared on a learner switch');
  // her §5 answer 3: step 2 goes once a card is known, step 1 stays
  ok(/known:\(formsStoreGet\(\)\.done\[it\.id\] \|\| 0\) >= FORMS_KNOWN/.test(SRC), 'known-ness is measured against FORMS_KNOWN');
  ok(/if \(c\.known\) return formsWin\(\)/.test(block), 'a known card skips step 2, not step 1 (her §5 answer 3)');
  eq(FORMS_KNOWN, 3, 'three correct answers marks a card known');
  // the class number rides along on every screen (her §5 answer 2)
  const screens = (block.match(/class \$\{esc\(\w+\.cls\)\}/g) || []).length;
  ok(screens >= 3, `the class number is shown on every screen (found ${screens} places)`);
}

/* ---------- report ---------- */
if (fails.length){
  console.log(`FAILED — ${fails.length} of ${pass + fails.length} assertions`);
  fails.forEach(f => console.log('  x ' + f));
  process.exit(1);
}
console.log(`OK — ${pass} assertions green.`);
