"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

const PLANS = [
  {
    name: 'Pro',
    price: '$299',
    period: '/month',
    description: 'Perfect for individual reps and small teams.',
    badge: null,
    features: [
      '10 active trackers',
      '500 signals per month',
      'HubSpot CRM integration',
      'Email alert digest',
      'AI-generated openers',
      '5 team seats',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$599',
    period: '/month',
    description: 'For scaling revenue teams that need more firepower.',
    badge: 'Most Popular',
    features: [
      'Unlimited trackers',
      '2,000 signals per month',
      'All CRM integrations',
      'Slack real-time alerts',
      'Team collaboration (20 seats)',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    ctaLink: '/signup',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '$1,200',
    period: '/month',
    description: 'Custom workflows and SLAs for large organizations.',
    badge: null,
    features: [
      'Everything in Growth',
      'Unlimited signals',
      'Unlimited seats',
      'SSO / SAML',
      'Dedicated account manager',
      'Custom integrations',
      'Custom SLA & uptime guarantee',
    ],
    cta: 'Talk to Sales',
    ctaLink: 'mailto:sales@octopilot.app',
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 items-start">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`border bg-white/5 backdrop-blur-sm relative ${
                plan.highlighted
                  ? 'border-emerald-500/60 shadow-lg shadow-emerald-500/10'
                  : 'border-white/10'
              }`}
              data-testid={`pricing-card-${plan.name.toLowerCase()}`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-emerald-500 text-black border-0 px-3 py-1 text-xs">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="pb-4 pt-8">
                <CardTitle className="text-white text-xl">{plan.name}</CardTitle>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
                <div className="flex items-end gap-1 mt-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-zinc-400 text-sm mb-1.5">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`w-full mt-4 ${
                    plan.highlighted
                      ? 'bg-emerald-500 hover:bg-emerald-600 text-black'
                      : 'border-white/20 hover:bg-white/5 text-white'
                  }`}
                  variant={plan.highlighted ? 'default' : 'outline'}
                  data-testid={`pricing-cta-${plan.name.toLowerCase()}`}
                >
                  <Link href={plan.ctaLink}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
