"use client";

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { PLANS, UNLIMITED_THRESHOLD } from '@/lib/constants/plans';
import { Skeleton } from '@/components/ui/skeleton';
import type { WorkspacePlan } from '@/types/app';

interface UsageData {
  signals_this_month: number;
  active_trackers: number;
  members: number;
}

export default function BillingSettingsPage() {
  return (
    <Suspense>
      <BillingContent />
    </Suspense>
  );
}

function BillingContent() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { workspace, isLoading } = useAuth();

  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [usage, setUsage] = useState<UsageData | null>(null);

  const currentPlan: WorkspacePlan = workspace?.plan ?? 'pro';
  const planConfig = PLANS[currentPlan];
  const signalLimit = planConfig?.limits.signals ?? 500;
  const seatLimit = planConfig?.limits.members ?? 5;

  const fetchUsage = useCallback(async () => {
    try {
      const res = await fetch('/api/billing/usage');
      if (res.ok) setUsage(await res.json());
    } catch {
    }
  }, []);

  useEffect(() => {
    if (!isLoading) fetchUsage();
  }, [isLoading, fetchUsage]);

  useEffect(() => {
    const success = searchParams.get('success');
    const canceled = searchParams.get('canceled');
    const plan = searchParams.get('plan');

    if (success === 'true') {
      toast({
        title: 'Subscription activated!',
        description: plan ? `You are now on the ${plan} plan.` : 'Your subscription is now active.',
      });
      router.replace('/settings/billing');
    } else if (canceled === 'true') {
      toast({ title: 'Checkout canceled', description: 'No changes were made.', variant: 'destructive' });
      router.replace('/settings/billing');
    }
  }, [searchParams, toast, router]);

  const handleUpgrade = async (planKey: keyof typeof PLANS) => {
    const plan = PLANS[planKey];
    if (!plan.priceId) {
      toast({ title: 'Not configured', description: 'Stripe Price IDs are not set up. Add STRIPE_PRO/GROWTH/ENTERPRISE_PRICE_ID env vars.', variant: 'destructive' });
      return;
    }
    setLoadingPlan(planKey);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: plan.priceId, planName: plan.name }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        toast({ title: 'Checkout error', description: data.error ?? 'Could not create checkout session.', variant: 'destructive' });
        return;
      }
      router.push(data.url);
    } catch {
      toast({ title: 'Checkout error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setLoadingPlan(null);
    }
  };

  const isUnlimited = signalLimit >= UNLIMITED_THRESHOLD;
  const isUnlimitedSeats = seatLimit >= UNLIMITED_THRESHOLD;
  const signalPct = usage && !isUnlimited ? Math.min(100, Math.round((usage.signals_this_month / signalLimit) * 100)) : 0;
  const seatPct = usage && !isUnlimitedSeats ? Math.min(100, Math.round((usage.members / seatLimit) * 100)) : 0;

  const planEntries = Object.entries(PLANS) as [keyof typeof PLANS, (typeof PLANS)[keyof typeof PLANS]][];

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card className="border border-white/10 bg-white/5 max-w-xl">
          <CardHeader>
            <CardTitle className="text-white text-base">Current Usage</CardTitle>
            <CardDescription className="text-zinc-400">
              {PLANS[currentPlan].name} plan · Resets on the 1st of each month
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!usage ? (
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-300">Signals this month</span>
                    <Skeleton className="h-4 w-16 bg-white/5" />
                  </div>
                  <Skeleton className="h-2 w-full bg-white/5 rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-300">Seats used</span>
                    <Skeleton className="h-4 w-16 bg-white/5" />
                  </div>
                  <Skeleton className="h-2 w-full bg-white/5 rounded-full" />
                </div>
              </div>
            ) : (
              <>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-300">Signals this month</span>
                    <span className="text-white font-medium">
                      {isUnlimited ? `${usage.signals_this_month} (unlimited)` : `${usage.signals_this_month} / ${signalLimit}`}
                    </span>
                  </div>
                  {!isUnlimited && <Progress value={signalPct} className="h-2" data-testid="progress-signals" />}
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-zinc-300">Seats used</span>
                    <span className="text-white font-medium">
                      {isUnlimitedSeats ? `${usage.members} (unlimited)` : `${usage.members} / ${seatLimit}`}
                    </span>
                  </div>
                  {!isUnlimitedSeats && <Progress value={seatPct} className="h-2" data-testid="progress-seats" />}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl">
          {planEntries.map(([planKey, plan]) => {
            const isCurrent = planKey === currentPlan;
            const isPlanLoading = loadingPlan === planKey;

            return (
              <Card
                key={planKey}
                className={`border bg-white/5 ${isCurrent ? 'border-emerald-500/50' : 'border-white/10'}`}
                data-testid={`plan-card-${planKey}`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-base">{plan.name}</CardTitle>
                    {isCurrent && (
                      <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 text-xs">Current</Badge>
                    )}
                  </div>
                  <div className="flex items-end gap-1 mt-2">
                    <span className="text-2xl font-bold text-white">${plan.price}</span>
                    <span className="text-zinc-400 text-sm mb-0.5">/mo</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-1.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full mt-2 ${isCurrent ? 'border-white/10' : 'bg-emerald-500 hover:bg-emerald-600'}`}
                    variant={isCurrent ? 'outline' : 'default'}
                    size="sm"
                    disabled={isCurrent || isPlanLoading}
                    onClick={() => !isCurrent && handleUpgrade(planKey)}
                    data-testid={`button-plan-${planKey}`}
                  >
                    {isPlanLoading ? (
                      <><Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />Redirecting...</>
                    ) : isCurrent ? (
                      'Current Plan'
                    ) : (
                      `Upgrade to ${plan.name}`
                    )}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
