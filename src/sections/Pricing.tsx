"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Pro",
    description: "For early stage startups",
    price: "$299",
    popular: false,
    features: [
      "3 Tracker topics",
      "1,000 signals/month",
      "Reddit & Hacker News",
      "Basic filtering",
      "Slack integration",
    ],
    cta: "Start Free Trial",
    testId: "pricing-pro-button",
  },
  {
    name: "Growth",
    description: "For scaling revenue teams",
    price: "$599",
    popular: true,
    features: [
      "10 Tracker topics",
      "5,000 signals/month",
      "All data sources",
      "Advanced AI filtering",
      "Salesforce/HubSpot sync",
      "AI Openers generation",
    ],
    cta: "Start Free Trial",
    testId: "pricing-growth-button",
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "$1,200",
    popular: false,
    features: [
      "Unlimited topics",
      "Unlimited signals",
      "Custom integrations",
      "Dedicated success manager",
      "Custom AI training",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
    testId: "pricing-enterprise-button",
  },
];

const Pricing = () => {
  const router = useRouter();

  return (
    <section
      id="pricing"
      className="py-24 md:py-32 relative"
      style={{ background: '#111111', borderTop: '1px solid #2A2A2A' }}
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: '#00C96A' }}
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-5 text-balance"
            style={{ color: '#F0F0F0' }}
          >
            Simple, transparent pricing
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-3 mt-8"
          >
            <span className="text-sm font-medium" style={{ color: '#606060' }}>
              Billed Monthly
            </span>
            <div 
              className="w-11 h-6 rounded-full relative cursor-pointer"
              style={{ background: 'rgba(0, 201, 106, 0.2)', border: '1px solid rgba(0, 201, 106, 0.3)' }}
            >
              <div className="absolute right-1 top-1 w-4 h-4 rounded-full" style={{ background: '#00C96A' }} />
            </div>
            <span className="text-sm font-medium" style={{ color: '#F0F0F0' }}>
              Billed Annually{" "}
              <span className="text-xs ml-1" style={{ color: '#00C96A' }}>(Save 20%)</span>
            </span>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col ${plan.popular ? "md:-mt-4 md:mb-0" : "mt-0"}`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <span 
                    className="text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide"
                    style={{ background: '#00C96A', color: '#0A0A0A' }}
                  >
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className="h-full flex flex-col rounded-[16px] p-8 transition-all duration-200"
                style={{ 
                  background: '#0A0A0A',
                  border: plan.popular ? '2px solid #00C96A' : '1px solid #2A2A2A',
                  boxShadow: plan.popular ? '0 0 24px rgba(0,201,106,0.15)' : 'none'
                }}
              >
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-1" style={{ color: '#F0F0F0' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm" style={{ color: '#606060' }}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ color: '#F0F0F0' }}>
                    {plan.price}
                  </span>
                  <span style={{ color: '#606060' }}>/mo</span>
                </div>

                {/* CTA Button */}
                <Button
                  className={`w-full mb-8 font-semibold ${
                    plan.popular
                      ? "gradient-primary text-white hover:opacity-90"
                      : ""
                  }`}
                  style={!plan.popular ? { 
                    background: '#1A1A1A', 
                    border: '1px solid #2A2A2A',
                    color: '#F0F0F0'
                  } : undefined}
                  onClick={() =>
                    plan.cta === "Contact Sales"
                      ? null
                      : router.push("/signup")
                  }
                  data-testid={plan.testId}
                >
                  {plan.cta}
                </Button>

                {/* Features */}
                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, fi) => (
                    <div
                      key={fi}
                      className="flex items-center gap-3 text-sm"
                      style={{ color: plan.popular ? '#F0F0F0' : '#A0A0A0' }}
                    >
                      <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#00C96A' }} />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
