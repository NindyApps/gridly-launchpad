import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { seedDemoSignals } from '@/lib/seed-signals';

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 403 });
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

  if (!profile?.workspace_id) {
    return NextResponse.json({ error: 'No workspace found' }, { status: 404 });
  }

  const { data: trackers } = await supabase
    .from('trackers')
    .select('id')
    .eq('workspace_id', profile.workspace_id)
    .limit(1);

  if (!trackers || trackers.length === 0) {
    return NextResponse.json({ error: 'Create at least one tracker first' }, { status: 400 });
  }

  try {
    const seeded = await seedDemoSignals(profile.workspace_id, trackers[0].id);
    return NextResponse.json({ success: true, count: seeded?.length ?? 0 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Seed failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
