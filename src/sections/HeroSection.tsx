"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Play } from "lucide-react";
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
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px] pointer-events-none" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Social Proof Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-primary font-medium">Live</span>
            </span>
            <span className="w-px h-4 bg-border" />
            <span className="text-muted-foreground">
              Monitoring 50M+ conversations daily
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1]"
        >
          <span className="text-foreground">Find buyers</span>{" "}
          <span className="text-primary">the moment</span>
          <br className="hidden sm:block" />
          <span className="text-foreground">they need you on </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={platformIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block text-primary"
            >
              {platforms[platformIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Stop missing high-intent conversations. OCTOPILOT monitors social
          channels for buying signals and auto-injects leads into your CRM.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <Button
            size="lg"
            className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full w-full sm:w-auto text-base shadow-lg shadow-primary/20 transition-all hover:shadow-xl hover:shadow-primary/30"
            onClick={() => router.push("/signup")}
            data-testid="hero-cta-button"
          >
            Start Free Trial
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 px-8 border-border hover:bg-secondary/50 font-medium rounded-full w-full sm:w-auto text-base text-foreground"
          >
            <Play className="w-4 h-4 mr-2" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Trust Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-sm text-muted-foreground/70 mb-16"
        >
          No credit card required. 14-day free trial.
        </motion.p>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-primary/10 rounded-3xl blur-2xl opacity-50 animate-subtle-glow" />

          {/* Browser Chrome */}
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl">
            {/* Title Bar */}
            <div className="h-11 bg-secondary/50 border-b border-border flex items-center px-4 gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-background/50 text-xs text-muted-foreground">
                  app.octopilot.co
                </div>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="relative h-[400px] md:h-[440px]">
              <AnimatedDashboard />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
