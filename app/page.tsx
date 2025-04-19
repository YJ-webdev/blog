import { PostPreviewMain } from './components/post-preview-main';
import PostPreviewCard from './components/post-preview-card';
import { prisma } from '@/lib/prisma';
import { PostPreviewText } from './components/post-preview-text';
import { Advertisement } from './components/advertisement';

export default async function Home() {
  const posts = await prisma.post.findMany({
    cacheStrategy: { ttl: 60 },
    where: { published: true },
    take: 12,
    select: {
      slug: true,
      title: true,
      content: true,
      image: true,
      createdAt: true,
      tags: {
        take: 1,
        select: {
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!posts || posts.length === 0) return null;

  const secondToFifthPosts = posts.slice(1, 5);
  const sixthToNinethPosts = posts.slice(5, 9);

  return (
    <>
      {/* <Advertisement /> */}
      <div className="flex max-w-[1000px] mx-auto flex-col w-full gap-5 mb-10">
        <PostPreviewMain
          slug={posts[0].slug ?? ''}
          title={posts[0].title!}
          content={posts[0].content}
          image={posts[0].image!}
          createdAt={posts[0].createdAt!}
          tags={posts[0].tags}
        />
        {/* <hr className="mx-4" /> */}
        {secondToFifthPosts.length > 0 && (
          <div className="grid grid-cols-1 md:gap-5 md:grid-cols-2">
            {secondToFifthPosts.map((post) => (
              <PostPreviewCard
                key={post.slug}
                slug={post.slug ?? ''}
                title={post.title!}
                content={post.content}
                image={post.image!}
                createdAt={post.createdAt!}
                tags={post.tags}
              />
            ))}
          </div>
        )}
        {sixthToNinethPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 py-4">
            {sixthToNinethPosts.map((post) => (
              <PostPreviewText
                slug={post.slug}
                key={post.slug}
                title={post.title!}
                content={post.content}
                createdAt={post.createdAt!}
                tags={post.tags}
              />
            ))}
          </div>
        )}
      </div>
      <Advertisement />
    </>
  );
}
