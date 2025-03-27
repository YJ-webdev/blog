import { ClientPage } from '@/app/post/[slug]/client-page';
import { ClientOnly } from '@/app/components/client-only';
import { getCurrentUser } from '@/app/lib/actions/auth';
import {
  getLinksbyPostId,
  getPostBySlug,
  getTagsByPostId,
} from '@/app/lib/actions/post';
import { redirect } from 'next/navigation';

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const userId = (await getCurrentUser()) ?? '';
  const post = await getPostBySlug(slug);

  if (post === null || (post.authorId !== userId && post.published === false)) {
    return redirect('/not-found');
  }

  const links = await getLinksbyPostId(post.id);
  const tags = await getTagsByPostId(post.id);

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-5 px-4">
      <ClientOnly>
        <ClientPage
          post={post}
          userId={userId}
          postLinks={links}
          savedTags={tags}
        />
      </ClientOnly>
    </div>
  );
}
