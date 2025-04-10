import { PreviewSkeleton } from '@/app/components/preview-skeleton';
import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 mb-20">
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
    </div>
  );
}
