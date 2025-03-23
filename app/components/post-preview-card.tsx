import Image from 'next/image';
import Link from 'next/link';
import { PostPreviewType } from '../lib/types';
import { formatDateWithoutYear } from '../lib/utils';

export const PostPreviewCard = ({
  id,
  title,
  image,
  content,
  publishedAt,
}: PostPreviewType) => {
  return (
    <Link
      href={`/post/${id}`}
      className="flex flex-col gap-4 w-full h-[400px] hover:cursor-pointer group relative"
    >
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt="Preview"
          fill
          className="object-cover transition-all duration-300 group-hover:filter group-hover:brightness-110"
        />
      </div>
      <div className="flex flex-col text-primary group-hover:text-black dark:group-hover:text-white gap-y-2">
        <div className="flex justify-between items-start">
          <h3 className="w-full text-lg font-semibold line-clamp-1">{title}</h3>
          <p className="text-xs text-end min-w-fit">
            {formatDateWithoutYear(publishedAt)}
          </p>
        </div>
        <p className="text-sm overflow-hidden">{content}</p>
      </div>
    </Link>
  );
};

export default PostPreviewCard;
