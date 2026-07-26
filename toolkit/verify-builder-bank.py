# Ship-time checker for builder-bank.js (SPEC-sentence-builder.md §8).
#
#   python toolkit/verify-builder-bank.py
#
# Cross-checks every RL_BUILDER entry against content.js and against itself:
#   - no duplicate entry ids
#   - eng is non-empty
#   - accept is a non-empty array, and no accept string is empty
#   - usesIds is non-empty, and every id in it exists in content.js
#   - no duplicate strings within one entry's own accept array
#   - builder-bank.js is LF-only (no \r) and has no UTF-8 BOM
#
# Exit code 0 only if every check passes; 1 otherwise. Prints one clear
# PASS/FAIL line per check, then a one-line summary.

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / 'content.js'
BANK = ROOT / 'builder-bank.js'

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass


def _block_at(src, brace_pos):
    """Slice the balanced {...} starting at brace_pos, ignoring braces inside strings.

    Same depth-count approach as missing-audio.py's _block_at — content.js items
    can nest (concordSlot is an object), so a naive [^{}]* regex would silently
    truncate any entry that has one.
    """
    depth, i, quote = 0, brace_pos, None
    while i < len(src):
        c = src[i]
        if quote:
            if c == '\\':
                i += 2
                continue
            if c == quote:
                quote = None
        elif c in '"\'':
            quote = c
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return src[brace_pos:i + 1]
        i += 1
    return src[brace_pos:]


def content_item_ids():
    """Every real content.js item id — same 'has a non-empty tsw' filter as the app's
    own `.filter(i => i.tsw)` (rule cards carry tsw: '' and don't count)."""
    src = CONTENT.read_text(encoding='utf-8')
    ids = set()
    for im in re.finditer(r"\{\s*id:\s*'(u\d+l\d+-\d+)'", src):
        blk = _block_at(src, im.start())
        tsw = re.search(r"tsw:\s*'((?:[^'\\]|\\.)*)'", blk)
        if tsw and tsw.group(1):
            ids.add(im.group(1))
    return ids


# `eng` values that contain an apostrophe (e.g. "I don't want coffee") are
# written as double-quoted JS strings in builder-bank.js — accept/usesIds are
# always single-quoted, but eng can legitimately be either, so this pattern
# matches whichever quote style was used rather than assuming single quotes.
ENG_RE = re.compile(r"""eng:\s*(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")""")


def parse_bank_entries():
    """List of dicts: {id, eng, accept:[...], usesIds:[...], raw_block}."""
    src = BANK.read_text(encoding='utf-8')
    entries = []
    for im in re.finditer(r"\{\s*\n?\s*id:\s*'([^']*)'", src):
        blk = _block_at(src, im.start())
        eid = im.group(1)
        eng_m = ENG_RE.search(blk)
        eng = (eng_m.group(1) or eng_m.group(2) or '') if eng_m else ''
        accept_m = re.search(r"accept:\s*\[([^\]]*)\]", blk, re.S)
        uses_m = re.search(r"usesIds:\s*\[([^\]]*)\]", blk, re.S)
        accept = re.findall(r"'((?:[^'\\]|\\.)*)'", accept_m.group(1)) if accept_m else []
        uses = re.findall(r"'((?:[^'\\]|\\.)*)'", uses_m.group(1)) if uses_m else []
        entries.append({
            'id': eid,
            'eng': eng,
            'accept': accept,
            'usesIds': uses,
        })
    return entries


def check(label, ok, detail=''):
    status = 'PASS' if ok else 'FAIL'
    line = f'[{status}] {label}'
    if detail:
        line += f' — {detail}'
    print(line)
    return ok


def main():
    all_ok = True

    entries = parse_bank_entries()
    content_ids = content_item_ids()

    # 1. No duplicate entry ids.
    seen = {}
    dupes = []
    for e in entries:
        seen[e['id']] = seen.get(e['id'], 0) + 1
    dupes = sorted(k for k, v in seen.items() if v > 1)
    all_ok &= check('no duplicate entry ids', not dupes,
                     f'duplicated: {dupes}' if dupes else f'{len(entries)} unique ids')

    # 2. Every entry has non-empty eng.
    bad_eng = [e['id'] for e in entries if not e['eng']]
    all_ok &= check('every entry has non-empty eng', not bad_eng,
                     f'empty eng: {bad_eng}' if bad_eng else 'all entries have eng')

    # 3. Every entry has a non-empty accept array, no empty strings within it.
    bad_accept_empty_arr = [e['id'] for e in entries if not e['accept']]
    all_ok &= check('every entry has a non-empty accept array', not bad_accept_empty_arr,
                     f'empty accept[]: {bad_accept_empty_arr}' if bad_accept_empty_arr
                     else 'all entries have >=1 accept string')

    bad_accept_blank_str = [e['id'] for e in entries if any(a == '' for a in e['accept'])]
    all_ok &= check('no empty strings inside any accept array', not bad_accept_blank_str,
                     f'contains blank string: {bad_accept_blank_str}' if bad_accept_blank_str
                     else 'no blank accept strings')

    # 4. Every entry has non-empty usesIds.
    bad_uses_empty = [e['id'] for e in entries if not e['usesIds']]
    all_ok &= check('every entry has non-empty usesIds', not bad_uses_empty,
                     f'empty usesIds[]: {bad_uses_empty}' if bad_uses_empty
                     else 'all entries have >=1 usesIds')

    # 5. Every usesIds id exists in content.js.
    missing = []
    for e in entries:
        for uid in e['usesIds']:
            if uid not in content_ids:
                missing.append((e['id'], uid))
    all_ok &= check('every usesIds id exists in content.js', not missing,
                     f'unresolved: {missing}' if missing
                     else f'all usesIds ids resolve ({len(content_ids)} content ids known)')

    # 6. No duplicate strings within one entry's own accept array.
    dup_accept = []
    for e in entries:
        if len(e['accept']) != len(set(e['accept'])):
            dup_accept.append(e['id'])
    all_ok &= check('no duplicate strings within one accept array', not dup_accept,
                     f'entries with dup accept strings: {dup_accept}' if dup_accept
                     else 'no within-entry accept duplicates')

    # 7. builder-bank.js is LF-only, no BOM (binary read).
    raw = BANK.read_bytes()
    cr_count = raw.count(b'\r')
    has_bom = raw.startswith(b'\xef\xbb\xbf')
    all_ok &= check('builder-bank.js is LF-only (no \\r)', cr_count == 0,
                     f'{cr_count} carriage returns found' if cr_count else '0 CR bytes')
    all_ok &= check('builder-bank.js has no UTF-8 BOM', not has_bom,
                     'BOM present at byte 0' if has_bom else 'no BOM')

    print(f'\nsummary: {len(entries)} entries checked, '
          f'{"all checks passed" if all_ok else "one or more checks FAILED"}')

    return 0 if all_ok else 1


if __name__ == '__main__':
    sys.exit(main())
