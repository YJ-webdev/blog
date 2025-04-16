'use client';

import { type PostPreviewType } from '../lib/types';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateWithoutYear, extractFirstParagraphText } from '../lib/utils';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { JSONContent } from '@tiptap/core';

export const PostPreviewCard = ({
  slug,
  title,
  image,
  content,
  createdAt,
}: PostPreviewType) => {
  return (
    <Link
      href={`/post/${slug}`}
      className={cn(
        'flex flex-col w-full hover:cursor-pointer group relative group p-4 gap-3 rounded-lg',
      )}
    >
      <Suspense
        fallback={<Skeleton className="h-[300px] w-[500px] rounded-lg" />}
      >
        <div className="w-full h-60">
          <Image
            src={image || '/images/no-image.png'}
            alt="Preview"
            height={500}
            width={500}
            className="object-cover h-full w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
          />
        </div>{' '}
      </Suspense>

      <div className="flex flex-col dark:text-zinc-200 group-hover:text-primary dark:group-hover:text-white gap-y-2">
        <div className="flex justify-between items-start">
          <h3 className="w-full text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-xs font-light text-end min-w-fit">
            {formatDateWithoutYear(createdAt)}
          </p>
        </div>
        <p className="text-sm/[23px] overflow-hidden ">
          {extractFirstParagraphText(content as JSONContent)}
        </p>
      </div>
    </Link>
  );
};

export default PostPreviewCard;
