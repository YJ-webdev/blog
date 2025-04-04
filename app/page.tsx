import { PostPreviewMain } from './components/post-preview-main';
import PostPreviewCard from './components/post-preview-card';
import { extractText } from './lib/utils';
import { prisma } from '@/lib/prisma';
import { cn } from '@/lib/utils';

export default async function Home() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    take: 7,
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

  const secondaryPosts =
    posts.length === 1 ? [mainPost, ...otherPosts] : otherPosts;

  return (
    <div className="flex max-w-[1000px] mx-auto flex-col w-full -mt-5 sm:mt-4 gap-5 mb-24">
      <div className={cn('', posts.length === 1 && 'sm:hidden')}>
        <PostPreviewMain
          slug={mainPost.slug ?? ''}
          title={mainPost.title!}
          content={processedFirstPostContent}
          image={mainPost.image!}
          createdAt={mainPost.createdAt!}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 ">
        {secondaryPosts.map((post) => {
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
