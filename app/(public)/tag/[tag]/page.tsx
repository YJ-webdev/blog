import PostPreviewCard from '@/app/components/post-preview-card';
import { getPostsByTags } from '@/app/lib/data';

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
    openGraph: {
      title: `애쉬저널 | ${decodedTag}`,
      description: `${decodedTag}을 주제로 한 아티클 모음`,
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/tag/${decodedTag}`,
      images: [
        {
          width: '1200',
          height: '630',
          alt: `${decodedTag} 주제 모음`,
          type: 'image/jpg',
          url: `/images/tag/${decodedTag}.jpg`,
        },
      ],
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
    <div className="flex flex-col gap-7 w-full">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-5  sm:grid-cols-2 mb-20">
        {posts.map((post) => {
          return (
            <PostPreviewCard
              key={post.slug}
              slug={post.slug ?? ''}
              title={post.title!}
              content={post.content} // Pass extracted content
              image={post.image!}
              createdAt={post.createdAt!}
            />
          );
        })}
      </div>
    </div>
  );
}
