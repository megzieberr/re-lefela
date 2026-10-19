#!/usr/bin/env python3
"""Pull the plain text out of one .docx, standard library only (zipfile + xml).

Used once per handout to drop his documents into the gitignored corpus/ folder, where
the bank gates can grep them. The .docx itself is never copied into the repo, and the
txt it writes stays local too: corpus/ is gitignored because this repo is PUBLIC.

Run:  python -I toolkit/docx-to-txt.py <in.docx> <out.txt>

One line per Word paragraph; table cells come out one paragraph per line as well, in
reading order. Tabs and line breaks inside a paragraph become a space and a newline.
Writes UTF-8, LF line endings, no BOM.
"""
import sys
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'


def paragraphs(xml_bytes):
    root = ET.fromstring(xml_bytes)
    for p in root.iter(W + 'p'):
        bits = []
        for el in p.iter():
            if el.tag == W + 't' and el.text:
                bits.append(el.text)
            elif el.tag == W + 'tab':
                bits.append(' ')
            elif el.tag in (W + 'br', W + 'cr'):
                bits.append('\n')
        yield ''.join(bits)


def main():
    if len(sys.argv) != 3:
        print(__doc__)
        sys.exit(2)
    src, out = Path(sys.argv[1]), Path(sys.argv[2])
    with zipfile.ZipFile(src) as z:
        names = ['word/document.xml'] + sorted(
            n for n in z.namelist()
            if n.startswith('word/') and (n.startswith('word/footnotes') or n.startswith('word/endnotes'))
            and n.endswith('.xml'))
        lines = []
        for n in names:
            if n in z.namelist():
                lines.extend(paragraphs(z.read(n)))
    text = '\n'.join(l.rstrip() for l in lines).strip() + '\n'
    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, 'w', encoding='utf-8', newline='\n') as f:
        f.write(text)
    print(f'wrote {out} ({len(text)} chars, {text.count(chr(10))} lines)')


if __name__ == '__main__':
    main()
