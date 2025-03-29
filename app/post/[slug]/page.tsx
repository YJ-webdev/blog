import { ClientPage } from '@/app/post/[slug]/client-page';
import { ClientOnly } from '@/app/components/client-only';
import { getCurrentUser } from '@/app/lib/actions/auth';
import {
  getLinksbyPostId,
  getPostBySlug,
  getPrevNextPosts,
} from '@/app/lib/actions/post';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { extractText } from '@/app/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This post is no longer available.',
    };
  }

  const posttitle = post.title ?? '새 포스트 작성';
  const title = `레인지 저널 | ${posttitle}`; // Use the title from the post
  const description = post.content
    ? extractText(post.content).slice(0, 160)
    : '';
  // Use the content or a custom description
  const image = post.image || '/range-journal-default-image.jpg'; // Fallback image if not set
  const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/post/${slug}`; // Replace with your site's base URL

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: title,
        },
      ],
    },
  };
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const userId = (await getCurrentUser()) ?? '';
  const post = await getPostBySlug(slug);
  const data = await prisma.tag.findMany({
    take: 18,
    orderBy: {
      id: 'asc',
    },
  });

  if (post === null || (post.authorId !== userId && post.published === false)) {
    return redirect('/not-found');
  }

  const { prevPost, nextPost } = await getPrevNextPosts(post.id);

  const links = await getLinksbyPostId(post.id);

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-5 px-4">
      <ClientOnly>
        <ClientPage
          post={post}
          userId={userId}
          postLinks={links}
          tagsData={data}
          prevPost={prevPost || undefined}
          nextPost={nextPost || undefined}
        />
      </ClientOnly>
    </div>
  );
}
