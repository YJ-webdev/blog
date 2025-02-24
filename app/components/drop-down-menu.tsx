import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserProfile } from './user-profile';
import Link from 'next/link';
import {
  List,
  Bookmark,
  UserRoundMinus,
  PencilLine,
  House,
  MenuIcon,
  UserRoundPlus,
} from 'lucide-react';
import { handleSignOut } from '../actions/auth';
import { Session } from 'next-auth';
import { cn } from '@/lib/utils';
import { ShortCut } from './short-cut';

interface DropDownMenuProps {
  initials: string;
  session: Session | null;
  openLoginDialog: () => void;
}

export const DropDownMenu = ({
  initials,
  session,
  openLoginDialog,
}: DropDownMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-transparent">
        {session && session.user ? (
          <UserProfile firstLetter={initials} />
        ) : (
          <MenuIcon size={24} strokeWidth={1.5} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 mt-2 flex flex-col gap-1"
      >
        {session && session.user && (
          <>
            <DropdownMenuItem asChild>
              <Link href={'/new-post'} className="flex items-center">
                <PencilLine className="mr-3 h-4 w-4" />
                Write Post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={'/my-posts'} className="flex items-center">
                <List className="mr-3 h-4 w-4" />
                My Posts
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={'/bookmarked'} className="flex items-center">
                <Bookmark className="mr-3 h-4 w-4" />
                Bookmarked
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-0" />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link
            href={'/'}
            className={cn(
              'flex items-center cursor-pointer',
              session && session.user
                ? 'text-muted-foreground'
                : 'text-primary',
            )}
          >
            <House className="mr-3 h-4 w-4" />
            Home
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link
            href={'/about'}
            className={cn(
              'flex items-center cursor-pointer',
              session && session.user
                ? 'text-muted-foreground'
                : 'text-primary',
            )}
          >
            <div className="mr-3 h-4 w-4" />
            About Bravura
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-0" />
        {session && session.user ? (
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer flex items-center text-muted-foreground hover:text-primary"
          >
            <UserRoundMinus className="mr-3 h-4 w-4e " />
            Log out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer flex items-center text-muted-foreground hover:text-primary"
            onClick={openLoginDialog}
          >
            <UserRoundPlus className="mr-3 h-4 w-4" />
            <div className="flex gap-6">Log in</div>
            <ShortCut />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
