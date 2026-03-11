import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  BarChart3, 
  BrainCircuit, 
  Check, 
  ChevronDown, 
  Database, 
  Radar, 
  MessageSquare, 
  Sparkles,
  Play,
  Github,
  Twitter,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClearHierarchy() {
  const [faqOpen, setFaqOpen] = useState<string | null>("getting-started-0");

  const faqs = {
    "Getting Started": [
      {
        id: "getting-started-0",
        question: "How long does setup take?",
        answer: "You can be up and running in less than 5 minutes. Just enter your target keywords, connect your CRM, and signals will start flowing immediately."
      },
      {
        id: "getting-started-1",
        question: "Can I try it before buying?",
        answer: "Yes, all plans come with a 14-day free trial so you can evaluate the quality of leads before committing."
      }
    ],
    "Technical Details": [
      {
        id: "technical-0",
        question: "How does OCTOPILOT find intent?",
        answer: "Our AI agents continuously monitor relevant subreddits, HN discussions, and social feeds for specific keywords and buying patterns related to your product."
      },
      {
        id: "technical-1",
        question: "Which CRMs do you integrate with?",
        answer: "We currently support direct integrations with Salesforce and HubSpot. You can also export data via CSV or connect via our API."
      },
      {
        id: "technical-2",
        question: "Is this compliant with platform terms?",
        answer: "Yes, we only access public data through official APIs and standard web crawling practices that respect robots.txt."
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#0a0d0f] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Skip Navigation for Accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-[100] bg-emerald-500 text-emerald-950 px-4 py-2 rounded-md font-bold">
        Skip to main content
      </a>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800 bg-[#0a0d0f]/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Radar className="w-5 h-5 text-emerald-400" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white">OCTOPILOT</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-300">
            <a href="#how-it-works" className="hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1">How it Works</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1">Features</a>
            <a href="#pricing" className="hover:text-emerald-400 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded px-2 py-1">Pricing</a>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex text-zinc-300 font-semibold hover:text-white hover:bg-zinc-800 focus:ring-2 focus:ring-emerald-500">
              Log in
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold rounded-md px-6 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0d0f] focus:ring-emerald-500">
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden border-b border-zinc-800/50">
          <div className="absolute inset-0 z-0">
            <img 
              src="/__mockup/images/refined-b-hero-bg.png" 
              alt="" 
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d0f]/50 via-[#0a0d0f]/80 to-[#0a0d0f]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight mb-4 max-w-5xl mx-auto text-white leading-tight">
                Turn developer chatter into qualified pipeline.
              </h1>
              <h2 className="text-2xl md:text-4xl font-display font-bold tracking-tight mb-8 max-w-4xl mx-auto text-emerald-400">
                Monitoring Reddit, Hacker News, X, LinkedIn & more.
              </h2>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-xl text-zinc-300 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
            >
              Stop missing high-intent conversations. Octopilot auto-injects hot leads from social channels directly into your CRM.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="flex flex-col items-center justify-center gap-6"
            >
              <Button size="lg" className="h-14 px-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold rounded-md w-full sm:w-auto text-lg shadow-lg focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0d0f] focus:ring-emerald-500">
                Start 14-Day Free Trial <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <p className="text-zinc-400 text-sm font-medium">No credit card required. Setup in 5 minutes.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-20 relative max-w-5xl mx-auto"
            >
              {/* Dashboard Mockup Container - Clearer borders for better contrast */}
              <div className="relative rounded-xl border border-zinc-700 bg-[#0f1418] shadow-2xl overflow-hidden">
                <div className="h-10 bg-[#151b21] border-b border-zinc-700 flex items-center px-4 gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
                    <div className="w-3 h-3 rounded-full bg-zinc-600"></div>
                  </div>
                </div>
                <div className="relative bg-zinc-900">
                  <img 
                    src="/__mockup/images/refined-b-dashboard.png" 
                    alt="Octopilot Dashboard showing real-time intent signals and CRM integration" 
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 relative z-10 bg-[#0a0d0f]">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 text-white">Convert noise into pipeline</h2>
              <p className="text-zinc-300 text-xl font-medium">
                Set up your intent signals in minutes and let our AI agents do the heavy lifting of identifying your next customers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  time: "~2 min setup",
                  icon: <Radar className="w-8 h-8 text-emerald-400" />,
                  title: "Define Trackers",
                  desc: "Set up keywords, competitor names, or topics. We monitor millions of posts across major platforms."
                },
                {
                  step: "2",
                  time: "Real-time",
                  icon: <BrainCircuit className="w-8 h-8 text-emerald-400" />,
                  title: "AI Analysis",
                  desc: "Our models score each mention for buying intent, filtering out noise and irrelevant complaints."
                },
                {
                  step: "3",
                  time: "Automatic",
                  icon: <Database className="w-8 h-8 text-emerald-400" />,
                  title: "CRM Sync",
                  desc: "High-intent signals are automatically injected into Salesforce or HubSpot for your SDRs to act on."
                }
              ].map((step, i) => (
                <div key={i} className="relative group bg-[#11161a] border border-zinc-800 rounded-xl p-8 hover:border-emerald-500/50 transition-colors">
                  {/* Oversized Number */}
                  <div className="absolute top-4 right-6 text-7xl font-black text-zinc-800/40 select-none pointer-events-none z-0">
                    {step.step}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                        {step.time}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                    <p className="text-zinc-300 text-lg leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 relative bg-[#0d1115] border-y border-zinc-800">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mb-20">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 text-white">Built for revenue teams</h2>
              <p className="text-zinc-300 text-xl font-medium">
                Everything you need to operationalize social selling at scale.
              </p>
            </div>

            <div className="space-y-32">
              {/* Feature 1 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-widest mb-4">
                    <BarChart3 className="w-4 h-4" />
                    <span>Analytics</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white leading-tight">Measure the pulse of your market</h3>
                  <p className="text-zinc-300 text-xl mb-10 leading-relaxed">
                    Track topic velocity, sentiment trends, and share of voice against competitors. Identify macro shifts before they show up in search volume.
                  </p>
                  <ul className="space-y-6">
                    {[
                      "Real-time volume tracking by keyword",
                      "Sentiment analysis on brand mentions",
                      "Competitor mention comparisons",
                      "Exportable reports for leadership"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-zinc-100 text-lg font-medium">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-emerald-400 font-bold" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="order-1 lg:order-2">
                  <div className="relative rounded-xl border border-zinc-700 bg-[#0a0d0f] shadow-2xl overflow-hidden mb-4">
                    <img src="/__mockup/images/refined-b-feature-analytics.png" alt="Analytics Dashboard showing volume and sentiment trends" className="w-full" />
                  </div>
                  <p className="text-zinc-400 text-sm font-medium border-l-2 border-zinc-700 pl-4">
                    <strong>Dashboard View:</strong> Real-time keyword volume and competitor share-of-voice tracking.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="relative rounded-xl border border-zinc-700 bg-[#0a0d0f] shadow-2xl overflow-hidden mb-4">
                    <img src="/__mockup/images/refined-b-feature-ai.png" alt="AI Openers generation interface" className="w-full" />
                  </div>
                  <p className="text-zinc-400 text-sm font-medium border-l-2 border-zinc-700 pl-4">
                    <strong>Generation View:</strong> Context-aware message drafting with adjustable tone settings.
                  </p>
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 text-emerald-400 text-sm font-bold uppercase tracking-widest mb-4">
                    <MessageSquare className="w-4 h-4" />
                    <span>Outreach</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white leading-tight">Contextual outreach at scale</h3>
                  <p className="text-zinc-300 text-xl mb-10 leading-relaxed">
                    Don't send generic templates. Our LLMs generate highly contextual, non-salesy opening messages based on the exact thread the prospect posted.
                  </p>
                  <ul className="space-y-6">
                    {[
                      "Thread-aware context generation",
                      "Adjustable tone (helpful, direct, casual)",
                      "One-click copy to clipboard",
                      "Automatic CRM logging"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4 text-zinc-100 text-lg font-medium">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-emerald-400 font-bold" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-[#0a0d0f] relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-4 text-white">Trusted by fast-growing teams</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "It's like having a team of 10 SDRs reading every relevant conversation on the internet.",
                  result: "40% more meetings booked in Q1",
                  company: "CloudScale",
                  author: "Sarah Chen",
                  role: "VP Sales",
                  avatar: "SC"
                },
                {
                  quote: "The CRM injection is flawless. We don't have to train reps on a new tool—the leads just show up in Salesforce with context.",
                  result: "Saved 15 hours/week per SDR",
                  company: "Nexus",
                  author: "Marcus Rivera",
                  role: "RevOps Director",
                  avatar: "MR"
                },
                {
                  quote: "We were missing so many buying signals on Reddit. OCTOPILOT surfaced 3 enterprise deals for us in the first month.",
                  result: "$120k pipeline generated in 30 days",
                  company: "DataStack",
                  author: "Priya Nambiar",
                  role: "Founding AE",
                  avatar: "PN"
                }
              ].map((t, i) => (
                <div key={i} className="bg-[#11161a] border border-zinc-800 rounded-xl p-8 flex flex-col h-full">
                  <div className="text-white font-bold text-lg mb-4 pb-4 border-b border-zinc-800">
                    {t.company}
                  </div>
                  <p className="text-zinc-300 mb-6 text-lg leading-relaxed flex-grow">"{t.quote}"</p>
                  
                  <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-md p-3 mb-6">
                    <p className="text-emerald-400 font-bold text-sm uppercase tracking-wide mb-1">Key Result</p>
                    <p className="text-white font-semibold">{t.result}</p>
                  </div>

                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 font-bold border border-zinc-700">
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
        <section id="pricing" className="py-24 bg-[#0d1115] border-t border-zinc-800 relative">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-6 text-white">Simple, transparent pricing</h2>
              <div className="flex items-center justify-center gap-3 mt-8">
                <span className="text-zinc-300 text-lg font-semibold">Billed Monthly</span>
                <button 
                  className="w-14 h-7 bg-emerald-500 rounded-full relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#0d1115]"
                  aria-label="Toggle billing cycle"
                  aria-pressed="true"
                >
                  <div className="absolute right-1 top-1 w-5 h-5 bg-emerald-950 rounded-full"></div>
                </button>
                <span className="text-white text-lg font-bold">Billed Annually <span className="text-emerald-400 text-sm ml-2 bg-emerald-500/10 px-2 py-1 rounded-md">Save 20%</span></span>
              </div>
            </div>

            <div className="max-w-5xl mx-auto">
              {/* Progression Indicator */}
              <div className="hidden md:flex relative h-2 bg-zinc-800 rounded-full mb-12">
                 <div className="absolute left-0 top-0 h-full w-2/3 bg-gradient-to-r from-zinc-600 via-emerald-500 to-emerald-400 rounded-full"></div>
                 <div className="absolute top-1/2 -translate-y-1/2 left-[16.6%] w-4 h-4 bg-zinc-400 rounded-full border-4 border-[#0d1115]"></div>
                 <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-5 h-5 bg-emerald-500 rounded-full border-4 border-[#0d1115]"></div>
                 <div className="absolute top-1/2 -translate-y-1/2 left-[83.3%] w-4 h-4 bg-zinc-600 rounded-full border-4 border-[#0d1115]"></div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Pro */}
                <div className="bg-[#11161a] border border-zinc-800 rounded-xl p-8 flex flex-col">
                  <div className="text-emerald-400 font-bold mb-4 pb-4 border-b border-zinc-800">Best for solo founders</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                  <div className="mb-8">
                    <span className="text-5xl font-black text-white">$299</span>
                    <span className="text-zinc-400 font-medium text-lg">/mo</span>
                  </div>
                  <Button variant="outline" className="w-full mb-8 border-zinc-600 hover:bg-zinc-800 text-white font-bold h-12 text-lg">Start Free Trial</Button>
                  <div className="space-y-5 flex-1">
                    {[
                      "3 Tracker topics",
                      "1,000 signals/month",
                      "Reddit & Hacker News",
                      "Basic filtering",
                      "Slack integration"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-zinc-300 font-medium">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Growth */}
                <div className="bg-[#151b21] border-2 border-emerald-500 rounded-xl p-8 flex flex-col relative shadow-[0_0_30px_-5px_rgba(52,211,153,0.15)] md:-mt-4 md:mb-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-emerald-950 text-sm font-black px-4 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                  <div className="text-emerald-400 font-bold mb-4 pb-4 border-b border-zinc-700">Best for sales teams of 5-20</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Growth</h3>
                  <div className="mb-8">
                    <span className="text-5xl font-black text-white">$599</span>
                    <span className="text-zinc-400 font-medium text-lg">/mo</span>
                  </div>
                  <Button className="w-full mb-8 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-bold h-12 text-lg">Start Free Trial</Button>
                  <div className="space-y-5 flex-1">
                    {[
                      "10 Tracker topics",
                      "5,000 signals/month",
                      "All data sources",
                      "Advanced AI filtering",
                      "Salesforce/HubSpot sync",
                      "AI Openers generation"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-white font-medium">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Enterprise */}
                <div className="bg-[#11161a] border border-zinc-800 rounded-xl p-8 flex flex-col">
                  <div className="text-emerald-400 font-bold mb-4 pb-4 border-b border-zinc-800">Best for orgs with 50+ reps</div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Enterprise</h3>
                  <div className="mb-8">
                    <span className="text-5xl font-black text-white">$1,200</span>
                    <span className="text-zinc-400 font-medium text-lg">/mo</span>
                  </div>
                  <Button variant="outline" className="w-full mb-8 border-zinc-600 hover:bg-zinc-800 text-white font-bold h-12 text-lg">Contact Sales</Button>
                  <div className="space-y-5 flex-1">
                    {[
                      "Unlimited topics",
                      "Unlimited signals",
                      "Custom integrations",
                      "Dedicated success manager",
                      "Custom AI training",
                      "SLA guarantees"
                    ].map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-zinc-300 font-medium">
                        <Check className="w-5 h-5 text-emerald-400 flex-shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-[#0a0d0f]">
          <div className="container mx-auto px-6 max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-display font-extrabold mb-12 text-white text-center">Frequently asked questions</h2>
            
            <div className="space-y-12">
              {Object.entries(faqs).map(([category, questions]) => (
                <div key={category}>
                  <h3 className="text-xl font-bold text-emerald-400 mb-6 uppercase tracking-wider border-b border-zinc-800 pb-2">{category}</h3>
                  <div className="space-y-4">
                    {questions.map((faq) => (
                      <div 
                        key={faq.id} 
                        className="bg-[#11161a] border border-zinc-800 rounded-lg overflow-hidden transition-colors hover:border-zinc-600"
                      >
                        <button
                          onClick={() => setFaqOpen(faqOpen === faq.id ? null : faq.id)}
                          className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:bg-zinc-800/50"
                          aria-expanded={faqOpen === faq.id}
                          aria-controls={`faq-answer-${faq.id}`}
                        >
                          <span className="font-bold text-lg text-white pr-8">{faq.question}</span>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center transition-transform duration-300 ${faqOpen === faq.id ? 'rotate-180 bg-emerald-500 text-emerald-950' : 'text-zinc-400'}`}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </button>
                        <div 
                          id={`faq-answer-${faq.id}`}
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${faqOpen === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="p-6 pt-0 text-zinc-300 text-lg leading-relaxed border-t border-zinc-800/50 mt-2">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden border-t border-zinc-800 bg-[#0d1115]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-display font-extrabold mb-6 text-white">Ready to fill your pipeline?</h2>
            <p className="text-xl text-zinc-300 mb-10 max-w-2xl mx-auto font-medium">
              Join fast-growing revenue teams finding their best customers on social channels.
            </p>
            <Button size="lg" className="h-16 px-10 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-extrabold rounded-md text-xl shadow-xl focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0d1115] focus:ring-emerald-500">
              Start 14-Day Free Trial
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800 bg-[#0a0d0f] text-zinc-400 text-sm font-medium">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Radar className="w-5 h-5 text-emerald-400" />
                <span className="font-display font-bold text-lg text-white tracking-tight">OCTOPILOT</span>
              </div>
              <p className="mb-4">Revenue signal intelligence for modern sales teams.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors" aria-label="Twitter"><Twitter className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin className="w-5 h-5" /></a>
                <a href="#" className="hover:text-white transition-colors" aria-label="GitHub"><Github className="w-5 h-5" /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Case Studies</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact Sales</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} Octopilot Inc. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Status</a>
              <a href="#" className="hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
