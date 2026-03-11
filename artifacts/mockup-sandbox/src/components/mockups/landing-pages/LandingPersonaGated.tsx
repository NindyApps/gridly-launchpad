import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target, 
  Settings, 
  Rocket, 
  BarChart3, 
  Radar, 
  ArrowRight, 
  Check, 
  Quote, 
  Activity, 
  Database, 
  Bot, 
  Users, 
  Zap,
  ChevronDown
} from "lucide-react";

type Role = "sdr" | "revops" | "founder" | "cro" | null;

interface RoleData {
  id: NonNullable<Role>;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  heroTagline: string;
  features: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  recommendedTier: "Pro" | "Growth" | "Enterprise";
}

const rolesData: Record<NonNullable<Role>, RoleData> = {
  sdr: {
    id: "sdr",
    title: "SDR",
    icon: <Target className="w-8 h-8 text-[#3ECF8E]" />,
    subtitle: "Warm leads on autopilot",
    heroTagline: "Stop cold calling. Start warm connecting.",
    features: [
      {
        title: "Intent Signals",
        description: "Get alerts the moment a prospect mentions your competitors or asks for a solution like yours on Reddit or Hacker News.",
        icon: <Activity className="w-6 h-6 text-[#3ECF8E]" />
      },
      {
        title: "CRM Sync",
        description: "1-click push to Salesforce or HubSpot. We automatically enrich the lead with context and source links.",
        icon: <Database className="w-6 h-6 text-[#3ECF8E]" />
      }
    ],
    testimonial: {
      quote: "My quota attainment went from 80% to 140% in two months. Octopilot basically hands me layups every morning.",
      author: "Alex Thompson",
      role: "SDR, TechFlow"
    },
    recommendedTier: "Pro"
  },
  revops: {
    id: "revops",
    title: "RevOps Leader",
    icon: <Settings className="w-8 h-8 text-[#3ECF8E]" />,
    subtitle: "Pipeline intelligence at scale",
    heroTagline: "Automate your signal-to-pipeline workflow.",
    features: [
      {
        title: "Signal Analytics",
        description: "Track intent volume over time. Understand which communities drive the most qualified pipeline for your sales team.",
        icon: <BarChart3 className="w-6 h-6 text-[#3ECF8E]" />
      },
      {
        title: "Advanced CRM Routing",
        description: "Set up complex rules to route intent signals to the right rep based on territory, account ownership, or industry.",
        icon: <Database className="w-6 h-6 text-[#3ECF8E]" />
      }
    ],
    testimonial: {
      quote: "Finally, a tool that seamlessly bridges the gap between social intent and our complex Salesforce routing rules.",
      author: "Sarah Chen",
      role: "VP RevOps, CloudScale"
    },
    recommendedTier: "Growth"
  },
  founder: {
    id: "founder",
    title: "Founder",
    icon: <Rocket className="w-8 h-8 text-[#3ECF8E]" />,
    subtitle: "Find your first 100 customers",
    heroTagline: "Find people asking for exactly what you built.",
    features: [
      {
        title: "Keyword Monitoring",
        description: "Monitor early-adopter communities for the exact problems your startup solves. Find product-market fit faster.",
        icon: <Radar className="w-6 h-6 text-[#3ECF8E]" />
      },
      {
        title: "AI Outreach Scoring",
        description: "Don't waste time on tire-kickers. Our AI scores intent so you only spend your limited time talking to active buyers.",
        icon: <Bot className="w-6 h-6 text-[#3ECF8E]" />
      }
    ],
    testimonial: {
      quote: "We got our first 50 paying customers entirely through Octopilot. It's the ultimate cheat code for early-stage growth.",
      author: "Priya Nambiar",
      role: "Founder, DataSync"
    },
    recommendedTier: "Pro"
  },
  cro: {
    id: "cro",
    title: "Enterprise CRO",
    icon: <BarChart3 className="w-8 h-8 text-[#3ECF8E]" />,
    subtitle: "Full-funnel signal coverage",
    heroTagline: "Full visibility into social buying signals.",
    features: [
      {
        title: "Executive Analytics",
        description: "Roll-up reporting on intent-driven pipeline, competitive share of voice, and team SLA on signal response.",
        icon: <BarChart3 className="w-6 h-6 text-[#3ECF8E]" />
      },
      {
        title: "Team Management",
        description: "Deploy workspaces for different business units, manage RBAC, and enforce global compliance standards.",
        icon: <Users className="w-6 h-6 text-[#3ECF8E]" />
      }
    ],
    testimonial: {
      quote: "Octopilot represents a foundational shift in how we source pipeline. It's now driving 20% of our enterprise opportunities.",
      author: "Marcus Rivera",
      role: "CRO, CyberShield"
    },
    recommendedTier: "Enterprise"
  }
};

export default function LandingPersonaGated() {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleRoleSelect = (role: Role) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedRole(role);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0a0d0f] text-[#f1f5f9] selection:bg-[#3ECF8E] selection:text-[#0a0d0f] font-sans">
      <AnimatePresence mode="wait">
        {!selectedRole ? (
          <RoleSelector 
            key="selector" 
            onSelect={handleRoleSelect} 
            isTransitioning={isTransitioning} 
          />
        ) : (
          <MainContent 
            key="main" 
            role={selectedRole} 
            onSwitchRole={handleRoleSelect} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- Role Selector Screen ---

function RoleSelector({ 
  onSelect, 
  isTransitioning 
}: { 
  onSelect: (role: NonNullable<Role>) => void;
  isTransitioning: boolean;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#3ECF8E]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="absolute top-12 left-12 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-[#3ECF8E]/20 flex items-center justify-center border border-[#3ECF8E]/30">
          <Radar className="w-5 h-5 text-[#3ECF8E]" />
        </div>
        <span className="text-xl font-bold tracking-tight font-['Space_Grotesk'] text-white">
          OCTOPILOT
        </span>
      </div>

      <div className="max-w-4xl w-full z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-['Space_Grotesk'] mb-6">
            Built for your role
          </h1>
          <p className="text-xl text-[#94a3b8]">
            Select your role to see how OCTOPILOT works for you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {(Object.keys(rolesData) as NonNullable<Role>[]).map((roleKey, idx) => (
            <motion.button
              key={roleKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
              onClick={() => onSelect(roleKey)}
              disabled={isTransitioning}
              className="group text-left bg-[#0f1419]/80 backdrop-blur-sm border border-white/5 hover:border-[#3ECF8E]/50 p-8 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_-10px_#3ECF8E] hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#3ECF8E]/0 to-[#3ECF8E]/0 group-hover:from-[#3ECF8E]/5 group-hover:to-transparent transition-colors duration-500" />
              
              <div className="relative z-10 flex items-start gap-6">
                <div className="w-16 h-16 rounded-xl bg-[#0a0d0f] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 group-hover:border-[#3ECF8E]/30">
                  {rolesData[roleKey].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-['Space_Grotesk'] group-hover:text-[#3ECF8E] transition-colors">
                    {rolesData[roleKey].title}
                  </h3>
                  <p className="text-[#94a3b8] text-lg">
                    {rolesData[roleKey].subtitle}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// --- Main Content Screen ---

function MainContent({ 
  role, 
  onSwitchRole 
}: { 
  role: NonNullable<Role>;
  onSwitchRole: (role: NonNullable<Role>) => void;
}) {
  const data = rolesData[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Navbar />
      <RoleSwitcher currentRole={role} onSwitch={onSwitchRole} />
      
      <main className="pt-32">
        <Hero data={data} />
        <Features data={data} />
        <Testimonial data={data} />
        <Pricing recommendedTier={data.recommendedTier} />
        <CTASection />
      </main>
      
      <Footer />
    </motion.div>
  );
}

// --- Sections ---

function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#0a0d0f] border-b border-white/5 h-16">
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#3ECF8E]/20 flex items-center justify-center border border-[#3ECF8E]/30">
            <Radar className="w-5 h-5 text-[#3ECF8E]" />
          </div>
          <span className="text-lg font-bold tracking-tight font-['Space_Grotesk'] text-white">
            OCTOPILOT
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#94a3b8]">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-sm font-medium text-[#94a3b8] hover:text-white transition-colors hidden sm:block">
            Log in
          </button>
          <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-4 py-2 rounded-full transition-all">
            Book Demo
          </button>
        </div>
      </div>
    </header>
  );
}

function RoleSwitcher({ 
  currentRole, 
  onSwitch 
}: { 
  currentRole: NonNullable<Role>;
  onSwitch: (role: NonNullable<Role>) => void;
}) {
  return (
    <div className="fixed top-16 w-full z-40 bg-[#0f1419]/90 backdrop-blur-md border-b border-white/5 py-3">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-sm text-[#64748b] mr-4 hidden sm:block">Viewing as:</span>
          {(Object.keys(rolesData) as NonNullable<Role>[]).map((roleKey) => {
            const isSelected = roleKey === currentRole;
            return (
              <button
                key={roleKey}
                onClick={() => onSwitch(roleKey)}
                className={`
                  px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300
                  ${isSelected 
                    ? "bg-[#3ECF8E]/10 text-[#3ECF8E] border border-[#3ECF8E]/30 shadow-[0_0_15px_-5px_#3ECF8E]" 
                    : "text-[#94a3b8] hover:text-white hover:bg-white/5 border border-transparent"}
                `}
              >
                {rolesData[roleKey].title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Hero({ data }: { data: RoleData }) {
  return (
    <section className="relative pt-20 pb-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#3ECF8E]/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          key={data.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1e293b] border border-white/10 text-white text-sm font-medium mb-8">
            {data.icon}
            <span>Built specifically for {data.title}s</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold font-['Space_Grotesk'] tracking-tight mb-8 leading-tight max-w-4xl mx-auto">
            {data.heroTagline}
          </h1>

          <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto mb-10 leading-relaxed">
            Octopilot monitors millions of conversations across Reddit, Hacker News, and more to find your next best customer.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-semibold px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_#3ECF8E]">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white text-lg font-medium px-8 py-4 rounded-full border border-white/10 transition-all">
              Book a Demo
            </button>
          </div>
          
          {/* Abstract Dashboard Graphic */}
          <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-[#1e293b]/50 p-2 shadow-2xl backdrop-blur-sm overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-b from-[#3ECF8E]/5 to-transparent pointer-events-none" />
             <div className="w-full aspect-[16/9] bg-[#0a0d0f] rounded-xl flex items-center justify-center relative overflow-hidden border border-white/5">
                {/* Abstract UI Representation */}
                <div className="absolute top-0 left-0 w-64 h-full border-r border-white/5 p-4 hidden md:block">
                  <div className="w-3/4 h-4 bg-white/10 rounded mb-8" />
                  <div className="space-y-4">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="flex gap-3 items-center">
                        <div className="w-6 h-6 rounded bg-white/5" />
                        <div className="w-full h-3 bg-white/5 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 h-full p-6 relative">
                  <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                    <div className="w-48 h-6 bg-white/10 rounded" />
                    <div className="w-24 h-8 bg-[#3ECF8E]/20 rounded-full border border-[#3ECF8E]/30" />
                  </div>
                  <div className="space-y-4">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-full bg-[#1e293b]/50 rounded-xl p-4 border border-white/5 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3ECF8E]/20 to-blue-500/20 shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="w-1/3 h-4 bg-white/10 rounded" />
                          <div className="w-full h-3 bg-white/5 rounded" />
                          <div className="w-5/6 h-3 bg-white/5 rounded" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Features({ data }: { data: RoleData }) {
  return (
    <section id="features" className="py-24 border-t border-white/5 bg-[#0f1419]/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-6">
            The {data.title} Toolkit
          </h2>
          <p className="text-[#94a3b8] text-lg">
            Purpose-built workflows that integrate directly into your daily processes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.features.map((feature, i) => (
            <motion.div 
              key={`${data.id}-feature-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0a0d0f] border border-white/5 p-10 rounded-3xl relative overflow-hidden group hover:border-[#3ECF8E]/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#3ECF8E]/10 border border-[#3ECF8E]/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-[#94a3b8] text-lg leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial({ data }: { data: RoleData }) {
  return (
    <section className="py-24 border-t border-white/5 bg-[#0a0d0f] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#3ECF8E]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          key={`${data.id}-testimonial`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-[#0f1419] border border-white/10 rounded-3xl p-10 md:p-16 relative shadow-2xl"
        >
          <Quote className="absolute top-10 left-10 w-12 h-12 text-[#3ECF8E]/10" />
          
          <div className="relative z-10 flex flex-col items-center text-center">
            <p className="text-2xl md:text-3xl text-white mb-10 leading-relaxed font-medium">
              "{data.testimonial.quote}"
            </p>
            
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#1e293b] border-2 border-[#3ECF8E]/30 flex items-center justify-center font-bold text-[#3ECF8E] text-xl">
                {data.testimonial.author.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-lg">{data.testimonial.author}</div>
                <div className="text-[#3ECF8E]">{data.testimonial.role}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Pricing({ recommendedTier }: { recommendedTier: "Pro" | "Growth" | "Enterprise" }) {
  const tiers = [
    {
      name: "Pro",
      price: "$299",
      desc: "For early stage startups",
      features: ["5 Trackers", "1,000 Signals/mo", "Reddit & Hacker News", "Email Alerts"]
    },
    {
      name: "Growth",
      price: "$599",
      desc: "For scaling revenue teams",
      features: ["25 Trackers", "5,000 Signals/mo", "Native CRM Sync", "AI Outreach Drafts"]
    },
    {
      name: "Enterprise",
      price: "$1200",
      desc: "For mature organizations",
      features: ["Unlimited Trackers", "Unlimited Signals", "Custom API Webhooks", "Dedicated CSM"]
    }
  ];

  return (
    <section id="pricing" className="py-24 border-t border-white/5 bg-[#0f1419]/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk'] mb-6">
            Simple pricing, built for growth
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => {
            const isRecommended = tier.name === recommendedTier;
            
            return (
              <motion.div 
                key={tier.name}
                initial={false}
                animate={{
                  scale: isRecommended ? 1.05 : 1,
                  borderColor: isRecommended ? "rgba(62, 207, 142, 1)" : "rgba(255, 255, 255, 0.1)",
                  boxShadow: isRecommended ? "0 0 40px -15px rgba(62, 207, 142, 0.5)" : "none",
                  zIndex: isRecommended ? 10 : 1
                }}
                className={`bg-[#0a0d0f] border-2 rounded-3xl p-8 relative transition-all duration-500`}
              >
                {isRecommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#3ECF8E] text-[#0a0d0f] text-sm font-bold px-4 py-1.5 rounded-full shadow-lg">
                    Recommended For You
                  </div>
                )}
                
                <h3 className="text-xl font-semibold text-white mb-2">{tier.name}</h3>
                <p className="text-[#64748b] text-sm mb-6">{tier.desc}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-[#64748b]">/mo</span>
                </div>
                
                <button className={`w-full font-bold py-3 rounded-xl transition-colors mb-8 ${
                  isRecommended 
                    ? "bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f]" 
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                }`}>
                  {tier.name === "Enterprise" ? "Contact Sales" : "Start 14-Day Trial"}
                </button>
                
                <ul className="space-y-4">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#cbd5e1]">
                      <Check className="w-4 h-4 text-[#3ECF8E]" /> {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
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
          Ready to capture your pipeline?
        </h2>
        <p className="text-xl text-[#94a3b8] mb-10">
          Join the fastest growing revenue teams capturing intent before their competitors do.
        </p>
        <button className="bg-[#3ECF8E] hover:bg-[#34b57a] text-[#0a0d0f] text-lg font-bold px-10 py-5 rounded-full transition-all shadow-[0_0_40px_-10px_#3ECF8E]">
          Start Your Free Trial
        </button>
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
            <p className="text-[#64748b] text-sm leading-relaxed">
              The social intent platform for modern B2B revenue teams.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E]">Features</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E]">Integrations</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E]">Pricing</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E]">Changelog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E]">Documentation</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E]">Blog</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E]">Sales Strategies</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-[#64748b]">
              <li><a href="#" className="hover:text-[#3ECF8E]">About Us</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E]">Careers</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E]">Contact</a></li>
              <li><a href="#" className="hover:text-[#3ECF8E]">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#64748b] text-sm">
            © 2025 Octopilot. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[#64748b]">
            <a href="#" className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg></a>
            <a href="#" className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
