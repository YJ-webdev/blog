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
  // Bookmark,
  UserRoundMinus,
  PencilLine,
  House,
  MenuIcon,
  UserRoundPlus,
} from 'lucide-react';
import { handleSignOut } from '../lib/actions/auth';
import { Session } from 'next-auth';

import { ShortCut } from './short-cut';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { createPost } from '../lib/actions/post';

interface DropDownMenuProps {
  session: Session | null;
  openLoginDialog: () => void;
  userName: string;
}

export const DropDownMenu = ({
  session,
  openLoginDialog,
  userName,
}: DropDownMenuProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleCreatePost = async () => {
    startTransition(async () => {
      const post = await createPost();
      if (post) {
        router.push(`/post/${post.slug}`);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none z-[99999]">
        {session && session.user ? (
          <>
            <p className="hidden md:block">Hi, {userName}</p>
            <UserProfile />
          </>
        ) : (
          <MenuIcon size={24} strokeWidth={1.5} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-48 mt-2 flex flex-col gap-1"
      >
        <DropdownMenuItem onClick={handleCreatePost} disabled={isPending}>
          <div className="flex items-center">
            <PencilLine className="mr-5 h-4 w-4" />
            작성하기
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/my-posts'} className="flex items-center">
            <List className="mr-3 h-4 w-4" />내 포스트
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link href={'/bookmarked'} className="flex items-center">
            <Bookmark className="mr-3 h-4 w-4" />
            북마크
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem asChild>
          <Link href={'/'} className="flex items-center cursor-pointer">
            <House className="mr-3 h-4 w-4" />
            홈으로 가기
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
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
            사이트 소개
          </Link>
        </DropdownMenuItem> */}

        <DropdownMenuSeparator className="my-0" />
        {session && session.user ? (
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer flex items-center text-muted-foreground hover:text-primary"
          >
            <UserRoundMinus className="mr-3 h-4 w-4e " />
            로그아웃
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            className="cursor-pointer flex items-center text-muted-foreground hover:text-primary"
            onClick={openLoginDialog}
          >
            <UserRoundPlus className="mr-3 h-4 w-4" />
            <div className="flex gap-6">로그인</div>
            <ShortCut />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
