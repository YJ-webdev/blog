'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import Link from 'next/link';

import { HomeIcon, MenuIcon, UserIcon } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import { List, UserRoundMinus, PencilLine, House } from 'lucide-react';

import { handleSignOut } from '../actions/auth';
import { createPost } from '../actions/post';

import { toast } from 'sonner';
import { User } from 'next-auth';
import { SidebarPostType } from '../lib/types';
import { Tag } from '@prisma/client';
import { ScrollArea } from '@/components/ui/scroll-area';

interface NavProps {
  user: User | null;
  posts: SidebarPostType[] | null;
  tags: Tag[] | null;
}

export default function Nav({ user, posts, tags }: NavProps) {
  const userFirstName = user?.name?.split(' ')[0];
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

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
      <Drawer>
        <DrawerTrigger className="fixed md:hidden right-4 top-4 z-[9999]">
          <MenuIcon strokeWidth={1.5} className="outline-none" />
        </DrawerTrigger>
        <DrawerContent className="z-[99999] w-[90%] flex flex-row gap-2 px-2 py-2">
          <div className="h-[100px] self-center w-2 ml-1 rounded-full bg-muted flex" />
          <div className="relative flex flex-col gap-4 w-full h-[100vh]">
            <ScrollArea className="h-full w-full m-0 p-0">
              <div className=" flex flex-col h-full mb-5">
                <DrawerHeader className="flex flex-col gap-2 h-full items-start p-0 m-0">
                  <DrawerTitle className="mx-5 mt-4 text-sm text-muted-foreground font-light">
                    인기 주제
                  </DrawerTitle>
                  <DrawerDescription className="mx-5 flex flex-wrap gap-2 text-base font-medium text-primary items-start">
                    {tags?.map((item) => (
                      <DrawerClose asChild key={item.name}>
                        <Link
                          href={`/tag/${item.name}`}
                          key={item.name}
                          className="w-fit py-2 bg-muted px-3 rounded-full hover:bg-primary/10 dark:hover:bg-white/15 text-sm cursor-pointer active:scale-90 duration-300 ease-out transition-all"
                        >
                          {item.name}
                        </Link>
                      </DrawerClose>
                    ))}
                  </DrawerDescription>
                </DrawerHeader>

                <DrawerHeader className="flex flex-col gap-4 h-full items-start p-0 flex-grow">
                  <DrawerTitle className="mx-5 mt-9 text-sm text-muted-foreground font-light">
                    떠오르는 글
                  </DrawerTitle>
                  <DrawerDescription className="mx-5 flex flex-col gap-4 text-base font-medium text-primary items-start">
                    {posts?.map((post) => (
                      <DrawerClose asChild key={post.slug}>
                        <Link
                          href={`/post/${post.slug}`}
                          className="text-base font-medium text-primary text-start line-clamp-1"
                        >
                          {post.title}
                        </Link>
                      </DrawerClose>
                    ))}
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex-grow" />
              </div>
            </ScrollArea>
            <p className="right-0 text-xs text-center text-muted-foreground pr-5 mb-5 mt-auto ">
              © 2025 ashjournals.com
            </p>
          </div>
        </DrawerContent>
      </Drawer>

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
