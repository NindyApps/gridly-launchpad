"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { IntentSignal } from '@/types/app';
import { useState, useCallback } from 'react';

const PAGE_SIZE = 50;

export function useSignals(workspaceId: string | null) {
  const supabase = createClient();
  const [page, setPage] = useState(1);

  const { data: queryResult = { signals: [] as IntentSignal[], hasMore: false }, isLoading, error } = useQuery({
    queryKey: ['signals', workspaceId, page],
    queryFn: async () => {
      if (!workspaceId) return { signals: [] as IntentSignal[], hasMore: false };
      const { data, error } = await supabase
        .from('intent_signals')
        .select('*')
        .eq('workspace_id', workspaceId)
        .eq('dismissed', false)
        .order('confidence_score', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(page * PAGE_SIZE + 1);
      if (error) throw error;
      const all = (data ?? []) as IntentSignal[];
      const limit = page * PAGE_SIZE;
      return {
        signals: all.slice(0, limit),
        hasMore: all.length > limit,
      };
    },
    enabled: !!workspaceId,
  });

  const { signals, hasMore } = queryResult;

  const loadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  return { signals, isLoading, error, hasMore, loadMore };
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

export function useInjectToSalesforce() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ signalId }: { signalId: string }) => {
      const res = await fetch('/api/crm/salesforce/inject', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signalId }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to inject to Salesforce');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] });
    },
  });
}

export function useFeedback() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ signalId, feedbackType }: { signalId: string; feedbackType: 'useful' | 'not_useful' }) => {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signal_id: signalId, feedback_type: feedbackType }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Feedback failed');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['signals'] });
    },
  });
}
