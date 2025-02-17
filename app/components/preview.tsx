import Image from 'next/image';
import Link from 'next/link';

export const Preview = () => {
  return (
    <Link href="/post/1" className="flex flex-col gap-4 hover:cursor-pointer">
      <div className="relative w-full h-60">
        <Image
          src="/preview-image.jpg"
          alt="Preview"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col mt-2">
        <div className="flex justify-between items-start">
          <h3 className=" text-lg">Title</h3>
          <p className="text-muted-foreground text-xs">2025-03-03</p>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corrupti
          quidem exercitationem commodi reprehenderit voluptatem laboriosam quis
          cupiditate ut repellat iste, illo ipsa in iusto voluptas voluptatum
          ipsam reiciendis vitae nihil.
        </p>
      </div>
    </Link>
  );
};
