'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';

import { HomeIcon } from 'lucide-react';
import { LoginDialog } from './(auth)/login-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { UserProfile } from './user-profile';
import { List, UserRoundMinus, PencilLine, House } from 'lucide-react';

import { handleSignOut } from '../actions/auth';
import { createPost } from '../actions/post';
import { useSession } from 'next-auth/react';

import { toast } from 'sonner';

export default function Nav() {
  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const username = session?.user?.name;
  const firstName = username?.split(' ')[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        setIsOpen((prev) => !prev); // Toggle dialog
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreatePost = async () => {
    if (!session || session.user?.id === undefined) return;

    const userId = session.user.id;

    try {
      startTransition(async () => {
        const post = await createPost({ userId });
        router.push(`/new-post/${post}`);
      });
    } catch {
      toast.error('포스트를 작성할 수 없습니다.');
    }
  };

  return (
    <nav className="fixed right-4 top-4 z-[9999]">
      {session ? (
        <div className="items-center gap-6 flex">
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none p-4 -m-4 rounded-full">
                <UserProfile userName={firstName || 'Francisca'} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 mt-2 flex flex-col gap-1"
              >
                <DropdownMenuItem
                  onClick={handleCreatePost}
                  disabled={isPending}
                >
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

                <DropdownMenuItem asChild>
                  <Link href={'/'} className="flex items-center cursor-pointer">
                    <House className="mr-3 h-4 w-4" />
                    홈으로 가기
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-0" />

                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer flex items-center text-muted-foreground hover:text-primary"
                >
                  <UserRoundMinus className="mr-3 h-4 w-4 " />
                  로그아웃
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ) : (
        <>
          {pathname !== '/' && (
            <Link
              href={'/'}
              className="items-center gap-4 md:flex text-[14px] z-[999999]"
            >
              <HomeIcon strokeWidth={1.5} />
            </Link>
          )}

          <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
      )}
    </nav>
  );
}
