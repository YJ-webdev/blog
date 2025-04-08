import PostPreviewCard from '@/app/components/post-preview-card';
import { getPostsByTags } from '@/app/lib/data';
import { extractText } from '@/app/lib/utils';
import { Suspense } from 'react';
import { TagSkeleton } from './tag-skeleton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);

  const posts = await getPostsByTags(decodedTag);
  if (posts.length === 0 || posts === null) {
    return null;
  }

  return {
    title: `애쉬저널 | ${decodedTag}`,
    description: `${decodedTag}을 주제로 한 기사를 모은 블로그입니다.`,
    openGraph: {
      title: `애쉬저널 | ${decodedTag}`,
      description: `${decodedTag}을 주제로 한 기사를 모은 블로그입니다.`,
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/tag/${decodedTag}`,
      images: `/images/tag/${decodedTag}.jpg`,
    },
  };
}

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
