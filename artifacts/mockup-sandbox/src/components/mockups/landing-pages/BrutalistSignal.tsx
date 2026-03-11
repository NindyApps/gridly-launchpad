import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Activity, 
  Database, 
  Zap, 
  ShieldAlert, 
  Crosshair, 
  BarChart, 
  Terminal,
  Plus,
  Minus,
  Check
} from "lucide-react";

export default function BrutalistSignal() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f4f4f4] font-mono selection:bg-[#ccff00] selection:text-black overflow-x-hidden border-x-[12px] border-[#ccff00]">
      
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a] border-b-[3px] border-white/20 px-6 py-4 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#ccff00] flex items-center justify-center text-black font-bold text-xs">O</div>
          <span className="text-xl font-bold tracking-tighter uppercase">Octopilot</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm uppercase tracking-widest font-bold">
          <a href="#how" className="hover:text-[#ccff00] transition-colors">Mechanism</a>
          <a href="#features" className="hover:text-[#ccff00] transition-colors">Specs</a>
          <a href="#pricing" className="hover:text-[#ccff00] transition-colors">Pricing</a>
        </nav>
        <a 
          href="/signup" 
          className="bg-white text-black px-6 py-2 uppercase font-bold text-sm tracking-widest border-2 border-transparent hover:border-[#ccff00] hover:bg-black hover:text-[#ccff00] transition-all"
        >
          System Access
        </a>
      </header>

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 px-6 md:px-12 border-b-[3px] border-white/20 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ccff00] opacity-[0.05] blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-block bg-[#ccff00] text-black px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6">
              Status: Operational // V 2.4.1
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-8 text-white">
              Revenue <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] to-[#00ffff] stroke-text">Signals</span> <br />
              <span className="text-[#888]">Detected.</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-xl md:text-2xl font-medium leading-relaxed max-w-xl text-[#ccc] border-l-[4px] border-[#ccff00] pl-6 py-2">
                We monitor Reddit and Hacker News for buying-intent signals using AI, classify them, and auto-inject them directly into your CRM. Stop missing deals hidden in plain sight.
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row gap-6">
                <a 
                  href="/signup" 
                  className="bg-[#ccff00] text-black text-center px-8 py-5 text-lg uppercase font-bold tracking-widest border-[3px] border-[#ccff00] hover:bg-transparent hover:text-[#ccff00] transition-all flex items-center justify-center gap-3 group"
                >
                  Initiate Scan
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative border-[3px] border-white/20 p-2 bg-black"
            >
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-[3px] border-l-[3px] border-[#ccff00]"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-[3px] border-r-[3px] border-[#ccff00]"></div>
              
              <img 
                src="/__mockup/images/brutalist-hero-bg.png" 
                alt="Data Stream" 
                className="w-full h-auto grayscale opacity-80 mix-blend-screen"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-4 border-[2px] border-[#ccff00]/50 bg-black/80 backdrop-blur-sm">
                <div className="flex justify-between items-center text-[#ccff00] font-bold text-sm uppercase mb-2">
                  <span>Target Acquired</span>
                  <span className="animate-pulse">Live</span>
                </div>
                <div className="text-white text-lg font-sans">"Anyone know a good alternative to Salesforce? We're a team of 50..."</div>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs bg-[#ccff00]/20 text-[#ccff00] px-2 py-1 uppercase">High Intent</span>
                  <span className="text-xs border border-white/20 text-white px-2 py-1 uppercase">r/SaaS</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* METRICS TICKER */}
      <div className="border-b-[3px] border-white/20 bg-[#ccff00] text-black overflow-hidden py-4 flex whitespace-nowrap">
        <div className="animate-[marquee_20s_linear_infinite] flex gap-12 text-2xl font-black uppercase tracking-tighter">
          <span>100K+ Posts Scanned Daily</span>
          <span className="opacity-30">///</span>
          <span>99.9% Classification Accuracy</span>
          <span className="opacity-30">///</span>
          <span>0 False Positives</span>
          <span className="opacity-30">///</span>
          <span>Instant CRM Injection</span>
          <span className="opacity-30">///</span>
          <span>100K+ Posts Scanned Daily</span>
          <span className="opacity-30">///</span>
          <span>99.9% Classification Accuracy</span>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 md:px-12 border-b-[3px] border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">The Mechanism</h2>
            <p className="text-xl text-[#888] max-w-2xl">A brutal, efficient pipeline from raw internet noise to qualified CRM pipeline.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-[3px] border-white/20">
            {[
              { num: "01", title: "Ingestion", desc: "Continuous scraping of Reddit and Hacker News. We ingest thousands of posts per minute looking for predefined keywords and context triggers.", icon: <Activity className="w-12 h-12 text-[#ccff00]" /> },
              { num: "02", title: "Classification", desc: "GPT-4o-mini parses the context. It strips away noise, sarcasm, and irrelevance to find true buying intent and pain points.", icon: <Crosshair className="w-12 h-12 text-[#ff00ff]" /> },
              { num: "03", title: "Injection", desc: "Qualified signals are structured and pushed directly into HubSpot or Salesforce as actionable tasks for your SDR team.", icon: <Zap className="w-12 h-12 text-[#00ffff]" /> }
            ].map((step, i) => (
              <div key={i} className={`p-8 md:p-12 ${i !== 2 ? 'border-b-[3px] md:border-b-0 md:border-r-[3px] border-white/20' : ''} hover:bg-white/5 transition-colors relative group`}>
                <div className="text-[120px] font-black text-white/5 absolute top-4 right-4 leading-none pointer-events-none group-hover:text-white/10 transition-colors">
                  {step.num}
                </div>
                <div className="mb-8">{step.icon}</div>
                <h3 className="text-3xl font-bold uppercase mb-4 text-white">{step.title}</h3>
                <p className="text-[#aaa] leading-relaxed text-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / DASHBOARD */}
      <section id="features" className="py-24 px-6 md:px-12 border-b-[3px] border-white/20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">System Specs</h2>
              <ul className="space-y-8">
                {[
                  { title: "Zero-Write Architecture", desc: "We only read. We never post, upvote, or interact on your behalf. Your brand safety is mathematically guaranteed." },
                  { title: "Sub-Second Latency", desc: "From the moment a prospect posts their frustration to the moment it hits your CRM, less time passes than a heartbeat." },
                  { title: "CRM Native", desc: "No new dashboards for your team to check. Signals become tasks in HubSpot/Salesforce automatically." }
                ].map((f, i) => (
                  <li key={i} className="flex gap-6 items-start">
                    <div className="w-10 h-10 border-[2px] border-[#ccff00] flex items-center justify-center shrink-0 mt-1">
                      <Check className="w-6 h-6 text-[#ccff00]" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold uppercase mb-2 text-white">{f.title}</h4>
                      <p className="text-[#aaa] text-lg">{f.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative border-[4px] border-[#00ffff] p-4 bg-black rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="absolute -top-4 -right-4 bg-[#00ffff] text-black px-4 py-1 text-sm font-bold uppercase tracking-widest">
                Dashboard V2
              </div>
              <img 
                src="/__mockup/images/brutalist-dashboard.png" 
                alt="Octopilot Dashboard" 
                className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 border-[2px] border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF */}
      <section className="py-24 px-6 md:px-12 border-b-[3px] border-white/20 bg-[#ccff00] text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 text-center">Field Reports</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "OCTOPILOT found us 3 enterprise deals in the first week that we would have completely missed. The AI summaries are scarily accurate.", author: "Sarah Chen", role: "VP of Sales, Dataloop" },
              { quote: "We replaced our manual Reddit monitoring workflow with OCTOPILOT. What used to take 4 hours a day now happens automatically with better results.", author: "Marcus Rivera", role: "Head of Growth, Forge Analytics" },
              { quote: "The HubSpot integration is seamless. Our SDRs get a task with a ready-to-send opener right in their CRM. Pipeline velocity went up 34%.", author: "Priya Nambiar", role: "RevOps Lead, Stackmesh" }
            ].map((t, i) => (
              <div key={i} className="border-[3px] border-black p-8 bg-white/50 backdrop-blur-sm shadow-[8px_8px_0_0_#000]">
                <Terminal className="w-8 h-8 mb-6 text-black" />
                <p className="text-xl font-medium mb-8 leading-snug">"{t.quote}"</p>
                <div className="border-t-[3px] border-black pt-4">
                  <p className="font-bold uppercase tracking-wide">{t.author}</p>
                  <p className="text-sm font-medium opacity-70">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 px-6 md:px-12 border-b-[3px] border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Capital Allocation</h2>
            <p className="text-xl text-[#888]">Pay for signals. Close deals. Print money.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
            {/* Tier 1 */}
            <div className="border-[3px] border-white/20 p-8 hover:border-white/50 transition-colors bg-black/50">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-2 text-white">Pro</h3>
              <div className="text-5xl font-black mb-6 text-white">$299<span className="text-xl text-[#666]">/mo</span></div>
              <ul className="space-y-4 mb-8 text-[#aaa]">
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ccff00]" /> 5 Keywords</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ccff00]" /> Reddit + Hacker News</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ccff00]" /> HubSpot Integration</li>
                <li className="flex gap-3 opacity-30"><Minus className="w-5 h-5" /> Salesforce Integration</li>
              </ul>
              <a href="/signup" className="block w-full text-center py-4 border-[2px] border-white text-white uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-colors">Select Pro</a>
            </div>

            {/* Tier 2 */}
            <div className="border-[4px] border-[#ff00ff] p-8 bg-black relative shadow-[0_0_40px_rgba(255,0,255,0.15)] md:-translate-y-8">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#ff00ff] text-white px-4 py-1 text-sm font-bold uppercase tracking-widest whitespace-nowrap">
                Standard Issue
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-2 text-white">Growth</h3>
              <div className="text-6xl font-black mb-6 text-white">$599<span className="text-xl text-[#666]">/mo</span></div>
              <ul className="space-y-4 mb-8 text-white">
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ff00ff]" /> 15 Keywords</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ff00ff]" /> Reddit + Hacker News</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ff00ff]" /> HubSpot Integration</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ff00ff]" /> Competitor Tracking</li>
              </ul>
              <a href="/signup" className="block w-full text-center py-4 bg-[#ff00ff] text-white uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-colors border-[2px] border-[#ff00ff]">Select Growth</a>
            </div>

            {/* Tier 3 */}
            <div className="border-[3px] border-white/20 p-8 hover:border-white/50 transition-colors bg-black/50">
              <h3 className="text-2xl font-bold uppercase tracking-widest mb-2 text-white">Enterprise</h3>
              <div className="text-5xl font-black mb-6 text-white">$1200<span className="text-xl text-[#666]">/mo</span></div>
              <ul className="space-y-4 mb-8 text-[#aaa]">
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ccff00]" /> Unlimited Keywords</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ccff00]" /> Custom Data Sources</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ccff00]" /> HubSpot & Salesforce</li>
                <li className="flex gap-3"><Check className="w-5 h-5 text-[#ccff00]" /> Dedicated Success Rep</li>
              </ul>
              <a href="/signup" className="block w-full text-center py-4 border-[2px] border-white text-white uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-colors">Select Enterprise</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 md:px-12 border-b-[3px] border-white/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-16 border-l-[8px] border-[#00ffff] pl-6 text-white">Interrogation</h2>
          
          <div className="space-y-4">
            {[
              { q: "How does OCTOPILOT find buying signals?", a: "We maintain persistent, high-frequency scrapers on targeted subreddits and HN. When a post matches your parameters, it's pushed to our LLM cluster which evaluates the semantic intent behind the text to filter out noise." },
              { q: "Does OCTOPILOT post anything on my behalf?", a: "No. Zero-Write Architecture. We are a listening outpost only. We do not require active social accounts, we do not post, and we cannot get your brand banned." },
              { q: "Which CRMs do you support?", a: "Native, bi-directional integration with HubSpot is live. Salesforce integration is in active development and deploying to Enterprise clients next quarter." },
              { q: "Can I try before paying?", a: "Yes. 14-day operational trial. No credit card required to deploy the sensors." }
            ].map((faq, i) => (
              <div key={i} className="border-[3px] border-white/20 bg-black">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left p-6 flex justify-between items-center focus:outline-none hover:bg-white/5"
                >
                  <h3 className="text-xl md:text-2xl font-bold text-white">{faq.q}</h3>
                  {openFaq === i ? <Minus className="w-6 h-6 text-[#00ffff]" /> : <Plus className="w-6 h-6 text-white/50" />}
                </button>
                {openFaq === i && (
                  <div className="p-6 pt-0 text-[#aaa] text-lg border-t-[1px] border-white/10">
                    <p className="pl-4 border-l-[2px] border-[#00ffff]">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 md:px-12 bg-[#00ffff] text-black text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMCwwLDAsMC4wNSkiLz48L3N2Zz4=')]"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">Deploy Sensors.</h2>
          <p className="text-2xl font-medium mb-12 opacity-80 max-w-2xl mx-auto">Stop leaving pipeline on the table. Start monitoring your market intent today.</p>
          <a 
            href="/signup" 
            className="inline-block bg-black text-[#00ffff] px-12 py-6 text-2xl uppercase font-black tracking-widest hover:scale-105 transition-transform shadow-[12px_12px_0_0_rgba(0,0,0,0.3)]"
          >
            Commence Trial
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 md:px-12 bg-black border-t-[12px] border-[#00ffff]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white flex items-center justify-center text-black font-black text-sm">O</div>
            <span className="text-2xl font-black tracking-tighter uppercase text-white">Octopilot</span>
          </div>
          <div className="text-[#666] text-sm font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} Revenue Intelligence Systems
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-[#666] hover:text-white uppercase text-sm font-bold tracking-widest transition-colors">Terms</a>
            <a href="#" className="text-[#666] hover:text-white uppercase text-sm font-bold tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-[#666] hover:text-white uppercase text-sm font-bold tracking-widest transition-colors">Status</a>
          </div>
        </div>
      </footer>

      {/* CSS For Marquee */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-\\[marquee_20s_linear_infinite\\] {
          animation: marquee 20s linear infinite;
        }
        .stroke-text {
          -webkit-text-stroke: 1px transparent;
        }
      `}</style>
    </div>
  );
}
