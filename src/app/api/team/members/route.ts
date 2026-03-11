import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

async function getAuthenticatedUser(cookieStore: Awaited<ReturnType<typeof cookies>>) {
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
  return { user, supabase };
}

function getAdmin() {
  return createAdminClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

async function listAllUsers(adminClient: ReturnType<typeof getAdmin>) {
  const allUsers: Array<{ id: string; email?: string }> = [];
  let page = 1;
  const perPage = 1000;
  let hasMore = true;

  while (hasMore) {
    const { data: { users }, error } = await adminClient.auth.admin.listUsers({ page, perPage });
    if (error || !users || users.length === 0) {
      hasMore = false;
    } else {
      allUsers.push(...users.map((u) => ({ id: u.id, email: u.email })));
      hasMore = users.length === perPage;
      page++;
    }
  }

  return allUsers;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const workspace_id = searchParams.get('workspace_id');

  if (!workspace_id) {
    return NextResponse.json({ error: 'workspace_id required' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const { user, supabase } = await getAuthenticatedUser(cookieStore);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('workspace_id')
    .eq('id', user.id)
    .single();

  if (!callerProfile || callerProfile.workspace_id !== workspace_id) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const adminClient = getAdmin();

  const { data: profiles, error: profilesError } = await adminClient
    .from('profiles')
    .select('id, full_name, role, avatar_url, created_at')
    .eq('workspace_id', workspace_id)
    .order('created_at', { ascending: true });

  if (profilesError) {
    return NextResponse.json({ error: profilesError.message }, { status: 500 });
  }

  const users = await listAllUsers(adminClient);
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

export async function PATCH(request: NextRequest) {
  const cookieStore = await cookies();
  const { user, supabase } = await getAuthenticatedUser(cookieStore);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { member_id, workspace_id, role } = body;

  if (!member_id || !workspace_id || !role) {
    return NextResponse.json({ error: 'member_id, workspace_id, and role required' }, { status: 400 });
  }

  const validRoles = ['admin', 'analyst', 'sdr', 'viewer'];
  if (!validRoles.includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('workspace_id, role')
    .eq('id', user.id)
    .single();

  if (!callerProfile || callerProfile.workspace_id !== workspace_id || callerProfile.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  if (member_id === user.id) {
    return NextResponse.json({ error: 'Cannot change your own role' }, { status: 400 });
  }

  const adminClient = getAdmin();
  const { error } = await adminClient
    .from('profiles')
    .update({ role })
    .eq('id', member_id)
    .eq('workspace_id', workspace_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies();
  const { user, supabase } = await getAuthenticatedUser(cookieStore);
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const member_id = searchParams.get('member_id');
  const workspace_id = searchParams.get('workspace_id');

  if (!member_id || !workspace_id) {
    return NextResponse.json({ error: 'member_id and workspace_id required' }, { status: 400 });
  }

  const { data: callerProfile } = await supabase
    .from('profiles')
    .select('workspace_id, role')
    .eq('id', user.id)
    .single();

  if (!callerProfile || callerProfile.workspace_id !== workspace_id || callerProfile.role !== 'admin') {
    return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
  }

  if (member_id === user.id) {
    return NextResponse.json({ error: 'Cannot remove yourself' }, { status: 400 });
  }

  const adminClient = getAdmin();
  const { error } = await adminClient
    .from('profiles')
    .update({ workspace_id: null })
    .eq('id', member_id)
    .eq('workspace_id', workspace_id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
