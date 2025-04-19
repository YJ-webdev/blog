'use client';

import { type PostPreviewType } from '../lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { extractFirstParagraphText, timeAgo } from '../lib/utils';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { JSONContent } from '@tiptap/core';

export const PostPreviewCard = ({
  slug,
  title,
  tags,
  image,
  content,
  createdAt,
}: PostPreviewType) => {
  return (
    <Link
      href={`/post/${slug}`}
      className={cn(
        'flex md:flex-col flex-row w-screen md:w-full hover:cursor-pointer relative group p-4 gap-4 rounded-lg',
      )}
    >
      {image ? (
        <div className="w-[45%] md:w-full ">
          <Image
            src={image}
            alt="Preview"
            height={500}
            width={500}
            className="object-cover rounded-md md:rounded-none aspect-[3/2] md:aspect-video w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
          />
        </div>
      ) : (
        <Skeleton className="w-[45%] h-full rounded-lg" />
      )}

      <div className="flex-1 flex flex-col justify-between dark:text-zinc-200 group-hover:text-primary dark:group-hover:text-white">
        <div className="flex flex-col gap-2 justify-between items-start">
          <h3 className="w-full text-[18px] sm:text-xl font-semibold tracking-tight group-hover:underline">
            {title}
          </h3>{' '}
          <p className="hidden sm:block sm:line-clamp-2 md:line-clamp-none text-base truncate-text">
            {extractFirstParagraphText(content as JSONContent)}
          </p>
        </div>

        <div className="text-xs flex text-end min-w-fit mt-2 text-muted-foreground self-end">
          <p>{timeAgo(createdAt)}</p>{' '}
          {tags && (
            <p>
              <span className="mx-2">|</span>
              {tags?.[0].name}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostPreviewCard;
