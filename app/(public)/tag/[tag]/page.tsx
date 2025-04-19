import { Advertisement } from '@/app/components/advertisement';
import PostPreviewCard from '@/app/components/post-preview-card';
import { PostPreviewMain } from '@/app/components/post-preview-main';
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

  if (!posts || posts.length === 0) return null;

  const [firstPost, ...otherPosts] = posts;

  return (
    <>
      {/* <Advertisement /> */}
      <div className="flex max-w-[1000px] mx-auto flex-col w-full gap-5 mb-10">
        <PostPreviewMain
          slug={firstPost.slug ?? ''}
          title={firstPost.title!}
          content={firstPost.content}
          image={firstPost.image!}
          createdAt={firstPost.createdAt!}
        />
        {/* <hr className="mx-4" /> */}
        {otherPosts.length > 0 && (
          <div className="grid grid-cols-1 md:gap-5 md:grid-cols-2">
            {otherPosts.map((post) => (
              <PostPreviewCard
                key={post.slug}
                slug={post.slug ?? ''}
                title={post.title!}
                content={post.content}
                image={post.image!}
                createdAt={post.createdAt!}
              />
            ))}
          </div>
        )}
      </div>
      <Advertisement />
    </>
  );
}
