"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ExternalLink, X, Zap, ThumbsUp, ThumbsDown, ChevronDown, ChevronUp, Copy, Check, Cloud } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { IntentSignal } from '@/types/app';

const INTENT_BORDER: Record<string, string> = {
  high: '#F87171',
  medium: '#FBBF24',
  low: '#606060',
};

function getConfidenceStyle(score: number) {
  if (score > 0.8) return { 
    bg: 'rgba(74, 222, 128, 0.12)', 
    border: 'rgba(74, 222, 128, 0.2)',
    color: '#4ADE80'
  };
  if (score >= 0.6) return { 
    bg: 'rgba(251, 191, 36, 0.12)', 
    border: 'rgba(251, 191, 36, 0.2)',
    color: '#FBBF24'
  };
  return { 
    bg: '#1A1A1A', 
    border: '#2A2A2A',
    color: '#606060'
  };
}

function extractSubreddit(url: string): string | null {
  const match = url.match(/reddit\.com\/r\/([^/]+)/i);
  return match ? match[1] : null;
}

function PlatformBadge({ platform, postUrl }: { platform: string; postUrl: string }) {
  if (platform === 'reddit') {
    const sub = extractSubreddit(postUrl);
    return (
      <span 
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
        style={{ 
          background: 'rgba(255, 69, 0, 0.12)', 
          color: '#FF4500',
          border: '1px solid rgba(255, 69, 0, 0.2)'
        }}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF4500] text-[10px] font-bold text-white">r</span>
        {sub ? `r/${sub}` : 'Reddit'}
      </span>
    );
  }
  if (platform === 'hackernews') {
    return (
      <span 
        className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium"
        style={{ 
          background: 'rgba(255, 102, 0, 0.12)', 
          color: '#FF6600',
          border: '1px solid rgba(255, 102, 0, 0.2)'
        }}
      >
        <span className="flex h-4 w-4 items-center justify-center rounded bg-[#FF6600] text-[10px] font-bold text-white">Y</span>
        Hacker News
      </span>
    );
  }
  return (
    <span 
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs capitalize"
      style={{ background: '#1A1A1A', color: '#A0A0A0', border: '1px solid #2A2A2A' }}
    >
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
  hubspotConnected?: boolean;
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
  hubspotConnected,
  sfConnected,
}: SignalCardProps) {
  const { toast } = useToast();
  const router = useRouter();
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
            className="rounded-[16px] transition-all duration-200 hover:border-[#3A3A3A]"
            style={{ 
              background: '#111111', 
              border: '1px solid #2A2A2A',
              borderLeft: `4px solid ${INTENT_BORDER[signal.intent_level] ?? '#606060'}`,
            }}
          >
            <div className="p-5 space-y-3">
              {/* Header row */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 flex-wrap">
                  <PlatformBadge platform={signal.platform} postUrl={signal.post_url} />
                  {signal.is_demo && (
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span 
                            className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium cursor-default"
                            style={{ background: '#1A1A1A', color: '#606060', border: '1px solid #2A2A2A' }}
                            data-testid={`demo-badge-${signal.id}`}
                          >
                            Demo
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs text-xs">
                          This is a sample signal. Real signals will appear within 15 minutes.
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                  <span className="text-xs" style={{ color: '#606060' }}>
                    {formatDistanceToNow(new Date(signal.created_at), { addSuffix: true })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {signal.urgency_tag === 'urgent' && (
                    <span 
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                      style={{ 
                        background: 'rgba(248, 113, 113, 0.12)', 
                        color: '#F87171',
                        border: '1px solid rgba(248, 113, 113, 0.2)'
                      }}
                    >
                      URGENT
                    </span>
                  )}
                  <span 
                    className="rounded-full px-2 py-0.5 text-xs font-mono"
                    style={{ background: conf.bg, color: conf.color, border: `1px solid ${conf.border}` }}
                  >
                    {Math.round(signal.confidence_score * 100)}%
                  </span>
                  <button
                    onClick={handleDismiss}
                    disabled={isDismissing}
                    className="ml-1 text-[#606060] hover:text-[#F0F0F0] transition-colors opacity-0 group-hover:opacity-100"
                    style={{ opacity: 1 }}
                    data-testid={`dismiss-signal-${signal.id}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {signal.pain_domain && (
                  <span 
                    className="rounded-[6px] px-2 py-0.5 text-[11px]"
                    style={{ background: '#1A1A1A', color: '#A0A0A0', border: '1px solid #2A2A2A' }}
                  >
                    {signal.pain_domain}
                  </span>
                )}
                <span 
                  className="rounded-[6px] px-2 py-0.5 text-[11px]"
                  style={{ background: 'rgba(0, 201, 106, 0.08)', color: '#00C96A', border: '1px solid rgba(0, 201, 106, 0.2)' }}
                >
                  {categoryLabel}
                </span>
              </div>

              {/* AI Summary */}
              <p className="text-sm leading-relaxed" style={{ color: '#F0F0F0' }}>{signal.ai_summary}</p>

              {/* Collapsible opener */}
              {signal.suggested_opener && (
                <div 
                  className="rounded-[6px]"
                  style={{ background: 'rgba(0, 201, 106, 0.05)', border: '1px solid rgba(0, 201, 106, 0.2)' }}
                >
                  <button
                    className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium transition-colors"
                    style={{ color: '#00C96A' }}
                    onClick={() => setOpenerOpen(!openerOpen)}
                    data-testid={`toggle-opener-${signal.id}`}
                  >
                    <span>Suggested opener</span>
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
                        <div 
                          className="mx-3 mb-3 p-3 rounded-[6px] relative"
                          style={{ background: '#1A1A1A', borderLeft: '3px solid #00C96A' }}
                        >
                          <p className="text-sm italic leading-relaxed pr-12" style={{ color: '#A0A0A0' }}>
                            &ldquo;{signal.suggested_opener}&rdquo;
                          </p>
                          <button
                            onClick={handleCopyOpener}
                            className="absolute top-2 right-2 flex items-center gap-1 text-xs transition-colors"
                            style={{ color: '#00C96A' }}
                            data-testid={`copy-opener-${signal.id}`}
                          >
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
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
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={signal.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs transition-colors"
                    style={{ color: '#606060' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#F0F0F0'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#606060'}
                    data-testid={`view-source-${signal.id}`}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    View Source
                  </a>

                  {/* HubSpot inject */}
                  {signal.crm_injected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: '#4ADE80' }}>
                      <Zap className="h-3.5 w-3.5" /> HubSpot ✓
                    </span>
                  ) : hubspotConnected ? (
                    <Button
                      size="sm"
                      className="h-7 text-white text-xs px-3 font-semibold gradient-primary hover:opacity-85"
                      onClick={handleInject}
                      disabled={isInjecting}
                      data-testid={`inject-crm-${signal.id}`}
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      {isInjecting ? 'Injecting...' : 'HubSpot'}
                    </Button>
                  ) : (
                    <button
                      onClick={() => router.push('/settings/crm')}
                      className="text-xs underline underline-offset-2 cursor-pointer transition-colors"
                      style={{ color: '#606060' }}
                      data-testid={`connect-hubspot-hint-${signal.id}`}
                    >
                      Connect HubSpot
                    </button>
                  )}

                  {/* Salesforce inject */}
                  {signal.sf_injected_at ? (
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
                  ) : sfConnected ? (
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
                  ) : (
                    <button
                      onClick={() => router.push('/settings/crm')}
                      className="text-xs underline underline-offset-2 cursor-pointer transition-colors"
                      style={{ color: '#606060' }}
                      data-testid={`connect-sf-hint-${signal.id}`}
                    >
                      Connect Salesforce
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onFeedback?.(signal.id, 'useful')}
                    className="flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
                    style={{ color: '#606060' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#4ADE80';
                      e.currentTarget.style.background = 'rgba(74, 222, 128, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#606060';
                      e.currentTarget.style.background = 'transparent';
                    }}
                    data-testid={`feedback-useful-${signal.id}`}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Useful
                  </button>
                  <button
                    onClick={handleNotUseful}
                    className="flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
                    style={{ color: '#606060' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#F87171';
                      e.currentTarget.style.background = 'rgba(248, 113, 113, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#606060';
                      e.currentTarget.style.background = 'transparent';
                    }}
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
