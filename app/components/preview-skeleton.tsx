import { Skeleton } from '@/components/ui/skeleton';

export const PreviewSkeleton = () => {
  return (
    <div className="flex flex-col w-full hover:cursor-pointer group relative group p-4 gap-3 rounded-lg">
      <Skeleton className="h-60 w-full rounded-lg" />

      <div className="flex flex-col gap-2 items-start">
        <div className="flex justify-between gap-2 items-start">
          <Skeleton className="h-4 w-[300px] rounded-full" />
          <Skeleton className="h-2 w-[300px] rounded-full" />
        </div>
        <Skeleton className="h-4 w-[300px] rounded-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};
