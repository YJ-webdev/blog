import { ClientPage } from '@/app/post/[slug]/client-page';
import { ClientOnly } from '@/app/components/client-only';
import { getCurrentUser } from '@/app/lib/actions/auth';
import { getPostById } from '@/app/lib/actions/post';
import { redirect } from 'next/navigation';

export default async function SlugPage(props: { params: { slug: string } }) {
  const params = await props.params; // Await params before accessing its properties
  const { slug } = params;
  const userId = (await getCurrentUser()) ?? ''; // ✅ Ensure userId is always a string
  const post = await getPostById(slug);

  if (post === null || (post.authorId !== userId && post.published === false)) {
    return redirect('/not-found');
  }

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-5">
      <ClientOnly>
        <ClientPage post={post} userId={userId} />
      </ClientOnly>
    </div>
  );
}
