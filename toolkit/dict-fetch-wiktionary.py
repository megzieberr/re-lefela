# Download every English-Wiktionary Tswana lemma into dictionaries/ (gitignored).
#
#   python toolkit/dict-fetch-wiktionary.py
#
# Output: dictionaries/wiktionary-tswana-raw.jsonl  {word, wikitext} per line,
# wikitext trimmed to the ==Tswana== language section.
#
# Wiktionary text is CC BY-SA 4.0 — the panel carries the attribution line the
# licence requires (see index.html, dictionary panel footer).
#
# NOTE: Wiktionary files this language under "Tswana", not "Setswana", and
# kaikki.org has no pre-parsed Tswana export — hence going to the API directly.
# 350 lemmas as of 2026-08-04.

import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / 'dictionaries' / 'wiktionary-tswana-raw.jsonl'
API = 'https://en.wiktionary.org/w/api.php'
# Contact per Wikimedia User-Agent policy — the public GitHub profile, not an
# email address, because this repo is public and scrapers harvest addresses.
HDRS = {'User-Agent': 'ReLefela-dictionary-build/1.0 (https://github.com/megzieberr)'}
LANG_SECTION = re.compile(r'(?s)==Tswana==\n(.*?)(?:\n==[^=]|\Z)')


def api(params):
    url = API + '?' + urllib.parse.urlencode(dict(params, format='json'))
    req = urllib.request.Request(url, headers=HDRS)
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def main():
    titles, cont = [], {}
    while True:
        res = api({'action': 'query', 'list': 'categorymembers',
                   'cmtitle': 'Category:Tswana lemmas', 'cmtype': 'page',
                   'cmlimit': '500', **cont})
        titles += [m['title'] for m in res['query']['categorymembers']]
        if 'continue' not in res:
            break
        cont = res['continue']
    print('lemma pages:', len(titles))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    written = 0
    with open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        for i in range(0, len(titles), 50):
            res = api({'action': 'query', 'prop': 'revisions', 'rvprop': 'content',
                       'rvslots': 'main', 'titles': '|'.join(titles[i:i + 50])})
            for page in res['query']['pages'].values():
                if 'revisions' not in page:
                    continue
                m = LANG_SECTION.search(page['revisions'][0]['slots']['main']['*'])
                if not m:
                    continue
                f.write(json.dumps({'word': page['title'], 'wikitext': m.group(1)},
                                   ensure_ascii=False) + '\n')
                written += 1
            time.sleep(0.5)      # be polite to the API
    print('written:', written, '->', OUT)


if __name__ == '__main__':
    main()
