import { PreviewSkeleton } from '@/app/components/preview-skeleton';
import React from 'react';

export const MyPostSkeleton = () => {
  return (
    <div className="max-w-[1000px] mx-auto grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-20">
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
      <PreviewSkeleton />
    </div>
  );
};
