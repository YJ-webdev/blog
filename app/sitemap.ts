import { prisma } from '@/lib/prisma';

import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true, slug: { not: null } },
    select: {
      slug: true,
      updatedAt: true,
    },
  });

  const tags = await prisma.tag.findMany({
    where: { posts: { some: { published: true } } },
    select: {
      name: true,
    },
  });

  // Generate URLs for your static pages and dynamic posts
  const staticPages = [
    {
      url: 'https://ashjournals.com',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ] as const;

  const dynamicPostPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://ashjournals.com/post/${encodeURIComponent(post.slug!)}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 1,
  }));

  const dynamicTagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `https://ashjournals.com/tag/${encodeURIComponent(tag.name!)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Combine static and dynamic URLs
  return [...staticPages, ...dynamicPostPages, ...dynamicTagPages];
}
