"use client";

const StatsMarquee = () => {
  const items = [
    { logo: "/reddit-logo.png", label: "Reddit", stat: "100K+ posts/day" },
    { text: "Y", label: "Hacker News", stat: "10K+ posts/day" },
  ];

  const doubled = [...items, ...items, ...items, ...items];

  return (
    <section className="py-16 bg-primary overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
          Scan Thousands of Posts Daily
        </h2>
        <p className="mt-2 text-primary-foreground/60 text-sm">
          100K+ Reddit posts • 10K+ Hacker News posts — monitored every day
        </p>
      </div>

      <div className="relative">
        <div className="flex animate-scroll-left w-max">
          {doubled.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 mx-4 bg-primary-foreground/10 backdrop-blur-sm rounded-full px-5 py-2.5 border border-primary-foreground/15"
            >
              {item.logo ? (
                <img src={item.logo} alt={item.label} className="w-5 h-5 object-contain" />
              ) : (
                <span className="flex h-5 w-5 items-center justify-center rounded bg-orange-500 text-xs font-bold text-white">{item.text}</span>
              )}
              <span className="font-medium text-primary-foreground text-sm">{item.label}</span>
              <span className="text-primary-foreground/60 text-xs">{item.stat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsMarquee;
