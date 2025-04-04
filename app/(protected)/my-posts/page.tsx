import { extractText } from '@/app/lib/utils';
import { auth } from '@/auth';

import { redirect } from 'next/navigation';

import { NoPost } from './no-post';
import { prisma } from '@/lib/prisma';
import PreviewMyPost from '@/app/components/preview-my-post';

export default async function MyPostsPage() {
  const session = await auth();
  if (!session?.user) return redirect('/');

  const userId = session.user.id;

  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
      published: true,
    },
    take: 6,
    select: {
      slug: true,
      title: true,
      content: true,
      image: true,
      links: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="flex max-w-[1000px] mx-auto items-center gap-2 mb-16 sm:mt-4">
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 w-full">
          {posts.map((post) => {
            const processedContent = post.content
              ? extractText(post.content)
              : '';
            return (
              <PreviewMyPost
                key={post.slug}
                slug={post.slug!}
                title={post.title!}
                content={processedContent}
                image={post.image!}
                createdAt={post.createdAt}
              />
            );
          })}
        </div>
      )}

      {posts.length === 0 && <NoPost />}
    </div>
  );
}
