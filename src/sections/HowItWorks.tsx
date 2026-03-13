"use client";

import { motion } from "motion/react";
import { Radar, BrainCircuit, Database } from "lucide-react";

const steps = [
  {
    icon: Radar,
    step: "01",
    title: "Define Trackers",
    desc: "Set up keywords, competitor names, or topics. We monitor millions of posts in real-time across Reddit and Hacker News.",
  },
  {
    icon: BrainCircuit,
    step: "02",
    title: "AI Analysis",
    desc: "Our models score each mention for buying intent, filtering out noise, complaints, and irrelevant discussions.",
  },
  {
    icon: Database,
    step: "03",
    title: "CRM Sync",
    desc: "High-intent signals are automatically injected into HubSpot or Salesforce for your SDRs to action.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative z-10" style={{ background: '#0A0A0A' }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: '#00C96A' }}
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mb-5 text-balance"
            style={{ color: '#F0F0F0' }}
          >
            Convert noise into pipeline
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg"
            style={{ color: '#A0A0A0' }}
          >
            Set up your intent signals in minutes and let our AI agents identify
            your next customers.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative"
            >
              <div 
                className="h-full rounded-[16px] p-8 transition-all duration-200"
                style={{ background: '#111111', border: '1px solid #2A2A2A' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(0, 201, 106, 0.3)';
                  e.currentTarget.style.boxShadow = '0 0 24px rgba(0,201,106,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2A2A2A';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Step Number */}
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className="w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300"
                    style={{ background: 'rgba(0, 201, 106, 0.12)' }}
                  >
                    <step.icon className="w-6 h-6" style={{ color: '#00C96A' }} />
                  </div>
                  <span 
                    className="text-4xl font-bold transition-colors duration-300"
                    style={{ color: '#2A2A2A' }}
                  >
                    {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3" style={{ color: '#F0F0F0' }}>
                  {step.title}
                </h3>
                <p className="leading-relaxed" style={{ color: '#A0A0A0' }}>
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
