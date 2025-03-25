'use client';

import { AffiliateLink } from '@/app/components/affiliate-link';
import { useParams } from 'next/navigation';

export default function Footer() {
  const params = useParams();

  return (
    <footer className="max-w-[750px] mx-auto px-4 h-50 flex flex-col items-center gap-2 mb-5">
      {params?.slug ? null : <AffiliateLink />}
      <p className="text-muted-foreground text-xs md:text-sm text-center mt-10">
        All rights reserved @2025
      </p>
    </footer>
  );
}
