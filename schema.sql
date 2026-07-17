-- Re:Lefela schema (reference copy — ALREADY APPLIED to Supabase project opacjlgljeippheotyhz
-- as migration init_relefela_schema on 2026-07-16. Do NOT re-run on the live project.)
-- NOTE: the join code below is REDACTED in this public repo; the deployed RPC has the real one.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  display_name text not null,
  created_at timestamptz not null default now()
);

create table public.xp_events (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  amount int not null check (amount between 0 and 500),
  kind text not null default 'lesson',
  created_at timestamptz not null default now()
);
create index xp_events_user_week on public.xp_events (user_id, created_at);

create table public.srs_items (
  user_id uuid not null references public.profiles(id) on delete cascade,
  item_id text not null,
  ease real not null default 2.5,
  interval_days real not null default 0,
  due_at timestamptz not null default now(),
  reps int not null default 0,
  lapses int not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

create table public.streaks (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  current int not null default 0,
  best int not null default 0,
  last_active_date date
);

create table public.unit_progress (
  user_id uuid not null references public.profiles(id) on delete cascade,
  unit_id text not null,
  lesson_idx int not null default 0,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  primary key (user_id, unit_id)
);

alter table public.profiles enable row level security;
alter table public.xp_events enable row level security;
alter table public.srs_items enable row level security;
alter table public.streaks enable row level security;
alter table public.unit_progress enable row level security;

create policy profiles_select on public.profiles for select to authenticated using (true);
create policy xp_select on public.xp_events for select to authenticated using (true);
create policy xp_insert on public.xp_events for insert to authenticated with check (user_id = auth.uid());
create policy srs_all on public.srs_items for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy streaks_select on public.streaks for select to authenticated using (true);
create policy streaks_write on public.streaks for insert to authenticated with check (user_id = auth.uid());
create policy streaks_update on public.streaks for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy unit_select on public.unit_progress for select to authenticated using (true);
create policy unit_write on public.unit_progress for insert to authenticated with check (user_id = auth.uid());
create policy unit_update on public.unit_progress for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

create or replace function public.join_relefela(join_code text, uname text, display text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if join_code is distinct from '<REDACTED — ask Megan>' then
    raise exception 'wrong join code';
  end if;
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  insert into public.profiles (id, username, display_name)
  values (auth.uid(), lower(uname), display);
  insert into public.streaks (user_id) values (auth.uid());
end;
$$;

revoke all on function public.join_relefela from anon, public;
grant execute on function public.join_relefela to authenticated;

-- "Ask your tutor" (2026-07-17, migration add_tutor_questions — ALREADY APPLIED to
-- opacjlgljeippheotyhz via MCP, do NOT re-run schema.sql on live). Megan-only feature
-- (client gates the button on username = 'megzieberr'): a floating in-app button lets
-- her park a question for her SECL121 tutor mid-lesson, instead of parking it in
-- WhatsApp. No update/delete policy on purpose — the tutor marks a question addressed
-- via the Supabase MCP service role, which bypasses RLS entirely; a learner-facing
-- update policy isn't needed and would just be one more thing that could be misused.
create table public.tutor_questions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  question text not null,
  context text,
  created_at timestamptz not null default now(),
  addressed_at timestamptz
);

alter table public.tutor_questions enable row level security;

create policy tutor_questions_insert on public.tutor_questions for insert to authenticated
  with check (user_id = auth.uid());
create policy tutor_questions_select on public.tutor_questions for select to authenticated
  using (user_id = auth.uid());

create view public.leaderboard_week
with (security_invoker = true) as
select p.username, p.display_name,
       coalesce(sum(x.amount) filter (where x.created_at >= date_trunc('week', now())), 0) as week_xp,
       coalesce(sum(x.amount), 0) as total_xp
from public.profiles p
left join public.xp_events x on x.user_id = p.id
group by p.id, p.username, p.display_name;
