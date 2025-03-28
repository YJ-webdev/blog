import { getPostByUserId } from '@/app/lib/actions/post';
import { extractText } from '@/app/lib/utils';
import { auth } from '@/auth';
import { List } from 'lucide-react';
import { redirect } from 'next/navigation';
import PreviewCard from './preview-card';

export default async function MyPostsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  const userId = session?.user?.id;
  const posts = await getPostByUserId(userId!);

  return (
    <div className="flex items-center gap-2 mb-16 -mx-2">
      <List size={20} className="" />
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
    </div>
  );
}
