'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="w-[1000px] p-4 mt-10 space-y-4">
      {/* Search + Sort Bar */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-[300px] rounded-sm bg-muted" />
        <Skeleton className="h-6 w-[100px] rounded-sm bg-muted" />
      </div>

      {/* Skeleton Rows */}
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-6 gap-4 px-4 py-3 items-center"
          >
            <Skeleton className="h-4 w-12" /> {/* View Count */}
            <Skeleton className="h-6 w-16 rounded-md" /> {/* Image */}
            <Skeleton className="h-4 w-40" /> {/* Title */}
            <Skeleton className="h-4 w-24" /> {/* Links */}
            <Skeleton className="h-4 w-16" /> {/* Tags or Published */}
            <Skeleton className="h-8 w-8 rounded-md" /> {/* Actions */}
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end space-x-2 pt-4">
        <Skeleton className="h-8 w-[80px]" />
        <Skeleton className="h-8 w-[80px]" />
      </div>
    </div>
  );
}
