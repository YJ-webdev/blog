import Image from 'next/image';
import Link from 'next/link';
import { extractFirstParagraphText, timeAgo } from '../lib/utils';
import { PostPreviewType } from '../lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { JSONContent } from '@tiptap/core';

export const PostPreviewMain = ({
  slug,
  title,
  image,
  content,
  createdAt,
  tags,
}: PostPreviewType) => {
  return (
    <Link
      href={`/post/${slug}`}
      className="flex flex-col md:flex-row gap-3 md:gap-10 w-full h-full py-4 md:p-4 group "
    >
      {image ? (
        <Image
          src={image || ''}
          alt={title || 'image-broken'}
          width={500}
          height={500}
          className="object-cover h-60 md:h-80 w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
        />
      ) : (
        <Skeleton className="h-60 md:h-80 w-full rouned-lg" />
      )}

      <div className="flex flex-col md:h-80 md:w-[30%] md:min-w-[28%] px-4 md:px-0">
        <div className="w-full flex flex-col gap-2">
          <h3 className="font-semibold text-xl md:text-3xl line-clamp-3 h-fit group-hover:underline">
            {title}
          </h3>
          <p className="line-clamp-2 md:h-30 overflow-hidden md:line-clamp-[8] mb-2">
            {extractFirstParagraphText(content as JSONContent)}
          </p>
        </div>
        <div className="text-xs flex font-light text-end min-w-fit h-fit justify-end self-end mt-auto">
          <p>
            {timeAgo(createdAt)}
            {tags && tags[0] && (
              <>
                <span className="px-2">|</span>
                {tags[0].name}
              </>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};
