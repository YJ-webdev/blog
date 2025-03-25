import Image from 'next/image';
import { PostPreviewType } from '../lib/types';
import Link from 'next/link';
import { formatDateWithoutYear } from '../lib/utils';

export const PostPreviewMain = ({
  slug,
  title,
  image,
  content,
  createdAt,
}: PostPreviewType) => {
  return (
    <Link href={`/post/${slug}`} className="grid grid-cols-1 gap-4 w-full">
      <div className="flex gap-5">
        <div className="flex flex-col h-80 gap-2 flex-1">
          <Image
            src={image || ''}
            alt={title || 'image-broken'}
            width={500}
            height={500}
            className="object-cover h-full w-full transition-all duration-300"
          />
        </div>{' '}
        <div className="flex flex-col h-80 gap-2 w-1/5 tracking-normal">
          <p className="text-sm">{content}</p>
          <p className="w-full text-xs/ text-end">
            {formatDateWithoutYear(createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};
