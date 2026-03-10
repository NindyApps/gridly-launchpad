import type { RawPost } from './reddit';

export type { RawPost };

interface AlgoliaHit {
  objectID: string;
  title?: string;
  story_text?: string;
  comment_text?: string;
  url?: string;
  author: string;
  created_at: string;
  _tags?: string[];
}

export async function fetchHNPosts(keywords: string[]): Promise<RawPost[]> {
  const unix24hAgo = Math.floor(Date.now() / 1000) - 86400;
  const seen = new Set<string>();
  const posts: RawPost[] = [];

  for (const keyword of keywords) {
    const params = new URLSearchParams({
      query: keyword,
      tags: 'story',
      hitsPerPage: '20',
      numericFilters: `created_at_i>${unix24hAgo}`,
    });

    const url = `https://hn.algolia.com/api/v1/search_by_date?${params.toString()}`;
    let res: Response;
    try {
      res = await fetch(url, { headers: { 'User-Agent': 'OCTOPILOT/1.0' } });
    } catch (err) {
      console.error(`HN fetch error for keyword "${keyword}":`, err);
      continue;
    }

    if (!res.ok) {
      console.error(`HN API error for keyword "${keyword}": ${res.status}`);
      continue;
    }

    const json = await res.json();
    const hits: AlgoliaHit[] = json?.hits ?? [];

    for (const hit of hits) {
      if (seen.has(hit.objectID)) continue;
      seen.add(hit.objectID);

      const title = hit.title ?? '(no title)';
      const body = hit.story_text ?? hit.comment_text ?? '';
      const postUrl = hit.url ?? `https://news.ycombinator.com/item?id=${hit.objectID}`;

      posts.push({
        id: hit.objectID,
        title,
        body,
        url: postUrl,
        author: hit.author,
        created_at: hit.created_at,
        subreddit: 'hackernews',
        platform: 'hackernews',
      });
    }
  }

  return posts;
}
