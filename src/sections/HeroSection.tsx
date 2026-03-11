"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedDashboard from "@/components/AnimatedDashboard";

const platforms = ["Reddit", "Hacker News"];

const HeroSection = () => {
  const router = useRouter();
  const [platformIndex, setPlatformIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformIndex((prev) => (prev + 1) % platforms.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/refined-b-hero-bg.png"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F2A1D]/90 to-[#0F2A1D]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#6B8F71]/8 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6B8F71]/10 border border-[#6B8F71]/25 text-[#6B8F71] text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Now monitoring 50M+ tech conversations daily</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1] text-[#EAF0E2]"
        >
          Find People Looking For
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6B8F71] to-[#7DA383]">What You Offer</span>{" "}
          on{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={platformIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#6B8F71] to-[#7DA383]"
            >
              {platforms[platformIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-[#A3B18A] max-w-2xl mx-auto mb-10"
        >
          Stop missing high-intent conversations. OCTOPILOT monitors social channels
          for buying signals and auto-injects hot leads directly into your CRM.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="h-12 px-8 bg-[#6B8F71] hover:bg-[#7DA383] text-[#0F2A1D] font-bold rounded-full w-full sm:w-auto text-base transition-all shadow-[0_0_30px_-5px_rgba(107,143,113,0.4)] hover:shadow-[0_0_40px_-5px_rgba(107,143,113,0.6)]"
            onClick={() => router.push('/signup')}
            data-testid="hero-cta-button"
          >
            Start Free Trial <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 border-[#2D5A3D] hover:bg-[#2D5A3D]/30 font-semibold rounded-full w-full sm:w-auto text-base backdrop-blur-sm text-[#EAF0E2]"
          >
            Book a Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-2xl border border-[#2D5A3D] bg-[#132A1E] shadow-2xl shadow-[#6B8F71]/10 overflow-hidden h-[420px]">
            <div className="h-10 bg-[#0F2A1D] border-b border-[#2D5A3D] flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-[#6B8F71]/80" />
              </div>
            </div>
            <div className="relative h-[calc(420px-40px)]">
              <AnimatedDashboard />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0F2A1D] to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
