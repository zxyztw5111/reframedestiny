/**
 * Cloudflare Pages Function — DeepSeek proxy.
 * Set DEEPSEEK_API_KEY in Cloudflare Dashboard → Pages → Settings → Environment variables.
 * Never put the key in frontend or Git.
 */
export async function onRequestPost(context) {
  const { request, env } = context;
  const apiKey = env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return json({ error: 'DEEPSEEK_API_KEY is not configured on the server' }, 500);
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const { messages, model, max_tokens, temperature } = body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return json({ error: 'Request body must include a non-empty messages array' }, 400);
  }

  try {
    const upstream = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages,
        stream: false,
        ...(max_tokens ? { max_tokens } : {}),
        ...(temperature != null ? { temperature } : {})
      })
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      const message = data?.error?.message || data?.message || 'DeepSeek request failed';
      return json({ error: message }, upstream.status);
    }

    return json(data, 200);
  } catch (err) {
    return json({ error: err.message || 'Server error' }, 500);
  }
}

export async function onRequest(context) {
  return json({ error: 'Method not allowed' }, 405, { Allow: 'POST' });
}

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders }
  });
}
