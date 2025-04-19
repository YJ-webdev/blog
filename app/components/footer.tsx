'use client';

import { AffiliateLink } from '@/app/components/affiliate-link';
import { useEffect, useState } from 'react';

export default function Footer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;

  return (
    <footer className="max-w-[750px] mx-auto px-4 h-50 flex flex-col items-center gap-2 mb-2 mt-16 md:mt-20">
      <AffiliateLink />
      <p className="text-muted-foreground text-xs md:text-sm text-center mt-16 md:mt-20">
        All rights reserved @2025
      </p>
    </footer>
  );
}
