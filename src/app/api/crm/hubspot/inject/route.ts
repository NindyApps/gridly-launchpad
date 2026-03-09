import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { injectSignalToCRM } from '@/lib/hubspot';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { signal_id, workspace_id } = body;

  if (!signal_id || !workspace_id) {
    return NextResponse.json({ error: 'signal_id and workspace_id required' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('hubspot_token_enc')
    .eq('id', workspace_id)
    .single();

  if (!workspace?.hubspot_token_enc) {
    return NextResponse.json({ error: 'HubSpot not connected for this workspace' }, { status: 400 });
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
    const result = await injectSignalToCRM(workspace.hubspot_token_enc, signal);

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
