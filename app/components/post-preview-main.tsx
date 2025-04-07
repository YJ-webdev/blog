import Image from 'next/image';
import Link from 'next/link';
import { formatDateWithoutYear } from '../lib/utils';
import { PostPreviewType } from '../lib/types';
import { Suspense } from 'react';
import { PreviewSkeleton } from './preview-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export const PostPreviewMain = ({
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
        className="flex flex-col md:flex-row gap-4 w-full p-4 group"
      >
        <Suspense
          fallback={<Skeleton className="h-60 md:h-80 w-full rouned-lg" />}
        >
          <Image
            src={image || ''}
            alt={title || 'image-broken'}
            width={500}
            height={500}
            loading="eager"
            className="object-cover h-60 md:h-80 w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
          />
        </Suspense>

        <div className="flex flex-col md:h-80 md:w-2/5">
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg line-clamp-1 sm:line-clamp-3">
                {title}
              </h3>
              <p className="md:hidden text-xs font-light text-end min-w-fit">
                {formatDateWithoutYear(createdAt)}
              </p>
            </div>

            <p className="text-sm/[23px] truncate-text">{content}</p>
          </div>
          <p className="hidden md:block text-xs font-light text-end min-w-fit">
            {formatDateWithoutYear(createdAt)}
          </p>
        </div>
      </Link>
    </Suspense>
  );
};
