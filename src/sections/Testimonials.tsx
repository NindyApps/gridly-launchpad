"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const TESTIMONIALS = [
  {
    quote: "OCTOPILOT found us 3 enterprise deals in the first week that we would have completely missed. The AI summaries are scarily accurate.",
    name: "Sarah Chen",
    title: "VP of Sales, Dataloop",
    initials: "SC",
    color: "bg-indigo-600",
  },
  {
    quote: "We replaced our manual Reddit monitoring workflow with OCTOPILOT. What used to take 4 hours a day now happens automatically with better results.",
    name: "Marcus Rivera",
    title: "Head of Growth, Forge Analytics",
    initials: "MR",
    color: "bg-violet-600",
  },
  {
    quote: "The HubSpot integration is seamless. Our SDRs get a task with a ready-to-send opener right in their CRM. Pipeline velocity went up 34%.",
    name: "Priya Nambiar",
    title: "RevOps Lead, Stackmesh",
    initials: "PN",
    color: "bg-pink-600",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-black/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Trusted by revenue teams
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            See how B2B sales teams are closing deals faster with OCTOPILOT signal intelligence.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Card
              key={i}
              className="border border-white/10 bg-white/5 backdrop-blur-sm"
              data-testid={`testimonial-card-${i}`}
            >
              <CardContent className="pt-6 pb-6 space-y-4">
                <p className="text-zinc-300 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className={`${t.color} text-white text-xs font-semibold`}>
                      {t.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-zinc-400">{t.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="text-center text-xs text-zinc-600 mt-8">
          Results may vary. Testimonials represent individual experiences during early access.
        </p>
      </div>
    </section>
  );
}
