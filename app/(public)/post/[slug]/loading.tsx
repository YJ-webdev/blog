import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <>
      <div className="hidden md:flex flex-col gap-4 w-full mt-5 px-4 mx-auto">
        <Skeleton className="w-[1000px] h-10 rounded-full" />
        <Skeleton className="w-2/3 h-10 rounded-full" />

        <div className="flex flex-col gap-4 w-[750px] px-4 mx-auto">
          <Skeleton className="h-[350px] rounded-lg" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 rounded-full" />
          <Skeleton className="h-6 w-3/5 rounded-full" />
          <Skeleton className="h-6 w-2/5 rounded-full" />
          <Skeleton className="h-6 w-1/3 rounded-full" />
          <Skeleton className="h-6 w-1/3 rounded-full" />
        </div>
        <div className="md:hidden flex flex-col w-full hover:cursor-pointer group relative group p-4 gap-3 rounded-lg">
          <Skeleton className="h-60 w-full rounded-lg" />
          <div className="flex flex-col gap-2 items-start">
            <div className="flex justify-between gap-3 items-start">
              <Skeleton className="h-5 w-[600px] rounded-full" />
              <Skeleton className="h-3 w-[20px] rounded-full" />
            </div>
            <Skeleton className="h-5 w-[300px] rounded-full" />
            <Skeleton className="h-5 w-[200px]" />
          </div>
        </div>
      </div>
    </>
  );
}
