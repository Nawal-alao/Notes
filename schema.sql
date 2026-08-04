-- Supabase schema for Private Notes
-- profiles: stores the master-key verification material per user
create table if not exists public.profiles (
  user_id uuid primary key,
  salt text not null,
  encrypted_verifier text not null,
  verifier_iv text not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- notes: stores encrypted note payloads; content is opaque to Supabase
-- NOTE: encrypted blobs are stored as base64 text (not bytea) to avoid
-- silent corruption when different clients encode binary differently.
create table if not exists public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null default '',
  title_iv text,
  tags text[] not null default '{}',
  encrypted_content text not null,
  content_iv text not null,
  history jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.notes enable row level security;

create policy "users can view own profile" on public.profiles
  for select using (auth.uid() = user_id);

create policy "users can insert own profile" on public.profiles
  for insert with check (auth.uid() = user_id);

create policy "users can update own profile" on public.profiles
  for update using (auth.uid() = user_id);

create policy "users can view own notes" on public.notes
  for select using (auth.uid() = user_id);

create policy "users can insert own notes" on public.notes
  for insert with check (auth.uid() = user_id);

create policy "users can update own notes" on public.notes
  for update using (auth.uid() = user_id);

create policy "users can delete own notes" on public.notes
  for delete using (auth.uid() = user_id);
