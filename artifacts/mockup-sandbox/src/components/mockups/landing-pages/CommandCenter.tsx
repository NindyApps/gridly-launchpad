import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  Activity, 
  Database, 
  Zap, 
  CheckCircle2, 
  TerminalSquare, 
  LineChart, 
  ShieldAlert, 
  Globe, 
  Cpu,
  ChevronDown,
  Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const MOCK_SIGNALS = [
  {
    id: "sig-1",
    source: "Reddit",
    subreddit: "r/SaaS",
    author: "u/growth_hacker99",
    content: "We're currently evaluating tools for automated outreach. Has anyone found something that integrates well with HubSpot but doesn't feel spammy?",
    intentScore: 94,
    confidence: "High",
    status: "Injected to CRM",
    time: "2m ago",
    match: "automated outreach + hubspot"
  },
  {
    id: "sig-2",
    source: "Hacker News",
    subreddit: "Ask HN",
    author: "dev_ops_mike",
    content: "What are the best alternatives to current revenue intelligence platforms? Our team is growing and we need better signal detection.",
    intentScore: 88,
    confidence: "High",
    status: "Injected to CRM",
    time: "5m ago",
    match: "alternatives to revenue intelligence"
  },
  {
    id: "sig-3",
    source: "Reddit",
    subreddit: "r/sales",
    author: "u/closer_always",
    content: "Looking for recommendations on intent data providers. Budget is around $2k/mo. Need something that catches early signals.",
    intentScore: 97,
    confidence: "Very High",
    status: "Classifying...",
    time: "Just now",
    match: "recommendations on intent data + budget"
  }
];

export default function CommandCenter() {
  const [activeSignals, setActiveSignals] = useState<typeof MOCK_SIGNALS>([]);

  useEffect(() => {
    // Simulate real-time feed
    let currentSignals = [MOCK_SIGNALS[1]];
    setActiveSignals(currentSignals);

    const timer1 = setTimeout(() => {
      currentSignals = [MOCK_SIGNALS[0], ...currentSignals];
      setActiveSignals([...currentSignals]);
    }, 2000);

    const timer2 = setTimeout(() => {
      currentSignals = [MOCK_SIGNALS[2], ...currentSignals];
      setActiveSignals([...currentSignals]);
      
      // Update status of sig-3 after a bit
      setTimeout(() => {
        setActiveSignals(prev => 
          prev.map(s => s.id === "sig-3" ? { ...s, status: "Injected to CRM" } : s)
        );
      }, 1500);
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="text-emerald-500 h-6 w-6" />
            <span className="font-mono font-bold tracking-tight text-white text-lg">OCTOPILOT</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-mono text-slate-400">
            <a href="#platform" className="hover:text-emerald-400 transition-colors">Platform</a>
            <a href="#metrics" className="hover:text-emerald-400 transition-colors">Metrics</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a>
            <a href="/login" className="hover:text-white transition-colors">Login</a>
          </div>
          <Button asChild className="bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-none font-mono">
            <a href="/signup">INITIALIZE TRIAL</a>
          </Button>
        </div>
      </nav>

      {/* Hero Section - Simulated Feed */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden min-h-[90vh] flex flex-col justify-center">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none flex items-center justify-center">
          <img src="/__mockup/images/dashboard-glow.png" alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              SYSTEM ONLINE // MONITORING 2.4M POSTS/DAY
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight mb-6 font-sans">
              Stop searching.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                Start intercepting.
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl">
              The first revenue intelligence platform that monitors Reddit and Hacker News in real-time, 
              detects high-intent buying signals using GPT-4o-mini, and auto-injects them directly into your CRM.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-none h-12 px-8 font-mono">
                <a href="/signup">DEPLOY OCTOPILOT <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <div className="text-xs font-mono text-slate-500">
                14-day free trial.<br/>Zero-write architecture.
              </div>
            </div>
          </div>

          {/* Terminal / Dashboard UI */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg blur opacity-20"></div>
            <div className="relative bg-[#111] border border-white/10 rounded-lg overflow-hidden shadow-2xl font-mono text-sm">
              <div className="bg-[#1a1a1a] border-b border-white/10 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <TerminalSquare className="h-4 w-4" />
                  <span>live_signal_stream.exe</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
              </div>
              
              <div className="p-4 h-[400px] overflow-hidden flex flex-col gap-3">
                <AnimatePresence>
                  {activeSignals.map((signal) => (
                    <motion.div 
                      key={signal.id}
                      initial={{ opacity: 0, y: -20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="bg-black/50 border border-white/5 p-4 rounded flex flex-col gap-2"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-blue-400">{signal.source}</span>
                          <span className="text-slate-600">/</span>
                          <span className="text-slate-400">{signal.subreddit}</span>
                        </div>
                        <span className="text-slate-500 text-xs">{signal.time}</span>
                      </div>
                      
                      <div className="text-slate-200 line-clamp-2 leading-relaxed">
                        "{signal.content}"
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-2 pt-2 border-t border-white/5">
                        <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-xs">
                          <Zap className="h-3 w-3" />
                          Intent: {signal.intentScore}
                        </div>
                        <div className="text-xs text-slate-500 border border-white/10 px-2 py-0.5 rounded">
                          Match: {signal.match}
                        </div>
                        <div className="flex-1"></div>
                        <div className={`text-xs flex items-center gap-1 ${signal.status === 'Classifying...' ? 'text-amber-400' : 'text-emerald-500'}`}>
                          {signal.status === 'Classifying...' ? (
                            <span className="flex items-center gap-1"><Activity className="h-3 w-3 animate-spin" /> {signal.status}</span>
                          ) : (
                            <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> {signal.status}</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {activeSignals.length === 0 && (
                  <div className="flex items-center justify-center h-full text-slate-500 text-xs animate-pulse">
                    Awaiting signals...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics / Proof Section */}
      <section id="metrics" className="py-20 border-y border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="p-4">
              <div className="text-4xl font-mono font-bold text-white mb-2">2.4M+</div>
              <div className="text-slate-400 text-sm">Posts analyzed daily</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-mono font-bold text-white mb-2">94%</div>
              <div className="text-slate-400 text-sm">Intent classification accuracy</div>
            </div>
            <div className="p-4">
              <div className="text-4xl font-mono font-bold text-emerald-400 mb-2">&lt; 60s</div>
              <div className="text-slate-400 text-sm">From post to CRM injection</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Capabilities */}
      <section id="platform" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Signal Processing Architecture</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Our infrastructure continuously monitors developer and tech communities, instantly processing text through custom LLM pipelines to extract buying intent.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#111] border border-white/5 p-8 rounded-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Globe className="w-24 h-24" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                <Globe className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-mono">01. Monitor</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We plug directly into Reddit and Hacker News firehoses. You define the keywords, competitors, and topics. We listen to everything.
              </p>
            </div>

            <div className="bg-[#111] border border-white/5 p-8 rounded-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Cpu className="w-24 h-24" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                <Cpu className="w-6 h-6 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-mono">02. Classify</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Every mention is piped through GPT-4o-mini to determine true buying intent. We filter out noise, complaints, and irrelevance.
              </p>
            </div>

            <div className="bg-[#111] border border-white/5 p-8 rounded-lg relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Database className="w-24 h-24" />
              </div>
              <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 border border-white/10">
                <Database className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-mono">03. Inject</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                High-intent signals are instantly formatted and pushed to HubSpot or Salesforce as actionable tasks for your SDR team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 border-y border-white/5 bg-[#0a0a0a]/50 relative overflow-hidden">
        <div className="absolute -left-[20%] top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="text-center font-mono text-sm text-emerald-400 tracking-widest uppercase mb-12">System Output Validated</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-white/5 p-6 rounded relative">
              <div className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                "OCTOPILOT found us 3 enterprise deals in the first week that we would have completely missed. The AI summaries are scarily accurate."
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded border border-white/10 flex items-center justify-center text-xs font-mono text-white">SC</div>
                <div>
                  <div className="text-sm font-bold text-white">Sarah Chen</div>
                  <div className="text-xs text-slate-500 font-mono">VP Sales, Dataloop</div>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 p-6 rounded relative">
              <div className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                "We replaced our manual Reddit monitoring workflow with OCTOPILOT. What used to take 4 hours a day now happens automatically with better results."
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded border border-white/10 flex items-center justify-center text-xs font-mono text-white">MR</div>
                <div>
                  <div className="text-sm font-bold text-white">Marcus Rivera</div>
                  <div className="text-xs text-slate-500 font-mono">Head of Growth, Forge Analytics</div>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 p-6 rounded relative">
              <div className="text-slate-300 text-sm leading-relaxed mb-6 italic">
                "The HubSpot integration is seamless. Our SDRs get a task with a ready-to-send opener right in their CRM. Pipeline velocity went up 34%."
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded border border-white/10 flex items-center justify-center text-xs font-mono text-white">PN</div>
                <div>
                  <div className="text-sm font-bold text-white">Priya Nambiar</div>
                  <div className="text-xs text-slate-500 font-mono">RevOps Lead, Stackmesh</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Resource Allocation</h2>
            <p className="text-slate-400">Simple, predictable pricing based on signal volume.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Pro */}
            <div className="bg-[#111] border border-white/10 rounded-lg p-8 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 font-mono">PRO</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$299</span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 5 trackers</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Reddit & Hacker News</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 500 signals/month</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Standard AI Classification</li>
              </ul>
              <Button asChild variant="outline" className="w-full rounded-none border-white/20 text-white hover:bg-white hover:text-black">
                <a href="/signup">START TRIAL</a>
              </Button>
            </div>

            {/* Growth */}
            <div className="bg-[#161616] border-2 border-emerald-500 rounded-lg p-8 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-black text-xs font-bold font-mono px-3 py-1 uppercase">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-white mb-2 font-mono">GROWTH</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$599</span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Up to 20 trackers</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Reddit, HN + Early Access platforms</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> 2,000 signals/month</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> Advanced AI context extraction</li>
                <li className="flex gap-3 text-sm text-white font-medium"><Check className="w-4 h-4 text-emerald-500 shrink-0" /> HubSpot / Salesforce Injection</li>
              </ul>
              <Button asChild className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-none font-mono">
                <a href="/signup">START TRIAL</a>
              </Button>
            </div>

            {/* Enterprise */}
            <div className="bg-[#111] border border-white/10 rounded-lg p-8 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-2 font-mono">ENTERPRISE</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-white">$1200</span>
                <span className="text-slate-500 text-sm">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-slate-600 shrink-0" /> Unlimited trackers</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-slate-600 shrink-0" /> All data sources</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-slate-600 shrink-0" /> Custom signal volume</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-slate-600 shrink-0" /> Custom CRM mapping</li>
                <li className="flex gap-3 text-sm text-slate-300"><Check className="w-4 h-4 text-slate-600 shrink-0" /> Dedicated account manager</li>
              </ul>
              <Button asChild variant="outline" className="w-full rounded-none border-white/20 text-white hover:bg-white hover:text-black">
                <a href="/signup">CONTACT SALES</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">System Queries</h2>
          
          <div className="space-y-6">
            <div className="border border-white/10 bg-[#111] p-6 rounded">
              <h4 className="text-lg font-bold text-white mb-2 font-mono">How does OCTOPILOT find buying signals?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">We maintain continuous websocket connections and polling across supported platforms. When keywords match, the full context thread is sent to our AI classification engine which scores it for explicit buying intent.</p>
            </div>
            
            <div className="border border-white/10 bg-[#111] p-6 rounded">
              <h4 className="text-lg font-bold text-white mb-2 font-mono">Does OCTOPILOT post anything on my behalf?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">No. We utilize a strict Zero-Write Architecture. OCTOPILOT is a listening and intelligence platform only. It will never comment, upvote, or interact with posts.</p>
            </div>
            
            <div className="border border-white/10 bg-[#111] p-6 rounded">
              <h4 className="text-lg font-bold text-white mb-2 font-mono">Which CRMs do you support?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Currently we offer native, deep integrations with HubSpot. Salesforce integration is in active development and will be released next quarter. You can also export signals via CSV or Webhook.</p>
            </div>
            
            <div className="border border-white/10 bg-[#111] p-6 rounded">
              <h4 className="text-lg font-bold text-white mb-2 font-mono">Can I try before paying?</h4>
              <p className="text-slate-400 text-sm leading-relaxed">Yes. Every new account comes with a 14-day free trial, no credit card required. You can set up your trackers and see live signals flowing immediately.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <ShieldAlert className="w-12 h-12 text-emerald-500 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Your competitors are already listening.</h2>
          <p className="text-xl text-slate-400 mb-10">Deploy OCTOPILOT today and start intercepting high-intent buyers before they reach out to your competition.</p>
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-none h-14 px-10 text-lg font-mono">
            <a href="/signup">INITIALIZE PLATFORM</a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-black text-slate-500 text-sm text-center">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 font-mono font-bold text-white">
            <Activity className="text-emerald-500 h-5 w-5" />
            OCTOPILOT
          </div>
          <div>
            &copy; {new Date().getFullYear()} OCTOPILOT Intelligence Systems. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
