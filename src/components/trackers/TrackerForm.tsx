"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import type { CreateTrackerInput } from '@/hooks/useTrackers';

interface TrackerFormProps {
  initial?: Partial<CreateTrackerInput>;
  onSubmit: (data: CreateTrackerInput) => void;
  onCancel?: () => void;
  workspaceId: string;
  isPending?: boolean;
}

export function TrackerForm({ initial, onSubmit, onCancel, workspaceId, isPending }: TrackerFormProps) {
  const [name, setName] = useState(initial?.name || '');
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>(initial?.keywords || []);
  const [subredditInput, setSubredditInput] = useState('');
  const [subreddits, setSubreddits] = useState<string[]>(initial?.subreddits || []);
  const [competitorInput, setCompetitorInput] = useState('');
  const [competitors, setCompetitors] = useState<string[]>(initial?.competitor_names || []);
  const [isActive, setIsActive] = useState(initial?.is_active ?? true);

  const addItem = (
    input: string,
    setInput: (v: string) => void,
    list: string[],
    setList: (v: string[]) => void
  ) => {
    const val = input.trim();
    if (val && !list.includes(val)) {
      setList([...list, val]);
    }
    setInput('');
  };

  const removeItem = (list: string[], setList: (v: string[]) => void, item: string) => {
    setList(list.filter((i) => i !== item));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      workspace_id: workspaceId,
      name,
      keywords,
      competitor_names: competitors,
      subreddits,
      platforms: subreddits.length > 0 ? ['reddit'] : ['reddit', 'hackernews'],
      is_active: isActive,
      confidence_override: null,
    });
  };

  const TagInput = ({
    label,
    input,
    setInput,
    list,
    setList,
    placeholder,
  }: {
    label: string;
    input: string;
    setInput: (v: string) => void;
    list: string[];
    setList: (v: string[]) => void;
    placeholder: string;
  }) => (
    <div className="space-y-2">
      <Label className="text-zinc-300">{label}</Label>
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addItem(input, setInput, list, setList);
            }
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-white/10"
          onClick={() => addItem(input, setInput, list, setList)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-1">
        {list.map((item) => (
          <Badge key={item} variant="outline" className="text-xs border-white/10 text-zinc-300 gap-1">
            {item}
            <button type="button" onClick={() => removeItem(list, setList, item)}>
              <X className="h-2.5 w-2.5" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="tracker-name" className="text-zinc-300">Tracker Name</Label>
        <Input
          id="tracker-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. CRM Competitor Watch"
          required
          className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
          data-testid="input-tracker-name"
        />
      </div>

      <TagInput
        label="Keywords"
        input={keywordInput}
        setInput={setKeywordInput}
        list={keywords}
        setList={setKeywords}
        placeholder="e.g. crm software, hubspot alternative"
      />

      <TagInput
        label="Subreddits to monitor"
        input={subredditInput}
        setInput={setSubredditInput}
        list={subreddits}
        setList={setSubreddits}
        placeholder="e.g. sales, startups (without r/)"
      />

      <TagInput
        label="Competitor Names"
        input={competitorInput}
        setInput={setCompetitorInput}
        list={competitors}
        setList={setCompetitors}
        placeholder="e.g. Salesforce, HubSpot"
      />

      <div className="flex items-center gap-3">
        <Switch checked={isActive} onCheckedChange={setIsActive} data-testid="switch-tracker-active" />
        <Label className="text-zinc-300">Active (start monitoring immediately)</Label>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
          disabled={isPending}
          data-testid="button-save-tracker"
        >
          {isPending ? 'Saving...' : 'Save Tracker'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} className="border-white/10">
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
