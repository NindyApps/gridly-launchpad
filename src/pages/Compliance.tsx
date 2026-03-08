import { Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Compliance = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-display font-bold text-foreground">Compliance</h1>
      <p className="text-muted-foreground">Audit logs and data governance</p>
    </div>
    <Card>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
          <Shield className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm">No audit events yet.</p>
          <p className="text-xs mt-1">Activity will be logged here as your team uses the platform.</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default Compliance;
