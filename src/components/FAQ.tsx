"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQS = [
  {
    question: 'How does OCTOPILOT find buying signals?',
    answer:
      "OCTOPILOT monitors public communities like Reddit and Hacker News in real-time using your defined keywords, competitors, and subreddits. When a post matches, our AI classifier analyzes the intent and confidence before surfacing it to your team.",
  },
  {
    question: 'Does OCTOPILOT post anything on my behalf?',
    answer:
      "Never. OCTOPILOT operates on a strict Zero-Write Architecture. We only read public data and surface signals to your sales team. We never interact with, post to, or engage on any platform on your behalf.",
  },
  {
    question: 'How accurate are the AI intent classifications?',
    answer:
      "Our classifier uses GPT-4o-mini with structured prompts optimized for B2B buying signals. In internal testing, we achieve 87% precision on high-intent signals. You can also set a minimum confidence threshold to only see the signals you trust.",
  },
  {
    question: 'Which CRMs do you support?',
    answer:
      "Currently we support HubSpot with full OAuth integration — signals are injected as tasks with AI-generated openers. Salesforce support is coming Q2 2026, followed by Pipedrive and custom webhook support.",
  },
  {
    question: 'Can I try OCTOPILOT before paying?',
    answer:
      "Yes. Every plan includes a 14-day free trial with no credit card required. You get access to all features of your selected plan. We'll remind you before the trial ends.",
  },
];

export default function FAQ() {
  return (
    <section className="py-24 px-6 bg-black/20">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Frequently asked questions
          </h2>
          <p className="text-zinc-400 text-lg">
            Everything you need to know before you start.
          </p>
        </div>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-white/10 rounded-lg px-5 bg-white/5 backdrop-blur-sm"
              data-testid={`faq-item-${i}`}
            >
              <AccordionTrigger className="text-white text-left py-4 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 text-sm leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
