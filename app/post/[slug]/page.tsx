import { ClientPage } from '@/app/post/[slug]/client-page';
import { ClientOnly } from '@/app/components/client-only';
import { getCurrentUser } from '@/app/lib/actions/auth';
import {
  getLinksbyPostId,
  getPostBySlug,
  getPrevNextPosts,
} from '@/app/lib/actions/post';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const userId = (await getCurrentUser()) ?? '';
  const post = await getPostBySlug(slug);
  const data = await prisma.tag.findMany({
    take: 18,
    orderBy: {
      id: 'asc',
    },
  });

  if (post === null || (post.authorId !== userId && post.published === false)) {
    return redirect('/not-found');
  }

  const { prevPost, nextPost } = await getPrevNextPosts(post.id);

  const links = await getLinksbyPostId(post.id);

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-5 px-4">
      <ClientOnly>
        <ClientPage
          post={post}
          userId={userId}
          postLinks={links}
          tagsData={data}
          prevPost={prevPost || post}
          nextPost={nextPost || post}
        />
      </ClientOnly>
    </div>
  );
}
