import { PostPreviewMain } from './components/post-preview-main';
import PostPreviewCard from './components/post-preview-card';
import { prisma } from '@/lib/prisma';

export default async function Home() {
  const posts = await prisma.post.findMany({
    cacheStrategy: { ttl: 60 },
    where: { published: true },
    take: 11,
    select: {
      slug: true,
      title: true,
      content: true,
      image: true,
      tags: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  if (!posts || posts.length === 0) return null;

  const [mainPost, ...otherPosts] = posts;

  return (
    <div className="flex max-w-[1000px] mx-auto flex-col w-full gap-5 mb-10">
      <PostPreviewMain
        slug={mainPost.slug ?? ''}
        title={mainPost.title!}
        content={mainPost.content}
        image={mainPost.image!}
        createdAt={mainPost.createdAt!}
      />

      {otherPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
  );
}
