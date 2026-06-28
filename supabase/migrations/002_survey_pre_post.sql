-- Pre/post Likert survey support (Week 6 user study)

alter table public.research_submissions drop constraint if exists research_submissions_submission_type_check;

alter table public.research_submissions
  add constraint research_submissions_submission_type_check
  check (submission_type in (
    'journey_complete', 'archive_reflection', 'survey_pre', 'survey_post'
  ));

alter table public.research_submissions
  add column if not exists session_id uuid,
  add column if not exists survey_answers jsonb;

create index if not exists research_submissions_session_id_idx
  on public.research_submissions (session_id);

create index if not exists research_submissions_survey_phase_idx
  on public.research_submissions (submission_type)
  where submission_type in ('survey_pre', 'survey_post');
