import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('writing', ({ data }) => !data.draft))
    .sort((a, b) => +new Date(b.data.publishedAt) - +new Date(a.data.publishedAt));

  return rss({
    title: 'Simon Richardson — Writing',
    description: 'Notes, posts and longer pieces by Simon Richardson — UK-based freelance web developer.',
    site: context.site ?? 'https://simonrichardson.dev',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.summary,
      link: `/writing/${post.id}/`,
      pubDate: new Date(post.data.publishedAt),
      categories: post.data.tags,
    })),
    customData: '<language>en-gb</language>',
  });
}
