import PostPreviewCard from '@/app/components/post-preview-card';
import { getPostByUserId } from '@/app/lib/actions/post';
import { extractText } from '@/app/lib/utils';
import { auth } from '@/auth';
import { List } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function MyPostsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  const userId = session?.user?.id;
  const posts = await getPostByUserId(userId!);

  return (
    <div className="flex items-center gap-2 mt-5 mb-16 -mx-2">
      <List size={20} className="" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => {
          const processedContent = post.content
            ? extractText(post.content)
            : '';
          return (
            <PostPreviewCard
              key={post.slug}
              slug={post.slug!}
              title={post.title!}
              content={processedContent}
              image={post.image!}
              createdAt={post.createdAt}
              myPosts={true}
            />
          );
        })}
      </div>
    </div>
  );
}
