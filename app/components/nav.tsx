import { auth } from '@/auth';
import { Title } from './title';
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
    <div className="flex justify-between items-start pt-10 pb-5">
      <Title />

      <div className="flex justify-end items-center gap-x-4 text-[15px]">
        <ResponsiveMenu initials={initials} session={session} />
      </div>
    </div>
  );
}
