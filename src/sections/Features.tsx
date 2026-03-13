"use client";

import { motion } from "motion/react";
import { BarChart3, MessageSquare, Check } from "lucide-react";

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 md:py-32 relative border-t border-border bg-secondary/30"
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium tracking-wide uppercase mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-5 text-foreground text-balance"
          >
            Built for revenue teams
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            Everything you need to operationalize social selling at scale.
          </motion.p>
        </div>

        {/* Feature Blocks */}
        <div className="space-y-24 lg:space-y-32">
          {/* Feature 1: Intent Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Intent Analytics</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-5 text-foreground">
                Measure the pulse of your market
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Track topic velocity, sentiment trends, and share of voice
                against competitors. Identify macro shifts before they show up
                in search volume.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time volume tracking by keyword",
                  "Sentiment analysis on brand mentions",
                  "Competitor mention comparisons",
                  "Exportable reports for leadership",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl border border-border bg-card p-2 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent z-0" />
                <img
                  src="/refined-b-feature-analytics.png"
                  alt="Signal Analytics Dashboard"
                  className="rounded-xl relative z-10 w-full"
                />
              </div>
            </div>
          </motion.div>

          {/* Feature 2: AI Openers */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          >
            <div>
              <div className="relative rounded-2xl border border-border bg-card p-2 shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />
                <img
                  src="/refined-b-feature-ai.png"
                  alt="AI-Generated Openers"
                  className="rounded-xl relative z-10 w-full"
                />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>AI Openers</span>
              </div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-5 text-foreground">
                Contextual outreach at scale
              </h3>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Our LLMs generate highly contextual, non-salesy opening messages
                based on the exact thread the prospect posted.
              </p>
              <ul className="space-y-4">
                {[
                  "Thread-aware context generation",
                  "Adjustable tone (helpful, direct, casual)",
                  "One-click copy to clipboard",
                  "Automatic CRM logging",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-foreground"
                  >
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/50 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary/50"></span>
            </span>
            Coming soon: X (Twitter), LinkedIn monitoring & Competitor
            intelligence
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
