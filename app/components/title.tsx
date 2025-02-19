'use client';

import { usePathname } from 'next/navigation';

export const Title = () => {
  const pathname = usePathname();

  return (
    <h1 className="font-bold md:text-6xl text-5xl flex-1">
      {pathname === '/about' ? 'About' : 'Bravura'}
      <span>.</span>
    </h1>
  );
};
