"use client";

import { motion } from 'motion/react';

const testimonials = [
  {
    quote: "It's like having a team of 10 SDRs reading every relevant conversation on the internet. Our meeting booked rate jumped 40%.",
    author: "Sarah Chen",
    role: "VP Sales, CloudScale",
    avatar: "SC",
  },
  {
    quote: "The CRM injection is flawless. We don't have to train reps on a new tool—the leads just show up in Salesforce with context.",
    author: "Marcus Rivera",
    role: "RevOps Director, Nexus",
    avatar: "MR",
  },
  {
    quote: "We were missing so many buying signals on Reddit. OCTOPILOT surfaced 3 enterprise deals for us in the first month.",
    author: "Priya Nambiar",
    role: "Founding AE, DataStack",
    avatar: "PN",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
            Trusted by fast-growing teams
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500/50 to-transparent" />
              <div className="text-emerald-400 mb-6 opacity-50">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-zinc-300 mb-8 text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-semibold text-white">{t.author}</div>
                  <div className="text-sm text-zinc-500">{t.role}</div>
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
