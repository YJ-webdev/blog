import Link from 'next/link';
import { Title } from './title';

import { auth } from '@/auth';

import { ModeToggle } from './mode-toggle';

import { DropDownMenu } from './drop-down-menu';

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
    <div className="flex justify-between items-start py-10">
      <Title />

      <div className="flex justify-end items-center gap-x-4 text-[15px]">
        <Link href="/">Blog</Link>
        <Link href="/about">About</Link>

        {session && session.user ? (
          <div className="flex items-center gap-2">
            <DropDownMenu initials={initials} />
          </div>
        ) : (
          <ModeToggle />
        )}
      </div>
    </div>
  );
}
