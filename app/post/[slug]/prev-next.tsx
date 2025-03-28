import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { PrevPostType } from '@/app/lib/types';
import { Post, Tag } from '@prisma/client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface PrevNextProps {
  prevPost: PrevPostType & { tags: Tag[] };
  nextPost: PrevPostType & { tags: Tag[] };
  post: Post;
}

export const PrevNext = ({ prevPost, nextPost, post }: PrevNextProps) => {
  return (
    <div>
      {' '}
      {prevPost && (
        <Link href={`/post/${prevPost.slug}`}>
          {' '}
          <HoverCard>
            <HoverCardTrigger className="fixed bottom-20 left-0 z-[50]">
              <button
                className={cn(
                  ' bg-white dark:bg-[#1f1f1f] p-3',
                  prevPost.id === post.id && 'hidden',
                )}
              >
                <ArrowLeft strokeWidth={1} className="md:size-14 sm:size-10" />
              </button>{' '}
            </HoverCardTrigger>
            <HoverCardContent className="ml-2">
              <div className="flex flex-col gap-4">
                <p>{prevPost.title}</p>{' '}
                <div className="flex flex-wrap gap-2">
                  {prevPost.tags.map((tag) => (
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
        </Link>
      )}
      {nextPost.published && (
        <Link href={`/post/${nextPost.slug}`}>
          <HoverCard>
            <HoverCardTrigger className="fixed bottom-20 right-0 ">
              <button
                className={cn(
                  ' bg-white dark:bg-[#1f1f1f] p-3',
                  !nextPost.published && 'hidden',
                )}
              >
                <ArrowRight strokeWidth={1} className="md:size-14 sm:size-10" />
              </button>
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
        </Link>
      )}
    </div>
  );
};
