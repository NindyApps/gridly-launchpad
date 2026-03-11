import React, { useState } from "react";
import { 
  ArrowRight, 
  Check, 
  ChevronDown, 
  Mail, 
  Menu, 
  X, 
  BarChart3, 
  Globe, 
  MessageSquare,
  Shield,
  Zap,
  Quote
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function EditorialMinimal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900 font-sans selection:bg-indigo-100">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }
        .font-sans {
          font-family: 'Inter', sans-serif;
        }
      `}} />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#FAFAFA]/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <a href="/" className="font-serif font-bold text-xl tracking-wide text-slate-900">
              OCTOPILOT.
            </a>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
              <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it Works</a>
              <a href="#features" className="hover:text-slate-900 transition-colors">Platform</a>
              <a href="#testimonials" className="hover:text-slate-900 transition-colors">Customers</a>
              <a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Sign in
            </a>
            <a href="/signup" className="inline-flex h-10 items-center justify-center rounded-none bg-indigo-950 px-6 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-950">
              Start Free Trial
            </a>
          </div>
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-[#FAFAFA] p-6 border-b border-slate-200">
          <div className="flex flex-col gap-6 text-lg font-medium">
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Platform</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)}>Customers</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <hr className="border-slate-200" />
            <a href="/login">Sign in</a>
            <a href="/signup" className="text-indigo-700">Start Free Trial &rarr;</a>
          </div>
        </div>
      )}

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-6 z-10 relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white shadow-sm mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-indigo-600"></span>
                  <span className="text-xs font-medium text-slate-600 tracking-wide uppercase">New: Salesforce Integration</span>
                </div>
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] tracking-tight text-slate-900 mb-6">
                  Silence the noise. <br />
                  <span className="text-slate-500 italic">Amplify the signal.</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-600 font-light leading-relaxed mb-10 max-w-lg">
                  OCTOPILOT monitors Reddit and Hacker News for buying intent, using AI to distill conversations into ready-to-close pipeline.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href="/signup" className="inline-flex h-14 items-center justify-center rounded-none bg-indigo-950 px-8 text-base font-medium text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 hover:bg-indigo-900">
                    Start 14-day trial
                  </a>
                  <a href="#how-it-works" className="inline-flex h-14 items-center justify-center rounded-none border border-slate-300 bg-transparent px-8 text-base font-medium text-slate-900 transition-colors hover:bg-slate-50">
                    Read the manifesto
                  </a>
                </div>
              </div>
              
              <div className="lg:col-span-6 relative">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-slate-200 shadow-xl bg-white p-2">
                  <img 
                    src="/__mockup/images/editorial-hero.png" 
                    alt="Abstract data visualization" 
                    className="w-full h-full object-cover rounded-sm grayscale opacity-90 mix-blend-multiply"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50/40 to-transparent mix-blend-overlay pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="py-12 border-y border-slate-200/50 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">Trusted by Revenue Teams At</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale">
              <span className="font-serif text-xl font-bold">DATALOOP</span>
              <span className="font-sans text-xl font-bold tracking-tighter">FORGE</span>
              <span className="font-serif text-xl italic font-semibold">Stackmesh</span>
              <span className="font-sans text-xl font-light tracking-widest">NEXUS</span>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="max-w-3xl mb-24">
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-slate-900 mb-6">
                Intelligence, refined.
              </h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed">
                The modern buyer is researching your category in public forums. 
                Our platform captures these invisible signals and transforms them into structured CRM data.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 relative">
              <div className="hidden md:block absolute top-8 left-[16.66%] right-[16.66%] h-px bg-slate-200" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-none flex items-center justify-center mb-8 relative z-10 shadow-sm">
                  <Globe className="text-indigo-950" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium mb-4">1. Observe</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  Continuous monitoring of subreddits and HN threads for specific keywords, competitor mentions, and problem descriptions.
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-indigo-50 border border-indigo-100 rounded-none flex items-center justify-center mb-8 relative z-10 shadow-sm">
                  <Zap className="text-indigo-900" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium mb-4">2. Distill</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  GPT-4o-mini analyzes context, discarding noise and classifying true buying intent with human-level accuracy.
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-slate-900 border border-slate-900 rounded-none flex items-center justify-center mb-8 relative z-10 shadow-sm">
                  <ArrowRight className="text-white" size={24} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium mb-4">3. Inject</h3>
                <p className="text-slate-600 font-light leading-relaxed">
                  High-intent signals are automatically routed to HubSpot or Salesforce as actionable tasks for your sales team.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 1 */}
        <section id="features" className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1 relative aspect-[4/3] bg-[#FAFAFA] border border-slate-200 p-2 shadow-sm">
                <img src="/__mockup/images/editorial-feature-ai.png" alt="AI Classification" className="w-full h-full object-cover border border-slate-100 mix-blend-multiply" />
              </div>
              <div className="order-1 lg:order-2">
                <div className="h-px w-12 bg-indigo-900 mb-8" />
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-slate-900 mb-6">
                  Contextual analysis over keyword matching
                </h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                  Stop scrolling through generic keyword alerts. Our AI understands the difference between a user complaining about a competitor and a user actively seeking alternatives.
                </p>
                <ul className="space-y-4">
                  {[
                    "Zero-shot classification of buying intent",
                    "Sentiment analysis of competitor mentions",
                    "Automated extraction of pain points"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <Check className="mt-1 text-indigo-700" size={18} strokeWidth={2} />
                      <span className="font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2 */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <div className="h-px w-12 bg-indigo-900 mb-8" />
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-slate-900 mb-6">
                  Zero-friction CRM integration
                </h2>
                <p className="text-lg text-slate-600 font-light leading-relaxed mb-8">
                  Intelligence is only valuable if it reaches the right rep at the right time. OCTOPILOT operates in the background, updating your system of record directly.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="border border-slate-200 p-6 bg-[#FAFAFA]">
                    <h4 className="font-medium text-slate-900 mb-2">HubSpot</h4>
                    <p className="text-sm text-slate-500 font-light">Native bi-directional sync for Contacts and Tasks.</p>
                  </div>
                  <div className="border border-slate-200 p-6 bg-[#FAFAFA]">
                    <h4 className="font-medium text-slate-900 mb-2 flex items-center gap-2">Salesforce <span className="text-[10px] px-2 py-0.5 bg-indigo-100 text-indigo-800 uppercase tracking-widest">New</span></h4>
                    <p className="text-sm text-slate-500 font-light">Create Leads and Opportunities instantly.</p>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] bg-[#FAFAFA] border border-slate-200 p-2 shadow-sm">
                <img src="/__mockup/images/editorial-feature-crm.png" alt="CRM Integration" className="w-full h-full object-cover border border-slate-100 mix-blend-multiply" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-32 bg-slate-900 text-white selection:bg-indigo-500/30">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-medium mb-20 text-center text-slate-50">
              The consensus is clear.
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  quote: "OCTOPILOT found us 3 enterprise deals in the first week that we would have completely missed. The AI summaries are scarily accurate.",
                  author: "Sarah Chen",
                  title: "VP of Sales, Dataloop"
                },
                {
                  quote: "We replaced our manual Reddit monitoring workflow with OCTOPILOT. What used to take 4 hours a day now happens automatically with better results.",
                  author: "Marcus Rivera",
                  title: "Head of Growth, Forge Analytics"
                },
                {
                  quote: "The HubSpot integration is seamless. Our SDRs get a task with a ready-to-send opener right in their CRM. Pipeline velocity went up 34%.",
                  author: "Priya Nambiar",
                  title: "RevOps Lead, Stackmesh"
                }
              ].map((t, i) => (
                <div key={i} className="bg-slate-800/50 border border-slate-700 p-8 flex flex-col justify-between hover:bg-slate-800 transition-colors">
                  <Quote className="text-indigo-400 mb-6 opacity-50" size={32} />
                  <p className="text-slate-300 font-light leading-relaxed mb-8 text-lg">"{t.quote}"</p>
                  <div>
                    <p className="font-medium text-slate-100">{t.author}</p>
                    <p className="text-sm text-slate-400 font-light">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-slate-900 mb-6">
                Transparent investment.
              </h2>
              <p className="text-xl text-slate-500 font-light">
                Choose the tier that matches your revenue ambitions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  name: "Pro",
                  price: "$299",
                  desc: "For lean teams starting their signal-led motion.",
                  features: ["5 active trackers", "1,000 signals/mo", "HubSpot integration", "Email alerts"]
                },
                {
                  name: "Growth",
                  price: "$599",
                  desc: "For scaling revenue organizations.",
                  features: ["15 active trackers", "5,000 signals/mo", "Salesforce & HubSpot", "Slack integration", "Priority support"],
                  highlighted: true
                },
                {
                  name: "Enterprise",
                  price: "$1200",
                  desc: "Uncapped potential for large sales floors.",
                  features: ["Unlimited trackers", "Unlimited signals", "Custom CRM mapping", "Dedicated CSM", "API access"]
                }
              ].map((tier, i) => (
                <div key={i} className={`p-8 flex flex-col ${tier.highlighted ? 'bg-indigo-950 text-white shadow-xl' : 'bg-white border border-slate-200 text-slate-900'}`}>
                  {tier.highlighted && <div className="text-xs uppercase tracking-widest text-indigo-300 font-medium mb-4">Most Popular</div>}
                  <h3 className={`text-2xl font-serif mb-2 ${tier.highlighted ? 'text-white' : 'text-slate-900'}`}>{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-light">{tier.price}</span>
                    <span className={`text-sm ${tier.highlighted ? 'text-indigo-200' : 'text-slate-500'}`}>/mo</span>
                  </div>
                  <p className={`text-sm font-light mb-8 h-10 ${tier.highlighted ? 'text-indigo-100' : 'text-slate-600'}`}>{tier.desc}</p>
                  
                  <ul className="space-y-4 mb-10 flex-grow">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm font-light">
                        <Check size={16} className={tier.highlighted ? 'text-indigo-300' : 'text-indigo-700'} />
                        <span className={tier.highlighted ? 'text-slate-200' : 'text-slate-600'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <a href="/signup" className={`w-full py-4 text-center text-sm font-medium transition-colors ${
                    tier.highlighted 
                      ? 'bg-white text-indigo-950 hover:bg-slate-100' 
                      : 'border border-slate-300 hover:border-slate-400 hover:bg-slate-50'
                  }`}>
                    Select {tier.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 bg-white border-t border-slate-100">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-center text-slate-900 mb-16">
              Frequently asked questions
            </h2>
            
            <div className="space-y-4">
              {[
                {
                  q: "How does OCTOPILOT find buying signals?",
                  a: "We continuously scan platforms like Reddit and Hacker News using proprietary scrapers. The raw data is then processed by GPT-4o-mini to filter out noise and classify genuine buying intent based on context, not just simple keyword matching."
                },
                {
                  q: "Does OCTOPILOT post anything on my behalf?",
                  a: "No. OCTOPILOT uses a strict Zero-Write Architecture. We only read publicly available data and route insights to your CRM. We will never post, comment, or interact with users on external platforms."
                },
                {
                  q: "Which CRMs do you support?",
                  a: "Currently, we offer deep, native integrations with HubSpot and Salesforce. We are actively developing integrations for Pipedrive and MS Dynamics."
                },
                {
                  q: "Can I try before paying?",
                  a: "Absolutely. All plans come with a 14-day free trial that provides full access to the platform's features. No credit card is required to start your trial."
                }
              ].map((faq, i) => (
                <div key={i} className="border border-slate-200 bg-[#FAFAFA]">
                  <button 
                    onClick={() => toggleFaq(i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <span className="font-medium text-slate-900">{faq.q}</span>
                    <ChevronDown className={`transform transition-transform duration-200 text-slate-400 ${openFaq === i ? 'rotate-180' : ''}`} size={20} />
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5 text-slate-600 font-light leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-32 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 skew-x-12 translate-x-1/2 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="font-serif text-4xl md:text-6xl font-medium text-slate-900 mb-8">
              Capture the demand others miss.
            </h2>
            <p className="text-xl text-slate-600 font-light mb-12 max-w-2xl mx-auto">
              Join the revenue leaders who use OCTOPILOT to turn social noise into high-converting pipeline.
            </p>
            <a href="/signup" className="inline-flex h-16 items-center justify-center bg-indigo-950 px-10 text-lg font-medium text-white shadow-xl hover:-translate-y-1 transition-transform hover:shadow-2xl">
              Start your 14-day free trial
            </a>
            <p className="mt-6 text-sm text-slate-500 font-light">No credit card required. Setup takes 3 minutes.</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#FAFAFA] border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <span className="font-serif font-bold text-xl tracking-wide text-slate-900 block mb-6">
                OCTOPILOT.
              </span>
              <p className="text-slate-500 font-light max-w-sm">
                B2B Revenue Signal Intelligence. Discover intent, accelerate pipeline, close more deals.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-6 uppercase text-sm tracking-wider">Product</h4>
              <ul className="space-y-4 text-sm font-light text-slate-600">
                <li><a href="#features" className="hover:text-slate-900 transition-colors">Platform</a></li>
                <li><a href="#pricing" className="hover:text-slate-900 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-slate-900 mb-6 uppercase text-sm tracking-wider">Company</h4>
              <ul className="space-y-4 text-sm font-light text-slate-600">
                <li><a href="#" className="hover:text-slate-900 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors">Legal</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 font-light">
            <p>© {new Date().getFullYear()} Octopilot Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
