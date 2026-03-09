import { BookUser } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CRMPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">CRM</h1>
        <p className="text-muted-foreground">Manage contacts and companies</p>
      </div>
      <Tabs defaultValue="contacts">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
        </TabsList>
        <TabsContent value="contacts">
          <Card>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <BookUser className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">No contacts yet.</p>
                <p className="text-xs mt-1">Import contacts or let signals populate them automatically.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="companies">
          <Card>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <BookUser className="w-10 h-10 mb-3 opacity-30" />
                <p className="text-sm">No companies yet.</p>
                <p className="text-xs mt-1">Companies are created when contacts are enriched.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
