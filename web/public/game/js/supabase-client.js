/* Submit anonymous research rows to Supabase (INSERT-only via RLS) */

async function submitResearch(row) {
  const cfg = window.RD_CONFIG;
  if (!cfg?.supabaseUrl || !cfg?.supabaseAnonKey) {
    console.warn('[research] Supabase not configured');
    return false;
  }

  try {
    const res = await fetch(`${cfg.supabaseUrl}/rest/v1/research_submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: cfg.supabaseAnonKey,
        Authorization: `Bearer ${cfg.supabaseAnonKey}`,
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(row)
    });

    if (!res.ok) {
      console.error('[research] submit failed', await res.text());
      return false;
    }
    return true;
  } catch (err) {
    console.error('[research] submit error', err);
    return false;
  }
}
