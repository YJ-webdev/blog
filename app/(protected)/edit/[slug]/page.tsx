import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { EditClient } from './edit-client';
import { getPostBySlug } from '@/app/lib/actions/post';
import { prisma } from '@/lib/prisma';

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const { slug } = await params;

  if (!userId) {
    redirect('/');
  }

  const post = await getPostBySlug(slug);

  if (post === null) {
    return redirect('/not-found');
  }

  const tagsData = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          id: post.id,
        },
      },
    },
  });

  return <EditClient post={post} tagsData={tagsData} />;
}
