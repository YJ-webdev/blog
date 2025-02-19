import Link from 'next/link';
import { Title } from './title';

import { auth } from '@/auth';
import SignOut from './(auth)/sign-out';

import { Heart, UserRoundMinus, BookOpen } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ModeToggle } from './mode-toggle';
import { UserProfile } from './user-profile';

export default async function Navbar() {
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
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-transparent">
                <UserProfile firstLetter={initials} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 mt-2 flex flex-col gap-1"
              >
                <DropdownMenuItem asChild>
                  <Link href={'/my-posts'} className="flex items-center">
                    <BookOpen className="mr-3 h-4 w-4" />
                    My Posts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={'/saved-posts'} className="flex items-center">
                    <Heart className="mr-3 h-4 w-4" />
                    Saved Posts
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-0" />
                <DropdownMenuItem className="flex items-center">
                  <UserRoundMinus className="mr-3 h-4 w-4" />
                  <SignOut />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <ModeToggle />
        )}
      </div>
    </div>
  );
}
