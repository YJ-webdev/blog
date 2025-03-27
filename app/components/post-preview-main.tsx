import Image from 'next/image';
import Link from 'next/link';
import { formatDateWithoutYear } from '../lib/utils';
import { PostPreviewType } from '../lib/types';

export const PostPreviewMain = ({
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
        className="hidden sm:grid grid-cols-1 gap-4 w-full p-4 group"
      >
        <div className="flex gap-6">
          <div className="flex flex-col h-80 gap-2 flex-1">
            <Image
              src={image || ''}
              alt={title || 'image-broken'}
              width={500}
              height={500}
              className="object-cover h-full w-full transition-all duration-300 group-hover:filter group-hover:brightness-110"
            />
          </div>
          <div className="flex flex-col h-80 gap-2 sm:w-[200px] md:w-[250px]">
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="font-semibold text-lg h-fit">{title}</h3>
              <p className="text-sm truncate-text flex-1">{content}</p>
            </div>
            <p className="w-full text-xs text-end h-10">
              {formatDateWithoutYear(createdAt)}
            </p>
          </div>
        </div>
      </Link>

      <Link
        href={`/post/${slug}`}
        className="sm:hidden flex flex-col w-full hover:cursor-pointer group relative p-4 gap-3"
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
      </Link>
    </>
  );
};
