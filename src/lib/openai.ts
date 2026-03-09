import OpenAI from 'openai';

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface ClassifySignalInput {
  post_title: string;
  post_body: string;
  platform: 'reddit' | 'hackernews';
  tracker_keywords: string[];
  competitor_names: string[];
}

export interface ClassifySignalOutput {
  intent_level: 'high' | 'medium' | 'low';
  intent_category: 'vendor_switch' | 'new_purchase' | 'evaluation' | 'complaint';
  confidence_score: number;
  pain_domain: string;
  ai_summary: string;
  suggested_opener: string;
  urgency_tag: 'urgent' | 'standard' | 'monitor';
  is_signal: boolean;
}

export async function classifySignal(input: ClassifySignalInput): Promise<ClassifySignalOutput> {
  const prompt = `You are a B2B revenue signal classifier. Analyze this post and determine if it represents a buying intent signal.

Platform: ${input.platform}
Post Title: ${input.post_title}
Post Body: ${input.post_body}
Keywords to match: ${input.tracker_keywords.join(', ')}
Competitors to watch: ${input.competitor_names.join(', ')}

Respond with a JSON object containing:
- is_signal: boolean (true if this is a genuine buying intent signal)
- intent_level: "high" | "medium" | "low"
- intent_category: "vendor_switch" | "new_purchase" | "evaluation" | "complaint"
- confidence_score: number 0-1
- pain_domain: string (the business pain area)
- ai_summary: string (1-2 sentence summary of why this is a signal)
- suggested_opener: string (a personalized outreach opener, first line only)
- urgency_tag: "urgent" | "standard" | "monitor"`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
    temperature: 0.2,
  });

  const content = response.choices[0].message.content;
  if (!content) throw new Error('No response from OpenAI');

  return JSON.parse(content) as ClassifySignalOutput;
}
