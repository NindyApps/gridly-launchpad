"use client";

import { useState } from "react";
import { motion } from "framer-motion";
const SeeItInAction = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Reddit", image: "/reddit-leads-view.png" },
    { label: "LinkedIn", image: "/linkedin-leads-view.png" },
  ];

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

        {/* Tab switcher */}
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map((tab, i) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-border bg-card" style={{ boxShadow: "0 20px 60px -15px hsl(220 40% 13% / 0.12)" }}>
            <img
              src={tabs[activeTab].image}
              alt={`${tabs[activeTab].label} leads view`}
              className="w-full h-auto"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            AI finds relevant leads across Reddit & LinkedIn
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SeeItInAction;
