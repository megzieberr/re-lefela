# Silence-slice Peace Corps lesson audio into candidate phrase segments.
# Feeds tagger.html (Phase A of per-item audio). Re-run if thresholds need tuning.
#
#   python toolkit/slice-lessons.py
#
# Output: toolkit/segments.json  { "2": {file, duration, segments:[{i,start,end}]}, ... }
# Thresholds: silencedetect -30dB / 0.35s min silence; keep segments > 0.4s.
# Padding: 0.08s either side so consonant onsets don't get clipped.

import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
AUDIO_DIR = ROOT / 'corpus' / 'audio'
OUT = Path(__file__).resolve().parent / 'segments.json'

# Round-1 lessons (2/3/4/8) stay in the output so the tagger's "revisit skips"
# entries can resolve their file + segment titles. Lesson 5 ships as three parts;
# the tagger maps '5a'/'5b'/'5c' back to L5 items via its baseLesson() helper.
LESSONS = {
    '1': 'BW_Setswana_Lesson_1.mp3',
    '2': 'BW_Setswana_Lesson_2.mp3',
    '3': 'BW_Setswana_Lesson_3.mp3',
    '4': 'BW_Setswana_Lesson_4.mp3',
    '5a': 'BW_Setswana_Lesson_5_Part_1.mp3',
    '5b': 'BW_Setswana_Lesson_5_Part_2.mp3',
    '5c': 'BW_Setswana_Lesson_5_Part_3.mp3',
    '6': 'BW_Setswana_Lesson_6.mp3',
    '7': 'BW_Setswana_Lesson_7.mp3',
    '8': 'BW_Setswana_Lesson_8.mp3',
    '10': 'BW_Setswana_Lesson_10.mp3',
    '11': 'BW_Setswana_Lesson_11.mp3',
    '12': 'BW_Setswana_Lesson_12.mp3',
    '13': 'BW_Setswana_Lesson_13.mp3',
    '18': 'BW_Setswana_Lesson_18.mp3',
    '20': 'BW_Setswana_Lesson_20.mp3',
    '22': 'BW_Setswana_Lesson_22.mp3',
    '23': 'BW_Setswana_Lesson_23.mp3',
    # Native-recording word lessons (Megan, 2026-07-17) — isolated vocabulary, not Peace
    # Corps lessons. Non-numeric keys so they can never collide with lessons 1-23; the
    # tagger keeps them out of the round-2 auto-queue (DONE_LESSONS) and reachable only
    # via the "redo a lesson" picker, same mechanism as the reverted NCHLT experiment —
    # but these ARE real isolated-word recordings, so per-item export works normally.
    # ★ Colours (native) removed 2026-07-17 (session 17): Colours.mp3 deleted with the
    # u2l6-13..19 cards (one-word-per-colour decision) — the missing file would sys.exit
    # this script. Do not re-add; export-item-audio.py's SKIP_LESSONS guard is permanent.
    '★ Animals (native)': 'Animals.mp3',
    # ★ Numbers (native) added 2026-07-18: Megan's own recording of lefela..lesome
    # (u4l3-01..11, all silent until tagged). Verified clean before adding — the gaps
    # measure -91dB (digital silence), i.e. no background music, unlike Animals.mp3.
    '★ Numbers (native)': 'Numbers.mp3',
    # ★ Food (native) added 2026-07-18: Megan's own recording for the 10 u4l1 food cards.
    # Unlike Animals/Numbers this one is laid out like the Peace Corps lessons — Setswana
    # word, then its English translation — so it yields ~2 segments per card and the English
    # ones get junked while tagging. Its inter-word silences measure 0.36-0.84s, i.e. only
    # just above MIN_SILENCE; anything that comes out merged is fixable with the tagger's
    # Split button. Do NOT lower the global thresholds to suit it: they would renumber every
    # Peace Corps lesson's segments and invalidate every committed tag.
    '★ Food (native)': 'Food.mp3',
    # ★ Missing Words (native) added 2026-07-25: the outsourced Setswana L1 speaker's
    # recording of the 132-word/phrase recording-sheet (68 silent + 64 flagged-for-redo),
    # read in the same numbered order as toolkit/recording-list.json. A single combined
    # take (not per-lesson), unlike the Peace Corps files — tag against that order.
    '★ Missing Words (native)': 'Missing Words.wav',
}

NOISE_DB = '-30dB'
MIN_SILENCE = 0.35
MIN_SEG = 0.4
PAD = 0.08
# finer second pass: sub-segments for the tagger's Split button (mixed EN+TSW clips)
FINE_SILENCE = 0.15
FINE_MIN_SEG = 0.3
FINE_PAD = 0.06


def probe_duration(path):
    r = subprocess.run(
        ['ffprobe', '-v', 'error', '-show_entries', 'format=duration',
         '-of', 'default=noprint_wrappers=1:nokey=1', str(path)],
        capture_output=True, text=True, check=True)
    return float(r.stdout.strip())


def detect_silences(path, min_silence):
    r = subprocess.run(
        ['ffmpeg', '-hide_banner', '-i', str(path), '-af',
         f'silencedetect=noise={NOISE_DB}:d={min_silence}', '-f', 'null', '-'],
        capture_output=True, text=True)
    starts = [float(m) for m in re.findall(r'silence_start: ([\d.]+)', r.stderr)]
    ends = [float(m) for m in re.findall(r'silence_end: ([\d.]+)', r.stderr)]
    return list(zip(starts, ends[:len(starts)])) if len(ends) >= len(starts) else \
        list(zip(starts, ends + [None]))


def segments_from_silences(silences, duration, min_seg, pad):
    segs, cursor = [], 0.0
    for s_start, s_end in silences:
        if s_start - cursor > min_seg:
            segs.append((max(0.0, cursor - pad), min(duration, s_start + pad)))
        cursor = s_end if s_end is not None else duration
    if duration - cursor > min_seg:
        segs.append((max(0.0, cursor - pad), duration))
    return segs


def subs_for(seg, fine_segs):
    # fine segments whose midpoint falls inside the coarse segment
    a, b = seg
    inside = [(fa, fb) for fa, fb in fine_segs if a <= (fa + fb) / 2 <= b]
    if len(inside) < 2:
        return None
    return [[round(max(a, fa), 3), round(min(b, fb), 3)] for fa, fb in inside]


def main():
    # Windows console defaults to cp1252, which can't print the '★' in the native-recording
    # lesson keys — force utf-8 stdout so the progress log doesn't crash mid-run.
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    out = {}
    for lesson, fname in LESSONS.items():
        path = AUDIO_DIR / fname
        if not path.exists():
            sys.exit(f'missing: {path}')
        duration = probe_duration(path)
        segs = segments_from_silences(detect_silences(path, MIN_SILENCE), duration, MIN_SEG, PAD)
        fine = segments_from_silences(detect_silences(path, FINE_SILENCE), duration, FINE_MIN_SEG, FINE_PAD)
        seg_dicts = []
        splittable = 0
        for i, (a, b) in enumerate(segs):
            d = {'i': i, 'start': round(a, 3), 'end': round(b, 3)}
            subs = subs_for((a, b), fine)
            if subs:
                d['subs'] = subs
                splittable += 1
            seg_dicts.append(d)
        out[lesson] = {'file': fname, 'duration': round(duration, 2), 'segments': seg_dicts}
        print(f'Lesson {lesson}: {len(segs)} segments over {duration:.0f}s ({splittable} splittable)')
    OUT.write_text(json.dumps(out, indent=1), encoding='utf-8')
    # file://-safe copy for tagger.html (script tag instead of fetch)
    js_out = OUT.with_suffix('.js')
    js_out.write_text('window.RL_SEGMENTS = ' + json.dumps(out) + ';\n', encoding='utf-8')
    print(f'wrote {OUT}\nwrote {js_out}')


if __name__ == '__main__':
    main()
