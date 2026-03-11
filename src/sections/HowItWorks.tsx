"use client";

import { Radar, BrainCircuit, Database } from "lucide-react";

const steps = [
  {
    icon: <Radar className="w-6 h-6 text-emerald-400" />,
    title: "Define Trackers",
    desc: "Set up keywords, competitor names, or topics. We monitor millions of posts in real-time.",
  },
  {
    icon: <BrainCircuit className="w-6 h-6 text-emerald-400" />,
    title: "AI Analysis",
    desc: "Our models score each mention for buying intent, filtering out noise and complaints.",
  },
  {
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    title: "CRM Sync",
    desc: "High-intent signals are automatically injected into HubSpot or Salesforce for your SDRs.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Convert noise into pipeline
          </h2>
          <p className="text-zinc-400 text-lg">
            Set up your intent signals in minutes and let our AI agents do the heavy lifting
            of identifying your next customers.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="h-full bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-16 h-16 rounded-2xl bg-[#0a0d0f] border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-lg group-hover:border-emerald-500/30 transition-colors">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
