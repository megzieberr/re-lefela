# Re:Lefela — bug fixes queued from the app, 2026-08-08

> ## ✅ DONE — all six worked through on 2026-08-08 (session 41, sw v47).
> The full record is in `PROJECT-STATUS.md`. The short version:
> **#1** `pretty` → `ntlê`, sourced to Matumo p.611 · **#2 + #3** one root cause, the loose
> search tiers are now a fallback (`fat`: 191 → 12, `rra` gone) · **#4** the segment window
> started 0.7s early; retagged and re-cut, 2.65s → 2.10s, **AUDIO_CACHE v3 → v4** ·
> **#5** intro rewritten · **#6** **not a checker bug** — she typed the singular `leoto` for
> the plural `maoto` all three times, so the tolerance was right; the *hint* was rewritten
> to name the plural. The old **moti/madi** bug is confirmed genuinely fixed.
> All six `tutor_questions` rows are marked `addressed_at`. The **plurals** row is still open
> on purpose — that is a tutor session, not a code fix.
>
> Kept rather than deleted because it records where the bugs came from.

Written at the end of a SECL121 tutor session (not a build session) — Megan asked for
these to be pulled out into their own file so a future session can just fix them, instead
of them living only in the `tutor_questions` queue.

**Paste this to start the session:**

> /catchup re-lefela — then read `NEXT-SESSION-bug-fixes-2026-08-08.md` in the repo root
> and fix the bugs it lists.

**Get an explicit go-ahead before writing any file** (the standing execution gate) —
this doc is a work list, not pre-authorization.

## Where these came from

All filed via the app's 💬 Ask-your-tutor button, still `addressed_at is null`:

```sql
-- re-lefela Supabase project: opacjlgljeippheotyhz  (MCP server: supabase-nwu-relefela)
select id, question, context, created_at from tutor_questions
where addressed_at is null order by created_at;
```

Mark each one addressed once actually fixed (not just read):

```sql
update tutor_questions set addressed_at = now() where id = '<id>';
```

## Bugs to fix

1. **Dictionary missing "pretty"** — she looked it up, not there.
   `context: dict-miss:pretty` · 2026-08-05

2. **Dictionary "fat" search returns ~30 results** — too many, doesn't look right for
   a single-word lookup. Possibly a fuzzy-match/relevance-ranking issue.
   `context: Dictionary` · 2026-08-06

3. **Dictionary "fat" wrongly surfaces "rra" (father)** — same search as #2, a
   specific bad match worth checking directly (rra shouldn't rank for "fat").
   `context: Dictionary` · 2026-08-06

4. **u3/l1 audio still has the English word in it** ("Ga ba batle") — needs
   re-recording or re-clipping, same family as the native-recordings work.
   `context: u3/l1 — Ga ba batle` · 2026-08-07

5. **u3/l3 intro sentence is unreadable** — her words: "the most horrible
   introduction sentence ever... I understand nothing, and I reread it 5 times."
   Needs the actual sentence pulled up and either simplified, glossed, or
   re-sequenced so it doesn't front-load unknown material.
   `context: u3/l3` · 2026-08-07

6. **Sentence Builder answer-checker too strict on "My legs are sore"** — she typed
   `Leot ame a bothloko` / `Leoto ame a bothloko` / `Leoto ame e bothloko`, correct
   answer is `Maoto ame a botlhoko`. Worth checking whether this is a genuine typo
   on her part or a fuzzy-match tolerance gap (same family as the "moti"/"madi" bug
   already flagged separately below).
   `context: builder-auto:sb-u2-07` · 2026-08-07

## Already-known related bug (check it actually landed)

- **SRS answer-checker accepted "moti" as correct for "madi" (money, u1l6-12)** —
  found 2026-07-31, spawned as a separate fix task at the time (fuzzy-match
  threshold likely too loose). Confirm it's actually fixed before closing; it's
  the same shape of bug as #6 above, so worth fixing both together.

## Not a bug (teaching ask, not app fix)

- She also flagged **plurals (u2l2-02)** as something she wants taught properly in
  a tutor session ("teach me this, then a few rounds of just drill") — that's a
  SECL121 tutor-session task, not a Re:Lefela code fix. Don't fold it into this
  bug-fix pass.
