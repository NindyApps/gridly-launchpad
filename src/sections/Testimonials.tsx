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
    <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: '#0A0A0A', borderTop: '1px solid #2A2A2A' }}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'rgba(0, 201, 106, 0.08)' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: '#00C96A' }}
          >
            Testimonials
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold text-balance"
            style={{ color: '#F0F0F0' }}
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
              <div 
                className="h-full rounded-[16px] p-8 transition-all duration-200 flex flex-col"
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
                {/* Quote Icon */}
                <div className="mb-6" style={{ color: 'rgba(0, 201, 106, 0.3)' }}>
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
                <p className="text-lg leading-relaxed mb-8 flex-1" style={{ color: '#F0F0F0' }}>
                  {t.quote}
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid #1F1F1F' }}>
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-semibold"
                    style={{ background: 'rgba(0, 201, 106, 0.12)', border: '1px solid rgba(0, 201, 106, 0.2)', color: '#00C96A' }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: '#F0F0F0' }}>
                      {t.author}
                    </div>
                    <div className="text-sm" style={{ color: '#606060' }}>{t.role}</div>
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
