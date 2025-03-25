import Image from 'next/image';
import Link from 'next/link';
import { PostPreviewType } from '../lib/types';
import { formatDateWithoutYear } from '../lib/utils';
import { cn } from '@/lib/utils';
import { SquarePen } from 'lucide-react';

export const PostPreviewCard = ({
  slug,
  title,
  image,
  content,
  createdAt,
  myPosts,
}: PostPreviewType) => {
  return (
    <>
      <Link
        href={`/post/${slug}`}
        className={cn(
          'flex flex-col w-full hover:cursor-pointer group relative group p-4 gap-3 rounded-lg',
          myPosts ? '' : '',
        )}
      >
        <div className="">
          <Image
            src={image || ''}
            alt="Preview"
            height={200}
            width={700}
            className="object-cover h-60 w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
          />
        </div>
        <div className="flex flex-col group-hover:text-black dark:group-hover:text-white gap-y-2">
          <div className="flex justify-between items-start">
            <h3 className="w-full text-lg font-semibold line-clamp-1">
              {title}
            </h3>
            <p className="text-xs font-light text-end min-w-fit">
              {formatDateWithoutYear(createdAt)}
            </p>
          </div>
          <p className="text-sm overflow-hidden">{content}</p>
        </div>

        {/* Display Edit icon on hover if it's my post */}
        {myPosts && (
          <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-white/30 dark:bg-[#1f1f1f]/50 rounded-lg">
            <div className="rounded-full bg-white dark:bg-[#1f1f1f]">
              <SquarePen className="p-4" size={56} />
            </div>
          </div>
        )}
      </Link>
    </>
  );
};

export default PostPreviewCard;
