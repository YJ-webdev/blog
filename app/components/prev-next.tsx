'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PrevPostType } from '@/app/lib/types';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';

interface PrevNextProps {
  prevPost?: PrevPostType;
  nextPost?: PrevPostType;
}

export const PrevNext = ({ prevPost, nextPost }: PrevNextProps) => {
  // Prevents mismatched server & client rendering
  return (
    <div>
      {' '}
      {prevPost && (
        <HoverCard>
          <HoverCardTrigger asChild className="fixed bottom-20 left-0 z-30">
            <Link
              href={`/post/${prevPost.slug}`}
              className="bg-white dark:bg-[#1f1f1f] p-3"
            >
              <ArrowLeft
                strokeWidth={1}
                className="md:size-14 sm:size-10 hover:-translate-x-1 transition-all duration-100"
              />
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
        <HoverCard openDelay={0} closeDelay={100}>
          <HoverCardTrigger asChild className="fixed bottom-20 right-0 z-30">
            <Link
              href={`/post/${nextPost.slug}`}
              className="bg-white dark:bg-[#1f1f1f] p-3"
            >
              <ArrowRight
                strokeWidth={1}
                className="md:size-14 sm:size-10 hover:translate-x-1 transition-all"
              />
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
