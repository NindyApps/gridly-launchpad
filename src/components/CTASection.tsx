"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const r = (n: number, d = 4) => Math.round(n * 10 ** d) / 10 ** d;
const CTA_DOTS = Array.from({ length: 25 }, (_, i) => ({
  width: r(2 + Math.abs(Math.sin(i * 2.7)) * 7),
  height: r(2 + Math.abs(Math.cos(i * 1.3)) * 7),
  left: r(15 + Math.abs(Math.sin(i * 3.7)) * 70),
  top: r(20 + Math.abs(Math.cos(i * 2.1)) * 60),
  opacity: r(0.15 + Math.abs(Math.sin(i * 1.5)) * 0.4),
  animationDelay: r(Math.abs(Math.sin(i * 5.1)) * 4),
  animationDuration: r(2 + Math.abs(Math.cos(i * 4.3)) * 3),
}));

const FloatingDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {CTA_DOTS.map((dot, i) => (
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
              : "hsl(var(--foreground) / 0.25)",
          opacity: dot.opacity,
          animationDelay: `${dot.animationDelay}s`,
          animationDuration: `${dot.animationDuration}s`,
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
