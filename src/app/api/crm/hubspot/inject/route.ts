import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';
import { getValidHubSpotToken, injectSignalToCRM } from '@/lib/hubspot';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const authClient = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { user } } = await authClient.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { signal_id, workspace_id } = body;

  if (!signal_id || !workspace_id) {
    return NextResponse.json({ error: 'signal_id and workspace_id required' }, { status: 400 });
  }

  const { data: callerProfile } = await authClient
    .from('profiles')
    .select('workspace_id')
    .eq('id', user.id)
    .single();

  if (!callerProfile || callerProfile.workspace_id !== workspace_id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
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

  // Atomic duplicate guard: claim the signal for injection only if not yet injected.
  // This prevents two team members from creating duplicate CRM tasks simultaneously.
  const { data: claimed } = await supabase
    .from('intent_signals')
    .update({ crm_injected: true } as never)
    .eq('id', signal_id)
    .eq('workspace_id', workspace_id)
    .eq('crm_injected', false)
    .select('id, ai_summary, pain_domain, intent_level, confidence_score, post_url, author_handle, suggested_opener, urgency_tag')
    .single();

  if (!claimed) {
    return NextResponse.json(
      {
        error: 'already_injected',
        message: 'This signal was already injected by another team member.',
      },
      { status: 409 }
    );
  }

  try {
    const result = await injectSignalToCRM(accessToken, claimed as unknown as Parameters<typeof injectSignalToCRM>[1]);

    await supabase
      .from('intent_signals')
      .update({ crm_task_id: result.task_id } as never)
      .eq('id', signal_id)
      .eq('workspace_id', workspace_id);

    return NextResponse.json({ success: true, task_id: result.task_id });
  } catch (err: unknown) {
    // Rollback the optimistic lock so the user can retry
    await supabase
      .from('intent_signals')
      .update({ crm_injected: false } as never)
      .eq('id', signal_id)
      .eq('workspace_id', workspace_id);

    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
