'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';
import Link from 'next/link';

import {
  AppleIcon,
  DumbbellIcon,
  HomeIcon,
  MenuIcon,
  TentTreeIcon,
  UserIcon,
} from 'lucide-react';
import { LoginDialog } from './(auth)/login-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { List, UserRoundMinus, PencilLine, House } from 'lucide-react';

import { handleSignOut } from '../actions/auth';
import { createPost } from '../actions/post';

import { toast } from 'sonner';
import { User } from 'next-auth';

export default function Nav({ user }: { user: User | null }) {
  const userFirstName = user?.name?.split(' ')[0];
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreatePost = async () => {
    try {
      startTransition(async () => {
        const post = await createPost();
        router.push(`/new-post/${post}`);
      });
    } catch {
      toast.error('포스트를 작성할 수 없습니다.');
    }
  };

  return (
    <>
      <nav className="fixed md:hidden right-4 top-4 z-[9999]">
        {user ? (
          <div className="items-center gap-6 flex">
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none p-2 pb-3 -m-2 rounded-full z-[99999]">
                  <p className="hidden lg:block">{`Hi, ${userFirstName}`}</p>
                  <UserIcon className="lg:hidden" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 flex flex-col gap-1"
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
                    <Link
                      href={'/'}
                      className="flex items-center cursor-pointer"
                    >
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
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none p-2 pb-3 -m-2 rounded-full z-[99999]">
                <MenuIcon className="" strokeWidth={1.5} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-48 flex flex-col gap-1"
              >
                {pathname !== '/' && (
                  <>
                    <DropdownMenuItem
                      onClick={() => router.push('/')}
                      className="flex items-center "
                    >
                      <HomeIcon className="mr-3 h-4 w-4" />
                      메인 페이지
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="my-0" />
                  </>
                )}

                <DropdownMenuItem
                  onClick={() => router.push('/tag/식이요법')}
                  className="flex items-center"
                >
                  <AppleIcon className="mr-3 h-4 w-4" />
                  식이요법
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/tag/여행')}
                  className="flex items-center"
                >
                  <TentTreeIcon className="mr-3 h-4 w-4" />
                  여행
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push('/tag/홈트레이닝')}
                  className="flex items-center"
                >
                  <DumbbellIcon className="mr-3 h-4 w-4" />
                  홈트레이닝
                </DropdownMenuItem>

                {/* <DropdownMenuSeparator className="my-0" />

                <DropdownMenuItem
                  onClick={() => setIsOpen(true)}
                  className="cursor-pointer flex items-center text-muted-foreground hover:text-primary"
                >
                  <UserRoundPlus className="mr-3 h-4 w-4 " />
                  로그인
                </DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>

            <LoginDialog isOpen={isOpen} setIsOpen={setIsOpen} />
          </>
        )}
      </nav>
      <nav className="fixed hidden md:block right-4 top-4 z-[9999]">
        {user ? (
          <div className="items-center gap-6 flex">
            <div className="flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none p-2 pb-3 -m-2 rounded-full z-[99999]">
                  <p className="hidden lg:block">{`Hi, ${userFirstName}`}</p>
                  <UserIcon className="lg:hidden" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 flex flex-col gap-1"
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
                    <Link
                      href={'/'}
                      className="flex items-center cursor-pointer"
                    >
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
          </>
        )}
      </nav>
    </>
  );
}
