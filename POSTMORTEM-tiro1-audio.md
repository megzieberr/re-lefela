# Post-mortem: the Tiro 1 story audio (2026-09-11)

The 📼 Tiro 1 tab shipped on the morning of 2026-09-11 (sw v50) with 44 clips cut
from four voice-note recordings. By evening, after three repair passes (sw v51,
audio v6 and v7), the story clips still carried ear-hurting artefacts in the app
and the tab was parked (`ASS1_LIVE = false`; `?ass1=1` reopens it, nothing was
deleted). This is the account of what went wrong and why.

## The one-line answer

**The recording was never broken. The decoder was.** ffmpeg ships two Opus
decoders: its own native `opus` (the default) and the reference `libopus`.
Every cut in this pipeline used the default. On this particular file the native
decoder produces corrupted output; the reference decoder does not.

Measured on the story tape, same file, same scan:

| | native `opus` (used for every cut) | `libopus` (reference) |
|---|---|---|
| audible squeal windows (>4.5 kHz tonal, above -52 dB) | 96 | 24, all quieter |
| worst squeal | -22.6 dB (speech loudness) | -32.2 dB |
| samples driven over full scale | 3,743 | **0** |

Three findings that were treated as facts about the recording were actually
artefacts of the broken decode:

- **"WhatsApp voice notes decode up to +3.4 dB over full scale"** (measured
  2026-09-11 am, drove the -5 dB safety gain and the limiter): under libopus
  the same file never exceeds full scale at all.
- **"vn4 carries a mic bump at 5.66-5.75 s"** (ducked in every cut): absent
  under libopus. It was decoder garbage, not a bump.
- **The three "record-time overload moments"** (22.2 s, 51.8 s, 75.0 s) that
  "deafened the words": zero over-full-scale samples under libopus. The harsh
  hash was manufactured at decode time; the limiter then crushed the speech
  around it, which is what made words drop under the noise.

## Why it fooled everyone for a full day

The corruption was **deterministic** — the same file decoded the same wrong way
every run — so every measurement of the decoded audio was internally consistent
and reproducible. Measurements agreed with each other; they just all described
the broken decode, not the recording.

Meanwhile every listening surface that sounded *fine* used a different decoder:

- **WhatsApp on the phone** plays its own notes with the reference decoder →
  perfect.
- **The browser slicer used for mapping and ear-checks** decodes through
  Chrome's media stack, which uses libopus → perfect. This is why the windows
  could be mapped by ear on the laptop without ever hearing a squeal.
- **The app** plays mp3s cut *from the ffmpeg-native decode* → every artefact
  baked in, plus limiter pumping on the manufactured overloads.

So the one place the broken audio could be heard was the shipped app, and the
first reports arrived only when real drilling started. The ear-check process
validated the *windows* (via the browser's clean decode), never the *rendered
bytes* — the process gap that let this ship.

## The compounding mistakes (each real, none the root)

1. **Story windows placed by estimate.** The sentence boundaries came from a
   syllable-share split of the tape; six edges landed inside speech (the
   heading cut mid-word). The word/intro tapes had ear-placed windows and were
   fine.
2. **Fades that never landed.** The cut recipe put `-ss/-to` after `-i`
   (output-side seeking), so the edge fades applied to the ends of the whole
   tape, not the clip — every clip edge was a hard cut. Fixed in v6 with
   `atrim` in the filter graph.
3. **-5 dB safety gain** (guarding against the phantom over-full-scale decode)
   left the clips ~10 dB quieter than the rest of the app, so playback volume
   was cranked and every artefact got louder.
4. **Timeline `enable` granularity.** The first repair pass did literally
   nothing: ffmpeg evaluates a filter's `enable='between(t,...)'` once per
   frame, and the decoder hands the graph ~120 ms frames, so repair windows
   shorter than a frame missed every evaluation point — proven byte-for-byte
   identical output. Fixed with `asetnsamples=480` (10 ms frames). This is now
   documented in `ass1-export.py` because it is invisible: no error, no
   warning, the filter simply never fires.
5. **Repairing downstream of the real fault.** Passes two and three built a
   measured defect list (`ass1-scan-squeals.py` / `ass1-defects-vn4.json`) and
   surgically muted/notched/shaved the artefacts. The engineering worked — the
   scan went from dozens of loud hits to two floor-level blips — but it was
   restoration work performed on a corrupted source while the clean source sat
   one decoder flag away.

## Lessons now encoded

- **A/B the decoder before blaming the source.** "Measure before blaming the
  source" was already a house rule; it now has a sharper form: a measurement of
  decoded audio is a measurement of *that decoder's* output. If a file sounds
  right in its native player and wrong in the pipeline, decode it with a
  second decoder before concluding anything about the file.
- **Ear-check the rendered bytes, not the mapping.** The approval surface must
  play the same bytes the app will ship, through the same pipeline.
- **`enable` windows shorter than an audio frame silently do nothing** —
  `asetnsamples` first, and verify the repair applied by measurement.
- The tab's data, clips, specs, exporter, scanner and gates all remain in the
  repo and the toolkit. If the clips are ever wanted again, the fix is to add
  `-c:a libopus` to the decode in `ass1-export.py` (and re-run
  `ass1-scan-squeals.py` against a libopus decode so the ~24 real, quieter
  squeals get their measured repairs), then `--recut` and bump the audio cache.
  The pipeline that made the mess is, ironically, now well-instrumented enough
  to verify the clean version properly.
