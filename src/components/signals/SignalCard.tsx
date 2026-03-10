"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, Zap, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Copy, Check, Cloud } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { IntentSignal } from '@/types/app';

const INTENT_BORDER: Record<string, string> = {
  high: '#DC2626',
  medium: '#D97706',
  low: '#64748B',
};

const INTENT_LABEL: Record<string, string> = {
  high: 'High',
  medium: 'Med',
  low: 'Low',
};

function getConfidenceStyle(score: number) {
  if (score > 0.8) return { bg: 'bg-green-500/15 text-green-400', label: `High ${score.toFixed(2)}` };
  if (score >= 0.6) return { bg: 'bg-amber-500/15 text-amber-400', label: `Med ${score.toFixed(2)}` };
  return { bg: 'bg-slate-500/20 text-slate-400', label: `Low ${score.toFixed(2)}` };
}

function extractSubreddit(url: string): string | null {
  const match = url.match(/reddit\.com\/r\/([^/]+)/i);
  return match ? match[1] : null;
}

function PlatformBadge({ platform, postUrl }: { platform: string; postUrl: string }) {
  if (platform === 'reddit') {
    const sub = extractSubreddit(postUrl);
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-2 py-0.5 text-xs font-medium text-orange-400">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">r</span>
        {sub ? `r/${sub}` : 'Reddit'}
      </span>
    );
  }
  if (platform === 'hackernews') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-2 py-0.5 text-xs font-medium text-orange-400">
        <span className="flex h-4 w-4 items-center justify-center rounded bg-orange-500 text-[10px] font-bold text-white">Y</span>
        Hacker News
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-white/5 px-2 py-0.5 text-xs text-zinc-300 capitalize">
      {platform}
    </span>
  );
}

interface SignalCardProps {
  signal: IntentSignal;
  onDismiss?: (id: string) => void;
  onInjectCRM?: (id: string) => void;
  onInjectSF?: (id: string) => void;
  onFeedback?: (id: string, type: 'useful' | 'not_useful') => void;
  isDismissing?: boolean;
  isInjecting?: boolean;
  isInjectingSF?: boolean;
  sfConnected?: boolean;
}

export function SignalCard({
  signal,
  onDismiss,
  onInjectCRM,
  onInjectSF,
  onFeedback,
  isDismissing,
  isInjecting,
  isInjectingSF,
  sfConnected,
}: SignalCardProps) {
  const { toast } = useToast();
  const [openerOpen, setOpenerOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);

  const conf = getConfidenceStyle(signal.confidence_score);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => onDismiss?.(signal.id), 300);
  };

  const handleNotUseful = () => {
    onFeedback?.(signal.id, 'not_useful');
    setVisible(false);
    setTimeout(() => onDismiss?.(signal.id), 300);
  };

  const handleCopyOpener = async () => {
    if (!signal.suggested_opener) return;
    await navigator.clipboard.writeText(signal.suggested_opener);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copied to clipboard' });
  };

  const handleInject = () => {
    if (!signal.crm_injected) {
      onInjectCRM?.(signal.id);
    }
  };

  const categoryLabel = signal.intent_category.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          layout
          initial={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="overflow-hidden"
          data-testid={`signal-card-${signal.id}`}
        >
          <div
            className="rounded-xl border border-border bg-background hover:border-border transition-colors"
            style={{ borderLeft: `4px solid ${INTENT_BORDER[signal.intent_level] ?? '#64748B'}` }}
          >
            <div className="p-4 space-y-3">
              {/* Header row */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <PlatformBadge platform={signal.platform} postUrl={signal.post_url} />
                  <span className="text-xs text-zinc-500">
                    {formatDistanceToNow(new Date(signal.created_at), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {signal.urgency_tag === 'urgent' && (
                    <span className="rounded-full bg-red-500/20 border border-red-500/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-red-400">
                      URGENT
                    </span>
                  )}
                  <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', conf.bg)}>
                    {conf.label}
                  </span>
                  <button
                    onClick={handleDismiss}
                    disabled={isDismissing}
                    className="ml-1 text-zinc-500 hover:text-zinc-300 transition-colors"
                    data-testid={`dismiss-signal-${signal.id}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {signal.pain_domain && (
                  <span className="rounded-full bg-white/5 border border-border px-2 py-0.5 text-[11px] text-zinc-400">
                    {signal.pain_domain}
                  </span>
                )}
                <span className="rounded-full bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 text-[11px] text-indigo-400">
                  {categoryLabel}
                </span>
              </div>

              {/* AI Summary */}
              <p className="text-sm text-zinc-200 leading-relaxed">{signal.ai_summary}</p>

              {/* Collapsible opener */}
              {signal.suggested_opener && (
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5">
                  <button
                    className="flex w-full items-center justify-between px-3 py-2 text-xs text-indigo-400 hover:text-indigo-300"
                    onClick={() => setOpenerOpen(!openerOpen)}
                    data-testid={`toggle-opener-${signal.id}`}
                  >
                    <span className="font-medium">Suggested outreach opener</span>
                    {openerOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>
                  <AnimatePresence>
                    {openerOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 space-y-2">
                          <p className="text-sm text-zinc-300 italic leading-relaxed">
                            &ldquo;{signal.suggested_opener}&rdquo;
                          </p>
                          <button
                            onClick={handleCopyOpener}
                            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                            data-testid={`copy-opener-${signal.id}`}
                          >
                            {copied ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                            {copied ? 'Copied!' : 'Copy'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Action row */}
              <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <a
                    href={signal.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                    data-testid={`view-source-${signal.id}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Source
                  </a>

                  {signal.crm_injected ? (
                    <span className="inline-flex items-center gap-1 text-xs text-green-400 font-medium">
                      <Zap className="h-3.5 w-3.5" /> HubSpot ✓
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      className="h-7 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3"
                      onClick={handleInject}
                      disabled={isInjecting}
                      data-testid={`inject-crm-${signal.id}`}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      {isInjecting ? 'Injecting...' : 'HubSpot'}
                    </Button>
                  )}

                  {sfConnected && (
                    signal.sf_injected_at ? (
                      <a
                        href={signal.sf_record_url ?? '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium"
                        style={{ color: '#00A1E0' }}
                        data-testid={`sf-injected-badge-${signal.id}`}
                      >
                        <Cloud className="h-3.5 w-3.5" /> Pushed ✓
                      </a>
                    ) : (
                      <Button
                        size="sm"
                        className="h-7 text-white text-xs px-3"
                        style={{ background: '#00A1E0' }}
                        onClick={() => onInjectSF?.(signal.id)}
                        disabled={isInjectingSF}
                        data-testid={`inject-sf-${signal.id}`}
                      >
                        <Cloud className="h-3 w-3 mr-1" />
                        {isInjectingSF ? 'Pushing...' : 'Salesforce'}
                      </Button>
                    )
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onFeedback?.(signal.id, 'useful')}
                    className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:text-green-400 hover:bg-green-500/10 transition-colors"
                    data-testid={`feedback-useful-${signal.id}`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Useful
                  </button>
                  <button
                    onClick={handleNotUseful}
                    className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                    data-testid={`feedback-not-useful-${signal.id}`}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                    Not Useful
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
