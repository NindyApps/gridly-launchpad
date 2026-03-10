import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, runIngestionForTracker, runIngestionForAllTrackers } from '@/lib/ingest';

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { trackerId?: string } = {};
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const supabaseAdmin = createAdminClient();

  try {
    if (body.trackerId) {
      const result = await runIngestionForTracker(body.trackerId, supabaseAdmin);
      return NextResponse.json({
        success: true,
        processed: 1,
        saved: result.saved,
      });
    } else {
      const result = await runIngestionForAllTrackers(supabaseAdmin);
      return NextResponse.json({
        success: true,
        processed: result.processed,
        saved: result.saved,
      });
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[OCTOPILOT] Ingest error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
