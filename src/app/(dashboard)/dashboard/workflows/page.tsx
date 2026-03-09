import { Workflow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WorkflowsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Workflows</h1>
        <p className="text-muted-foreground">Automate actions based on signals and pipeline events</p>
      </div>
      <Card>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <Workflow className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">No workflows configured.</p>
            <p className="text-xs mt-1">Create your first automation to streamline outreach.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
