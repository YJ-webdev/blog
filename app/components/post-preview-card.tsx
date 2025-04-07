'use client';

import { type PostPreviewType } from '../lib/types';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDateWithoutYear } from '../lib/utils';
import { cn } from '@/lib/utils';
import { PreviewSkeleton } from './preview-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export const PostPreviewCard = ({
  slug,
  title,
  image,
  content,
  createdAt,
}: PostPreviewType) => {
  return (
    <Suspense fallback={<PreviewSkeleton />}>
      <Link
        href={`/post/${slug}`}
        className={cn(
          'flex flex-col w-full hover:cursor-pointer group relative group p-4 gap-3 rounded-lg',
        )}
      >
        <div className="w-full h-60">
          {image ? (
            <Image
              src={image}
              alt="Preview"
              loading="eager"
              height={500}
              width={500}
              className="object-cover h-full w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
            />
          ) : (
            <Skeleton className="h-full w-full" />
          )}
        </div>

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
    </Suspense>
  );
};

export default PostPreviewCard;
