-- Reframe Destiny: anonymous user-study submissions
-- Run in Supabase Dashboard → SQL Editor (or via MCP apply_migration)
-- Ethics: no real birth data; reflections only.

create table if not exists public.research_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- journey_complete | archive_reflection
  submission_type text not null
    check (submission_type in ('journey_complete', 'archive_reflection')),

  -- Journey choices (nullable for archive-only reflections)
  system text check (system is null or system in ('bazi', 'astrology')),
  narrative_lens text check (
    narrative_lens is null or narrative_lens in ('traditional', 'modern', 'ai')
  ),

  -- Bias fragment ids discovered this session (e.g. marriage_centrism, ke_fu)
  bias_ids text[] not null default '{}',

  -- Radar scanner: [{ "id", "zh", "en", "score" }, ...]
  scanner_scores jsonb,

  -- Court of Destiny textarea or Archive reflection
  reflection_text text,

  -- UI language at submit time
  lang text not null default 'zh' check (lang in ('zh', 'en'))
);

comment on table public.research_submissions is
  'Anonymous feedback from Reframe Destiny for class user study. No PII / no birth data.';

create index if not exists research_submissions_created_at_idx
  on public.research_submissions (created_at desc);

alter table public.research_submissions enable row level security;

-- Website (anon key) can INSERT only; you read data in Supabase Dashboard.
create policy "anon_insert_research_submissions"
  on public.research_submissions
  for insert
  to anon
  with check (true);
