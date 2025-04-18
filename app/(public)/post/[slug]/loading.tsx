import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      {/* on desktop */}
      <div className="hidden md:flex flex-col gap-4 w-screen mt-5 -mx-4">
        <div className="flex flex-col gap-4 w-[750px] mx-auto">
          <Skeleton className="w-full aspect-video rounded-lg" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 w-3/5 rounded-full" />
          <Skeleton className="h-6 w-2/5 rounded-full" />
          <Skeleton className="h-6 w-1/3 rounded-full" />
          <Skeleton className="h-6 w-1/3 rounded-full" />
        </div>
      </div>
      {/* on mobile */}
      <div className="flex md:hidden w-screen mx-auto">
        <div className="flex flex-col w-full hover:cursor-pointer group relative group p-4 gap-3 rounded-lg">
          <Skeleton className="aspect-video w-full rounded-lg" />
          <div className="flex flex-col gap-2 items-start">
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-full rounded-full" />
            <Skeleton className="h-5 w-[300px] rounded-full" />
            <Skeleton className="h-5 w-[200px]" />
          </div>
        </div>
      </div>
    </>
  );
}
