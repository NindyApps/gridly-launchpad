import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { fetchRedditPosts } from './scrapers/reddit';
import { fetchHNPosts } from './scrapers/hackernews';
import { classifySignal } from './openai';
import { sendAlertNotification } from './notifications';
import type { IntentSignal, Workspace, Tracker } from '@/types/app';
import { DAILY_LIMITS } from '@/lib/constants/plans';

type SupabaseAdmin = ReturnType<typeof createClient<Database>>;

export function createAdminClient(): SupabaseAdmin {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

interface IngestionResult {
  found: number;
  saved: number;
  trackerId: string;
}

export async function runIngestionForTracker(
  trackerId: string,
  supabaseAdmin: SupabaseAdmin
): Promise<IngestionResult> {
  const { data: rawTracker } = await supabaseAdmin
    .from('trackers')
    .select('*')
    .eq('id', trackerId)
    .single();

  const tracker = rawTracker as unknown as Tracker | null;

  if (!tracker || !tracker.is_active) {
    return { found: 0, saved: 0, trackerId };
  }

  const { data: rawWorkspace } = await supabaseAdmin
    .from('workspaces')
    .select('*')
    .eq('id', tracker.workspace_id)
    .single();

  const workspace = rawWorkspace as unknown as Workspace | null;

  const { data: adminUserRaw } = await supabaseAdmin
    .from('profiles')
    .select('id')
    .eq('workspace_id', tracker.workspace_id)
    .eq('role', 'admin')
    .limit(1)
    .single();

  const adminUser = adminUserRaw as unknown as { id: string } | null;

  let adminEmail: string | undefined;
  if (adminUser) {
    const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(adminUser.id);
    adminEmail = authUser?.user?.email ?? undefined;
  }

  const platforms: string[] = tracker.platforms ?? ['reddit', 'hackernews'];
  const keywords: string[] = tracker.keywords ?? [];
  const subreddits: string[] = tracker.subreddits ?? [];
  const competitors: string[] = tracker.competitor_names ?? [];

  type RawPost = {
    id: string;
    title: string;
    body: string;
    url: string;
    author: string;
    created_at: string;
    subreddit: string;
    platform: 'reddit' | 'hackernews';
  };

  const rawPosts: RawPost[] = [];

  if (platforms.includes('reddit')) {
    for (const sub of subreddits) {
      const posts = await fetchRedditPosts(sub, keywords);
      rawPosts.push(...posts);
    }
  }

  if (platforms.includes('hackernews')) {
    const posts = await fetchHNPosts(keywords);
    rawPosts.push(...posts);
  }

  const dailyLimit = DAILY_LIMITS[workspace?.plan ?? 'pro'] ?? 500;

  const found = rawPosts.length;
  let saved = 0;

  for (const post of rawPosts) {
    // Check daily classification budget before each call to avoid overruns mid-batch
    const todayStart = new Date().toISOString().split('T')[0] + 'T00:00:00.000Z';
    const { count: todayCount } = await supabaseAdmin
      .from('intent_signals')
      .select('*', { count: 'exact', head: true })
      .eq('workspace_id', tracker.workspace_id)
      .gte('created_at', todayStart);

    if ((todayCount ?? 0) >= dailyLimit) {
      console.warn(`[OCTOPILOT] Workspace hit daily limit (${dailyLimit}), skipping remaining posts`);
      break;
    }

    const { data: existing } = await supabaseAdmin
      .from('intent_signals')
      .select('id')
      .eq('workspace_id', tracker.workspace_id)
      .eq('post_url', post.url)
      .maybeSingle();

    if (existing) continue;

    let classification;
    try {
      classification = await classifySignal({
        post_title: post.title,
        post_body: post.body,
        platform: post.platform,
        tracker_keywords: keywords,
        competitor_names: competitors,
      });
    } catch (err) {
      console.error('[OCTOPILOT] OpenAI classify error:', err);
      continue;
    }

    if (!classification.is_signal) continue;

    const confidenceThreshold = tracker.confidence_override ?? 0.5;
    if (classification.confidence_score < confidenceThreshold) continue;

    const insertData = {
      workspace_id: tracker.workspace_id,
      tracker_id: trackerId,
      platform: post.platform,
      post_url: post.url,
      author_handle: post.author,
      post_timestamp: post.created_at,
      intent_category: classification.intent_category,
      intent_level: classification.intent_level,
      confidence_score: classification.confidence_score,
      pain_domain: classification.pain_domain,
      ai_summary: classification.ai_summary,
      suggested_opener: classification.suggested_opener,
      urgency_tag: classification.urgency_tag,
      crm_injected: false,
      dismissed: false,
    };

    const { data: insertedRaw, error: insertError } = await supabaseAdmin
      .from('intent_signals')
      .insert(insertData)
      .select()
      .single();

    if (insertError) {
      console.error('[OCTOPILOT] Insert signal error:', insertError.message);
      continue;
    }

    const inserted = insertedRaw as unknown as IntentSignal;
    saved++;
    

    if (workspace) {
      try {
        await sendAlertNotification(inserted, workspace, adminEmail);
      } catch (err) {
        console.error('[OCTOPILOT] Alert notification error:', err);
      }
    }
  }

  
  return { found, saved, trackerId };
}

export async function runIngestionForAllTrackers(
  supabaseAdmin: SupabaseAdmin
): Promise<{ processed: number; saved: number }> {
  const { data: rawTrackers } = await supabaseAdmin
    .from('trackers')
    .select('id')
    .eq('is_active', true);

  const trackers = rawTrackers as unknown as Array<{ id: string }> | null;

  if (!trackers || trackers.length === 0) {
    return { processed: 0, saved: 0 };
  }

  let totalSaved = 0;

  for (const tracker of trackers) {
    const result = await runIngestionForTracker(tracker.id, supabaseAdmin);
    totalSaved += result.saved;
  }

  return { processed: trackers.length, saved: totalSaved };
}
