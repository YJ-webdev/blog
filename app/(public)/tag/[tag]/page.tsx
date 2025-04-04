import PostPreviewCard from '@/app/components/post-preview-card';
import { PostPreviewType } from '@/app/lib/types';
import { extractText } from '@/app/lib/utils';
import { prisma } from '@/lib/prisma';

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
      url: `/tag/${tag}`,
      images: '/images/default-image.jpg',
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

  const posts = await prisma.post.findMany({
    where: {
      tags: {
        some: {
          name: decodedTag,
        },
      },

      published: true,
    },
    take: 6,
  });

  return (
    <div className="flex flex-col gap-7 w-full">
      <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 mb-20">
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
