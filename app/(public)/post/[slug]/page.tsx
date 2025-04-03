import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { PostClient } from './post-client';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const title = `레인지 저널 | ${decodeURIComponent(slug).replace(/-/g, ' ')}`;
  const description = `Browse through all posts tagged with ${slug}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `/post/${slug}`,
      images: '/images/default-image.jpg',
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await prisma.post.findUnique({
    where: { slug: decodedSlug },
    include: {
      tags: true,
      links: true,
    },
  });

  if (post === null) {
    return redirect('/not-found');
  }

  const nextPost = await prisma.post.findFirst({
    where: {
      published: true,
      createdAt: { gt: post.createdAt },
    },
    select: {
      slug: true,
      title: true,
      tags: true,
    },
    orderBy: { createdAt: 'asc' },
  });

  const prevPost = await prisma.post.findFirst({
    where: {
      published: true,
      createdAt: { lt: post.createdAt },
    },
    select: {
      slug: true,
      title: true,
      tags: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="w-full flex flex-col gap-5 px-4">
      <PostClient
        post={post}
        prevPost={prevPost || undefined}
        nextPost={nextPost || undefined}
      />
    </div>
  );
}
