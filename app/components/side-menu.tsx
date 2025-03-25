'use client';

import { useState, useEffect } from 'react';
import { getPosts } from '../lib/actions/post';

import { ModeToggle } from './mode-toggle';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PostPreviewType } from '../lib/types';

const menuItems = [
  { name: '종교', href: '/' },
  { name: '요리', href: '/about' },
  { name: '다이어트', href: '/logout' },
  { name: '운동', href: '/logout' },
  { name: '건강', href: '/logout' },
  { name: '웰빙', href: '/logout' },
  { name: '여행', href: '/logout' },
  { name: '라이프스타일', href: '/logout' },
  { name: 'DIY', href: '/logout' },
  { name: '문화생활', href: '/logout' },
  { name: '사회', href: '/logout' },
  { name: '역사', href: '/logout' },
  { name: '자기개발', href: '/logout' },
  { name: '금융', href: '/logout' },
  { name: '음악', href: '/logout' },
  { name: '신화', href: '/logout' },
  { name: '미스테리', href: '/logout' },
];

export const SideMenu = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<PostPreviewType | null>(
    null,
  );
  const [posts, setPosts] = useState<PostPreviewType[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const handlePostClick = (post: PostPreviewType) => {
    setSelectedPost(post);
  };

  return (
    <div className="h-screen fixed flex bg-zinc-100 flex-col dark:bg-zinc-800 w-[270px]">
      <ScrollArea className="h-screen w-[270px] rounded-md border">
        <div className="relative flex-1 m-6 mt-14 gap-5 flex flex-col pb-14">
          <Input className="border-none" />
          <SearchIcon className="w-5 h-5 z-[9999] absolute top-[10px] right-3 cursor-pointer" />

          <div className="flex flex-col gap-2 w-full">
            <p className="font-semibold mb-2">키워드</p>
            <div className="flex w-full gap-2 flex-wrap">
              {menuItems.map((item) => {
                return (
                  <div
                    key={item.name}
                    className={cn(
                      'w-fit text-nowrap rounded-full bg-white dark:bg-[#1f1f1f] p-2 flex flex-wrap cursor-pointer transition-all duration-100',
                      selectedTag === item.name
                        ? 'bg-primary dark:bg-primary text-white dark:text-black'
                        : '',
                    )}
                    onClick={() => handleTagClick(item.name)} // Use handleClick here
                  >
                    <p
                      className={cn(
                        'text-sm  hover:text-muted-foreground transition-all duration-100',
                        selectedTag === item.name
                          ? ' text-white dark:text-black font-semibold'
                          : '',
                      )}
                    >
                      {item.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-2 w-full">
            <p className="font-semibold mb-2">떠오르는 기사</p>
            <div className="flex w-full gap-4 flex-wrap">
              {posts.map((post) => {
                return (
                  <div
                    key={post.title}
                    className={cn(
                      'w-fit flex flex-col cursor-pointer transition-all duration-100 hover:underline',
                      selectedPost === post ? ' font-medium' : 'font-normal',
                    )}
                    onClick={() => handlePostClick(post)} // Use handleClick here
                  >
                    <p
                      className={cn(
                        'line-clamp-1  text-sm  hover:text-muted-foreground transition-all duration-100',
                        selectedPost === post
                          ? ' font-semibold'
                          : 'font-normal',
                      )}
                    >
                      {post.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 w-full h-fit overflow-hidden bg-gradient-to-t from-zinc-100 dark:from-[#1f1f1f]  to-transparent to-90%">
          <ModeToggle />
        </div>
      </ScrollArea>
    </div>
  );
};
