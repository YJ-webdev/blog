'use client';

import { type PostPreviewType } from '../lib/types';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateWithoutYear } from '../lib/utils';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const PostPreviewCard = ({
  slug,
  title,
  image,
  content,
  createdAt,
}: PostPreviewType) => {
  return (
    <>
      <Link
        href={`/post/${slug}`}
        className={cn(
          'flex flex-col w-full hover:cursor-pointer group relative group p-4 gap-3 rounded-lg',
        )}
      >
        <Suspense fallback={<Skeleton className="h-full w-full" />}>
          <Image
            src={image || ''}
            alt="Preview"
            height={200}
            width={700}
            className="object-cover h-60 w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
          />
        </Suspense>
        <div className="flex flex-col dark:text-zinc-200 group-hover:text-primary dark:group-hover:text-white gap-y-2">
          <div className="flex justify-between items-start">
            <h3 className="w-full text-lg font-semibold line-clamp-1">
              {title}
            </h3>
            <p className="text-xs font-light text-end min-w-fit">
              {formatDateWithoutYear(createdAt)}
            </p>
          </div>
          <p className="text-sm/[23px] overflow-hidden ">{content}</p>
        </div>
      </Link>
    </>
  );
};

export default PostPreviewCard;
