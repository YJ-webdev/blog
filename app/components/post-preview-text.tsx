import { PostPreviewType } from '../lib/types';
import { extractFirstParagraphText, timeAgo } from '../lib/utils';
import { JSONContent } from '@tiptap/core';

export const PostPreviewText = ({
  title,
  content,
  createdAt,
  tags,
}: PostPreviewType) => {
  return (
    <div className="flex flex-col mx-4 gap-1 h-full">
      <h3 className="text-[18px] font-semibold">{title}</h3>
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
    </div>
  );
};
