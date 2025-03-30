import { extractText } from '@/app/lib/utils';
import { auth } from '@/auth';

import { redirect } from 'next/navigation';
import PreviewCard from '../../components/preview-card';
import { NoPost } from './no-post';
import { prisma } from '@/lib/prisma';

export default async function MyPostsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  const userId = session?.user?.id;
  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
      published: true,
    },
    select: {
      slug: true,
      title: true,
      content: true,
      image: true,
      tags: true,
      links: true,
      bookmarkedBy: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="flex items-center gap-2 mb-16 -mx-2">
      {posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const processedContent = post.content
              ? extractText(post.content)
              : '';
            return (
              <PreviewCard
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
