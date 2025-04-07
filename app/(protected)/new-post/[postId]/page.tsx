import { auth } from '@/auth';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';

import { NewPostClient } from './new-post-client';

export default async function NewPostPage() {
  const session = await auth();
  if (!session) redirect('/');

  const post = await prisma.post.findFirst({
    where: {
      authorId: session.user?.id,
      published: false,
    },
    select: {
      id: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const tagsData = await prisma.tag.findMany({
    take: 15,
    orderBy: {
      id: 'asc',
    },
  });

  if (!post) {
    return redirect('/my-posts');
  }

  return (
    <div className="w-full">
      <NewPostClient postId={post.id || ''} tagsData={tagsData || []} />
    </div>
  );
}
