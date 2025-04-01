import { auth } from '@/auth';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

import { NewPostClient } from './new-post-client';

export default async function NewPostPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    redirect('/');
  }

  const post = await prisma.post.findFirst({
    where: {
      authorId: userId,
      published: false,
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    cacheStrategy: { ttl: 60 },
  });

  const tagsData = await prisma.tag.findMany({
    take: 20,
    orderBy: {
      id: 'asc',
    },
    cacheStrategy: { ttl: 60 },
  });

  if (!post) {
    return redirect('/my-posts');
  }

  return (
    <div className="w-full">
      <NewPostClient postId={post.id} tagsData={tagsData} />;
    </div>
  );
}
