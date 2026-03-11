import type { Metadata } from 'next';
import Navbar from "@/sections/Navbar";
import HeroSection from "@/sections/HeroSection";
import HowItWorks from "@/sections/HowItWorks";
import Features from "@/sections/Features";
import Testimonials from "@/sections/Testimonials";
import Pricing from "@/sections/Pricing";
import FAQ from "@/sections/FAQ";
import CTASection from "@/sections/CTASection";
import Footer from "@/sections/Footer";

export const metadata: Metadata = {
  title: 'OCTOPILOT — Find B2B Buyers The Moment They Say They Need You',
  description:
    'OCTOPILOT monitors Reddit, Hacker News, and more in real-time to surface high-intent B2B buying signals and auto-inject them into your CRM.',
  openGraph: {
    title: 'OCTOPILOT — Revenue Signal Intelligence',
    description: 'AI-powered buying signal detection for B2B sales teams.',
    type: 'website',
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0d0f] text-zinc-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}
