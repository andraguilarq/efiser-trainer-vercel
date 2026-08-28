-- Ejecuta este archivo completo en Supabase: SQL Editor > New query > Run.
-- Después asigna el rol de administradora a tu correo con la instrucción al final.

create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('user', 'admin');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 80),
  role public.app_role not null default 'user',
  created_at timestamptz not null default now(),
  last_active_at timestamptz not null default now()
);

create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  score integer not null check (score >= 0),
  total integer not null check (total > 0),
  percentage numeric(5,2) not null check (percentage between 0 and 100),
  grade numeric(3,1) not null check (grade between 0 and 10),
  filters jsonb not null default '{}'::jsonb
);

create table if not exists public.exam_answers (
  id uuid primary key default gen_random_uuid(),
  exam_id uuid not null references public.exam_results(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id bigint,
  title text,
  case_text text,
  question_text text,
  specialty text not null default 'Sin clasificar',
  difficulty smallint check (difficulty between 1 and 5),
  selected_answer text,
  correct_answer text,
  is_correct boolean not null,
  selected_index smallint,
  correct_index smallint
);

create table if not exists public.user_study_state (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.question_reports (
  id text primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  question_id bigint,
  question_text text not null,
  case_text text,
  source text,
  reason text not null,
  comment text,
  status text not null default 'pendiente' check (status in ('pendiente', 'revisado', 'resuelto')),
  created_at timestamptz not null default now()
);

alter table public.exam_answers add column if not exists case_text text;

create index if not exists exam_results_user_created_idx on public.exam_results(user_id, created_at desc);
create index if not exists exam_answers_exam_idx on public.exam_answers(exam_id);
create index if not exists exam_answers_user_idx on public.exam_answers(user_id);
create index if not exists question_reports_created_idx on public.question_reports(created_at desc);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data ->> 'display_name'), ''), split_part(new.email, '@', 1), 'Usuario')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.touch_last_active()
returns void
language plpgsql
security definer set search_path = public
as $$
begin
  update public.profiles set last_active_at = now() where id = auth.uid();
end;
$$;

create or replace function public.update_my_display_name(new_name text)
returns public.profiles
language plpgsql
security definer set search_path = public
as $$
declare
  updated_profile public.profiles;
begin
  if new_name is null or char_length(trim(new_name)) not between 1 and 80 then
    raise exception 'El nombre debe tener entre 1 y 80 caracteres.';
  end if;

  update public.profiles
  set display_name = trim(regexp_replace(new_name, '[[:space:]]+', ' ', 'g'))
  where id = auth.uid()
  returning * into updated_profile;

  if updated_profile.id is null then
    raise exception 'No se encontró el perfil de la sesión.';
  end if;
  return updated_profile;
end;
$$;

revoke all on function public.is_admin() from public;
revoke all on function public.touch_last_active() from public;
revoke all on function public.update_my_display_name(text) from public;
grant execute on function public.is_admin() to authenticated;
grant execute on function public.touch_last_active() to authenticated;
grant execute on function public.update_my_display_name(text) to authenticated;

alter table public.profiles enable row level security;
alter table public.exam_results enable row level security;
alter table public.exam_answers enable row level security;
alter table public.user_study_state enable row level security;
alter table public.question_reports enable row level security;

drop policy if exists "profiles: self or admin select" on public.profiles;
create policy "profiles: self or admin select" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles: self insert" on public.profiles;
create policy "profiles: self insert" on public.profiles for insert to authenticated
  with check (id = auth.uid() and role = 'user');

drop policy if exists "results: self or admin select" on public.exam_results;
create policy "results: self or admin select" on public.exam_results for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "results: self insert" on public.exam_results;
create policy "results: self insert" on public.exam_results for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "answers: self or admin select" on public.exam_answers;
create policy "answers: self or admin select" on public.exam_answers for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "answers: self insert" on public.exam_answers;
create policy "answers: self insert" on public.exam_answers for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "study state: self or admin select" on public.user_study_state;
create policy "study state: self or admin select" on public.user_study_state for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "study state: self insert" on public.user_study_state;
create policy "study state: self insert" on public.user_study_state for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "study state: self update" on public.user_study_state;
create policy "study state: self update" on public.user_study_state for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

drop policy if exists "reports: self or admin select" on public.question_reports;
create policy "reports: self or admin select" on public.question_reports for select to authenticated
  using (user_id = auth.uid() or public.is_admin());

drop policy if exists "reports: self insert" on public.question_reports;
create policy "reports: self insert" on public.question_reports for insert to authenticated
  with check (user_id = auth.uid());

drop policy if exists "reports: admin update" on public.question_reports;
create policy "reports: admin update" on public.question_reports for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ÚNICO paso para nombrarte administradora, después de registrarte una vez:
-- update public.profiles set role = 'admin'
-- where id = (select id from auth.users where email = 'TU_CORREO@ejemplo.com');
