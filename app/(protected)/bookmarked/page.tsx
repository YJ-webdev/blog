import { auth } from '@/auth';
import { Bookmark } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function SavedPostsPage() {
  const session = await auth();

  if (!session) {
    return redirect('/');
  }

  return (
    <div className="flex items-center gap-2 mt-5">
      <Bookmark size={20} className="" />
      Bookmarked Posts
    </div>
  );
}
