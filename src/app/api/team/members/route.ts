import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const workspace_id = searchParams.get('workspace_id');

  if (!workspace_id) {
    return NextResponse.json({ error: 'workspace_id required' }, { status: 400 });
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

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('workspace_id')
    .eq('id', user.id)
    .single();

  if (!callerProfile || callerProfile.workspace_id !== workspace_id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const adminClient = createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  const { data: profiles, error: profilesError } = await adminClient
    .from('profiles')
    .select('id, full_name, role, avatar_url, created_at')
    .eq('workspace_id', workspace_id)
    .order('created_at', { ascending: true });

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 });
  }

  const { data: { users }, error: usersError } = await adminClient.auth.admin.listUsers();
  if (usersError) {
    return NextResponse.json({ error: usersError.message }, { status: 500 });
  }

  const emailMap = Object.fromEntries(users.map((u) => [u.id, u.email ?? '']));

  const members = (profiles ?? []).map((p) => ({
    id: p.id,
    full_name: p.full_name ?? emailMap[p.id]?.split('@')[0] ?? 'Unknown',
    email: emailMap[p.id] ?? '',
    role: p.role,
    avatar_url: p.avatar_url,
    created_at: p.created_at,
    is_you: p.id === user.id,
  }));

  return NextResponse.json({ members });
}
