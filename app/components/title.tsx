'use client';

import { usePathname } from 'next/navigation';

export const Title = ({ userId }: { userId?: string }) => {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const slug = segments.length > 1 ? decodeURIComponent(segments[1]) : null;

  const formatSlug = (slug: string) => {
    return slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <div className="mt-5 px-4 bg-white dark:bg-[#1f1f1f] max-w-[1000px] mx-auto w-full">
      {slug &&
        slug !== userId && ( // Ensure slug is not null before comparison
          <h1 className="font-bold md:text-6xl text-5xl">{formatSlug(slug)}</h1>
        )}

      {!slug && (
        <h1 className="font-bold md:text-6xl text-5xl">
          {pathname === '/my-posts' ? <>내 포스트</> : <>레인지 저널.</>}
        </h1>
      )}
    </div>
  );
};
