import Link from 'next/link';
import { PostPreviewType } from '../lib/types';
import { extractFirstParagraphText, timeAgo } from '../lib/utils';
import { JSONContent } from '@tiptap/core';

export const PostPreviewText = ({
  title,
  content,
  createdAt,
  tags,
  slug,
}: PostPreviewType) => {
  return (
    <Link
      href={`/post/${slug}`}
      className="flex flex-col mx-auto py-4 px-7 gap-2 h-full border-l group"
    >
      <h3 className="text-[18px] font-semibold group-hover:underline">
        {title}
      </h3>
      <p className="line-clamp-3 md:line-clamp-4">
        {' '}
        {extractFirstParagraphText(content as JSONContent)}
      </p>
      <div className="flex self-end text-xs font-light mt-auto pt-2">
        <p>{timeAgo(createdAt)}</p>{' '}
        {tags && (
          <p>
            <span className="mx-2">|</span>
            {tags?.[0].name}
          </p>
        )}
      </div>
    </Link>
  );
};
