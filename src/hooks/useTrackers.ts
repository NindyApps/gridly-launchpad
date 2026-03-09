"use client";

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import type { Tracker } from '@/types/app';

export type CreateTrackerInput = {
  workspace_id: string;
  name: string;
  keywords: string[];
  competitor_names: string[];
  subreddits: string[];
  platforms: string[];
  is_active: boolean;
  confidence_override: number | null;
};

export function useTrackers(workspaceId: string | null) {
  const supabase = createClient();

  const { data: trackers = [], isLoading, error } = useQuery({
    queryKey: ['trackers', workspaceId],
    queryFn: async () => {
      if (!workspaceId) return [];
      const { data, error } = await supabase
        .from('trackers')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Tracker[];
    },
    enabled: !!workspaceId,
  });

  return { trackers, isLoading, error };
}

export function useCreateTracker() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreateTrackerInput) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('trackers')
        .insert({ ...input, created_by: user.id })
        .select()
        .single();
      if (error) throw error;
      return data as Tracker;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trackers', data.workspace_id] });
    },
  });
}

export function useUpdateTracker() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, workspace_id, ...updates }: Partial<Omit<Tracker, 'created_by'>> & { id: string; workspace_id: string }) => {
      const { data, error } = await supabase
        .from('trackers')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data as Tracker;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['trackers', data.workspace_id] });
    },
  });
}

export function useDeleteTracker() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, workspaceId }: { id: string; workspaceId: string }) => {
      const { error } = await supabase.from('trackers').delete().eq('id', id);
      if (error) throw error;
      return workspaceId;
    },
    onSuccess: (workspaceId) => {
      queryClient.invalidateQueries({ queryKey: ['trackers', workspaceId] });
    },
  });
}
