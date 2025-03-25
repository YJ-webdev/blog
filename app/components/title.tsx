'use client';

import { usePathname } from 'next/navigation';

export const Title = () => {
  const pathname = usePathname();

  // Extract the slug from the pathname (assuming "/post/:slug" structure)
  const segments = pathname.split('/').filter(Boolean); // Remove empty segments
  const slug = segments.length > 1 ? decodeURIComponent(segments[1]) : null; // Extract second segment

  const formatSlug = (slug: string) => {
    return slug
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize first letter
  };

  return (
    <div className="mt-5 px-4 bg-white dark:bg-[#1f1f1f] max-w-[1000px] mx-auto w-full">
      {slug !== 'new-post' && (
        <h1 className="font-bold md:text-6xl text-5xl">
          {slug ? (
            formatSlug(slug)
          ) : pathname === '/my-posts' ? (
            <>내 포스트</>
          ) : (
            <>레인지 저널.</>
          )}
        </h1>
      )}
    </div>
  );
};
