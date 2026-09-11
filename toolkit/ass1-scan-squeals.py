#!/usr/bin/env python
"""Measure the Tiro 1 story tape's defects and write toolkit/ass1-defects-vn4.json.

Voice note 4 (the Phakwe le Mokoko reading) carries two artefact families that are
IN the recording — her ear reports of 2026-09-11, confirmed by measurement:

  * tonal squeals: short whistle-bursts, mostly 8-12 kHz with a family near 5 kHz,
    classic low-bitrate Opus damage. Some sit alone in the gaps between words at
    near speech loudness, some sit on top of words.
  * three record-time overload moments (22.2s, 51.8s, 75.0s) where the take ran
    hard over full scale: harsh broadband hash baked into the words themselves.

This script finds both, filters the squeal list to what is actually AUDIBLE
(tonal peak >= -52 dBFS on the raw tape — the raw scan also surfaces dozens of
noise-floor tinkles at -70..-113 dB that nobody can hear; treating those would be
pointless filter churn), and writes the defect list ass1-export.py applies:

  kind=mute  : squeal alone between words        -> volume 0.03 for that window
  kind=notch : squeal over a word                -> narrow EQ cut at its pitch
  kind=clip  : record-time overload over a word  -> lowpass 3.6 kHz for that window
               (muffled beats shrieking — her accepted trade-off, 2026-09-11)

Detection: 46 ms Hann windows, half overlap. A window is squeal-flagged when its
strongest bin above 4.5 kHz stands >= 8000x over the median HF bin (speech
sibilants are broadband noise — their ratio stays in the tens) AND it is either
HF-dominated (share > 0.30) or loud in absolute terms (peak bin > -34 dBFS).
Overload: runs of >= 100 samples beyond |0.99| (the Opus decode reconstructs the
overdriven wave above full scale), padded 30 ms. Windows within 80 ms merge.

Re-run after any change to the source .ogg or to these thresholds; the exporter
reads the json, so scanner + exporter + --recut is the full repair pipeline.
"""
import json, subprocess, sys
from pathlib import Path

import numpy as np

sys.stdout.reconfigure(encoding='utf-8')
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'corpus' / 'audio' / 'ass1' / 'Voice Note 4 - The Little Story.ogg'
OUT = ROOT / 'toolkit' / 'ass1-defects-vn4.json'
SR = 48000
AUDIBLE_DB = -52.0


def main():
    if not SRC.exists():
        sys.exit(f'MISSING: {SRC}')
    r = subprocess.run(['ffmpeg', '-v', 'error', '-i', str(SRC),
                        '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'],
                       capture_output=True, check=True)
    x = np.frombuffer(r.stdout, dtype=np.float32)

    win = int(0.046 * SR)
    hop = win // 2
    hann = np.hanning(win)
    hs = hann.sum()
    # A squeal event often carries TWO components — one near 5 kHz and one at
    # 8-12 kHz (her a1s-07 report: the 8.3-9.4 kHz notch left a 5.0 kHz whistle
    # standing). So each window is measured in both bands and a region emits one
    # notch per band that qualified.
    BANDS = ((4500, 7000), (7000, 13000))
    flags = []
    for i in range(0, len(x) - win, hop):
        sp = np.abs(np.fft.rfft(x[i:i + win] * hann))
        freqs = np.fft.rfftfreq(win, 1 / SR)
        allhf = sp[freqs > 4500]
        med = np.median(allhf) + 1e-12
        share = np.sqrt((allhf ** 2).sum()) / (np.sqrt((sp ** 2).sum()) + 1e-12)
        hit = {}
        for bi, (lo, hi) in enumerate(BANDS):
            m = (freqs > lo) & (freqs <= hi)
            hf, hfreqs = sp[m], freqs[m]
            if not len(hf):
                continue
            pk = hf.argmax()
            amp_db = 20 * np.log10(2 * hf[pk] / hs + 1e-12)
            if hf[pk] / med > 8000 and (share > 0.30 or amp_db > -34):
                hit[bi] = (float(hfreqs[pk]), float(amp_db))
        if hit:
            flags.append((i / SR, hit, float(share)))

    regions = []
    for t, hit, s in flags:
        if regions and t - regions[-1]['t1'] <= 0.08:
            r0 = regions[-1]
            r0['t1'] = t + win / SR
            r0['w'].append((hit, s))
        else:
            regions.append({'t0': t, 't1': t + win / SR, 'w': [(hit, s)]})

    out = []
    dropped = 0
    for r0 in regions:
        band_peaks = {}
        for hit, _s in r0['w']:
            for bi, (f, a) in hit.items():
                band_peaks.setdefault(bi, []).append((f, a))
        peak = max(a for v in band_peaks.values() for _f, a in v)
        if peak < AUDIBLE_DB:
            dropped += 1
            continue
        if float(np.mean([s for _h, s in r0['w']])) >= 0.80:
            out.append({'t0': round(float(r0['t0']), 2), 't1': round(float(r0['t1']), 2),
                        'kind': 'mute', 'f0': 4500, 'f1': 13000,
                        'peak_db': round(float(peak), 1)})
            continue
        for bi, v in band_peaks.items():
            bpeak = max(a for _f, a in v)
            if bpeak < AUDIBLE_DB:
                continue
            fs = [f for f, _a in v]
            out.append({'t0': round(float(r0['t0']), 2), 't1': round(float(r0['t1']), 2),
                        'kind': 'notch', 'f0': int(min(fs)), 'f1': int(max(fs)),
                        'peak_db': round(float(bpeak), 1)})

    over = np.abs(x) > 0.99
    idx = np.flatnonzero(over)
    if len(idx):
        groups = np.split(idx, np.flatnonzero(np.diff(idx) > int(0.15 * SR)) + 1)
        for g in groups:
            if len(g) < 100:
                continue  # a handful of over-samples is ordinary loud speech
            out.append({'t0': round(float(g[0] / SR - 0.03), 2),
                        't1': round(float(g[-1] / SR + 0.03), 2),
                        'kind': 'clip', 'f0': 0, 'f1': 0,
                        'peak_db': round(float(20 * np.log10(np.abs(x[g[0]:g[-1] + 1]).max())), 1)})

    out.sort(key=lambda d: d['t0'])
    OUT.write_text(json.dumps({'made': '2026-09-11', 'file': 'vn4',
                               'audible_floor_db': AUDIBLE_DB, 'regions': out},
                              indent=1) + '\n', encoding='utf-8', newline='\n')
    kinds = {}
    for d in out:
        kinds[d['kind']] = kinds.get(d['kind'], 0) + 1
    print(f'{len(flags)} squeal windows -> {len(regions)} regions; '
          f'{dropped} below the {AUDIBLE_DB} dB audibility floor')
    print(f'wrote {OUT.name}: {len(out)} regions ({", ".join(f"{v} {k}" for k, v in sorted(kinds.items()))})')
    for d in out:
        band = f'{d["f0"]}-{d["f1"]}Hz' if d['kind'] != 'clip' else 'broadband'
        print(f'  {d["kind"]:5s} {d["t0"]:6.2f}-{d["t1"]:6.2f}s  {band}  peak {d["peak_db"]} dB')


if __name__ == '__main__':
    main()
