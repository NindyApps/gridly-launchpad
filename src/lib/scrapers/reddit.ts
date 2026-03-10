export interface RawPost {
  id: string;
  title: string;
  body: string;
  url: string;
  author: string;
  created_at: string;
  subreddit: string;
  platform: 'reddit' | 'hackernews';
}

async function fetchWithBackoff(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, options);
    if (res.status === 429 && attempt < retries) {
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise((r) => setTimeout(r, delay));
      continue;
    }
    return res;
  }
  throw new Error('Max retries exceeded');
}

export async function fetchRedditPosts(subreddit: string, keywords: string[]): Promise<RawPost[]> {
  const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=25`;
  const res = await fetchWithBackoff(url, {
    headers: { 'User-Agent': 'OCTOPILOT/1.0' },
  });

  if (!res.ok) {
    console.error(`Reddit fetch error for r/${subreddit}: ${res.status}`);
    return [];
  }

  const json = await res.json();
  const children: { data: Record<string, unknown> }[] = json?.data?.children ?? [];

  const lowerKeywords = keywords.map((k) => k.toLowerCase());

  const posts: RawPost[] = [];
  for (const child of children) {
    const d = child.data;
    const title = String(d.title ?? '');
    const body = String(d.selftext ?? '');
    const combined = `${title} ${body}`.toLowerCase();

    const matches = lowerKeywords.some((kw) => combined.includes(kw));
    if (!matches) continue;

    posts.push({
      id: String(d.id),
      title,
      body,
      url: `https://reddit.com${d.permalink}`,
      author: `u/${d.author}`,
      created_at: new Date((d.created_utc as number) * 1000).toISOString(),
      subreddit,
      platform: 'reddit',
    });
  }

  return posts;
}
