import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { PostClient } from './post-client';
import { getPost } from '@/app/lib/data';
import { extractText } from '@/app/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await getPost(decodedSlug);
  if (post === null) {
    return redirect('/not-found');
  }

  const processedContent = post.content ? extractText(post.content) : '';
  return {
    title: post.title,
    description: processedContent,
    openGraph: {
      title: post.title,
      description: processedContent,
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/post/${decodedSlug}`,
      images: [
        {
          width: '1200',
          height: '630',
          alt: post.title,
          url: post.image,
        },
      ],
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

  const post = await getPost(decodedSlug);

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
