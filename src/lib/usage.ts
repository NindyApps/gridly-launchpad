import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

export interface WorkspaceUsage {
  signals_this_month: number;
  active_trackers: number;
  members: number;
}

export async function getWorkspaceUsage(
  workspaceId: string,
  supabase: SupabaseClient<Database>
): Promise<WorkspaceUsage> {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const [signalsResult, trackersResult, membersResult] = await Promise.all([
    supabase
      .from('intent_signals')
      .select('id', { count: 'exact', head: true })
      .eq('workspace_id', workspaceId)
      .gte('created_at', startOfMonth.toISOString()),
    supabase
      .from('trackers')
      .select('id', { count: 'exact', head: true })
      .eq('workspace_id', workspaceId)
      .eq('is_active', true),
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('workspace_id', workspaceId),
  ]);

  return {
    signals_this_month: signalsResult.count ?? 0,
    active_trackers: trackersResult.count ?? 0,
    members: membersResult.count ?? 0,
  };
}
