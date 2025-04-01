import { prisma } from '@/lib/prisma';
// import { generateMetadataFromPost } from '@/app/lib/utils';
import { redirect } from 'next/navigation';
import { PostClient } from './post-client';

// export async function generateMetadata({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = await params;
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_VERCEL_URL}/post/${slug}/api`,
//   );
//   if (!res.ok)
//     return {
//       title: 'Post Not Found',
//       description: 'This post is no longer available.',
//     };

//   const { post } = await res.json();
//   return generateMetadataFromPost(post);
// }

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

  // const postTags = await prisma.tag.findMany({
  //   where: {
  //     posts: {
  //       some: {
  //         id: post.id,
  //       },
  //     },
  //   },
  // });

  return (
    <div className="w-full flex flex-col gap-5 px-4">
      <PostClient
        post={post}
        prevPost={prevPost || undefined}
        nextPost={nextPost || undefined}
        // postTags={postTags}
      />
    </div>
  );
}
