import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();
  const user = session?.user;

  // Admin user IDs
  const youjungGithub = 'cm8z8xfnz0000eg0zhprfsp5z';
  const youjungGoogle = 'cm8xtgpke0000ic0x4zp2kiql';

  if (user?.id !== youjungGithub && user?.id !== youjungGoogle) {
    redirect('/');
  }

  return <div>Admin</div>;
}
