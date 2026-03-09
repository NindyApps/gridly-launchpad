"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { IntentSignal } from '@/types/app';
import { ExternalLink, X, Zap, AlertTriangle, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const intentColors = {
  high: 'bg-red-500/10 text-red-400 border-red-500/20',
  medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  low: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
};

const urgencyIcons = {
  urgent: <AlertTriangle className="h-3 w-3" />,
  standard: <Clock className="h-3 w-3" />,
  monitor: <Clock className="h-3 w-3" />,
};

const platformLabels: Record<string, string> = {
  reddit: 'Reddit',
  hackernews: 'Hacker News',
  slack: 'Slack',
};

interface SignalCardProps {
  signal: IntentSignal;
  onDismiss?: (id: string) => void;
  onInjectCRM?: (id: string) => void;
  isDismissing?: boolean;
  isInjecting?: boolean;
}

export function SignalCard({
  signal,
  onDismiss,
  onInjectCRM,
  isDismissing,
  isInjecting,
}: SignalCardProps) {
  return (
    <Card
      className="border border-white/10 bg-white/5 backdrop-blur-sm transition-all hover:border-indigo-500/30 hover:bg-white/8"
      data-testid={`signal-card-${signal.id}`}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="text-xs capitalize">
              {platformLabels[signal.platform] || signal.platform}
            </Badge>
            <Badge className={`text-xs border ${intentColors[signal.intent_level]}`}>
              {signal.intent_level} intent
            </Badge>
            <Badge variant="outline" className="text-xs flex items-center gap-1">
              {urgencyIcons[signal.urgency_tag]}
              {signal.urgency_tag}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {Math.round(signal.confidence_score * 100)}% confidence
            </span>
          </div>
          <button
            onClick={() => onDismiss?.(signal.id)}
            disabled={isDismissing}
            className="text-muted-foreground hover:text-foreground shrink-0"
            data-testid={`dismiss-signal-${signal.id}`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-foreground leading-relaxed">{signal.ai_summary}</p>

        {signal.suggested_opener && (
          <div className="rounded-md border border-indigo-500/20 bg-indigo-500/5 p-3">
            <p className="text-xs text-muted-foreground mb-1">Suggested opener</p>
            <p className="text-sm text-indigo-300 italic">"{signal.suggested_opener}"</p>
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {signal.author_handle && <span>@{signal.author_handle}</span>}
            {signal.pain_domain && <span className="capitalize">{signal.pain_domain}</span>}
            <span>{formatDistanceToNow(new Date(signal.created_at), { addSuffix: true })}</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={signal.post_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              Source <ExternalLink className="h-3 w-3" />
            </a>
            {!signal.crm_injected && (
              <Button
                size="sm"
                variant="outline"
                className="h-7 text-xs border-indigo-500/40 text-indigo-400 hover:bg-indigo-500/10"
                onClick={() => onInjectCRM?.(signal.id)}
                disabled={isInjecting}
                data-testid={`inject-crm-${signal.id}`}
              >
                <Zap className="h-3 w-3 mr-1" />
                {isInjecting ? 'Injecting...' : 'Push to CRM'}
              </Button>
            )}
            {signal.crm_injected && (
              <Badge className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                ✓ In CRM
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
