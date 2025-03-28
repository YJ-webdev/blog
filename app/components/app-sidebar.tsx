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
import { useState } from 'react';
import { timeAgo } from '../lib/utils';
import { Tag } from '@prisma/client';
import { SidebarPostType } from '../lib/types';
import { TagLink } from './tag-button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface AppSidebarProps {
  posts: SidebarPostType[];
  tags: Tag[];
}

export function AppSidebar({ posts, tags }: AppSidebarProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { open, setOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="hidden md:block fixed top-5 left-5 z-10"
      >
        {!open && <PanelLeft strokeWidth={1.5} />}
      </button>
      <Sidebar>
        <SidebarHeader className="hidden md:block ">
          <button
            onClick={toggleSidebar}
            className="hidden md:block fixed top-5 left-5 z-10"
          >
            {open ? <PanelLeftDashed strokeWidth={1.5} /> : null}
          </button>
          <div className="w-full relative h-8">
            <kbd className="absolute top-4 right-2 text-end pointer-none inline-flex select-none items-center gap-1 px-1.5 text-xs font-medium text-muted-foreground">
              <span className="rounded border font-mono bg-muted px-1">
                ctrl
              </span>
              + B
            </kbd>
          </div>
        </SidebarHeader>

        <ScrollArea className="h-[1000px] w-full py-2 pl-3 pr-5 rounded-none">
          <SidebarGroup>
            <SidebarGroupLabel className="-ml-2">주제</SidebarGroupLabel>
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
            <SidebarGroupContent>
              <div className="flex flex-col gap-2 ">
                <ul className="list-none space-y-4">
                  {posts.slice(0, 10).map((post) => (
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
                          {timeAgo(post.createdAt)}
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
