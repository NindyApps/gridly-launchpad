import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  const { signal_id, feedback_type } = await request.json();

  if (!signal_id || !feedback_type) {
    return NextResponse.json({ error: 'signal_id and feedback_type are required' }, { status: 400 });
  }

  const validTypes = ['useful', 'not_useful', 'false_positive', 'already_known'];
  if (!validTypes.includes(feedback_type)) {
    return NextResponse.json({ error: 'Invalid feedback_type' }, { status: 400 });
  }

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

  const { data: profile } = await supabase
    .from('profiles')
    .select('workspace_id')
    .eq('id', user.id)
    .single();

  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  const { error: feedbackError } = await supabase
    .from('human_feedback_loop')
    .insert({
      signal_id,
      user_id: user.id,
      workspace_id: profile.workspace_id,
      feedback_type,
    });

  if (feedbackError) {
    return NextResponse.json({ error: feedbackError.message }, { status: 500 });
  }

  if (feedback_type === 'not_useful' || feedback_type === 'false_positive') {
    await supabase
      .from('intent_signals')
      .update({ dismissed: true })
      .eq('id', signal_id);
  }

  await supabase.from('compliance_logs').insert({
    workspace_id: profile.workspace_id,
    action: 'signal_feedback',
    actor_id: user.id,
    resource_type: 'intent_signal',
    resource_id: signal_id,
    metadata: { feedback_type },
  });

  return NextResponse.json({ success: true });
}
