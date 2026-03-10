import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { exchangeHubSpotCode } from '@/lib/hubspot';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(new URL('/settings/crm?error=oauth_denied', request.url));
  }

  const clientId = process.env.HUBSPOT_CLIENT_ID!;
  const clientSecret = process.env.HUBSPOT_CLIENT_SECRET!;
  const redirectUri = process.env.HUBSPOT_REDIRECT_URI!;

  try {
    const tokens = await exchangeHubSpotCode(code, clientId, clientSecret, redirectUri);
    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

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
    if (!user) return NextResponse.redirect(new URL('/login', request.url));

    const { data: profile } = await supabase
      .from('profiles')
      .select('workspace_id')
      .eq('id', user.id)
      .single();

    if (profile?.workspace_id) {
      await supabase
        .from('workspaces')
        .update({
          hubspot_token_enc: tokens.access_token,
          hubspot_refresh_token_enc: tokens.refresh_token,
          hubspot_token_expires_at: expiresAt,
        })
        .eq('id', profile.workspace_id);
    }

    return NextResponse.redirect(new URL('/settings/crm?connected=true', request.url));
  } catch (err) {
    console.error('HubSpot OAuth error:', err);
    return NextResponse.redirect(new URL('/settings/crm?error=oauth_failed', request.url));
  }
}
