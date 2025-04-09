import { prisma } from '@/lib/prisma';
import { DataTable } from './data-table';
import { columns } from './columns';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function MyPostPage() {
  const session = await auth();
  if (!session?.user) return redirect('/');
  const userId = session.user.id;

  const posts = await prisma.post.findMany({
    where: { authorId: userId },
    select: {
      id: true,
      title: true,
      image: true,
      links: true,
      createdAt: true,
      published: true,
      tags: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex flex-col gap-5 lg:w-[1000px] mx-auto p-4">
      <DataTable columns={columns} data={posts} />
    </div>
  );
}
