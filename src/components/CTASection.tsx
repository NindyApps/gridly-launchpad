"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FloatingDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {Array.from({ length: 25 }).map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-pulse-dot"
        style={{
          width: `${2 + Math.random() * 7}px`,
          height: `${2 + Math.random() * 7}px`,
          left: `${15 + Math.random() * 70}%`,
          top: `${20 + Math.random() * 60}%`,
          backgroundColor: i % 3 === 0
            ? "hsl(var(--accent))"
            : i % 3 === 1
              ? "hsl(var(--muted-foreground))"
              : "hsl(var(--foreground) / 0.25)",
          opacity: 0.15 + Math.random() * 0.4,
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32 grid-bg overflow-hidden">
      <FloatingDots />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight">
            Start Finding <br />
            <span className="text-gradient">Your Next Customers</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg">
            Reach live conversations across the global internet
          </p>
          <div className="mt-10">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-12 px-8 text-base font-semibold gap-2">
              Get Started Free <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
