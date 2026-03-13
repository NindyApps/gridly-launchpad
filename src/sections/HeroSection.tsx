"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
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
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Gradient glow background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#00C96A]/[0.12] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#7C3AED]/[0.10] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
            style={{
              border: "1px solid rgba(0, 201, 106, 0.3)",
              background: "rgba(0, 201, 106, 0.08)",
              color: "#00C96A",
            }}
          >
            <span>🚀</span>
            <span>Now in beta — Join 50+ early adopters</span>
          </div>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-[clamp(40px,6vw,72px)] font-bold tracking-[-0.03em] leading-[1.1] mb-6 max-w-5xl mx-auto"
          style={{ color: "#F0F0F0" }}
        >
          Find buyers{" "}
          <span className="gradient-text">before they find</span>
          <br className="hidden sm:block" />
          your competitors on{" "}
          <AnimatePresence mode="wait">
            <motion.span
              key={platformIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
              style={{ color: "#00C96A" }}
            >
              {platforms[platformIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg max-w-[520px] mx-auto mb-10 leading-relaxed"
          style={{ color: "#A0A0A0" }}
        >
          OCTOPILOT monitors Reddit and Hacker News for buying signals — so your SDR team reaches out first.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
        >
          <Button
            size="lg"
            className="h-12 px-7 gradient-primary text-white font-semibold rounded-[10px] w-full sm:w-auto text-base shadow-glow transition-all hover:scale-[1.02]"
            onClick={() => router.push("/signup")}
            data-testid="hero-cta-button"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-7 border-[#2A2A2A] hover:border-[#00C96A] hover:text-[#00C96A] hover:bg-[rgba(0,201,106,0.08)] font-medium rounded-[10px] w-full sm:w-auto text-base text-[#A0A0A0] bg-transparent transition-all"
          >
            See how it works
          </Button>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <p className="text-sm text-[#606060] mb-3">Trusted by sales teams at —</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {["Acme Corp", "Stark Industries", "Dunder Mifflin", "Initech"].map((company) => (
              <span
                key={company}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "#1A1A1A",
                  color: "#606060",
                  border: "1px solid #2A2A2A",
                }}
              >
                {company}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Browser Chrome */}
          <div
            className="relative rounded-[16px] overflow-hidden"
            style={{
              border: "1px solid #2A2A2A",
              background: "#111111",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
            }}
          >
            {/* Title Bar */}
            <div
              className="h-11 flex items-center px-4 gap-2"
              style={{
                background: "#1A1A1A",
                borderBottom: "1px solid #2A2A2A",
              }}
            >
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F87171]/60" />
                <div className="w-3 h-3 rounded-full bg-[#FBBF24]/60" />
                <div className="w-3 h-3 rounded-full bg-[#4ADE80]/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div
                  className="px-4 py-1 rounded-md text-xs"
                  style={{ background: "#0A0A0A", color: "#606060" }}
                >
                  app.octopilot.co
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="relative h-[400px] md:h-[440px]">
              <AnimatedDashboard />
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, #0A0A0A, transparent)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
