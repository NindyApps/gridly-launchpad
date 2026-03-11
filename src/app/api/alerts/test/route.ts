import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import type { Database } from '@/types/database';
import { sendSlackAlert } from '@/lib/notifications';
import { sendSignalAlertEmail } from '@/lib/email';
import type { IntentSignal } from '@/types/app';

const DUMMY_SIGNAL: Omit<IntentSignal, 'id' | 'workspace_id' | 'tracker_id' | 'created_at'> = {
  platform: 'reddit',
  post_url: 'https://reddit.com/r/example/comments/test',
  author_handle: 'u/test_user',
  post_timestamp: new Date().toISOString(),
  intent_category: 'vendor_switch',
  intent_level: 'high',
  confidence_score: 0.92,
  pain_domain: 'CRM Pricing',
  ai_summary: 'This is a test notification from OCTOPILOT. If you see this, your alert configuration is working correctly.',
  suggested_opener: 'Hi there! This is your OCTOPILOT test signal — your alerts are live.',
  urgency_tag: 'urgent',
  crm_injected: false,
  crm_task_id: null,
  dismissed: false,
  sf_injected_at: null,
  sf_record_id: null,
  sf_record_url: null,
  is_demo: false,
};

export async function POST() {
  const cookieStore = await cookies();
  const supabase = createServerClient<Database>(
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

  const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('workspace_id, notification_prefs')
    .eq('id', user.id)
    .single();

  if (!profile?.workspace_id) {
    return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
  }

  const { data: workspace } = await supabaseAdmin
    .from('workspaces')
    .select('slack_webhook_url, alert_confidence_threshold')
    .eq('id', profile.workspace_id)
    .single();

  const prefs = (profile.notification_prefs ?? {}) as { email?: boolean; slack?: boolean };
  const sent = { email: false, slack: false };
  const errors: string[] = [];

  const dummySignal: IntentSignal = {
    ...DUMMY_SIGNAL,
    id: 'test-signal-id',
    workspace_id: profile.workspace_id,
    tracker_id: 'test-tracker-id',
    created_at: new Date().toISOString(),
  };

  if (prefs.slack && workspace?.slack_webhook_url) {
    try {
      await sendSlackAlert(workspace.slack_webhook_url, dummySignal);
      sent.slack = true;
    } catch (err) {
      errors.push(`Slack: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  if (prefs.email && user.email) {
    try {
      await sendSignalAlertEmail(user.email, dummySignal);
      sent.email = true;
    } catch (err) {
      errors.push(`Email: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  }

  return NextResponse.json({ sent, errors });
}
