import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function SavedPostsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  return <div>Saved Posts</div>;
}
