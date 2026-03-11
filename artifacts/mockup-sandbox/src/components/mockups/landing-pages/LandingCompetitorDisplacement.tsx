import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { 
  XCircle, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Zap,
  Clock,
  TrendingUp,
  Search,
  Database,
  Users,
  Check,
  Radar
} from "lucide-react";

export default function LandingCompetitorDisplacement() {
  return (
    <div className="min-h-screen bg-[#0a0d0f] text-[#f1f5f9] selection:bg-[#3ECF8E] selection:text-[#0a0d0f] font-sans">
      <Navbar />
      <main>
        <HeroComparison />
        <KeyMetrics />
        <CompetitiveUseCase />
        <HowItWorks />
        <Pricing />
        <MigrationCTA />
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
          <a href="#comparison" className="hover:text-white transition-colors">The Old Way vs New Way</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors hidden sm:block">
            Log in
          </button>
          <button className="bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-sm font-semibold px-4 py-2 rounded-full transition-all flex items-center gap-2">
            Start Free Trial
          </button>
        </div>
      </div>
    </header>
  );
}

function AnimatedCounter({ end, duration = 2, prefix = "", suffix = "" }: { end: number, duration?: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / (duration * 1000);
        
        if (progress < 1) {
          setCount(Math.floor(end * progress));
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [end, duration, isInView]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function HeroComparison() {
  return (
    <section id="comparison" className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] tracking-tight mb-8 leading-tight">
            Stop prospecting like it's 2019.
          </h1>
          <p className="text-xl text-[#94a3b8]">
            Manual social selling is dead. Replace hours of scrolling with automated, real-time intent capture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 max-w-6xl mx-auto mb-20">
          
          {/* Pain State - Left Column */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-[#1a0505] border border-red-900/30 rounded-3xl p-8 lg:p-12 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[80px] pointer-events-none rounded-full" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-red-500 font-semibold mb-8 uppercase tracking-wider text-sm">
                <AlertTriangle className="w-5 h-5" />
                Without Octopilot
              </div>

              <div className="space-y-6 mb-12">
                {[
                  "Manual Reddit searching — 4+ hrs/day",
                  "Missed intent signals — gone in minutes",
                  "Cold outreach — 2% reply rate",
                  "No CRM context — reps start from scratch"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 text-red-200/70">
                    <XCircle className="w-6 h-6 text-red-500/50 shrink-0 mt-0.5" />
                    <span className="text-lg line-through decoration-red-500/30">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-black/40 border border-red-900/50 rounded-2xl p-6 text-center">
                <div className="text-red-500 text-sm font-medium mb-2 uppercase tracking-wide">Hours wasted this week</div>
                <div className="text-5xl font-bold text-red-400 font-mono tracking-tighter">
                  <AnimatedCounter end={124} duration={3} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Solution State - Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-[#0a1f0a] border border-[#3ECF8E]/30 rounded-3xl p-8 lg:p-12 overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#3ECF8E]/10 blur-[80px] pointer-events-none rounded-full" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-[#3ECF8E] font-semibold mb-8 uppercase tracking-wider text-sm">
                <Zap className="w-5 h-5" />
                With Octopilot
              </div>

              <div className="space-y-6 mb-12">
                {[
                  "Automated monitoring — 24/7 coverage",
                  "Real-time alerts — respond in minutes",
                  "Warm outreach — 12% reply rate",
                  "Full CRM injection — zero manual entry"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 text-emerald-50">
                    <CheckCircle2 className="w-6 h-6 text-[#3ECF8E] shrink-0 mt-0.5" />
                    <span className="text-lg font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-black/40 border border-[#3ECF8E]/30 rounded-2xl p-6 text-center">
                <div className="text-[#3ECF8E] text-sm font-medium mb-2 uppercase tracking-wide">Leads captured this week</div>
                <div className="text-5xl font-bold text-white font-mono tracking-tighter shadow-[#3ECF8E]">
                  <AnimatedCounter end={342} duration={2.5} />
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Replace manual prospecting in 2 minutes.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-semibold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_#3ECF8E]">
              Start Free Trial
            </button>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white text-lg font-medium px-8 py-4 rounded-full border border-white/10 transition-all">
              See the Difference
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

function KeyMetrics() {
  const metrics = [
    { icon: <Clock className="w-6 h-6" />, value: "40 hrs/mo", label: "saved per rep" },
    { icon: <Zap className="w-6 h-6" />, value: "6x", label: "faster response time" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "4x", label: "more pipeline generated" },
  ];

  return (
    <section className="py-12 border-y border-white/5 bg-[#0f1419]/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
          {metrics.map((metric, i) => (
            <div key={i} className="flex flex-col items-center text-center pt-8 md:pt-0 first:pt-0">
              <div className="w-12 h-12 rounded-full bg-[#3ECF8E]/10 text-[#3ECF8E] flex items-center justify-center mb-4">
                {metric.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2 font-['Space_Grotesk']">{metric.value}</div>
              <div className="text-[#94a3b8] uppercase tracking-wider text-sm font-semibold">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompetitiveUseCase() {
  return (
    <section id="features" className="py-24 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 text-[#3ECF8E] text-sm font-medium mb-6">
              <Search className="w-4 h-4" />
              <span>Competitor Displacement</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
              Steal their customers when they complain.
            </h2>
            <p className="text-xl text-[#94a3b8] mb-8 leading-relaxed">
              Don't wait for prospects to search for alternatives. Octopilot monitors your competitors' brand names across communities. When their users post about bugs, downtime, or price hikes, you get an instant alert to swoop in with the perfect pitch.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Track competitor mentions with sentiment analysis",
                "Get Slack alerts for angry user posts",
                "AI drafts comparison pitches instantly"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white">
                  <Check className="w-5 h-5 text-[#3ECF8E]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="lg:w-1/2 relative w-full">
            {/* Abstract UI representation instead of image */}
            <div className="relative rounded-2xl border border-white/10 bg-[#0f1419] p-6 shadow-2xl overflow-hidden aspect-video flex flex-col">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#3ECF8E]/10 rounded-full blur-[60px] pointer-events-none" />
              
              <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                <div className="font-semibold text-white flex items-center gap-2">
                  <Radar className="w-4 h-4 text-[#3ECF8E]" /> Competitor Alerts
                </div>
                <div className="text-xs text-[#94a3b8]">Live Feed</div>
              </div>

              <div className="space-y-4 flex-1 overflow-hidden">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      Negative Sentiment
                    </div>
                    <span className="text-xs text-[#94a3b8]">2m ago</span>
                  </div>
                  <p className="text-white text-sm mb-3">"Is anyone else experiencing massive lag with [Competitor X] today? This happens every week now..."</p>
                  <div className="flex gap-2">
                    <button className="text-xs bg-[#3ECF8E]/20 text-[#3ECF8E] px-2 py-1 rounded hover:bg-[#3ECF8E]/30 transition-colors">Draft Pitch</button>
                    <button className="text-xs bg-white/5 text-white px-2 py-1 rounded hover:bg-white/10 transition-colors">Push to CRM</button>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 opacity-70"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2 text-sm text-[#94a3b8]">
                      <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                      Pricing Complaint
                    </div>
                    <span className="text-xs text-[#94a3b8]">15m ago</span>
                  </div>
                  <p className="text-white text-sm mb-3">"Just got the renewal notice for [Competitor Y]. 40% increase?! Looking for alternatives."</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <Radar className="w-6 h-6 text-white" />,
      title: "Set your targets",
      desc: "Input your competitors, industry keywords, and pain points. We start scanning."
    },
    {
      num: "02",
      icon: <Database className="w-6 h-6 text-white" />,
      title: "AI Filters the Noise",
      desc: "Our models identify true buying intent and filter out support questions or rants."
    },
    {
      num: "03",
      icon: <Users className="w-6 h-6 text-white" />,
      title: "Sync & Engage",
      desc: "Leads appear in your CRM instantly with context, ready for your reps to close."
    }
  ];

  return (
    <section className="py-24 bg-[#0a0d0f] border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            A machine that never sleeps.
          </h2>
          <p className="text-xl text-[#94a3b8]">
            Three steps to automate your social pipeline.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-[#3ECF8E]/0 via-[#3ECF8E]/30 to-[#3ECF8E]/0" />
          
          {steps.map((step, i) => (
            <div key={i} className="relative z-10 bg-[#0f1419] border border-white/10 rounded-2xl p-8 hover:border-[#3ECF8E]/50 transition-colors">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#3ECF8E] to-[#2aa66f] flex items-center justify-center mb-6 shadow-lg shadow-[#3ECF8E]/20">
                {step.icon}
              </div>
              <div className="text-sm font-bold text-[#3ECF8E] mb-2 font-mono">STEP {step.num}</div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
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
    <section id="pricing" className="py-24 bg-[#0f1419]/50 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            Pricing that scales with you.
          </h2>
          <p className="text-xl text-[#94a3b8]">
            Cheaper than a part-time SDR. 100x more effective.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
          {/* Pro */}
          <div className="bg-[#0a0d0f] border border-white/10 rounded-3xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
            <p className="text-[#94a3b8] text-sm mb-6 h-10">For founders doing founder-led sales.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$299</span>
              <span className="text-[#94a3b8]">/mo</span>
            </div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10 mb-8">
              Start Trial
            </button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> 5 Competitor/Keyword Trackers</li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> 1,000 Signals / month</li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> Slack & Email Alerts</li>
            </ul>
          </div>

          {/* Growth */}
          <div className="bg-[#0a1f0a] border-2 border-[#3ECF8E] rounded-3xl p-8 relative shadow-[0_0_40px_-15px_#3ECF8E] scale-105 z-10 flex flex-col">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3ECF8E] text-[#0a0d0f] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Growth</h3>
            <p className="text-[#3ECF8E]/80 text-sm mb-6 h-10">For revenue teams replacing manual prospecting.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$599</span>
              <span className="text-[#3ECF8E]/60">/mo</span>
            </div>
            <button className="w-full bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] font-bold py-3 rounded-xl transition-colors mb-8 shadow-lg">
              Start Free Trial
            </button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-white"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> 25 Competitor/Keyword Trackers</li>
              <li className="flex items-start gap-3 text-white"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> 5,000 Signals / month</li>
              <li className="flex items-start gap-3 text-white font-medium"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> Native CRM Sync (Salesforce/HubSpot)</li>
              <li className="flex items-start gap-3 text-white font-medium"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> AI Outreach Drafts</li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-[#0a0d0f] border border-white/10 rounded-3xl p-8 flex flex-col">
            <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
            <p className="text-[#94a3b8] text-sm mb-6 h-10">For scaling organizations.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$1200</span>
              <span className="text-[#94a3b8]">/mo</span>
            </div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-3 rounded-xl transition-colors border border-white/10 mb-8">
              Contact Sales
            </button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> Unlimited Trackers</li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> Unlimited Signals</li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> Custom API & Webhooks</li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> Dedicated Account Manager</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function MigrationCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0f1419] border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-[#3ECF8E]/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3ECF8E]/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-8 tracking-tight text-white">
          Switch from manual to automated.<br />
          <span className="text-[#3ECF8E]">It takes 2 minutes.</span>
        </h2>
        <p className="text-xl text-[#94a3b8] mb-12">
          Stop digging for leads. Let them come to you. Join the revenue teams already displacing their competitors with Octopilot.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-xl font-bold px-10 py-5 rounded-full transition-all shadow-[0_0_50px_-10px_#3ECF8E] flex items-center justify-center gap-2">
            Start Your Free Trial
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-8 text-[#94a3b8]">
          No credit card required • 14-day full access
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
            <p className="text-[#64748b] text-sm">
              Automating social intent capture for modern revenue teams.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#64748b]">
          <div>© {new Date().getFullYear()} Octopilot. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
