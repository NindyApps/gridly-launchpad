import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";
import { 
  Check, 
  Radar, 
  Zap, 
  Database, 
  ArrowRight, 
  BarChart3,
  Bot,
  DollarSign,
  Clock,
  Target,
  ChevronRight
} from "lucide-react";

// --- Animated Counter Component ---
function AnimatedNumber({ value, prefix = "", suffix = "", format = "number" }: { value: number, prefix?: string, suffix?: string, format?: "number" | "currency" }) {
  const [displayValue, setDisplayValue] = useState("");
  
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 0.8,
      ease: "easeOut",
      onUpdate(value) {
        if (format === "currency") {
          setDisplayValue(
            new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0
            }).format(value)
          );
        } else {
          setDisplayValue(Math.round(value).toLocaleString('en-US'));
        }
      }
    });
    return () => controls.stop();
  }, [value, format]);

  return (
    <span>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

// --- Main Page Component ---
export default function LandingROILed() {
  return (
    <div className="min-h-screen bg-[#0a0d0f] text-[#f1f5f9] selection:bg-[#3ECF8E] selection:text-[#0a0d0f] font-sans overflow-x-hidden">
      <Navbar />
      <main>
        <HeroROI />
        <SocialProof />
        <HowItWorks />
        <Features />
        <Pricing />
        <FinalCTA />
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
          <a href="#calculator" className="hover:text-white transition-colors">Calculator</a>
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
          </button>
        </div>
      </div>
    </header>
  );
}

function HeroROI() {
  const [hours, setHours] = useState(20);
  const [dealSize, setDealSize] = useState(15000);
  const [sdrs, setSdrs] = useState(5);

  // Computations
  const hoursSaved = hours * sdrs * 0.85; // Save 85% of prospecting time
  const leadsRecovered = Math.round(hoursSaved * 1.5); // 1.5 leads found per hour saved
  const pipelineValue = leadsRecovered * dealSize * 0.25; // 25% pipeline conversion rate

  return (
    <section id="calculator" className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#3ECF8E]/15 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          
          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 text-[#3ECF8E] text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Stop Guessing, Start Measuring</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-['Space_Grotesk'] tracking-tight mb-6 leading-[1.1]">
              Calculate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ECF8E] to-[#2ea874]">
                Hidden Pipeline
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#94a3b8] mb-8 leading-relaxed max-w-lg">
              Manual prospecting is costing you deals. Enter your team's metrics to see exactly how much pipeline Octopilot can recover for you automatically.
            </p>
            
            <div className="hidden lg:flex items-center gap-4 text-sm text-[#64748b]">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-[#1e293b] border-2 border-[#0a0d0f] flex items-center justify-center text-xs font-bold text-[#94a3b8]">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <span>Based on aggregate data from 50+ revenue teams</span>
            </div>
          </div>

          {/* Right: Calculator Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-[#0f1419]/80 backdrop-blur-xl border border-[#3ECF8E]/30 p-8 rounded-3xl shadow-[0_0_50px_-15px_rgba(62,207,142,0.3)] relative"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#3ECF8E]/5 to-transparent rounded-3xl pointer-events-none" />
            
            <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[#3ECF8E]" />
              Your ROI Calculator
            </h3>

            {/* Inputs */}
            <div className="space-y-8 mb-10">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between text-sm font-medium mb-4">
                  <label className="text-[#cbd5e1]">Manual prospecting hours/week</label>
                  <span className="text-[#3ECF8E] font-bold">{hours} hrs</span>
                </div>
                <input 
                  type="range" 
                  min="5" max="80" 
                  value={hours} 
                  onChange={(e) => setHours(Number(e.target.value))}
                  className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#3ECF8E]"
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between text-sm font-medium mb-4">
                  <label className="text-[#cbd5e1]">Average deal size (ACV)</label>
                  <span className="text-[#3ECF8E] font-bold">${dealSize.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="1000" max="100000" step="1000"
                  value={dealSize} 
                  onChange={(e) => setDealSize(Number(e.target.value))}
                  className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#3ECF8E]"
                />
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between text-sm font-medium mb-4">
                  <label className="text-[#cbd5e1]">Number of SDRs on team</label>
                  <span className="text-[#3ECF8E] font-bold">{sdrs} {sdrs === 1 ? 'SDR' : 'SDRs'}</span>
                </div>
                <input 
                  type="range" 
                  min="1" max="50" 
                  value={sdrs} 
                  onChange={(e) => setSdrs(Number(e.target.value))}
                  className="w-full h-2 bg-[#1e293b] rounded-lg appearance-none cursor-pointer accent-[#3ECF8E]"
                />
              </div>
            </div>

            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

            {/* Outputs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div layout className="bg-[#0a0d0f] border border-[#3ECF8E]/20 p-4 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#3ECF8E]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-sm text-[#94a3b8] mb-1 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Hours Saved
                </div>
                <div className="text-2xl font-bold text-white">
                  <AnimatedNumber value={hoursSaved} suffix=" hrs/wk" />
                </div>
              </motion.div>
              
              <motion.div layout className="bg-[#0a0d0f] border border-[#3ECF8E]/20 p-4 rounded-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#3ECF8E]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-sm text-[#94a3b8] mb-1 flex items-center gap-2">
                  <Database className="w-4 h-4" /> Leads Found
                </div>
                <div className="text-2xl font-bold text-white">
                  <AnimatedNumber value={leadsRecovered} suffix="/mo" />
                </div>
              </motion.div>

              <motion.div layout className="col-span-2 bg-[#0a0d0f] border border-[#3ECF8E]/40 p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#3ECF8E]/10 rounded-full blur-[40px]" />
                <div className="text-sm text-[#94a3b8] mb-1 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Est. Pipeline Value Added (Monthly)
                </div>
                <div className="text-4xl font-bold text-[#3ECF8E]">
                  <AnimatedNumber value={pipelineValue} format="currency" />
                </div>
              </motion.div>
            </div>

            <button className="w-full bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_30px_-10px_#3ECF8E] group">
              Recover This Pipeline
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-xs text-[#64748b] mt-4">Start your 14-day free trial. No credit card required.</p>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0a0d0f]/50">
      <div className="container mx-auto px-6">
        <p className="text-center text-sm font-medium text-[#64748b] mb-8 uppercase tracking-wider">
          Powering pipeline generation for 50+ revenue teams
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          {/* Logo Mockups */}
          <div className="flex items-center gap-2 text-xl font-bold font-serif text-white">
            <div className="w-6 h-6 bg-blue-500 rounded-sm" /> AcmeCorp
          </div>
          <div className="flex items-center gap-2 text-xl font-bold font-mono text-white">
            <div className="w-6 h-6 rounded-full border-4 border-emerald-500" /> Nexus
          </div>
          <div className="flex items-center gap-2 text-xl font-bold tracking-tighter text-white">
            <svg className="w-6 h-6 text-purple-500 fill-current" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg> Zenith
          </div>
          <div className="flex items-center gap-2 text-xl font-black italic text-white">
            <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg transform rotate-12" /> Horizon
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
      icon: <Radar className="w-6 h-6 text-[#3ECF8E]" />,
      title: "Monitor Intent",
      description: "We constantly scan Reddit, Hacker News, and X for buying signals matching your ICP and keywords."
    },
    {
      num: "02",
      icon: <Bot className="w-6 h-6 text-[#3ECF8E]" />,
      title: "Score & Filter",
      description: "Our AI evaluates sentiment and context, separating genuine intent from casual noise automatically."
    },
    {
      num: "03",
      icon: <Database className="w-6 h-6 text-[#3ECF8E]" />,
      title: "Inject to CRM",
      description: "High-confidence leads are pushed instantly to Salesforce or HubSpot so your SDRs can strike."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#0a0d0f]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            How we uncover hidden pipeline
          </h2>
          <p className="text-[#94a3b8] text-lg">
            Stop searching. Start selling. Our automated workflow ensures you never miss a buying signal across relevant communities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-px bg-gradient-to-r from-[#3ECF8E]/0 via-[#3ECF8E]/30 to-[#3ECF8E]/0" />

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 bg-[#0f1419] border border-white/5 p-10 rounded-3xl hover:border-[#3ECF8E]/30 transition-all duration-300 group">
              <div className="absolute top-6 right-8 text-6xl font-black text-white/[0.03] group-hover:text-[#3ECF8E]/10 transition-colors pointer-events-none">
                {step.num}
              </div>
              <div className="w-14 h-14 rounded-2xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 flex items-center justify-center mb-8 shadow-[0_0_20px_-5px_#3ECF8E]">
                {step.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
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
    <section id="features" className="py-24 border-t border-white/5 bg-[#0f1419]/30">
      <div className="container mx-auto px-6">
        
        <div className="space-y-32 max-w-6xl mx-auto">
          {/* Feature 1 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Abstract Graphic representing Analytics */}
              <div className="aspect-square max-h-[500px] rounded-3xl bg-[#0a0d0f] border border-white/10 p-8 relative overflow-hidden flex flex-col justify-end">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-blue-500/10 to-transparent" />
                
                {/* Mock Chart Bars */}
                <div className="flex items-end gap-4 h-48 w-full z-10">
                  {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="flex-1 bg-gradient-to-t from-blue-600/20 to-blue-400 rounded-t-md border-t border-x border-blue-300/30"
                    />
                  ))}
                </div>
                
                <div className="mt-8 z-10 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[#94a3b8] mb-1">Total Mentions (30d)</div>
                    <div className="text-2xl font-bold text-white">2,845</div>
                  </div>
                  <div className="text-[#3ECF8E] flex items-center text-sm font-medium">
                    +14.2% <ArrowRight className="w-3 h-3 ml-1 -rotate-45" />
                  </div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wide mb-6 uppercase">
                <BarChart3 className="w-3 h-3" /> Signal Analytics
              </div>
              <h3 className="text-4xl font-bold mb-6 font-['Space_Grotesk'] leading-tight">
                Understand volume and trends over time
              </h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                Track how often your brand, competitors, or problem-space is mentioned across platforms. Uncover cyclical trends and identify which communities yield the highest quality pipeline.
              </p>
              <ul className="space-y-4">
                {[
                  "Historical mention volume analysis",
                  "Sentiment tracking and brand health",
                  "Share of voice vs. competitors"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#cbd5e1] font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#3ECF8E]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#3ECF8E]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold tracking-wide mb-6 uppercase">
                <Bot className="w-3 h-3" /> AI Assist
              </div>
              <h3 className="text-4xl font-bold mb-6 font-['Space_Grotesk'] leading-tight">
                Context-aware outreach drafted instantly
              </h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed mb-8">
                Stop staring at a blank screen. Our AI analyzes the original post and the prospect's intent to generate highly personalized, relevant outreach messages that get replies.
              </p>
              <ul className="space-y-4">
                {[
                  "Auto-generated email & DM drafts",
                  "Contextually links your solution to their problem",
                  "Adjustable tone matching brand voice"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#cbd5e1] font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#3ECF8E]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#3ECF8E]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              {/* Abstract Graphic representing AI generation */}
              <div className="aspect-square max-h-[500px] rounded-3xl bg-[#0a0d0f] border border-white/10 p-8 relative overflow-hidden flex flex-col items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-[60px]" />
                
                <div className="w-full max-w-sm bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl relative z-10 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4 border-b border-white/5 pb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">AI Assistant</div>
                      <div className="text-xs text-[#94a3b8]">Drafting reply...</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-2 w-3/4 bg-white/10 rounded animate-pulse" />
                    <div className="h-2 w-full bg-white/10 rounded animate-pulse animation-delay-150" />
                    <div className="h-2 w-5/6 bg-white/10 rounded animate-pulse animation-delay-300" />
                  </div>
                </div>

                <div className="w-full max-w-sm bg-[#3ECF8E]/10 backdrop-blur-xl border border-[#3ECF8E]/30 rounded-2xl p-5 shadow-2xl relative z-20 mt-[-40px] transform rotate-3 hover:rotate-0 transition-transform duration-500 ml-8">
                  <p className="text-sm text-white/90 leading-relaxed">
                    "Hi there, saw your post on Reddit struggling with manual pipeline generation. We actually built Octopilot exactly for this..."
                  </p>
                  <div className="mt-4 flex gap-2">
                    <div className="h-6 w-16 bg-[#3ECF8E]/20 rounded-full border border-[#3ECF8E]/30 flex items-center justify-center text-[10px] text-[#3ECF8E] font-medium">Send</div>
                    <div className="h-6 w-16 bg-white/5 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-[#94a3b8] font-medium">Edit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24 border-t border-white/5 bg-[#0a0d0f]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk'] mb-6">
            Pricing that scales with your pipeline
          </h2>
          <p className="text-[#94a3b8] text-lg">
            Start recovering leads immediately. No complex onboarding.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Pro */}
          <div className="bg-[#0f1419] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-[#94a3b8] text-sm mb-8 h-10">Perfect for founders and early-stage sales teams.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$299</span>
              <span className="text-[#64748b] ml-2">/month</span>
            </div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors border border-white/10 mb-8">
              Start 14-Day Trial
            </button>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span><strong>5</strong> Trackers (Keywords)</span></li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span><strong>1,000</strong> Signals / month</span></li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span>Reddit & Hacker News</span></li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span>Slack/Email Alerts</span></li>
            </ul>
          </div>

          {/* Growth */}
          <div className="bg-[#0f1419] border-2 border-[#3ECF8E] rounded-3xl p-8 relative shadow-[0_0_50px_-15px_rgba(62,207,142,0.2)] lg:scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3ECF8E] text-[#0a0d0f] text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Growth</h3>
            <p className="text-[#94a3b8] text-sm mb-8 h-10">For scaling revenue teams needing CRM integration.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$599</span>
              <span className="text-[#64748b] ml-2">/month</span>
            </div>
            <button className="w-full bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] font-bold py-4 rounded-xl transition-colors mb-8 shadow-lg">
              Start 14-Day Trial
            </button>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span><strong>25</strong> Trackers (Keywords)</span></li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span><strong>5,000</strong> Signals / month</span></li>
              <li className="flex items-start gap-3 text-white font-medium"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span>Native CRM Sync</span></li>
              <li className="flex items-start gap-3 text-white font-medium"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span>AI Outreach Drafts</span></li>
            </ul>
          </div>

          {/* Enterprise */}
          <div className="bg-[#0f1419] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-colors">
            <h3 className="text-2xl font-bold text-white mb-2">Enterprise</h3>
            <p className="text-[#94a3b8] text-sm mb-8 h-10">Custom deployment for large organizations.</p>
            <div className="mb-8">
              <span className="text-5xl font-bold text-white">$1200</span>
              <span className="text-[#64748b] ml-2">/month</span>
            </div>
            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-semibold py-4 rounded-xl transition-colors border border-white/10 mb-8">
              Contact Sales
            </button>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span><strong>Unlimited</strong> Trackers</span></li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span><strong>Unlimited</strong> Signals</span></li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span>Custom API & Webhooks</span></li>
              <li className="flex items-start gap-3 text-[#cbd5e1]"><Check className="w-5 h-5 text-[#3ECF8E] shrink-0" /> <span>Dedicated Success Manager</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-[#0a0d0f] border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-to-t from-[#3ECF8E]/10 to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-[#3ECF8E]/10 rounded-[100%] blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-8 tracking-tight text-white leading-tight">
          Ready to turn social chatter into <span className="text-[#3ECF8E]">closed won?</span>
        </h2>
        <p className="text-xl text-[#94a3b8] mb-12 max-w-2xl mx-auto">
          Join 50+ revenue teams automating their pipeline generation. Setup takes 2 minutes. No credit card required.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-bold px-10 py-5 rounded-full transition-all shadow-[0_0_40px_-10px_#3ECF8E] flex items-center justify-center gap-2">
            Start 14-Day Free Trial <ArrowRight className="w-5 h-5" />
          </button>
          <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white text-lg font-semibold px-10 py-5 rounded-full border border-white/10 transition-all">
            Book a Demo
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0d0f] pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded bg-[#3ECF8E]/20 flex items-center justify-center border border-[#3ECF8E]/30">
                <Radar className="w-4 h-4 text-[#3ECF8E]" />
              </div>
              <span className="text-lg font-bold tracking-tight font-['Space_Grotesk'] text-white">
                OCTOPILOT
              </span>
            </div>
            <p className="text-[#64748b] text-sm max-w-xs mb-6">
              The automated intent monitoring platform for modern B2B revenue teams.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">API Reference</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">About</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Customers</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748b] text-sm">
            © {new Date().getFullYear()} Octopilot. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#64748b]">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
