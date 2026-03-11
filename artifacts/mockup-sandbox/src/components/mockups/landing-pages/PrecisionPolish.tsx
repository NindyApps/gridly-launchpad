import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  BrainCircuit, 
  Check, 
  ChevronDown, 
  Database, 
  MessageSquare, 
  Radar, 
  Sparkles
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

export default function PrecisionPolish() {
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
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0d0f]/60 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0d0f]/40">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Radar className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">OCTOPILOT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex text-zinc-300 hover:text-white hover:bg-white/5">
              Log in
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold rounded-full px-6">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-24 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/refined-b-hero-bg.png" 
            alt="" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d0f]/80 to-[#0a0d0f]"></div>
          
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Radial Emerald Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Now monitoring 50M+ tech conversations daily</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1]"
          >
            Turn developer chatter on
            <br className="hidden md:block" />
            <AnimatedText />
            <br className="hidden md:block" />
            into qualified pipeline.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            Stop missing high-intent conversations. Octopilot monitors social channels for buying signals and auto-injects hot leads directly into your CRM.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button size="lg" className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full w-full sm:w-auto text-base transition-all shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_-5px_rgba(52,211,153,0.6)]">
              Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 border-white/10 hover:bg-white/5 font-semibold rounded-full w-full sm:w-auto text-base backdrop-blur-sm">
              Book a Demo
            </Button>
          </motion.div>

          {/* Social Proof Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mb-20"
          >
            <p className="text-sm text-zinc-500 font-medium mb-6 uppercase tracking-widest">Trusted by 200+ revenue teams</p>
            <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-50">
              {['CloudScale', 'Nexus', 'DataStack', 'Velocity', 'Apex'].map((logo, i) => (
                <div key={i} className="text-xl md:text-2xl font-display font-bold text-zinc-400 tracking-tight">
                  {logo}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Dashboard Mockup Container */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0f1418] shadow-2xl shadow-emerald-500/10 overflow-hidden">
              <div className="h-10 bg-[#151b21] border-b border-white/5 flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="/__mockup/images/refined-b-dashboard.png" 
                  alt="Octopilot Dashboard" 
                  className="w-full h-auto opacity-90"
                />
                {/* Gradient mask for bottom fade */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0d0f] to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative z-10 bg-[#0a0d0f]">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Convert noise into pipeline</h2>
            <p className="text-zinc-400 text-lg">
              Set up your intent signals in minutes and let our AI agents do the heavy lifting of identifying your next customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative max-w-6xl mx-auto">
            {/* Connecting Line - Strengthened */}
            <div className="hidden md:block absolute top-[48px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>

            {[
              {
                num: "01",
                icon: <Radar className="w-6 h-6 text-emerald-400 relative z-10" />,
                title: "Define Trackers",
                desc: "Set up keywords, competitor names, or topics. We monitor millions of posts in real-time."
              },
              {
                num: "02",
                icon: <BrainCircuit className="w-6 h-6 text-emerald-400 relative z-10" />,
                title: "AI Analysis",
                desc: "Our models score each mention for buying intent, filtering out noise and complaints."
              },
              {
                num: "03",
                icon: <Database className="w-6 h-6 text-emerald-400 relative z-10" />,
                title: "CRM Sync",
                desc: "High-intent signals are automatically injected into Salesforce or HubSpot for your SDRs."
              }
            ].map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative group"
              >
                <div className="h-full bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden backdrop-blur-sm pt-10">
                  {/* Subtle top glow on hover */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Step Number Background */}
                  <div className="absolute top-4 right-6 text-8xl font-display font-black text-white/[0.03] select-none pointer-events-none group-hover:text-emerald-500/[0.03] transition-colors">
                    {step.num}
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-[#0f1418] border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-lg group-hover:border-emerald-500/30 transition-colors">
                    {step.icon}
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-3">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed text-lg">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative border-t border-white/5 bg-[#0f1418]/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Built for revenue teams</h2>
            <p className="text-zinc-400 text-lg">
              Everything you need to operationalize social selling at scale.
            </p>
          </div>

          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                  <BarChart3 className="w-3 h-3" />
                  <span>Intent Analytics</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Measure the pulse of your market</h3>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  Track topic velocity, sentiment trends, and share of voice against competitors. Identify macro shifts before they show up in search volume.
                </p>
                <ul className="space-y-4">
                  {[
                    "Real-time volume tracking by keyword",
                    "Sentiment analysis on brand mentions",
                    "Competitor mention comparisons",
                    "Exportable reports for leadership"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 relative rounded-2xl border border-white/10 bg-[#0a0d0f] p-2 shadow-2xl overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent z-0"></div>
                 <img src="/__mockup/images/refined-b-feature-analytics.png" alt="Analytics" className="rounded-xl relative z-10 w-full" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl border border-white/10 bg-[#0a0d0f] p-2 shadow-2xl overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent z-0"></div>
                 <img src="/__mockup/images/refined-b-feature-ai.png" alt="AI Openers" className="rounded-xl relative z-10 w-full" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                  <MessageSquare className="w-3 h-3" />
                  <span>AI Openers</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Contextual outreach at scale</h3>
                <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                  Don't send generic templates. Our LLMs generate highly contextual, non-salesy opening messages based on the exact thread the prospect posted.
                </p>
                <ul className="space-y-4">
                  {[
                    "Thread-aware context generation",
                    "Adjustable tone (helpful, direct, casual)",
                    "One-click copy to clipboard",
                    "Automatic CRM logging"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-24 text-center">
             <p className="text-sm text-zinc-500 flex items-center justify-center gap-2">
               <Sparkles className="w-4 h-4" /> Coming soon: Automated Outreach Sequences & LinkedIn Deep Scrape
             </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 border-t border-white/5 relative overflow-hidden bg-[#0a0d0f]">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Trusted by fast-growing teams</h2>
            
            {/* Aggregate Stats */}
            <div className="inline-flex flex-wrap justify-center items-center gap-3 md:gap-6 px-6 py-3 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-300 text-sm font-medium mt-4">
              <span>200+ revenue teams</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30"></span>
              <span>$2.4M pipeline generated</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/30"></span>
              <span>40% avg increase in meetings booked</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
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
              <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group hover:bg-white/[0.04] transition-colors">
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500/50 to-transparent"></div>
                
                <div className="text-emerald-400 mb-6 opacity-50">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-zinc-300 mb-8 text-lg leading-relaxed">"{t.quote}"</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{t.author}</div>
                    <div className="text-sm text-zinc-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 border-t border-white/5 bg-[#0f1418]/30 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Simple, transparent pricing</h2>
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className="text-zinc-400 text-sm font-medium">Billed Monthly</span>
              <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
              </div>
              <span className="text-white text-sm font-medium">Billed Annually <span className="text-emerald-400 text-xs ml-1">(Save 20%)</span></span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pro */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm flex flex-col mt-4"
            >
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-zinc-400 text-sm mb-6">For early stage startups</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$299</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <Button variant="outline" className="w-full mb-8 border-white/10 hover:bg-white/5">Start Free Trial</Button>
              <div className="space-y-4 flex-1">
                {[
                  "3 Tracker topics",
                  "1,000 signals/month",
                  "Reddit & Hacker News",
                  "Basic filtering",
                  "Slack integration"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <Check className="w-4 h-4 text-emerald-400" /> {f}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Growth */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-[#12181c] border border-emerald-500/50 rounded-2xl p-8 relative flex flex-col shadow-[0_0_40px_-10px_rgba(52,211,153,0.15)] transform md:-translate-y-4"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-400 to-emerald-500/0"></div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2">Growth</h3>
              <div className="text-zinc-400 text-sm mb-6">For scaling revenue teams</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$599</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <Button className="w-full mb-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold">Start Free Trial</Button>
              <div className="space-y-4 flex-1">
                {[
                  "10 Tracker topics",
                  "5,000 signals/month",
                  "All data sources",
                  "Advanced AI filtering",
                  "Salesforce/HubSpot sync",
                  "AI Openers generation"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-white text-sm">
                    <Check className="w-4 h-4 text-emerald-400" /> {f}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Enterprise */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm flex flex-col mt-4"
            >
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <div className="text-zinc-400 text-sm mb-6">For large organizations</div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$1,200</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <Button variant="outline" className="w-full mb-8 border-white/10 hover:bg-white/5">Contact Sales</Button>
              <div className="space-y-4 flex-1">
                {[
                  "Unlimited topics",
                  "Unlimited signals",
                  "Custom integrations",
                  "Dedicated success manager",
                  "Custom AI training",
                  "SLA guarantees"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <Check className="w-4 h-4 text-emerald-400" /> {f}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5 bg-[#0a0d0f]">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Frequently asked questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`border border-white/5 rounded-xl overflow-hidden transition-colors relative ${faqOpen === i ? 'bg-white/[0.04]' : 'bg-transparent hover:bg-white/[0.02]'}`}
              >
                {/* Emerald Accent Bar for Open State */}
                {faqOpen === i && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                )}
                
                <button 
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className={`font-medium text-lg ${faqOpen === i ? 'text-white' : 'text-zinc-300'}`}>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform ${faqOpen === i ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-zinc-400 leading-relaxed text-lg">
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
      <section className="py-32 relative overflow-hidden border-t border-white/5 bg-[#0a0d0f]">
        {/* Cleaner glow, no grid */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight max-w-4xl mx-auto">
            Start finding your next customers
          </h2>
          <p className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
            Join the forward-thinking revenue teams already using OCTOPILOT to turn social noise into high-converting pipeline.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-10 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full w-full sm:w-auto text-lg shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)]">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-10 border-white/10 hover:bg-white/5 font-semibold rounded-full w-full sm:w-auto text-lg backdrop-blur-sm">
              Talk to Sales
            </Button>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Join 200+ teams closing more deals
            </div>
            <p className="text-sm text-zinc-500 mt-2">14-day free trial. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#060809] pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Radar className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="font-display font-bold text-lg tracking-tight">OCTOPILOT</span>
              </div>
              <p className="text-sm text-zinc-400 mb-6">
                B2B revenue signal intelligence. Find buying intent before your competitors do.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Product</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Legal</h4>
              <ul className="space-y-4 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Octopilot Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-zinc-500">
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
