#!/usr/bin/env python
"""Cut the 📼 Tiro 1 clips into audio/items/ from the Assignment-1 voice notes.

  python toolkit/ass1-export.py [--src corpus/audio/ass1] [--clips "Assignnment 1 Audio/clips"]

Reads toolkit/ass1-mapping.json (FINAL, ear-checked 2026-09-11) and writes ONE file per
card: audio/items/<card id>.mp3. It touches nothing else — not content.js, not any
existing clip, not any file outside audio/items/a1*.mp3.

WHAT IT SKIPS, AND WHY
  * `bad: true`  — the take is unusable and the card ships SILENT rather than wrong.
    a1w-17 (yô) is clipped at source (mic overload measured through the vowel; a declip
    rescue was rejected by her ear) and a1s-nat does not exist at all (the tape holds
    ONE reading, slow — her ruling 2026-09-11). Neither gets a file.
  * `skip: true` — the app already voices this line, so no new cut is made. Cards
    a1i-02/03/06 point at live app clips through `app_audio`; a1i-04/05 point at the
    two NAME-FREE cuts in the slicing workbench, which are COPIED in under their own
    card ids (new filenames, so no AUDIO_CACHE bump — see below).

THE CUT RECIPE IS NOT NEGOTIABLE (measured 2026-09-11)
  WhatsApp voice notes decode up to +3.4 dB OVER full scale on loud consonants, so an
  unguarded MP3 hard-clips into a buzz on playback. Every cut therefore decodes to
  float, drops 5 dB, soft-limits at 0.95 and fades 5 ms at each end. Voice note 4 also
  carries a mic bump at 5.66–5.75 s that sits between two words; it is ducked in any
  clip spanning it. These are gen_map.py's exact arguments — the clips Megan approved
  BY EAR came out of them, so the cross-check below expects byte-identical output.

  `-q:a 2` rather than a fixed 64k: again, gen_map.py's setting. On this narrowband
  source VBR q2 lands around 70 kbps, so the files are the size a 64k CBR export would
  be anyway, and keeping the flag identical is what makes the ear-checked clips and
  these shipped clips the same bytes.

AUDIO CACHE
  Every file written here is a NEW filename (a1*.mp3), so sw.js's AUDIO_CACHE stays
  where it is. The md5 audit below is the proof: it lists every file in audio/items/
  before and after and FAILS if any pre-existing file's bytes moved.
"""
import argparse, hashlib, json, shutil, subprocess, sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent
ITEMS = ROOT / 'audio' / 'items'
MAP = ROOT / 'toolkit' / 'ass1-mapping.json'


def md5(p):
    return hashlib.md5(p.read_bytes()).hexdigest()


def snapshot():
    return {p.name: md5(p) for p in sorted(ITEMS.glob('*.mp3'))}


def cut(src_ogg, vk, a, b, dst):
    """gen_map.py's guarded window cut, argument for argument."""
    af = ("aformat=sample_fmts=flt,"
          "volume=enable='between(t,5.62,5.80)':volume=0.05," if vk == 'vn4' else "aformat=sample_fmts=flt,")
    af += ("volume=-5dB,alimiter=limit=0.95:level=false,"
           "afade=t=in:d=0.005,areverse,afade=t=in:d=0.005,areverse")
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(src_ogg),
                    '-ss', f'{a:.2f}', '-to', f'{b:.2f}', '-af', af,
                    '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '2', str(dst)], check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default=str(ROOT / 'corpus' / 'audio' / 'ass1'),
                    help='folder holding the four .ogg voice notes (gitignored)')
    ap.add_argument('--clips', default=str(ROOT / 'Assignnment 1 Audio' / 'clips'),
                    help='the slicing workbench clips/ folder — source of the two name-free app cuts')
    args = ap.parse_args()
    src_dir, clips_dir = Path(args.src), Path(args.clips)

    m = json.loads(MAP.read_text(encoding='utf-8'))
    files = m['files']
    ITEMS.mkdir(parents=True, exist_ok=True)
    before = snapshot()

    made, copied, silent, reused, xcheck = [], [], [], [], []
    for c in m['clips']:
        cid = c['id']
        dst = ITEMS / f'{cid}.mp3'
        if c.get('bad'):
            silent.append(cid)
            continue
        if c.get('skip'):
            app = c.get('app_audio') or ''
            if app.startswith('clips/'):
                # the name-free cuts of u1l2-01 / u1l2-03: a NEW file under the card's own id
                srcf = clips_dir / Path(app).name
                if not srcf.exists() and dst.exists():
                    reused.append(f'{cid} (workbench gone, {dst.name} already in place)')
                    continue
                if not srcf.exists():
                    sys.exit(f'MISSING: {srcf} — needed for {cid}')
                shutil.copyfile(srcf, dst)
                copied.append(f'{cid} <- {app}')
            else:
                # a clip that already ships: wired straight through, nothing to write
                live = ROOT / app
                if not live.exists():
                    sys.exit(f'MISSING: {app} — {cid} wires an app clip that is not on disk')
                reused.append(f'{cid} -> {app}')
            continue
        ogg = src_dir / files[c['file']]
        if not ogg.exists():
            sys.exit(f'MISSING: {ogg} — pass --src if the voice notes live elsewhere')
        cut(ogg, c['file'], c['start'], c['end'], dst)
        made.append(cid)
        ear = clips_dir / c.get('clip', '')
        if ear.exists():
            xcheck.append((cid, md5(ear) == md5(dst), ear.stat().st_size, dst.stat().st_size))

    after = snapshot()
    new = sorted(set(after) - set(before))
    gone = sorted(set(before) - set(after))
    changed = sorted(k for k in before if k in after and before[k] != after[k])

    print(f'cut     : {len(made)} clips')
    print(f'copied  : {len(copied)} app cuts' + (''.join('\n          ' + x for x in copied)))
    print(f'wired   : {len(reused)} existing files' + (''.join('\n          ' + x for x in reused)))
    print(f'silent  : {len(silent)} cards ship no audio ({", ".join(silent)})')
    ok_x = [c for c, same, *_ in xcheck if same]
    bad_x = [(c, s1, s2) for c, same, s1, s2 in xcheck if not same]
    print(f'\near-check cross-check vs the workbench clips/: {len(ok_x)}/{len(xcheck)} byte-identical')
    for c, s1, s2 in bad_x:
        print(f'  ! {c}: ear-checked {s1} bytes, exported {s2} bytes — INVESTIGATE, she approved the ear-checked cut')

    print(f'\nmd5 audit of audio/items/ : {len(before)} files before, {len(after)} after')
    print(f'  new     : {len(new)}')
    print(f'  changed : {len(changed)}' + (''.join('\n            ' + k for k in changed)))
    print(f'  removed : {len(gone)}' + (''.join('\n            ' + k for k in gone)))
    if changed or gone:
        sys.exit('\nFAILED — an existing clip moved. AUDIO_CACHE would have to bump; the run is wrong.')
    if bad_x:
        sys.exit('\nFAILED — an exported cut does not match the clip Megan ear-checked.')
    print('\nOK — new files only, every cut matches its ear-checked clip. AUDIO_CACHE stays put.')


if __name__ == '__main__':
    main()
