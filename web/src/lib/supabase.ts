/**
 * Public Supabase config (anon key + RLS — safe in the frontend).
 * No DeepSeek / service-role secrets ever live here.
 * Mirrors the vanilla project's js/config.js + js/supabase-client.js and the
 * 001_research_submissions.sql table shape.
 *
 * In Vite, prefer env vars (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY); we
 * fall back to the known-public anon values so the app works out of the box.
 */
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ??
  'https://hxpxdbfjdqbqhipazeui.supabase.co'

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cHhkYmZqZHFicWhpcGF6ZXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI1MzI4NjQsImV4cCI6MjA5ODEwODg2NH0.CAQoydWpYUTn-PrX1QPmHdLmJtlSq7Uaz0WeCkDRMPg'

/** Matches public.research_submissions (001_research_submissions.sql). */
export type ResearchSubmission = {
  submission_type: 'journey_complete' | 'archive_reflection'
  system?: 'bazi' | 'astrology' | null
  narrative_lens?: 'traditional' | 'modern' | 'ai' | null
  bias_ids?: string[]
  scanner_scores?: unknown
  reflection_text?: string | null
  lang?: 'zh' | 'en'
}

/** INSERT-only via RLS. Returns true on success. */
export async function submitResearch(row: ResearchSubmission): Promise<boolean> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('[research] Supabase not configured')
    return false
  }
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/research_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ bias_ids: [], lang: 'zh', ...row }),
    })
    if (!res.ok) {
      console.error('[research] submit failed', await res.text())
      return false
    }
    return true
  } catch (err) {
    console.error('[research] submit error', err)
    return false
  }
}
