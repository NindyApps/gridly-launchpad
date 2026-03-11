import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  BrainCircuit, 
  Check, 
  ChevronDown, 
  Database, 
  Globe, 
  LayoutDashboard, 
  LineChart, 
  MessageSquare, 
  Radar, 
  Search, 
  Shield, 
  Sparkles, 
  Target, 
  Users,
  Zap,
  Star
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
    <span className="inline-grid w-[240px] text-left ml-2">
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

export default function PremiumDepth() {
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
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }

        @keyframes float-particles {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }
        .particles-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .particles-bg::before, .particles-bg::after {
          content: '';
          position: absolute;
          width: 200%;
          height: 200%;
          top: -50%;
          left: -50%;
          background-image: radial-gradient(circle, rgba(52, 211, 153, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          transform-origin: center;
          animation: float-particles 20s linear infinite;
        }
        .particles-bg::after {
          background-size: 60px 60px;
          animation-duration: 30s;
          animation-direction: reverse;
        }

        @keyframes rotate-glow {
          0% { transform: rotate(0deg) translate(-50%, -50%); }
          100% { transform: rotate(360deg) translate(-50%, -50%); }
        }
        .animate-rotate-glow {
          animation: rotate-glow 10s linear infinite;
          transform-origin: 0 0;
        }

        @keyframes border-breathe {
          0% { border-color: rgba(52, 211, 153, 0.3); box-shadow: 0 0 20px -5px rgba(52, 211, 153, 0.1); }
          50% { border-color: rgba(52, 211, 153, 0.8); box-shadow: 0 0 40px 0px rgba(52, 211, 153, 0.3); }
          100% { border-color: rgba(52, 211, 153, 0.3); box-shadow: 0 0 20px -5px rgba(52, 211, 153, 0.1); }
        }
        .animate-border-breathe {
          animation: border-breathe 4s ease-in-out infinite;
        }

        @keyframes radar-pulse {
          0% { transform: scale(0.8); opacity: 0.8; border-width: 2px; }
          100% { transform: scale(2.5); opacity: 0; border-width: 1px; }
        }
        .radar-circle {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 2px solid rgba(52, 211, 153, 0.5);
          animation: radar-pulse 4s cubic-bezier(0.1, 0.5, 0.5, 1) infinite;
        }
        .radar-circle-2 { animation-delay: 1.3s; }
        .radar-circle-3 { animation-delay: 2.6s; }
        
        .diagonal-pattern {
          background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.01) 0, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 10px);
        }
      `}} />

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
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-[#0a0d0f]">
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/refined-b-hero-bg.png" 
            alt="" 
            className="w-full h-full object-cover opacity-60 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0d0f]/80 to-[#0a0d0f]"></div>
          
          {/* Radial Emerald Glow 1 - Center */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none"></div>
          
          {/* Radial Emerald Glow 2 - Right offset (Depth) */}
          <div className="absolute top-20 right-[-10%] w-[600px] h-[400px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center justify-center relative mb-8"
          >
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-pulse-ring"></div>
            <div className="relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span>Now monitoring 50M+ tech conversations daily</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1] text-white"
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
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 drop-shadow-sm"
          >
            Stop missing high-intent conversations. Octopilot monitors social channels for buying signals and auto-injects hot leads directly into your CRM.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="h-12 px-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full w-full sm:w-auto text-base transition-all shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)] hover:shadow-[0_0_40px_-5px_rgba(52,211,153,0.6)]">
              Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 border-white/10 hover:bg-white/5 font-semibold rounded-full w-full sm:w-auto text-base backdrop-blur-sm">
              Book a Demo
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-20 relative max-w-5xl mx-auto"
          >
            {/* Dashboard Mockup Container */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0f1418] shadow-[0_20px_60px_-15px_rgba(52,211,153,0.1)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
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
                {/* Gradient mask for bottom fade to merge into next section */}
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0d0f] to-transparent"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Strip - Added */}
      <section className="py-10 border-y border-white/5 bg-gradient-to-r from-[#0a0d0f] via-[#0c1014] to-[#0a0d0f] relative z-10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-medium text-zinc-500 mb-6 uppercase tracking-widest">Powering revenue teams at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Placeholders for logos */}
            <div className="text-xl font-bold font-display text-white">CloudScale</div>
            <div className="text-xl font-bold font-display text-white flex items-center gap-1"><Zap className="w-5 h-5"/> Nexus</div>
            <div className="text-xl font-bold font-display text-white italic">DataStack</div>
            <div className="text-xl font-bold font-display text-white tracking-widest">AERIS</div>
            <div className="text-xl font-bold font-display text-white">Vortex</div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative z-10 bg-[#0c1014] diagonal-pattern">
        {/* Gradient transition top */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0a0d0f] to-transparent"></div>
        
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Convert noise into pipeline</h2>
            <p className="text-zinc-400 text-lg">
              Set up your intent signals in minutes and let our AI agents do the heavy lifting of identifying your next customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Animated Connecting Line */}
            <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-emerald-500/10 via-emerald-400/50 to-emerald-500/10 animate-gradient-shift"></div>

            {[
              {
                icon: <Radar className="w-6 h-6 text-emerald-400" />,
                title: "Define Trackers",
                desc: "Set up keywords, competitor names, or topics. We monitor millions of posts in real-time.",
                hoverAccent: "group-hover:border-emerald-500/50",
                glowAccent: "via-emerald-500/50"
              },
              {
                icon: <BrainCircuit className="w-6 h-6 text-teal-400" />,
                title: "AI Analysis",
                desc: "Our models score each mention for buying intent, filtering out noise and complaints.",
                hoverAccent: "group-hover:border-teal-500/50",
                glowAccent: "via-teal-500/50"
              },
              {
                icon: <Database className="w-6 h-6 text-cyan-400" />,
                title: "CRM Sync",
                desc: "High-intent signals are automatically injected into Salesforce or HubSpot for your SDRs.",
                hoverAccent: "group-hover:border-cyan-500/50",
                glowAccent: "via-cyan-500/50"
              }
            ].map((step, i) => (
              <div key={i} className="relative group">
                <div className={`h-full bg-[#12181c]/80 border border-white/5 rounded-2xl p-8 transition-all duration-300 relative overflow-hidden backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-1`}>
                  {/* Subtle top glow on hover - distinct colors */}
                  <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent ${step.glowAccent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Glass highlight */}
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>

                  <div className={`w-16 h-16 rounded-2xl bg-[#0a0d0f] border border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-inner transition-colors duration-300 ${step.hoverAccent}`}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 relative bg-[#0a0d0f] overflow-hidden">
        {/* Gradient transition top */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0c1014] to-transparent z-10"></div>
        
        {/* CSS Particles Background */}
        <div className="particles-bg"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Built for revenue teams</h2>
            <p className="text-zinc-400 text-lg">
              Everything you need to operationalize social selling at scale.
            </p>
          </div>

          <div className="space-y-32">
            {/* Feature 1 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6 backdrop-blur-md">
                  <BarChart3 className="w-3 h-3" />
                  <span>Intent Analytics</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white drop-shadow-sm">Measure the pulse of your market</h3>
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
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 md:order-2 relative rounded-2xl border border-white/10 bg-[#0f1418] p-2 shadow-[0_0_50px_-12px_rgba(52,211,153,0.15)] overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
                 <img src="/__mockup/images/refined-b-feature-analytics.png" alt="Analytics" className="rounded-xl relative z-10 w-full" />
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative rounded-2xl border border-white/10 bg-[#0f1418] p-2 shadow-[0_0_50px_-12px_rgba(52,211,153,0.15)] overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent z-0 opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none"></div>
                 <img src="/__mockup/images/refined-b-feature-ai.png" alt="AI Openers" className="rounded-xl relative z-10 w-full" />
              </div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6 backdrop-blur-md">
                  <MessageSquare className="w-3 h-3" />
                  <span>AI Openers</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white drop-shadow-sm">Contextual outreach at scale</h3>
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
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.2)]">
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
             <p className="text-sm text-emerald-400/80 flex items-center justify-center gap-2 bg-emerald-500/5 inline-flex px-4 py-2 rounded-full border border-emerald-500/10">
               <Sparkles className="w-4 h-4" /> Coming soon: Automated Outreach Sequences & LinkedIn Deep Scrape
             </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-[#0c1014] relative overflow-hidden diagonal-pattern">
        {/* Gradient transitions */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0a0d0f] to-transparent z-10"></div>

        {/* Aggregate Trust Indicator */}
        <div className="container mx-auto px-6 relative z-10 mb-16 border-b border-white/5 pb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto">
            <div className="text-center md:text-left">
              <div className="text-4xl font-display font-bold text-white mb-1">500+</div>
              <div className="text-zinc-400 text-sm">Revenue Teams</div>
            </div>
            <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-emerald-400 mb-1">3.2x</div>
              <div className="text-zinc-400 text-sm">Avg. Pipeline Increase</div>
            </div>
            <div className="h-12 w-[1px] bg-white/10 hidden md:block"></div>
            <div className="text-center md:text-right">
              <div className="flex items-center justify-center md:justify-end gap-1 mb-2">
                {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-emerald-500 text-emerald-500" />)}
              </div>
              <div className="text-zinc-400 text-sm">4.9/5 on G2 Crowd</div>
            </div>
          </div>
        </div>

        {/* Rotating/shifting glow behind testimonials */}
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none animate-rotate-glow z-0"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Trusted by fast-growing teams</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
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
                avatar: "MR",
                highlight: true
              },
              {
                quote: "We were missing so many buying signals on Reddit. OCTOPILOT surfaced 3 enterprise deals for us in the first month.",
                author: "Priya Nambiar",
                role: "Founding AE, DataStack",
                avatar: "PN"
              }
            ].map((t, i) => (
              <div key={i} className={`bg-[#12181c]/90 border ${t.highlight ? 'border-emerald-500/30 shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)]' : 'border-white/5'} rounded-2xl p-8 backdrop-blur-xl relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
                {/* Accent line */}
                <div className={`absolute top-0 left-0 w-1 h-full ${t.highlight ? 'bg-emerald-400' : 'bg-gradient-to-b from-emerald-500/30 to-transparent'}`}></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div className="text-emerald-400 opacity-50">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-emerald-500/80 text-emerald-500/80" />)}
                  </div>
                </div>

                <p className="text-zinc-300 mb-8 text-lg leading-relaxed relative z-10">"{t.quote}"</p>
                <div className="flex items-center gap-4 mt-auto relative z-10">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold shadow-inner">
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
      <section id="pricing" className="py-24 bg-[#0a0d0f] relative overflow-hidden">
        {/* Gradient transition */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0c1014] to-transparent z-10"></div>
        
        {/* Deep background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Simple, transparent pricing</h2>
            <div className="flex items-center justify-center gap-3 mt-8">
              <span className="text-zinc-400 text-sm font-medium">Billed Monthly</span>
              <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30">
                <div className="absolute right-1 top-[1px] w-4 h-4 bg-emerald-400 rounded-full shadow-sm"></div>
              </div>
              <span className="text-white text-sm font-medium">Billed Annually <span className="text-emerald-400 text-xs ml-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Save 20%</span></span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Pro */}
            <div className="bg-[#12181c]/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl flex flex-col md:translate-y-4 hover:border-white/10 transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Pro</h3>
              <div className="text-zinc-400 text-sm mb-6">For early stage startups</div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$299</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <Button variant="outline" className="w-full mb-8 border-white/10 hover:bg-white/5 text-white">Start Free Trial</Button>
              <div className="space-y-4 flex-1">
                {[
                  "3 Tracker topics",
                  "1,000 signals/month",
                  "Reddit & Hacker News",
                  "Basic filtering",
                  "Slack integration"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                    <Check className="w-4 h-4 text-emerald-500/70" /> {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Growth */}
            <div className="bg-[#0f1418] rounded-3xl p-8 relative flex flex-col shadow-2xl z-10 animate-border-breathe border-2 border-emerald-500/50">
              <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent rounded-3xl pointer-events-none"></div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-emerald-950 text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-lg">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2 text-white relative">Growth</h3>
              <div className="text-zinc-300 text-sm mb-6 relative">For scaling revenue teams</div>
              <div className="mb-6 relative">
                <span className="text-5xl font-bold text-white">$599</span>
                <span className="text-zinc-400">/mo</span>
              </div>
              <Button className="w-full mb-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)] h-12 text-base relative">Start Free Trial</Button>
              <div className="space-y-4 flex-1 relative">
                {[
                  "10 Tracker topics",
                  "5,000 signals/month",
                  "All data sources",
                  "Advanced AI filtering",
                  "Salesforce/HubSpot sync",
                  "AI Openers generation"
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3 text-white text-sm font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-400" />
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div className="bg-[#12181c]/50 border border-white/5 rounded-3xl p-8 backdrop-blur-xl flex flex-col md:translate-y-4 hover:border-white/10 transition-colors">
              <h3 className="text-xl font-bold mb-2 text-white">Enterprise</h3>
              <div className="text-zinc-400 text-sm mb-6">For large organizations</div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">$1,200</span>
                <span className="text-zinc-500">/mo</span>
              </div>
              <Button variant="outline" className="w-full mb-8 border-white/10 hover:bg-white/5 text-white">Contact Sales</Button>
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
                    <Check className="w-4 h-4 text-emerald-500/70" /> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 border-t border-white/5 bg-[#0c1014] diagonal-pattern relative">
        {/* Gradient transition */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#0a0d0f] to-transparent z-10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-white">Frequently asked questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${faqOpen === i ? 'bg-[#151b21] border-emerald-500/30 shadow-[0_0_30px_-10px_rgba(52,211,153,0.1)]' : 'bg-[#12181c]/50 border-white/5 hover:border-white/10'}`}
              >
                <button 
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className={`font-semibold text-lg ${faqOpen === i ? 'text-white' : 'text-zinc-200'}`}>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${faqOpen === i ? 'rotate-180 text-emerald-400' : ''}`} />
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-zinc-400 leading-relaxed border-t border-white/5 pt-4">
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
      <section className="py-32 relative overflow-hidden bg-[#0a0d0f]">
        {/* Gradient transition */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0c1014] to-transparent z-20"></div>

        {/* Sonar/Radar Effects */}
        <div className="absolute inset-0 flex items-center justify-center z-0 overflow-hidden pointer-events-none">
          <div className="w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(52,211,153,0.15)_0%,transparent_60%)]"></div>
          
          <div className="radar-circle w-[200px] h-[200px]"></div>
          <div className="radar-circle radar-circle-2 w-[200px] h-[200px]"></div>
          <div className="radar-circle radar-circle-3 w-[200px] h-[200px]"></div>
          
          {/* Subtle noise texture */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\'0 0 200 200\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cfilter id=\\'noiseFilter\\'%3E%3CfeTurbulence type=\\'fractalNoise\\' baseFrequency=\\'0.65\\' numOctaves=\\'3\\' stitchTiles=\\'stitch\\'/%3E%3C/filter%3E%3Crect width=\\'100%25\\' height=\\'100%25\\' filter=\\'url(%23noiseFilter)\\'/%3E%3C/svg%3E")' }}></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto bg-[#12181c]/80 border border-white/10 rounded-3xl p-10 md:p-16 text-center backdrop-blur-xl shadow-[0_0_50px_-10px_rgba(52,211,153,0.2)]">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-8">
              <Radar className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">Stop missing deals.</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              Join hundreds of revenue teams turning social chatter into qualified pipeline. Setup takes less than 5 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-10 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full w-full sm:w-auto text-lg shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)]">
                Start 14-Day Free Trial
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-10 border-white/10 hover:bg-white/5 font-semibold rounded-full w-full sm:w-auto text-lg text-white">
                Talk to Sales
              </Button>
            </div>
            <p className="text-sm text-zinc-500 mt-6">No credit card required. Cancel anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0d0f] border-t border-white/5 py-12 relative">
        {/* Subtle top gradient glow connecting to page */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-6 h-6 rounded-md bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                  <Radar className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="font-display font-bold tracking-tight text-white">OCTOPILOT</span>
              </div>
              <p className="text-sm text-zinc-500 mb-6 max-w-xs">
                The revenue signal intelligence platform for modern B2B teams.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-zinc-500 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Community</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
            <div>© 2024 Octopilot Inc. All rights reserved.</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
