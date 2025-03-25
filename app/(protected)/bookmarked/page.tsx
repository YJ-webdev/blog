import PostPreviewCard from '@/app/components/post-preview-card';
import { extractText } from '@/app/lib/utils';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { Bookmark } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function SavedPostsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  const userId = session?.user?.id;

  const bookmarkedPosts = await prisma.bookmark.findMany({
    where: { userId },
    include: {
      post: {
        // Fetch full post details
        select: {
          id: true,
          slug: true,
          title: true,
          content: true,
          image: true,
          authorId: true,
          tags: true,
          links: true,
          createdAt: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="flex items-center gap-2 mt-5 mb-16">
      <Bookmark size={20} className="" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {bookmarkedPosts.map((bookmark) => {
          const processedContent = bookmark.post.content
            ? extractText(bookmark.post.content)
            : '';
          return (
            <PostPreviewCard
              key={bookmark.post.slug}
              slug={bookmark.post.slug!}
              title={bookmark.post.title!}
              content={processedContent}
              image={bookmark.post.image!}
              createdAt={bookmark.post.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
}
