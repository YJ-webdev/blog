import Image from 'next/image';
import Link from 'next/link';

import { PostPreviewType } from './preview-main';

export const Preview = ({
  slug,
  title,
  image,
  content,
  publishedAt,
}: PostPreviewType) => {
  return (
    <Link
      href={`/post/${slug}`}
      className="flex flex-col gap-4 hover:cursor-pointer group"
    >
      <div className="relative w-full h-60">
        <Image
          src={image}
          alt="Preview"
          fill
          className="object-cover transition-all duration-300 group-hover:filter group-hover:brightness-110"
        />
      </div>

      <div className="flex flex-col group-hover:text-black dark:group-hover:text-white">
        <div className="flex flex-col  justify-between items-start">
          <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        </div>
        <p className="text-sm line-clamp-3">{content}</p>
        <p className="text-xs mt-2 italic w-full text-end">
          {publishedAt!.toDateString()}
        </p>
      </div>
    </Link>
  );
};
