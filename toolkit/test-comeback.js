// Slice the REAL srsGrade (and the REAL COMEBACK_DAYS / MAX_INTERVAL_DAYS constants)
// out of index.html and run them. Same approach as toolkit/test-forms.js and
// toolkit/test-dictsearch.js — reimplementing the scheduler here would only prove that
// my copy of it works.
//
// What this pins (added 2026-08-31, sw v48):
//   The ordinary miss penalty STILL EXISTS — 0.25 off ease, floor 1.3. That is the
//   right price for forgetting a word you saw yesterday, and nothing here softens it.
//   What it does NOT do is charge that price for TIME AWAY. Past COMEBACK_DAYS overdue
//   a miss resets the card (reps 0, interval 0, due now) without touching ease, so a
//   single cold session after a long gap cannot drag a whole collection to the floor.
const fs = require('fs');
const path = require('path');
const ROOT = process.argv[2] || path.join(__dirname, '..');

const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

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
function constant(name) {
  const m = new RegExp('const ' + name + ' = (\\d+)').exec(html);
  if (!m) throw new Error('could not read ' + name + ' from index.html');
  return Number(m[1]);
}

const COMEBACK_DAYS = constant('COMEBACK_DAYS');
const MAX_INTERVAL_DAYS = constant('MAX_INTERVAL_DAYS');

// the globals srsGrade touches, stubbed to nothing so grading is observable in `state`
const src = [
  'const MAX_INTERVAL_DAYS = ' + MAX_INTERVAL_DAYS + ';',
  'const COMEBACK_DAYS = ' + COMEBACK_DAYS + ';',
  'const state = {srs:{}};',
  'function persist(){}',
  'function enqueue(){}',
  slice('srsGrade'),
  'return {srsGrade, state};',
].join('\n');
const { srsGrade, state } = new Function(src)();

let fails = 0, checks = 0;
const ok = (cond, label) => {
  checks++;
  if (!cond) { fails++; console.log('  FAIL  ' + label); }
};
const DAY = 86400000;
// seed one card as if it were graded `overdue` days ago and never seen since
function seed(id, overdueDays, ease) {
  state.srs[id] = {
    ease: ease === undefined ? 2.5 : ease,
    interval: 10, reps: 4, lapses: 0,
    due: Date.now() - overdueDays * DAY,
  };
  return state.srs[id];
}

console.log('COMEBACK_DAYS = ' + COMEBACK_DAYS + ', MAX_INTERVAL_DAYS = ' + MAX_INTERVAL_DAYS + '\n');

// --- the ordinary penalty must survive untouched ---------------------------
let c = seed('recent', 1);
srsGrade('recent', false);
ok(Math.abs(c.ease - 2.25) < 1e-9, 'a card only 1 day overdue still pays the full 0.25 ease penalty');
ok(c.reps === 0, 'a miss resets reps');
ok(c.interval === 0, 'a miss resets interval');
ok(c.lapses === 1, 'a miss counts a lapse');

// five misses in a row floor an ordinary card — the arithmetic that made her
// comeback so expensive in the first place (0.25 down per miss, 0.05 up per hit)
c = seed('floored', 1);
for (let i = 0; i < 5; i++) { c.due = Date.now() - DAY; srsGrade('floored', false); }
ok(Math.abs(c.ease - 1.3) < 1e-9, 'five ordinary misses put a card on the 1.3 floor');

// and one hit only returns 0.05, so a miss really does undo five right answers
c = seed('recovery', 1, 2.0);
c.due = Date.now() - DAY;
srsGrade('recovery', true);
ok(Math.abs(c.ease - 2.05) < 1e-9, 'a correct answer returns only 0.05 ease');

// --- the guard --------------------------------------------------------------
c = seed('away', COMEBACK_DAYS + 16);          // her real gap was 18 days
srsGrade('away', false);
ok(Math.abs(c.ease - 2.5) < 1e-9, 'a long-overdue miss does NOT touch ease (the comeback guard)');
ok(c.reps === 0, 'a guarded miss still resets reps — the card comes straight back');
ok(c.interval === 0, 'a guarded miss still resets interval');
ok(Math.abs(c.due - Date.now()) < 5000, 'a guarded miss leaves the card due now, not scheduled away');
ok(c.lapses === 1, 'a guarded miss is still recorded as a lapse');

// a whole collection coming back after a long gap must not degrade at all
for (let i = 0; i < 40; i++) seed('bulk' + i, 18);
for (let i = 0; i < 40; i++) srsGrade('bulk' + i, false);
const degraded = Array.from({ length: 40 }, (_, i) => state.srs['bulk' + i]).filter(s => s.ease < 2.5);
ok(degraded.length === 0, '40 cards missed after an 18-day gap: none lose ease (got ' + degraded.length + ')');

// --- the boundary is exact --------------------------------------------------
c = seed('edge-in', COMEBACK_DAYS - 1);
srsGrade('edge-in', false);
ok(Math.abs(c.ease - 2.25) < 1e-9, 'one day inside the window still pays the penalty');

c = seed('edge-out', COMEBACK_DAYS + 0.5);
srsGrade('edge-out', false);
ok(Math.abs(c.ease - 2.5) < 1e-9, 'just past the window is guarded');

// --- a brand-new card must not be protected by accident ---------------------
// no state.srs entry at all -> the default is due:now -> 0 days overdue -> penalised
delete state.srs['brand-new'];
srsGrade('brand-new', false);
ok(Math.abs(state.srs['brand-new'].ease - 2.25) < 1e-9,
  'a card with no history is NOT guarded — it defaults to due-now, so it pays the penalty');

// --- correct answers are untouched by any of this ---------------------------
c = seed('right', 30);
srsGrade('right', true);
ok(c.reps === 5, 'a correct answer on a long-overdue card still advances reps');
ok(Math.abs(c.ease - 2.55) < 1e-9, 'a correct answer on a long-overdue card still gains ease');
ok(c.interval <= MAX_INTERVAL_DAYS, 'interval stays capped at MAX_INTERVAL_DAYS');

// --- ☕ Warm-up writes NOTHING to the SRS -------------------------------------
// Same region check test-forms.js runs over Ditlhopha (spec §2.4), for the same
// reason: this round exists so that being rusty is free. Comments are stripped
// first, so the block's own "NO srsGrade call here" note cannot pass or fail it.
function stripComments(s) {
  let out = '', q = null;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i], prev = s[i - 1];
    if (q) { out += ch; if (ch === q && prev !== '\\') q = null; continue; }
    if (ch === '"' || ch === "'" || ch === '`') { q = ch; out += ch; continue; }
    if (ch === '/' && s[i + 1] === '/') { const n = s.indexOf('\n', i); if (n < 0) break; i = n - 1; continue; }
    if (ch === '/' && s[i + 1] === '*') { const n = s.indexOf('*/', i); if (n < 0) break; i = n + 1; continue; }
    out += ch;
  }
  return out;
}
const wuFrom = html.indexOf('☕ Warm-up — the way back in after time away');
const wuTo = html.indexOf('rivalry nudge + weekly champion');
ok(wuFrom > -1 && wuTo > wuFrom, 'the Warm-up block is findable and sits before the rivalry section');
const wuBlock = stripComments(html.slice(wuFrom, wuTo));
ok(!/srsGrade\s*\(/.test(wuBlock), 'Warm-up never calls srsGrade — a rusty answer must not move a review date');
ok(!/state\.srs\s*\[/.test(wuBlock), 'Warm-up never writes state.srs directly');
ok(/addXP\s*\(\s*2\s*,\s*'warmup'\s*\)/.test(wuBlock), "Warm-up awards XP as kind 'warmup', so a comeback still feeds the streak");
ok(/warmupStoreSet\s*\(/.test(wuBlock), 'Warm-up keeps its own progress in rl_warmup, like rl_forms and rl_builder');
// and it must NOT sit inside the window test-forms.js audits for Ditlhopha,
// whose assertions say "no audio, no srsGrade" — Recap deliberately plays audio.
const fmFrom = html.indexOf('Ditlhopha — plurals & noun classes');
const fmTo = html.indexOf('📖 Dictionary (SPEC-dictionary');
ok(fmFrom > -1 && fmTo > fmFrom, "Ditlhopha's own audit window is still intact");
ok(!(wuFrom > fmFrom && wuFrom < fmTo), 'Recap sits OUTSIDE Ditlhopha\'s audit window (it plays audio; Ditlhopha may not)');

// --- the day count the welcome-back note shows must be exact ----------------
// It reads "it has been N days" in a sentence meant to reassure her, so N being
// one out is not cosmetic. A first version measured Date.now() minus midnight,
// which counted the hours already elapsed today as a whole extra day: practising
// this morning reported 1, and an 18-day gap reported 19.
const dsp = (() => {
  const src2 = [
    'const state = {streak:{last:null}};',
    slice('daysSincePractice'),
    'return {daysSincePractice, state};',
  ].join('\n');
  const { daysSincePractice, state: st } = new Function(src2)();
  return n => {
    const d = new Date(Date.now() - n * DAY);
    st.streak.last = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') +
      '-' + String(d.getDate()).padStart(2, '0');
    return daysSincePractice();
  };
})();
[0, 1, 7, 18, 30].forEach(n => ok(dsp(n) === n, 'daysSincePractice: ' + n + ' days ago reads as ' + n + ' (got ' + dsp(n) + ')'));

// --- no two functions may share a name -------------------------------------
// This is the assertion that would have caught the bug this file is named after.
// index.html is one 3000-line script, so `function foo(){}` twice is legal JS: the
// later declaration silently wins for the WHOLE file. A first draft of the warm-up
// round defined runRecap() without noticing the app already had one at the bottom,
// and every gate here still passed — the app only broke when a human pressed the
// button. `upd` is a known pre-existing pair of local helpers in separate scopes.
const ALLOW_DUP = ['upd'];
const declared = {};
const re = /^\s*function\s+([A-Za-z_$][\w$]*)\s*\(/gm;
let m;
while ((m = re.exec(html))) declared[m[1]] = (declared[m[1]] || 0) + 1;
const dups = Object.keys(declared).filter(k => declared[k] > 1 && !ALLOW_DUP.includes(k));
ok(dups.length === 0, 'no function name is declared twice in index.html (found: ' + (dups.join(', ') || 'none') + ')');

console.log('\n' + (checks - fails) + '/' + checks + ' assertions passed');
if (fails) { console.log('FAILED'); process.exit(1); }
console.log('OK');
