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
    <div className="mt-5">
      {pathname.startsWith('/post/') && pathname.length > 6 ? (
        ''
      ) : slug ? (
        formatSlug(slug)
      ) : (
        <h1 className="font-bold md:text-6xl text-5xl">
          2025년 주목해야할 트렌드.
        </h1>
      )}
    </div>
  );
};
