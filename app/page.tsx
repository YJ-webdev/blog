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
  });

  if (!posts || posts.length === 0) return null;

  const [mainPost, ...otherPosts] = posts;

  const processedFirstPostContent = posts[0].content
    ? extractText(posts[0].content)
    : '';

  return (
    <div className="flex flex-col gap-5 w-full mb-20">
      <PostPreviewMain
        slug={mainPost.slug ?? ''}
        title={mainPost.title!}
        content={processedFirstPostContent}
        image={mainPost.image!}
        createdAt={mainPost.createdAt!}
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
