"use client";

import { useState } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How does OCTOPILOT find intent?",
    answer: "Our AI agents continuously monitor relevant subreddits, HN discussions, and social feeds for specific keywords and buying patterns related to your product.",
  },
  {
    question: "Which CRMs do you integrate with?",
    answer: "We currently support direct integrations with Salesforce and HubSpot. You can also export data via CSV or connect via our API.",
  },
  {
    question: "Is this compliant with platform terms?",
    answer: "Yes, we only access public data through official APIs and standard web crawling practices that respect robots.txt.",
  },
  {
    question: "How long does setup take?",
    answer: "You can be up and running in less than 5 minutes. Just enter your target keywords, connect your CRM, and signals will start flowing immediately.",
  },
  {
    question: "Can I try it before buying?",
    answer: "Yes, all plans come with a 14-day free trial so you can evaluate the quality of leads before committing.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 border-t border-[#2D5A3D]">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-[#EAF0E2]">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border border-[#2D5A3D] rounded-xl overflow-hidden transition-colors ${openIndex === i ? "bg-[#132A1E]" : "bg-transparent hover:bg-[#132A1E]/30"}`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                data-testid={`faq-toggle-${i}`}
              >
                <span className="font-medium text-lg text-[#EAF0E2]">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#A3B18A] transition-transform ${openIndex === i ? "rotate-180 text-[#6B8F71]" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-[#A3B18A] leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
