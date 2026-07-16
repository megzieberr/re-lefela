# Re:Lefela — Sources & Resources

## Local corpus (`corpus/`, gitignored — re-download via links below)

| What | Path | Origin |
|------|------|--------|
| Peace Corps Botswana course (PDF, 23 lessons) | `corpus/peace-corps-full-course.pdf` (+ `.txt` extraction) | https://www.livelingua.com/peace-corps/Setswana/BW_Setswana_Language_Lessons.pdf |
| Peace Corps audio (25 MP3s, native speakers) | `corpus/audio/BW_Setswana_Lesson_*.mp3` | URLs in `corpus/audio-urls.txt` (livelingua.com) |
| Setswana NT, Biblica Open Tswana Living (CC BY-SA 4.0) | `corpus/bible-tsn/*.txt` | https://eBible.org/Scriptures/tsn_readaloud.zip |
| English parallel (World English Bible, public domain) | `corpus/bible-eng/*.txt` | https://eBible.org/Scriptures/engwebp_readaloud.zip |
| NCHLT Setswana Speech Corpus — 6.3 GB, **58,404 pre-segmented WAV clips (2–4 s) with exact per-clip transcriptions** in `nchlt_tsn/transcriptions/nchlt_tsn.trn.xml` (`<orth>` = spoken text, + speaker age/gender/region) | `Desktop\NWU Semester 2\SECL121\Corpus\nchlt_tsn\` | https://repo.sadilar.org/handle/20.500.12185/281 |
| **Peace Corps Comprehensive Grammar** (77 pp — the deep-grammar authority pending Smart Guide) | `corpus/peace-corps-comprehensive-grammar.pdf` (+`.txt`) | Megan's copy, 2026-07-16 |
| **Beibele — FULL BSSA Bible 1970/87/2007** (SA-standard Setswana, 4.6 M chars — primary usage-grep corpus, © BSSA: LOCAL ONLY, never commit/publish) | `corpus/beibele-bssa-full.pdf` (+`.txt`) | Megan's copy, 2026-07-16 |
| Otlogetswe rhyming dictionary (420 pp wordlist, CASAS 2010) | `corpus/otlogetswe-rhyming-dictionary.pdf` (+`.txt`) | Megan's copy, 2026-07-16 |
| Davies et al. 1992 colour terms study (verified colour vocab for Unit 2 adjectives) | `corpus/colour-terms-davies1992.pdf` (+`.txt`) | Megan's copy, 2026-07-16 |
| SECL121 module plan | `Desktop\NWU Semester 2\SECL121\Resources\fin-SECL121PTD2026.pdf` | eFundi |
| Smart Guide (compulsory module material) | **NOT YET OBTAINED** — watch eFundi | eFundi |

## Usage-checking corpus greps

```bash
# how is a word actually used?
grep -ih "lefela" corpus/bible-tsn/*.txt | head
grep -i "batla" corpus/peace-corps-full-course.txt
```

## Online references

- Glosbe Tswana–English dictionary (example sentences): https://glosbe.com/tn/en
- Google Translate (Tswana since Jun 2024 — second opinion only, never authority): https://translate.google.com
- Motsweding FM (SABC Setswana radio, listening immersion): https://www.sabc.co.za/radio/motswedingfm (also on most radio-stream apps)
- UNISA free Setswana course: https://www.unisa.ac.za/static/corporate_web/Content/UnisaOpen/freeOnlineCourse/Setswana/Setswana.html
- Peace Corps video lessons (18 videos): https://www.livelingua.com/course/peace_corps/setswana_video_course

## Register & variety notes

- Peace Corps = Botswana Setswana; SECL121 = South African Setswana. Mostly identical at
  beginner level; where vocab differs, items carry `variant:bw` in the sentence bank and the
  Smart Guide's word wins for module content.
- Bible corpus is for usage-grepping only — register too formal/religious for lesson content.
