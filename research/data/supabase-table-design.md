# Supabase table: `research_submissions`

Mapped from `js/app.js` + `index.html` (what the site actually stores today).

## What we collect (research-relevant)

| Source in app | Field in DB | Notes |
|---------------|-------------|--------|
| Journey step 1 `journey.system` | `system` | `bazi` or `astrology` |
| Journey step 2 `journey.lens` | `narrative_lens` | `traditional`, `modern`, `ai` |
| Journey step 5 scanner | `scanner_scores` | JSON array of category + score |
| Journey step 5/7 bias tags | `bias_ids` | e.g. `['marriage_centrism', 'ke_fu']` |
| Journey step 6 `#court-user` | `reflection_text` | on `journey_complete` |
| Archive `#reflection-input` | `reflection_text` | on `archive_reflection` |
| `currentLang` | `lang` | `zh` or `en` |
| — | `created_at` | auto timestamp |
| — | `submission_type` | `journey_complete` or `archive_reflection` |

## Intentionally NOT stored

- Birth date / time / place (form is decorative; `app.js` does not read inputs)
- Saved quotes, badge progress (gamification; stays in localStorage)
- Real identity, email, IP

## View data in Supabase

Dashboard → **Table Editor** → `research_submissions` → sort by `created_at`.
