import { PostPreviewMain } from './components/post-preview-main';
import PostPreviewCard from './components/post-preview-card';
import { extractText } from './lib/utils';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
      title: true,
      content: true,
      image: true,
      tags: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    cacheStrategy: { ttl: 60 },
  });

  if (!posts || posts.length === 0) return null;

  const [mainPost, ...otherPosts] = posts;

  const processedFirstPostContent = posts[0].content
    ? extractText(posts[0].content)
    : '';

  return (
    <div className="flex max-w-[1000px] mx-auto flex-col w-full gap-5 mb-24">
      <PostPreviewMain
        slug={mainPost.slug ?? ''}
        title={mainPost.title!}
        content={processedFirstPostContent}
        image={mainPost.image!}
        createdAt={mainPost.createdAt!}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 ">
        {otherPosts.map((post) => {
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
