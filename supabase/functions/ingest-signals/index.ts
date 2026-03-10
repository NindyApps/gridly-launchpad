import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

serve(async () => {
  const appUrl = Deno.env.get('NEXT_PUBLIC_APP_URL') ?? 'http://localhost:5000';
  const cronSecret = Deno.env.get('CRON_SECRET');

  if (!cronSecret) {
    return new Response(JSON.stringify({ error: 'CRON_SECRET not set' }), { status: 500 });
  }

  try {
    const res = await fetch(`${appUrl}/api/ingest/run`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cronSecret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
