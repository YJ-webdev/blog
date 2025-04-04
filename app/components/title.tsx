'use client';

import { usePathname } from 'next/navigation';

export const Title = () => {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);
  const slug = segments.length > 1 ? decodeURIComponent(segments[1]) : null;

  const formatSlug = (slug: string) => {
    return slug.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <div className="pt-2 sm:pt-4  px-4 max-w-[1000px] mx-auto w-full">
      <h1 className="font-bold lg:text-6xl sm:text-5xl text-[2.25rem]">
        {pathname === '/my-posts' && '내 포스트'}
        {pathname === '/' && '레인지 저널'}
        {pathname.includes('/tag') && slug && formatSlug(slug)}
        {!['/my-posts', '/edit', '/'].includes(pathname) &&
          !pathname.includes('/tag') &&
          '레인지 저널'}
      </h1>
    </div>
  );
};
