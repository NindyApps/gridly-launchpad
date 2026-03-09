"use client";

import { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  prefix?: string;
  className?: string;
  'data-testid'?: string;
}

export function TagInput({
  tags,
  onChange,
  placeholder = 'Type and press Enter or comma',
  prefix,
  className,
  'data-testid': testId,
}: TagInputProps) {
  const [input, setInput] = useState('');

  const addTag = (raw: string) => {
    const value = raw.trim().replace(/^,+|,+$/g, '');
    if (!value) return;
    const normalized = prefix
      ? value.replace(new RegExp(`^${prefix}`), '')
      : value;
    if (normalized && !tags.includes(normalized)) {
      onChange([...tags, normalized]);
    }
    setInput('');
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      onChange(tags.slice(0, -1));
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => addTag(input)}
        placeholder={placeholder}
        className="border-white/10 bg-white/5 text-white placeholder:text-zinc-500"
        data-testid={testId}
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="border-white/10 text-zinc-300 text-xs gap-1 pr-1"
            >
              {prefix}{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 text-zinc-400 hover:text-white"
              >
                <X className="h-2.5 w-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
