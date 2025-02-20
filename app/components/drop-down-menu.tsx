import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserProfile } from './user-profile';
import Link from 'next/link';
import { List, Bookmark, UserRoundMinus, PencilLine } from 'lucide-react';
import SignOut from './(auth)/sign-out';

export const DropDownMenu = ({ initials }: { initials: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-transparent">
        <UserProfile firstLetter={initials} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 mt-2 flex flex-col gap-1"
      >
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
          <Link href={'/saved-posts'} className="flex items-center">
            <Bookmark className="mr-3 h-4 w-4" />
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
  );
};
