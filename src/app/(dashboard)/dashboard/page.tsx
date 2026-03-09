export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your signals and pipeline</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Active Signals", value: "0", change: "+0%" },
          { label: "Pipeline Value", value: "$0", change: "+0%" },
          { label: "Conversion Rate", value: "0%", change: "+0%" },
        ].map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-lg p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-display font-bold text-foreground mt-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.change} from last month</p>
          </div>
        ))}
      </div>
    </div>
  );
}
