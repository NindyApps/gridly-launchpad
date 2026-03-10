"use client";

import { motion } from 'motion/react';

const features = [
  {
    label: "Discover leads on",
    title: "X (Twitter)",
    image: "/x-leads-view.png",
  },
  {
    label: "Discover leads on",
    title: "LinkedIn",
    image: "/linkedin-leads-feature.png",
  },
  {
    label: "Monitor Competitors to",
    title: "Steal Leads",
    image: "/competitor-monitor-feature.png",
  },
  {
    label: "Track performance with",
    title: "Analytics",
    image: "/dashboard-view.png",
  },
  {
    label: "Intelligent Targeting &",
    title: "AI Outreach",
    image: "/x-leads-outreach.png",
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="container mx-auto px-4">
        <div className="space-y-16 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 md:gap-12`}
            >
              {/* Text */}
              <div className="md:w-1/3 text-center md:text-left">
                <p className="text-sm font-medium text-muted-foreground mb-1">{feature.label}</p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">{feature.title}</h3>
              </div>

              {/* Image */}
              <div className="md:w-2/3">
                <div className="rounded-2xl overflow-hidden border border-border bg-background" style={{ boxShadow: "var(--shadow-card)" }}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
