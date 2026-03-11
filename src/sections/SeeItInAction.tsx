"use client";

import { motion } from 'motion/react';

const SeeItInAction = () => {
  return (
    <section className="py-20 md:py-28 grid-bg">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            See It <span className="text-gradient">In Action</span>
          </h2>
          <p className="mt-3 text-muted-foreground">A sneak peek inside the platform</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-border bg-card" style={{ boxShadow: "0 20px 60px -15px hsl(220 40% 13% / 0.12)" }}>
            <img
              src="/reddit-leads-view.png"
              alt="OCTOPILOT leads view showing AI-classified buying signals"
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            AI finds relevant buying signals across Reddit & Hacker News and classifies them by intent level
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SeeItInAction;
