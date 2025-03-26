'use client';

import { PanelLeft, PanelLeftDashed } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';
import { items } from '../lib/data';
import { PostPreviewType } from '../lib/types';
import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function AppSidebar({ posts }: { posts: PostPreviewType[] }) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { open, setOpen, toggleSidebar } = useSidebar();

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="hidden md:block fixed top-5 left-5 z-10"
      >
        {!open && <PanelLeft />}
      </button>
      <Sidebar>
        <SidebarHeader className="hidden md:block">
          <button
            onClick={toggleSidebar}
            className="hidden md:block fixed top-5 left-5 z-10"
          >
            {open ? <PanelLeftDashed /> : null}
          </button>
          <div className="w-full relative h-12">
            <kbd className="absolute top-3 right-2 text-end pointer-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground">
              <span className="">ctrl</span> + b
            </kbd>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="ml-1">주제</SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex flex-wrap gap-2 ml-2">
                {items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSelectedTag(item.name)}
                    className={cn(
                      'rounded-full shadow-sm bg-muted py-2 px-3 w-fit hover:bg-primary/10 hover:text-zinc-600 dark:hover:bg-zinc-800',
                      selectedTag === item.name &&
                        'bg-black text-white dark:bg-white dark:text-black border-none',
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </SidebarGroupContent>

            <SidebarGroupLabel className="mt-5 ml-1">
              떠오르는 기사
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <div className="flex flex-col gap-2 ml-3 mr-2">
                <ul className="list-none space-y-3">
                  {posts.slice(0, 10).map((post) => (
                    <li key={post.id}>
                      <Link href={`/post/${post.slug}`}>
                        <p className="text-[15px] tracking-tight line-clamp-2 hover:underline">
                          {post.title}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </SidebarGroupContent>
            <SidebarGroupContent>
              <div className="min-h-10"></div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="h-12 pl-5">
          <ModeToggle />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
