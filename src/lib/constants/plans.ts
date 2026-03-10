export interface PlanConfig {
  name: string;
  price: number;
  priceId: string;
  features: string[];
  limits: {
    signals: number;
    trackers: number;
    members: number;
  };
}

export const PLANS: Record<'pro' | 'growth' | 'enterprise', PlanConfig> = {
  pro: {
    name: 'Pro',
    price: 299,
    priceId: process.env.STRIPE_PRO_PRICE_ID ?? '',
    features: [
      '10 trackers',
      '500 signals/mo',
      'HubSpot integration',
      'Email alerts',
      '5 team seats',
    ],
    limits: { signals: 500, trackers: 10, members: 5 },
  },
  growth: {
    name: 'Growth',
    price: 599,
    priceId: process.env.STRIPE_GROWTH_PRICE_ID ?? '',
    features: [
      'Unlimited trackers',
      '2,000 signals/mo',
      'All CRM integrations',
      'Slack alerts',
      'API access',
      '20 team seats',
    ],
    limits: { signals: 2000, trackers: 50, members: 20 },
  },
  enterprise: {
    name: 'Enterprise',
    price: 1200,
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID ?? '',
    features: [
      'Unlimited everything',
      'Dedicated account manager',
      'SSO / SAML',
      'Custom SLA',
      'Unlimited seats',
    ],
    limits: { signals: -1, trackers: -1, members: -1 },
  },
};
