import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your workspace and account preferences</p>
      </div>
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader><CardTitle className="text-lg">Workspace</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Workspace settings will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <Card>
            <CardHeader><CardTitle className="text-lg">Connected Services</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">No integrations connected yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="billing">
          <Card>
            <CardHeader><CardTitle className="text-lg">Billing & Plan</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Billing details will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
