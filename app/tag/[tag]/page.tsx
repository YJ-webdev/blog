import PostPreviewCard from '@/app/components/post-preview-card';
import { getPostsByTag } from '@/app/lib/actions/post';
import { PostPreviewType } from '@/app/lib/types';
import { extractText } from '@/app/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  const title = `레인지 저널 | ${decodeURIComponent(tag)}`;
  const description = `Browse through all posts tagged with ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/tag/${tag}`,
      images: '/range-journal-default-image.jpg',
    },
  };
}

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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-20">
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
