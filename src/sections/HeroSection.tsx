"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";



const platforms = [
  { name: "LinkedIn", logo: "/linkedin-logo.png" },
  { name: "Reddit", logo: "/reddit-logo.png" },
  { name: "𝕏", logo: null },
];

const r = (n: number, d = 4) => Math.round(n * 10 ** d) / 10 ** d;
const DOT_DATA = Array.from({ length: 30 }, (_, i) => ({
  width: r(2 + Math.abs(Math.sin(i * 2.3)) * 8),
  height: r(2 + Math.abs(Math.cos(i * 1.7)) * 8),
  left: r(25 + Math.abs(Math.sin(i * 3.1)) * 50),
  top: r(30 + Math.abs(Math.cos(i * 2.7)) * 30),
  opacity: r(0.2 + Math.abs(Math.sin(i * 1.9)) * 0.5),
  animationDelay: r(Math.abs(Math.sin(i * 4.1)) * 4),
  animationDuration: r(2 + Math.abs(Math.cos(i * 5.3)) * 3),
}));

const FloatingDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {DOT_DATA.map((dot, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-pulse-dot"
        style={{
          width: `${dot.width}px`,
          height: `${dot.height}px`,
          left: `${dot.left}%`,
          top: `${dot.top}%`,
          backgroundColor: i % 3 === 0
            ? "hsl(var(--accent))"
            : i % 3 === 1
              ? "hsl(var(--muted-foreground))"
              : "hsl(var(--foreground) / 0.3)",
          opacity: dot.opacity,
          animationDelay: `${dot.animationDelay}s`,
          animationDuration: `${dot.animationDuration}s`,
        }}
      />
    ))}
  </div>
);

const HeroSection = () => {
  const [platformIndex, setPlatformIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformIndex((prev) => (prev + 1) % platforms.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentPlatform = platforms[platformIndex];

  return (
    <section className="relative grid-bg pt-16 overflow-hidden">
      <FloatingDots />

      {/* Gradient glow under text */}
      <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[80px] bg-accent/15 rounded-full blur-[60px]" />

      <div className="container mx-auto px-4 pt-24 pb-8 relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold tracking-tight text-foreground leading-[1.1]"
        >
          Find People Looking For
          <br />
          <span className="text-gradient">What You Offer</span>{" "}
          <span className="text-foreground">on </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={platformIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center"
            >
              {currentPlatform.logo ? (
                <img
                  src={currentPlatform.logo}
                  alt={currentPlatform.name}
                  className="inline h-12 md:h-16 object-contain"
                />
              ) : (
                <span className="font-display text-foreground">{currentPlatform.name}</span>
              )}
            </motion.span>
          </AnimatePresence>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-8 text-base md:text-lg text-muted-foreground"
        >
          Find users urgently searching to buy your product now.
        </motion.p>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-8 max-w-md mx-auto bg-card/80 backdrop-blur-sm rounded-2xl border border-border p-6 md:p-8"
          style={{ boxShadow: "var(--shadow-card)" }}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5 text-center">Your Product</label>
              <div className="relative">
                <Input
                  placeholder="e.g., AI project management software"
                  className="pr-10 rounded-full bg-secondary/50 border-border text-sm h-10"
                />
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-1.5 text-center">Target Customer</label>
              <div className="relative">
                <Input
                  placeholder="e.g., Project managers"
                  className="pr-10 rounded-full bg-secondary/50 border-border text-sm h-10"
                />
                <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-11 text-sm font-semibold gap-2">
              <Sparkles className="w-4 h-4" />
              Watch the Magic
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
