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
    <div className="mt-3 px-2 bg-white dark:bg-[#1f1f1f] max-w-[1000px] mx-auto w-full">
      <h1 className="font-bold md:text-6xl text-5xl">
        {pathname === '/my-posts' && '내 포스트'}
        {pathname === '/' && '레인지 저널'}
        {pathname.includes('/tag') && slug && formatSlug(slug)}
        {!['/my-posts', '/edit', '/'].includes(pathname) &&
          !pathname.includes('/new-post') &&
          !pathname.includes('/tag') &&
          !pathname.includes('/edit') &&
          !pathname.includes('/post') &&
          '레인지 저널'}
      </h1>
    </div>
  );
};
