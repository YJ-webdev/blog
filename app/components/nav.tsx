import { auth } from '@/auth';
import { ResponsiveMenu } from './responsive-menu';

export default async function Nav() {
  const session = await auth();
  const username = session?.user?.name || 'U'; // Fallback to "U" if no name
  const nameParts = username.split(' ');
  const initials =
    nameParts.length > 1
      ? nameParts[0].charAt(0).toUpperCase() +
        nameParts[1].charAt(0).toUpperCase()
      : nameParts[0].charAt(0).toUpperCase();

  return (
    <nav className="fixed right-5 top-4 z-[999999]">
      <ResponsiveMenu initials={initials} session={session} />
    </nav>
  );
}
