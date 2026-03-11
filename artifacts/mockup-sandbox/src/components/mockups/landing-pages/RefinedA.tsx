import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Check, 
  ChevronDown, 
  Radar, 
  Zap, 
  Database, 
  ArrowRight, 
  Quote, 
  MessageSquare, 
  Terminal, 
  Activity, 
  BarChart3,
  Bot
} from "lucide-react";

export default function RefinedA() {
  return (
    <div className="min-h-screen bg-[#0a0d0f] text-[#f1f5f9] selection:bg-[#3ECF8E] selection:text-[#0a0d0f] font-sans">
      <Navbar />
      <main>
        <Hero />
        <DashboardPreview />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

// --- Sections ---

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
          <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
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

function Hero() {
  const platforms = ["Reddit", "Hacker News", "X"];
  const [platformIndex, setPlatformIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlatformIndex((prev) => (prev + 1) % platforms.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [platforms.length]);

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#3ECF8E]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 text-[#3ECF8E] text-sm font-medium mb-8">
          <Activity className="w-4 h-4" />
          <span>Real-time B2B Intent Monitoring</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] tracking-tight mb-8 leading-tight">
          Turn Social Chatter Into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ECF8E] to-[#2ea874]">
            Qualified Pipeline
          </span>
        </h1>

        <p className="text-lg md:text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
          Octopilot monitors <span className="text-white font-medium">Reddit</span>,{" "}
          <span className="text-white font-medium">Hacker News</span>, and beyond for buying intent. 
          When your prospects ask for recommendations, we inject them straight into your CRM.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button className="w-full sm:w-auto bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-semibold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_#3ECF8E]">
            Start Free Trial
          </button>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white text-lg font-medium px-8 py-4 rounded-full border border-white/10 transition-all">
            Book a Demo
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-[#64748b]">
          <div className="flex -space-x-2 mr-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-6 h-6 rounded-full bg-[#1e293b] border-2 border-[#0a0d0f]" />
            ))}
          </div>
          Trusted by revenue teams at 50+ hyper-growth startups
        </div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <section className="pb-24 px-6">
      <div className="container mx-auto">
        <div className="relative rounded-2xl border border-white/10 bg-[#1e293b]/50 p-2 shadow-2xl backdrop-blur-sm max-w-5xl mx-auto overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3ECF8E]/5 to-transparent pointer-events-none" />
          <img 
            src="/__mockup/images/refined-dashboard-mockup.png" 
            alt="Octopilot Dashboard" 
            className="rounded-xl w-full h-auto border border-white/5 relative z-10"
          />
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      icon: <Radar className="w-6 h-6 text-[#3ECF8E]" />,
      title: "Monitor Intent",
      description: "Define your keywords, competitors, and industry terms. We scan millions of posts and comments in real-time."
    },
    {
      icon: <Bot className="w-6 h-6 text-[#3ECF8E]" />,
      title: "Score & Filter",
      description: "Our AI evaluates context and sentiment, filtering out noise to deliver only high-confidence buying signals."
    },
    {
      icon: <Database className="w-6 h-6 text-[#3ECF8E]" />,
      title: "Inject to CRM",
      description: "Qualified leads are automatically pushed to Salesforce or HubSpot with complete context and direct links."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 border-t border-white/5 bg-[#0a0d0f]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-6">
            From Social Signal to Sales Pipeline
          </h2>
          <p className="text-[#94a3b8] text-lg">
            A continuous, automated workflow that ensures your sales team never misses an opportunity engaging in relevant communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-[1px] bg-gradient-to-r from-transparent via-[#3ECF8E]/30 to-transparent z-0" />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 bg-[#0f1419] border border-white/5 p-8 rounded-2xl hover:border-[#3ECF8E]/30 transition-colors group">
              <div className="w-12 h-12 rounded-xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">
                {step.title}
              </h3>
              <p className="text-[#94a3b8] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="py-24 border-t border-white/5 bg-[#0f1419]/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-6">
            Everything you need to capture intent
          </h2>
          <p className="text-[#94a3b8] text-lg">
            Built for modern revenue teams who want to move fast and strike while the iron is hot.
          </p>
        </div>

        <div className="space-y-32 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
                <BarChart3 className="w-3 h-3" />
                Signal Analytics
              </div>
              <h3 className="text-3xl font-bold mb-6">Understand volume and trends over time</h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                Track how often your brand, competitors, or problem-space is mentioned across platforms. Uncover cyclical trends and identify which communities yield the highest quality pipeline.
              </p>
              <ul className="space-y-4">
                {[
                  "Historical mention volume analysis",
                  "Sentiment tracking and brand health",
                  "Share of voice vs. competitors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#cbd5e1]">
                    <Check className="w-5 h-5 text-[#3ECF8E]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 rounded-2xl border border-white/10 p-2 bg-[#1e293b]/30">
              <img 
                src="/__mockup/images/refined-feature-analytics.png" 
                alt="Signal Analytics" 
                className="rounded-xl w-full object-cover"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-2xl border border-white/10 p-2 bg-[#1e293b]/30">
              <img 
                src="/__mockup/images/refined-feature-ai.png" 
                alt="AI Outreach Openers" 
                className="rounded-xl w-full object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-medium mb-6">
                <Bot className="w-3 h-3" />
                AI Assist
              </div>
              <h3 className="text-3xl font-bold mb-6">Context-aware outreach drafts</h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                Stop staring at a blank screen. Our AI analyzes the original post and the prospect's intent to generate highly personalized, relevant outreach messages that get replies.
              </p>
              <ul className="space-y-4">
                {[
                  "Auto-generated email & DM drafts",
                  "Contextually links your solution to their problem",
                  "Adjustable tone (casual, professional, technical)"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#cbd5e1]">
                    <Check className="w-5 h-5 text-[#3ECF8E]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Coming Soon Teaser */}
        <div className="mt-32 max-w-3xl mx-auto border border-white/5 bg-[#1e293b]/20 rounded-2xl p-6 text-center">
          <p className="text-[#94a3b8] font-medium">
            <span className="text-[#3ECF8E] mr-2">✦ Roadmap:</span> 
            LinkedIn monitoring, Competitor battlecards, and Slack/Teams alerts coming soon.
          </p>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "We used to manually search Reddit for our competitors. Now Octopilot drops hot leads directly into our Slack channel and Salesforce.",
      author: "Sarah Chen",
      role: "VP of Growth, TechFlow"
    },
    {
      quote: "The intent scoring is spot on. We're seeing a 3x higher reply rate on outreach that originates from an Octopilot signal.",
      author: "Marcus Rivera",
      role: "Head of Sales, CloudScale"
    },
    {
      quote: "It's like having a 24/7 SDR who knows exactly what people are complaining about and when to introduce our product.",
      author: "Priya Nambiar",
      role: "Founder, DataSync"
    }
  ];

  return (
    <section className="py-24 border-t border-white/5 bg-[#0a0d0f] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3ECF8E]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk']">
            Trusted by modern revenue teams
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#0f1419] border border-white/5 p-8 rounded-2xl relative">
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#3ECF8E]/20" />
              <p className="text-lg text-[#cbd5e1] mb-8 relative z-10 leading-relaxed font-medium">
                "{t.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#1e293b] border border-white/10 flex items-center justify-center font-bold text-[#3ECF8E]">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold text-white">{t.author}</div>
                  <div className="text-sm text-[#64748b]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-white/5 bg-[#0f1419]/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-[#94a3b8] text-lg">
            Start finding leads immediately. Upgrade when you need more capacity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {/* Pro */}
          <div className="bg-[#0a0d0f] border border-white/10 rounded-3xl p-8">
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
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> 5 Trackers (Keywords)</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> 1,000 Signals / month</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Reddit & Hacker News</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Slack/Email Alerts</li>
            </ul>
          </div>

          {/* Growth */}
          <div className="bg-[#0f1419] border-2 border-[#3ECF8E] rounded-3xl p-8 relative shadow-[0_0_40px_-15px_#3ECF8E] scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3ECF8E] text-[#0a0d0f] text-xs font-bold px-3 py-1 rounded-full">
              MOST POPULAR
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
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> 25 Trackers (Keywords)</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> 5,000 Signals / month</li>
              <li className="flex items-center gap-3 text-sm text-white font-medium"><Check className="w-4 h-4 text-[#3ECF8E]" /> Native CRM Sync</li>
              <li className="flex items-center gap-3 text-sm text-white font-medium"><Check className="w-4 h-4 text-[#3ECF8E]" /> AI Outreach Drafts</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-[#0a0d0f] border border-white/10 rounded-3xl p-8">
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
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Custom API Webhooks</li>
              <li className="flex items-center gap-3 text-sm text-[#cbd5e1]"><Check className="w-4 h-4 text-[#3ECF8E]" /> Dedicated CSM</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "How quickly do signals appear?", a: "Signals are processed and delivered within 5-15 minutes of the original post being published, ensuring you can be the first to respond." },
    { q: "Which CRMs do you support?", a: "We currently offer native two-way sync with Salesforce and HubSpot. For others, you can use our webhooks or Zapier integration." },
    { q: "Can I track mentions of my competitors?", a: "Yes. In fact, competitor monitoring is one of our most popular use cases. Track their brand names and step in when their users complain." },
    { q: "Is there a limit to how many keywords I can track?", a: "Limits depend on your pricing tier. Pro includes 5 trackers, Growth includes 25, and Enterprise is unlimited." },
    { q: "Do you monitor LinkedIn or X?", a: "We currently monitor Reddit and Hacker News. X (Twitter) and LinkedIn are on our roadmap for Q4." }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 border-t border-white/5 bg-[#0a0d0f]">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk']">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-white/10 rounded-xl bg-[#0f1419] overflow-hidden"
            >
              <button 
                className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="font-medium text-white">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-[#64748b] transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-4 text-[#94a3b8]"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden bg-[#0f1419]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#3ECF8E]/10 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6 tracking-tight text-white">
          Stop missing out on active buyers
        </h2>
        <p className="text-xl text-[#94a3b8] mb-10">
          Your next best customer is asking for recommendations right now. Let Octopilot find them and bring them directly to your CRM.
        </p>
        <button className="bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-bold px-10 py-5 rounded-full transition-all shadow-[0_0_40px_-10px_#3ECF8E]">
          Start Finding Customers — 14 Days Free
        </button>
        <p className="mt-6 text-sm text-[#64748b]">
          No credit card required. Setup takes 2 minutes.
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0d0f] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded bg-[#3ECF8E]/20 flex items-center justify-center border border-[#3ECF8E]/30">
                <Radar className="w-4 h-4 text-[#3ECF8E]" />
              </div>
              <span className="text-lg font-bold tracking-tight font-['Space_Grotesk'] text-white">
                OCTOPILOT
              </span>
            </div>
            <p className="text-[#64748b] text-sm leading-relaxed mb-6">
              B2B Revenue Signal Intelligence. Find your buyers before your competitors do.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-[#94a3b8]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-[#94a3b8]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Community</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-[#94a3b8]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-[#64748b]">
          <p>© {new Date().getFullYear()} Octopilot Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
