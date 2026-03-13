"use client";

import { motion } from "motion/react";
import { MessageCircle, TrendingUp, Brain, Link2, Bell, Linkedin } from "lucide-react";

const features = [
  {
    title: "Reddit Monitoring",
    desc: "Track thousands of subreddits for buying signals 24/7",
    icon: MessageCircle,
    comingSoon: false,
  },
  {
    title: "Hacker News Intelligence",
    desc: "Catch technical buyers when they're actively evaluating",
    icon: TrendingUp,
    comingSoon: false,
  },
  {
    title: "AI Signal Classifier",
    desc: "GPT-4o-mini rates each signal by intent and confidence",
    icon: Brain,
    comingSoon: false,
  },
  {
    title: "HubSpot Injection",
    desc: "One-click: turn a signal into a HubSpot task instantly",
    icon: Link2,
    comingSoon: false,
  },
  {
    title: "Team Alerts",
    desc: "Email and Slack notifications for high-intent signals",
    icon: Bell,
    comingSoon: false,
  },
  {
    title: "LinkedIn Monitor",
    desc: "Track LinkedIn for buying signals and engage faster",
    icon: Linkedin,
    comingSoon: true,
  },
];

const Features = () => {
  return (
    <section
      id="features"
      className="py-24 md:py-32 relative"
      style={{ background: "#0A0A0A" }}
    >
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "#00C96A" }}
          >
            FEATURES
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-5"
            style={{ color: "#F0F0F0" }}
          >
            Everything your SDR team needs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ color: "#A0A0A0" }}
            className="text-lg"
          >
            Operationalize social selling at scale with our complete toolkit.
          </motion.p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative p-7 rounded-[16px] transition-all duration-200 ${
                feature.comingSoon ? "opacity-50" : ""
              }`}
              style={{
                background: "#111111",
                border: "1px solid #2A2A2A",
              }}
              onMouseEnter={(e) => {
                if (!feature.comingSoon) {
                  e.currentTarget.style.borderColor = "rgba(0, 201, 106, 0.3)";
                  e.currentTarget.style.boxShadow = "0 0 24px rgba(0,201,106,0.15)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#2A2A2A";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {feature.comingSoon && (
                <span
                  className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-medium"
                  style={{
                    background: "#1F1F1F",
                    color: "#606060",
                    border: "1px solid #2A2A2A",
                  }}
                >
                  Coming Soon
                </span>
              )}
              <div
                className="w-10 h-10 rounded-[6px] flex items-center justify-center mb-4"
                style={{
                  background: "rgba(0, 201, 106, 0.12)",
                }}
              >
                <feature.icon className="w-5 h-5" style={{ color: "#00C96A" }} />
              </div>
              <h3
                className="text-base font-semibold mb-2"
                style={{ color: "#F0F0F0" }}
              >
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
