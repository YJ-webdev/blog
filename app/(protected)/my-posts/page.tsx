import { auth } from '@/auth';
import { List } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function MyPostsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  return (
    <div className="flex items-center gap-2">
      <List size={20} className="" />
      My Posts
    </div>
  );
}
