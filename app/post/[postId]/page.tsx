import Image from 'next/image';

export default function BlogIdPage() {
  return (
    <div className="max-w-[750px] mx-auto flex flex-col md:gap-14 gap-10">
      <div className="relative w-full md:h-96 h-72">
        <Image src="/preview-image.jpg" alt="Preview" fill objectFit="cover" />
      </div>{' '}
      <div className="flex flex-col gap-4">
        <p className="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste sint
          nam quasi molestias ad tempore veritatis pariatur. Sunt ea
          consequuntur quod saepe, facere deserunt modi eveniet vel possimus
          libero alias. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Iste sint nam quasi molestias ad tempore veritatis pariatur.
          Sunt ea consequuntur quod saepe, facere deserunt modi eveniet vel
          possimus libero alias. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Iste sint nam quasi molestias ad tempore veritatis
          pariatur. Sunt ea consequuntur quod saepe, facere deserunt modi
          eveniet vel possimus libero alias. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Iste sint nam quasi molestias ad tempore
          veritatis pariatur. Sunt ea consequuntur quod saepe, facere deserunt
          modi eveniet vel possimus libero alias.
        </p>{' '}
        <p className="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste sint
          nam quasi molestias ad tempore veritatis pariatur. Sunt ea
          consequuntur quod saepe, facere deserunt modi eveniet vel possimus
          libero alias. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Iste sint nam quasi molestias ad tempore veritatis pariatur.
          Sunt ea consequuntur quod saepe, facere deserunt modi eveniet vel
          possimus libero alias. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Iste sint nam quasi molestias ad tempore veritatis
          pariatur. Sunt ea consequuntur quod saepe, facere deserunt modi
          eveniet vel possimus libero alias. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Iste sint nam quasi molestias ad tempore
          veritatis pariatur. Sunt ea consequuntur quod saepe, facere deserunt
          modi eveniet vel possimus libero alias.
        </p>{' '}
        <p className="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste sint
          nam quasi molestias ad tempore veritatis pariatur. Sunt ea
          consequuntur quod saepe, facere deserunt modi eveniet vel possimus
          libero alias. Lorem ipsum, dolor sit amet consectetur adipisicing
          elit. Iste sint nam quasi molestias ad tempore veritatis pariatur.
          Sunt ea consequuntur quod saepe, facere deserunt modi eveniet vel
          possimus libero alias. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Iste sint nam quasi molestias ad tempore veritatis
          pariatur. Sunt ea consequuntur quod saepe, facere deserunt modi
          eveniet vel possimus libero alias. Lorem ipsum, dolor sit amet
          consectetur adipisicing elit. Iste sint nam quasi molestias ad tempore
          veritatis pariatur. Sunt ea consequuntur quod saepe, facere deserunt
          modi eveniet vel possimus libero alias.
        </p>
      </div>
    </div>
  );
}
