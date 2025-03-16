import { ClientPage } from '@/app/post/[slug]/client-page';
import { ClientOnly } from '@/app/components/client-only';

export default async function SlugPage(props: { params: { slug: string } }) {
  const params = await props.params; // Await params before accessing its properties
  const { slug } = params;

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-5">
      <ClientOnly>
        <ClientPage postId={slug} />
      </ClientOnly>
    </div>
  );
}
