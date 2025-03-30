import { getPostBySlug } from '@/app/lib/actions/post';
import { ClientPage } from '@/app/post/[slug]/client-page';

import { prisma } from '@/lib/prisma';
// import { generateMetadataFromPost } from '@/app/lib/utils';
import { redirect } from 'next/navigation';

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
  const post = await getPostBySlug(slug);
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
    orderBy: { createdAt: 'asc' },
  });
  const links = await prisma.link.findMany({
    where: { postId: post.id },
    orderBy: { createdAt: 'asc' },
    take: 3,
  });
  const postTags = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          id: post.id,
        },
      },
    },
  });

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-5 px-4">
      <ClientPage
        post={post}
        postLinks={links}
        prevPost={prevPost || undefined}
        nextPost={nextPost || undefined}
        postTags={postTags}
      />
    </div>
  );
}
