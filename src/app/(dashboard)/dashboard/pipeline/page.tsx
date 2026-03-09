import { GitBranch } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stages = ["Prospect", "Qualified", "Proposal", "Negotiation", "Closed"];

export default function PipelinePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Pipeline</h1>
        <p className="text-muted-foreground">Track deals through your sales pipeline</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {stages.map((stage) => (
          <Card key={stage}>
            <CardContent className="pt-5 pb-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{stage}</p>
              <p className="text-2xl font-display font-bold text-foreground mt-1">0</p>
              <p className="text-xs text-muted-foreground">$0</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Deals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <GitBranch className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">No deals in your pipeline yet.</p>
            <p className="text-xs mt-1">Signals that convert will appear here automatically.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
