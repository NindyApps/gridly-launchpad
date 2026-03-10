import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSalesforceAuthUrl } from '@/lib/salesforce';

export async function GET() {
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
  if (!user) {
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5000'));
  }

  if (!process.env.SALESFORCE_CLIENT_ID || !process.env.SALESFORCE_REDIRECT_URI) {
    return NextResponse.json({ error: 'Salesforce credentials not configured' }, { status: 500 });
  }

  const state = crypto.randomUUID();
  const authUrl = getSalesforceAuthUrl(state);
  return NextResponse.redirect(authUrl);
}
