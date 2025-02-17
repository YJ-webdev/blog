'use client';

import Link from 'next/link';
import { ModeToggle } from './mode-toggle';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-start py-10">
      <h1 className="font-bold md:text-6xl text-5xl flex-1">
        {pathname === '/about' ? 'About' : 'Bravura'}
        <span>.</span>
      </h1>
      <div className="flex justify-end gap-x-4">
        <Link href="/">Blog</Link>
        <Link href="/about">About</Link>
        <ModeToggle />
      </div>
    </div>
  );
}
