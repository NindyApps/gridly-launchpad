import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Check, ArrowLeft, ArrowRight, Radio, Target, Link2, Users, Plus, X } from "lucide-react";

const STEPS = [
  { label: "Data Source", icon: Radio },
  { label: "Define ICP", icon: Target },
  { label: "Connect CRM", icon: Link2 },
  { label: "Invite Team", icon: Users },
];

const DATA_SOURCES = [
  { id: "linkedin", name: "LinkedIn", desc: "Monitor posts, comments & job changes" },
  { id: "twitter", name: "X / Twitter", desc: "Track mentions, hashtags & threads" },
  { id: "reddit", name: "Reddit", desc: "Listen to subreddits & discussions" },
  { id: "g2", name: "G2 Reviews", desc: "Competitor & category reviews" },
];

const CRM_OPTIONS = [
  { id: "hubspot", name: "HubSpot" },
  { id: "salesforce", name: "Salesforce" },
  { id: "pipedrive", name: "Pipedrive" },
  { id: "none", name: "Skip for now" },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  // Step 0: data sources
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  // Step 1: ICP
  const [icpTitle, setIcpTitle] = useState("");
  const [icpIndustry, setIcpIndustry] = useState("");
  const [icpCompanySize, setIcpCompanySize] = useState("");

  // Step 2: CRM
  const [selectedCrm, setSelectedCrm] = useState("none");

  // Step 3: invite
  const [emails, setEmails] = useState<string[]>([""]);

  const toggleSource = (id: string) => {
    setSelectedSources((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    toast.success("Onboarding complete! Welcome to Octopilot.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl space-y-8">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-accent-foreground">
              <circle cx="12" cy="10" r="4" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
              <path d="M6 16C6 16 4 14 4 12C4 8 8 4 12 4C16 4 20 8 20 12C20 14 18 16 18 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M8 18L6 22M16 18L18 22M10 19L9 22M14 19L15 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-display font-bold text-xl text-foreground">OCTOPILOT</span>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-1">
          {STEPS.map((s, i) => (
            <div key={i} className="flex items-center gap-1">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  i < step
                    ? "bg-accent text-accent-foreground"
                    : i === step
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {i < step ? <Check className="w-3 h-3" /> : <s.icon className="w-3 h-3" />}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`w-6 h-0.5 ${i < step ? "bg-accent" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step 0: Connect Data Sources */}
        {step === 0 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Connect your data sources</h2>
              <p className="text-muted-foreground mt-1">Select platforms to monitor for buying signals</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DATA_SOURCES.map((src) => (
                <button
                  key={src.id}
                  onClick={() => toggleSource(src.id)}
                  className={`text-left p-4 rounded-lg border-2 transition-colors ${
                    selectedSources.includes(src.id)
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <h3 className="font-semibold text-foreground">{src.name}</h3>
                  <p className="text-sm text-muted-foreground">{src.desc}</p>
                </button>
              ))}
            </div>
            <Button className="w-full" onClick={() => setStep(1)} disabled={selectedSources.length === 0}>
              Continue <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 1: Define ICP */}
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Define your Ideal Customer Profile</h2>
              <p className="text-muted-foreground mt-1">Help us surface the right signals for you</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Target Job Title</Label>
                <Input placeholder="e.g. VP of Marketing, CTO" value={icpTitle} onChange={(e) => setIcpTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input placeholder="e.g. SaaS, FinTech, Healthcare" value={icpIndustry} onChange={(e) => setIcpIndustry(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Company Size</Label>
                <Input placeholder="e.g. 50-200, 500+" value={icpCompanySize} onChange={(e) => setIcpCompanySize(e.target.value)} />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              <Button className="flex-1" onClick={() => setStep(2)}>Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>
        )}

        {/* Step 2: Connect CRM */}
        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Connect your CRM</h2>
              <p className="text-muted-foreground mt-1">Sync leads and pipeline data automatically</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {CRM_OPTIONS.map((crm) => (
                <button
                  key={crm.id}
                  onClick={() => setSelectedCrm(crm.id)}
                  className={`p-4 rounded-lg border-2 transition-colors text-center ${
                    selectedCrm === crm.id
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <span className="font-semibold text-foreground">{crm.name}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              <Button className="flex-1" onClick={() => setStep(3)}>Continue <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </div>
          </div>
        )}

        {/* Step 3: Invite Team */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground">Invite your team</h2>
              <p className="text-muted-foreground mt-1">Collaborate on signals and outreach</p>
            </div>
            <div className="space-y-3">
              {emails.map((email, i) => (
                <div key={i} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="teammate@company.com"
                    value={email}
                    onChange={(e) => {
                      const newEmails = [...emails];
                      newEmails[i] = e.target.value;
                      setEmails(newEmails);
                    }}
                  />
                  {emails.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => setEmails(emails.filter((_, j) => j !== i))}>
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={() => setEmails([...emails, ""])}>
                <Plus className="w-4 h-4 mr-2" /> Add another
              </Button>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(2)}><ArrowLeft className="w-4 h-4 mr-2" /> Back</Button>
              <Button className="flex-1" onClick={handleFinish}>
                Finish Setup <Check className="w-4 h-4 ml-2" />
              </Button>
            </div>
            <button onClick={handleFinish} className="w-full text-center text-sm text-muted-foreground hover:text-foreground">
              Skip for now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
