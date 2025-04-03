import { auth } from '@/auth';
import { ResponsiveMenu } from './responsive-menu';

export default async function Nav() {
  const session = await auth();
  if (!session?.user) return null;
  const username = session.user.name || 'Francisca'; // Fallback to "U" if no name
  const nameParts = username.split(' ');
  const userName = nameParts[0];

  return (
    <nav className="fixed right-5 top-4 z-[999999]">
      <ResponsiveMenu session={session} userName={userName} />
    </nav>
  );
}
