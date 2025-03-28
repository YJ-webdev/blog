import PostPreviewCard from '@/app/components/post-preview-card';
// import { PostPreviewMain } from '@/app/components/post-preview-main';
import { getPostsByTag } from '@/app/lib/actions/post';
import { PostPreviewType } from '@/app/lib/types';
import { extractText } from '@/app/lib/utils';

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const posts = await getPostsByTag(tag);

  if (!posts || posts.length === 0) return <p>no posts yet</p>;

  return (
    <div className="flex flex-col gap-7 w-full">
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 mb-20">
        {posts.map((post: PostPreviewType) => {
          const processedContent = post.content
            ? extractText(post.content)
            : '';

          return (
            <PostPreviewCard
              key={post.slug}
              slug={post.slug ?? ''}
              title={post.title!}
              content={processedContent} // Pass extracted content
              image={post.image!}
              createdAt={post.createdAt!}
            />
          );
        })}
      </div>
    </div>
  );
}
