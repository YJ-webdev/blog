import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { EditClient } from './edit-client';
import { auth } from '@/auth';

export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth();
  const userId = session?.user?.id;

  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  const post = await prisma.post.findUnique({
    where: { slug: decodedSlug },
    select: {
      id: true,
      authorId: true,
      title: true,
      content: true,
      image: true,
      tags: true,
      links: true,
    },
  });

  if (post === null) {
    return redirect('/not-found');
  }

  if (!session?.user || userId !== post.authorId) return redirect('/');

  const tagsData = await prisma.tag.findMany({
    where: {
      posts: {
        some: {
          id: post.id,
        },
      },
    },
  });

  return (
    <EditClient
      postId={post.id}
      postTitle={post.title || ''}
      postContent={post.content as string}
      postImage={post.image || ''}
      postLinks={post.links}
      postTags={post.tags}
      tagsData={tagsData}
    />
  );
}
