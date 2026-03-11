"use client";

import { motion } from 'motion/react';
import { BarChart3, MessageSquare, Check, Sparkles } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-24 relative border-t border-[#2D5A3D] bg-[#132A1E]/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-[#EAF0E2]">
            Built for revenue teams
          </h2>
          <p className="text-[#A3B18A] text-lg">
            Everything you need to operationalize social selling at scale.
          </p>
        </div>

        <div className="space-y-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 md:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B8F71]/10 border border-[#6B8F71]/25 text-[#6B8F71] text-xs font-medium mb-6">
                <BarChart3 className="w-3 h-3" />
                <span>Intent Analytics</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-[#EAF0E2]">
                Measure the pulse of your market
              </h3>
              <p className="text-[#A3B18A] text-lg mb-8 leading-relaxed">
                Track topic velocity, sentiment trends, and share of voice against competitors.
                Identify macro shifts before they show up in search volume.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time volume tracking by keyword",
                  "Sentiment analysis on brand mentions",
                  "Competitor mention comparisons",
                  "Exportable reports for leadership",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#EAF0E2]">
                    <div className="w-5 h-5 rounded-full bg-[#6B8F71]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#6B8F71]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-1 md:order-2 relative rounded-2xl border border-[#2D5A3D] bg-[#0F2A1D] p-2 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6B8F71]/5 to-transparent z-0" />
              <img
                src="/refined-b-feature-analytics.png"
                alt="Signal Analytics Dashboard"
                className="rounded-xl relative z-10 w-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="relative rounded-2xl border border-[#2D5A3D] bg-[#0F2A1D] p-2 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#6B8F71]/5 to-transparent z-0" />
              <img
                src="/refined-b-feature-ai.png"
                alt="AI-Generated Openers"
                className="rounded-xl relative z-10 w-full"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B8F71]/10 border border-[#6B8F71]/25 text-[#6B8F71] text-xs font-medium mb-6">
                <MessageSquare className="w-3 h-3" />
                <span>AI Openers</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold mb-6 text-[#EAF0E2]">
                Contextual outreach at scale
              </h3>
              <p className="text-[#A3B18A] text-lg mb-8 leading-relaxed">
                Don't send generic templates. Our LLMs generate highly contextual, non-salesy
                opening messages based on the exact thread the prospect posted.
              </p>
              <ul className="space-y-4">
                {[
                  "Thread-aware context generation",
                  "Adjustable tone (helpful, direct, casual)",
                  "One-click copy to clipboard",
                  "Automatic CRM logging",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#EAF0E2]">
                    <div className="w-5 h-5 rounded-full bg-[#6B8F71]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-[#6B8F71]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <div className="mt-24 text-center">
          <p className="text-sm text-[#A3B18A]/70 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" /> Coming soon: X (Twitter), LinkedIn monitoring &amp; Competitor intelligence
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;
