"use client";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const router = useRouter();

  return (
    <section id="pricing" className="py-24 border-t border-white/5 bg-[#0f1418]/30 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Simple, transparent pricing
          </h2>
          <div className="flex items-center justify-center gap-3 mt-8">
            <span className="text-zinc-400 text-sm font-medium">Billed Monthly</span>
            <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer">
              <div className="absolute right-1 top-1 w-3 h-3 bg-emerald-400 rounded-full" />
            </div>
            <span className="text-white text-sm font-medium">
              Billed Annually <span className="text-emerald-400 text-xs ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm flex flex-col mt-4">
            <h3 className="text-xl font-bold mb-2 text-foreground">Pro</h3>
            <div className="text-zinc-400 text-sm mb-6">For early stage startups</div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$299</span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <Button
              variant="outline"
              className="w-full mb-8 border-white/10 hover:bg-white/5"
              onClick={() => router.push("/signup")}
              data-testid="pricing-pro-button"
            >
              Start Free Trial
            </Button>
            <div className="space-y-4 flex-1">
              {[
                "3 Tracker topics",
                "1,000 signals/month",
                "Reddit & Hacker News",
                "Basic filtering",
                "Slack integration",
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#12181c] border border-emerald-500/50 rounded-2xl p-8 relative flex flex-col shadow-[0_0_40px_-10px_rgba(52,211,153,0.15)] transform md:-translate-y-4">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-400 to-emerald-500/0" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Growth</h3>
            <div className="text-zinc-400 text-sm mb-6">For scaling revenue teams</div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$599</span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <Button
              className="w-full mb-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold"
              onClick={() => router.push("/signup")}
              data-testid="pricing-growth-button"
            >
              Start Free Trial
            </Button>
            <div className="space-y-4 flex-1">
              {[
                "10 Tracker topics",
                "5,000 signals/month",
                "All data sources",
                "Advanced AI filtering",
                "Salesforce/HubSpot sync",
                "AI Openers generation",
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-white text-sm">
                  <Check className="w-4 h-4 text-emerald-400" /> {f}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm flex flex-col mt-4">
            <h3 className="text-xl font-bold mb-2 text-foreground">Enterprise</h3>
            <div className="text-zinc-400 text-sm mb-6">For large organizations</div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-foreground">$1,200</span>
              <span className="text-zinc-500">/mo</span>
            </div>
            <Button
              variant="outline"
              className="w-full mb-8 border-white/10 hover:bg-white/5"
              data-testid="pricing-enterprise-button"
            >
              Contact Sales
            </Button>
            <div className="space-y-4 flex-1">
              {[
                "Unlimited topics",
                "Unlimited signals",
                "Custom integrations",
                "Dedicated success manager",
                "Custom AI training",
                "SLA guarantees",
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <Check className="w-4 h-4 text-emerald-400" /> {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
