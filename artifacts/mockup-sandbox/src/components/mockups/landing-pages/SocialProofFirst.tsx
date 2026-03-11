import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight, 
  BarChart3, 
  MessageSquare, 
  Database, 
  Zap,
  ChevronDown,
  Shield,
  TrendingUp,
  Target
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function SocialProofFirst() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-xl">
              O
            </div>
            <span className="font-bold text-xl tracking-tight">OCTOPILOT</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#results" className="hover:text-amber-400 transition-colors">Results</a>
            <a href="#features" className="hover:text-amber-400 transition-colors">Platform</a>
            <a href="#pricing" className="hover:text-amber-400 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log in</a>
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-semibold rounded-full px-6">
              <a href="/signup">Start Free Trial</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/__mockup/images/hero-bg-social-proof.png" 
            alt="Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/80 to-slate-950"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border-amber-500/20 mb-6 px-4 py-1.5 rounded-full text-sm font-medium">
              Trusted by 500+ B2B Revenue Teams
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Don't Miss Another <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-600">
                Hidden Buying Signal
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed">
              OCTOPILOT automatically detects intent on Reddit and Hacker News, delivering ready-to-work leads directly into your CRM.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-full px-8 h-14 text-lg w-full sm:w-auto shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]">
                <a href="/signup">Get Started Free</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg w-full sm:w-auto border-slate-700 hover:bg-slate-800 text-white">
                <a href="#results">See The Results</a>
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-500">14-day free trial. No credit card required.</p>
          </motion.div>
        </div>
      </section>

      {/* Immediate Social Proof - Logos & Hard Metrics */}
      <section id="results" className="py-12 border-y border-slate-800 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm font-semibold text-slate-500 tracking-widest uppercase mb-8">Powering fast-growing revenue teams</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale mb-20">
            {/* Fictional Logos */}
            <h3 className="text-2xl font-bold font-serif italic">Dataloop</h3>
            <h3 className="text-2xl font-black tracking-tighter">FORGE</h3>
            <h3 className="text-2xl font-bold flex items-center gap-2"><div className="w-4 h-4 bg-white rounded-sm"></div>Stackmesh</h3>
            <h3 className="text-2xl font-medium tracking-widest">AERIS</h3>
            <h3 className="text-2xl font-semibold">Nexus<span className="text-amber-500">AI</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl"
            >
              <TrendingUp className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <div className="text-5xl font-extrabold text-white mb-2">34%</div>
              <p className="text-lg text-amber-400 font-medium mb-2">Faster Pipeline</p>
              <p className="text-slate-400 text-sm">Average increase in pipeline velocity for SDR teams</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl"
            >
              <Target className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <div className="text-5xl font-extrabold text-white mb-2">3 Deals</div>
              <p className="text-lg text-amber-400 font-medium mb-2">In Week One</p>
              <p className="text-slate-400 text-sm">Average enterprise deals sourced in the first 7 days</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl"
            >
              <Zap className="w-10 h-10 text-amber-500 mx-auto mb-4" />
              <div className="text-5xl font-extrabold text-white mb-2">4 Hours</div>
              <p className="text-lg text-amber-400 font-medium mb-2">Saved Daily</p>
              <p className="text-slate-400 text-sm">Time saved previously spent on manual social monitoring</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prominent Testimonials */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Don't take our word for it.</h2>
            <p className="text-xl text-slate-400">See how top revenue teams use OCTOPILOT to crush their quotas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden group hover:border-amber-500/50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <CardContent className="pt-8 pb-6">
                <div className="mb-6 text-amber-500">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.411 14.603C18.805 14.603 20 13.098 20 10.089C20 7.08 17.606 5.575 15.212 5.575C12.818 5.575 11.622 7.08 11.622 10.089V14.603H14.017ZM6.396 21L8.79 14.603C11.184 14.603 12.378 13.098 12.378 10.089C12.378 7.08 9.984 5.575 7.59 5.575C5.196 5.575 4 7.08 4 10.089V14.603H6.396Z" />
                  </svg>
                </div>
                <p className="text-xl leading-relaxed text-slate-300 mb-8 font-medium">
                  "OCTOPILOT found us 3 enterprise deals in the first week that we would have completely missed. The AI summaries are scarily accurate."
                </p>
                <div className="flex items-center gap-4">
                  <img src="/__mockup/images/avatar-sarah.png" alt="Sarah Chen" className="w-14 h-14 rounded-full object-cover border-2 border-slate-800" />
                  <div>
                    <h4 className="font-bold text-white">Sarah Chen</h4>
                    <p className="text-sm text-slate-400">VP of Sales at Dataloop</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden group hover:border-amber-500/50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <CardContent className="pt-8 pb-6">
                <div className="mb-6 text-amber-500">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.411 14.603C18.805 14.603 20 13.098 20 10.089C20 7.08 17.606 5.575 15.212 5.575C12.818 5.575 11.622 7.08 11.622 10.089V14.603H14.017ZM6.396 21L8.79 14.603C11.184 14.603 12.378 13.098 12.378 10.089C12.378 7.08 9.984 5.575 7.59 5.575C5.196 5.575 4 7.08 4 10.089V14.603H6.396Z" />
                  </svg>
                </div>
                <p className="text-xl leading-relaxed text-slate-300 mb-8 font-medium">
                  "We replaced our manual Reddit monitoring workflow with OCTOPILOT. What used to take 4 hours a day now happens automatically with better results."
                </p>
                <div className="flex items-center gap-4">
                  <img src="/__mockup/images/avatar-marcus.png" alt="Marcus Rivera" className="w-14 h-14 rounded-full object-cover border-2 border-slate-800" />
                  <div>
                    <h4 className="font-bold text-white">Marcus Rivera</h4>
                    <p className="text-sm text-slate-400">Head of Growth at Forge Analytics</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden group hover:border-amber-500/50 transition-colors duration-300">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <CardContent className="pt-8 pb-6">
                <div className="mb-6 text-amber-500">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.411 14.603C18.805 14.603 20 13.098 20 10.089C20 7.08 17.606 5.575 15.212 5.575C12.818 5.575 11.622 7.08 11.622 10.089V14.603H14.017ZM6.396 21L8.79 14.603C11.184 14.603 12.378 13.098 12.378 10.089C12.378 7.08 9.984 5.575 7.59 5.575C5.196 5.575 4 7.08 4 10.089V14.603H6.396Z" />
                  </svg>
                </div>
                <p className="text-xl leading-relaxed text-slate-300 mb-8 font-medium">
                  "The HubSpot integration is seamless. Our SDRs get a task with a ready-to-send opener right in their CRM. Pipeline velocity went up 34%."
                </p>
                <div className="flex items-center gap-4">
                  <img src="/__mockup/images/avatar-priya.png" alt="Priya Nambiar" className="w-14 h-14 rounded-full object-cover border-2 border-slate-800" />
                  <div>
                    <h4 className="font-bold text-white">Priya Nambiar</h4>
                    <p className="text-sm text-slate-400">RevOps Lead at Stackmesh</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works / Features */}
      <section id="features" className="py-24 bg-slate-900 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">How OCTOPILOT works.</h2>
              <p className="text-xl text-slate-400 mb-8">
                We continuously scan the depths of Reddit and Hacker News to find people actively looking to solve the problems your product fixes.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 font-bold text-xl border border-slate-700">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">Monitor Intent <MessageSquare className="w-5 h-5 text-amber-500" /></h3>
                    <p className="text-slate-400">Define keywords and competitors. We monitor millions of threads in real-time across Reddit and Hacker News.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 font-bold text-xl border border-slate-700">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">AI Classification <BarChart3 className="w-5 h-5 text-amber-500" /></h3>
                    <p className="text-slate-400">Our GPT-4o-mini powered engine filters out noise and classifies genuine buying signals with 98% accuracy.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-amber-500 font-bold text-xl border border-slate-700">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">CRM Injection <Database className="w-5 h-5 text-amber-500" /></h3>
                    <p className="text-slate-400">Signals are automatically synced to HubSpot or Salesforce as actionable tasks for your SDR team.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full"></div>
              <img 
                src="/__mockup/images/dashboard-mockup-social-proof.png" 
                alt="OCTOPILOT Dashboard" 
                className="relative z-10 rounded-xl border border-slate-700 shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-slate-900 border border-slate-700 p-4 rounded-xl shadow-xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-slate-400 font-medium">New Signal Detected</p>
                  <p className="text-white font-bold">"Looking for alternative to..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent Pricing.</h2>
            <p className="text-xl text-slate-400">Start for free. Scale when you see results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Pro Tier */}
            <Card className="bg-slate-900 border-slate-800 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                <CardDescription className="text-slate-400">For small teams starting out.</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  $299
                  <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Up to 1,000 signals/mo</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Reddit & Hacker News tracking</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Basic AI classification</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>1 User</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-white">
                  <a href="/signup">Start Free Trial</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Growth Tier */}
            <Card className="bg-slate-900 border-amber-500 relative flex flex-col transform md:-translate-y-4 shadow-2xl shadow-amber-500/10">
              <div className="absolute top-0 inset-x-0 h-1 bg-amber-500"></div>
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-amber-400">Growth</CardTitle>
                <CardDescription className="text-slate-400">For scaling revenue teams.</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold text-white">
                  $599
                  <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Up to 5,000 signals/mo</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Advanced GPT-4o-mini classification</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>HubSpot Integration</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>5 Users</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold">
                  <a href="/signup">Start Free Trial</a>
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Tier */}
            <Card className="bg-slate-900 border-slate-800 flex flex-col">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Enterprise</CardTitle>
                <CardDescription className="text-slate-400">For large organizations.</CardDescription>
                <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                  $1200
                  <span className="ml-1 text-xl font-medium text-slate-500">/mo</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Unlimited signals</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Custom AI training</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>HubSpot & Salesforce Support</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 flex-shrink-0" />
                    <span>Dedicated CSM</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-slate-700 hover:bg-slate-800 text-white">
                  <a href="/signup">Contact Sales</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-slate-800">
              <AccordionTrigger className="text-lg font-medium hover:text-amber-400">How does OCTOPILOT find buying signals?</AccordionTrigger>
              <AccordionContent className="text-slate-400 text-base leading-relaxed">
                We use advanced web scraping combined with GPT-4o-mini to monitor specific keywords, competitors, and industry terms across Reddit and Hacker News. The AI filters out noise and only flags posts that indicate genuine buying intent or frustration with competitors.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-slate-800">
              <AccordionTrigger className="text-lg font-medium hover:text-amber-400">Does OCTOPILOT post anything on my behalf?</AccordionTrigger>
              <AccordionContent className="text-slate-400 text-base leading-relaxed">
                No. OCTOPILOT uses a Zero-Write Architecture. We only read data. We never post, comment, or interact on social platforms on your behalf. We simply deliver the insights to your CRM for your team to handle outreach manually and authentically.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-slate-800">
              <AccordionTrigger className="text-lg font-medium hover:text-amber-400">Which CRMs do you support?</AccordionTrigger>
              <AccordionContent className="text-slate-400 text-base leading-relaxed">
                We currently offer deep, native integration with HubSpot. Salesforce integration is in active development and will be released soon. You can also access all signals directly via our web application or export them via CSV.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-slate-800">
              <AccordionTrigger className="text-lg font-medium hover:text-amber-400">Can I try before paying?</AccordionTrigger>
              <AccordionContent className="text-slate-400 text-base leading-relaxed">
                Yes! We offer a full-featured 14-day free trial. No credit card is required to sign up. You'll get immediate access to the platform and can start seeing live signals within minutes of setting up your trackers.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-amber-500"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-slate-950">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6">Ready to accelerate your pipeline?</h2>
          <p className="text-xl font-medium text-slate-900/80 mb-10">
            Join the top revenue teams using OCTOPILOT to close deals faster.
          </p>
          <Button asChild size="lg" className="bg-slate-950 hover:bg-slate-900 text-white rounded-full px-10 h-16 text-xl font-bold shadow-xl">
            <a href="/signup">Start Your Free Trial <ArrowRight className="ml-2 w-6 h-6" /></a>
          </Button>
          <p className="mt-6 text-sm font-medium text-slate-900/70">14-day free trial. Setup in 2 minutes.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <div className="w-6 h-6 rounded-md bg-amber-500 flex items-center justify-center text-slate-950 font-bold text-sm">
              O
            </div>
            <span className="font-bold text-lg tracking-tight text-white">OCTOPILOT</span>
          </div>
          <div className="flex gap-8 text-sm text-slate-400">
            <a href="#" className="hover:text-amber-400">Terms</a>
            <a href="#" className="hover:text-amber-400">Privacy</a>
            <a href="#" className="hover:text-amber-400">Contact</a>
            <a href="#" className="hover:text-amber-400">Twitter</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 text-center md:text-left text-sm text-slate-600">
          &copy; {new Date().getFullYear()} OCTOPILOT Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
