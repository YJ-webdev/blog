import { ClientPage } from '@/app/post/[slug]/client-page';
import { auth } from '@/auth';
import { generateMetadataFromPost } from '@/app/lib/utils';
import { redirect } from 'next/navigation';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await fetch(`http://localhost:3000/post/${slug}/api`);
  if (!res.ok)
    return {
      title: 'Post Not Found',
      description: 'This post is no longer available.',
    };

  const { post } = await res.json();
  return generateMetadataFromPost(post);
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth();
  const userId = session?.user?.id;

  const res = await fetch(`http://localhost:3000/post/${slug}/api`);
  if (!res.ok) return redirect('/not-found');

  const { post, prevPost, nextPost, tagsData, links } = await res.json();

  console.log(userId, post.authorId);

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-5 px-4">
      <ClientPage
        post={post}
        userId={userId || undefined}
        postLinks={links}
        tagsData={tagsData}
        prevPost={prevPost || undefined}
        nextPost={nextPost || undefined}
      />
    </div>
  );
}
