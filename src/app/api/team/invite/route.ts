import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { sendInviteEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  const { email, role, workspace_id } = await request.json();

  if (!email || !role || !workspace_id) {
    return NextResponse.json({ error: 'email, role, and workspace_id are required' }, { status: 400 });
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
    .select('role, workspace_id, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || (profile.workspace_id as string) !== workspace_id || profile.role !== 'admin') {
    return NextResponse.json({ error: 'Only workspace admins can invite members' }, { status: 403 });
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'Service role key not configured' }, { status: 500 });
  }

  const adminClient = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? `${new URL(request.url).origin}`;

  const { data: inviteData, error } = await adminClient.auth.admin.inviteUserByEmail(email, {
    data: { workspace_id, role },
    redirectTo: `${appUrl}/accept-invite`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const { data: workspace } = await adminClient
    .from('workspaces')
    .select('name')
    .eq('id', workspace_id)
    .single();

  const inviterName = (profile.full_name as string | null) ?? user.email ?? 'A teammate';
  const workspaceName = (workspace?.name as string | undefined) ?? 'your workspace';
  const inviteUrl = `${appUrl}/accept-invite`;

  sendInviteEmail(email, inviterName, workspaceName, inviteUrl).catch((err) => {
    console.error('[OCTOPILOT] Invite email failed:', err);
  });

  return NextResponse.json({ success: true, user_id: inviteData.user.id });
}
