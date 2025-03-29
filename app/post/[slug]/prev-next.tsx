'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PrevPostType } from '@/app/lib/types';
import { Post } from '@prisma/client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface PrevNextProps {
  prevPost?: PrevPostType;
  nextPost?: PrevPostType;
  post: Post;
}

export const PrevNext = ({ prevPost, nextPost, post }: PrevNextProps) => {
  // Prevents mismatched server & client rendering
  return (
    <div>
      {' '}
      {prevPost && (
        <HoverCard>
          <HoverCardTrigger asChild className="fixed bottom-20 left-0 z-30">
            <Link href={`/post/${prevPost.slug}`}>
              <button
                className={cn(
                  ' bg-white dark:bg-[#1f1f1f] p-3',
                  prevPost.id === post.id && 'hidden',
                )}
              >
                <ArrowLeft strokeWidth={1} className="md:size-14 sm:size-10" />
              </button>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="ml-2">
            <div className="flex flex-col gap-4">
              <p>{prevPost.title}</p>{' '}
              <div className="flex flex-wrap gap-2">
                {prevPost?.tags?.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="w-fit shadow-sm"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
      {nextPost && (
        <HoverCard>
          <HoverCardTrigger asChild className="fixed bottom-20 right-0 z-30 ">
            <Link href={`/post/${nextPost.slug}`}>
              <button
                className={cn(
                  ' bg-white dark:bg-[#1f1f1f] p-3',
                  !nextPost && 'hidden',
                )}
              >
                <ArrowRight strokeWidth={1} className="md:size-14 sm:size-10" />
              </button>
            </Link>
          </HoverCardTrigger>
          <HoverCardContent className="mr-2">
            <div className="flex flex-col gap-4">
              <p>{nextPost.title}</p>{' '}
              <div className="flex flex-wrap gap-2">
                {nextPost.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="outline"
                    className="w-fit shadow-sm"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
};
