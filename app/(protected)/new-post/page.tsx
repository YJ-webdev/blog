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

  const tagsData = await prisma.tag.findMany({
    take: 20,
    orderBy: {
      id: 'asc',
    },
  });

  return <NewPostClient tagsData={tagsData} userId={userId} />;
}
