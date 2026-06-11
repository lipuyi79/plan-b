create extension if not exists "pgcrypto";

create table if not exists public.account_summaries (
  user_id uuid primary key references auth.users(id) on delete cascade,
  plan_id text not null default 'free',
  status text not null default 'free' check (status in ('free', 'active', 'past_due', 'cancelled')),
  credits_balance integer not null default 4 check (credits_balance >= 0),
  monthly_free_used integer not null default 0 check (monthly_free_used >= 0),
  creem_customer_id text,
  creem_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.brand_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  lighting text not null,
  shadow text not null,
  color_palette text not null,
  camera text not null,
  mood text not null,
  reference_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  brand_profile_id uuid references public.brand_profiles(id) on delete set null,
  product_type text not null,
  scene text not null,
  brand_style text not null,
  seed integer not null,
  marketplace text not null,
  product_image_url text,
  background_url text,
  output_url text,
  prompt text,
  credits_used integer not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.downloads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  generation_id uuid references public.generations(id) on delete set null,
  file_url text not null,
  file_type text not null default 'png',
  created_at timestamptz not null default now()
);

create table if not exists public.credit_ledger (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  delta integer not null,
  reason text not null,
  external_id text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.create_account_summary_for_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.account_summaries (user_id)
  values (new.id)
  on conflict (user_id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_create_account_summary on auth.users;
create trigger on_auth_user_created_create_account_summary
after insert on auth.users
for each row execute function public.create_account_summary_for_user();

drop trigger if exists touch_account_summaries_updated_at on public.account_summaries;
create trigger touch_account_summaries_updated_at
before update on public.account_summaries
for each row execute function public.touch_updated_at();

drop trigger if exists touch_brand_profiles_updated_at on public.brand_profiles;
create trigger touch_brand_profiles_updated_at
before update on public.brand_profiles
for each row execute function public.touch_updated_at();

alter table public.account_summaries enable row level security;
alter table public.brand_profiles enable row level security;
alter table public.generations enable row level security;
alter table public.downloads enable row level security;
alter table public.credit_ledger enable row level security;

create policy "Users can read own account summary"
  on public.account_summaries for select
  using (auth.uid() = user_id);

create policy "Users can read own brand profiles"
  on public.brand_profiles for select
  using (auth.uid() = user_id);

create policy "Users can create own brand profiles"
  on public.brand_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own brand profiles"
  on public.brand_profiles for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete own brand profiles"
  on public.brand_profiles for delete
  using (auth.uid() = user_id);

create policy "Users can read own generations"
  on public.generations for select
  using (auth.uid() = user_id);

create policy "Users can create own generations"
  on public.generations for insert
  with check (auth.uid() = user_id);

create policy "Users can read own downloads"
  on public.downloads for select
  using (auth.uid() = user_id);

create policy "Users can create own downloads"
  on public.downloads for insert
  with check (auth.uid() = user_id);

create policy "Users can read own credit ledger"
  on public.credit_ledger for select
  using (auth.uid() = user_id);
