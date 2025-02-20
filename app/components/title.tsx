'use client';

import { usePathname } from 'next/navigation';
import TextareaAutosize from 'react-textarea-autosize';

export const Title = () => {
  const pathname = usePathname();

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
      ) : (
        'Bravura.'
      )}
    </h1>
  );
};
