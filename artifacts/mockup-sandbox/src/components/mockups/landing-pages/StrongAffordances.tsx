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
  Quote
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
    <span className="inline-grid w-[200px] text-left">
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

export default function StrongAffordances() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [activeNavLink, setActiveNavLink] = useState<string>("how-it-works");

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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-emerald-500 text-emerald-950 px-4 py-2 rounded z-50 font-bold">
        Skip to main content
      </a>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-[#0a0d0f]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0d0f]/60" aria-label="Main Navigation">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
              <Radar className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">OCTOPILOT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            {["how-it-works", "features", "pricing"].map((id) => (
              <a 
                key={id}
                href={`#${id}`} 
                onMouseEnter={() => setActiveNavLink(id)}
                className="relative py-2 text-zinc-300 hover:text-white transition-colors"
              >
                {id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                {activeNavLink === id && (
                  <motion.div 
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hidden md:inline-flex text-sm font-semibold text-zinc-300 hover:text-white transition-colors underline-offset-4 hover:underline">
              Log in
            </a>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full px-6 transition-all hover:scale-[1.02] shadow-[0_0_15px_-3px_rgba(52,211,153,0.4)] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d0f]">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden" aria-label="Hero">
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold mb-8 shadow-[0_0_15px_-3px_rgba(52,211,153,0.2)]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Now monitoring 50M+ tech conversations daily</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.2]"
            >
              Turn developer chatter into qualified pipeline on <AnimatedText />
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto mb-10"
            >
              Stop missing high-intent conversations. Octopilot monitors social channels for buying signals and auto-injects hot leads directly into your CRM.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="lg" className="group h-14 px-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full w-full sm:w-auto text-base transition-all hover:scale-[1.02] shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)] hover:shadow-[0_0_40px_-5px_rgba(52,211,153,0.7)] focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d0f]">
                <span className="flex items-center group-hover:-translate-x-1 transition-transform">
                  Start Free Trial 
                  <ArrowRight className="w-5 h-5 ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all absolute right-6" />
                </span>
              </Button>
              <Button size="lg" variant="outline" className="group h-14 px-8 border-white/20 hover:border-white/40 hover:bg-white/5 font-semibold rounded-full w-full sm:w-auto text-base backdrop-blur-sm transition-all focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d0f]">
                <span className="flex items-center">
                  Book a Demo
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-20 relative max-w-5xl mx-auto"
            >
              {/* Dashboard Mockup Container */}
              <div className="relative rounded-2xl border-2 border-white/10 hover:border-white/20 transition-colors bg-[#0f1418] shadow-2xl shadow-emerald-500/10 overflow-hidden cursor-pointer group">
                <div className="h-10 bg-[#151b21] border-b border-white/10 flex items-center px-4 gap-2">
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
                    className="w-full h-auto opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  {/* Gradient mask for bottom fade */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0a0d0f] to-transparent"></div>
                  
                  {/* Interactive Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white text-black font-semibold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                      Explore Dashboard <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 relative z-10 bg-[#0a0d0f]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Convert noise into pipeline</h2>
              <p className="text-zinc-300 text-lg">
                Set up your intent signals in minutes and let our AI agents do the heavy lifting of identifying your next customers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"></div>

              {[
                {
                  icon: <Radar className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
                  title: "Define Trackers",
                  desc: "Set up keywords, competitor names, or topics. We monitor millions of posts in real-time.",
                  link: "View tracker setup"
                },
                {
                  icon: <BrainCircuit className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
                  title: "AI Analysis",
                  desc: "Our models score each mention for buying intent, filtering out noise and complaints.",
                  link: "See how scoring works"
                },
                {
                  icon: <Database className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />,
                  title: "CRM Sync",
                  desc: "High-intent signals are automatically injected into Salesforce or HubSpot for your SDRs.",
                  link: "Explore integrations"
                }
              ].map((step, i) => (
                <div key={i} className="relative group cursor-pointer h-full">
                  <div className="h-full bg-[#12181c] border-2 border-white/5 rounded-2xl p-8 hover:bg-[#151d22] transition-all relative overflow-hidden shadow-lg hover:shadow-emerald-500/5 group-hover:-translate-y-1">
                    {/* Strong top glow on hover */}
                    <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="w-16 h-16 rounded-2xl bg-[#0a0d0f] border-2 border-white/10 flex items-center justify-center mb-6 relative z-10 shadow-inner group-hover:border-emerald-500/50 group-hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)] transition-all">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-50 transition-colors">{step.title}</h3>
                    <p className="text-zinc-400 leading-relaxed mb-6">{step.desc}</p>
                    
                    <div className="mt-auto pt-4 flex items-center text-sm font-semibold text-emerald-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      {step.link} <ArrowRight className="w-4 h-4 ml-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 relative border-t-2 border-white/5 bg-[#0f1418]">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Built for revenue teams</h2>
              <p className="text-zinc-300 text-lg">
                Everything you need to operationalize social selling at scale.
              </p>
            </div>

            <div className="space-y-32">
              {/* Feature 1 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="order-2 md:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-6 tracking-wide uppercase">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Intent Analytics</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Measure the pulse of your market</h3>
                  <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                    Track topic velocity, sentiment trends, and share of voice against competitors. Identify macro shifts before they show up in search volume.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Real-time volume tracking by keyword",
                      "Sentiment analysis on brand mentions",
                      "Competitor mention comparisons",
                      "Exportable reports for leadership"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-200 font-medium">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="group border-white/20 hover:border-white/40 hover:bg-white/5 font-semibold focus-visible:ring-2 focus-visible:ring-emerald-500/50">
                    <span className="flex items-center">
                      Explore Analytics 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
                <div className="order-1 md:order-2 relative rounded-2xl border-2 border-white/10 hover:border-emerald-500/40 bg-[#0a0d0f] p-2 shadow-2xl overflow-hidden group cursor-pointer transition-colors">
                   <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent z-0 group-hover:opacity-100 opacity-50 transition-opacity"></div>
                   <img src="/__mockup/images/refined-b-feature-analytics.png" alt="Analytics" className="rounded-xl relative z-10 w-full" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-20">
                     <div className="bg-emerald-500 text-emerald-950 font-bold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg">
                       View Interactive Demo <ArrowRight className="w-4 h-4" />
                     </div>
                   </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative rounded-2xl border-2 border-white/10 hover:border-emerald-500/40 bg-[#0a0d0f] p-2 shadow-2xl overflow-hidden group cursor-pointer transition-colors">
                   <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent z-0 group-hover:opacity-100 opacity-50 transition-opacity"></div>
                   <img src="/__mockup/images/refined-b-feature-ai.png" alt="AI Openers" className="rounded-xl relative z-10 w-full" />
                   <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-20">
                     <div className="bg-emerald-500 text-emerald-950 font-bold px-6 py-3 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all shadow-lg">
                       Try AI Generator <ArrowRight className="w-4 h-4" />
                     </div>
                   </div>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-6 tracking-wide uppercase">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>AI Openers</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">Contextual outreach at scale</h3>
                  <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                    Don't send generic templates. Our LLMs generate highly contextual, non-salesy opening messages based on the exact thread the prospect posted.
                  </p>
                  <ul className="space-y-4 mb-8">
                    {[
                      "Thread-aware context generation",
                      "Adjustable tone (helpful, direct, casual)",
                      "One-click copy to clipboard",
                      "Automatic CRM logging"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-200 font-medium">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="group border-white/20 hover:border-white/40 hover:bg-white/5 font-semibold focus-visible:ring-2 focus-visible:ring-emerald-500/50">
                    <span className="flex items-center">
                      See Examples 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="mt-24 text-center">
               <p className="text-sm font-medium text-zinc-400 flex items-center justify-center gap-2">
                 <Sparkles className="w-4 h-4 text-emerald-400" /> Coming soon: Automated Outreach Sequences & LinkedIn Deep Scrape
               </p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 border-t-2 border-white/5 relative overflow-hidden bg-[#0a0d0f]">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Trusted by fast-growing teams</h2>
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
                <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-tl-3xl rounded-br-3xl rounded-tr-lg rounded-bl-lg p-8 relative overflow-hidden">
                  <Quote className="absolute top-4 right-4 w-12 h-12 text-white/5" />
                  
                  <p className="text-zinc-300 mb-8 text-lg leading-relaxed relative z-10 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-4 mt-auto relative z-10">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold border border-emerald-500/30">
                      {t.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white">{t.author}</div>
                      <div className="text-sm font-medium text-zinc-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 border-t-2 border-white/5 bg-[#0f1418] relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Simple, transparent pricing</h2>
              <div className="flex items-center justify-center gap-3 mt-8">
                <span className="text-zinc-300 text-base font-semibold cursor-pointer">Billed Monthly</span>
                <div className="w-12 h-6 bg-emerald-500/20 border border-emerald-500/40 rounded-full relative cursor-pointer hover:bg-emerald-500/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500" tabIndex={0} role="switch" aria-checked="true">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-emerald-400 rounded-full shadow-sm"></div>
                </div>
                <span className="text-white text-base font-semibold cursor-pointer">Billed Annually <span className="text-emerald-400 text-sm ml-1 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">(Save 20%)</span></span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Pro */}
              <div className="bg-[#12181c] border-2 border-white/10 hover:border-white/30 rounded-2xl p-8 flex flex-col mt-4 transition-all duration-300 group hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <div className="text-zinc-400 text-sm mb-6 font-medium">For early stage startups</div>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">$299</span>
                  <span className="text-zinc-400 font-medium">/mo</span>
                </div>
                <Button variant="outline" className="w-full mb-8 border-white/20 hover:border-white/40 hover:bg-white/10 font-bold h-12 text-base group/btn focus-visible:ring-2 focus-visible:ring-white/50">
                  <span className="flex items-center justify-center">
                    Start Free Trial <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </span>
                </Button>
                <div className="space-y-4 flex-1">
                  {[
                    "3 Tracker topics",
                    "1,000 signals/month",
                    "Reddit & Hacker News",
                    "Basic filtering",
                    "Slack integration"
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Growth */}
              <div className="bg-[#151d22] border-2 border-emerald-500 rounded-2xl p-8 relative flex flex-col shadow-[0_0_40px_-10px_rgba(52,211,153,0.2)] transform md:-translate-y-4 transition-all duration-300 hover:-translate-y-6 hover:shadow-[0_0_50px_-10px_rgba(52,211,153,0.3)]">
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-emerald-500/0 via-emerald-400 to-emerald-500/0"></div>
                <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-emerald-950 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
                >
                  Most Popular
                </motion.div>
                <h3 className="text-2xl font-bold mb-2 text-white">Growth</h3>
                <div className="text-emerald-400 text-sm mb-6 font-medium">For scaling revenue teams</div>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">$599</span>
                  <span className="text-zinc-400 font-medium">/mo</span>
                </div>
                <Button className="w-full mb-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold h-12 text-base group/btn shadow-[0_0_20px_-5px_rgba(52,211,153,0.5)] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#151d22]">
                  <span className="flex items-center justify-center group-hover/btn:scale-105 transition-transform">
                    Start Free Trial <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </Button>
                <div className="space-y-4 flex-1">
                  {[
                    "10 Tracker topics",
                    "5,000 signals/month",
                    "All data sources",
                    "Advanced AI filtering",
                    "Salesforce/HubSpot sync",
                    "AI Openers generation"
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-white font-medium">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enterprise */}
              <div className="bg-[#12181c] border-2 border-white/10 hover:border-white/30 rounded-2xl p-8 flex flex-col mt-4 transition-all duration-300 group hover:-translate-y-1">
                <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
                <div className="text-zinc-400 text-sm mb-6 font-medium">For large organizations</div>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">$1,200</span>
                  <span className="text-zinc-400 font-medium">/mo</span>
                </div>
                <Button variant="outline" className="w-full mb-8 border-white/20 hover:border-white/40 hover:bg-white/10 font-bold h-12 text-base group/btn focus-visible:ring-2 focus-visible:ring-white/50">
                  <span className="flex items-center justify-center">
                    Contact Sales <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all" />
                  </span>
                </Button>
                <div className="space-y-4 flex-1">
                  {[
                    "Unlimited topics",
                    "Unlimited signals",
                    "Custom integrations",
                    "Dedicated success manager",
                    "Custom AI training",
                    "SLA guarantees"
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-3 text-zinc-300 font-medium">
                      <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 border-t-2 border-white/5 bg-[#0a0d0f]">
          <div className="container mx-auto px-6 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Frequently asked questions</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = faqOpen === i;
                return (
                  <div 
                    key={i} 
                    className={`border-2 rounded-xl overflow-hidden transition-all duration-200 cursor-pointer ${
                      isOpen 
                        ? 'border-emerald-500/30 bg-white/[0.04] shadow-lg shadow-emerald-500/5' 
                        : 'border-white/10 bg-[#12181c] hover:border-white/20 hover:bg-[#151d22]'
                    }`}
                  >
                    <button 
                      className="w-full flex items-center p-6 text-left focus:outline-none focus-visible:bg-white/[0.06]"
                      onClick={() => setFaqOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      {/* Interactive visual cue */}
                      <div className="mr-4 flex items-center justify-center">
                        <div className={`h-1.5 rounded-full transition-all duration-300 ${isOpen ? 'w-6 bg-emerald-400' : 'w-1.5 bg-emerald-500/50'}`}></div>
                      </div>
                      
                      <span className={`font-bold text-lg flex-1 transition-colors ${isOpen ? 'text-white' : 'text-zinc-200'}`}>
                        {faq.question}
                      </span>
                      
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-zinc-400'}`}
                      >
                        <ChevronDown className="w-5 h-5" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 pl-[4.5rem] text-zinc-300 text-lg leading-relaxed border-t border-white/5 mt-2">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden border-t-2 border-white/5 bg-[#0f1418]">
          <div className="absolute inset-0 bg-[#0a0d0f]">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px]"></div>
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 tracking-tight">
              Start finding your next customers
            </h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto">
              Join the forward-thinking revenue teams already using OCTOPILOT to turn social noise into high-converting pipeline.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="group h-14 px-10 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-full w-full sm:w-auto text-lg shadow-[0_0_30px_-5px_rgba(52,211,153,0.4)] transition-transform hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d0f]">
                <span className="flex items-center group-hover:-translate-x-1 transition-transform">
                  Get Started for Free
                  <ArrowRight className="w-5 h-5 ml-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all absolute right-6" />
                </span>
              </Button>
              <Button size="lg" variant="outline" className="group h-14 px-10 border-2 border-white/20 hover:border-white/40 hover:bg-white/10 font-bold rounded-full w-full sm:w-auto text-lg backdrop-blur-sm transition-all focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0d0f]">
                <span className="flex items-center">
                  Talk to Sales
                  <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </span>
              </Button>
            </div>
            <p className="mt-6 text-sm font-medium text-zinc-400">14-day free trial. No credit card required.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-white/10 bg-[#060809] pt-20 pb-10" aria-label="Footer">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Radar className="w-6 h-6 text-emerald-400" />
                <span className="font-display font-bold text-xl tracking-tight text-white">OCTOPILOT</span>
              </div>
              <p className="text-base text-zinc-400 mb-6 leading-relaxed">
                B2B revenue signal intelligence. Find buying intent before your competitors do.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Product</h4>
              <ul className="space-y-4 text-base font-medium text-zinc-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Integrations</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Company</h4>
              <ul className="space-y-4 text-base font-medium text-zinc-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">Legal</h4>
              <ul className="space-y-4 text-base font-medium text-zinc-400">
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Terms of Service</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors hover:underline underline-offset-4">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm font-medium text-zinc-500">
              © {new Date().getFullYear()} Octopilot Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-zinc-500">
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
