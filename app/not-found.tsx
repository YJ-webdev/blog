import Link from 'next/link';
import { BadgeInfo } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="h-full w-full">
      <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-full max-w-md">
        <div className="flex flex-col items-center justify-center gap-2 w-full text-center mb-10">
          <h2 className="-translate-x-2 inline-flex text-muted-foreground gap-2 text-xs">
            <BadgeInfo className="h-4 w-4" strokeWidth={1} />
            Page Not Found
          </h2>
          <p className="text-7xl ">404</p>
          <p className="">
            죄송합니다. 잘못 된 경로입니다.{' '}
            <Link href="/" className="underline">
              돌아가기
            </Link>
          </p>
          <p className="text-muted-foreground text-xs">
            다양한 컨텐츠를 레인지저널에서 찾아보실 수 있습니다. 주제별, 일반
            게시판, 다양한 태그를 사용하여 검색해보세요.
          </p>
        </div>
      </div>
    </div>
  );
}
