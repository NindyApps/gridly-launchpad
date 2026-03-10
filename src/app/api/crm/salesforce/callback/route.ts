import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { exchangeSalesforceCode } from '@/lib/salesforce';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5000';

  if (error || !code) {
    return NextResponse.redirect(new URL('/settings/crm?sf_error=access_denied', appUrl));
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

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.redirect(new URL('/login', appUrl));

  try {
    const tokenResponse = await exchangeSalesforceCode(code);

    const expiresAt = new Date(
      parseInt(tokenResponse.issued_at) + (tokenResponse.expires_in ?? 7200) * 1000
    ).toISOString();

    const { data: profile } = await supabase
      .from('profiles')
      .select('workspace_id')
      .eq('id', user.id)
      .single();

    if (profile?.workspace_id) {
      await supabase
        .from('workspaces')
        .update({
          sf_access_token_enc: tokenResponse.access_token,
          sf_refresh_token_enc: tokenResponse.refresh_token,
          sf_instance_url: tokenResponse.instance_url,
          sf_token_expires_at: expiresAt,
          sf_connected_at: new Date().toISOString(),
        } as never)
        .eq('id', profile.workspace_id);
    }

    return NextResponse.redirect(new URL('/settings/crm?sf_connected=true', appUrl));
  } catch (err) {
    console.error('[OCTOPILOT] Salesforce OAuth error:', err);
    return NextResponse.redirect(new URL('/settings/crm?sf_error=oauth_failed', appUrl));
  }
}
