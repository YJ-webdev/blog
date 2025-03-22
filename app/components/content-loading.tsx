import { Skeleton } from '@/components/ui/skeleton';

export const ContentLoading = () => {
  return (
    <div className="flex flex-col items-start w-full gap-3">
      <Skeleton className="w-full h-[20px] rounded-full" />
      <Skeleton className="w-full h-[20px] rounded-full" />
      <Skeleton className="w-full h-[20px] rounded-full" />
      <Skeleton className="w-full h-[20px] rounded-full" />
      <Skeleton className="w-1/2 h-[20px] rounded-full" />
    </div>
  );
};
