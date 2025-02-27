import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import { ClientPage } from './client-page';
import { ClientOnly } from '@/app/components/client-only';

export default async function NewPostPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  return (
    <div className="max-w-[750px] mx-auto flex flex-col gap-5">
      <ClientOnly>
        <ClientPage />
      </ClientOnly>
    </div>
  );
}
