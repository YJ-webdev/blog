import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const getPostforMetaData = cache(async (slug: string) => {
  const res = await prisma.post.findFirst({
    where: {
      slug: slug,
      published: true,
    },
    select: {
      title: true,
      image: true,
    },
  });
  return res;
});

// getPost will be used twice, but execute only once
export const getPost = cache(async (slug: string) => {
  const res = await prisma.post.findFirst({
    cacheStrategy: { ttl: 60 },
    where: {
      slug: slug,
      published: true,
    },
    select: {
      id: true,
      title: true,
      image: true,
      content: true,
      tags: true,
      links: true,
      createdAt: true,
    },
  });
  return res;
});

export const getPostsByTags = cache(async (tag: string) => {
  const res = await prisma.post.findMany({
    cacheStrategy: { ttl: 60 },
    where: {
      tags: {
        some: {
          name: tag,
        },
      },
      published: true,
    },
    take: 6,
    select: {
      id: true,
      slug: true,
      title: true,
      image: true,
      content: true,
      tags: true,
      links: true,
      authorId: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return res;
});
