"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2 } from 'lucide-react';

const PLANS = [
  {
    name: 'Pro',
    price: '$299',
    period: '/mo',
    seats: 5,
    signals: '500',
    features: ['5 trackers', '500 signals/mo', 'HubSpot integration', 'Email alerts'],
    current: true,
  },
  {
    name: 'Growth',
    price: '$599',
    period: '/mo',
    seats: 15,
    signals: '2,000',
    features: ['Unlimited trackers', '2,000 signals/mo', 'All CRM integrations', 'Slack alerts', 'API access'],
    current: false,
  },
  {
    name: 'Enterprise',
    price: '$1,200',
    period: '/mo',
    seats: 999,
    signals: 'Unlimited',
    features: ['Unlimited everything', 'Dedicated account manager', 'SSO / SAML', 'Custom SLA'],
    current: false,
  },
];

export default function BillingSettingsPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <Card className="border border-white/10 bg-white/5 max-w-xl">
          <CardHeader>
            <CardTitle className="text-white text-base">Current Usage</CardTitle>
            <CardDescription className="text-zinc-400">Pro plan · Renews on Apr 1, 2026</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-zinc-300">Signals this month</span>
                <span className="text-white font-medium">127 / 500</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-zinc-300">Seats used</span>
                <span className="text-white font-medium">1 / 5</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 max-w-4xl">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`border bg-white/5 ${plan.current ? 'border-indigo-500/50' : 'border-white/10'}`}
              data-testid={`plan-card-${plan.name.toLowerCase()}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-base">{plan.name}</CardTitle>
                  {plan.current && <Badge className="bg-indigo-500/20 text-indigo-300 border-indigo-500/30 text-xs">Current</Badge>}
                </div>
                <div className="flex items-end gap-1 mt-2">
                  <span className="text-2xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-400 text-sm mb-0.5">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full mt-2 ${plan.current ? 'border-white/10' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                  variant={plan.current ? 'outline' : 'default'}
                  size="sm"
                  disabled={plan.current}
                  data-testid={`button-plan-${plan.name.toLowerCase()}`}
                >
                  {plan.current ? 'Current Plan' : 'Upgrade'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
