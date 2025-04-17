import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export default function Loading() {
  return (
    <>
      <div className="grid grid-cols-1 lg:w-[1000px] w-screen sm:grid-cols-2 gap-5 mb-20">
        <div className="flex flex-col p-4 gap-3">
          <Skeleton className="aspect-video h-auto w-full rounded-lg" />
          <div className="flex flex-col w-full gap-2 items-start">
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-2/3 rounded-full" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </div>
        <div className="flex flex-col p-4 gap-3">
          <Skeleton className="aspect-video h-auto w-full rounded-lg" />
          <div className="flex flex-col w-full gap-2 items-start">
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-2/3 rounded-full" />
            <Skeleton className="h-5 w-1/3" />
          </div>
        </div>
      </div>
    </>
  );
}
