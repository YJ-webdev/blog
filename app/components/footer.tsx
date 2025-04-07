'use client';

import { AffiliateLink } from '@/app/components/affiliate-link';

export default function Footer() {
  return (
    <footer className="max-w-[750px] mx-auto px-4 h-50 flex flex-col items-center gap-2 mb-2 mt-8">
      <AffiliateLink />
      <p className="text-muted-foreground text-xs md:text-sm text-center mt-16 md:mt-10">
        All rights reserved @2025
      </p>
    </footer>
  );
}
