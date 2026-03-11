import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getValidHubSpotToken, injectSignalToCRM } from '@/lib/hubspot';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { signal_id, workspace_id } = body;

  if (!signal_id || !workspace_id) {
    return NextResponse.json({ error: 'signal_id and workspace_id required' }, { status: 400 });
  }

  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  let accessToken: string;
  try {
    accessToken = await getValidHubSpotToken(workspace_id, supabase);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'HubSpot token error';
    if (message === 'reconnect_required') {
      return NextResponse.json(
        {
          error: 'reconnect_required',
          message: 'Please reconnect HubSpot in Settings for security upgrade',
        },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { data: signal } = await supabase
    .from('intent_signals')
    .select('*')
    .eq('id', signal_id)
    .single();

  if (!signal) {
    return NextResponse.json({ error: 'Signal not found' }, { status: 404 });
  }

  try {
    const result = await injectSignalToCRM(accessToken, signal as unknown as Parameters<typeof injectSignalToCRM>[1]);

    await supabase
      .from('intent_signals')
      .update({ crm_injected: true, crm_task_id: result.task_id })
      .eq('id', signal_id);

    return NextResponse.json({ success: true, task_id: result.task_id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
