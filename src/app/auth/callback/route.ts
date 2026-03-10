import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const type = searchParams.get('type');

  if (code) {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => cookieStore.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/auth/reset-password`);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarding_completed, onboarding_step, full_name')
        .eq('id', data.session.user.id)
        .single();

      const isNewUser = !profile?.onboarding_completed && (profile?.onboarding_step ?? 0) === 0;
      if (isNewUser && data.session.user.email) {
        sendWelcomeEmail(data.session.user.email, profile?.full_name ?? '').catch((err) => {
          console.error('[OCTOPILOT] Welcome email failed:', err);
        });
      }

      const destination = profile?.onboarding_completed ? '/dashboard' : '/onboarding';
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
