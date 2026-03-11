import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Radar, 
  ArrowRight, 
  Database, 
  Check, 
  Activity, 
  Zap,
  Globe,
  MessageSquare,
  Bot
} from "lucide-react";

type Intent = "HIGH" | "MEDIUM" | "LOW";

interface Signal {
  id: string;
  platform: "Reddit" | "Hacker News";
  source: string;
  snippet: string;
  intent: Intent;
  time: string;
}

const INITIAL_SIGNALS: Signal[] = [
  {
    id: "1",
    platform: "Reddit",
    source: "r/SaaS",
    snippet: "We're currently using a mix of Zapier and manual spreadsheets for lead scoring. It's breaking down at scale. Any recommendations for automated intent monitoring?",
    intent: "HIGH",
    time: "Just now"
  },
  {
    id: "2",
    platform: "Hacker News",
    source: "Ask HN",
    snippet: "What are the best tools for listening to social channels for buyer intent? Our outbound isn't working as well as it used to.",
    intent: "HIGH",
    time: "2m ago"
  },
  {
    id: "3",
    platform: "Reddit",
    source: "r/startups",
    snippet: "Looking to replace our current lead gen vendor. The data is stale. Has anyone found a solution that scrapes live communities?",
    intent: "MEDIUM",
    time: "5m ago"
  },
  {
    id: "4",
    platform: "Hacker News",
    source: "Show HN",
    snippet: "I built a tool that tracks brand mentions, but struggling to pipe it into Salesforce reliably. Any tips?",
    intent: "MEDIUM",
    time: "12m ago"
  },
  {
    id: "5",
    platform: "Reddit",
    source: "r/Sales",
    snippet: "Management wants us to start doing 'social selling'. How do you actually track buying signals on Reddit/Twitter without spending all day on them?",
    intent: "HIGH",
    time: "18m ago"
  },
  {
    id: "6",
    platform: "Reddit",
    source: "r/B2BMarketing",
    snippet: "We tried ZoomInfo intent data but it feels too generic. Are there platforms that show actual posts from people looking for software?",
    intent: "HIGH",
    time: "25m ago"
  },
  {
    id: "7",
    platform: "Hacker News",
    source: "Ask HN",
    snippet: "Is anyone successfully automating their top-of-funnel outreach based on competitor mentions?",
    intent: "MEDIUM",
    time: "31m ago"
  },
  {
    id: "8",
    platform: "Reddit",
    source: "r/SaaS",
    snippet: "What CRM integration is everyone using to sync live social signals? HubSpot native integration isn't cutting it.",
    intent: "LOW",
    time: "42m ago"
  }
];

const NEW_SIGNALS: Signal[] = [
  {
    id: "9",
    platform: "Reddit",
    source: "r/Entrepreneur",
    snippet: "Need a way to find warm leads fast. Cold email is dead for us.",
    intent: "HIGH",
    time: "Just now"
  },
  {
    id: "10",
    platform: "Hacker News",
    source: "Ask HN",
    snippet: "How do you track who is complaining about your competitors online?",
    intent: "HIGH",
    time: "Just now"
  },
  {
    id: "11",
    platform: "Reddit",
    source: "r/salesforce",
    snippet: "Is there a good integration for pulling in social mentions directly to lead records?",
    intent: "MEDIUM",
    time: "Just now"
  }
];

export default function LandingLiveFeed() {
  return (
    <div className="min-h-screen bg-[#0a0d0f] text-[#f1f5f9] selection:bg-[#3ECF8E] selection:text-[#0a0d0f] font-sans">
      <Navbar />
      <main>
        <LiveFeedHero />
        <HeadlineSection />
        <MetricsStrip />
        <HowItWorks />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0d0f]/80 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3ECF8E]/20 flex items-center justify-center border border-[#3ECF8E]/30">
            <Radar className="w-5 h-5 text-[#3ECF8E]" />
          </div>
          <span className="text-lg font-bold tracking-tight font-['Space_Grotesk'] text-white">
            OCTOPILOT
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
          <a href="#feed" className="hover:text-white transition-colors">Live Feed</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors hidden sm:block">
            Log in
          </button>
          <button className="bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-sm font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

function LiveFeedHero() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [poolIndex, setPoolIndex] = useState(0);

  // Initial load stagger
  useEffect(() => {
    let timeoutIds: NodeJS.Timeout[] = [];
    
    INITIAL_SIGNALS.forEach((signal, index) => {
      const id = setTimeout(() => {
        setSignals(prev => [...prev, signal].sort((a, b) => {
           // We want to sort newest at the top, or just prepend
           return 0; // We'll handle insertion order by just prepending
        }));
      }, index * 400);
      timeoutIds.push(id);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  // Continuous loop after initial load
  useEffect(() => {
    if (signals.length < INITIAL_SIGNALS.length) return;

    const interval = setInterval(() => {
      setSignals(prev => {
        const nextSignal = NEW_SIGNALS[poolIndex % NEW_SIGNALS.length];
        const updatedPoolIndex = (poolIndex + 1) % NEW_SIGNALS.length;
        setPoolIndex(updatedPoolIndex);

        // Remove oldest (last), add new at top
        const newArray = [nextSignal, ...prev.slice(0, 7)];
        return newArray;
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [signals.length, poolIndex]);

  return (
    <section id="feed" className="relative min-h-screen pt-24 pb-16 flex flex-col border-b border-[#1e293b] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#3ECF8E]/5 via-[#0a0d0f] to-[#0a0d0f] pointer-events-none" />
      
      {/* LIVE Indicator & Header */}
      <div className="container mx-auto px-6 relative z-20 flex flex-col h-full">
        <div className="flex justify-between items-start mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] tracking-tight mb-4 text-white">
              Here's what you're missing right now.
            </h1>
            <p className="text-lg text-[#94a3b8]">
              Live buying signals flowing in from communities across the web.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-[#0f1419] border border-white/5 px-4 py-2 rounded-full mt-2">
            <motion.div 
              animate={{ opacity: [1, 0.3, 1] }} 
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-3 h-3 rounded-full bg-[#3ECF8E] shadow-[0_0_10px_#3ECF8E]"
            />
            <span className="text-sm font-bold tracking-widest text-[#3ECF8E] uppercase">LIVE</span>
          </div>
        </div>

        {/* The Feed */}
        <div className="flex-1 relative max-w-4xl mx-auto w-full">
          <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#0a0d0f] to-transparent z-10 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0d0f] to-transparent z-10 pointer-events-none" />
          
          <div className="space-y-4 pt-4 pb-32">
            <AnimatePresence initial={false}>
              {signals.map((signal, index) => (
                <motion.div
                  key={signal.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                  className={`group relative bg-[#0f1419] border rounded-xl p-5 md:p-6 transition-all duration-300
                    ${index === 0 ? 'border-[#3ECF8E]/40 shadow-[0_0_30px_-10px_#3ECF8E]' : 'border-white/5 hover:border-white/10'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded
                        ${signal.platform === 'Reddit' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 
                          'bg-amber-500/10 text-amber-500 border border-amber-500/20'}`}
                      >
                        {signal.platform}
                      </span>
                      <span className="text-sm text-[#94a3b8] flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {signal.source}
                      </span>
                      <span className="text-xs text-[#64748b]">
                        • {signal.time}
                      </span>
                    </div>

                    <div className={`text-xs font-bold px-2 py-1 rounded border
                      ${signal.intent === 'HIGH' ? 'bg-[#3ECF8E]/10 text-[#3ECF8E] border-[#3ECF8E]/20' : 
                        signal.intent === 'MEDIUM' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}
                    >
                      {signal.intent} INTENT
                    </div>
                  </div>

                  <p className="text-[#f1f5f9] text-base md:text-lg leading-relaxed mb-4">
                    "{signal.snippet}"
                  </p>

                  <div className="h-0 group-hover:h-10 overflow-hidden transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center">
                    <button className="text-sm bg-white/5 hover:bg-[#3ECF8E] hover:text-[#0a0d0f] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-white/10 hover:border-transparent">
                      <Database className="w-4 h-4" />
                      Inject to CRM
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeadlineSection() {
  return (
    <section className="py-24 px-6 bg-[#0a0d0f]">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-8 text-white">
          Don't wait for them to find you.
        </h2>
        <p className="text-xl text-[#94a3b8] mb-12 max-w-2xl mx-auto leading-relaxed">
          While you're reading this, your competitors might be replying to the exact people looking for your solution. Octopilot captures intent the second it happens.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-bold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_#3ECF8E]">
            Start Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white text-lg font-medium px-8 py-4 rounded-full border border-white/10 transition-all">
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}

function MetricsStrip() {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0f1419]/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="py-4 md:py-0">
            <div className="text-4xl font-bold text-white mb-2 font-['Space_Grotesk']">142</div>
            <div className="text-[#94a3b8] uppercase tracking-wider text-sm font-semibold">Signals Today</div>
          </div>
          <div className="py-4 md:py-0">
            <div className="text-4xl font-bold text-[#3ECF8E] mb-2 font-['Space_Grotesk']">38</div>
            <div className="text-[#94a3b8] uppercase tracking-wider text-sm font-semibold">High Intent</div>
          </div>
          <div className="py-4 md:py-0">
            <div className="text-4xl font-bold text-white mb-2 font-['Space_Grotesk']">27</div>
            <div className="text-[#94a3b8] uppercase tracking-wider text-sm font-semibold">CRM Synced</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <Radar className="w-6 h-6 text-[#3ECF8E]" />,
      title: "1. Listen",
      desc: "We continuously monitor Reddit, Hacker News, and key forums for your keywords."
    },
    {
      icon: <Bot className="w-6 h-6 text-[#3ECF8E]" />,
      title: "2. Analyze",
      desc: "Our AI filters out noise and scores posts for genuine buying intent."
    },
    {
      icon: <Database className="w-6 h-6 text-[#3ECF8E]" />,
      title: "3. Inject",
      desc: "High-intent signals are pushed to your CRM with context, ready for outreach."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0a0d0f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold font-['Space_Grotesk'] mb-4 text-white">How it works</h2>
          <p className="text-[#94a3b8]">A seamless pipeline from social chatter to sales opportunity.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="bg-[#0f1419] p-8 rounded-2xl border border-white/5 relative group hover:border-[#3ECF8E]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#3ECF8E]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-[#3ECF8E]/20">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
              <p className="text-[#94a3b8] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#0f1419] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-4 text-white">
            Pricing that scales with your pipeline
          </h2>
          <p className="text-[#94a3b8]">Start capturing intent today. No hidden fees.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
          {/* Pro */}
          <div className="bg-[#0a0d0f] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
            <p className="text-[#64748b] text-sm mb-6">For early stage startups</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$299</span>
              <span className="text-[#64748b]">/mo</span>
            </div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10 mb-8">
              Start 14-Day Trial
            </button>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> 5 Trackers</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> 1,000 Signals / month</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Reddit & Hacker News</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Email/Slack Alerts</li>
            </ul>
          </div>

          {/* Growth */}
          <div className="bg-[#0f1419] border-2 border-[#3ECF8E] rounded-3xl p-8 relative shadow-[0_0_40px_-15px_#3ECF8E] scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3ECF8E] text-[#0a0d0f] text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Growth</h3>
            <p className="text-[#64748b] text-sm mb-6">For scaling revenue teams</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$599</span>
              <span className="text-[#64748b]">/mo</span>
            </div>
            <button className="w-full bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] font-bold py-3 rounded-xl transition-colors mb-8 shadow-lg">
              Start 14-Day Trial
            </button>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-white font-medium"><Check className="w-4 h-4 text-[#3ECF8E]" /> 25 Trackers</li>
              <li className="flex items-center gap-3 text-sm text-white font-medium"><Check className="w-4 h-4 text-[#3ECF8E]" /> 5,000 Signals / month</li>
              <li className="flex items-center gap-3 text-sm text-white font-medium"><Check className="w-4 h-4 text-[#3ECF8E]" /> Native CRM Sync</li>
              <li className="flex items-center gap-3 text-sm text-white font-medium"><Check className="w-4 h-4 text-[#3ECF8E]" /> AI Outreach Drafts</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-[#0a0d0f] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
            <p className="text-[#64748b] text-sm mb-6">For mature organizations</p>
            <div className="mb-6">
              <span className="text-4xl font-bold text-white">$1200</span>
              <span className="text-[#64748b]">/mo</span>
            </div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10 mb-8">
              Contact Sales
            </button>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Unlimited Trackers</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Unlimited Signals</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> API Webhooks</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Dedicated CSM</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden bg-[#0a0d0f]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#3ECF8E]/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 tracking-tight text-white">
          Ready to capture active demand?
        </h2>
        <p className="text-xl text-[#94a3b8] mb-10">
          Join the fastest-growing revenue teams using Octopilot to turn social chatter into qualified pipeline.
        </p>
        <button className="bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-bold px-10 py-5 rounded-full transition-all shadow-[0_0_40px_-10px_#3ECF8E]">
          Start Finding Customers — 14 Days Free
        </button>
        <p className="mt-6 text-sm text-[#64748b]">
          No credit card required. Cancel anytime.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0d0f] py-12">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-[#3ECF8E]/20 flex items-center justify-center border border-[#3ECF8E]/30">
            <Radar className="w-3 h-3 text-[#3ECF8E]" />
          </div>
          <span className="text-sm font-bold tracking-tight font-['Space_Grotesk'] text-white">
            OCTOPILOT
          </span>
        </div>
        
        <div className="text-sm text-[#64748b]">
          &copy; {new Date().getFullYear()} Octopilot Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
