import Image from 'next/image';
import Link from 'next/link';
import { Prisma } from '@prisma/client';

export type PostPreviewType = Prisma.PostGetPayload<{
  select: {
    slug: true;
    title: true;
    image: true;
    content: true;
    publishedAt: true;
  };
}>;

export const PreviewMain = ({
  slug,
  title,
  image,
  content,
  publishedAt,
}: PostPreviewType) => {
  return (
    <Link
      href={`/post/${slug}`}
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

      <div className="w-full h-fit flex flex-col text-primary group-hover:text-black dark:group-hover:text-white">
        <div className="flex justify-between items-start">
          <h3 className="w-full text-lg font-semibold">{title}</h3>{' '}
          <p className="text-xs italic min-w-fit text-end">
            {publishedAt!.toDateString()}
          </p>
        </div>
        <p className="text-sm overflow-hidden line-clamp-2">{content}</p>
      </div>
    </Link>
  );
};
