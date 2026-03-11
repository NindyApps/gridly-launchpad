"use client";

import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { createClient } from '@/lib/supabase/client';
import { SignalCard } from './SignalCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { useSignals, useDismissSignal, useInjectToCRM, useInjectToSalesforce, useFeedback } from '@/hooks/useSignals';
import { useTrackers } from '@/hooks/useTrackers';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import type { IntentSignal, SignalFeedFilters, SignalSort } from '@/types/app';
import { Radio, RefreshCw, Inbox, Bell } from 'lucide-react';
import Link from 'next/link';

function applyFilters(signals: IntentSignal[], filters: SignalFeedFilters): IntentSignal[] {
  let result = [...signals];

  if (filters.intent_level && filters.intent_level !== 'all') {
    result = result.filter((s) => s.intent_level === filters.intent_level);
  }
  if (filters.intent_category && filters.intent_category !== 'all') {
    result = result.filter((s) => s.intent_category === filters.intent_category);
  }
  if (filters.platform && filters.platform !== 'all') {
    result = result.filter((s) => s.platform === filters.platform);
  }
  if (filters.tracker_id && filters.tracker_id !== 'all') {
    result = result.filter((s) => s.tracker_id === filters.tracker_id);
  }
  if (filters.urgent_only) {
    result = result.filter((s) => s.urgency_tag === 'urgent');
  }

  const sort: SignalSort = filters.sort ?? 'confidence_desc';
  if (sort === 'confidence_desc') {
    result.sort((a, b) => b.confidence_score - a.confidence_score);
  } else if (sort === 'newest') {
    result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } else if (sort === 'oldest') {
    result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  return result;
}

function SignalSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-background p-4 space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32 rounded-full bg-white/5" />
        <Skeleton className="h-5 w-20 rounded-full bg-white/5" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-4 w-20 rounded-full bg-white/5" />
        <Skeleton className="h-4 w-24 rounded-full bg-white/5" />
      </div>
      <Skeleton className="h-4 w-full bg-white/5" />
      <Skeleton className="h-4 w-3/4 bg-white/5" />
      <div className="flex justify-between pt-1">
        <Skeleton className="h-7 w-24 rounded bg-white/5" />
        <Skeleton className="h-7 w-32 rounded bg-white/5" />
      </div>
    </div>
  );
}

interface SignalFeedProps {
  workspaceId: string | null;
  filters: SignalFeedFilters;
  onResultCount?: (count: number) => void;
}

export function SignalFeed({ workspaceId, filters, onResultCount }: SignalFeedProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const { signals, isLoading } = useSignals(workspaceId);
  const { trackers } = useTrackers(workspaceId);
  const { workspace } = useAuth();
  const dismissSignal = useDismissSignal();
  const injectCRM = useInjectToCRM();
  const injectSF = useInjectToSalesforce();
  const feedback = useFeedback();

  const sfConnected = !!workspace?.sf_access_token_enc;

  const [newCount, setNewCount] = useState(0);
  const [injectingId, setInjectingId] = useState<string | null>(null);
  const [injectingSFId, setInjectingSFId] = useState<string | null>(null);

  const filtered = applyFilters(signals, filters);

  useEffect(() => {
    onResultCount?.(filtered.length);
  }, [filtered.length]);

  useEffect(() => {
    if (!workspaceId) return;

    channelRef.current = supabase
      .channel(`signals:${workspaceId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'intent_signals',
          filter: `workspace_id=eq.${workspaceId}`,
        },
        () => {
          setNewCount((n) => n + 1);
        }
      )
      .subscribe();

    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [workspaceId]);

  const handleRefreshNew = () => {
    setNewCount(0);
    queryClient.invalidateQueries({ queryKey: ['signals', workspaceId] });
  };

  const handleInject = async (signalId: string) => {
    if (!workspaceId) return;
    setInjectingId(signalId);
    try {
      await injectCRM.mutateAsync({ signalId, workspaceId });
      toast({ title: 'Injected to HubSpot', description: 'Signal created as a task in CRM.' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      if (msg === 'reconnect_required') {
        toast({
          title: 'Security upgrade required',
          description: (
            <>
              Please reconnect HubSpot in{' '}
              <Link href="/settings/crm" className="underline font-medium">
                Settings → CRM
              </Link>
            </>
          ),
          variant: 'destructive',
        });
      } else if (msg.includes('CRM') || msg.includes('HubSpot') || msg.includes('connect')) {
        toast({
          title: 'HubSpot not connected',
          description: 'Connect HubSpot first in Settings → CRM.',
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Inject failed', description: msg, variant: 'destructive' });
      }
    } finally {
      setInjectingId(null);
    }
  };

  const handleInjectSF = async (signalId: string) => {
    setInjectingSFId(signalId);
    try {
      await injectSF.mutateAsync({ signalId });
      toast({ title: 'Pushed to Salesforce', description: 'Signal created as a record in Salesforce.' });
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      if (msg === 'reconnect_required') {
        toast({
          title: 'Security upgrade required',
          description: (
            <>
              Please reconnect Salesforce in{' '}
              <Link href="/settings/crm" className="underline font-medium">
                Settings → CRM
              </Link>
            </>
          ),
          variant: 'destructive',
        });
      } else {
        toast({ title: 'Salesforce inject failed', description: msg, variant: 'destructive' });
      }
    } finally {
      setInjectingSFId(null);
    }
  };

  const handleFeedback = async (signalId: string, type: 'useful' | 'not_useful') => {
    try {
      await feedback.mutateAsync({ signalId, feedbackType: type });
    } catch {
      // silent
    }
  };

  const handleDismiss = (signalId: string) => {
    dismissSignal.mutate(signalId);
  };

  if (isLoading) {
    return (
      <div className="space-y-3 p-4">
        {[1, 2, 3].map((i) => <SignalSkeleton key={i} />)}
      </div>
    );
  }

  const hasTrackers = trackers.length > 0;

  if (!hasTrackers) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-4">
          <Radio className="h-6 w-6 text-indigo-400" />
        </div>
        <h3 className="text-base font-semibold text-white mb-2">No trackers set up</h3>
        <p className="text-sm text-zinc-400 max-w-xs mb-5">
          Create your first tracker to start monitoring buying signals on Reddit and Hacker News.
        </p>
        <Link href="/trackers">
          <Button className="bg-indigo-600 hover:bg-indigo-700">
            Create your first tracker
          </Button>
        </Link>
      </div>
    );
  }

  if (signals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="h-12 w-12 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
          <Bell className="h-6 w-6 text-zinc-500" />
        </div>
        <h3 className="text-base font-semibold text-white mb-2">Monitoring in progress</h3>
        <p className="text-sm text-zinc-400 max-w-xs">
          Signals appear within 15 minutes. Your trackers are actively monitoring Reddit and Hacker News.
        </p>
      </div>
    );
  }

  if (filtered.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center mb-3">
          <Inbox className="h-5 w-5 text-zinc-500" />
        </div>
        <h3 className="text-sm font-medium text-white mb-1">No signals match your filters</h3>
        <p className="text-xs text-zinc-500">Try adjusting or clearing the active filters.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {newCount > 0 && (
        <button
          onClick={handleRefreshNew}
          className="w-full flex items-center justify-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 py-2 text-sm text-indigo-400 hover:bg-indigo-500/20 transition-colors"
          data-testid="new-signals-banner"
        >
          <RefreshCw className="h-4 w-4" />
          {newCount} new signal{newCount !== 1 ? 's' : ''} — click to refresh
        </button>
      )}

      {filtered.map((signal) => (
        <SignalCard
          key={signal.id}
          signal={signal}
          onDismiss={handleDismiss}
          onInjectCRM={handleInject}
          onInjectSF={handleInjectSF}
          onFeedback={handleFeedback}
          isDismissing={dismissSignal.isPending}
          isInjecting={injectingId === signal.id}
          isInjectingSF={injectingSFId === signal.id}
          sfConnected={sfConnected}
        />
      ))}
    </div>
  );
}
