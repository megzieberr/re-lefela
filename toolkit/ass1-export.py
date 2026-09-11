#!/usr/bin/env python
"""Cut the 📼 Tiro 1 clips into audio/items/ from the Assignment-1 voice notes.

  python toolkit/ass1-export.py [--src corpus/audio/ass1] [--clips "Assignnment 1 Audio/clips"]

Reads toolkit/ass1-mapping.json (FINAL, ear-checked 2026-09-11) and writes ONE file per
card: audio/items/<card id>.mp3. It touches nothing else — not content.js, not any
existing clip, not any file outside audio/items/a1*.mp3.

WHAT IT SKIPS, AND WHY
  * `bad: true`  — the card ships SILENT rather than wrong. a1w-17 (yô): the old
    "clipped at source" diagnosis was decoder garbage (it measures clean under libopus);
    it stays silent pending HER ear only. a1s-nat does not exist at all (the tape holds
    ONE reading, slow — her ruling 2026-09-11). Neither gets a file.
  * `skip: true` — the app already voices this line, so no new cut is made. Cards
    a1i-02/03/06 point at live app clips through `app_audio`; a1i-04/05 point at the
    two NAME-FREE cuts in the slicing workbench, which are COPIED in under their own
    card ids (new filenames, so no AUDIO_CACHE bump — see below).

THE CUT RECIPE (VERBATIM — her ruling 2026-09-12, after the whole repair saga)
  🚨 Decode with `-c:a libopus`, ALWAYS: ffmpeg's default native Opus decoder corrupts
  these WhatsApp voice notes (POSTMORTEM-tiro1-audio.md). Beyond that: TRIM AND FADE,
  NOTHING ELSE. No squeal patches, no lowpass, no gain, no limiter — the assignment is
  pronunciation, and every "repair" era of this pipeline damaged audible speech to fix
  things nobody could hear. The clips ship sounding exactly like her WhatsApp playback,
  just cut into pieces (20 ms edge fades only, so mid-speech cut points don't click).
  The clips run a few dB quieter than the rest of the app; accepted — quieter-but-true
  beats louder-but-tampered. ass1-scan-squeals.py remains as a DIAGNOSTIC only; its
  json is no longer read by this exporter.

  Why the rework: gen_map.py's original arguments put -ss/-to AFTER -i (output-side
  seeking), so the afade pair landed on the ends of the WHOLE tape, not the clip — no
  clip edge was ever actually faded, and any window edge touching speech cut hard with
  a click. atrim inside the filter graph fixes that: the fades now sit on the clip
  itself. The gain moved from -5 dB to +3 dB in the same pass because the shipped
  clips measured ~10 dB quieter than the rest of the app (mean -22 dB vs -11 dB), so
  Megan cranked her phone to hear them. The alimiter is what makes +3 dB safe on this
  over-full-scale source. The 2026-09-11 pm re-cut therefore SUPERSEDES the workbench
  clips she ear-checked at ship time — the app itself is the ear-check surface now,
  which is where she found these defects in the first place.

  `-q:a 2` stays: on this narrowband source VBR q2 lands around 70 kbps, the size a
  64k CBR export would be anyway.

AUDIO CACHE
  A normal run writes only NEW filenames (a1*.mp3), so sw.js's AUDIO_CACHE stays
  where it is; the md5 audit FAILS if any pre-existing file's bytes moved. A
  DELIBERATE re-cut (windows or recipe changed) is run with --recut: changed a1*.mp3
  files are then expected and listed, and AUDIO_CACHE MUST bump in the same commit —
  the run prints the reminder. Anything changed outside a1*.mp3 still fails, always.
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
    """The verbatim window cut. Trim happens in the filter graph (atrim) so the fades
    land on the clip's own edges — output-side -ss/-to left them on the tape's ends.
    Nothing else touches the audio (her ruling 2026-09-12, see the recipe note above)."""
    af = (f"aformat=sample_fmts=flt,atrim=start={a:.2f}:end={b:.2f},asetpts=PTS-STARTPTS,"
          "afade=t=in:d=0.02,areverse,afade=t=in:d=0.02,areverse")
    # -c:a libopus BEFORE -i: forces the reference decoder for the input (the
    # native default corrupts these files — postmortem 2026-09-11)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-c:a', 'libopus', '-i', str(src_ogg), '-af', af,
                    '-ac', '1', '-c:a', 'libmp3lame', '-q:a', '2', str(dst)], check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--src', default=str(ROOT / 'corpus' / 'audio' / 'ass1'),
                    help='folder holding the four .ogg voice notes (gitignored)')
    ap.add_argument('--clips', default=str(ROOT / 'Assignnment 1 Audio' / 'clips'),
                    help='the slicing workbench clips/ folder — source of the two name-free app cuts')
    ap.add_argument('--recut', action='store_true',
                    help='this run DELIBERATELY re-cuts existing a1*.mp3 files (windows or '
                         'recipe changed): changed a1 clips are expected, and AUDIO_CACHE '
                         'must bump in the same commit')
    args = ap.parse_args()
    src_dir, clips_dir = Path(args.src), Path(args.clips)

    m = json.loads(MAP.read_text(encoding='utf-8'))
    files = m['files']
    ITEMS.mkdir(parents=True, exist_ok=True)
    before = snapshot()

    made, copied, silent, reused = [], [], [], []
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

    after = snapshot()
    new = sorted(set(after) - set(before))
    gone = sorted(set(before) - set(after))
    changed = sorted(k for k in before if k in after and before[k] != after[k])

    print(f'cut     : {len(made)} clips')
    print(f'copied  : {len(copied)} app cuts' + (''.join('\n          ' + x for x in copied)))
    print(f'wired   : {len(reused)} existing files' + (''.join('\n          ' + x for x in reused)))
    print(f'silent  : {len(silent)} cards ship no audio ({", ".join(silent)})')

    print(f'\nmd5 audit of audio/items/ : {len(before)} files before, {len(after)} after')
    print(f'  new     : {len(new)}')
    print(f'  changed : {len(changed)}' + (''.join('\n            ' + k for k in changed)))
    print(f'  removed : {len(gone)}' + (''.join('\n            ' + k for k in gone)))
    if gone:
        sys.exit('\nFAILED — a clip was REMOVED. This script never deletes; something is wrong.')
    outside = [k for k in changed if not k.startswith('a1')]
    if outside:
        sys.exit('\nFAILED — a clip outside a1*.mp3 moved: ' + ', '.join(outside))
    if changed and not args.recut:
        sys.exit('\nFAILED — an existing clip moved and --recut was not passed. Either the '
                 'run is wrong, or this is a deliberate re-cut: re-run with --recut and '
                 'bump AUDIO_CACHE in the same commit.')
    if changed:
        print(f'\nRECUT — {len(changed)} existing a1 clips re-cut under the same filenames.'
              '\n🚨 AUDIO_CACHE MUST BUMP (relefela-audio-vN+1) in sw.js IN THIS SAME COMMIT,'
              '\n   or phones keep the old audio forever.')
        return
    print('\nOK — new files only. AUDIO_CACHE stays put.')


if __name__ == '__main__':
    main()
