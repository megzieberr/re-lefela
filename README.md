# Re:Lefela

Setswana, starting from zero. Together.

A two-player Duolingo-style PWA for learning Setswana — built around NWU's SECL121 module
and the free Peace Corps Botswana course, with native-speaker audio, spaced repetition,
and a weekly XP race.

**Live:** https://megzieberr.github.io/re-lefela/

- `toolkit/` — the Setswana reference toolkit (grammar, sourced sentence bank). House rule:
  no Setswana enters the app unless it comes from a vetted source; every item carries `src`.
- `corpus/` — gitignored; download links in `toolkit/SOURCES.md`.
- Backend: Supabase (`re-lefela` project) — profiles, XP events, SRS state, streaks.
  Signup requires the shared join code.
- Local dev: serve the repo root and open with `?local=1` to skip auth (offline mode).

Name: *lefela* = zero. *Re* = "we". Yes, it's also a Re:Zero joke.
