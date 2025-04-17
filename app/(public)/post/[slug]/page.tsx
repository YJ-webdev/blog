import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { PostClient } from './post-client';
import { getPost } from '@/app/lib/data';
import { extractFirstParagraphText } from '@/app/lib/utils';
import { JSONContent } from '@tiptap/core';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await getPost(decodedSlug);
  if (post === null || post.content === null) {
    return redirect('/not-found');
  }

  const firstParagraph = extractFirstParagraphText(post.content as JSONContent);
  const shortDescription = firstParagraph?.substring(0, 150);

  return {
    title: post.title,
    description: shortDescription,
    openGraph: {
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/post/${slug}`,
      images: [
        {
          url: post.image,
          alt: post.title,
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
    <div className="lg:w-[1000px] w-full mx-auto w-fullflex flex-col gap-5 px-4">
      <PostClient
        postId={post.id}
        postTitle={post.title}
        postContent={post.content as string}
        postImage={post.image}
        postLinks={post.links}
        postTags={post.tags}
        postCreatedAt={post.createdAt}
        prevPost={prevPost || undefined}
        nextPost={nextPost || undefined}
      />
    </div>
  );
}
