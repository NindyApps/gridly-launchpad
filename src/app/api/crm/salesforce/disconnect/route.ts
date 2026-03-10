import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revokeSalesforceToken } from '@/lib/salesforce';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

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

  try {
    await revokeSalesforceToken(profile.workspace_id, supabaseAdmin);
  } catch (err) {
    console.error('[OCTOPILOT] Salesforce revoke error (continuing):', err);
    await supabaseAdmin
      .from('workspaces')
      .update({
        sf_access_token_enc: null,
        sf_refresh_token_enc: null,
        sf_instance_url: null,
        sf_token_expires_at: null,
        sf_connected_at: null,
      } as never)
      .eq('id', profile.workspace_id);
  }

  return NextResponse.json({ success: true });
}
