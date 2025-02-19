import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function MyPostsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  return <div>My Posts</div>;
}
