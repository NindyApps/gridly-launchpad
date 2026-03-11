import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-02-25.clover',
  });
}

function buildPlanMap(): Record<string, 'pro' | 'growth' | 'enterprise'> {
  const map: Record<string, 'pro' | 'growth' | 'enterprise'> = {};
  const proPriceId = process.env.STRIPE_PRO_PRICE_ID;
  const growthPriceId = process.env.STRIPE_GROWTH_PRICE_ID;
  const enterprisePriceId = process.env.STRIPE_ENTERPRISE_PRICE_ID;
  if (proPriceId) map[proPriceId] = 'pro';
  if (growthPriceId) map[growthPriceId] = 'growth';
  if (enterprisePriceId) map[enterprisePriceId] = 'enterprise';
  return map;
}

function getAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature');

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Invalid signature';
    return NextResponse.json({ error: `Webhook error: ${message}` }, { status: 400 });
  }

  const supabase = getAdminClient();
  const PLAN_MAP = buildPlanMap();

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
      const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

      if (customerId && subscriptionId) {
        await supabase
          .from('workspaces')
          .update({ stripe_subscription_id: subscriptionId })
          .eq('stripe_customer_id', customerId);
      }
      break;
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription;
      const priceId = sub.items.data[0]?.price?.id;
      const plan = PLAN_MAP[priceId] ?? 'pro';
      const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;

      if (customerId) {
        await supabase
          .from('workspaces')
          .update({ plan, stripe_subscription_id: sub.id })
          .eq('stripe_customer_id', customerId);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id;

      if (customerId) {
        await supabase
          .from('workspaces')
          .update({ plan: 'pro', stripe_subscription_id: null })
          .eq('stripe_customer_id', customerId);
      }
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
