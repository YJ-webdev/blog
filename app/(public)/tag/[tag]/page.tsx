import PostPreviewCard from '@/app/components/post-preview-card';
import { getPostsByTags } from '@/app/lib/data';
import { extractText } from '@/app/lib/utils';
import { Suspense } from 'react';
import { TagSkeleton } from './tag-skeleton';

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTags(decodedTag);

  return (
    <div className="flex flex-col gap-7 w-full sm:mt-4">
      <Suspense fallback={<TagSkeleton />}>
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-5  sm:grid-cols-2 mb-20">
          {posts.map((post) => {
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
      </Suspense>
    </div>
  );
}
