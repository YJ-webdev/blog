'use client';

import { PanelLeft, PanelLeftDashed } from 'lucide-react';

import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { useEffect, useState } from 'react';

import { Tag } from '@prisma/client';
import { SidebarPostType } from '../lib/types';
import { TagLink } from './tag-button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

interface AppSidebarProps {
  posts: SidebarPostType[];
  tags: Tag[];
}

export function AppSidebar({ posts, tags }: AppSidebarProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { open, toggleSidebar } = useSidebar();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [timeAgoValues, setTimeAgoValues] = useState<string[]>([]);

  const timeAgo = (date: Date): string => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} sec${diffInSeconds === 1 ? '' : 's'}`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} min${diffInMinutes === 1 ? '' : 's'}`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h`;
    }

    const diffInDays = Math.floor(diffInSeconds / (60 * 60 * 24));

    if (diffInDays === 1) {
      return 'Yesterday';
    }

    if (diffInDays < 30) {
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'}`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths === 1 ? '' : 's'}`;
    }

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}y`;
  };

  useEffect(() => {
    const newTimeAgoValues = posts.map((post) =>
      timeAgo(new Date(post.createdAt)),
    );
    setTimeAgoValues(newTimeAgoValues);
  }, [posts]);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="hidden md:block fixed top-5 left-5 z-10"
      >
        {!open && <PanelLeft strokeWidth={1.5} />}
      </button>
      <Sidebar className=" bg-white dark:bg-[#1f1f1f] p-2">
        <SidebarHeader className="hidden md:block ">
          <button
            onClick={toggleSidebar}
            className="hidden md:block fixed top-5 left-5 z-10"
          >
            {open ? <PanelLeftDashed strokeWidth={1.5} /> : null}
          </button>
          <div className="w-full relative h-8">
            <kbd className="absolute top-2 right-2 text-end pointer-none inline-flex select-none items-center gap-1 px-1.5 text-xs font-medium text-muted-foreground">
              <span className="rounded border font-mono bg-muted px-1">
                ctrl
              </span>
              + B
            </kbd>
          </div>
        </SidebarHeader>

        <ScrollArea className="h-[1000px] w-full py-2 px-3 rounded-none">
          <SidebarGroup className="">
            <SidebarGroupContent className="mb-4">
              <Input
                value={searchTerm}
                placeholder="검색어를 입력하세요"
                className="border rounded-sm"
                autoFocus
                onChange={(e) =>
                  setSearchTerm(e.target.value.toLowerCase().trim())
                }
              />
            </SidebarGroupContent>

            <SidebarGroupLabel className="-ml-2 ">주제</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex flex-wrap gap-2 ">
                {tags.map((item) => (
                  <TagLink
                    key={item.name}
                    item={item}
                    selected={selectedTag === item.name}
                    onClick={() => setSelectedTag(item.name)}
                  />
                ))}
              </div>
            </SidebarGroupContent>

            <SidebarGroupLabel className="-ml-2 mt-5">
              떠오르는 기사
            </SidebarGroupLabel>
            <SidebarGroupContent className="">
              <div className="flex flex-col gap-2 ">
                <ul className="list-none space-y-4">
                  {posts.slice(0, 10).map((post, index) => (
                    <li key={post.slug} className="h-full w-full">
                      <Link
                        href={`/post/${post.slug}`}
                        // href={`/tag/${encodeURIComponent(item.name)}`}

                        className="flex gap-2 items-stretch justify-between"
                      >
                        <span className="text-[14px] h-full flex-1 tracking-tight line-clamp-3 postlists hover:underline">
                          {post.title}
                        </span>
                        <p className="flex items-end w-fit text-right text-xs text-muted-foreground tracking-tighter">
                          {timeAgoValues[index]}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
        <SidebarFooter className="h-12 pl-5">
          <ModeToggle />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
