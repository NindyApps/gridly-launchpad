import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  BrainCircuit, 
  Check, 
  ChevronDown, 
  Database, 
  Radar, 
  Sparkles, 
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AnimatedText = () => {
  const words = ["Reddit", "Hacker News", "X", "LinkedIn"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-grid w-[200px] text-left ml-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="col-start-1 row-start-1 text-emerald-400 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-400"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default function MaxReadability() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does OCTOPILOT find intent?",
      answer: "Our AI agents continuously monitor relevant subreddits, HN discussions, and social feeds for specific keywords and buying patterns related to your product."
    },
    {
      question: "Which CRMs do you integrate with?",
      answer: "We currently support direct integrations with Salesforce and HubSpot. You can also export data via CSV or connect via our API."
    },
    {
      question: "Is this compliant with platform terms?",
      answer: "Yes, we only access public data through official APIs and standard web crawling practices that respect robots.txt."
    },
    {
      question: "How long does setup take?",
      answer: "You can be up and running in less than 5 minutes. Just enter your target keywords, connect your CRM, and signals will start flowing immediately."
    },
    {
      question: "Can I try it before buying?",
      answer: "Yes, all plans come with a 14-day free trial so you can evaluate the quality of leads before committing."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0d0f] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Skip Navigation for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-emerald-950 focus:rounded-md focus:font-bold">
        Skip to main content
      </a>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/[0.08] bg-[#0a0d0f]/90 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0d0f]/80">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Radar className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">OCTOPILOT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-base font-medium text-zinc-300">
            <a href="#how-it-works" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded px-2 py-1 -mx-2">How it Works</a>
            <a href="#features" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded px-2 py-1 -mx-2">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded px-2 py-1 -mx-2">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex text-zinc-300 hover:text-white hover:bg-white/5 text-base">
              Log in
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full px-6 text-base">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          {/* Background Effects - Simplified for Readability */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/__mockup/images/refined-b-hero-bg.png" 
              alt="" 
              className="w-full h-full object-cover opacity-30"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d0f]/90 to-[#0a0d0f]"></div>
            
            {/* Reduced Radial Emerald Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-base font-medium mb-10"
            >
              <Sparkles className="w-4 h-4" />
              <span>Now monitoring 50M+ tech conversations daily</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-7xl font-display font-bold tracking-tight mb-10 max-w-5xl mx-auto leading-[1.2]"
            >
              Turn developer chatter on
              <br />
              <AnimatedText />
              <br />
              into qualified pipeline.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-zinc-300 max-w-[60ch] mx-auto mb-12 leading-loose"
            >
              Stop missing high-intent conversations. Octopilot monitors social channels for buying signals and auto-injects hot leads directly into your CRM.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Button size="lg" className="h-14 px-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full w-full sm:w-auto text-lg transition-all">
                Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 border-white/[0.15] hover:bg-white/10 font-bold rounded-full w-full sm:w-auto text-lg backdrop-blur-sm text-white">
                Book a Demo
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-24 relative max-w-5xl mx-auto"
            >
              {/* Dashboard Mockup Container */}
              <div className="relative rounded-2xl border border-white/[0.08] bg-[#0f1418] shadow-2xl shadow-emerald-500/5 overflow-hidden">
                <div className="h-12 bg-[#151b21] border-b border-white/[0.08] flex items-center px-4 gap-2">
                  <div className="flex gap-2">
                    <div className="w-3.5 h-3.5 rounded-full bg-rose-500/80"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-amber-500/80"></div>
                    <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/80"></div>
                  </div>
                </div>
                <div className="relative">
                  <img 
                    src="/__mockup/images/refined-b-dashboard.png" 
                    alt="Octopilot Dashboard interface showing signal feed and analytics" 
                    className="w-full h-auto"
                  />
                  {/* Gradient mask for bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0d0f] to-transparent"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-28 relative z-10">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-10">Convert noise into pipeline</h2>
              <p className="text-zinc-300 text-xl leading-loose max-w-[60ch] mx-auto">
                Set up your intent signals in minutes and let our AI agents do the heavy lifting of identifying your next customers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line - Simplified */}
              <div className="hidden md:block absolute top-[60px] left-[15%] right-[15%] h-[2px] bg-white/[0.05]"></div>

              {[
                {
                  icon: <Radar className="w-8 h-8 text-emerald-400" />,
                  title: "Define Trackers",
                  desc: "Set up keywords, competitor names, or topics. We monitor millions of posts in real-time."
                },
                {
                  icon: <BrainCircuit className="w-8 h-8 text-emerald-400" />,
                  title: "AI Analysis",
                  desc: "Our models score each mention for buying intent, filtering out noise and complaints."
                },
                {
                  icon: <Database className="w-8 h-8 text-emerald-400" />,
                  title: "CRM Sync",
                  desc: "High-intent signals are automatically injected into Salesforce or HubSpot for your SDRs."
                }
              ].map((step, i) => (
                <div key={i} className="relative group">
                  <div className="h-full bg-white/[0.02] border border-white/[0.08] rounded-2xl p-10 transition-colors relative overflow-hidden backdrop-blur-sm group-hover:bg-white/[0.04] group-hover:border-emerald-500/30">
                    <div className="w-20 h-20 rounded-2xl bg-[#0a0d0f] border border-white/[0.15] flex items-center justify-center mb-8 relative z-10 shadow-lg">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-zinc-300 text-lg leading-loose">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-28 relative border-t border-white/[0.08] bg-[#0f1418]/50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-24">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-10">Built for revenue teams</h2>
              <p className="text-zinc-300 text-xl leading-loose max-w-[60ch] mx-auto">
                Everything you need to operationalize social selling at scale.
              </p>
            </div>

            <div className="space-y-40">
              {/* Feature 1 */}
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold mb-8">
                    <BarChart3 className="w-4 h-4" />
                    <span>Intent Analytics</span>
                  </div>
                  <h3 className="text-4xl font-display font-bold mb-8 leading-tight">Measure the pulse of your market</h3>
                  <p className="text-zinc-300 text-xl mb-10 leading-loose max-w-[60ch]">
                    Track topic velocity, sentiment trends, and share of voice against competitors. Identify macro shifts before they show up in search volume.
                  </p>
                  <ul className="space-y-5">
                    {[
                      "Real-time volume tracking by keyword",
                      "Sentiment analysis on brand mentions",
                      "Competitor mention comparisons",
                      "Exportable reports for leadership"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-zinc-200 text-lg">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 md:order-2 relative rounded-2xl border border-white/[0.08] bg-[#0a0d0f] p-3 shadow-2xl overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent z-0"></div>
                   <img src="/__mockup/images/refined-b-feature-analytics.png" alt="Analytics Interface" className="rounded-xl relative z-10 w-full" />
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative rounded-2xl border border-white/[0.08] bg-[#0a0d0f] p-3 shadow-2xl overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent z-0"></div>
                   <img src="/__mockup/images/refined-b-feature-ai.png" alt="AI Openers Interface" className="rounded-xl relative z-10 w-full" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold mb-8">
                    <MessageSquare className="w-4 h-4" />
                    <span>AI Openers</span>
                  </div>
                  <h3 className="text-4xl font-display font-bold mb-8 leading-tight">Contextual outreach at scale</h3>
                  <p className="text-zinc-300 text-xl mb-10 leading-loose max-w-[60ch]">
                    Don't send generic templates. Our LLMs generate highly contextual, non-salesy opening messages based on the exact thread the prospect posted.
                  </p>
                  <ul className="space-y-5">
                    {[
                      "Thread-aware context generation",
                      "Adjustable tone (helpful, direct, casual)",
                      "One-click copy to clipboard",
                      "Automatic CRM logging"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-zinc-200 text-lg">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="mt-32 text-center">
               <p className="text-base text-zinc-400 flex items-center justify-center gap-3 font-medium">
                 <Sparkles className="w-5 h-5" /> Coming soon: Automated Outreach Sequences & LinkedIn Deep Scrape
               </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-28 border-t border-white/[0.08] relative overflow-hidden">
          {/* Tone down glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-10">Trusted by fast-growing teams</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "It's like having a team of 10 SDRs reading every relevant conversation on the internet. Our meeting booked rate jumped 40%.",
                  author: "Sarah Chen",
                  role: "VP Sales, CloudScale",
                  avatar: "SC"
                },
                {
                  quote: "The CRM injection is flawless. We don't have to train reps on a new tool—the leads just show up in Salesforce with context.",
                  author: "Marcus Rivera",
                  role: "RevOps Director, Nexus",
                  avatar: "MR"
                },
                {
                  quote: "We were missing so many buying signals on Reddit. OCTOPILOT surfaced 3 enterprise deals for us in the first month.",
                  author: "Priya Nambiar",
                  role: "Founding AE, DataStack",
                  avatar: "PN"
                }
              ].map((t, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-10 backdrop-blur-sm relative overflow-hidden flex flex-col">
                  {/* Accent line */}
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500/70"></div>
                  
                  <div className="text-emerald-400 mb-8 opacity-80">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-zinc-200 mb-10 text-xl leading-loose font-medium flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-5 mt-auto">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xl">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{t.author}</div>
                      <div className="text-base text-zinc-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-28 border-t border-white/[0.08] bg-[#0f1418]/30 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-10">Simple, transparent pricing</h2>
              <div className="flex items-center justify-center gap-4 mt-8">
                <span className="text-zinc-300 text-lg font-medium">Billed Monthly</span>
                {/* Visual toggle */}
                <button 
                  role="switch" 
                  aria-checked="false" 
                  aria-label="Toggle annual billing"
                  className="w-14 h-7 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <div className="absolute right-1 top-1 w-5 h-5 bg-emerald-400 rounded-full shadow-sm"></div>
                </button>
                <span className="text-white text-lg font-bold">Billed Annually <span className="text-emerald-400 text-base ml-2 bg-emerald-500/10 px-2 py-1 rounded">(Save 20%)</span></span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Pro */}
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-10 backdrop-blur-sm flex flex-col mt-4">
                <h3 className="text-2xl font-bold mb-3 text-white">Pro</h3>
                <div className="text-zinc-400 text-base mb-8">For early stage startups</div>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">$299</span>
                  <span className="text-zinc-400 text-lg ml-1">/mo</span>
                </div>
                <Button variant="outline" className="w-full mb-10 h-14 border-white/[0.15] hover:bg-white/10 text-white font-bold text-lg">Start Free Trial</Button>
                
                <div className="border-t border-white/[0.08] pt-8 flex-1">
                  <div className="space-y-5">
                    {[
                      "3 Tracker topics",
                      "1,000 signals/month",
                      "Reddit & Hacker News",
                      "Basic filtering",
                      "Slack integration"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-4 text-zinc-300 text-base">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> 
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Growth */}
              <div className="bg-[#12181c] border-2 border-emerald-500 rounded-2xl p-10 relative flex flex-col shadow-[0_0_40px_-10px_rgba(52,211,153,0.15)] transform md:-translate-y-4">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-emerald-950 text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Growth</h3>
                <div className="text-zinc-400 text-base mb-8">For scaling revenue teams</div>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">$599</span>
                  <span className="text-zinc-400 text-lg ml-1">/mo</span>
                </div>
                <Button className="w-full mb-10 h-14 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold text-lg">Start Free Trial</Button>
                
                <div className="border-t border-white/[0.08] pt-8 flex-1">
                  <div className="space-y-5">
                    {[
                      "10 Tracker topics",
                      "5,000 signals/month",
                      "All data sources",
                      "Advanced AI filtering",
                      "Salesforce/HubSpot sync",
                      "AI Openers generation"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-4 text-zinc-100 text-base font-medium">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> 
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enterprise */}
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-10 backdrop-blur-sm flex flex-col mt-4">
                <h3 className="text-2xl font-bold mb-3 text-white">Enterprise</h3>
                <div className="text-zinc-400 text-base mb-8">For large organizations</div>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">$1,200</span>
                  <span className="text-zinc-400 text-lg ml-1">/mo</span>
                </div>
                <Button variant="outline" className="w-full mb-10 h-14 border-white/[0.15] hover:bg-white/10 text-white font-bold text-lg">Contact Sales</Button>
                
                <div className="border-t border-white/[0.08] pt-8 flex-1">
                  <div className="space-y-5">
                    {[
                      "Unlimited topics",
                      "Unlimited signals",
                      "Custom integrations",
                      "Dedicated success manager",
                      "Custom AI training",
                      "SLA guarantees"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-4 text-zinc-300 text-base">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" /> 
                        <span className="leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-28 border-t border-white/[0.08]">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Frequently asked questions</h2>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`border ${faqOpen === i ? 'border-emerald-500/50 bg-white/[0.04]' : 'border-white/[0.08] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.15]'} rounded-xl overflow-hidden transition-all duration-200`}
                >
                  <button 
                    className="w-full flex items-center justify-between p-8 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    aria-expanded={faqOpen === i}
                  >
                    <span className="font-bold text-xl text-white pr-8">{faq.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${faqOpen === i ? 'bg-emerald-500/20' : 'bg-white/5'}`}>
                      <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${faqOpen === i ? 'rotate-180 text-emerald-400' : 'text-zinc-400'}`} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {faqOpen === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-8 pt-0 text-zinc-300 text-lg leading-loose">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden border-t border-white/[0.08]">
          <div className="absolute inset-0 bg-[#0a0d0f]">
             {/* Reduced Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tight leading-[1.1]">
              Start finding your next customers
            </h2>
            <p className="text-2xl text-zinc-300 mb-14 max-w-3xl mx-auto leading-loose">
              Join the forward-thinking revenue teams already using OCTOPILOT to turn social noise into high-converting pipeline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="h-16 px-12 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full w-full sm:w-auto text-xl shadow-[0_0_30px_-5px_rgba(52,211,153,0.3)]">
                Get Started for Free
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-12 border-white/[0.15] hover:bg-white/10 font-bold rounded-full w-full sm:w-auto text-xl backdrop-blur-sm text-white">
                Talk to Sales
              </Button>
            </div>
            <p className="mt-8 text-base text-zinc-400 font-medium">14-day free trial. No credit card required.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] bg-[#060809] pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <Radar className="w-6 h-6 text-emerald-400" />
                <span className="font-display font-bold text-xl tracking-tight text-white">OCTOPILOT</span>
              </div>
              <p className="text-base text-zinc-400 mb-8 leading-relaxed max-w-[30ch]">
                B2B revenue signal intelligence. Find buying intent before your competitors do.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-white text-lg">Product</h4>
              <ul className="space-y-5 text-base text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-white text-lg">Company</h4>
              <ul className="space-y-5 text-base text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-8 text-white text-lg">Legal</h4>
              <ul className="space-y-5 text-base text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/[0.08] pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-base text-zinc-500">
              © {new Date().getFullYear()} Octopilot Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-zinc-400">
              <a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded p-1">
                <span className="sr-only">Twitter</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none rounded p-1">
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
