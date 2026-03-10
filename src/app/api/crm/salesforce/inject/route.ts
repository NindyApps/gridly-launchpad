import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { injectSignalToSalesforce } from '@/lib/salesforce';
import type { IntentSignal } from '@/types/app';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { signalId, objectType } = body as { signalId?: string; objectType?: 'Task' | 'Lead' | 'Contact' | 'Opportunity' };

  if (!signalId) {
    return NextResponse.json({ error: 'signalId is required' }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('workspace_id')
    .eq('id', user.id)
    .single();

  if (!profile?.workspace_id) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }

  const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: workspace } = await supabaseAdmin
    .from('workspaces')
    .select('sf_access_token_enc')
    .eq('id', profile.workspace_id)
    .single();

  if (!workspace?.sf_access_token_enc) {
    return NextResponse.json({ error: 'Salesforce is not connected. Please connect Salesforce in Settings → CRM.' }, { status: 422 });
  }

  const { data: signal } = await supabaseAdmin
    .from('intent_signals')
    .select('*')
    .eq('id', signalId)
    .eq('workspace_id', profile.workspace_id)
    .single();

  if (!signal) {
    return NextResponse.json({ error: 'Signal not found' }, { status: 404 });
  }

  try {
    const result = await injectSignalToSalesforce(
      profile.workspace_id,
      signal as unknown as IntentSignal,
      supabaseAdmin,
      objectType
    );

    await supabaseAdmin
      .from('intent_signals')
      .update({
        sf_injected_at: new Date().toISOString(),
        sf_record_id: result.recordId,
        sf_record_url: result.recordUrl,
      } as never)
      .eq('id', signalId);

    return NextResponse.json({
      success: true,
      recordId: result.recordId,
      recordUrl: result.recordUrl,
      objectType: result.objectType,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown Salesforce error';
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
