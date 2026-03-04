import redditLogo from "@/assets/reddit-logo.png";
import linkedinLogo from "@/assets/linkedin-logo.png";

const StatsMarquee = () => {
  const items = [
    { logo: redditLogo, label: "Reddit", stat: "100K+ posts/day" },
    { logo: linkedinLogo, label: "LinkedIn", stat: "2M+ posts/day" },
    { text: "𝕏", label: "X", stat: "500M+ posts/day" },
  ];

  const doubled = [...items, ...items, ...items, ...items];

  return (
    <section className="py-16 bg-primary overflow-hidden">
      <div className="text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-primary-foreground">
          Scan Millions of Posts Daily
        </h2>
        <p className="mt-2 text-primary-foreground/60 text-sm">
          2M+ LinkedIn posts • 500M+ X posts • 100K+ Reddit posts — every day
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
                <span className="text-lg text-primary-foreground font-bold">{item.text}</span>
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
