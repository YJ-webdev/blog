import { auth } from '@/auth';
import { ResponsiveMenu } from './responsive-menu';

export default async function Nav() {
  const session = await auth();
  const username = session?.user?.name || 'U'; // Fallback to "U" if no name
  const nameParts = username.split(' ');
  const userName = nameParts[1] ? nameParts[1] : nameParts[1];

  return (
    <nav className="fixed right-5 top-4 z-[999999]">
      <ResponsiveMenu session={session} userName={userName} />
    </nav>
  );
}
