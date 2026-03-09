"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { IntentSignal, SignalFeedFilters } from '@/types/app';

export function useSignals(workspaceId: string | null, filters: SignalFeedFilters = {}) {
  const supabase = createClient();

  const { data: signals = [], isLoading, error } = useQuery({
    queryKey: ['signals', workspaceId, filters],
    queryFn: async () => {
      if (!workspaceId) return [];

      let query = supabase
        .from('intent_signals')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false });

      if (filters.intent_level && filters.intent_level !== 'all') {
        query = query.eq('intent_level', filters.intent_level);
      }
      if (filters.intent_category && filters.intent_category !== 'all') {
        query = query.eq('intent_category', filters.intent_category);
      }
      if (filters.platform && filters.platform !== 'all') {
        query = query.eq('platform', filters.platform);
      }
      if (filters.tracker_id && filters.tracker_id !== 'all') {
        query = query.eq('tracker_id', filters.tracker_id);
      }
      if (typeof filters.dismissed === 'boolean') {
        query = query.eq('dismissed', filters.dismissed);
      }
      if (typeof filters.crm_injected === 'boolean') {
        query = query.eq('crm_injected', filters.crm_injected);
      }

      const { data, error } = await query.limit(100);
      if (error) throw error;
      return (data ?? []) as IntentSignal[];
    },
    enabled: !!workspaceId,
    refetchInterval: 30000,
  });

  return { signals, isLoading, error };
}

export function useDismissSignal() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (signalId: string) => {
      const { error } = await supabase
        .from('intent_signals')
        .update({ dismissed: true })
        .eq('id', signalId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] });
    },
  });
}

export function useInjectToCRM() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ signalId, workspaceId }: { signalId: string; workspaceId: string }) => {
      const res = await fetch('/api/crm/hubspot/inject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signal_id: signalId, workspace_id: workspaceId }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to inject to CRM');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] });
    },
  });
}
