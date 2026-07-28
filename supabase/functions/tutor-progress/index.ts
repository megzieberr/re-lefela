/* tutor-progress — a READ-ONLY window onto one learner's own Re:Lefela progress,
   for that learner's Claude Code tutor to read at the start of a session.
   Built 2026-07-28 (see nwu-hub/PLAN-tutor-pack.md, private).

   WHY THIS EXISTS INSTEAD OF GIVING A TUTOR DATABASE ACCESS
   A learner's Claude runs on her own laptop. Handing it a Supabase access token or
   the app login would give it write power over everything, and would park a real
   credential in a text file. Instead it gets one URL plus a random 43-char token:
   the token maps to exactly one user_id, every query below is pinned to that id,
   and there is no code path here that writes learner progress. Read-only is a
   property of the pipe, not a privilege we granted.

   AUTH: deployed with verify_jwt = false ON PURPOSE. The caller presents a tutor
   token, not a Supabase JWT, so the gateway must let the request through to this
   custom check. A wrong token costs one indexed primary-key lookup and returns 401.
   Only the SHA-256 of a token is ever stored (public.tutor_tokens), so a database
   leak cannot reveal a live token.

   THE ONLY WRITE IN THIS FUNCTION is the delivered_at stamp on the questions it
   just handed over, so the tutor is not re-told the same thing every session
   (Megan's ruling, 2026-07-28). It never touches addressed_at — that stays the
   tutor's own bookkeeping — and never touches srs_items, xp_events, streaks or
   unit_progress at all. */
import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

/* Mirrors the app's own ceiling (index.html MAX_INTERVAL_DAYS, session 31). Only
   used to flag stale oversized rows in `warnings` — this function never rewrites
   them; the app's repairIntervals() owns that. */
const MAX_INTERVAL_DAYS = 30;
const RECENT_XP_DAYS = 14;
const TOP_N = 10;
const DUE_LISTED = 40;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

async function sha256Hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/* Bearer header is the documented way in; ?token= exists so a plain curl can test
   the endpoint without header juggling. */
function presentedToken(req: Request): string | null {
  const m = (req.headers.get("Authorization") ?? "").match(/^Bearer\s+(.+)$/i);
  if (m) return m[1].trim();
  const q = new URL(req.url).searchParams.get("token");
  return q && q.trim() ? q.trim() : null;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "GET") {
    return json({ error: "Use GET." }, 405);
  }

  const token = presentedToken(req);
  if (!token) {
    return json({
      error: "No token. Send header: Authorization: Bearer <your token>",
    }, 401);
  }

  const admin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    { auth: { persistSession: false } },
  );

  const { data: tok, error: tokErr } = await admin
    .from("tutor_tokens")
    .select("user_id,label,revoked_at")
    .eq("token_sha256", await sha256Hex(token))
    .maybeSingle();

  if (tokErr) {
    console.error("token lookup failed", tokErr.message);
    return json({ error: "Token lookup failed." }, 500);
  }
  if (!tok || tok.revoked_at) {
    return json({ error: "Unknown or revoked token." }, 401);
  }

  /* From here on, `uid` is the only learner this request can ever see. Every query
     below carries .eq("user_id", uid) — that is the whole isolation guarantee, so
     do not add a query without it. */
  const uid: string = tok.user_id;
  const now = Date.now();
  /* Default response is deliberately compact: a tutor reads this at the start of
     every session, and the full 85-card dump plus raw XP log was ~55 kB of context
     for facts it almost never needs. ?full=1 adds them back for a deep dive. */
  const full = new URL(req.url).searchParams.get("full") === "1";

  const [profileRes, srsRes, streakRes, unitRes, xpAllRes, xpRecentRes, qRes] =
    await Promise.all([
      admin.from("profiles").select("username,display_name")
        .eq("id", uid).maybeSingle(),
      admin.from("srs_items")
        .select("item_id,reps,ease,interval_days,due_at,lapses,updated_at")
        .eq("user_id", uid),
      admin.from("streaks").select("current,best,last_active_date")
        .eq("user_id", uid).maybeSingle(),
      admin.from("unit_progress").select("unit_id,lesson_idx,completed,updated_at")
        .eq("user_id", uid).order("unit_id"),
      admin.from("xp_events").select("amount").eq("user_id", uid),
      admin.from("xp_events").select("amount,kind,created_at").eq("user_id", uid)
        .gte("created_at", new Date(now - RECENT_XP_DAYS * 864e5).toISOString())
        .order("created_at", { ascending: false }).limit(300),
      admin.from("tutor_questions")
        .select("id,question,context,created_at,delivered_at")
        .eq("user_id", uid).is("addressed_at", null)
        .order("created_at", { ascending: true }),
    ]);

  const firstErr = [profileRes, srsRes, streakRes, unitRes, xpAllRes, xpRecentRes, qRes]
    .find((r) => r.error);
  if (firstErr?.error) {
    console.error("read failed", firstErr.error.message);
    return json({ error: "Could not read progress." }, 500);
  }

  const srs = srsRes.data ?? [];
  const due = srs.filter((r) => new Date(r.due_at).getTime() <= now)
    .sort((a, b) => new Date(a.due_at).getTime() - new Date(b.due_at).getTime());

  /* Weakest = most lapses first, then fewest reps. Same ordering the app's Daily
     Quest uses for its top-up, so a tutor session and the app agree on "weak". */
  const weakest = [...srs]
    .sort((a, b) => (b.lapses - a.lapses) || (a.reps - b.reps))
    .slice(0, TOP_N)
    .map((r) => ({ item_id: r.item_id, lapses: r.lapses, reps: r.reps }));

  const xpTotal = (xpAllRes.data ?? []).reduce((n, e) => n + (e.amount ?? 0), 0);
  const lastActivity = srs.reduce<string | null>(
    (acc, r) => (!acc || r.updated_at > acc ? r.updated_at : acc),
    null,
  );

  const warnings: string[] = [];
  const oversized = srs.filter((r) => r.interval_days > MAX_INTERVAL_DAYS);
  if (oversized.length) {
    warnings.push(
      `${oversized.length} card(s) have interval_days over the app's ${MAX_INTERVAL_DAYS}-day cap ` +
      `(${oversized.slice(0, 5).map((r) => r.item_id).join(", ")}). The app repairs these on next ` +
      `open; if they persist, say so — it means a device is not syncing.`,
    );
  }

  const questions = (qRes.data ?? []).map((q) => ({
    question: q.question,
    context: q.context,
    created_at: q.created_at,
    /* context starting "builder-auto:" = auto-filed after three real misses in the
       Sentence Builder, NOT something she typed. The three verbatim attempts are
       inside `question` and are the diagnostic gold — read them for the pattern. */
    auto_filed: (q.context ?? "").startsWith("builder-auto:"),
    first_time_seen: q.delivered_at === null,
  }));

  /* The one write. Best-effort: if it fails the tutor still got the data, and the
     worst case is a repeated question next session. */
  const undelivered = (qRes.data ?? []).filter((q) => q.delivered_at === null)
    .map((q) => q.id);
  if (undelivered.length) {
    const { error: stampErr } = await admin.from("tutor_questions")
      .update({ delivered_at: new Date().toISOString() })
      .in("id", undelivered).is("delivered_at", null);
    if (stampErr) console.error("delivered_at stamp failed", stampErr.message);
  }

  /* Daily XP rollup — what "has she been playing?" actually needs, in ~14 lines
     instead of 300 raw events. */
  const byDay = new Map<string, number>();
  for (const e of xpRecentRes.data ?? []) {
    const d = (e.created_at as string).slice(0, 10);
    byDay.set(d, (byDay.get(d) ?? 0) + (e.amount ?? 0));
  }
  const activityByDay = [...byDay.entries()].sort((a, b) => b[0].localeCompare(a[0]))
    .map(([date, xp]) => ({ date, xp }));

  return json({
    generated_at: new Date().toISOString(),
    learner: {
      username: profileRes.data?.username ?? null,
      display_name: profileRes.data?.display_name ?? null,
    },
    summary: {
      words_met: srs.length,
      due_now: due.length,
      xp_total: xpTotal,
      streak_current: streakRes.data?.current ?? 0,
      streak_best: streakRes.data?.best ?? 0,
      last_active_date: streakRes.data?.last_active_date ?? null,
      last_progress_saved: lastActivity,
      xp_last_14_days: (xpRecentRes.data ?? []).reduce((n, e) => n + (e.amount ?? 0), 0),
      open_questions: questions.length,
    },
    due_now: due.slice(0, DUE_LISTED).map((r) => ({
      item_id: r.item_id, due_at: r.due_at, reps: r.reps, lapses: r.lapses,
    })),
    /* Say so rather than silently truncating — a tutor drilling "everything due"
       needs to know the list it got was clipped. */
    due_now_truncated: due.length > DUE_LISTED
      ? `showing ${DUE_LISTED} of ${due.length} due — add ?full=1 for every card`
      : false,
    weakest,
    units: unitRes.data ?? [],
    activity_by_day: activityByDay,
    questions,
    warnings,
    /* Only on ?full=1 — see the `full` note above. */
    srs: full ? [...srs].sort((a, b) => a.item_id.localeCompare(b.item_id)) : undefined,
    recent_xp: full ? (xpRecentRes.data ?? []) : undefined,
    full_available: full ? undefined
      : "Add ?full=1 for every card's reps/ease/interval and the raw XP log.",
    read_only_note:
      "This endpoint can only read. Progress is saved by the Re:Lefela app on the " +
      "learner's phone, as her. A tutor never writes progress anywhere.",
  });
});
