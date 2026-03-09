import type { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

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
    <div className="min-h-screen bg-background">
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
