import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col md:w-[1000px] gap-4 mt-5 px-4 mx-auto">
      <Skeleton className="w-full max-w-[1000px] h-10 rounded-full" />
      <Skeleton className="w-2/3 max-w-[1000px] h-10 rounded-full" />

      <div className="flex flex-col gap-4 max-w-[750px] w-full px-4 mx-auto">
        <Skeleton className="h-[350px] rounded-lg" />
        <Skeleton className="h-6 rounded-full" />
        <Skeleton className="h-6 rounded-full" />
        <Skeleton className="h-6 w-3/5 rounded-full" />
        <Skeleton className="h-6 w-2/5 rounded-full" />
        <Skeleton className="h-6 w-1/3 rounded-full" />
        <Skeleton className="h-6 w-1/3 rounded-full" />
      </div>
    </div>
  );
}
