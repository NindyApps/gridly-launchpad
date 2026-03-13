"use client";

import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "It's like having a team of 10 SDRs reading every relevant conversation on the internet. Our meeting booked rate jumped 40%.",
    author: "Sarah Chen",
    role: "VP Sales, CloudScale",
    avatar: "SC",
  },
  {
    quote:
      "The CRM injection is flawless. We don't have to train reps on a new tool - the leads just show up in Salesforce with context.",
    author: "Marcus Rivera",
    role: "RevOps Director, Nexus",
    avatar: "MR",
  },
  {
    quote:
      "We were missing so many buying signals on Reddit. OCTOPILOT surfaced 3 enterprise deals for us in the first month.",
    author: "Priya Nambiar",
    role: "Founding AE, DataStack",
    avatar: "PN",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 md:py-32 border-t border-border relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary text-sm font-medium tracking-wide uppercase mb-4"
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground text-balance"
          >
            Trusted by fast-growing teams
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="h-full bg-card border border-border rounded-2xl p-8 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 flex flex-col">
                {/* Quote Icon */}
                <div className="text-primary/30 mb-6">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Quote */}
                <p className="text-foreground text-lg leading-relaxed mb-8 flex-1">
                  {t.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className="w-11 h-11 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {t.author}
                    </div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
