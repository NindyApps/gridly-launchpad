import { Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Signals = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground">Signals</h1>
      <p className="text-muted-foreground">Monitor buying signals across channels</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {[
        { label: "Active Signals", value: "0" },
        { label: "New Today", value: "0" },
        { label: "High Intent", value: "0" },
        { label: "Converted", value: "0" },
      ].map((s) => (
        <Card key={s.label}>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-display font-bold text-foreground mt-1">{s.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Signals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Zap className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm">No signals detected yet.</p>
          <p className="text-xs mt-1">Connect a data source in Settings to start capturing signals.</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Signals;
