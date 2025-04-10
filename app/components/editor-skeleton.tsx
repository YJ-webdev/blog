import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export const EditorSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-full h-6 rounded-full" />
      <Skeleton className="w-1/3 h-6 rounded-full" />
    </div>
  );
};
