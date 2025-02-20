'use client';

import { usePathname } from 'next/navigation';
import TextareaAutosize from 'react-textarea-autosize';

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
    <h1 className="font-bold md:text-6xl text-5xl flex-1">
      {pathname === '/about' ? (
        'About.'
      ) : pathname === '/new-post' ? (
        <TextareaAutosize
          placeholder="Title"
          autoFocus
          className="w-fit resize-none overflow-hidden bg-transparent text-6xl font-bold focus:outline-none text-primary dark:placeholder-stone-400"
        />
      ) : slug ? (
        formatSlug(slug)
      ) : (
        'Bravura.'
      )}
    </h1>
  );
};
